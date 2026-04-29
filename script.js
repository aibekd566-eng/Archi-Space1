const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let currentTheme = 'light';

try {
    currentTheme = localStorage.getItem('theme') || 'light';
} catch (error) {
    currentTheme = 'light';
}

function initTheme() {
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle?.classList.add('active');
    } else {
        body.removeAttribute('data-theme');
        themeToggle?.classList.remove('active');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            body.setAttribute('data-theme', 'dark');
            themeToggle?.classList.add('active');
        } else {
            currentTheme = 'light';
            body.removeAttribute('data-theme');
            themeToggle?.classList.remove('active');
        }
        try {
            localStorage.setItem('theme', currentTheme);
        } catch (error) { }
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
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
} else {
    revealElements.forEach(el => el.classList.add('active'));
}

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

const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s'-]+$/;
const FORBIDDEN_WORDS = [
    'хуй', 'хуе', 'хуё', 'пизд', 'еб', 'ёб', 'бля', 'сука', 'нах', 'мраз',
    'долбо', 'мудак', 'гандон', 'шлюх', 'секс', 'fuck', 'shit', 'bitch', 'asshole'
];
const FORM_MIN_TIME_MS = 3000;
const formStartTimes = new WeakMap();
const touchedFields = new WeakSet();

function sanitizeNameInput(input) {
    if (!input) return '';
    const sanitized = input.value.replace(/[^A-Za-zА-Яа-яЁё\s'-]/g, '').replace(/\s{2,}/g, ' ');
    if (input.value !== sanitized) {
        input.value = sanitized;
    }
    return sanitized.trim();
}

function validateName(value) {
    const cleanValue = (value || '').trim();
    if (!cleanValue) return 'Введите имя';
    if (cleanValue.length < 2) return 'Введите имя';
    if (!NAME_PATTERN.test(cleanValue)) return 'Только буквы';
    return '';
}

function hasForbiddenWords(value) {
    const normalized = (value || '').toLowerCase().replace(/[^a-zа-яё]+/g, ' ');
    return FORBIDDEN_WORDS.some((word) => normalized.includes(word));
}

function getFieldErrorElement(field) {
    if (!field) return null;
    const group = field.closest('.form-group') || field.parentElement;
    if (!group) return null;

    let error = group.querySelector('.form-error-message');
    if (!error) {
        error = document.createElement('div');
        error.className = 'form-error-message';
        error.setAttribute('aria-live', 'polite');
        group.appendChild(error);
    }

    return error;
}

function setFieldError(field, message) {
    if (!field) return false;
    const error = getFieldErrorElement(field);
    field.classList.add('field-error');
    field.setAttribute?.('aria-invalid', 'true');
    if (error) {
        error.textContent = message;
        error.classList.add('active');
    }
    return false;
}

function clearFieldError(field) {
    if (!field) return;
    const error = getFieldErrorElement(field);
    field.classList.remove('field-error');
    field.removeAttribute?.('aria-invalid');
    if (error) {
        error.classList.remove('active');
        error.textContent = '';
    }
}

function setFormSuccess(form, message) {
    if (!form) return;
    let success = form.querySelector('.form-success-message');
    if (!success) {
        success = document.createElement('div');
        success.className = 'form-success-message';
        success.setAttribute('aria-live', 'polite');
        form.appendChild(success);
    }
    success.textContent = message;
    success.classList.add('active');
}

function clearFormSuccess(form) {
    form?.querySelector('.form-success-message')?.classList.remove('active');
}

function formatPhoneInput(input) {
    if (!input) return '';
    let digits = input.value.replace(/\D/g, '');
    if (digits.startsWith('996')) digits = digits.slice(3);
    if (digits.startsWith('0')) digits = digits.slice(1);
    digits = digits.slice(0, 9);

    let value = '+996';
    if (digits.length) value += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) value += ')';
    if (digits.length > 3) value += ` ${digits.slice(3, 6)}`;
    if (digits.length > 6) value += `-${digits.slice(6, 9)}`;

    input.value = value;
    return digits;
}

function setButtonState(button, state, text) {
    if (!button) return;
    button.classList.toggle('is-loading', state === 'loading');
    button.classList.toggle('is-success', state === 'success');
    button.disabled = state === 'loading' || state === 'success';
    if (text) button.textContent = text;
}

function updateFloatingLabel(target) {
    const form = target?.matches?.('form') ? target : target?.closest?.('form');
    form?.querySelectorAll('.form-field, .floating-field').forEach((group) => {
        const field = group.querySelector('input, textarea, select');
        group.classList.toggle('has-value', Boolean(field?.value?.trim()));
        group.classList.toggle('is-focused', field === document.activeElement);
    });
}

function updateFloatingState(form) {
    updateFloatingLabel(form);
}

function validateField(field, force = false) {
    if (!field) return true;

    const shouldShowError = force || touchedFields.has(field) || field.classList.contains('field-error');
    let message = '';

    if (field.matches('#name')) {
        sanitizeNameInput(field);
        message = validateName(field.value);
    }

    if (!message && field.matches('#phone')) {
        const phoneDigits = formatPhoneInput(field);
        if (phoneDigits.length !== 9) message = 'Введите телефон';
    }

    if (!message && field.required && !field.value.trim()) {
        message = 'Заполните поле';
    }

    if (!message && field.matches('#name, #message') && hasForbiddenWords(field.value)) {
        message = 'Уберите грубые слова';
    }

    if (message) {
        if (shouldShowError) setFieldError(field, message);
        return false;
    }

    clearFieldError(field);
    return true;
}

function validateFormBeforeSubmit(form, config) {
    if (!form) return false;
    clearFormSuccess(form);

    const elapsed = Date.now() - (formStartTimes.get(form) || Date.now());
    const honeypot = form.querySelector('.hp-field');
    if (honeypot?.value || elapsed < FORM_MIN_TIME_MS) {
        const firstField = form.querySelector('input:not(.hp-field), textarea');
        setFieldError(firstField, 'Попробуйте ещё раз');
        return false;
    }

    let isValid = true;
    const fields = [config.nameField, config.phoneField, ...(config.textFields || [])].filter(Boolean);
    fields.forEach((field) => {
        touchedFields.add(field);
        if (!validateField(field, true)) isValid = false;
    });

    return isValid;
}

function initSmartForms() {
    const forms = [document.getElementById('contactForm')].filter(Boolean);
    forms.forEach((form) => {
        formStartTimes.set(form, Date.now());
        updateFloatingLabel(form);

        form.addEventListener('focusin', (event) => {
            updateFloatingLabel(event.target);
        });

        form.addEventListener('focusout', (event) => {
            const field = event.target;
            if (!(field instanceof HTMLElement) || field.matches('.hp-field')) return;
            touchedFields.add(field);
            validateField(field, true);
            updateFloatingLabel(field);
        });

        form.addEventListener('input', (event) => {
            const field = event.target;
            if (!(field instanceof HTMLElement)) return;

            if (field.matches('#name')) {
                sanitizeNameInput(field);
            }

            if (field.matches('#phone')) {
                const digits = formatPhoneInput(field);
                if (digits.length === 9) {
                    clearFieldError(field);
                    document.querySelector('#roomSelect .custom-select-trigger')?.focus();
                }
            }

            if (field.matches('#name, #phone, #message')) {
                validateField(field, false);
            }

            updateFloatingLabel(form);
        });

        form.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' || event.target?.tagName === 'TEXTAREA') return;
            const fields = Array.from(form.querySelectorAll('input:not(.hp-field), textarea, select, .custom-select-trigger'));
            const index = fields.indexOf(event.target);
            if (index >= 0 && fields[index + 1]) {
                event.preventDefault();
                fields[index + 1].focus();
            }
        });
    });
}

