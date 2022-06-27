import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import AuthStack from "./Screens/Auth/AuthStack";
import MainScreen from "./Screens/MainScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [session, setSession] = useState(false);

  // const useEffectFunc = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setSession(true);
  //     } else {
  //       setSession(false);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   useEffectFunc();
  //   return () => {
  //     setSession(false);
  //   }
  // }, []);

  useEffect(() => {
    let isMounted = false;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isMounted = true;
      } else {
        isMounted = false;
      }

      if (isMounted) {
        setSession(true);
        isMounted = false;
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
