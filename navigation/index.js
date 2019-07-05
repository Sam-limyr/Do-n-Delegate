import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
<<<<<<< HEAD
import { Platform } from 'react-native';
=======
import TabBarIcon from '../components/TabBarIcon';
>>>>>>> origin/hemanshu_test_branch

import Welcome from '../screens/Welcome';
import Dashboard from '../screens/Dashboard';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
<<<<<<< HEAD

/*
import Do from '../screens/Do';
import Delegate from '../screens/Delegate';
import Contacts from '../screens/Contacts';
=======
import DoScreen from '../screens/Do';
import DelegateScreen from '../screens/Delegate';
import ContactsScreen from '../screens/Contacts';
>>>>>>> origin/hemanshu_test_branch


const Do = createStackNavigator({
    Do: DoScreen,
  });
  
  Do.navigationOptions = {
    tabBarLabel: 'Do',
    tabBarOptions: {
      activeTintColor: '#FC9700',
      inactiveTintColor: '#A9A9A9',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `md-checkmark-circle${focused ? '' : '-outline'}`
            : 'md-checkmark-circle'
        }
      />
    ),
  };
  
  const Delegate = createStackNavigator({
    Delegate: DelegateScreen,
  });
  
  Delegate.navigationOptions = {
    tabBarLabel: 'Delegate',
    tabBarOptions: {
      activeTintColor: '#FC9700',
      inactiveTintColor: '#A9A9A9',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'md-megaphone' : 'md-megaphone'}
        //consider md-people as an alternative
      />
    ),
  };
  
  const Contacts = createStackNavigator({
    Settings: ContactsScreen,
  });
  
  Contacts.navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarOptions: {
      activeTintColor: '#FC9700',
      inactiveTintColor: '#A9A9A9',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
      />
    ),
  };

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
    Loading,
    Welcome,
    Dashboard: AppDrawerNavigator,
})
export default createAppContainer(RootNavigator);