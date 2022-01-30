import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/LoginScreen';
import Home from './src/pages/Home';
import Poster from './src/pages/Post';
import { AppProvider } from './src/commons/AppContext';
import { AppContext } from './src/commons/AppContext';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const { user } = AppProvider(AppContext);

  return (
      <NavigationContainer>
        <AppProvider>
          <Stack.Navigator initialRouteName={user != null ? 'Home' : 'Login'} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Posting" component={Poster}/>
          </Stack.Navigator>
        </AppProvider>
      </NavigationContainer>
  );
}
