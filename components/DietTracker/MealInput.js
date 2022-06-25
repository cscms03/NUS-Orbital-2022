import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import SolidButton from "../Authentication/SolidButton";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

function MealInput({ title, date }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [modal, setModal] = useState(false);
  const foodName = getValues("food");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddPress = () => {
    // try {
    //   await addDoc(collection(db, u, "routine"), {
    //     date: date,
    //     createdAt: serverTimestamp(),
    //     breakfast: {
    //       protein: protein,

    //     },
    //     lunch: {

    //     },
    //     dinner: {

    //     },
    //     snacks: {

    //     }
    //   });
    //   Alert.alert("Plan added! Please exit");
    // } catch (error) {
    //   console.log(error.message);
    //   Alert.alert(error.message);
    // }s
    setModal(!modal);
  };

  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <TouchableOpacity onPress={handleModal}>
        <View style={styles.container}>
          <Text>{title}</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View>
        <Modal isVisible={modal} style={styles.modal} avoidKeyboard={true}>
          <View style={styles.modalContainer}>
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
    </>
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
    height: 375,
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
});
