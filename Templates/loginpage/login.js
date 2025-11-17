// template/login.js - login validation + password toggle
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if(!form) return;

  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');
  const emailErr = document.getElementById('login-email-error');
  const pwErr = document.getElementById('login-password-error');
  const pwToggle = document.getElementById('login-pw-toggle');

  // Toggle password visibility
  pwToggle.addEventListener('click', () => {
    const shown = password.getAttribute('type') === 'text';
    password.setAttribute('type', shown ? 'password' : 'text');
    pwToggle.title = shown ? 'Show password' : 'Hide password';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    emailErr.style.display = 'none';
    pwErr.style.display = 'none';
    let ok = true;

    // Basic validation
    if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){
      emailErr.textContent = 'Enter a valid email address';
      emailErr.style.display = 'block';
      ok = false;
    }
    if(!password.value || password.value.length < 6){
      pwErr.textContent = 'Password must be at least 6 characters long';
      pwErr.style.display = 'block';
      ok = false;
    }
    if(!ok) return;

    mockLogin({email: email.value, password: password.value})
      .then(user => {
        App.setLoggedIn(user);
        alert('Login successful — demo only');
      
      })
      .catch(err => {
        pwErr.textContent = err.message || 'Login failed';
        pwErr.style.display = 'block';
      });
  });

  function mockLogin({email, password}){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(email.includes('@')) resolve({name:'Demo User', email});
        else reject(new Error('Invalid credentials for demo'));
      }, 500);
    });
  }
});
