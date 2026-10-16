// Testimonials: auto-rotate every 5s, dots jump to a slide and restart the timer.
// With prefers-reduced-motion the auto-rotate is off; the dots still work.
(function () {
  var root = document.querySelector('[data-testimonials]');
  if (!root) return;

  var slides = root.querySelectorAll('.slide');
  var dots = root.querySelectorAll('.dot');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var index = 0;
  var timer;

  function show(i) {
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    dots.forEach(function (d, n) { d.setAttribute('aria-current', n === i ? 'true' : 'false'); });
    index = i;
  }
  function start() {
    if (!reduceMotion) timer = setInterval(function () { show((index + 1) % slides.length); }, 5000);
  }
  function restart() { clearInterval(timer); start(); }

  dots.forEach(function (d, n) {
    d.addEventListener('click', function () { show(n); restart(); });
  });
  start();
})();


// Email popover: hover/keyboard focus handled in CSS. Here: tap-to-toggle on touch
// devices, Escape/click-outside to close, and copy-to-clipboard with a tick.
(function () {
  var pop = document.querySelector('[data-email-pop]');
  if (!pop) return;

  var trigger = pop.querySelector('button[aria-haspopup]');
  var copyBtn = pop.querySelector('[data-copy-email]');
  var text = pop.querySelector('[data-email-text]');
  var status = pop.querySelector('[data-copy-status]');
  var touchOnly = window.matchMedia('(hover: none)');
  var resetTimer;

  function setOpen(open) {
    pop.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  trigger.addEventListener('click', function () {
    if (touchOnly.matches) setOpen(!pop.classList.contains('is-open'));
  });
  document.addEventListener('click', function (e) { if (!pop.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); if (pop.contains(document.activeElement)) document.activeElement.blur(); }
  });
  pop.addEventListener('mouseenter', function () { trigger.setAttribute('aria-expanded', 'true'); });
  pop.addEventListener('mouseleave', function () { if (!pop.classList.contains('is-open')) trigger.setAttribute('aria-expanded', 'false'); });

  function fallbackCopy(value) {
    var ta = document.createElement('textarea');
    ta.value = value; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }

  function done() {
    copyBtn.classList.add('is-copied');
    status.textContent = 'Email copied';
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () { copyBtn.classList.remove('is-copied'); status.textContent = ''; }, 2000);
  }

  copyBtn.addEventListener('click', function () {
    var value = text.textContent.trim();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(done, function () { if (fallbackCopy(value)) done(); });
    } else if (fallbackCopy(value)) {
      done();
    }
  });
})();


// Logo / home button. On the homepage it scrolls smoothly back to the top (the hero).
// On the other pages it is a normal link to the homepage, so this does nothing there.
(function () {
  var home = document.querySelector('[data-home-top]');
  if (!home) return;
  home.addEventListener('click', function (e) {
    e.preventDefault();
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();


// Case study: floating "Sections" outline (open/close, Escape, click outside, close after choosing)
(function () {
  var toc = document.querySelector('[data-toc]');
  if (!toc) return;
  var btn = toc.querySelector('.toc__toggle');
  function set(open) { toc.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  btn.addEventListener('click', function () { set(!toc.classList.contains('is-open')); });
  toc.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  document.addEventListener('click', function (e) { if (!toc.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();

// Any button with data-copy-inline copies its data-copy-value and shows a tick for 2 seconds
(function () {
  document.querySelectorAll('[data-copy-inline]').forEach(function (btn) {
    var timer;
    function done() { btn.classList.add('is-copied'); clearTimeout(timer); timer = setTimeout(function () { btn.classList.remove('is-copied'); }, 2000); }
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy-value');
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = value; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); if (ok) done();
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(done, fallback); else fallback();
    });
  });
})();
