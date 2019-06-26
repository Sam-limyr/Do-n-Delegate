import React, { Component } from 'react';
import Expo, { Google } from 'expo';
import { View, Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { Text } from '../components';

const { width, height } = Dimensions.get('window');
import firebase from 'firebase';

class Welcome extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            } 
          }
        }
        return false;
      }

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,  
                googleUser.accessToken
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(){
                console.log('user signed in');
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: '271095002301-jnqjlt35hkb2n76ohbic3ee671bq8f2v.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    
    static navigationOptions = {
        header: null,
    }
    
    render() {

        const { navigation } = this.props;
            
        return (
            <View style={styles.container}>
                <Image 
                    style={styles.image}
                    source={require('../assets/herologo.png')}
                />
                <Button onPress={() => navigation.navigate('Login')}>
                    <Text center semibold white>Log in</Text>
                </Button>
                <Button shadow onPress={() => navigation.navigate('SignUp')}>
                    <Text center semibold>Signup</Text>
                </Button>
                <Button
                    onPress={() => this.signInWithGoogleAsync()}>
                    <Text center semibold>Sign In With Google</Text>
                </Button>
            </View>
        )   
    }
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FC9700',
        flex: 1,
    },
    image: {
        left: 37,
        top: 67,
        width: 294,
        height: 262, 
    },
    logInButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 484,
        bottom: 87,
    },
  })

  