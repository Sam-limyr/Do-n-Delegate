import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, SearchBarIOS, SearchBar } from 'react-native-elements'; 
import {getDate,getTime} from '../functions/HelperFunctions';
import DoItem from '../components/DoItem.js';
import firebase from 'firebase';
import '@firebase/firestore'; 

/*
Do tab represents the tasks delegated to the user, which could be in-progress, new (pending user acknowledgement), or tasks already done. 
*/

class Do extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = firebase.auth().currentUser.uid;
  }

  state = {
    data: [],
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
          console.log(doc);
          tasksArray.push(doc);
        });
      });
    var elapsed = new Date().getTime() - start;
    console.log("Call to get tasks took " + elapsed + " milliseconds");
    this.setState({data: tasksArray});
  }

  _renderHeader = () => {
    return (
    <SearchBar 
      containerStyle = { {borderTopWidth:0, backgroundColor: '#FC9700'}}
      inputContainerStyle = { {backgroundColor: "#F2F2f2"}}
      placeholder="Search"
      lightTheme={true}
      round
    />);
  }

  _renderItem(item) {
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
      rightSubtitle={getTime(item.due_date)}
      onPress={() => this.props.navigation.navigate("ContactDetails", {item})}
      //could be like employer / employee state
      //subtitle = {item.email}
    />);
  }

  render() {
    return (
      <View>
        <FlatList
          backgroundColor = {"FBF9F9"}
          ListHeaderComponent = {this._renderHeader}
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