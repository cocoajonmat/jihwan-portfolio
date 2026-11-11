(function () {
  "use strict";

  var PF = window.PF, P = PF.PROJECTS, S = PF.SITE;
  var $ = PF.$, $$ = PF.$$, el = PF.el, pad2 = PF.pad2, t = PF.t, lang = PF.lang;

  var T = {
    ko: {
      id_go: "연락 화면으로", watch: "쇼릴 보기", featured: "대표작", bg_pause: "배경 영상 일시정지", bg_play: "배경 영상 재생",
      foot_contact: "연락하기", to_top: "맨 위로 ↑",
      back: "목록으로", scroll_info: "아래로 스크롤하면 작업 정보", credits_title: "크레딧", pal_title: "색 구성", awards_title: "수상 · 노미네이트",
      strip_title: "선별 스틸", strip_hint: "옆으로 넘겨 보세요 · 클릭하면 크게", strip_prev: "이전 스틸", strip_next: "다음 스틸", next: "다음 작품",
      play: "영상 재생", pending: "영상 준비 중 · 샘플",
      cmp_label: "보정 전후 비교", cmp_close: "× 영상 닫기",
      contact_label: "연락", c_back: "홈으로", c_email: "이메일", c_phone: "전화", copy: "복사", copied: "복사됨",
      reel_empty_title: "쇼릴 준비 중", reel_empty_body: "영상 파일을 연결하면 여기서 재생됩니다. (샘플)",
      all: "전체", title_home: "윤지환 영상 포트폴리오", title_contact: "연락"
    },
    en: {
      id_go: "Open contact", watch: "Watch showreel", featured: "Featured", bg_pause: "Pause background", bg_play: "Play background",
      foot_contact: "Contact", to_top: "Back to top ↑",
      back: "Back to list", scroll_info: "Scroll for project info", credits_title: "Credits", pal_title: "Palette", awards_title: "Awards & nominations",
      strip_title: "Selected stills", strip_hint: "Swipe sideways · click to enlarge", strip_prev: "Previous stills", strip_next: "Next stills", next: "Next project",
      play: "Play film", pending: "Film coming soon · sample",
      cmp_label: "Before and after grade", cmp_close: "× Close video",
      contact_label: "Contact", c_back: "Home", c_email: "Email", c_phone: "Phone", copy: "Copy", copied: "Copied",
      reel_empty_title: "Showreel coming soon", reel_empty_body: "Connect a video file and it will play here. (sample)",
      all: "All", title_home: "Yoon Jihwan Film Portfolio", title_contact: "Contact"
    }
  };
  PF.boot(T);

  /* ---------- 타임코드 (24fps) ---------- */
  var t0 = performance.now(), tcEl = $("#tc");
  function tick() {
    var s = (performance.now() - t0) / 1000;
    var f = Math.floor(s * 24) % 24, sec = Math.floor(s) % 60, min = Math.floor(s / 60) % 60, hr = Math.floor(s / 3600);
    tcEl.textContent = [hr, min, sec, PF.reduceMotion ? 0 : f].map(pad2).join(":");
  }
  setInterval(tick, PF.reduceMotion ? 1000 : 83);

  /* ---------- 홈: 쇼릴을 배경으로 (소리 없음, 멈춤 가능. 작품 목록과는 별개) ---------- */
  var bgSlide = null, bgVideo = null, bgYt = null, bgPaused = !!PF.reduceMotion;
  // 유튜브 배경은 iframe 에 명령 메시지를 보내서 멈추거나 재생합니다.
  function ytCmd(fn) {
    if (bgYt && bgYt.contentWindow) bgYt.contentWindow.postMessage(JSON.stringify({ event: "command", func: fn, args: [] }), "*");
  }
  function initBg() {
    var box = $("#home-bg");
    bgSlide = el("div", { class: "bg-slide on" });
    if (S.bgYoutube) {
      bgSlide.style.backgroundImage = "url('" + S.bgImage + "')";
      bgSlide.classList.add("yt");
      bgYt = el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + S.bgYoutube + "?autoplay=" + (bgPaused ? 0 : 1) +
          "&mute=1&controls=0&loop=1&playlist=" + S.bgYoutube + "&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&enablejsapi=1",
        title: "Background video", tabindex: "-1", "aria-hidden": "true",
        allow: "autoplay; encrypted-media"
      });
      bgSlide.appendChild(bgYt);
    } else if (S.bgVideo) {
      bgVideo = el("video", { src: S.bgVideo, loop: "", playsinline: "", preload: "auto", poster: S.bgImage });
      bgVideo.muted = true;
      bgSlide.appendChild(bgVideo);
    } else {
      bgSlide.style.backgroundImage = "url('" + S.bgImage + "')";
      bgSlide.classList.add("kb");
    }
    box.appendChild(bgSlide);
    $("#bg-pause").addEventListener("click", function () { setBgPaused(!bgPaused); });
    document.addEventListener("visibilitychange", function () {
      if (bgYt) { if (document.hidden) ytCmd("pauseVideo"); else if (!bgPaused) ytCmd("playVideo"); return; }
      if (!bgVideo) return;
      if (document.hidden) bgVideo.pause(); else if (!bgPaused) playBg();
    });
    setBgPaused(bgPaused);
  }
  function playBg() { if (bgVideo) { var pr = bgVideo.play(); if (pr && pr.catch) pr.catch(function () {}); } }
  function setBgPaused(on) {
    bgPaused = on;
    bgSlide.classList.toggle("paused", on);
    if (bgVideo) { if (on) bgVideo.pause(); else playBg(); }
    if (bgYt) ytCmd(on ? "pauseVideo" : "playVideo");
    paintPause();
  }
  function paintPause() {
    var b = $("#bg-pause");
    b.classList.toggle("is-paused", bgPaused);
    b.setAttribute("aria-pressed", String(bgPaused));
    b.setAttribute("aria-label", t(bgPaused ? "bg_play" : "bg_pause"));
  }
  function paintNow() {
    var h = S.homeInfo || {};
    $("#now-meta").textContent = t("featured") + (h.kind ? " · " + h.kind[lang()] : "");
    $("#now-title").textContent = h.title ? h.title[lang()] : "";
  }

  /* ---------- 이름 카드 (마우스를 올리면 확장, 누르면 연락 화면) ---------- */
  var idCard = $("#id"), openAt = 0;
  var noHover = window.matchMedia ? window.matchMedia("(hover: none)") : { matches: false };
  idCard.addEventListener("click", function (e) {
    if (noHover.matches && !idCard.classList.contains("open")) { e.preventDefault(); openAt = window.pageYOffset; idCard.classList.add("open"); }
  });
  document.addEventListener("click", function (e) { if (!idCard.contains(e.target)) idCard.classList.remove("open"); });

  function paintId() {
    var name = S.name[lang()];
    var mark = $("#mark");
    mark.textContent = S.wordmark;
    mark.appendChild(el("i", { text: "." }));
    $("#id-name").textContent = name;
    $("#id-role").textContent = S.focus[lang()].join(" · ");
    $("#id-bio").textContent = S.bio[lang()];
    $("#id-email").textContent = S.email;
    $("#id-phone").textContent = S.phone;
  }

  /* ---------- 분야 메뉴 + 작품 목록 ---------- */
  var catSel = "all";
  function catItems() {
    return [{ id: "all", label: t("all"), n: P.length }].concat(S.cats.map(function (c) {
      return { id: c.id, label: c[lang()], n: P.filter(function (p) { return p.cat === c.id; }).length };
    }));
  }
  function renderCats() {
    [$("#cats"), $("#cat-strip")].forEach(function (box) {
      box.textContent = "";
      catItems().forEach(function (it) {
        var b = el("button", { type: "button", class: "chip", "aria-pressed": String(catSel === it.id) },
          [document.createTextNode(it.label), el("sup", { text: String(it.n) })]);
        b.addEventListener("click", function () { setCat(it.id); });
        box.appendChild(b);
      });
    });
  }
  function setCat(id) {
    if (id === catSel) return;
    catSel = id;
    renderCats();
    var m = $("#mosaic");
    if (PF.reduceMotion) { renderMosaic(); return; }
    m.classList.add("swap");
    setTimeout(function () { renderMosaic(); m.classList.remove("swap"); }, 190);
  }
  /* 목록 카드 미리보기: 마우스를 올리거나 키보드로 포커스하면 짧은 무음 영상이 재생됩니다.
     마우스가 없는 기기(터치)와 '움직임 줄이기' 설정에서는 쓰지 않고 썸네일만 보여 줍니다. */
  var canPreview = !!(window.matchMedia && window.matchMedia("(hover: hover)").matches) && !PF.reduceMotion;
  // 카드가 화면 근처에 오면 영상 앞부분(metadata)만 미리 받아 둬서, 처음 올려도 바로 재생되게 합니다.
  var prevIO = (canPreview && "IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var v = e.target;
      v.preload = "metadata";
      if (!v.getAttribute("src")) v.src = v.getAttribute("data-src");
      prevIO.unobserve(v);
    });
  }, { rootMargin: "200px" }) : null;

  function makePreview(p) {
    var v = el("video", { loop: "", playsinline: "", preload: "none", poster: p.image, "data-src": p.preview, "aria-hidden": "true", tabindex: "-1" });
    v.muted = true;
    if (prevIO) prevIO.observe(v);
    return v;
  }
  function wirePreview(a, li, v) {
    var active = false;
    function start() {
      active = true;
      if (!v.getAttribute("src")) v.src = v.getAttribute("data-src");
      v.currentTime = 0;
      var pr = v.play();
      if (pr && pr.then) pr.then(function () { if (active) li.classList.add("previewing"); else v.pause(); }, function () {});
    }
    function stop() {
      active = false;
      li.classList.remove("previewing");
      // 서서히 사라지는 동안은 계속 재생하고, 사라진 뒤에 멈춥니다.
      setTimeout(function () { if (!active) v.pause(); }, 450);
    }
    li.addEventListener("mouseenter", start);
    li.addEventListener("mouseleave", stop);
    a.addEventListener("focus", function () { try { if (a.matches(":focus-visible")) start(); } catch (e) {} });
    a.addEventListener("blur", stop);
  }

  function renderMosaic() {
    var m = $("#mosaic");
    if (prevIO) prevIO.disconnect();
    m.textContent = "";
    var list = P.filter(function (p) { return catSel === "all" || p.cat === catSel; });
    m.classList.toggle("filtered", catSel !== "all");
    list.forEach(function (p, i) {
      var d = p[lang()];
      var img = el("img", { src: p.image, alt: "", width: "1600", height: "900" });
      if (i > 2) img.setAttribute("loading", "lazy");
      var box = [img];
      var pv = (canPreview && p.preview) ? makePreview(p) : null;
      if (pv) box.push(pv);
      box.push(el("span", { class: "mono tile-no", text: p.id + (p.year ? " / " + p.year : "") }));
      var a = el("a", { href: "#film-" + p.id, "aria-label": d.title + " — " + d.kind }, [
        el("span", { class: "tile-img" }, box),
        el("span", { class: "tile-cap" }, [
          el("span", { class: "tile-title" }, [el("strong", { text: d.title }), el("span", { class: "mono", text: d.kind })]),
          el("span", { class: "mono tile-role", text: d.role })
        ])
      ]);
      // layout: "wide"(두 칸 전체) / "offset"(아래로 어긋나게) / 비움(한 칸). 분야별 보기에서는 자동으로 어긋나게 배치합니다.
      var li = el("li", { class: "tile" + (catSel === "all" && p.layout ? " " + p.layout : "") }, [a]);
      if (pv) wirePreview(a, li, pv);
      m.appendChild(li);
    });
    $("#work-count").textContent = pad2(list.length) + " / " + pad2(P.length);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var inHome = !$("#view-home").hidden;
      document.body.classList.toggle("in-list", inHome && window.pageYOffset > window.innerHeight * 0.5);
    });
  }
  window.addEventListener("scroll", function () {
    onScroll();
    if (idCard.classList.contains("open") && Math.abs(window.pageYOffset - openAt) > 40) idCard.classList.remove("open");
  }, { passive: true });
  window.addEventListener("resize", onScroll);

  $("#works-btn").addEventListener("click", function (e) {
    e.preventDefault();
    var top = $("#work").getBoundingClientRect().top + window.pageYOffset;
    try { window.scrollTo({ top: top, left: 0, behavior: PF.reduceMotion ? "auto" : "smooth" }); } catch (err) { window.scrollTo(0, top); }
  });

  /* ---------- 작품 상세: BEFORE / AFTER 분할 플레이어 ---------- */
  function buildCompare(box, p) {
    box.textContent = "";
    var d = p[lang()];
    var hasVid = !!(p.videoBefore && p.videoAfter);
    var cmp = el("div", {
      class: "cmp" + (hasVid ? " has-video" : ""), role: "slider", tabindex: "0",
      "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": "50", "aria-label": t("cmp_label") + ": " + d.title
    });
    function media(still, file, isAfter) {
      if (hasVid) {
        var v = el("video", { class: "cmp-media", src: file, poster: still, playsinline: "", preload: "metadata" });
        v.muted = !isAfter;
        return v;
      }
      return el("img", { class: "cmp-media", src: still, alt: "", width: "1600", height: "900" });
    }
    var aEl = media(p.image, p.videoAfter, true), bEl = media(p.before, p.videoBefore, false);
    var play = el("button", { type: "button", class: "cmp-play", "aria-label": t("play") + ": " + d.title }, [el("span", { class: "tri" }), el("span", { class: "pause" })]);
    var bar = el("div", { class: "cmp-bar" }, [el("i")]);
    [aEl, el("div", { class: "cmp-before" }, [bEl]), el("span", { class: "cmp-line", "aria-hidden": "true" }),
     el("span", { class: "cmp-tag cmp-l", text: "BEFORE" }), el("span", { class: "cmp-tag cmp-r", text: "AFTER" }), play, bar
    ].forEach(function (n) { cmp.appendChild(n); });
    box.appendChild(cmp);

    var pos = 50, drag = false;
    function setPos(v) {
      pos = Math.max(0, Math.min(100, v));
      cmp.style.setProperty("--pos", pos + "%");
      cmp.setAttribute("aria-valuenow", String(Math.round(pos)));
      cmp.classList.toggle("hide-l", pos < 14);
      cmp.classList.toggle("hide-r", pos > 86);
    }
    function fromEvent(e) { var r = cmp.getBoundingClientRect(); setPos((e.clientX - r.left) / r.width * 100); }
    cmp.addEventListener("pointerdown", function (e) {
      if (e.target.closest && e.target.closest(".cmp-play, .cmp-bar, .cmp-close")) return;
      drag = true;
      try { cmp.setPointerCapture(e.pointerId); } catch (err) {}
      fromEvent(e);
    });
    cmp.addEventListener("pointermove", function (e) { if (drag) fromEvent(e); });
    ["pointerup", "pointercancel"].forEach(function (n) { cmp.addEventListener(n, function () { drag = false; }); });
    cmp.addEventListener("keydown", function (e) {
      if (e.target !== cmp) return;
      var k = e.key, step = e.shiftKey ? 15 : 5;
      if (k === "ArrowLeft" || k === "ArrowDown") setPos(pos - step);
      else if (k === "ArrowRight" || k === "ArrowUp") setPos(pos + step);
      else if (k === "Home") setPos(0);
      else if (k === "End") setPos(100);
      else return;
      e.preventDefault();
    });
    setPos(50);

    if (hasVid) {
      // 보정 후 영상을 기준으로 보정 전 영상이 같이 움직입니다.
      play.addEventListener("click", function () {
        if (aEl.paused) { var a = aEl.play(); if (a && a.catch) a.catch(function () {}); var b = bEl.play(); if (b && b.catch) b.catch(function () {}); }
        else { aEl.pause(); bEl.pause(); }
      });
      aEl.addEventListener("play", function () { cmp.classList.add("playing"); });
      ["pause", "ended"].forEach(function (n) { aEl.addEventListener(n, function () { cmp.classList.remove("playing"); bEl.pause(); }); });
      aEl.addEventListener("timeupdate", function () {
        bar.firstChild.style.width = (aEl.duration ? aEl.currentTime / aEl.duration * 100 : 0) + "%";
        if (Math.abs(bEl.currentTime - aEl.currentTime) > 0.12) bEl.currentTime = aEl.currentTime;
      });
      bar.addEventListener("click", function (e) {
        var r = bar.getBoundingClientRect();
        if (!aEl.duration) return;
        aEl.currentTime = bEl.currentTime = (e.clientX - r.left) / r.width * aEl.duration;
      });
    } else if (p.youtube) {
      play.addEventListener("click", function () {
        var f = el("iframe", {
          src: "https://www.youtube-nocookie.com/embed/" + p.youtube + "?autoplay=1&rel=0",
          title: d.title, allow: "autoplay; fullscreen; picture-in-picture; encrypted-media"
        });
        var x = el("button", { type: "button", class: "cmp-close", text: t("cmp_close") });
        x.addEventListener("click", function () { f.remove(); x.remove(); });
        cmp.appendChild(f); cmp.appendChild(x);
      });
    } else {
      play.disabled = true;
      cmp.appendChild(el("p", { class: "mono cmp-note", text: t("pending") }));
    }
  }

  function renderFilm(p) {
    var d = p[lang()], idx = P.indexOf(p);
    $("#d-no").textContent = p.id + " / " + pad2(P.length);
    $("#film-title").textContent = d.title;
    $("#d-line").textContent = [d.kind, d.role, p.year, p.runtime].join(" · ");
    $("#film-summary").textContent = d.summary;
    // 수상·노미네이트: 데이터가 있는 작품에서만 보입니다. 한 줄 = [영화제 이름, 결과, 장소]
    var aw = p.awards ? p.awards[lang()] : [], awList = $("#award-list");
    awList.textContent = "";
    $("#awards").hidden = !aw.length;
    aw.forEach(function (a) {
      awList.appendChild(el("li", {}, [
        el("span", { class: "aw-name", text: a[0] }),
        el("span", { class: "aw-res", text: a[1] }),
        el("span", { class: "mono aw-place", text: a[2] })
      ]));
    });
    document.title = d.title + " — " + S.name[lang()];

    var box = $("#cmp-wrap");
    if (p.before) buildCompare(box, p);
    else { box.textContent = ""; box.appendChild(el("div", { class: "player", id: "player" })); PF.buildPlayer($("#player"), p); }

    var rows = $("#credit-list");
    rows.textContent = "";
    (p.credits ? p.credits[lang()] : []).forEach(function (c) {
      rows.appendChild(el("div", { class: c[2] ? "me" : "" }, [el("dt", { text: c[0] }), el("dd", { text: c[1] })]));
    });
    rows.appendChild(el("div", {}, [el("dt", { text: lang() === "ko" ? "러닝타임" : "Runtime" }), el("dd", { class: "num", text: p.runtime })]));

    var pal = $("#pal");
    pal.textContent = "";
    p.palette.forEach(function (c) {
      var li = el("li", { text: c.replace("#", "") });
      li.style.background = c; li.style.color = PF.textOn(c);
      pal.appendChild(li);
    });

    var strip = $("#strip");
    strip.textContent = "";
    p.frames.forEach(function (src, i) {
      var b = el("button", { type: "button", class: "shot", "aria-label": d.title + " " + pad2(i + 1) }, [
        el("img", { src: src, alt: "", loading: "lazy", width: "1280", height: "720" })
      ]);
      b.addEventListener("click", function () { PF.openLightbox(p.frames, i, d.title); });
      strip.appendChild(el("li", {}, [b]));
    });
    $("#strip-prev").setAttribute("aria-label", t("strip_prev"));
    $("#strip-next").setAttribute("aria-label", t("strip_next"));
    requestAnimationFrame(updateStripNav);   // 줄이 그려진 뒤, 넘길 곳이 있는 쪽의 화살표만 보이게

    var next = P[(idx + 1) % P.length];
    $("#next").setAttribute("href", "#film-" + next.id);
    $("#next-title").textContent = next[lang()].title;
  }

  /* ---------- 선별 스틸 줄: 좌우 화살표 (PC) ---------- */
  var stripEl = $("#strip"), stripPrev = $("#strip-prev"), stripNext = $("#strip-next");
  // 맨 앞이면 왼쪽, 맨 끝이면 오른쪽 화살표를 숨기고, 줄이 화면에 다 들어오면 둘 다 숨김
  function updateStripNav() {
    var max = stripEl.scrollWidth - stripEl.clientWidth;
    // 첫 사진은 scroll-snap 때문에 왼쪽 여백(padding)만큼 넘어간 위치에서 시작하므로, 그 위치도 '맨 앞'으로 봄
    var startPos = parseFloat(getComputedStyle(stripEl).paddingLeft) || 0;
    stripPrev.classList.toggle("off", max < 4 || stripEl.scrollLeft <= startPos + 4);
    stripNext.classList.toggle("off", max < 4 || stripEl.scrollLeft > max - 4);
  }
  // 한 번에 한 화면(약 80%)만큼 넘김. 끝 위치는 scroll-snap 이 가까운 사진 앞으로 맞춰 줌
  function stripGo(dir) {
    var amount = Math.max(stripEl.clientWidth * 0.8, 240) * dir;
    try { stripEl.scrollBy({ left: amount, behavior: PF.reduceMotion ? "auto" : "smooth" }); } catch (e) { stripEl.scrollLeft += amount; }
  }
  stripPrev.addEventListener("click", function () { stripGo(-1); });
  stripNext.addEventListener("click", function () { stripGo(1); });
  stripEl.addEventListener("scroll", updateStripNav, { passive: true });
  window.addEventListener("resize", updateStripNav);

  /* ---------- 연락 화면 ---------- */
  function renderContact() {
    $("#c-name").textContent = S.name[lang()];
    $("#c-role").textContent = S.focus[lang()].join(" · ");
    $("#c-bio").textContent = S.bio[lang()];
    document.title = t("title_contact") + " — " + S.name[lang()];
    var list = $("#c-list");
    list.textContent = "";
    var copy = el("button", { type: "button", class: "copy-btn", text: t("copy") });
    copy.addEventListener("click", function () {
      function done() { copy.textContent = t("copied"); setTimeout(function () { copy.textContent = t("copy"); }, 1600); }
      try { navigator.clipboard.writeText(S.email).then(done, function () {}); } catch (e) {}
    });
    list.appendChild(el("div", {}, [el("dt", { class: "mono", text: t("c_email") }),
      el("dd", {}, [el("a", { href: "mailto:" + S.email, text: S.email })]), copy]));
    list.appendChild(el("div", {}, [el("dt", { class: "mono", text: t("c_phone") }),
      el("dd", {}, [el("a", { href: "tel:" + S.phone.replace(/[^0-9+]/g, ""), text: S.phone })]), el("span")]));
    S.links.forEach(function (l) {
      list.appendChild(el("div", {}, [el("dt", { class: "mono", text: l.label }),
        el("dd", {}, [el("a", { href: l.href, target: "_blank", rel: "noopener", text: l.text })]), el("span")]));
    });
  }

  /* ---------- 화면 전환 ---------- */
  var shown = null;
  function jumpTo(top, smooth) {
    if (smooth && !PF.reduceMotion) { try { window.scrollTo({ top: top, left: 0, behavior: "smooth" }); return; } catch (e) {} }
    PF.jump(top);
  }
  function setVeil(p) {
    var v = $("#veil");
    if (p) { v.style.backgroundImage = "url('" + p.image + "')"; v.classList.add("on"); }
    else v.classList.remove("on");
  }
  function route(keep) {
    var h = location.hash.replace("#", ""), id = PF.filmId(), p = id && PF.byId(id);
    var home = $("#view-home"), film = $("#view-film"), contact = $("#view-contact");
    idCard.classList.remove("open");
    $("#back-fixed").hidden = !p;   // 왼쪽 위 '<' 버튼은 작품 상세에서만 보임
    if (p) {
      var same = shown === p.id;
      home.hidden = true; contact.hidden = true; film.hidden = false;
      setVeil(p);
      renderFilm(p);
      if (!(keep && same)) PF.jump(0);
      shown = p.id;
    } else if (h === "contact") {
      home.hidden = true; film.hidden = true; contact.hidden = false;
      $("#cmp-wrap").textContent = "";
      setVeil({ image: S.bgImage });
      renderContact();
      if (!(keep && shown === "contact")) PF.jump(0);
      shown = "contact";
    } else {
      var was = shown === "home";
      film.hidden = true; contact.hidden = true; home.hidden = false;
      $("#cmp-wrap").textContent = "";
      setVeil(null);
      document.title = t("title_home");
      shown = "home";
      if (keep && was) { onScroll(); return; }
      if (h === "work") jumpTo($("#work").getBoundingClientRect().top + window.pageYOffset, !keep && was);
      else jumpTo(0, !keep && was);
    }
    onScroll();
  }
  window.addEventListener("hashchange", function () { route(false); });

  function paint() {
    paintId();
    var bf = $("#back-fixed");   // 아이콘만 있는 버튼이라 읽어 주는 이름과 툴팁을 언어에 맞춰 넣음
    bf.setAttribute("aria-label", t("back"));
    bf.title = t("back");
    $("#foot-copy").textContent = "© " + S.year + " " + S.wordmark;
    var nm = $("#home-name");
    nm.textContent = S.wordmark;
    nm.appendChild(el("i", { text: "." }));
    $("#topline-year").textContent = "PORTFOLIO — " + S.year;
    $("#reel-title").textContent = "SHOWREEL — " + S.wordmark;
    paintPause();
    renderCats();
    renderMosaic();
    paintNow();
    route(true);
  }
  PF.onLang(paint);
  initBg();
  paint();
})();
