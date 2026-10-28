// Serves dist/ on your computer to check the site before deploying: node src/serve.mjs [port]
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.argv[2] || process.env.PORT || 5183);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml" };

http.createServer(async (req, res) => {
  let rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (rel.endsWith("/")) rel += "index.html";
  let file = path.normalize(path.join(DIST, rel));
  if (!file.startsWith(DIST)) file = path.join(DIST, "404.html");
  let st = await stat(file).catch(() => null);
  if (st?.isDirectory()) { res.writeHead(301, { Location: rel + "/" }); return res.end(); }
  let code = 200;
  if (!st) { file = path.join(DIST, "404.html"); code = 404; }
  res.writeHead(code, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Situs klinik: http://localhost:${PORT}`));
