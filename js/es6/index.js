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
        slidesToShow: 3,
        slidesToScroll: 3,
    });
});
