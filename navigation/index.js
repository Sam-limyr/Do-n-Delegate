import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

import Welcome from '../screens/Welcome';
import Dashboard from '../screens/Dashboard';
import LoadingScreen from '../screens/LoadingScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';

/*
import Do from '../screens/Do';
import Delegate from '../screens/Delegate';
import Contacts from '../screens/Contacts';

/*
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
*/

//******************************* */

import TabBarIcon from '../components/TabBarIcon';
import DoScreen from '../screens/DoScreen';
import DelegateScreen from '../screens/DelegateScreen';
import ContactsScreen from '../screens/ContactsScreen';

const DoStack = createStackNavigator({
  Do: DoScreen,
});

DoStack.navigationOptions = {
  tabBarLabel: 'Do',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const DelegateStack = createStackNavigator({
  Delegate: DelegateScreen,
});

DelegateStack.navigationOptions = {
  tabBarLabel: 'Delegate',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ContactsStack = createStackNavigator({
  Settings: ContactsScreen,
});

ContactsStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

/*export default createBottomTabNavigator({
  DoStack,
  DelegateStack,
  ContactsStack,
});*/


//********************* */

const DashboardTabNavigator = createBottomTabNavigator({
    DoStack,
    DelegateStack,
    ContactsStack,
},{
    //the navigationOptions on our tab components configure the label in the stack navigator (parent navigator) when used as a component, this is needed for our header title to change.
    navigationOptions:({navigation})=>{
        //Dynamically set Header text by checking route name of the current screen embedded in the navigation object (passed to navigation options)
        const {routeName} = navigation.state.routes[navigation.state.index];
        return {
            headerTitle: routeName.toUpperCase(),
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FC9700',
                borderBottomColor: "transparent",
            }
        };
    }
});

const DashboardStackNavigator = createStackNavigator({
    DashboardTabNavigator: DashboardTabNavigator,
}, {
    defaultNavigationOptions:({navigation})=>{
        return {
            headerLeft: (
                <Icon style={{ paddingLeft: 10}}
                  onPress={()=> navigation.openDrawer()}
                  color='white'
                  name="md-menu" size={30} />
            )
        };
    }
});

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: DashboardStackNavigator,
}, {
    drawerWidth: 255,
    contentOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#FBF9F9',
        activeBackgroundColor: '#FC9700',
        inactiveBackgroundColor: '#ffffff',
    }
});

const RootNavigator = createSwitchNavigator({
    LoadingScreen,
    Welcome,
    Dashboard: AppDrawerNavigator,
})
export default createAppContainer(RootNavigator);