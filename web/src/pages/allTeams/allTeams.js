import { API_CONFIG } from "../../shared/config.js";
import { initHeader } from '../../components/header/header.js';
import { fetchAllTeams } from '../../shared/api.js';
import {
    debounce,
    showLoading,
    showError,
    showNoResults,
    getTeamClass
} from '../../shared/utils.js';
import {createTeamCard} from "../../components/teamCard/craeteTeamCard.js";

// Initialize header
initHeader();

// State
let allTeams = [];
let filteredTeams = [];

// DOM Elements
const teamsContainer = document.querySelector('#teamsContainer');
const searchInput = document.getElementById('search');
const championshipFilter = document.getElementById('championship-filter');

// Initialize page
async function init() {
    showLoading(teamsContainer);

    try {
        allTeams = await fetchAllTeams();
        filteredTeams = allTeams;
        console.log(allTeams);
        renderTeams(filteredTeams);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading teams:', error);
        showError(teamsContainer, 'Failed to load teams. Please try again later.');
    }
}

// Create team card

// Render teams
function renderTeams(teams) {
    const container = document.getElementById('teamsContainer');

    if (teams.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h2>No teams found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'teams-grid';

    teams.forEach((team, index) => {
        const card = createTeamCard(team, index);
        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
}

// Filter teams by search query
function filterBySearch(query) {
    if (!query.trim()) {
        filteredTeams = allTeams;
    } else {
        const lowerQuery = query.toLowerCase();
        filteredTeams = allTeams.filter(team => (team.name && team.name.toLowerCase().includes(lowerQuery)));
    }
    renderTeams(filteredTeams);
}

// Handle championship filter change
function handleChampionshipFilter(filter) {
    showLoading(teamsContainer);

    try {
        // if (filter === 'all') {
        //     filteredTeams = allTeams;
        // } else if (filter === 'top3') {
        //     filteredTeams = allTeams.filter(team => team.position <= 3);
        // } else if (filter === 'top5') {
        //     filteredTeams = allTeams.filter(team => team.position <= 5);
        // } else if (filter === 'midfield') {
        //     filteredTeams = allTeams.filter(team => team.position >= 6 && team.position <= 8);
        // } else if (filter === 'bottom') {
        //     filteredTeams = allTeams.filter(team => team.position >= 9);
        // }

        renderTeams(filteredTeams);
        searchInput.value = '';
    } catch (error) {
        console.error('Error filtering teams:', error);
        showError(teamsContainer, 'Failed to filter teams. Please try again.');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search with debounce
    const debouncedSearch = debounce((e) => {
        filterBySearch(e.target.value);
    }, 300);

    searchInput.addEventListener('input', debouncedSearch);

    // Championship filter
    championshipFilter.addEventListener('change', (e) => {
        handleChampionshipFilter(e.target.value);
    });
}

// Start the app
init();