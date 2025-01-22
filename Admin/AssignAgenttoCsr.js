// // AssignAgenttoCsr
// import React from "react";
// import { useEffect,useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity ,Image, FlatList,ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// // import { View, Text, StyleSheet,  TouchableOpacity, } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

//  export const AssignAgenttoCsr = () => {
//     const [layouts, setLayouts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigation=useNavigation();

//     useEffect(() => {



//         navigation.setOptions({
//             title: 'CSR List', // Set the title for the screen
//             headerRight: () => (
//               <TouchableOpacity
//                 style={styles.headerButton}
//                 onPress={() => navigation.navigate('LayoutForm')} // Navigate to "AgricultureForm" when button is pressed
//               >
//                 <Text style={styles.headerButtonText}>Add Property Details</Text>
//               </TouchableOpacity>
//             ),
//           });


//         const fetchLayouts = async () => {
//             try {
//                 const token = await AsyncStorage.getItem('userToken');
//                 if (!token) {
//                     console.log('No token found');
//                     return;
//                 }

//                 const response = await fetch('http://172.17.13.106:3000/agent/getAllCsr', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }
//                 });

//                 const data = await response.json();
//                 setLayouts(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching layouts:', error.message);
//                 setLoading(false);
//             }
//         };

//         fetchLayouts();
//     },[navigation]);

   

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <FlatList
              
//             />
//         </View>
        
//         // <View></View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 20,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     list: {
//         paddingBottom: 20,
//     },
//     card: {
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         marginVertical: 10,
//         overflow: 'hidden',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 3,
//         width: '100%',
//         padding: 15,
//     },
//     cardImage: {
//         width: '100%',
//         height: 150,
//         resizeMode: 'cover',
//         borderRadius: 10,
//     },
//     cardContent: {
//         padding: 10,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     size: {
//         fontSize: 16,
//         color: '#555',
//         marginTop: 5,
//     },
//     totalPlots: {
//         fontSize: 16,
//         color: '#555',
//         marginTop: 5,
//     },
//     headerButton: {
//         borderWidth: 2, // Set border thickness
//         borderColor: '#000000', // Set border color to black
//         borderRadius: 8, // Rounded corners for the button
//         paddingVertical: 6, // Vertical padding for text spacing
//         paddingHorizontal: 10, // Horizontal padding for text spacing
//         marginRight: 10, // Space the button from the header
//         backgroundColor: 'transparent', // Transparent background (no fill)
//       },
//       headerButtonText: {
//         color: '#000000', // Text color set to black
//         fontWeight: 'bold', // Make the text bold
//       },
// });




// --------------------------------------------------
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
 

 export const AssignAgenttoCsr = () => {
  const [layouts, setLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
     const navigation=useNavigation();
 
  // Fetch layouts data from API
  const fetchLayouts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch('http://172.17.15.68:3000/agent/getAllCsr', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log('Fetched data:', data);  // Check the structure of the data

      if (Array.isArray(data)) {
        setLayouts(data);
      } else {
        console.log('Unexpected data format:', data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching layouts:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLayouts();
  }, []);

   const handleCard=(item)=>{
    console.log("the card clicked",item._id)
    navigation.navigate("chooseagents",{csrId:item._id,name:item.firstName})
  }

 
  // Render each item in the FlatList
  const renderItem = ({ item }) => {
    if (!item) {
      return <Text>CSR data is missing</Text>; // Show a fallback message if csr is missing
    }
    console.log("the render item i scalled ")

    const { csr, totalAgents } = item;
    return (
      <View style={styles.card}>
 
<TouchableOpacity onPress={()=>handleCard(item)}>
<Text>{item._id}</Text>
 
        {item.profilePicture ? (
          <Image source={{ uri: item.profilePicture }} style={styles.cardImage} />
        ) : (
          <Text>No profile picture</Text> // Fallback if no image
        )}
        <View style={styles.cardContent}>
          <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={styles.details}>{`Phone: ${item.phoneNumber}`}</Text>
          <Text style={styles.details}>{`Email: ${item.email}`}</Text>
          <Text style={styles.details}>{`Location: ${item.city}, ${item.state}, ${item.country}`}</Text>
          {/* <Text style={styles.details}>{`Agents Assigned: ${totalAgents}`}</Text> */}
        </View>
 
        </TouchableOpacity>
       </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator while fetching
      ) : (
        <FlatList
          data={layouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.csr} // Ensure key extraction is safe
        />
      )}
       {/* {onclick()=>{}} */}
 
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
};

// export default AssignAgenttoCsr;

