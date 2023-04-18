// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
// import { Card } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import globalStyles from '../globalStyles';



// const RestaurantsScreen = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [selectedRating, setSelectedRating] = useState('all');
//   const [selectedPrice, setSelectedPrice] = useState('all');

//   useEffect(() => {
//     // Fetch restaurants data from database
//     fetch('https://208d-74-50-186-92.ngrok-free.app/restaurants')
//       .then(response => response.json())
//       .then(data => {
//         setRestaurants(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleRatingChange = (value) => {
//     setSelectedRating(value);
//   };

//   const handlePriceChange = (value) => {
//     setSelectedPrice(value);
//   };

//  // Filter restaurants based on selected rating and price
//  const filteredRestaurants = restaurants.filter((restaurant) => {
//     if (selectedRating !== 'all' && restaurant.restaurant_rating !== parseInt(selectedRating)) {
//       return false;
//     }
//     if (selectedPrice !== 'all' && restaurant.price_range !== selectedPrice) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
//         <View style={styles.filterContainer}>
//           <Text style={styles.filterText}>Rating</Text>
//           <Dropdown
//             data={[{ value: 'all' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }]}
//             value={selectedRating}
//             onChangeText={handleRatingChange}
//           />
//           <Text style={styles.filterText}>Price</Text>
//           <Dropdown
//             data={[{ value: 'all' }, { value: '$' }, { value: '$$' }, { value: '$$$' }, { value: '$$$$' }]}
//             value={selectedPrice}
//             onChangeText={handlePriceChange}
//           />
//         </View>
//       </View>
//       <Text style={styles.cardTitle}>RESTAURANTS</Text>
//       <ScrollView style={styles.cardsContainer}>
//         {filteredRestaurants.map((restaurant, index) => {
//           return (
//             <Card key={index} containerStyle={styles.card}>
//               <Image
//                 source={{ uri: `https://source.unsplash.com/300x150/?restaurant/${restaurant.id}` }}
//                 style={styles.cardImage}
//               />
//               <Text style={styles.cardTitle}>{restaurant.name}</Text>
//               <View style={styles.cardStars}>
//                 {[...Array(restaurant.restaurant_rating)].map((e, i) => (
//                   <Icon key={i} name="star" style={styles.starIcon} />
//                 ))}
//               </View>
//             </Card>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 10,
//     },
//     header: {
//       backgroundColor: '#fff',
//       padding: 20,
//     },
//     headerText: {
//       fontWeight: 'bold',
//       fontSize: 20,
//     },
//     filterContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginTop: 10,
//     },
//     filterText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       marginRight: 10,
//     },
//     filterPicker: {
//       flex: 1,
//       height: 50,
//     },
//     card: {
//       marginBottom: 20,
//       borderRadius: 10,
//       overflow: 'hidden',
//     },
//     cardImage: {
//       height: 150,
//       resizeMode: 'cover',
//     },
//     cardTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       margin: 10,
//     },
//     cardStars: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginLeft: 10,
//     },
//     starIcon: {
//       color: '#ffcc00',
//       marginRight: 2,
//     },
//     cardsContainer: {
//       padding: 10,
//     },
//   });

// export default RestaurantsScreen;

