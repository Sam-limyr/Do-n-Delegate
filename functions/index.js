/*
https://firebase.google.com/docs/firestore/extend-with-functions
*/
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

//test function is called any time a new user profile is added
exports.testFunction = functions.firestore.document("/users/{userId}").onWrite((snapshot, context) => {
    //get an object representing document
    //e.g. {'name' : 'Marie'}
    const original = snapshot.data().name;
    const newData = {
        name: original.toUpperCase()
    };
    //return a promise when performing async task inside function e.g. writing to database
    return snapshot.ref.parent.child('uppercase').set(newData);
});