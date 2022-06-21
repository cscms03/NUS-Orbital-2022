import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

function WorkoutDetails({ name, weight, sets, reps, isDone }) {
  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  );
}

export default WorkoutDetails;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    flexDirection: "row",
    backgroundColor: "#ffcccc",
  },
});
