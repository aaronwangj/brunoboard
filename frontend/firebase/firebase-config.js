import firebase from 'firebase'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCDZTHgJ2iI9hwO-eOBL6bBBlKZBYHbIPQ",
    authDomain: "brunoboard.firebaseapp.com",
    projectId: "brunoboard",
    storageBucket: "brunoboard.appspot.com",
    messagingSenderId: "328396129529",
    appId: "1:328396129529:web:15907a7d1a9ab4feda0e28",
    measurementId: "G-8FJYBWXE53"
  };

  // initialize firebase project
  try {
    if (typeof window !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics()
        console.log("Firebase initialization success!")
    }
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const fb = firebase;
export default fb;