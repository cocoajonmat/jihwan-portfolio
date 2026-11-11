/*
  세 시안이 함께 쓰는 부품: 언어 전환, 스틸 확대 보기, 쇼릴 팝업, 영상 플레이어.
  각 시안의 app.js는 PF.boot(문구)를 호출한 뒤 자기 화면만 그립니다.
*/
(function () {
  "use strict";

  var SITE = window.SITE, PROJECTS = window.PROJECTS;
  var T = { ko: {}, en: {} }, lang = "ko", listeners = [];
  try { lang = localStorage.getItem("pf-lang") === "en" ? "en" : "ko"; } catch (e) {}

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function pad2(n) { return String(n).padStart(2, "0"); }
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") n.textContent = props[k];
      else if (k === "class") n.className = props[k];
      else n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function t(k) { var v = T[lang] && T[lang][k]; return v == null ? "" : v; }
  function byId(id) { return PROJECTS.filter(function (p) { return p.id === id; })[0] || null; }
  function filmId() { var m = /^film-(\d\d)$/.exec(location.hash.replace("#", "")); return m ? m[1] : null; }
  function jump(top) {
    try { window.scrollTo({ top: top, left: 0, behavior: "instant" }); } catch (e) { window.scrollTo(0, top); }
  }
  // 배경색 위에서 읽히는 글자색
  function textOn(hex) {
    var h = hex.replace("#", "");
    var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#0b0c0e" : "#ffffff";
  }

  /* ---------- 언어 ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("pf-lang", l); } catch (e) {}
    applyStatic();
    listeners.forEach(function (f) { f(); });
  }
  function onLang(f) { listeners.push(f); }

  /* ---------- 영상 플레이어 ---------- */
  function buildPlayer(box, p) {
    var d = p[lang];
    box.textContent = "";
    box.style.backgroundImage = "url('" + p.image + "')";
    var btn = el("button", { type: "button", class: "play", "aria-label": t("play") + ": " + d.title }, [el("span", { class: "tri" })]);
    box.appendChild(btn);
    if (p.youtube) {
      btn.addEventListener("click", function () {
        var q = "autoplay=1&rel=0" + (p.start ? "&start=" + p.start : "");
        box.appendChild(el("iframe", {
          src: "https://www.youtube-nocookie.com/embed/" + p.youtube + "?" + q,
          title: d.title,
          allow: "autoplay; fullscreen; picture-in-picture; encrypted-media"
        }));
        btn.remove();
      });
    } else {
      btn.disabled = true;
      box.appendChild(el("p", { class: "mono player-note", text: t("pending") }));
    }
  }

  /* ---------- 스틸 확대 보기 ---------- */
  var lb = { open: false, list: [], i: 0, alt: "", last: null };
  var lightbox, lbImg;
  function showStill() {
    lbImg.src = lb.list[lb.i];
    lbImg.alt = lb.alt + " " + pad2(lb.i + 1);
    $("#lb-count").textContent = pad2(lb.i + 1) + " / " + pad2(lb.list.length);
  }
  function openLightbox(list, i, alt) {
    lb.list = list; lb.i = i; lb.alt = alt; lb.open = true; lb.last = document.activeElement;
    showStill();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lb-close", lightbox).focus();
  }
  function closeLightbox() {
    if (!lb.open) return;
    lb.open = false;
    lightbox.hidden = true;
    lbImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lb.last && lb.last.focus) lb.last.focus();
  }
  function stepStill(d) {
    lb.i = (lb.i + d + lb.list.length) % lb.list.length;
    showStill();
  }

  /* ---------- 쇼릴 ---------- */
  var modal, reelBody, reelLast = null;
  function openReel() {
    reelLast = document.activeElement;
    reelBody.textContent = "";
    if (SITE.showreel) {
      var v = el("video", { controls: "", playsinline: "", preload: "metadata", src: SITE.showreel });
      reelBody.appendChild(v);
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    } else if (SITE.showreelYoutube) {
      reelBody.appendChild(el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + SITE.showreelYoutube + "?autoplay=1&rel=0",
        title: "Showreel", allow: "autoplay; fullscreen; picture-in-picture; encrypted-media"
      }));
    } else {
      reelBody.appendChild(el("div", { class: "reel-empty" }, [
        el("strong", { text: t("reel_empty_title") }),
        el("span", { text: t("reel_empty_body") })
      ]));
    }
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("[data-close]", modal).focus();
  }
  function closeReel() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    reelBody.textContent = "";
    document.body.style.overflow = "";
    if (reelLast && reelLast.focus) reelLast.focus();
  }

  function boot(strings) {
    T = strings;
    lightbox = $("#lightbox"); lbImg = $("#lb-img");
    modal = $("#reel-modal"); reelBody = $("#reel-body");

    $("#lb-prev").addEventListener("click", function () { stepStill(-1); });
    $("#lb-next").addEventListener("click", function () { stepStill(1); });
    $(".lb-close", lightbox).addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });

    $$("[data-reel]").forEach(function (b) { b.addEventListener("click", openReel); });
    if (modal) {
      $("[data-close]", modal).addEventListener("click", closeReel);
      modal.addEventListener("click", function (e) { if (e.target === modal) closeReel(); });
    }

    $$("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeLightbox(); closeReel(); return; }
      if (!lb.open) return;
      if (e.key === "ArrowLeft") stepStill(-1);
      else if (e.key === "ArrowRight") stepStill(1);
      else if (e.key === "Tab") {
        var f = $$("button", lightbox), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    applyStatic();
  }

  window.PF = {
    SITE: SITE, PROJECTS: PROJECTS,
    $: $, $$: $$, el: el, pad2: pad2, t: t, byId: byId, filmId: filmId, jump: jump, textOn: textOn,
    lang: function () { return lang; },
    onLang: onLang, boot: boot, buildPlayer: buildPlayer,
    openLightbox: openLightbox, openReel: openReel,
    reduceMotion: !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  };
})();
