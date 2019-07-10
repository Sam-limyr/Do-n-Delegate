import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class DialogBox extends Component {
  state = {
    dialogVisible: false
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
 
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog} style={styles.button}>
          <Text>Add New Employee</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title children="Type in new employee's name" />
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
},
button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
},
countContainer: {
    alignItems: 'center',
    padding: 10
},
countText: {
    color: '#FF00FF'
},
inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
}
})
