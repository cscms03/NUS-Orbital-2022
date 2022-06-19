import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

function Routine({ date }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 17 }}>
        Selected Date: {JSON.stringify(date)}
      </Text>
    </ScrollView>
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
