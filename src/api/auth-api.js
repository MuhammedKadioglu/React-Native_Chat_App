import firebase from 'firebase'
import 'firebase/auth'

import * as Facebook from 'expo-facebook';
import uuid from 'uuid';


firebase.initializeApp({
      apiKey: "AIzaSyCgomg2cFIcBKeWYzvzEt_RRXACA7Ow6hI",
    authDomain: "android-b0813.firebaseapp.com",
    databaseURL: "https://android-b0813-default-rtdb.firebaseio.com",
    projectId: "android-b0813",
    storageBucket: "android-b0813.appspot.com",
    messagingSenderId: "246058769113",
    appId: "1:246058769113:web:38de67b45bbe16d503fcc8",
    measurementId: "G-E7GB2RTY0J",
    facebookAppId: "470526873952355",
    });
export const logoutUser = () => {
  firebase.auth().signOut()
}

export const signInUser = async ({ name, email, password }) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    firebase.auth().currentUser.updateProfile({
      displayName: name,
    })
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
export const loginFacebook = async () => {
  
    
    await Facebook.initializeAsync("470526873952355");
    
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
          { permissions:['public_profile', 'email'] },
        );
        if (type == 'success') {
  
          const credential = firebase.auth.FacebookAuthProvider.credential(token)
    
          firebase.auth().signInWithCredential(credential).catch((error) => {
            console.log(error)
          })
        }
    
}


export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return {}
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
