// src/pages/teamFullInfo/teamFullInfo.js

import { API_CONFIG } from '../../shared/config.js';
import { initHeader } from '../../components/header/header.js';
import { fetchTeams, fetchDrivers } from '../../shared/api.js';
import { getUrlParam, showError, getTeamClass } from '../../shared/utils.js';

// Initialize header
initHeader();

// Get team ID from URL
const teamId = getUrlParam('id');

// Initialize page
async function init() {
    if (!teamId) {
        showError(document.querySelector('.hero-container'), 'Team ID not provided');
        return;
    }

    try {
        // Fetch all teams and find the one we need
        const teams = await fetchTeams();
        const team = teams.find(t => t.id === parseInt(teamId));

        if (!team) {
            showError(document.querySelector('.hero-container'), 'Team not found');
            return;
        }

        // Fetch all drivers and filter by team
        const allDrivers = await fetchDrivers();
        const teamDrivers = allDrivers.filter(driver => {
            // Match team name case-insensitively
            if (!driver.teamName || !team.name) return false;
            return driver.teamName.toLowerCase().trim() === team.name.toLowerCase().trim();
        });

        console.log('Team:', team);
        console.log('Team Drivers:', teamDrivers);

        renderTeamProfile(team, teamDrivers);
        setupTabs();
        updatePageTitle(team.name);
    } catch (error) {
        console.error('Error loading team:', error);
        showError(document.querySelector('.hero-container'), 'Failed to load team details. Please try again.');
    }
}

// Update page title
function updatePageTitle(teamName) {
    document.title = `${teamName} | Formula 1`;
}

// Render complete team profile
function renderTeamProfile(team, drivers) {
    const heroSection = document.querySelector('.hero-section');
    const teamClass = getTeamClass(team.name);

    heroSection.classList.add(teamClass);

    // Set background image
    const backgroundImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    heroSection.style.setProperty('--bg-image', `url(${backgroundImagePath})`);

    renderHeroSection(team, teamClass);
    renderSeasonStats(team);
    renderHistoryStats(team);
    renderDriversSection(drivers, team);
    renderProfile(team);
}

// Render hero section
function renderHeroSection(team, teamClass) {
    const heroContent = document.querySelector('.hero-content');
    const currentYear = new Date().getFullYear();

    // Construct car image path
    const carImagePath = team.carImageFilename
        ? `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamImages}${team.carImageFilename}`
        : `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamImages}default-car.png`;

    heroContent.innerHTML = `
        <div class="hero-image-wrapper">
            <div class="hero-year-bg">${currentYear}</div>
            <img src="${carImagePath}" 
                 alt="${team.name} Car"
                 class="hero-car-image"
                 onerror="this.style.display='none'">
        </div>
        
        <div class="hero-info">
            <h1 class="team-name-large">${team.name}</h1>
            
            <div class="team-base-info">
                <div class="base-info-item">
                    <span class="base-info-label">Full Team Name</span>
                    <span class="base-info-value">${team.fullTeamName || team.name}</span>
                </div>
                <div class="base-info-item">
                    <span class="base-info-label">Base</span>
                    <span class="base-info-value">${team.base || 'N/A'}</span>
                </div>
                <div class="base-info-item">
                    <span class="base-info-label">Team Chief</span>
                    <span class="base-info-value">${team.teamChief || 'N/A'}</span>
                </div>
                <div class="base-info-item">
                    <span class="base-info-label">Technical Chief</span>
                    <span class="base-info-value">${team.technicalChief || 'N/A'}</span>
                </div>
                <div class="base-info-item">
                    <span class="base-info-label">Chassis</span>
                    <span class="base-info-value">${team.chassis || 'N/A'}</span>
                </div>
                <div class="base-info-item">
                    <span class="base-info-label">Power Unit</span>
                    <span class="base-info-value">${team.powerUnit || 'N/A'}</span>
                </div>
            </div>
            
            <div class="hero-quick-stats">
                <div class="quick-stat">
                    <span class="quick-stat-value">${team.position || 'N/A'}</span>
                    <span class="quick-stat-label">Position</span>
                </div>
                <div class="quick-stat">
                    <span class="quick-stat-value">${team.points || '0'}</span>
                    <span class="quick-stat-label">Points</span>
                </div>
                <div class="quick-stat">
                    <span class="quick-stat-value">${team.worldChampionships || '0'}</span>
                    <span class="quick-stat-label">Championships</span>
                </div>
            </div>
        </div>
    `;

    // Set year background color
    const heroYearBg = document.querySelector('.hero-year-bg');
    if (heroYearBg) {
        heroYearBg.style.color = `var(--${teamClass})`;
        heroYearBg.style.opacity = '0.15';
    }
}

