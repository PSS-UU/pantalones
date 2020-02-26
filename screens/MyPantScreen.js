import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import MyPantCard from "../components/MyPantCard";
import CreatePant from "../components/CreatePant";
import Colors from "../constants/Colors";
import "@firebase/firestore";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";

export default function MyPant() {
  const [myPants, setMyPants] = useState([]);
  const [modalVisible, setModal] = useState(false);

  const dbh = firebase.firestore();
  const ref = dbh.collection("pants"); //reference to the pants collection

  //Get all the current users posted Pant
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { cans } = doc.data();
        list.push({
          id: doc.id,
          cans
        });
      });

      setMyPants(list);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text>Min pant</Text>
      <View style={styles.pantCards}>
        <FlatList
          data={myPants}
          renderItem={({ item }) => <MyPantCard cans={item.cans} />}
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
    padding: 20,
    flex: 1,
    flexDirection: "row"
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
    backgroundColor: "#F5F5F5"
  },

  title: {
    fontSize: 32
  }
});
