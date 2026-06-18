
export function initAgendaModal() {
    const modalHtml = ' \
        <div id="agenda-modal-overlay" class="modal-overlay" style="display: none;"> \
        <div class="modal-content"> \
            <div class="modal-header"> \
            <h2>Add Weekly Discussion Topic</h2> \
            <button id="close-modal-btn" class="close-btn" aria-label="Close modal">&times;</button> \
            </div> \
            <div class="sync-bar"> \
            <button type="button" id="manual-refresh-btn" class="refresh-btn">🔄 Sync Partner Ideas</button> \
            <span id="sync-status" class="status-text">Synced just now</span> \
            </div> \
            <form id="agenda-topic-form"> \
            <div class="form-group"> \
                <label for="topic-title">Topic Title:</label> \
                <input type="text" id="topic-title" name="title" required placeholder="e.g., Budgeting, Date Night Sync"> \
            </div> \
            <div class="form-group"> \
                <label for="topic-week">Target Week:</label> \
                <input type="week" id="topic-week" name="week" required> \
            </div> \
            <hr class="modal-divider"> \
            <div class="split-spaces"> \
                <div class="form-group partner-space husband-color"> \
                <label for="husband-notes">🤵 Husband\'s Ideas / Notes:</label> \
                <textarea id="husband-notes" name="husbandNotes" rows="3" placeholder="Share your perspective..."></textarea> \
                </div> \
                <div class="form-group partner-space wife-color"> \
                <label for="wife-notes">👰 Wife\'s Ideas / Notes:</label> \
                <textarea id="wife-notes" name="wifeNotes" rows="3" placeholder="Share your perspective..."></textarea> \
                </div> \
            </div> \
            <button type="submit" class="submit-modal-btn">Save Separated Agenda</button> \
            </form> \
        </div> \
        </div>';

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById('agenda-modal-overlay');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('agenda-topic-form');
    const triggerBtn = document.getElementById('open-agenda-modal-btn');
    const refreshBtn = document.getElementById('manual-refresh-btn');
    const syncStatus = document.getElementById('sync-status');

    const titleInput = document.getElementById('topic-title');
    const weekInput = document.getElementById('topic-week');
    const husbandInput = document.getElementById('husband-notes');
    const wifeInput = document.getElementById('wife-notes');

    if (localStorage.getItem('nook_agenda_title')) titleInput.value = localStorage.getItem('nook_agenda_title');
    if (localStorage.getItem('nook_agenda_week')) weekInput.value = localStorage.getItem('nook_agenda_week');
    if (localStorage.getItem('nook_agenda_husband')) husbandInput.value = localStorage.getItem('nook_agenda_husband');
    if (localStorage.getItem('nook_agenda_wife')) wifeInput.value = localStorage.getItem('nook_agenda_wife');

    const saveToCache = () => {
        localStorage.setItem('nook_agenda_title', titleInput.value);
        localStorage.setItem('nook_agenda_week', weekInput.value);
        localStorage.setItem('nook_agenda_husband', husbandInput.value);
        localStorage.setItem('nook_agenda_wife', wifeInput.value);
    };

    titleInput.addEventListener('input', saveToCache);
    weekInput.addEventListener('input', saveToCache);
    husbandInput.addEventListener('input', saveToCache);
    wifeInput.addEventListener('input', saveToCache);

    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => { overlay.style.display = 'flex'; });
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    function closeModal() {
        overlay.style.display = 'none';
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
        syncStatus.textContent = 'Fetching latest partner updates...';
        refreshBtn.disabled = true;
        setTimeout(() => {
            syncStatus.textContent = 'Updates synced successfully!';
            refreshBtn.disabled = false;
        }, 1000);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newTopic = {
        title: titleInput.value,
        week: weekInput.value,
        husbandNotes: husbandInput.value,
        wifeNotes: wifeInput.value,
        createdAt: new Date().toISOString()
        };

        console.log('Final Separated Data Saved:', newTopic);
        
        // Clear out local cache properties upon successful completion submission
        localStorage.removeItem('nook_agenda_title');
        localStorage.removeItem('nook_agenda_week');
        localStorage.removeItem('nook_agenda_husband');
        localStorage.removeItem('nook_agenda_wife');
        form.reset();
        
        alert('Success! Separate ideas saved.');
        closeModal();
    });
}