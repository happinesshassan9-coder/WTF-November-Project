/* assets/global.js */
const App = {
  show(templateId){
    document.querySelectorAll('.template').forEach(t => t.style.display = 'none');
    const node = document.getElementById(templateId);
    if (node) node.style.display = 'block';
  },
  setLoggedIn(user){
    sessionStorage.setItem('tm_user', JSON.stringify(user));
  },
  getLoggedIn(){
    const raw = sessionStorage.getItem('tm_user');
    return raw ? JSON.parse(raw) : null;
  },
  logout(){
    sessionStorage.removeItem('tm_user');
    this.show('login-template');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('global.js loaded');

  // Default show login
  App.show('login-template');

  // Navigation
  document.body.addEventListener('click', (e) => {
    const t = e.target.closest('[data-link]');
    if (!t) return;
    const to = t.getAttribute('data-link');
    if (to === 'signup') App.show('signup-template');
    if (to === 'login') App.show('login-template');
    if (to === 'help') alert('Help is a demo button. In a real app this would open support docs.');
  });

  // Fallback: log any form submission by ID
  document.body.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.id === 'login-form') {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      console.log('Login submit captured (fallback). Email:', email);
    }
    if (form.id === 'signup-form') {
      e.preventDefault();
      const email = document.getElementById('signup-email')?.value;
      const name = document.getElementById('signup-name')?.value;
      console.log('Signup submit captured (fallback). Name/Email:', name, email);
    }
  }, true);
});
