import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../globalStyles';
import { useNavigation } from '@react-navigation/native';


const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footerContainer}>
      <Text style={globalStyles.title}>Mon footer2</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
        <Text style={styles.footerText}>Restaurants</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#f4511e',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Footer;

