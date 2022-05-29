import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/logo.png";
import Stopwatch from "./Stopwatch";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import Planner from "../Screens/Planner";
import DietTracker from "../Screens/DietTracker";
import ProgressTracker from "../Screens/ProgressTracker";

export default function SplashScreen() {
  const Tab = createBottomTabNavigator();

  //SafeArea value
  const edges = useSafeAreaInsets();

  //Animation values
  const startAnimation = useRef(new Animated.Value(0)).current;

  //Scaling down logo
  const scaleLogo = useRef(new Animated.Value(1)).current;

  //Move logo to top right
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    //Animation starts after 700ms
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 50),
          useNativeDriver: true,
        }),

        Animated.timing(scaleLogo, {
          toValue: 0.3,
          useNativeDriver: true,
        }),

        Animated.timing(moveLogo, {
          toValue: {
            x: -(Dimensions.get("window").width / 2) + 45,
            y: Dimensions.get("window").height / 2 - 20,
          },
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  }, []);

  return (
    <View style={style.setWidthHeightFull}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "#CC0000",
          zIndex: 1,
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={Logo}
            style={{
              width: 150,
              height: 150,
              marginBottom: 20,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                {
                  scale: scaleLogo,
                },
              ],
            }}
          ></Animated.Image>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "white",
          zIndex: 0,
        }}
      >
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Planner" component={Planner} />
            <Tab.Screen name="Timer" component={Stopwatch} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Diet Tracker" component={DietTracker} />
            <Tab.Screen name="Progress Tracker" component={ProgressTracker} />
          </Tab.Navigator>
        </NavigationContainer>
      </Animated.View>
    </View>
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
