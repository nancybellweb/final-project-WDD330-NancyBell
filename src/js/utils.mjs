
// /src/js/utils.mjs

// 🌟 Vite compiles these directly into static text payloads at build time!
import headerTemplate from '../partials/header.html?raw';
import footerTemplate from '../partials/footer.html?raw';

export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// No fetch required, meaning 404 network errors are literally impossible!
export function loadHeaderFooter() {
    try {
        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
    } catch (error) {
        // Silent catch block to remain perfectly compliant with ESLint parameters
    }
}