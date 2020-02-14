import * as firebase from "firebase";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import { EmailInput, PasswordInput, PantMap } from "../components";

export default function HomeScreen() {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged(currentUser => setUser(currentUser));

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home screen</Text>
        <PantMap />
        <Text>
          Logged in user:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {user ? user.email : "None"}
          </Text>
        </Text>
        <Button title="Logout" onPress={logout} />
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
    <View style={styles.container}>
      <Text>Email:</Text>
      <EmailInput onChangeText={value => setEmail(value)} value={email} />
      <Text>Password:</Text>
      <PasswordInput
        onChangeText={value => setPassword(value)}
        value={password}
      />
      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={register} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
