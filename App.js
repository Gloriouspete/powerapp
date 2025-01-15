import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './style';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Route } from './components/router';
import React from 'react';
import { useFonts } from 'expo-font';
import "./global.css"

export default function App() {
  const [fontsLoaded] = useFonts({
    'inter': require('./assets/font/Inter.ttf'),
    'inter-bold': require('./assets/font/Inter-Bold.ttf'),
    'inter-Light': require('./assets/font/Inter-Light.ttf'),
    'inter-SemiBold': require('./assets/font/Inter-SemiBold.ttf'),
    'inter-Thin': require('./assets/font/Inter-Thin.ttf'),
    'inter-Medium': require('./assets/font/Inter-Medium.ttf'),
    'inter-Black': require('./assets/font/Inter-Black.ttf'),
  });
  if(!fontsLoaded){
    return null;
  }
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Route />
      </GestureHandlerRootView>
    </>
  );
}

