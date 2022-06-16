import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SolidButton from "../components/Authentication/SolidButton";
import { supabase } from "../supabaseClient";

function HomeScreen() {
  const handleSignOutPress = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Home Screen</Text>
      <SolidButton
        text="Sign out"
        colors={["#CC0000", "#CC0000"]}
        alignment="center"
        onPress={handleSignOutPress}
      />
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
export default HomeScreen;
