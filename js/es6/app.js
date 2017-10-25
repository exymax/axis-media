import Rellax from 'rellax';

import '../../styles/app.less';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');

    const parallax = new Rellax('.parallax', {
        speed: -10,
        center: false,
        round: true,
    });

    window.addEventListener('scroll', (e) => {
        if (window.scrollY > 20) {
            header.classList.add('colored');
        } else if (header.classList.contains('colored')) {
            header.classList.remove('colored');
        }
    });
});