// Everything the clinic may want to change lives in this file: name, address, hours, doctors, services, questions.
// Change it here once and every page follows.

// The address the site is published at. Change it when the clinic has its own domain.
export const SITE = "https://klinik-gigi-pleburan-website.vercel.app";

export const klinik = {
  // the name exactly as on Google Maps, so the name, address and phone match everywhere (local SEO)
  namaResmi: "Klinik Gigi Praktek Dokter Gigi dan Dokter Gigi Spesialis Ortodonti",
  nama: "Klinik Gigi & Spesialis Ortodonti",
  merek: "Klinik Gigi & Ortodonti",
  jalan: "Jl. Pleburan Barat No. 3E",
  jalanPendek: "Jl. Pleburan Barat 3E",
  kelurahan: "Pleburan",
  kecamatan: "Semarang Selatan",
  kota: "Semarang",
  provinsi: "Jawa Tengah",
  kodePos: "50144",
  plusCode: "2C2F+RJ Pleburan, Kota Semarang",
  patokan: "±850 m dari Simpang Lima",
  geo: { lat: -6.9978935, lon: 110.424022 },
  wa: "6287838399469",
  tel: "0878-3839-9469",
  maps: "https://maps.google.com/?cid=8911985002724575285",
  ulasan: { nilai: "4,7", jumlah: 312 },
  // names as patients write them in Google reviews; full titles, STR and who holds the Sp.Ort to be confirmed by the clinic
  dokter: [
    { nama: "drg. Stefanus Evan", peran: "Dokter gigi" },
    { nama: "drg. Felicia", peran: "Dokter gigi" },
  ],
};

// Opening hours as listed on Google Maps (Senin–Sabtu 24 jam, Minggu 08.00–22.00).
// day: 0 = Minggu … 6 = Sabtu. buka/tutup in hours; 0–24 means open all day.
export const jam = [
  { hari: "Senin", day: 1, buka: 0, tutup: 24 },
  { hari: "Selasa", day: 2, buka: 0, tutup: 24 },
  { hari: "Rabu", day: 3, buka: 0, tutup: 24 },
  { hari: "Kamis", day: 4, buka: 0, tutup: 24 },
  { hari: "Jumat", day: 5, buka: 0, tutup: 24 },
  { hari: "Sabtu", day: 6, buka: 0, tutup: 24 },
  { hari: "Minggu", day: 0, buka: 8, tutup: 22 },
];
export const jamRingkas = "Senin–Sabtu 24 jam · Minggu 08.00–22.00";
// hours a visitor can pick when asking for an appointment
export const slotJam = ["08.00", "09.00", "10.00", "11.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00"];

