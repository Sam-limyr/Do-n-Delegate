import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from '../screens/Welcome';
import LoadingScreen from '../screens/LoadingScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import Do from '../screens/Do';
import Delegate from '../screens/Delegate';
import Contacts from '../screens/Contacts';

const screens = createStackNavigator({
    LoadingScreen,
    Welcome,
    Login,
    SignUp,
    Forgot,
    Do,
    Delegate,
    Contacts,
}, {
  defaultNavigationOptions: {
    //headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerStyle: {
        backgroundColor: '#FC9700',
        borderBottomColor: "transparent",
    },
    headerBackTitle: "Do & Delegate",
  }
});

export default createAppContainer(screens);