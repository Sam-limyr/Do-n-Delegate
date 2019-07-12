import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class DelegateItem extends Component {
  state = {
    dialogVisible: false,
    employeeName : "Placeholder Name", // name of the employee
    profilePicture : "", // their profile picture
    incompleteTasks : 0 // number of incomplete tasks that the employee has
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleSubmit = () => {
    // perform backend stuff
    this.setState({ dialogVisible: false });
  };

  setName = (inputName) => {
    this.setState({ employeeName: inputName.toString()})
  }
 
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog} style={styles.button}>
            <Text style={styles.words}>{ this.state.employeeName.toString() }</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title children="Delegate a Task and Deadline" />
          <Dialog.Input wrapperStyle={styles.inputBox} />
          <Dialog.Input wrapperStyle={styles.inputBox} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
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
