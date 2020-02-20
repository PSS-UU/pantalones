import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import MyPantCard from "../components";
import "@firebase/firestore";
import Modal from "react-native-modal";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  FlatList,
  Button,
  ScrollView
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MyPant() {
  const [cansCount, setCanAmount] = useState(0);
  const [myPants, setMyPants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModal] = useState(false);

  const user = firebase.auth().currentUser.uid;

  const dbh = firebase.firestore();
  const ref = dbh.collection("pants"); //reference to the pants collection

  //Get all the current users posted Pant

  toggleModal = () => {
    if (!modalVisible) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

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

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  //Add pant to the db
  async function addPant() {
    await ref.add({
      cans: cansCount,
      userId: user
    });
    setCanAmount("");
    setModal(!modalVisible);
  }

  function Item({ cans }) {
    return (
      <View style={styles.cans}>
        <Text style={styles.title}>{cans}</Text>
      </View>
    );
  }
  /* OLD FUNCTION
  const clickHandler = () => {
    Alert.alert("Floating Button Clicked");
    var newPostRef = pantsRef.push();
    newPostRef.set({
      cans: cansCount,
      userId: user
    });
  };
  */

  /* if (loading) {   //TODO: detta borde fixas
    return null; // or a spinner
  }*/

  return (
    <View style={styles.MainContainer}>
      <Modal isVisible={modalVisible}>
        <View style={styles.ModalContainer}>
          <Text style={styles.modalText}>Add pant!</Text>
          <Button title="x" onPress={toggleModal} />
          <TextInput
            style={styles.pantTextField}
            onChangeText={canAmount => setCanAmount(canAmount)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            oonPress={addPant}
            style={styles.addButton}
          >
            <Text>Lets pant!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text>Min pant</Text>
      <View style={styles.container}>
        <FlatList
          data={myPants}
          renderItem={({ item }) => <Item cans={item.cans} />}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={setModal} //Was addPant
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
  container: {},
  MainContainer: {
    flex: 1,

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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },

  pantTextField: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1
  },

  modalText: {
    fontSize: 32,
    color: "red"
  },
  addButton: {
    width: 70,
    height: 70,
    backgroundColor: "black",
    position: "absolute",
    bottom: 10
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 70,
    height: 70
  },

  ModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});
