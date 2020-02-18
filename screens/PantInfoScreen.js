import * as firebase from "firebase";
//import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
//import React, { useState } from 'react';

import { MonoText } from "../components/StyledText";

//är detta rätt? Behöver jag states? more like const right vad är skillnaden va
export default function PantInfoScreen() {
  const [name, setName] = useState("Elisabeth");
  const [value, setValue] = useState(10);
  const [address, setAddress] = useState("luthagsesplanaden");
  return (
    <div>
    <button>Press to get pop up</button>
    </div>
  );
}