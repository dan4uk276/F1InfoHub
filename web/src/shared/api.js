import { API_CONFIG } from './config.js';

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function fetchAllDrivers() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allDrivers}`;
    const drivers = await fetchData(url);

    // Sort drivers by teamName (case-insensitive)
    return drivers.sort((a, b) =>
        a.teamName.localeCompare(b.teamName, undefined, { sensitivity: 'base' })
    );
}

export async function fetchDriverById(id) {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverById}${id}`;
    const data = await fetchData(url);
    console.log(`Driver info: `, data);
    return data;
}

export async function fetchYoutubeVideosData() {
    const data = await fetchData(`${API_CONFIG.baseUrl + API_CONFIG.endpoints.videos}`);
    console.log(`Fetched videos data: `, data);
    return sortVideosByDate(data);
}

function sortVideosByDate(videos) {
    return videos.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA; // новое видео первыми
    }).slice(0,9);
}

export async function searchDriverByName(name) {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.searchByName}?name=${encodeURIComponent(name)}`;
    return fetchData(url);
}

export async function fetchDriversByTeam(team) {
    if (team === 'all') {
        return fetchAllDrivers();
    }
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.filterByTeam}?team=${team}`;
    const data = await fetchData(url);
    console.log('Fetching team drivers...')
    return data;
}

// Team API calls
export async function fetchAllTeams() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allTeams}`;
    return fetchData(url);
}

export async function fetchTeamById(id) {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamById}${id}`;
    return fetchData(url);
}

// Schedule API calls
export async function fetchSchedule() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.schedule}`;
    return fetchData(url);
}

// Results API calls
export async function fetchResults() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.results}`;
    return fetchData(url);
}