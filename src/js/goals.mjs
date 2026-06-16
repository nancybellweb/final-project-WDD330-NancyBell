// writing to Firestore database, so we can have real user accounts and persistent data storage for goals and progress tracking.

import { db } from './firebase.js';

import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    orderBy,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const goalsCollectionRef = collection(db, 'goals');

// (MODULAR SYNTAX)
export async function updateGoalCompletionStatus(goalId, isCompleted) {
    try {
        const goalDocRef = doc(db, 'goals', goalId);
        await updateDoc(goalDocRef, { isCompleted: isCompleted });
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error updating goal completion status:', error);
        throw error;
    }
}

export async function deleteGoal(goalId) {
    try {
        const goalDocRef = doc(db, 'goals', goalId);
        await deleteDoc(goalDocRef);
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error deleting goal:', error);
        throw error;
    }
}

export async function editGoal(goalId, updatedData) {
    try {
        const goalDocRef = doc(db, 'goals', goalId);
        await updateDoc(goalDocRef, updatedData);
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error editing goal:', error);
        throw error;
    }
}

export async function getGoalById(goalId) {
    try {
        const goalDocRef = doc(db, 'goals', goalId);  
        const goalDoc = await getDoc(goalDocRef);  
        if (goalDoc.exists()) { 
            return { id: goalDoc.id, ...goalDoc.data() };    
        } else {
            return null;                        
        }
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error fetching goal by ID:', error);
        throw error;
    }
}

// Query Functions

export async function getAllGoalsForUser(userId) { ... }
export async function getAllGoals() { ... }
export async function getGoalsByCategory(userId, category) { ... }
export async function getGoalsByCompletionStatus(userId, isCompleted) { ... }
export async function getGoalsByTargetDate(userId, targetDate) { ... }
export async function getGoalsByPrivacy(userId, privacy) { ... }

/** Render a single goal element
 */
function goalCardTemplate(goal) {
    
    const currentStatus = goal.status || 'In Progress';
    const statusClass = currentStatus.toLowerCase().replace(' ', '-');
    
    return `
        <div class="content-card goal-card state-${statusClass}" data-id="${goal.id}">
            <div class="goal-card-header">
                <h3>${goal.title}</h3>
                <span class="goal-type-badge">${goal.privacy === 'private' ? '🔒 Private' : '👥 Shared'}</span>
            </div>
            
            <p class="goal-description">${goal.description || 'No description provided.'}</p>
            
            <div class="goal-card-actions">
                <label for="status-select-${goal.id}">Status:</label>
                <select id="status-select-${goal.id}" class="status-dropdown" data-id="${goal.id}">
                    <option value="In Progress" ${currentStatus === 'In Progress' ? 'selected' : ''}>⏳ In Progress</option>
                    <option value="Done" ${currentStatus === 'Done' ? 'selected' : ''}>✅ Done</option>
                    <option value="Failed" ${currentStatus === 'Failed' ? 'selected' : ''}>❌ Failed</option>
                </select>
            </div>
        </div>
    `;
}

/**Main Render Loop
 */
export function renderGoalsList(goalsArray, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (!goalsArray || goalsArray.length === 0) {
        container.innerHTML = `<p class="empty-state-text">No goals recorded yet. Click the accent button above to create one!</p>`;
        return;
    }

    container.innerHTML = goalsArray.map(goal => goalCardTemplate(goal)).join('');

    // Attach Firestore event listeners
    const dropdowns = container.querySelectorAll('.status-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', handleStatusChange);
    });
}

/*Main render loop - firebase sync
 */
async function handleStatusChange(event) {
    const selectElement = event.target;
    const goalId = selectElement.getAttribute('data-id');
    const newStatus = selectElement.value;

    try {
        // Reuse your existing editGoal function!
        await editGoal(goalId, {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });
        
        console.log(`Goal ${goalId} successfully updated to status: ${newStatus}`);
        
        // apply visual styling states to the goal card
        const cardContainer = selectElement.closest('.goal-card');
        if (cardContainer) {
            // Wipe clean prior status classes
            cardContainer.classList.remove('state-in-progress', 'state-done', 'state-failed');
            // Inject new modifier layout flag token
            const freshClass = newStatus.toLowerCase().replace(' ', '-');
            cardContainer.classList.add(`state-${freshClass}`);
        }
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error("Error modifying goal status document record:", error);
        alert("Could not update goal status. Please check your connection.");
    }
}