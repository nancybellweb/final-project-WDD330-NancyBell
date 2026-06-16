
/* eslint-disable import/no-unresolved */
import headerTemplate from '../partials/header.html?raw';
import footerTemplate from '../partials/footer.html?raw';
/* eslint-disable import/no-unresolved */
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadHeaderFooter() {
    try {
        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
    } catch (error) {
        //silent failure
    }
}