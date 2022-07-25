import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ProfileInput from "../../components/Profile/ProfileInput";
import { useForm } from "react-hook-form";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { setProfile } from "../../redux/features/profile";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app, db } from "../../firebase";
import { setDoc, doc, collection } from "firebase/firestore";

const ios = Platform.OS === "ios";

function AddProfileInfo({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const { email, password } = useSelector((state) => state.user.value);

  const { name, age, weight, gender } = useSelector(
    (state) => state.profile.value
  );

  const handleStartPress = async () => {
    dispatch(
      setProfile({
        name: watch("name"),
        age: parseInt(watch("age")),
        weight: parseInt(watch("weight")),
        gender: selectedIndex === 0 ? "Male" : "Female",
      })
    );
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .then(() => {
        const user = auth.currentUser;
        const uid = user.uid;
        setDoc(doc(db, "users", uid), {
          email: user.email,
          name: name,
          gender: gender,
          age: age,
          weight: weight,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  };

  const handleTabPress = () => {
    setSelectedIndex(selectedIndex === 0 ? 1 : 0);
  };

  const handleBackPress = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            paddingLeft: 20,
            flexDirection: "row",
            top: ios ? 55 : 15,
          }}
          onPress={handleBackPress}
        >
          <Ionicons name="chevron-back" size={22} color="white" />
          <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
            Back
          </Text>
        </TouchableOpacity>
        {/* Add/change profile picture here */}
        <View style={styles.header}>
          <Ionicons name="person-circle" size={120} color="white" />
        </View>

        <Animatable.View
          style={styles.footer}
          animation="fadeInUp"
          duration={500}
        >
          <View style={{ alignItems: "center" }}>
            <ProfileInput
              name="name"
              placeholder="Name"
              control={control}
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
            tabTextStyle={{
              color: "#cc0000",
              fontSize: 17,
              fontWeight: "600",
            }}
          />

          <View style={styles.numInputContainer}>
            <Text style={styles.label}> Age:</Text>
            <View>
              <ProfileInput
                name="age"
                placeholder="E.g. 21"
                control={control}
                widthRatio={0.4}
                type="numeric"
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
                type="numeric"
                rules={{
                  required: "Weight is required",
                }}
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleSubmit(handleStartPress)}>
            <LinearGradient colors={["#c00", "#aa0000"]} style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                Start Workout!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddProfileInfo;

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
    width: 200,
    height: 40,
    alignSelf: "center",
    backgroundColor: "rgba(204, 0, 0, 0.15)",
    marginTop: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: width * 0.06,
  },
});
