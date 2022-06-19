import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SolidButton from "../../components/Authentication/SolidButton";
import TextButton from "../../components/Authentication/TextButton";
import CustomInput from "../../components/Authentication/CustomInput";
import { useForm } from "react-hook-form";

function EditRoutine() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  const pwd = watch("password");

  return (
    <View style={styles.container}>
      <CustomInput
        name="Workout-Name"
        placeholder="Workout Name"
        control={control}
        secureTextEntry={false}
      />

      <CustomInput
        name="Sets"
        placeholder="Sets"
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
        name="reps"
        placeholder="Reps"
        secureTextEntry={true}
        control={control}
        rules={{
          validate: (value) => value === pwd || "The password does not match",
        }}
      />
    </View>
  );
}

export default EditRoutine;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    margin: 30,
  },
});
