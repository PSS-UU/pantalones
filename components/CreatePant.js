import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import "@firebase/firestore";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";
import cansIcon from "../assets/images/can.png";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
  Slider
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
          <View style={styles.canHeader}>
            <Image style={styles.cansIcon} source={cansIcon} />
            <Text style={styles.cansAmountText}>Antal burkar</Text>
          </View>
          <Slider
            value={0}
            step={1}
            maximumValue={300}
            minimumTrackTintColor={Colors.lightGreen}
            thumbTintColor={Colors.lightGreen}
            onValueChange={value => setCanAmount(value)}
          />
          <Text style={styles.cansSelectedText}>{cansCount}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={addPant}
            style={[globalStyles.lightGreenButton, styles.positionBottom]}
          >
            <Text style={globalStyles.buttonText}>Lets pant!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={setModal}
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

  pantTextField: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20
  },

  cansIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain"
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

  positionBottom: {
    alignSelf: "flex-end"
  },

  exitButton: {
    alignSelf: "flex-end",
    flex: 1
  },

  cansSelectedText: {
    color: Colors.lightGreen,
    fontFamily: "space-mono"
  },
  cansAmountText: {
    color: Colors.grayText,
    marginLeft: 10,
    fontSize: 18
  },

  ModalContent: {
    padding: 20,
    backgroundColor: "white"
  },

  canHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  ModalColor: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },

  ModalHeaderContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
