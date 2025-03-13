import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Share, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";




export const ViewpropbyCSR = () => {
 const navigation = useNavigation()
 const [type, setType] = useState();

 const [properties, setProperties] = useState([]);
 const [loading, setLoading] = useState(true);
 const [filteredProperties, setFilteredProperties] = useState([]);
 const [selectedFilter, setSelectedFilter] = useState(''); // State to track the selected filter
 
 const [propName,setPropName]=useState("")

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


 const handlePriceFormat = (price) => {
  if (price >= 10000000) {
    // For crores
    return (price / 10000000).toFixed(2) + " Cr"; // Crore
  } else if (price >= 100000) {
    // For lakhs
    return (price / 100000).toFixed(2) + " Lakh"; // Lakh
  } else {
    // For normal INR formatting
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  }
};

 
 const handlePropertySearch = (text) => {

    setPropName(text)
if(text==="")
{
  setFilteredProperties(properties)
}
else
{
    const data = properties.filter((props) => {

console.log("props",props)

      if (props.propertyType === "Agricultural land") {
        return props.title
          .toLowerCase()
          .includes(text.toLowerCase()) ||props.district.toLowerCase().includes(text.toLowerCase())
      }

      if (props.propertyType === "Layout") {
        return props.title
          .toLowerCase()
          .includes(text.toLowerCase()) ||props.district.toLowerCase().includes(text.toLowerCase())
      }

      if (props.propertyType === "Residential") {
        return props.title
          .toLowerCase()
          .includes(text.toLowerCase())||props.district.toLowerCase().includes(text.toLowerCase())
      }

      if(props.propertyType==="Commercial")
      {
        return props.title.toLowerCase().includes(text.toLowerCase())||props.district.toLowerCase().includes(text.toLowerCase())
      }


    });


    setFilteredProperties(data)
  }
  };





 // Render property card
 const renderPropertyCard = ({ item }) => (
<TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)}>
{/* Property Image */}
{
 
  item.propertyType==="Agricultural land"&&( <ImageBackground source={{ uri: item.images[0] ||"https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg" }} style={styles.propertyImage} >
  

    <View style={styles.imageText}>
    <Text style={styles.text} >{item.title}</Text>
    
    </View>
   
   
     <TouchableOpacity
    style={styles.shareIcon}
    onPress={() => handleShare(item)}
    >
    <Icon name="share" size={24} color="#0c9be8" />
    </TouchableOpacity>
     
   
          <Text style={styles.priceBottomStyle}>
                 {handlePriceFormat(item.price )}
               </Text>
     </ImageBackground>
    )
}

{
  item.propertyType==="Residential"&&( <ImageBackground source={{ uri: item.images[0] || "https://upload.wikimedia.org/wikipedia/commons/d/d4/The_Lauren_condo_Bethesda_MD_2021-12-12_10-11-55_1.jpg" }} style={styles.propertyImage} >
  

    <View style={styles.imageText}>
    <Text style={styles.text} >{item.title}</Text>
    
    </View>
   
   
     <TouchableOpacity
    style={styles.shareIcon}
    onPress={() => handleShare(item)}
    >
    <Icon name="share" size={24} color="#0c9be8" />
    </TouchableOpacity>
     
   
          <Text style={styles.priceBottomStyle}>
                 {handlePriceFormat(item.price )}
               </Text>
     </ImageBackground>
    )
}



{
  item.propertyType==="Layout"&&( <ImageBackground source={{ uri: item.images[0] ||"https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg" }} style={styles.propertyImage} >
  

    <View style={styles.imageText}>
    <Text style={styles.text} >{item.title}</Text>
    
    </View>
   
   
     <TouchableOpacity
    style={styles.shareIcon}
    onPress={() => handleShare(item)}
    >
    <Icon name="share" size={24} color="#0c9be8" />
    </TouchableOpacity>
     
   
          <Text style={styles.priceBottomStyle}>
                 {handlePriceFormat(item.price )}
               </Text>
     </ImageBackground>)
}

{
  item.propertyType==="Commercial"&&( <ImageBackground source={{ uri: item.images[0] ||"https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg" }} style={styles.propertyImage} >
  

    <View style={styles.imageText}>
    <Text  style={styles.text}>{item.title}</Text>
    
    </View>
   
   
     <TouchableOpacity
    style={styles.shareIcon}
    onPress={() => handleShare(item)}
    >
    <Icon name="share" size={24} color="#0c9be8" />
    </TouchableOpacity>
     
   
          <Text style={styles.priceBottomStyle}>
                 {handlePriceFormat(item.price )}
               </Text>
     </ImageBackground>)
}

 
 
 {/* Property Details */}
 <View style={[styles.propertyDetails,{flexDirection:"row"}]}> 
  <Icon name="map-marker" size={20} color="#007bff" />
 
 <Text style={styles.text}  >
   {item.district}  
 </Text>


