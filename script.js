<script>
(function () {
  var section = document.querySelector('.mission-vision-block');
  if (!section) return;
  var targets = section.querySelectorAll('.gradient-blue strong');
  if (!targets.length) return;
  function check() {
    var rect = section.getBoundingClientRect();
    var active = rect.top <= 0 && rect.bottom > 0;
    targets.forEach(el => el.classList.toggle('in-view', active));
  }
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { ticking = false; check(); });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', check);
  check();
})();
</script>
<script>
(function () {
  "use strict";
  var GROUPS = [
    { el: '.tbpf-title',    card: '.tbpf-list-item-wrapper' },
  ];
  var LISTS = [
    '.tbpf-list',
    '.owl-cl',
    '.relatedproj__swiper .swiper-wrapper',
    '.blueprint__swiper .swiper-wrapper'
  ];
  var MIN_WIDTH = 768;
  var TOLERANCE = 4;
  var DEBUG     = false;
  var busy = false, t;
  function equalize() {
    busy = true;
    GROUPS.forEach(function (g) {
      var els = [].slice.call(document.querySelectorAll(g.el));
      els.forEach(function (el) { el.style.removeProperty('min-height'); });
      if (window.innerWidth < MIN_WIDTH) return;
      var rows = [];
      els.forEach(function (el) {
        if (el.offsetParent === null) return;
        var card = el.closest(g.card) || el;
        var top  = card.getBoundingClientRect().top;
        var row = null;
        for (var i = 0; i < rows.length; i++) {
          if (Math.abs(rows[i].top - top) <= TOLERANCE) { row = rows[i]; break; }
        }
        if (!row) { row = { top: top, tallest: 0, items: [] }; rows.push(row); }

        var h = el.getBoundingClientRect().height;
        if (h > row.tallest) row.tallest = h;
        row.items.push(el);
      });
      rows.forEach(function (row) {
        var px = Math.ceil(row.tallest) + 'px';
        row.items.forEach(function (el) {
          el.style.setProperty('min-height', px, 'important');
        });
      });
      if (DEBUG) console.log('[equalize]', g.el, rows.map(function (r) {
        return r.items.length + ' @ ' + Math.round(r.top) + ' → ' + Math.ceil(r.tallest);
      }));
    });
    if (window.blueprintSwiper) window.blueprintSwiper.update();
    requestAnimationFrame(function () { busy = false; });
  }
  function schedule() {
    if (busy) return;
    clearTimeout(t);
    t = setTimeout(equalize, 60);
  }
  function boot() {
    schedule();
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    LISTS.forEach(function (sel) {
      var list = document.querySelector(sel);
      if (list && window.MutationObserver) {
        new MutationObserver(schedule).observe(list, {
          childList: true, subtree: true,
          attributes: true, attributeFilter: ['style', 'class']
        });
      }
    });
    document.querySelectorAll('.blueprint__swiper img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', schedule, { once: true });
    });
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push(['cmsfilter', schedule]);
    var typeFilter = document.getElementById('project-type-filter');
    if (typeFilter) typeFilter.addEventListener('change', schedule);
  }
  document.readyState !== 'loading'
    ? boot()
    : document.addEventListener('DOMContentLoaded', boot);
})();
</script>

<script>
(function () {
  var sections = document.querySelectorAll('.with-left-pattern');
  if (!sections.length) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;
  var SPEED = 1;
  function update() {
    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      section.style.backgroundPosition = '0px ' + (rect.top * SPEED) + 'px';
    });
  }
  if (window.lenis) {
    window.lenis.on('scroll', update);
  } else {
    window.addEventListener('scroll', update, { passive: true });
  }
  window.addEventListener('resize', update);
  update();
})();
</script>
<script>
document.querySelectorAll('.tb-carousel .tb-content .tb-phar').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  if (words.length > 20) {
    el.textContent = words.slice(0, 20).join(' ') + '…';
  }
});
</script>
<script>
document.addEventListener("click",function(e){
  var b=e.target.closest(".menu-button");
  if(!b||!document.body.classList.contains("menu-open"))return;
  e.preventDefault();
  e.stopPropagation();
  var c=document.querySelector(".close-menu-button");
  if(c)c.click();
},true);
</script>
