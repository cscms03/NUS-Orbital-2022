import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Log from "../../components/ProgressionTracker/Log";
import { useState, useEffect } from 'react';
import store from "../../redux/store";
import AddProgressionLog from "./AddProgressionLog";
import ViewProgressionLog from "./ViewProgressionLog";
import EditProgressionLog from "./EditProgressLog";
import Icon from "react-native-vector-icons/Entypo";
import ImageGallery from "./ImageGallery";
import {auth, db} from "../../firebase";
import {getDoc, doc, docs, collection, onSnapshot} from "firebase/firestore"


function ProgressTracker() {
  const [enterLogOn, setEnterLogOn] = useState(false); //toggle for modal of log entry screen
  const [viewLogOn, setViewLogOn] = useState(false); //toggle for modal of log view screen
  const [viewLog, setViewLog] = useState(null); //stores info of log to view
  const [removed, setRemoved] = useState(true); //used to rerender the screen when log is removed
  const [editLogInfo, setEditLogInfo] = useState(null); //stores info of log to edit
  const [editLogOn, setEditLogOn] = useState(false); //toggle for modal of log edit screen
  const [galleryOn, setGalleryOn] = useState(false); //toggle for modal of log gallery screen
  const [log, setLog] = useState([]);

  const LogRemoved = () => setRemoved(!removed);
  const toggleEntryScreen = () => setEnterLogOn(!enterLogOn);
  const toggleViewLog = () => setViewLogOn(!viewLogOn);
  const toggleEditLog = () => setEditLogOn(!editLogOn);
  const toggleGallery = () => setGalleryOn(!galleryOn);
  const openViewLog = (logRecord) => setViewLog(logRecord);

  store.subscribe(() => {
    console.log("Entry Changed", store.getState());
  });

  const ios = Platform.OS === "ios";
  const user = auth.currentUser;
  const uid = user.uid;
  const logRecordRef = collection(db, 'users/'+uid+'/log');

  useEffect(
    () =>
      onSnapshot(logRecordRef, (snapshot) => 
        setLog(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
    []
  );

  return (
    <View style={styles.container}>
      {/* modal for adding logs */}
      <Modal
        visible={enterLogOn}
        animationType={"slide"}
        presentationStyle="formSheet"
      >
        <AddProgressionLog toggleScreen={toggleEntryScreen} />
      </Modal>

      {/* modal for viewing logs */}
      <Modal
        visible={viewLogOn}
        animationType={"slide"}
        presentationStyle="formSheet"
      >
        <ViewProgressionLog toggleScreen={toggleViewLog} logInfo={viewLog} />
      </Modal>

      {/* modal for editing logs */}
      <Modal
        visible={editLogOn}
        animationType={"slide"}
        presentationStyle="formSheet"
      >
        <EditProgressionLog
          toggleScreen={toggleEditLog}
          logInfo={editLogInfo}
        />
      </Modal>

      {/* modal for gallery screen*/}
      <Modal
        visible={galleryOn}
        animationType={"slide"}
        presentationStyle="formSheet"
      >
        <ImageGallery toggleScreen={toggleGallery} data = {log}/>
      </Modal>

      {/* scrollview for log entries, mainscreen */}
      <ScrollView style={styles.LogScreen}>
        {log.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                openViewLog(item);
                toggleViewLog();
              }}
            >
              <Log
                logInfo={item}
                logUpdate={LogRemoved}
                edit={setEditLogInfo}
                toggleLogEdit={toggleEditLog}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Button for adding logs */}
      <TouchableOpacity style={styles.button} onPress={toggleEntryScreen}>
        <View style={styles.addButton}>
          <Text style={styles.plus}>+</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleGallery}>
        <View style={styles.galleryButton}>
          <Icon name="documents" size={25} color="#fff" />
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
  logScreenHeader: {
    backgroundColor: "#CC0000",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logScreenHeading: {
    fontSize: 25,
    color: "#fff",
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
    left: 40,
  },
  plus: {
    fontSize: 40,
    color: "#fff",
  },
  button: {
    position: "absolute",
    right: 70,
    bottom: 0,
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#CC0000",
    alignItems: "center",
    justifyContent: "center",
    bottom: 120,
    left: 40,
  },
});

export default ProgressTracker;
