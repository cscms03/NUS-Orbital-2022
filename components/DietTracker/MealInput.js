import React, { Component, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import SolidButton from "../Authentication/SolidButton";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { BottomSheet } from "react-native-btr";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
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
import MealList from "./MealList";

function MealInput({ navigation, title, onPressNav }) {
  const {
    control,
    formState: { errors },
    watch,
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

  const [modal, setModal] = useState(false);
  const foodName = watch("food");
  const [mealItem, setMealItem] = useState([]);
  const [BottomSheetVisible, setBottomSheetVisible] = useState(false);

  const docRef = doc(collection(db, "users/" + uid + "/diet"), date);
  const dietColRef = doc(
    collection(db, "users/" + uid + "/diet/" + date, title),
    "default"
  );

  // const handleAddPress = async () => {
  //   setDoc(
  //     dietColRef,
  //     {
  //       name: foodName,
  //       isAdded: true,
  //       protein: proteinNum,
  //       calories: caloriesNum,
  //     },
  //     { merge: true }
  //   )
  //     .then(() => {
  //       setDoc(
  //         docRef,
  //         {
  //           weekAgo: 0, //this week: 0, last week: 1, two weeks ago or more: 2
  //           date: date,
  //           totalProtein: increment(proteinNum),
  //           totalCalories: increment(caloriesNum),
  //         },
  //         { merge: true }
  //       );
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       Alert.alert(errorCode, errorMessage);
  //     })
  //     .finally(() => {
  //       setModal(!modal);
  //     });
  // };

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
          collection(db, "users/" + uid + "/diet/" + date + "/Snacks-Supper"),
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
        }
      ),
    [date]
  );

  useEffect(() => {
    setModal(false);
  }, [mealItem[0]?.isAdded]);

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
        <Text style={{ fontSize: 16 }}>{title}</Text>
        {mealItem[0]?.isAdded ? (
          <Entypo name="check" size={24} color="#093" />
        ) : (
          <MaterialIcons name="navigate-next" size={24} color="black" />
        )}
      </View>

      <View>
        <Modal
          visible={modal}
          animationType="slide"
          presentationStyle="formSheet"
          style={styles.modal}
          avoidKeyboard={true}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleModal}
              style={{ alignItems: "flex-end", marginTop: 10 }}
            >
              <Text style={{ color: "blue", marginRight: 10, fontSize: 17 }}>
                Close
              </Text>
            </TouchableOpacity>
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

            <MealList query={foodName} title={title} />
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
            onPress={handleReset}
            style={[styles.bottomSheetButton, { borderBottomColor: "white" }]}
          >
            <MaterialIcons name="auto-delete" size={24} color="grey" />
            <Text style={{ fontSize: 17, marginLeft: 17, color: "grey" }}>
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBottomSheet}
            style={[styles.bottomSheetButton]}
          >
            <MaterialIcons name="cancel" size={20} color="black" />
            <Text style={{ fontSize: 17, marginLeft: 17 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </TouchableOpacity>
  );
}

export default MealInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    backgroundColor: "#f9fbfc",
    borderRadius: 15,
    padding: 10,
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
