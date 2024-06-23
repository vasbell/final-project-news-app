import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useColorScheme } from 'react-native'
import HomeScreen from "../screens/HomeScreen"
import DiscoverScreen from "../screens/DiscoverScreen"
import SavedScreen from "../screens/SavedScreen"
import SearchScreen from "../screens/SearchScreen"
import SplashScreens from "../screens/SplashScreens"
import WelcomeScreen from "../screens/WelcomeScreen"
import NewsDetailsScreen from "../screens/NewsDetailsScreen"
import { Ionicons } from '@expo/vector-icons'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
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
              iconName = 'compass-outline'
            } else if(route.name === 'Saved') {
              iconName = 'bookmark-outline'
            } else if(route.name === 'Search') {
              iconName = 'search'
            }

            const customizeSize = 25
            return (
              <Ionicons
              name={iconName}
              size={customizeSize}
              color={focused ? 'green' : 'gray'}
              />
            )
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "RobotoBold",
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
        initialRouteName='SplashS'
        screenOptions={{
            headerShown:false,
            animation: "slide_from_right"
        }}>
        
        <Stack.Screen name="SplashS" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="Newsdetails"
          component={NewsDetailsScreen}
          options={{animation: "slide_from_bottom"}}
        />

        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
