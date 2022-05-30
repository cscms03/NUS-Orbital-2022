import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import MainScreen from "./Screens/MainScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Timer from "./components/StopwatchComponents/CountdownTimer";
import TimeScreen from "./Screens/TimeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
