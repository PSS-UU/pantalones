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

  marginBottom: {
    marginBottom: 20
  },

  inputFieldContainer: {
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 240,
    justifyContent: "center",
    alignItems: "center"
  },

  yellowHeader: {
    fontSize: 46,
    color: "#FBDC64",
    fontFamily: "fredoka-one"
  },

  welcome: {
    fontSize: 20
  }
});
