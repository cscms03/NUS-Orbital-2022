import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { Component } from "react";

function SearchMealScreen({ navigation, meal }) {
  return (
    <SafeAreaView>
      <Text>{meal}</Text>
    </SafeAreaView>
  );
}

export default SearchMealScreen;
