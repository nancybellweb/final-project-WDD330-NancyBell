import { auth } from './firebase.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
    /* eslint-disable import/no-unresolved */

} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

/**
 * Register a new user with email and password
 */
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Registration failed:', error.message);
        throw error;
    }
}

/**
 * Log an existing user into the session
 */
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Login failed:', error.message);
        throw error;
    }
}

/**
 * Sign the current user out of the app session
 */
export async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = '/login/index.html';
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Logout failed:', error.message);
    }
}

/**
 * Track user state changes across page updates
 */
export function checkAuthState(callback) {
    onAuthStateChanged(auth, callback);
}

export function requireAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = '/login/index.html';
        }
    });
}   

export default { registerUser, loginUser, logoutUser, checkAuthState, requireAuth };
