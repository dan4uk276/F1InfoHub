import {getCountryFlag, getDriverImagePath, getTeamClass} from "../../shared/utils.js";
import {API_CONFIG} from "../../shared/config.js";

export function createDriverCard(driver, index) {
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
        </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `../driverProfile/?id=${driver.id}`;
    });

    return card;
}