/* inline */
(function () {
  if (/[?&]photo=b/.test(location.search))
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll(".v-about .about>img.me").forEach(function (i) {
        i.src = "images/hany-band-b.jpg";
        i.setAttribute("data-b", "");
      });
    });
})();

/* inline */
(function () {
  if (/[?&]en=flip/.test(location.search)) document.documentElement.setAttribute("data-ef", "");
})();

/* inline */
(function () {
  function r() {
    var h = location.hash.slice(1);
    if (h != "about" && h != "work" && h != "contact" && h.indexOf("p-") != 0) h = "home";
    document.documentElement.setAttribute("data-view", h);
    window.scrollTo(0, 0);
  }
  addEventListener("hashchange", r);
  r();
})();

/* inline */
(function () {
  (function () {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var t;
    addEventListener(
      "scroll",
      function () {
        nav.classList.add("navhide");
        clearTimeout(t);
        t = setTimeout(function () {
          nav.classList.remove("navhide");
        }, 250);
      },
      { passive: true },
    );
  })();
})();

/* inline */
(function () {
  (function () {
    var d = document,
      root = d.documentElement;
    root.classList.add("js");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sel =
      ".pgv .pimg,.pgv .pmas>*,.pfacts,.pnav a,.pcard,.card,.band h2,.band .sub,.band .intro,.band .more,.cols>div,.facts>div,.clist a,.about>*,.pagehead>*,.brand img,.foot h2,.foot .pill,.banner>div";
    function setup() {
      var els = d.querySelectorAll(sel);
      var io = null;
      if (!reduce && "IntersectionObserver" in window) {
        io = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
        );
      }
      var groups = new Map();
      els.forEach(function (el) {
        if (el.classList.contains("rv")) return;
        el.classList.add("rv");
        var p = el.parentElement,
          i = groups.get(p) || 0;
        groups.set(p, i + 1);
        el.style.setProperty("--d", (i % 4) * 180 + "ms");
        if (io) io.observe(el);
        else el.classList.add("in");
      });
    }
    function par() {
      if (reduce) return;
      var items = [].slice.call(d.querySelectorAll(".hero,.banner")),
        tick = false;
      function upd() {
        tick = false;
        var vh = window.innerHeight;
        items.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (el.hasAttribute("data-np") || r.height === 0 || r.bottom < 0 || r.top > vh) return;
          var p = (vh - r.top) / (vh + r.height);
          p = Math.max(0, Math.min(1, p));
          el.style.backgroundPosition = "center " + (25 + p * 50) + "%";
        });
      }
      window.addEventListener(
        "scroll",
        function () {
          if (!tick) {
            tick = true;
            requestAnimationFrame(upd);
          }
        },
        { passive: true },
      );
      window.addEventListener("resize", upd);
      window.addEventListener("hashchange", function () {
        setTimeout(upd, 60);
      });
      upd();
    }
    setup();
    par();

    function sweep() {
      var vh = window.innerHeight;
      d.querySelectorAll(".rv:not(.in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.height > 0 && r.top < vh * 0.92) el.classList.add("in");
      });
    }
    var sw = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!sw) {
          sw = true;
          requestAnimationFrame(function () {
            sw = false;
            sweep();
          });
        }
      },
      { passive: true },
    );
    window.addEventListener("hashchange", function () {
      setTimeout(sweep, 120);
    });
    window.addEventListener("load", sweep);
    setTimeout(sweep, 400);
  })();
})();

/* inline */
(function () {
  (function () {
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".ddt") : null;
      if (t) {
        e.preventDefault();
        e.stopPropagation();
        var d = t.parentElement;
        var was = d.classList.contains("open");
        document.querySelectorAll(".dd.open").forEach(function (x) {
          x.classList.remove("open");
        });
        if (!was) d.classList.add("open");
        return;
      }
      var c = e.target.closest ? e.target.closest(".ddp a") : null;
      if (c) {
        e.preventDefault();
        document.querySelectorAll(".dd.open").forEach(function (x) {
          x.classList.remove("open");
        });
        var id = c.getAttribute("data-t");
        if (location.hash !== "#work") {
          location.hash = "work";
        }
        setTimeout(function () {
          var el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return;
      }
      document.querySelectorAll(".dd.open").forEach(function (x) {
        x.classList.remove("open");
      });
    });
  })();
})();

