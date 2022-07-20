import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function ViewProgressionLog ({toggleScreen, logInfo}) {
  

  return (
    <View style={styles.container}>
          <View style={styles.viewLogHeader}>
            <TouchableOpacity onPress={() => toggleScreen()}>
              <View style={styles.backButton}>
                <Text style ={styles.backText}>Back</Text>
              </View>
            </TouchableOpacity>
            <Text style = {styles.viewLogScreenHeading}>Progression Log on {logInfo.logDate}</Text>
          </View>

          <View style = {styles.viewLogScreen}>
            <View style = {styles.photoContainer}>
              <Image source={{uri:logInfo.logPhoto}} style = {styles.viewLogPhoto} />
            </View>
            <View style = {styles.memoContainer}>
              <Text>{logInfo.logMemo}</Text>
            </View>
          </View>
        </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
})

export default ViewProgressionLog;