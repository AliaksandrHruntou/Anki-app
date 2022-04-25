const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore')
const { sendCustomPasswordResetEmail } = require('firebase-admin/auth')

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return ({
      message: `Success! ${data.email} has been made an admin`
    })
  }).catch((error) => {
    return error;
  });
});

exports.getUsers = functions.https.onCall(async () => {
  const db = getFirestore()
  const usersSnap = await db.collection("users").get();
  const usersData = usersSnap.docs.map(doc => {
    const data = { ...doc.data() }

    return ({ 
      email: data.email,
      isAdmin: data.isAdmin,
      nickname: data.nickname,
      online: data.online,
      settings: data.settings,
      userId: doc.id
    })
  })

  return usersData;
});

exports.createUser = functions.https.onCall((data) => {
  return admin.auth().createUser({
    email: data.email,
    password: data.password
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
})

exports.resetPassword = functions.https.onCall((data) => {
  return admin.auth().updateUser(data.uid, {
    password: data.newPassword
  })
})

exports.resetEmail = functions.https.onCall((data) => {
  return admin.auth().updateUser(data.uid, {
    email: data.newEmail
  })
})

exports.deleteUser = functions.https.onCall((data) => {
  return admin.auth().deleteUser(data.uid)
})