import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";




export const ViewpropbyCSR = () => {
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
 
 const response = await fetch("http://172.17.15.184:3000/getallprops", {
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
 }, []);
 
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
        Location: {item.district} | Price: ${item.price} | Type: {item.propertyType}
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
        if(result.action  === Share.sharedAction){
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
 <View style={styles.chipRow}>
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
</View>

 
 {/* Property List View */}
 <View style={styles.propertyListContainer}>
 {loading ? (
 <Text>Loading properties...</Text>
 ) : (
 <FlatList
 data={filteredProperties} // Render filtered properties
 renderItem={renderPropertyCard}
 keyExtractor={(item) => item.propertyId} // Use propertyId as the unique key
 contentContainerStyle={styles.propertyList}
 />
 )}
 </View>
 </>
 );
 };
const styles = StyleSheet.create({
 selectedFilterButton: {
 backgroundColor: "black", // Change color when selected
 },
 buttonRow: {
 flexDirection: "row",
 justifyContent: "space-around",
 position: "absolute",
 top: 20,
 left: 0,
 right: 0,
 zIndex: 1,
 paddingHorizontal: 20,
 },
 buttonContainer: {
 marginHorizontal: 5,
 },
 filterButton: {
 backgroundColor: "#007bff",
 paddingVertical: 10,
 paddingHorizontal: 15,
 borderRadius: 5,
 },
 buttonText: {
 color: "white",
 fontSize: 14,
 },
 propertyListContainer: {
 marginTop: 100, // Makes space for the buttons at the top
 paddingHorizontal: 20,
 },
 propertyList: {
 paddingBottom: 20,
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
 elevation: 3,
 },
 propertyImage: {
 width: "100%",
 height: 200,
 borderRadius: 5,
 },
 propertyName: {
 fontSize: 18,
 fontWeight: "bold",
 marginVertical: 10,
 },
 propertyDetails: {
 fontSize: 14,
 color: "gray",
 },
 selectedChip: {
    backgroundColor: "#00aae7", // Highlight the selected chip
    borderColor: "#00aae7",
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
  },
  chipContainer: {
    marginHorizontal: 5,
  },
  chip: {
    borderColor: "#007bff",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "white",
  },
  chipText: {
    color: "#007bff",
    fontSize: 14,
  },
  selectedChipText: {
    color: "white",
  },
  propertyListContainer: {
    marginTop: 80, // Adjust for chip row spacing
    paddingHorizontal: 20,
  },
});