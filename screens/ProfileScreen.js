import * as React from "react";
import * as firebase from "firebase";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView } from "react-native-gesture-handler";

export default function LinksScreen() {
  const user = firebase.auth().currentUser;

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={styles.profileImagePlacement}>
        <Image
          style={{height: 110, width: 110}}
          source={{uri: 'https://www.kindpng.com/picc/m/128-1282088_i-g-profile-icon-vector-png-transparent-png.png'}}
          />
        <Text>
          Signed in as user:{" "}
          <Text style={{ fontWeight: "bold" }}>{user ? user.email : "None"}</Text>
        </Text>
      </View>
      
      <Text>
        Full name:
      </Text>
      <Text>
        Email address:
      </Text>
      <Text>
        Score:
      </Text>
      <Text>
        Reviews:
      </Text>
      <Button title="Sign out" onPress={logout} />
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
  profileImagePlacement: {
    justifyContent: 'center',
    alignItems: 'center',
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
