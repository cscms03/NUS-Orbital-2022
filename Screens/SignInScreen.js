import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import logo from "../assets/logo_red.png";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import CustomInput from "../components/Authentication/CustomInput";
import SolidButton from "../components/Authentication/SolidButton";
import TextButton from "../components/Authentication/TextButton";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

function SignInScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateAccountPress = () => {
    navigation.navigate("SignUpScreen");
  };

  const handleResetPasswordPress = () => {
    navigation.navigate("ResetPassword");
  };

  const handleSignInPress = (data) => {
    navigation.navigate("MainScreen");
  };

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
        duration={1200}
        style={styles.footer}
      >
        <Text style={styles.title}>Welcome!</Text>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          secureTextEntry={false}
          rules={{ required: "Username is required" }}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          control={control}
          rules={{
            required: "Password is required",
          }}
        />

        <TextButton
          text=" Forgot Password?"
          buttonText="Reset Password"
          alignment="flex-start"
          onPress={handleResetPasswordPress}
        />

        <TextButton
          text=" Don't have an account?"
          buttonText="Create Account"
          alignment="flex-start"
          onPress={handleCreateAccountPress}
        />

        <SolidButton
          onPress={handleSubmit(handleSignInPress)}
          text="Sign in"
          colors={["#CC0000", "#800000"]}
          alignment="flex-end"
        />
      </Animatable.View>
    </View>
  );
}

export default SignInScreen;

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
    backgroundColor: "#f9fbfc",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    color: "#b30000",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
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