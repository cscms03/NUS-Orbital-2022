import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

function Routine({ date }) {
  const user = auth.currentUser;
  const uid = user.uid;
  const selectedDate = JSON.stringify(date)?.substring(1, 11);

  const routineCol = collection(db, "users/" + uid + "/routine");
  const userRoutineCol = "users/" + uid + "/routine";

  const data = onSnapshot(doc(db, userRoutineCol, selectedDate), (doc) => {
    doc === undefined
      ? console.log("empty")
      : console.log("Current data: ", doc.data());
  });
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#fff", "#e6e6e6"]} style={styles.planContainer}>
        <Text>hi</Text>
      </LinearGradient>
    </View>
  );
}

export default Routine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 100,
    margin: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  planContainer: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
