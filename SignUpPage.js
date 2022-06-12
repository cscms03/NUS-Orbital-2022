import React, { Component, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { supabase } from "./supabaseClient";

const SUPABASE_URL = "https://hoqmwsgqirfdgrseocpj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcW13c2dxaXJmZGdyc2VvY3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI1MDU1NzMsImV4cCI6MTk2ODA4MTU3M30.ts1Hofjq4XVbUlGayBs9YtcjthYOLhpEh_G4Q0Om9-A";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function SignUpPage() {
  return <View></View>;
}