// Treatments. `kunjungan` is the visit, printed as the slip; durations are typical ranges, the doctor confirms them.
export const layanan = [
  {
    slug: "konsultasi",
    nama: "Pemeriksaan & konsultasi",
    pendek: "Pemeriksaan",
    img: "konsultasi",
    alt: "Dokter gigi berbincang dengan pasien yang duduk di kursi periksa",
    durasi: "20–30 menit",
    ringkas: "Dokter memeriksa seluruh gigi dan gusi, menjawab keluhan Anda, lalu menjelaskan pilihan perawatan beserta perkiraan biayanya.",
    kunjungan: [["Cerita keluhan Anda", "5 menit"], ["Pemeriksaan gigi dan gusi", "10 menit"], ["Pilihan perawatan dan biaya", "10 menit"]],
  },
  {
    slug: "behel",
    url: "/behel/",
    nama: "Behel (kawat gigi)",
    pendek: "Behel",
    img: "behel",
    alt: "Dua model rahang, salah satunya dipasangi behel logam",
    durasi: "1,5–3 tahun",
    ringkas: "Dirancang dan dipantau dokter gigi spesialis ortodonti. Gigi digeser pelan-pelan, dengan kontrol rutin setiap 3–4 minggu.",
    kunjungan: [["Pemeriksaan, foto dan cetak gigi", "30–45 menit"], ["Rencana perawatan dan biaya", "15 menit"], ["Pemasangan behel", "60–90 menit"], ["Kontrol rutin", "tiap 3–4 minggu"]],
  },
  {
    slug: "tambal-gigi",
    url: "/layanan/tambal-gigi/",
    nama: "Tambal gigi",
    pendek: "Tambal gigi",
    img: "tambal",
    img2: ["sonde-lebar-700", "Kaca mulut dan sonde, alat pemeriksaan gigi, di atas meja putih"],
    alt: "Dokter gigi memeriksa gigi pasien dengan kaca mulut",
    durasi: "30–60 menit per gigi",
    ringkas: "Gigi berlubang atau gompal diisi bahan tambal sewarna gigi, dibentuk ulang dan dipoles dalam satu kunjungan.",
    judulSeo: "Tambal Gigi di Semarang",
    lead: "Gigi berlubang, ngilu, atau tambalan lama lepas? Lubang dibersihkan lalu diisi bahan sewarna gigi, biasanya selesai dalam satu kunjungan.",
    apa: [
      "Tambal gigi mengganti bagian gigi yang berlubang atau patah dengan bahan tambal sewarna gigi (komposit). Bahan ini dibentuk mengikuti gigi asli, lalu dikeraskan dengan sinar.",
      "Makin kecil lubangnya, makin sederhana perawatannya. Lubang yang dibiarkan bisa sampai ke saraf gigi, dan saat itu tambal saja tidak lagi cukup.",
    ],
    cocok: ["Gigi ngilu saat minum dingin atau makan manis", "Ada lubang atau warna hitam di permukaan gigi", "Tambalan lama lepas, retak atau bocor", "Gigi depan sedikit gompal"],
    kunjungan: [["Pemeriksaan, rontgen bila perlu", "10 menit"], ["Membersihkan bagian berlubang", "10–20 menit"], ["Mengisi dan membentuk tambalan", "15–30 menit"], ["Cek gigitan dan poles", "5–10 menit"]],
    hasil: "Satu kunjungan, sekitar 30–60 menit per gigi",
    risiko: [
      "Gigi bisa terasa ngilu beberapa hari setelah ditambal. Ini wajar dan biasanya hilang sendiri.",
      "Lubang yang sudah mengenai saraf perlu perawatan saluran akar lebih dulu; dokter menjelaskannya bila ditemukan.",
      "Tambalan bisa aus atau berubah warna karena kopi, teh dan rokok, dan suatu saat perlu diganti.",
    ],
    setelah: ["Tambalan sinar bisa langsung dipakai makan.", "Hindari menggigit es batu atau benda keras dengan gigi yang ditambal.", "Sikat gigi dua kali sehari dan periksa ulang setiap enam bulan."],
    faq: [
      ["Apakah tambal gigi sakit?", "Untuk lubang kecil umumnya tidak perlu bius. Untuk lubang yang dalam, dokter memakai bius lokal supaya Anda nyaman."],
      ["Berapa lama tambalan bertahan?", "Bertahun-tahun bila dirawat, tetapi tidak selamanya. Kebiasaan menggigit benda keras dan kebersihan gigi sangat menentukan."],
      ["Bisa menambal beberapa gigi sekaligus?", "Bisa, tergantung jumlah dan dalamnya lubang. Dokter akan menyarankan dibagi dalam beberapa kunjungan bila terlalu lama."],
    ],
  },
  {
    slug: "scaling",
    url: "/layanan/scaling/",
    nama: "Scaling (bersihkan karang gigi)",
    pendek: "Scaling",
    img: "scaling",
    img2: ["periksa-lebar-700", "Dokter gigi membersihkan gigi pasien dengan kaca mulut dan alat pembersih"],
    alt: "Tangan bersarung tangan memegang kaca mulut dan alat pemeriksaan gigi",
    durasi: "30–45 menit",
    ringkas: "Karang gigi di atas dan di bawah garis gusi dibersihkan dengan alat ultrasonik, lalu gigi dipoles.",
    judulSeo: "Scaling Gigi di Semarang",
    lead: "Gusi mudah berdarah atau napas kurang segar? Karang gigi tidak bisa hilang dengan sikat gigi; dibersihkan di klinik dalam satu kunjungan.",
    apa: [
      "Karang gigi adalah plak yang mengeras, biasanya menempel di dekat gusi. Ia membuat gusi meradang, mudah berdarah, dan menjadi sumber bau mulut.",
      "Saat scaling, karang dilepas dengan alat ultrasonik yang bergetar halus dan disemprot air, lalu permukaan gigi dipoles supaya plak tidak mudah menempel lagi.",
    ],
    cocok: ["Gusi berdarah saat sikat gigi", "Ada kerak kuning atau cokelat di dekat gusi", "Bau mulut yang tidak hilang", "Terakhir scaling lebih dari enam bulan lalu"],
    kunjungan: [["Pemeriksaan gusi dan karang", "5–10 menit"], ["Pembersihan ultrasonik", "20–30 menit"], ["Poles dan bilas", "5–10 menit"], ["Saran cara menyikat gigi", "5 menit"]],
    hasil: "Satu kunjungan, sekitar 30–45 menit",
    risiko: [
      "Gigi bisa terasa ngilu satu sampai tiga hari, terutama bila karangnya tebal.",
      "Gusi yang sedang meradang bisa berdarah saat dibersihkan.",
      "Scaling tidak memutihkan gigi; ia mengembalikan warna asli gigi. Untuk gigi lebih cerah, tanyakan soal bleaching.",
      "Karang yang sangat banyak kadang perlu dua kunjungan.",
    ],
    setelah: ["Bila ngilu, hindari minuman terlalu dingin atau panas sehari.", "Sikat gigi pelan di garis gusi dan pakai benang gigi.", "Ulangi scaling setiap enam bulan."],
    faq: [
      ["Apakah scaling merusak email gigi?", "Tidak, bila dilakukan dengan benar. Alat ultrasonik melepas karang, bukan mengikis email."],
      ["Seberapa sering perlu scaling?", "Umumnya setiap enam bulan. Bila karang cepat terbentuk atau Anda memakai behel, dokter bisa menyarankan lebih sering."],
      ["Apakah boleh scaling saat memakai behel?", "Boleh, bahkan dianjurkan, karena bracket membuat plak lebih mudah menumpuk."],
    ],
  },
  {
    slug: "cabut-gigi-bungsu",
    url: "/layanan/cabut-gigi-bungsu/",
    nama: "Cabut gigi & gigi bungsu",
    pendek: "Cabut gigi",
    img: "cabut",
    img2: ["alat-lebar-700", "Tangan bersarung tangan memegang alat pemeriksaan gigi"],
    alt: "Dokter membaca foto rontgen gigi pada layar terang",
    durasi: "30–90 menit",
    ringkas: "Gigi yang tidak bisa dipertahankan dicabut dengan bius lokal. Gigi bungsu miring atau terpendam diperiksa dulu dengan rontgen.",
    judulSeo: "Cabut Gigi & Gigi Bungsu di Semarang",
    lead: "Gigi bungsu miring dan gusi bengkak, atau gigi rusak yang tak bisa ditambal? Diperiksa dengan rontgen dulu, lalu dicabut dengan bius lokal.",
    apa: [
      "Gigi dicabut bila sudah tidak bisa dipertahankan: rusak parah, tinggal akar, atau goyang karena penyakit gusi. Sebelum mencabut, dokter memastikan dengan pemeriksaan dan, bila perlu, foto rontgen.",
      "Gigi bungsu yang tumbuh miring atau terpendam (impaksi) sering membuat gusi bengkak dan nyeri. Pencabutannya kadang perlu tindakan bedah kecil (odontektomi) dengan jahitan.",
    ],
    cocok: ["Gigi bungsu tumbuh miring dan gusi sering bengkak", "Gigi rusak parah atau tinggal sisa akar", "Gigi goyang yang tidak bisa dirawat lagi", "Diminta dokter sebagai bagian dari rencana behel"],
    kunjungan: [["Pemeriksaan dan foto rontgen", "10–15 menit"], ["Bius lokal", "5–10 menit"], ["Pencabutan", "15–60 menit"], ["Penjelasan perawatan luka dan obat", "5 menit"]],
    hasil: "Satu kunjungan; kontrol sekitar seminggu kemudian bila dijahit",
    risiko: [
      "Bengkak dan nyeri dua sampai tiga hari itu wajar, terutama setelah cabut gigi bungsu.",
      "Perdarahan ringan pada hari pertama bisa terjadi; gigit kapas sesuai petunjuk.",
      "Gigi bungsu yang sangat dalam atau dekat saraf bisa dirujuk ke dokter gigi spesialis bedah mulut.",
    ],
    setelah: ["Gigit kapas 30–60 menit setelah tindakan.", "24 jam pertama jangan berkumur keras, merokok, atau minum dengan sedotan.", "Makan yang lunak dan tidak panas, minum obat sesuai resep."],
    faq: [
      ["Apakah gigi bungsu selalu harus dicabut?", "Tidak. Gigi bungsu yang tumbuh lurus dan bisa dibersihkan boleh dibiarkan. Yang miring, terpendam, atau sering membuat bengkak biasanya disarankan dicabut."],
      ["Apakah bisa dicabut saat gusi sedang bengkak?", "Kadang bengkaknya perlu diredakan dulu dengan obat. Dokter memutuskan setelah memeriksa."],
      ["Berapa lama pulih setelah cabut gigi bungsu?", "Sebagian besar orang kembali beraktivitas biasa dalam dua sampai tiga hari; luka menutup dalam satu sampai dua minggu."],
    ],
  },
  {
    slug: "veneer-bleaching",
    url: "/layanan/veneer-bleaching/",
    nama: "Veneer & bleaching",
    pendek: "Veneer & bleaching",
    img: "estetik",
    // the smile sits high in this photograph; wide crops of it keep the top
    imgPos: "50% 18%",
    img2: ["konsultasi-lebar-700", "Dokter gigi berbincang dengan pasien sebelum perawatan"],
    alt: "Senyum seorang perempuan berambut ikal",
    durasi: "1–3 kunjungan",
    ringkas: "Bleaching mencerahkan warna gigi. Veneer menutup permukaan depan gigi untuk memperbaiki warna, bentuk, atau celah kecil.",
    judulSeo: "Veneer & Bleaching Gigi di Semarang",
    lead: "Gigi kusam, gompal, atau ada celah kecil di gigi depan? Dokter menjelaskan dulu apakah bleaching, veneer, atau tambal yang paling sesuai.",
    apa: [
      "Bleaching mencerahkan warna gigi dengan gel pemutih yang dioleskan dan diaktifkan di klinik. Warna gigi asli menjadi lebih terang; tambalan dan mahkota tidak ikut berubah warna.",
      "Veneer adalah lapisan tipis sewarna gigi yang dilekatkan di permukaan depan gigi. Ia bisa memperbaiki warna, bentuk yang tidak rata, atau celah kecil. Jenis bahan dan jumlah kunjungannya dijelaskan dokter setelah pemeriksaan.",
    ],
    cocok: ["Gigi kuning atau kusam karena kopi, teh, atau rokok", "Gigi depan gompal atau bentuknya tidak rata", "Celah kecil di antara gigi depan", "Ingin senyum lebih rapi sebelum acara penting"],
    kunjungan: [["Konsultasi warna dan bentuk", "15 menit"], ["Scaling bila ada karang", "30 menit"], ["Bleaching di klinik", "60–90 menit"], ["Veneer, bila dipilih", "1–3 kunjungan"]],
    hasil: "Bleaching satu kunjungan; veneer satu sampai tiga kunjungan",
    risiko: [
      "Gigi sering terasa ngilu sementara setelah bleaching.",
      "Hasil bleaching berbeda pada tiap orang, dan warna bisa kembali kusam perlahan.",
      "Veneer kadang memerlukan pengikisan tipis permukaan gigi, sehingga keputusan ini dipertimbangkan bersama dokter.",
      "Veneer bisa lepas atau patah bila dipakai menggigit benda keras.",
    ],
    setelah: ["48 jam setelah bleaching hindari kopi, teh, dan saus berwarna pekat.", "Jangan menggigit es, kuku, atau tutup botol dengan gigi berveneer.", "Kontrol dan scaling rutin setiap enam bulan."],
    faq: [
      ["Apakah bleaching merusak gigi?", "Bila dilakukan di klinik dengan bahan dan takaran yang tepat, bleaching aman untuk email. Efek yang paling sering adalah ngilu sementara."],
      ["Berapa lama hasil bleaching bertahan?", "Umumnya berbulan-bulan sampai beberapa tahun, tergantung kebiasaan minum kopi, teh, dan merokok."],
      ["Lebih baik veneer atau behel untuk gigi tidak rata?", "Tergantung penyebabnya. Gigi yang posisinya berjejal biasanya lebih tepat dirapikan dengan behel; veneer untuk bentuk dan warna. Dokter akan menjelaskan pilihannya."],
    ],
  },
  {
    slug: "crown-gigi-tiruan",
    url: "/layanan/crown-gigi-tiruan/",
    nama: "Mahkota (crown) & gigi tiruan",
    pendek: "Crown & gigi tiruan",
    img: "mahkota",
    img2: ["cermin-lebar-700", "Kaca mulut dokter gigi di depan kursi periksa"],
    alt: "Tangan bersarung tangan memegang model mahkota gigi",
    durasi: "2–3 kunjungan",
    ringkas: "Mahkota melindungi gigi yang rapuh. Gigi tiruan jembatan (bridge) mengganti gigi yang hilang dengan bertumpu pada gigi sebelahnya.",
    judulSeo: "Crown & Gigi Tiruan di Semarang",
    lead: "Gigi rapuh setelah tambalan besar, atau ada gigi yang hilang? Mahkota dan gigi tiruan jembatan dibuat sesuai cetakan gigi Anda.",
    apa: [
      "Mahkota (crown) adalah penutup seluruh bagian gigi yang terlihat. Ia dipakai untuk gigi yang rapuh, patah besar, atau sudah dirawat saluran akar, supaya gigi kembali kuat untuk mengunyah.",
      "Gigi tiruan jembatan (bridge) mengganti gigi yang hilang dengan gigi buatan yang bertumpu pada gigi di sebelahnya. Pilihan gigi tiruan lain dijelaskan saat konsultasi.",
    ],
    cocok: ["Gigi patah besar atau rapuh", "Gigi yang sudah dirawat saluran akar", "Tambalan besar yang sering lepas", "Ada gigi hilang dan ingin diganti gigi tiruan cekat"],
    kunjungan: [["Pemeriksaan dan rontgen", "15 menit"], ["Gigi dibentuk dan dicetak", "60–90 menit"], ["Pembuatan di laboratorium", "1–2 minggu"], ["Pemasangan dan cek gigitan", "30–60 menit"]],
    hasil: "Dua sampai tiga kunjungan dalam satu sampai dua minggu",
    risiko: [
      "Gigi penyangga perlu dikikis sebagian dan tidak bisa kembali seperti semula.",
      "Gigi bisa ngilu beberapa hari setelah dibentuk atau dipasang.",
      "Bagian bawah bridge perlu dibersihkan dengan benang gigi khusus supaya gusi tetap sehat.",
    ],
    setelah: ["Selama memakai mahkota sementara, hindari makanan lengket dan keras.", "Bersihkan sela dan bagian bawah bridge setiap hari.", "Kontrol setiap enam bulan supaya tepinya tetap rapat."],
    faq: [
      ["Berapa lama mahkota bertahan?", "Bertahun-tahun bila dirawat. Kebersihan gigi dan kebiasaan menggertakkan gigi sangat menentukan."],
      ["Apakah mahkota terlihat seperti gigi asli?", "Mahkota sewarna gigi dibuat menyesuaikan warna gigi di sebelahnya. Dokter akan menunjukkan pilihan warnanya."],
      ["Kalau gigi sudah lama hilang, apakah masih bisa dibuatkan bridge?", "Sering masih bisa, tetapi gigi di sekitarnya mungkin sudah bergeser. Dokter memeriksa dulu dan menjelaskan pilihan yang ada."],
    ],
  },
];

