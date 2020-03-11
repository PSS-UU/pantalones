import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import Colors from "../constants/Colors";
import { SwipeableCard } from "./SwipeableCard";
import { PantStatus } from "../constants/PantStatus";
import cansIcon from "../assets/images/can.png";
import flaskIcon from "../assets/images/flask.png";
import divider from "../assets/images/divider.png";

import locationIcon from "../assets/images/directions.png";

//This card is displayed for pants the user has created
export const ClaimedPantCard = ({ pant }) => {
  const db = firebase.firestore();

  const onPressDelete = closeCard => {
    Alert.alert(
      "Ta bort pant",
      "Är du säker på att du inte vill hämta denna pant?",
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
                .update({ status: "AVAILABLE", claimedUserId: "" });
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
    { color: Colors.lightGreen, icon: "delete", onPress: onPressDelete }
  ];

  const cardColor = styles.cardGreen;

  return (
    <SwipeableCard rightActions={rightActions}>
      <View style={[styles.cardShadow, styles.card, cardColor]}>
        <View style={styles.canHeader}>
          <Image style={styles.cansIcon} source={cansIcon} />
          <Text style={styles.amountText}>{pant.cans}</Text>
        </View>
        <Image style={styles.divider} source={divider} />
        <View style={styles.canHeader}>
          <Image style={styles.cansIcon} source={flaskIcon} />
          <Text style={styles.amountText}>{pant.flasks}</Text>
        </View>
        <Image style={styles.divider} source={divider} />
        <View style={styles.canHeader}>
          <Image style={styles.locationIcon} source={locationIcon} />
        </View>
      </View>
    </SwipeableCard>
  );
};

ClaimedPantCard.propTypes = {
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
    backgroundColor: Colors.lightGray,
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
