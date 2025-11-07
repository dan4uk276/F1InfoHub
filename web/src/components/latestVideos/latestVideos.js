// Render related content (videos/articles)
import {fetchYoutubeVideosData} from "../../shared/api.js";

export async function renderLatestVideos() {
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
                        <div class="related-card" data-video-id="${item.id}">
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
