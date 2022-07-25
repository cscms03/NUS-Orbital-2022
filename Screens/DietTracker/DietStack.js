import { View, Text } from "react-native";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DietTracker from "./DietTracker";
import SearchMealScreen from "./SearchMealScreen";
import MealInput from "../../components/DietTracker/MealInput";

const Stack = createStackNavigator();

function DietStack() {
  return (
    <Stack.Navigator initialRouteName="DietTracker">
      <Stack.Screen
        name="DietTracker"
        component={DietTracker}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="MealInput"
        component={MealInput}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="SearchMealScreen"
        component={SearchMealScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DietStack;
