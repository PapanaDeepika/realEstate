import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, IconButton } from 'react-native-paper';

const HomePage = () => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false); // State to track button press
  const scaleValue = useRef(new Animated.Value(1)).current; // Create scale value for animation
  const opacityValue = useRef(new Animated.Value(1)).current; // Create opacity value for fading

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

       navigation.navigate("Entry")
 
    });
  };

  return (
    <ImageBackground
       source={require('./assets/starting.jpeg')} // Replace with your image path
 
      style={styles.backgroundImage}
    >
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
           <Text style={styles.title}>WELCOME TO BHOOMI</Text>
 

        

          {/* Get Started Button */}
          <TouchableOpacity
            style={[styles.button, isPressed && styles.buttonPressed]} // Change color on press
            onPress={handlePress}
            activeOpacity={0.7}
          >
           
           <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Blackish overlay
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    bottom: 0, // Start the container from the bottom
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent box
    padding: 40,
    borderRadius: 10,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#665a6f', // Initial button color
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#4a3f51', // Darken the button when pressed
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
