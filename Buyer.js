

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import { useNavigation } from '@react-navigation/native';
// import HeaderNavbar from './HeaderNavbar'; // Adjust the import path as necessary
// import { Searchbar } from 'react-native-paper';
// import { Text } from 'react-native-paper';

// // import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import Options from './Options';
// // import Animated from 'react-native-reanimated';

// // const backgroundImage = require('./assets/landingpageupdate.jpg');

// const BuyerScreen = () => {
//     const navigation = useNavigation();
//     const [displayedText, setDisplayedText] = useState('');  // For typewriter effect
//     const fullText = 'Explore Our New Properties';  // Full text to display
//     const typingSpeed = 500;  // Speed of typing (ms per character)
//  const[userName,setUserName]=useState('');
    
//     useEffect(()=>{

//         const fetchUsername=async()=>{
//             try {
//                 const name = await AsyncStorage.getItem('firstName'); // Retrieve the name
//                 if (name) {
//                     setUserName(name); // Set the name in state
//                 } else {
//                     console.log("No user name found");
//                 }
//             } catch (error) {
//                 console.error("Error retrieving user name:", error);
//             }

//         }
//         fetchUsername();

//     },[]);
    
//     // Typewriter effect logic
//     useEffect(() => {
//         let typingTimeout;
//         let currentIndex = 0;

//         const typeText = () => {
//             if (currentIndex < fullText.length) {
//                 setDisplayedText((prev) => prev + fullText[currentIndex]);
//                 currentIndex++;
//                 typingTimeout = setTimeout(typeText, typingSpeed);
//             } else {
//                 // Pause before clearing text
//                 setTimeout(() => {
//                     setDisplayedText('');
//                     currentIndex = 0;  // Reset index
//                     typeText();  // Restart typing animation
//                 }, 2000);  // Pause for 2 seconds before starting over
//             }
//         };

//         typeText();

//         return () => {
//             clearTimeout(typingTimeout);  // Cleanup timeout on unmount
//         };
//     }, []);

//     const handlePress = (tab) => {
//         switch (tab) {
//             case 'Agriculture':
//                 navigation.navigate('Agriculture');
//                 break;
//             case 'Residential':
//                 navigation.navigate('Residential');
//                 break;
//             case 'Commercial':
//                 navigation.navigate('Commercial');
//                 break;
//             case 'Layout':
//                 navigation.navigate('Layout');
//                 break;
//             default:
//                 break;
//         }
//     };

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
//         <ImageBackground style={styles.background}>
//             <Searchbar placeholder="Search" style={styles.searchbar} />
//             <View style={styles.container}>
                
//                 <View style={styles.minidashboard}>
//                     <Text style={styles.dashboard_text}>Hello {userName}!</Text>
//                     <Text style={styles.mini_text}>Welcome to Buyers Dashboard</Text>
//                 </View>

//     <Text style={styles.mini_text1}>Choose Category</Text>
              
//               {/* {cards carousel --recent properties} */}
              
               
               
//                 {/* Main Button Options */}
//                 <View style={styles.mainButtonsContainer}>
//                     <View style={styles.row}>
//                         <TouchableOpacity style={styles.button} onPress={() => handlePress('Agriculture')}>
//                             <Text style={styles.buttonText}>Agriculture</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.button} onPress={() => handlePress('Residential')}>
//                             <Text style={styles.buttonText}>Residential</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.row}>
//                         <TouchableOpacity style={styles.button} onPress={() => handlePress('Commercial')}>
//                             <Text style={styles.buttonText}>Commercial</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.button} onPress={() => handlePress('Layout')}>
//                             <Text style={styles.buttonText}>Layout</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </ImageBackground>
//     );
    
// };


