import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-elements";
import { FontAwesome as Icon } from "@expo/vector-icons";
import globalStyles from "../globalStyles";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';
import MenuScreen from './MenuScreen';

const RestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [restaurantImages, setRestaurantImages] = useState([]);


// send id to menu screen
const navigation = useNavigation();
const handleCardPress = (restaurantId) => {
  navigation.navigate('Menu', { restaurantId });
};

// import image for random restaurant images
const localImages = [
  require("../../assets/Images/Restaurants/cuisineGreek.jpg"),
  require("../../assets/Images/Restaurants/cuisineJapanese.jpg"),
  require("../../assets/Images/Restaurants/cuisinePasta.jpg"),
  require("../../assets/Images/Restaurants/cuisinePizza.jpg"),
  require("../../assets/Images/Restaurants/cuisineSoutheast.jpg"),
  require("../../assets/Images/Restaurants/cuisineViet.jpg"),
];

  useEffect(() => {
    // Set local restaurant images
    setRestaurantImages(localImages);

    // Fetch restaurants data from database
    fetch("https://2ee4-74-50-186-92.ngrok-free.app/api/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };


 // Filter restaurants based on selected rating and price
 const filteredRestaurants = restaurants.filter((restaurant) => {
    if (selectedRating !== "all") {
      const rating = restaurant.restaurant_rating;
      const lowerBound = parseFloat(selectedRating) - 0.5;
      const upperBound = parseFloat(selectedRating) + 0.5;
      if (rating < lowerBound || rating > upperBound) {
        return false;
      }
    }
    if (selectedPrice !== "all") {
      const priceRange = restaurant.price_range;
      switch (selectedPrice) {
        case "$":
          if (priceRange > 1) {
            return false;
          }
          break;
        case "$$":
          if (priceRange < 2 || priceRange > 2) {
            return false;
          }
          break;
        case "$$$":
          if (priceRange < 3 || priceRange > 3) {
            return false;
          }
          break;
        case "$$$$":
          if (priceRange < 4 || priceRange > 4) {
            return false;
          }
          break;
        default:
          return true;
      }
    }
    return true;
  });

  
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Rating</Text>
          <Picker
            selectedValue={selectedRating}
            style={styles.filterPicker}
            onValueChange={(itemValue) => handleRatingChange(itemValue)}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
          <Text style={styles.filterText}>Price</Text>
          <Picker
            selectedValue={selectedPrice}
            style={styles.filterPicker}
            onValueChange={(itemValue) => handlePriceChange(itemValue)}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="$" value="$" />
            <Picker.Item label="$$" value="$$" />
            <Picker.Item label="$$$" value="$$$" />
            <Picker.Item label="$$$$" value="$$$$" />
          </Picker>
        </View>
      </View>
      <Text style={styles.cardTitle}>RESTAURANTS</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
      {filteredRestaurants.map((restaurant, index) => {

          return (
            <TouchableOpacity key={restaurant.id} onPress={() => handleCardPress(restaurant.id)}>
             {/* <TouchableOpacity onPress={handleCardPress}> */}
            <Card key={index} containerStyle={styles.card}>
              <Image
                source={
                  restaurantImages[
                    Math.floor(Math.random() * restaurantImages.length)
                  ]
                }
                style={styles.cardImage}
              />

              <Text style={styles.cardTitle}>{restaurant.name}</Text>
              <View style={styles.cardStars}>
              {[...Array(parseInt(restaurant.restaurant_rating))].map((e, i) => (
                  <Icon key={i} name="star" style={styles.starIcon} />
                ))}
              </View>
            </Card>
             </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    header: {
      backgroundColor: "#fff",
      padding: 20,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 20,
    },
    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
    },
    filterText: {
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 10,
    },
    filterPicker: {
      flex: 1,
      height: 50,
    },
    card: {
      width: "41%",
      marginBottom: 20,
      borderRadius: 10,
      overflow: "hidden",
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingBottom: 10,
    },
    cardImage: {
      borderWidth: 0,
      width: "100%",
      height: 150,
      resizeMode: "cover",
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      margin: 10,
    },
    cardStars: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 10,
    },
    starIcon: {
      color: "#ffcc00",
      marginRight: 2,
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
      },
  });
  

export default RestaurantsScreen;
