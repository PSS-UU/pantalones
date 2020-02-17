import { StyleSheet } from "react-native";

export const Colors = {
  green: "#28A07D",
  darkGreen: "black",
  lightGreen: "white"
};

export default StyleSheet.create({
  greenBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.green
  },

  yellowHeader: {
    fontSize: 60,
    color: "#FBDC64",
    fontFamily: "fredoka-one"
  },

  welcome: {
    fontSize: 20
  }
});
