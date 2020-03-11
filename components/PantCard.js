import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import Colors from "../constants/Colors";
import { SwipeableCard } from "./SwipeableCard";
import { PantStatus } from "../constants/PantStatus";
import cansIcon from "../assets/images/can.png";
import flaskIcon from "../assets/images/flask.png";
import greenDivider from "../assets/images/divider.png";
import grayDivider from "../assets/images/grayDivider.png";

import locationIcon from "../assets/images/directions.png";

export const PantCard = ({ pant }) => {
  const db = firebase.firestore();

  const onPressEdit = closeCard => {
    Alert.alert("TODO", "TODO: Implement edit pant.");
    closeCard();
  };

  const onPressDelete = closeCard => {
    Alert.alert(
      "Ta bort pant",
      "Är du säker på att du vill ta bort denna panten?",
      [
        {
          text: "Avbryt",
          onPress: () => {
            closeCard();
          }
        },
        {
          text: "Ta bort",
          onPress: async () => {
            try {
              await db
                .collection("pants")
                .doc(pant.id)
                .delete();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Error!");
            }
            closeCard();
          }
        }
      ]
    );
  };

  const rightActions = [
    { color: Colors.lightGreen, icon: "edit", onPress: onPressEdit },
    { color: "#D35471", icon: "delete", onPress: onPressDelete }
  ];

  var cardStatus = pant.status === PantStatus.Available ? "Ledig" : "Hämtas";

  const dividerColor =
    pant.status === PantStatus.Available ? greenDivider : grayDivider;

  const cardColor =
    pant.status === PantStatus.Available ? styles.cardGreen : styles.cardGray;

  return (
    <SwipeableCard rightActions={rightActions}>
      <View style={[styles.cardShadow, styles.card, cardColor]}>
        <View style={styles.canHeader}>
          <Image style={styles.cansIcon} source={cansIcon} />
          <Text style={styles.amountText}>{pant.cans}</Text>
        </View>
        <Image style={styles.divider} source={dividerColor} />
        <View style={styles.canHeader}>
          <Image style={styles.cansIcon} source={flaskIcon} />
          <Text style={styles.amountText}>{pant.flasks}</Text>
        </View>
        <Image style={styles.divider} source={dividerColor} />
        <View style={styles.canHeader}>
          <Text style={styles.cardStatus}>{cardStatus}</Text>
        </View>
      </View>
    </SwipeableCard>
  );
};

PantCard.propTypes = {
  pant: PropTypes.object.isRequired
};

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

  amountText: {
    fontSize: 22,
    color: "white",
    paddingLeft: 10
  },

  cardStatus: {
    fontSize: 22,
    color: "white"
  },

  canHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "28%"
  },
  cansIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  locationIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    transform: [{ rotate: "45deg" }]
  },
  divider: {
    marginHorizontal: 16
  },
  cardGreen: {
    backgroundColor: Colors.lightGreen,
    borderColor: Colors.mediumGreen
  },
  cardGray: {
    backgroundColor: "#C1C1C1",
    borderColor: Colors.mediumGray
  },
  card: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10
  }
});
