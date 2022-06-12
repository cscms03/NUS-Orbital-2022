import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function TextButton({ text, buttonText, alignment, onPress, marginTop = 10 }) {
  return (
    <View style={[styles.container, { justifyContent: alignment, marginTop }]}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}> {buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    color: "grey",
    fontSize: 12,
  },

  buttonText: {
    color: "#800000",
    fontSize: 12,
  },
});
