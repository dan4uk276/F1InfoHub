// src/pages/driverFullInfo/driverFullInfo.js

import { API_CONFIG } from '../../shared/config.js';
import { initHeader } from '../../components/header/header.js';
import {fetchDriverById, fetchYoutubeVideosData} from '../../shared/api.js';
import {getUrlParam, showLoading, showError, getTeamColor, getTeamClass} from '../../shared/utils.js';

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

        renderDriverProfile(driver);
        setupTabs();
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
function renderDriverProfile(driver) {
    const heroSection = document.querySelector('.hero-section');

    heroSection.classList.add(getTeamClass(driver.teamName));

    const backgroundImagePath = `${API_CONFIG.baseUrl + API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    heroSection.style.setProperty('--bg-image', `url(${backgroundImagePath})`);

    renderHeroSection(driver);
    renderSeasonStats(driver);
    renderCareerStats(driver);
    renderBiography(driver);
    renderRelatedContent(driver);
}

// Render hero section
function renderHeroSection(driver) {
    const heroContent = document.querySelector('.hero-content');
    const teamColor = getTeamColor(driver.teamName || 'default');

    heroContent.innerHTML = `
        <div class="hero-image-wrapper">
            <div class="hero-number-bg">${driver.number || '00'}</div>
            <picture>
                <source srcset="${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${driver.imageFilename}" type="image/avif">
                <img src="${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${driver.imageFilename}" 
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

    const heroNumberBg = document.querySelector('.hero-number-bg');
    heroNumberBg.style.setProperty('color', `var(--${getTeamClass(driver.teamName)}-dark)`);
}

// Render season statistics
function renderSeasonStats(driver) {
    const seasonStatsContainer = document.getElementById('season-stats').querySelector('.stats-grid');

    const seasonStats = [
        { label: 'Season Position', value: driver.seasonPosition || 'N/A', highlight: true },
        { label: 'Season Points', value: driver.seasonPoints || '0' },
        { label: 'Grand Prix Races', value: driver.gpRaces || '0' },
        { label: 'Grand Prix Points', value: driver.gpPoints || '0' },
        { label: 'Grand Prix Wins', value: driver.gpWins || '0', highlight: true },
        { label: 'Grand Prix Podiums', value: driver.gpPodiums || '0' },
        { label: 'Grand Prix Poles', value: driver.gpPoles || '0' },
        { label: 'Grand Prix Top 10s', value: driver.gpTop10s || '0' },
        { label: 'DHL Fastest Laps', value: driver.fastestLaps || '0' },
        { label: 'DNFs', value: driver.dnfs || '0' },
        { label: 'Sprint Races', value: driver.sprintRaces || '0' },
        { label: 'Sprint Points', value: driver.sprintPoints || '0' }
    ];

    seasonStatsContainer.innerHTML = seasonStats.map(stat => `
        <div class="stat-card">
            <div class="stat-card-label">${stat.label}</div>
            <p class="stat-card-value ${stat.highlight ? 'highlight' : ''}">${stat.value}</p>
        </div>
    `).join('');
}

