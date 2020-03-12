const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createPant = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(403).json({
      status: 403,
      message: 'Forbidden HTTP method.'
    })
  }

  const pant = {
    location: {
      latitude: null,
      longitude: null
    },
    estimatedValue: 0,
    message: null,
    privateMessage: null,
    cans: 0,
    flasks: 0,
    ...request.body,
    claimedUserId: null,
    claimedAt: null,
    completedAt: null,
    status: "AVAILABLE",
  };
  try {
    await admin.firestore().collection('pants').add(pant);
    response.json({
      ...pant
    })
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: 'Something went wrong.'
    })
  }
});
