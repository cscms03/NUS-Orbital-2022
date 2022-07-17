import React, { useEffect, useRef } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile/ProfileScreen";
import DietTracker from "./DietTracker/DietTracker";
import ProgressTracker from "./ProgressTracker";
import TimeScreen from "./TimeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Planner from "./Planner/Planner";
import ProfileStack from "./Profile/ProfileStack";

export default function MainScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <StatusBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = "md-person";
            } else if (route.name === "Time") {
              iconName = "ios-timer";
            } else if (route.name === "Planner") {
              iconName = "calendar";
            } else if (route.name === "Diet") {
              iconName = "nutrition";
            } else if (route.name === "Progress") {
              iconName = "checkmark-done-circle-sharp";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#CC0000",
          tabBarInactiveTintColor: "gray",
          headerStyle: {
            backgroundColor: "#CC0000",
          },
          headerTintColor: "white",
        })}
      >
        <Tab.Screen
          name="Diet"
          component={DietTracker}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Planner"
          component={Planner}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Time"
          component={TimeScreen}
          options={{ headerShown: true }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Progress"
          component={ProgressTracker}
          options={{ headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  setWidthHeightFull: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
