import './../styles/main.scss'
// data-region="far-east"
// data-cities-for="far-east"

const allElementsWithDataRegion = document.querySelectorAll('[data-region]');

document.addEventListener('DOMContentLoaded', () => {

    if (window.innerWidth < 1024) {
        document.querySelectorAll('.offices__cities').forEach(node => {
            const element = node as HTMLElement
            element.style.display = 'none'
        })
    } else {
        document.querySelectorAll('.offices__cities').forEach(node => {
            const element = node as HTMLElement
            element.style.display = 'flex'
        })
    }
})

allElementsWithDataRegion.forEach((node) => {
    node.addEventListener('click', () => {
        if (window.innerWidth >= 1024) {
            return
        }
        const element = node as HTMLElement;

        const clickedRegion = element.getAttribute('data-region')
        const arrow = element.querySelector('img');

        if (element) {
            if (element.style.color === 'rgb(176, 23, 54)') {
                element.style.color = '#444444';
            } else {
                element.style.color = '#B01736';
            }
        }

        if (arrow) {
            if (arrow.style.transform === 'rotate(180deg)') {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        }

        const foundedCitiesForRegion = document.querySelector(`[data-cities-for="${clickedRegion}"]`) as HTMLElement | null

        if (foundedCitiesForRegion && foundedCitiesForRegion.style) {
            if (foundedCitiesForRegion.style.display === 'none') {
                foundedCitiesForRegion.style.display = 'flex';
            } else {
                foundedCitiesForRegion.style.display = 'none';
            }
        }
    })
})
