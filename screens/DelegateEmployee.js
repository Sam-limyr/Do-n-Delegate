import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import { ListItem } from 'react-native-elements'; 
import TaskItem from '../components/TaskItem';
import AddNewTaskItem from '../components/AddNewTaskItem';
import { getDate, getTime, dateObjectEquality } from '../functions/HelperFunctions.js';
import firebase from 'firebase';

class DelegateEmployee extends Component {
  constructor(props) {
    super(props);
    this.taskItems = this.props.navigation.getParam('taskItems', 'NO-TASK-ITEMS');
    this.employeeDetails = this.props.navigation.getParam('employeeDetails', 'NO-EMPLOYEE-DETAILS');

    this.submitTaskToDatabase = this.submitTaskToDatabase.bind(this);
    this.state = {
      taskData: this.taskItems,
    }
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    const employeeDetails = navigation.getParam('employeeDetails', 'NO-EMPLOYEE-DETAILS');
    return {
      title: `Tasks for ${employeeDetails.name.split(" ")[0]}`,
      headerStyle: {
        backgroundColor: '#FC9700',
        marginTop: -Constants.statusBarHeight
      },
      headerTintColor: '#FFFFFF',
    };
  };

  componentDidMount() {
    this.setState({taskData: this.taskItems});
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };
  
  submitTaskToDatabase = (taskName, taskDescription, taskDeadline) => {
    const newData = [{
      description: taskDescription,
      due_date: new Date('2019-09-09T21:09:00.000Z'),
      employee_id: this.employeeDetails.employee_id,
      employee_name: this.employeeDetails.employee_name,
      employer_id: firebase.auth().currentUser.uid,
      employer_name: firebase.auth().currentUser.displayName,
      issued_date: Date.now(),
      name: taskName,
      status: 'unread',
    }]
    const combinedData = this.state.taskData.concat(newData);
    this.setState({taskData: combinedData});
  };
  
  _renderTask(item) {
    let navLink='DelegateDetails';
    return (
    <TaskItem
      navigation={this.props.navigation}
      item={item}
      navLink={navLink}
      localDeleteTask={this.localDeleteTask}
    />);
  }

  localDeleteTask = item => {
    console.log("entered function");
    var arrayCopy = this.state.taskData;
    for (var task in this.state.taskData) {
      task = this.state.taskData[task];
      const compare_issued_date = dateObjectEquality(task.issued_date, item.issued_date);
      const compare_due_date = dateObjectEquality(task.due_date, item.due_date);
      const compare_name = task.name.toString() === item.name.toString();
      const compare_description = task.description.toString() === item.description.toString();
      if (compare_description && compare_due_date && compare_issued_date && compare_name) {
        arrayCopy.splice(task, 1);
        //also, need to update task status in database 
        //ensure periodic sync with database. 
        this.setState({taskData: arrayCopy});
      }
      break;
    }
    this.setState({state: this.state})
    console.log(this.state.taskData);
  }

  render() {
    return (
      <View style={styles.container} ref={component => this._root = component} {...this.props}>
        <View style={{flex: 7}}>
          <FlatList
            backgroundColor = {"FBF9F9"}
            ListHeaderComponent = {this._renderHeader}
            keyExtractor = {(item, index) => index.toString()}
            data = {this.state.taskData}
            extraData={this.state}
            renderItem = {({item}) => this._renderTask(item)}
          />
        </View>

        <View style={{flex: 1, paddingTop:-5}}>
          <AddNewTaskItem
            submitTaskToDatabase={this.submitTaskToDatabase}
            employeeDetails={this.employeeDetails}
          />       
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default DelegateEmployee;