import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

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

export default createBottomTabNavigator({
  DoStack,
  DelegateStack,
  ContactsStack,
});
