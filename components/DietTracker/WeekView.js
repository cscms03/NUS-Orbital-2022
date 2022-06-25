import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

function WeekView() {
  const data = {
    labels: ["Protein", "Calories"],
    data: [0.4, 0.8],
  };

  return (
    <Swiper loop={false}>
      <View style={styles.proteinView}></View>
      <View style={styles.caloriesView}>
        <Text>Calories</Text>
      </View>
    </Swiper>
  );
}

export default WeekView;

const styles = StyleSheet.create({
  proteinView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
  },
  caloriesView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
  },
});
