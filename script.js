import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCV3JL-5Z9w1H3xS-tfkMGZArTthXP8CDo",
    authDomain: "archispace2024-16cff.firebaseapp.com",
    projectId: "archispace2024-16cff",
    storageBucket: "archispace2024-16cff.firebasestorage.app",
    messagingSenderId: "707638942739",
    appId: "1:707638942739:web:3d5ddeed92a29f3c5c73e6",
    measurementId: "G-1H1TFS07JS"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const reviewsCollection = collection(db, "reviews");

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
    }
};

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'light';

function initTheme() {
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.add('active');
    }
}

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

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

const luxeGallery = document.getElementById('luxeGallery');
const luxeGalleryImage = document.getElementById('luxeGalleryImage');
const luxeGalleryThumbs = document.getElementById('luxeGalleryThumbs');
const luxeGalleryClose = document.getElementById('luxeGalleryClose');
const luxeGalleryPrev = document.getElementById('luxeGalleryPrev');
const luxeGalleryNext = document.getElementById('luxeGalleryNext');
const luxeGalleryCurrent = document.getElementById('luxeGalleryCurrent');
const luxeGalleryTotal = document.getElementById('luxeGalleryTotal');
const luxeGalleryViewport = document.getElementById('luxeGalleryViewport');

let luxeGalleryItems = [];
let luxeGalleryIndex = 0;
let luxeTouchStartX = 0;
let luxeTouchStartY = 0;
const luxeSwipeThreshold = 56;

function isLuxeGalleryActive() {
    return Boolean(luxeGallery?.classList.contains('active'));
}

function isVideoLightboxActive() {
    return Boolean(videoLightbox?.classList.contains('active'));
}

function syncOverlayState() {
    document.body.classList.toggle('overlay-open', isLuxeGalleryActive() || isVideoLightboxActive());
}

function preloadLuxeNeighbors(index) {
    if (!luxeGalleryItems.length) return;

    const nextIndex = (index + 1) % luxeGalleryItems.length;
    const prevIndex = (index - 1 + luxeGalleryItems.length) % luxeGalleryItems.length;

    [nextIndex, prevIndex].forEach((itemIndex) => {
        const image = new Image();
        image.src = luxeGalleryItems[itemIndex];
    });
}

