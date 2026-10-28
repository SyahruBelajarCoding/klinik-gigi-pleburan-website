// Every page of the site. Each returns { path, html }; build.mjs writes them to dist/.
import { klinik, layanan, behel, faq } from "./data.mjs";
import { e, img, icon, tooth, wa, waBtn, btn, page, stage, serviceList, servicePics, behelPlate, booking, faqText, contactBand, dentist, faqSchema, crumbs, alamatLengkap } from "./lib.mjs";

const HERO_PICS = [
  ["cermin", "Kaca mulut dokter gigi di depan kursi periksa yang buram", "awal"],
  ["kursi", "Kursi periksa gigi berwarna putih di dekat jendela", "awal"],
  ["sonde", "Kaca mulut dan sonde, alat pemeriksaan gigi, di atas meja putih", "awal"],
];
const SUFFIX = "Klinik Gigi & Ortodonti Pleburan";

// a letter from the doctors; the wording is a draft for the clinic to confirm
const LETTER = [
  "Klinik kami ada di Jl. Pleburan Barat 3E, tidak jauh dari Simpang Lima. Di sini ada dokter gigi untuk keluhan sehari-hari, seperti tambal, scaling dan cabut gigi, dan dokter gigi spesialis ortodonti untuk behel.",
  "Sebelum tindakan, kami tunjukkan dulu kondisi gigi Anda, menjelaskan pilihan perawatannya, dan menyebutkan perkiraan biayanya. Keputusannya tetap di tangan Anda.",
  "Kami buka sampai malam dan juga hari Minggu, karena banyak pasien baru sempat setelah kerja atau kuliah. Kabari jam berapa Anda datang, supaya kursi sudah siap dan Anda tidak menunggu lama.",
  "Selama tindakan kami putar musik. Bila ada yang terasa tidak nyaman, angkat tangan; kami berhenti dulu dan menjelaskan apa yang sedang dikerjakan.",
];
const signOff = `<p class="sign">${klinik.dokter.map((d) => e(d.nama)).join(" dan ")}<span>${e(klinik.nama)}, Pleburan</span></p>`;

const letter = () => `<section class="letter" aria-label="Surat dari dokter">
  <div class="letter-col">
    ${tooth("letter-mark")}
    ${LETTER.map((p) => `<p>${e(p)}</p>`).join("")}
    ${signOff}
  </div>
</section>`;

// ---------- home ----------
function home() {
  const sheet = `<section class="hero">
      <h1>Klinik gigi &amp; behel di Pleburan</h1>
      <p class="lead">Dokter gigi dan dokter gigi spesialis ortodonti di ${e(klinik.jalanPendek)}, Semarang. Buka setiap hari, Minggu sampai pukul 22.00.</p>
      <div class="acts">${waBtn("Buat janji lewat WhatsApp", "saya ingin membuat janji periksa gigi.", "beranda")}<a class="link" href="#janji">atau pilih jam dulu</a></div>
      <p class="hero-note"><a href="${klinik.maps}" target="_blank" rel="noopener">${klinik.ulasan.nilai} di Google Maps, dari ${klinik.ulasan.jumlah} ulasan pasien</a></p>
    </section>
    ${serviceList({ from: "beranda" })}`;
  const body = stage({ current: "beranda", sheet, label: "Foto suasana perawatan gigi", pics: [...HERO_PICS, ...servicePics()] })
    + behelPlate(behel.tab, { from: "beranda" })
    + booking({ from: "beranda" })
    + letter()
    + contactBand({ from: "beranda" })
    + faqText(faq);
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
const factList = (items) => `<dl class="facts">${items.map(([k, v]) => `<div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join("")}</dl>`;
const prose = (id, heading, inner) => `<section class="prose" aria-labelledby="${id}"><h2 id="${id}">${e(heading)}</h2>${inner}</section>`;
const ul = (items) => `<ul class="dots">${items.map((i) => `<li>${e(i)}</li>`).join("")}</ul>`;
const paras = (items) => items.map((p) => `<p>${e(p)}</p>`).join("");

const others = (skip) => `<section class="others" aria-labelledby="others-h">
  <h2 id="others-h">Perawatan lain</h2>
  <ul>${layanan.filter((l) => l.url && l.slug !== skip).map((l) => `<li><a href="${l.url}"><span>${e(l.nama)}</span><span class="svc-dur">${e(l.durasi)}</span>${icon("arrow")}</a></li>`).join("")}</ul>
