// Translations
const translations = {
    ru: {
        logoSubtitle: 'Студия дизайна интерьера',
        navAbout: 'О студии',
        navServices: 'Услуги',
        navPortfolio: 'Портфолио',
        navProcess: 'Этапы',
        navContact: 'Консультация',
        heroLabel: 'Премиум дизайн интерьера',
        heroTitle: 'Создаём пространства <br><span>для жизни мечты</span>',
        heroDesc: 'Полный цикл услуг по дизайну интерьера жилых и коммерческих помещений. От концепции до реализации — создаём уникальные пространства, отражающие вашу индивидуальность.',
        btnProjects: 'Смотреть проекты',
        btnConsult: 'Бесплатная консультация',
        statYears: 'лет опыта',
        statProjects: 'реализованных проектов',
        statClients: 'довольных клиентов',
        servicesLabel: 'Услуги',
        servicesTitle: 'Комплексный подход к дизайну',
        servicesSubtitle: 'От первой встречи до финальной реализации — мы сопровождаем вас на каждом этапе создания идеального интерьера',
        service1Title: 'Состав дизайн-проекта',
        service1Text: 'Полный комплект рабочей документации: планировочные решения, 3D-визуализации, чертежи и спецификации материалов.',
        service2Title: 'Авторский надзор',
        service2Text: 'Контроль соответствия строительных работ проектной документации. Регулярные выезды на объект и взаимодействие с подрядчиками.',
        service3Title: 'Комплектация объекта',
        service3Text: 'Подбор и закупка мебели, сантехники, света, отделочных материалов. Работа с проверенными поставщиками и скидки до 10%.',
        service4Title: 'Коммерческие интерьеры',
        service4Text: 'Дизайн офисов, ресторанов, отелей и магазинов. Создаём пространства, которые работают на имидж и прибыль вашего бизнеса.',
        portfolioLabel: 'Портфолио',
        portfolioTitle: 'Реализованные проекты',
        portfolioSubtitle: 'Каждый проект — это уникальная история, воплощённая в пространстве',
        filterAll: 'Все проекты',
        filterLiving: 'Гостиные',
        filterKitchen: 'Кухни',
        filterBedroom: 'Спальни',
        filterBathroom: 'Санузлы',
        processLabel: 'Процесс',
        processTitle: 'Как мы работаем',
        processSubtitle: 'Прозрачный и понятный процесс от первой встречи до заселения',
        step1Title: 'Встреча и консультация',
        step1Text: 'Знакомимся, обсуждаем ваши пожелания, бюджет и сроки. Проводим бесплатную консультацию на объекте.',
        step2Title: 'Планировочное решение',
        step2Text: 'Разрабатываем 2-3 варианта планировки с расстановкой мебели и зонированием пространства.',
        step3Title: 'Дизайн-проект',
        step3Text: 'Создаём полный комплект документации: чертежи, визуализации, спецификации материалов.',
        step4Title: 'Реализация',
        step4Text: 'Авторский надзор, комплектация и контроль ремонтных работ до финального результата.',
        aboutLabel: 'О студии',
        aboutTitle: 'ARCHISPACE',
        aboutText1: 'Мы — команда профессиональных дизайнеров интерьера, объединённых общей идеей: создавать пространства, в которых хочется жить. Нами были реализованы более 200+ проектов различной сложности — от небольших квартир до премиальных загородных домов.',
        aboutText2: 'Наш подход основан на глубоком понимании потребностей клиента, современных трендах дизайна и безупречном качестве исполнения. Мы не просто создаём красивые интерьеры — мы проектируем пространства, которые работают на комфорт и гармонию вашей жизни.',
        feature1Title: 'Индивидуальный подход',
        feature1Text: 'Каждый проект уникален и создаётся под ваш образ жизни',
        feature2Title: 'Полный цикл',
        feature2Text: 'От идеи до реализации — берём все заботы на себя',
        feature3Title: 'Гарантия качества',
        feature3Text: 'Работаем только с проверенными поставщиками и подрядчиками',
        feature4Title: 'Соблюдение сроков',
        feature4Text: 'Чёткое планирование и контроль на каждом этапе',
        contactLabel: 'Контакты',
        contactTitle: 'Начните свой проект сегодня',
        contactSubtitle: 'Оставьте заявку на бесплатную консультацию, и мы свяжемся с вами в течение 24 часов',
        addressLabel: 'Адрес',
        phoneLabel: 'Телефон',
        emailLabel: 'Email',
        formTitle: 'Получить консультацию',
        formName: 'Ваше имя',
        formPhone: 'Телефон',
        formRoom: 'Тип помещения',
        formMessage: 'О проекте',
        formSubmit: 'Отправить заявку',
        formNote: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности',
        footerAbout: 'О студии',
        footerServices: 'Услуги',
        footerPortfolio: 'Портфолио',
        footerContact: 'Контакты',
        footerRights: 'Все права защищены.'
    },

};

