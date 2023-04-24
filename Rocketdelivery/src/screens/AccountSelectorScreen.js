import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // do npm install react-native-vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";



const screenWidth = Dimensions.get("window").width;

// define user type
const setUserType = async (type) => {
    try {
      await AsyncStorage.setItem("user_type", type);
    } catch (error) {
      console.error("Error saving user type:", error);
    }
  };
  

const AccountSelectorScreen = () => {
  const navigation = useNavigation();

  const navigateToCustomerLogin = async () => {
    await setUserType("customer");
    navigation.navigate("Home", { screen: "Restaurants" });
  };
  
  const navigateToCourierLogin = async () => {
    await setUserType("courier");
    // change to real page
    // navigation.navigate("Home", { screen: "CourierScreen" });
    navigation.navigate("CourierScreen");
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Images/AppLogoV2.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Select Account Type</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={navigateToCustomerLogin}
          
        >
          <Icon name="user" size={50} color="#DA583B" />
          <Text style={styles.cardText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.card}
  onPress={navigateToCourierLogin}
>
  <Icon name="car" size={50} color="#DA583B" />
  <Text style={styles.cardText}>Courier</Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Oswald-Regular',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: screenWidth * 0.8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.35,
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Oswald-Regular',
    marginTop: 10,
  },
});

export default AccountSelectorScreen;
