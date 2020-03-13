import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import cansIcon from "../assets/images/can.png";
import flaskIcon from "../assets/images/flask.png";
import moneyIcon from "../assets/images/money.png";
import Colors from "../constants/Colors";
import divider from "../assets/images/divider.png";

export const DisplayPantInfo = ({ flasks, cans, estimatedValue }) => {
  return (
    <View style={styles.displayPantContainer}>
      <View style={styles.pantAmountColumn}>
        <View style={styles.pantAmountRow}>
          <Image style={styles.icon} source={cansIcon} />
          <Text style={styles.amountText}>{cans}</Text>
        </View>
        <Text style={styles.descriptionText}>burkar</Text>
      </View>
      <Image style={styles.divider} source={divider} />
      <View style={styles.pantAmountColumn}>
        <View style={styles.pantAmountRow}>
          <Image style={styles.icon} source={flaskIcon} />
          <Text style={styles.amountText}>{flasks}</Text>
        </View>
        <Text style={styles.descriptionText}>flaskor</Text>
      </View>
      <Image style={styles.divider} source={divider} />
      <View style={styles.pantAmountColumn}>
        <View style={styles.pantAmountRow}>
          <Image style={styles.icon} source={moneyIcon} />
          <Text style={styles.amountText}>{estimatedValue}</Text>
        </View>
        <Text style={styles.descriptionText}>kronor</Text>
      </View>
    </View>
  );
};

DisplayPantInfo.defaultProps = {
  flasks: 10,
  cans: 10,
  estimatedValue: 10
};

const styles = StyleSheet.create({
  displayPantContainer: {
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },
  pantAmountColumn: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    alignItems: "center"
  },
  icon: {
    width: 34,
    resizeMode: "contain",
    height: 48
  },
  pantAmountRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30
  },
  amountText: {
    fontSize: 24,
    color: "white",
    paddingLeft: 10
  },

  descriptionText: {
    fontSize: 16,
    color: Colors.mediumGreen,
    paddingTop: 10,
    fontWeight: "500"
  }
});
