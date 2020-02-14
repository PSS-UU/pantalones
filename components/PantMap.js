import React from "react";
import MapView from "react-native-maps";
import { Dimensions, StyleSheet } from "react-native";

export const PantMap = props => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 59.8546514,
        longitude: 17.6327215,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
