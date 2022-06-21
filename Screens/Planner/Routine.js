import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import WorkoutDetails from "./WorkoutDetails";

function Routine({ date }) {
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={(item) => {
          <WorkoutDetails />;
        }}
      />
    </View>
  );
}

export default Routine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 5,
  },

  editContainer: {
    position: "absolute",
    right: "6%",
    top: "80%",
  },

  editButton: {
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: "#cc0000",
  },
});
