# Website Klinik Gigi & Spesialis Ortodonti, Pleburan Semarang

Situs statis untuk klinik di Jl. Pleburan Barat No. 3E, Pleburan, Semarang Selatan. Isinya: beranda, halaman behel, lima halaman perawatan, tentang klinik, jadwal & lokasi, dan halaman 404. Pasien membuat janji lewat WhatsApp; kartu janji temu di setiap halaman menyusun pesannya otomatis (keperluan, hari, jam, nama), dan setiap pesan mencatat dari halaman mana ia dikirim.

## Mengubah isi

Semua data ada di satu file: [src/data.mjs](src/data.mjs).

- `klinik`: nama, alamat, nomor WhatsApp, tautan Google Maps, nama dokter.
- `jam` dan `jamRingkas`: jam buka per hari. Status "Buka sekarang" dan tabel jadwal ikut berubah otomatis.
- `slotJam`: pilihan jam di kartu janji.
- `layanan`: setiap perawatan (ringkasan, langkah kunjungan, risiko, perawatan setelahnya, FAQ).
- `behel`, `faq`: isi halaman behel dan pertanyaan di beranda.
- `SITE`: alamat situs. Ganti saat klinik memakai domain sendiri.

## Menjalankan di komputer

```bash
npm run preview
```

Lalu buka http://localhost:5183. Perintah ini membangun ulang folder `dist/`.

## Terbit di Vercel

Hubungkan repositori ke Vercel. Pengaturan build sudah ada di [vercel.json](vercel.json) (`node src/build.mjs`, output `dist`), jadi tidak perlu diatur lagi. Setelah terbit, kirim `sitemap.xml` ke Google Search Console.

## Yang perlu dikonfirmasi klinik sebelum terbit

- Jam buka: Google Maps mencantumkan Senin–Sabtu 24 jam dan Minggu 08.00–22.00. Pastikan memang begitu.
- Nama lengkap, gelar dan STR dokter, serta siapa dokter gigi spesialis ortodonti (Sp.Ort)-nya. Saat ini nama diambil dari ulasan Google: drg. Stefanus Evan dan drg. Felicia.
- Surat dari dokter di beranda dan halaman Tentang adalah draf. Kalimat seperti "biaya dijelaskan sebelum tindakan" dan "kami berhenti bila Anda tidak nyaman" perlu disetujui dokter.
- Daftar perawatan (veneer, bleaching, mahkota, gigi tiruan jembatan) dan perkiraan durasinya.
- Kode pos (50144, mengikuti Google Maps).

## Etika iklan kesehatan

Situs ini mengikuti Permenkes 1787/2010 tentang iklan pelayanan kesehatan: tanpa testimoni pasien, tanpa foto sebelum-sesudah, tanpa promo atau diskon, tanpa kata "terbaik/dijamin/tanpa rasa sakit". Setiap halaman perawatan memuat risiko dan batasannya. Nilai 4,7 di Google Maps ditampilkan sebagai tautan ke ulasan aslinya.

## Foto

Foto di Google Maps klinik kebanyakan foto gigi pasien, jadi tidak dipakai. Situs memakai foto ilustrasi:

- Unsplash (lisensi Unsplash, boleh dipakai komersial): Katarzyna Zygnerska, Caroline LM, Harold Hisona, Jonathan Borba, Lesly Juarez, Kari Bjorn Photography.
- "Simpang Lima Semarang - panoramio" oleh Muhammad Cordiaz, CC BY-SA 3.0, Wikimedia Commons (dipotong dan sedikit dikurangi warnanya; hasil olahan berlisensi sama).

Kreditnya tercantum di footer. Sebaiknya foto ilustrasi diganti foto asli klinik (ruang praktik, tampak depan, dokter) saat tersedia: taruh di `public/img/` sebagai `.webp` dengan nama yang sama.
