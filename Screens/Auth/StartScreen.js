import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/logo_red.png";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={logo}
          style={styles.logo}
        ></Animatable.Image>
      </View>
      <Animatable.View
        animation="bounceInUp"
        duration={1500}
        style={styles.footer}
        delay={1000}
      >
        <Text style={styles.title}>Welcome to Workout Ethic!</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
            <LinearGradient
              colors={["#CC0000", "#ff8080"]}
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

export default StartScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CC0000",
  },
  header: {
    flex: 3 / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 2 / 5,
    backgroundColor: "#f9fbfc",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#b30000",
    fontSize: 35,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 100,
  },
  signIn: {
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
