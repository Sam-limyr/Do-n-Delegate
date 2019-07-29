import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import Dialog from "react-native-dialog";
 
export default class AddNewContactItem extends Component {
  state = {
    dialogVisible: false,
    currentNewEmployee: "",
    currentProfilePicture: "<Placeholder Photo>", // this would be pulled from firebase in the final version
    currentEmailAddress: "kathy.lim@example.com"
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
        this.state.currentEmailAddress+ '\n\nThis is the email of user name "'
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
      <View style={styles.button}>
        <Button
          title="Add New Contact"
          raised
          onPress={this.showDialog}
        />
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title children="Type in new contact's name" />
          <Dialog.Input placeholder="New contact's name"
                        onChangeText={(currentNewEmployee) => this.setState({currentNewEmployee})}
                        wrapperStyle={styles.inputBox} />
          <Dialog.Button label="Cancel" onPress={this.hideDialog} />
          <Dialog.Button label="Submit" onPress={() => {
            setTimeout(() => {
              this.handleSubmit()
            }, 500);
          }}
          />
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
  flex: 1,
  paddingTop: 10,
  paddingBottom: 15,
  paddingHorizontal: 30,
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
