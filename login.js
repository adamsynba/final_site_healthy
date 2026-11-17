(function () {
  'use strict';
  var form = document.getElementById('loginForm');
  var email = document.getElementById('loginEmail'), password = document.getElementById('loginPassword');
  var message = document.getElementById('loginError');
  function mark(field) {
    var valid = field.checkValidity() && !!field.value.trim();
    field.classList.toggle('is-invalid', !valid); field.classList.toggle('is-valid', valid);
    field.setAttribute('aria-invalid', String(!valid));
    return valid;
  }
  [email, password].forEach(function (field) {
    field.addEventListener('input', function () { message.textContent = ''; if (field.classList.contains('is-invalid')) mark(field); });
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault(); message.textContent = '';
    var emailValid = mark(email), passwordValid = mark(password);
    if (!emailValid || !passwordValid) { (!emailValid ? email : password).focus(); return; }
    try {
      var users = JSON.parse(localStorage.getItem('healthy.users') || '[]');
      if (!Array.isArray(users)) users = [];
      var enteredEmail = email.value.trim().toLowerCase();
      var user = users.find(function (entry) { return entry.email === enteredEmail && entry.password === password.value; });
      if (!user) { message.textContent = 'Email or password is incorrect. Check your details or create an account.'; return; }
      localStorage.setItem('healthy.currentUser', user.email);
      window.location.href = 'profile.html';
    } catch (error) {
      message.textContent = 'Could not access saved accounts. Please enable local storage and try again.';
    }
  });
})();
