import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MealInput from "./MealInput";

function Meals({ date, onPressNav }) {
  return (
    <View style={styles.mealInputContainer}>
      <MealInput title="Breakfast" date={date} onPressNav={onPressNav} />

      <MealInput title="Lunch" date={date} onPressNav={onPressNav} />

      <MealInput title="Dinner" date={date} onPressNav={onPressNav} />

      <MealInput title="Snacks-Supper" date={date} onPressNav={onPressNav} />
    </View>
  );
}

export default Meals;

const styles = StyleSheet.create({
  mealInputContainer: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
