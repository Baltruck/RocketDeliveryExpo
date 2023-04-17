// src/components/Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../globalStyles';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={globalStyles.title}>Mon footer2</Text>
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
  },
});

export default Footer;
