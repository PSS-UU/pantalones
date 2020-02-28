import React, { useState, useEffect } from "react";
import {
  Modal,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ImageBackground
} from "react-native";
import StarRating from "react-native-star-rating";
import firebase from "firebase";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";
import cansIcon from "../assets/images/can.png";

export default function PantInfoPopUp({ pant, modal, setModal }) {
  const [imageUrl, setImageUrl] = useState();
  const [userName, setUserName] = useState("Användare");

  const user = firebase.auth().currentUser;
  const userRef = firebase.database().ref(`users/${user.uid}`);

  const profilePictureRef = firebase
    .storage()
    .ref()
    .child(`images/profiles/${user.uid}`);

  useEffect(() => {
    const getProfilePicture = async () => {
      const url = await profilePictureRef.getDownloadURL();
      setImageUrl(url);
    };
    getProfilePicture();

    userRef.once("value", function(snapshot) {
      setUserName(snapshot.val().name);
    });
  });

  async function paxaPant() {
    await ref.add({
      cans: cansCount,
      location: location,
      userId: user
    });
    setCanAmount(0);
    setModal(!modalVisible);
  }

  return (
    <Modal
      transparent={true}
      visible={modal}
      //fix
      onBackdropPress={() => {
        setModal(false);
      }}
    >
      <View style={styles.modalContent}>
        <View style={styles.popupBackground}>
          <Image
            source={require("../assets/images/background-wave.png")}
            style={styles.backgroundImage}
          />
          <View style={styles.modalContentContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalText}>Pant</Text>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Text style={{ color: "white" }}>X</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 20,
                alignItems: "center",
                marginTop: -12
              }}
            >
              <Image
                source={require("../assets/images/location.png")}
                style={{ width: 14, height: 20 }}
              />
              <Text style={styles.locationText}>2km bort</Text>
            </View>

            <View style={styles.displayPantContainer}>
              <View style={styles.pantAmountColumn}>
                <View style={styles.pantAmountRow}>
                  <Image style={styles.icon} source={cansIcon} />
                  <Text style={styles.amountText}>{pant.cans}</Text>
                </View>
                <Text style={styles.descriptionText}>burkar</Text>
              </View>
              <View style={styles.pantAmountColumn}>
                <View style={styles.pantAmountRow}>
                  <Image style={styles.icon} source={cansIcon} />
                  <Text style={styles.amountText}>{pant.cans}</Text>
                </View>
                <Text style={styles.descriptionText}>flaskor</Text>
              </View>
              <View style={styles.pantAmountColumn}>
                <View style={styles.pantAmountRow}>
                  <Image style={styles.icon} source={cansIcon} />
                  <Text style={styles.amountText}>{pant.cans}</Text>
                </View>
                <Text style={styles.descriptionText}>kronor</Text>
              </View>
            </View>
            <View style={styles.profileContainer}>
              <Image
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 300 / 2,
                  overflow: "hidden"
                }}
                source={{ uri: imageUrl }}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName}</Text>
                <StarRating
                  maxStars={5}
                  starSize={24}
                  rating={2}
                  fullStarColor={"#FADA6D"}
                  emptyStarColor={"#FADA6D"}
                  starStyle={styles.star}
                ></StarRating>
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={paxaPant}
            style={[globalStyles.lightGreenButton, styles.positionBottom]}
          >
            <Text style={globalStyles.buttonText}>Paxa pant!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  star: {
    marginRight: 5,
    paddingTop: 10
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modalContentContainer: {
    flex: 1,
    flexDirection: "column"
  },
  profileContainer: {
    marginTop: 120,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  profileName: {
    color: Colors.darkGrayText,
    fontSize: 22
  },
  profileInfo: {
    flexDirection: "column",
    marginLeft: 20
  },
  modalText: {
    fontSize: 32,
    color: Colors.mediumGreen,
    flex: 1,
    fontFamily: "fredoka-one"
  },

  pantAmountColumn: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    alignItems: "center"
  },
  pantAmountRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30
  },
  displayPantContainer: {
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "center"
  },

  locationText: {
    color: Colors.xLightGreen,
    paddingLeft: 18,
    fontSize: 16
  },

  amountText: {
    fontSize: 26,
    color: "white",
    paddingLeft: 10
  },

  descriptionText: {
    fontSize: 16,
    color: Colors.mediumGreen,
    paddingTop: 10
  },
  icon: {
    width: 32,
    height: 40
  },
  popupBackground: {
    borderRadius: 10,
    backgroundColor: "white",
    height: "90%",
    width: "90%"
  },
  modalHeaderContainer: {
    flexDirection: "row",
    padding: 20
  },
  positionBottom: {
    margin: 20
  },
  modalContent: {
    alignItems: "center",
    margin: 0,
    justifyContent: "center"
  },
  backgroundImage: {
    width: "100%",
    height: 300,
    position: "absolute",
    borderRadius: 10,
    right: 0,
    left: 0
  },
  pantAmountCenter: {
    alignItems: "center",
    flex: 1
  }
});
