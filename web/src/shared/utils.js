import {API_CONFIG} from "./config.js";

const teamClasses = {
    'McLaren': 'mclaren',
    'Mercedes': 'mercedes',
    'Ferrari': 'ferrari',
    'Red Bull Racing': 'redbull',
    'Alpine': 'alpine',
    'Aston Martin': 'aston-martin',
    'Haas': 'haas',
    'RB': 'rb',
    'Kick Sauber': 'kick-sauber',
    'Williams': 'williams'
};

// Get URL parameter by name
export function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set URL parameter without page reload
export function setUrlParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

// Get all URL parameters as object
export function getAllUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}

/**
 * Date Formatting Utilities
 */

// Format date to readable string
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format date to short format (DD/MM/YYYY)
export function formatDateShort(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

/**
 * Performance Utilities
 */

// Debounce function for search inputs
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * UI State Utilities
 */

// Show loading state
export function showLoading(container) {
    if (!container) return;
    container.innerHTML = '<div class="loading">Loading</div>';
}

// Show error state
export function showError(container, message = 'An error occurred') {
    if (!container) return;
    container.innerHTML = `<div class="error">${message}</div>`;
}

// Show no results state
export function showNoResults(container, message = 'No results found') {
    if (!container) return;
    container.innerHTML = `<div class="no-results">${message}</div>`;
}

// Show success message
export function showSuccess(container, message = 'Success!') {
    if (!container) return;
    container.innerHTML = `<div class="success">${message}</div>`;
}

/**
 * DOM Utilities
 */

// Smooth scroll to element
export function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Scroll to top of page
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check if element is in viewport
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * F1 Specific Utilities
 */

// Get team color by team name
export function getTeamColor(teamName) {
    const teamColors = {
        // 2025 Teams
        'red bull': '#0600ef',
        'red bull racing': '#0600ef',
        'redbull': '#0600ef',

        'mercedes': '#00d2be',
        'mercedes-amg': '#00d2be',
        'mercedes-amg petronas': '#00d2be',

        'ferrari': '#dc0000',
        'scuderia ferrari': '#dc0000',

        'mclaren': '#ff8700',
        'mclaren f1': '#ff8700',
        'mclaren f1 team': '#ff8700',

        'alpine': '#0090ff',
        'alpine f1': '#0090ff',
        'alpine f1 team': '#0090ff',

        'aston martin': '#006f62',
        'aston martin f1': '#006f62',
        'aston martin f1 team': '#006f62',

        'haas': '#ffffff',
        'haas f1': '#ffffff',
        'moneygram haas': '#ffffff',

        'alphatauri': '#2b4562',
        'scuderia alphatauri': '#2b4562',
        'visa cashapp rb': '#2b4562',

        'alfa romeo': '#900000',
        'alfa romeo f1': '#900000',
        'alfa romeo f1 team': '#900000',
        'sauber': '#900000',

        'williams': '#005aff',
        'williams racing': '#005aff'
    };

    return teamColors[teamName.toLowerCase()] || '#e10600';
}

// Get team logo URL
export function getTeamLogoUrl(teamName) {
    const formattedName = teamName.toLowerCase().replace(/\s+/g, '-');
    return `/src/assets/images/teams/${formattedName}.png`;
}

// Format driver name for URL
export function formatDriverNameForUrl(name) {
    return name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

// Parse driver name from URL
export function parseDriverNameFromUrl(urlName) {
    return urlName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Get position suffix (1st, 2nd, 3rd, etc.)
export function getPositionSuffix(position) {
    const num = parseInt(position);
    if (isNaN(num)) return position;

    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return num + 'th';
    }

    switch (lastDigit) {
        case 1: return num + 'st';
        case 2: return num + 'nd';
        case 3: return num + 'rd';
        default: return num + 'th';
    }
}

// Format points with comma separator
export function formatPoints(points) {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Validation Utilities
 */

// Validate email
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate URL
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * String Utilities
 */

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Capitalize first letter
export function capitalizeFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Convert to title case
export function toTitleCase(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Number Utilities
 */

// Format number with suffix (K, M, B)
export function formatNumberShort(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Clamp number between min and max
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Array Utilities
 */

// Shuffle array
export function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Group array by key
export function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

/**
 * Storage Utilities
 */

// LocalStorage wrapper with error handling
export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

export function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

export function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}
export function getCountryFlag(country) {
    if (!country) return '🏁';

    const flags = {
        'Australia': 'AU',
        'United Kingdom': 'GB',
        'Great Britain': 'GB',
        'England': 'GB',
        'Italy': 'IT',
        'Monaco': 'MC',
        'Netherlands': 'NL',
        'Japan': 'JP',
        'France': 'FR',
        'Spain': 'ES',
        'Canada': 'CA',
        'New Zealand': 'NZ',
        'Germany': 'DE',
        'Brazil': 'BR',
        'Thailand': 'TH',
        'Mexico': 'MX',
        'Finland': 'FI',
        'Denmark': 'DK',
        'China': 'CN',
        'Austria': 'AT',
        'Switzerland': 'CH',
        'Belgium': 'BE',
        'Poland': 'PL',
        'Russia': 'RU',
        'Argentina' : 'AR'
    };

    return flags[country] ;
}

/**
 * Copy to Clipboard
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
    }
}

export function getDriverImagePath(driver) {
    if (driver.imageFilename) {
        return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${driver.imageFilename}`;
    }

    return `https://via.placeholder.com/300x400/333/fff?text=${encodeURIComponent(driver.name || 'Driver')}`;
}

export function getTeamClass(teamName) {
    if (!teamName) return 'mclaren';

    if (teamClasses[teamName]) {
        return teamClasses[teamName];
    }

    const teamLower = teamName.toLowerCase();
    for (const [key, value] of Object.entries(teamClasses)) {
        if (teamLower.includes(key.toLowerCase()) || key.toLowerCase().includes(teamLower)) {
            return value;
        }
    }

    return 'mclaren';
}