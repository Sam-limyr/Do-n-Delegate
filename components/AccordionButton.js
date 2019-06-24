import React, { Component } from "react";
import { Container, Header, Content, Icon, Accordion, Text, View, Item } from "native-base";
import { Button } from "react-native-elements";
const dataArray = [
  { title: "John Smith", content: "Sweep the floor \n Dust the rug" },
  { title: "Kurt Cobain", content: "Lorem ipsum dolor sit amet" },
  { title: "Tommy Jones", content: "Lorem ipsum dolor sit amet" }
];

export default class AccordionButton extends Component {
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#FF8C0A" }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
        //COMMENT: Need to make an array of buttons as the drop-down menu next!
      //<Button
      //  title = { item }
      //  type = "outline"
      ///>
      <Text>
          Filler Text
        </Text>
    );
  }
  render() {
    return (
      <Container>
        <Header />
        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}
<br/>