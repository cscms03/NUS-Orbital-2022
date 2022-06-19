import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EditRoutine from "./Planner/editRoutine";

function DietTracker() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Diet Tracker Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DietTracker;
