import {API_CONFIG} from "../../shared/config.js";
import {getTeamClass} from "../../shared/utils.js";

export function renderDriverHeroSection(driver) {
    const heroSection = document.createElement('section');
    const teamClass = getTeamClass(driver.teamName);
    heroSection.className = 'hero-section';

    heroSection.innerHTML = `
        <div class="hero-container">
            <div class="hero-content"></div>
        </div>`;

    const heroPlaceholder = document.getElementById('hero-placeholder');
    heroPlaceholder.replaceWith(heroSection);

    heroSection.classList.add(teamClass);

    const backgroundImagePath = `${API_CONFIG.baseUrl + API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    heroSection.style.setProperty('--bg-image', `url(${backgroundImagePath})`);

    const heroContent = heroSection.querySelector('.hero-content');

    let driverImagePath = `${API_CONFIG.baseUrl + API_CONFIG.endpoints.driverImages}${driver.imageFilename}`;
    heroContent.innerHTML = `
        <div class="hero-image-wrapper">
            <div class="hero-number-bg">${driver.number}</div>
            <picture>
                <source srcset="${driverImagePath}" type="image/avif">
                <img src="${driverImagePath}" 
                 alt="${driver.name}"
                 class="hero-driver-image"
                 onerror="this.src='${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}default.jpg'">
            </picture>
        </div>
        
        <div class="hero-info">    
            <div class="driver-team-badge">
                ${driver.teamName}
            </div>
            <h1 class="driver-name-large">${driver.name}</h1>
            
            
            ${driver.quote ? `<blockquote class="driver-quote">"${driver.quote}"</blockquote>` : ''}
            
            <div class="hero-quick-stats">
                <div class="quick-stat">
                    <span class="quick-stat-value">${driver.wdc}</span>
                    <span class="quick-stat-label">Championships</span>
                </div>
                <div class="quick-stat">
                    <span class="quick-stat-value">${driver.raceWins || '0'}</span>
                    <span class="quick-stat-label">Wins</span>
                </div>
                <div class="quick-stat">
                    <span class="quick-stat-value">${driver.podiums}</span>
                    <span class="quick-stat-label">Podiums</span>
                </div>
            </div>
        </div>
    `;

    const heroNumberBg = heroSection.querySelector('.hero-number-bg');
    heroNumberBg.style.setProperty('color', `var(--${getTeamClass(driver.teamName)}-dark)`);
}