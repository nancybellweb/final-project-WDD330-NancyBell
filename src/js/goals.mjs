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

const db = getFirestore();
const goalsCollectionRef = collection(db, 'goals');


//PUBLIC / SHARED GOALS LOGIC

/**
 * Save a shared goal that both partners can see
 */
export async function savePublicGoal(userId, title, category, targetDate) {
    const goalData = {
        userId: userId,
        title: title,
        category: category,
        privacy: 'public', // Hardcoded for safety
        targetDate: targetDate,
        isCompleted: false,
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await addDoc(goalsCollectionRef, goalData);
        return docRef.id;
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error saving public goal:', error);
        throw error;
    }
}

/**
 * Fetch all shared goals for the relationship
 */
export async function getPublicGoals(userId) {
    try {
        const q = query(
            goalsCollectionRef,
            where('privacy', '==', 'public'),
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
        console.error('Error fetching public goals:', error);
        return [];
    }
}

// PRIVATE / PERSONAL GOALS LOGIC
/**
 * Save a personal goal exclusive to the logged-in user
 */
export async function savePrivateGoal(userId, title, category, targetDate) {
    const goalData = {
        userId: userId,
        title: title,
        category: category,
        privacy: 'private', // Hardcoded for safety
        targetDate: targetDate,
        isCompleted: false,
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await addDoc(goalsCollectionRef, goalData);
        return docRef.id;
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Error saving private goal:', error);
        throw error;
    }
}

/**
 * Fetch personal goals only belonging to the current user
 */
export async function getPrivateGoals(userId) {
    try {
        const q = query(
            goalsCollectionRef,
            where('userId', '==', userId),
            where('privacy', '==', 'private'),
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
        console.error('Error fetching private goals:', error);
        return [];
    }
}