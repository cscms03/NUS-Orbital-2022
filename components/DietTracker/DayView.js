import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import DonutChart from "./DonutChart";

function DayView() {
  const [proteinAmt, setProteinAmt] = useState(0);
  const [proteinTarget, setProteinTarget] = useState(0);
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
          <Text style={styles.textAmount}>78g</Text>
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
            percentage={74}
            radius={90}
            strokeWidth={35}
            duration={1000}
            delay={700}
            max={100}
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
            1900<Text style={styles.unit}>kcal</Text>
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
            percentage={97}
            radius={90}
            strokeWidth={35}
            duration={1000}
            max={100}
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
