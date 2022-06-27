import React, { Component, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  StatusBar,
  Button,
} from "react-native";
import Routine from "./Routine";
import SolidButton from "../../components/Authentication/SolidButton";
import EditRoutine from "./EditRoutine";
import CalendarStrip from "react-native-calendar-strip";
import { getStatusBarHeight } from "react-native-status-bar-height";
import DatePicker from "react-native-date-picker";

function PlannerUpdate() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker open={open} date={date} />
    </SafeAreaView>
  );
}

export default PlannerUpdate;
