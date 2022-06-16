import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import AuthStack from "./Screens/Auth/AuthStack";

import MainScreen from "./Screens/MainScreen";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
