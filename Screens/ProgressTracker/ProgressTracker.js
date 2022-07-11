import { Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from 'react';
import Log from "../../components/Log"; 
import store from "../../redux/store";
import AddProgressionLog from "./AddProgressionLog";
import ViewProgressionLog from "./ViewProgressionLog";

function ProgressTracker() {
  const [enterLogOn, setEnterLogOn] = useState(false);
  const [viewLogOn, setViewLogOn] = useState(false);
  const [viewLog, setViewLog] = useState(null)
  const [removed, setRemoved] = useState(true);
  
  const LogRemoved = () => setRemoved(!removed);
  const toggleEntryScreen = () => setEnterLogOn(!enterLogOn);
  const toggleViewLog = () => setViewLogOn(!viewLogOn);
  const openViewLog = (logRecord) => setViewLog(logRecord);

  store.subscribe(() => {
    console.log("Entry Changed", store.getState())
  })

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
            return <TouchableOpacity onPress ={() => {openViewLog(item); toggleViewLog()}}><Log logInfo = {item} date = {item.logDate} toggle = {LogRemoved} /></TouchableOpacity>
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
