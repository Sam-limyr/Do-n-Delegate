import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class AddNewTaskItem extends Component {
  state = {
    dialogVisible: false,
    currentTaskName: "",
    currentTaskDescription: "None",
    currentTaskDeadline: ""
  };

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  hideDialog = () => {
    this.setState({ dialogVisible: false });
    this.resetTaskState();
  }

  resetTaskState = () => { // resets all task fields to placeholders. These may be changed as fit.
    this.setState({ currentTaskName: "" });
    this.setState({ currentTaskDescription: "None" });
    this.setState({ currentTaskDeadline: "" });
  }
 
  handleSubmit = () => {
    if (this.state.currentTaskName == "" ) {
      Alert.alert(
        'Please enter a task name.',
        '',
        [
          { text: 'Return' },
        ],
        { cancelable: true },
      )
    } else if (this.state.currentTaskDeadline == "") {
      Alert.alert(
        'Please enter a task deadline.',
        '',
        [
          { text: 'Return' },
        ],
        { cancelable: true },
      )
    } else {
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
    }
  };
 
  sendNewTask = () => {
    Alert.alert(
      'New Task sent to ' + this.props.employeeDetails.name + '.',
      '',
      [
        { text: 'Continue', onPress: () => this.hideDialog() },
      ],
      { cancelable: true },
    );
    this.props.cheeseTheSystem();
    // Backend: sends employee the new task with details.
  };
 
  render() {
    return (
      <View ref={component => this._root = component} {...this.props}>
        <TouchableOpacity onPress={this.showDialog} style={styles.button}>
          <Text style={styles.words}>Add New Task</Text>
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
