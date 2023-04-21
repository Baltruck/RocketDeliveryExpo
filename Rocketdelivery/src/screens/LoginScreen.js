import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import redirApi from "../components/NgrokUrl";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key} to AsyncStorage:`, error);
  }
};

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const handleLogin = () => {
    fetch(`${redirApi}api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Stock the user_id, customer_id in local storage
          storeData("user_id", data.user_id.toString());
          storeData("customer_id", data.customer_id.toString());

          // navigation.navigate('Restaurants');
          navigation.navigate("Home", { screen: "Restaurants" });
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
});

export default LoginScreen;
