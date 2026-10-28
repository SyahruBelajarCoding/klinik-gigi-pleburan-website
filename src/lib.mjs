// Shared pieces of every page: escaping, images, WhatsApp links, the page shell and the sections reused across pages.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, klinik, jam, jamRingkas, slotJam, layanan, kredit } from "./data.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
export const VERSION = (process.env.VERCEL_GIT_COMMIT_SHA || Date.now().toString(36)).slice(0, 8);

// ---------- helpers ----------
const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const e = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ESC[c]);
export const layananBy = (slug) => layanan.find((l) => l.slug === slug);
export const telHref = "tel:+62" + klinik.tel.replace(/\D/g, "").slice(1);
export const alamatLengkap = `${klinik.jalan}, ${klinik.kelurahan}, Kec. ${klinik.kecamatan}, Kota ${klinik.kota}, ${klinik.provinsi} ${klinik.kodePos}`;

// every WhatsApp message says which page it came from, so the clinic can see which pages bring patients
export const waText = (ask, from) => `Halo ${klinik.nama}, ${ask}\n\n(dari website: ${from})`;
export const wa = (ask, from) => `https://wa.me/${klinik.wa}?text=${encodeURIComponent(waText(ask, from))}`;

// image sizes are read from the webp headers, so every <img> carries width and height
const DIMS = {};
for (const f of readdirSync(path.join(ROOT, "public/img"))) {
  if (!f.endsWith(".webp")) continue;
  const b = readFileSync(path.join(ROOT, "public/img", f));
  const kind = b.toString("ascii", 12, 16);
  let w, h;
  if (kind === "VP8X") { w = 1 + b.readUIntLE(24, 3); h = 1 + b.readUIntLE(27, 3); }
  else if (kind === "VP8 ") { w = b.readUInt16LE(26) & 0x3fff; h = b.readUInt16LE(28) & 0x3fff; }
  else if (kind === "VP8L") { const n = b.readUInt32LE(21); w = 1 + (n & 0x3fff); h = 1 + ((n >> 14) & 0x3fff); }
  DIMS[f.replace(/\.webp$/, "")] = [w, h];
}
// a name ending in -NNN is the small file; the big one without the suffix joins the srcset
export function img(name, alt, { cls = "", eager = false, sizes = "50vw", attrs = "" } = {}) {
  const d = DIMS[name];
  if (!d) throw new Error("Gambar tidak ada: " + name);
  const bigName = name.replace(/-\d+$/, ""), big = DIMS[bigName];
  const srcset = bigName !== name && big ? ` srcset="/img/${name}.webp ${d[0]}w, /img/${bigName}.webp ${big[0]}w" sizes="${sizes}"` : "";
  return `<img${cls ? ` class="${cls}"` : ""} src="/img/${name}.webp"${srcset} alt="${e(alt)}" width="${d[0]}" height="${d[1]}"${eager ? ` fetchpriority="high"` : ` loading="lazy"`} decoding="async"${attrs ? " " + attrs : ""}>`;
}
const small = (name) => Object.keys(DIMS).find((k) => k.startsWith(name + "-") && /-\d+$/.test(k)) || name;

// ---------- small parts ----------
const SVG = {
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  out: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z"/></svg>`,
};
export const icon = (n) => SVG[n];
// the clinic's mark: a tooth, drawn once
export const tooth = (cls = "mark") => `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M10.2 3.5c-3.6 0-6.2 2.9-6.2 6.9 0 2.7 1 4.6 1.8 6.6.9 2.4 1.2 5.2 1.8 8 .5 2.4 1.4 3.5 2.6 3.5 1.6 0 2.1-1.9 2.6-4.3.5-2.5 1.3-4.6 3.2-4.6s2.7 2.1 3.2 4.6c.5 2.4 1 4.3 2.6 4.3 1.2 0 2.1-1.1 2.6-3.5.6-2.8.9-5.6 1.8-8 .8-2 1.8-3.9 1.8-6.6 0-4-2.6-6.9-6.2-6.9-2.4 0-3.6 1.3-5.8 1.3s-3.4-1.3-5.8-1.3Z"/></svg>`;

