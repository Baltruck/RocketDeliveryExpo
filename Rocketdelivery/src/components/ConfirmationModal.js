import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import redirApi from "../components/NgrokUrl";
import { CheckBox } from "react-native-elements";


import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

//add icon
import { FontAwesome } from "@expo/vector-icons";


const ConfirmationModal = ({ modalVisible, setModalVisible, orderDetails }) => {
  const [emailCheckbox, setEmailCheckbox] = useState(false);
  const [phoneCheckbox, setPhoneCheckbox] = useState(false);

  console.log("Order details:", orderDetails);
  console.log("Products in ConfirmationModal:", orderDetails.products);
  const { restaurant, products } = orderDetails;

  // Check if products are defined, if not return null
  if (!products) {
    console.log("Products are undefined");
    return null;
  }

  //function to handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
  
      let confirmation_message;
      if (emailCheckbox && phoneCheckbox) {
        confirmation_message = "both";
      } else if (emailCheckbox) {
        confirmation_message = "email";
      } else if (phoneCheckbox) {
        confirmation_message = "phone";
      } else {
        confirmation_message = "none";
      }
  
      // Exemple of data to send to the API
      const data = {
        restaurant_id: restaurant.id,
        customer_id: customerId,
        products: products
          .filter((item) => item.quantity > 0)
          .map((item) => ({
            id: item.id,
            quantity: item.quantity,
            cost: item.cost,
          })),
        confirmation_message: confirmation_message,
      };
  
      // POST request to the API
      const response = await fetch(`${redirApi}api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Get the response data
      const responseData = await response.json();
  
      if (response.ok) {
        // Get the order ID from the response data
        const order_id = responseData.order_id;
  
        setOrderStatus("success");
        setTimeout(() => {
          resetModal();
          setModalVisible(false);
        }, 3000);
      } else {
        setOrderStatus("failure");
      }
    } catch (error) {
      console.error("Error while sending order:", error);
      setOrderStatus("failure");
    }
  };
  

  const resetModal = () => {
    setOrderStatus("pending");
  };

  // RenderOrderButton function to display the different states
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
            disabled={orderStatus === "processing" || (!emailCheckbox && !phoneCheckbox)}
          >
            <Text style={styles.confirmOrderButtonText}>
              {emailCheckbox || phoneCheckbox ? "CONFIRM ORDER" : "IN PROGRESS"}
            </Text>
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
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Order Confirmation</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.orderSummary}>Order Summary</Text>

          {products
            .filter((item) => item.quantity > 0)
            .map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x {item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  ${((item.cost * item.quantity) / 100).toFixed(2)}
                </Text>
              </View>
            ))}

          <View style={styles.lineSeparator} />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              TOTAL: $ {(totalCost / 100).toFixed(2)}
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
  <Text style={styles.confirmationText}>
    Would you like to receive your order confirmation by email and/or text?
  </Text>
  <View style={styles.checkboxes}>
    <CheckBox
      title="By Email"
      checked={emailCheckbox}
      onPress={() => setEmailCheckbox(!emailCheckbox)}
      containerStyle={styles.checkbox}
    />
    <CheckBox
      title="By Phone"
      checked={phoneCheckbox}
      onPress={() => setPhoneCheckbox(!phoneCheckbox)}
      containerStyle={styles.checkbox}
    />
  </View>
</View>


          {renderOrderButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  checkboxContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  checkboxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
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
  header: {
    backgroundColor: "#222126",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 10,
    padding: 10,
    paddingBottom: 20,
    width: "108%",
    top: -10,
  },
  modalTitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "Oswald-Regular",
    fontSize: 20,
    marginLeft: 10,
  },
  orderSummary: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 10,
    fontFamily: "Oswald-Regular",
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  itemName: {
    flex: 1,
    textAlign: "left",
    fontSize: 14,
  },
  itemQuantity: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  itemPrice: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
  },
  itemText: {
    fontSize: 16,
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
    backgroundColor: "#DA583B",
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
    color: "#609475",
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
    color: "#851919",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  closeButton: {
    position: "absolute",
    top: 25,
    right: 25,
  },
});

export default ConfirmationModal;
