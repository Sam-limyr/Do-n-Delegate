import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';
import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './config';

//initialize cloud firestore through firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
