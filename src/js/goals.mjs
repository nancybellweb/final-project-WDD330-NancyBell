// writing to Firestore database, so we can have real user accounts and persistent data storage for goals and progress tracking.

import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    orderBy 
    /* eslint-disable import/no-unresolved */
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { qs } from './utils.mjs';

const db = getFirestore();
const goalsCollectionRef = collection(db, 'goals');

/**
 * Save a new structured goal to Firestore
 * @param {string} userId - The current user's ID
 * @param {string} title - What the goal is
 * @param {string} category - e.g., "Financial", "Relationship", "Health"
 * @param {string} privacy - "public" or "private"
 * @param {string} targetDate - Completion target date
 */
export async function saveGoal(userId, title, category, privacy, targetDate) {
    const goalData = {
        userId: userId,
        title: title,
        category: category,
        privacy: privacy, // "public" or "private"
        targetDate: targetDate,
        isCompleted: false,
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await addDoc(goalsCollectionRef, goalData);
        return docRef.id; // Returns the generated Firestore Document ID
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error adding goal to Firestore: ', error);
        throw error;
    }
}

/**
 * @param {string} userId - The current logged-in user
 * @param {string} privacyType - "public" or "private"
 */
export async function getGoalsByPrivacy(userId, privacyType) {
    try {
        const q = query(
            goalsCollectionRef,
            where('userId', '==', userId),
            where('privacy', '==', privacyType),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const goals = [];
        
        querySnapshot.forEach((doc) => {
            goals.push({ id: doc.id, ...doc.data() });
        });

        return goals;
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error(`Error fetching ${privacyType} goals: `, error);
        return [];
    }
}