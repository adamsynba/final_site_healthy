(function () {
  'use strict';
  var button = document.getElementById('themeToggle');
  if (!button) return;
  function paint(dark) {
    document.body.classList.toggle('dark-theme', dark);
    button.textContent = dark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-pressed', String(dark));
  }
  var dark = false;
  try { dark = localStorage.getItem('theme') === 'dark'; } catch (error) {}
  paint(dark);
  button.addEventListener('click', function () {
    var next = !document.body.classList.contains('dark-theme');
    paint(next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch (error) {}
  });
})();
