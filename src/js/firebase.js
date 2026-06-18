
/* eslint-disable import/no-unresolved */

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Importante!! Replace these placeholder strings with  actual Firebase project web app credentials!
const firebaseConfig = {
    apiKey: 'AIzaSyATDGKfmDYOjpX_F0oupYhFsavcX7hxz4Y',
    authDomain: 'nook-app-117aa.firebaseapp.com',
    projectId: 'nook-app-117aa',
    storageBucket: 'nook-app-117aa.firebasestorage.app',
    messagingSenderId: '377008555208',
    appId: '1:377008555208:web:2ddc9d53c4cd47811451fd',
    measurementId: 'G-R5XF04T9N3'
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);