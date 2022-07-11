import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { progressionLogRemoved } from "../redux/actions.js";
import store from "../redux/store";

const Log = (props) => {

  const onLogRemove = () => {
    store.dispatch(progressionLogRemoved(props.logInfo.id));
    props.toggle()
    console.log("removed");
    console.log(store.getState())
  }

  return(
    
    <View style = {styles.logBox}>
      <Text style = {{fontSize: 18}}>Progress Log made on {props.date}</Text>
      <TouchableOpacity style = {styles.removeButton} onPress = {() => onLogRemove()}>
        <Text style = {{fontSize: 25, color: "#f00"}}>X</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  logBox: {
    flexDirection: "column",
    height: 100,
    borderColor: "#CC0000",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#fff",
    margin: 5,
    padding: 20,
    justifyContent: "center"
  },
  removeButton: {
    position: "absolute",
    right: 20 
  }
})

export default Log;