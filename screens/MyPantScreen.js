import * as firebase from "firebase";
import React, { useState, Component } from "react";
import "@firebase/firestore";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  TextInput
} from "react-native";

export default function MyPant() {
  const [cansCount, setCanAmount] = useState(0);
  const user = firebase.auth().currentUser.uid;

  const dbh = firebase.firestore();
  const ref = dbh.collection("pants"); //reference to the pants collection

  //Get all the current users posted Pant
  let query = ref
    .where("userId", "==", user)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });

  //Add pant to the db
  async function addPant() {
    await ref.add({
      cans: cansCount,
      userId: user
    });
    setCanAmount("");
  }

  const clickHandler = () => {
    Alert.alert("Floating Button Clicked");
    var newPostRef = pantsRef.push();
    newPostRef.set({
      cans: cansCount,
      userId: user
    });
  };

  return (
    <View style={styles.MainContainer}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={canAmount => setCanAmount(canAmount)}
      />
      <Text>Example of Floating Action Button</Text>
      <Text>Click on Action Button to see Alert</Text>
      <Text>{cansCount}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={addPant}
        style={styles.TouchableOpacityStyle}
      >
        <Image
          source={require("../assets/images/floating_button_green.png")}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
      <Text>Min pant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5"
  },

  TouchableOpacityStyle: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 70,
    height: 70
  }
});
