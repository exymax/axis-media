import Typed from 'typed.js';
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
});