import React, { useState, useReducer } from "react";
import { Text, StyleSheet, ImageBackground, View, Image, TouchableOpacity } from "react-native";
import ReuseableGame from "../components/ReuseableGame";
import ReuseableCombat from "../components/ReuseableCombat";
import DefeatScreen from "./DefeatScreen";

const STAT_SCREEN_STATE = "characterCreation";
const COMBAT_SCREEN_STATE = "fighting"; 
const VICTORY_SCREEN = "playerVictory";
const STAT_SCREEN_BUFF = "pointBuff";

const monsters = [
  {
    'name':"Ramune the Raging Rat",
    'monster_image': require("../../assets/monster1.gif"),
    'monster_background':require("../../assets/back1.png"),
    'stats': {MonsterHealth: 100, MonsterStrength: 5, potion: 1}
  },
  {
    'name':"Boba the Battle Bunny",
    'monster_image': require("../../assets/monsterTwo.gif"),
    'monster_background':require("../../assets/back2.png"),
    'stats': {MonsterHealth: 110, MonsterStrength: 10, potion: 2}
  },
  {
    'name':"Baja the BloodShed Bird",
    'monster_image': require("../../assets/monster3.gif"),
    'monster_background':require("../../assets/back3.png"),
    'stats': {MonsterHealth: 115, MonsterStrength: 13, potion: 3}
  },
]

{/* Player Reducer */}
const myReducer = (state, action) => {
  switch(action.growInPower){
    case 'reset':
      return {health:10, strength:1, energy:1, heal:1}
    case 'health':
      if (state.health + action.amount >= 0) {
        return { ...state, health: state.health + action.amount };
      } else {
        return { ...state, health: 0 };
      }
      
    case 'strength':
      if (state.strength + action.amount >= 0) {
        return { ...state, strength: state.strength + action.amount };
      } else {
        return { ...state, strength: 0 };
      }

    case 'energy':
      if (state.energy + action.amount >= 0) {
        return { ...state, energy: state.energy + action.amount };
      } else {
        return { ...state, energy: 0 };
      }

      case 'reset_heal':
        return {...state, heal:1}
      case "heal":
        return { ...state, heal: 0 };
    default: 
        return state;
  }
}

{/* Monster Reducer */}
const MonsterReducer = (Monsterstate, Monsteraction) => {
  switch(Monsteraction.MonsterPower){
    case 'reset':
      return monsters[0]
    case 'NextMonster':
      return Monsteraction.NewMonster  
    case 'MonsterHealth':
      if (Monsterstate.stats.MonsterHealth) {
        return { 
          ...Monsterstate, 
          stats:{
            ...Monsterstate.stats,
            MonsterHealth: Monsterstate.stats.MonsterHealth - Monsteraction.amount 
          }
        };
      } 
      else{
        return Monsterstate
      }

    case 'MonsterStrength':
      if (Monsterstate.stats.MonsterStrength) {
        return { 
          ...Monsterstate, 
          stats:{
            ...Monsterstate.stats,
            MonsterStrength: Monsterstate.stats.MonsterStrength - Monsteraction.amount 
          }
        };
      } 
      else{
        return Monsterstate
      }

    case 'potion':
      if (Monsterstate.stats.potion) {
        return { 
          ...Monsterstate, 
          stats:{
            ...Monsterstate.stats,
            potion: Monsterstate.stats.potion - Monsteraction.amount
          }
        };
      } 
      else{
        return Monsterstate
      }

    default: 
        return Monsterstate;
  }
}

{/* Combat Reducer 
const combatReducer = (Combatstate, Combataction) => {
  switch(Combataction.Combat){
    case 'attack':
      if (Combatstate.attack) {
        return { ...Combatstate, attack: Monsterstate.MonsterHealth - Combataction.num };
      } 

    case 'pounce':
      if (Combatstate.pounce) {
        return { ...Combatstate, pounce: Monsterstate.MonsterHealth - Combataction.num };
      } 

    case 'heal':
      if (Combatstate.heal) {
        return { ...Combatstate, heal: state.health + Combataction.num };
      } 
  }
} */}