// Render season statistics
function renderSeasonStats(team) {
    const seasonStatsContainer = document.getElementById('season-stats');
    if (!seasonStatsContainer) return;

    const statsGrid = seasonStatsContainer.querySelector('.stats-grid');
    if (!statsGrid) return;

    const seasonStats = [
        { label: 'Championship Position', value: team.position || 'N/A', highlight: true },
        { label: 'Total Points', value: team.points || '0', highlight: true },
        { label: 'Pole Positions', value: team.polePositions || '0' },
        { label: 'Fastest Laps', value: team.fastestLaps || '0' }
    ];

    statsGrid.innerHTML = seasonStats.map(stat => `
        <div class="stat-card">
            <div class="stat-card-label">${stat.label}</div>
            <p class="stat-card-value ${stat.highlight ? 'highlight' : ''}">${stat.value}</p>
        </div>
    `).join('');
}

// Render history statistics
function renderHistoryStats(team) {
    const historyStatsContainer = document.getElementById('history-stats');
    if (!historyStatsContainer) return;

    const statsGrid = historyStatsContainer.querySelector('.stats-grid');
    if (!statsGrid) return;

    const historyStats = [
        { label: 'First Team Entry', value: team.firstTeamEntry || 'N/A' },
        { label: 'World Championships', value: team.worldChampionships || '0', highlight: true },
        { label: 'Highest Race Finish', value: team.highestRaceFinish || 'N/A' },
        { label: 'Pole Positions', value: team.polePositions || '0' },
        { label: 'Fastest Laps', value: team.fastestLaps || '0' }
    ];

    statsGrid.innerHTML = historyStats.map(stat => `
        <div class="stat-card">
            <div class="stat-card-label">${stat.label}</div>
            <p class="stat-card-value ${stat.highlight ? 'highlight' : ''}">${stat.value}</p>
        </div>
    `).join('');
}

// Render drivers section
function renderDriversSection(drivers, team) {
    const driversGrid = document.querySelector('.drivers-grid');
    if (!driversGrid) return;

    if (!drivers || drivers.length === 0) {
        driversGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--f1-silver); padding: 2rem;">No drivers found for this team.</p>';
        return;
    }

    driversGrid.innerHTML = drivers.map(driver => {
        const driverImagePath = driver.imageFilename
            ? `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${driver.imageFilename}`
            : `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}default.jpg`;

        return `
            <div class="driver-card" onclick="window.location.href='../driverFullInfo/driverFullInfo.html?id=${driver.id}'">
                <div class="driver-card-image">
                    <img src="${driverImagePath}" 
                         alt="${driver.name}"
                         onerror="this.src='${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}default.jpg'">
                    <div class="driver-number-overlay">${driver.number || '00'}</div>
                </div>
                <div class="driver-card-content">
                    <h3 class="driver-card-name">${driver.name}</h3>
                    <div class="driver-card-stats">
                        <div class="driver-stat">
                            <span class="driver-stat-value">${driver.seasonPosition || 'N/A'}</span>
                            <span class="driver-stat-label">Position</span>
                        </div>
                        <div class="driver-stat">
                            <span class="driver-stat-value">${driver.seasonPoints || '0'}</span>
                            <span class="driver-stat-label">Points</span>
                        </div>
                        <div class="driver-stat">
                            <span class="driver-stat-value">${driver.podiums || '0'}</span>
                            <span class="driver-stat-label">Podiums</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render profile section
function renderProfile(team) {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) return;

    const profileInfo = [
        { label: 'First Team Entry', value: team.firstTeamEntry || 'N/A' },
        { label: 'Base', value: team.base || 'N/A' },
        { label: 'President', value: team.president || 'N/A' },
        { label: 'Director', value: team.director || 'N/A' }
    ];

    profileContent.innerHTML = `
        <div class="profile-header">
            <h2>Team Profile</h2>
            <div class="profile-info-cards">
                ${profileInfo.map(info => `
                    <div class="profile-info-card">
                        <div class="profile-info-label">${info.label}</div>
                        <div class="profile-info-value">${info.value}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="profile-text">
            ${team.profile ? formatProfile(team.profile) : '<p>Team profile information coming soon...</p>'}
        </div>
    `;
}

// Format profile text into paragraphs
function formatProfile(profileText) {
    if (!profileText) return '<p>Team profile information coming soon...</p>';

    // Split by double line breaks
    const paragraphs = profileText.split(/\n\n|\r\n\r\n/).filter(p => p.trim());

    if (paragraphs.length === 0) {
        return `<p>${profileText}</p>`;
    }

    return paragraphs.map(para => `<p>${para.trim()}</p>`).join('');
}

// Setup tabs functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            button.classList.add('active');
            const targetTab = document.getElementById(`${tabName}-stats`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// Start the app
init();