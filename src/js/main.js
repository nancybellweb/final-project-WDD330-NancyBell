
import { loadHeaderFooter } from './utils.mjs';
import { initDailyQuote } from './quotes.mjs';

async function initApp() {
    loadHeaderFooter();
    
    await initDailyQuote('#daily-quote-container');
}

initApp();