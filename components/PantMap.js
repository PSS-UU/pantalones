import React, { useState } from 'react';
import MapView from "react-native-maps";
import { Modal, Dimensions, StyleSheet, TouchableHighlight, View, Text, Alert} from "react-native";
import { EmailInput } from './EmailInput.js';
import { PasswordInput } from './PasswordInput.js';

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
        coordinate={{latitude: 59.8150,
        longitude: 17.6629}}
        title={"SLU"}
        description={"example marker"}
        onPress={() => setModal(true)}
        >
       <MapView.Callout tooltip style={styles.customView}>
          <TouchableHighlight>
          <View>
          </View>
          </TouchableHighlight>
        </MapView.Callout>
    </MapView.Marker>
    </MapView>
    <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          >
          <View style={{backgroundColor: "white", height: '50%', width: '50%', justifyContent: "center", alignContent: "center"}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight
                onPress={() => {
                  setModal(!modal);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
