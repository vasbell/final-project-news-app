import { Platform } from "react-native";
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useColorScheme } from 'nativewind'
import HomeScreen from "../screens/HomeScreen"
import DiscoverScreen from "../screens/DiscoverScreen"
import SavedScreen from "../screens/SavedScreen"
import SearchScreen from "../screens/SearchScreen"
import SplashScreens from "../screens/SplashScreens"
import WelcomeScreen from "../screens/WelcomeScreen"
import NewsDetails from "../screens/NewsDetails"
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={( {route} ) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let iconName;

            if(route.name === 'Home') {
              iconName = 'home';
            } else if(route.name === 'Discover') {
              iconName = 'telescope'
            } else if(route.name === 'Saved') {
              iconName = 'bookmark'
            } else if(route.name === 'Search') {
              iconName = 'magnify'
            }

            const customizeSize = 25
            return (
              <MaterialCommunityIcons
              name={iconName}
              size={customizeSize}
              color={focused ? '#AD0000' : 'gray'}
              style={{paddingTop: Platform.OS === 'android' ? 1 : 0}}
              />
            )
          },
          tabBarActiveTintColor: '#AD0000',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 13,
            fontFamily: "Roboto",
            paddingBottom: Platform.OS === 'android' ? 5 : 0,
          },
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
            
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    );
  };
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashsS"
        screenOptions={{
            headerShown:false
        }}>
        
        <Stack.Screen name="SplashS" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{animation: "slide_from_bottom"}}
        />

        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
