import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import SolidButton from "../../components/Authentication/SolidButton";
import CustomInput from "../../components/Authentication/CustomInput";
import TextButton from "../../components/Authentication/TextButton";
import { useForm } from "react-hook-form";

function ResetPassword({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleResetPasswordPress = (data) => {
    navigation.navigate("SigninScreen");
  };
  return (
    <View style={styles.container}>
      <Animatable.View
        style={styles.header}
        animation="fadeInLeft"
        duration={500}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LinearGradient style={styles.goBack} colors={["#fff", "#d9d9d9"]}>
            <Text style={styles.textGoBack}> Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={500}
        style={styles.footer}
      >
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          secureTextEntry={false}
          rules={{ required: "Username is required" }}
        />

        <CustomInput
          name="new password"
          placeholder="New password"
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
          name="Confirm new password"
          placeholder="Confirm new Password"
          secureTextEntry={true}
          control={control}
          rules={{
            required: "Password confirmation is required",
            minLength: {
              value: 8,
              message: "Password should be minimum 8 characters long",
            },
          }}
        />

        <SolidButton
          text="Reset password"
          colors={["#CC0000", "#800000"]}
          alignment="flex-end"
          onPress={handleSubmit(handleResetPasswordPress)}
        />
      </Animatable.View>
    </View>
  );
}

export default ResetPassword;

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

  button: {
    width: "80%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    flexDirection: "row",
  },

  textButton: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
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

  textGoBack: {
    color: "#b30000",
    fontWeight: "bold",
  },
});
