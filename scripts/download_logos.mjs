import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const proto = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(dest);
        proto.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlinkSync(dest);
                return download(res.headers.location, dest).then(resolve).catch(reject);
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => {
            fs.unlinkSync(dest);
            reject(err);
        });
    });
}

// Official NAR REALTOR white logo (transparent background) from their media kit
const realtorUrl = 'https://www.nar.realtor/sites/default/files/2023-11/nar-realtor-logo-white-1-2023-11-08.png';
// Equal Housing Opportunity white logo
const ehoUrl = 'https://www.hud.gov/sites/dfiles/FHEO/images/EHO_Logo_white.png';

console.log('Downloading REALTOR® logo...');
try {
    await download(realtorUrl, 'public/realtor.png');
    console.log('✅ realtor.png downloaded');
} catch (e) {
    console.log('❌ realtor.png failed:', e.message);
}

console.log('Downloading EHO logo...');
try {
    await download(ehoUrl, 'public/eho.png');
    console.log('✅ eho.png downloaded');
} catch (e) {
    console.log('❌ eho.png failed:', e.message);
}
