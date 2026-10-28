// Every page of the site. Each returns { path, html }; build.mjs writes them to dist/.
import { klinik, jamRingkas, layanan, behel, faq } from "./data.mjs";
import { e, img, small, icon, stars, btn, waBtn, head, page, pageHero, services, consult, behelBand, reviews, booking, faqList, location, dentist, faqSchema, crumbs, alamatLengkap } from "./lib.mjs";

const SUFFIX = "Klinik Gigi & Ortodonti Pleburan";

// a letter from the doctors; the wording is a draft for the clinic to confirm
const LETTER = [
  "Klinik kami ada di Jl. Pleburan Barat 3E, tidak jauh dari Simpang Lima. Di sini ada dokter gigi untuk keluhan sehari-hari, seperti tambal, scaling dan cabut gigi, dan dokter gigi spesialis ortodonti untuk behel.",
  "Sebelum tindakan, kami tunjukkan dulu kondisi gigi Anda, menjelaskan pilihan perawatannya, dan menyebutkan perkiraan biayanya. Keputusannya tetap di tangan Anda.",
  "Kami buka sampai malam dan juga hari Minggu, karena banyak pasien baru sempat setelah kerja atau kuliah. Kabari jam berapa Anda datang, supaya kursi sudah siap dan Anda tidak menunggu lama.",
  "Selama tindakan kami putar musik. Bila ada yang terasa tidak nyaman, angkat tangan; kami berhenti dulu dan menjelaskan apa yang sedang dikerjakan.",
];
const initials = (nama) => nama.replace(/^drg\.\s*/, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const sign = `<span class="monos" aria-hidden="true">${klinik.dokter.map((d) => `<span class="mono">${initials(d.nama)}</span>`).join("")}</span><span class="sign-txt"><strong>${klinik.dokter.map((d) => e(d.nama)).join(" dan ")}</strong><small>${e(klinik.nama)}, Pleburan</small></span>`;

const paras = (items) => items.map((p) => `<p>${e(p)}</p>`).join("");
const checks = (items) => `<ul class="checks">${items.map((i) => `<li>${icon("check")}<span>${e(i)}</span></li>`).join("")}</ul>`;
const dots = (items) => `<ul class="dots">${items.map((i) => `<li>${e(i)}</li>`).join("")}</ul>`;

// long reading on the left, the visit as a card that stays beside it
const article = (sections, side) => `<section class="section article" aria-label="Penjelasan perawatan">
  <div class="wrap article-grid">
    <div class="article-body">${sections.map(([id, h, inner]) => `<section class="art" aria-labelledby="${id}"><h2 id="${id}">${h}</h2>${inner}</section>`).join("")}</div>
    <aside class="article-side">${side}</aside>
  </div>
</section>`;
const visitCard = (title, rows, ask, from) => `<div class="shell"><div class="core visit">
  <p class="pill">Langkah kunjungan</p>
  <h3>${e(title)}</h3>
  <ol>${rows.map(([a, b]) => `<li><span>${e(a)}</span><span>${e(b)}</span></li>`).join("")}</ol>
  <div class="visit-acts">${btn("Pilih jam", "#janji")}${waBtn("Tanya lewat WhatsApp", ask, from)}</div>
</div></div>`;

// ---------- home ----------
function home() {
  const hero = `<section class="hero" data-hero aria-labelledby="hero-h">
  <picture class="hero-media">
    <source media="(max-width: 760px)" srcset="/img/hero-tegak.webp" width="900" height="1300">
    <img src="/img/hero-1000.webp" srcset="/img/hero-1000.webp 1000w, /img/hero.webp 2000w" sizes="100vw" alt="Dokter gigi berbincang dengan pasien yang tersenyum di kursi periksa" width="2000" height="1250" fetchpriority="high" decoding="async">
  </picture>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="pill pill-glass"><span class="dot" aria-hidden="true"></span><span data-open-status>${e(jamRingkas)}</span></p>
      <h1 id="hero-h">Senyum sehat, dirawat dengan <em>tenang</em>.</h1>
      <p class="hero-lead">Dokter gigi dan dokter gigi spesialis ortodonti di ${e(klinik.jalanPendek)}, Semarang, ${e(klinik.patokan)}.</p>
      <div class="acts">${btn("Buat janji", "#janji", { cls: "btn-light" })}${waBtn("Chat WhatsApp", "saya ingin membuat janji periksa gigi.", "beranda", "btn-glass")}</div>
    </div>
    <a class="hero-card" href="${klinik.maps}" target="_blank" rel="noopener">
      <span class="hero-card-num">${e(klinik.ulasan.nilai)}</span>
      <span class="hero-card-txt">${stars(klinik.ulasan.nilai)}<span>${e(klinik.ulasan.jumlah)} ulasan pasien di Google Maps</span></span>
      <span class="ic-circle">${icon("up")}</span>
    </a>
  </div>
</section>`;
  const intro = `<section class="intro" aria-label="Klinik ini secara singkat">
  <div class="wrap">
    <p class="intro-text">Satu klinik untuk perawatan gigi sehari-hari <span class="pic-pill">${img("sonde-lebar-700", "", { sizes: "160px" })}</span> dan behel yang direncanakan dokter gigi spesialis ortodonti <span class="pic-pill">${img("behel-tangan-700", "", { sizes: "160px" })}</span> <span class="soft">buka sampai malam, juga hari Minggu.</span></p>
    <dl class="stats">
      <div><dt>Senin–Sabtu</dt><dd>24 jam</dd></div>
      <div><dt>Minggu</dt><dd>08–22</dd></div>
      <div><dt>Dari Simpang Lima</dt><dd>±850 m</dd></div>
      <div><dt>Nilai di Google Maps</dt><dd>${e(klinik.ulasan.nilai)}</dd></div>
    </dl>
  </div>
</section>`;
  const body = hero + intro
    + services()
    + consult({ from: "beranda" })
    + behelBand(behel.tab, { from: "beranda", lead: behel.lead })
    + reviews({ quote: LETTER[1], sign })
    + booking({ from: "beranda" })
    + faqList(faq, { from: "beranda" })
    + location({ from: "beranda" });
  return page({
    path: "/",
    title: `Klinik Gigi & Spesialis Ortodonti di Pleburan, Semarang | Behel, Tambal, Scaling`,
    description: `Dokter gigi dan dokter gigi spesialis ortodonti di ${klinik.jalan}, Semarang. Behel, tambal, scaling, cabut gigi bungsu. Senin–Sabtu 24 jam, Minggu 08.00–22.00. Buat janji lewat WhatsApp.`,
    current: "beranda",
    body,
    schema: [dentist(), faqSchema(faq)],
  });
}

// ---------- one page per treatment ----------
function servicePage(l) {
  const from = l.url;
  const ask = `saya ingin bertanya soal ${l.nama.toLowerCase()}.`;
  const body = pageHero({
    crumb: l.pendek,
    h1: `${e(l.pendek)} <em>di Semarang</em>`,
    lead: e(l.lead),
    facts: [["Lama tindakan", l.durasi], ["Kunjungan", l.hasil]],
    acts: btn("Pilih jam", "#janji") + waBtn(`Tanya soal ${l.pendek.toLowerCase()}`, ask, from),
    pic: [small(l.img), l.alt],
  })
    + article([
      ["apa-h", "Apa yang dilakukan", paras(l.apa) + (l.img2 ? `<figure class="shell inline-pic"><div class="core">${img(l.img2[0], l.img2[1], { sizes: "(max-width: 900px) 92vw, 52vw" })}</div></figure>` : "")],
      ["cocok-h", "Cocok bila", checks(l.cocok)],
      ["risiko-h", "Risiko dan batasan", dots(l.risiko)],
      ["setelah-h", "Setelah perawatan", checks(l.setelah)],
    ], visitCard(l.nama, l.kunjungan, ask, from))
    + booking({ from, pick: l.slug, heading: "Atur <em>kunjungan Anda</em>", intro: `Keperluan ${l.pendek.toLowerCase()} sudah terpilih. Pilih hari dan jam; kartu janji terisi langkah kunjungannya dan terkirim ke admin lewat WhatsApp.` })
    + faqList(l.faq, { heading: `Soal <em>${e(l.pendek.toLowerCase())}</em>`, from })
    + services({ skip: l.slug, id: "lainnya", pill: "Layanan lain", heading: "Perawatan <em>lainnya</em>", sub: "Setiap perawatan punya halaman sendiri: langkah kunjungan, risiko, dan cara merawatnya." });
  return page({
    path: l.url,
    title: `${l.judulSeo} | ${SUFFIX}`,
    description: `${l.lead} ${klinik.jalan}, Semarang. Buat janji lewat WhatsApp.`.slice(0, 300),
    current: l.slug,
    body,
    schema: [dentist(), faqSchema(l.faq), crumbs([["Beranda", "/"], [l.nama, l.url]])],
  });
}

// ---------- behel, the clinic's speciality ----------
function behelPage() {
  const from = "/behel/";
  const b = layanan.find((l) => l.slug === "behel");
  const ask = "saya ingin konsultasi behel.";
  const spesialis = `<section class="section wide" aria-labelledby="sp-h">
  <div class="wrap wide-grid">
    <figure class="shell wide-pic"><div class="core">${img("konsultasi-700", "Dokter gigi berbincang dengan pasien yang duduk di kursi periksa", { sizes: "(max-width: 900px) 92vw, 44vw" })}</div></figure>
    <div class="wide-text">
      <p class="pill">Kenapa spesialis</p>
      <h2 id="sp-h">Behel adalah <em>tindakan medis</em></h2>
      ${paras(behel.spesialis)}
      <h3>Risiko dan batasan</h3>
      ${dots(behel.risiko)}
      <h3>Merawat gigi saat berbehel</h3>
      ${checks(behel.setelah)}
    </div>
  </div>
</section>`;
  const body = pageHero({
    crumb: "Behel",
    h1: `Behel oleh dokter gigi <em>spesialis</em>`,
    lead: e(behel.lead),
    facts: [["Lama perawatan", "Umumnya 1,5–3 tahun"], ["Kontrol", "Setiap 3–4 minggu"]],
    acts: btn("Pilih jam konsultasi", "#janji") + waBtn("Konsultasi behel", ask, from),
    pic: ["behel-700", b.alt],
  })
    + article([
      ["apa-h", "Cara behel bekerja", paras(behel.apa)],
      ["cocok-h", "Cocok untuk", checks(behel.cocok)],
    ], visitCard("Tahap perawatan behel", behel.kunjungan, ask, from))
    + behelBand(behel.tab, { from, heading: "Dari pasang sampai <em>retainer</em>", more: false })
    + spesialis
    + booking({ from, pick: "behel", heading: "Atur <em>konsultasi behel</em>", intro: "Keperluan behel sudah terpilih. Pilih hari dan jam; kartu janji terisi tahap perawatannya dan terkirim ke admin lewat WhatsApp." })
    + faqList(behel.faq, { heading: "Soal <em>behel</em>", from });
  return page({
    path: from,
    title: `Behel di Semarang oleh Dokter Gigi Spesialis Ortodonti | ${SUFFIX}`,
    description: `Pasang behel di Pleburan, Semarang dengan rencana dari dokter gigi spesialis ortodonti (Sp.Ort). Tahapan, lama perawatan, risiko, dan cara merawat behel. Buat janji lewat WhatsApp.`,
    current: "behel",
    body,
    schema: [dentist(), faqSchema(behel.faq), crumbs([["Beranda", "/"], ["Behel", from]])],
  });
}

// ---------- about ----------
function tentang() {
  const from = "/tentang/";
  const team = [
    ...klinik.dokter.map((d) => [initials(d.nama), d.nama, d.peran, "Pemeriksaan, tambal, scaling, cabut gigi, dan perawatan gigi sehari-hari."]),
    ["Sp", "Dokter gigi spesialis ortodonti (Sp.Ort)", "Spesialis ortodonti", "Merencanakan dan memantau perawatan behel, dari pemeriksaan sampai retainer."],
  ];
  const body = pageHero({
    crumb: "Tentang",
    h1: `Dokter dan <em>klinik kami</em>`,
    lead: `Klinik gigi dengan dokter gigi umum dan dokter gigi spesialis ortodonti, di ${e(klinik.jalanPendek)}, Pleburan, Semarang.`,
    acts: btn("Buat janji", "#janji") + waBtn("Chat WhatsApp", "saya ingin bertanya.", from),
    pic: ["ruang-1200", "Ruang praktik dokter gigi yang terang dengan kursi periksa"],
  })
    + `<section class="section" aria-labelledby="surat-h">
  <div class="wrap narrow">
    <div class="shell"><div class="core letter-full">
      <p class="pill">Surat dari dokter</p>
      <h2 id="surat-h">Cara kami <em>menangani pasien</em></h2>
      ${paras(LETTER)}
      <p class="sign">${sign}</p>
    </div></div>
  </div>
</section>`
    + `<section class="section team-sec" aria-labelledby="tim-h">
  <div class="wrap">
    ${head({ pill: "Tim", h: "Tim <em>dokter</em>", id: "tim-h", sub: "Dokter gigi untuk keluhan sehari-hari, dan dokter gigi spesialis ortodonti untuk perawatan behel." })}
    <ul class="team">${team.map(([m, n, r, d]) => `<li class="shell"><div class="core member"><span class="mono mono-lg" aria-hidden="true">${m}</span><h3>${e(n)}</h3><p class="role">${e(r)}</p><p>${e(d)}</p></div></li>`).join("")}</ul>
  </div>
</section>`
    + booking({ from })
    + location({ from });
  return page({
    path: from,
    title: `Tentang Klinik dan Dokter | ${SUFFIX}`,
    description: `Kenali dokter gigi dan dokter gigi spesialis ortodonti di ${klinik.jalan}, Pleburan, Semarang, dan cara kami menangani pasien.`,
    current: "tentang",
    body,
    schema: [dentist(), crumbs([["Beranda", "/"], ["Tentang", from]])],
  });
}

// ---------- hours and directions ----------
function kontak() {
  const from = "/kontak/";
  const body = pageHero({
    crumb: "Lokasi",
    h1: `Jadwal dan <em>lokasi</em>`,
    lead: `${e(alamatLengkap)}. ${e(klinik.patokan)}.`,
    facts: [["Senin–Sabtu", "Buka 24 jam"], ["Minggu", "08.00–22.00"], ["WhatsApp", klinik.tel]],
    acts: btn("Petunjuk arah", klinik.maps, { ext: true }) + waBtn("Chat WhatsApp", "saya ingin bertanya soal jadwal.", from),
    pic: ["simpang-lima-tegak-700", "Lapangan dan menara masjid di Simpang Lima, Semarang, di siang hari"],
  })
    + location({ from, heading: "Cara <em>ke klinik</em>" })
    + booking({ from })
    + faqList(faq.slice(0, 4), { from });
  return page({
    path: from,
    title: `Jadwal & Lokasi | ${SUFFIX}`,
    description: `Jam buka, alamat, dan petunjuk arah ke ${klinik.nama} di ${klinik.jalan}, Pleburan, Semarang Selatan. Senin–Sabtu 24 jam, Minggu 08.00–22.00.`,
    current: "kontak",
    body,
    schema: [dentist(), faqSchema(faq.slice(0, 4)), crumbs([["Beranda", "/"], ["Jadwal & lokasi", from]])],
  });
}

function notFound() {
  const body = pageHero({
    h1: `Halaman <em>tidak ditemukan</em>`,
    lead: "Alamat yang Anda buka tidak ada atau sudah dipindah. Coba mulai dari beranda, atau langsung tanyakan lewat WhatsApp.",
    acts: btn("Ke beranda", "/", { ic: "arrow" }) + waBtn("Chat WhatsApp", "saya ingin bertanya.", "404"),
    pic: ["cermin-800", "Kaca mulut dokter gigi di depan kursi periksa"],
  })
    + services({ heading: "Mungkin yang <em>Anda cari</em>" })
    + faqList(faq.slice(0, 4), { from: "404" });
  return page({ path: "/404.html", title: `Halaman tidak ditemukan | ${SUFFIX}`, description: "Halaman tidak ditemukan.", current: "", body, janji: "/#janji" });
}

export function all() {
  return [
    { path: "/", html: home() },
    { path: "/behel/", html: behelPage() },
    ...layanan.filter((l) => l.url && l.slug !== "behel").map((l) => ({ path: l.url, html: servicePage(l) })),
    { path: "/tentang/", html: tentang() },
    { path: "/kontak/", html: kontak() },
    { path: "/404.html", html: notFound() },
  ];
}
