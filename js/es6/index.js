import { initHeroVideo } from './services/heroVideo';
import Typed from 'typed.js';
import * as Ripple from 'proper-ripple';
import '../../styles/main.less';

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
});