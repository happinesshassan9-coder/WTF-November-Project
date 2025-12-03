
const App = {
  show(templateId) {
    document.querySelectorAll('.template').forEach(t => t.style.display = 'none');
    const node = document.getElementById(templateId);
    if (node) node.style.display = 'block';
  },

  setLoggedIn(user) {
    sessionStorage.setItem('tm_user', JSON.stringify(user));
  },

  getLoggedIn() {
    const raw = sessionStorage.getItem('tm_user');
    return raw ? JSON.parse(raw) : null;
  },

  logout() {
    sessionStorage.removeItem('tm_user');
    this.show('login-template');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('global.js loaded');


  const logged = App.getLoggedIn();
  App.show(logged ? 'dashboard-template' : 'login-template');

  document.body.addEventListener('click', (e) => {
    const t = e.target.closest('[data-link]');
    if (!t) return;

    const to = t.getAttribute('data-link');

    if (to === 'signup') App.show('signup-template');
    if (to === 'login') App.show('login-template');
    if (to === 'help') alert('Help is a demo button');
  });

  
  document.body.addEventListener('submit', (e) => {
    const form = e.target;
    e.preventDefault();


    if (form.id === 'login-form') {
      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      const emailError = document.getElementById('login-email-error');
      const passwordError = document.getElementById('login-password-error');

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const passwordValid = password.length >= 6;

      if (!emailValid) {
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return;
      } else {
        emailError.style.display = 'none';
      }

      if (!passwordValid) {
        passwordError.style.display = 'block';
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordInput.focus();
        return;
      } else {
        passwordError.style.display = 'none';
      }

      
      App.setLoggedIn({ email });
      App.show('dashboard-template');
    }

    
    if (form.id === 'signup-form') {
      const nameInput = document.getElementById('signup-name');
      const emailInput = document.getElementById('signup-email');
      const passwordInput = document.getElementById('signup-password');

      const nameError = document.getElementById('signup-name-error');
      const emailError = document.getElementById('signup-email-error');
      const passwordError = document.getElementById('signup-password-error');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const nameValid = name.length >= 2;
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const passwordValid = password.length >= 6;

      if (!nameValid) {
        nameError.style.display = 'block';
        nameError.textContent = 'Please enter your full name.';
        nameInput.focus();
        return;
      } else {
        nameError.style.display = 'none';
      }

      if (!emailValid) {
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return;
      } else {
        emailError.style.display = 'none';
      }

      if (!passwordValid) {
        passwordError.style.display = 'block';
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordInput.focus();
        return;
      } else {
        passwordError.style.display = 'none';
      }

    
      App.setLoggedIn({ name, email });
      App.show('dashboard-template');
    }
  }, true);


  document.body.addEventListener('click', (e) => {
    const toggle = e.target.closest('.pw-toggle');
    if (!toggle) return;

    const input = toggle.parentElement.querySelector('input[type="password"], input[type="text"]');
    if (!input) return;

    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    toggle.title = type === 'password' ? 'Show password' : 'Hide password';
  });
});
