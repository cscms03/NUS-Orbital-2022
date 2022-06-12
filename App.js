import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Logo from "./assets/logo.png";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./Screens/MainScreen";
import StartScreen from "./Screens/StartScreen";
import RootStack from "./Screens/Auth/RootStack";

export default function App() {
  // //SafeArea value

  // //Animation values
  // const startAnimation = useRef(new Animated.Value(0)).current;

  // //Scaling down logo
  // const scaleLogo = useRef(new Animated.Value(1)).current;

  // //Move logo to top right
  // const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // useEffect(() => {
  //   //Animation starts after 2000ms
  //   setTimeout(() => {
  //     Animated.parallel([
  //       Animated.timing(startAnimation, {
  //         toValue:
  //           -Dimensions.get("window").height + StatusBar.currentHeight + 95,
  //         useNativeDriver: true,
  //       }),

  //       Animated.timing(scaleLogo, {
  //         toValue: 0.3,
  //         useNativeDriver: true,
  //       }),

  //       Animated.timing(moveLogo, {
  //         toValue: {
  //           x: -(Dimensions.get("window").width / 2) + 45,
  //           y: Dimensions.get("window").height / 2 - 20,
  //         },
  //         useNativeDriver: true,
  //       }),
  //     ]).start();
  //   }, 2000);
  // }, []);

  // return (
  //   <SafeAreaProvider>
  //     <View style={style.setWidthHeightFull}>
  //       <Animated.View
  //         style={{
  //           flex: 1,
  //           backgroundColor: "#CC0000",
  //           zIndex: 1,
  //           transform: [{ translateY: startAnimation }],
  //         }}
  //       >
  //         <Animated.View
  //           style={{
  //             flex: 1,
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <Animated.Image
  //             source={Logo}
  //             style={{
  //               width: 150,
  //               height: 150,
  //               marginBottom: 20,
  //               transform: [
  //                 { translateX: moveLogo.x },
  //                 { translateY: moveLogo.y },
  //                 {
  //                   scale: scaleLogo,
  //                 },
  //               ],
  //             }}
  //           ></Animated.Image>
  //         </Animated.View>
  //       </Animated.View>
  //       <Animated.View
  //         style={{
  //           position: "absolute",
  //           top: 0,
  //           bottom: 0,
  //           right: 0,
  //           left: 0,
  //           backgroundColor: "white",
  //           zIndex: 0,
  //         }}
  //       >
  //         <MainScreen />
  //       </Animated.View>
  //     </View>
  //   </SafeAreaProvider>
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <RootStack />
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
