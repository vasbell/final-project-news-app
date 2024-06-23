import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { fetchBreakingNews } from '../../utils/NewsApi';
import { fetchRecommendedNews } from '../../utils/NewsApi';

export default function HomeScreen() {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([])
  const [recommendedMews, setRecommendedNews] = useState([])


  //Fetching Breaking News

  const {isLoading: isBreakingNewsLoading} = useQuery ({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles)
    },
    onError: (error) => {
      console.log("Error fetching breaking news", error)
    },
  });




  //Fetching Recommended news

  const {isLoading: isRecommendedNewsLoading} = useQuery ({
    queryKey: ["recommendedNews"],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      setRecommendedNews(data.articles)
    },
    onError: (error) => {
      console.log("Error fetching recommended news", error)
    },
  });

  return (
    <SafeAreaView>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
    </SafeAreaView>
  )
}