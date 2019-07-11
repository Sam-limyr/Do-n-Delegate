import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem, SearchBarIOS, SearchBar } from 'react-native-elements';  

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],  
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const response = await fetch("https://randomuser.me/api?results=10");
    const json= await response.json();
    this.setState({data: json.results});
  };

  render() {
    return (
      <View>
        <SearchBar 
          containerStyle = { {borderTopWidth:0, backgroundColor: '#FC9700'}}
          inputContainerStyle = { {backgroundColor: "#F2F2f2"}}
          placeholder="Search"
          lightTheme={true}
          round
        /> 
        <FlatList 
          backgroundColor = {"FBF9F9"}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.data}
          renderItem = {({item}) => 
            <ListItem 
              roundAvatar
              containerStyle={ {backgroundColor: "#FBF9F9"}}
              bottomDivider={true}
              chevron={true}
              leftAvatar= {{source: {uri: item.picture.thumbnail} }}
              title = {`${item.name.first} ${item.name.last}`}
              //could be like employer / employee state
              //subtitle = {item.email}
            />}
        />
      </View>
    )
  }
}

export default Contacts;