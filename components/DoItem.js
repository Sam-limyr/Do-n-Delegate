import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
 
export default class DoItem extends Component {
  state = {
    dialogVisible: false,
    employerName : "Another Placeholder",
    profilePicture : "",
    taskName : "Sweep the floor", // is the task name provided by employer
    deadlineTime : 0, // is a number pulled via a Date() object
    taskDescription : "Sweep the third-floor corridor outside my office.", // is the additional information provided by employer
    taskStatus : "unread", // 3 states: "unread", "in progress", and "completed"
    taskNotAcknowledged : true, // for toggling between display of 'acknowledge task' button
    taskAcknowledged : false, //        and the 'in progress/completed' switch
    switchValue : false // is whether the switch is on or off
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  hideDialog = () => {
    this.setState({ dialogVisible: false });
  };

  setName = (inputName) => {
    this.setState({ employerName: inputName.toString()});
  };

  statusAcknowledge = () => {
    this.setState({ taskStatus : "in progress" });
    this.setState({ taskNotAcknowledged : false});
    this.setState({ taskAcknowledged : true });
    // Backend: feedback to employer that task has been acknowledged
  };

  statusChange = () => {
    if (this.state.taskStatus == "in progress") {
        this.setState({ taskStatus : "completed" });
        // Backend: feedback to employer that task has been completed
    } else {
        this.setState({ taskStatus : "in progress" });
    }
  };

  valueChange = () => {
      if (this.state.switchValue) {
          this.setState({ switchValue : false });
      } else {
          this.setState({ switchValue : true });
      }
  };

  switchChange = () => {
      this.statusChange();
      this.valueChange();
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
            <Text style={styles.words}>Please acknowledge the task.</Text>
          <Dialog.Button label="Acknowledge Task" onPress={this.statusAcknowledge} />
        </Dialog.Container>}

        {this.state.taskAcknowledged &&
        <Dialog.Container visible={this.state.dialogVisible} >
            <Dialog.Title style={styles.taskName}>{ this.state.taskName }</Dialog.Title>
            <Dialog.Description style={styles.taskDescription}>{ this.state.taskDescription }</Dialog.Description>
            <Dialog.Switch style={styles.switch} onChange={this.switchChange} value={this.state.switchValue} />
            <Text style={styles.taskStatus}>{ this.state.taskStatus }</Text>
          <Dialog.Button label="Close" onPress={this.hideDialog} />
        </Dialog.Container>}
      </View>
    );
  }
}

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
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15
},

/* lines 79-82
            <View style={styles.container}>
                <Dialog.Switch style={styles.switch} onChange={this.switchChange} value={this.state.switchValue} />
                <Text style={styles.taskStatus}>{ this.state.taskStatus }</Text>
            </ View>
*/
dialogContainer: { // style to be used for Dialog.container
    height: 300,
    width: 150
},
inputBox: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1
},
switch: {
    color: '#FFBB00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
},
taskDescription: {
    color: '#333333',
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 10
},
taskStatus: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10
},
taskName: {
    color: '#111111',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
    marginTop: 5
},
words: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10
}
})
