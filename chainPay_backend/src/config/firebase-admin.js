const admin = require('firebase-admin');

// Initialize Firebase Admin with the service account
const serviceAccount = require('../../chainPay_p_keyjson');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, auth, db };
