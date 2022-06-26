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
import Modal from "react-native-modal";
import SolidButton from "../Authentication/SolidButton";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { BottomSheet } from "react-native-btr";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  QuerySnapshot,
  onSnapshot,
  increment,
  deleteDoc,
} from "firebase/firestore";

function MealInput({ title }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const printDate = () => {
    return (
      `${new Date().getFullYear()}` +
      "-" +
      `${new Date().getMonth() + 1}` +
      "-" +
      `${new Date().getDate()}`
    );
  };
  const date = printDate();
  const user = auth.currentUser;
  const uid = user.uid;
  const dietCol = collection(db, "users/" + uid + "/diet");

  const [currMeal, setCurrMeal] = useState("");
  const [modal, setModal] = useState(false);
  const foodName = getValues("food");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [mealItem, setMealItem] = useState([]);
  const [BottomSheetVisible, setBottomSheetVisible] = useState(false);

  const proteinNum = Number(protein);
  const caloriesNum = Number(calories);
  const docRef = doc(collection(db, "users/" + uid + "/diet"), date);
  const dietColRef = doc(
    collection(db, "users/" + uid + "/diet/" + date, title),
    "default"
  );

  const handleAddPress = async () => {
    setDoc(
      dietColRef,
      {
        name: foodName,
        isAdded: true,
        protein: proteinNum,
        calories: caloriesNum,
      },
      { merge: true }
    )
      .then(() => {
        setDoc(
          docRef,
          {
            weekAgo: 0, //this week: 0, last week: 1, two weeks ago or more: 2
            date: date,
            totalProtein: increment(proteinNum),
            totalCalories: increment(caloriesNum),
          },
          { merge: true }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      })
      .finally(() => {
        setModal(!modal);
      });
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleBottomSheet = () => {
    setBottomSheetVisible(!BottomSheetVisible);
  };

  const handleReset = async () => {
    try {
      await deleteDoc(
        doc(
          collection(db, "users/" + uid + "/diet/" + date + "/Breakfast"),
          "default"
        )
      );
      await deleteDoc(
        doc(
          collection(db, "users/" + uid + "/diet/" + date + "/Lunch"),
          "default"
        )
      );
      await deleteDoc(
        doc(
          collection(db, "users/" + uid + "/diet/" + date + "/Dinner"),
          "default"
        )
      );
      await deleteDoc(
        doc(
          collection(db, "users/" + uid + "/diet/" + date + "/Snacks"),
          "default"
        )
      );
      await setDoc(docRef, {
        weekAgo: 0, //this week: 0, last week: 1, two weeks ago or more: 2
        date: date,
        totalProtein: 0,
        totalCalories: 0,
      });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setBottomSheetVisible(!BottomSheetVisible);
    }
  };

  const handleDelete = async () => {
    try {
      const docSnap = await getDoc(
        doc(
          collection(db, "users/" + uid + "/diet/" + date + "/" + title),
          "default"
        )
      );
      const prevProtein = docSnap.data().protein;
      const prevCal = docSnap.data().calories;

      await deleteDoc(
        doc(
          collection(db, "users/" + uid + "/diet/" + date + "/" + title),
          "default"
        )
      );
      await setDoc(
        docRef,
        {
          weekAgo: 0, //this week: 0, last week: 1, two weeks ago or more: 2
          date: date,
          totalProtein: increment(-prevProtein),
          totalCalories: increment(-prevCal),
        },
        { merge: true }
      );
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setBottomSheetVisible(!BottomSheetVisible);
    }
  };

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users/" + uid + "/diet/" + date + "/" + title),
        (snapshot) => {
          setMealItem(snapshot?.docs?.map((doc) => doc.data()));
          console.log(mealItem);
        }
      ),
    [date]
  );

  return (
    <TouchableOpacity
      onPress={mealItem[0]?.isAdded ? handleBottomSheet : handleModal}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: mealItem[0]?.isAdded ? "#cfc" : "white" },
        ]}
      >
        <Text>{title}</Text>
        <Text></Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>

      <View>
        <Modal isVisible={modal} style={styles.modal} avoidKeyboard={true}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#930000",
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {title}
              </Text>
            </View>
            <CustomInput
              name="food"
              placeholder="Food name"
              control={control}
              secureTextEntry={false}
              rules={{
                required: "Please provide what food you had.",
              }}
            />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}> Protein:</Text>
                <TextInput
                  value={protein}
                  keyboardType="numeric"
                  onChangeText={(prot) => setProtein(prot)}
                  placeholder="g"
                  style={styles.numberField}
                  maxLength={4}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}> Calories:</Text>
                <TextInput
                  value={calories}
                  keyboardType="numeric"
                  onChangeText={(cal) => setCalories(cal)}
                  placeholder="kcal"
                  style={styles.numberField}
                  maxLength={4}
                />
              </View>
            </View>

            <SolidButton
              colors={["#c00", "#c00"]}
              text="Add"
              alignment="center"
              onPress={handleSubmit(handleAddPress)}
            />

            <TouchableOpacity
              onPress={handleModal}
              style={{ alignItems: "flex-end", marginTop: 17 }}
            >
              <Text style={{ color: "blue" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <BottomSheet
        visible={BottomSheetVisible}
        onBackButtonPress={handleBottomSheet}
        onBackdropPress={handleBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity
            style={styles.bottomSheetButton}
            onPress={handleDelete}
          >
            <AntDesign name="delete" size={20} color="red" />
            <Text style={{ fontSize: 17, marginLeft: 17, color: "red" }}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBottomSheet}
            style={[styles.bottomSheetButton]}
          >
            <MaterialIcons name="cancel" size={20} color="black" />
            <Text style={{ fontSize: 17, marginLeft: 17 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.bottomSheetButton, { borderBottomColor: "white" }]}
          >
            <MaterialIcons name="auto-delete" size={24} color="grey" />
            <Text style={{ fontSize: 17, marginLeft: 17, color: "grey" }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </TouchableOpacity>
  );
}

export default MealInput;

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: 53,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 1.5,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 10,
    flexDirection: "row",
  },
  modal: {
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width * 0.83,
    height: 395,
    backgroundColor: "white",
    borderRadius: 15,
    backgroundColor: "#f9fbfc",
    padding: 20,
  },
  protein: {
    width: 160,
    height: 130,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  numberField: {
    backgroundColor: "white",
    width: 100,
    height: 47,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 13,
  },
  label: {
    color: "#930000",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomSheetContainer: {
    width: "100%",
    height: 230,
    borderRadius: 15,
    backgroundColor: "white",
    paddingTop: 30,
  },
  bottomSheetButton: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 17,
    borderColor: "#e6e6e6",
  },
});
