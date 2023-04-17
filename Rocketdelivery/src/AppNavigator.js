import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet, View, ScrollView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import Footer from './components/Footer';
import globalStyles from './globalStyles';
import LoginScreen from './screens/LoginScreen';
import { useNavigation } from '@react-navigation/native';



const Stack = createStackNavigator();

const ScreenWrapper = ({ children }) => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {children}
    </ScrollView>
    <Footer />
  </View>
);

function Home(props) {
  return (
    <ScreenWrapper>
      <HomeScreen {...props}/>
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

function AppNavigator() {
    const navigation = useNavigation();
    
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
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={globalStyles.headerButton}>Login</Text>
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
