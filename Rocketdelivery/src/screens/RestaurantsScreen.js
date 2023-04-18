import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-elements";
import { FontAwesome as Icon } from "@expo/vector-icons";
import globalStyles from "../globalStyles";

const RestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  useEffect(() => {
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
    if (
      selectedRating !== "all" &&
      restaurant.restaurant_rating !== parseInt(selectedRating)
    ) {
      return false;
    }
    if (selectedPrice !== "all" && restaurant.price_range !== selectedPrice) {
      return false;
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
      <ScrollView style={styles.cardsContainer}>
        {filteredRestaurants.map((restaurant, index) => {
          return (
            <Card key={index} containerStyle={styles.card}>
              <Image
                source={{
                  uri: `https://source.unsplash.com/300x150/?restaurant/${restaurant.id}`,
                }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{restaurant.name}</Text>
              <View style={styles.cardStars}>
                {[...Array(restaurant.restaurant_rating)].map((e, i) => (
                  <Icon key={i} name="star" style={styles.starIcon} />
                ))}
              </View>
            </Card>
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
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
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
    padding: 10,
  },
});

export default RestaurantsScreen;
