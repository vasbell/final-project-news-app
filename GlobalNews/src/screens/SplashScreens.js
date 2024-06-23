import React, { useCallback, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


export default function SplashScreens() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Roboto: require("../fonts/Roboto-Regular.ttf"),
        RobotoBold: require('../fonts/Roboto-Bold.ttf'),
        RobotoBlack: require('../fonts/Roboto-Black.ttf'),
        RobotoLight: require('../fonts/Roboto-Light.ttf'),  
    
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setTimeout(() => {
            navigation.navigate("Welcome");
          }, 5000);
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
            source={require("../../assets/images/reporter.jpg")}
            className="justify-center items-center flex-1"
        >
            <LinearGradient
            colors= {["rgba(160, 0, 0, 0.70))", "rgba(173,0,0,0.95)"]}
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
            }}
            
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 1 }}
            />
            <View onLayout={onLayoutRootView}>
                <Text className="text-white text-3xl font-extrabold uppercase text-center">
                    Global News App
                </Text>
                <Text className="text-white text-lg font-bold text-center pt-3 max-w-[80%]">
                    Vasileios Bellos {"\n"}  Final Project Coding Factory
                </Text>
            </View>
        </ImageBackground>
    );
};
