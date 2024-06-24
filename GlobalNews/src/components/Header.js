import { View, Text, Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind'; 
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useFonts } from 'expo-font';

export default function Header() {
    const navigation = useNavigation();
    const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View>
        <Text className="text-3xl"
        style={{
            fontFamily: "Roboto",
            fontWeight: '800',
            color: 'rgba(179, 179, 179, 1)'
        }}>
            NEWS
        </Text>
      </View>

      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme} /> 
        <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            className="bg-gray-300 dark:bg-white rounded-full p-2">

            <MagnifyingGlassIcon
                size={25}
                color={colorScheme === 'dark' ? 'black' : 'white'}
                strokeWidth={3}
            /> 
        
        </TouchableOpacity>
      </View>
    </View>
  )
}