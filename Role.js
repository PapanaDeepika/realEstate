import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ImageBackground, Animated } from 'react-native';

 
  // Create animated values for the text and buttons

function Role() {
    const [textOpacity] = useState(new Animated.Value(0)); // Initial opacity for the text
    const [buttonOpacity] = useState(new Animated.Value(0)); // Initial opacity for the buttons
    const [buttonTranslate] = useState(new Animated.Value(50)); // Initial vertical translation for the buttons
  
    useEffect(() => {
      // Animate the "Who are you?" text
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
  
       Animated.sequence([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslate, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
   return (

    <ImageBackground 
    source = {{uri: "https://i.pinimg.com/736x/c2/b1/33/c2b1337caa61c4d83d87f76c58cd88d7.jpg"}} 
    style={{flex:1}}>
              <View style={styles.overlay} />

        <View style={styles.container}>
        <View style={styles.adminContainer}>
        <TouchableOpacity style={[styles.adminButton, { backgroundColor: '#7e7aeb' }]}>
        <Text style={styles.buttonText}>Admin</Text>
    
      </TouchableOpacity>
      </View>
        <View >
        <Animated.Text style={[styles.imageText, { opacity: textOpacity }]}>Who are you?</Animated.Text>
        </View>
        <View  >
        <Animated.View
            style={[styles.buttonContainer, { opacity: buttonOpacity, transform: [{ translateY: buttonTranslate }] }]}
          >
       <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5733' }]}>
        <Text style={styles.buttonText}>Buyer</Text>
        <View style={[styles.iconContainer,  ]}>
          <Text style={styles.icon}>{'>'}</Text>
        </View>
      </TouchableOpacity>

       <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]}>
        <Text style={[styles.buttonText, ]}>Seller</Text>
        <View style={[styles.iconContainer, { backgroundColor: '#ADD8E6' }]}>
          <Text style={styles.icon}>{'>'}</Text>
        </View>
      </TouchableOpacity>

       <TouchableOpacity style={[styles.button, { backgroundColor: '#28A745' }]}>
        <Text style={styles.buttonText}>Agent</Text>
        <View style={[styles.iconContainer,  ]}>
          <Text style={styles.icon}>{'>'}</Text>
        </View>
      </TouchableOpacity>
      </Animated.View>
    </View>
     </View>
  
    </ImageBackground>

  )
}
const styles = StyleSheet.create({

    adminButton:{
 padding:5,
 borderRadius:5,
width:65
    },
    buttonContainer: {
        width: '100%',
      },
      adminContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 15,
      },
    overlay: {
        position: 'absolute', // Positioning the overlay over the image
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with 50% opacity for the transparency effect
    },
    container: {
        flexDirection:"column" ,
        justifyContent: 'center',
        alignItems: 'center',
      },
    button: {
        marginTop:10,
         flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        padding: 10,
        borderRadius: 15,
         // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        // elevation: 5,
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      },
      iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontSize: 18,
        color: '#007BFF',
        fontWeight: 'bold',
      },
    imageText:{
        marginTop:300,
        fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',

    },
  
//       card: {
//         position:"absolute",
//          width: '80%',
//         padding: 10,
//         borderRadius: 2,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
// marginTop:350,
// marginLeft:40
//        },
//       cardText: {
//         fontSize: 18,
//         color: 'white',
//         textAlign: 'center',
//       },   
})
export default Role