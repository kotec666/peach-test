import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', () => {
    const splide = new Splide('.splide', {
        type: 'slide',
        rewind: true,
        perPage: 1,
        focus: 'center',
        autoplay: false,
        flickMaxPages: 1,
        arrows: false,
        pagination: true,
        updateOnMove: false,
        perMove: 1,
        lazyLoad: true,
        autoHeight: true,
        gap: 0,
        padding: 0,
        classes: {
            arrows: 'splide__arrows slider__controls',
            arrow: 'splide__arrow slider__control',
            prev: 'splide__arrow--prev slider__control--prev',
            next: 'splide__arrow--next slider__control--next',
            pagination: 'slider__progress',
            page      : 'slider__progress-item',
        },
        breakpoints: {}
    })

    const prevBtn = document.querySelector('.slider__control--prev');
    const nextBtn = document.querySelector('.slider__control--next');

    prevBtn?.addEventListener('click', () => splide.go('<'));
    nextBtn?.addEventListener('click', () => splide.go('>'));

    splide.mount()
});
