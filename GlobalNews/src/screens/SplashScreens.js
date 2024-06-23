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
          }, 4000);
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
            className="flex1 justify-center items-center"
        >
            <LinearGradient
            colors= {["rgba(0,85,0,0.95)", "rgba(0,85,0,0.95)"]}
            style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
            }}
            
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            />
            <View onLayout={onLayoutRootView}>
                <Text className="text-white text-3xl. font-extrabold uppercase">
                    Stack Newss
                </Text>
            </View>
        </ImageBackground>
    );
};
