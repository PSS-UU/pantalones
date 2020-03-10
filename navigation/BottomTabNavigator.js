import React, { useState } from "react";
import firebase from "firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen, { LoginScreen } from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyPantScreen from "../screens/MyPantScreen";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged(currentUser => setUser(currentUser));
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  if (user) {
    return (
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
          activeTintColor: Colors.lightGreen,
          inactiveTintColor: Colors.lightGray
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Pantkarta",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="earth" />
            )
          }}
        />
        <BottomTab.Screen
          name="MyPant"
          component={MyPantScreen}
          options={{
            title: "Min pant",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="recycle" />
            )
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="account-circle" />
            ),
            tabBarOnPress: () => {
              ProfileScreen.getName();
            }
          }}
        />
      </BottomTab.Navigator>
    );
  } else {
    return <LoginScreen />;
  }
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Panta mera!";
    case "Profile":
      return "Din profil";
    case "MyPant":
      return "Min Pant";
  }
}
