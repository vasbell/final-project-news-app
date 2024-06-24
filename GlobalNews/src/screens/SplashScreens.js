import React, { useCallback, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';


export default function SplashScreens() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
        RobotoBold: require('../../assets/fonts/Roboto-Bold.ttf'),
        RobotoBlack: require('../../assets/fonts/Roboto-Black.ttf'),
        RobotoLight: require('../../assets/fonts/Roboto-Light.ttf'),  
    
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setTimeout(() => {
            navigation.navigate("Welcome");
          }, 6000);
        }
      }, [fontsLoaded]);

    useEffect(() => {
        onLayoutRootView();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    return (
        <ImageBackground
            source={require("../../assets/splash.png")}
            className="justify-center items-center flex-1"
        >
        </ImageBackground>
    );
};
