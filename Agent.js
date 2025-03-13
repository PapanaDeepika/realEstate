// fav code -->{ to get elements from the use state list }
// import React, { useState, useEffect } from 'react';
// import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView,Animated, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// export default function AgentScreen() {
//     const navigation = useNavigation(); 
//     const backgroundImage = require('./assets/landingpageupdate.jpg');
//     const [showCategories, setShowCategories] = useState(false); // State to track visibility of categories
//     const [bounceValue] = useState(new Animated.Value(1)); // Initial value for bounce animation

//     // Bouncing animation
//     useEffect(() => {
//         Animated.loop(
//             Animated.sequence([
//                 Animated.timing(bounceValue, {
//                     toValue: 1.1,
//                     duration: 500,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(bounceValue, {
//                     toValue: 1,
//                     duration: 500,
//                     useNativeDriver: true,
//                 }),
//             ])
//         ).start();

//         // Show categories after the animation is done (3 seconds)
//         const timer = setTimeout(() => {
//             setShowCategories(true);
//         }, 1000); // Change this value to adjust when to show categories

//         return () => clearTimeout(timer); // Cleanup the timer on unmount
//     }, [bounceValue]);

//     const handleCategoryPress = (screen) => {
//         navigation.navigate(screen);
//     };

//     const navigatetoanother=()=>{
//         navigation.navigate('pts')
//     }
//     const handleLogout = async () => {
//         try {
//             await AsyncStorage.removeItem('userToken'); 
//             console.log('Logged out successfully');
//             navigation.navigate('LandingPage'); 
//         } catch (error) {
//             console.log('Failed to log out:', error);
//         }
//     };

//     return (
//         <ImageBackground source={backgroundImage} style={styles.back} resizeMode="cover">
//             <View style={styles.container}>
//                 {/* Small UI Image */}
//                 {/* <Image
//                     source={require('./assets/landingpageupdate.jpg')} // Replace with your image path
//                     style={styles.smallImage}
//                 /> */}
                
//                 {/* Bouncing Button to Add Property Details */}
//                 <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
//                     <TouchableOpacity style={styles.circleButton} onPress={navigatetoanother}>
//                         <Text style={styles.circleButtonText} >Add Property Details</Text>
//                     </TouchableOpacity>
//                 </Animated.View>

//                 {/* Show categories only after the animation */}
                
//                 {showCategories && (
//                     <>

// <Text style={styles.agentText}>Or</Text>
//                         <Text style={styles.agentText}>Choose Your Category</Text>
//                         {/* Category List */}
//                         {[
//                             { name: 'Agriculture', key: '1', screen: 'AgricultureAgent' },
//                             { name: 'Residential', key: '2', screen: 'ResidentialAgent' },
//                             { name: 'Commercial', key: '3', screen: 'CommercialAgent' },
//                             { name: 'Layout', key: '4', screen: 'LayoutAgent' }
//                         ].map((item) => (
//                             <View key={item.key} style={styles.itemContainer}>
//                                 <TouchableOpacity style={styles.itemButton} onPress={() => handleCategoryPress(item.screen)}>
//                                     <Text style={styles.itemText}>{item.name}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         ))}
//                     </>
//                 )}
//             </View>
//         </ImageBackground>
//     );
// }

// const styles = StyleSheet.create({
//     back: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f7f7f7',
//         paddingHorizontal: 20,
//     },
//     smallImage: {
//         width: 100, // Adjust as needed
//         height: 100, // Adjust as needed
//         marginBottom: 30, // Space below the image
//     },
//     circleButton: {
//         width: 200, 
//         height: 200, 
//         borderRadius: 100, 
//         backgroundColor: '#05223f', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         marginBottom: 30, 
//     },
//     circleButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 18,
//         textAlign: 'center',
//         padding: 10,
//     },
//     agentText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 30,
//     },
//     itemContainer: {
//         width: '100%',
//         marginBottom: 20,
//     },
//     itemButton: {
//         backgroundColor: '#05223f',
//         paddingVertical: 20,
//         paddingHorizontal: 40,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     itemText: {
//         fontSize: 18,
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });




