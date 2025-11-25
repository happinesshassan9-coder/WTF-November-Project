// Must be treated as a module: <script type="module" src="dashboard.js"></script>
import { sidebarHTML } from '../../components/sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('dashboard.js loaded');

  // Inject sidebar into placeholder
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
  if (sidebarPlaceholder) {
    sidebarPlaceholder.innerHTML = sidebarHTML;
    initSidebar();
  }

  // Populate user info
  const user = App?.getLoggedIn?.();
  const nameEl = document.getElementById('dash-username');
  if (user && nameEl) {
    nameEl.textContent = user.name || user.email || 'User';
  }

  // Sidebar initialization
  function initSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    if (!sidebar) return;

    // Nav links
    sidebar.querySelectorAll('[data-link]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const to = btn.getAttribute('data-link');
        if (to === 'logout') {
          App?.logout?.();
        } else {
          alert('Navigate to ' + to + ' — demo');
        }
      });
    });

    // Toggle sidebar
    const toggleBtn = sidebar.querySelector('.sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }
  }
});
