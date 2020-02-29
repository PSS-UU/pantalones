import React, { useEffect, useState } from "react";
import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  RectButton,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import styles from "../AppStyles";

export default function ProfileScreen() {
  const [imageUrl, setImageUrl] = useState();
  const user = firebase.auth().currentUser;
  const profilePictureRef = firebase
    .storage()
    .ref()
    .child(`images/profiles/${user.uid}`);
  const infoRef = firebase.database().ref(`users/${user.uid}`);
  const [nameInput, setNameInput] = useState({ name: "", address: "" });
  const [addressInput, setAddressInput] = useState({ name: "", address: "" });
  const [nameFrom, setNameFrom] = useState();
  const [addressFrom, setAddressFrom] = useState();

  useEffect(() => {
    const getProfilePicture = async () => {
      const url = await profilePictureRef.getDownloadURL();
      setImageUrl(url);
    };
    getProfilePicture();
  });

  handleChange = e => {
    setNameInput({
      name: e.nativeEvent.text
    });
  };

  handleChangeAddress = e => {
    setAddressInput({
      address: e.nativeEvent.text
    });
  };

  let addName = (nameInput, addressInput) => {
    infoRef.set({
      name: nameInput,
      address: addressInput
    });
  };

  let addAddress = (nameInput, addressInput) => {
    infoRef.set({
      name: nameInput,
      address: addressInput
    });
  };

  handleSubmit = () => {
    addName(nameInput.name, addressInput.address);
  };

  handleSubmitAddress = () => {
    addAddress(nameInput.name, addressInput.address);
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(setUser(null));
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      try {
        await this.uploadImage(result.uri);
      } catch (error) {
        Alert.alert("error", `Error: ${error}`);
      }
    }
  };

  uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();

    await profilePictureRef.put(blob);
    const url = await profilePictureRef.getDownloadURL();
    setImageUrl(url);
  };

  getName = () => {
    infoRef.on(
      "child_added",
      function(snapshot) {
        console.log(snapshot.val());
        setNameFrom(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  getAddress = () => {
    infoRef.once(
      "child_added",
      function(snapshot) {
        console.log(snapshot.val());
        setAddressFrom(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  saveAndDisplay = () => {
    this.handleSubmit();
    this.getName();
  };

  saveAndDisplayAddress = () => {
    this.handleSubmitAddress();
    this.getAddress();
  };

  saveAndDisplayAll = () => {
    this.saveAndDisplay();
    this.saveAndDisplayAddress();
  };

  return (
    <ScrollView
      style={profileStyles.container}
      contentContainerStyle={profileStyles.contentContainer}
    >
      <Image
        style={profileStyles.backgroundImage}
        source={require("../assets/images/background-wave.png")}
      />

      <View style={profileStyles.topInfo}>
        <Image
          resizeMode="cover"
          style={profileStyles.profilePicture}
          source={{ uri: imageUrl }}
        />

        <TouchableOpacity style={profileStyles.editButtonPlacement} size={25}>
          <Image
            style={profileStyles.editButton}
            source={require("../assets/images/setting-white.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={profileStyles.cameraButtonPlacement}
          onPress={this.onChooseImagePress}
        >
          <Image
            style={profileStyles.cameraButton}
            source={require("../assets/images/camera-white.png")}
          />
        </TouchableOpacity>

        <View style={profileStyles.infoNameAndFollowers}>
          <Text style={profileStyles.textName}>
            För- och efternamn: {nameFrom}
          </Text>

          <TextInput style={profileStyles.nameInput} onChange={handleChange} />

          <View style={profileStyles.followers}>
            <Text style={profileStyles.textFollowers}>Antal följare:</Text>
          </View>
        </View>
      </View>

      <View style={profileStyles.userInfoBlackText}>
        <Text style={profileStyles.textEmail}>
          E-postadress:{" "}
          <Text style={profileStyles.textInfoEmail}>
            {user ? user.email : "None"}
          </Text>
        </Text>

        <Text style={{ fontSize: 20, paddingLeft: 20 }}>
          Adress: {addressFrom}
        </Text>
        <TextInput
          style={{
            paddingLeft: 20,
            height: 30,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChange={handleChangeAddress}
        />

        <Text style={{ fontSize: 20, paddingLeft: 20 }}>Poäng:</Text>
      </View>



      <View style={profileStyles.saveButtonPlacement}>
        <Button title="Spara" onPress={saveAndDisplayAll} />
      </View>

      <View style={profileStyles.logOutButtonPlacement}>
        <TouchableOpacity
          style={profileStyles.greenButton}
          title="Logga ut"
          onPress={logout}
        >
          <Text style={profileStyles.whiteText}>Logga ut</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={profileStyles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={profileStyles.optionTextContainer}>
          <Text style={profileStyles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  contentContainer: {
    paddingTop: 15
  },

  optionIconContainer: {
    marginRight: 12
  },

  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },

  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  },

  backgroundImage: {
    //flex: 1,
    //alignSelf: "flex-end",
    //resizeMode: 'cover',
    position: "absolute",
    width: "100%",
    height: "80%"
  },

  profilePicture: {
    flex: 1,
    height: 115,
    width: 115,
    top: 10,
    borderRadius: 300 / 2,
    overflow: "hidden"
  },

  topInfo: {
    justifyContent: "center",
    alignItems: "center"
  },

  editButtonPlacement: {
    margin: 5,
    position: "absolute",
    top: 15,
    right: 35
  },

  editButton: {
    height: 30,
    width: 30
  },

  cameraButtonPlacement: {
    position: "absolute",
    top: 110,
    right: 115
  },

  cameraButton: {
    height: 20,
    width: 30
  },

  infoNameAndFollowers: {
    top: 25,
    justifyContent: "center",
    alignItems: "center"
  },

  textName: {
    fontSize: 26,
    color: "white"
  },

  followers: {
    top: 10
  },

  textFollowers: {
    fontSize: 20,
    color: "white"
  },

  nameInput: {
    paddingLeft: 20,
    height: 30,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "flex-end"
  },

  userInfoBlackText: {
    top: 120
  },

  textEmail: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold"
  },

  textInfoEmail: {
    fontSize: 18,
    color: "grey"
  },

  whiteText: {
    color: "white",
    fontWeight: "500"
  },

  wrapper: {
    padding: 10
  },

  saveButtonPlacement: {
    alignItems: 'center',
    top: 150,
  },

  logOutButtonPlacement: {
    alignItems: "center"
  },

  greenButton: {
    borderRadius: 20,
    backgroundColor: "#228669",
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 180
  }
});
