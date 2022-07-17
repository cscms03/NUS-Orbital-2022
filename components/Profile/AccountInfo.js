import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { Component } from "react";
import { auth } from "../../firebase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

function AccountInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Replace this for profile image*/}
        <Ionicons name="person-circle" size={120} color="white" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name}>Placeholder</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="email" size={20} color="white" />
          <Text style={styles.email}>{auth.currentUser?.email}</Text>
        </View>
      </View>
    </View>
  );
}

export default AccountInfo;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 17,
  },

  //Fix this for image picker
  imageContainer: {
    flex: 0.35,
    height: height * 0.15,
    marginHorizontal: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 0.65,
  },
  name: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 7,
  },
  email: {
    marginLeft: 6,
    color: "white",
    fontWeight: "400",
    fontStyle: "italic",
    fontSize: 14,
  },
});
