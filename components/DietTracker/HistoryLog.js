import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";

function HistoryLog({
  date,
  protein,
  calories,
  protPercentage,
  calPercentage,
}) {
  const user = auth.currentUser;
  const uid = user.uid;

  const [bodyInfo, setBodyInfo] = useState([]);

  useEffect(
    () =>
      onSnapshot(doc(db, "users/" + uid), (snapshot) => {
        setBodyInfo(snapshot.data());
      }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsColumn}>
          <Text style={styles.units}>g</Text>
          <Text style={styles.details}>{protein}</Text>
        </View>
        <View style={styles.detailsColumn}>
          <Text style={styles.units}>kcal</Text>
          <Text style={styles.details}>{calories}</Text>
        </View>

        <View style={styles.detailsColumn}>
          <Text style={styles.units}>g %</Text>
          <Text style={styles.details}>
            {Math.round((protein / (bodyInfo.weight * 1.8)) * 100)}
          </Text>
        </View>

        <View style={styles.detailsColumn}>
          <Text style={styles.units}>kcal %</Text>
          <Text style={styles.details}>
            {Math.round(
              (calories / (bodyInfo.gender === "Male" ? 2700 : 2000)) * 100
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default HistoryLog;

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    width: Dimensions.get("screen").width * 0.93,
    height: 68,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 7,
    flexDirection: "row",
    marginVertical: 1,
  },
  dateContainer: {
    flex: 0.35,
    justifyContent: "center",
    paddingLeft: 7,
    alignItems: "center",
    marginLeft: 5,
  },
  date: {
    fontSize: 17,
    fontWeight: "600",
  },
  detailsContainer: {
    flex: 0.65,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailsColumn: {
    justifyContent: "center",
    alignItems: "center",
  },

  units: {
    textAlign: "center",
    marginVertical: 4,
    fontSize: 12,
  },
  details: {
    textAlign: "center",
    marginVertical: 4,
    fontSize: 15,
    fontWeight: "600",
  },
});
