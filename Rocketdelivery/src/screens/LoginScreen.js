import React from "react";
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, Dimensions, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import redirApi from "../components/NgrokUrl";

const screenWidth = Dimensions.get("window").width;

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

  // OLD 
  // const handleLogin = () => {
  //   fetch(`${redirApi}api/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         // Stock the user_id, customer_id in local storage
  //         storeData("user_id", data.user_id.toString());
  //         storeData("customer_id", data.customer_id.toString());

  //         // navigation.navigate('Restaurants');
  //         navigation.navigate("Home", { screen: "Restaurants" });
  //       } else {
  //         setError("Invalid email or password");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // NEW
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
          // Stock the user_id, customer_id, courier_id in local storage
          storeData("user_id", data.user_id.toString());
          storeData("customer_id", data.customer_id.toString());
          storeData("courier_id", data.courier_id.toString());
  
          // Check for valid customer_id and courier_id
          const validCustomerId = data.customer_id !== null && data.customer_id !== 0;
          const validCourierId = data.courier_id !== null && data.courier_id !== 0;
  
          if (validCustomerId && validCourierId) {
            // navigation.navigate("AccountSelectorScreen");
            navigation.navigate("Home", { screen: "AccountSelectorScreen" });

          } else if (validCustomerId) {
            storeData("user_type", "customer");
            // navigation.navigate("RestaurantsScreen");
            navigation.navigate("Home", { screen: "Restaurants" });
          } else if (validCourierId) {
            storeData("user_type", "courier");
            // navigation.navigate("CourierScreen");
            navigation.navigate("Home", { screen: "CourierScreen" });
          } else {
            setError("Invalid account type");
          }
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
      <Image
        source={require("../../assets/Images/AppLogoV2.png")}
        style={styles.logo}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to begin</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your primary email here"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: screenWidth * 0.8,
    resizeMode: "contain",
    marginBottom: 10,
  },
  card: {
    // backgroundColor: "rgba(34, 33, 38, 0.7)",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "flex-start",
    borderColor: "#ccc",
    borderWidth: 1,
    width: screenWidth * 0.8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Oswald-Regular',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#DA583B",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontFamily: 'Oswald-Regular',
  },
});

export default LoginScreen;
