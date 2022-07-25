import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import ProfileInput from "../../components/Profile/ProfileInput";
import { useForm, useWatch } from "react-hook-form";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

function EditProfileScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevItems, setPrevItems] = useState([]);

  const handleTabPress = () => {
    setSelectedIndex(selectedIndex === 0 ? 1 : 0);
  };

  const handleBackPress = () => {
    navigation.navigate("ProfileScreen");
  };

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(
    () =>
      onSnapshot(doc(db, "users/" + uid), (snapshot) => {
        setPrevItems(snapshot.data());
      }),
    []
  );

  const handleSavePress = async () => {
    try {
      await updateDoc(doc(db, "users/" + uid), {
        name: watch("name"),
        age: watch("age"),
        weight: watch("weight"),
        gender: selectedIndex === 0 ? "Male" : "Female",
      });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      navigation.navigate("ProfileScreen");
    }
  };

  const name = prevItems.name;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ paddingLeft: 20, flexDirection: "row" }}
          onPress={handleBackPress}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="white"
            style={{ top: Platform.OS === "android" ? 30 : 0 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "600",
              top: Platform.OS === "android" ? 30 : 0,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        {/* Add/change profile picture here */}
        <View style={styles.header}>
          <Ionicons name="person-circle" size={120} color="white" />
        </View>

        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <ProfileInput
              name="name"
              placeholder="Name"
              control={control}
              defaultValue={prevItems.name}
              rules={{
                required: "Name is required",
              }}
            />
          </View>

          <SegmentedControlTab
            borderRadius={20}
            values={["Male", "Female"]}
            onTabPress={handleTabPress}
            selectedIndex={selectedIndex}
            tabsContainerStyle={styles.tabContainer}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={{ color: "#cc0000", fontSize: 17, fontWeight: "600" }}
          />
          <View style={styles.numInputContainer}>
            <Text style={styles.label}> Age:</Text>
            {/*  This View is to make flex direction of error message vertical */}
            <View>
              <ProfileInput
                name="age"
                placeholder="e.g. 21"
                control={control}
                widthRatio={0.4}
                defaultValue={prevItems.age}
                rules={{
                  required: "Age is required",
                }}
              />
            </View>
          </View>
          <View style={styles.numInputContainer}>
            <Text style={styles.label}> Weight:</Text>
            <View>
              <ProfileInput
                name="weight"
                placeholder="kg"
                control={control}
                widthRatio={0.4}
                defaultValue={prevItems.weight}
                rules={{
                  required: "Weight is required",
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSavePress)}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#c00" }}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default EditProfileScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#cc0000",
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.7,
    width: width,
    backgroundColor: "#f6f5f6",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
  },
  numInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.06,
    marginTop: 20,
  },
  label: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "500",
    color: "#600",
  },
  tabStyle: {
    borderColor: "#CC0000",
  },
  activeTabStyle: {
    backgroundColor: "#cc0000",
  },
  tabContainer: {
    borderColor: "#cc0000",
    width: width * 0.88,
    height: 35,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    width: 170,
    height: 37,
    alignSelf: "center",
    backgroundColor: "rgba(204, 0, 0, 0.15)",
    marginTop: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
