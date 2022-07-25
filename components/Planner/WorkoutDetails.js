import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheet } from "react-native-btr";
import SolidButton from "../Authentication/SolidButton";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import EditRoutine from "../../Screens/Planner/EditRoutine";

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
    try {
      setIsDoneState(!isDoneState);
      const document = doc(db, "users/" + uid + "/routine", id);
      await updateDoc(document, {
        details: {
          name,
          weight,
          sets,
          reps,
          isDone: !isDoneState,
        },
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
    } finally {
      setBottomSheetVisible(!bottomSheetVisible);
    }
  };
  const handleEditPress = () => {
    setModalVisible((prev) => !prev);
  };

  const handleDeletePress = async () => {
    const document = doc(db, "users/" + uid + "/routine", id);
    try {
      await deleteDoc(document);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setBottomSheetVisible(!bottomSheetVisible);
    }
  };

  return (
    <View
      style={[
        styles.planContainer,
        { backgroundColor: isDoneState ? "#9f9" : "#fff" },
      ]}
    >
      <TouchableOpacity onPress={handleItemPress}>
        <View style={styles.con}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsColumn}>
              <Text style={styles.units}>S</Text>
              <Text style={styles.details}>{sets}</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.units}>R</Text>
              <Text style={styles.details}>{reps}</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.units}>kg</Text>
              <Text style={styles.details}>{weight}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheet
        visible={bottomSheetVisible}
        onBackButtonPress={handleItemPress}
        onBackdropPress={handleItemPress}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity
            onPress={handleIsDonePress}
            style={styles.bottomSheetButton}
          >
            {!isDoneState ? (
              <>
                <Ionicons name="checkmark-done" size={24} color="#093" />
                <Text
                  style={{
                    color: "#093",
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Mark as done
                </Text>
              </>
            ) : (
              <>
                <Entypo name="circle-with-cross" size={24} color="#800000" />
                <Text
                  style={{
                    color: "#800000",
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Mark as not done
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.bottomSheetButton}
          >
            <MaterialIcons name="edit" size={24} color="black" />
            <Text
              style={{
                color: "black",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeletePress}
            style={styles.bottomSheetButton}
          >
            <AntDesign name="delete" size={24} color="red" />
            <Text
              style={{
                color: "red",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Delete
            </Text>
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
            colors={["#cc0000", "#cc0000"]}
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
    width: "100%",
    marginBottom: 6,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    borderRadius: 15,
  },
  con: {
    width: "100%",
    height: 100,
    padding: 5,

    flexDirection: "row",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
  },

  bottomSheetContainer: {
    width: "100%",
    height: 230,
    borderRadius: 15,
    backgroundColor: "white",
    paddingTop: 30,
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
  nameContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  detailsContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailsColumn: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  units: {
    textAlign: "center",
    marginVertical: 4,
    fontSize: 15,
    color: "#b30000",
    fontWeight: "500",
  },
  details: {
    textAlign: "center",
    marginVertical: 4,
    fontSize: 23,
    fontWeight: "600",
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
