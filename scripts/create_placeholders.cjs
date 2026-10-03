const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Ensure public directory exists
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function createPng(width, height, r, g, b) {
  // Simple uncompressed or deflate PNG generator
  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeAndData = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData), 0);
    return Buffer.concat([len, typeAndData, crc]);
  }

  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: RGB
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = chunk('IHDR', ihdrData);

  // Raw image data with filter byte 0 per scanline
  const rowLen = 1 + width * 3;
  const raw = Buffer.alloc(height * rowLen);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    raw[rowOffset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      // Subtle gradient / border pattern
      const isBorder = (x < 4 || x >= width - 4 || y < 4 || y >= height - 4);
      const isGrid = (x % 32 === 0 || y % 32 === 0);
      const pixelOffset = rowOffset + 1 + x * 3;
      if (isBorder) {
        raw[pixelOffset] = Math.max(0, r - 30);
        raw[pixelOffset + 1] = Math.max(0, g - 30);
        raw[pixelOffset + 2] = Math.max(0, b - 30);
      } else if (isGrid) {
        raw[pixelOffset] = Math.max(0, r - 10);
        raw[pixelOffset + 1] = Math.max(0, g - 10);
        raw[pixelOffset + 2] = Math.max(0, b - 10);
      } else {
        raw[pixelOffset] = r;
        raw[pixelOffset + 1] = g;
        raw[pixelOffset + 2] = b;
      }
    }
  }

  const idatData = zlib.deflateSync(raw);
  const idat = chunk('IDAT', idatData);
  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

// Generate placeholder assets
const profileBuf = createPng(400, 400, 220, 225, 230); // Clean slate neutral
fs.writeFileSync(path.join(publicDir, 'profile.jpg'), profileBuf);

const proj1Buf = createPng(640, 360, 215, 222, 228); // Slate cool neutral
fs.writeFileSync(path.join(publicDir, 'project-1.jpg'), proj1Buf);

const proj2Buf = createPng(640, 360, 225, 225, 222); // Warm stone neutral
fs.writeFileSync(path.join(publicDir, 'project-2.jpg'), proj2Buf);

const proj3Buf = createPng(640, 360, 220, 224, 220); // Sage mist neutral
fs.writeFileSync(path.join(publicDir, 'project-3.jpg'), proj3Buf);

console.log('Successfully created placeholder assets in /public');
