import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ConfirmationModal = ({ modalVisible, setModalVisible, orderDetails }) => {
  const handleConfirmation = () => {
    // Call API to confirm order and handle success/failure
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>CONFIRM ORDER</Text>
          <Text style={styles.modalText}>Restaurant: {orderDetails.restaurant.name}</Text>
          <Text style={styles.modalText}>Total: ${orderDetails.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirmation()}>
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#e67e22",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    minWidth: 150,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    minWidth: 150,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ConfirmationModal;
