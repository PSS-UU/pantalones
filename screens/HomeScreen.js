import * as firebase from "firebase";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import { EmailInput, PasswordInput, PantMap } from "../components";
import styles from "../AppStyles";
import logo from "../assets/images/can.png";

export default function HomeScreen() {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged(currentUser => setUser(currentUser));

  if (user) {
    return (
      <View style={styles.container}>
        <PantMap />
      </View>
    );
  }

  return <LoginScreen />;
}

export const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  const register = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  return (
    <View style={styles.greenBg}>
      <Image style={[localStyles.stretch, styles.marginBottom]} source={logo} />
      <Text style={[styles.yellowHeader, styles.marginBottom]}>Pantad!</Text>
      <View style={[styles.inputFieldContainer, styles.marginBottom]}>
        <EmailInput
          onChangeText={value => setEmail(value)}
          value={email}
          placeholder="email"
          style={localStyles.emailInput}
        />
      </View>
      <View style={[styles.inputFieldContainer, styles.marginBottom]}>
        <PasswordInput
          onChangeText={value => setPassword(value)}
          value={password}
        />
      </View>
      <TouchableOpacity
        style={[localStyles.greenButton, styles.marginBottom]}
        title="Login"
        onPress={login}
      >
        <Text style={localStyles.whiteText}>Logga in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[localStyles.greenText, styles.marginBottom]}
        title="Registrera"
        onPress={register}
      >
        <Text style={localStyles.greenText}>Inte medlem? Registrera dig!</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  emailInput: {
    textAlign: "center",
    color: "#28A07D",
    marginBottom: 20
  },

  greenText: {
    color: "#0A5F48",
    fontStyle: "italic"
  },

  whiteText: {
    color: "white",
    fontWeight: "500"
  },

  greenButton: {
    borderRadius: 20,
    backgroundColor: "#228669",
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },

  stretch: {
    height: 50,
    resizeMode: "contain"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
