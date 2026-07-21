import { Jimp } from "jimp";
import fs from "fs";

const files = [
  { src: "C:\\Users\\Abel ADIGUN\\.gemini\\antigravity-ide\\brain\\0744b2b4-2b74-4750-9129-672b789fa4f5\\media__1784654208689.jpg", dest: "public/images/loafer.jpg" },
  { src: "C:\\Users\\Abel ADIGUN\\.gemini\\antigravity-ide\\brain\\0744b2b4-2b74-4750-9129-672b789fa4f5\\media__1784654208804.jpg", dest: "public/images/oxford-shoe.jpg" },
  { src: "C:\\Users\\Abel ADIGUN\\.gemini\\antigravity-ide\\brain\\0744b2b4-2b74-4750-9129-672b789fa4f5\\media__1784654208847.jpg", dest: "public/images/chelsea-boot.jpg" },
  { src: "C:\\Users\\Abel ADIGUN\\.gemini\\antigravity-ide\\brain\\0744b2b4-2b74-4750-9129-672b789fa4f5\\media__1784654208872.jpg", dest: "public/images/product-hero.jpg" },
  { src: "C:\\Users\\Abel ADIGUN\\.gemini\\antigravity-ide\\brain\\0744b2b4-2b74-4750-9129-672b789fa4f5\\media__1784654208889.jpg", dest: "public/images/craft-hands.jpg" },
];

async function main() {
  for (const file of files) {
    try {
      console.log(`Processing ${file.src}...`);
      const image = await Jimp.read(file.src);
      image.autocrop();
      await image.write(file.dest);
      console.log(`Saved to ${file.dest}`);
    } catch (err) {
      console.error(`Error processing ${file.src}:`, err);
    }
  }
}

main();
