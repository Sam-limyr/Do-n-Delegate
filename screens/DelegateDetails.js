import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { getDate, getTime } from '../functions/HelperFunctions.js';
import { Timestamp } from '@firebase/firestore';

/*
Details screen for a Delegate Task 
*/
class DelegateDetails extends Component {
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

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column', backgroundColor: '#FBF9F9',}}>
        
        <View style={styles.topText}>
          <Text style={styles.taskTitle}>
            {this.details.name}
          </Text>
          <Text style={styles.taskStatus}>Status: {this.details.status}</Text>
        </View>

        <View style={styles.personDetails}>
          <View style={styles.issuerDetails}>
            <Text style={styles.issuerDetailsTextMinor}>
              Assigned by
            </Text>
            <Text style={styles.issuerDetailsTextMajor}>
              {this.details.employer_name}
            </Text>
          </View>
          <View style={styles.dueDateDetails}>
            <Text style={styles.dueDateDetailsTextMinor}>
              Due Date
            </Text>
            <Text style={styles.dueDateDetailsTextMajor}>
              {getDate(this.details.due_date)}{"\n"}
              {getTime(this.details.due_date)} hrs
            </Text>
          </View>
        </View>

        <View style={styles.descriptionDetails}>
          <Text style={styles.descriptionTitle}>
            Description
          </Text>
          <ScrollView style={{backgroundColor:'white'}}>
            <Text>{this.details.description}</Text>
          </ScrollView>
        </View>

        <View style={styles.attachmentDetails}>
          <Text style={styles.attachmentTitle}>
            Attachments
          </Text>
          <ScrollView 
            style={{backgroundColor:'white'}}
          >
            <Text>No image attachments</Text>
          </ScrollView>
        </View>

        <View style={styles.bottomText}>
          <Button
            title="Finish Task"
            raised
            backgroundColor={'red'}
            //Button is disabled if it is already a done task
            disabled={this.details.status==="done" ? true: false}
            //onpress method needed
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  topText: {
    flex: 1.5,
    color: '#FBF9F9',
    paddingTop: 20
  },
  taskTitle: {
    fontSize: 22,
    textAlign: 'left',
    fontWeight: '700',
    paddingLeft: 20
  },
  taskStatus: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '400',
    color: 'red',
    paddingTop: 5,
    paddingLeft: 20
  },
  personDetails: {
    flex: 1.3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  issuerDetails: {
    flex: 1, 
    alignItems: 'flex-start',
  },
  issuerDetailsTextMajor: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 17
  },
  issuerDetailsTextMinor: {
    fontSize: 16,
    fontWeight: '200',
    paddingLeft: 17
  },
  dueDateDetails: {
    flex: 1, 
    alignItems: 'flex-end',
  },
  dueDateDetailsTextMinor: {
    fontSize: 16,
    fontWeight: '200',
    paddingRight: 37
  },
  dueDateDetailsTextMajor: {
    fontSize: 16,
    color: 'red',
    fontWeight: '500',
    paddingRight: 18
  },
  descriptionDetails: {
    flex: 3,
    paddingHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
    paddingBottom: 10
  },
  attachmentDetails: {
    flex: 3,
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  attachmentTitle: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
    paddingBottom: 10
  },
  bottomText: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 30,
  }
});

export default DelegateDetails;