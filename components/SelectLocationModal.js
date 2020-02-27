import React, { useState } from "react";
import { PantModal } from "./PantModal";
import { PantMap } from "./PantMap";
import { Alert, View, StyleSheet, Text, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../AppStyles";

export const SelectLocationModal = props => {
  const [region, setRegion] = useState();
  const [visible, setVisible] = useState();

  const onSelectLocation = () => {
    console.log("onselectlocation");
    setVisible(false);
    props.onSelectLocation(region);
  };

  const footer = (
    <View>
    <Button 
    title="Välj plats"
    onPress={onSelectLocation}>
    </Button>
    </View>
  );

  return (
    <PantModal
      visible={visible}
      setVisible={setVisible}
      triggerText="Välj plats"
      headerText="Välj pantplats"
      footer={footer}
    >
      <View style={StyleSheet.absoluteFillObject}>
        <MaterialIcons
          name="location-on"
          size={42}
          style={styles.locationIcon}
        />
        <PantMap onRegionChangeComplete={newRegion => setRegion(newRegion)} />
      </View>
    </PantModal>
  );
};

const styles = StyleSheet.create({
  locationIcon: {
    zIndex: 3,
    position: "absolute",
    marginTop: 83,
    marginLeft: -21,
    left: "50%",
    top: "50%"
  },
  selectLocationButton: {
    zIndex: 10,
    alignItems: "center",
    position: "relative",
    margin: 20,
    padding: 10
  },
  locationButtonText: {
    color: '#ffffff'
  }
});
