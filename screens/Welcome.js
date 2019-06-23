import React, { Component } from 'react'
import { View, Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { Text } from '../components';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
    
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
                <Button>
                    <Text center black>Sign in with Google</Text>
                </Button>
                <Button onPress={() => navigation.navigate('Login')}>
                    <Text center semibold white>Log in</Text>
                </Button>
                <Button shadow onPress={() => navigation.navigate('SignUp')}>
                    <Text center semibold>Signup</Text>
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

  