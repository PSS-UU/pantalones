import * as firebase from "firebase";
import React, { useState, Component, useEffect } from "react";
import "@firebase/firestore";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";
import cansIcon from "../assets/images/can.png";
import flaskIcon from "../assets/images/flask.png";
import locationIcon from "../assets/images/location-green.png";
import addImageIcon from "../assets/images/add.png";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  Image,
  Slider,
  TextInput,
  Alert
} from "react-native";
import { SelectLocationModal } from "./SelectLocationModal";
import { CLOUD_FUNCTIONS_URL } from "react-native-dotenv";

export default CreatePant = ({ setModal, modalStatus }) => {
  const [cansCount, setCanAmount] = useState(0);
  const [flaskCount, setFlaskAmount] = useState(0);
  const [location, setLocation] = useState(null);
  const [pantTextComment, onChangeText] = useState("");
  const [creatingPant, setCreatingPant] = useState();

  const user = firebase.auth().currentUser.uid;

  const pantPictureRef = firebase
    .storage()
    .ref()
    .child(`images/pant/${user.uid} + ${cansCount}`);

  const addPant = async () => {
    const pantMoney = cansCount + flaskCount * 2;
    setCreatingPant(true);
    resetUrl();
    try {
      const response = await fetch(`${CLOUD_FUNCTIONS_URL}createPant`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify({
          cans: cansCount,
          flasks: flaskCount,
          estimatedValue: pantMoney,
          message: pantTextComment,
          location: location,
          userId: user
        })
      });
      await response.json();
      setCreatingPant(false);
      setCanAmount(0);
      setFlaskAmount(0);
      onChangeText("");
      setLocation(null);
      setModal(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create pant: " + error.message);
    }
  };

  const [imageUrl, setImageUrl] = useState();


  const getPantPicture = async () => {
    const url = await pantPictureRef.getDownloadURL();
    setImageUrl(url);
  };

  const resetUrl = () => {
    const no = "";
    setImageUrl(no);
  }

  let onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      try {
        await uploadImage(result.uri);
      } catch (error) {
        Alert.alert("error", `Error: ${error}`);
      }
    }
  };

  let uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();

    await pantPictureRef.put(blob);
    const url = await pantPictureRef.getDownloadURL();
    setImageUrl(url);
    getPantPicture();
  };

  const buttonColor = creatingPant
    ? globalStyles.disabledButton
    : globalStyles.lightGreenButton;

  return (
    <View style={styles.MainContainer}>
      <Modal style={styles.ModalColor} isVisible={modalStatus}>
        <View style={styles.ModalHeaderContainer}>
          <Text style={styles.modalText}>Skapa pant</Text>
          <Button
            style={styles.exitButton}
            title="x"
            onPress={() => setModal(false)}
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

          <View style={styles.canHeader}>
            <Image style={styles.cansIcon} source={flaskIcon} />
            <Text style={styles.cansAmountText}>Antal flaskor</Text>
          </View>
          <Slider
            value={0}
            step={1}
            maximumValue={300}
            minimumTrackTintColor={Colors.lightGreen}
            thumbTintColor={Colors.lightGreen}
            onValueChange={value => setFlaskAmount(value)}
          />
          <Text style={styles.cansSelectedText}>{flaskCount}</Text>

          <View style={styles.commentHeader}>
            <Text style={styles.cansAmountText}>Kommentar</Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={pantTextComment}
              />
            </View>
          </View>
          
          <View>
            <Text style={styles.cansAmountText}>Bilder</Text>
            <View>
            <TouchableOpacity
            style={styles.addImageContainer}
            onPress={onChooseImagePress}
            >
              <Image
                style={styles.addImage}
                source={imageUrl ? {uri:imageUrl} : addImageIcon }
              />
              
            </TouchableOpacity>
            </View>
            
          </View>

          <View style={styles.canHeader}>
            <Image size={42} style={styles.cansIcon} source={locationIcon} />

            {location ? (
              <Text style={styles.chooseLocationText}>
                Longitude:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {location.longitude.toFixed(3)}
                </Text>
                {"\n"}
                Latitude:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {location.latitude.toFixed(3)}
                </Text>
              </Text>
            ) : (
              <SelectLocationModal onSelectLocation={setLocation} />
            )}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={addPant}
          style={[buttonColor, styles.positionBottom]}
        >
          <Text style={globalStyles.buttonText}>
            {creatingPant ? "Lägger till pant..." : "Let's pant!"}
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    backgroundColor: "#F5F5F5"
  },
  textInput: {
    height: "100%",
    width: "100%",
    marginLeft: 40,
    color: "gray"
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
    marginBottom: 30,
    marginHorizontal: 60
  },

  exitButton: {
    alignSelf: "flex-end",
    flex: 1
  },

  cansSelectedText: {
    fontWeight: "bold",
    color: Colors.lightGreen,
    marginBottom: 20,
    marginLeft: 5
  },
  cansAmountText: {
    color: Colors.grayText,
    marginLeft: 10,
    fontSize: 18
  },

  addImage: {
    position: "absolute",
    width: "45%",
    height: "100%"
  },

  addImage2: {
    position: "absolute",
    width: "45%",
    height: "100%",
    marginLeft: 160
  },

  addImageContainer: {
    flexDirection: "column",
    height: 130,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20
  },

  chooseLocationText: {
    color: Colors.grayText,
    marginLeft: 10,
    fontSize: 18
  },
  inputFieldContainer: {
    borderRadius: 25,
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.xLightGray,
    borderWidth: 2.4,
    marginTop: 10
  },

  ModalContent: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    flex: 1
  },

  canHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  commentHeader: {
    flexDirection: "column",
    marginBottom: 20
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
