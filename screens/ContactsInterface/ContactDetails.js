import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import Constants from 'expo-constants';

class ContactDetails extends Component {
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
    const imageUri = this.details.profile_picture;
    return (
      <View style={styles.container}>

        <View style={{paddingTop:0}}>
          <Card
          containerStyle={{backgroundColor:"#FBF9F9"}}
            title={this.details.name}
            image={{ uri: imageUri}}
            imageProps={{height: 20, width:20}}>
            
            <Text style={styles.title}>
              Name: {this.details.name}{"\n"}
              email: {this.details.gmail}{"\n"}
              Relationship: {this.details.relationship}
            </Text>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Delete Contact' />
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    backgroundColor: "#FBF9F9"
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }
});

export default ContactDetails;