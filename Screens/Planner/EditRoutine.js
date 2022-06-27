import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import InputField from "../../components/Planner/InputField";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import NumericInput from "react-native-numeric-input";
import { auth, db } from "../../firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import update from "../../assets/update.png";

function EditRoutine({
  date,
  prevName,
  prevWeight,
  prevSets,
  prevReps,
  isUpdating = false,
  id,
  isDone,
}) {
  const user = auth.currentUser;
  const uid = user.uid;
  const selectedDate = JSON.stringify(date)?.substring(1, 11);

  const routineCol = collection(db, "users/" + uid + "/routine");
  const userRoutineDoc = "users/" + uid;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const handleUpdatePress = async () => {
    const document = doc(db, "users/" + uid + "/routine", id);
    await updateDoc(document, {
      details: {
        name,
        weight,
        sets,
        reps,
        isDone,
      },
    });
    Alert.alert("Plan updated! Please exit");
  };

  const handleAddPress = async () => {
    try {
      if (selectedDate === undefined) Alert.alert("Please select a date");
      await addDoc(collection(db, userRoutineDoc, "routine"), {
        date: selectedDate,
        createdAt: serverTimestamp(),
        details: {
          name: name,
          weight: weight,
          sets: sets,
          reps: reps,
          isDone: false,
        },
      });
      Alert.alert("Plan added! Please exit");
    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message);
    }
  };

  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  // const [id, setId] = useState(0); //have unique id for each workout component

  const name = getValues("Workout-Name");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ marginBottom: 25 }}>
          <Text style={[styles.label, { marginLeft: 5 }]}>Workout Name</Text>
          <InputField
            name="Workout-Name"
            placeholder="Workout Name"
            control={control}
            secureTextEntry={false}
            defaultValue={prevName}
            rules={{
              required: "Workout name is a required field",
            }}
          />
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={[styles.label, { marginLeft: 10 }]}>Weight </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={styles.weightContainer}>
              <TextInput
                style={styles.weightInput}
                value={weight}
                defaultValue={prevWeight || ""}
                onChangeText={(num) => setWeight(num)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            <Text style={{ fontSize: 23, marginLeft: 5 }}> kg</Text>
          </View>
        </View>

        <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <Text style={[styles.label, { marginBottom: 10 }]}>Sets</Text>
            <NumericInput
              minValue={0}
              maxValue={10}
              rightButtonBackgroundColor="#cc0000"
              leftButtonBackgroundColor="#cc0000"
              value={sets}
              onChange={(num) => setSets(num)}
              rounded={true}
              iconStyle={{ color: "white" }}
              defaultValue={prevSets || 0}
            />
          </View>

          <View style={styles.counter}>
            <Text style={[styles.label, { marginBottom: 10 }]}>Reps</Text>
            <NumericInput
              minValue={0}
              maxValue={30}
              rightButtonBackgroundColor="#cc0000"
              leftButtonBackgroundColor="#cc0000"
              value={reps}
              onChange={(num) => setReps(num)}
              rounded={true}
              iconStyle={{ color: "white" }}
              defaultValue={prevReps || 0}
            />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {isUpdating ? (
            <TouchableOpacity onPress={handleSubmit(handleUpdatePress)}>
              <LinearGradient
                colors={["white", "white"]}
                style={styles.addButton}
              >
                <Image source={update} style={{ width: 100, height: 100 }} />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit(handleAddPress)}>
              <LinearGradient
                colors={["#cc0000", "#ff0000"]}
                style={styles.addButton}
              >
                <Text style={styles.plus}>+</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EditRoutine;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    margin: 30,
    padding: 5,
  },
  label: {
    fontSize: 20,
    color: "#CC0000",
    fontWeight: "bold",
  },
  weightContainer: {
    backgroundColor: "white",
    width: "40%",
    height: 60,
    borderWidth: 1.2,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  weightInput: {
    fontSize: 26,
  },
  counter: {
    width: 160,
    height: 130,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingTop: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    position: "absolute",
    left: "22%",
    top: "-13%",
    color: "white",
    fontSize: 60,
  },
});
