import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Controller } from "react-hook-form";

function NumberInput({ placeholder, name, secureTextEntry, rules = {} }) {
  return (
    <Controller
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
              keyboardType="numeric"
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

export default NumberInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "35%",
    height: 47,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 7,
  },
  input: {
    alignContent: "right",
  },
});
