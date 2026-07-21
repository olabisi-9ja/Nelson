import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = path.resolve('public/images');
const files = fs.readdirSync(imgDir);

async function optimize() {
  console.log('Optimizing images in public/images...');
  for (const file of files) {
    const filePath = path.join(imgDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    console.log(`Processing ${file} (${(stat.size / 1024).toFixed(1)} KB)...`);
    const tempPath = filePath + '.tmp';

    let pipeline = sharp(filePath).resize({ width: 1200, withoutEnlargement: true });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }

    await pipeline.toFile(tempPath);
    const newStat = fs.statSync(tempPath);
    console.log(` -> Optimized ${file}: ${(newStat.size / 1024).toFixed(1)} KB (Saved ${(((stat.size - newStat.size) / stat.size) * 100).toFixed(1)}%)`);

    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
  }
  console.log('All images optimized successfully!');
}

optimize().catch(err => {
  console.error(err);
  process.exit(1);
});
