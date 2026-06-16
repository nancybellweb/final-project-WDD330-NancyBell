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