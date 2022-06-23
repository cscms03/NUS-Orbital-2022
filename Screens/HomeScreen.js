import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SolidButton from "../components/Authentication/SolidButton";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function HomeScreen() {
  const handleSignOutPress = async () => {
    signOut(auth)
      .then(() => {
        console.log("sign out");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        Current User: {auth.currentUser?.email}
      </Text>
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
