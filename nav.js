(function () {
  'use strict';
  var header = document.querySelector('.site-header'), button = document.querySelector('.menu-toggle');
  if (!header || !button) return;
  header.classList.add('nav-ready');
  function setOpen(open) {
    header.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
  }
  button.addEventListener('click', function () { setOpen(button.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
  });
})();
