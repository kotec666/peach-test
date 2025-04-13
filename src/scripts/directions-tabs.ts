document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.directions__mobile-card');

    const closeAllTabs = () => {
        tabs.forEach(tab => {
            tab.classList.remove('directions__mobile-card--expanded');
            const content = tab.querySelector('.directions__mobile-card-content');
            const desc = tab.querySelector('.directions__mobile-card-desc');
            if (content) content.classList.remove('directions__mobile-card-content--expanded');
            if (desc) desc.classList.remove('directions__mobile-card-desc--expanded');
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const isExpanded = tab.classList.contains('directions__mobile-card--expanded');

            closeAllTabs();

            if (!isExpanded) {
                tab.classList.add('directions__mobile-card--expanded');
                const content = tab.querySelector('.directions__mobile-card-content');
                const desc = tab.querySelector('.directions__mobile-card-desc');
                if (content) content.classList.add('directions__mobile-card-content--expanded');
                if (desc) desc.classList.add('directions__mobile-card-desc--expanded');
            }
        });
    });
});