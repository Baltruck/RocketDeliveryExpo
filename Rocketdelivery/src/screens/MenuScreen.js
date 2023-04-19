import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import globalStyles from "../globalStyles";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import ConfirmationModal from "../components/ConfirmationModal";
import menuImage from "../../assets/Images/RestaurantMenu.jpg";
import { useRoute } from "@react-navigation/native";

// const route = useRoute();

const MenuScreen = ({ route }) => {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderButtonDisabled, setOrderButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch restaurant data from database
    fetch(`https://2ee4-74-50-186-92.ngrok-free.app/api/restaurants`)
        .then((response) => response.json())
        .then((data) => {
            const info = data.find((item) => item.id === restaurantId);
            setRestaurant(info);
        })
        .catch(error => console.error(`error retriving restaurant data:`, error));


    // Fetch products data from database
    fetch(
      `https://2ee4-74-50-186-92.ngrok-free.app/api/products?restaurant_id=${restaurantId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [restaurantId]);

  useEffect(() => {
    // Update order button disabled state based on orderItems array
    const orderButtonDisabledState = orderItems.every(
      (item) => item.quantity === 0
    );
    setOrderButtonDisabled(orderButtonDisabledState);
  }, [orderItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    // Update orderItems array based on quantity change
    const updatedOrderItems = orderItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      } else {
        return item;
      }
    });
    setOrderItems(updatedOrderItems);
  };

  const handleOrderButtonPress = () => {
    // Check if any item has a quantity greater than zero
    const itemsInOrder = orderItems.filter((item) => item.quantity > 0);
    if (itemsInOrder.length > 0) {
      // Open confirmation modal for order
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.titleContainer}>
  <Text style={styles.title}>RESTAURANT MENU</Text>
  {restaurant ? <Text style={styles.restaurantName}>{restaurant.name}</Text> : null}
  <View style={styles.ratingPriceContainer}>
    <View style={styles.starsContainer}>
      {restaurant &&
        [...Array(parseInt(restaurant.restaurant_rating))].map(
          (e, i) => <Icon key={i} name="star" style={styles.starIcon} />
        )}
    </View>
    {restaurant && (
      <Text style={styles.priceText}>
        {"$".repeat(restaurant.price_range)}
      </Text>
    )}
  </View>
</View>

        <TouchableOpacity
          style={
            orderButtonDisabled
              ? styles.createOrderButtonDisabled
              : styles.createOrderButton
          }
          disabled={orderButtonDisabled}
          onPress={() => handleOrderButtonPress()}
        >
          <Text style={styles.createOrderButtonText}>CREATE ORDER</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={menuImage} style={styles.itemImage} />

            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} $</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <View style={styles.itemCounterContainer}>
              <TouchableOpacity
                style={[
                  styles.itemCounterButton,
                  item.quantity === 0 && styles.itemCounterButtonDisabled,
                ]}
                onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity === 0}
              >
                <Text
                  style={[
                    styles.itemCounterButtonText,
                    item.quantity === 0 && styles.itemCounterButtonTextDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={styles.itemCounterText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.itemCounterButton}
                onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <Text style={styles.itemCounterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <ConfirmationModal
  modalVisible={modalVisible}
  setModalVisible={setModalVisible}
  orderDetails={{
    restaurant: restaurant || {},
    products: products || [],
    orderItems: orderItems || [],
  }}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ratingPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    color: "#ffcc00",
    marginRight: 2,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  createOrderButton: {
    backgroundColor: "#e67e22",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  createOrderButtonDisabled: {
    backgroundColor: "#ccc",
  },
  createOrderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#888",
  },
  itemCounterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCounterButton: {
    backgroundColor: "#e67e22",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
  },
  itemCounterButtonDisabled: {
    backgroundColor: "#ccc",
  },
  itemCounterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemCounterButtonTextDisabled: {
    color: "#aaa",
  },
  itemCounterText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default MenuScreen;
