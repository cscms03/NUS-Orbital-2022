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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import WorkoutDetails from "./WorkoutDetails";
import update from "../../assets/update.png";

function Routine({ date, modal }) {
  const user = auth.currentUser;
  const uid = user.uid;

  const routineCol = collection(db, "users/" + uid + "/routine");
  const userRoutineCol = "users/" + uid + "/routine";

  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const func = async () => {
    if (date === undefined) {
      console.log("no date selected");
    }
    try {
      const q = date && query(routineCol, where("date", "==", date));
      const data = await getDocs(q);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    func();
  }, [date, modal, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <View style={styles.container}>
        {items.length === 0 ? (
          <Text>Empty</Text>
        ) : (
          <FlatList
            data={items}
            renderItem={(data) => (
              <WorkoutDetails
                date={date}
                name={data?.item.details?.name}
                weight={data?.item.details?.weight}
                sets={data?.item.details?.sets}
                reps={data?.item.details?.reps}
                id={data?.item.id}
                isDone={data?.item.details?.isDone}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <TouchableOpacity
        style={{ position: "absolute", top: "93%", left: "68%" }}
        onPress={handleRefresh}
      >
        <Image source={update} style={{ width: 100, height: 100 }} />
      </TouchableOpacity>
    </>
  );
}

export default Routine;

const styles = StyleSheet.create({
  container: {
    //   width: Dimensions.get("window").width * 0.96,
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
