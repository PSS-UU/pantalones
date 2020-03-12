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
import { PantStatus } from "../constants/PantStatus";


const RaterPopUp = ({ hideModal, showRater, setShowRater, previous_rating, rating_count }) => {
const db = firebase.database();
const user = firebase.auth().currentUser;

var starCountRef = db.ref('user_info/' + user.uid);

const newAverageRating = (newRating, oldRating, amount) => {
  return (oldRating*amount+newRating)/(amount+1)
  };

const handleRate = (rating) => {
  const newRating = newAverageRating(rating, previous_rating, rating_count);
  starCountRef.set({total_rating: newRating, rating_count: rating_count+1});
  setShowRater(false);
  hideModal();
};

const closeModals = () => {
  setShowRater(false);
  hideModal();
};

  return(  
  <Modal
    transparent={false}
    visible={showRater}
    //fix
    onBackdropPress={() => {
      setShowRater(false);
    }}
    >
    <View>
    <Text>Rate the user:</Text>
    <StarRating   
      rating={5}
      selectedStar={(rating) => handleRate(rating)}
      fullStarColor={"#FADA6D"}
      emptyStarColor={"#FADA6D"}>
      </StarRating>
      <Button
          title="Cancel" 
          onPress={() => closeModals()}
      />
    </View>
    </Modal>
    );
  }

const PantStatusButton = ({ hideModal, pant, total_rating, previous_rating, rating_count }) => {
  const db = firebase.database();
  const user = firebase.auth().currentUser;
  const [showRater, setShowRater] = useState(false);
  
  var starCountRef = db.ref('user_info/' + user.uid);
  

  const newAverageRating = (newRating, oldRating, amount) => {
    return (oldRating*amount+newRating)/(amount+1)
    };

  const updateRating = (count, total, old) => {
    Alert.alert("Not implemented", "Scan is not yet implemented.");
    const newRating = newAverageRating(total_rating, previous_rating, rating_count);
    starCountRef.set({total_rating: newRating, rating_count: rating_count+1});
  };

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
                .update({ status: PantStatus.Claimed });
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
          onPress={() => {setShowRater(true);}}
        >
          <Text style={globalStyles.buttonText}>Scanna!</Text>
          <RaterPopUp hideModal = {hideModal} showRater = {showRater} setShowRater = {setShowRater} total_rating ={total_rating} previous_rating = {previous_rating} rating_count = {rating_count} ></RaterPopUp>

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
  const [userName, setUserName] = useState("Användare");

  const user = firebase.auth().currentUser;
  const userRef = firebase.database().ref(`users/${user.uid}`);
  const db = firebase.database();
  var starCountRef = db.ref('user_info/' + user.uid);


  useEffect(() => {
    starCountRef.once('value', function(ratingSnapshot) {
      if(ratingSnapshot.val()!= null){
      setStarCount(ratingSnapshot.val().total_rating);
      setRatingCount(ratingSnapshot.val().rating_count);
        }    
      });
  });

  const onRatingPress = (rating, starCount) => {
    setNewRating(rating);
  };


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
      //setUserName(snapshot.val().name);
    });
  });

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
      rating={starCount}
      selectedStar={(rating) => onRatingPress(rating, starCount)}
      fullStarColor={"#FADA6D"}
      emptyStarColor={"#FADA6D"}>
      </StarRating>
              </View>
            </View>
          </View>
          <PantStatusButton pant={pant} hideModal={hideModal} total_rating={newRating} previous_rating={starCount} rating_count={ratingCount}  />
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