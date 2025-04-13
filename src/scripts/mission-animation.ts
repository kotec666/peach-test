document.addEventListener('DOMContentLoaded', () => {
    const mission = document.querySelector('#mission-fade')

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mission?.classList.add('visible')
                observer.disconnect()
            }
        });
    }, {
        threshold: 0.5
    });

    if (mission) {
        observer.observe(mission)
    }
});