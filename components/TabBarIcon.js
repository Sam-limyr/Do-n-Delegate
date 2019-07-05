import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

<<<<<<< HEAD
export default function TabBarIcon(props) {
=======
function TabBarIcon(props) {
>>>>>>> origin/hemanshu_test_branch
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
<<<<<<< HEAD
=======

export default TabBarIcon;
>>>>>>> origin/hemanshu_test_branch
