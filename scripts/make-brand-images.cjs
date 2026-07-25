const sharp = require("sharp");

async function main() {
  const width = 1200;
  const height = 630;

  const bg = await sharp("public/salon/hero.webp")
    .resize(width, height, { fit: "cover", position: "centre" })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#120E0A" stop-opacity="0.96"/>
      <stop offset="42%" stop-color="#120E0A" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#120E0A" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="72" y="250" font-family="Georgia, Times New Roman, serif" font-size="22" letter-spacing="6" fill="#C4674A">FRISEURSALON DEMO</text>
  <text x="72" y="340" font-family="Georgia, Times New Roman, serif" font-size="84" fill="#F9F4EE">Salon Liora</text>
  <text x="72" y="400" font-family="Georgia, Times New Roman, serif" font-size="28" font-style="italic" fill="rgba(249,244,238,0.72)">Schönheit ist Handwerk.</text>
</svg>`);

  await sharp(bg)
    .composite([{ input: overlay }])
    .png()
    .toFile("src/app/opengraph-image.png");

  await sharp("src/app/opengraph-image.png")
    .jpeg({ quality: 88 })
    .toFile("src/app/twitter-image.jpg");

  await sharp("src/app/opengraph-image.png").toFile("public/og.png");

  const favSrc =
    "C:/Users/erikv/.cursor/projects/e-GitHub-Schneiderei-Friseursalon/assets/favicon-salon-liora.png";
  await sharp(favSrc).resize(512, 512, { fit: "cover" }).png().toFile("src/app/icon.png");
  await sharp(favSrc).resize(180, 180, { fit: "cover" }).png().toFile("src/app/apple-icon.png");

  console.log("favicon + og ready");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
