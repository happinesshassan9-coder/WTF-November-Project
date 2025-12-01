/* assets/js/global.js */
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

  // Show dashboard if logged in
  const logged = App.getLoggedIn();
  App.show(logged ? 'dashboard-template' : 'login-template');


  /* ---------------------------------------
     NAVIGATION HANDLERS
  --------------------------------------- */
  document.body.addEventListener('click', (e) => {
    const t = e.target.closest('[data-link]');
    if (!t) return;

    const to = t.getAttribute('data-link');

    if (to === 'signup') App.show('signup-template');
    if (to === 'login') App.show('login-template');
    if (to === 'help') alert('Help is a demo button');
  });


  /* ---------------------------------------
     FORM LOGIC (SHOW DASHBOARD AFTER LOGIN/SIGNUP)
  --------------------------------------- */
  document.body.addEventListener('submit', (e) => {
    const form = e.target;

    // LOGIN
    if (form.id === 'login-form') {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;

      // Store "user session"
      App.setLoggedIn({ email });

      // Redirect to dashboard
      App.show('dashboard-template');
      return;
    }

    // SIGNUP
    if (form.id === 'signup-form') {
      e.preventDefault();
      const name = document.getElementById('signup-name')?.value;
      const email = document.getElementById('signup-email')?.value;

      // Save user
      App.setLoggedIn({ name, email });

      // Redirect to dashboard
      App.show('dashboard-template');
      return;
    }
  }, true);
});


