import firebase from 'firebase'
import 'firebase/auth'

import * as Facebook from 'expo-facebook';
import uuid from 'uuid';


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
