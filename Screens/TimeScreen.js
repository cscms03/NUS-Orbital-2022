import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "react-native";
import Timer from "../components/StopwatchComponents/CountdownTimer";
import Stopwatch from "../components/StopwatchComponents/Stopwatch";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-web";

const Tab = createMaterialTopTabNavigator();

export default function TimeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Stopwatch" component={Stopwatch} />
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
