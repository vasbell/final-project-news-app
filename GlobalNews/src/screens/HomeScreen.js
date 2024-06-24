import { View, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { fetchBreakingNews } from '../../utils/NewsApi';
import { fetchRecommendedNews } from '../../utils/NewsApi';
import { useColorScheme } from 'nativewind';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  // const [breakingNews, setBreakingNews] = useState([]);
  // const [recommendedNews, setRecommendedNews] = useState([]);

  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });

  // Recommended News
  // const { data: recommendedNews, isLoading: isRecommendedLoading } = useQuery({
  //   queryKey: ["recommededNewss"],
  //   queryFn: fetchRecommendedNews,
  // });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View>
        <Header />

        {
        isBreakingLoading ? (
          <Loading />
        ) : (
          <View className="">
            <MiniHeader label="Breaking News"/>
            <BreakingNews label={"Breaking News"} data={data.articles} />
          </View>
        )}

      {/* Recommended News */}
      {/* <View>
          <MiniHeader label="Recommended" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          > */}
            {/* {isRecommendedLoading ? (
              <Loading />
            ) : (
              <NewsSection
                label="Recommendation"
                newsProps={recommendedNew.articles}
              />
            )} */}
          {/* </ScrollView> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}