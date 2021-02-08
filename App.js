import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { IconButton } from 'react-native-paper';
import firebase from 'firebase'
import 'firebase/auth';
import {logoutUser} from './src/api/auth-api';
import { theme } from './src/core/theme';
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  chat,
  AddChatRoom,
} from './src/screens'
import { FIREBASE } from './src/core/config'



const Stack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE)
}


const App = () => {
  return (

    <Provider theme={theme}>
    
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
        headerStyle: {
          backgroundColor: 'black'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}
        >
          <Stack.Screen options={{ headerShown: false, }}
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen options={{ headerShown: false, }}  name="StartScreen" component={StartScreen} />
          <Stack.Screen options={{ headerShown: false, }} name="LoginScreen" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false, }} name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen  name='Dashboard'
                          component={Dashboard}
                          options={({ navigation }) => ({
                            title: 'Sohbetler',
                            headerRight: () => (
                              <IconButton
                                icon='plus'
                                size={28}
                                color='#ffffff'
                                onPress={() => navigation.navigate('AddChatRoom')}
                              />
                            ),
                            headerLeft: () => (
                              <IconButton
                                icon='logout'
                                size={28}
                                color='red'
                                onPress={() => logoutUser()}
                              />
                            )
                          })} />
          <Stack.Screen name='chat'
                        component={chat}
                        options={({ route }) => ({
                        title: route.params.thread.name
        })} />
          <Stack.Screen options={{ headerShown: false, }}name="AddChatRoom" component={AddChatRoom} />
          <Stack.Screen options={{ headerShown: false, }}
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
