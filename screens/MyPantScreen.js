import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import CreatePant from "../components/CreatePant";
import "@firebase/firestore";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { ClaimedPantCard } from "../components/ClaimedPantCard";
import { PantCard } from "../components/PantCard";

import Colors from "../constants/Colors";

export default function MyPant() {
  const [myPants, setMyPants] = useState([]);
  const [modalVisible, setModal] = useState(false);
  const [myClaimedPants, setMyClaimedPants] = useState([]);

  const dbh = firebase.firestore();
  const ref = dbh.collection("pants"); //reference to the pants collection
  const user = firebase.auth().currentUser.uid;

  //Get all the current users POSTED Pant
  useEffect(() => {
    ref.where("userId", "==", user).onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          ...doc.data(),
          id: doc.id
        });
      });

      setMyPants(list);
    });
    ref.where("claimedUserId", "==", user).onSnapshot(querySnapshot => {
      const claimedList = [];
      querySnapshot.forEach(doc => {
        claimedList.push({
          ...doc.data(),
          id: doc.id
        });
      });

      setMyClaimedPants(claimedList);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Pant att hämta</Text>
      <View style={styles.pantCards}>
        <FlatList
          data={myClaimedPants}
          renderItem={({ item }) => (
            <ClaimedPantCard key={item.id} pant={item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Text style={styles.title}>Min pant</Text>
      <View style={styles.pantCards}>
        <FlatList
          data={myPants}
          renderItem={({ item }) => <PantCard key={item.id} pant={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      <CreatePant cans={0} modalStatus={modalVisible} setModal={setModal} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModal(true)}
        style={styles.TouchableOpacityStyle}
      >
        <Image
          source={require("../assets/images/floating_button_green.png")}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pantCards: {
    paddingHorizontal: 20,
    flexDirection: "row",
    marginBottom: 20
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 70,
    height: 70
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginTop: 60
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#443E50",
    alignSelf: "flex-start",
    marginLeft: 24,
    marginBottom: 10
  }
});
