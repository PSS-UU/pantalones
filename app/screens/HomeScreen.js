import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { EmailInput, PasswordInput } from "../components";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState();
  auth().onAuthStateChanged(currentUser => setUser(currentUser));

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home screen</Text>
        <Text>
          Logged in user:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {user ? user.email : "None"}
          </Text>
        </Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Details")}
        />
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
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert(e.name, e.message);
    }
  };

  const register = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
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
