import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AppNavigator from './src/AppNavigator';
import { useFonts } from 'expo-font';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
    'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
