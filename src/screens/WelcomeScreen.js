import React from "react";
import { Text, StyleSheet, ImageBackground, View, Image,TouchableOpacity } from "react-native";

const WelcomeScreen = (props) => {
  console.log(props);

  return (
    <View style={styles.container}>
      {/* Background image */}
      <ImageBackground
        source={require("../../assets/welcome.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.imageContainer}>
          {/* Second image on top of the background */}
          <Image
            source={require("../../assets/cloudtitle.gif")} 
            style={styles.secondImage}
          />
        </View>
      </ImageBackground>

      {/* Button at the very bottom */}
      <TouchableOpacity onPress= {function(){props.navigation.navigate("Rules")}} style={styles.buttonContainer}>
        <Image
          source={require("../../assets/play.png")} 
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    //resizeMode: "cover", // broke my code boo
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  secondImage: {
    paddingTop: 25,
    top: 25,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonImage: {
    position: "absolute",
    bottom: 70,
    left: 0,
    width: "100%",
    height: 90, 
    resizeMode: "contain", // Ensure the button image fits within the height, rewatch youtube vid
  },
  
});

export default WelcomeScreen;