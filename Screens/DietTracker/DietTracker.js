// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import DayView from "../../components/DietTracker/DayView";
import History from "../../components/DietTracker/History";
import MealInput from "../../components/DietTracker/MealInput";
import Meals from "../../components/DietTracker/Meals";

function DietTracker() {
  const [pressed, setPressed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const today = new Date();

  console.log(today);

  //prints date object in yyyy-mm-dd format
  const printDate = () => {
    return (
      `${new Date().getFullYear()}` +
      "-" +
      `${new Date().getMonth() + 1}` +
      "-" +
      `${new Date().getDate()}`
    );
  };

  const date = printDate();

  const handleTabPress = () => {
    setSelectedIndex(selectedIndex === 0 ? 1 : 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#f4f4f4",
          width: "100%",
          height: getStatusBarHeight(),
          position: "absolute",
        }}
      >
        <StatusBar barStyle="dark-content" />
      </View>

      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{date}</Text>
      </View>

      <View style={styles.tabContainer}>
        <SegmentedControlTab
          values={["Today", "History"]}
          onTabPress={handleTabPress}
          selectedIndex={selectedIndex}
          tabsContainerStyle={{ borderColor: "#cc0000" }}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={{ color: "#cc0000" }}
        />
      </View>

      {selectedIndex === 0 ? (
        <>
          <View style={styles.viewContainer}>
            <DayView date={date} />
          </View>
          <ScrollView
            style={styles.mealInputContainer}
            showsVerticalScrollIndicator={false}
          >
            <Meals date={date} />
          </ScrollView>
        </>
      ) : (
        <History date={date} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabContainer: {
    width: "90%",
    margin: 10,
  },
  viewContainer: {
    height: "50%",
    width: "93%",
    borderRadius: 10,
  },
  mealInputContainer: {
    width: "93%",
    height: "50%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  tabStyle: {
    borderColor: "#CC0000",
  },
  activeTabStyle: {
    backgroundColor: "#cc0000",
  },
});

export default DietTracker;
