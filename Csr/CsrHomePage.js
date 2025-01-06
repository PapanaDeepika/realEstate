import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 ScrollView,
 FlatList,
 Image,
 SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode"; // to decode the JWT token
// import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const actions = [
    {
      text: "Residential",
      icon: <Ionicons name="home" size={24} color="#fff" />, // Icon updated to "home" for buildings
      name: "bt_residential",
      position: 2,
    },
    {
      text: "Agriculture",
      icon: <MaterialCommunityIcons name="sprout" size={24} color="white" />, // Icon updated to "leaf" for crops
      name: "bt_agriculture",
      position: 1,
    },

    {
      text: "Commercial",
      icon: <Ionicons name="storefront" size={24} color="#fff" />, // Icon updated to "storefront" for shops/stores
      name: "bt_commercial",
      position: 3,
    },
    {
      text: "Layout",
      icon: <Ionicons name="grid-outline" size={24} color="#fff" />, // Icon updated to "grid-outline" for square outlines
      name: "bt_layout",
      position: 4,
    },
  ];
  

export const CsrHomePage = () => {
 const navigation = useNavigation();
 const [properties, setProperties] = useState([]);
 const [assignedAgents, setAssignedAgents] = useState([]);
 const [loading, setLoading] = useState(false);
 const floatingActionRef = useRef(null);
   const [isFABOpen, setIsFABOpen] = useState(false);

 // Add ref to FlatList to control scrolling
 const flatListRef = useRef(null);
 const [currentIndex, setCurrentIndex] = useState(0);

 const fetchLayouts = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 const response = await fetch(
 "http://172.17.15.184:3000/admin/getTopPropOnPrice",
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 const data = await response.json();
 console.log("Fetched data:", data);

 if (Array.isArray(data)) {
 setProperties(data);
 } else {
 console.log("Unexpected data format:", data);
 }

 setLoading(false);
 } catch (error) {
 console.error("Error fetching layouts:", error.message);
 setLoading(false);
 }
 };

 const fetchAssignedAgents = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 const decodedToken = jwtDecode(token);
 const userId = decodedToken.user.userId;

 const response = await fetch(
 `http://172.17.15.184:3000/csr/getAssignedAgents/${userId}`,
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 const data = await response.json();
 console.log("Fetched assigned agents:", data);

 if (Array.isArray(data)) {
 setAssignedAgents(data);
 } else {
 console.log("Unexpected data format:", data);
 }
 } catch (error) {
 console.error("Error fetching assigned agents:", error.message);
 }
 };

 useEffect(() => {
 fetchLayouts();
 fetchAssignedAgents();
 }, []);

 // Auto-scrolling functionality for the cards
 useEffect(() => {
 const interval = setInterval(() => {
 setCurrentIndex((prevIndex) => {
 const nextIndex = (prevIndex + 1) % properties.length;
 flatListRef.current?.scrollToIndex({
 index: nextIndex,
 animated: true,
 });
 return nextIndex;
 });
 }, 3000); // Change the card every 3 seconds

 return () => clearInterval(interval);
 }, [properties]);

 return (
 
 <SafeAreaView style={styles.container}>
 {/* Top Navigation Bar */}
 <View style={styles.topNav}>
 <Ionicons name="menu" size={24} color="#fff" style={styles.menuIcon} />
 {/* {""} */}
 <Text style={styles.navTitle}>Hello CSR!</Text>
 {/* <Ionicons name="calendar" size={24} color="#fff"style={{marginLeft:220}}/> */}
 <Ionicons name="notifications" color="#fff" size={24} style={{marginLeft:200}} />

 <Ionicons name="power" color="#fff"onPress={()=>{navigation.navigate('Login')}}
 size={24} />
 </View>

 {/* Main Content */}

 {/* Small Heading above Scrolling Cards */}
 
 {/* <View style={styles.iconRow}>
 <TouchableOpacity style={styles.iconItem} onPress={()=>navigation.navigate("MarketingAgents")}>
 <Ionicons name="person" size={24} color="#fff" />
 </TouchableOpacity>
 <TouchableOpacity style={styles.iconItem}>
 <Ionicons name="storefront" size={24} color="#fff" /> 
 </TouchableOpacity>
 <TouchableOpacity style={styles.iconItem}>
 <Ionicons name="share" size={24} color="#fff" />
 </TouchableOpacity>
 <TouchableOpacity style={styles.iconItem}>
 <Ionicons name="location" size={24} color="#fff" />
 </TouchableOpacity>
 </View> */}

{/* <View style={styles.iconGrid}>
 {[
 { name: "person", label: "Marketing Agents" },
 { name: "share", label: "SHare Properties" },
 { name: "storefront", label: "My Properties" },
 
 ].map((item, index) => (
 <View key={index} style={styles.iconItemContainer}>
 <View style={styles.iconItem}>
 <Ionicons name={item.name} size={24} color="#fff" />
 </View>
 <Text style={styles.iconLabel}>{item.label}</Text>

 </View>
 ))}
</View> */}


 {/* Icon Grid with Navigation */}
 <View style={styles.iconGrid}>
 {[
 { name: "create", label: "Add Property", screen: "MarketingAgents" },
 { name: "people", label: "Agents", screen: "MyPropertiescsr" },
 { name: "happy", label: "Customers", screen: "MyPropertiescsr" },

 { name: "briefcase", label: "Deals", screen: "CustomerDeals" },
 { name: "calendar", label: "Calendar", screen: "MyPropertiescsr" },

 { name: "megaphone", label: "Marketing Agents", screen: "MarketingAgents" },
//  { name: "bar-chart", label: "Reports", screen: "MyPropertiescsr" },
 { name: "bar-chart", label: "My Properties", screen: "mycsrprops" },

 { name: "business", label: "All Properties", screen: "ViewpropbyCSR" },
 ].map((item, index) => (
 <TouchableOpacity
 key={index}
 style={styles.iconItemContainer}
 onPress={() => navigation.navigate(item.screen)}
 >
 <View style={styles.iconItem}>
 <Ionicons name={item.name} size={30} color="white" />
 </View>
 <Text style={styles.iconLabel}>{item.label}</Text>
 </TouchableOpacity>
 ))}
 </View>



 {/* <View style={styles.smallHeadingContainer}>
 <Text style={styles.smallHeading}>Hot Deals</Text>
 </View> */}

 {/* Auto-Scrolling Cards */}
{/*  
  <FlatList
 ref={flatListRef} // Attach the ref here
 data={properties}
 keyExtractor={(item) => item.propertyId}
 horizontal
 renderItem={({ item }) => (
 <View  style={styles.card} >
  <view style={{border:"10"}}> 
 <Image source={{ uri: item.images[0] }} style={styles.image} />
 <Text >{item.name}'s Property</Text>

 <Text style={styles.price}> ₹{item.price.toLocaleString()}</Text>
 <Text style={styles.district}> Location: {item.district}</Text>
 <Text style={styles.district}> Size: {item.size}</Text>
 </view>
 </View>
 )}
 />   */}



 {/* <TouchableOpacity onPress={() => navigation.navigate("ViewpropbyCSR")}>
 <Text style={styles.viewMoreText}>View More</Text>
 </TouchableOpacity> */}


 {/* Assigned Agents */}
 {/* <View style={styles.agentSection}>
 <Text style={styles.sectionTitle}>Assigned Agents</Text>
 <FlatList
 data={assignedAgents}
 keyExtractor={(item) => item._id} // Assuming the agent's unique ID is _id
 horizontal
 showsHorizontalScrollIndicator={false}
 renderItem={({ item }) => (
 <View style={styles.agentCard}>
 <Image
 source={{ uri: item.profilePicture }} // Use the profile picture from the API
 style={styles.agentImage}
 />
 <Text
 style={styles.agentName}
 >{`${item.firstName} ${item.lastName}`}</Text>
 <Text style={styles.agentRole}>{item.phoneNumber}</Text>
 </View>
 )}
 />
 </View> */}


 {/* Bottom Navigation Bar with 4 Icons */}
 {/* <View style={styles.containerforfab}>
      <Text style={styles.example1}>Floating Action Example</Text>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Floating Action */}
        <View style={styles.highlightedButtonContainer}>
          {/* <FloatingAction
            ref={floatingActionRef}
            actions={actions}
            color="#ff5722"
            onPressItem={(name) => {
              console.log(`Selected button: ${name}`);
              if (name === "bt_accessibility") {
                navigation.navigate("AccessibilityScreen");
              } else if (name === "bt_language") {
                navigation.navigate("LanguageScreen");
              } else if (name === "bt_room") {
                navigation.navigate("LocationScreen");
              } else if (name === "bt_videocam") {
                navigation.navigate("VideoScreen");
              }
            }}
          /> */}
          <FloatingAction
  ref={floatingActionRef}
  actions={actions}
  color="#ff5722"
  onPressItem={(name) => {
    console.log(`Selected button: ${name}`);
    switch (name) {
      case "bt_residential":
        navigation.navigate("csrResi"); // Navigate to Residential screen
        break;
      case "bt_agriculture":
        navigation.navigate("csrAg"); // Navigate to Agriculture screen
        break;
      case "bt_commercial":
        navigation.navigate("csrCm"); // Navigate to Commercial screen
        break;
      case "bt_layout":
        navigation.navigate("csrLout"); // Navigate to Layout screen
        break;
      default:
        console.log("Unknown action selected");
    }
  }}
/>

        </View>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("AddCSR")}
        >
          <Ionicons name="share" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    {/* </View> */}

 </SafeAreaView>
 
 );
};

