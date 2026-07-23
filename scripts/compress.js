import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = path.resolve('public/images');
const files = fs.readdirSync(imgDir);

async function optimize() {
  console.log('Optimizing and converting images to WebP in public/images...');
  for (const file of files) {
    const filePath = path.join(imgDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    console.log(`Processing ${file} (${(stat.size / 1024).toFixed(1)} KB)...`);
    
    // WebP output path
    const parsed = path.parse(filePath);
    const webpPath = path.join(imgDir, `${parsed.name}.webp`);

    let pipeline = sharp(filePath).resize({ width: 1200, withoutEnlargement: true });
    
    // Convert to webp with high quality
    pipeline = pipeline.webp({ quality: 80, effort: 6 });

    await pipeline.toFile(webpPath);
    const newStat = fs.statSync(webpPath);
    console.log(` -> Converted to ${parsed.name}.webp: ${(newStat.size / 1024).toFixed(1)} KB (Saved ${(((stat.size - newStat.size) / stat.size) * 100).toFixed(1)}%)`);

    // Remove old file
    fs.unlinkSync(filePath);
  }
  console.log('All images optimized successfully!');
}

optimize().catch(err => {
  console.error(err);
  process.exit(1);
});
