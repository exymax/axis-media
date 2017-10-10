import { maxBy as _maxBy, forEach as _forEach } from 'lodash';
import '../../styles/new.less';
const Particles = require('particlesjs');

const delayClassToggle = (selector, delay) => {
    const elementCollection = document.querySelectorAll(selector);
    setTimeout(() => {
        [].forEach.call(elementCollection, (element) => {
            element.classList.add('active');
        });
    }, delay);
};

const iterateNodeCollection = (collection, callback) => {
    [].forEach.call(collection, (item) => {
        callback(item);
    })
};

const hideActiveElements = (elements) => {
    iterateNodeCollection(elements, (element) => {
        console.log('listener attached');
        element.classList.remove('active');
    });
};

const animationMap = [
    {
        selector: '#border-animation-svg',
        delay: 0,
    },
    {
        selector: '.border-line',
        delay: 100,
    },
    {
        selector: '#name-container',
        delay: 50,
    },
    {
        selector: '#name',
        delay: 400,
    },
    {
        selector: '#directions',
        delay: 500,
    },
    {
        selector: '#header',
        delay: 300,
    }
];

const pageAnimationsLoadPromise = new Promise((resolve, reject) => {
    _forEach(animationMap, (animation) => {
        delayClassToggle(animation.selector, animation.delay);
    });
    const maxDelayAnimation = _maxBy(animationMap, (animation) => (
        animation.delay
    ));
    setTimeout(() => {
        resolve();
    }, maxDelayAnimation.delay + 100);
});

document.addEventListener('DOMContentLoaded', () => {
    const ripple = document.querySelector('#direction-ripple');
    const container = document.querySelector('#container');

    pageAnimationsLoadPromise.then(() => {
        const directions = document.querySelectorAll('.direction');

        iterateNodeCollection(directions, (direction) => {
            direction.addEventListener('mousedown', (e) => {
                const selectedDirection = direction.getAttribute('data-direction');
                const directionSelector = `#${selectedDirection}-page`;
                const directionPage = document.querySelector(directionSelector);
                directionPage.classList.add('visible');
                delayClassToggle(directionSelector, 500);
                ripple.style.top = `${e.pageY}px`;
                ripple.style.left = `${e.pageX}px`;
                ripple.classList.add('active', selectedDirection);
                container.classList.remove('active');
            });
        });
    });

    // Particles.init({
    //     selector: '#particles',
    //     "particles": {
    //         "number": {
    //             "value": 355,
    //             "density": {
    //                 "enable": true,
    //                 "value_area": 789.1476416322727
    //             }
    //         },
    //         "color": {
    //             "value": "#ffffff"
    //         },
    //         "shape": {
    //             "type": "circle",
    //             "stroke": {
    //                 "width": 0,
    //                 "color": "#000000"
    //             },
    //             "polygon": {
    //                 "nb_sides": 5
    //             }
    //         },
    //         "opacity": {
    //             "value": 0.48927153781200905,
    //             "random": false,
    //             "anim": {
    //                 "enable": true,
    //                 "speed": 0.2,
    //                 "opacity_min": 0,
    //                 "sync": false
    //             }
    //         },
    //         "size": {
    //             "value": 2,
    //             "random": true,
    //             "anim": {
    //                 "enable": true,
    //                 "speed": 2,
    //                 "size_min": 0,
    //                 "sync": false
    //             }
    //         },
    //         "line_linked": {
    //             "enable": false,
    //             "distance": 150,
    //             "color": "#ffffff",
    //             "opacity": 0.4,
    //             "width": 1
    //         },
    //         "move": {
    //             "enable": true,
    //             "speed": 0.2,
    //             "direction": "none",
    //             "random": true,
    //             "straight": false,
    //             "out_mode": "out",
    //             "bounce": false,
    //             "attract": {
    //                 "enable": false,
    //                 "rotateX": 600,
    //                 "rotateY": 1200
    //             }
    //         }
    //     },
    //     "interactivity": {
    //         "detect_on": "canvas",
    //         "events": {
    //             "onhover": {
    //                 "enable": true,
    //                 "mode": "bubble"
    //             },
    //             "onclick": {
    //                 "enable": true,
    //                 "mode": "push"
    //             },
    //             "resize": true
    //         },
    //         "modes": {
    //             "grab": {
    //                 "distance": 400,
    //                 "line_linked": {
    //                     "opacity": 1
    //                 }
    //             },
    //             "bubble": {
    //                 "distance": 83.91608391608392,
    //                 "size": 1,
    //                 "duration": 3,
    //                 "opacity": 1,
    //                 "speed": 3
    //             },
    //             "repulse": {
    //                 "distance": 200,
    //                 "duration": 0.4
    //             },
    //             "push": {
    //                 "particles_nb": 4
    //             },
    //             "remove": {
    //                 "particles_nb": 2
    //             }
    //         }
    //     },
    //     "retina_detect": true
    // });
});
