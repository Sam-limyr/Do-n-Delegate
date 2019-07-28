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
  }

  state = {
    taskData: [],
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
    return (
    <TaskItem
      navigation={this.props.navigation}
      item={item}
    />);
  }

  render() {
    return (
      <View style={styles.container} ref={component => this._root = component} {...this.props}>

        <FlatList
          backgroundColor = {"FBF9F9"}
          ListHeaderComponent = {this._renderHeader}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.taskData}
          renderItem = {({item}) => this._renderTask(item)}
        />

        <View>
          <AddNewTaskItem 
            employeeName={this.props.employeeName}
            profilePicture={this.props.profilePicture}
          />
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