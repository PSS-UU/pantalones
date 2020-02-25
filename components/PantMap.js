import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Dimensions, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const PantMap = () => {
  const [region, setRegion] = useState();

  const updateLocation = async (location) => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        if (!location) {
          location = await Location.getCurrentPositionAsync({});
        }
        const region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: location.coords.latitudeDelta || 0.0922,
          longitudeDelta: location.coords.longitudeDelta || 0.0421
        };
        setRegion(region);
      } else {
        setRegion(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!region) {
      updateLocation();
    }
  });

  return (
    <MapView
      showsUserLocation
      onUserLocationChange={newRegion => setRegion(newRegion)}
      style={styles.map}
      region={region}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
