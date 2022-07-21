import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";

function SettingButtons({ title, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.08 }}>{icon}</View>
        <View style={{ flex: 0.92 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SettingButtons;

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 27,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 13,
  },
});
