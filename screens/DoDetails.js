import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Constants } from 'expo';
import { getDate, getTime } from '../functions/HelperFunctions.js';
import { Timestamp } from '@firebase/firestore';

class DoDetails extends Component {
  oneToDate = () => {
    return Timestamp.toString;
  }

  constructor(props) {
    super(props);
    this.details = this.props.navigation.getParam('item', 'NO-ITEM');
  }


  static navigationOptions = ({navigation, navigationOptions}) => {
    const itemDetails = navigation.getParam('item', 'NO-ITEM');
    return {
      title: `${itemDetails.name}`,
      headerStyle: {
        backgroundColor: '#FC9700',
        marginTop: -Constants.statusBarHeight
      },
      headerTintColor: '#FFFFFF',
    };
  };

  
  //Task Deadline: {this.details.due_date.getDate()}{" at "}{this.details.due_date.getTime()}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Employer Name: {this.details.employer_name}{"\n"}
          Task Name: {this.details.name}{"\n"}
          Task Description: {this.details.description}{"\n"}
          
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

export default DoDetails;