// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../globalStyles';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Détails')}>
        <Text style={styles.buttonText}>Voir les détails</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default HomeScreen;
