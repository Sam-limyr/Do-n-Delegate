import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Contacts extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FBF9F9", justifyContent: "center", alignItems: "center" }}>
        <Text>Contacts screen!</Text>
      </View>
    );
  }
}

export default Contacts;