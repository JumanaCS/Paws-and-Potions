import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View, ImageBackground} from "react-native";

export const DefeatScreen = (props) => {
  return (
    <View style={styles.container2}>
        <ImageBackground
        source={require("../../assets/victoryBack.jpeg")}
        style={styles.backgroundImage}
        />

        <Image
          source={require("../../assets/defeat.png")} 
          style={styles.victoryImage}
        />

        <TouchableOpacity
        /* Need to reset the game when pressed but to the next monster */
          onPress= {props.replayFunction}>
            <Image
            source={require("../../assets/pinkCont.png")} 
            style={styles.pinkButton}
            /> 
        </TouchableOpacity>


        <Image
          source={require("../../assets/VictoryCat.gif")} 
          style={styles.catImage}
        />
        </View> );
};

const styles = StyleSheet.create({
  container2:{
    flex: 1,
    display:"flex", 
    flexDirection:"column",
  },
  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    //opacity: 0.3,     
  },
  catImage:{
    flex: 1,
    height: "100%",
    width: "100%",
    marginTop: 50,
  },
  victoryImage:{
    flex: 1,
    height: '100%',
    width: "100%",
    resizeMode:"contain",
    marginTop: 35,
  },
  pinkButton: {
  height: 90, 
  width: "100%", 
  resizeMode: "contain", 
  alignSelf: "center", 
  marginBottom: 0,
  marginTop: 50,
  },
});

export default DefeatScreen;
