import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Do extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FBF9F9", justifyContent: "center", alignItems: "center" }}>
        <Text>Do Screen!</Text>
      </View>
    );
  }
}

export default Do;