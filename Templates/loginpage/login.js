/* templates/loginpage/login.js */
document.addEventListener('DOMContentLoaded', () => {
  console.log('login.js loaded');

  const form = document.getElementById('login-form');
  if (!form) return;

  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');
  const emailErr = document.getElementById('login-email-error');
  const pwErr = document.getElementById('login-password-error');
  const pwToggle = document.getElementById('login-pw-toggle');

  if (pwToggle && password) {
    pwToggle.addEventListener('click', () => {
      const shown = password.type === 'text';
      password.type = shown ? 'password' : 'text';
      pwToggle.title = shown ? 'Show password' : 'Hide password';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (emailErr) emailErr.style.display = 'none';
    if (pwErr) pwErr.style.display = 'none';
    let ok = true;

    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
      if (emailErr) {
        emailErr.textContent = 'Enter a valid email address';
        emailErr.style.display = 'block';
      }
      ok = false;
    }
    if (!password.value || password.value.length < 6) {
      if (pwErr) {
        pwErr.textContent = 'Password must be at least 6 characters long';
        pwErr.style.display = 'block';
      }
      ok = false;
    }
    if (!ok) return;

    mockLogin({ email: email.value, password: password.value })
      .then(user => {
        App.setLoggedIn(user);
        console.log('Login successful — demo only');
        // show dashboard
        App.show('dashboard-template');
      })
      .catch(err => {
        if (pwErr) {
          pwErr.textContent = err.message || 'Login failed';
          pwErr.style.display = 'block';
        }
      });
  });

  function mockLogin({ email }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('@')) resolve({ name: 'Demo User', email });
        else reject(new Error('Invalid credentials for demo'));
      }, 500);
    });
  }
});