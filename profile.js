(function () {
  'use strict';
  var empty = document.getElementById('profileEmpty'), details = document.getElementById('profileDetails');
  try {
    var email = localStorage.getItem('healthy.currentUser');
    var users = JSON.parse(localStorage.getItem('healthy.users') || '[]');
    var user = Array.isArray(users) && users.find(function (entry) { return entry.email === email; });
    if (!user) return;
    var plans = { starter: 'Starter — 1 month', upgraded: 'Upgraded — 3 months', year: 'Year — 12 months' };
    document.getElementById('profileName').textContent = user.firstName + ' ' + user.lastName;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profilePhone').textContent = user.phone;
    document.getElementById('profileCountry').textContent = user.country;
    document.getElementById('profilePlan').textContent = plans[user.plan] || user.plan;
    document.getElementById('profileHobbies').textContent = user.hobbies && user.hobbies.length ? user.hobbies.join(', ') : 'None selected';
    empty.hidden = true; details.hidden = false;
    document.getElementById('logoutButton').addEventListener('click', function () {
      localStorage.removeItem('healthy.currentUser'); window.location.href = 'login.html';
    });
  } catch (error) {
    empty.querySelector('p').textContent = 'Could not access saved accounts. Please enable local storage and log in.';
  }
})();
