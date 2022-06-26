import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheet } from "react-native-btr";
import { TouchableOpacity } from "react-native-gesture-handler";
import SolidButton from "../../components/Authentication/SolidButton";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import EditRoutine from "./EditRoutine";

function WorkoutDetails({ date, name, weight, sets, reps, id, isDone }) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDoneState, setIsDoneState] = useState(isDone);

  const user = auth.currentUser;
  const uid = user.uid;

  const handleItemPress = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const handleIsDonePress = async () => {
    setIsDoneState(!isDoneState);
    const document = doc(db, "users/" + uid + "/routine", id);
    await updateDoc(document, {
      details: {
        // name,
        // weight,
        // sets,
        // reps,
        isDone: !isDoneState,
      },
    });
    setBottomSheetVisible(!bottomSheetVisible);
  };
  const handleEditPress = () => {
    console.log("pressed");
    setModalVisible((prev) => !prev);
  };
  const handleDeletePress = async () => {
    const document = doc(db, "users/" + uid + "/routine", id);
    try {
      await deleteDoc(document);
      Alert.alert("Deleted! Please refresh");
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setBottomSheetVisible(!bottomSheetVisible);
    }
  };
  return (
    <View style={styles.planContainer}>
      <TouchableOpacity onPress={handleItemPress}>
        <LinearGradient
          colors={isDoneState ? ["#cfc", "#66ff66"] : ["#fff", "#f2f2f2"]}
          style={styles.con}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.weight}>{weight}</Text>
          <Text style={styles.kg}> kg</Text>
          <Text style={styles.setsReps}>
            {sets} sets x {reps} reps
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <BottomSheet
        visible={bottomSheetVisible}
        onBackButtonPress={handleItemPress}
        onBackdropPress={handleItemPress}
      >
        <View style={styles.bottomSheetView}>
          <TouchableOpacity onPress={handleIsDonePress}>
            <LinearGradient colors={["#3c3", "#3c3"]} style={styles.button}>
              {isDoneState ? (
                <Text style={styles.textButton}>Mark as not Done</Text>
              ) : (
                <Text style={styles.textButton}>Mark as Done</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEditPress}>
            <LinearGradient colors={["#c00", "#c00"]} style={styles.button}>
              <Text style={styles.textButton}>Edit</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeletePress}>
            <LinearGradient
              colors={["#f2f2f2", "#f2f2f2"]}
              style={styles.button}
            >
              <Text style={{ fontWeight: "bold" }}>Delete</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <EditRoutine
            date={date} // pass the stored data of the item to the form modal
            prevName={name}
            prevWeight={weight}
            prevSets={sets}
            prevReps={reps}
            isUpdating={true}
            id={id}
            isDone={isDoneState}
          />
          <SolidButton
            colors={["#cc0000", "#ff0000"]}
            text="Close"
            alignment="center"
            onPress={handleEditPress}
          />
        </Modal>
      </BottomSheet>
    </View>
  );
}

export default WorkoutDetails;

const styles = StyleSheet.create({
  planContainer: {
    // overflow: "visible",
    width: "100%",
    marginBottom: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  con: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  name: {
    position: "absolute",
    color: "#990000",
    left: "5%",
    top: "5%",
    fontSize: 30,
    fontWeight: "800",
  },
  weight: {
    position: "absolute",
    left: "73%",
    fontSize: 25,
    top: "12%",
    fontWeight: "700",
  },
  kg: {
    position: "absolute",
    left: "89%",
    fontSize: 25,
    top: "12%",
    fontWeight: "700",
  },
  setsReps: {
    position: "absolute",
    left: "5%",
    top: "67%",
    fontSize: 22,
    fontWeight: "700",
  },
  bottomSheetView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  button: {
    width: 220,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    margin: 13,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
});
