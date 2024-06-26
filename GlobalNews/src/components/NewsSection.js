import { View, Image, FlatList, TouchableOpacity, Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'lodash';
import { useState } from 'react';

export default function NewsSection( {newsProps}) {
    
    const navigation = useNavigation();
    const [bookmarkStatus, setBookmarkStatus] = useState([]);
    const [urlList, setUrlList] = useState([]);
    const handleClick = (item) => {
        navigation.navigate("NewsDetails", item);
    }
    
    const dateFormater = (isoDate) => {
        const options = { weekday: "short", day: "2-digit", month: "short"}
        
        const date = new Date(isoDate);
        return date.toLocaleDateString(undefined, options);
    }

    // Function for toggling and save bookmark
    const toggleBookmarkAndSave = async (item, index) => {
        try {
            const savedNews = await AsyncStorage.getItem("savedNews");
            let savedNewsArray = savedNews ? JSON.parse(savedNews) : [];
    
            // Check if the new is in the list
            const isNewBookmarked = savedNewsArray.some(
                (savedNew) => savedNew.url === item.url
            );
        
            // If not bookmarked, add it to the list
            if (!isNewBookmarked) {
                savedNewsArray.push(item);
                await AsyncStorage.setItem(
                    "savedNews",
                    JSON.stringify(savedNewsArray)
                );
                const updatedStatus = [...bookmarkStatus];
                updatedStatus[index] = true;
                setBookmarkStatus(updatedStatus);
            } else {
                // If the new is already bookmarked, remove it
                const updatedSavedNewsArray = savedNewsArray.filter(
                    (savedNew) => savedNew.url !== item.url
                );
                await AsyncStorage.setItem(
                    "savedNews",
                    JSON.stringify(updatedSavedNewsArray)
                );
                const updatedStatus = [...bookmarkStatus];
                updatedStatus[index] = false;
                setBookmarkStatus(updatedStatus);
            }
        } catch (error) {
            console.log("Error Saving/Removing New", error);
        }
    };
    

    useEffect(() => {
        const urls = newsProps.map((item) => item.url);
        setUrlList(urls);
    },
    [newsProps])

    useFocusEffect(
        useCallback(() => {
        const loadSavedNews = async () => {
            try {
                    const savedNews = await AsyncStorage.getItem("savedNews");
                    const savedNewsArray = savedNews ? JSON.parse(savedNews): [];
                
                // Check URL
                const isNewBookmarkedList = urlList.map((url) =>
                    savedNewsArray.some((savedNew) => savedNew.url === url)
                );
            
                  // Set the bookmark status
                setBookmarkStatus(isNewBookmarkedList);
            } catch (error) {
                console.log("Error Loading Saved News", error);
            }
            };
            loadSavedNews();
        }, [urlList, navigation])
    );

    
    const renderItem = ({ item ,index }) => {
        return (
            <TouchableOpacity className="mb-4 mx-4 space-y-1"
            key={index}
            onPress={() => handleClick(item)}
            >
                <View className="flex-row justify-start w-[100%] shadow-sm">
                    <Image
                        source={{
                            uri: item.urlToImage ||
                            "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        }}
                        style={{
                            width: heightPercentageToDP(9),
                            height: heightPercentageToDP(10)
                        }}
                        className="rounded-lg"
                    />

                    {/* Content */}
                    <View className="w-[70%] pl-4 justify-center space-y-1 ">

                        {/* Author */}
                        <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
                        {
                            item?.author?.length > 20 ? item.author?.slice(0, 20) + '...' : item?.author
                        }
                        </Text>

                        {/* Title */}
                        <Text className="text-neutral-800 max-w-[95%] dark:text-white"
                        style={{
                        fontSize: heightPercentageToDP(1.6),
                        fontFamily: 'Roboto',
                        }}>
                            {
                                item?.title?.length > 60 ? item.title.slice(0, 60) + '...' : item.title.split(' - ')[0] || "N/A"
                            }
                        </Text>

                        {/* Date */}
                        <Text className="text-xs text-gray-700 dark:text-neutral-300">
                            {dateFormater(item.publishedAt)}
                        </Text>
                    </View>
                    
                        {/* Bookmark */}    
                    <View className="w-[10%] justify-center">
                        <TouchableOpacity onPress={()=> toggleBookmarkAndSave(item, index)}>
                            <Feather name="bookmark" size={24} color={bookmarkStatus[index] ? "#AD0000" : "grey"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }



  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900 shadow-inner">
      <FlatList
      nestedScrollEnabled={true}
      scrollEnabled={false}
      data={newsProps}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      />
    </View>
  )
}