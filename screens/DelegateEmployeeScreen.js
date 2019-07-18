import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
/* TO-DO:

On press, navigates user to new screen
Screen (i.e. contents of this DelegateItem) displays n TaskItems
Screen also contains one AddNewTaskItem

Ensure that DelegateEmployeeScreen passes down the required props (employeeName and profilePicture) to 
AddNewTaskItem and TaskItem
*/
class DelegateEmployeeScreen extends Component {
  constructor(props) {
    super(props);
    this.details = this.props.navigation.getParam('item', 'NO-ITEM');
    console.log(this.details);
  }
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          "Delegate details screen"
        </Text>
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

export default DelegateEmployeeScreen;