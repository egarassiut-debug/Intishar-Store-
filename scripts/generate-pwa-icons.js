import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Ensure public directory exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write high-res SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="50%" stop-color="#065f46"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <!-- Background with rounded corners for standard icon -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  
  <!-- Outer subtle gold border -->
  <rect x="24" y="24" width="464" height="464" rx="92" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-opacity="0.4"/>
  
  <!-- Bag Handle -->
  <path d="M196 200 C196 130 316 130 316 200" fill="none" stroke="url(#goldGrad)" stroke-width="26" stroke-linecap="round"/>
  
  <!-- Shopping Bag Silhouette with Egyptian Arch Motif -->
  <path d="M136 210 L376 210 L356 420 C354 436 340 448 324 448 L188 448 C172 448 158 436 156 420 Z" fill="#0f172a" fill-opacity="0.85" stroke="url(#goldGrad)" stroke-width="12" stroke-linejoin="round"/>
  
  <!-- Stylized Egyptian Lotus / Falcon Wing Motif inside -->
  <path d="M256 250 L276 310 L320 310 L284 336 L298 380 L256 352 L214 380 L228 336 L192 310 L236 310 Z" fill="url(#goldGrad)"/>
  
  <!-- Egyptian Flag subtle badge -->
  <circle cx="390" cy="120" r="32" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
  <rect x="366" y="98" width="48" height="14" fill="#ce1126"/>
  <rect x="366" y="112" width="48" height="16" fill="#ffffff"/>
  <rect x="366" y="128" width="48" height="14" fill="#000000"/>
  <!-- Eagle spot -->
  <circle cx="390" cy="120" r="4" fill="#c09300"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf-8');

// Function to generate uncompressed standard PNG buffer in pure Node.js
function createSolidPNG(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(2, 9); // color type 2: Truecolor RGB
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image data: scanline filter 0 + RGB
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 3;
      
      // Calculate distance to center
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxRadius = width * 0.44;

      if (dist < maxRadius) {
        // Inner gold/emerald blend
        if (dist < width * 0.22) {
          // Center gold emblem
          rawData[pixelOffset] = 245;     // R
          rawData[pixelOffset + 1] = 158; // G
          rawData[pixelOffset + 2] = 11;  // B
        } else {
          // Emerald body
          rawData[pixelOffset] = 4;
          rawData[pixelOffset + 1] = 120;
          rawData[pixelOffset + 2] = 87;
        }
      } else {
        // Deep background
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Table-based CRC32 implementation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Generate PWA icons
const icon192 = createSolidPNG(192, 192, 15, 23, 42);
const icon512 = createSolidPNG(512, 512, 15, 23, 42);
const iconApple = createSolidPNG(180, 180, 4, 120, 87);

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), icon512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconApple);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icon192);

console.log('Successfully generated all PWA icons in /public!');
