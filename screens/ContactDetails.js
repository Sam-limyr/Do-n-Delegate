import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class ContactDetails extends Component {
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
          Name: {this.details.name}{"\n"}
          email: {this.details.gmail}{"\n"}
          Relationship: {this.details.relationship}
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

export default ContactDetails;