export const btn = (label, href, { cls = "", ext = false, ic = "" } = {}) =>
  `<a class="btn ${cls}" href="${e(href)}"${ext ? ` target="_blank" rel="noopener"` : ""}>${ic ? SVG[ic] : ""}<span>${label}</span></a>`;
export const waBtn = (label, ask, from, cls = "") => btn(label, wa(ask, from), { cls, ext: true, ic: "wa" });

// ---------- the page shell ----------
const NAV = [["/#layanan", "Layanan", "layanan"], ["/behel/", "Behel", "behel"], ["/tentang/", "Tentang", "tentang"], ["/kontak/", "Lokasi", "kontak"]];
const navLink = ([href, label, key], current) => `<a href="${href}"${key === current ? ` aria-current="page"` : ""}>${label}</a>`;

export function bar(current) {
  return `<header class="bar">
    <nav class="bar-side" aria-label="Halaman utama">${NAV.slice(0, 2).map((n) => navLink(n, current)).join("")}</nav>
    <a class="brand" href="/" aria-label="${e(klinik.nama)}, ke beranda">${tooth()}<span>${e(klinik.merek)}</span></a>
    <nav class="bar-side bar-end" aria-label="Info klinik">${NAV.slice(2).map((n) => navLink(n, current)).join("")}</nav>
    <button class="menu-btn" type="button" data-menu aria-expanded="false" aria-controls="menu">Menu</button>
  </header>`;
}

// the half that never moves: one or more photographs and the hours bar along its foot
export function pane(pics, { label = "" } = {}) {
  return `<aside class="pane" aria-label="${e(label || "Foto")}">
    <div class="pane-pics" data-pane>
      ${pics.map(([name, alt, key], i) => `<figure class="pane-pic${i === 0 ? " on" : ""}" data-pic="${e(key || name)}">${img(small(name), alt, { eager: i === 0, sizes: "(max-width: 900px) 100vw, 50vw" })}</figure>`).join("")}
    </div>
    <p class="pane-bar"><span data-open-status>${e(jamRingkas)}</span><span class="pane-addr">${e(klinik.jalanPendek)}, ${e(klinik.kota)}</span></p>
  </aside>`;
}
export const stage = ({ current, sheet, pics, label }) => `<div class="stage">
  <div class="sheet">${bar(current)}${sheet}</div>
  ${pane(pics, { label })}
</div>`;

export function page({ path: p, title, description, current, body, schema = [], image = "/img/og.jpg" }) {
  const url = SITE + p;
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(title)}</title>
<meta name="description" content="${e(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="id_ID">
<meta property="og:site_name" content="${e(klinik.nama)}">
<meta property="og:title" content="${e(title)}">
<meta property="og:description" content="${e(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#161c1a">
<link rel="icon" href="/img/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/icon-180.png">
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css?v=${VERSION}">
<script>document.documentElement.classList.add("js")</script>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#isi">Langsung ke isi</a>
<main id="isi">
${body}
</main>
${footer()}
${menu(current)}
<a class="wa-float" href="${e(wa("saya ingin membuat janji periksa gigi.", p))}" target="_blank" rel="noopener" aria-label="Buat janji lewat WhatsApp">${SVG.wa}</a>
<script src="/js/site.js?v=${VERSION}" defer></script>
</body>
</html>`;
}

function menu(current) {
  return `<div class="menu" id="menu" hidden>
    <div class="menu-top"><a class="brand" href="/">${tooth()}<span>${e(klinik.merek)}</span></a><button class="menu-close" type="button" data-menu-close>Tutup</button></div>
    <nav class="menu-links" aria-label="Menu">
      <a href="/"${current === "beranda" ? ` aria-current="page"` : ""}>Beranda</a>
      ${NAV.map((n) => navLink(n, current)).join("")}
      ${layanan.filter((l) => l.url && l.slug !== "behel").map((l) => `<a class="menu-sub" href="${l.url}"${current === l.slug ? ` aria-current="page"` : ""}>${e(l.pendek)}</a>`).join("")}
    </nav>
    ${waBtn("Buat janji lewat WhatsApp", "saya ingin membuat janji periksa gigi.", "menu", "btn-wide")}
  </div>`;
}

export function footer() {
  const svc = layanan.filter((l) => l.url);
  return `<footer class="ft">
  ${img("ruang-1200", "Ruang praktik dokter gigi yang terang dengan kursi periksa", { cls: "ft-pic", sizes: "100vw" })}
  <div class="ft-in">
    <div class="ft-top">
      <nav class="ft-links" aria-label="Perawatan">${svc.map((l) => `<a href="${l.url}">${e(l.pendek)}</a>`).join("")}</nav>
      <div class="ft-contact">
        <address>${e(klinik.jalan)}<br>${e(klinik.kelurahan)}, ${e(klinik.kecamatan)}<br>${e(klinik.kota)} ${e(klinik.kodePos)}</address>
        <p><a href="${wa("saya ingin bertanya.", "footer")}" target="_blank" rel="noopener">WhatsApp ${e(klinik.tel)}</a><br><a href="${telHref}">Telepon ${e(klinik.tel)}</a></p>
        <p>${e(jamRingkas)}</p>
      </div>
    </div>
    <p class="ft-name">${e(klinik.merek)}</p>
    <p class="ft-legal">© ${new Date().getFullYear()} ${e(klinik.namaResmi)}, Pleburan, Semarang. Foto ilustrasi: Unsplash (${kredit.unsplash.map(e).join(", ")}); “${e(kredit.commons.judul)}” oleh ${e(kredit.commons.oleh)}, <a href="${kredit.commons.url}" rel="noopener">${e(kredit.commons.lisensi)}, Wikimedia Commons</a>. Informasi di situs ini bersifat umum dan tidak menggantikan pemeriksaan dokter.</p>
  </div>
