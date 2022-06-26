import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import HistoryLog from "./HistoryLog";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function History() {
  const user = auth.currentUser;
  const uid = user.uid;

  const [items, setItems] = useState([]);

  const dietDatesCol = collection(db, "users/" + uid + "/diet/");

  const dietDatesOrdered = query(dietDatesCol, orderBy("date", "desc"));

  const useEffectFunc = async () => {
    try {
      const data = await getDocs(dietDatesOrdered);
      setItems(data.docs.map((doc) => ({ ...doc.data() })));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    useEffectFunc();
  }, []);

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text>Empty</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            // <View style={{width: }}>
            <HistoryLog
              date={item.date}
              protein={item.totalProtein}
              calories={item.totalCalories}
            />
            // </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width * 0.96,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
    padding: 5,
    alignItems: "center",
  },
});
