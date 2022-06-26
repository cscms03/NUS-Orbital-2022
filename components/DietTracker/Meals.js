import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MealInput from "./MealInput";

function Meals({ date }) {
  return (
    <View style={styles.mealInputContainer}>
      <MealInput title="Breakfast" date={date} />

      <MealInput title="Lunch" date={date} />

      <MealInput title="Dinner" date={date} />

      <MealInput title="Snacks-Supper" date={date} />
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