initSmartForms();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameField = document.getElementById('name');
        const phoneField = document.getElementById('phone');
        const messageField = document.getElementById('message');
        const submitButton = contactForm.querySelector('.submit-btn');

        if (!validateFormBeforeSubmit(contactForm, {
            nameField,
            phoneField,
            textFields: [messageField]
        })) {
            return;
        }

        const name = nameField?.value.trim() || '';
        const phone = phoneField?.value.trim() || '';
        const room = document.getElementById('room')?.value.trim() || '';
        const message = messageField?.value.trim() || '';

        setButtonState(submitButton, 'loading', 'Отправляем...');

        const text = `Новая заявка с сайта ARCHISPACE:

Имя: ${name}
Телефон: ${phone}
Тип помещения: ${room || 'Не указано'}
Сообщение: ${message || 'Не указано'}`;

        const whatsappUrl = `https://wa.me/996555560204?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

        setButtonState(submitButton, 'success', 'Заявка отправлена');
        setFormSuccess(contactForm, 'Спасибо! Мы с вами свяжемся  ');

        window.setTimeout(() => {
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

            clearFormSuccess(contactForm);
            updateFloatingState(contactForm);
            setButtonState(submitButton, 'idle', 'Получить бесплатную консультацию');
            formStartTimes.set(contactForm, Date.now());
        }, 1800);
    });
}
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
let mobileMenu = null;

function createMobileMenu() {
    const navbarLogo = document.querySelector('.navbar .logo');
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const regularLinks = navLinks.filter(link => !link.classList.contains('nav-cta'));
    const ctaLink = navLinks.find(link => link.classList.contains('nav-cta'));

    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');

    const panel = document.createElement('div');
    panel.className = 'mobile-menu__panel';

    const header = document.createElement('div');
    header.className = 'mobile-menu__header';

    const brand = document.createElement('div');
    brand.className = 'mobile-menu__brand';

    if (navbarLogo) {
        const logoClone = navbarLogo.cloneNode(true);
        logoClone.removeAttribute('href');
        logoClone.classList.add('mobile-menu__brand-link');
        brand.appendChild(logoClone);
    } else {
        brand.innerHTML = '<div class="mobile-menu__brand-fallback"><span class="mobile-menu__brand-title">ARCHISPACE</span><span class="mobile-menu__brand-subtitle">STUDIO INTERIOR DESIGN</span></div>';
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'mobile-menu__close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '<span></span><span></span>';

    const decor = document.createElement('div');
    decor.className = 'mobile-menu__decor';
    decor.textContent = 'ARCHISPACE';

    const nav = document.createElement('div');
    nav.className = 'mobile-menu__nav';

    regularLinks.forEach((link) => {
        const clone = link.cloneNode(true);
        clone.classList.remove('nav-cta');
        nav.appendChild(clone);
    });

    if (ctaLink) {
        nav.appendChild(ctaLink.cloneNode(true));
    }

    header.appendChild(brand);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    panel.appendChild(decor);
    panel.appendChild(nav);
    mobileMenu.appendChild(panel);

    const syncMobileMenuState = () => {
        const isActive = mobileMenu.classList.contains('active');
        mobileMenu.setAttribute('aria-hidden', String(!isActive));
        document.body.classList.toggle('mobile-menu-open', isActive);
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', String(isActive));
        }
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        syncMobileMenuState();
    };

    closeBtn.addEventListener('click', closeMobileMenu);

    mobileMenu.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    const mobileMenuObserver = new MutationObserver(syncMobileMenuState);
    mobileMenuObserver.observe(mobileMenu, {
        attributes: true,
        attributeFilter: ['class']
    });

    syncMobileMenuState();
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
    enhanceMediaPerformance();
});

function enhanceMediaPerformance() {
    document.querySelectorAll('img').forEach((img, index) => {
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }

        if (index > 0 && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        if (img.getAttribute('src') || img.dataset.src) {
            img.addEventListener('error', () => {
                const card = img.closest('.portfolio-item, .before-after-card');
                if (card) {
                    card.hidden = true;
                    card.setAttribute('aria-hidden', 'true');
                    return;
                }

                img.hidden = true;
            }, { once: true });
        }
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

const floatingContact = document.getElementById('floatingContact');
const floatingContactToggle = document.getElementById('floatingContactToggle');

if (floatingContact && floatingContactToggle) {
    try {
        localStorage.removeItem('floatingContactLeft');
        localStorage.removeItem('floatingContactTop');
    } catch (error) { }

    floatingContact.style.left = '';
    floatingContact.style.top = '';
    floatingContact.style.right = '';
    floatingContact.style.bottom = '';

    function toggleFloatingMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        floatingContact.classList.toggle('active');
    }

    floatingContactToggle.addEventListener('click', toggleFloatingMenu);

    document.addEventListener('click', (e) => {
        if (!floatingContact.contains(e.target)) {
            floatingContact.classList.remove('active');
        }
    });
}

const customSelects = document.querySelectorAll('.custom-select');

customSelects.forEach((select) => {
    const trigger = select.querySelector('.custom-select-trigger');
    const valueText = select.querySelector('.custom-select-value');
    const hiddenInput = select.querySelector('input[type="hidden"]');
    const options = select.querySelectorAll('.custom-select-option');

    trigger?.addEventListener('click', () => {
        const willOpen = !select.classList.contains('open');
        customSelects.forEach((item) => {
            item.classList.remove('open');
            item.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
        });
        select.classList.toggle('open', willOpen);
        trigger.setAttribute('aria-expanded', String(willOpen));
    });

    options.forEach((option) => {
        option.addEventListener('click', () => {
            const value = option.dataset.value || '';
            const text = option.textContent.trim();

            if (hiddenInput) {
                hiddenInput.value = value;
                hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            if (valueText) {
                valueText.textContent = text;
            }

            options.forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
            });
            option.classList.add('active');
            option.setAttribute('aria-selected', 'true');

            select.classList.remove('open');
            trigger?.setAttribute('aria-expanded', 'false');
        });
    });
});

document.addEventListener('click', (event) => {
    customSelects.forEach((select) => {
        if (!select.contains(event.target)) {
            select.classList.remove('open');
            select.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
        }
    });
});

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
`r`
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



