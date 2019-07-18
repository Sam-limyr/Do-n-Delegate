import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';  
import DoItem from '../components/DoItem.js';

class Do extends Component {
  state = {
    data: [{name: 'John', picture: 'Picture', taskName: 'Task Name',
    taskDescription: 'Task Description', taskDeadline: 'Task Deadline'},
    {name: '1John', picture: '1Picture', taskName: '1Task Name',
    taskDescription: '1Task Description', taskDeadline: '1Task Deadline'}]
  }

  setProps = (inputEmployerName, inputPicture, inputTaskName, inputTime, inputDescription) => {
    this.setState({ employerName: inputEmployerName.toString() });
    this.setState({ profilePicture: inputPicture.toString() });
    this.setState({ taskName: inputTaskName.toString() });
    this.setState({ taskDeadline: inputTime.parseInt() });
    this.setState({ taskDescription: inputDescription.toString() });
  }

  render() {
    return (
      <View>
        <FlatList
          backgroundColor = {"FBF9F9"}
          ListHeaderComponent = {this.renderHeader}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.data}
          renderItem = {({item}) => 
            <DoItem  // Suspicion as to why this might not be working: 
                     // this assignment might be called before state is assigned in DoItem
                     // therefore state's assignments are overwriting these assignments.
                     // Possible fix: Use constructor in DoItem
                     // Alternative: setState of state from here
              employerName={item.name}
              profilePicture={item.picture}
              taskName={item.taskName}
              taskDescription={item.taskDescription}
              taskDeadline={item.taskDeadline}
            />
          }
        />
      </View>
    );
  }
}

export default Do;