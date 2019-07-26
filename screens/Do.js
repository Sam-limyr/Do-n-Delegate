import React, { Component } from 'react';
import { FlatList, View, Dimensions, TouchableOpacity } from 'react-native';
import { ListItem, SearchBarIOS, SearchBar, ButtonGroup } from 'react-native-elements'; 
import {getDate,getTime} from '../functions/HelperFunctions';
import DoItem from '../components/DoItem.js';
import firebase from 'firebase';
import '@firebase/firestore'; 

/*
Do tab represents the tasks delegated to the user, which could be in-progress, new (pending user acknowledgement), or tasks already done. 
*/

var {height, width} = Dimensions.get('window');

class Do extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedIndex: 0
    }
    this.currentUserID = firebase.auth().currentUser.uid;
  }

  componentDidMount() {
    this.makeRemoteTaskRequest();
  }

  makeRemoteTaskRequest = async () => {
    //retrieve all tasks delegated to this user
    var start = new Date().getTime();
    const tasksArray = [];
    await firebase
      .firestore()
      .collection("tasks")
      .where("employee_id" ,"==", `${this.currentUserID}`)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          doc = doc.data();
          doc.due_date = doc.due_date.toDate();
          //convert firebase Timestamp to javascript Date object
          tasksArray.push(doc);
        });
      });
    var elapsed = new Date().getTime() - start;
    console.log("Call to get tasks took " + elapsed + " milliseconds");
    this.setState({data: tasksArray});
  }

  /*
  Helper method called to set the currently selected button from the buttonGroup
  */
  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex })
  }

  _renderButtonGroup = () => {
    const buttons = ['Current', 'New', 'Done'];
    const { selectedIndex } = this.state
    
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: height*0.05}}
        selectedButtonStyle={{backgroundColor: "#FC9700"}}
      />
    )
  }

  _renderItem(item) {
    const buttons = ['Current', 'New', 'Done'];
    const {selectedIndex} = this.state
    return (
    <ListItem 
      roundAvatar
      containerStyle={ {backgroundColor: "#FBF9F9"}}
      bottomDivider={true}
      chevron={true}
      //leftAvatar= {{source: {uri: item.profile_picture} }}
      title={`${item.name}`}
      subtitle={`By: ${item.employer_name}`}
      rightTitle={getDate(item.due_date)}
      rightTitleStyle={{ color: 'red' }}
      rightSubtitle={getTime(item.due_date)}
      rightSubtitleStyle={{ color: 'red'}}
      onPress={() => this.props.navigation.navigate("ContactDetails", {item})}
      //could be like employer / employee state
      //subtitle = {item.email}
    />);
  }

  render() {
    const buttons = ['Current', 'New', 'Done'];
    const { selectedIndex } = this.state
    return (
      <View>
        <ButtonGroup
          onPress={this.updateIndex}
          buttons={buttons}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: height*0.05}}
          selectedButtonStyle={{backgroundColor: "#FC9700"}}
        />
        <FlatList
          backgroundColor = {"FBF9F9"}
          //ListHeaderComponent = {this._renderButtonGroup}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.data}
          renderItem = {({item}) => this._renderItem(item)}
          /*
          renderItem = {({item}) => 
            <DoItem
              employerName={item.name} // is the employer's name
              profilePicture={item.picture} // is the profile picture of the employer
              taskName={item.taskName} // is the task name provided by employer
              taskDescription={item.taskDescription} // is the additional information provided by employer
              taskDeadline={item.taskDeadline} // is a number pulled via a Date() object
            />
          }*/
        />
      </View>
    );
  }
}

export default Do;