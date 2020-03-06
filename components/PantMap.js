import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import MapView from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  View,
  Image
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import PantInfoPopUp from "./PantInfoPopUp";
import canIcon from "../assets/images/can.png";
import canGrayIcon from "../assets/images/can-gray.png";
import { PantStatus } from "../constants/PantStatus";

export const PantMap = ({ onRegionChangeComplete, onSelectLocation }) => {
  const [pants, setPants] = useState([]);
  const [stations, setStations] = useState([]);
  const [region, setRegion] = useState();
  const [modal, setModal] = useState(false);
  const [selectedPant, setSelectedPant] = useState();

  const db = firebase.firestore();
  const pantsRef = db.collection("pants");

  const displayModal = pant => {
    setSelectedPant(pant);
    setModal(true);
  }

  const hideModal = () => {
    setSelectedPant(undefined);
    setModal(false);
  }

  useEffect(() => {
    pantsRef.onSnapshot(snap => {
      const list = [];
      snap.forEach(doc => {
        const data = doc.data();
        list.push({
          ...data,
          id: doc.id
        });
      });

      setPants(list);
    });

    db.collection("stations").onSnapshot(snap => {
      const list = [];
      snap.forEach(doc => {
        const data = doc.data();
        list.push({
          ...data,
          id :doc.id
        });
      })
      setStations(list);
    });
  }, []);

  const updateLocation = async location => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        if (!location) {
          location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
          });
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
        userLocationAnnotationTitle=""
        onRegionChangeComplete={onRegionChange}
        style={styles.map}
        region={region}
      >
        {pants.map(pant => (
          <MapView.Marker
            key={pant.id}
            coordinate={pant.location}
            onPress={() => displayModal(pant)}
            style={{}}
          >
            {pant.status === PantStatus.Available && (
              <Image style={styles.canIcon} source={canIcon} />
            )}
            {pant.status === PantStatus.Claimed && (
              <Image style={styles.canIcon} source={canGrayIcon} />
            )}
          </MapView.Marker>
        ))}
        {stations.map(station => (
          <MapView.Marker
            key={station.id}
            coordinate={station.location}
            title={station.name}
            description={`Öppettider: ${station.openingHours}`}
          />
        ))}
      </MapView>
      <PantInfoPopUp modal={modal} hideModal={hideModal} pant={selectedPant} />
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
  canIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain"
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
