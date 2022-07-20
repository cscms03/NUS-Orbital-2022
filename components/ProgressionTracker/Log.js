import { StyleSheet, Text, TouchableOpacity, View, Alert, ShadowPropTypesIOS } from "react-native";
import { useState } from "react";
import { progressionLogRemoved } from "../../redux/actions.js";
import store from "../../redux/store";
import Icon from 'react-native-vector-icons/Entypo'

const Log = (props) => {

  const onLogRemove = () => {
    Alert.alert(
      `Deleting Log Made on ${props.date}` ,
      "Are you sure you want to delete this log?",
      [
        {
          text: "Delete",
          onPress: () => {
            store.dispatch(progressionLogRemoved(props.logInfo.id));
            props.logUpdate()
            console.log("Log Deleted")},
          style: "cancel"
        },
        { text: "Cancel", onPress: () => console.log("Canceled") }
      ]
    );
  }

  const onLogEdit = () => {
    props.toggleLogEdit();
    props.edit(props.logInfo)
  };

  return(
    
    <View style = {styles.logBox}>
      <Text style = {{fontSize: 18}}>Progress Log made on {props.date}</Text>
      <TouchableOpacity style = {styles.removeButton} onPress = {() => onLogRemove()}>
        <Text style = {{fontSize: 25, color: "#f00"}}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.editButton} onPress={() => onLogEdit()}>
        <Icon name="edit" size={25} color="#000"/>
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
  },
  editButton: {
    position: "absolute",
    right: 50 
  }
})

export default Log;