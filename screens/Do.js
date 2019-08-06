import React, { Component } from 'react';
import { FlatList, View, Dimensions, Text } from 'react-native';
import { ListItem, ButtonGroup, Button, CheckBox } from 'react-native-elements'; 
import {getDate, getTime, dateObjectEquality } from '../functions/HelperFunctions';
import CheckedTaskItem from '../components/CheckedTaskItem';
import TaskItem from '../components/TaskItem';
import firebase from 'firebase';
import '@firebase/firestore'; 

/*
Do tab represents the tasks delegated to the user, which could be in-progress, unread (new tasks pending user acknowledgement), or tasks already done. 
*/

var {height, width} = Dimensions.get('window');

class Do extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedIndex: 0,
    }
    console.log(firebase.auth().currentUser);
    this.currentUserID = firebase.auth().currentUser.uid;
    //Bind the this context in order to pass callback function as props to child
    this.acknowledgeTask = this.acknowledgeTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
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
          doc.issued_date = doc.issued_date.toDate();
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

  /*
  Acknowledges the chosen task. This is achieved by finding this task in the main data array, and updating it's status from "unread" to "in-progress". Subsequently, this task will be removed from the New tab and will appear in the Current tab. 
  */
  acknowledgeTask(item) {
    for (var task in this.state.data) {
      task = this.state.data[task];
      const compare_issued_date = dateObjectEquality(task.issued_date, item.issued_date);
      const compare_due_date = dateObjectEquality(task.due_date, item.due_date);
      const compare_name = task.name.toString() === item.name.toString();
      const compare_description = task.description.toString() === item.description.toString();
      if (compare_description && compare_due_date && compare_issued_date && compare_name) {
        task.status = "in-progress";
        //also, need to update task status in database 
        //ensure periodic sync with database. 
        this.setState({state: this.state})
      }
      break;
    }
  }

  /*
  Completes the chosen task. This is done in a similar way to acknowledge task, where the state of the task is updated from "in-progress" to "done". consequently, the task will disappear from current, and will appear in done
  */
  completeTask(item) {
    for (var task in this.state.data) {
      task = this.state.data[task];
      const compare_issued_date = dateObjectEquality(task.issued_date, item.issued_date);
      const compare_due_date = dateObjectEquality(task.due_date, item.due_date);
      const compare_name = task.name.toString() === item.name.toString();
      const compare_description = task.description.toString() === item.description.toString();
      if (compare_description && compare_due_date && compare_issued_date && compare_name) {
        task.status = "done";
        //also, need to update task status in database 
        //ensure periodic sync with database. 
        this.setState({state: this.state})
      }
      break;
    }
  }
  /*
  Tasks that are new are rendered differently (ie have a check box for acknowledgement) from Current and Done tasks. This function dispatches the 
  correct rendering methods
  */
  _renderItemByStatus(selectedIndex, item) {
    if (selectedIndex == 1) {
      return this.__renderNewItem(item);
    } else {
      return this.__renderNormalTaskItem(item);
    }
  }

  __renderNewItem(item) {
    return (
      <CheckedTaskItem
        acknowledgeTask={this.acknowledgeTask}
        completeTask={this.completeTask}
        navigation={this.props.navigation}
        item={item}
        navLink='DoDetails'
      />
    )
  }

  __renderNormalTaskItem(item) {
    return (
      <TaskItem
        completeTask={this.completeTask}
        navigation={this.props.navigation}
        item={item}
        navLink='DoDetails'
      />
    )
  }

  /*
  Helper method to retrieve data based on selectedIndex of Button Group. 
  For example, if current tab is selected, only tasks that are "in-progress" should be displaying by render methods.
  Input: selectedIndex value
  Output: a list of tasks to be rendered.
  */ 
  _filterTasksByStatus(selectedIndex) {
    switch(selectedIndex) {
      //Current 
      case 0:
        return this.state.data.filter((taskObject) => {
          return (taskObject.status === "in-progress");
        });
      //New
      case 1:
        return this.state.data.filter((taskObject) => {
          return (taskObject.status === "unread");
        });
      //Done
      case 2:
          return this.state.data.filter((taskObject) => {
            return (taskObject.status === "done");
          });
    }
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
          backgroundColor = {"#FBF9F9"}
          //ListHeaderComponent = {this._renderButtonGroup}
          keyExtractor = {(item, index) => index.toString()}
          data = {this._filterTasksByStatus(selectedIndex)}
          renderItem = {({item}) => this._renderItemByStatus(selectedIndex, item)}
        />
      </View>
    );
  }
}

export default Do;