import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const AccountPage = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchUserType = async () => {
    try {
      const type = await AsyncStorage.getItem("user_type");
      if (type) {
        setUserType(type.charAt(0).toUpperCase() + type.slice(1));
      }
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };

  useEffect(() => {
    fetchUserType();
  }, []);

  // Simulate fetching the email and phone number from the API
  useEffect(() => {
    setEmail("user@example.com");
    setSecondaryEmail("secondary@example.com");
    setPhone("555-123-4567");
  }, []);

  const handleUpdateAccount = () => {
    // Handle account update logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY ACCOUNT</Text>
      <Text style={styles.subTitle}>Logged In As: {userType}</Text>

      <Text style={styles.label}>Primary Email (Read Only)</Text>
      <TextInput style={styles.input} value={email} editable={false} />
      <Text style={styles.smallText}>Email used to login to the application</Text>

      <Text style={styles.label}>{userType} Email:</Text>
      <TextInput
        style={styles.input}
        value={secondaryEmail}
        onChangeText={setSecondaryEmail}
      />
      <Text style={styles.smallText}>
        Email used for your {userType} account
      </Text>

      <Text style={styles.label}>{userType} Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text style={styles.smallText}>
        Phone number for your {userType} account
      </Text>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateAccount}
      >
        <Text style={styles.updateButtonText}>UPDATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 25,
    //   fontWeight: "bold",
      marginBottom: 20,
      alignSelf: "flex-start",
      fontFamily: 'Oswald-Regular',
    },
    subTitle: {
      fontSize: 18,
      marginBottom: 20,
      alignSelf: "flex-start",
    },
    label: {
      fontSize: 16,
      alignSelf: "flex-start",
      marginBottom: 10,
    },
    input: {
      width: screenWidth * 0.9,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginBottom: 5,
    },
    smallText: {
        fontSize: 12,
        alignSelf: "flex-start",
        marginBottom: 20,
        color: "rgba(33, 33, 38, 0.6)",
      },
      updateButton: {
        backgroundColor: "#DA583B",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7,
        marginBottom: 20,
        marginTop: 15,
        alignSelf: "stretch",
        alignItems: "center",
      },
      updateButtonText: {
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "Oswald-Regular",
        marginBottom: 2,
      },
    });
    
    export default AccountPage;