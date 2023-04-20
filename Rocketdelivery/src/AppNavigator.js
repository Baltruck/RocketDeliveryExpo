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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.4;
const aspectRatio = 163 / 594;
const imageHeight = imageWidth * aspectRatio;

const ScreenWrapper = ({ children }) => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {children}
    </ScrollView>
  </View>
);

function handleLogout() {
  // put your logout logic here
}

function Home(props) {
  return (
    <ScreenWrapper>
      <HomeScreen {...props} />
    </ScreenWrapper>
  );
}

function Details(props) {
  return (
    <ScreenWrapper>
      <DetailsScreen {...props} />
    </ScreenWrapper>
  );
}

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Restaurants" component={Restaurants} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: globalStyles.title,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen
  name="Home"
  component={Home}
  options={{
    headerTitle: () => null, // Deleted the title
    headerLeft: () => (
      <Image
        source={require('../assets/Images/AppLogoV1.png')}
        style={{ width: imageWidth, height: imageHeight, marginLeft: 20, marginBottom: 10 }}
  resizeMode="contain"
/>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={handleLogout}>
        <Text style={globalStyles.headerButton}>LOG OUT</Text>
      </TouchableOpacity>
    ),
  }}
/>

      <Stack.Screen name="Détails" component={Details} />
      <Stack.Screen name="Login" component={LoginScreen} />
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
});

export default AppNavigator;
