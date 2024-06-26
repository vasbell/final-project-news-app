import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");


export default function BreakingNewsCard({ item, handleClick }) {


  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="relative">
      <Image
          source={{
            uri: item.urlToImage ||
              "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
          }}
          resizeMode="cover"
          className="rounded-2xl"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 1)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        />
        <View className="absolute bottom-3 left-4 justify-end h-[90%]">
            <View className="space-y-1">
                <View className="max-w-[98%]">
                    <Text className="text-white text-md font-semibold">
                        {item.title.length > 60 ? item.title.slice(0, 70) + '...' : item.title.split(' - ')[0] || "N/A"}
                    </Text>
                </View>

                <View>
                    <Text  className="text-[#f35449] text-sm font-medium">
                        {item?.author?.length > 20 ? item.author?.slice(0, 20) + '...' : item?.author}
                    </Text>
                </View>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
