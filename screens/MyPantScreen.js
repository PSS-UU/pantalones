import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import CreatePant from "../components/CreatePant";
import "@firebase/firestore";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { PantCard } from "../components/PantCard";

export default function MyPant() {
  const [myPants, setMyPants] = useState([]);

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
          renderItem={({ item }) => <PantCard pant={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <CreatePant cans={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  pantCards: {
    padding: 20,
    flex: 1,
    flexDirection: "row"
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
