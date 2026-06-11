// /src/js/quotes.mjs
import ExternalServices from './ExternalServices.mjs';
import { qs } from './utils.mjs';

    const services = new ExternalServices();

    function quoteTemplate(quoteData) {
    // Graceful fallback if data structure changes
    const text = quoteData.q || 'A strong relationship requires choosing to love each other even in moments when you struggle to like each other.';
    const author = quoteData.a || 'Unknown';
    
    return `
        <div class="quote-card">
        <p class="quote-text">"${text}"</p>
        <p class="quote-author">— ${author}</p>
        </div>
    `;
    }

    export async function initDailyQuote(selector) {
    const targetElement = qs(selector);
    if (!targetElement) return;

    try {
        // Show a gentle loading message or state
        targetElement.innerHTML = '<p>Loading your quote of the week...</p>';
        
        const rawQuote = await services.getRandomQuote();
        targetElement.innerHTML = quoteTemplate(rawQuote);
    } catch (error) {
        console.error('Could not load fresh daily quote:', error);
        // Render local fallback template so the layout doesn't break for the user
        targetElement.innerHTML = quoteTemplate({});
    }
}