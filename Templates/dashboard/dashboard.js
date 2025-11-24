/* templates/dashboard/dashboard.js */
document.addEventListener('DOMContentLoaded', () => {
  console.log('dashboard.js loaded');

  // Load sidebar component HTML
  fetch('components/sidebar.html')
    .then(r => r.text())
    .then(html => {
      const root = document.getElementById('sidebar-root');
      if (root) {
        root.innerHTML = html;
        initSidebar();
      }
    })
    .catch(err => console.error('Failed to load sidebar component', err));

  // Populate user info
  const user = App.getLoggedIn();
  const nameEl = document.getElementById('dash-username');
  if (user && nameEl) {
    nameEl.textContent = user.name || user.email || 'User';
  }

  // initials in sidebar (if present)
  function initialsFrom(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // Wait a tick for sidebar to be injected
  setTimeout(() => {
    const userChip = document.querySelector('.sidebar .user-chip');
    if (userChip) {
      const initials = initialsFrom(user?.name || user?.email || 'User');
      userChip.textContent = initials;
    }
  }, 50);

  // Quick actions: use components/button.html to create buttons
  fetch('components/button.html')
    .then(r => r.text())
    .then(html => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;

      // Primary button clone for "Create New Task"
      const primaryBtn = tmp.querySelector('.cmp-btn[data-variant="primary"]').cloneNode(true);
      primaryBtn.querySelector('.cmp-btn-label').textContent = 'Create New Task';
      primaryBtn.addEventListener('click', () => alert('Create New Task — demo'));
      document.getElementById('quick-actions-container').appendChild(primaryBtn);

      // Ghost button clone for "Track Expense"
      const ghostBtn = tmp.querySelector('.cmp-btn[data-variant="ghost"]').cloneNode(true);
      ghostBtn.querySelector('.cmp-btn-label').textContent = 'Track Expense';
      ghostBtn.addEventListener('click', () => alert('Track Expense — demo'));
      document.getElementById('quick-actions-container').appendChild(ghostBtn);

      // Icon button clone for "Write Note"
      const iconBtn = tmp.querySelector('.cmp-btn.icon').cloneNode(true);
      iconBtn.querySelector('img').src = 'assets/icons/icon-note.png';
      iconBtn.setAttribute('aria-label', 'Write Note');
      iconBtn.addEventListener('click', () => alert('Write Note — demo'));
      document.getElementById('quick-actions-container').appendChild(iconBtn);
    })
    .catch(err => console.warn('button component not loaded', err));

  // Sidebar init
  function initSidebar() {
    // wire nav links
    document.querySelectorAll('.sidebar [data-link]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const to = btn.getAttribute('data-link');
        if (to === 'logout') {
          App.logout();
        } else if (to === 'dashboard') {
          App.show('dashboard-template');
        } else {
          alert('Open ' + to + ' — demo');
        }
      });
    });
  }
});