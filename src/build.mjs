// Builds the static site into dist/: node src/build.mjs   (Vercel runs this on every deploy, see vercel.json)
import { mkdirSync, writeFileSync, rmSync, cpSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { all } from "./pages.mjs";
import { SITE } from "./data.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
rmSync(DIST, { recursive: true, force: true });
cpSync(path.join(ROOT, "public"), DIST, { recursive: true });

const pages = all();
for (const { path: p, html } of pages) {
  const file = p.endsWith(".html") ? path.join(DIST, p) : path.join(DIST, p, "index.html");
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
}
const today = new Date().toISOString().slice(0, 10);
writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((p) => !p.path.endsWith(".html")).map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === "/" ? "1.0" : p.path.split("/").length > 3 ? "0.7" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`);
writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`${pages.length} halaman dibuat di dist/`);
