// Convierte los originales de images-src/<slug>/<n>.<ext> en public/images/products/<slug>-<n>.webp.
// Los originales no se versionan (ver .gitignore); solo las WebP resultantes.
//
//   pnpm images
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const DEST = "public/images/products";
const MAX_SIDE = 1200; // las fotos originales miden ~700 px: nunca se amplían
const QUALITY = 80;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  await fs.mkdir(DEST, { recursive: true });
  const slugs = (await fs.readdir(SRC, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name);

  let files = 0;
  let before = 0;
  let after = 0;

  for (const slug of slugs) {
    const entries = (await fs.readdir(path.join(SRC, slug))).sort((a, b) => parseInt(a) - parseInt(b));
    for (const entry of entries) {
      const n = parseInt(entry, 10);
      if (Number.isNaN(n)) continue;
      const input = path.join(SRC, slug, entry);
      const output = path.join(DEST, `${slug}-${n}.webp`);
      await sharp(input)
        .rotate() // respeta la orientación EXIF
        .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(output);
      before += (await fs.stat(input)).size;
      after += (await fs.stat(output)).size;
      files += 1;
    }
  }

  console.log(`${files} imágenes: ${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% menos)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
