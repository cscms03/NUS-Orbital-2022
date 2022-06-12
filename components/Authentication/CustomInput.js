import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Controller } from "react-hook-form";

function CustomInput({
  placeholder,
  control,
  name,
  secureTextEntry,
  rules = {},
}) {
  return (
    <Controller
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
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={styles.input}
            />
          </View>
        </>
      )}
    />
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 47,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 7,
  },
  input: {
    alignContent: "center",
  },
});
