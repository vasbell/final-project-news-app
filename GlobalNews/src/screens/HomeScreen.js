import { View, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { fetchBreakingNews } from '../../utils/NewsApi';
import { fetchRecommendedNews } from '../../utils/NewsApi';
import { useColorScheme } from 'nativewind';

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();


  //Fetching Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
  });

  //Fetching Recommended news
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommendedNews"],
    queryFn: fetchRecommendedNews,
  });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View>
        <Header />


      </View>
      
    </SafeAreaView>
  )
}