import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from 'react-native-elements';
import {getDate, getTime, dateObjectEquality } from '../functions/HelperFunctions';
 
class CheckedTaskItem extends Component {
  state = {
    checked: false
  };

  _onSelectTask = () => {
    let item = this.props.item;
    let navLink = this.props.navLink;
    let completeTask = this.props.completeTask;
    this.props.navigation.navigate(navLink, {item, completeTask})
  }
 
  render() {
    return (
      <ListItem
        containerStyle={ {backgroundColor: "#FBF9F9"}}
        bottomDivider={true}
        title={`${this.props.item.name}`}
        subtitle={`By: ${this.props.item.employer_name}`}
        rightTitle={getDate(this.props.item.due_date)}
        rightTitleStyle={{ color: 'red' }}
        rightSubtitle={getTime(this.props.item.due_date)}
        rightSubtitleStyle={{ color: 'red' }}
        checkBox={{ 
          checked: this.state.checked,
          onPress: () => {
            this.setState({checked: !this.state.checked})
            setTimeout(() => {
              this.props.acknowledgeTask(this.props.item);
            }, 500);
          }
        }}
        onPress={this._onSelectTask}
      />
    )
  }
}

export default CheckedTaskItem;

