import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Share, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import i18n from "../i18n";




export const AllPropertiesList = () => {
 const navigation = useNavigation()
 const [type, setType] = useState();

 const [properties, setProperties] = useState([]);
 const [loading, setLoading] = useState(true);
 const [filteredProperties, setFilteredProperties] = useState([]);
 const [selectedFilter, setSelectedFilter] = useState(''); // State to track the selected filter
 
 // Fetching properties data from the API
 useEffect(() => {
 const fetchProperties = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }
 
 const response = await fetch("https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/getallprops", {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 });
 
 const data = await response.json();
 console.log(data);
 setProperties(data); // The new API response is directly the properties array
 setFilteredProperties(data); // Initially, set all properties as filtered properties
 setLoading(false);
 } catch (error) {
 console.error("Failed to fetch properties:", error);
 setLoading(false);
 }
 };
 
 fetchProperties();

 loadLanguage()
 }, []);
 


 const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };


 // Handle filter button click
 const handleFilterClick = (filterName) => {
 console.log(`${filterName} filter clicked`);
 setSelectedFilter(filterName); // Set the selected filter
 setType(filterName)
 if (filterName === '') {
 // Show all properties when no filter is selected
 setFilteredProperties(properties);
 } else {
 // Filter properties based on the selected propertyType
 const filtered = properties.filter((item) => item.propertyType === filterName);
 setFilteredProperties(filtered);
 }
 };


 const propertyDetails = (item) =>{
 navigation.navigate("Propdetails", {propByRoute:item}

 )
 }
 
 // Render property card
 const renderPropertyCard = ({ item }) => (
<TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)}>
{/* Property Image */}
 <Image source={{ uri: item.images[0] }} style={styles.propertyImage} />
 
 {/* Property Details */}
 <View style={{flexDirection:"row", justifyContent:"space-between"}}>
 <Text style={styles.propertyName}>{item.title}</Text>
 <TouchableOpacity
 style={{marginRight:10, marginTop:5}}
 onPress={() => handleShare(item)}
 >
 <Icon name="share" size={24} color="#007bff" />
 </TouchableOpacity>
 </View>
 <Text style={styles.propertyDetails}>
 Location: {i18n.t(item.district)} | Price: ${item.price} | Type: {i18n.t(item.propertyType)}
 </Text>
 
 {/* Share Icon */}

 </TouchableOpacity>
 );
 const handleShare = async(property) => {
 console.log("Sharing property:", property);
 try{
 const result = await Share.share({
 message: `Check out this property:
 Title: ${property.title}
 Type: ${property.propertyType}
 Location: ${property.district}
 Price: $${property.price}
 Image: ${property.images[0]}`
 });
 if(result.action === Share.sharedAction){
 if(result.activityType){
 console.log('shared with activity type of',result.activityType )
 }
 else{
 console.log("shared")
 }
 }
 else if(result.action === Share.dismissedAction){
 console.log("dismissed action")
 }
 }
 catch(error){
 console.log('In the catch', error.message)
 }
 // Add logic to share property details
 };
 
 return (
 <>
 {/* Button row */}
 {/* <View style={styles.chipRow}>
 <View style={styles.chipContainer}>
 <TouchableOpacity
 onPress={() => handleFilterClick("Agricultural land")}
 style={[
 styles.chip,
 selectedFilter === "Agricultural land" && styles.selectedChip,
 ]}
 >
 <Text
 style={[
 styles.chipText,
 selectedFilter === "Agricultural land" && styles.selectedChipText,
 ]}
 >
 Agriculture
 </Text>
 </TouchableOpacity>
 </View>

 <View style={styles.chipContainer}>
 <TouchableOpacity
 onPress={() => handleFilterClick("Residential")}
 style={[
 styles.chip,
 selectedFilter === "Residential" && styles.selectedChip,
 ]}
 >
 <Text
 style={[
 styles.chipText,
 selectedFilter === "Residential" && styles.selectedChipText,
 ]}
 >
 Residential
 </Text>
 </TouchableOpacity>
 </View>

 <View style={styles.chipContainer}>
 <TouchableOpacity
 onPress={() => handleFilterClick("Commercial")}
 style={[
 styles.chip,
 selectedFilter === "Commercial" && styles.selectedChip,
 ]}
 >
 <Text
 style={[
 styles.chipText,
 selectedFilter === "Commercial" && styles.selectedChipText,
 ]}
 >
 Commercial
 </Text>
 </TouchableOpacity>
 </View>

 <View style={styles.chipContainer}>
 <TouchableOpacity
 onPress={() => handleFilterClick("Layout")}
 style={[
 styles.chip,
 selectedFilter === "Layout" && styles.selectedChip,
 ]}
 >
 <Text
 style={[
 styles.chipText,
 selectedFilter === "Layout" && styles.selectedChipText,
 ]}
 >
 Layout
 </Text>
 </TouchableOpacity>
 </View>
</View> */}

<View><Text>{i18n.t("Properties List")}</Text></View>
 
 {/* Property List View */}
 <View style={styles.propertyListContainer}>
 {loading ? (
    <ActivityIndicator size={"large"} color={"#057ef0"} />
  ) : (
 <FlatList
 data={filteredProperties} // Render filtered properties
 renderItem={renderPropertyCard}
 keyExtractor={(item) => item.propertyId} // Use propertyId as the unique key
 contentContainerStyle={styles.propertyList}
 showsVerticalScrollIndicator={false}

 />
 )}
 </View>
 </>
 );
 };