</footer>`;
}

// ---------- sections used on several pages ----------

// treatments as a list; the active row lights up and the fixed photograph changes to it
export function serviceList({ heading = "Perawatan di klinik", id = "layanan", from = "/", skip = "" } = {}) {
  const list = layanan.filter((l) => l.slug !== skip);
  return `<section class="svc" id="${id}" aria-labelledby="${id}-h">
    <h2 id="${id}-h">${e(heading)}</h2>
    <ul class="svc-list" data-svc>
      ${list.map((l, i) => `<li class="svc-row${i === 0 ? " on" : ""}" data-pic="${l.slug}">
        <a class="svc-head" href="${l.url || "#janji"}"><span class="svc-name">${e(l.nama)}</span><span class="svc-dur">${e(l.durasi)}</span></a>
        <div class="svc-more">
          ${img(small(l.img), l.alt, { cls: "svc-pic", sizes: "90vw" })}
          <p>${e(l.ringkas)}</p>
          ${l.url ? `<a class="more" href="${l.url}">Tentang ${e(l.pendek.toLowerCase())}${SVG.arrow}</a>` : `<a class="more" href="#janji">Pilih jam pemeriksaan${SVG.arrow}</a>`}
        </div>
      </li>`).join("")}
    </ul>
  </section>`;
}
export const servicePics = (skip = "") => layanan.filter((l) => l.slug !== skip).map((l) => [l.img, l.alt, l.slug]);

// the behel plate: one square photograph, tabs, two actions
export function behelPlate(tabs, { from = "/", heading = "Behel oleh dokter gigi spesialis", more = true } = {}) {
  return `<section class="plate" aria-labelledby="plate-h">
    <div class="plate-pic">${img("behel-tangan-700", "Tangan bersarung tangan memegang model rahang berbehel", { sizes: "(max-width: 900px) 100vw, 45vw" })}</div>
    <div class="plate-text" data-tabs>
      <div class="tabs" role="tablist" aria-label="Tahap perawatan behel">
        ${tabs.map(([t], i) => `<button type="button" role="tab" id="tab-${i}" aria-controls="tp-${i}" aria-selected="${i === 0}"${i ? ` tabindex="-1"` : ""}>${e(t)}</button>`).join("")}
      </div>
      <div class="plate-body">
        <h2 id="plate-h">${e(heading)}</h2>
        ${tabs.map(([, t, d], i) => `<div class="tab-panel" role="tabpanel" id="tp-${i}" aria-labelledby="tab-${i}"${i ? " hidden" : ""}><p><strong>${e(t)}.</strong> ${e(d)}</p></div>`).join("")}
      </div>
      <div class="plate-acts">
        <a class="cell cell-ink" href="${e(wa("saya ingin konsultasi behel.", from))}" target="_blank" rel="noopener">${SVG.wa}<span>Konsultasi behel</span></a>
        ${more ? `<a class="cell cell-tone" href="/behel/"><span>Semua soal behel</span>${SVG.arrow}</a>` : `<a class="cell cell-tone" href="#janji"><span>Pilih jam konsultasi</span>${SVG.arrow}</a>`}
      </div>
    </div>
  </section>`;
}

// the slip's bottom edge is cut like a torn receipt: 24 teeth, 10px deep
const ZIGZAG = "polygon(0 0, 100% 0, " + Array.from({ length: 49 }, (_, i) => `${(100 - (i * 100) / 48).toFixed(3)}% ${i % 2 ? "100%" : "calc(100% - 10px)"}`).join(", ") + ")";

// the live thing: choose the treatment, the day and the hour; the slip fills itself and goes to WhatsApp
export function booking({ from, pick = "konsultasi", heading = "Pilih jam, lalu datang", intro } = {}) {
  const chosen = layananBy(pick) || layanan[0];
  const days = ["Hari ini", "Besok", "Lusa", "3 hari lagi", "4 hari lagi", "5 hari lagi", "6 hari lagi"];
  const data = {
    from, wa: klinik.wa, nama: klinik.nama, jalan: klinik.jalanPendek,
    jam: jam.map(({ day, buka, tutup }) => ({ day, buka, tutup })),
    layanan: Object.fromEntries(layanan.map((l) => [l.slug, { nama: l.nama, kunjungan: l.kunjungan }])),
  };
  const row = ([a, b]) => `<li><span>${e(a)}</span><i aria-hidden="true"></i><span>${e(b)}</span></li>`;
  return `<section class="janji" id="janji" aria-labelledby="janji-h">
    <div class="janji-intro">
      <h2 id="janji-h">${e(heading)}</h2>
      <p>${e(intro || "Pilih keperluan, hari dan jam. Kartu janji terisi sendiri, lalu terkirim ke admin lewat WhatsApp untuk dikonfirmasi.")}</p>
      <form class="janji-form" id="janji-form" action="https://wa.me/${klinik.wa}" method="get" target="_blank" data-janji>
        <fieldset>
          <legend>Keperluan</legend>
          <div class="chips">${layanan.map((l) => `<label class="chip"><input type="radio" name="perlu" value="${l.slug}"${l.slug === chosen.slug ? " checked" : ""}><span>${e(l.pendek)}</span></label>`).join("")}</div>
        </fieldset>
        <fieldset>
          <legend>Hari</legend>
          <div class="chips" data-days>${days.map((d, i) => `<label class="chip"><input type="radio" name="hari" value="${i}"${i === 1 ? " checked" : ""}><span>${d}</span></label>`).join("")}</div>
        </fieldset>
        <div class="janji-fields">
          <label class="field"><span>Jam</span><select name="jam">${slotJam.map((j) => `<option${j === "19.00" ? " selected" : ""}>${j}</option>`).join("")}</select></label>
          <label class="field"><span>Nama Anda</span><input name="nama" autocomplete="name" placeholder="Nama untuk janji"></label>
        </div>
        <label class="field"><span>Keluhan singkat (boleh dikosongkan)</span><input name="catatan" placeholder="Mis. gigi kiri bawah ngilu"></label>
        <input type="hidden" name="text" value="${e(waText(`saya ingin membuat janji ${chosen.nama.toLowerCase()}.`, from))}">
      </form>
    </div>
    <div class="slip" aria-live="polite" style="--zigzag: ${ZIGZAG}">
      <p class="slip-name">${tooth()}<span>Kartu janji</span></p>
      <h3>Sekarang</h3>
      <ul>${row(["Kirim kartu ini lewat WhatsApp", "1 menit"])}${row(["Admin mengonfirmasi jamnya", "lewat chat"])}</ul>
      <h3 data-slip="hari">Besok</h3>
      <ul data-slip="kunjungan">${row([`Datang ke ${klinik.jalanPendek}`, "pukul 19.00"])}${chosen.kunjungan.map(row).join("")}</ul>
      <p class="slip-who" data-slip="nama">Atas nama: (isi nama Anda)</p>
      <button class="slip-send" type="submit" form="janji-form">${SVG.wa}<span>Kirim kartu ke WhatsApp</span></button>
      <script type="application/json" data-janji-data>${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
    </div>
  </section>`;
}

// questions set as reading text, question run in, answer following on the same line
export const faqText = (items, { heading = "Yang sering ditanyakan", id = "tanya" } = {}) => `<section class="faq" id="${id}" aria-labelledby="${id}-h">
  <h2 id="${id}-h">${e(heading)}</h2>
  <div class="faq-text">${items.map(([q, a]) => `<p><strong>${e(q)}</strong> ${e(a)}</p>`).join("")}</div>
</section>`;

// the weekly hours as a real table; today's row is marked by the script
export const hoursTable = () => `<table class="hours">
  <caption>Jam buka</caption>
  <tbody>${jam.map((j) => `<tr data-day="${j.day}"><th scope="row">${j.hari}</th><td>${j.buka === 0 && j.tutup === 24 ? "Buka 24 jam" : `${String(j.buka).padStart(2, "0")}.00–${j.tutup}.00`}</td></tr>`).join("")}</tbody>
</table>`;

export function contactBand({ from = "/" } = {}) {
  return `<section class="kontak" id="kontak" aria-labelledby="kontak-h">
    <div class="kontak-row">
      <p class="statement" id="kontak-h">Tanya jadwal, perkiraan biaya, atau keluhan gigi Anda. Admin klinik membalas lewat WhatsApp.</p>
      <figure class="kontak-pic">${img("simpang-lima-600", "Lapangan dan menara masjid di Simpang Lima, Semarang", { sizes: "170px" })}</figure>
      <div class="kontak-links">
        <p class="q">Mau datang hari ini?</p>
        <p><a href="${e(wa("saya ingin bertanya.", from))}" target="_blank" rel="noopener">WhatsApp ${e(klinik.tel)}</a><br><a href="${klinik.maps}" target="_blank" rel="noopener">Petunjuk arah ke klinik</a></p>
        <p class="note">${e(klinik.kelurahan)}, ${e(klinik.kecamatan)} · ${e(klinik.patokan)}</p>
      </div>
    </div>
    <div class="kontak-detail">
      <div class="kontak-info">
        <h2>Jadwal dan alamat</h2>
        <p class="today" data-open-status>${e(jamRingkas)}</p>
        ${hoursTable()}
        <address>${e(alamatLengkap)}</address>
      </div>
      <iframe class="kontak-map" title="Peta lokasi ${e(klinik.nama)} di Google Maps" src="https://maps.google.com/maps?q=${klinik.geo.lat},${klinik.geo.lon}&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>`;
}

