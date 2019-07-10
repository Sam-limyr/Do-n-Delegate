import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';  

class Contacts extends Component {
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

export default Contacts;