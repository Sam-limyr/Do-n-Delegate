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
    
    this.cheeseTheSystem = this.cheeseTheSystem.bind(this);
  }

  state = {
    taskData: [],
    fillerData: [{due_date: new Date('2019-09-03T16:30:00.000Z'), employer_name: 'Nathaniel Cunningham', issued_date: new Date('2019-07-08T20:45:00.000Z'), employee_name: "Janice Ross", name: "Mop the stairwell", description: "Fourth-floor stairwell", status: "unread"}]
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
  
  cheeseTheSystem = () => {
    const list = this.state.taskData.concat(this.state.fillerData);
    this.setState({taskData: list});
    console.log(this.state.taskData);
  };
  
  _renderTask(item) {
    let navLink='DelegateDetails';
    return (
    <TaskItem
      navigation={this.props.navigation}
      item={item}
      navLink={navLink}
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
            cheeseTheSystem={this.cheeseTheSystem}
            employeeDetails={this.employeeDetails}
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