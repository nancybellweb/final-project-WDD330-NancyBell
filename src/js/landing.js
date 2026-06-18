// src/js/landing.js
import { loadHeaderFooter, initNavigationMenu } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    await loadHeaderFooter();
    
    initNavigationMenu();
});