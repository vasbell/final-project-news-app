import { View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { fetchSearchNews } from '../../utils/NewsApi';
import { XMarkIcon } from 'react-native-heroicons/outline';
import NewsSection from '../components/NewsSection';

export default function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleSearch = async (search) => {
    if (search && search.length >= 3) {
      setLoading(true);
      setResults([]);
      setSearch(search);

      try {
        const data = await fetchSearchNews(search);
        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.log('Error fetching search results', error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1000), []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <View className="mx-4 mb-3 mt-12 justify-between flex-row p-2 items-center bg-neutral-100 rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search for news'
          placeholderTextColor={'gray'}
          className="font-medium text-black tracking-wider p-3 py-1 w-[90%]"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={25} color="gray" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View className="mx-4 mb-4">
        <Text className="text-xl dark:text-white" style={{ fontFamily: 'Roboto' }}>
          {results.length} News for {search}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#b91c1c" />
      ) : (
        <ScrollView keyboardDismissMode='on-drag' contentContainerStyle={{ paddingBottom: 20 }}>
          <NewsSection newsProps={results} label="Search Results" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
