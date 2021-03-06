import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import {
  Modal,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import StarRating from "react-native-star-rating";
import Colors from "../constants/Colors";
import globalStyles from "../AppStyles";
import { PantStatus } from "../constants/PantStatus";
import { DisplayPantInfo } from "./DisplayPantInfo";
import closeModal from "../assets/images/close-modal.png";

const RaterPopUp = ({
  hideModal,
  showRater,
  setShowRater,
  previous_rating,
  rating_count
}) => {
  const database = firebase.database();
  const user = firebase.auth().currentUser;

  var starCountRef = database.ref("user_info/" + user.uid);

  const newAverageRating = (newRating, oldRating, amount) => {
    return (oldRating * amount + newRating) / (amount + 1);
  };

  const handleRate = rating => {
    if (isNaN(previous_rating) || isNaN(rating_count)) {
      previous_rating = 0;
      rating_count = 0;
    }
    const newRating = newAverageRating(rating, previous_rating, rating_count);
    starCountRef.set({
      total_rating: newRating,
      rating_count: rating_count + 1
    });
    setShowRater(false);
    hideModal();
  };

  const closeModals = () => {
    setShowRater(false);
    hideModal();
  };

  return (
    <Modal
      transparent={true}
      visible={showRater}
      //fix
      onBackdropPress={() => {
        setShowRater(false);
      }}
    >
      <View style={styles.starModalContent}>
        <View style={styles.raterBackground}>
          <Text style={styles.rateUserText}>Rate the user:</Text>
          <View style={styles.ratingContainer}>
            <StarRating
              rating={0}
              starSize={28}
              selectedStar={rating => handleRate(rating)}
              fullStarColor={"#FADA6D"}
              emptyStarColor={"#FADA6D"}
            ></StarRating>
          </View>
          <Button
            title="Cancel"
            onPress={() => closeModals()}
            color={Colors.lightGreen}
          />
        </View>
      </View>
    </Modal>
  );
};

const PantStatusButton = ({
  hideModal,
  pant,
  total_rating,
  previous_rating,
  rating_count
}) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser.uid;
  const [showRater, setShowRater] = useState(false);

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
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[globalStyles.lightGreenButton, styles.positionBottom]}
            onPress={() => {
              setShowRater(true);
            }}
          >
            <Text style={globalStyles.buttonText}>Scanna!</Text>
            <RaterPopUp
              hideModal={hideModal}
              showRater={showRater}
              setShowRater={setShowRater}
              total_rating={total_rating}
              previous_rating={previous_rating}
              rating_count={rating_count}
            ></RaterPopUp>
          </TouchableOpacity>
        </View>
      );
    default:
      return null;
  }
};

export default function PantInfoPopUp({ pant, modal, hideModal }) {
  const [imageUrl, setImageUrl] = useState();
  const [starCount, setStarCount] = useState(0);
  const [ratingCount, setRatingCount] = useState();
  const [newRating, setNewRating] = useState();
  const [pantImageUrl, setPantImageUrl] = useState();
  const [userName, setUserName] = useState("Användare");

  const user = firebase.auth().currentUser;
  const userRef = firebase.database().ref(`users/${user.uid}`);
  const database = firebase.database();
  var starCountRef = database.ref("user_info/" + user.uid);

  useEffect(() => {
    starCountRef.once("value", function(ratingSnapshot) {
      if (ratingSnapshot.val() != null) {
        setStarCount(ratingSnapshot.val().total_rating);
        setRatingCount(ratingSnapshot.val().rating_count);
      }
    });
  });

  const onRatingPress = rating => {
    setNewRating(rating);
  };

  const profilePictureRef = firebase.storage().ref();
  const pantPictureRef = firebase
    .storage()
    .ref()
    .child(`images/pant/undefined + ${pant.cans}`);

  useEffect(() => {
    const getPantPicture = async () => {
      try {
        const url = await pantPictureRef.getDownloadURL();
        setPantImageUrl(url);
      } catch (error) {}
    };
    getPantPicture();
  });

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
      if (snapshot.val() != null) {
        setUserName(snapshot.val().name);
      } else {
        setUserName("");
      }
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
                <Image
                  source={require("../assets/images/close-modal.png")}
                  style={{ width: 28, height: 40 }}
                />
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
            <DisplayPantInfo {...pant} />
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
                  rating={starCount}
                  starSize={28}
                  selectedStar={rating => onRatingPress(rating, starCount)}
                  fullStarColor={"#FADA6D"}
                  emptyStarColor={"#FADA6D"}
                ></StarRating>
              </View>
            </View>
            <Text style={styles.pantComment}>{pant.message}</Text>
            <View style={styles.addImageContainer}>
              <Image style={styles.addImage} source={{ uri: pantImageUrl }} />
            </View>
          </View>
          <PantStatusButton
            pant={pant}
            hideModal={hideModal}
            total_rating={newRating}
            previous_rating={starCount}
            rating_count={ratingCount}
          />
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

  addImageContainer: {
    flexDirection: "column",
    height: 130,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20
  },
  addImage: {
    position: "absolute",
    borderRadius: 10,
    width: "45%",
    height: "100%"
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
    margin: 20,
    justifyContent: "center"
  },
  starModalContent: {
    alignItems: "center",
    margin: 20,
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
  },
  raterBackground: {
    borderRadius: 10,
    backgroundColor: "white",
    height: "40%",
    width: "60%",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelRatingButton: {
    borderRadius: 10,
    color: "white"
  },
  ratingContainer: {
    marginHorizontal: 100
  },
  rateUserText: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    color: Colors.mediumGray,
    paddingTop: 10
  }
});