const styles = StyleSheet.create({
 selectedFilterButton: {
 backgroundColor: "black", // Change color when selected
 fontFamily: "Montserrat_500Medium",

 },
 buttonRow: {
 flexDirection: "row",
 justifyContent: "space-around",
 position: "absolute",
 top: 20,
 left: 0,
 fontFamily: "Montserrat_500Medium",

 right: 0,
 zIndex: 1,
 paddingHorizontal: 20,
 },
 buttonContainer: {
 marginHorizontal: 5,
 fontFamily: "Montserrat_500Medium",

 },
 filterButton: {
 backgroundColor: "#007bff",
 paddingVertical: 10,
 paddingHorizontal: 15,
 borderRadius: 5,
 fontFamily: "Montserrat_500Medium",

 },
 buttonText: {
 color: "white",
 fontSize: 14,
 fontFamily: "Montserrat_500Medium",

 },
 propertyListContainer: {
 marginTop: 100, // Makes space for the buttons at the top
 paddingHorizontal: 20,
 fontFamily: "Montserrat_500Medium",

 },
 propertyList: {
 paddingBottom: 20,
 fontFamily: "Montserrat_500Medium",

 },
 card: {
 backgroundColor: "#fff",
 marginBottom: 15,
 padding: 10,
 borderRadius: 5,
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 2 },
 shadowRadius: 5,
 fontFamily: "Montserrat_500Medium",

 elevation: 3,
 },
 propertyImage: {
 width: "100%",
 fontFamily: "Montserrat_500Medium",

 height: 200,
 borderRadius: 5,
 },
 propertyName: {
 fontSize: 18,
//  fontWeight: "bold",
fontFamily: "Montserrat_600SemiBold",

 marginVertical: 10,
 },
 propertyDetails: {
 fontSize: 14,
 color: "gray",
 fontFamily: "Montserrat_500Medium",

 },
 selectedChip: {
 backgroundColor: "#00aae7", // Highlight the selected chip
 borderColor: "#00aae7",
 fontFamily: "Montserrat_500Medium",

 },
 chipRow: {
 flexDirection: "row",
 justifyContent: "space-around",
 position: "absolute",
 top: 20,
 left: 0,
 right: 0,
 zIndex: 1,
 paddingHorizontal: 10,
 fontFamily: "Montserrat_500Medium",

 },
 chipContainer: {
 marginHorizontal: 5,
 fontFamily: "Montserrat_500Medium",

 },
 chip: {
 borderColor: "#007bff",
 borderWidth: 1,
 paddingVertical: 6,
 paddingHorizontal: 10,
 borderRadius: 25,
 backgroundColor: "white",
 fontFamily: "Montserrat_500Medium",

 },
 chipText: {
 color: "#007bff",
 fontFamily: "Montserrat_500Medium",

 fontSize: 14,
 },
 selectedChipText: {
 color: "white",
 fontFamily: "Montserrat_500Medium",

 },
 propertyListContainer: {
 marginTop: 80, // Adjust for chip row spacing
 paddingHorizontal: 20,
 fontFamily: "Montserrat_500Medium",

 },
});