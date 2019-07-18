import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem, SearchBarIOS, SearchBar } from 'react-native-elements'; 
import firebase from 'firebase';
import '@firebase/firestore'; 

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = firebase.auth().currentUser.uid;
  }

  state = {
    data:[]
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    var temp = [];
    var ref = firebase.firestore().collection("users");
    var start = new Date().getTime();
    let a = await ref.doc(`${this.currentUserID}`).get();
    var elapsed = new Date().getTime() - start;
    console.log("Call to get current user took " + elapsed + " milliseconds");
    var friendsArray = a.data().friends;
    for (var i=0; i<friendsArray.length; i++) {
      let item = friendsArray[i];
      var start1 = new Date().getTime();
      let b = await ref.doc(`${item}`).get();
      var elapsed1 = new Date().getTime() - start1;
      console.log("Call to query took " + elapsed1 + " milliseconds");
      let friendObject = {name: b.data().name, profile_picture: b.data().profile_picture};
      temp.push(friendObject);
    }
    this.setState({data: temp});
  };

  renderHeader = () => {
    return <SearchBar 
        containerStyle = { {borderTopWidth:0, backgroundColor: '#FC9700'}}
        inputContainerStyle = { {backgroundColor: "#F2F2f2"}}
        placeholder="Search"
        lightTheme={true}
        round
      />;
  };

  render() {
    return (
      <View style={{backgroundColor: "#FC9700"}}>
        <FlatList 
          backgroundColor = {"FBF9F9"}
          ListHeaderComponent = {this.renderHeader}
          keyExtractor = {(item, index) => index.toString()}
          data = {this.state.data}
          renderItem = {({item}) => 
            <ListItem 
              roundAvatar
              containerStyle={ {backgroundColor: "#FBF9F9"}}
              bottomDivider={true}
              chevron={true}
              leftAvatar= {{source: {uri: item.profile_picture} }}
              title = {`${item.name}`}
              //could be like employer / employee state
              //subtitle = {item.email}
            />
          }
        />
      </View>
    )
  }
}

export default Contacts;