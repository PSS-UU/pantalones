import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import { Modal, Dimensions, StyleSheet, TouchableHighlight, View, Text, Image} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import StarRating from 'react-native-star-rating';
import PantInfoPopUp from './PantInfoPopUp';

export const PantMap = ({ onRegionChangeComplete, onSelectLocation }) => {
  const [pants, setPants] = useState([]);
  const [region, setRegion] = useState();
  const [modal, setModal] = useState(false)

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
    <MapView.Marker
        //flytta koordinater
        coordinate={{latitude: 59.8150,
        longitude: 17.6629}}
        title={"SLU"}
        description={"example marker"}
        onPress={() => setModal(true)}
        pinColor = {'aqua'}
    >
    </MapView.Marker>
        ))}
      </MapView>
    <PantInfoPopUp modal={modal} setModal={setModal}></PantInfoPopUp>
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
  },
});