// -----other way for dashboard
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { TouchableOpacity, View, Image, StyleSheet, Button, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you import AsyncStorage

// const Agent = () => {
//     const navigation = useNavigation();

//     const image1 = require("./assets/dashboard_agriculture.jpeg");
//     const image2 = require("./assets/dashboard_residential.jpeg");
//     const image3 = require("./assets/dashboard_commercial.jpeg");
//     const image4 = require("./assets/dashboard_layout.jpeg");

//     const handleImagePress = (imageno) => {
//         if (imageno === 1) {
//             navigation.navigate('AgricultureAgent');
//         } else if (imageno === 2) {
//             navigation.navigate('ResidentialAgent');
//         } else if (imageno === 3) {
//             navigation.navigate('CommercialAgent');
//         } else if (imageno === 4) {
//             navigation.navigate('LayoutAgent'); // Corrected typo: naviagate -> navigate
//         }
//     }

//     const handleLogout = async () => {
//         try {
//             await AsyncStorage.removeItem('userToken'); 
//             console.log('Logged out successfully');
//             navigation.navigate('LandingPage'); 
//         } catch (error) {
//             console.log('Failed to log out:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.row}>
//                 <TouchableOpacity onPress={() => handleImagePress(1)}>
//                     <Image source={image1} style={styles.image} />
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => handleImagePress(2)}>
//                     <Image source={image2} style={styles.image} />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.row}>
//                 <TouchableOpacity onPress={() => handleImagePress(3)}>
//                     <Image source={image3} style={styles.image} />
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => handleImagePress(4)}>
//                     <Image source={image4} style={styles.image} />
//                 </TouchableOpacity>
//             </View>

//             {/* Logout Button */}
//             <Button title="Logout" onPress={handleLogout} color="#FF0000" />
//             <Text style={styles.logoutText}>Logged out successfully</Text> {/* Example text, can be removed or modified */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center', // Center vertically
//         alignItems: 'center', // Center horizontally
//         padding: 20,
//     },
//     row: {
//         flexDirection: 'row', // Arrange children in a row
//         justifyContent: 'space-between', // Space between images
//         marginVertical: 10, // Space between rows
//     },
//     image: {
//         width: 100, // Adjust as needed
//         height: 100, // Adjust as needed
//         borderRadius: 10, // Optional: rounded corners
//     },
//     logoutText: {
//         marginTop: 20, // Space above the text
//         fontSize: 16,
//         color: '#000', // Change to your desired color
//     },
// });

// export default Agent;

// ---------------------

// ------------

import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
 
export default function AgentScreen() {
    const navigation = useNavigation(); 
    const backgroundImage = require('./assets/landingpageupdate.jpg');
    const [showCategories, setShowCategories] = useState(true); // Show categories immediately

    const image1 = require("./assets/dashboard_agriculture.jpeg");
    const image2 = require("./assets/dashboard_residential.jpeg");
    const image3 = require("./assets/dashboard_commercial.jpeg");
    const image4 = require("./assets/dashboard_layout.jpeg");

    const handleCategoryPress = (screen) => {
        navigation.navigate(screen);
    };

    const navigatetoanother = () => {
        navigation.navigate('pts');
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken'); 
            console.log('Logged out successfully');
            navigation.navigate('LandingPage'); 
        } catch (error) {
            console.log('Failed to log out:', error);
        }
    };

    return (
        <View style={{flex:1}}>
        <ImageBackground source={backgroundImage} style={styles.back} resizeMode="cover">
            <View style={styles.container}>
                {showCategories && (
                    <>
                        <Text style={styles.agentText}>Choose Your Category</Text>
                        <View style={styles.categoryContainer}>
                            {[
                                { name: 'Agriculture', screen: 'AgricultureAgent', image: image1 },
                                { name: 'Residential', screen: 'ResidentialAgent', image: image2 },
                                { name: 'Commercial', screen: 'CommercialAgent', image: image3 },
                                { name: 'Layout', screen: 'LayoutAgent', image: image4 }
                            ].map((item, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <TouchableOpacity 
                                        style={styles.itemButton} 
                                        onPress={() => handleCategoryPress(item.screen)}
                                    >
                                        <ImageBackground 
                                            source={item.image} 
                                            style={styles.itemImage} 
                                            imageStyle={styles.imageStyle}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}
            </View>
        </ImageBackground>
   
    </View>
    );
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 20,
    },
    agentText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
    },
    itemContainer: {
        alignItems: 'center', // Center items in the container
        margin: 5,
        flexBasis: '45%', // Each button takes up 45% of the width
    },
    itemButton: {
        width: '100%', // Full width of the container
        height: 150, // Increased height for buttons
        borderRadius: 10,
        overflow: 'hidden', // Hide overflow to keep the border radius
    },
    itemImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 10,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 10, // Space between button and text
    },
});





