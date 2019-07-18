import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class AddNewEmployeeItem extends Component {
  state = {
    dialogVisible: false,
    currentNewEmployee: "",
    currentProfilePicture: "<Placeholder Photo>" // this would be pulled from firebase in the final version
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  hideDialog = () => {
    this.setState({ dialogVisible: false });
    this.resetNewEmployee();
  }

  resetNewEmployee = () => {
    this.setState({ currentNewEmployee: "" });
  }
 
  handleSubmit = () => {
    // Backend: submit name to database to check against existing users.
    //          upon successful detection, prompts with profile picture of user selected.
    if (this.state.currentNewEmployee == "") {
      Alert.alert(
        'Please enter a user name.',
        '',
        [
          { text: 'Return' },
        ],
        { cancelable: true },
      )
    } else {
      Alert.alert(
        'Confirm user selection\n',
        this.state.currentProfilePicture + '\n\nThis is the profile picture of user name "'
        + this.state.currentNewEmployee + '". Please confirm that it is the intended user.',
        [
          { text: 'Cancel' },
          { text: 'Confirm', onPress: () => this.sendAddRequest() },
        ],
        { cancelable: true },
      );
    }
  };
 
  sendAddRequest = () => {
    Alert.alert(
      'Request sent to user.',
      '',
      [
        { text: 'Continue', onPress: () => this.hideDialog() },
      ],
      { cancelable: true },
    );
    // Backend: sends employee a message to accept or decline.
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog} style={styles.button}>
          <Text style={styles.words}>Add New Employee</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title children="Type in new employee's name" />
          <Dialog.Input placeholder="New employee's username"
                        onChangeText={(currentNewEmployee) => this.setState({currentNewEmployee})}
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
},
button: {
    alignItems: 'center',
    backgroundColor: '#FCCA00',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: '#FC8F00',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 6,
    marginHorizontal: 20,
    marginVertical: 25,
    padding: 25
},
inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
},
words: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold'
}
})
