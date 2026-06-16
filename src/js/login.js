//LOGIN / REGISTER index page

import { loadHeaderFooter } from './utils.mjs';
import { loginUser, registerUser } from './auth.mjs';

loadHeaderFooter();

let isLoginView = true;

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.querySelector('#auth-form');
    const authTitle = document.querySelector('#auth-title');
    const submitBtn = document.querySelector('#auth-submit-btn');
    const toggleLink = document.querySelector('#toggle-auth-view');

    if (!authForm) return;

    // Toggle between Sign In and Registration modes
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginView = !isLoginView;
        
        if (isLoginView) {
            authTitle.textContent = 'Login to Nook';
            submitBtn.textContent = 'Sign In';
            toggleLink.textContent = 'Register here';
        } else {
            authTitle.textContent = 'Create Your Nook Account';
            submitBtn.textContent = 'Register Account';
            toggleLink.textContent = 'Login here';
        }
    });

    // Handle authentication form submissions
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.querySelector('#auth-email').value;
        const password = document.querySelector('#auth-password').value;

        try {
            if (isLoginView) {
                await loginUser(email, password);
                alert('Welcome back to Nook!');
            } else {
                await registerUser(email, password);
                alert('Account generated successfully!');
            }
            // Send logged-in users straight to their dashboard screen
            window.location.href = '/index.html';
        } catch (error) {
            alert(`Authentication Error: ${error.message}`);
        }
    });
});