function updateLuxeThumbs() {
    if (!luxeGalleryThumbs) return;

    luxeGalleryThumbs.querySelectorAll('.luxe-gallery__thumb').forEach((thumb, index) => {
        const isActive = index === luxeGalleryIndex;
        thumb.classList.toggle('is-active', isActive);
        thumb.setAttribute('aria-current', isActive ? 'true' : 'false');

        if (isActive) {
            thumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    });
}

function renderLuxeThumbs() {
    if (!luxeGalleryThumbs) return;

    luxeGalleryThumbs.innerHTML = luxeGalleryItems.map((src, index) => `
        <button
            type="button"
            class="luxe-gallery__thumb${index === luxeGalleryIndex ? ' is-active' : ''}"
            data-index="${index}"
            aria-label="Изображение ${index + 1}"
            aria-current="${index === luxeGalleryIndex ? 'true' : 'false'}"
        >
            <img src="${src}" alt="Thumbnail ${index + 1}">
        </button>
    `).join('');
}

function renderLuxeImage() {
    if (!luxeGalleryImage || !luxeGalleryItems.length) return;

    luxeGalleryImage.src = luxeGalleryItems[luxeGalleryIndex];
    luxeGalleryImage.alt = `Gallery image ${luxeGalleryIndex + 1}`;

    if (luxeGalleryCurrent) {
        luxeGalleryCurrent.textContent = String(luxeGalleryIndex + 1);
    }

    if (luxeGalleryTotal) {
        luxeGalleryTotal.textContent = String(luxeGalleryItems.length);
    }

    updateLuxeThumbs();
    preloadLuxeNeighbors(luxeGalleryIndex);
}

function showLuxeImage(nextIndex) {
    if (!luxeGalleryItems.length) return;

    luxeGalleryIndex = (nextIndex + luxeGalleryItems.length) % luxeGalleryItems.length;
    renderLuxeImage();
}

function showNextLuxeImage() {
    showLuxeImage(luxeGalleryIndex + 1);
}

function showPrevLuxeImage() {
    showLuxeImage(luxeGalleryIndex - 1);
}

function openLuxeGallery(gallery, index = 0) {
    if (!Array.isArray(gallery) || !gallery.length || !luxeGallery || !luxeGalleryImage) return;

    luxeGalleryItems = gallery.filter((item) => typeof item === 'string' && item.trim());

    if (!luxeGalleryItems.length) return;

    luxeGalleryIndex = Math.max(0, Math.min(index, luxeGalleryItems.length - 1));
    renderLuxeThumbs();
    renderLuxeImage();

    luxeGallery.classList.add('active');
    luxeGallery.setAttribute('aria-hidden', 'false');
    syncOverlayState();
}

function closeLuxeGallery() {
    if (!luxeGallery) return;

    luxeGallery.classList.remove('active');
    luxeGallery.setAttribute('aria-hidden', 'true');
    syncOverlayState();
}

document.addEventListener('click', (event) => {
    const galleryCard = event.target.closest('.portfolio-item[data-gallery]');
    if (!galleryCard) return;

    event.preventDefault();

    const galleryData = galleryCard.getAttribute('data-gallery');
    if (!galleryData) return;

    try {
        const gallery = JSON.parse(galleryData);
        openLuxeGallery(gallery, 0);
    } catch (error) {
        console.error('Error parsing gallery data:', error);
    }
});

if (luxeGalleryClose) {
    luxeGalleryClose.addEventListener('click', closeLuxeGallery);
}

if (luxeGalleryNext) {
    luxeGalleryNext.addEventListener('click', showNextLuxeImage);
}

if (luxeGalleryPrev) {
    luxeGalleryPrev.addEventListener('click', showPrevLuxeImage);
}

if (luxeGalleryThumbs) {
    luxeGalleryThumbs.addEventListener('click', (event) => {
        const thumb = event.target.closest('.luxe-gallery__thumb');
        if (!thumb) return;

        const thumbIndex = Number(thumb.dataset.index);
        if (Number.isNaN(thumbIndex)) return;

        showLuxeImage(thumbIndex);
    });
}

if (luxeGallery) {
    luxeGallery.addEventListener('click', (event) => {
        if (event.target === luxeGallery || event.target.hasAttribute('data-luxe-close')) {
            closeLuxeGallery();
        }
    });
}

if (luxeGalleryViewport) {
    luxeGalleryViewport.addEventListener('touchstart', (event) => {
        if (!isLuxeGalleryActive() || event.touches.length !== 1) return;

        luxeTouchStartX = event.touches[0].clientX;
        luxeTouchStartY = event.touches[0].clientY;
    }, { passive: true });

    luxeGalleryViewport.addEventListener('touchend', (event) => {
        if (!isLuxeGalleryActive() || !luxeTouchStartX || !luxeTouchStartY || event.changedTouches.length !== 1) return;

        const deltaX = event.changedTouches[0].clientX - luxeTouchStartX;
        const deltaY = event.changedTouches[0].clientY - luxeTouchStartY;

        luxeTouchStartX = 0;
        luxeTouchStartY = 0;

        if (Math.abs(deltaX) < luxeSwipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
        }

        if (deltaX < 0) {
            showNextLuxeImage();
        } else {
            showPrevLuxeImage();
        }
    }, { passive: true });
}

document.addEventListener('keydown', (event) => {
    if (isLuxeGalleryActive()) {
        if (event.key === 'Escape') closeLuxeGallery();
        if (event.key === 'ArrowRight') showNextLuxeImage();
        if (event.key === 'ArrowLeft') showPrevLuxeImage();
        return;
    }

    if (isVideoLightboxActive() && event.key === 'Escape') {
        closeVideoLightbox();
    }
});


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
        const selectedText = document.querySelector('.custom-select-value');
        const roomOptions = document.querySelectorAll('#roomSelect .custom-select-option');

        if (roomInput) {
            roomInput.value = '';
        }

        roomOptions.forEach(option => option.classList.remove('active'));
        roomOptions[0]?.classList.add('active');

        if (selectedText) {
            selectedText.textContent = 'Выберите тип помещения';
        }
    });
}

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(targetSelector);
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

window.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

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

