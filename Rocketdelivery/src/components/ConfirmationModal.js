import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Modal, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";

//add icon
import { FontAwesome } from '@expo/vector-icons';

const ConfirmationModal = ({ modalVisible, setModalVisible, orderDetails }) => {
    console.log("Order details:", orderDetails);
    console.log("Products in ConfirmationModal:", orderDetails.products);
const { restaurant, products } = orderDetails;
  
  // Check if products are defined, if not return null
  if (!products) {
    console.log("Products are undefined");
    return null;
  }
  
   // Calculate the total cost
const totalCost = products
.filter((item) => item.quantity > 0)
.reduce((total, item) => {
  if (!item) {
    console.warn(`Product with ID ${item.id} not found in products list.`);
    return total;
  }
  return total + item.cost * item.quantity;
}, 0);

//new
const [orderStatus, setOrderStatus] = useState("pending");

// Function to handle the order confirmation
const handleConfirmOrder = async () => {
    setOrderStatus("processing");

    try {
        // Get the customer ID from local storage
        const customerId = await AsyncStorage.getItem("customer_id");

        if (!customerId) {
            console.error("Customer ID not found in local storage");
            setOrderStatus("failure");
            return;
          }

      // Exemple of data to send to the API
      const data = {
        restaurant_id: restaurant.id,
        customer_id: customerId,
        products: products
          .filter((item) => item.quantity > 0)
          .map((item) => ({
            product_id: item.id,
            product_quantity: item.quantity,
            product_unit_cost: item.cost,
          })),
      };

      // POST request to the API
      const response = await fetch("https://2ee4-74-50-186-92.ngrok-free.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setOrderStatus("success");
      } else {
        setOrderStatus("failure");
      }
    } catch (error) {
      console.error("Error while sending order:", error);
      setOrderStatus("failure");
    }
  };

  // 2. Modify the renderOrderButton function to display the different states
  const renderOrderButton = () => {
    switch (orderStatus) {
      case "processing":
        return (
          <View style={styles.processingOrderButton}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.processingOrderButtonText}>
              PROCESSING ORDER...
            </Text>
          </View>
        );
      case "success":
        return (
          <View style={styles.successMessage}>
            <FontAwesome name="check" size={24} color="green" />
            <Text style={styles.successMessageText}>
              Thanks you! Your order has been received.
            </Text>
          </View>
        );
      case "failure":
        return (
          <View style={styles.failureMessage}>
            <FontAwesome name="times" size={24} color="red" />
            <Text style={styles.failureMessageText}>
              Your order was not processed successfully. Please try again.
            </Text>
          </View>
        );
      default:
        return (
          <TouchableOpacity
            style={styles.confirmOrderButton}
            onPress={handleConfirmOrder}
            disabled={orderStatus === "processing"}
          >
            <Text style={styles.confirmOrderButtonText}>CONFIRM ORDER</Text>
          </TouchableOpacity>
        );
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Order Confirmation</Text>
          <Text style={styles.orderSummary}>Order Summary</Text>

          {products
    .filter((item) => item.quantity > 0)
    .map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.name} x {item.quantity} - $
          {((item.cost * item.quantity) / 100).toFixed(2)}
        </Text>
      </View>
  ))}

          <View style={styles.lineSeparator} />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              TOTAL: $ {(totalCost / 100).toFixed(2)}
            </Text>
          </View>

          {/* Afficher le bouton de commande en fonction de l'état de la commande */}
          {renderOrderButton()}
        </View>
      </View>
    </Modal>
  );
};

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      width: "90%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    orderSummary: {
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "flex-start",
      marginBottom: 10,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 5,
    },
    itemText: {
      fontSize: 14,
    },
    lineSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      width: "100%",
      marginVertical: 10,
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
    },
    totalText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    confirmOrderButton: {
      backgroundColor: "#e67e22",
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      width: "100%",
    },
    confirmOrderButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    processingOrderButton: {
        backgroundColor: "#e67e22",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
      },
      processingOrderButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 5,
      },
      successMessage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
      },
      successMessageText: {
        color: "green",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 5,
      },
      failureMessage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
      },
      failureMessageText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 5,
      },
  });
  

export default ConfirmationModal;
