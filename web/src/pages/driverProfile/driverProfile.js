// src/pages/driverProfile/driverProfile.js

import { API_CONFIG } from '../../shared/config.js';
import { initHeader } from '../../components/header/header.js';
import {fetchDriverById, fetchYoutubeVideosData} from '../../shared/api.js';
import {getUrlParam, showLoading, showError, getTeamColor, getTeamClass, StatType} from '../../shared/utils.js';
import {renderLatestVideos} from "../../components/latestVideos/latestVideos.js";
import {renderDriverHeroSection} from "../../components/driverHeroSection/renderDriverHeroSection.js";
import {renderStatistics} from "../../components/statistics/statistics.js";

// Initialize header
initHeader();

// Get driver ID from URL
const driverId = getUrlParam('id');

// Initialize page
async function init() {
    if (!driverId) {
        showError(document.querySelector('.hero-container'), 'Driver ID not provided');
        return;
    }

    try {
        const driver = await fetchDriverById(driverId);

        await renderDriverProfile(driver);
        updatePageTitle(driver.name);
    } catch (error) {
        console.error('Error loading driver:', error);
        showError(document.querySelector('.hero-container'), 'Failed to load driver details. Please try again.');
    }
}

// Update page title
function updatePageTitle(driverName) {
    document.title = `${driverName} | Formula 1`;
}

// Render complete driver profile
async function renderDriverProfile(driver) {
    renderDriverHeroSection(driver);
    renderStats(driver);
    renderBiography(driver);
    await renderLatestVideos();
}

// Render hero section

// Render season statistics
function renderStats(driver) {

    const seasonStats = [
        { label: 'Season Position', value: driver.driverSeasonStat.seasonPosition},
        { label: 'Season Points', value: driver.driverSeasonStat.seasonPoints},
        { label: 'Grand Prix Races', value: driver.driverSeasonStat.gpRaces},
        { label: 'Grand Prix Points', value: driver.driverSeasonStat.gpPoints},
        { label: 'Grand Prix Wins', value: driver.driverSeasonStat.gpWins},
        { label: 'Grand Prix Podiums', value: driver.driverSeasonStat.gpPodiums},
        { label: 'Grand Prix Poles', value: driver.driverSeasonStat.gpPoles},
        { label: 'Grand Prix Top 10s', value: driver.driverSeasonStat.gpTop10s},
        { label: 'DHL Fastest Laps', value: driver.driverSeasonStat.dhlFastestLaps},
        { label: 'DNFs', value: driver.driverSeasonStat.dnfs},
        { label: 'Sprint Races', value: driver.driverSeasonStat.sprintRaces},
        { label: 'Sprint Points', value: driver.driverSeasonStat.sprintPoints},
        { label: 'Sprint Wins', value: driver.driverSeasonStat.sprintWins},
        { label: 'Sprint Podiums', value: driver.driverSeasonStat.sprintPodiums},
        { label: 'Sprint Poles', value: driver.driverSeasonStat.sprintPoles},
        { label: 'Sprint Top 10s', value: driver.driverSeasonStat.sprintTop10s}
    ];

    const careerStats = [
        { label: 'Grand Prix Entered', value: driver.gpEntered || 'N/A' },
        { label: 'Career Points', value: driver.points || 'N/A', highlight: true },
        { label: 'Highest Race Finish', value: driver.highestRaceFinish || 'N/A' },
        { label: 'Podiums', value: driver.podiums},
        { label: 'Highest Grid Position', value: driver.highestGridPosition},
        { label: 'Pole Positions', value: driver.polePositions || 'N/A' },
        { label: 'World Championships', value: driver.wdc},
        { label: 'Career DNFs', value: driver.careerDnfs || 'N/A' }
    ];

    renderStatistics(seasonStats, careerStats, StatType.DRIVER);
}

// Render biography section
function renderBiography(driver) {
    const bioContent = document.querySelector('.bio-content');

    const bioInfo = [
        { label: 'Date of Birth', value: driver.dateOfBirth || 'N/A' },
        { label: 'Place of Birth', value: driver.placeOfBirth || 'N/A' },
        { label: 'Country', value: driver.country || 'N/A' }
    ];

    bioContent.innerHTML = `
        <div class="bio-header">
            <h2>Biography</h2>
            <div class="bio-info-cards">
                ${bioInfo.map(info => `
                    <div class="bio-info-card">
                        <div class="bio-info-label">${info.label}</div>
                        <div class="bio-info-value">${info.value}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="bio-text">
            ${driver.biography ? formatBiography(driver.biography) : '<p>Biography information coming soon...</p>'}
        </div>
    `;
}

// Format biography text into paragraphs
function formatBiography(bioText) {
    // Split by double newlines or periods followed by capital letters
    const paragraphs = bioText.split(/\r\n|\. (?=[A-Z])/).filter(p => p.trim());

    if (paragraphs.length === 0) {
        return `<p>${bioText}</p>`;
    }

    return paragraphs.map(para => {
        // Add period back if it was removed by split
        const text = para.trim().endsWith('.') ? para.trim() : para.trim() + '.';
        return `<p>${text}</p>`;
    }).join('');
}


document.addEventListener('DOMContentLoaded', () => {
    init();
});