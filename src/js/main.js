
import { loadHeaderFooter } from './utils.mjs';
import { initDailyQuote } from './quotes.mjs';
import { requireAuth } from './auth.mjs';

requireAuth();

async function initApp() {
    loadHeaderFooter();
    
    await initDailyQuote('#daily-quote-container');
}

initApp();