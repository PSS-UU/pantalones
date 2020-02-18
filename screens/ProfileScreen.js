import * as React from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { useDispatch } from 'react-redux'
import { setUser } from "../state/actions";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const user = firebase.auth().currentUser;
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(setUser(null));
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  onChooseImagePress = async () => {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
        .then(() => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  uploadImage = async (uri, imageName) => {
    const repsonse = await fetch(uri);
    const blob = await response.blob();
    
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{justifyContent: 'center', alignItems: 'center',}}>
        <Image
          style={{height: 110, width: 110}}
          source={{uri: 'https://www.kindpng.com/picc/m/128-1282088_i-g-profile-icon-vector-png-transparent-png.png'}}
          />
        <Button title="Ladda upp bild" onPress={this.onChooseImagePress} />
        <Text>
          Inloggad som:{" "}
          <Text style={{ fontWeight: "bold" }}>{user ? user.email : "None"}</Text>
        </Text>
      </View>

      <View style={{paddingTop: 30}}>
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Full name:
        </Text >
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Email address:
        </Text>
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Address:
        </Text>
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Score:
        </Text>
        <Text style={{fontSize: 20, paddingLeft: 20}}>
          Reviews:
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
