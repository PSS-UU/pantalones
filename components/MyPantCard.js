import React from "react";
import { View, Text } from "react-native";

class MyPantCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>{this.props.cans}</Text>
      </View>
    );
  }
}

export default MyPantCard;