// Theme management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.add('active');
    }
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            body.setAttribute('data-theme', 'dark');
            themeToggle.classList.add('active');
        } else {
            currentTheme = 'light';
            body.removeAttribute('data-theme');
            themeToggle.classList.remove('active');
        }
        localStorage.setItem('theme', currentTheme);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll reveal animation with Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Lightbox functionality
const portfolioCards = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentGallery = [];
let currentImageIndex = 0;

function openLightbox(gallery, index = 0) {
    if (!gallery || !gallery.length || !lightbox || !lightboxImage) return;

    currentGallery = gallery;
    currentImageIndex = index;
    lightboxImage.src = currentGallery[currentImageIndex];
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');

    // Update counter
    if (currentSlideEl) currentSlideEl.textContent = currentImageIndex + 1;
    if (totalSlidesEl) totalSlidesEl.textContent = currentGallery.length;
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

function showNextImage() {
    if (!currentGallery.length || !lightboxImage) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    lightboxImage.src = currentGallery[currentImageIndex];
    if (currentSlideEl) currentSlideEl.textContent = currentImageIndex + 1;
}

function showPrevImage() {
    if (!currentGallery.length || !lightboxImage) return;
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    lightboxImage.src = currentGallery[currentImageIndex];
    if (currentSlideEl) currentSlideEl.textContent = currentImageIndex + 1;
}

portfolioCards.forEach((card) => {
    card.addEventListener('click', () => {
        const galleryData = card.getAttribute('data-gallery');

        if (galleryData) {
            try {
                const gallery = JSON.parse(galleryData);
                openLightbox(gallery, 0);
            } catch (error) {
                console.error('Error parsing gallery data:', error);
            }
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
});

// Form submission -> WhatsApp
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';
        const room = document.getElementById('room')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';

        const text = `Новая заявка с сайта ARCHI SPACE:

Имя: ${name}
Телефон: ${phone}
Тип помещения: ${room || 'Не указано'}
Сообщение: ${message || 'Не указано'}`;

        const whatsappUrl = `https://wa.me/996552886066?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, '_blank');

        contactForm.reset();

        const roomInput = document.getElementById('room');
        const selectedText = document.querySelector('.selected-text');

        if (roomInput) {
            roomInput.value = '';
        }

        if (selectedText) {
            selectedText.textContent = 'Выберите тип помещения';
        }
    });
}
// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
let mobileMenu = null;

function createMobileMenu() {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#about">О студии</a>
        <a href="#services">Услуги</a>
        <a href="#portfolio">Портфолио</a>
        <a href="#process">Этапы</a>
        <a href="#contact" class="nav-cta">Консультация</a>
    `;

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    document.body.appendChild(mobileMenu);
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (!mobileMenu) {
            createMobileMenu();
        }
        mobileMenu.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg img, .hero-bg video');
    const heroContent = document.querySelector('.hero-content');

    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.08) translateY(${scrolled * 0.22}px)`;
    }

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
        heroContent.style.opacity = `${Math.max(0, 1 - scrolled / 700)}`;
    }
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

// Preload images for smoother experience
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

const floatingContact = document.getElementById('floatingContact');
const floatingContactToggle = document.getElementById('floatingContactToggle');

if (floatingContact && floatingContactToggle) {
    let isDragging = false;
    let hasMoved = false;
    let ignoreNextClick = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    const dragThreshold = 10;

    const savedLeft = localStorage.getItem('floatingContactLeft');
    const savedTop = localStorage.getItem('floatingContactTop');

    if (savedLeft && savedTop) {
        floatingContact.style.left = savedLeft;
        floatingContact.style.top = savedTop;
        floatingContact.style.right = 'auto';
        floatingContact.style.bottom = 'auto';
    }

    function startDrag(clientX, clientY) {
        const rect = floatingContact.getBoundingClientRect();
        isDragging = true;
        hasMoved = false;
        startX = clientX;
        startY = clientY;
        initialLeft = rect.left;
        initialTop = rect.top;
    }

    function moveDrag(clientX, clientY) {
        if (!isDragging) return;

        const dx = clientX - startX;
        const dy = clientY - startY;

        if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
            hasMoved = true;
        }

        if (!hasMoved) return;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const buttonSize = floatingContactToggle.offsetWidth || 58;
        const maxLeft = window.innerWidth - buttonSize;
        const maxTop = window.innerHeight - buttonSize;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        floatingContact.style.left = `${newLeft}px`;
        floatingContact.style.top = `${newTop}px`;
        floatingContact.style.right = 'auto';
        floatingContact.style.bottom = 'auto';
    }

    function endDrag() {
        if (!isDragging) return;

        isDragging = false;

        if (hasMoved) {
            localStorage.setItem('floatingContactLeft', floatingContact.style.left);
            localStorage.setItem('floatingContactTop', floatingContact.style.top);
        }
    }

    function toggleFloatingMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (hasMoved) {
            hasMoved = false;
            return;
        }

        floatingContact.classList.toggle('active');
    }

    floatingContactToggle.addEventListener('click', (e) => {
        if (ignoreNextClick) {
            ignoreNextClick = false;
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        toggleFloatingMenu(e);
    });

    floatingContactToggle.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    floatingContactToggle.addEventListener('touchend', (e) => {
        if (!hasMoved) {
            ignoreNextClick = true;
            toggleFloatingMenu(e);

            setTimeout(() => {
                ignoreNextClick = false;
            }, 350);
        }

        endDrag();

        setTimeout(() => {
            hasMoved = false;
        }, 80);
    }, { passive: false });

    floatingContactToggle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mousemove', (e) => {
        moveDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', () => {
        endDrag();

        setTimeout(() => {
            hasMoved = false;
        }, 80);
    });

    document.addEventListener('click', (e) => {
        if (!floatingContact.contains(e.target)) {
            floatingContact.classList.remove('active');
        }
    });
}

// Кастомный dropdown для типа помещения
const roomSelect = document.getElementById('roomSelect');

if (roomSelect) {
    const trigger = roomSelect.querySelector('.custom-select-trigger');
    const valueText = roomSelect.querySelector('.custom-select-value');
    const hiddenInput = roomSelect.querySelector('#room');
    const options = roomSelect.querySelectorAll('.custom-select-option');

    trigger.addEventListener('click', () => {
        roomSelect.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            const text = option.textContent;

            hiddenInput.value = value;
            valueText.textContent = text;

            options.forEach(item => item.classList.remove('active'));
            option.classList.add('active');

            roomSelect.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!roomSelect.contains(e.target)) {
            roomSelect.classList.remove('open');
        }
    });
}
// ========================================
// МОБИЛЬНАЯ ОПТИМИЗАЦИЯ
// ========================================

// Блокировка scroll body при открытом dropdown на мобильных
const roomSelectForMobile = document.getElementById('roomSelect');
if (roomSelectForMobile) {
    const trigger = roomSelectForMobile.querySelector('.custom-select-trigger');
    const originalHandler = trigger.onclick;

    trigger.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = roomSelectForMobile.classList.contains('open') ? 'hidden' : '';
        }
    });

    // Восстанавливаем scroll при выборе опции
    roomSelectForMobile.querySelectorAll('.custom-select-option').forEach(option => {
        option.addEventListener('click', () => {
            document.body.style.overflow = '';
        });
    });
}

// Touch-оптимизация для portfolio items - показываем overlay при первом касании
if ('ontouchstart' in window) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        let touched = false;

        item.addEventListener('touchstart', function (e) {
            if (!touched) {
                touched = true;
                // Показываем overlay
                const overlay = this.querySelector('.portfolio-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            }
        }, { passive: true });
    });

    // Скрываем overlay при касании вне portfolio item
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.portfolio-item')) {
            document.querySelectorAll('.portfolio-overlay').forEach(overlay => {
                overlay.style.opacity = '';
            });
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.touched = false;
            });
        }
    }, { passive: true });
}

// Предотвращение zoom на iOS при фокусе input (форма контактов)
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(el => {
        el.style.fontSize = '16px';
    });
}

// Улучшение для мобильного меню - закрываем при скролле
let mobileMenuElement = null;
const checkMobileMenu = setInterval(() => {
    mobileMenuElement = document.querySelector('.mobile-menu');
    if (mobileMenuElement) {
        clearInterval(checkMobileMenu);

        window.addEventListener('scroll', () => {
            if (mobileMenuElement.classList.contains('active')) {
                mobileMenuElement.classList.remove('active');
            }
        }, { passive: true });
    }
}, 500);

// Проверка через 3 секунды и остановка
setTimeout(() => clearInterval(checkMobileMenu), 3000);

const videoCards = document.querySelectorAll('.before-after-card');
const videoLightbox = document.getElementById('videoLightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const videoLightboxClose = document.getElementById('videoLightboxClose');
const videoLightboxPrev = document.getElementById('videoLightboxPrev');
const videoLightboxNext = document.getElementById('videoLightboxNext');
const currentVideoSlide = document.getElementById('currentVideoSlide');
const totalVideoSlides = document.getElementById('totalVideoSlides');


let currentVideos = [];
let currentVideoIndex = 0;

function openVideoLightbox(videos, index = 0) {
    if (!videos || !videos.length || !videoLightbox || !lightboxVideo) return;

    currentVideos = videos;
    currentVideoIndex = index;

    lightboxVideo.src = currentVideos[currentVideoIndex];
    lightboxVideo.muted = true;
    lightboxVideo.load();
    videoLightbox.classList.add('active');
    document.body.classList.add('lightbox-open');

    if (currentVideoSlide) currentVideoSlide.textContent = currentVideoIndex + 1;
    if (totalVideoSlides) totalVideoSlides.textContent = currentVideos.length;

    const playVideo = lightboxVideo.play();
    if (playVideo && typeof playVideo.then === 'function') {
        playVideo.catch(() => { });
    }
    const startMusic = () => {
        beforeAfterMusic.play().catch((error) => {
            console.log('Music play blocked:', error);
        });
    };

    lightboxVideo.addEventListener('playing', startMusic, { once: true });
}

function closeVideoLightbox() {
    if (!videoLightbox || !lightboxVideo) return;

    lightboxVideo.pause();
    lightboxVideo.src = '';

    videoLightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

function showPrevVideo() {
    if (!currentVideos.length || !lightboxVideo) return;

    currentVideoIndex = (currentVideoIndex - 1 + currentVideos.length) % currentVideos.length;
    lightboxVideo.src = currentVideos[currentVideoIndex];
    lightboxVideo.load();

    if (currentVideoSlide) currentVideoSlide.textContent = currentVideoIndex + 1;

    lightboxVideo.play().catch(() => { });

    if (beforeAfterMusic) {
        beforeAfterMusic.pause();
        beforeAfterMusic.currentTime = 0;

        lightboxVideo.addEventListener('playing', () => {
            beforeAfterMusic.play().catch((error) => {
                console.log('Music play blocked:', error);
            });
        }, { once: true });
    }
}

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videosData = card.getAttribute('data-videos');
        if (!videosData) return;

        try {
            const videos = JSON.parse(videosData);
            openVideoLightbox(videos, 0);
        } catch (error) {
            console.error('Error parsing video data:', error);
        }
    });
});

if (videoLightboxClose) {
    videoLightboxClose.addEventListener('click', closeVideoLightbox);
}

if (videoLightboxNext) {
    videoLightboxNext.addEventListener('click', showNextVideo);
}

if (videoLightboxPrev) {
    videoLightboxPrev.addEventListener('click', showPrevVideo);
}

if (videoLightbox) {
    videoLightbox.addEventListener('click', (e) => {
        if (e.target === videoLightbox) {
            closeVideoLightbox();
        }
    });
}