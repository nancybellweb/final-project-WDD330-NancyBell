
export function initAgendaModal() {
  // 1. Define the HTML template structure for the modal overlay using single quotes
    const modalHtml = ' \
        <div id="agenda-modal-overlay" class="modal-overlay" style="display: none;"> \
        <div class="modal-content"> \
            <div class="modal-header"> \
            <h2>Add Weekly Discussion Topic</h2> \
            <button id="close-modal-btn" class="close-btn" aria-label="Close modal">&times;</button> \
            </div> \
            <form id="agenda-topic-form"> \
            <div class="form-group"> \
                <label for="topic-title">Topic Title:</label> \
                <input type="text" id="topic-title" name="title" required placeholder="e.g., Active Listening, Budgeting Sync"> \
            </div> \
            <div class="form-group"> \
                <label for="topic-week">Target Week:</label> \
                <input type="week" id="topic-week" name="week" required> \
            </div> \
            <div class="form-group"> \
                <label for="topic-notes">Discussion Prompt / Notes:</label> \
                <textarea id="topic-notes" name="notes" rows="4" placeholder="What questions or goals do you want to talk about?"></textarea> \
            </div> \
            <button type="submit" class="submit-modal-btn">Save Topic to Agenda</button> \
            </form> \
        </div> \
        </div>';

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById('agenda-modal-overlay');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('agenda-topic-form');
    const triggerBtn = document.getElementById('open-agenda-modal-btn');

    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
        });
    }

    closeBtn.addEventListener('click', closeModal);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    function closeModal() {
        overlay.style.display = 'none';
        form.reset();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const newTopic = {
        title: formData.get('title'),
        week: formData.get('week'),
        notes: formData.get('notes'),
        createdAt: new Date().toISOString()
        };

        console.log('Captured Topic Data for Trello Framework Task:', newTopic);
        alert('Success! Content framework captured.');
        closeModal();
    });
}