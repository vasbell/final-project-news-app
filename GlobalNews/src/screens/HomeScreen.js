import { View, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { fetchBreakingNews } from '../../utils/NewsApi';
import { fetchRecommendedNews } from '../../utils/NewsApi';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);

  //Fetching Breaking News
  const { isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles);
    },
    onError: (error) => {
      console.log(error);
    },
    
  });

  //Fetching Recommended news
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommendedNews"],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      setRecommendedNews(data.articles);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View>
        <Header />

        {
        isBreakingLoading ? (
          <Loading />
        ) : (
          <View>
            <MiniHeader label="Breaking News"/>
          </View>
        )}

      </View>
      
    </SafeAreaView>
  )
}