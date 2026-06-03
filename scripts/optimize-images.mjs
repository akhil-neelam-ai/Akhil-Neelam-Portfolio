import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "attached_assets");
const outDir = path.join(root, "client/public/images");

const heroSource = "DSC06633_2_1768790401910.jpg";
const heroWidths = [384, 512, 768];

const speakingSources = [
  { file: "JP_00562_1768548157044.JPG", slug: "jp-morgan-hyderabad" },
  { file: "DSC01656_(1)_(1)_1768549204916.jpg", slug: "leadership-conclave-2023" },
  { file: "BV_2_(1)_1768549219824.jpg", slug: "featured-china-2025" },
  {
    file: "Presenting_my_book_to_the_President_and_First_Lady_1768549785622.jpg",
    slug: "book-president-iceland",
  },
  { file: "BV_1_(1)_1768549802913.jpg", slug: "project-chinese-2025" },
  {
    file: "Presenting_my_research_study_during_GEST_1768549852733.jpg",
    slug: "talk-reykjavik-2023",
  },
  { file: "ChangeMaker_Award,_Dec_2024_1768549946899.jpg", slug: "changemaker-award-2024" },
  { file: "1_building_with_claude_1769238256258.jpg", slug: "building-with-claude-2026" },
];
const speakingWidths = [800, 1200];

function resizePipeline(inputPath, width, aspectCrop) {
  let pipeline = sharp(inputPath).rotate().resize({ width, withoutEnlargement: true });
  if (aspectCrop === "16:10") {
    const height = Math.round((width * 10) / 16);
    pipeline = pipeline.resize(width, height, { fit: "cover", position: "centre" });
  }
  return pipeline;
}

async function encodeSet(inputPath, outputBase, widths, aspectCrop) {
  const meta = await sharp(inputPath).metadata();

  for (const width of widths) {
    const base = resizePipeline(inputPath, width, aspectCrop);
    await base.clone().webp({ quality: 82 }).toFile(`${outputBase}-${width}.webp`);
    await base.clone().avif({ quality: 65 }).toFile(`${outputBase}-${width}.avif`);
  }

  return { width: meta.width ?? widths[widths.length - 1], height: meta.height ?? 0 };
}

async function main() {
  const heroDir = path.join(outDir, "hero");
  const speakingOut = path.join(outDir, "speaking");
  fs.mkdirSync(heroDir, { recursive: true });
  fs.mkdirSync(speakingOut, { recursive: true });

  const heroPath = path.join(assetsDir, heroSource);
  if (!fs.existsSync(heroPath)) {
    console.warn(`Hero source missing: ${heroPath}, skipping image optimization`);
    return;
  }

  const heroBase = path.join(heroDir, "hero");
  const heroMeta = await encodeSet(heroPath, heroBase, heroWidths, null);
  const heroAspectHeight = Math.round((heroMeta.width * 4) / 3) || 512;
  fs.writeFileSync(
    path.join(heroDir, "manifest.json"),
    JSON.stringify({
      widths: heroWidths,
      width: heroWidths[heroWidths.length - 1],
      height: heroAspectHeight,
      aspectRatio: "3/4",
    })
  );

  for (const { file, slug } of speakingSources) {
    const src = path.join(assetsDir, file);
    if (!fs.existsSync(src)) {
      console.warn(`Missing speaking image: ${file}`);
      continue;
    }
    const base = path.join(speakingOut, slug);
    await encodeSet(src, base, speakingWidths, "16:10");
  }

  console.log("Image optimization complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
