import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

class MyPantCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.cardShadow, styles.card]}>
        <Text>{this.props.cans}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 5
  },
  card: {
    height: 100, //Temporary
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGreen,
    borderWidth: 1,
    borderColor: Colors.mediumGreen,
    borderRadius: 20,
    marginBottom: 10
  }
});

export default MyPantCard;
