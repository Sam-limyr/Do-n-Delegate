import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class DelegateItem extends Component {
  state = {
    dialogVisible: false,
    employeeName : "Placeholder Name", // name of the employee
    profilePicture : "", // their profile picture
    incompleteTasks : 0, // number of incomplete tasks that the employee has
    currentTaskName: "**No name provided**",
    currentTaskDescription: "**No description provided**",
    currentTaskDeadline: "**No deadline provided**"
  };

  setEmployee = (inputName, inputPicture) => {
    this.setState({ employeeName: inputName.toString() });
    this.setState({ profilePicture: inputPicture.toString() });
    // Backend: for use in setting employee properties
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  hideDialog = () => {
    this.setState({ dialogVisible: false });
  }

  resetTaskState = () => { // resets all task fields to placeholders. These may be changed as fit.
    this.setState({ currentTaskName: "**No name provided**" });
    this.setState({ currentTaskDescription: "**No description provided**" });
    this.setState({ currentTaskDeadline: "**No deadline provided**" });
  }
 
  handleSubmit = () => {
    Alert.alert(
      'Confirm details of task:',
      'Task Name: ' + this.state.currentTaskName + '\nTask Description: ' + 
          this.state.currentTaskDescription + '\nTask Deadline: ' + this.state.currentTaskDeadline,
      [
        { text: 'Cancel' },
        { text: 'Confirm', onPress: () => this.sendNewTask() },
      ],
      { cancelable: true },
    );
    this.resetTaskState();
  };
 
  sendNewTask = () => {
    Alert.alert(
      'New Task sent to ' + this.state.employeeName.toString() + '.',
      '',
      [
        { text: 'Continue', onPress: () => this.hideDialog() },
      ],
      { cancelable: true },
    );
    // Backend: sends employee the new task with details.
  };
 
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog} style={styles.button}>
            <Text style={styles.words}>{ this.state.employeeName.toString() }</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title children="Delegate a Task and Deadline" />
          <Dialog.Input placeholder="Task Name"
                        onChangeText={(currentTaskName) => this.setState({currentTaskName})}
                        wrapperStyle={styles.inputBox} />
          <Dialog.Input placeholder="Task Description"
                        onChangeText={(currentTaskDescription) => this.setState({currentTaskDescription})}
                        wrapperStyle={styles.inputBox} />
          <Dialog.Input placeholder="Task Deadline" 
                        onChangeText={(currentTaskDeadline) => this.setState({currentTaskDeadline})}
                        wrapperStyle={styles.inputBox} />
          <Dialog.Button label="Cancel" onPress={this.hideDialog} />
          <Dialog.Button label="Submit" onPress={this.handleSubmit} />
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 50
},
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
inputBox: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1
},
words: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
}
})