/* inline */
(function () {
  (function () {
    if (!(window.matchMedia && matchMedia("(hover:hover)").matches)) return;
    var d = document.querySelector(".dd");
    if (!d) return;
    var t;
    d.addEventListener("mouseenter", function () {
      clearTimeout(t);
      d.classList.add("hov");
    });
    d.addEventListener("mouseleave", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        d.classList.remove("hov");
      }, 300);
    });
    d.querySelectorAll(".ddp a").forEach(function (a) {
      a.addEventListener("click", function () {
        d.classList.remove("hov");
      });
    });
  })();
})();

/* inline */
(function () {
  (function () {
    var C = null,
      lang = "en";
    try {
      lang = localStorage.getItem("lang") || "en";
    } catch (e) {}
    function T(k, el) {
      var d = C && C[lang] && C[lang][k];
      if (d == null) d = C && C.en && C.en[k];
      return d;
    }
    function apply() {
      if (!C) return;
      var root = document.documentElement;
      root.lang = lang;
      root.dir = lang === "ar" ? "rtl" : "ltr";
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var t = T(el.getAttribute("data-i18n"));
        if (t != null) el.textContent = t;
      });
      var b = document.querySelector(".langbtn");
      if (b) b.textContent = lang === "ar" ? "EN" : "\u0639\u0631\u0628\u064a";
      var w = C.whatsapp || {},
        m = lang === "ar" ? w.message_ar : w.message_en;
      var f = document.querySelector(".wa-fab");
      if (f && w.number)
        f.href = "https://wa.me/" + w.number + "?text=" + encodeURIComponent(m || "");
      document.querySelectorAll('a[href^="https://wa.me/"]:not(.wa-fab)').forEach(function (a) {
        if (w.number) a.href = "https://wa.me/" + w.number + "?text=" + encodeURIComponent(m || "");
      });
      var tl = (C.testimonials && C.testimonials.list) || [],
        sec = document.getElementById("testimonials");
      if (sec) {
        var box = sec.querySelector(".tlist");
        box.innerHTML = "";
        tl.forEach(function (x) {
          var q = document.createElement("blockquote"),
            tx = (lang === "ar" && x.ar) || x.en || x.ar;
          if (!tx) return;
          q.textContent = tx;
          var rt = Math.round(+x.rating);
          if (rt >= 1) {
            var s = document.createElement("div");
            s.className = "stars";
            s.setAttribute("aria-label", rt + " out of 5");
            s.textContent = "\u2605".repeat(Math.min(rt, 5)) + "\u2606".repeat(5 - Math.min(rt, 5));
            q.insertBefore(s, q.firstChild);
          }
          var c = document.createElement("cite");
          c.textContent = [x.name, x.role].filter(Boolean).join(", ");
          q.appendChild(c);
          box.appendChild(q);
        });
        sec.hidden = !box.children.length;
      }
    }
    C = window.SITE_CONTENT;
    apply();
    var b = document.querySelector(".langbtn");
    if (b)
      b.addEventListener("click", function () {
        lang = lang === "ar" ? "en" : "ar";
        try {
          localStorage.setItem("lang", lang);
        } catch (e) {}
        apply();
      });
    if (lang === "ar") {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    }
  })();
})();