const styles = StyleSheet.create({
 iconGrid: {
 flexDirection: "row", // Row layout
 flexWrap: "wrap", // Allow wrapping
 justifyContent: "space-between", // Distribute items evenly
 paddingHorizontal: 10, // Add some padding
 marginTop: 20, // Top margin
 }, iconItemContainer: {
 width: "25%", // Set width to 30% for 3 items per row
 alignItems: "center", // Center icon and text
 marginBottom: 20, // Add spacing between rows
//  backgroundColor:'#4184AB',

 },
 iconItem: {
 backgroundColor: "#4184AB", // Light gray background
// backgroundColor:'#4184AB',

 borderRadius: 10, // Rounded corners
 padding: 15, // Padding around icon
 justifyContent: "center",
 alignItems: "center",

 },
 iconLabel: {
 marginTop: 10, // Space between icon and label
 textAlign: "center",
 fontSize: 12,
 color: "#333", // Dark text color
 },
 agentSection: {
 marginTop: 20,
 paddingHorizontal: 15,
 },
 sectionTitle: {
 fontSize: 18,
 fontWeight: "bold",
 marginBottom: 10,
 },
 agentCard: {
 width: 350,
 height: 300,
 padding: 10,
 backgroundColor: "#fff",
 borderRadius: 10,
 marginRight: 15,
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 4 },
 shadowRadius: 5,
 elevation: 3,
 alignItems: "center",
 justifyContent: "center",
 },
 agentImage: {
 width: 80,
 height: 80,
 borderRadius: 40,
 marginBottom: 10,
 },
 agentName: {
 fontSize: 16,
 fontWeight: "bold",
 },
 agentRole: {
 fontSize: 14,
 color: "#777",
 },
 iconRow: {
 flexDirection: "row",
 justifyContent: "space-around",
 padding: 15,
 // backgroundColor:"#ADD8E4",
 borderRadius: 50,
 marginTop: 20,
 },
 iconItem: {
 alignItems: "center",
 padding: 10,
 backgroundColor: "#007bff",
 // backgroundColor:"black",
 borderRadius: 50,
 },
 container: {
 flex: 1,
 backgroundColor: "#f4f4f9",
// backgroundColor:'#4184AB'
 },
 topNav: {
//  backgroundColor: "#007bff",
backgroundColor:'#4184AB',

 padding: 15,
 marginTop:25,
 flexDirection: "row",
 // alignItems: "center",
 // alignContent:"center",
 // marginLeft:20
 justifyContent: "space-between",
 },
 menuIcon: {
 marginLeft: 10,
 },
 navTitle: {
 color: "#fff",
 fontSize: 15,
 fontWeight: "bold",
 marginRight:-10
 },
 content: {
 flex: 1,
 },
 smallHeadingContainer: {
 paddingHorizontal: 15,
 marginVertical: 10,
 },
 smallHeading: {
 fontSize: 20,
 fontWeight: "bold",
 color: "#333",
 alignContent: "center",
 marginLeft: 160,
 // alignItems:"centre",

 fontWeight: "bold",
 },
 viewMoreText: {
 fontSize: 14,
 color: "#007bff",
 marginTop: 13,
textAlign:"right",
marginRight:15
 },
 card: {
  backgroundColor: "white",
  borderRadius: 10,
  margin: 10,
  width: 200,
  padding: 10,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 3,
  alignItems: "center",
  },
 cardImage: {
 width: "100%",
 height: "70%",
 borderRadius: 10,
 },
 cardText: {
 marginTop: 5,
 fontSize: 14,
 fontWeight: "bold",
 textAlign: "center",
 },
 agentSection: {
 marginTop: 20,
 paddingHorizontal: 15,
 },
 sectionTitle: {
 fontSize: 18,
 fontWeight: "bold",
 marginBottom: 10,
 },
 // agentCard: {
 // padding: 15,
 // backgroundColor: "#fff",
 // borderRadius: 10,
 // marginBottom: 10,
 // shadowColor: "#000",
 // shadowOpacity: 0.1,
 // shadowOffset: { width: 0, height: 4 },
 // shadowRadius: 5,
 // elevation: 3,
 // },
 agentCard: {
 width: 200, // Increased width for agent card
 height: 250, // Increased height for agent card
 padding: 20, // Adjusted padding for better content spacing
 backgroundColor: "#fff",
 borderRadius: 10,
 marginRight: 20, // Added more space between agent cards horizontally
 marginBottom: 20, // Added space at the bottom of the card
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 4 },
 shadowRadius: 5,
 elevation: 3,
 alignItems: "center",
 justifyContent: "center",
 },

 agentName: {
 fontSize: 16,
 fontWeight: "bold",
 },
 agentRole: {
 fontSize: 14,
 color: "#777",
 },
//  containerforfab: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   example1: {
//     textAlign: "center",
//     marginVertical: 10,
//     fontSize: 16,
//     color: "#333",
//   },
  bottomNav: {
    flexDirection: "row",
    // backgroundColor: "#333",
    backgroundColor:'#4184AB',

    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedButtonContainer: {
    
    position: "absolute",
     bottom: 20, // Adjusted to move it above the bottom navigation bar
    right:"38%",
    transform: [{ translateX: -10 }], // Centers the button horizontally
  },
  highlightedButton: {
    // backgroundColor: "#ff5722", // Highlight color for the button
    // marginTop:-20,
    backgroundColor:"black",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Adds shadow for a raised effect
  },
 
 image: {
 width: "100%",
 height: 120,
 borderRadius: 10,
 },
 price: {
 fontSize: 18,
 fontWeight: "bold",
 marginTop: 10,
 },
 district: {
 fontSize: 14,
 color: "#555",
 marginTop: 5,
 },
});

export default CsrHomePage;