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

function ConfirmEmail({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateAccountPress = (data) => {
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
        duration={500}
        style={styles.footer}
      >
        <Text style={styles.title}>Confirm your Email</Text>
        <CustomInput
          name="code"
          placeholder="Enter code"
          control={control}
          secureTextEntry={false}
          rules={{ required: "Please enter the code to confirm your Email" }}
        />

        <TextButton text="" buttonText="Resend code" alignment="center" />

        <SolidButton
          onPress={handleSubmit(handleCreateAccountPress)}
          text="Create Account"
          colors={["#CC0000", "#800000"]}
          alignment="flex-end"
        />
      </Animatable.View>
    </View>
  );
}

export default ConfirmEmail;

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
