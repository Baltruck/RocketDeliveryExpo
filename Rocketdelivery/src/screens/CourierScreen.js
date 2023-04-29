import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import redirApi from "../components/NgrokUrl";

const CourierScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  

  const changeOrderStatus = async (orderId, currentStatusName) => {
    if (currentStatusName.toLowerCase() === "delivered") {
        console.log("Status is already 'delivered', no action taken.");
        return;
      }
    const statusNameToId = {
      pending: 1,
      "in progress": 2,
      delivered: 3,
    };

    const currentStatusId = statusNameToId[currentStatusName];
    let newStatusId;

    if (currentStatusId === 1) {
      newStatusId = 2;
    } else if (currentStatusId === 2) {
      newStatusId = 3;
    } else {
      console.error("Invalid currentStatusName:", currentStatusName);
      return;
    }

    console.log(`newStatusId: ${newStatusId}`);

    try {
      const response = await fetch(`${redirApi}api/orders/${orderId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
          order_status_id: newStatusId,
        }),
      });

      if (response.ok) {
        console.log("Order status updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
          order.id === orderId
          ? { ...order, status: Object.keys(statusNameToId).find(key => statusNameToId[key] === newStatusId) }
          : order
          )
        );
      } else {
        console.error("Error updating order status:", response.statusText);
      }
    } catch (error) {
      console.error("Error in changeOrderStatus:", error);
    }
  };


  const renderStatusButton = (status, orderId) => {
    switch (status.toLowerCase()) {
      case "delivered":
        buttonColor = "green";
        buttonText = "Delivered";
        break;
      case "pending":
        buttonColor = "red";
        buttonText = "Pending";
        break;
      case "in progress":
        buttonColor = "orange";
        buttonText = "In Progress";
        break;
      default:
        buttonColor = "gray";
        buttonText = "Unknown";
    }

    return (
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: buttonColor, justifyContent: "center" },
          ]}
          onPress={() => changeOrderStatus(orderId, status)}
        >
          <Text style={[styles.statusButtonText, { color: "white" }]}>{buttonText.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    };
  
  
  
  

    const fetchOrders = async () => {
        try {
          const userId = await AsyncStorage.getItem("user_id");
    
          if (!userId) {
            console.error("User ID not found in local storage");
            return;
          }
    
          const response = await fetch(
            `${redirApi}api/orders?type=courier&id=${userId}`
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched orders:', data);
            setOrders(data);
          } else {
            console.error("Failed to fetch orders");
          }
        } catch (error) {
          console.error("Error while fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
  

  const renderOrder = ({ item }) => {
    console.log('Rendering order item:', item); 
  
    return (
        <View style={styles.orderRow}>
          <Text style={styles.orderIdCell}>{item.id}</Text>
          <Text style={styles.addressCell}>{item.customer_address}</Text>
          {renderStatusButton(item.status, item.id)}

          {/* <TouchableOpacity
  onPress={() => handleOrderView(order)}
>
  <MaterialCommunityIcons name="magnify-plus" size={24} color="black" />
</TouchableOpacity> */}

          <TouchableOpacity
            style={styles.viewCell}
            onPress={() => handleOrderView(item)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="magnify-plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      );
    };
  
  
  

    const handleOrderView = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };
    

  const renderModal = () => {
    if (!selectedOrder) {
      return null;
    }

    return (
        <>
          {modalVisible && <View style={styles.dimBackground} />}
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
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    DELIVERY DETAILS
                  </Text>
                  <Text style={styles.modalStatus}>
                    STATUS: {selectedOrder.status.toUpperCase()}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleCloseModal}
                  >
                    <FontAwesome name="times" size={24} color="white" />
                  </TouchableOpacity>
              </View>
              <View style={styles.modalInfoContainer}>
              <View style={styles.modalInfoRow}>
  <Text style={styles.modalInfoLabel}>Delivery Address:</Text>
  <Text style={[styles.modalInfoValue, {numberOfLines: 2}]}>{selectedOrder.customer_address}</Text>
</View>
<View style={styles.modalInfoRow}>
  <Text style={styles.modalInfoLabel}>Restaurant:</Text>
  <Text style={[styles.modalInfoValue, {numberOfLines: 2}]}>{selectedOrder.restaurant_name}</Text>
</View>
<View style={styles.modalInfoRow}>
  <Text style={styles.modalInfoLabel}>Order Date:</Text>
  <Text style={[styles.modalInfoValue, {numberOfLines: 2}]}>{selectedOrder.created_at}</Text>
</View>

</View>

              <View style={styles.modalProductsContainer}>
                <Text style={styles.modalInfoBold}>Order Details:</Text>
                {selectedOrder.products.map((products, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={[styles.modalText, styles.itemName]}>
                      {products.product_name}
                    </Text>
                    <Text style={[styles.modalText, styles.itemQuantity]}>
                      x{products.quantity}
                    </Text>
                    <Text style={[styles.modalText, styles.itemPrice]}>
                      {(products.total_cost / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.dividerLine} />
              <Text style={styles.modalTotal}>
                TOTAL: ${(selectedOrder.total_cost / 100).toFixed(2)}
              </Text>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY DELIVERIES</Text>
      <View style={styles.orderHeader}>
        <Text style={styles.orderHeaderCellOrderId}>ORDER ID</Text>
        <Text style={styles.orderHeaderCellAddress}>ADDRESS</Text>
        <Text style={styles.orderHeaderCellStatus}>STATUS</Text>
        <Text style={styles.orderHeaderCell}>VIEW</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {renderModal()}
      </View> 
  );
};


const styles = StyleSheet.create({
  dimBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalInfoRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    width: "70%",
  },
  modalInfoLabel: {
    fontSize: 16,
    color: "#000",
    marginRight: 10,
  },
  modalInfoValue: {
    fontSize: 16,
    color: "#000",
  },
  
  modalInfoContainer: {
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 20,
  },
  modalInfoBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  modalInfo: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DA583B",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },
  modalStatus: {
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },
  statusButton: {
    flex: 1.2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  statusButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  orderHeaderCellOrderId: {
    flex: 0.5,
    textAlign: "center", 
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  orderHeaderCellAddress: {
    flex: 1.4,
    textAlign: "center", 
    fontWeight: "bold",
    color: "#fff",
    // marginLeft: -10,
  },

  restaurantNameCell: {
    flex: 1.2,
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "bold",
  },
  statusCell: {
    flex: 1.2,
    textAlign: "center",
    marginLeft: 20,
    fontWeight: "bold",
  },
  orderIdCell: {
    flex: 0.5,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 15,
  },
  addressCell: {
    flex: 1.6,
    textAlign: "left",
    fontWeight: "bold",
  },
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Oswald-Regular",
  },
  orderRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  orderCell: {
    flex: 0.5,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  modalHeader: {
    backgroundColor: "#222126",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 10,
    padding: 10,
    paddingBottom: 20,
    width: "108%",
    top: -10,
  },
  modalText: {
    color: "#000",
    marginLeft: 15,
  },
  modalTextW: {
    color: "#fff",
    marginBottom: 5,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  itemName: {
    width: "44%",
    textAlign: "left",
    fontSize: 14,
    color: "#000",
  },
  itemQuantity: {
    width: "20%",
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
  itemPrice: {
    width: "20%",
    textAlign: "right",
    fontSize: 14,
    color: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 15,
  },
  modalProductRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  modalProductCell: {
    flex: 1,
    textAlign: "center",
  },
  modalTotal: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "right",
    alignSelf: "flex-end",
    fontFamily: "Oswald-Regular",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  orderHeader: {
    backgroundColor: "#222126",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  orderHeaderCell: {
    flex: 0.6,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  viewCell: {
    flex: 0.5,
    textAlign: "center",
  },
  orderHeaderCellOrder: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  orderHeaderCellStatus: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 40,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dividerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    marginBottom: 10,
  },
  
});

export default CourierScreen;
