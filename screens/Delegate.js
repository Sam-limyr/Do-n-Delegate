import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';  

class Delegate extends Component {
  render() {
    return (
      <View>
        <FlatList
          data={[{ name: "Bob"}, { name: "Tim"}]}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item}) => 
            <ListItem 
              roundAvatar
              avatar = {{}}
              title = {item.name}
            />}
        />
      </View>
    );
  }
}

export default Delegate;