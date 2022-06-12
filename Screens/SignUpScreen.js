import React, { Component, useState } from "react";
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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import userIcon from "../assets/userIcon.png";
import SolidButton from "../components/Authentication/SolidButton";
import CustomInput from "../components/Authentication/CustomInput";
import TextButton from "../components/Authentication/TextButton";
import { Controller, useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUpScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch("password");

  const handleGetStartedPress = (data) => {
    navigation.navigate("ConfirmEmail");
  };

  const handleGoBackSignInPress = () => {
    navigation.navigate("SigninScreen");
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
        duration={700}
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.title}>Create your account!</Text>

          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            secureTextEntry={false}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Minimum length of username is 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Maximum length of username is 24 characters long",
              },
            }}
          />
          <CustomInput
            name="Email"
            placeholder="Email"
            control={control}
            secureTextEntry={false}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be minimum 8 characters long",
              },
            }}
          />

          <CustomInput
            name="Confirm-password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            control={control}
            rules={{
              validate: (value) =>
                value === pwd || "The password does not match",
            }}
          />

          <SolidButton
            onPress={handleSubmit(handleGetStartedPress)}
            text="Confirm Email"
            colors={["#CC0000", "#800000"]}
            alignment="flex-end"
          />

          <TextButton
            text="Have an account?"
            buttonText="Sign in"
            alignment="center"
            marginTop={20}
            onPress={handleGoBackSignInPress}
          />
        </ScrollView>
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
    backgroundColor: "#f9fbfc",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    color: "#b30000",
    fontSize: 25,
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
