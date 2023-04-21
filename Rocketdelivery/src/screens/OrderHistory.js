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
import { FontAwesome as Icon } from "@expo/vector-icons";
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
      <Text style={styles.orderCell}>{item.restaurant_name}</Text>
      <Text style={styles.orderCell}>{item.status}</Text>
      <TouchableOpacity style={styles.orderCell} onPress={() => handleOrderView(item)}>
      <MaterialCommunityIcons name="magnify-plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const renderModal = () => {
    if (!selectedOrder) {
      return null;
    }

    
     // check if the selectedOrder has a products property
//   const products = selectedOrder.products || [];

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
            <Text style={styles.modalTitle}>{selectedOrder.restaurant_name}</Text>
            <Text style={styles.modalText}>Order Date: {selectedOrder.order_date}</Text>
            <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
            <Text style={styles.modalText}>Courier: {selectedOrder.courier_id}</Text>
            <View style={styles.modalProductsContainer}>
            {selectedOrder.products.map((products, index) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={styles.modalText}>{products.product_name}</Text>
                    <Text style={styles.modalText}>x{products.quantity}</Text>
                    <Text style={styles.modalText}>{(products.total_cost /100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                  </View>
                ))}
            </View>
            <Text style={styles.modalTotal}>
              TOTAL: ${(selectedOrder.total_cost / 100).toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY ORDERS</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 10,
      },
      orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      modalText: {
        marginBottom: 0,
      },
      modalProductsContainer: {
        marginBottom: 15,
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
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
      },
      closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2,
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
    });

    export default OrderHistory;