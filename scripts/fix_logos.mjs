import sharp from 'sharp';
import { renameSync } from 'fs';

async function makeTransparentWhiteOnDark(filename) {
    const inputPath = `public/${filename}`;
    const tmpPath = `public/_tmp_${filename}`;

    const { data, info } = await sharp(inputPath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    const buf = Buffer.from(data);

    for (let i = 0; i < buf.length; i += 4) {
        const r = buf[i];
        const g = buf[i + 1];
        const b = buf[i + 2];
        const a = buf[i + 3];

        // Skip already-transparent pixels (from previous run)
        if (a === 0) continue;

        const brightness = (r + g + b) / 3;

        if (brightness > 200) {
            // Light/white background pixel → make transparent
            buf[i + 3] = 0;
        } else {
            // Dark logo pixel → invert to white so it shows on dark backgrounds
            buf[i] = 255 - r;
            buf[i + 1] = 255 - g;
            buf[i + 2] = 255 - b;
            buf[i + 3] = 255;
        }
    }

    await sharp(buf, {
        raw: { width, height, channels: 4 }
    })
        .png()
        .toFile(tmpPath);

    renameSync(tmpPath, inputPath);
    console.log(`✅ Done: ${filename} (${width}x${height})`);
}

// Work from the original uploaded files stored before our modifications
// Re-download from the originals first

await makeTransparentWhiteOnDark('realtor.png');
await makeTransparentWhiteOnDark('eho.png');
console.log('All done!');