// The orthodontic page, the clinic's speciality.
export const behel = {
  lead: "Gigi berjejal, tonggos, gingsul, atau gigitan yang tidak pas dirapikan pelan-pelan, dengan rencana dari dokter gigi spesialis ortodonti (Sp.Ort).",
  apa: [
    "Behel atau kawat gigi cekat terdiri dari bracket kecil yang dilekatkan di permukaan gigi dan kawat yang menghubungkannya. Setiap kontrol, kawat disesuaikan sehingga gigi bergeser sedikit demi sedikit ke posisi yang direncanakan.",
    "Rencana itu dibuat dari pemeriksaan, foto, rontgen, dan cetakan gigi Anda. Karena itu dua orang dengan keluhan mirip bisa mendapat rencana dan lama perawatan yang berbeda.",
  ],
  cocok: ["Gigi berjejal atau bertumpuk", "Gigi depan maju (tonggos)", "Gingsul", "Gigitan terbalik, terlalu dalam, atau terbuka", "Celah di antara gigi"],
  tab: [
    ["Pemasangan", "Pemasangan behel", "Bracket dilekatkan satu per satu, lalu kawat dipasang. Sekitar 60–90 menit, tanpa bius. Beberapa hari pertama gigi terasa pegal; itu tanda gigi mulai bergerak."],
    ["Kontrol", "Kontrol tiap 3–4 minggu", "Dokter memeriksa kemajuan, mengganti karet, dan menyesuaikan kawat. Kontrol tepat waktu membuat perawatan tidak molor lebih lama dari rencana."],
    ["Retainer", "Setelah behel dilepas", "Gigi cenderung kembali ke posisi lama. Retainer, lepasan atau cekat, menjaga hasilnya; dokter menjelaskan berapa lama perlu dipakai."],
  ],
  kunjungan: [["Konsultasi dan pemeriksaan", "20–30 menit"], ["Foto, rontgen dan cetak gigi", "30 menit"], ["Rencana perawatan dan biaya", "15 menit"], ["Pemasangan behel", "60–90 menit"], ["Kontrol rutin", "tiap 3–4 minggu"], ["Lepas behel, pasang retainer", "60 menit"]],
  hasil: "Umumnya 1,5–3 tahun, tergantung kasus dan kedisiplinan kontrol",
  risiko: [
    "Gigi pegal dan sariawan ringan beberapa hari setelah pemasangan atau kontrol.",
    "Bracket menahan sisa makanan; tanpa sikat gigi yang teliti, risiko gigi berlubang dan radang gusi naik.",
    "Pada sebagian orang akar gigi bisa sedikit memendek selama perawatan; dokter memantaunya lewat rontgen.",
    "Tanpa retainer, gigi bisa bergeser kembali.",
    "Masalah rahang tertentu tidak cukup dengan behel saja dan perlu dirujuk untuk pemeriksaan lanjutan.",
  ],
  setelah: ["Sikat gigi setelah makan, pakai sikat khusus behel dan sikat sela.", "Hindari es batu, permen karet, dan makanan keras atau lengket.", "Bila bracket lepas atau kawat menusuk, hubungi klinik lewat WhatsApp."],
  spesialis: [
    "Dokter gigi spesialis ortodonti menempuh pendidikan spesialis sekitar tiga tahun setelah menjadi dokter gigi, khusus untuk pertumbuhan rahang dan pergerakan gigi.",
    "Memasang behel adalah tindakan medis. Menurut Permenkes No. 39 Tahun 2014, tukang gigi hanya boleh membuat dan memasang gigi tiruan lepasan, bukan kawat gigi. Sebelum memasang behel di mana pun, pastikan yang menangani adalah dokter gigi.",
  ],
  faq: [
    ["Umur berapa sebaiknya pasang behel?", "Pemeriksaan pertama bisa sejak usia sekitar tujuh tahun untuk melihat pertumbuhan rahang. Remaja dan orang dewasa juga bisa memakai behel, selama gigi dan gusinya sehat."],
    ["Apakah pasang behel sakit?", "Pemasangannya tidak memerlukan bius. Yang biasa terasa adalah pegal beberapa hari setelah pasang dan setelah kontrol."],
    ["Berapa biaya behel?", "Biaya tergantung kasus dan jenis behel, sehingga kami tidak mencantumkannya di sini. Admin bisa memberi gambaran lewat WhatsApp, dan dokter menjelaskan rincian biayanya setelah pemeriksaan, sebelum ada tindakan."],
    ["Bagaimana kalau bracket lepas?", "Simpan bracketnya bila terlepas, lalu kabari klinik lewat WhatsApp untuk dijadwalkan dipasang kembali."],
    ["Boleh pasang behel saat ada gigi berlubang?", "Gigi berlubang dan karang gigi dirawat dulu, karena behel membuat gigi lebih sulit dibersihkan."],
  ],
};

