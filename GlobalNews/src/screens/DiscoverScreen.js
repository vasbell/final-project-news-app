import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { categories } from '../constants/index.js';
import CategoriesCard from '../components/CategoriesCard';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchDiscoverNews } from '../../utils/NewsApi';
import Loading from '../components/Loading';
import NewsSection from '../components/NewsSection';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function DiscoverScreen() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('business');
  const [discoverNews, setDiscoverNews] = useState([]);

  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ['discoverNews', activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  useEffect(() => {
    if (discoverNew && discoverNew.articles) {
      const filteredArticles = discoverNew.articles.filter(
        (article) => article.title !== '[Removed]'
      );
      setDiscoverNews(filteredArticles);
    }
  }, [discoverNew]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <SafeAreaView className="pt-4 flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Headbar */}
      <View>
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-red-700 dark:text-white"
            style={{
              fontFamily: 'Roboto',
              fontWeight: '800',
            }}
          >
            Discover
          </Text>

          <Text
            className="text-lg text-gray-600 dark:text-neutral-300"
            style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
            }}
          >
            International headlines
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
        <TouchableOpacity className="pl-2">
          <MagnifyingGlassIcon size="25" color="gray" />
        </TouchableOpacity>
        <TextInput
          onFocus={() => navigation.navigate('Search')}
          placeholder="Search for news"
          placeholderTextColor="gray"
          className="pl-4 flex-1 font-medium text-black tracking-wider"
        />
      </View>

      {/* Categories */}
      <View className="flex-row mx-4">
        <CategoriesCard
          categories={categories}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>

      <View className="h-full">
        {/* Header Title */}
        <View className="my-4 mx-4 flex-row justify-between items-center">
          <Text
            className="text-xl dark:text-white"
            style={{
              fontFamily: 'Roboto',
            }}
          >
            Discover
          </Text>

        </View>
        {isDiscoverLoading ? (
          <View className="justify-center items-center">
            <Loading />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(70),
            }}
          >
            <NewsSection newsProps={discoverNews} label="Discover" />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
