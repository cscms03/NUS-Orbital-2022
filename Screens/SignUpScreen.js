import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import logo from "../assets/logo_red.png";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import userIcon from "../assets/userIcon.png";

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="fadeInLeft">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LinearGradient style={styles.goBack} colors={["#fff", "#d9d9d9"]}>
            <Text style={styles.textGoBack}> Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        style={styles.footer}
      >
        <Text style={styles.title}>Welcome!</Text>
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.text}>Email:</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor={"#e9c9c9"}
          ></TextInput>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text style={styles.text}>Password:</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Your Password"
            placeholderTextColor={"#e9c9c9"}
            secureTextEntry={true}
          ></TextInput>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text style={styles.text}>Confirm Password:</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor={"#e9c9c9"}
            secureTextEntry={true}
          ></TextInput>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
            <LinearGradient
              colors={["#CC0000", "#800000"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default SignUpScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CC0000",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "flex-start",
  },
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    color: "#b30000",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "#990000",
    marginTop: 10,
    fontSize: 15,
    marginLeft: 4,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#990000",
    paddingVertical: 6,
    marginLeft: 4,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 50,
  },
  signIn: {
    width: 170,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    flexDirection: "row",
  },
  goBack: {
    width: 130,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    flexDirection: "row",
    marginBottom: 30,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  textGoBack: {
    color: "#b30000",
    fontWeight: "bold",
  },
});
