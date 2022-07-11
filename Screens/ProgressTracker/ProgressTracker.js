import { Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from 'react';
import Log from "../../components/Log"; 
import store from "../../redux/store";
// import {progressionLogAdded} from '../../redux/actions.js';
import AddProgressionLog from "./AddProgressionLog";
import ViewProgressionLog from "./ViewProgressionLog";

function ProgressTracker() {
  const [enterLogOn, setEnterLogOn] = useState(false);
  const [viewLogOn, setViewLogOn] = useState(false);
  const [viewLog, setViewLog] = useState(null)
  const [image, setImage] = useState(null);
  const [memo, setMemo] = useState(null);

  const toggleEntryScreen = () => setEnterLogOn(!enterLogOn);
  const toggleViewLog = () => setViewLogOn(!viewLogOn);

  var logExisting = false;
  if (store.getState() === []){
    logExisting = false
  }
  else{
    logExisting = true
  }

  // const addProgressionLog = (logPhoto, logMemo) => {
  //   var date = new Date().getDate();
  //   var month = new Date().getMonth() + 1;
  //   var year = new Date().getFullYear();
  //   var logDate = date + '-' + month + '-' + year;
  //   setProgressionLog([{date: logDate, photo: logPhoto, memo: logMemo}, ...progressionLog])
  // }

  const openViewLog = (logRecord) => setViewLog(logRecord);

  return (
    <View style={styles.container}>
      <Modal
        visible = {enterLogOn}
        animationType = {'slide'}
      > 
        <AddProgressionLog toggleScreen = {toggleEntryScreen}/>
      </Modal>

      <Modal
        visible = {viewLogOn}
        animationType = {'slide'}
      >
        <ViewProgressionLog toggleScreen = {toggleViewLog} logInfo = {viewLog} />
      </Modal>

      <ScrollView style = {styles.LogScreen}>

          {store.getState().map((item) => {
            return <TouchableOpacity onPress ={() => {openViewLog(item); toggleViewLog()}}><Log key={item.id} date = {item.logDate}/></TouchableOpacity>
          })}
        
      </ScrollView>
      
      <TouchableOpacity style = {styles.button} onPress = {toggleEntryScreen}>
        <View style= {styles.addButton}>
          <Text style = {styles.plus}>+</Text>
        </View>
      </TouchableOpacity>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logscreen: {
    flexGrow: 1,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#CC0000",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    left: 40
  },
  plus: {
    fontSize: 40,
    color: "#fff"
  },
  button: {
    position: "absolute",
    right: 70,
    bottom: 0,
  },
});

export default ProgressTracker;
