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
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from "react-native-elements";
import globalStyles from "../globalStyles";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import ConfirmationModal from "../components/ConfirmationModal";
import menuImage from "../../assets/Images/RestaurantMenu.jpg";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customer_id');
  
      if (!customerId) {
        console.error('Customer ID not found in local storage');
        return;
      }
  
      const response = await fetch(
        `https://2ee4-74-50-186-92.ngrok-free.app/api/orders?type=customer&id=${customerId}`
      );
  
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error while fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const renderOrder = ({ item }) => (
    <View style={styles.orderRow}>
      <Text style={styles.restaurantNameCell}>{item.restaurant_name}</Text>
      <Text style={styles.statusCell}>{item.status.toUpperCase()}</Text>
      <TouchableOpacity style={styles.orderCell} onPress={() => handleOrderView(item)}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="magnify-plus" size={24} color="black" />
      </View>
      </TouchableOpacity>
    </View>
  );

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

//function to handle closing the modal
const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderModal = () => {
    if (!selectedOrder) {
      return null;
    }

    

    return (
        <>
        {modalVisible && (
          <View style={styles.dimBackground} />
        )}
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
            <Text style={styles.modalTitle}>{selectedOrder.restaurant_name}</Text>
            <Text style={styles.modalTextW}>Order Date: {selectedOrder.order_date}</Text>
            <Text style={styles.modalTextW}>Status: {selectedOrder.status}</Text>
            <Text style={styles.modalTextW}>Courier: {selectedOrder.courier_name}</Text>
            <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseModal}
        >
          <FontAwesome name="times" size={24} color="white" />
        </TouchableOpacity>
          </View>
            <View style={styles.modalProductsContainer}>
            {selectedOrder.products.map((products, index) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text style={[styles.modalText, styles.itemName]}>{products.product_name}</Text>
                  <Text style={[styles.modalText, styles.itemQuantity]}>x{products.quantity}</Text>
                  <Text style={[styles.modalText, styles.itemPrice]}>{(products.total_cost /100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
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
      <Text style={styles.title}>MY ORDERS</Text>
      <View style={styles.orderHeader}>
        <Text style={styles.orderHeaderCellOrder}>ORDER</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      },
    restaurantNameCell: {
        flex: 1.2,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
      },
      statusCell: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
      },
      title: {
        fontSize: 24,
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20,
        fontFamily: 'Oswald-Regular',
      },
      orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      },
      orderCell: {
        flex: 1,
        textAlign: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        // alignItems: "center",
        top: -10,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DA583B',
        marginBottom: 5,
        marginLeft: 15,
      },
      modalText: {
        color: '#000', 
        marginLeft: 15,
      },
      modalTextW: {
        color: '#fff', 
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
        width: '44%',
        textAlign: "left",
        fontSize: 14,
        color: '#000', 
      },
      itemQuantity: {
        width: '20%',
        textAlign: "center",
        fontSize: 14,
        color: '#000', 
      },
      itemPrice: {
        width: '20%',
        textAlign: "right",
        fontSize: 14,
        color: '#000', 
      },
      closeButton: {
        position: "absolute",
        top: 55,
        right: 25,
      },      
      modalProductRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      },
      modalProductCell: {
        flex: 1,
        textAlign: 'center',
      },
      modalTotal: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'right',
        alignSelf: 'flex-end',
        fontFamily: 'Oswald-Regular',
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      orderHeader: {
        backgroundColor: '#222126',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      orderHeaderCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
      },
      orderHeaderCellOrder: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
      },
      orderHeaderCellStatus: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 40,
      },
      iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      dividerLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '100%',
        marginBottom: 10,
      },
    });

    export default OrderHistory;