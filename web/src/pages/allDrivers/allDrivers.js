import {API_CONFIG} from "../../shared/config.js";
import { initHeader } from '../../components/header/header.js';
import { fetchAllDrivers, fetchDriversByTeam } from '../../shared/api.js';
import {
    debounce,
    showLoading,
    showError,
    showNoResults,
    getTeamColor,
    getCountryFlag,
    getTeamClass, getDriverImagePath
} from '../../shared/utils.js';
import {createDriverCard} from "../../components/driverCard/createDriverCard.js";

// Initialize header
initHeader();

// State
let allDrivers = [];
let filteredDrivers = [];

// DOM Elements
const driversContainer = document.querySelector('#driversContainer');
const searchInput = document.getElementById('search');
const teamFilter = document.getElementById('team-filter');

// Initialize page
async function init() {
    showLoading(driversContainer);

    try {
        allDrivers = await fetchAllDrivers();
        filteredDrivers = allDrivers;
        renderDrivers(filteredDrivers);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading drivers:', error);
        showError(driversContainer, 'Failed to load drivers. Please try again later.');
    }
}

// Render drivers
function renderDrivers(drivers) {
    const container = document.getElementById('driversContainer');

    if (drivers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h2>No drivers found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'drivers-grid';

    drivers.forEach((driver, index) => {
        const card = createDriverCard(driver, index);
        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
}

// Filter drivers by search query
function filterBySearch(query) {
    if (!query.trim()) {
        filteredDrivers = allDrivers;
    } else {
        const lowerQuery = query.toLowerCase();
        filteredDrivers = allDrivers.filter(driver =>
            driver.name.toLowerCase().includes(lowerQuery) ||
            (driver.teamName && driver.teamName.toLowerCase().includes(lowerQuery)) ||
            (driver.number && driver.number.toString().includes(lowerQuery))
        );
    }
    renderDrivers(filteredDrivers);
}

// Handle team filter change
async function handleTeamFilter(team) {
    showLoading(driversContainer);

    try {
        if (team === 'all') {
            filteredDrivers = allDrivers;
        } else {
            // Filter locally first for better performance
            filteredDrivers = allDrivers.filter(driver =>
                driver.teamName && driver.teamName.toLowerCase().includes(team.toLowerCase())
            );
        }
        renderDrivers(filteredDrivers);

        // Clear search when filtering by team
        searchInput.value = '';
    } catch (error) {
        console.error('Error filtering drivers:', error);
        showError(driversContainer, 'Failed to filter drivers. Please try again.');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search with debounce
    const debouncedSearch = debounce((e) => {
        filterBySearch(e.target.value);
    }, 300);

    searchInput.addEventListener('input', debouncedSearch);

    // Team filter
    teamFilter.addEventListener('change', (e) => {
        handleTeamFilter(e.target.value);
    });
}

// Start the app
init();