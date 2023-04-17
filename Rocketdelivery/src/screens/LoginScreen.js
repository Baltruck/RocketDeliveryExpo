import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { useState } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigation.navigate('Home');
      } else {
        setError('Invalid email or password');
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your primary email here"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="************"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="LOG IN" onPress={handleLogin} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginVertical: 10,
      width: '80%',
    },
    error: {
      color: 'red',
      marginVertical: 10
    }
  });

export default LoginScreen;
