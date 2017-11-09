import Rellax from 'rellax';
import * as Ripple from 'proper-ripple';
import scrollTo from 'animated-scrollto';
import 'slick-carousel';
import $ from 'jquery';

import '../../styles/app.less';

const getElements = (selector) => Array.from(
    document.querySelectorAll(selector)
);

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const logoImage = document.querySelector('#logo img');
    const scrollToLinks = getElements('.scroll-to');
    const workSlides = getElements('.work');

    const offsetDefects = {
        'hero': 0,
        'about-white-rect': -300,
        'works': -500,
        'contact-us': 0,
    };

    Ripple.default.watch('.btn.blue');
    var rippleDark = Ripple.default.watch('.btn:not(.blue)');
    rippleDark.factory.options = {
        color: 'rgba(0, 0, 0, .15)',
    };

    scrollToLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const scrollToID = link.getAttribute('data-scroll-to');
            const element = document.querySelector(`#${scrollToID}`);
            const scrollTop =
                element.getBoundingClientRect().top - document.body.getBoundingClientRect().top + offsetDefects[scrollToID];
            scrollTo(document.body, scrollTop, 700);
            scrollTo(document.documentElement, scrollTop, 700);
        });
    });

    workSlides.forEach((workSlide) => {
        const sourceURL = workSlide.getAttribute('data-source');
        
        if (sourceURL) {
            workSlide.style.backgroundImage = `url("${sourceURL}")`;
        }
    });

    const parallax = new Rellax('.parallax', {
        speed: -10,
        center: false,
        round: true,
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('colored');
            logoImage.src= 'images/icons/logo-dark.png';
        } else if (header.classList.contains('colored')) {
            header.classList.remove('colored');
            logoImage.src= 'images/logo.png';
        }
    });

    const commonSliderConfig = {
        infinite: true,
        slidesToScroll: 3,
    };

    $('#works-wrapper').slick({
        dots: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: false,
    });

    $('#reviews').slick({
        slidesToShow: 3,
        ...commonSliderConfig,
    });

    $('#clients').slick({
        slidesToShow: 5,
        ...commonSliderConfig,
    });
});