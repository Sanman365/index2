document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(item => item.classList.remove('active'));
            // Add active class to the clicked tab
            this.classList.add('active');

            // Hide all tab panels
            panels.forEach(panel => panel.classList.remove('active'));
            // Show the clicked tab's panel
            const activePanel = document.getElementById(this.dataset.tab);
            activePanel.classList.add('active');
        });
    });
});
