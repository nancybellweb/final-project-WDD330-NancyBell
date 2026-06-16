import { loadHeaderFooter } from './utils.mjs';
import { savePublicGoal, savePrivateGoal } from './goals.mjs';

// Initialize 
loadHeaderFooter();

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const title = document.querySelector('#goal-title').value;
    const category = document.querySelector('#goal-category').value;
    const targetDate = document.querySelector('#goal-date').value;
    const isPrivate = document.querySelector('#privacy-checkbox').checked; 
    
    const userId = 'test-user-123'; 

    try {
        if (isPrivate) {
            await savePrivateGoal(userId, title, category, targetDate);
        } else {
            await savePublicGoal(userId, title, category, targetDate);
        }
        
        event.target.reset();
        
        alert('Goal saved successfully to Firestore!');
    } catch (error) {
        alert('Failed to save goal. Check console.');
    }
}

// Attach the event listener once the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const goalForm = document.querySelector('#goal-form');
    if (goalForm) {
        goalForm.addEventListener('submit', handleFormSubmit);
    }
});