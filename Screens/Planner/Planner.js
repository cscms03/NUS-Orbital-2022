import React, { Component, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  StatusBar,
} from "react-native";
import Routine from "../../components/Planner/Routine";
import SolidButton from "../../components/Authentication/SolidButton";
import EditRoutine from "./EditRoutine";
import CalendarStrip from "react-native-calendar-strip";
import { getStatusBarHeight } from "react-native-status-bar-height";

var today = new Date();
var dd = today.getDate();
var minmm = today.getMonth(); //January is 0 so need to add 1 to make it 1!
var maxmm = today.getMonth() + 2;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (minmm < 10) {
  minmm = "0" + minmm;
}
if (maxmm < 10) {
  maxmm = "0" + maxmm;
}

const minDate = yyyy + "-" + minmm + "-" + dd;
const maxDate = yyyy + "-" + maxmm + "-" + dd;

function Planner() {
  const ref = useRef();
  const date = () => {
    console.log(ref?.current?.getSelectedDate());
    return ref?.current?.getSelectedDate();
  };
  const now = JSON.stringify(date())?.substring(1, 11);

  const [currentDate, setCurrentDate] = useState("");
  const [modal, setModal] = useState(false);

  const handleOnDateSelected = () => {
    setCurrentDate(date());
  };

  const handleEditPress = () => {
    setModal((prevModal) => !prevModal);
  };

  const handleClosePress = () => {
    setModal((prevModal) => !prevModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#cc0000",
          width: "100%",
          height: getStatusBarHeight(),
          position: "absolute",
        }}
      >
        <StatusBar barStyle="light-content" />
      </View>
      <CalendarStrip
        ref={ref}
        style={{
          height: 100,
          paddingTop: 5,
        }}
        calendarAnimation={{ type: "sequence", duration: 10 }}
        iconContainer={{ flex: 0.1 }}
        scrollable={false}
        minDate={minDate}
        maxDate={maxDate}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#800000",
          color: "white",
        }}
        calendarColor={"#cc0000"}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
        calendarHeaderStyle={{ fontSize: 20, color: "white" }}
        scrollerPaging={true}
        onDateSelected={handleOnDateSelected}
      />

      <View>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 5,
            fontSize: 25,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Selected date: {JSON.stringify(now)?.substring(1, 11)}
        </Text>
      </View>

      <View style={styles.routine}>
        <Routine date={now} modal={modal} />
      </View>

      <View style={{ position: "absolute", top: "90%", left: "10%" }}>
        <SolidButton
          colors={["#cc0000", "#990000"]}
          text="Add more plans!"
          alignment="flex-start"
          onPress={handleEditPress}
        />
      </View>

      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <EditRoutine date={now} />
        <View style={{ marginVertical: -30 }}>
          <SolidButton
            colors={["#cc0000", "#ff0000"]}
            text="Close"
            alignment="center"
            onPress={handleClosePress}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  routine: {
    flex: 0.9,
    alignItems: "center",
    margin: 15,
  },
});
export default Planner;
