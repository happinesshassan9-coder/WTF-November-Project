(function(){
  function initTasks(wrapper) {
    if (!wrapper) return;

    const toggleBtn = wrapper.querySelector('.toggle-btn');
    const sidebar = wrapper.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // UNIVERSAL MENU LOGIC
    const menuItems = wrapper.querySelectorAll('.menu li');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;
        if (target && window.App?.show) {
          window.App.show(target);
        }
      });
    });

    console.log("Tasks initialized");
  }

  window.App?.registerInitFn("tasks-template", initTasks);
})();
