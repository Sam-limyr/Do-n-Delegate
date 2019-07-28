import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
import TabBarIcon from '../components/TabBarIcon';

import Welcome from '../screens/Welcome.js';
import Dashboard from '../screens/Dashboard';
import Loading from '../screens/Loading.js';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import DoScreen from '../screens/Do.js';
import DelegateScreen from '../screens/Delegate.js';
import ContactsScreen from '../screens/Contacts.js';
import ContactDetailsScreen from '../screens/ContactDetails.js';
import DoDetailsScreen from '../screens/DoDetails.js';
import DelegateEmployeeScreen from '../screens/DelegateEmployee.js';


const Do = createStackNavigator({
  Do: {
    screen: DoScreen,
    navigationOptions: () => ({
      header: null
    }),
  },
  DoDetails: {
    screen: DoDetailsScreen,
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: true
    })
  },
});

Do.navigationOptions = {
  tabBarLabel: 'Do',
  header:null,
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
  Delegate: {
    screen: DelegateScreen,
    navigationOptions: () => ({
      header: null
    }),
  },
  DelegateEmployee: DelegateEmployeeScreen,
});
  
Delegate.navigationOptions = {
  tabBarLabel: 'Delegate',
  header:null,
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
  Contact: {
    screen: ContactsScreen,
    navigationOptions: () => ({
      header: null
    }),
  },
  ContactDetails: ContactDetailsScreen,
});

Contacts.navigationOptions = {
  tabBarLabel: 'Contacts',
  //header:null,
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
  
const DashboardTabNavigator = createBottomTabNavigator({
  Delegate,
  Do,
  Contacts,
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