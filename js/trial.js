/* Trial only: boxed project cards with a short blurb, plus a slow moving circle behind the hero photo. */
(function () {
  var KIND = {
    "p-food-social": ["Food and supplement designs", "تصميمات أغذية ومكملات غذائية"],
    "p-logo-brand": ["Logos and brand marks", "شعارات وعلامات تجارية"],
    "p-intrip-logo": ["Logo design", "تصميم شعار"],
    "p-real-estate": ["Real estate social media posts", "منشورات سوشيال ميديا عقارية"],
    "p-art-photo": ["Art and photography", "فن وتصوير"],
    "p-sketches": ["Sketches", "اسكتشات"],
    "p-rui-brew": ["Brand identity case study", "دراسة حالة لهوية بصرية"],
  };
  var DEF = ["Design project", "مشروع تصميم"];
  function arCount(n) {
    if (n === 1) return "صورة واحدة";
    if (n === 2) return "صورتان";
    if (n <= 10) return n + " صور";
    return n + " صورة";
  }
  function enCount(n) {
    return n + (n === 1 ? " image" : " images");
  }
  var cards = [].slice.call(document.querySelectorAll(".pcard"));
  cards.forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var slug = href.indexOf("#") === 0 ? href.slice(1) : href.replace(/\/$/, "").replace(/^\.\.\//, "");
    if (slug === "rui-brew") slug = "p-rui-brew";
    var em = a.querySelector("em");
    var n = em ? parseInt(em.textContent, 10) : 0;
    var k = KIND[slug] || DEF;
    var b = document.createElement("span");
    b.className = "pblurb";
    b.setAttribute("data-n", n);
    b.setAttribute("data-ken", k[0]);
    b.setAttribute("data-kar", k[1]);
    a.appendChild(b);
    var m = document.createElement("span");
    m.className = "pmeta";
    m.innerHTML = '<span class="pn"></span><b class="pd"></b>';
    a.appendChild(m);
  });
  function paint() {
    var ar = document.documentElement.lang === "ar";
    [].forEach.call(document.querySelectorAll(".pblurb"), function (b) {
      var n = +b.getAttribute("data-n");
      b.textContent = ar
        ? b.getAttribute("data-kar") + (n ? "، " + arCount(n) : "")
        : b.getAttribute("data-ken") + (n ? ", " + enCount(n) : "");
      var mm = b.nextSibling;
      if (mm && mm.className === "pmeta") {
        mm.querySelector(".pn").textContent = n ? (ar ? arCount(n) : enCount(n)) : "";
        mm.querySelector(".pd").textContent = ar ? "هاني مجدي" : "Hany Magdy";
      }
    });
  }
  paint();
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  var hab = document.querySelector(".hhero .hab");
  var me = hab && hab.querySelector("img.me");
  if (me) {
    var big = document.createElement("i");
    big.className = "rgb";
    big.setAttribute("aria-hidden", "true");
    me.insertAdjacentElement("afterend", big);
    var cut = me.cloneNode(false);
    cut.src = "images/hany-band-cut.png";
    cut.alt = "";
    cut.setAttribute("aria-hidden", "true");
    cut.classList.add("mecut");
    big.insertAdjacentElement("afterend", cut);
  }
})();
