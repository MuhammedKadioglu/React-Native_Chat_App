import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firebase from 'firebase';
import 'firebase/firestore';
import BackButton from '../components/BackButton'
import Background from '../components/Background'
import FormInput from '../components/TextInput';
import FormButton from '../components/Button';
import useStatsBar from '../components/useStatusBar';

export default function AddRoomScreen({ navigation }) {
  useStatsBar('dark-content');
  const [roomName, setRoomName] = useState('');

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (roomName.length > 0) {
      firebase.firestore()
        .collection('THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `Odaya giriş yaptınız ${roomName}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `Odaya giriş yaptınız ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Home');
        });
    }
  }
  return (
    <Background>
    <View style={styles.rootContainer}>
     
        <BackButton goBack={navigation.goBack} />
      
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Yeni Oda Yarat</Title>
        <FormInput
          label='Oda adı giriniz'
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <FormButton
         
          mode='contained'
          style={{ marginTop: 16 }}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        >
        Oluştur
        </FormButton>
        
      
      </View>
    </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  }
});