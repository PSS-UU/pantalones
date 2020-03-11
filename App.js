import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import reducer from "./state/reducers";
import { setUser } from "./state/actions";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  STORAGE_BUCKET,
  PROJECT_ID,
} from "react-native-dotenv";

const Stack = createStackNavigator();

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
  projectId: PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

const store = createStore(reducer);

export default function App(props) {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export function Main(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged(user => dispatch(setUser(user)));

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          "fredoka-one": require("./assets/fonts/FredokaOne-Regular.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
