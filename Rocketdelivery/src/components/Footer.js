import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import AccountPage from "../screens/AccountPage";


const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerElement}
        onPress={() => navigation.navigate("Restaurants")}
      >
        <FontAwesome5 name="hamburger" size={24} color="black" />
        <Text style={styles.footerText}>Restaurants</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerElement}
        onPress={() => navigation.navigate("OrderHistory")}
      >
        <FontAwesome5 name="history" size={24} color="black" />
        <Text style={styles.footerText}>OrderHistory</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.footerElement}
  onPress={() => navigation.navigate("AccountPage")}
>
  <FontAwesome5 name="user" size={24} color="black" />
  <Text style={styles.footerText}>Account</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
  footerElement: {
    alignItems: "center",
  },
  footerText: {
    color: "#000",
    fontSize: 16,
    marginTop: 5,
  },
});

export default Footer;
