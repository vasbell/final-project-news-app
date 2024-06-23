import { View, Text, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';



export default function WelcomeScreen() {
  const navigation = useNavigation();
  
  return (
    <ImageBackground
    source={require("../../assets/images/reporter.jpg")}
    className="justify-center items-center flex-1 pb-6"
    >
      <LinearGradient
            colors= {["transparent", "rgba(0,0,0,0.95)"]}
            style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
            }}
            
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
      />
      <View className="justify-end items-center flex-1 max-w-[90%]">
            <Text className="text-4xl shadow-3xl text-white text-center tracking-wider"
              style={{
                fontSize: widthPercentageToDP(10),
                fontFamily: "Roboto",
              }}>
              Stay informed with the latest news from around the world
            </Text>
      </View>
      <TouchableOpacity className="bg-red-900 rounded-full p-4 justify-center items-center w-[90%] mt-10 mb-5"
      onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text
        className="text-base text-white">Start Now</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}