// ---------- structured data ----------
export const dentist = () => ({
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": SITE + "/#klinik",
  name: klinik.namaResmi,
  alternateName: klinik.nama,
  url: SITE + "/",
  image: SITE + "/img/og.jpg",
  telephone: "+62" + klinik.tel.replace(/\D/g, "").slice(1),
  address: { "@type": "PostalAddress", streetAddress: klinik.jalan, addressLocality: `${klinik.kelurahan}, ${klinik.kecamatan}`, addressRegion: `Kota ${klinik.kota}, ${klinik.provinsi}`, postalCode: klinik.kodePos, addressCountry: "ID" },
  geo: { "@type": "GeoCoordinates", latitude: klinik.geo.lat, longitude: klinik.geo.lon },
  hasMap: klinik.maps,
  openingHoursSpecification: jam.map((j) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][j.day], opens: `${String(j.buka).padStart(2, "0")}:00`, closes: j.tutup === 24 ? "23:59" : `${j.tutup}:00` })),
  medicalSpecialty: ["Dentistry", "Orthodontic"],
  availableService: layanan.filter((l) => l.url).map((l) => ({ "@type": "MedicalProcedure", name: l.nama, url: SITE + l.url })),
});
export const faqSchema = (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
export const crumbs = (list) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + p })) });
