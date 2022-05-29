import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

function ProgressTracker() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Progress Tracker Screen</Text>
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
export default ProgressTracker;
