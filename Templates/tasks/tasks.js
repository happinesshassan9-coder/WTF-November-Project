// COLLAPSE SIDEBAR
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// MAKE SIDEBAR MENU CLICKABLE WITH TOGGLE BEHAVIOR
const menuItems = document.querySelectorAll('.menu li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all menu items
        menuItems.forEach(i => i.classList.remove('active'));

        // Add active class to clicked item
        item.classList.add('active');

        // Determine page based on menu text
        let page = item.getAttribute('data-link');
        const menuName = item.textContent.trim();

        if (menuName === 'Dashboard') {
            page = '/templates/dashboard/dashboard.html';
        } else if (menuName === 'Community') {
            page = '/templates/community/community.html';
        } else if (menuName === 'Tasks') {
            page = '/templates/tasks/task.html';
        }

        // Redirect to the page
        if (page) {
            window.location.href = page;
        }
    });
});
