import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

export default function SavedScreen() {
  const { colorScheme } = useColorScheme(); 
  const [savedArticles, setSavedArticles] = useState([]); 
  const [bookmarkStatus, setBookmarkStatus] = useState([]); 
  const navigation = useNavigation();

 
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Format date function
  const dateFormater = (isoDate) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to toggle bookmark status and save to AsyncStorage
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedNews = await AsyncStorage.getItem("savedNews");
      let savedNewsArray = savedNews ? JSON.parse(savedNews) : [];

      const isNewBookmarked = savedNewsArray.some(
        (savedNew) => savedNew.url === item.url
      );

      if (isNewBookmarked) {
        savedNewsArray = savedNewsArray.filter(
          (savedNew) => savedNew.url !== item.url
        );

        await AsyncStorage.setItem("savedNews", JSON.stringify(savedNewsArray));
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
        setSavedArticles(savedNewsArray); // Update saved articles in state
      }
    } catch (error) {
      console.log("Error Saving/Removing New", error);
    }
  };

  // Function to clear all saved articles from AsyncStorage
  const clearAllSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedNews");
      setSavedArticles([]);
      setBookmarkStatus([]);
    } catch (error) {
      console.log("Error clearing saved articles", error);
    }
  };

  // Load saved news on component focus
  useFocusEffect(
    useCallback(() => {
      const loadSavedNews = async () => {
        try {
          const savedNews = await AsyncStorage.getItem("savedNews");
          const savedNewsArray = savedNews ? JSON.parse(savedNews) : [];
          setSavedArticles(savedNewsArray);
          setBookmarkStatus(savedNewsArray.map(() => true));
        } catch (error) {
          console.log("Error Loading Saved News", error);
        }
      };
      loadSavedNews();
    }, [])
  );

  // Render item function for FlatList
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <Image
            source={{
              uri: item.urlToImage ||
                "https://plus.unsplash.com/premium_photo-1688561383203-31fed3d85417?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{
              width: heightPercentageToDP(9),
              height: heightPercentageToDP(10),
            }}
            className="rounded-lg"
          />

          {/* Content */}
          <View className="w-[70%] pl-4 justify-center space-y-1 ">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.author?.length > 20 ? item.author?.slice(0, 20) + '...' : item?.author}
            </Text>

            {/* Title */}
            <Text className="text-neutral-800 max-w-[95%] dark:text-white"
              style={{
                fontSize: heightPercentageToDP(1.6),
                fontFamily: 'Roboto',
              }}>
              {item?.title?.length > 60 ? item.title.slice(0, 60) + '...' : item.title.split(' - ')[0] || "N/A"}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {dateFormater(item.publishedAt)}
            </Text>
          </View>

          {/* Bookmark */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity onPress={() => toggleBookmarkAndSave(item, index)}>
              <Feather name="bookmark" size={24} color={bookmarkStatus[index] ? "#AD0000" : "grey"} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      {/* Headbar */}
      <View className="flex-row justify-between items-center">
        <Text className="text-3xl text-red-700 dark:text-white"
          style={{
            fontFamily: "Roboto",
            fontWeight: '800'
          }}>
          Bookmarks
        </Text>

        {/* Clear All Button */}
        {savedArticles.length > 0 ? (
          <TouchableOpacity
            onPress={clearAllSavedArticles}
            className="bg-red-700 py-1 px-4 rounded-full"
          >
            <Text className="text-white dark:text-white"
              style={{
                fontFamily: "Roboto",
                fontWeight: '500'
              }}> Clear All </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            style={{
              backgroundColor: '#E0E0E0', // Light grey background when disabled
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: 'white', // White text color when disabled
                fontFamily: "Roboto",
                fontWeight: '500'
              }}
            >
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="space-y-2" style={{ marginVertical: 20 }}>
        <FlatList
          data={savedArticles}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30
          }}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
