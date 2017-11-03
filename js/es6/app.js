import Rellax from 'rellax';
import scrollToElement from 'scroll-to-element';
import 'slick-carousel';
import 'jquery-mousewheel';
import $ from 'jquery';

import '../../styles/app.less';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const logoImage = document.querySelector('#logo img');
    const scrollToLinks = Array.from(
        document.querySelectorAll('.scroll-to'),
    );

    scrollToLinks.forEach((link) => {
        link.addEventListener('click', () => {
            scrollToElement(`#${link.getAttribute('data-scroll-to')}`, {
                offset: 0,
            });
        });
    });

    const parallax = new Rellax('.parallax', {
        speed: -10,
        center: false,
        round: true,
    });

    window.addEventListener('scroll', (e) => {
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

    $('.slider').on('mousewheel', function (e) {
        e.preventDefault();
        $(this).slick(e.deltaY > 0 ? 'slickPrev' : 'slickNext');
    });
});