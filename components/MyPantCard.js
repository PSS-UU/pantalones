import React from "react";
import firestore from "@react-native-firebase/firestore";

function MyPantCard({ value }) {
  console.log("in cans" + value);
  return (
    <View>
      <Text style={styles.title}>{value}</Text>
    </View>
  );
}

export default MyPantCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
