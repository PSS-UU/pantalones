import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const Colors = {
  green: "#28A07D",
  darkGreen: "black",
  lightGreen: "#42C9A7"
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

  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18
  },

  positionBottom: {
    position: "absolute",
    bottom: 30
  },

  lightGreenButton: {
    borderRadius: 20,
    backgroundColor: Colors.lightGreen,
    justifyContent: "center",
    padding: 16,
    alignItems: "center"
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
