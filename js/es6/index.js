import { initHeroVideo } from './services/heroVideo';
import Typed from 'typed.js';
import * as Ripple from 'proper-ripple';
import '../../styles/main.less';
import 'slick-carousel/slick/slick.less';

import $ from 'jquery';
import 'slick-carousel';

document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('#typed-wrapper', {
        strings: [
            'are awesome',
            'are simple',
            'will not blow your mind by its cost',
        ],
        typeSpeed: 40,
        loop: true,
    });

    initHeroVideo();

    Ripple.default.watch('.btn-ripple');

    $('#clients').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-control slick-prev"><div class="inner-arrow left"></div><button>',
        nextArrow: '<button class="slick-control slick-next"><div class="inner-arrow right"></div><button>',
    });

    $('#client-reviews').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-control slick-prev"><div class="inner-arrow left"></div><button>',
        nextArrow: '<button class="slick-control slick-next"><div class="inner-arrow right"></div><button>',
    });
});
