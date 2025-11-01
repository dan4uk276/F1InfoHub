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
function createTeamCard(team, index) {
    const card = document.createElement('div');

    const teamClass = getTeamClass(team.name);
    const carImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.carImages}${team.carImageFilename}`;
    const backgroundImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    const driver1ImageFilename = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${team.driver1ImageFilename}`;
    const driver2ImageFilename = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${team.driver2ImageFilename}`;
    const logoUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamLogos}${team.logoUrl}`;
    // Get driver names
    const driver1Name = team.driver1Name;
    const driver2Name = team.driver2Name;

    card.className = `team-card ${teamClass}`;
    card.style.setProperty('animation-delay', `${index * 0.05}s`);
    card.style.setProperty('--team-bg-image', `url(${backgroundImagePath})`);

    card.innerHTML = ` 
        <div class="team-header">
            <div class="team-info">
                <div class="team-name">${team.name}</div>
                
                <div class="team-drivers">
                    <div class="driver-item">
                        <div class="driver-avatar">
                            <picture>
                                <source srcset="${driver1ImageFilename}" type="image/avif">
                                <img 
                                    src="${driver1ImageFilename}" 
                                    alt="${team.driver1Name} car"
                                    class="driver-image"
                                    loading="lazy"
                                    onerror="this.style.opacity='0.1'"
                                >
                            </picture>
                        </div>
                        <span class="driver-name-short">${driver1Name}</span>
                    </div>
                    <div class="driver-item">
                        <div class="driver-avatar">
                            <picture>
                                <source srcset="${driver2ImageFilename}" type="image/avif">
                                <img 
                                    src="${driver2ImageFilename}" 
                                    alt="${team.driver2Name} car"
                                    class="driver-image"
                                    loading="lazy"
                                    onerror="this.style.opacity='0.1'"
                                >
                            </picture>
                        </div>
                        <span class="driver-name-short">${driver2Name}</span>
                    </div>
                </div>
            </div>
            
            <div class="team-logo">
                <picture>
                    <source srcset="${logoUrl}" type="image/avif">
                    <img src="${logoUrl}"
                         alt="${team.name} logo"
                         onerror="this.style.opacity='0.3'">
                </picture>
            </div>
            
          
        </div>
        
        <div class="car-image-container">
            <picture>
                <source srcset="${carImagePath}" type="image/avif">
                <img 
                    src="${carImagePath}" 
                    alt="${team.name} car"
                    class="car-image"
                    loading="lazy"
                    onerror="this.style.opacity='0.1'"
                >
            </picture>
        </div>
            
    `;
    // <div className="team-footer">
    //     <div className="position-badge">${team.position || '?'}</div>
    //     <div className="team-stats">
    //         <div className="stat-item">
    //             <div className="stat-label">Points</div>
    //             <div className="stat-value">${Math.round(team.points) || 0}</div>
    //         </div>
    //         <div className="stat-item">
    //             <div className="stat-label">Wins</div>
    //             <div className="stat-value">${team.wins || 0}</div>
    //         </div>
    //         <div className="stat-item">
    //             <div className="stat-label">Podiums</div>
    //             <div className="stat-value">${team.podiums || 0}</div>
    //         </div>
    //     </div>
    // </div>

    card.addEventListener('click', () => {
        window.location.href = `../teamDetails/?id=${team.id}`;
    });

    return card;
}

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
        filteredTeams = allTeams.filter(team =>
            (team.name && team.name.toLowerCase().includes(lowerQuery)) ||
            (team.teamName && team.teamName.toLowerCase().includes(lowerQuery)) ||
            (team.fullName && team.fullName.toLowerCase().includes(lowerQuery)) ||
            (team.driver1 && team.driver1.toLowerCase().includes(lowerQuery)) ||
            (team.driver2 && team.driver2.toLowerCase().includes(lowerQuery))
        );
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