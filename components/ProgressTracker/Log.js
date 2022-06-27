import { StyleSheet, Text, View } from "react-native";

const Log = (props) => {
  return(
    <View style = {styles.logBox}>
      <Text style = {{fontSize: 18}}>Progress Log made on {props.date}</Text>
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
  }
})

export default Log;