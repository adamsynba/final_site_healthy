(function () {
  'use strict';
  var form = document.getElementById('registerForm');
  var pw = document.getElementById('password'), cpw = document.getElementById('confirmPassword');
  var phone = document.getElementById('regPhone'), plan = document.getElementById('plan');
  var errorBox = document.getElementById('registerError'), success = document.getElementById('registerSuccess');
  var confirmInvalid = document.getElementById('confirmInvalid');
  var controls = form.querySelectorAll('.form-control, .form-select');
  var wanted = new URLSearchParams(location.search).get('plan');
  if (['starter', 'upgraded', 'year'].includes(wanted)) plan.value = wanted;

  function validateField(field) {
    if (field.id === 'firstName' || field.id === 'lastName') {
      field.setCustomValidity(field.value.trim().length >= 2 ? '' : 'Enter at least two non-space characters.');
    }
    if (field === pw) {
      field.setCustomValidity(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(field.value) ? '' : 'Choose a stronger password.');
    }
    if (field === cpw) {
      field.setCustomValidity(field.value && field.value === pw.value ? '' : 'Passwords do not match.');
      confirmInvalid.textContent = field.value ? 'Passwords must match.' : 'Please confirm your password.';
    }
    if (field === phone) {
      var input = field.value.trim(), digits = input.replace(/\D/g, '');
      field.setCustomValidity(/^\+?[0-9 ()-]+$/.test(input) && digits.length >= 10 && digits.length <= 15 ? '' : 'Enter a valid phone number.');
    }
    var valid = field.checkValidity();
    field.classList.toggle('is-valid', valid);
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    return valid;
  }

  controls.forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', function () {
      errorBox.textContent = '';
      if (field.classList.contains('is-valid') || field.classList.contains('is-invalid')) validateField(field);
      if (field === pw && cpw.value) validateField(cpw);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    success.classList.add('d-none'); errorBox.textContent = '';
    var valid = true;
    controls.forEach(function (field) { if (!validateField(field)) valid = false; });
    if (!valid) { var first = form.querySelector('.is-invalid'); if (first) first.focus(); return; }
    var email = document.getElementById('regEmail').value.trim().toLowerCase();
    try {
      var users = JSON.parse(localStorage.getItem('healthy.users') || '[]');
      if (!Array.isArray(users)) users = [];
      if (users.some(function (user) { return user.email === email; })) {
        errorBox.textContent = 'An account with this email already exists on this browser. Please log in.';
        document.getElementById('regEmail').focus();
        return;
      }
      var hobbies = Array.from(form.querySelectorAll('input[name="hobbies"]:checked')).map(function (el) { return el.value; });
      users.push({
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: email, phone: phone.value.trim(), password: pw.value,
        country: document.getElementById('country').value, plan: plan.value, hobbies: hobbies
      });
      localStorage.setItem('healthy.users', JSON.stringify(users));
      form.reset();
      controls.forEach(function (field) { field.classList.remove('is-valid', 'is-invalid'); field.removeAttribute('aria-invalid'); field.setCustomValidity(''); });
      success.classList.remove('d-none');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      errorBox.textContent = 'Could not save your account in this browser. Please enable local storage and try again.';
    }
  });
  form.addEventListener('reset', function () {
    controls.forEach(function (field) { field.setCustomValidity(''); field.classList.remove('is-valid', 'is-invalid'); field.removeAttribute('aria-invalid'); });
    success.classList.add('d-none'); errorBox.textContent = '';
  });
})();
