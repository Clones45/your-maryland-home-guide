import https from 'https';
import fs from 'fs';

function download(url, dest, redirectCount = 0) {
    return new Promise((resolve, reject) => {
        if (redirectCount > 5) return reject(new Error('Too many redirects'));
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlinkSync(dest);
                return download(res.headers.location, dest, redirectCount + 1).then(resolve).catch(reject);
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => {
            try { fs.unlinkSync(dest); } catch (e) { }
            reject(err);
        });
    });
}

// Pexels photo 1396122 - white colonial home, bright blue sky (good morning light)
const url = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=1920&q=85';
console.log('Downloading Pexels house photo...');
await download(url, 'src/assets/hero-bg.jpg');
console.log('Done!');
