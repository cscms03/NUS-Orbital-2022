import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import { Controller } from "react-hook-form";

function ProfileInput({
  placeholder,
  control,
  name,
  rules = {},
  widthRatio = 0.88,
  type = "default",
  defaultValue,
}) {
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          {error && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {error.message || "Error"}
            </Text>
          )}
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
              { width: width * widthRatio },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={false}
              style={styles.input}
              autoCapitalize="none"
              keyboardType={type}
            />
          </View>
        </>
      )}
    />
  );
}

export default ProfileInput;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 47,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 7,
  },
  input: {
    alignContent: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
