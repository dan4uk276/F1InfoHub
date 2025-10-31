import {API_CONFIG} from "../../shared/config.js";
import { initHeader } from '../../components/header/header.js';
import { fetchAllDrivers, filterDriversByTeam } from '../../shared/api.js';
import {
    debounce,
    showLoading,
    showError,
    showNoResults,
    getTeamColor,
    getCountryFlag,
    getTeamClass, getDriverImagePath
} from '../../shared/utils.js';

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

function createDriverCard(driver, index) {
    const card = document.createElement('div');

    const nameParts = (driver.name || 'Unknown Driver').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const teamName = driver.teamName || 'Unknown Team';
    const teamInitials = teamName.split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 3)
        .toUpperCase();

    const teamClass = getTeamClass(teamName);
    const imagePath = getDriverImagePath(driver);
    const backgroundImagePath = `${API_CONFIG.baseUrl + API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    // ОТЛАДКА
    console.log(`Driver: ${driver.name}, Image: ${imagePath}`);

    card.className = `driver-card ${teamClass}`;
    card.style.setProperty('animation-delay', `${index * 0.05}s`);
    card.style.setProperty('--driver-bg-image', `url(${backgroundImagePath})`);

    card.innerHTML = `
        <div class="driver-header">
            <div class="driver-info">
                <div class="driver-name">${firstName}</div>
                <div class="driver-surname">${lastName}</div>
                <div class="team-info">
                    <div class="team-name">${teamName}</div>
                </div>
            </div>
            <div class="driver-number-badge">${driver.number || '?'}</div>
        </div>
        
        <div class="driver-image-container">
            <picture>
                <source srcset="${imagePath}" type="image/avif">
                <img 
                    src="${imagePath}" 
                    alt="${driver.name}"
                    class="driver-image"
                    loading="lazy"
                    onerror="console.error('Image failed to load:', '${imagePath}'); this.style.opacity='0.1'"
                    onload="console.log('Image loaded:', '${imagePath}')"
                >
            </picture>
        </div>
        
        <div class="driver-footer">
            <div class="flag">
                <img src="https://flagsapi.com/${getCountryFlag(driver.country)}/flat/64.png">
            </div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-label">Points</div>
                    <div class="stat-value">${Math.round(driver.points) || 0}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Podiums</div>
                    <div class="stat-value">${driver.podiums || 0}</div>
                </div>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `../driverFullInfo/?id=${driver.id}`;
    });

    return card;
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