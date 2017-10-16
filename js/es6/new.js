import {initStars} from './services/stars';
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
    }, maxDelayAnimation.delay + 50);
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#container');

    const directions = document.querySelectorAll('.direction');
    const directionPages = document.querySelectorAll('.page');
    let activeDirectionPage = null;
    let activeDirectionName = null;
    const directionPageCloseButtons = document.querySelectorAll('.page .head .close-direction');

    initStars();

    iterateNodeCollection(directions, (direction) => {
        direction.addEventListener('mousedown', () => {
            setTimeout(() => {
                const selectedDirection = direction.getAttribute('data-direction');
                const directionSelector = `#${selectedDirection}-page`;
                const directionPage = document.querySelector(directionSelector);
                activeDirectionName = selectedDirection;
                activeDirectionPage = directionPage;
                directionPage.classList.add('visible');
                delayClassToggle(directionSelector, 500);
                container.classList.remove('active');
            }, 100);
        });
    });

    iterateNodeCollection(directionPageCloseButtons, (directionCloseButton) => {
        directionCloseButton.addEventListener('mousedown', () => {
            activeDirectionPage.classList.remove('active');
            setTimeout(() => {
                activeDirectionPage.classList.remove('visible');
                activeDirectionPage = null;
            }, 450);
            setTimeout(() => {
                activeDirectionName = null;
            }, 800);
            setTimeout(() => {
                container.classList.add('active');
            }, 500);
        });
    });

});
