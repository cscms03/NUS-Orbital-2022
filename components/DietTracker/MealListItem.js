import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  QuerySnapshot,
  onSnapshot,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function MealListItem({ foodName, protein, calorie, quantity, title }) {
  const [modal, setModal] = useState(false);

  const printDate = () => {
    return (
      `${new Date().getFullYear()}` +
      "-" +
      `${new Date().getMonth() + 1}` +
      "-" +
      `${new Date().getDate()}`
    );
  };
  const date = printDate();
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(collection(db, "users/" + uid + "/diet"), date);
  const dietColRef = doc(
    collection(db, "users/" + uid + "/diet/" + date, title),
    "default"
  );

  const handleAddPress = async () => {
    setDoc(
      dietColRef,
      {
        name: foodName,
        isAdded: true,
        protein: Math.round((protein * quantity) / 100),
        calories: Math.round((calorie * quantity) / 100),
      },
      { merge: true }
    )
      .then(() => {
        setDoc(
          docRef,
          {
            date: date,
            totalProtein: increment(Math.round((protein * quantity) / 100)),
            totalCalories: increment(Math.round((calorie * quantity) / 100)),
          },
          { merge: true }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      })
      .finally(() => {
        setModal(!modal);
      });
  };

  const handleItemPress = () => {
    setModal(!modal);
  };

  return (
    <>
      <TouchableOpacity onPress={handleItemPress}>
        <View style={styles.container}>
          <View style={styles.foodNameContainer}>
            <Text style={styles.foodNameText}>
              {foodName.length > 32
                ? foodName.substring(0, 32) + "..."
                : foodName}
            </Text>
          </View>
          <View style={styles.nutrientsContainer}>
            <View style={styles.protCalContainer}>
              <Text style={styles.label}>Protein</Text>
              <Text style={styles.value}>
                {Math.round(protein * quantity) / 100}g
              </Text>
            </View>
            <View style={styles.protCalContainer}>
              <Text style={styles.label}>Calories</Text>
              <Text style={styles.value}>
                {Math.round(calorie * quantity) / 100}kcal
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal isVisible={modal} style={{ alignItems: "center" }}>
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 21, fontWeight: "600", color: "#800" }}>
            Food description:
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 5 }}>
            {foodName}
          </Text>
          <View style={styles.descriptionLineContainer}>
            <Text style={styles.descriptionLabel}>Protein per 100g:</Text>
            <Text style={styles.descriptionValue}>{protein}g</Text>
          </View>
          <View style={styles.descriptionLineContainer}>
            <Text style={styles.descriptionLabel}>Calories per 100g:</Text>
            <Text style={styles.descriptionValue}>{calorie}kcal</Text>
          </View>

          <View style={styles.descriptionLineContainer}>
            <Text style={styles.descriptionLabel}>Serving size:</Text>
            <Text style={styles.descriptionValue}>{quantity}g</Text>
          </View>

          <View style={styles.descriptionLineContainer}>
            <Text style={styles.descriptionLabel}>Total protein served:</Text>
            <Text style={styles.descriptionValue}>
              {Math.round(protein * quantity) / 100}g
            </Text>
          </View>

          <View style={styles.descriptionLineContainer}>
            <Text style={styles.descriptionLabel}>Total calories served:</Text>
            <Text style={styles.descriptionValue}>
              {Math.round(calorie * quantity) / 100}g
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 70,
            }}
          >
            <TouchableOpacity
              onPress={handleItemPress}
              style={[styles.button, { backgroundColor: "#e6e6e6" }]}
            >
              <Text style={{ color: "#c00", fontWeight: "600", fontSize: 16 }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddPress}
              style={[styles.button, { backgroundColor: "#c00" }]}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default MealListItem;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.88,
    height: 70,
    borderRadius: 15,
    overflow: "visible",
    elevation: 4,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
    marginVertical: 5,
  },

  foodNameContainer: {
    flex: 0.45,
    justifyContent: "center",
  },
  foodNameText: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  nutrientsContainer: {
    flex: 0.55,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  protCalContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#800",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalContainer: {
    width: Dimensions.get("window").width * 0.83,
    height: 370,
    backgroundColor: "white",
    borderRadius: 15,
    backgroundColor: "#f9fbfc",
    padding: 20,
    alignSelf: "center",
  },
  descriptionLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  descriptionLabel: {
    fontSize: 16,
    color: "#700",
    fontWeight: "600",
  },
  descriptionValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    width: 130,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
