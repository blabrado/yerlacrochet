/* ==========================================================
   YERLA · hilos de amor — JavaScript principal (ES6+)
   Sin dependencias. Funciona abriendo los .html directamente.
   ========================================================== */
(() => {
  "use strict";

  const CFG = window.YERLA_CONFIG || {};
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.7 7L4 20.5l1.6-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>',
    yarn: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M12 38c14 6 26-8 40-2M14 26c14 8 26-6 36 0M22 12c4 12 14 20 24 22"/></svg>'
  };

  /* ---------- Utilidades de WhatsApp / contacto ---------- */
  const waNumber = () => {
    let n = String(CFG.whatsapp || "").replace(/\D/g, "");
    if (n.length === 10 && n.startsWith("3")) n = "57" + n; // celular colombiano sin indicativo
    return n;
  };
  const waLink = (msg) => {
    const text = encodeURIComponent(msg || CFG.mensajeBase || "Hola Yerla 👋");
    const n = waNumber();
    return n ? `https://wa.me/${n}?text=${text}` : `https://wa.me/?text=${text}`;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function setupContactLinks() {
    $$("[data-wa]").forEach((el) => {
      el.href = waLink(el.dataset.waMsg);
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
    const email = String(CFG.email || "").trim();
    $$("[data-email]").forEach((el) => {
      if (email) el.href = `mailto:${email}?subject=${encodeURIComponent("Quiero una pieza personalizada")}`;
      else markPending(el);
    });
    const ig = String(CFG.instagram || "").trim();
    $$("[data-instagram]").forEach((el) => {
      if (ig) { el.href = ig; el.target = "_blank"; el.rel = "noopener noreferrer"; }
      else if (el.closest(".social")) el.hidden = true; // en el pie, simplemente no se muestra
      else markPending(el);
    });
    // Insignias "pendiente de confirmar" en la página de contacto
    $$("[data-pending-for]").forEach((b) => {
      const key = b.dataset.pendingFor;
      const missing = key === "whatsapp" ? !waNumber() : !String(CFG[key] || "").trim();
      b.hidden = !missing;
    });
    if (!waNumber()) console.warn("[Yerla] Falta el número de WhatsApp en js/config.js. Los botones abren WhatsApp sin destinatario.");
  }
  function markPending(el) {
    el.setAttribute("aria-disabled", "true");
    el.removeAttribute("href");
    el.tabIndex = -1;
  }

  /* ---------- Menú hamburguesa ---------- */
  function setupNav() {
    const toggle = $(".nav-toggle");
    const panel = $("#nav-panel");
    if (!toggle || !panel) return;
    const desktop = window.matchMedia("(min-width: 960px)");
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      panel.classList.toggle("is-open", open);
      document.body.style.overflow = open && !desktop.matches ? "hidden" : "";
      if (!desktop.matches) {
        if (open) panel.removeAttribute("inert"); else panel.setAttribute("inert", "");
      }
    };
    const sync = () => {
      if (desktop.matches) { panel.removeAttribute("inert"); setOpen(false); }
      else if (toggle.getAttribute("aria-expanded") !== "true") panel.setAttribute("inert", "");
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
    $$("a", panel).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    desktop.addEventListener("change", sync);
    sync();
  }

  /* ---------- Cabecera con sombra al hacer scroll + volver arriba ---------- */
  function setupScrollUI() {
    const header = $(".site-header");
    const top = $(".to-top");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (top) top.classList.toggle("is-visible", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  /* ---------- Animaciones de aparición ---------- */
  function setupReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion) { items.forEach((i) => i.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    items.forEach((i) => io.observe(i));
  }

  /* ---------- Contadores animados ---------- */
  function setupCounters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
    const run = (el) => {
      const target = Number(el.dataset.count);
      const out = $(".n", el);
      if (reduceMotion) { out.textContent = target; return; }
      const dur = 1400, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        out.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window) || reduceMotion) return; // se queda el número final
    nums.forEach((n) => { $(".n", n).textContent = "0"; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- Carrusel del inicio ---------- */
  function setupCarousel() {
    const root = $("[data-carousel]");
    if (!root) return;
    const slides = $$(".slide", root);
    const dotsWrap = $(".car-dots", root);
    const playBtn = $(".car-play", root);
    let idx = 0, timer = null, userPaused = reduceMotion;

    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "car-dot";
      b.setAttribute("aria-label", `Ir a la imagen ${i + 1} de ${slides.length}`);
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
      return b;
    });

    function go(i, manual) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, n) => {
        const active = n === idx;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", String(!active));
        $$("a", s).forEach((a) => (a.tabIndex = active ? 0 : -1));
      });
      dots.forEach((d, n) => d.setAttribute("aria-current", String(n === idx)));
      if (manual) restart();
    }
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!userPaused && !timer) timer = setInterval(() => go(idx + 1), 5500); };
    const restart = () => { stop(); start(); };

    $$("[data-dir]", root).forEach((b) => b.addEventListener("click", () => go(idx + Number(b.dataset.dir), true)));
    if (playBtn) {
      playBtn.setAttribute("aria-pressed", String(userPaused));
      playBtn.addEventListener("click", () => {
        userPaused = !userPaused;
        playBtn.setAttribute("aria-pressed", String(userPaused));
        playBtn.setAttribute("aria-label", userPaused ? "Reanudar el carrusel" : "Pausar el carrusel");
        userPaused ? stop() : start();
      });
      playBtn.setAttribute("aria-label", userPaused ? "Reanudar el carrusel" : "Pausar el carrusel");
    }
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(idx - 1, true);
      if (e.key === "ArrowRight") go(idx + 1, true);
    });
    // Deslizar con el dedo
    let x0 = null;
    root.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(idx + (dx < 0 ? 1 : -1), true);
      x0 = null;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    go(0);
    start();
  }

  /* ---------- Catálogo (filtros + tarjetas + galería ampliada) ---------- */
  function setupCatalog() {
    const main = $("[data-catalog]");
    if (!main) return;
    const grupo = main.dataset.catalog;
    const meta = (window.YERLA_CATEGORIAS || {})[grupo];
    const all = (window.YERLA_PRODUCTOS || []).filter((p) => p.grupo === grupo);
    if (!meta) return;

    const filtersEl = $("#filters");
    const gridEl = $("#grid");
    const countEl = $("#result-count");
    const emptyEl = $("#empty-state");
    const emptyText = $("#empty-text");

    const tagLabel = (p) => {
      const f = meta.filtros.find((x) => x.id === p.categoria);
      return f ? f.label : meta.titulo;
    };
    const countFor = (id) => (id === "todo" ? all.length : all.filter((p) => p.categoria === id).length);

    let current = "todo";
    const fromUrl = new URLSearchParams(location.search).get("cat");
    if (fromUrl && meta.filtros.some((f) => f.id === fromUrl)) current = fromUrl;

    // Chips de filtro
    const chips = [{ id: "todo", label: "Todo" }, ...meta.filtros].map((f) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.dataset.filter = f.id;
      const n = countFor(f.id);
      b.innerHTML = `${esc(f.label)}${n ? ` <span class="chip-count" aria-hidden="true">${n}</span>` : ""}`;
      b.addEventListener("click", () => { current = f.id; render(true); });
      filtersEl.appendChild(b);
      return b;
    });

    let visible = [];
    function render(updateUrl) {
      visible = current === "todo" ? all : all.filter((p) => p.categoria === current);
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === current)));
      gridEl.innerHTML = visible.map((p, i) => `
        <li class="card" style="animation-delay:${Math.min(i, 12) * 40}ms">
          <button type="button" class="card-media" data-open="${esc(p.id)}" aria-label="Ver más grande: ${esc(p.nombre)}">
            <img src="${esc(p.imagen)}" alt="${esc(p.alt)}" width="${p.ancho}" height="${p.alto}" loading="${i < 4 ? "eager" : "lazy"}" decoding="async">
          </button>
          <div class="card-bar">
            <div><h3 class="card-title">${esc(p.nombre)}</h3><span class="card-tag">${esc(tagLabel(p))}</span></div>
            <a class="card-cta" href="${esc(waLink(`Hola Yerla 👋 Me encantó "${p.nombre}". ¿Lo podemos hacer en mis colores? Te cuento los detalles por aquí.`))}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${esc(p.nombre)} por WhatsApp">${ICONS.chat}</a>
          </div>
        </li>`).join("");

      const f = meta.filtros.find((x) => x.id === current);
      if (visible.length) {
        emptyEl.hidden = true;
        countEl.textContent = `Mostrando ${visible.length} ${visible.length === 1 ? "pieza" : "piezas"}${f ? ` en ${f.singular}` : ""}.`;
      } else {
        emptyEl.hidden = false;
        countEl.textContent = "";
        emptyText.textContent = `Por ahora no hay ${f ? f.singular : "piezas"} en el catálogo, pero se pueden tejer: cuéntanos qué imaginas y lo hacemos a tu manera.`;
        const wa = $("#empty-wa");
        if (wa) wa.href = waLink(`Hola Yerla 👋 Quiero pedirte ${f ? f.singular : "una pieza"} a mi gusto. ¿Me cuentas cómo lo hacemos?`);
      }
      if (updateUrl) {
        const url = new URL(location.href);
        current === "todo" ? url.searchParams.delete("cat") : url.searchParams.set("cat", current);
        history.replaceState(null, "", url);
      }
    }

    // Galería ampliada (lightbox con <dialog>)
    const dlg = $("#lightbox");
    let openIdx = 0;
    function fillLightbox() {
      const p = visible[openIdx];
      if (!p) return;
      const img = $("#lb-img", dlg);
      img.src = p.imagen; img.alt = p.alt; img.width = p.ancho; img.height = p.alto;
      $("#lb-title", dlg).textContent = p.nombre;
      $("#lb-tag", dlg).textContent = tagLabel(p);
      $("#lb-desc", dlg).textContent = p.descripcion;
      $("#lb-order", dlg).href = waLink(`Hola Yerla 👋 Me encantó "${p.nombre}". ¿Lo podemos hacer en mis colores? Te cuento los detalles por aquí.`);
      const multi = visible.length > 1;
      $$(".lb-nav", dlg).forEach((b) => (b.hidden = !multi));
    }
    gridEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open]");
      if (!btn || !dlg || typeof dlg.showModal !== "function") return;
      openIdx = visible.findIndex((p) => p.id === btn.dataset.open);
      fillLightbox();
      dlg.showModal();
    });
    if (dlg) {
      const step = (d) => { openIdx = (openIdx + d + visible.length) % visible.length; fillLightbox(); };
      $("[data-lb-close]", dlg).addEventListener("click", () => dlg.close());
      $$("[data-lb-step]", dlg).forEach((b) => b.addEventListener("click", () => step(Number(b.dataset.lbStep))));
      dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); }); // clic en el fondo
      dlg.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      });
    }

    render(false);
  }

  /* ---------- Preguntas frecuentes: una abierta a la vez ---------- */
  function setupFaq() {
    const items = $$(".faq details");
    items.forEach((d) => d.addEventListener("toggle", () => {
      if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
    }));
  }

  /* ---------- Formulario "Cuéntanos tu idea" → mensaje de WhatsApp ---------- */
  function setupOrderForm() {
    const form = $("#order-form");
    if (!form) return;
    const status = $("#form-status");
    const fieldOf = (el) => el.closest(".field");
    const validators = {
      pieza: (v) => (v ? "" : "Elige qué tipo de pieza quieres."),
      idea: (v) => (v.trim().length >= 10 ? "" : "Cuéntanos un poquito más (mínimo 10 caracteres).")
    };
    const check = (el) => {
      const rule = validators[el.name];
      if (!rule) return true;
      const msg = rule(el.value);
      const f = fieldOf(el);
      f.classList.toggle("has-error", !!msg);
      $(".error-msg", f).textContent = msg;
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    };
    $$("input, select, textarea", form).forEach((el) => {
      el.addEventListener("blur", () => check(el));
      el.addEventListener("input", () => { if (fieldOf(el).classList.contains("has-error")) check(el); });
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = $$("[name='pieza'], [name='idea']", form);
      const results = required.map(check);
      if (results.includes(false)) {
        status.textContent = "Revisa los campos marcados para poder continuar.";
        const firstBad = required.find((el) => fieldOf(el).classList.contains("has-error"));
        if (firstBad) firstBad.focus();
        return;
      }
      const d = new FormData(form);
      const lines = [
        "Hola Yerla 👋 Quiero una pieza personalizada.",
        `• Pieza: ${d.get("pieza")}`,
        `• Mi idea: ${String(d.get("idea")).trim()}`,
        d.get("colores") ? `• Colores: ${String(d.get("colores")).trim()}` : "",
        d.get("cuando") ? `• Lo necesito para: ${String(d.get("cuando")).trim()}` : "",
        d.get("medidas") ? `• Medidas: ${String(d.get("medidas")).trim()}` : "",
        "Te envío una foto de referencia por aquí."
      ].filter(Boolean);
      // No se envía nada a ningún servidor: solo se abre WhatsApp con el mensaje listo.
      status.textContent = "Abriendo WhatsApp con tu mensaje listo… Recuerda adjuntar tu foto de referencia en el chat.";
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Año del pie de página ---------- */
  function setupYear() { $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear())); }

  /* ---------- Inicio ---------- */
  const init = () => {
    setupContactLinks();
    setupNav();
    setupScrollUI();
    setupReveal();
    setupCounters();
    setupCarousel();
    setupCatalog();
    setupFaq();
    setupOrderForm();
    setupYear();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
