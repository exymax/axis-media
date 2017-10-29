import Rellax from 'rellax';
import 'slick-carousel';
import $ from 'jquery';

import '../../styles/app.less';

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('#header');
    const logoImage = document.querySelector('#logo img');

    const parallax = new Rellax('.parallax', {
        speed: -10,
        center: false,
        round: true,
    });

    window.addEventListener('scroll', (e) => {
        if (window.scrollY > 20) {
            header.classList.add('colored');
            logoImage.src= 'images/logo-dark.png';
        } else if (header.classList.contains('colored')) {
            header.classList.remove('colored');
            logoImage.src= 'images/logo.png';
        }
    });

    $('#works-wrapper').slick();
});