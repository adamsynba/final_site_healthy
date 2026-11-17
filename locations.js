(function () {
  'use strict';
  var city = 'all', activity = 'all';
  var cards = Array.from(document.querySelectorAll('.catalog-card[data-city]'));
  function update() {
    var count = 0;
    cards.forEach(function (card) {
      var show = (city === 'all' || card.dataset.city === city) &&
        (activity === 'all' || card.dataset.activities.split(' ').includes(activity));
      card.hidden = !show; if (show) count++;
    });
    document.getElementById('locationCount').textContent = 'Showing ' + count + (count === 1 ? ' location' : ' locations');
    document.getElementById('locationEmpty').hidden = count !== 0;
  }
  ['cityFilters', 'activityFilters'].forEach(function (id) {
    var group = document.getElementById(id);
    group.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-value]');
      if (!button) return;
      group.querySelectorAll('button').forEach(function (item) {
        var active = item === button;
        item.classList.toggle('active-filter', active); item.setAttribute('aria-pressed', String(active));
      });
      if (id === 'cityFilters') city = button.dataset.value; else activity = button.dataset.value;
      update();
    });
  });
  update();
})();
