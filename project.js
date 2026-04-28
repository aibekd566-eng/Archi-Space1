(function () {
    const body = document.body;
    body.classList.add('project-body');

    const themeToggle = document.getElementById('themeToggle');
    const lightbox = document.getElementById('lightbox');
    const lightboxShell = document.querySelector('.lightbox-shell');
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
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const thumbsToggleBtn = document.getElementById('thumbsToggleBtn');
    const projectSwitch = document.querySelector('[data-project-switch]');
    const projectMenuTrigger = document.querySelector('[data-project-menu-trigger]');
    const projectMenuLinks = Array.from(document.querySelectorAll('.project-menu-item[href]'));
    const PROJECT_GALLERIES = {
        living: {
            id: 'livingGallery',
            route: 'living',
            prefixes: [
                'portfolio/kitchen-living/',
                'гардероб 2/кухня гостиная/',
                'гардероб 2/кужня гостиная/',
                'гардероб 2/гостиная/',
                'гардероб 2/гостиная 2/',
                'гардероб 2/гостинная 2/',
                'гардероб 2/гостиная2/',
                'гардероб 2/гостинная2/',
                'гардероб 2/кухня/',
                'гардероб 2/кухня2/',
                'гардероб 2/кухня3/'
            ]
        },
        bathroom: {
            id: 'bathroomGallery',
            route: 'bathroom',
            prefixes: [
                'portfolio/bathroom/',
                'гардероб 2/санузел/',
                'гардероб 2/санузел 2/',
                'гардероб 2/санузел3/',
                'гардероб 2/санузел4/',
                'гардероб 2/санузел5/'
            ]
        },
        bedroom: {
            id: 'bedroomGallery',
            route: 'bedroom',
            prefixes: [
                'portfolio/Bedroom/',
                'гардероб 2/спальня/',
                'гардероб 2/спальня 2/',
                'гардероб 2/спальня3/',
                'гардероб 2/спальня4/',
                'гардероб 2/спальня5/',
                'гардероб 2/спальня6/',
                'гардероб 2/спальня7/',
                'гардероб 2/спальня8/'
            ]
        },
        hallway: {
            id: 'hallwayGallery',
            route: 'hallway',
            prefixes: [
                'portfolio/Hallway/',
                'гардероб 2/прихожка/',
                'гардероб 2/прихожка 2/',
                'гардероб 2/прихожка3/'
            ]
        },
        wardrobe: {
            id: 'wardrobeGallery',
            route: 'wardrobe',
            prefixes: [
                'гардероб 2/гардероб/',
                'гардероб 2/гардероб 2/',
                'гардероб 2/гардероб3/'
            ]
        },
        kids: {
            id: 'kidsGallery',
            route: 'kids',
            prefixes: [
                'portfolio/kids/',
                'гардероб 2/детская/',
                'гардероб 2/детская 2/'
            ]
        },
        commerce: {
            id: 'commerceGallery',
            route: 'commerce',
            prefixes: [
                'гардероб 2/стоматология/'
            ]
        }
    };
    const galleryLookupById = Object.fromEntries(
        Object.entries(PROJECT_GALLERIES).map(([key, gallery]) => [gallery.id, key])
    );
    const pathnameLookup = Object.entries(PROJECT_GALLERIES).map(([key, gallery]) => [gallery.route, key]);
    let currentTheme = 'light';
    let autoplayInterval = null;
    let currentIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let galleryItems = [];
    let galleryImages = [];
    const swipeThreshold = 56;

    try {
        currentTheme = localStorage.getItem('theme') || 'light';
    } catch (error) {
        currentTheme = 'light';
    }

    function initTheme() {
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeToggle?.classList.add('active');
            return;
        }

        body.removeAttribute('data-theme');
        themeToggle?.classList.remove('active');
    }

    themeToggle?.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        try {
            localStorage.setItem('theme', currentTheme);
        } catch (error) { }
        initTheme();
    });

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

    function resolveGalleryElement() {
        const matchedPath = pathnameLookup.find(([needle]) => window.location.pathname.includes(needle));

        if (matchedPath) {
            const id = Object.keys(galleryLookupById).find((key) => galleryLookupById[key] === matchedPath[1]);
            if (id) {
                return document.getElementById(id);
            }
        }

        return document.querySelector('.project-gallery[id]');
    }

    function resolveGalleryKey(gallery) {
        if (!gallery) {
            return '';
        }

        if (gallery.dataset.gallery) {
            return gallery.dataset.gallery;
        }

        if (galleryLookupById[gallery.id]) {
            return galleryLookupById[gallery.id];
        }

        const matchedPath = pathnameLookup.find(([needle]) => window.location.pathname.includes(needle));
        return matchedPath ? matchedPath[1] : '';
    }

    function createGalleryButton(item, index, galleryKey) {
        const button = document.createElement('button');
        const image = document.createElement('img');
        button.className = 'project-gallery-item';
        button.type = 'button';
        button.setAttribute('aria-label', `Открыть фото ${index + 1}`);

        image.src = item.src;
        image.alt = item.alt || `${galleryKey} ${index + 1}`;
        image.loading = index === 0 ? 'eager' : 'lazy';
        image.decoding = 'async';

        button.appendChild(image);
        return button;
    }

    function normalizeGallerySrc(src) {
        return String(src || '').replace(/\\/g, '/').replace(/^\.?\//, '');
    }

    function isAllowedGalleryItem(item, galleryKey) {
        const src = normalizeGallerySrc(item?.src);
        const prefixes = PROJECT_GALLERIES[galleryKey]?.prefixes || [];

        if (!src || !prefixes.length) {
            return false;
        }

        return prefixes.some((prefix) => src.startsWith(prefix));
    }

    function getSafeGalleryData(data, galleryKey) {
        const seen = new Set();

        return data.filter((item) => {
            const src = normalizeGallerySrc(item?.src);

            if (!isAllowedGalleryItem(item, galleryKey) || seen.has(src)) {
                return false;
            }

            item.src = src;
            seen.add(src);
            return true;
        });
    }

    function renderGallery(gallery, galleryKey) {
        const data = window.ARCHISPACE_GALLERIES?.[galleryKey];

        if (!gallery || !Array.isArray(data) || !data.length) {
            return false;
        }

        const safeData = getSafeGalleryData(data, galleryKey);

        const fragment = document.createDocumentFragment();
        safeData.forEach((item, index) => {
            fragment.appendChild(createGalleryButton(item, index, galleryKey));
        });

        gallery.replaceChildren(fragment);
        return Boolean(safeData.length);
    }

    function collectGalleryItems(gallery) {
        galleryItems = Array.from(gallery.querySelectorAll('.project-gallery-item'));
        galleryImages = galleryItems
            .map((item) => item.querySelector('img'))
            .filter(Boolean);
    }

    function updateCounter() {
        const total = galleryImages.length || 0;
        const current = total ? currentIndex + 1 : 0;

        if (projectCounter) {
            projectCounter.textContent = `${current} / ${total}`;
        }

        if (currentSlideEl) {
            currentSlideEl.textContent = current;
        }

        if (totalSlidesEl) {
            totalSlidesEl.textContent = total;
        }
    }

    function renderLightboxThumbs() {
        if (!lightboxThumbs) {
            return;
        }

        const fragment = document.createDocumentFragment();

        galleryImages.forEach((img, index) => {
            const button = document.createElement('button');
            const thumb = document.createElement('img');

            button.className = `lightbox-thumb-btn${index === currentIndex ? ' active' : ''}`;
            button.type = 'button';
            button.dataset.index = String(index);
            button.setAttribute('aria-label', `Открыть фото ${index + 1}`);

            thumb.src = img.currentSrc || img.src;
            thumb.alt = `Миниатюра ${index + 1}`;
            thumb.loading = 'lazy';
            thumb.decoding = 'async';

            button.appendChild(thumb);
            fragment.appendChild(button);
        });

        lightboxThumbs.replaceChildren(fragment);

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
            image.src = galleryImages[imageIndex].currentSrc || galleryImages[imageIndex].src;
        });
    }

    function setLightboxBackground(src) {
        if (!lightboxImageWrap) {
            return;
        }

        lightboxImageWrap.style.setProperty('--lightbox-image', `url('${src.replace(/'/g, "\\'")}')`);
    }

    function updateImageOrientation() {
        if (!lightboxImageWrap || !lightboxImage.naturalWidth || !lightboxImage.naturalHeight) {
            return;
        }

        const portrait = lightboxImage.naturalHeight >= lightboxImage.naturalWidth * 0.78;
        lightboxImageWrap.classList.toggle('is-portrait', portrait);
        lightboxImageWrap.classList.toggle('is-landscape', !portrait);
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
    }

    function openLightbox(index) {
        if (!galleryImages.length || !lightbox) {
            return;
        }

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        body.classList.add('lightbox-open');
        showImage(index);

        thumbsToggleBtn?.classList.add('active');
        fullscreenBtn?.classList.remove('active');
        lightbox.classList.remove('thumbs-hidden');
    }

    function stopAutoplay() {
        if (!autoplayInterval) {
            return;
        }

        clearInterval(autoplayInterval);
        autoplayInterval = null;
        autoplayBtn?.classList.remove('active');
    }

    function closeLightbox() {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        body.classList.remove('lightbox-open');
        lightbox.classList.remove('thumbs-hidden');

        stopAutoplay();
        fullscreenBtn?.classList.remove('active');
        thumbsToggleBtn?.classList.add('active');
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
            stopAutoplay();
            return;
        }

        autoplayBtn.classList.add('active');
        autoplayInterval = window.setInterval(() => {
            if (!lightbox.classList.contains('active')) {
                openLightbox(currentIndex);
                return;
            }

            nextImage();
        }, 2600);
    }

    function toggleLayout() {
        if (!layoutBtn || !galleryElement) {
            return;
        }

        const compact = galleryElement.classList.toggle('compact');
        layoutBtn.classList.toggle('active', compact);
    }

    function toggleFullscreen() {
        const target = lightboxShell || lightboxImageWrap || lightbox;

        if (!target) {
            return;
        }

        if (!document.fullscreenElement) {
            target.requestFullscreen?.().then(() => {
                fullscreenBtn?.classList.add('active');
            }).catch(() => { });
            return;
        }

        document.exitFullscreen?.().catch(() => { });
    }

    function toggleThumbs() {
        if (!lightbox || !lightboxThumbs) {
            return;
        }

        const hidden = lightbox.classList.toggle('thumbs-hidden');
        thumbsToggleBtn?.classList.toggle('active', !hidden);
    }

    document.addEventListener('fullscreenchange', () => {
        fullscreenBtn?.classList.toggle('active', Boolean(document.fullscreenElement));
    });

    initTheme();

    const galleryElement = resolveGalleryElement();
    const galleryKey = resolveGalleryKey(galleryElement);
    renderGallery(galleryElement, galleryKey);

    if (!galleryElement || !lightbox || !lightboxImageWrap || !lightboxImage) {
        return;
    }

    collectGalleryItems(galleryElement);

    if (!galleryItems.length) {
        updateCounter();
        return;
    }

    galleryElement.addEventListener('click', (event) => {
        const item = event.target.closest('.project-gallery-item');

        if (!item || !galleryElement.contains(item)) {
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
    fullscreenBtn?.addEventListener('click', toggleFullscreen);
    thumbsToggleBtn?.addEventListener('click', toggleThumbs);
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxNext?.addEventListener('click', nextImage);
    lightboxPrev?.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
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