/* inline */
(function () {
  (function () {
    function H() {
      return innerWidth < 600 ? 150 : innerWidth < 1000 ? 200 : 250;
    }
    function fit(g) {
      var h = H();
      g.querySelectorAll(".card").forEach(function (c) {
        var i = c.querySelector("img");
        if (!i) return;
        var ar =
          i.naturalWidth && i.naturalHeight
            ? i.naturalWidth / i.naturalHeight
            : (function () {
                var r = (c.getAttribute("style") || "").match(/--r:\s*(\d+)\/(\d+)/);
                return r ? r[1] / r[2] : 1;
              })();
        if (i.naturalWidth) i.style.setProperty("--ar", i.naturalWidth + "/" + i.naturalHeight);
        c.style.flex = ar * 100 + " 1 " + ar * h + "px";
      });
    }
    function all() {
      document.querySelectorAll(".grid").forEach(fit);
    }
    document.querySelectorAll(".grid .card img").forEach(function (i) {
      if (!i.complete)
        i.addEventListener("load", function () {
          fit(i.closest(".grid"));
        });
    });
    addEventListener("resize", all);
    addEventListener("load", all);
    all();
  })();
})();

/* numjs */
(function () {
  (function () {
    var re = /[+]?\d[\d\s()+\-.,]*\d|\d/g;
    function w(n) {
      var t = n.nodeValue;
      if (!/\d/.test(t)) return;
      var f = document.createDocumentFragment(),
        i = 0,
        m;
      re.lastIndex = 0;
      while ((m = re.exec(t))) {
        f.appendChild(document.createTextNode(t.slice(i, m.index)));
        var s = document.createElement("span");
        s.className = "num";
        s.textContent = m[0];
        f.appendChild(s);
        i = m.index + m[0].length;
      }
      f.appendChild(document.createTextNode(t.slice(i)));
      n.parentNode.replaceChild(f, n);
    }
    var busy = 0;
    function run() {
      if (busy) return;
      busy = 1;
      var tw = document.createTreeWalker(document.body, 4, {
          acceptNode: function (n) {
            var p = n.parentNode;
            if (!p || /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/.test(p.tagName) || p.closest(".num"))
              return 2;
            return 1;
          },
        }),
        a = [],
        n;
      while ((n = tw.nextNode())) a.push(n);
      a.forEach(w);
      busy = 0;
    }
    run();
    var t;
    new MutationObserver(function () {
      clearTimeout(t);
      t = setTimeout(run, 60);
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  })();
})();

/* halign */
(function () {
  (function () {
    var S =
      "figcaption,.tag,p,h1,h2,h3,h4,li,.sub,.ab1,.kick,.intro,.clist span,.clist b,.copy span,label,td,th,dt,dd";
    function fix() {
      var rtl = document.documentElement.dir === "rtl";
      document.querySelectorAll(S).forEach(function (e) {
        var t = e.textContent,
          ar = /[\u0600-\u06FF]/.test(t),
          la = /[A-Za-z0-9]/.test(t);
        if (rtl && !ar && la) {
          if (!e.hasAttribute("data-hx")) {
            if (getComputedStyle(e).textAlign === "center") return;
            e.setAttribute("data-hx", "1");
          }
          e.style.direction = "ltr";
          e.style.textAlign = "left";
        } else if (e.hasAttribute("data-hx")) {
          e.removeAttribute("data-hx");
          e.style.direction = "";
          e.style.textAlign = "";
        }
      });
    }
    var tm;
    function sch() {
      clearTimeout(tm);
      tm = setTimeout(fix, 60);
    }
    new MutationObserver(sch).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    new MutationObserver(sch).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir", "lang"],
    });
    document.addEventListener("click", sch, true);
    window.addEventListener("hashchange", sch);
    sch();
  })();
})();

/* wamsg */
(function () {
  (function () {
    var E =
        "Hi%20Hany%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20talk%20about%20a%20project.",
      A =
        "%D8%A3%D9%87%D9%84%D8%A7%20%D9%87%D8%A7%D9%86%D9%8A%D8%8C%20%D8%B4%D9%81%D8%AA%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%D9%83%20%D9%88%D8%B9%D8%A7%D9%8A%D8%B2%20%D9%86%D8%AA%D9%83%D9%84%D9%85%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9.";
    function f() {
      var t = document.documentElement.lang == "ar" ? A : E;
      document.querySelectorAll('a[href^="https://wa.me/201274648114"]').forEach(function (a) {
        a.href = "https://wa.me/201274648114?text=" + t;
      });
    }
    f();
    new MutationObserver(f).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    document.addEventListener("DOMContentLoaded", f);
  })();
})();

