import React from 'react';
import { Platform, View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator, DrawerItems } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
import TabBarIcon from '../components/TabBarIcon';

import Welcome from '../screens/Welcome.js';
import Dashboard from '../screens/Dashboard';
import Loading from '../screens/Loading.js';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import DoScreen from '../screens/DoInterface/Do.js';
import DelegateScreen from '../screens/DelegateInterface/Delegate.js';
import ContactsScreen from '../screens/ContactsInterface/Contacts.js';
import ContactDetailsScreen from '../screens/ContactsInterface/ContactDetails.js';
import DoDetailsScreen from '../screens/DoInterface/DoDetails.js';
import DelegateEmployeeScreen from '../screens/DelegateInterface/DelegateEmployee.js';
import DelegateDetailsScreen from '../screens/DelegateInterface/DelegateDetails.js';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import firebase from 'firebase';


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
  DelegateDetails: {
    screen: DelegateDetailsScreen,
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: true
    })
  },
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
  Settings: SettingsScreen,
  Profile: ProfileScreen,
}, {
  drawerWidth: 255,
  drawerBackgroundColor: "#FFFFFF",
  contentOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#000000',
    activeBackgroundColor: '#FC9700',
    inactiveBackgroundColor: '#FBF9F9',
  },
  contentComponent:(props) => (
    <View style={{flex:1}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              buttonStyle={{marginHorizontal: 10}}
              onPress={() => firebase.auth().signOut()}
            />
        </SafeAreaView>
    </View>
),
drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle'
});

const RootNavigator = createSwitchNavigator({
  Loading,
  Welcome,
  Dashboard: AppDrawerNavigator,
})

export default createAppContainer(RootNavigator);