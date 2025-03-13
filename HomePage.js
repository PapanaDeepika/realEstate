import React, { createContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, IconButton } from "react-native-paper";
import SwitchToggle from "react-native-switch-toggle";
import { Picker } from "@react-native-picker/picker";
import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
// const AsyncStorageContext = createContext();

const HomePage = () => {
  const [language, setLanguage] = useState(i18n.locale);
  // const [storageData, changeLanguage] = useState(i18n.locale);

  const changeLanguage = async (lang) => {
    i18n.locale = lang;

    console.log(lang);
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false); // State to track button press
  const scaleValue = useRef(new Animated.Value(1)).current; // Create scale value for animation
  const opacityValue = useRef(new Animated.Value(1)).current; // Create opacity value for fading
  const [on, setOn] = useState(true);
  const [title, setTitle] = useState("English");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handlePress = () => {
    setIsPressed(true); // Mark button as pressed
    // Perform both fade-out and scale-up animations
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1.2, // Scale up
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0, // Fade out
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      //  navigation.navigate('Entry');
      // Navigate after animation completes

      navigation.navigate("Entry");
    });
  };

  useEffect(  () => {
    const load=async()=>{
    // await AsyncStorage.clear().then(() => {
    //   console.log("cleared successfully");
    // });

    await AsyncStorage.removeItem("userToken")
    await AsyncStorage.removeItem("role")

    await AsyncStorage.removeItem("firstName")
    await AsyncStorage.removeItem("searchFilters")   
    await AsyncStorage.removeItem("language").then(()=>{
      console.log("clear")
    })
     changeLanguage("en");
  }

  load()
  }, []);

  const handlePress1 = (lang) => {
    setOn(!on); // This will toggle the state
    setTitle(on ? "English" : "Telugu");
    setSelectedLanguage(lang);

    changeLanguage(lang === "English" ? "en" : "te");
  };

  return (
    // <AsyncStorageContext.Provider value={{ language, setLanguage }}>

    <ImageBackground
      source={require("./assets/starting.jpeg")} // Replace with your image path
      style={styles.backgroundImage}
    >
      <View style={styles.container1}>
        <View style={styles.dropdownWrapper1}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handlePress1(itemValue)}
            style={styles.picker1}

            itemStyle={{    fontFamily: "Montserrat_500Medium",
            }}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Telugu" value="Telugu" />
          </Picker>
        </View>
      </View>
      <View style={styles.overlay}>
        {/* Animated container with scale and opacity */}
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleValue }], // Apply scaling
              opacity: opacityValue, // Apply fading
            },
          ]}
        >
          {/* 
<Switch
        value={on}
        onValueChange={handlePress1}
        disabled={false}
        circleSize={30}
        barHeight={30}
        circleBorderWidth={3}
        backgroundActive="#6D6D6D"
        backgroundInactive="#C4C4C4"
        circleActiveColor="#00D9D5"
        circleInActiveColor="#C4C4C4"
        changeValueImmediately={true}
      /> */}
          <Text style={styles.title}>{i18n.t("WELCOME TO BHOOMI")}</Text>

          {/* Get Started Button */}
          <TouchableOpacity
            style={[styles.button, isPressed && styles.buttonPressed]} // Change color on press
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{i18n.t("GET STARTED")}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
    // </AsyncStorageContext.Provider>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "flex-start", // Align items vertically to the top
    alignItems: "flex-end", // Align items horizontally to the right
    paddingTop: 20, // Optional, adds space from the top
    paddingRight: 20, // Optional, adds space from the right edge
  },
  dropdownWrapper1: {
    marginTop: 10, // Optional, if you want to add space before the dropdown
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  picker1: {
    height: 50,
    width: 150,
    marginLeft: 10,
    marginRight: 10,
    fontFamily:"Montserrat_100Thin"
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Blackish overlay
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    bottom: 0, // Start the container from the bottom
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent box
    padding: 40,
    borderRadius: 10,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    fontFamily:"Montserrat_900Black"
  },
  button: {
    backgroundColor: "#665a6f", // Initial button color
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    fontFamily:"Montserrat_700Bold"
  },
  buttonPressed: {
    backgroundColor: "#4a3f51", // Darken the button when pressed
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"
  },
});

export default HomePage;
