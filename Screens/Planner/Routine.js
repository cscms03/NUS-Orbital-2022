import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import WorkoutDetails from "./WorkoutDetails";
import { EvilIcons } from "@expo/vector-icons";

function Routine({ date, modal }) {
  const user = auth.currentUser;
  const uid = user.uid;

  const routineCol = collection(db, "users/" + uid + "/routine");
  const userRoutineCol = "users/" + uid + "/routine";

  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const q = date && query(routineCol, where("date", "==", date));

  const realtime = () => {
    date &&
      onSnapshot(
        routineCol,
        (snapshot) => {
          setItems(
            snapshot?.docs.map((doc) => ({ ...doc?.data(), id: doc.id }))
          );
        },
        []
      );
  };
  useEffect(() => {
    return realtime;
  }, [refresh, date, modal]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={(data) => {
            if (data?.item.date === date) {
              return (
                <WorkoutDetails
                  date={date}
                  name={data?.item.details?.name}
                  weight={data?.item.details?.weight}
                  sets={data?.item.details?.sets}
                  reps={data?.item.details?.reps}
                  id={data?.item.id}
                  isDone={data?.item.details?.isDone}
                />
              );
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={{ position: "absolute", top: "96%", left: "70%" }}
        onPress={handleRefresh}
      >
        <EvilIcons name="refresh" size={90} color="black" />
      </TouchableOpacity>
    </>
  );
}

export default Routine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 100,
    margin: 20,
    // backgroundColor: "#f2f2f2",
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
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
});
