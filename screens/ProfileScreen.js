import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, TouchableHighlight,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [imageUrl, setImageUrl] = useState();
  const user = firebase.auth().currentUser;
  const profilePictureRef = firebase.storage().ref().child(`images/profiles/${user.uid}`);


  useEffect(() => {
    const getProfilePicture = async () => {
      const url = await profilePictureRef.getDownloadURL();
      setImageUrl(url);
    };
    getProfilePicture();
  });

  const logout = async () => {
    try {
      await firebase.auth().signOut();
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
      </View>


      <View
        style={{justifyContent: 'center', alignItems: 'center',}}>
        <Text>
          Inloggad som:{" "}
          <Text style={{ fontWeight: "bold" }}>{user ? user.email : "None"}</Text>
        </Text>
      </View>

      <View style={{paddingTop: 30}}>
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          För- och efternamn:
        </Text>

        <Text style={{fontSize: 20, paddingLeft: 20}}>
          E-postadress:{" "}
          <Text style={{ fontWeight: "bold" }}>{user ? user.email : "None"}</Text>
        </Text>

        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Adress:
        </Text>

        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Poäng:
        </Text>

        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Antal följare:
        </Text>


      </View>

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
