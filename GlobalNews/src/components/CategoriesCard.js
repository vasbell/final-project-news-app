import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useColorScheme } from 'react-native';

export default function CategoriesCard({ categories, activeCategory, handleChangeCategory }) {
  const colorScheme = useColorScheme(); // Get current color scheme

  // Function to determine active styles based on color scheme
  const getActiveStyles = (isActive) => {
    if (isActive) {
      return {
        buttonBackground: colorScheme === 'dark' ? "#AD0000" : "#b91c1c", // Adjust background color for active item
        text: colorScheme === 'dark' ? "white" : "white", // Adjust text color for active item
        fontWeight: "bold"
      };
    } else {
      return {
        buttonBackground: colorScheme === 'dark' ? "gray" : "#E0E0E0", // Adjust background color for inactive item
        text: colorScheme === 'dark' ? "white" : "black", // Adjust text color for inactive item
        fontWeight: "normal", 
      };
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 10,
        }}
      >
        {categories.map((category, index) => {
          const isActive = category.title === activeCategory;
          const { buttonBackground, text, fontWeight } = getActiveStyles(isActive);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.title)}
              style={{
                flex: 1,
                alignItems: 'center',
                marginHorizontal: 5,
              }}
            >
              <View
                style={{
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: buttonBackground,
                }}
              >
                <Text
                  style={{
                    color: text,
                    fontSize: hp(1.7),
                    fontFamily: "Roboto",
                    fontWeight: fontWeight,
                  }}
                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
