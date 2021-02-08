import React from 'react'
import Background from '../components/Background'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import * as Facebook from 'expo-facebook';
import Expo from 'expo';
import { loginFacebook } from '../api/auth-api'
import firebase from 'firebase/app'
import 'firebase/auth'







const StartScreen = ({ navigation }) => (
  
  <Background>
    <Logo />
    <Header>HOŞGELDİN</Header>
    <Paragraph>

    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Giriş Yap
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Kayıt Ol
      </Button>
    <Button mode="facebook"
      title="Facebook Sign-In"
      onPress={() => loginFacebook().then(() => console.log('Signed in with Facebook!'))}
    >
      FaceBook İle Giriş
    </Button>
  </Background>
)



export default StartScreen
