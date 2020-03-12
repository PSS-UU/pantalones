import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import { SwipeableCard } from "./SwipeableCard";
import { PantStatus } from "../constants/PantStatus";

export const PantCard = ({ pant }) => {
  const db = firebase.firestore();

  const onPressEdit = closeCard => {
    Alert.alert("TODO", "TODO: Implement edit pant.");
    closeCard();
  };

  const onPressDelete = closeCard => {
    Alert.alert("Ta bort pant", "Är du säker på att du vill ta bort denna panten?", [
      {text: "Avbryt", onPress: () => {
        closeCard();
      }},
      {text: "Ta bort", onPress: async () => {
        try {
          await db.collection("pants").doc(pant.id).delete();
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Error!");
        }
        closeCard();
      }},
    ]);
  };

  const rightActions = [
    { color: "#0073bd", icon: "edit", onPress: onPressEdit },
    { color: "#ce4257", icon: "delete", onPress: onPressDelete },
  ];

  const cardColor = pant.status === PantStatus.Available ? styles.cardGreen : styles.cardGray;

  return (
    <SwipeableCard rightActions={rightActions}>
      <View style={[styles.cardShadow, styles.card, cardColor]}>
        <Text>ID: {pant.id}</Text>
        <Text>Status: {pant.status}</Text>
        <Text>Burkar: {pant.cans}</Text>
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
  cardGreen: {
    backgroundColor: Colors.lightGreen,
    borderColor: Colors.mediumGreen,
  },
  cardGray: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.mediumGray,
  },
  card: {
    height: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10
  }
});
