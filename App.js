import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import AuthStack from "./Screens/Auth/AuthStack";
import MainScreen from "./Screens/MainScreen";
import { auth } from "./firebase";

export default function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSession(true);
      } else {
        setSession(false);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      {session ? (
        <>
          <StatusBar />
          <MainScreen />
        </>
      ) : (
        <AuthStack />
      )}
    </View>
  );
}