// Questions patients ask on the home page.
export const faq = [
  ["Perlu janji dulu atau bisa langsung datang?", "Bisa langsung datang, tetapi dengan janji lewat WhatsApp Anda tidak perlu menunggu lama. Sebutkan keperluan dan jam yang Anda mau; admin mengonfirmasinya."],
  ["Jam berapa klinik buka?", "Senin sampai Sabtu buka 24 jam, Minggu pukul 08.00–22.00. Untuk datang malam hari, kabari dulu lewat WhatsApp supaya dokter dan ruangan siap."],
  ["Berapa biayanya?", "Biaya tergantung kondisi gigi dan perawatan yang dipilih. Admin bisa memberi gambaran lewat WhatsApp, dan dokter menjelaskan biaya sebelum tindakan apa pun."],
  ["Apakah tindakannya sakit?", "Untuk tindakan seperti cabut gigi atau tambal yang dalam, dokter memakai bius lokal. Bila ada yang terasa tidak nyaman, sampaikan; dokter akan berhenti dulu."],
  ["Berapa lama pakai behel?", "Umumnya satu setengah sampai tiga tahun, dengan kontrol setiap tiga sampai empat minggu. Lamanya dipastikan setelah pemeriksaan."],
  ["Apakah gigi bungsu harus dicabut?", "Tidak selalu. Yang tumbuh miring, terpendam, atau sering membuat gusi bengkak biasanya disarankan dicabut setelah dilihat dengan rontgen."],
  ["Seberapa sering perlu scaling?", "Umumnya setiap enam bulan, atau lebih sering bila Anda memakai behel atau karang cepat terbentuk."],
  ["Di mana tepatnya lokasi klinik?", "Jl. Pleburan Barat No. 3E, Pleburan, Semarang Selatan, sekitar 850 meter dari Simpang Lima. Tombol petunjuk arah membuka lokasinya di Google Maps."],
];

// Pictures: all are illustrations from Unsplash (free licence) and one Wikimedia Commons photograph, credited in the footer.
// Replace them with the clinic's own photographs when they exist.
export const kredit = {
  unsplash: ["Katarzyna Zygnerska", "Caroline LM", "Harold Hisona", "Jonathan Borba", "Lesly Juarez", "Kari Bjorn Photography"],
  commons: { judul: "Simpang Lima Semarang", oleh: "Muhammad Cordiaz", lisensi: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Simpang_Lima_Semarang_-_panoramio.jpg" },
};
