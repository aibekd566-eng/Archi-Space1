(function () {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('theme') || 'light';

    function initTheme() {
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeToggle?.classList.add('active');
        } else {
            body.removeAttribute('data-theme');
            themeToggle?.classList.remove('active');
        }
    }

    themeToggle?.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        initTheme();
    });

    initTheme();

    const gallery = document.getElementById('projectGallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImageWrap = document.getElementById('lightboxImageWrap');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const projectCounter = document.getElementById('projectCounter');
    const lightboxThumbs = document.getElementById('lightboxThumbs');
    const autoplayBtn = document.getElementById('autoplayBtn');
    const layoutBtn = document.getElementById('layoutBtn');
    const projectSwitch = document.querySelector('[data-project-switch]');
    const projectMenuTrigger = document.querySelector('[data-project-menu-trigger]');
    const projectMenuLinks = Array.from(document.querySelectorAll('.project-menu-item[href]'));

    function closeProjectMenu() {
        if (!projectSwitch || !projectMenuTrigger) {
            return;
        }

        projectSwitch.classList.remove('is-open');
        projectMenuTrigger.setAttribute('aria-expanded', 'false');
    }

    function toggleProjectMenu() {
        if (!projectSwitch || !projectMenuTrigger) {
            return;
        }

        const isOpen = projectSwitch.classList.toggle('is-open');
        projectMenuTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    projectMenuTrigger?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleProjectMenu();
    });

    document.addEventListener('click', (event) => {
        if (projectSwitch && !projectSwitch.contains(event.target)) {
            closeProjectMenu();
        }
    });

    projectMenuLinks.forEach((link) => {
        link.addEventListener('click', closeProjectMenu);
    });

    if (!gallery || !lightbox || !lightboxImageWrap || !lightboxImage) {
        return;
    }

    const galleryItems = Array.from(gallery.querySelectorAll('.project-gallery-item'));
    const galleryImages = galleryItems
        .map((item) => item.querySelector('img'))
        .filter(Boolean);

    let currentIndex = 0;
    let autoplayInterval = null;
    let compactMode = false;
    let touchStartX = 0;
    let touchStartY = 0;
    const swipeThreshold = 56;

    function updateCounter() {
        const total = galleryImages.length || 0;
        const current = total ? currentIndex + 1 : 0;

        if (projectCounter) {
            projectCounter.textContent = `${current} / ${total}`;
        }

        if (currentSlideEl) {
            currentSlideEl.textContent = total ? current : 0;
        }

        if (totalSlidesEl) {
            totalSlidesEl.textContent = total;
        }
    }

    function renderLightboxThumbs() {
        if (!lightboxThumbs) {
            return;
        }

        lightboxThumbs.innerHTML = galleryImages
            .map((img, index) => {
                const activeClass = index === currentIndex ? ' active' : '';
                return `<button class="lightbox-thumb-btn${activeClass}" type="button" data-index="${index}" aria-label="Открыть фото ${index + 1}"><img src="${img.currentSrc || img.src}" alt="Миниатюра ${index + 1}"></button>`;
            })
            .join('');

        lightboxThumbs.querySelectorAll('.lightbox-thumb-btn').forEach((button) => {
            button.addEventListener('click', () => showImage(Number(button.dataset.index)));
        });

        lightboxThumbs.querySelector('.lightbox-thumb-btn.active')?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    function preloadNeighbors(index) {
        if (!galleryImages.length) {
            return;
        }

        [
            (index + 1) % galleryImages.length,
            (index - 1 + galleryImages.length) % galleryImages.length
        ].forEach((imageIndex) => {
            const image = new Image();
            image.src = galleryImages[imageIndex].src;
        });
    }

    function setLightboxBackground(src) {
        lightboxImageWrap.style.setProperty('--lightbox-image', `url('${src.replace(/'/g, "\\'")}')`);
    }

    function positionLightboxNav() {
        if (!lightbox.classList.contains('active') || !lightboxImage.complete || !lightboxImage.naturalWidth) {
            return;
        }

        const wrapRect = lightboxImageWrap.getBoundingClientRect();
        const imageRect = lightboxImage.getBoundingClientRect();

        if (!wrapRect.width || !imageRect.width) {
            return;
        }

        const fallbackGap = window.innerWidth <= 560 ? 10 : window.innerWidth <= 768 ? 12 : window.innerWidth <= 992 ? 14 : 16;
        const imageInset = window.innerWidth <= 560 ? 6 : window.innerWidth <= 768 ? 7 : window.innerWidth <= 992 ? 8 : 10;
        const leftSpace = Math.max(0, imageRect.left - wrapRect.left);
        const rightSpace = Math.max(0, wrapRect.right - imageRect.right);

        lightboxImageWrap.style.setProperty('--nav-left', `${Math.max(fallbackGap, leftSpace + imageInset)}px`);
        lightboxImageWrap.style.setProperty('--nav-right', `${Math.max(fallbackGap, rightSpace + imageInset)}px`);
    }

    function updateImageOrientation() {
        if (!lightboxImage.naturalWidth || !lightboxImage.naturalHeight) {
            return;
        }

        const portrait = lightboxImage.naturalHeight > lightboxImage.naturalWidth;
        lightboxImageWrap.classList.toggle('is-portrait', portrait);
        lightboxImageWrap.classList.toggle('is-landscape', !portrait);
        positionLightboxNav();
    }

    function showImage(index) {
        if (!galleryImages.length) {
            return;
        }

        currentIndex = (index + galleryImages.length) % galleryImages.length;

        const currentImage = galleryImages[currentIndex];
        const currentSrc = currentImage.currentSrc || currentImage.src;
        lightboxImage.src = currentSrc;
        lightboxImage.alt = currentImage.alt || `Изображение ${currentIndex + 1}`;

        setLightboxBackground(currentSrc);
        updateCounter();
        renderLightboxThumbs();
        preloadNeighbors(currentIndex);
        requestAnimationFrame(positionLightboxNav);
    }

    function openLightbox(index) {
        if (!galleryImages.length) {
            return;
        }

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        body.classList.add('lightbox-open');
        showImage(index);
        requestAnimationFrame(() => {
            window.setTimeout(positionLightboxNav, 340);
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        body.classList.remove('lightbox-open');
        touchStartX = 0;
        touchStartY = 0;
    }

    function nextImage() {
        showImage(currentIndex + 1);
    }

    function prevImage() {
        showImage(currentIndex - 1);
    }

    function toggleAutoplay() {
        if (!autoplayBtn) {
            return;
        }

        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
            autoplayBtn.classList.remove('active');
            return;
        }

        autoplayBtn.classList.add('active');
        autoplayInterval = window.setInterval(() => {
            if (!lightbox.classList.contains('active')) {
                openLightbox(currentIndex);
            } else {
                nextImage();
            }
        }, 2600);
    }

    function toggleLayout() {
        if (!layoutBtn) {
            return;
        }

        compactMode = !compactMode;
        gallery.classList.toggle('compact', compactMode);
        layoutBtn.classList.toggle('active', !compactMode);
    }

    gallery.addEventListener('click', (event) => {
        const item = event.target.closest('.project-gallery-item');

        if (!item || !gallery.contains(item)) {
            return;
        }

        const index = galleryItems.indexOf(item);

        if (index >= 0) {
            openLightbox(index);
        }
    });

    lightboxImage.addEventListener('load', updateImageOrientation);
    autoplayBtn?.addEventListener('click', toggleAutoplay);
    layoutBtn?.addEventListener('click', toggleLayout);
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxNext?.addEventListener('click', nextImage);
    lightboxPrev?.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    lightbox.addEventListener('transitionend', () => {
        if (lightbox.classList.contains('active')) {
            positionLightboxNav();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeProjectMenu();
        }

        if (!lightbox.classList.contains('active')) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'ArrowRight') {
            nextImage();
        }

        if (event.key === 'ArrowLeft') {
            prevImage();
        }
    });

    window.addEventListener('resize', () => {
        if (lightbox.classList.contains('active')) {
            positionLightboxNav();
        }
    });

    lightboxImageWrap.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1) {
            return;
        }

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    lightboxImageWrap.addEventListener('touchend', (event) => {
        if (!touchStartX || !touchStartY || event.changedTouches.length !== 1) {
            return;
        }

        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        touchStartX = 0;
        touchStartY = 0;

        if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
        }

        if (deltaX < 0) {
            nextImage();
        } else {
            prevImage();
        }
    }, { passive: true });

    updateCounter();
})();
