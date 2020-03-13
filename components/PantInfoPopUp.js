import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
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
  ImageBackground,
  Alert
} from "react-native";
import StarRating from "react-native-star-rating";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";
import cansIcon from "../assets/images/can.png";
import flaskIcon from "../assets/images/flask.png";
import moneyIcon from "../assets/images/money.png";
import { PantStatus } from "../constants/PantStatus";

const PantStatusButton = ({ hideModal, pant }) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser.uid;

  const claimPant = () => {
    Alert.alert(
      "Claima pant",
      "Är du säker på att du vill claima denna panten?",
      [
        {
          text: "Avbryt",
          onPress: () => {}
        },
        {
          text: "Claima",
          onPress: async () => {
            try {
              await db
                .collection("pants")
                .doc(pant.id)
                .update({ status: PantStatus.Claimed, claimedUserId: user });
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Error!");
            }
            hideModal();
          }
        }
      ]
    );
  };

  switch (pant.status) {
    case PantStatus.Available:
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={claimPant}
          style={[globalStyles.lightGreenButton, styles.positionBottom]}
        >
          <Text style={globalStyles.buttonText}>Paxa pant!</Text>
        </TouchableOpacity>
      );
    case PantStatus.Claimed:
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[globalStyles.lightGreenButton, styles.positionBottom]}
          onPress={() =>
            Alert.alert("Not implemented", "Scan is not yet implemented.")
          }
        >
          <Text style={globalStyles.buttonText}>Scanna!</Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

export default function PantInfoPopUp({ pant, modal, hideModal }) {
  const [imageUrl, setImageUrl] = useState();
  const [userName, setUserName] = useState("Användare");

  const user = firebase.auth().currentUser;
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref(`users/${user.uid}`);

  const profilePictureRef = firebase.storage().ref();

  useEffect(() => {
    const getProfilePicture = async () => {
      try {
        const url = await profilePictureRef
          .child(`images/profiles/${user.uid}`)
          .getDownloadURL();
        setImageUrl(url);
      } catch (error) {}
    };

    getProfilePicture();

    userRef.once("value", function(snapshot) {
      if(snapshot.val()!= null){
        setUserName(snapshot.val().name);
          }  
      else{setUserName("")}
    });
  }, [user, pant]);

  return (
    <Modal
      transparent={true}
      visible={modal}
      //fix
      onBackdropPress={() => {
        hideModal();
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
              <TouchableOpacity onPress={() => hideModal()}>
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
              <Text style={styles.statusText}>{pant.status}</Text>
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
                  <Image style={styles.icon} source={flaskIcon} />
                  <Text style={styles.amountText}>{pant.flasks}</Text>
                </View>
                <Text style={styles.descriptionText}>flaskor</Text>
              </View>
              <View style={styles.pantAmountColumn}>
                <View style={styles.pantAmountRow}>
                  <Image style={styles.icon} source={moneyIcon} />
                  <Text style={styles.amountText}>{pant.estimatedValue}</Text>
                </View>
                <Text style={styles.descriptionText}>kronor</Text>
              </View>
            </View>
            <View style={styles.profileContainer}>
              <Image
                style={{
                  height: 70,
                  width: 70,
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
            <Text style={styles.pantComment}>{pant.message}</Text>
          </View>
          <PantStatusButton pant={pant} hideModal={hideModal} />
        </View>
      </View>
    </Modal>
  );
}

PantInfoPopUp.propTypes = {
  pant: PropTypes.object
};
PantInfoPopUp.defaultProps = {
  pant: {}
};

const styles = StyleSheet.create({
  star: {
    marginRight: 5,
    paddingTop: 10
  },
  pantComment: {
    color: "#7F7B8D",
    marginLeft: 20,
    marginTop: 20,
    fontSize: 18
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
    justifyContent: "center",
    marginHorizontal: 5
  },

  locationText: {
    color: Colors.xLightGreen,
    paddingLeft: 18,
    fontSize: 16
  },
  statusText: {
    color: Colors.xLightGreen,
    paddingRight: 18,
    position: "absolute",
    right: 0,
    // textAlign: 'right',
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
    width: 34,
    resizeMode: "contain",
    height: 48
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
