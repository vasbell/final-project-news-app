import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React from 'react';

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
          className="rounded-3xl"
        />
        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textShadowColor: 'black', textShadowRadius: 10 }}>{item.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
