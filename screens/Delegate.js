import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import AddNewEmployeeItem from '../components/AddNewEmployeeItem';
import AddNewTaskItem from '../components/AddNewTaskItem';

class Delegate extends Component {
  state = {
    data: [{name: 'Janice Ross', picture: 'Her Picture'},
    {name: 'George Whittaker', picture: 'His Picture'}]
  }

  // Delegate screen is a list of names.
  // When you press a name, it takes you to screens/DelegateEmployeeScreen
  // On that screen, you have a list of existing tasks, with an "add new task" button at the top.
  // That "add new task" button is simply a re-skinned DelegateItem.
  // TO-DO:
  //        Create new DelegateItem, which takes user to new screen
  //        In this new screen, create ListItems/DialogBoxes which display existing tasks (i.e. TaskItems)
  //        Information to be displayed is the three task states
  //        Follow-up: Indicator buttons for task completion status beside the tasks
  
  render() {
    return (
      <View>
        <View>
          <FlatList
            backgroundColor = {"FBF9F9"}
            ListHeaderComponent = {this.renderHeader}
            keyExtractor = {(item, index) => index.toString()}
            data = {this.state.data}
            renderItem = {({item}) => 
              <AddNewTaskItem
                employeeName={item.name} // is the employee's name
                profilePicture={item.picture} // is the profile picture of the employee
              />
            }
          />
        </View>

        <View>
          <AddNewEmployeeItem />
        </View>
      </View>
    );
  }
}

export default Delegate;