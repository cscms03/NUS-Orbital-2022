import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

function BodyInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>M</Text>
        <Text style={styles.infoLabel}>Gender</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>18</Text>
        <Text style={styles.infoLabel}>Age</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>50</Text>
        <Text style={styles.infoLabel}>Weight</Text>
      </View>
    </View>
  );
}

export default BodyInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  infoContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
  info: {
    fontSize: 23,
    fontWeight: "700",
    color: "#800",
  },
  infoLabel: {
    fontWeight: "600",
    // color: "#600",
  },
});
