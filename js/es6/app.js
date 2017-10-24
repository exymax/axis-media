import Rellax from 'rellax';

import '../../styles/app.less';

document.addEventListener('DOMContentLoaded', () => {
    const parallax = new Rellax('.parallax', {
        speed: -10,
        center: false,
        round: true,
    });
});