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
export const small = (name) => Object.keys(DIMS).find((k) => k.startsWith(name + "-") && /-\d+$/.test(k)) || name;

// ---------- small parts ----------
// thin line icons, one stroke weight for all
const line = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const SVG = {
  up: line(`<path d="M7 17 17 7M8.5 7H17v8.5"/>`),
  arrow: line(`<path d="M4.5 12h15M13.5 6l6 6-6 6"/>`),
  pin: line(`<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>`),
  clock: line(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`),
  check: line(`<path d="m5 12.5 4.2 4.2L19 7"/>`),
  phone: line(`<path d="M6.6 3.5h2.6l1.3 4-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2 4 1.3v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"/>`),
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z"/></svg>`,
};
export const icon = (n) => SVG[n];
// the clinic's mark: a tooth, drawn once
export const tooth = (cls = "mark") => `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M10.2 3.5c-3.6 0-6.2 2.9-6.2 6.9 0 2.7 1 4.6 1.8 6.6.9 2.4 1.2 5.2 1.8 8 .5 2.4 1.4 3.5 2.6 3.5 1.6 0 2.1-1.9 2.6-4.3.5-2.5 1.3-4.6 3.2-4.6s2.7 2.1 3.2 4.6c.5 2.4 1 4.3 2.6 4.3 1.2 0 2.1-1.1 2.6-3.5.6-2.8.9-5.6 1.8-8 .8-2 1.8-3.9 1.8-6.6 0-4-2.6-6.9-6.2-6.9-2.4 0-3.6 1.3-5.8 1.3s-3.4-1.3-5.8-1.3Z"/></svg>`;

// a pill button; the trailing arrow sits in its own circle
export const btn = (label, href, { cls = "", ext = false, ic = "up", lead = "" } = {}) =>
  `<a class="btn ${cls}" href="${e(href)}"${ext ? ` target="_blank" rel="noopener"` : ""}>${lead ? `<span class="btn-lead">${SVG[lead]}</span>` : ""}<span>${label}</span>${ic ? `<span class="btn-ic">${SVG[ic]}</span>` : ""}</a>`;
export const waBtn = (label, ask, from, cls = "btn-ghost") => btn(label, wa(ask, from), { cls, ext: true, ic: "", lead: "wa" });

// five stars, filled to the rating
const STAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.6l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 16.9l-5.7 3 1.2-6.3L2.9 9.2l6.3-.8z"/></svg>`;
export const stars = (nilai) => {
  const pct = (parseFloat(String(nilai).replace(",", ".")) / 5) * 100;
  return `<span class="stars" role="img" aria-label="Nilai ${e(nilai)} dari 5"><span class="stars-row">${STAR.repeat(5)}</span><span class="stars-row stars-on" style="width:${pct.toFixed(1)}%">${STAR.repeat(5)}</span></span>`;
};

// a section heading: a small label, the heading, and one supporting sentence beside it
export const head = ({ pill, h, id, sub = "", cls = "" }) => `<div class="sec-head ${cls}">
  <div class="sec-title">${pill ? `<p class="pill">${e(pill)}</p>` : ""}<h2 id="${id}">${h}</h2></div>
  ${sub ? `<p class="sec-sub">${sub}</p>` : ""}
</div>`;

// ---------- the page shell ----------
const NAV = [["/#layanan", "Layanan", "layanan"], ["/behel/", "Behel", "behel"], ["/tentang/", "Tentang", "tentang"], ["/kontak/", "Lokasi", "kontak"]];
const navLink = ([href, label, key], current) => `<a href="${href}"${key === current ? ` aria-current="page"` : ""}>${label}</a>`;

// the navigation floats as one glass pill above the page
function nav(current, janji) {
  return `<header class="nav" data-nav>
  <div class="nav-in">
    <a class="brand" href="/" aria-label="${e(klinik.nama)}, ke beranda">${tooth()}<span>${e(klinik.merek)}</span></a>
    <nav class="nav-links" aria-label="Halaman">${NAV.map((n) => navLink(n, current)).join("")}</nav>
    ${btn("Buat janji", janji, { cls: "btn-sm nav-cta" })}
    <button class="burger" type="button" data-menu aria-expanded="false" aria-controls="menu"><span class="burger-lines" aria-hidden="true"><i></i><i></i></span><span class="sr">Menu</span></button>
  </div>
</header>`;
}

function menu(current, janji) {
  const svc = layanan.filter((l) => l.url && l.slug !== "behel");
  return `<div class="menu" id="menu" hidden>
  <nav class="menu-in" aria-label="Menu">
    <ul class="menu-main">
      <li><a href="/"${current === "beranda" ? ` aria-current="page"` : ""}>Beranda</a></li>
      ${NAV.map((n) => `<li>${navLink(n, current)}</li>`).join("")}
    </ul>
    <ul class="menu-sub">${svc.map((l) => `<li><a href="${l.url}"${current === l.slug ? ` aria-current="page"` : ""}>${e(l.pendek)}</a></li>`).join("")}</ul>
    <div class="menu-acts">${btn("Buat janji", janji)}${waBtn("WhatsApp", "saya ingin membuat janji periksa gigi.", "menu")}</div>
  </nav>
</div>`;
}

export function page({ path: p, title, description, current, body, schema = [], janji = "#janji", image = "/img/og.jpg" }) {
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
<meta name="theme-color" content="#f6f4ef">
<link rel="icon" href="/img/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css?v=${VERSION}">
<script>document.documentElement.classList.add("js")</script>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#isi">Langsung ke isi</a>
${nav(current, janji)}
<main id="isi">
${body}
</main>
${footer(janji)}
${menu(current, janji)}
<a class="wa-float" href="${e(wa("saya ingin membuat janji periksa gigi.", p))}" target="_blank" rel="noopener" aria-label="Buat janji lewat WhatsApp">${SVG.wa}</a>
<script src="/js/site.js?v=${VERSION}" defer></script>
</body>
</html>`;
}

export function footer(janji = "#janji") {
  const svc = layanan.filter((l) => l.url);
  return `<footer class="ft">
  <div class="wrap">
    <div class="ft-cta">
      <h2>Jadwalkan pemeriksaan gigi <em>berikutnya</em>.</h2>
      <div class="acts">${btn("Buat janji", janji, { cls: "btn-light" })}${waBtn(`WhatsApp ${klinik.tel}`, "saya ingin bertanya.", "footer", "btn-glass")}</div>
    </div>
    <div class="ft-cols">
      <div><h3>Perawatan</h3><ul>${svc.map((l) => `<li><a href="${l.url}">${e(l.pendek)}</a></li>`).join("")}</ul></div>
      <div><h3>Klinik</h3><ul><li><a href="/">Beranda</a></li><li><a href="/tentang/">Dokter dan klinik</a></li><li><a href="/kontak/">Jadwal dan lokasi</a></li><li><a href="${klinik.maps}" target="_blank" rel="noopener">Ulasan di Google</a></li></ul></div>
      <div><h3>Alamat</h3><address>${e(klinik.jalan)}<br>${e(klinik.kelurahan)}, ${e(klinik.kecamatan)}<br>${e(klinik.kota)} ${e(klinik.kodePos)}</address><p><a href="${klinik.maps}" target="_blank" rel="noopener">Petunjuk arah</a></p></div>
      <div><h3>Jam buka</h3><p>Senin–Sabtu, 24 jam<br>Minggu, 08.00–22.00</p><p><a href="${telHref}">Telepon ${e(klinik.tel)}</a></p></div>
    </div>
    <p class="ft-word" aria-hidden="true">${tooth()}<span>${e(klinik.merek)}</span></p>
    <p class="ft-legal">© ${new Date().getFullYear()} ${e(klinik.namaResmi)}, Pleburan, Semarang. Foto ilustrasi: Unsplash (${kredit.unsplash.map(e).join(", ")}); “${e(kredit.commons.judul)}” oleh ${e(kredit.commons.oleh)}, <a href="${kredit.commons.url}" rel="noopener">${e(kredit.commons.lisensi)}, Wikimedia Commons</a>. Informasi di situs ini bersifat umum dan tidak menggantikan pemeriksaan dokter.</p>
  </div>
</footer>`;
}

// the opening of every inner page: title and actions beside one tall photograph
export function pageHero({ crumb, h1, lead, facts = [], acts = "", pic }) {
  return `<section class="phero">
  <div class="wrap phero-grid">
    <div class="phero-copy">
      ${crumb ? `<nav class="crumbs" aria-label="Lokasi halaman"><a href="/">Beranda</a><span aria-hidden="true">/</span><span>${e(crumb)}</span></nav>` : ""}
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      ${facts.length ? `<dl class="facts">${facts.map(([k, v]) => `<div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join("")}</dl>` : ""}
      ${acts ? `<div class="acts">${acts}</div>` : ""}
    </div>
    ${pic ? `<figure class="shell phero-pic"><div class="core">${img(pic[0], pic[1], { eager: true, sizes: "(max-width: 900px) 92vw, 42vw" })}</div></figure>` : ""}
  </div>
</section>`;
}

// ---------- sections used on several pages ----------

// treatments as cards; the first one (behel) is the large card
export function services({ id = "layanan", pill = "Layanan", heading = "Perawatan yang <em>kami tangani</em>", skip = "", sub = "Dari pemeriksaan rutin sampai behel. Setiap perawatan dijelaskan dulu: langkahnya, risikonya, dan perkiraan biayanya." } = {}) {
  const list = layanan.filter((l) => l.url && l.slug !== skip);
  return `<section class="section" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap">
    ${head({ pill, h: heading, id: `${id}-h`, sub: e(sub) })}
    <ul class="bento">
      ${list.map((l, i) => {
        const big = i === 0 && l.slug === "behel";
        return `<li class="shell${big ? " bento-big" : ""}"><a class="core card" href="${l.url}">
        <div class="card-pic">${img(small(l.img), l.alt, { sizes: big ? "(max-width: 900px) 92vw, 60vw" : "(max-width: 900px) 92vw, 30vw", attrs: l.imgPos ? `style="object-position:${l.imgPos}"` : "" })}</div>
        <div class="card-body">
          ${big ? `<p class="pill pill-glass">Dokter gigi spesialis ortodonti</p>` : ""}
          <h3>${e(l.nama)}</h3>
          <p>${e(l.ringkas)}</p>
          <div class="card-foot"><span class="tag">${icon("clock")}${e(l.durasi)}</span><span class="ic-circle">${icon("up")}</span></div>
        </div>
      </a></li>`;
      }).join("")}
    </ul>
  </div>
</section>`;
}

// from the first chat to the first visit, step by step
export function consult({ from = "/" } = {}) {
  const k = layananBy("konsultasi");
  const steps = [
    ["Pilih jam lewat WhatsApp", "Isi kartu janji di halaman ini atau chat admin. Sebutkan keluhan dan jam yang Anda mau."],
    ["Admin mengonfirmasi", "Jadwal dikonfirmasi lewat chat, supaya dokter dan kursi sudah siap saat Anda datang."],
    [`Pemeriksaan ${k.durasi}`, "Dokter mendengar keluhan Anda, memeriksa seluruh gigi dan gusi, dan memakai rontgen bila perlu."],
    ["Rencana dan biaya dijelaskan", "Anda mendapat pilihan perawatan beserta perkiraan biayanya sebelum tindakan apa pun. Keputusannya tetap di tangan Anda."],
  ];
  return `<section class="section consult" id="konsultasi" aria-labelledby="konsultasi-h">
  <div class="wrap consult-grid">
    <figure class="shell consult-pic"><div class="core">${img("kursi-800", "Kursi periksa gigi berwarna putih di dekat jendela yang terang", { sizes: "(max-width: 900px) 92vw, 44vw" })}</div></figure>
    <div class="consult-copy">
      <p class="pill">Konsultasi</p>
      <h2 id="konsultasi-h">Semua dimulai dari <em>konsultasi</em></h2>
      <p class="lead">${e(k.ringkas)}</p>
      <ol class="steps">${steps.map(([t, d], i) => `<li><span class="step-n">${String(i + 1).padStart(2, "0")}</span><div><h3>${e(t)}</h3><p>${e(d)}</p></div></li>`).join("")}</ol>
      <div class="acts">${btn("Jadwalkan konsultasi", "#janji")}${waBtn("Tanya admin", "saya ingin konsultasi soal gigi saya.", from)}</div>
    </div>
  </div>
</section>`;
}

// the clinic's speciality on a dark ground: three stages of behel as tabs
export function behelBand(tabs, { from = "/", heading = "Behel yang direncanakan <em>dokter spesialis</em>", lead = "", more = true } = {}) {
  return `<section class="section dark behel-band" aria-labelledby="behel-h">
  <div class="wrap behel-grid">
    <div class="behel-copy" data-tabs>
      <p class="pill pill-dark">Spesialis ortodonti</p>
      <h2 id="behel-h">${heading}</h2>
      ${lead ? `<p class="lead">${e(lead)}</p>` : ""}
      <div class="seg" role="tablist" aria-label="Tahap perawatan behel">
        ${tabs.map(([t], i) => `<button type="button" role="tab" id="tab-${i}" aria-controls="tp-${i}" aria-selected="${i === 0}"${i ? ` tabindex="-1"` : ""}>${e(t)}</button>`).join("")}
      </div>
      <div class="seg-panels">
        ${tabs.map(([, t, d], i) => `<div class="tab-panel" role="tabpanel" id="tp-${i}" aria-labelledby="tab-${i}"${i ? " hidden" : ""}><h3>${e(t)}</h3><p>${e(d)}</p></div>`).join("")}
      </div>
      <div class="acts">${more ? btn("Tentang behel", "/behel/", { cls: "btn-light" }) : btn("Pilih jam konsultasi", "#janji", { cls: "btn-light" })}${waBtn("Konsultasi behel", "saya ingin konsultasi behel.", from, "btn-glass")}</div>
    </div>
    <figure class="shell shell-dark behel-pic">
      <div class="core">${img("behel-tangan-700", "Tangan bersarung tangan memegang model rahang berbehel", { sizes: "(max-width: 900px) 92vw, 44vw" })}</div>
      <figcaption><span>Kontrol tiap 3–4 minggu</span><span>Umumnya 1,5–3 tahun</span></figcaption>
    </figure>
  </div>
</section>`;
}

// the rating, honestly: a link to the real reviews, beside a note from the doctors
export function reviews({ quote, sign }) {
  return `<section class="section reviews" id="ulasan" aria-labelledby="ulasan-h">
  <div class="wrap">
    ${head({ pill: "Ulasan", h: "Apa kata <em>pasien kami</em>", id: "ulasan-h", sub: "Nilai dan ulasan pasien ada di Google Maps, ditulis langsung oleh pasien. Silakan baca sebelum memutuskan." })}
    <div class="reviews-grid">
      <div class="shell"><div class="core rating-card">
        <p class="rating"><span class="rating-num">${e(klinik.ulasan.nilai)}</span><span class="rating-of">dari 5</span></p>
        ${stars(klinik.ulasan.nilai)}
        <p class="rating-txt">Dari ${e(klinik.ulasan.jumlah)} ulasan pasien di Google Maps.</p>
        ${btn("Baca ulasannya di Google", klinik.maps, { ext: true })}
        <p class="fine">Sesuai aturan iklan layanan kesehatan (Permenkes 1787/2010), kami tidak memuat testimoni pasien di situs ini. Ulasan aslinya bisa Anda baca langsung di Google.</p>
      </div></div>
      <figure class="shell"><div class="core letter-card">
        <p class="pill">Dari dokter kami</p>
        <blockquote><p>${e(quote)}</p></blockquote>
        <figcaption>${sign}</figcaption>
      </div></figure>
    </div>
  </div>
</section>`;
}

// the live thing: choose the treatment, the day and the hour; the ticket fills itself and goes to WhatsApp
export function booking({ from, pick = "konsultasi", heading = "Pilih jam, kami siapkan <em>kursinya</em>", intro } = {}) {
  const chosen = layananBy(pick) || layanan[0];
  const days = ["Hari ini", "Besok", "Lusa", "3 hari lagi", "4 hari lagi", "5 hari lagi", "6 hari lagi"];
  const data = {
    from, wa: klinik.wa, nama: klinik.nama, jalan: klinik.jalanPendek,
    jam: jam.map(({ day, buka, tutup }) => ({ day, buka, tutup })),
    layanan: Object.fromEntries(layanan.map((l) => [l.slug, { nama: l.nama, kunjungan: l.kunjungan }])),
  };
  const row = ([a, b]) => `<li><span>${e(a)}</span><i aria-hidden="true"></i><span>${e(b)}</span></li>`;
  return `<section class="section janji" id="janji" aria-labelledby="janji-h">
  <div class="wrap">
    ${head({ pill: "Buat janji", h: heading, id: "janji-h", sub: e(intro || "Pilih keperluan, hari dan jam. Kartu janji terisi sendiri, lalu terkirim ke admin lewat WhatsApp untuk dikonfirmasi.") })}
    <div class="shell janji-shell"><div class="core janji-grid">
      <form class="janji-form" id="janji-form" action="https://wa.me/${klinik.wa}" method="get" target="_blank" data-janji>
        <fieldset>
          <legend><span>1</span>Keperluan</legend>
          <div class="chips">${layanan.map((l) => `<label class="chip"><input type="radio" name="perlu" value="${l.slug}"${l.slug === chosen.slug ? " checked" : ""}><span>${e(l.pendek)}</span></label>`).join("")}</div>
        </fieldset>
        <fieldset>
          <legend><span>2</span>Hari</legend>
          <div class="chips" data-days>${days.map((d, i) => `<label class="chip"><input type="radio" name="hari" value="${i}"${i === 1 ? " checked" : ""}><span>${d}</span></label>`).join("")}</div>
        </fieldset>
        <fieldset>
          <legend><span>3</span>Jam dan nama</legend>
          <div class="janji-fields">
            <label class="field"><span>Jam</span><select name="jam">${slotJam.map((j) => `<option${j === "19.00" ? " selected" : ""}>${j}</option>`).join("")}</select></label>
            <label class="field"><span>Nama Anda</span><input name="nama" autocomplete="name" placeholder="Nama untuk janji"></label>
          </div>
          <label class="field"><span>Keluhan singkat (boleh dikosongkan)</span><input name="catatan" placeholder="Mis. gigi kiri bawah ngilu"></label>
        </fieldset>
        <input type="hidden" name="text" value="${e(waText(`saya ingin membuat janji ${chosen.nama.toLowerCase()}.`, from))}">
      </form>
      <div class="ticket" aria-live="polite">
        <p class="ticket-top">${tooth()}<span>Kartu janji</span><span class="ticket-clinic">${e(klinik.jalanPendek)}</span></p>
        <p class="ticket-label">Jadwal kunjungan</p>
        <h3 data-slip="hari">Besok</h3>
        <ul data-slip="kunjungan">${row([`Datang ke ${klinik.jalanPendek}`, "pukul 19.00"])}${chosen.kunjungan.map(row).join("")}</ul>
        <p class="ticket-who" data-slip="nama">Atas nama: (isi nama Anda)</p>
        <p class="ticket-note">Admin mengonfirmasi jamnya lewat chat WhatsApp.</p>
        <button class="btn btn-wa slip-send" type="submit" form="janji-form"><span class="btn-lead">${SVG.wa}</span><span>Kirim ke WhatsApp</span></button>
        <script type="application/json" data-janji-data>${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
      </div>
    </div></div>
  </div>
</section>`;
}

// questions that open one at a time
export const faqList = (items, { heading = "Yang sering <em>ditanyakan</em>", id = "tanya", from = "/" } = {}) => `<section class="section faq" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap faq-grid">
    <div class="faq-side">
      <p class="pill">Tanya jawab</p>
      <h2 id="${id}-h">${heading}</h2>
      <p>Pertanyaan Anda belum terjawab? Admin klinik membalas lewat WhatsApp.</p>
      ${waBtn("Tanya admin", "saya ingin bertanya.", from)}
    </div>
    <div class="faq-list">${items.map(([q, a]) => `<details class="qa"><summary><span>${e(q)}</span><span class="qa-ic" aria-hidden="true"></span></summary><div class="qa-a"><p>${e(a)}</p></div></details>`).join("")}</div>
  </div>
</section>`;

// the weekly hours as a real table; today's row is marked by the script
export const hoursTable = () => `<table class="hours">
  <caption class="sr">Jam buka</caption>
  <tbody>${jam.map((j) => `<tr data-day="${j.day}"><th scope="row">${j.hari}</th><td>${j.buka === 0 && j.tutup === 24 ? "Buka 24 jam" : `${String(j.buka).padStart(2, "0")}.00–${j.tutup}.00`}</td></tr>`).join("")}</tbody>
</table>`;

export function location({ from = "/", heading = "Di Pleburan, dekat <em>Simpang Lima</em>" } = {}) {
  return `<section class="section lokasi" id="lokasi" aria-labelledby="lokasi-h">
  <div class="wrap lokasi-grid">
    <div class="lokasi-copy">
      <p class="pill">Lokasi</p>
      <h2 id="lokasi-h">${heading}</h2>
      <address>${icon("pin")}<span>${e(alamatLengkap)}<br><small>${e(klinik.patokan)} · Plus Code ${e(klinik.plusCode.split(" ")[0])}</small></span></address>
      <p class="status"><span class="dot" aria-hidden="true"></span><span data-open-status>${e(jamRingkas)}</span></p>
      ${hoursTable()}
      <div class="acts">${btn("Petunjuk arah", klinik.maps, { ext: true })}${waBtn("Chat WhatsApp", "saya ingin bertanya soal jadwal.", from)}</div>
    </div>
    <div class="shell map-shell"><div class="core">
      <iframe class="map" title="Peta lokasi ${e(klinik.nama)} di Google Maps" src="https://maps.google.com/maps?q=${klinik.geo.lat},${klinik.geo.lon}&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div></div>
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
