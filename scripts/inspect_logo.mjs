import sharp from 'sharp';
import { renameSync } from 'fs';

const { data, info } = await sharp('public/eho-realtor.png')
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const { width, height } = info;

// Sample corners and center
const pts = [[5, 5], [width - 5, 5], [5, height - 5], [width - 5, height - 5], [width / 2 | 0, height / 2 | 0], [80, 50]];
for (const [x, y] of pts) {
    const i = (y * width + x) * 4;
    console.log(`(${x},${y}) R=${data[i]} G=${data[i + 1]} B=${data[i + 2]} A=${data[i + 3]}`);
}
