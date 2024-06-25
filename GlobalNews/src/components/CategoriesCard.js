import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function CategoriesCard({categories, activeCategory, handleChangeCategory,}) {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-3"
                contentContainerStyle={{
                paddingRight: 10,
                }}
            >
            {categories.map((category, index) => {
                let isActive = category.title == activeCategory;
                let activeButtonClass = isActive ? "bg-red-700 " : "bg-black/10 dark:bg-neutral-400 ";
                let activeTextClass = isActive ? "text-white font-semibold" : "text-gray-600 dark:text-neutral-600 ";
  
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleChangeCategory(category.title)}
                    className="flex items-center space-y-1"
                >
                    <View
                        className={
                            "rounded-full py-2 px-4 " + activeButtonClass
                        }>
                        <Text
                            className={activeTextClass}
                            style={{
                            fontSize: hp(1.7),
                            fontFamily: "Roboto",
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