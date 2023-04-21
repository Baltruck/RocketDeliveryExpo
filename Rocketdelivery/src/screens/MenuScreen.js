import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import globalStyles from "../globalStyles";
import ConfirmationModal from "../components/ConfirmationModal";
import menuImage from "../../assets/Images/RestaurantMenu.jpg";
import redirApi from "../components/NgrokUrl";

const screenWidth = Dimensions.get("window").width;

const MenuScreen = ({ route }) => {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderButtonDisabled, setOrderButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch restaurant data from database
    fetch(`${redirApi}api/restaurants`)
      .then((response) => response.json())
      .then((data) => {
        const info = data.find((item) => item.id === restaurantId);
        setRestaurant(info);
      })
      .catch((error) =>
        console.error(`error retriving restaurant data:`, error)
      );

    // Fetch products data from database
    fetch(`${redirApi}api/products?restaurant_id=${restaurantId}`)
      .then((response) => response.json())
      .then((data) => {
        // set quantity to zero for each product
        const productsWithQuantity = data.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(productsWithQuantity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [restaurantId]);

  useEffect(() => {
    // Update order button disabled state based on products array
    const orderButtonDisabledState = products.every(
      (item) => item.quantity === 0
    );
    setOrderButtonDisabled(orderButtonDisabledState);
  }, [products]);

  const handleQuantityChange = (productId, newQuantity) => {
    console.log("productId", productId);
    if (newQuantity < 0) return;

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        console.log("productId2", productId);
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleOrderButtonPress = () => {
    // Check if any item has a quantity greater than zero
    const itemsInOrder = products.filter((item) => item.quantity > 0);
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
          {restaurant ? (
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
          ) : null}
          <View style={styles.ratingPriceContainer}>
            {restaurant && (
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Price: </Text>
                <Text style={styles.priceText}>
                  {"$".repeat(restaurant.price_range)}
                </Text>
              </View>
            )}
            <View style={styles.starsContainer}>
              <Text style={styles.ratingText}>Rating: </Text>
              {restaurant &&
                [...Array(parseInt(restaurant.restaurant_rating))].map(
                  (e, i) => <Icon key={i} name="star" style={styles.starIcon} />
                )}
            </View>
          </View>
        </View>
        <View style={styles.createOrderButtonWrapper}>
          <TouchableOpacity
            style={
              orderButtonDisabled
                ? styles.createOrderButtonDisabled
                : styles.createOrderButton
            }
            disabled={orderButtonDisabled}
            onPress={() => handleOrderButtonPress()}
          >
            <Text style={[styles.createOrderButtonText, globalStyles.title]}>
              Create Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={menuImage} style={styles.itemImage} />

            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {(item.cost / 100).toFixed(2)} $
              </Text>
              <Text
                style={styles.itemDescription}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.description
                  ? item.description
                  : "Lorem ipsum dolor sit amet"}
              </Text>
            </View>
            <View style={styles.itemCounterContainer}>
              <TouchableOpacity
                style={[
                  styles.itemCounterButton,
                  item.quantity === 0 && styles.itemCounterButtonDisabled,
                ]}
                onPress={() => {
                  console.log("Minus button pressed:", item.id);
                  handleQuantityChange(item.id, item.quantity - 1);
                }}
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
                onPress={() => {
                  console.log("Plus button pressed:", item.id);
                  handleQuantityChange(item.id, item.quantity + 1);
                }}
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
        orderDetails={{ restaurant, products }}
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
    marginBottom: 20,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  ratingPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    color: "#000000",
    marginRight: 2,
  },
  createOrderButtonWrapper: {
    position: "absolute",
    top: 70,
    right: 20,
  },
  createOrderButton: {
    backgroundColor: "#DA583B",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  createOrderButtonDisabled: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  createOrderButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: "#ccc",
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
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222126",
  },
  itemDescription: {
    fontSize: 12,
    color: "#222126",
    width: screenWidth * 0.4,
  },
  itemCounterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCounterButton: {
    backgroundColor: "#222126",
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  itemCounterButtonDisabled: {
    backgroundColor: "#222126",
  },
  itemCounterButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    bottom: 5,
  },
  itemCounterButtonTextDisabled: {
    color: "#aaa",
  },
  itemCounterText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 15,
  },
  priceText: {
    fontSize: 15,
  },
});

export default MenuScreen;