// Render career statistics
function renderCareerStats(driver) {
    const careerStatsContainer = document.getElementById('career-stats').querySelector('.stats-grid');

    const careerStats = [
        { label: 'Grand Prix Entered', value: driver.gpEntered || '0' },
        { label: 'Career Points', value: driver.points || '0', highlight: true },
        { label: 'Highest Race Finish', value: driver.highestRaceFinish || 'N/A' },
        { label: 'Podiums', value: driver.podiums || '0' },
        { label: 'Highest Grid Position', value: driver.highestGridPosition || 'N/A' },
        { label: 'Pole Positions', value: driver.polePositions || '0' },
        { label: 'World Championships', value: driver.wdc || '0', highlight: true },
        { label: 'Career DNFs', value: driver.careerDnfs || '0' }
    ];

    careerStatsContainer.innerHTML = careerStats.map(stat => `
        <div class="stat-card">
            <div class="stat-card-label">${stat.label}</div>
            <p class="stat-card-value ${stat.highlight ? 'highlight' : ''}">${stat.value}</p>
        </div>
    `).join('');
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

// Render related content (videos/articles)
async function renderRelatedContent(driver) {
    const relatedSection = document.querySelector('.related-section .container');

    try {
        const relatedItems = await fetchYoutubeVideosData();

        // Проверка что это массив
        if (!Array.isArray(relatedItems)) {
            console.error('fetchYoutubeVideosData did not return an array:', relatedItems);
            relatedSection.innerHTML = '<p>No related content available</p>';
            return;
        }

        relatedSection.innerHTML = `
            <div class="related-header">
                <h2 class="section-title">Latest Videos</h2>
                <div class="carousel-controls">
                    <button class="carousel-btn carousel-prev" aria-label="Previous">
                        <
                    </button>
                    <button class="carousel-btn carousel-next" aria-label="Next">
                        >
                    </button>
                </div>
            </div>
            <div class="carousel-wrapper">
                <div class="related-grid">
                    ${relatedItems.map(item => `
                        <div class="related-card" data-video-id="${item.videoId}">
                            <div class="related-card-image">
                                <img src="${item.thumbnailUrl}"
                                     alt="${item.title}"
                                     onerror="this.src='https://via.placeholder.com/640x360/e10600/ffffff?text=F1'">
                                <div class="video-play-icon"></div>
                                <div class="video-duration">${formatDuration(item.duration)}</div>
                            </div>
                            <div class="related-card-content">
                                <h3 class="related-card-title">${item.title}</h3>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Инициализация карусели
        setupCarousel();
        setupVideoModal();
    } catch (error) {
        console.error('Error loading related content:', error);
        relatedSection.innerHTML = '<p>Failed to load related content</p>';
    }
}

// Setup video modal functionality
function setupVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoModalIframe');
    const closeBtn = document.getElementById('videoModalClose');

    // Открытие видео при клике на карточку
    document.querySelectorAll('.related-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            if (!videoId) return;

            // TODO: MUST WORK AFTER HOSTING, SEEMS LIKE FORMULA 1 RECTRICTED USING VIDEOS ON LOCALHOST
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.title = card.dataset.title;
            modal.classList.add('show');
        });
    });

    // Закрытие по кнопке
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне видео
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('show');
        // Подождать окончания анимации перед очисткой iframe
        setTimeout(() => {
            iframe.src = '';
        }, 300); // 300ms совпадает с transition в CSS
    }
}



// Функция для форматирования длительности видео
function formatDuration(duration) {
    if (!duration) return '0:00';

    // Если уже в формате MM:SS или HH:MM:SS
    if (typeof duration === 'string' && duration.includes(':')) {
        return duration;
    }

    // Если в секундах (число)
    if (typeof duration === 'number') {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return duration;
}

// Настройка карусели
function setupCarousel() {
    const carousel = document.querySelector('.related-grid');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!carousel || !prevBtn || !nextBtn) return;

    // Получаем ширину одной карточки с отступом
    const getScrollAmount = () => {
        const card = carousel.querySelector('.related-card');
        if (!card) return 0;
        const cardWidth = card.offsetWidth;
        const gap = 24; // 1.5rem = 24px
        return (cardWidth + gap);
    };

    // Обновление состояния кнопок
    const updateButtons = () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        prevBtn.disabled = carousel.scrollLeft <= 0;
        nextBtn.disabled = carousel.scrollLeft >= maxScroll - 5; // -5 для погрешности
    };

    // Прокрутка назад
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
        setTimeout(updateButtons, 300);
    });

    // Прокрутка вперед
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
        setTimeout(updateButtons, 300);
    });

    // Обновляем кнопки при прокрутке
    carousel.addEventListener('scroll', updateButtons);

    // Обновляем при изменении размера окна
    window.addEventListener('resize', updateButtons);

    // Начальное состояние кнопок
    updateButtons();
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
            document.getElementById(`${tabName}-stats`).classList.add('active');
        });
    });
}


// Start the app
init();