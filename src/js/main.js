
import { loadHeaderFooter } from './utils.mjs';
import { initDailyQuote } from './quotes.mjs';
import { requireAuth } from './auth.mjs';
import { initAgendaModal } from './agenda.mjs';

requireAuth();

async function initApp() {
    loadHeaderFooter();
    await initAgendaModal();
    
    await initDailyQuote('#daily-quote-container');
}

initApp();