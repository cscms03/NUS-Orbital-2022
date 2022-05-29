import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { displayTime } from "./timer";

function Laps({ laps }) {
  return (
    <ScrollView>
      <View style={styles.lapItems} />
      {laps.map((item, index) => (
        <View key={index} style={styles.lapItems}>
          <Text style={{ color: "black" }}>Lap {laps.length - index}</Text>
          <Text style={{ color: "black" }}>{displayTime(item)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lapItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    borderBottomWidth: 1,
    borderColor: "black",
    height: 50,
    paddingHorizontal: 15,
  },
});

export default Laps;
