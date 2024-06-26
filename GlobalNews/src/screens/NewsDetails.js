import {View, ActivityIndicator, TouchableOpacity, Dimensions, Share, useColorScheme} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";


const { height, width } = Dimensions.get("window");

export default function NewsDetails() {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const { params: item } = useRoute();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this news: ${item.title}\n\n${item.url}`,
      });
    } catch (error) {
      console.error("Error sharing the article", error);
    }
  };

  return (
    <>
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white dark:bg-neutral-900">
        <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center dark:bg-neutral-700">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onShare} className="bg-gray-100 p-2 rounded-full dark:bg-neutral-700">
          <ShareIcon size={25} color="gray" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      {/* WebView */}
      <WebView
        source={{ uri: item.url }}
        allowsInsecureContent={true}
        ignoreSslError={true}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size={"large"}
          color={"red"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </>
  );
}
