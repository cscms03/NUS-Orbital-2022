import { StatusBar } from "expo-status-bar";
import { Image, ImagePickerIOS, KeyboardAvoidingView, Modal, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Component, useState} from 'react';
import Log from "../components/Log"; 
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import store from "../redux/store";

function ProgressTracker() {
  const [logEntryScreen, setLogEntryScreen] = useState(false)
  const [image, setImage] = useState(null);
  const [memo, setMemo] = useState(null);
  const [progressionLog, setProgressionLog] = useState([]);
  const [viewLogOn, setViewLogOn] = useState(false);
  const [viewLog, setViewLog] = useState(null)

  const toggleEntryScreen = () => setLogEntryScreen(!logEntryScreen);
  const toggleViewLog = () => setViewLogOn(!viewLogOn);

  store.dispatch({
    type: "progressionLogAdded",
    payload: {
      logPhoto: null,
      logMemo: 'abc' 
    }
  })

  store.dispatch({
    type: "progressionLogRemoved",
    payload: {
      id: 1
    }
  })
  
  console.log(store.getState());

  const onImageAdd = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2,3.5],
      quality: 1  
    })
    if (!result.cancelled){
      setImage(result.uri)  
    }
  }

  const addProgressionLog = (logPhoto, logMemo) => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var logDate = date + '-' + month + '-' + year;
    setProgressionLog([{date: logDate, photo: logPhoto, memo: logMemo}, ...progressionLog])
  }

  const openViewLog = (logRecord) => setViewLog(logRecord);

  return (
    <View style={styles.container}>
      <Modal
      visible = {logEntryScreen}
      animationType = {'slide'}
      >
        <ScrollView>
          <KeyboardAvoidingView>
            <View style = {styles.entryScreenHeader}>
              <Text style = {styles.entryScreenHeading}>New Progression Entry</Text>
            </View>
            <View style = {styles.entryScreen}>
              <View style = {{alignItems: "center"}}>
                {image && <Image source={{uri:image}} style = {{height:350, width:200}} />}
                <TouchableOpacity style = {styles.selectImage} onPress = {onImageAdd}>
                  <View>
                    <Text style = {{color: "#fff", fontSize: 15}}>Add Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TextInput style={styles.input} placeholder ={'Enter Memo'} multiline = {true} value ={memo} onChangeText = { text => setMemo(text)}/>
              <TouchableOpacity style = {styles.addEntryButton} onPress = {() => {toggleEntryScreen(); addProgressionLog(image, memo);}}>
                <View>
                  <Text style = {styles.addEntryText}>Add Entry</Text>
                </View>
              </TouchableOpacity> 
            </View> 
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>

      <Modal
      visible = {viewLogOn}
      animationType = {'slide'}
      >
        <View style={styles.container}>
          <View style={styles.viewLogHeader}>
            <TouchableOpacity onPress={() => toggleViewLog()}>
              <View style={styles.backButton}>
                <Text style ={styles.backText}>Back</Text>
              </View>
            </TouchableOpacity>
            {viewLog && <Text style = {styles.viewLogScreenHeading}>Progression Log on {viewLog.date}</Text>}
          </View>

          <View style = {styles.viewLogScreen}>
            <View style = {styles.photoContainer}>
              {viewLog && <Image source={{uri:image}} style = {styles.viewLogPhoto} />}
            </View>
            <View style = {styles.memoContainer}>
              {viewLog && <Text>{viewLog.memo}</Text>}
            </View>
          </View>

        </View>
      </Modal>

      <ScrollView style = {styles.LogScreen}>
        {
          progressionLog.map((item) => {
            return <TouchableOpacity onPress ={() => {openViewLog(item); toggleViewLog()}}><Log key={item} date = {item.date} memo = {item.memo} /></TouchableOpacity>
          })
        }
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
  entryScreenHeader: {
    flex: 1,
    backgroundColor: "#CC0000",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  entryScreen: {
    flex: 6,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    margin: 20
  },
  addEntryButton: {
    backgroundColor: "#CC0000",
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  addEntryText: {
    color: "#fff",
    fontSize: 25
  },
  entryScreenHeading: {
    fontSize: 27,
    color: "#fff"
  },
  selectImage: {
    width: 100,
    height: 30,
    borderRadius: 15,
    top: 10,
    backgroundColor: "#CC0000",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "#bababa",
    width: 300,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#949191",
    padding: 10,
    margin: 30
  },
  selectDate:{
    backgroundColor: "#CC0000",
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  viewLogScreen: {
    flex: 6,
    justifyContent: "center",
  },
  viewLogPhoto: {
    height:350, 
    width:200
  },
  viewLogHeader: {
    flex: 0.5,
    backgroundColor: "#CC0000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  backButton: {
    position: "absolute",
    left: -180
  },
  backText: {
    color: "#fff", 
    fontSize: 15
  },
  viewLogScreenHeading:{
    fontSize: 17,
    color: "#fff"
  },
  photoContainer:{
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  memoContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#CC0000",
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    padding: 10,
    margin: 20,
    bottom: 20
  },
});

export default ProgressTracker;
