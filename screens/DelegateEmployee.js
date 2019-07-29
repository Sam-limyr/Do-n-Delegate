import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import Constants from 'expo-constants';
import { ListItem } from 'react-native-elements'; 
import TaskItem from '../components/TaskItem';
import AddNewTaskItem from '../components/AddNewTaskItem';
import { getDate, getTime, dateObjectEquality } from '../functions/HelperFunctions.js';

/*
DelegateEmployee Screen displays tasks associated with this user and employee
receives props from delegate when the employee is selected
Screen also contains one AddNewTaskItem.
*/

class DelegateEmployee extends Component {
  constructor(props) {
    super(props);
    this.taskItems = this.props.navigation.getParam('taskItems', 'NO-TASK-ITEMS');
    this.employeeDetails = this.props.navigation.getParam('employeeDetails', 'NO-EMPLOYEE-DETAILS');
    this.state = {
      taskData: this.taskItems
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

        <FlatList
          backgroundColor = {"FBF9F9"}
          ListHeaderComponent = {this._renderHeader}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.taskData}
          extraData={this.state}
          renderItem = {({item}) => this._renderTask(item)}
        />

        <View>
          <AddNewTaskItem>
            employeeName={this.props.employeeName}
            profilePicture={this.props.profilePicture}
          </AddNewTaskItem>       
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default DelegateEmployee;