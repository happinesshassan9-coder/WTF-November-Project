// SIDEBAR MENU CLICKABLE
const menuItems = document.querySelectorAll('.menu li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all menu items
        menuItems.forEach(i => i.classList.remove('active'));

        // Add 'active' class to clicked item
        item.classList.add('active');

        // Determine redirection based on menu text
        const menuName = item.textContent.trim();
        let page = '#'; // default fallback

        if (menuName === 'Dashboard') {
            page = '/templates/dashboard/dashboard.html';
        } else if (menuName === 'Community') {
            page = '/templates/community/community.html';
        } else if (menuName === 'Tasks') {
            page = '/templates/tasks/tasks.html';
        }

        // Redirect if a valid page is set
        if (page && page !== '#') {
            window.location.href = page;
        }
    });
});
