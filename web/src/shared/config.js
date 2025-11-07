export const API_CONFIG = {
    baseUrl: 'http://localhost:8080/api/v1',
    endpoints: {
        backgroundImages: '/images/backgrounds/',
        driverImages: '/images/drivers/',
        teamLogos: '/images/teams/',
        carImages: '/images/cars/',
        allDrivers: '/drivers',
        driverById: '/drivers/',
        searchByName: '/drivers/by-name',
        filterByTeam: '/drivers/by-team',
        allTeams: '/teams',
        teamById: '/teams/',
        schedule: '/schedule',
        results: '/results',
        videos: '/videos'
    }
};

export const CACHE_CONFIG = {
    enabled: true,
    ttl: 5 * 60 * 1000 // 5 minutes
};

export const ROUTES = {
    home: '/',
    allDrivers: '/src/pages/allDrivers/',
    driverDetails: '/src/pages/driverFullInfo/',
    teams: '/src/pages/teams/',
    schedule: '/src/pages/schedule/',
    results: '/src/pages/results/'
};