import { faL } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "1",
    title: "Welcome to RealEstate",
    text: "Your journey to a better experience starts here! You can search for different type of properties like Agricultural lands,Commercial Properties,Layouts and Residentails Areas",
    image: require('../assets/intro1.jpeg'), // Use a local image
    backgroundColor: "#22bcb5",
  },
  {
    key: "2",
    title: "Agents Support",
    text: "You can reach out to agents for buying or selling a property",
    image: require("../assets/agents.jpeg"),
    backgroundColor: "#3395ff",
  },
  {
    key: "3",
    title: "Feature",
    text: "You can sell your property, Buy a Property or participate in auction",
    image: require("../assets/buy.jpeg"),
    backgroundColor: "#febe29",
  },
];

const WalkthroughScreen = ({ navigation }) => {
  const [showMainApp, setShowMainApp] = useState(false);

  const [introSeen,setIntroSeen]=useState(false)
 
  const navigator=useNavigation()
 


  useEffect(()=>{
const abc=async()=>{
    await AsyncStorage.setItem("intro","true")
}

abc()
  },[])

  if (showMainApp) {

    console.log("login....")
  navigator.navigate("Login")
  }

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: '#168ea6'}]}>
              <Text style={styles.title}>{item.title}</Text>

      <Image source={item.image} style={styles.image} />
       <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      onDone={() => setShowMainApp(true)}
      showSkipButton
      onSkip={() => setShowMainApp(true)}
    />
  );
};

const styles = StyleSheet.create({
  slide: { flex: 1 },
  title: { fontSize: 24,  fontFamily:"Montserrat_700Bold", color: "#fff", textAlign: "center" },

  image: { width: 420, height: 600,marginLeft:0,marginBottom:10 ,padding:0, },
   text: { fontSize: 18 ,fontFamily:"Montserrat_500Medium",  textAlign: "center",color:"#d7eefc" },
  mainApp: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default WalkthroughScreen;
