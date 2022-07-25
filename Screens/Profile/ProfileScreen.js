import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import SolidButton from "../../components/Authentication/SolidButton";
import { signOut } from "firebase/auth";
import { Header } from "@react-navigation/stack";
import AccountInfo from "../../components/Profile/AccountInfo";
import BodyInfo from "../../components/Profile/BodyInfo";
import SettingButtons from "../../components/Profile/SettingButtons";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";

const ios = Platform.OS === "ios";

function Profile({ navigation }) {
  const [items, setItems] = useState([]);

  const handleSignOutPress = async () => {
    signOut(auth)
      .then(() => {
        console.log("sign out");
      })
      .catch((error) => alert(error.message));
  };

  const handleEditProfilePress = () => {
    navigation.navigate("EditProfileScreen");
  };

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(
    () =>
      onSnapshot(doc(db, "users/" + uid), (snapshot) => {
        setItems(snapshot.data());
      }),
    []
  );

  console.log(items.name);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "600",
            alignSelf: "center",
          }}
        >
          Profile
        </Text>
        <AccountInfo name={items.name} />
      </View>

      <View style={styles.footer}>
        <View style={styles.bodyInfo}>
          <BodyInfo
            gender={items.gender}
            age={items.age}
            weight={items.weight}
          />
        </View>

        <SettingButtons
          title="Edit Profile"
          icon={<FontAwesome5 name="user-edit" size={22} color="black" />}
          onPress={handleEditProfilePress}
        />

        <SettingButtons
          title="Sign out"
          icon={<Octicons name="sign-out" size={24} color="black" />}
          onPress={handleSignOutPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#cc0000",
  },
  header: {
    flex: 0.37,
    width: "100%",
    // alignItems: "center",
  },
  footer: {
    flex: 0.63,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  bodyInfo: {
    width: 320,
    height: 76,
    backgroundColor: "white",
    top: -38,
    borderRadius: 10,
    overflow: "visible",
    elevation: 5,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.45,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
});
export default Profile;
