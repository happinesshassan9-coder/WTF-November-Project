/* templates/signuppage/signup.js */
document.addEventListener('DOMContentLoaded', () => {
  console.log('signup.js loaded');

  const form = document.getElementById('signup-form');
  if (!form) return;

  const name = document.getElementById('signup-name');
  const email = document.getElementById('signup-email');
  const password = document.getElementById('signup-password');
  const nameErr = document.getElementById('signup-name-error');
  const emailErr = document.getElementById('signup-email-error');
  const pwErr = document.getElementById('signup-password-error');
  const pwToggle = document.getElementById('signup-pw-toggle');

  if (pwToggle && password) {
    pwToggle.addEventListener('click', () => {
      const shown = password.type === 'text';
      password.type = shown ? 'password' : 'text';
      pwToggle.title = shown ? 'Show password' : 'Hide password';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    nameErr.style.display = emailErr.style.display = pwErr.style.display = 'none';
    let ok = true;

    if (!name.value.trim()) {
      nameErr.textContent = 'Enter your full name';
      nameErr.style.display = 'block';
      ok = false;
    }
    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
      emailErr.textContent = 'Enter a valid email address';
      emailErr.style.display = 'block';
      ok = false;
    }
    if (!password.value || password.value.length < 6) {
      pwErr.textContent = 'Password must be at least 6 characters';
      pwErr.style.display = 'block';
      ok = false;
    }
    if (!ok) return;

    mockSignup({ name: name.value, email: email.value })
      .then(user => {
        App.setLoggedIn(user);
        console.log('Account created — demo only');
        // show dashboard
        App.show('dashboard-template');
      })
      .catch(err => {
        emailErr.textContent = err.message || 'Signup failed';
        emailErr.style.display = 'block';
      });
  });

  function mockSignup({ name, email }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('taken')) reject(new Error('Email already taken for demo'));
        else resolve({ name, email });
      }, 600);
    });
  }
});