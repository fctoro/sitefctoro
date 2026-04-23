import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = 'public/TEAMPICTURES';
const outDir = 'public/staff-photos';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

for (const file of files) {
  const inPath = path.join(srcDir, file);
  // Clean filename: remove ".jpg.jpeg" → ".jpg", replace spaces with hyphens, lowercase
  const cleanName = file
    .replace('.jpg.jpeg', '.jpg')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .toLowerCase();
  const outPath = path.join(outDir, cleanName);
  
  try {
    await sharp(inPath)
      .resize(600, 800, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 75 })
      .toFile(outPath);
    console.log(`✓ ${file} → ${cleanName} (${(fs.statSync(outPath).size / 1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}
console.log('Done!');
