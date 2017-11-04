import Rellax from 'rellax';
import scrollTo from 'animated-scrollto';
import 'slick-carousel';
import $ from 'jquery';

import '../../styles/app.less';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const logoImage = document.querySelector('#logo img');
    const scrollToLinks = Array.from(
        document.querySelectorAll('.scroll-to'),
    );

    const offsetDefects = {
        'hero': 0,
        'about-white-rect': -300,
        'works': -500,
        'contact-us': 0,
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
        centerMode: true,
        ...commonSliderConfig,
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