<View style={{flexDirection:'row',marginLeft:190}}> 
 <Icon name="ruler" size={20} color="#007bff" />
 
 <Text style={styles.text} >
   {item.size} {item.sizeUnit}   
 </Text>
 </View>
 </View>
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

 <View
              style={{ backgroundColor: "#4184AB", padding: 10, elevation: 2 }}
            >
              <TextInput
                placeholder="Search by Property Name or Location"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "white",
                  fontFamily:"Montserrat_500Medium"
                }}
                placeholderTextColor={"black"}
                value={propName}
                onChangeText={(value) => {
                    handlePropertySearch(value);
                }}
              />
            </View>

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
  <View style={{marginVertical:180}}>
 <ActivityIndicator size={"large"} color={"#007bff"}   /> 
 </View>
 ) : (

    <View>

 

 <FlatList
 data={filteredProperties} // Render filtered properties
 renderItem={renderPropertyCard}
 keyExtractor={(item) => item.propertyId} // Use propertyId as the unique key
 contentContainerStyle={styles.propertyList}
 showsVerticalScrollIndicator={false}

 />
 </View>
 )}
 </View>
 </>
 );
 };
const styles = StyleSheet.create({



  shareIcon: {
    position: "absolute",
    top:150,
   // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
    // zIndex: 1, // Ensure it appears above the image
    fontFamily:"Montserrat_700Bold"

  },
 selectedFilterButton: {
 backgroundColor: "black", // Change color when selected
 fontFamily:"Montserrat_700Bold"

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
 fontFamily:"Montserrat_700Bold"

 },
 imageText: {
  backgroundColor: "#f0f8ff",
  padding: 10,
  color: "#000",
  fontSize: 12,
  fontWeight: "bold",
  textAlign: "center",
  borderWidth: 1,
  borderColor: "#007acc",
  width: "50%",
  borderBottomRightRadius: 60,
  fontFamily:"Montserrat_700Bold"

},
 buttonContainer: {
 marginHorizontal: 5,
 fontFamily:"Montserrat_700Bold"

 },
 text:{
  fontFamily:"Montserrat_700Bold"

 },
 filterButton: {
 backgroundColor: "#007bff",
 paddingVertical: 10,
 paddingHorizontal: 15,
 borderRadius: 5,
 fontFamily:"Montserrat_700Bold"

 },
 buttonText: {
 color: "white",
 fontSize: 14,
 fontFamily:"Montserrat_700Bold"

 },
 propertyListContainer: {
 marginTop: 40, // Makes space for the buttons at the top
 paddingHorizontal: 20,
 fontFamily:"Montserrat_700Bold"

 },
 propertyList: {
 paddingBottom: 20,
 fontFamily:"Montserrat_700Bold"

 },
 card: {
 backgroundColor: "#fff",
 marginBottom: 15,
  borderRadius: 5,
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 2 },
 shadowRadius: 5,
 elevation: 3,
 fontFamily:"Montserrat_700Bold"

 },
 propertyImage: {
 width: "100%",
 height: 200,
 borderRadius: 5,
 fontFamily:"Montserrat_700Bold"

 },
 propertyName: {
 fontSize: 18,
 fontWeight: "bold",
 marginVertical: 10,
 fontFamily:"Montserrat_700Bold"

 },
 propertyDetails: {
 
  fontSize: 16,
 color: "black",
 marginVertical:10,
 fontFamily:"Montserrat_700Bold"

 },
 selectedChip: {
 backgroundColor: "#00aae7", // Highlight the selected chip
 borderColor: "#00aae7",
 fontFamily:"Montserrat_700Bold"

 },
 chipRow: {
  backgroundColor:"#4184AB",
flexDirection: "row",
 justifyContent: "space-around",
 position: "absolute",
 top: 60,
 left: 0,
 right: 0,
 zIndex: 1,
 paddingHorizontal: 10,
 
 borderBottomLeftRadius:20,
 borderBottomRightRadius:20,
 fontFamily:"Montserrat_700Bold"

 },
 chipContainer: {
  marginTop:10,
  paddingHorizontal:20,
  marginBottom:20,
  fontFamily:"Montserrat_700Bold"

 },
 chip: {
 borderColor: "#007bff",
 borderWidth: 1,
 paddingVertical: 6,
 paddingHorizontal: 10,
 borderRadius: 25,
 backgroundColor: "white",
 fontFamily:"Montserrat_700Bold"

 
 },
 chipText: {
 color: "#007bff",
 fontSize: 14,
 fontFamily:"Montserrat_700Bold"

 },
 selectedChipText: {
 color: "white",
 fontFamily:"Montserrat_700Bold"

 },
 propertyListContainer: {
 marginTop: 80, // Adjust for chip row spacing
 paddingHorizontal: 20,
 fontFamily:"Montserrat_700Bold"

 },
 priceBottomStyle: {
  // position:"absolute",
  // left:10,
  // bottom:10,
  // backgroundColor: 'rgba(173, 216, 230, 0.7)',
  // padding: 10,
  // color:"#fff"
  position: "absolute",
  // borderBottomColor:"#fff",
  // borderBottomWidth:2,
  bottom: 0, // Distance from the bottom of the image
  backgroundColor: "#f0f0f0", // Semi-transparent dark background
  color: "#000", // White text for contrast
  fontSize: 16, // Adjust font size
  fontWeight: "bold", // Bold text for emphasis
  paddingVertical: 4, // Vertical padding for the text box
  paddingHorizontal: 8, // Horizontal padding for the text box
  fontFamily:"Montserrat_700Bold"

},
});