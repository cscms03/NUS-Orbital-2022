import React, { Component, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import Swiper from "react-native-swiper";
import DonutChart from "./DonutChart";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function DayView({ date }) {
  console.log(date);
  //states

  const [item, setItem] = useState([]);

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(
    () =>
      onSnapshot(collection(db, "users/" + uid + "/diet"), (snapshot) => {
        setItem(snapshot.docs.map((doc) => doc.data()));
        console.log(item[0]?.totalProtein);
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "users/" + uid + "/diet"), (snapshot) => {
        setItem(snapshot.docs.map((doc) => doc.data()));
        console.log(item[0]?.totalProtein);
      }),
    [date]
  );

  return (
    <Swiper loop={false}>
      <View style={styles.proteinView}>
        <View style={{ position: "absolute", top: "2%", left: "4%" }}>
          <Text style={styles.textTitle}>Protein</Text>
        </View>
        <View style={{ position: "absolute", top: "20%", left: "4%" }}>
          <Text style={styles.textSubtitle}>
            Total protein{"\n"}consumed today:
          </Text>
        </View>

        <View style={{ position: "absolute", top: "35%", left: "6%" }}>
          <Text style={styles.textAmount}>{item[0]?.totalProtein || 0}g</Text>
        </View>

        <View style={{ position: "absolute", top: "57%", left: "4%" }}>
          <Text style={styles.textSubtitle}>Target amount:</Text>
        </View>
        <View style={{ position: "absolute", top: "67%", left: "6%" }}>
          <Text style={styles.textAmount}>105g</Text>
        </View>
        <View style={{ position: "absolute", top: "30%", left: "71%" }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>%</Text>
        </View>
        <View style={{ position: "absolute", top: "58%", left: "54%" }}>
          <Text style={styles.textInfo}>
            The target amount is {"\n"}calculate based on {"\n"}your body weight
          </Text>
        </View>

        <View style={{ position: "absolute", top: "2%", left: "48%" }}>
          <DonutChart
            percentage={item[0]?.totalProtein || 0}
            radius={90}
            strokeWidth={35}
            duration={1000}
            delay={700}
            max={105}
          />
        </View>
      </View>
      <View style={styles.caloriesView}>
        <View style={{ position: "absolute", top: "2%", left: "4%" }}>
          <Text style={styles.textTitle}>Calories</Text>
        </View>
        <View style={{ position: "absolute", top: "20%", left: "4%" }}>
          <Text style={styles.textSubtitle}>
            Total calories{"\n"}consumed today:
          </Text>
        </View>

        <View style={{ position: "absolute", top: "37%", left: "5%" }}>
          <Text style={styles.textAmount}>
            {item[0]?.totalCalories || 0}
            <Text style={styles.unit}>kcal</Text>
          </Text>
        </View>

        <View style={{ position: "absolute", top: "57%", left: "4%" }}>
          <Text style={styles.textSubtitle}>Recommended amount:</Text>
        </View>
        <View style={{ position: "absolute", top: "67%", left: "5%" }}>
          <Text style={styles.textAmount}>
            2000<Text style={styles.unit}>kcal</Text>
          </Text>
        </View>
        <View style={{ position: "absolute", top: "30%", left: "71%" }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>%</Text>
        </View>
        <View style={{ position: "absolute", top: "2%", left: "48%" }}>
          <DonutChart
            percentage={item[0]?.totalCalories || 0}
            radius={90}
            strokeWidth={35}
            duration={1000}
            max={2000}
          />
        </View>
      </View>
    </Swiper>
  );
}

export default DayView;

const styles = StyleSheet.create({
  proteinView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
  },
  caloriesView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
  },
  textTitle: {
    fontWeight: "800",
    fontSize: 37,
  },
  textSubtitle: {
    fontWeight: "700",
    fontSize: 17,
  },
  textAmount: {
    fontWeight: "800",
    fontSize: 37,
  },
  textInfo: {
    color: "#737373",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "left",
  },
  unit: {
    fontWeight: "600",
    fontSize: 31,
  },
});
