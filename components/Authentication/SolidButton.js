import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function SolidButton({ text, colors, alignment, onPress }) {
  return (
    <View style={[styles.container, { alignItems: alignment }]}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient colors={colors} style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default SolidButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },

  button: {
    width: 200,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },
});
