import React, { useState } from 'react';
import { Modal, Dimensions, StyleSheet, TouchableHighlight, View, Text, Image} from "react-native";
import StarRating from 'react-native-star-rating';

export default function PantInfoPopUp(props) {
  return (
    <Modal
    transparent={true}
    visible={props.modal}
    //fix
    onBackdropPress={() => {
      props.setModal(false);
    }}
    >

<View style={styles.modalContent}>
    <View style={styles.popup}>
      <View style={styles.container}>
        <Text style={styles.title}>
          PANT
        </Text>
        <TouchableHighlight
          style={styles.cross}
          onPress={() => {
            props.setModal(false);
            console.log("modal:")
            console.log(props.modal)
          }}>
          <Text>X</Text>
        </TouchableHighlight>
      </View>
      <Text>
          Distance
      </Text>
      <View style={styles.container}>
        <View style={styles.pantAmount}>
            <Image style={styles.icon} source={require('../assets/images/can.png')}/>
            <Text>Burkar</Text>
        </View>
        <View style={styles.pantAmountCenter}>
            <Image style={styles.icon} source={require('../assets/images/can.png')}/>
            <Text>Flaskor</Text>
        </View>
        <View style={styles.pantAmount}>
            <Image style={styles.icon} source={require('../assets/images/can.png')}/>
            <Text>Kronor</Text>
        </View>
      </View>
      <View>
        <Image style={styles.icon} source={require('../assets/images/can.png')}/>
        <Text>Name</Text>
      </View>
      <StarRating></StarRating>
    </View>
  </View>
</Modal>

    
);
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    },
    container: {
      flexDirection: 'row',
      alignItems: "flex-start",
    },
    cross: {
      alignItems: "flex-end",
      flex: 1,
    },
    title: {
      flex:1,
    },
    icon:{
      width: 32,
      height: 40,
    },
    popup: {
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '10%',
      borderRadius: 10,
      backgroundColor: "white", 
      height: '90%', 
      width: '90%', 
    }, 
    modalContent: {
      alignItems: 'center',
      margin: 0
    },
    pantAmountCenter: {
      alignItems: "center",
      flex: 1,
    },
  });