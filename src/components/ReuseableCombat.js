import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native"; 

const ReuseableCombat = (props) => {
  return (
    <View naticID="combat-screen" style={{flex:1, display:"flex", flexDirection:"column"}}>
        
        {/* stats container  */}
        <View nativeID="stats" style={styles.row}>
              {/* player stats box */}
              <ImageBackground source={require('../../assets/box.jpg')} style={styles.box1}>
                <Text style={styles.text}>  </Text>
                <Text style = {styles.stats}>   Player Stats:   </Text>
                <Text style={styles.text}>  </Text>
                <Text style={styles.text}> Health: {props.Healthamount}</Text>
                <Text style={styles.text}> Strength: {props.Strengthamount}</Text>
                <Text style={styles.text}> Energy: {props.Energyamount}</Text>
                <Text style={styles.text}>  </Text>
                </ImageBackground>
              {/* monster stats box */}
              <ImageBackground source={require('../../assets/box.jpg')} style={styles.box1}>
                <Text style={styles.text}>  </Text>
                <Text style = {styles.stats}> Monster Stats: </Text>
                <Text style={styles.text}>  </Text>
                <Text style={styles.text}> Health: {props.MonsterHealthamount}</Text>
                <Text style={styles.text}> Strength: {props.MonsterStrengthamount}</Text>
                <Text style={styles.text}> Potions: {props.Potionamount}</Text>
                <Text style={styles.text}>  </Text>
                </ImageBackground>
            
        </View>

        <View nativID="monster-container" style={{flex:2, marginBottom: 5}}>
            {/* <View nativeID="monster-container" style={styles.imageContainer}> */}
              {/* Monster image on top of the background */} 
              <Image
                source ={props.monsterImage} 
                style={props.styling}
              />
            {/* </View> */}

        </View>

        <View nativeID="boba" style={styles.row2}>
        <ImageBackground nativeID="jumana" source={require('../../assets/longbox.jpg')} style={styles.box3}>
            <Text style={styles.text}> 
              {props.battleLogs}
            </Text>
          </ImageBackground>
        </View>

      <View style = {styles.ButtonContainer}>
  
          <TouchableOpacity onPress = {props.claw} disabled={props.clawDisabled} >
              <Image
                source={require("../../assets/paw.png")} 
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress = {props.pounce} disabled={props.pounceDisabled}>
              <Image
                source={require("../../assets/cat.png")} 
                style={styles.buttonImage}
              />
            </TouchableOpacity>
                    
            <TouchableOpacity onPress = {props.heal} disabled={props.healDisabled}>
              <Image
                source={require("../../assets/fish.png")} 
                style={styles.buttonImage}
              />
            </TouchableOpacity>
        </View>
    </View>
  );
};    

    {/*}
    <View>
      <View style={styles.border}>
        <ImageBackground source={require('../../assets/box.jpg')} style={styles.box1}>
          <Text style={styles.text}>Box 1</Text>
        </ImageBackground>
      </View>
      <View style={styles.border}>
        <ImageBackground source={require('../../assets/box.jpg')} style={styles.box2}>
          <Text style={styles.text}>Box 2</Text>
        </ImageBackground>
      </View>
    </View>*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'black',
  },
  row: {
    display:"flex",
    flexDirection:"row", 
    flex:1, 
    marginBottom:5, 
    marginTop: 60, 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  row2: {
    //display:"flex",
    flex:1, 
    marginBottom:5, 
    alignItems: 'center', 
  },
  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: "white",
    resizeMode: "contain",
  },
  box3: {
    flex:1, 
    borderWidth:5,
    borderColor:"white",
    marginBottom: 5, 
    resizeMode: "contain",
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%"
  },
  text: {
    textAlign:"center",
    flexWrap:"wrap",

    fontSize: 15,
    color: '#fff',
  },
  stats:{
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  ButtonContainer:{
    flexDirection: "row", 
    alignSelf: "center", 
    justifyContent: "space-between", 
    flex: 1
  },
  buttonImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});

 {/*imageContainer:{
    alignSelf: "center",
    justifyContent: 'center', 
  },
  secondImage:{
    height: 450,
    width: 450,
    marginBottom: 350,
  },*/}
  {/*{props.monsterImage}*/}

export default ReuseableCombat;
