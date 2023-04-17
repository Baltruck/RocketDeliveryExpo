// src/screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../globalStyles';


function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Titre avec la police Oswald</Text>
      <Text style={styles.body}>Texte avec la police Arial</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
