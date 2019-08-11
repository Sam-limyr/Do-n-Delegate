import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import AddNewEmployeeItem from '../../components/AddNewEmployeeItem';
import firebase from 'firebase';
import '@firebase/firestore'; 

/*
Delegate is the interface through which a user can delegate task to employees. On pressing on a specific employee, the user can view the tasks delegated to that employee on a delegateEmployeeScreen
*/
class Delegate extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = firebase.auth().currentUser.uid;
  }

  state = {
    //stores list of employees for current user
    employeeData: [],
    //stores all the tasks where current user is an employer. 
    taskData: [],
  }

  componentDidMount() {
    this.makeRemoteGetEmployeeAndTasksRequest();
  }

  _makeRemoteGetEmployeeRequest = async () => {
    const employeeArray = [];
    await firebase
      .firestore()
      .collection("users")
      .doc(`${this.currentUserID}`)
      .collection("delegate_list")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          employeeArray.push(doc.data());
        });
      });     
    this.setState({employeeData: employeeArray}); 
  }

  _makeRemoteGetTaskRequest = async () => {
    const tasksArray = [];
    await firebase
      .firestore()
      .collection("tasks")
      .where("employer_id" ,"==", `${this.currentUserID}`)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          doc = doc.data();
          //convert firebase Timestamp to javascript Date object
          doc.due_date = doc.due_date.toDate();
          doc.issued_date = doc.issued_date.toDate();
          tasksArray.push(doc);
        });
      });
    this.setState({taskData: tasksArray});
  }

  makeRemoteGetEmployeeAndTasksRequest = async () => {
    this._makeRemoteGetEmployeeRequest();
    this._makeRemoteGetTaskRequest();
  }

  /*
  Retrieves the tasks that are specific to the given employee and current user
  input: Employee object from employeeData array
  output: a list of tasks specific to the given employee and current yser
  */
  _filterEmployeeTasks(employeeObject) {
    const employeeID = employeeObject.user_id;
    let result = this.state.taskData.filter((taskObject) => {
      return (taskObject.employee_id === employeeID) && (taskObject.employer_id === this.currentUserID);
    });
    return result;
  }

  _renderItem(item) {
    return (
    <ListItem 
      roundAvatar
      containerStyle={ {backgroundColor: "#FBF9F9"}}
      bottomDivider={true}
      chevron={true}
      leftAvatar= {{source: {uri: item.profile_picture} }}
      title={`${item.name}`}
      onPress={() => {
        this.props.navigation.navigate("DelegateEmployee", {
        taskItems: this._filterEmployeeTasks(item),
        employeeDetails: item,
        localDeleteTask: this._localDeleteTask
      })
      }}
    />);
  }

  render() {
    return (
      <View style={{flex:1,flexDirection: 'column'}}>
        <View style={{flex: 7}}>
          <FlatList
            backgroundColor = {"FBF9F9"}
            ListHeaderComponent = {this.renderHeader}
            keyExtractor = {(item, index) => index.toString()}
            data = {this.state.employeeData}
            renderItem = {({item}) => this._renderItem(item)}
          />
        </View>

        <View style={{flex:1}}>
          <AddNewEmployeeItem
          />
        </View>
      </View>
    );
  }
}

export default Delegate;