const CombatTest = (props) => {
  const [currentMonster, setCurrentMonster] = useState(0)
  const [state, runReducer] = useReducer(myReducer, {health: 10, strength: 1, energy: 1, heal: 1});
  const [Monsterstate, runMonsterReducer] = useReducer(MonsterReducer, monsters[currentMonster]); 
  const [pointsRemaining, setPointsRemaining] = useState(20)
  const [gameState, setGameState] = useState(STAT_SCREEN_STATE);
  const [battleLogs, setBattleLogs] = useState(`It is time to battle ${monsters[0].name}...`)
  
  if (Monsterstate.stats.MonsterHealth <= 0 ){
    if (currentMonster == monsters.length -1){
      return (
        
        <View style={styles.container2}>
        <ImageBackground
        source={require("../../assets/finalBack.jpeg")}
        style={styles.backgroundImage}
        />

        <Image
          source={require("../../assets/finalVictory.png")} 
          style={styles.victoryImage2}
        />

        <TouchableOpacity
        /* problem 1: Need to reset the game when pressed but to the next monster */
        onPress= {
          () => {
            setCurrentMonster(0)
            runMonsterReducer({MonsterPower:'reset'})
            runReducer({growInPower:'reset'})
            setPointsRemaining(20)
            setGameState(STAT_SCREEN_STATE)
            setBattleLogs(`It is time to battle ${monsters[0].name}`)
          }
        }>
            <Image
            source={require("../../assets/vicPlay.png")} 
            style={styles.pinkButton2}
            /> 
        </TouchableOpacity>


        <Image
          source={require("../../assets/finalCat.gif")} 
          style={styles.catImage2}
        />
        </View> );
    }
    setPointsRemaining(5);
    setGameState(VICTORY_SCREEN)
    runReducer({growInPower:"reset_heal"})
    setBattleLogs(`You defeated ${Monsterstate.name}, it is time to fight ${monsters[currentMonster+1].name}...`)
    setCurrentMonster(currentMonster+1)
    runMonsterReducer({MonsterPower: 'NextMonster', NewMonster:monsters[currentMonster+1] })
  }

  if (state.health <= 0 || (state.energy <=0 && state.strength <=0)){
    return <DefeatScreen replayFunction={
      () => {
        setCurrentMonster(0)
        runMonsterReducer({MonsterPower:'reset'})
        runReducer({growInPower:'reset'})
        setPointsRemaining(20)
        setGameState(STAT_SCREEN_STATE)
        setBattleLogs(`It is time to battle ${monsters[0].name}...`)
      }
    }/>
  }
  console.log(state)

  {/*const [Combatstate, runCombatReducer] = useReducer(combatReducer) */}

  var WhatToDisplay; 

  switch(gameState){
    case VICTORY_SCREEN:
      console.log(currentMonster, Monsterstate)
      WhatToDisplay =  (
        <View style={styles.container2}>
        <ImageBackground
        source={require("../../assets/victoryBack.jpeg")}
        style={styles.backgroundImage}
        />
  
        <Image
          source={require("../../assets/victory.png")} 
          style={styles.victoryImage}
        />
  
        <TouchableOpacity
        /* Need to reset the game when pressed but to the next monster  */
          onPress={() => setGameState(STAT_SCREEN_BUFF)}>
            <Image
            source={require("../../assets/pinkCont.png")} 
            style={styles.pinkButton}
            /> 
        </TouchableOpacity>
  
        <Image
          source={require("../../assets/VictoryCat.gif")} 
          style={styles.catImage}
        />
        </View>
      );
      break;
    case STAT_SCREEN_STATE:
      WhatToDisplay = <View style={styles.container}>
        <ImageBackground
        source={require("../../assets/charcterbackground.png")}
        style={styles.backgroundImage}
        />

      
        <View style={{flex:1}}>


          <Text style={styles.text} >GROW IN POWER!</Text>
        </View>

        <View style={{flex:3}}>
            <ReuseableGame 
            minusDisabled={pointsRemaining===20}
            plusDisabled ={pointsRemaining===0}
            minus = {() => {runReducer({growInPower: "health", amount: 10 * -1}); setPointsRemaining(pointsRemaining+1) }} 
            minusImage = {require("../../assets/lightminus.png")} name = "  Current Health" amount = {state.health} plusImage = {require("../../assets/lightplus.png")}
            plus = {() => {runReducer({growInPower: "health", amount: 10});  setPointsRemaining(pointsRemaining-1); }}
            />

            <ReuseableGame 
              minusDisabled={pointsRemaining===20}
              plusDisabled ={pointsRemaining===0}
            minus = {() => {runReducer({growInPower: "strength", amount: 1 * -1}); setPointsRemaining(pointsRemaining+1) }} 
            minusImage = {require("../../assets/midminus.png")} name = "  Current Strength" amount = {state.strength} plusImage = {require("../../assets/midplus.png")}
            plus = {() => {runReducer({growInPower: "strength", amount: 1}); setPointsRemaining(pointsRemaining-1); }} />

            <ReuseableGame 
            minusDisabled={pointsRemaining===20}
            plusDisabled ={pointsRemaining===0}
            minus = {() => {runReducer({growInPower: "energy", amount: 1 * -1}); setPointsRemaining(pointsRemaining+1)}} 
            minusImage = {require("../../assets/darkminus.png")} name = "  Current Energy" amount = {state.energy} plusImage = {require("../../assets/darkplus.png")} 
            plus = {() => {runReducer({growInPower: "energy", amount: 1}); setPointsRemaining(pointsRemaining-1); }} />
            
          </View>

          <View style={{flex:1}}>
              <Text style={styles.text2}>POINTS REMAINING: {pointsRemaining}</Text>
          </View>

        <TouchableOpacity
          style={pointsRemaining === 0}
          disabled={pointsRemaining>0}
          onPress={() => setGameState(COMBAT_SCREEN_STATE)}>
            {pointsRemaining === 0 ? 
            <Image
            source={require("../../assets/continue.png")} 
            style={{ height: 90, width: "100%", resizeMode: "contain", alignSelf: "center", marginBottom: 75,}}
            /> :
          <Text style={styles.text3}>
          "spend all points to continue"
          </Text>  }
        </TouchableOpacity>

      </View>
      break;

      case COMBAT_SCREEN_STATE:
        WhatToDisplay = 

        <View nativeID="combat-screen" style={{height:"100%", padding:20}}>
          <ImageBackground
            source={Monsterstate.monster_background}
            style={styles.backgroundImage}
        />

        {/* change claw, pounce, and heal to affect the monster not itself 
          log = "Using your strength, you have clawed"
          log2 = "the monster! It lost 20 hp and you lost 1"
          log3 = "strength point."*/} 
        <ReuseableCombat 
          Healthamount = {state.health}
          Strengthamount = {state.strength}
          Energyamount = {state.energy}

          MonsterHealthamount  = {Monsterstate.stats.MonsterHealth}
          MonsterStrengthamount  = {Monsterstate.stats.MonsterStrength}
          Potionamount  = {Monsterstate.stats.potion}

          battleLogs = {battleLogs}

          /* Uses the Reducers to mess with the stats  */
          clawDisabled={state.strength === 0}
          pounceDisabled={state.energy === 0}
          healDisabled= {state.heal === 0}
          claw = {() => {
            const clawAmount = getRandomNumber(5, 15)
            const monsterAttackBackAmount = getRandomNumber(0, Monsterstate.stats.MonsterStrength)
            
            runMonsterReducer({MonsterPower: 'MonsterHealth', amount: clawAmount})
            runMonsterReducer({MonsterPower: 'MonsterStrength', amount: 1})
            runReducer({growInPower: 'strength', amount: -1})
            runReducer({growInPower: 'health', amount: monsterAttackBackAmount * -1})
            setBattleLogs(
              `HISS!\n`+
              `Using your strength, you have clawed the monster! It lost ${clawAmount} HP.\n`+
              `The monster attacked you back and you lost ${monsterAttackBackAmount} HP.`
            )

          }} 
          pounce = {() => {
            const pounceAmount = getRandomNumber(15, 25)
            const monsterPotionEffect = Monsterstate.stats.potion * 10
            const monsterAttackBackAmount = getRandomNumber(0, Monsterstate.stats.MonsterStrength + monsterPotionEffect)

            runMonsterReducer({MonsterPower: 'MonsterHealth', amount: pounceAmount})
            runMonsterReducer({MonsterPower: 'potion', amount: 1 })
            runReducer({growInPower: 'energy', amount: -1})
            runReducer({growInPower: 'health', amount: monsterAttackBackAmount *-1})
            runMonsterReducer({MonsterPower: 'MonsterStrength', amount: 1})
            setBattleLogs(
              `PURRR!\n`+
              `Using your energy, you have pounced on the monster! It lost ${pounceAmount} HP.\n`+
              `${monsterPotionEffect > 0 ? "The monster used its potion to attack you!\n": "The monster used it's strength to attack you!\n"}`+
              `You lost ${monsterAttackBackAmount} HP.`
            )

        }}
          heal = {() => {
            runReducer({growInPower: 'health', amount: 20})
            runReducer({growInPower: 'heal', amount: -1})
            setBattleLogs(
              `MEOW!\n`+
              `You have licked your wounds and healed!\n` +
              `Gaining 20 HP. You can no longer heal...`
            )
        }} 

          monsterImage = {Monsterstate.monster_image} 
          styling = {styles.monster1Image} 
        />

        </View>
        break;

      case VICTORY_SCREEN:
       //still need to make it 5 

        WhatToDisplay = <View style={styles.container2}>
        <ImageBackground
        source={require("../../assets/victoryBack.jpeg")}
        style={styles.backgroundImage}
        />

        <Image
          source={require("../../assets/victory.png")} 
          style={styles.victoryImage}
        />

        <TouchableOpacity
        /* Need to reset the game when pressed but to the next monster */
          onPress={() => setGameState(STAT_SCREEN_BUFF)}>
            <Image
            source={require("../../assets/pinkCont.png")} 
            style={styles.pinkButton}
            /> 
        </TouchableOpacity>


        <Image
          source={require("../../assets/VictoryCat.gif")} 
          style={styles.catImage}
        />
        </View>
        break;

        case STAT_SCREEN_BUFF:

          WhatToDisplay = <View style={styles.container}>
            <ImageBackground
            source={require("../../assets/charcterbackground.png")}
            style={styles.backgroundImage}
            />
    
          
            <View style={{flex:1}}>
    
    
              <Text style={styles.text} >GROW IN POWER!</Text>
            </View>
    
            <View style={{flex:3}}>
                <ReuseableGame 
                minusDisabled={pointsRemaining===5}
                plusDisabled ={pointsRemaining===0}
                minus = {() => {runReducer({growInPower: "health", amount: 10 * -1}); setPointsRemaining(pointsRemaining+1) }} 
                minusImage = {require("../../assets/lightminus.png")} name = "  Current Health" amount = {state.health} plusImage = {require("../../assets/lightplus.png")}
                plus = {() => {runReducer({growInPower: "health", amount: 10});  setPointsRemaining(pointsRemaining-1); }}
                />
    
                <ReuseableGame 
                  minusDisabled={pointsRemaining===5}
                  plusDisabled ={pointsRemaining===0}
                minus = {() => {runReducer({growInPower: "strength", amount: 1 * -1}); setPointsRemaining(pointsRemaining+1) }} 
                minusImage = {require("../../assets/midminus.png")} name = "  Current Strength" amount = {state.strength} plusImage = {require("../../assets/midplus.png")}
                plus = {() => {runReducer({growInPower: "strength", amount: 1}); setPointsRemaining(pointsRemaining-1); }} />
    
                <ReuseableGame 
                minusDisabled={pointsRemaining===5}
                plusDisabled ={pointsRemaining===0}
                minus = {() => {runReducer({growInPower: "energy", amount: 1 * -1}); setPointsRemaining(pointsRemaining+1)}} 
                minusImage = {require("../../assets/darkminus.png")} name = "  Current Energy" amount = {state.energy} plusImage = {require("../../assets/darkplus.png")} 
                plus = {() => {runReducer({growInPower: "energy", amount: 1}); setPointsRemaining(pointsRemaining-1); }} />
                
              </View>
    
              <View style={{flex:1}}>
                  <Text style={styles.text2}>POINTS REMAINING: {pointsRemaining}</Text>
              </View>
    
            <TouchableOpacity
              style={pointsRemaining === 0}
              disabled={pointsRemaining>0}
              onPress={() => {
                setGameState(COMBAT_SCREEN_STATE)
              }
              }>
                {pointsRemaining === 0 ? 
                <Image
                source={require("../../assets/continue.png")} 
                style={{ height: 90, width: "100%", resizeMode: "contain", alignSelf: "center", marginBottom: 75,}}
                /> :
              <Text style={styles.text3}>
              "spend all points to continue"
              </Text>  }
            </TouchableOpacity>
    
          </View>
          break;
  }

  return WhatToDisplay;

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  container2:{
    flex: 1,
    display:"flex", 
    flexDirection:"column",
  },
  text: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 100,
    paddingTop: 45,
    color: "white",
  },
  text2: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 70,
    paddingBottom: 0,
    color: "white",
  },
  text3:{
    fontSize: 25,
    textAlign: "center",
    paddingTop: 70,
    paddingBottom: 70,
    color: "white",
  },
  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    //opacity: 0.3,     
  },
  redSquareStyle:{
    borderColor:"black",
    borderWidth: 5,
    textAlign:"center",
    height: 100,
    width: 100,
    flex:1
  },
  monster1Image:{
      height: "100%",
      width: "100%",
      resizeMode:"contain",
  },
  ContinuebuttonImage: {
    
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
  catImage2:{
    flex: 1,
    height: "100%",
    width: "100%",
    marginTop: 50,
  },
  victoryImage2:{
    flex: 1,
    height: '100%',
    width: "100%",
    resizeMode:"contain",
    marginTop: 35,
  },
  pinkButton2: {
  height: 90, 
  width: "100%", 
  resizeMode: "contain", 
  alignSelf: "center", 
  marginBottom: 0,
  marginTop: 50,
  },
});
  
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export default CombatTest;