import '../../styles/new.less';

const delayClassToggle = (selector, delay) => {
    const elementCollection = document.querySelectorAll(selector);
    setTimeout(() => {
        [].forEach.call(elementCollection, (element) => {
            console.log(element);
            element.classList.add('active');
        });
    }, delay);
};

document.addEventListener('DOMContentLoaded', () => {
    delayClassToggle('#border-animation-svg', 0);
    delayClassToggle('.border-line', 100);
    delayClassToggle('#name-container', 50);
    delayClassToggle('#name', 400);
    delayClassToggle('#directions', 500);
});
