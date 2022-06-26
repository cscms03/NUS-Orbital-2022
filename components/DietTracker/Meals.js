import React, { Component, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import MealInput from "./MealInput";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import SolidButton from "../Authentication/SolidButton";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

function Meals({ date }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const user = auth.currentUser;
  const uid = user.uid;
  const dietCol = collection(db, "users/" + uid + "/diet");

  const [currMeal, setCurrMeal] = useState("");
  const [modal, setModal] = useState(false);
  const foodName = getValues("food");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");

  const [proteinAmt, setProteinAmt] = useState(0);
  const [caloriesAmt, setCaloriesAmt] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const mealRef = useRef("");

  const proteinNum = Number(protein);
  const caloriesNum = Number(calories);

  return (
    <View style={styles.mealInputContainer}>
      <MealInput title="Breakfast" date={date} modal={modal} />

      <MealInput title="Lunch" date={date} modal={modal} />

      <MealInput title="Dinner" date={date} modal={modal} />

      <MealInput title="Snacks-Supper" date={date} modal={modal} />
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
