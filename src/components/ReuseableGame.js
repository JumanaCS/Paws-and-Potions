import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"; 

const ReuseableGame = (props) => {
  return <View style = {{flexDirection: "row", alignSelf: "center", justifyContent: "space-between", flex: 1}}>
     <TouchableOpacity onPress = {props.minus} disabled={props.minusDisabled}>
     <Image
          source= {props.minusImage}
          style={styles.buttonImage}
        />
     </TouchableOpacity>

    <Text style={styles.text}> {props.name}: {props.amount} </Text>

    <TouchableOpacity onPress = {props.plus} disabled={props.plusDisabled}>
    <Image
          source= {props.plusImage}
          style={styles.buttonImage2}
        />
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    alignSelf: "center",
    //justifyContent: 'center',
    flex: 1,
    color: "white",
  },
  buttonImage: {
    height: 110,
    width: 110,
   resizeMode: "contain",
    //alignSelf: "flex-start",
    //flex: 2
  },
  buttonImage2: {
    height: 110,
    width: 110,
    resizeMode: "contain",
    //alignSelf: "flex-start",
    //flex: 12
  }
});

export default ReuseableGame;
