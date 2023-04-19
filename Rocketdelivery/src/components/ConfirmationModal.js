import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ConfirmationModal = ({ modalVisible, setModalVisible, orderDetails }) => {
    console.log("Order details:", orderDetails);
    // const { restaurant, products, orderItems } = orderDetails;
  
   // Check if products and orderItems are defined, if not return null
//   if (!products || !orderItems) {
//     console.log("Products or orderItems are undefined");
//     return null;
//   }
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
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      console.warn(`Product with ID ${item.productId} not found in products list.`);
      return total;
    }
    return total + product.cost * item.quantity;
  }, 0);

  
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
  .map((item) => {
    const product = item;
    if (!product) {
      console.warn(`Product with ID ${item.id} not found in products list.`);
      return null;
    }
    return (
      <View key={item.id} style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {product.name} x {item.quantity} - $
          {((product.cost * item.quantity) / 100).toFixed(2)}
        </Text>
      </View>
    );
  })}

  
            <View style={styles.lineSeparator} />
  
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                TOTAL: $ {(totalCost / 100).toFixed(2)}
              </Text>
            </View>
  
            <TouchableOpacity
              style={styles.confirmOrderButton}
              onPress={() => {
                setModalVisible(false);
                // Perform any additional actions after confirming the order
              }}
            >
              <Text style={styles.confirmOrderButtonText}>CONFIRM ORDER</Text>
            </TouchableOpacity>
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
  });
  

export default ConfirmationModal;
