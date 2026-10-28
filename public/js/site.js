(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  // ---------- entrances: the parts of each section arrive in reading order, once ----------
  const PARTS = ".svc h2, .svc-row, .prose > :not(ul, dl), .dots li, .team > div,.plate-pic, .tabs, .plate-body, .plate-acts, .janji-intro > *, .slip, .letter-col > *, .statement, .kontak-pic, .kontak-links, .kontak-info, .kontak-map, .faq h2, .faq-text p, .others h2, .others li, .wide-pic, .wide-text > *";
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (!en.isIntersecting) return;
    io.unobserve(en.target);
    en.target.classList.add("in");
  }), { threshold: 0.06, rootMargin: "0px 0px -5% 0px" });
  $$(PARTS).forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight * 0.95) return; // already on screen: leave it be
    const box = el.closest("section") || el.parentElement;
    const i = $$(PARTS, box).indexOf(el);
    el.dataset.rv = "";
    el.style.setProperty("--d", Math.max(0, i) % 6);
    io.observe(el);
  });

  // ---------- the photograph that stays: slow crossfade, or the picture of the active treatment ----------
  const pane = $("[data-pane]");
  const pics = pane ? $$(".pane-pic", pane) : [];
  const show = (key) => {
    const next = pics.find((p) => p.dataset.pic === key);
    if (!next || next.classList.contains("on")) return;
    pics.forEach((p) => p.classList.toggle("on", p === next));
  };
  const opening = pics.filter((p) => p.dataset.pic === "awal");
  let cycle = 0, timer = null, held = false;
  const tick = () => {
    if (held || document.hidden || opening.length < 2) return;
    cycle = (cycle + 1) % opening.length;
    pics.forEach((p) => p.classList.toggle("on", p === opening[cycle]));
  };
  if (!reduce && opening.length > 1) timer = setInterval(tick, 6200);

  // ---------- treatments: the row nearest the middle of the screen is the active one ----------
  const list = $("[data-svc]");
  if (list) {
    const rows = $$(".svc-row", list);
    const activate = (row) => {
      if (!row) return;
      rows.forEach((r) => r.classList.toggle("on", r === row));
      held = true;
      show(row.dataset.pic);
    };
    rows.forEach((r) => {
      r.addEventListener("mouseenter", () => activate(r));
      r.addEventListener("focusin", () => activate(r));
    });
    const mid = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) activate(en.target); }), { rootMargin: "-45% 0px -45% 0px" });
    rows.forEach((r) => mid.observe(r));
    // back up in the opening screen: the opening pictures take over again
    const hero = $(".hero");
    if (hero) new IntersectionObserver(([en]) => {
      if (!en.isIntersecting || en.intersectionRatio < 0.5) return;
      held = false;
      pics.forEach((p) => p.classList.toggle("on", p === opening[cycle]));
    }, { threshold: [0.5] }).observe(hero);
  }

  // ---------- behel tabs ----------
  $$("[data-tabs]").forEach((box) => {
    const tabs = $$('[role="tab"]', box);
    const select = (t, focus) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        $("#" + x.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (ev) => {
        const step = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
        if (step) { ev.preventDefault(); select(tabs[(i + step + tabs.length) % tabs.length], true); }
      });
    });
  });

  // ---------- menu ----------
  const menu = $("#menu"), menuBtn = $("[data-menu]");
  const closeMenu = () => { menu.hidden = true; menuBtn?.setAttribute("aria-expanded", "false"); menuBtn?.focus(); };
  menuBtn?.addEventListener("click", () => { menu.hidden = false; menuBtn.setAttribute("aria-expanded", "true"); $(".menu-links a", menu).focus(); });
  menu?.addEventListener("click", (ev) => { if (ev.target.closest("a, [data-menu-close]")) closeMenu(); });
  addEventListener("keydown", (ev) => { if (ev.key === "Escape" && menu && !menu.hidden) closeMenu(); });

  // the floating WhatsApp button steps aside wherever the page already shows a way to WhatsApp:
  // the opening screen, the appointment slip and the footer
  const float = $(".wa-float");
  const near = $$(".hero, .slip-send, .ft");
  if (float && near.length) {
    const seen = new Set();
    const fio = new IntersectionObserver((es) => {
      es.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
      float.classList.toggle("off", seen.size > 0);
    });
    near.forEach((el) => fio.observe(el));
  }

  // ---------- open now? (Semarang time, UTC+7) ----------
  const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const wib = () => new Date(Date.now() + (new Date().getTimezoneOffset() + 420) * 60000);
  const dataEl = $("[data-janji-data]");
  const jam = dataEl ? JSON.parse(dataEl.textContent).jam : [
    { day: 0, buka: 8, tutup: 22 }, ...[1, 2, 3, 4, 5, 6].map((day) => ({ day, buka: 0, tutup: 24 })),
  ];
  const hours = (d) => jam.find((j) => j.day === d);
  const pad = (h) => String(h).padStart(2, "0") + ".00";
  const now = wib(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60, today = hours(day);
  let status;
  if (today.buka === 0 && today.tutup === 24) status = `Buka sekarang · ${HARI[day]} buka 24 jam`;
  else if (h >= today.buka && h < today.tutup) status = `Buka sekarang · sampai ${pad(today.tutup)} WIB`;
  else if (h < today.buka) status = `Tutup sekarang · buka hari ini ${pad(today.buka)} WIB`;
  else { const t = hours((day + 1) % 7); status = `Tutup sekarang · buka besok ${t.buka === 0 && t.tutup === 24 ? "24 jam" : pad(t.buka) + " WIB"}`; }
  $$("[data-open-status]").forEach((el) => (el.textContent = status));
  $$(".hours tr[data-day]").forEach((r) => { if (r.dataset.day === String(day)) r.setAttribute("data-today", ""); });

  // ---------- the appointment slip fills itself ----------
  const form = $("[data-janji]");
  if (!form || !dataEl) return;
  const data = JSON.parse(dataEl.textContent);
  const slip = (k) => $(`[data-slip="${k}"]`);
  const checked = (n) => form.querySelector(`input[name="${n}"]:checked`);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const row = (a, b) => `<li><span>${esc(a)}</span><i aria-hidden="true"></i><span>${esc(b)}</span></li>`;

  // the day chips carry the real dates from today on
  const dates = $$("[data-days] .chip", form).map((chip, i) => {
    const d = wib(); d.setDate(d.getDate() + i);
    chip.querySelector("span").textContent = i === 0 ? "Hari ini" : i === 1 ? "Besok" : `${HARI[d.getDay()]} ${d.getDate()}`;
    return d;
  });
  const longDate = (d) => `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}`;
  // only the hours the clinic is open that day; today, only the hours still ahead
  const select = form.elements.jam;
  const allSlots = $$("option", select).map((o) => o.value);
  const fitSlots = () => {
    const i = Number(checked("hari")?.value || 0), d = dates[i], o = hours(d.getDay()), keep = select.value;
    const ok = allSlots.filter((s) => {
      const hh = parseInt(s, 10);
      return hh >= o.buka && hh < o.tutup && (i > 0 || hh > h + 0.5);
    });
    select.innerHTML = (ok.length ? ok : ["Secepatnya"]).map((s) => `<option${s === keep ? " selected" : ""}>${s}</option>`).join("");
    if (!ok.includes(keep) && ok.length) select.value = ok.includes("19.00") ? "19.00" : ok[ok.length - 1];
  };

  const set = (el, html) => {
    if (!el || el.innerHTML === html) return;
    el.innerHTML = html;
    if (!reduce) { el.classList.remove("changed"); void el.offsetWidth; el.classList.add("changed"); }
  };
  let message = "";
  const update = () => {
    const svc = data.layanan[checked("perlu")?.value] || data.layanan.konsultasi;
    const i = Number(checked("hari")?.value || 0), d = dates[i], hour = select.value;
    const nama = form.elements.nama.value.trim(), note = form.elements.catatan.value.trim();
    const when = hour === "Secepatnya" ? "secepatnya" : `pukul ${hour}`;
    set(slip("hari"), esc(i === 0 ? `Hari ini, ${longDate(d).split(", ")[1]}` : longDate(d)));
    set(slip("kunjungan"), row(`Datang ke ${data.jalan}`, when) + svc.kunjungan.map(([a, b]) => row(a, b)).join(""));
    set(slip("nama"), esc(nama ? `Atas nama: ${nama}` : "Atas nama: (isi nama Anda)"));
    message = [
      `Halo ${data.nama}, saya ${nama || "(nama)"} ingin membuat janji.`,
      "",
      `Keperluan: ${svc.nama}`,
      `Hari: ${longDate(d)}`,
      `Jam: ${hour === "Secepatnya" ? "secepatnya" : hour + " WIB"}`,
      note ? `Keluhan: ${note}` : "",
      "",
      "Mohon konfirmasi jamnya. Terima kasih.",
      "",
      `(dari website: ${data.from})`,
    ].filter((l, k, a) => l !== "" || (k > 0 && a[k - 1] !== "")).join("\n");
    form.elements.text.value = message;
  };
  form.addEventListener("change", (ev) => { if (ev.target.name === "hari") fitSlots(); update(); });
  form.addEventListener("input", update);
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    update();
    const nama = form.elements.nama;
    if (!nama.value.trim()) {
      nama.setCustomValidity("Isi nama Anda dulu, supaya admin tahu janji ini atas nama siapa.");
      nama.reportValidity();
      nama.addEventListener("input", () => nama.setCustomValidity(""), { once: true });
      return;
    }
    window.open(`https://wa.me/${data.wa}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
  fitSlots();
  update();
  $$(".slip .changed").forEach((el) => el.classList.remove("changed"));
})();
