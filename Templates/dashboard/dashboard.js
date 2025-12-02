(function () {
  // Helper: safe redirect resolving relative paths
  function goTo(link) {
    if (!link) return;
    try {
      // resolves "dashboard.html" relative to current page
      const href = new URL(link, window.location.href).href;
      window.location.href = href;
    } catch (err) {
      // fallback
      window.location.href = link;
    }
  }

  // Delegate click handler for sidebar menu items (works across pages)
  function bindDelegatedMenu() {
    // handle clicks anywhere on the document
    document.addEventListener('click', function (e) {
      const li = e.target.closest('.menu li');
      if (li) {
        const link = li.dataset.link;
        if (link) {
          goTo(link);
        }
      }

      // handle logout
      const logoutBtn = e.target.closest('.logout');
      if (logoutBtn) {
        // put any logout logic here (call API, clear storage, etc.)
        alert('Logged out!');
        goTo('login.html'); // change destination if needed
      }
    }, false);
  }

  // Community post logic (also delegated/resilient)
  function bindPostLogic() {
    document.addEventListener('click', function (e) {
      const postBtn = e.target.closest('.post-btn');
      if (!postBtn) return;

      // find the nearest post input (in case there are multiple pages/instances)
      const container = postBtn.closest('.community-container') || document;
      const postInput = container.querySelector('.post-input');

      if (!postInput) {
        console.warn('Post input not found for post button');
        return;
      }

      const text = postInput.value.trim();
      if (!text) {
        alert('Write something first');
        return;
      }

      // replace this with real post logic if needed
      alert('Posted: ' + text);
      postInput.value = '';
    }, false);
  }

  // Optionally highlight active menu item based on current path
  function highlightActiveMenu() {
    const menu = document.querySelector('.menu');
    if (!menu) return;

    const items = menu.querySelectorAll('li[data-link]');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    items.forEach(li => {
      const link = li.dataset.link;
      // compare only last segment of path for simple sites
      if (link && (link === current || link === window.location.pathname || link === window.location.href)) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    bindDelegatedMenu();
    bindPostLogic();
    highlightActiveMenu();
    console.log('dashboard.js initialized');
  });
})();
