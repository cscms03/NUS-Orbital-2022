import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

function EditProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Edit Profile Screen</Text>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
