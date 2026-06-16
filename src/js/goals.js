// src/js/goals.js
import { loadHeaderFooter } from './utils.mjs';
import { renderGoalsList } from './goals.mjs';
import { requireAuth } from './auth.mjs';
import { auth, db } from './firebase.js';/* eslint-disable import/no-unresolved */
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { collection, query, where, onSnapshot, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Trigger the route lock right away!
requireAuth();

// Initialize the shared layout elements
loadHeaderFooter();

let currentUserId = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid; // Capture the real authenticated user's ID
        setupLiveGoalsListener(currentUserId);
    }
});

/**Pulls documents from Firestore live
 */
function setupLiveGoalsListener(userId) {
    const goalsQuery = query(
        collection(db, 'goals'),
        where('userId', '==', userId)
    );

    onSnapshot(goalsQuery, (snapshot) => {
        const goalsArray = [];
        snapshot.forEach((doc) => {
            goalsArray.push({ id: doc.id, ...doc.data() });
        });
        
        // Render the array dynamically into your grid selector
        renderGoalsList(goalsArray, '.goals-grid');
    }, (error) => {
        /* eslint-disable-next-line no-console */
        console.error('Error streaming goals: ', error);
    });
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!currentUserId) {
        alert('Authentication error. Please re-login.');
        return;
    }
    
    const title = document.querySelector('#goal-title').value;
    const category = document.querySelector('#goal-category').value;
    const targetDate = document.querySelector('#goal-date').value;
    const isPrivate = document.querySelector('#privacy-checkbox').checked; 
    
    try {
        // Construct the structural object blueprint
        const newGoal = {
            userId: currentUserId, 
            title: title,
            category: category,
            targetDate: targetDate,
            privacy: isPrivate ? 'private' : 'shared',
            status: 'In Progress', // Default initial status state
            createdAt: new Date().toISOString()
        };

        // Save directly to the collection reference
        await addDoc(collection(db, 'goals'), newGoal);
        
        event.target.reset();
        alert('Goal saved successfully to Nook!');
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error appending document record: ', error);
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