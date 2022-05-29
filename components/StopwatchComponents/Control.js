import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

function Control({ timerOn, handleLeftButton, handleRightButton }) {
  //These are props of <Control />
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: timerOn ? "#7a7878" : "#bdb9b9" },
        ]}
        onPress={handleLeftButton}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: "white" }}>{timerOn ? "Lap" : "Reset"}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: timerOn ? "#a80603" : "#14a803" },
        ]}
        onPress={handleRightButton}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: timerOn ? "red" : "#0fff03" }}>
            {timerOn ? "Stop" : "Start"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },

  controlButtonBorder: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  controlButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 65,
  },
});

export default Control;
