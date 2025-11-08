// src/pages/teamProfile/teamProfile.js

import { API_CONFIG } from '../../shared/config.js';
import { initHeader } from '../../components/header/header.js';
import {fetchAllTeams, fetchDriversByTeam, fetchTeamById} from '../../shared/api.js';
import {getUrlParam, showError, getTeamClass, StatType} from '../../shared/utils.js';
import {createDriverCard} from "../../components/driverCard/createDriverCard.js";
import {renderTeamHeroSection} from "../../components/teamHeroSection/renderTeamHeroSection.js";
import {renderLatestVideos} from "../../components/latestVideos/latestVideos.js";
import {renderStatistics} from "../../components/statistics/statistics.js";

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
        const team = await fetchTeamById(teamId);

        if (!team) {
            showError(document.querySelector('.hero-container'), 'Team not found');
            return;
        }

        console.log('Team:', team);
        console.log('Team Drivers:', team.drivers);

        await renderTeamProfile(team, team.drivers);
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
async function renderTeamProfile(team, drivers) {
    renderTeamHeroSection(team);
    renderDriversSection(drivers, team);
    renderStats(team);
    renderProfile(team);
    await renderLatestVideos();
}

// Render hero section


// Render season statistics
function renderStats(team) {
    const seasonStats = [
        { label: 'Season Position', value: team.position || 'N/A' },
        { label: 'Season Points', value: team.points || 'N/A' },
        { label: 'Grand Prix Races', value: team.races || 'N/A' },
        { label: 'Grand Prix Points', value: team.points || 'N/A' },
        { label: 'Grand Prix Wins', value: team.wins || 'N/A' },
        { label: 'Grand Prix Podiums', value: team.podiums || 'N/A' },
        { label: 'Grand Prix Poles', value: team.poles || 'N/A' },
        { label: 'Grand Prix Top 10s', value: team.gpTop10s || 'N/A' },
        { label: 'DHL Fastest Laps', value: team.dhlFastestLaps || 'N/A' },
        { label: 'DNFs', value: team.dnfs || 'N/A' },
        { label: 'Sprint Races',  value: team.sprintRaces || 'N/A' },
        { label: 'Sprint Points', value: team.sprintPoints || 'N/A' },
        { label: 'Sprint Wins',  value: team.sprintWins || 'N/A' },
        { label: 'Sprint Podiums', value: team.sprintPodiums || 'N/A' },
        { label: 'Sprint Poles',  value: team.sprintPoles || 'N/A' },
        { label: 'Sprint Top 10s', value: team.sprintTop10s || 'N/A' }
    ];

    const historyStats = [
        { label: 'Grand Prix Entered', value: team.totalGpsEntered || 'N/A'},
        { label: 'Team Points', value: team.totalPoints || 'N/A'},
        { label: 'Highest Race Finish', value: team.highestRaceFinish},
        { label: 'Podiums', value: team.totalPodiums || 'N/A'},
        { label: 'Highest Grid Position', value: team.highestGridPosition || 'N/A'},
        { label: 'Pole Positions', value: team.polePositions},
        { label: 'World Championships', value: team.worldChampionships},
    ];

    renderStatistics(seasonStats, historyStats, StatType.TEAM);
}

// Render drivers section
function renderDriversSection(drivers, team) {
    const driversGrid = document.querySelector('.drivers-grid');
    if (!driversGrid) return;

    if (!drivers || drivers.length === 0) {
        driversGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--f1-silver); padding: 2rem;">No drivers found for this team.</p>';
        return;
    }

    drivers.forEach((driver, index) => {
        const card = createDriverCard(driver, index);
        driversGrid.appendChild(card);
    });


}

// Render profile section
function renderProfile(team) {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) return;

    const profileInfo = [
        { label: 'Full Team Name', value: team.fullName || 'N/A' },
        { label: 'Base', value: team.base || 'N/A' },
        { label: 'Team Chief', value: team.teamChief || 'N/A' },
        { label: 'Technical Chief', value: team.technicalChief || 'N/A' },
        { label: 'Chassis', value: team.chassis || 'N/A' },
        { label: 'Power Unit', value: team.powerUnit || 'N/A' },
        { label: 'First Team Entry', value: team.firstTeamEntry || 'N/A' }
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
            ${formatProfile(team.description)}
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


// Start the app
document.addEventListener('DOMContentLoaded', () => {
    init();
});

