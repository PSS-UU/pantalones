const firebase = require("firebase");

require("dotenv").config();

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  projectId: process.env.PROJECT_ID
});

const db = firebase.firestore();

const saveDocument = async (collection, id, document) => {
  try {
    const doc = await db.collection(collection).add(document);
    console.log(`Successfully added document ${doc.id}!`);
  } catch (error) {
    console.error(
      `Failed to store document '${id}' in collection '${collection}'!`
    );
    console.error(error);
  }
};

const stations = {
  station1: {
    id: "station1",
    name: "Station 1",
    address: "Awesome street 1",
    location: {
      latitude: 59.8458537,
      longitude: 17.6338865
    },
    openingHours: "Mån-Fre: 08:00-17:00"
  },
  station2: {
    id: "station2",
    name: "Station 2",
    address: "Awesome street 2",
    location: {
      latitude: 59.8486976,
      longitude: 17.5957231
    },
    openingHours: "24/7"
  }
};

for (const [id, station] of Object.entries(stations)) {
  db.collection("stations")
    .doc(id)
    .set(station)
    .then(ref => {
      console.log(`Created/update stations ${id}!`);
    })
    .catch(error => console.error(error));
}
