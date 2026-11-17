$(function () {
  var items = [];
  try { items = JSON.parse(localStorage.getItem('healthy.favourites') || '[]'); if (!Array.isArray(items)) items = []; } catch (error) { items = []; }
  function save() { try { localStorage.setItem('healthy.favourites', JSON.stringify(items)); } catch (error) { $('#favError').text('Favourites cannot be saved in this browser.'); } }
  function render() {
    var $list = $('#favList').empty();
    items.forEach(function (value, index) {
      var $item = $('<li>');
      $('<span>').text(value).appendTo($item);
      $('<button>', { type: 'button', class: 'remove-btn', 'data-index': index }).text('Remove').attr('aria-label', 'Remove ' + value).appendTo($item);
      $list.append($item);
    });
    $('#favCount').text(items.length); $('#favEmpty').toggle(items.length === 0);
  }
  $('#favForm').on('submit', function (event) {
    event.preventDefault(); var value = $('#favInput').val().trim();
    if (!value) { $('#favError').text('Please type something before adding.'); return; }
    $('#favError').text(''); items.push(value); save(); render(); $('#favInput').val('').trigger('focus');
  });
  $('#favList').on('click', '.remove-btn', function () { items.splice(Number($(this).attr('data-index')), 1); save(); render(); });
  render();
});
