import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import MealListItem from "./MealListItem";
import { Entypo } from "@expo/vector-icons";

function MealList({ query = "", title }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const params = {
    api_key: "bDfuKzc0ol0Ib2YfDZVXndjF7uaAzGGoCv3thii5",
    query: query,
    dataType: ["Survey (FNDDS)"],
    pageSize: 8,
  };

  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
    params.query
  )}&dataType=${encodeURIComponent(
    params.dataType
  )}&pageSize=${encodeURIComponent(
    params.pageSize
  )}&requireAllWords=false&api_key=${encodeURIComponent(params.api_key)}`;

  const get = async () => {
    return fetch(apiUrl)
      .then((response) =>
        response.ok ? response.json() : Alert.alert("does not exist!")
      )
      .catch((error) => Alert.alert(error));
  };

  useEffect(() => {
    get()
      .then((data) => {
        const temp = [...data.foods];
        setItems(temp);
      })
      .then(() => setLoading(false));
  }, [query]);

  // const proteinIdx = 0;
  // const kcalIndx = 3;

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : items.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Entypo name="progress-empty" size={170} color="grey" />
          <Text style={{ color: "grey" }}>No result</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <MealListItem
                  foodName={item.description}
                  protein={item.foodNutrients[0].value}
                  calorie={item.foodNutrients[3].value}
                  quantity={item.foodMeasures[0].gramWeight}
                  title={title}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

export default MealList;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
