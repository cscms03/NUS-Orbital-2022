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
import WeekView from "../../components/DietTracker/WeekView";
import MealInput from "../../components/DietTracker/MealInput";
import Meals from "../../components/DietTracker/Meals";

function DietTracker() {
  const [pressed, setPressed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [thisDate, setThisDate] = useState(getDate(0));
  // const [daysAway, setDaysAway] = useState(0);

  const thisDate = useRef(getDate(0));
  const daysAway = useRef(0);

  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  const today = new Date();

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

  const handlePrevious = () => {
    if (daysAway.current >= 7) {
      Alert.alert("You can only view data from the last 7 days");
    } else {
      daysAway.current++;
      thisDate.current = getDate(daysAway.current);
    }
  };

  const handleNext = () => {
    if (daysAway.current === 0) {
      Alert.alert("Cannot view/edit tomorrow's data!");
    } else {
      daysAway.current--;
      thisDate.current = getDate(daysAway.current);
    }
  };

  function getDate(days) {
    const date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * days);
    return JSON.stringify(JSON.stringify(date).substring(1, 11));
  }

  const handleUnderLayShown = () => {
    setPressed(true);
  };

  const handleUnderLayHidden = () => {
    setPressed(false);
  };

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
        <TouchableHighlight
          style={{ marginRight: 10, borderRadius: 20 }}
          onPress={handlePrevious}
          underlayColor="blue"
          onShowUnderlay={handleUnderLayShown}
          onHideUnderlay={handleUnderLayHidden}
        >
          <MaterialIcons
            name="navigate-before"
            size={33}
            color={pressed ? "white" : "black"}
          />
        </TouchableHighlight>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          {thisDate.current.substring(1, 11)}
        </Text>
        <TouchableHighlight
          style={{ marginRight: 10, borderRadius: 20 }}
          onPress={handleNext}
          underlayColor="blue"
          onShowUnderlay={handleUnderLayShown}
          onHideUnderlay={handleUnderLayHidden}
        >
          <MaterialIcons
            name="navigate-next"
            size={33}
            color={pressed ? "white" : "black"}
          />
        </TouchableHighlight>
      </View>

      <View style={styles.tabContainer}>
        <SegmentedControlTab
          values={["Day", "Week"]}
          onTabPress={handleTabPress}
          selectedIndex={selectedIndex}
          tabsContainerStyle={{ borderColor: "#cc0000" }}
        />
      </View>

      <View style={styles.viewContainer}>
        {selectedIndex === 0 ? (
          <DayView date={thisDate.current.substring(1, 11)} />
        ) : (
          <WeekView />
        )}
      </View>
      <ScrollView
        style={styles.mealInputContainer}
        showsVerticalScrollIndicator={false}
      >
        <Meals date={thisDate.current.substring(1, 11)} />
      </ScrollView>
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
});

export default DietTracker;
