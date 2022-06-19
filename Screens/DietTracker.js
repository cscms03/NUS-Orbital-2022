import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EditRoutine from "./Planner/EditRoutine";

function DietTracker() {
  return (
    <View style={styles.container}>
      <EditRoutine />
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