const roomSelectForMobile = document.getElementById('roomSelect');
if (roomSelectForMobile) {
    const trigger = roomSelectForMobile.querySelector('.custom-select-trigger');
    trigger.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = roomSelectForMobile.classList.contains('open') ? 'hidden' : '';
        }
    });

    roomSelectForMobile.querySelectorAll('.custom-select-option').forEach(option => {
        option.addEventListener('click', () => {
            document.body.style.overflow = '';
        });
    });
}

if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.portfolio-overlay').forEach(overlay => {
                overlay.style.opacity = '';
            });

            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
    });

    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.portfolio-item')) {
            document.querySelectorAll('.portfolio-overlay').forEach(overlay => {
                overlay.style.opacity = '';
            });
        }
    }, { passive: true });
}

if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(el => {
        el.style.fontSize = '16px';
    });
}

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

function showNextVideo() {
    if (!currentVideos.length || !lightboxVideo) return;

    currentVideoIndex = (currentVideoIndex + 1) % currentVideos.length;
    lightboxVideo.src = currentVideos[currentVideoIndex];
    lightboxVideo.load();

    if (currentVideoSlide) currentVideoSlide.textContent = currentVideoIndex + 1;

    lightboxVideo.play().catch(() => { });
}

function openVideoLightbox(videos, index = 0) {
    if (!videos || !videos.length || !videoLightbox || !lightboxVideo) return;

    currentVideos = videos;
    currentVideoIndex = index;

    lightboxVideo.src = currentVideos[currentVideoIndex];
    lightboxVideo.muted = true;
    lightboxVideo.load();
    videoLightbox.classList.add('active');
document.body.classList.add('overlay-open');

    if (currentVideoSlide) currentVideoSlide.textContent = currentVideoIndex + 1;
    if (totalVideoSlides) totalVideoSlides.textContent = currentVideos.length;

    const playVideo = lightboxVideo.play();
    if (playVideo && typeof playVideo.then === 'function') {
        playVideo.catch(() => { });
    }
}

function closeVideoLightbox() {
    if (!videoLightbox || !lightboxVideo) return;

    lightboxVideo.pause();
    lightboxVideo.src = '';

    videoLightbox.classList.remove('active');
    document.body.classList.remove('overlay-open');
}

function showPrevVideo() {
    if (!currentVideos.length || !lightboxVideo) return;

    currentVideoIndex = (currentVideoIndex - 1 + currentVideos.length) % currentVideos.length;
    lightboxVideo.src = currentVideos[currentVideoIndex];
    lightboxVideo.load();

    if (currentVideoSlide) currentVideoSlide.textContent = currentVideoIndex + 1;

    lightboxVideo.play().catch(() => { });
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

const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');
const loadMoreReviewsBtn = document.getElementById('loadMoreReviewsBtn');

const REVIEWS_PAGE_SIZE = 6;
let reviewsCache = [];
let hasMoreReviews = true;

const LOCAL_REVIEWS_KEY = 'archispace_local_reviews';

function getSavedLocalReviews() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_REVIEWS_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveLocalReviews(reviews) {
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
}

function addReviewToLocalBackup(review) {
    const saved = getSavedLocalReviews();

    const normalizedReview = {
        id: review.id,
        name: review.name,
        rating: review.rating,
        text: review.text,
        createdAt: review.createdAt instanceof Date
            ? review.createdAt.toISOString()
            : review.createdAt,
        isApproved: true
    };

    const updated = [normalizedReview, ...saved].slice(0, 30);
    saveLocalReviews(updated);
}

function removeReviewFromLocalBackup(localId) {
    const saved = getSavedLocalReviews();
    const updated = saved.filter(item => item.id !== localId);
    saveLocalReviews(updated);
}

function normalizeReviewDate(review) {
    return {
        ...review,
        createdAt: review.createdAt ? new Date(review.createdAt) : new Date()
    };
}

function mergeFirebaseAndLocalReviews(firebaseReviews, localReviews) {
    const normalizedLocal = localReviews.map(normalizeReviewDate);
    const merged = [...firebaseReviews];

    normalizedLocal.forEach(localReview => {
        const alreadyExists = merged.some(item =>
            item.name === localReview.name &&
            item.text === localReview.text &&
            Number(item.rating) === Number(localReview.rating)
        );

        if (!alreadyExists) {
            merged.push(localReview);
        }
    });

    merged.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
    });

    return merged;
}

function getStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatReviewDate(value) {
    if (!value) return 'Недавно';

    try {
        const date = value.toDate ? value.toDate() : new Date(value);
        return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    } catch (error) {
        return 'Недавно';
    }
}

function createReviewCard(review) {
    return `
        <div class="review-card">
            <div class="review-head">
                <div>
                    <h3 class="review-name">${escapeHtml(review.name)}</h3>
                    <span class="review-date">${escapeHtml(formatReviewDate(review.createdAt))}</span>
                </div>
                <div class="review-rating">${getStars(Number(review.rating))}</div>
            </div>
            <p class="review-text">${escapeHtml(review.text)}</p>
        </div>
    `;
}

function insertReviewToTop(review) {
    reviewsCache = [review, ...reviewsCache].slice(0, 6);
    renderReviewsList();
    updateLoadMoreButton();
}

function renderReviewsList() {
    if (!reviewsList) return;

    if (!reviewsCache.length) {
        reviewsList.innerHTML = `
            <div class="review-empty">
                Пока отзывов нет. Будьте первым, кто оставит отзыв.
            </div>
        `;
        return;
    }

    reviewsList.innerHTML = reviewsCache.map(createReviewCard).join('');
}

function updateLoadMoreButton() {
    if (!loadMoreReviewsBtn) return;
    loadMoreReviewsBtn.style.display = hasMoreReviews ? 'inline-flex' : 'none';
}

function getReviewDate(review) {
    const raw = review.createdAt || review.createdat || null;
    if (!raw) return new Date(0);

    try {
        return raw.toDate ? raw.toDate() : new Date(raw);
    } catch {
        return new Date(0);
    }
}

async function loadInitialReviews() {
    try {
        const snapshot = await getDocs(reviewsCollection);

        const firebaseReviews = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const localReviews = getSavedLocalReviews();

        reviewsCache = mergeFirebaseAndLocalReviews(firebaseReviews, localReviews)
            .sort((a, b) => getReviewDate(b) - getReviewDate(a))
            .slice(0, REVIEWS_PAGE_SIZE);

        hasMoreReviews = mergeFirebaseAndLocalReviews(firebaseReviews, localReviews).length > REVIEWS_PAGE_SIZE;

        renderReviewsList();
        updateLoadMoreButton();
    } catch (error) {
        console.error("Ошибка загрузки отзывов:", error);

        const localReviews = getSavedLocalReviews();

        if (localReviews.length) {
            reviewsCache = localReviews
                .map(normalizeReviewDate)
                .sort((a, b) => getReviewDate(b) - getReviewDate(a))
                .slice(0, REVIEWS_PAGE_SIZE);

            renderReviewsList();
            updateLoadMoreButton();
            return;
        }

        if (reviewsList) {
            reviewsList.innerHTML = `
                <div class="review-empty">
                    Не удалось загрузить отзывы. Проверь Firebase настройки.
                </div>
            `;
        }
    }
}

if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const reviewName = document.getElementById('reviewName');
        const reviewRating = document.getElementById('reviewRating');
        const reviewText = document.getElementById('reviewText');

        if (!reviewName || !reviewRating || !reviewText) return;

        const name = reviewName.value.trim();
        const rating = Number(reviewRating.value);
        const text = reviewText.value.trim();

        if (!name || !text) return;
        if (text.length > 350) {
            alert('Отзыв слишком длинный. Максимум 250 символов.');
            return;
        }

        const submitButton = reviewForm.querySelector('.submit-btn');
        if (submitButton?.disabled) return;

        const newReview = {
            id: `local-${Date.now()}`,
            name,
            rating,
            text,
            createdAt: new Date(),
            isApproved: true
        };

        addReviewToLocalBackup(newReview);

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
        }

        insertReviewToTop(newReview);
        reviewForm.reset();

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить отзыв';
        }

        try {
            await addDoc(reviewsCollection, {
                name,
                rating,
                text,
                createdAt: new Date(),
                isApproved: true
            });

            removeReviewFromLocalBackup(newReview.id);
        } catch (error) {
            reviewsCache = reviewsCache.filter(item => item.id !== newReview.id);
            renderReviewsList();
            updateLoadMoreButton();

            alert('Не удалось отправить отзыв. Проверь Firebase настройки.');
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialReviews();
});
