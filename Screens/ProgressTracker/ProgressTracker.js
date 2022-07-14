import { Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from 'react';
import Log from "../../components/Log"; 
import store from "../../redux/store";
import AddProgressionLog from "./AddProgressionLog";
import ViewProgressionLog from "./ViewProgressionLog";
import EditProgressionLog from "./EditProgressLog";

function ProgressTracker() {
  const [enterLogOn, setEnterLogOn] = useState(false); //toggle for modal of log entry screen
  const [viewLogOn, setViewLogOn] = useState(false); //toggle for modal of log view screen
  const [viewLog, setViewLog] = useState(null); //stores info of log to view
  const [removed, setRemoved] = useState(true); //used to rerender the screen when log is removed
  const [editLogInfo, setEditLogInfo] = useState(null); //stores info of log to edit
  const [editLogOn, setEditLogOn] = useState(false); //toggle for modal of log edit screen
  
  const LogRemoved = () => setRemoved(!removed);
  const toggleEntryScreen = () => setEnterLogOn(!enterLogOn);
  const toggleViewLog = () => setViewLogOn(!viewLogOn);
  const toggleEditLog = () => setEditLogOn(!editLogOn);
  const openViewLog = (logRecord) => setViewLog(logRecord);

  store.subscribe(() => {
    console.log("Entry Changed", store.getState())
  })

  return (
    <View style={styles.container}>

      {/* modal for adding logs */}
      <Modal
        visible = {enterLogOn}
        animationType = {'slide'}
      > 
        <AddProgressionLog toggleScreen = {toggleEntryScreen}/>
      </Modal>

    
      {/* modal for viewing logs */}
      <Modal
        visible = {viewLogOn}
        animationType = {'slide'}
      >
        <ViewProgressionLog toggleScreen = {toggleViewLog} logInfo = {viewLog} />
      </Modal>

      {/* modal for editing logs */}
      <Modal
        visible = {editLogOn}
        animationType = {'slide'}
      >
        <EditProgressionLog toggleScreen = {toggleEditLog} logInfo = {editLogInfo}/>
      </Modal>

      {/* scrollview for log entries, mainscreen */}
      <View style = {styles.logScreenHeader}>
        <Text style = {styles.logScreenHeading}>Progression Log Entries</Text>
      </View>
      <ScrollView style = {styles.LogScreen}>

          {store.getState().map((item) => {
            return <TouchableOpacity onPress ={() => {openViewLog(item); toggleViewLog()}}><Log logInfo = {item} date = {item.logDate} logUpdate = {LogRemoved} edit = {setEditLogInfo} toggleLogEdit = {toggleEditLog}/></TouchableOpacity>
          })}
        
      </ScrollView>
      
      {/* Button for adding logs */}
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
  logScreenHeader:{
    backgroundColor: "#CC0000",
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },  
  logScreenHeading: {
    fontSize: 25,
    color: "#fff"
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
