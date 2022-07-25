import React, { Component, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  StatusBar,
  Alert,
  Platform,
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

const ios = Platform.OS === "ios";

function Planner() {
  const ref = useRef();
  const date = () => {
    return ref?.current?.getSelectedDate();
  };
  const now = JSON.stringify(date())?.substring(1, 11);

  const [currentDate, setCurrentDate] = useState("");
  const [modal, setModal] = useState(false);

  const handleOnDateSelected = () => {
    setCurrentDate(date());
  };

  const handleEditPress = () => {
    if (now) {
      setModal((prevModal) => !prevModal);
    } else {
      Alert.alert("Please select a date");
    }
  };

  const handleClosePress = () => {
    setModal((prevModal) => !prevModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: getStatusBarHeight(),
          position: "absolute",
        }}
      >
        <StatusBar />
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
          highlightColor: "#cc0000",
          color: "white",
        }}
        calendarColor={"#f8f8f8"}
        dateNumberStyle={{ color: "#000" }}
        dateNameStyle={{ color: "#000" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
        calendarHeaderStyle={{ fontSize: 20 }}
        scrollerPaging={true}
        onDateSelected={handleOnDateSelected}
      />

      <View>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 10,
            fontSize: 27,
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {now ? JSON.stringify(now)?.substring(1, 11) : "No Date Selected"}
        </Text>
      </View>

      <View style={styles.routine}>
        <Routine date={now} modal={modal} />
      </View>

      <View
        style={{
          position: "absolute",
          top: ios ? "86%" : "80%",
          left: "10%",
        }}
      >
        <SolidButton
          colors={["#cc0000", "#cc0000"]}
          text="Add more plans!"
          alignment="flex-start"
          onPress={handleEditPress}
        />
      </View>
      <View
        style={{
          top: 40,
          paddingHorizontal: 40,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            fontStyle: "italic",
            color: "grey",
          }}
        >
          If you do not see your plans after you added, try refreshing!
        </Text>
      </View>

      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <EditRoutine date={now} />
        <View style={{ marginVertical: -30 }}>
          <SolidButton
            colors={["#cc0000", "#cc0000"]}
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
    backgroundColor: "#f8f8f8",
  },
  routine: {
    flex: 0.9,
    alignItems: "center",
    marginTop: 5,
    margin: 15,
  },
});
export default Planner;
