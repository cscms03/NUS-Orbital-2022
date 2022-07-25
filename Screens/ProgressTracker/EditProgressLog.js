import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import store from "../../redux/store";
import {progressionLogEdited} from '../../redux/actions.js';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {db, auth} from "../../firebase";
import {setDoc, doc, docs, collection, onSnapshot} from "firebase/firestore"


function EditProgressionLog (props) {
  const [image, setImage] = useState(props.logInfo.logPhoto);
  const [memo, setMemo] = useState(props.logInfo.logMemo);

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

  const onLogEdit = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const logRef = doc(db, 'users/'+uid+'/log/'+props.logInfo.id);
    const payload = {
      logDate: props.logInfo.logDate,
      logMemo: memo,
      logPhoto: image
    };
    await setDoc(logRef, payload);
  }

  return(
    <ScrollView>
      <KeyboardAvoidingView>
        <View style = {styles.entryScreenHeader}>
          <Text style = {styles.entryScreenHeading}>Edit Progression Entry</Text>
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
          <View style = {{flexDirection: "row"}}>
            <TouchableOpacity style = {styles.addEntryButton} onPress = {() => {props.toggleScreen(); onLogEdit();}}>
              <View>
                <Text style = {styles.addEntryText}>Edit Entry</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.addEntryButton} onPress = {() => {props.toggleScreen()}}>
              <View>
                <Text style = {styles.addEntryText}>Cancel</Text>
              </View>
            </TouchableOpacity> 
          </View>
        </View> 
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  entryScreenHeader: {
    flex: 1,
    backgroundColor: "#CC0000",
    flexDirection: 'row',
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
    width: 150,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
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
});

export default EditProgressionLog;