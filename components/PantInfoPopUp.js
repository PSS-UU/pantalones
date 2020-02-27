import React, { useState } from "react";
import {
  Modal,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ImageBackground
} from "react-native";
import StarRating from "react-native-star-rating";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";

export default function PantInfoPopUp({ pant, modal, setModal }) {
  async function paxaPant() {
    await ref.add({
      cans: cansCount,
      location: location,
      userId: user
    });
    setCanAmount(0);
    setModal(!modalVisible);
  }

  return (
    <Modal
      transparent={true}
      visible={modal}
      //fix
      onBackdropPress={() => {
        setModal(false);
      }}
    >
      <View style={styles.modalContent}>
        <View style={styles.popupBackground}>
          <Image
            source={require("../assets/images/background-wave.png")}
            style={styles.backgroundImage}
          />
          <View style={styles.modalContentContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalText}>Pant</Text>
              <Button
                style={styles.exitButton}
                title="x"
                onPress={() => setModal(false)}
              />
            </View>
            <Text>Distance</Text>

            <View style={styles.pantAmountContainer}>
              <View style={styles.pantAmount}>
                <Image
                  style={styles.icon}
                  source={require("../assets/images/can.png")}
                />
                <Text>Burkar</Text>
                <Text>{pant.cans}</Text>
              </View>
              <View style={styles.pantAmountCenter}>
                <Image
                  style={styles.icon}
                  source={require("../assets/images/can.png")}
                />
                <Text>Flaskor</Text>
              </View>
              <View style={styles.pantAmount}>
                <Image
                  style={styles.icon}
                  source={require("../assets/images/can.png")}
                />
                <Text>Kronor</Text>
              </View>
            </View>
            <View>
              <Image
                style={styles.icon}
                source={require("../assets/images/can.png")}
              />
              <Text>Name</Text>
            </View>
            <StarRating></StarRating>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={paxaPant}
              style={[globalStyles.lightGreenButton, styles.positionBottom]}
            >
              <Text style={globalStyles.buttonText}>Paxa pant!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modalContentContainer: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column"
  },
  exitButton: {
    alignSelf: "flex-end",
    flex: 1
  },
  modalText: {
    fontSize: 32,
    color: Colors.mediumGreen,
    alignSelf: "flex-start",
    flex: 1,
    fontFamily: "fredoka-one"
  },

  pantAmountContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 20
  },

  icon: {
    width: 32,
    height: 40
  },
  popupBackground: {
    borderRadius: 10,
    backgroundColor: "white",
    height: "90%",
    width: "90%"
  },
  modalHeaderContainer: {
    flexDirection: "row",
    padding: 20
  },
  positionBottom: {
    alignSelf: "flex-end"
  },
  modalContent: {
    alignItems: "center",
    margin: 0,
    justifyContent: "center"
  },
  backgroundImage: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
    position: "absolute",
    borderRadius: 10,
    right: 0,
    left: 0
  },
  pantAmountCenter: {
    alignItems: "center",
    flex: 1
  }
});
