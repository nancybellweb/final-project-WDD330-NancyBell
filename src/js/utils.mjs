
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

export function loadHeaderFooter() {
    try {
        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;

        //dynamic hamburger menu toggle
        const menuBtn = document.querySelector('.hamburger-menu-btn');
                const mobileNav = document.querySelector('.nav-mobile');

                if (menuBtn && mobileNav) {
                    menuBtn.addEventListener('click', () => {
                        mobileNav.classList.toggle('hidden');
                        
                        // Animate the button icon between ☰ and ✕
                        if (mobileNav.classList.contains('hidden')) {
                            menuBtn.textContent = '☰';
                            menuBtn.setAttribute('aria-expanded', 'false');
                        } else {
                            menuBtn.textContent = '✕';
                            menuBtn.setAttribute('aria-expanded', 'true');
                        }
                    });
                }


        // Check if user is logged in
    checkAuthState((user) => {
        const authLink = document.querySelector('#login-auth');
        if (!authLink) return;

        // Clone and replace the element to completely wipe out old event listeners from prior sessions
        const cleanAuthLink = authLink.cloneNode(true);
        authLink.parentNode.replaceChild(cleanAuthLink, authLink);

        if (user) {
            // User is logged in -> Show dynamic logout action
            cleanAuthLink.innerHTML = `🚪`; 
            cleanAuthLink.title = `Logout (${user.email})`;
            cleanAuthLink.href = '#'; // Don't redirect to login page when clicking logout!
            cleanAuthLink.addEventListener('click', (e) => {
                e.preventDefault();
                logoutUser();
            });
        } else {
            // Anonymous guest -> Reset back to regular silhouette icon link
            cleanAuthLink.innerHTML = `Log in`;
            cleanAuthLink.href = '/login/index.html';
            cleanAuthLink.title = 'Login to your Nook account';
        }
    });
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error loading header or footer:', error.message);
    }
    }   