</section>`;

function servicePage(l) {
  const from = l.url;
  const sheet = `<section class="hero hero-page">
      <h1>${e(l.pendek)} di Semarang</h1>
      <p class="lead">${e(l.lead)}</p>
      ${factList([["Lama tindakan", l.durasi], ["Kunjungan", l.hasil]])}
      <div class="acts">${waBtn(`Tanya soal ${l.pendek.toLowerCase()}`, `saya ingin bertanya soal ${l.nama.toLowerCase()}.`, from)}<a class="link" href="#janji">atau pilih jam dulu</a></div>
    </section>
    ${prose("apa-h", "Apa yang dilakukan", paras(l.apa) + (l.img2 ? `<figure class="inline-pic">${img(l.img2[0], l.img2[1], { sizes: "(max-width: 900px) 90vw, 40vw" })}</figure>` : ""))}
    ${prose("cocok-h", "Cocok bila", ul(l.cocok))}
    ${prose("risiko-h", "Risiko dan batasan", ul(l.risiko))}
    ${prose("setelah-h", "Setelah perawatan", ul(l.setelah))}`;
  const body = stage({ current: l.slug, sheet, label: `Foto ${l.pendek.toLowerCase()}`, pics: [[l.img, l.alt, l.slug], HERO_PICS[1]] })
    + booking({ from, pick: l.slug, heading: "Atur kunjungan Anda", intro: `Keperluan ${l.pendek.toLowerCase()} sudah terpilih. Pilih hari dan jam; kartu janji terisi langkah kunjungannya dan terkirim ke admin lewat WhatsApp.` })
    + faqText(l.faq, { heading: `Soal ${l.pendek.toLowerCase()}` })
    + others(l.slug);
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
  const sheet = `<section class="hero hero-page">
      <h1>Behel oleh dokter gigi spesialis</h1>
      <p class="lead">${e(behel.lead)}</p>
      ${factList([["Lama perawatan", "Umumnya 1,5–3 tahun"], ["Kontrol", "Setiap 3–4 minggu"]])}
      <div class="acts">${waBtn("Konsultasi behel", "saya ingin konsultasi behel.", from)}<a class="link" href="#janji">atau pilih jam dulu</a></div>
    </section>
    ${prose("apa-h", "Cara behel bekerja", paras(behel.apa))}
    ${prose("cocok-h", "Cocok untuk", ul(behel.cocok))}`;
  const spesialis = `<section class="wide" aria-labelledby="sp-h">
    <figure class="wide-pic">${img("konsultasi-700", "Dokter gigi berbincang dengan pasien yang duduk di kursi periksa", { sizes: "(max-width: 900px) 100vw, 50vw" })}</figure>
    <div class="wide-text">
      <h2 id="sp-h">Kenapa spesialis ortodonti</h2>
      ${paras(behel.spesialis)}
      <h3>Risiko dan batasan</h3>
      ${ul(behel.risiko)}
      <h3>Merawat gigi saat berbehel</h3>
      ${ul(behel.setelah)}
    </div>
  </section>`;
  const body = stage({ current: "behel", sheet, label: "Foto behel", pics: [["behel", b.alt, "behel"], ["cermin", HERO_PICS[0][1], "awal"]] })
    + behelPlate(behel.tab, { from, heading: "Dari pasang sampai retainer", more: false })
    + spesialis
    + booking({ from, pick: "behel", heading: "Atur konsultasi behel", intro: "Keperluan behel sudah terpilih. Pilih hari dan jam; kartu janji terisi tahap perawatannya dan terkirim ke admin lewat WhatsApp." })
    + faqText(behel.faq, { heading: "Soal behel" });
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
  const sheet = `<section class="hero hero-page">
      <h1>Dokter dan klinik kami</h1>
      <p class="lead">Klinik gigi dengan dokter gigi umum dan dokter gigi spesialis ortodonti, di ${e(klinik.jalanPendek)}, Pleburan, Semarang.</p>
    </section>
    <section class="prose" aria-label="Surat dari dokter">${paras(LETTER)}${signOff}</section>
    ${prose("tim-h", "Tim dokter", `<dl class="team">${klinik.dokter.map((d) => `<div><dt>${e(d.nama)}</dt><dd>${e(d.peran)}</dd></div>`).join("")}<div><dt>Dokter gigi spesialis ortodonti (Sp.Ort)</dt><dd>Perawatan behel</dd></div></dl>`)}`;
  const body = stage({ current: "tentang", sheet, label: "Foto ruang praktik", pics: [HERO_PICS[1], ["konsultasi", layanan[0].alt, "konsultasi"]] })
    + contactBand({ from: "/tentang/" });
  return page({
    path: "/tentang/",
    title: `Tentang Klinik dan Dokter | ${SUFFIX}`,
    description: `Kenali dokter gigi dan dokter gigi spesialis ortodonti di ${klinik.jalan}, Pleburan, Semarang, dan cara kami menangani pasien.`,
    current: "tentang",
    body,
    schema: [dentist(), crumbs([["Beranda", "/"], ["Tentang", "/tentang/"]])],
  });
}

// ---------- hours and directions ----------
function kontak() {
  const sheet = `<section class="hero hero-page">
      <h1>Jadwal dan lokasi klinik</h1>
      <p class="lead">${e(alamatLengkap)}. ${e(klinik.patokan)}.</p>
      ${factList([["Senin–Sabtu", "Buka 24 jam; malam hari, kabari dulu lewat WhatsApp"], ["Minggu", "08.00–22.00"], ["WhatsApp dan telepon", klinik.tel], ["Plus Code", klinik.plusCode]])}
      <div class="acts">${btn("Petunjuk arah", klinik.maps, { ext: true, ic: "out" })}${waBtn("Chat WhatsApp", "saya ingin bertanya soal jadwal.", "/kontak/", "btn-tone")}</div>
    </section>`;
  const body = stage({ current: "kontak", sheet, label: "Foto Semarang", pics: [["simpang-lima-tegak", "Lapangan dan menara masjid di Simpang Lima, Semarang, di siang hari", "kota"], HERO_PICS[1]] })
    + contactBand({ from: "/kontak/" })
    + booking({ from: "/kontak/" })
    + faqText(faq.slice(0, 4));
  return page({
    path: "/kontak/",
    title: `Jadwal & Lokasi | ${SUFFIX}`,
    description: `Jam buka, alamat, dan petunjuk arah ke ${klinik.nama} di ${klinik.jalan}, Pleburan, Semarang Selatan. Senin–Sabtu 24 jam, Minggu 08.00–22.00.`,
    current: "kontak",
    body,
    schema: [dentist(), faqSchema(faq.slice(0, 4)), crumbs([["Beranda", "/"], ["Jadwal & lokasi", "/kontak/"]])],
  });
}

function notFound() {
  const sheet = `<section class="hero hero-page">
      <h1>Halaman tidak ditemukan</h1>
      <p class="lead">Alamat yang Anda buka tidak ada atau sudah dipindah. Coba mulai dari beranda, atau langsung tanyakan lewat WhatsApp.</p>
      <div class="acts">${btn("Ke beranda", "/", { ic: "arrow" })}${waBtn("Chat WhatsApp", "saya ingin bertanya.", "404", "btn-tone")}</div>
    </section>
    ${serviceList({ heading: "Mungkin yang Anda cari", from: "404" })}`;
  return page({ path: "/404.html", title: `Halaman tidak ditemukan | ${SUFFIX}`, description: "Halaman tidak ditemukan.", current: "", body: stage({ current: "", sheet, pics: [HERO_PICS[0], ...servicePics()] }) + faqText(faq.slice(0, 4)) });
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
