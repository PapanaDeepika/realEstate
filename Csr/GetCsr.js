// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";


// export const GetCsr = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
// //   const API_URL = "http://172.15.17.184:3000/agent/getAllCsr"; // Replace with your API endpoint

//   // Fetch agents from the API
//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const token=await AsyncStorage.getItem("userToken");
//         if(!token){
//             console.log("no token found");
//             return;

//         }


//         const response = await fetch(
//             "http://172.15.17.184:3000/agent/getAllCsr",
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//         // const response = await fetch(API_URL);
//         const data = await response.json();
//         setAgents(data); // Assuming API returns an array of agents
//       } catch (error) {
//         console.error("Error fetching agents:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   // Render each agent as a card
//   const renderAgent = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
//       <Text style={styles.details}>Email: {item.email}</Text>
//       <Text style={styles.details}>ID: {item._id}</Text>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>View Details</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" />
//       ) : (
//         <FlatList
//           data={agents}
//           renderItem={renderAgent}
//           keyExtractor={(item) => item._id.toString()} // Use a unique key for each agent
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   details: {
//     fontSize: 14,
//     color: "#555",
//     marginVertical: 2,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });


// ---------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Modal,
//   Animated,
// } from "react-native";
// // import Ionicons from "react-native-vector-icons/Ionicons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { IconButton } from "react-native-paper";
// import DropDownPicker from "react-native-dropdown-picker";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import Slider from '@react-native-community/slider'; // Make sure this is installed

// export const GetCsr = () =>{
//   const [fields, setFields] = useState([]);
//   const [filteredFields, setFilteredFields] = useState([]); // State to hold filtered data
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigation = useNavigation();
//   const [openModal, setOpenModal] = useState(false);
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [slideAnim] = useState(new Animated.Value(-300));
//   // const [selectedSize, setSelectedSize] = useState("");
//   const [dropDownOpen, setDropDownOpen] = useState(false);
//   const [dropDownOpen1, setDropDownOpen1] = useState(false);

//   const transparent = "rgb(0,0,0,0.2)";
//   // const [minPrice,setMinPrice]=useState('0');
//   // const [maxPrice,setMaxPrice]= useState(Infinity);
  

//   const [selectedSize, setSelectedSize] = useState({ min: "", max: "" });
//   const [minPrice, setMinPrice] = useState(""); // State for minimum price
//   const [maxPrice, setMaxPrice] = useState(""); // State for maximum price
//   const [selectedLocation,setSelectedLocation]=useState("");

//   useEffect(() => {
//     const fetchFields = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           return;
//         }

//         const response = await fetch(
//           "http://172.17.15.184:3000/csr/getAssignedAgents",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         console.log(data);
//         setFields(data.data);
//         setFilteredFields(data.data); // Initialize with full data set
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch fields:", error);
//         setLoading(false);
//       }
//     };

//     fetchFields();
//   }, []);

//   const toggleFilter = () => {
//     if (filterVisible) {
//       Animated.timing(slideAnim, {
//         toValue: -300,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setFilterVisible(false));
//     } else {
//       setFilterVisible(true);
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const applyFilter = () => {
//     const filtered = fields.filter((item) => {
//       const sizeMatches =
//         selectedSize.min !== "" && selectedSize.max !== ""
//           ? item.landDetails.size >= parseInt(selectedSize.min) &&
//             item.landDetails.size <= parseInt(selectedSize.max)
//           : true; // If no size filter, consider it as a match

//       const minPriceMatches = minPrice ? item.landDetails.totalPrice >= parseInt(minPrice) : true;
//       const maxPriceMatches = maxPrice ? item.landDetails.totalPrice <= parseInt(maxPrice) : true;
//       const locationMatches = selectedLocation ? item.address.district === selectedLocation : true;
//       return sizeMatches && minPriceMatches && maxPriceMatches && locationMatches;
//     });

//     setFilteredFields(filtered);
//     toggleFilter();
//   };

//   const renderFieldCard = ({ item }) => (
//     <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
//       <Image
//         source={{ uri: item.landDetails.images[0] }}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />
//       {/* <View style={styles.priceTag}>
//         <Text style={styles.priceText}>
//           ₹{item.landDetails.totalPrice.toLocaleString() || "N/A"}
//         </Text>
//       </View> */}
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>
//           {item.landDetails.title || "No Title"}
//         </Text>
//         <Text style={styles.cardSize}>Size: {item.landDetails.size} acres</Text>
//         <Text  style={styles.cardSize}>Total Price: ₹{item.landDetails.totalPrice}</Text>
//         <Text style={styles.cardLocation}> Location :
//           {item.address.district || "N/A"}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // const handleCardClick = (item) => {
//   //   navigation.navigate("AgriEachCard", { item:_id });
//   // };

//   const handleCardClick = (item) => {
//     navigation.navigate("AgricultureDetail", { property_id: item._id });
// };


//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchBarContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search"
//           value={search}
//           onChangeText={setSearch}
//         />
//         <TouchableOpacity onPress={() => setOpenModal(true)}>
//           <IconButton icon="filter" style={styles.filterIcon} size={24} />
//           {/* <Ionicons name="filter-outline" style={styles.filterIcon} size={24} color="#fff" /> */}
//         </TouchableOpacity>
//       </View>

//       {/* Field List */}
//       <FlatList
//         data={filteredFields} // Use filtered data for FlatList
//         renderItem={renderFieldCard}
//         keyExtractor={(item) => item._id}
//       />

//       {/* Modal for Filter Options */}
//       <Modal
//         visible={openModal}
//         animationType="slide"
//         onRequestClose={() => setOpenModal(false)}
//         transparent={true}
//       >
        

//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Filter Options</Text>

//           {/* ---------------custome slider---------------- */}
//           {/* <SafeAreaView>
//           <CustomSlider min={0} max={Infinity} />
//         </SafeAreaView> */}
//         {/* ------------------------------------------------------ */}
//           <DropDownPicker
//             open={dropDownOpen}
//             value={selectedSize}
//             items={[
//               { label: "0-10 acres", value: { min: 0, max: 10 } },
//               { label: "0-20 acres", value: { min: 0, max: 20 } },
//               { label: "0-30 acres", value: { min: 0, max: 30 } },
//             ]}
//             setOpen={setDropDownOpen}
//             setValue={setSelectedSize}
//             onChangeValue={(value) => setSelectedSize(value)}
//           />
        
//             {/* {lets use input boxes for the price } */}

//             <View style={styles.forpriceview}>
//               <TextInput
//               value={minPrice}
//               onChangeText={setMinPrice}
//               placeholder="minimum price"
//               keyboardType="numeric"
//               style={styles.forpriceinput}/>
//               <TextInput
//               value={maxPrice}
//               onChangeText={setMaxPrice}
//               placeholder="maximum price"
//               keyboardType="numeric"
//               style={styles.forpriceinput}/>
//             </View>


//             <DropDownPicker
//             open={dropDownOpen1}
//             value={selectedLocation}
//             items={[
//               { label: "Visakhapatnam", value: "Visakhapatnam" },
//               { label: "Vizianagaram", value: "Vizianagaram" },
//               { label: "Srikakulam", value: "Srikakulam" },
//             ]}
//             setOpen={setDropDownOpen1}
//             setValue={setSelectedLocation}
//             onChangeValue={(newValue) => setSelectedLocation(newValue)}
//           />

//           <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
//             <Text style={styles.applyButtonText}>Apply Filter</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setOpenModal(false)}
//           >
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   // Updated searchBarContainer style for better alignment and spacing
//   searchBarContainer: {
//     flexDirection: "row", // Align items in a row
//     alignItems: "center", // Center vertically
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     backgroundColor: "#f0f0f0",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     marginBottom: 20,
//   },

//   // Updated searchInput style for a more polished appearance
//   searchInput: {
//     flex: 1, // Take up remaining space
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     color: "#333",
//   },

//   // Style for the filter icon to fit well with the input
//   filterIcon: {
//     marginLeft: 10,
//     backgroundColor: "#A3C1DA",
//     borderRadius: 10,
//     padding: 5,
//     alignSelf: "center",
//   },
//   container: { flex: 1, padding: 25,backgroundColor:"#E6E6FA" },
//   // searchBarContainer: { marginBottom: 20,height:70, backgroundColor:"#A3C1DA",padding:5, borderRadius:10},
//   // searchInput: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 5, width:300 ,marginTop:5,marginLeft:15,},
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: { marginBottom: 20, borderRadius: 20, overflow: "hidden",backgroundColor:"#A3C1DA" },
//   cardImage: { width: "100%", height: 150 },
//   priceTag: { position: "absolute", bottom: 10, left: 10 },
//   priceText: { color: "#fff", fontWeight: "bold" },
//   cardContent: { padding: 10,backgroundColor:"white" },
//   cardTitle: { fontSize: 16, fontWeight: "bold" },
//   cardSize: { fontSize: 14 },
//   cardLocation: {  fontWeight:"bold",fontSize: 12, color: "black" },
//   modalContainer: {
//     // padding: 10,
//     // justifyContent: "center",
//     // height: 305,
//     // backgroundColor: "skyblue",
//     // marginTop: 580,
//     // borderRadius: 20,
//     padding: 20,
//     justifyContent: "center",
//     backgroundColor: "skyblue",
//     borderRadius: 20,
//     margin: 20,
//     marginTop: 540,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   modalTitle: { fontSize: 20, marginBottom: 20,textAlign:"center",fontWeight:"bold",marginTop:10 },
//   applyButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   applyButtonText: { color: "#fff", textAlign: "center" },
//   closeButton: {
//     marginTop: 10,
//     backgroundColor: "#FF0000",
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: { color: "#fff", textAlign: "center" },

//   forpriceview:{flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,},
//     forpriceinput:{borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 5,
//       padding: 10,
//       width: '48%', // Adjust width to fit side by side
//     }
// });

// ------------------------------------------------
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

 export const GetCsr = () => {
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

      const response = await fetch('http://172.17.15.184:3000/csr/getAssignedAgents', {
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

//   const handleCard=(item)=>{
//     console.log("the card clicked",item._id)
//     navigation.navigate("chooseagents",{csrId:item._id,name:item.firstName})
//   }

  // Render each item in the FlatList
  const renderItem = ({ item }) => {
    if (!item) {
      return <Text>CSR data is missing</Text>; // Show a fallback message if csr is missing
    }
    console.log("the render item i scalled ")

    const { csr, totalAgents } = item;
    return (
      <View style={styles.card}>

<TouchableOpacity >
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

