import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, TouchableHighlight,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { useDispatch } from 'react-redux'
import { setUser } from "../state/actions";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [imageUrl, setImageUrl] = useState();
  const user = firebase.auth().currentUser;
  const dispatch = useDispatch();
  const profilePictureRef = firebase.storage().ref().child(`images/profiles/${user.uid}`);
  const infoRef = firebase.database().ref(`users/${user.uid}`);
  const [nameInput, setNameInput] = useState({name: '', address: ''});
  const [addressInput, setAddressInput] = useState({name: '', address: ''});
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
      name:e.nativeEvent.text
    });
  };

  handleChangeAddress = e => {
    setAddressInput({
      address:e.nativeEvent.text
    });
  };

  let addName = (nameInput, addressInput) => {
    infoRef.set({
      name: nameInput,
      address: addressInput
    })
  }

  let addAddress = (nameInput, addressInput) => {
    infoRef.set({
      name: nameInput,
      address: addressInput
    })
  }

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
  }

  uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    await profilePictureRef.put(blob);
    const url = await profilePictureRef.getDownloadURL();
    setImageUrl(url);
  }

  getName = () => {
    infoRef.on("child_added", function(snapshot) {
      console.log(snapshot.val());
      setNameFrom(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  getAddress = () => {
    infoRef.once("child_added", function(snapshot) {
      console.log(snapshot.val());
      setAddressFrom(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  saveAndDisplay = () => {
    this.handleSubmit();
    this.getName();
  } 

  saveAndDisplayAddress = () => {
    this.handleSubmitAddress();
    this.getAddress();
  } 

  saveAndDisplayAll = () => {
    this.saveAndDisplay();
    this.saveAndDisplayAddress();
  }
  

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{justifyContent: 'center', alignItems: 'center',}}>
        
        <Image
          style={{height: 110, width: 110, borderRadius: 300/2, overflow: 'hidden'}}
          source={{uri: imageUrl}}
        />
        <TouchableHighlight style= {{paddingLeft: 100,}} onPress={this.onChooseImagePress}>
          <Image
            style={{height:30, width: 30}}
            source={require('../assets/images/camera.png')}
          />
        </TouchableHighlight>  
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          För- och efternamn:{" "} {nameFrom}
        </Text>

        <Text style={{fontSize: 20, paddingLeft: 20}}>
        </Text>
        <TextInput style={{ paddingLeft: 20, height: 30, width: 200, borderColor: 'gray', borderWidth: 1 }} onChange={handleChange} />
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Antal följare:
        </Text>
      </View>


      <View style={{paddingTop: 30}}>
        
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          E-postadress:{" "}
          <Text style={{ fontWeight: "bold" }}>{user ? user.email : "None"}</Text>
        </Text>

        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Adress: {addressFrom}
        </Text>
        <TextInput style={{ paddingLeft: 20, height: 30, width: 200, borderColor: 'gray', borderWidth: 1 }} onChange={handleChangeAddress} />
        
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Poäng:
        </Text>


      </View>
      <Button title="Spara" onPress={saveAndDisplayAll}/>
      <Button title="Logga ut" onPress={logout} />
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
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12,
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
  }
});