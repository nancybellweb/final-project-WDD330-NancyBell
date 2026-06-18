// src/js/journal.js
import { loadHeaderFooter, initNavigationMenu } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Render layout headers
    await loadHeaderFooter();
    initNavigationMenu();

    // 2. Target the exact description paragraph inside your journal prompt card
    const promptElement = document.querySelector('.right-column .content-card .goal-description');
    
    if (promptElement) {
        // Fetch your 8+ attribute JSON file from your JSON directory safely
        fetch('/json/prompts.json')
            .then(res => res.json())
            .then(prompts => {
                const randomIndex = Math.floor(Math.random() * prompts.length);
                // Dynamically inject the question text string
                promptElement.textContent = '"' + prompts[randomIndex].question + '"';
                console.log('JSON Loaded! Active Category:', prompts[randomIndex].category);
            })
            .catch(err => console.log('Error loading prompts JSON:', err));
    }
});