import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class DoItem extends Component {
  state = {
    dialogVisible: false,
    employerName : "Another Placeholder",
    profilePicture : "",
    taskName : "Sweep the floor", // is the task name provided by employer
    deadlineTime : 0, // is a number pulled via a Date() object
    taskDescription : "Sweep the third-floor corridor outside my office.", // is the additional information provided by employer
    taskStatus : "Unread", // 3 states: "Unread", "In Progress", and "Completed"
    taskNotAcknowledged : true, // for toggling between display of 'acknowledge task' button
    taskAcknowledged : false, //        and the 'In Progress/Completed' switch
    switchValue : false // is whether the switch is on or off
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  hideDialog = () => {
    this.setState({ dialogVisible: false });
  };

  setEmployer = (inputName, inputPicture) => {
    this.setState({ employerName: inputName.toString() });
    this.setState({ profilePicture: inputPicture.toString() });
    // Backend: for use in setting employer properties
  };

  setTask = (inputName, inputTime, inputDescription) => {
    this.setState({ taskName: inputName.toString() });
    this.setState({ deadlineTime: inputTime.parseInt() });
    this.setState({ taskDescription: inputDescription.toString() });
    // Backend: for use in setting task properties
  }

  statusAcknowledge = () => {
    this.setState({ taskStatus : "In Progress" });
    this.setState({ taskNotAcknowledged : false});
    this.setState({ taskAcknowledged : true });
    // Backend: feedback to employer that task has been acknowledged
  };

  switchChange = () => {
      if (this.state.switchValue) {
          this.setState({ switchValue : false });
      } else {
          this.setState({ switchValue : true });
      }
  };

  statusChange = () => {
    if (this.state.taskStatus == "In Progress") {
        Alert.alert(
        'Confirm completion of task',
        'By confirming the completion of this task, a message will be sent to your employer.',
        [
          { text: 'Cancel' },
          { text: 'Confirm', onPress: () => this.handleConfirm() },
        ],
        { cancelable: true },
      );
    } else {
      Alert.alert(
        'Confirm re-marking of task as incomplete',
        'By re-marking this task as incomplete, a message will be sent to your employer.',
        [
          { text: 'Cancel' },
          { text: 'Confirm', onPress: () => this.handleUnConfirm() },
        ],
        { cancelable: true },
      );
    }
  };

  handleConfirm = () => {
    this.switchChange();
    this.setState({ taskStatus : "Completed" });
    // Backend: feedback to employer that task has been completed
    // Backend: list task as Completed
    // Frontend: display task as Completed in Do menu
  }

  handleUnConfirm = () => {
    this.switchChange();
    this.setState({ taskStatus : "In Progress" });
    // Backend: feedback to employer that task has been re-marked as In Progress
    // Backend: list task as incomplete and now still in progress
    // Frontend: display task as incomplete and In Progress in Do menu
  }
 
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog} style={styles.button}>
            <Text style={styles.words}>{ this.state.employerName }</Text>
        </TouchableOpacity>

        {this.state.taskNotAcknowledged &&
        <Dialog.Container visible={this.state.dialogVisible} >
            <Dialog.Title style={styles.taskName}>{ this.state.taskName }</Dialog.Title>
            <Dialog.Description style={styles.taskDescription}>{ this.state.taskDescription }</Dialog.Description>
            <Text style={styles.words}>Please acknowledge this task before proceeding.</Text>
          <Dialog.Button label="Acknowledge Task" onPress={this.statusAcknowledge} />
        </Dialog.Container>}

        {this.state.taskAcknowledged &&
        <Dialog.Container visible={this.state.dialogVisible} style={styles.container}>
            <Dialog.Title style={styles.taskName}>{ this.state.taskName }</Dialog.Title>
            <Dialog.Description style={styles.taskDescription}>{ this.state.taskDescription }</Dialog.Description>
            <Text style={styles.taskStatus}>Task Status:</Text>
            <View style={styles.container}>
              <Text style={styles.taskStatus}>{ this.state.taskStatus }</Text>
              <Dialog.Switch style={styles.switch} onChange={this.statusChange} value={this.state.switchValue} />
            </ View>
          <Dialog.Button label="Close" onPress={this.hideDialog} />
        </Dialog.Container>}
      </View>
    );
  }
}

// TODO: transfer styles from all components into a separate Styles.js
const styles = StyleSheet.create({

button: {
    alignItems: 'center',
    backgroundColor: '#FFBB00',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: '#FFAA00',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 4,
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 25
},
container: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 5
},
dialogContainer: { // style to be used for Dialog.container; haven't figured it out yet
    height: 300,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 150
},
inputBox: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1
},
switch: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
},
taskDescription: {
    color: '#333333',
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 10
},
taskStatus: {
    flexDirection: 'row',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    marginHorizontal: 30
},
taskName: {
    color: '#111111',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
},
words: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10
}
})
