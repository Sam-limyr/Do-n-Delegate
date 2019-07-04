import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

class Loading extends Component {

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            const { navigation } = this.props;

            if(user) {
                navigation.navigate('Dashboard');
            } else {
                /*haven't log in yet; go to the welcome screen. user will then click login with google button*/
                navigation.navigate('Welcome');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }
}

export default Loading;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: '#FC9700',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });