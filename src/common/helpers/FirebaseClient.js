import firebase from 'firebase'
import config from '../../config'

firebase.initializeApp(config.firebase)

export const firebaseAuth = firebase.auth()
export const firebaseDb = firebase.database()

// FB Firebase Login
const fbProvider = new firebase.auth.FacebookAuthProvider()
fbProvider.addScope('email')
fbProvider.addScope('public_profile')

// Google Firebase Login
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('email')
googleProvider.addScope('profile')

// Twitter Firebase Login
const twitterProvider = new firebase.auth.TwitterAuthProvider()

export function firebaseGetUser(uid) {
  return new Promise((resolve, reject) => {
    firebaseDb
      .ref(`users/${uid}`)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val()

        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function firebaseGetRedirectResult() {
  return firebaseAuth.getRedirectResult().then(result => {
    let toReturn = false

    //console.log('result =>', result)

   // localStorage.setItem('fireBaseResults', JSON.stringify(result));

    if (result && result.user) {
      /*
       * check for email
       * if is null
       * check for email in data porvider
       */

      if (result.user.email) {
        toReturn = { uid: result.user.uid, email: result.user.email }
      } else if (Array.isArray(result.user.providerData)) {
        result.user.providerData.map(item => {
          toReturn = { uid: result.user.uid, email: item.email }
        })
      }
    }

    return toReturn
  })
}

export function firebaseLoginWithFacebbok() {
 
  firebase.auth().signInWithRedirect(fbProvider)
}

export function firebaseLoginWithGoogle() {
  
  firebase.auth().signInWithRedirect(googleProvider) 
}

export function firebaseLoginWithTwitter() {
  
  firebase.auth().signInWithRedirect(twitterProvider);
  // return new Promise((resolve, reject) => {
  //   firebase
  //     .auth()
  //     .signInWithPopup(twitterProvider)
  //     .then(result => {
  //       const data = {
  //         email: result.user.email,
  //         name: result.user.displayName,
  //         uid: result.user.uid,
  //       }

  //       resolve(data)
  //     })
  //     .catch(error => {
  //       reject(error)
  //     })
  // })
}

export function firebaseLogin(email, pw) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(result => {
        const data = {
          email: result.email,
          refreshToken: result.refreshToken,
          uid: result.uid,
          data: result,
        }

        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function firebaseLoginWithToken(customToken) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithCustomToken(customToken)
      .then(result => {
        const data = {
          email: result.email,
          refreshToken: result.refreshToken,
          uid: result.uid,
        }

        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function firebaseLogout() {
  localStorage.removeItem('firebaseUserId');
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // hard refresh after logOut to reset firebase redirect result
        window.location.href = '/'
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function firebaseUpdatePassword(newPwd) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.updatePassword(newPwd)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function firebaseResetPassword(email) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function refreshToken(forceRefresh = false) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getToken(forceRefresh)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function firebaseReauthenticate(password) {
  const credential = firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser.email,
    password
  )

  return firebase.auth().currentUser.reauthenticateWithCredential(credential)
}
