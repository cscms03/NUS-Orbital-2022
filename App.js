import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import RootStack from "./Screens/Auth/AuthStack";
import HomeScreen from "./Screens/HomeScreen";
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
      {session ? <HomeScreen /> : <RootStack />}
    </View>
  );
}
