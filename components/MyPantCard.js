import React from "react";
import firestore from "@react-native-firebase/firestore";

function PantCard({ cans }) {
  return <Text title={cans} />;
}

export default React.memo(PantCard);