/* lbjs */
(function () {
  (function () {
    var lb = document.createElement("div");
    lb.id = "lb";
    lb.innerHTML =
      '<button class="x" aria-label="Close">&times;</button><button class="pr" aria-label="Previous">&#8249;</button><img alt=""><button class="nx" aria-label="Next">&#8250;</button><div class="ct"></div>';
    document.body.appendChild(lb);
    var im = lb.querySelector("img"),
      ct = lb.querySelector(".ct"),
      L = [],
      i = 0;
    function rtl() {
      return document.documentElement.dir === "rtl" || document.body.dir === "rtl";
    }
    function show(n) {
      i = (n + L.length) % L.length;
      im.src = L[i].currentSrc || L[i].src;
      im.alt = L[i].alt;
      ct.textContent = i + 1 + " / " + L.length;
    }
    function open(a, k) {
      L = a;
      lb.classList.add("on");
      document.body.style.overflow = "hidden";
      show(k);
    }
    function close() {
      lb.classList.remove("on");
      document.body.style.overflow = "";
      im.removeAttribute("src");
    }
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.tagName !== "IMG" || t.closest("#lb")) return;
      var m = t.closest('main.pgv[class*="v-p-"]');
      if (!m || t.closest(".pnav,.pagehead")) return;
      var a = [].slice.call(m.querySelectorAll(".band img"));
      open(a, a.indexOf(t));
    });
    lb.querySelector(".x").onclick = close;
    lb.querySelector(".pr").onclick = function (e) {
      e.stopPropagation();
      show(i - 1);
    };
    lb.querySelector(".nx").onclick = function (e) {
      e.stopPropagation();
      show(i + 1);
    };
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") close();
      var d = rtl() ? -1 : 1;
      if (e.key === "ArrowRight") show(i + d);
      if (e.key === "ArrowLeft") show(i - d);
    });
    var x0 = null;
    lb.addEventListener(
      "touchstart",
      function (e) {
        x0 = e.touches[0].clientX;
      },
      { passive: true },
    );
    lb.addEventListener("touchend", function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(dx < 0 ? i + 1 : i - 1);
    });
    window.addEventListener("hashchange", close);
  })();
})();

/* expjs */
(function () {
  (function () {
    var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    function split() {
      document.querySelectorAll(".pgv h1, .hhero h1").forEach(function (h) {
        var r = h.getBoundingClientRect();
        var sp = h.querySelector("[data-i18n]");
        if (!sp || sp.querySelector(".wr")) return;
        var vis = h.offsetParent !== null;
        if (!vis) return;
        var t = sp.textContent.trim();
        if (!t) return;
        sp.setAttribute("aria-label", t);
        if (!/[\u0600-\u06FF]/.test(t)) {
          sp.style.setProperty("direction", "ltr", "important");
          sp.style.setProperty("unicode-bidi", "bidi-override", "important");
          sp.parentNode.style.setProperty("direction", "ltr", "important");
        } else {
          sp.style.removeProperty("direction");
          sp.style.removeProperty("unicode-bidi");
          sp.parentNode.style.removeProperty("direction");
        }
        sp.textContent = "";
        t.split(/\s+/).forEach(function (w, i, a) {
          var e = document.createElement("span");
          e.className = "wr";
          e.style.setProperty("--i", i);
          e.setAttribute("aria-hidden", "true");
          e.textContent = w;
          sp.appendChild(e);
          if (i < a.length - 1) sp.appendChild(document.createTextNode(" "));
        });
      });
    }
    function run() {
      setTimeout(split, 60);
      setTimeout(split, 400);
    }
    addEventListener("hashchange", run);
    addEventListener("load", run);
    document.addEventListener("click", function (e) {
      if (e.target.closest(".langbtn")) run();
    });
    var els = [],
      tick = false;
    function px() {
      tick = false;
      var vh = innerHeight;
      var f = document.querySelectorAll('.pgv:not([style*="none"]) .pimg, .pgv .pmas>*');
      f.forEach(function (el) {
        if (el.offsetParent === null) return;
        var r = el.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        var c = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--py", (c * -14).toFixed(1) + "px");
      });
      document.querySelectorAll(".pcover").forEach(function (h) {
        if (h.offsetParent === null) return;
        h.style.setProperty("--bgy", 50 + Math.min(scrollY / 6, 20) + "%");
      });
    }
    addEventListener(
      "scroll",
      function () {
        if (!tick) {
          tick = true;
          requestAnimationFrame(px);
        }
      },
      { passive: true },
    );
  })();
})();

