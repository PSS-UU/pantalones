import React, { useState } from 'react';
import MapView from "react-native-maps";
import { Dimensions, StyleSheet, TouchableHighlight, View, Text, Button } from "react-native";
import PantInfoPopUp from "./PantInfoPopUp.js";
import PantInfoScreen from "../screens/PantInfoScreen.js";
import { EmailInput } from './EmailInput.js';

export const PantMap = props => {
  const [modal, setModal] = useState(0);
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
    <MapView.Marker
        coordinate={{latitude: 59.8150,
        longitude: 17.6629}}
        title={"SLU"}
        description={"example marker"}
        >
       <MapView.Callout tooltip style={styles.customView}>
          <TouchableHighlight onPress= {()=>this.markerClick()} underlayColor='#dddddd'>
            <View style={styles.calloutText}>
            <PantInfoPopUp></PantInfoPopUp>
            <Text>{modal}
            </Text>
            </View>
          </TouchableHighlight>
        </MapView.Callout>
    </MapView.Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
