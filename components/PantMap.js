import React, { useState } from 'react';
import MapView from "react-native-maps";
import { Modal, Dimensions, StyleSheet, TouchableHighlight, View, Text, Alert} from "react-native";
import { EmailInput } from './EmailInput.js';

export const PantMap = props => {
  const [modal, setModal] = useState(false)
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 59.8546514,
        longitude: 17.6327215,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}

    >
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
