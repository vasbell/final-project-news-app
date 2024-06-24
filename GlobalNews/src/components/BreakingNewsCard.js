import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

var { width, height } = Dimensions.get("window");


export default function BreakingNewsCard({ item, handleClick }) {


  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="relative">
      <Image
          source={{
            uri: item.urlToImage
            ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <Text
          className="drop-shadow-xl truncate"
          style={{ color: 'white', fontSize: 14, fontWeight: 'bold', maxWidth: '95%'}}>{item.title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
