import React from 'react';
import { Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, StyleSheet, View, ScrollView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import Footer from './components/Footer';
import globalStyles from './globalStyles';
import LoginScreen from './screens/LoginScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import MenuScreen from './screens/MenuScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderHistory from './screens/OrderHistory';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.4;
const aspectRatio = 163 / 594;
const imageHeight = imageWidth * aspectRatio;

const handleLogout = (navigation) => {
  AsyncStorage.multiRemove(['user_id', 'customer_id'])
    .then(() => {
      navigation.navigate('Login');
    })
    .catch((error) => {
      console.error('Error clearing AsyncStorage:', error);
    });
};

const ScreenWrapper = ({ children }) => (
  <View style={styles.container}>
      {children}
  </View>
);


// function handleLogout() {
//   // put your logout logic here
// }

// function Home(props) {
//   return (
//     <ScreenWrapper>
//       <HomeScreen {...props} />
//     </ScreenWrapper>
//   );
// }

// function Details(props) {
//   return (
//     <ScreenWrapper>
//       <DetailsScreen {...props} />
//     </ScreenWrapper>
//   );
// }

function Restaurants(props) {
  return (
    <ScreenWrapper>
      <RestaurantsScreen {...props} />
    </ScreenWrapper>
  );
}


function Menu(props) {
  return (
    <ScreenWrapper>
      <MenuScreen {...props} />
    </ScreenWrapper>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
      {/* <Tab.Screen name="Home" component={Home} /> */}
      <Tab.Screen
        name="Restaurants"
        component={Restaurants}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Détails" component={Details} /> */}
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: globalStyles.title,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={({ navigation, route }) => ({
          headerTitle: () => null,
          headerLeft: () => (
            <Image
              source={require('../assets/Images/AppLogoV1.png')}
              style={{
                width: imageWidth,
                height: imageHeight,
                marginLeft: 20,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={() => {
              handleLogout(navigation);
            }}>
              <Text style={styles.logoutButtonText}>LOG OUT</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ headerShown: true, title: 'My Orders' }}
      />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flexGrow: 1,
  },
  logoutButton: {
    backgroundColor: '#DA583B',
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 7,
    marginRight: 20,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 15,
    paddingTop: 5,
    padding: 5,
    fontFamily: 'Oswald-Regular',
  },
});

export default AppNavigator;

