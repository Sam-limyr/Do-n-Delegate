import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import AddNewEmployeeItem from '../components/AddNewEmployeeItem';
import DelegateItem from '../components/DelegateItem';

class Delegate extends Component {
  state = {
    data: [{name: 'Janice Ross', picture: 'Her Picture'},
    {name: 'George Whittaker', picture: 'His Picture'}]
  }
  
  render() {
    return (
      <View>
        <View>
          <FlatList
            backgroundColor = {"FBF9F9"}
            ListHeaderComponent = {this.renderHeader}
            keyExtractor = {(item, index) => index.toString()}
            data = {this.state.data}
            renderItem = {({item}) => 
              <DelegateItem
                employeeName={item.name} // is the employee's name
                profilePicture={item.picture} // is the profile picture of the employee
              />
            }
          />
        </View>

        <View>
          <AddNewEmployeeItem />
        </View>
      </View>
    );
  }
}

export default Delegate;