import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Find all large or unoptimized images
  const files = await glob('public/**/*.{jpg,jpeg,png,webp}');
  
  let totalSaved = 0;
  
  for (const file of files) {
    try {
      const stats = await fs.stat(file);
      // Skip very small files (less than 50KB) as they are likely already optimized
      if (stats.size < 50 * 1024) continue;
      
      const ext = path.extname(file).toLowerCase();
      const originalBuffer = await fs.readFile(file);
      
      let optimizedBuffer;
      const image = sharp(originalBuffer);
      const metadata = await image.metadata();
      
      // Resize overly large images (max width 1920px)
      if (metadata.width > 1920) {
        image.resize(1920, null, { withoutEnlargement: true });
      }
      
      if (ext === '.jpg' || ext === '.jpeg') {
        optimizedBuffer = await image.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      } else if (ext === '.png') {
        optimizedBuffer = await image.png({ quality: 80, compressionLevel: 8 }).toBuffer();
      } else if (ext === '.webp') {
        optimizedBuffer = await image.webp({ quality: 80 }).toBuffer();
      } else {
        continue;
      }
      
      // Only overwrite if it actually saves space
      if (optimizedBuffer.length < originalBuffer.length) {
        await fs.writeFile(file, optimizedBuffer);
        const saved = originalBuffer.length - optimizedBuffer.length;
        totalSaved += saved;
        console.log(`Optimized ${file} - Saved ${(saved / 1024).toFixed(2)} KB`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nOptimization complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages().catch(console.error);
