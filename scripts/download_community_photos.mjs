import https from 'https';
import fs from 'fs';

function download(url, dest, redirectCount = 0) {
    return new Promise((resolve, reject) => {
        if (redirectCount > 5) return reject(new Error('Too many redirects'));
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close(); try { fs.unlinkSync(dest); } catch (e) { }
                return download(res.headers.location, dest, redirectCount + 1).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) { file.close(); return reject(new Error(`Status ${res.statusCode}`)); }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => { try { fs.unlinkSync(dest); } catch (e) { } reject(err); });
    });
}

// Verified warm morning/sunrise house photos from Pexels (known good IDs)
const photos = [
    // pexels-1396122: white bungalow bright blue morning sky
    ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=800&q=80', 'src/assets/community-ellicott.jpg'],
    // pexels-2102587: beautiful white colonial house, morning light
    ['https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?w=800&q=80', 'src/assets/community-columbia.jpg'],
    // pexels-1029604: large house blue sky sunny morning
    ['https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?w=800&q=80', 'src/assets/community-howard.jpg'],
    // pexels-259588: white two-story bright morning
    ['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?w=800&q=80', 'src/assets/community-bowie.jpg'],
    // pexels-164558: luxury house blue morning sky  
    ['https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?w=800&q=80', 'src/assets/community-towson.jpg'],
    // pexels-280229: suburban home bright daylight
    ['https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?w=800&q=80', 'src/assets/community-nottingham.jpg'],
    // pexels-323780: elegant large home sunny morning
    ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=800&q=80', 'src/assets/community-clarksville.jpg'],
];

console.log('Downloading community photos...');
await Promise.all(photos.map(async ([url, dest]) => {
    try {
        await download(url, dest);
        console.log('✅', dest);
    } catch (e) {
        console.log('❌', dest, e.message);
    }
}));
console.log('Done!');
