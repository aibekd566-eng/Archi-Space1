const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORTFOLIO_ROOT = path.join(ROOT, 'portfolio');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const SECTIONS = {
    living: {
        dir: path.join(PORTFOLIO_ROOT, 'kitchen-living'),
        title: 'Кухня-гостиная'
    },
    bathroom: {
        dir: path.join(PORTFOLIO_ROOT, 'bathroom'),
        title: 'Санузлы'
    },
    bedroom: {
        dir: path.join(PORTFOLIO_ROOT, 'Bedroom'),
        title: 'Спальни'
    },
    hallway: {
        dir: path.join(PORTFOLIO_ROOT, 'Hallway'),
        title: 'Прихожие'
    },
    kids: {
        dir: path.join(PORTFOLIO_ROOT, 'kids'),
        title: 'Детская'
    }
};

function toPosixPath(filePath) {
    return filePath.split(path.sep).join('/');
}

function walkDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return [];
    }

    return fs.readdirSync(dirPath, { withFileTypes: true })
        .flatMap((entry) => {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                return walkDirectory(fullPath);
            }

            if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
                return [fullPath];
            }

            return [];
        })
        .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true, sensitivity: 'base' }));
}

function buildGalleryData() {
    const data = {};

    for (const [key, section] of Object.entries(SECTIONS)) {
        const files = walkDirectory(section.dir);

        data[key] = files.map((file, index) => ({
            src: toPosixPath(path.relative(ROOT, file)),
            alt: `${section.title} ${index + 1}`
        }));
    }

    return data;
}

function writeGalleryDataFile(data) {
    const outputPath = path.join(ROOT, 'gallery-data.js');
    const fileContent = `window.ARCHISPACE_GALLERIES = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    console.log(`gallery-data.js generated: ${outputPath}`);
}

writeGalleryDataFile(buildGalleryData());
