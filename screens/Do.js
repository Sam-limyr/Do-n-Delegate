import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';  

class Do extends Component {
  render() {
    return (
      <View>
        <FlatList
          data={[{ name: "James"}, { name: "Jonas"}]}
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

export default Do;