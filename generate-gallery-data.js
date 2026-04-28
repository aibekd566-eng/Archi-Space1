const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const EXCLUDED_FILES = new Set([
    'portfolio/bathroom/new-2026/bathroom-new-08.jpg',
    'portfolio/bathroom/new-2026/bathroom-new-09.jpg',
    'portfolio/bathroom/new-2026/bathroom-new-10.jpg',
    'portfolio/Hallway/new-2026/hallway-new-01.jpg',
    'portfolio/Hallway/new-2026/hallway-new-02.jpg',
    'portfolio/Hallway/new-2026/hallway-new-03.jpg',
    'portfolio/Hallway/new-2026/hallway-new-04.jpg',
    'portfolio/Hallway/new-2026/hallway-new-05.jpg',
    'portfolio/Hallway/new-2026/hallway-new-06.jpg',
    'portfolio/Hallway/new-2026/hallway-new-07.jpg',
    'portfolio/Hallway/new-2026/hallway-new-08.jpg',
    'portfolio/Hallway/new-2026/hallway-new-09.jpg',
    'portfolio/Hallway/new-2026/hallway-new-10.jpg',
    'portfolio/Hallway/new-2026/hallway-new-11.jpg'
]);

const GALLERIES = {
    living: {
        title: 'Кухня-гостиная',
        dirs: [
            'portfolio/kitchen-living',
            'гардероб 2/кухня гостиная',
            'гардероб 2/кужня гостиная',
            'гардероб 2/гостиная',
            'гардероб 2/гостиная 2',
            'гардероб 2/гостинная 2',
            'гардероб 2/гостиная2',
            'гардероб 2/гостинная2',
            'гардероб 2/кухня',
            'гардероб 2/кухня2',
            'гардероб 2/кухня3'
        ]
    },
    bathroom: {
        title: 'Санузлы',
        dirs: [
            'portfolio/bathroom',
            'гардероб 2/санузел',
            'гардероб 2/санузел 2',
            'гардероб 2/санузел3',
            'гардероб 2/санузел4',
            'гардероб 2/санузел5'
        ]
    },
    bedroom: {
        title: 'Спальни',
        dirs: [
            'portfolio/Bedroom',
            'гардероб 2/спальня',
            'гардероб 2/спальня 2',
            'гардероб 2/спальня3',
            'гардероб 2/спальня4',
            'гардероб 2/спальня5',
            'гардероб 2/спальня6',
            'гардероб 2/спальня7',
            'гардероб 2/спальня8'
        ]
    },
    hallway: {
        title: 'Прихожие',
        dirs: [
            'portfolio/Hallway',
            'гардероб 2/прихожка',
            'гардероб 2/прихожка 2',
            'гардероб 2/прихожка3'
        ]
    },
    wardrobe: {
        title: 'Гардеробная',
        dirs: [
            'portfolio/wardrobe'
        ]
    },
    kids: {
        title: 'Детская',
        dirs: [
            'portfolio/kids',
            'гардероб 2/детская',
            'гардероб 2/детская 2'
        ]
    },
    commerce: {
        title: 'Коммерция',
        dirs: [
            'portfolio/commerce'
        ]
    }
};

function toPosixPath(filePath) {
    return filePath.split(path.sep).join('/');
}

function toProjectPath(filePath) {
    return toPosixPath(path.relative(ROOT, filePath));
}

function isImageFile(filePath) {
    return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function isExcluded(filePath) {
    return EXCLUDED_FILES.has(toProjectPath(filePath));
}

function walkDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.warn(`Skip missing gallery folder: ${toPosixPath(path.relative(ROOT, dirPath))}`);
        return [];
    }

    return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            return walkDirectory(fullPath);
        }

        if (entry.isFile() && isImageFile(fullPath) && !isExcluded(fullPath)) {
            return [fullPath];
        }

        return [];
    });
}

function sortFiles(files) {
    return files.sort((a, b) => toProjectPath(a).localeCompare(toProjectPath(b), 'ru', {
        numeric: true,
        sensitivity: 'base'
    }));
}

function getFileHash(filePath) {
    return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function dedupeByContent(files) {
    const seenHashes = new Set();

    return files.filter((file) => {
        const hash = getFileHash(file);

        if (seenHashes.has(hash)) {
            return false;
        }

        seenHashes.add(hash);
        return true;
    });
}

function collectGalleryFiles(gallery) {
    const files = gallery.dirs.flatMap((dirName) => walkDirectory(path.join(ROOT, dirName)));
    return dedupeByContent(sortFiles(files));
}

function buildGalleryData() {
    return Object.fromEntries(Object.entries(GALLERIES).map(([key, gallery]) => {
        const items = collectGalleryFiles(gallery).map((file, index) => ({
            src: toProjectPath(file),
            alt: `${gallery.title} ${index + 1}`
        }));

        return [key, items];
    }));
}

function writeGalleryData(data) {
    const jsPath = path.join(ROOT, 'gallery-data.js');
    const jsonPath = path.join(ROOT, 'gallery-data.generated.json');
    const json = JSON.stringify(data, null, 2);

    fs.writeFileSync(jsPath, `window.ARCHISPACE_GALLERIES = ${json};\n`, 'utf8');
    fs.writeFileSync(jsonPath, `${json}\n`, 'utf8');

    Object.entries(data).forEach(([key, items]) => {
        console.log(`${key}: ${items.length}`);
    });
}

writeGalleryData(buildGalleryData());
