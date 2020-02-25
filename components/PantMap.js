import React, { useState } from 'react';
import MapView from "react-native-maps";
import { Modal, Dimensions, StyleSheet, TouchableHighlight, View, Text, Image} from "react-native";
import StarRating from 'react-native-star-rating';
import PantInfoPopUp from './PantInfoPopUp';

export const PantMap = props => {
  const [modal, setModal] = useState(false)
  
  return (
  <View>
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
        //flytta koordinater
        coordinate={{latitude: 59.8150,
        longitude: 17.6629}}
        title={"SLU"}
        description={"example marker"}
        onPress={() => setModal(true)}
        pinColor = {'aqua'}
    >
       <MapView.Callout>
          <TouchableHighlight>
          <View>
          </View>
          </TouchableHighlight>
        </MapView.Callout>
    </MapView.Marker>
    </MapView>
    <PantInfoPopUp modal={modal} setModal={setModal}></PantInfoPopUp>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
});
