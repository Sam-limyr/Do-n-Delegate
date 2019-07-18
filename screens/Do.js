import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import DoItem from '../components/DoItem.js';

class Do extends Component {
  state = {
    data: [{name: 'John Smith', picture: 'His Picture', taskName: 'Submit IVS Report',
    taskDescription: 'Finish up the last 3 pages of the report and put it on my desk.',
    taskDeadline: '8 am on Tuesday'},
    {name: 'Margaret Chan', picture: 'Her Picture', taskName: 'Clean the storeroom cabinets',
    taskDescription: 'Dust and wipe the 5 steel cabinets in the corner of the storeroom.',
    taskDeadline: '3 pm today'}]
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
            <DoItem
              employerName={item.name} // is the employer's name
              profilePicture={item.picture} // is the profile picture of the employer
              taskName={item.taskName} // is the task name provided by employer
              taskDescription={item.taskDescription} // is the additional information provided by employer
              taskDeadline={item.taskDeadline} // is a number pulled via a Date() object
            />
          }
        />
      </View>
    );
  }
}

export default Do;