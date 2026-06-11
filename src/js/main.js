// /src/js/main.js
import { loadHeaderFooter } from './utils.mjs';
import { initDailyQuote } from './quotes.mjs';

async function initApp() {
  // 1. Mount layouts
    await loadHeaderFooter();
    
    // 2. Fetch and render your live third-party ZenQuotes API feed
    await initDailyQuote('#daily-quote-container');
}

initApp();