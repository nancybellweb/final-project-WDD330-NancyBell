import ExternalServices from './ExternalServices.mjs';
import { qs } from './utils.mjs';

const services = new ExternalServices();

function quoteTemplate(quoteData) {
    // Safe extraction with default fallbacks if the object is empty
    const text = quoteData?.q || 'A strong relationship requires choosing to love each other even in moments when you struggle to like each other.';
    const author = quoteData?.a || 'Unknown Source';
    
    return `
        <div class='quote-card'>
        <p class='quote-text'>'${text}'</p>
        <p class='quote-author'>— ${author}</p>
        </div>
    `;
}

export async function initDailyQuote(selector) {
    const targetElement = qs(selector);
    if (!targetElement) return;

    try {
        targetElement.innerHTML = '<p>Loading your inspirational quote...</p>';
        
        const rawQuote = await services.getRandomQuote();
        targetElement.innerHTML = quoteTemplate(rawQuote);
    } catch (error) {
        //console.warn('API blocked or down. Activating local layout fallback entry:', error);
        targetElement.innerHTML = quoteTemplate({});
    }
}