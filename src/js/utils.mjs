
/* eslint-disable import/no-unresolved */
import headerTemplate from '../partials/header.html?raw';
import footerTemplate from '../partials/footer.html?raw';
import { checkAuthState, logoutUser } from './auth.mjs';
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

let authEventController = null;

export function loadHeaderFooter() {
    try {
        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;

        checkAuthState((user) => {
            const authLink = document.querySelector('#login-auth');
            if (!authLink) return;

            if (authEventController) authEventController.abort();
            authEventController = new AbortController();
            const { signal } = authEventController;

            if (user) {
                // User is logged in -> Show dynamic logout action
                authLink.innerHTML = `Log out`; 
                authLink.title = `Log out (${user.email})`;
                authLink.href = '#'; 
                
                authLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutUser();
                }, { signal });
            } else {
                // Anonymous guest -> Reset back to regular silhouette icon link 
                authLink.innerHTML = `Log in`;
                authLink.href = '/login/index.html';
                authLink.title = 'Login to your Nook account';
            }
        });

    } catch (error) {
        // Safe bypass
    }
}