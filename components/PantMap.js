import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const PantMap = ({ onRegionChangeComplete, onSelectLocation }) => {
  const [pants, setPants] = useState([]);
  const [region, setRegion] = useState();

  const db = firebase.firestore();
  const pantsRef = db.collection("pants");

  useEffect(() => {
    return pantsRef.onSnapshot(snap => {
      const list = [];
      snap.forEach(doc => {
        const { cans, location } = doc.data();
        list.push({
          id: doc.id,
          cans,
          location
        });
      });

      setPants(list);
    });
  }, []);

  const updateLocation = async location => {
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

  const onRegionChange = newRegion => {
    setRegion(newRegion);
    if (onRegionChangeComplete) {
      onRegionChangeComplete(newRegion);
    }
  };

  useEffect(() => {
    if (!region) {
      updateLocation();
    }
  });

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView
        showsUserLocation
        onUserLocationChange={newRegion => setRegion(newRegion)}
        onRegionChangeComplete={onRegionChange}
        style={styles.map}
        region={region}
      >
        {pants.map(pant => (
          <Marker
            key={pant.id}
            coordinate={pant.location}
            title={pant.id}
            description={`Burkar: ${pant.cans}`}
          />
        ))}
      </MapView>
    </View>
  );
};

PantMap.propTypes = {};

const styles = StyleSheet.create({
  locationIcon: {
    zIndex: 3,
    position: "absolute",
    marginTop: 74,
    marginLeft: -21,
    left: "50%",
    top: "50%"
  },
  selectLocationButton: {
    zIndex: 10,
    alignItems: "center",
    backgroundColor: "#000",
    position: "relative",
    margin: 20,
    padding: 10
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
