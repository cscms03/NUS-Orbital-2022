import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Controller } from "react-hook-form";

function InputField({
  placeholder,
  control,
  name,
  secureTextEntry,
  rules = {},
  defaultValue,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue || ""}
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
              { borderColor: error ? "red" : "#4d4d4d" },
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

export default InputField;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderWidth: 1.2,
    borderRadius: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 12,
  },
  input: {
    alignContent: "center",
    fontSize: 16,
  },
});
