import React, { Component, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import Routine from "./Routine";
import SolidButton from "../../components/Authentication/SolidButton";
import EditRoutine from "./EditRoutine";

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
  const now = date();

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
      <CalendarStrip
        ref={ref}
        style={{
          height: 100,
          paddingVertical: 5,
        }}
        iconContainer={{ flex: 0.1 }}
        scrollable={true}
        minDate={minDate}
        maxDate={maxDate}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#ff9999",
        }}
        calendarHeaderStyle={{ fontSize: 20 }}
        scrollerPaging={true}
        // selectedDate={today}
        onDateSelected={handleOnDateSelected}
      />

      <View>
        <Text
          style={{
            alignSelf: "center",
            margin: 5,
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Double Click dates to view/edit your routine for other days!
        </Text>
      </View>

      <View style={styles.routine}>
        <Routine date={currentDate} />
      </View>

      <View style={{ marginVertical: -30 }}>
        <SolidButton
          colors={["#cc0000", "#990000"]}
          text="edit your routine!"
          alignment="center"
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
    flex: 0.85,
  },
});
export default Planner;