/* m2js */
(function () {
  (function () {
    var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var bar = document.createElement("div");
    bar.id = "sbar";
    document.body.appendChild(bar);
    if (!rm) {
      var tk = false;
      function pg() {
        tk = false;
        var h = document.documentElement,
          m = h.scrollHeight - innerHeight;
        bar.style.transform =
          "scaleX(" + (m > 0 ? Math.min(1, Math.max(0, scrollY / m)) : 0).toFixed(4) + ")";
      }
      addEventListener(
        "scroll",
        function () {
          if (!tk) {
            tk = true;
            requestAnimationFrame(pg);
          }
        },
        { passive: true },
      );
      addEventListener("hashchange", function () {
        setTimeout(pg, 50);
      });
      pg();
    }
    var io =
      !rm && "IntersectionObserver" in window
        ? new IntersectionObserver(
            function (es) {
              es.forEach(function (e) {
                if (!e.isIntersecting) return;
                var t = e.target;
                io.unobserve(t);
                if (t.classList.contains("hl")) t.classList.add("on");
                else if (t.dataset.cnt) count(t);
                else t.classList.add("in");
              });
            },
            { threshold: 0.3 },
          )
        : null;
    function count(t) {
      var n = +t.dataset.cnt,
        s = t.dataset.suf || "",
        st = null;
      function f(ts) {
        if (st === null) st = ts;
        var p = Math.min(1, (ts - st) / 2800),
          e = 1 - Math.pow(1 - p, 4);
        t.textContent = Math.round(n * e) + (p >= 1 ? s : "");
        if (p < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    }
    function setup() {
      document.querySelectorAll(".band h2,.foot h2").forEach(function (h) {
        if (h.querySelector(".hl")) return;
        var l = document.createElement("i");
        l.className = "hl";
        l.setAttribute("aria-hidden", "true");
        var c = getComputedStyle(h).textAlign === "center";
        l.style.margin = c ? "12px auto 0" : "12px 0 0";
        h.appendChild(l);
        if (io) io.observe(l);
        else l.classList.add("on");
      });
      if (io) {
        document.querySelectorAll(".facts b,.pfacts b").forEach(function (b) {
          var t = b.querySelector(".num") || b;
          if (t.dataset.cnt || t.children.length) return;
          var m = /^(\d+)(\+?)$/.exec(t.textContent.trim());
          if (!m) return;
          t.dataset.cnt = m[1];
          t.dataset.suf = m[2];
          t.textContent = "0";
          io.observe(t);
        });
        document.querySelectorAll(".pgrid,.csgrid,.grid.pg").forEach(function (g) {
          [].forEach.call(g.children, function (c, i) {
            if (c.classList.contains("card") && !c.classList.contains("cr")) {
              c.classList.add("cr");
              io.observe(c);
            }
            c.style.setProperty("--d", (i % 3) * 260 + "ms");
          });
        });
      }
    }
    addEventListener("load", function () {
      setup();
      setTimeout(setup, 600);
    });
    addEventListener("hashchange", function () {
      setTimeout(setup, 200);
    });
    document.addEventListener("click", function () {
      setTimeout(setup, 300);
    });
  })();
})();

/* arwjs */
(function () {
  document.querySelectorAll(".pill").forEach(function (a) {
    if (a.querySelector(".pa")) return;
    var i = document.createElement("i");
    i.className = "pa";
    i.setAttribute("aria-hidden", "true");
    i.innerHTML =
      '<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h15M11 2l6 6-6 6"/></svg>';
    a.appendChild(i);
  });
})();

/* arw2js */
(function () {
  (function () {
    function f() {
      if (document.hidden) return;
      var s = document.querySelector(".v-home .scl");
      if (!s) return;
      var a = document.querySelector(".v-home .avail"),
        m = document.querySelector(".v-home ~ .mq,.mq");
      if (!a || !m || !s.offsetParent) return;
      var p = s.offsetParent.getBoundingClientRect(),
        ar = a.getBoundingClientRect(),
        mr = m.getBoundingClientRect();
      if (!ar.height || mr.top <= ar.bottom) return;
      var mid = (ar.bottom + mr.top) / 2;
      s.style.top = mid - p.top - 12 + "px";
    }
    f();
    setInterval(f, 300);
    addEventListener("resize", f);
  })();
})();

/* slj */
(function () {
  (function () {
    var tm,
      i = 0;
    function b() {
      var w = document.getElementById("hwork");
      if (!w || document.getElementById("hsl")) return;
      var cs = w.querySelectorAll(".pcard");
      if (!cs.length) return;
      var d = document.createElement("div");
      d.className = "hsl";
      d.id = "hsl";
      var h = '<div class="tr">',
        dots = "";
      cs.forEach(function (c, k) {
        var im = c.querySelector("img"),
          t = c.querySelector(".tag");
        h +=
          '<a class="s" href="' +
          c.getAttribute("href") +
          '"><img src="' +
          im.getAttribute("src") +
          '" alt="' +
          im.getAttribute("alt") +
          '"></a>';
        dots += "<i></i>";
      });
      h += '</div><span class="cap"></span><div class="dots">' + dots + "</div>";
      d.innerHTML = h;
      w.parentNode.insertBefore(d, w);
      var tr = d.querySelector(".tr"),
        dt = d.querySelectorAll(".dots i"),
        cp = d.querySelector(".cap");
      function go(k) {
        var n = cs.length;
        i = (k + n) % n;
        tr.style.transform =
          "translateX(" + (document.documentElement.dir === "rtl" ? "" : "-") + i * 100 + "%)";
        var t = cs[i].querySelector(".tag");
        cp.innerHTML = t ? t.innerHTML : "";
        dt.forEach(function (e, j) {
          e.className = j == i ? "on" : "";
        });
      }
      window.hslgo = go;
      go(0);
      if (!matchMedia("(prefers-reduced-motion:reduce)").matches)
        tm = setInterval(function () {
          go(i + 1);
        }, 5500);
      var x = 0;
      d.addEventListener(
        "touchstart",
        function (e) {
          x = e.touches[0].clientX;
        },
        { passive: true },
      );
      d.addEventListener(
        "touchend",
        function (e) {
          var dx = e.changedTouches[0].clientX - x;
          if (Math.abs(dx) > 40) {
            var r = document.documentElement.dir === "rtl" ? -1 : 1;
            go(i + (dx < 0 ? 1 : -1) * r);
          }
        },
        { passive: true },
      );
      dt.forEach(function (e, j) {
        e.onclick = function () {
          go(j);
        };
      });
    }
    b();
    setInterval(function () {
      b();
    }, 1000);
  })();
})();

/* ddjs */
(function () {
  (function () {
    if (!(matchMedia && matchMedia("(hover:hover)").matches)) return;
    var d = document.querySelector(".dd");
    if (!d) return;
    var t;
    d.addEventListener("mouseenter", function () {
      clearTimeout(t);
    });
    d.addEventListener("mouseleave", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        d.classList.remove("open");
      }, 320);
    });
  })();
})();

/* ddjs2 */
(function () {
  (function () {
    var d = document.querySelector(".dd");
    if (!d) return;
    document.querySelectorAll(".nav .l a,.nav .r,.nav .langbtn,.nav .mono").forEach(function (a) {
      if (d.contains(a)) return;
      a.addEventListener("mouseenter", function () {
        d.classList.remove("hov");
        d.classList.remove("open");
      });
    });
  })();
})();
