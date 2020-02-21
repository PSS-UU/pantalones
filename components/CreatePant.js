import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import "@firebase/firestore";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image
} from "react-native";

export default CreatePant = props => {
  const [cansCount, setCanAmount] = useState(0);
  const [modalVisible, setModal] = useState(false);

  const user = firebase.auth().currentUser.uid;

  const dbh = firebase.firestore();
  const ref = dbh.collection("pants"); //reference to the pants collection

  async function addPant() {
    await ref.add({
      cans: cansCount,
      userId: user
    });
    setCanAmount("");
    setModal(!modalVisible);
  }

  return (
    <View style={styles.MainContainer}>
      <Modal style={styles.ModalColor} isVisible={modalVisible}>
        <View style={styles.ModalHeaderContainer}>
          <Text style={styles.modalText}>Skapa pant</Text>
          <Button
            style={styles.exitButton}
            title="x"
            onPress={() => setModal(!modalVisible)}
          />
        </View>
        <View style={styles.ModalContent}>
          <TextInput
            style={styles.pantTextField}
            onChangeText={canAmount => setCanAmount(canAmount)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={addPant}
            style={[globalStyles.lightGreenButton, globalStyles.positionBottom]}
          >
            <Text style={globalStyles.buttonText}>Lets pant!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "row"
  },
  MainContainer: {
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
    color: Colors.lightGreen,
    alignSelf: "flex-start",
    flex: 1,
    fontFamily: "fredoka-one"
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 70,
    height: 70
  },

  exitButton: {
    alignSelf: "flex-end",
    flex: 1
  },

  ModalContent: {
    padding: 20,
    backgroundColor: "white",
    flex: 1
  },

  ModalColor: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center"
  },

  ModalHeaderContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
