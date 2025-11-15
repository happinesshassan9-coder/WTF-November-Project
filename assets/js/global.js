/* assets/global.js - App helper and simple view controls */
const App = {
  show(templateId){
    document.querySelectorAll('.template').forEach(t => t.style.display = 'none');
    const node = document.getElementById(templateId);
    if(node) node.style.display = 'block';
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
  // Default show login
  App.show('login-template');

  // Click handler to switch between pages using data-link attributes
  document.body.addEventListener('click', (e) => {
    const t = e.target.closest('[data-link]');
    if(!t) return;
    const to = t.getAttribute('data-link');
    if(to === 'signup') App.show('signup-template');
    if(to === 'login') App.show('login-template');
    if(to === 'help') alert('Help is a demo button. In a real app this would open support docs.');
  });
});

