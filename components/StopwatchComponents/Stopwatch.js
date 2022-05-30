import React, { useCallback, useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Laps from "./Laps";
import Control from "./Control";
import { displayTime } from "./timer";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [lapItems, setLapItems] = useState([]);
  const timer = useRef(null);

  const handleLeftButton = useCallback(() => {
    if (timerOn) {
      setLapItems((prevLapItems) => [time, ...prevLapItems]);
    } else {
      setLapItems([]);
      setTime(0);
    }
  }, [timerOn, time]);

  const handleRightButton = useCallback(() => {
    if (!timerOn) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);

      timer.current = interval;
    } else {
      clearTimeout(timer.current);
    }
    setTimerOn((prevTimerState) => !prevTimerState);
  }, [timerOn]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{displayTime(time)}</Text>
      </View>

      <View style={styles.control}>
        <Control
          timerOn={timerOn}
          handleLeftButton={handleLeftButton}
          handleRightButton={handleRightButton}
        />
      </View>

      <View style={styles.laps}>
        <Laps laps={lapItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },

  timerContainer: {
    flex: 2 / 6,
    justifyContent: "center",
    alignItems: "center",
  },

  timerText: {
    fontSize: 70,
    color: "black",
    fontWeight: "200",
  },

  control: {
    flex: 1 / 6,
  },

  laps: {
    flex: 3 / 6,
  },
});

export default Stopwatch;
