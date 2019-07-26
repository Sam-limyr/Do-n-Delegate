import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import AddNewTaskItem from '../components/AddNewTaskItem';
/* TO-DO:

On press, navigates user to new screen
Screen (i.e. contents of this DelegateItem) displays n TaskItems
Screen also contains one AddNewTaskItem

Ensure that DelegateEmployeeScreen passes down the required props (employeeName and profilePicture) to 
AddNewTaskItem and TaskItem
*/
class DelegateEmployee extends Component {
  constructor(props) {
    super(props);
    //this.details = this.props.navigation.getParam('item', 'NO-ITEM');
    //console.log(this.details);
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };

  static navigationOptions = ({navigation, navigationOptions}) => {
    const itemDetails = navigation.getParam('item', 'NO-ITEM');
    return {
      title: `${itemDetails.name}`,
      headerStyle: {
        backgroundColor: '#FC9700',
      },
      headerTintColor: '#FFFFFF',
    };
  };
  
  state = {
    data: [],
  }

  componentDidMount() {
    this.makeRemoteTaskRequest();
  }

  makeRemoteTaskRequest = async () => {
    //retrieve all tasks delegated to this user
    var start = new Date().getTime();
    const tasksArray = [];
    await firebase
      .firestore()
      .collection("tasks")
      .where("employee_id" ,"==", `${this.currentUserID}`)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          doc = doc.data();
          doc.due_date = doc.due_date.toDate();
          //convert firebase Timestamp to javascript Date object
          console.log(doc);
          tasksArray.push(doc);
        });
      });
    var elapsed = new Date().getTime() - start;
    console.log("Call to get tasks took " + elapsed + " milliseconds");
    this.setState({data: tasksArray});
  }
  
  _renderItem(item) {
    return (
    <ListItem 
      roundAvatar
      containerStyle={ {backgroundColor: "#FBF9F9"}}
      bottomDivider={true}
      chevron={true}
      //leftAvatar= {{source: {uri: item.profile_picture} }}
      title={`${item.name}`}
      subtitle={`By: ${item.employer_name}`}
      rightTitle={getDate(item.due_date)}
      rightTitleStyle={{ color: 'red' }}
      rightSubtitle={getTime(item.due_date)}
      rightSubtitleStyle={{ color: 'red'}}
      //onPress={() => this.props.navigation.navigate("ContactDetails", {item})}
      //could be like employer / employee state
      //subtitle = {item.email}
    />);
  }

  render() {
    return (
      <View style={styles.container} ref={component => this._root = component} {...this.props}>
        <AddNewTaskItem 
          employeeName={this.props.employeeName}
          profilePicture={this.props.profilePicture}
        />

        <FlatList
          backgroundColor = {"FBF9F9"}
          ListHeaderComponent = {this._renderHeader}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.data}
          renderItem = {({item}) => this._renderItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default DelegateEmployee;