// const styles = StyleSheet.create({
//     mini_text1: {
//         fontWeight: 'bold',
//         fontSize: 20,
//         textAlign: 'center', // Center text
//          // Add padding for spacing
//     },
//     mini_text: {
//         fontWeight: 'bold',
//         fontSize: 20,
//         textAlign: 'center', // Center text
//         paddingVertical: 5, // Add padding for spacing
//     },
//     dashboard_text: {
//         color: '#fff',
//         fontSize: 29,
//         fontWeight: 'bold',
//         textAlign: 'center', // Center text
//         paddingVertical: 5, // Add padding for spacing
//     },
//     minidashboard: {
//         backgroundColor: "#A3C1DA", // Soft Blue
//         padding: 20,
//         alignItems: "center",
//         borderRadius: 10,
//         width: '90%', // Responsive width
//         maxWidth: 400, // Maximum width
//         marginBottom: 340, // Adjusted margin
//     },
//     background: {
//         flex: 1,
//         resizeMode: 'cover',
//         backgroundColor: "#E6E6FA", // Light Lavender
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     searchbar: {
//         marginTop: 10,
//         width: '80%',
//         alignSelf: 'center',
//         elevation: 20,
//         backgroundColor: "#FFFFFF", // White
//     },
//     mainButtonsContainer: {
//         marginTop: 40,
//         width: '100%',
//         alignItems: 'center',
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-around', // Use space-around for even spacing
//         width: '100%',
//         marginBottom: 20, // Reduced margin
//     },
//     button: {
//         backgroundColor: '#A3C1DA', // Coral
//         borderRadius: 10,
//         paddingVertical: 18,
//         paddingHorizontal: 20, // Adjusted padding
//         marginHorizontal: 5, // Adjusted margin
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.5,
//         shadowRadius: 4,
//         flex: 1,
//         maxWidth: 150, // Maximum button width
//     },
//     buttonText: {
//         fontSize: 13,
//         fontWeight: 'bold',
//         color: 'black', // Pure Black
//         textAlign: 'center',
//     },
// });


// export default BuyerScreen;
//  code above with out auto scrolling
// -------------
///below code for the auto scrolling 

import React, { useState, useEffect, useRef } from 'react'; // Import useRef from React
import { View, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Text } from 'react-native-paper';

const BuyerScreen = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [recentProperties, setRecentProperties] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const flatListRef = useRef(null); // Reference for FlatList

    // Fetch username from AsyncStorage
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const name = await AsyncStorage.getItem('firstName');
                if (name) {
                    setUserName(name);
                } else {
                    console.log("No user name found");
                }
            } catch (error) {
                console.error("Error retrieving user name:", error);
            }
        };
        fetchUsername();
    }, []);

    // Fetch recent properties
    useEffect(() => {
        const fetchRecentProperties = async () => {
            try {
                 const response = await fetch('http://172.17.15.68:3000/latestprops');
 
                const data = await response.json();
                console.log(data,"264");
                setRecentProperties(data);
            } catch (error) {
                console.error('Error fetching recent properties:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchRecentProperties();
    }, []);

    // Auto-scroll FlatList
    useEffect(() => {
        const scrollToNextItem = () => {
            if (flatListRef.current && recentProperties.length > 0) {
                flatListRef.current.scrollToIndex({
                    index: (Math.floor(Math.random() * recentProperties.length)) % recentProperties.length,
                    animated: true,
                });
            }
        };

        const intervalId = setInterval(scrollToNextItem, 2000); // Scroll every 2 seconds

        return () => {
            clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, [recentProperties]);

    const handlePress = (tab) => {
        switch (tab) {
            case 'Agriculture':
                navigation.navigate('Agriculture');
                break;
            case 'Residential':
                navigation.navigate('Residential');
                break;
            case 'Commercial':
                navigation.navigate('Commercial');
                break;
            case 'Layout':
                navigation.navigate('Layout');
                break;
            default:
                break;
        }
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

    const renderPropertyItem = ({ item }) => {
        return (
            <View style={styles.propertyCard}>
                <ImageBackground
                    source={{
                        uri: item.landDetails?.images?.[0] || item.propertyDetails?.uploadPics?.[0] || "https://via.placeholder.com/150",
                    }}
                    style={styles.propertyImage}
                    imageStyle={{ borderRadius: 10 }}
                    
                />
                
                <Text style={styles.forprice}>
    {item.propertyType === "Agricultural land" && `Price: ${item.landDetails.totalPrice ?? 'N/A'}`}
    {item.propertyType === "Layout" && `Price: ${item.layoutDetails.plotPrice ?? 'N/A'}`}
    {item.propertyType === "Residential" && `Price: ${item.propertyDetails.totalCost ?? 'N/A'}`}
    

   
    {/* {item.propertyType === "Commercial" && `Price: ${item.landDetails.sell.totalAmount ?? 'N/A'}`} */}
    {/* {item.propertyType === "Commercial" && (
        `${item.landDetails?.sell ? `Sell Price: ${item.landDetails.sell.totalAmount ?? 'N/A'}\n` : ''}`
        + `${item.landDetails?.rent ? `Rent Price: ${item.landDetails.rent.totalAmount ?? 'N/A'}\n` : ''}`
        + `${item.landDetails?.lease ? `Lease Price: ${item.landDetails.lease.totalAmount ?? 'N/A'}\n` : ''}`
    )} */}


</Text>


<Text style={styles.forsize}>
                   {item.propertyType === "Agricultural land" && `Size : ${item.landDetails.size ?? 'N/A'}`}
                 {item.propertyType === "Layout" && `Size : ${item.layoutDetails.plotSize ?? 'N/A'}`}
                 {item.propertyType === "Residential" && `Size : ${item.propertyDetails.flatSize ?? 'N/A'}`}
                    {/* {item.propertyType === "Commercial" && `title : ${item.propertyTitle ?? 'N/A`}} */}
                    {/* {item.propertyType==="Commercial" && `Price : ${item.propertyTitle ?? 'N/A'}`} */}


              </Text>
            </View>
        );
    };

    return (
        <ImageBackground style={styles.background}>
            <Searchbar placeholder="Search" style={styles.searchbar} />
            <View style={styles.container}>
                <View style={styles.minidashboard}>
                     {/* <Text style={styles.dashboard_text}>Hello {userName}!</Text>
                     */}
                      <Text style={styles.dashboard_text}>Hello Buyer!</Text>
                     
  
                    <Text style={styles.mini_text}>Welcome to Buyers Dashboard</Text>
                </View>

                {/* Recent Properties List */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        ref={flatListRef} // Assign ref to FlatList
                        data={recentProperties}
                        renderItem={renderPropertyItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        // keyExtractor={(item) => item.property_id.toString()} // Ensure the key is unique
                    />
                )}

                {/* Main Button Options */}
                <Text style={styles.mini_text1}>Choose Category</Text>
                <View style={styles.mainButtonsContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Agriculture')}>
                            <Text style={styles.buttonText}>Agriculture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Residential')}>
                            <Text style={styles.buttonText}>Residential</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Commercial')}>
                            <Text style={styles.buttonText}>Commercial</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Layout')}>
                            <Text style={styles.buttonText}>Layout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    forsize:{
        fontWeight:'bold',
        color:"black",
        marginLeft:40
    },
    forprice:{
        fontWeight:'bold',
        color:"black",
        marginLeft:35

    },
    mini_text1: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20, // Center text
    },
    mini_text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center', // Center text
        paddingVertical: 5, // Add padding for spacing
    },
    dashboard_text: {
        color: '#fff',
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'center', // Center text
        paddingVertical: 5, // Add padding for spacing
    },
    minidashboard: {
        backgroundColor: "#A3C1DA", // Soft Blue
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        width: '90%', // Responsive width
        maxWidth: 400, // Maximum width
        marginBottom: 40, // Adjusted margin
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: "#E6E6FA", // Light Lavender
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    searchbar: {
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
        elevation: 20,
        backgroundColor: "#FFFFFF", // White
    },
    mainButtonsContainer: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Use space-around for even spacing
        width: '100%',
        marginBottom: 20, // Reduced margin
    },
    button: {
        backgroundColor: '#A3C1DA', // Coral
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 20, // Adjusted padding
        marginHorizontal: 5, // Adjusted margin
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        flex: 1,
        maxWidth: 150, // Maximum button width
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black', // Pure Black
        textAlign: 'center',
    },
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        width: 200,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // align:"center"
    },
    propertyImage: {
        height: 200,
        borderRadius: 15,
        marginBottom: 10,
        marginTop:2
    },
});

export default BuyerScreen;
