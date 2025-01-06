import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Modal,Text, TouchableOpacity, SafeAreaView,
 StyleSheet, FlatList, Image, TextInput, RefreshControl, Pressable,Button,
 ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Share } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ImageCarousel from '../ImageCarousal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetExample from '../BottomSheetExample';
import { ImageBackground } from 'react-native';
const SCALE_FACTOR = 1000000; // 1 million

function AgentHomeScreen({ navigation }) {
 const images = [
 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 
 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 
 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg', 
 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 
 'https://images.pexels.com/photos/271800/pexels-photo-271800.jpeg', 
 ];
 const [modalVisible, setModalVisible] = useState(false);
 const [properties, setProperties] = useState([]);
 const [filteredProperties, setFilteredProperties] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [loading, setLoading] = useState(true);
 const [refreshing, setRefreshing] = useState(false);
 const [searchTimeout, setSearchTimeout] = useState(null);
const [resetAppear, setResetAppear] = useState(false)
const [minPrice, setMinPrice] = useState('0')
const [maxP,setMaxP] =useState('')
 const fetchProperties = useCallback(async () => {
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
 console.log("Fetched properties:", data);
 setProperties(data);
 setFilteredProperties(data);
 setLoading(false);
 setRefreshing(false);
 } catch (error) {
 console.error("Failed to fetch properties:", error);
 setLoading(false);
 setRefreshing(false);
 }
 }, []);

 useFocusEffect(
 useCallback(() => {
 fetchProperties();
 maxPriceAndSize();
 }, [fetchProperties, maxPriceAndSize])
 );
 const maxPriceAndSize = useCallback(async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 const response = await fetch("http://172.17.15.184:3000/admin/getMaxPriceAndSize", {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 });

 const data = await response.json();
 const scaledMaxPrice = Number(data.maxPrice) / SCALE_FACTOR;
 const scaledMaxSize = Number(data.maxSize) / 100;
 
 setMaxPrice(scaledMaxPrice);
 setMaxSize(scaledMaxSize);
 console.log("Max size and price:", data.maxSize, data.maxPrice);


 } catch (error) {
 console.error("Failed to fetch max size and price:", error);
 
 }
 },[])
 const handleSearch = (text) => {
 setSearchQuery(text);
 
 // Clear the previous timeout
 if (searchTimeout) {
 clearTimeout(searchTimeout);
 }

 // Set a new timeout
 const newTimeout = setTimeout(() => {
 getSearchDetails(text);
 }, 500); // 500ms delay

 setSearchTimeout(newTimeout);
 };

const resetFunction = () => {
 if(land || sizeValue || sizeUnit || maxP || minPrice ){
 setLand('');
 setSizeValue('');
 setSizeUnit('')
 setMaxP('')
 setMinPrice('0')
 setFilteredProperties(properties);
 setAppear(true)

 }
 if(resetAppear){
 setLand('');
 setSizeValue('');
 setSizeUnit('')
 setMaxP('')
 setMinPrice('0')
 setFilteredProperties(properties);
 setAppear(true)
 setResetAppear(false)
 }

}
 const getModalSearchDetails = async () => {
 // if (modalSearchQuery.trim() === "") {
 // setFilteredProperties(properties);
 // return;
 // }
console.log("In the modal search")
setModalVisible(!modalVisible)
setResetAppear(true)
setAppear(false)
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 console.log("Sending search request with query:", land, sizeValue,value, sizeUnit,minPrice,maxP);
 const response = await axios.get(`http://172.17.15.184:3000/admin/getPropsOnFilter?propertyType=${land}&propertySize=${sizeValue}&price=${value}&sizeUnit=${sizeUnit}&minPrice=${minPrice}&maxPrice=${maxP}&price=${maxP}`, {
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 });

 console.log("Search response:", response.data);
 
 if (response.data && Array.isArray(response.data)) {
 setFilteredProperties(response.data);
 } else {
 console.error("Unexpected response format:", response.data);
 setFilteredProperties([]);
 }
 } catch (error) {
 console.error("Failed to search properties:", error);
 setFilteredProperties([]);
 }
 };

 const getSearchDetails = async (searchQuery) => {
 if (searchQuery.trim() === "") {
 setFilteredProperties(properties);
 return;
 }

 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 console.log("Sending search request with query:", searchQuery);
 const response = await axios.get(`http://172.17.15.184:3000/admin/getPropertiesFilter/${searchQuery}`, {
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 });

 console.log("Search response:", response.data);
 
 if (response.data && Array.isArray(response.data)) {
 setFilteredProperties(response.data);
 } else {
 console.error("Unexpected response format:", response.data);
 setFilteredProperties([]);
 }
 } catch (error) {
 console.error("Failed to search properties:", error);
 setFilteredProperties([]);
 }
 };

//  const handleShare = async (item) => {
//  try {
//  await Share.share({
//  message: `Check out this property: ${item.title} in ${item.district}. Price: $${item.price}, Size: ${item.size} acres.`,
//  });
//  } catch (error) {
//  console.error("Error sharing property:", error);
//  }
//  };




const handleShare = async (property) => {
    let propImage = "";
    
    console.log("Sharing property:", property);
    
    if (property.propertyType === "Agricultural land") {
    propImage =
    property.images?.[0] ||
    property.landDetails?.images?.[0] ||
    property.uploadPics?.[0] ||
    property.propPhotos?.[0] ||
    "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg";
    } else if (property.propertyType === "Commercial") {
    propImage =
    property.images?.[0] ||
    property.landDetails?.images?.[0] ||
    property.uploadPics?.[0] ||
    property.propPhotos?.[0] ||
    "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg";
    } else if (property.propertyType === "Layout") {
    propImage =
    property.images?.[0] ||
    property.landDetails?.images?.[0] ||
    property.uploadPics?.[0] ||
    property.propPhotos?.[0] ||
    "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg";
    } else if (property.propertyType === "Residential") {
    propImage =
    property.images?.[0] ||
    property.landDetails?.images?.[0] ||
    property.uploadPics?.[0] ||
    property.propPhotos?.[0] ||
    "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg";
    }
    
    try {
    const result = await Share.share({
    message: `Check out this property:
    Title: ${property.title || property.propertyTitle}
    Type: ${property.propertyType}
    Location: ${property.district}
    Price: $${property.price}
    Image: ${propImage}`,
    });
    
    if (result.action === Share.sharedAction) {
    if (result.activityType) {
    console.log("Shared with activity type of", result.activityType);
    } else {
    console.log("Shared");
    }
    } else if (result.action === Share.dismissedAction) {
    console.log("Dismissed action");
    }
    } catch (error) {
    console.log("In the catch", error.message);
    }
    };
 const propertyDetails = (item) => {
 navigation.navigate('Propdetails', { propByRoute: item });
 };
 const snapPoints = useMemo(()=>['25%','50%', '75%'],[])
 const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
const [sizeUnit, setSizeUnit] = useState('')
 
const handlePriceFormat =(price)=>{
    return Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(price);
 }

 const renderPropertyCard = ({ item }) => (
 // <TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)} key={item._id}>
 // {/* Image */}
 // {(item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0]) ? (
 // <Image 
 // source={{ uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] }} 
 // style={styles.propertyImage} 
 // />
 // ) : (
 // <Text>No image available</Text>
 // )}

 // <View style={styles.cardContent}>
 // <View style={styles.cardHeader}>
 // <Text style={styles.propertyName}>{item.title || item.propertyTitle}</Text>
 // <TouchableOpacity onPress={() => handleShare(item)}>
 // <Icon name="share" size={24} color="#007bff" />
 // </TouchableOpacity>
 // </View>

 // <View style={styles.propertyDetailsContainer}>
 // <View style={styles.propertyDetailRow}>
 // <Icon name="map-marker" size={20} color="#007bff" />
 // <Text style={styles.propertyDetails}>
 // Location: {item.district || item.address?.district || item.address}
 // </Text>
 // </View>

 // <View style={styles.propertyDetailRow}>
 // <Icon name="currency-usd" size={20} color="#007bff" />
 // <Text style={styles.propertyDetails}>
 // Price: ${item.price || item.landDetails?.price}
 // </Text>
 // </View>

 // <View style={styles.propertyDetailRow}>
 // <Icon name="ruler" size={20} color="#007bff" />
 // <Text style={styles.propertyDetails}>
 // Size: {item.size || item.size} acres
 // </Text>
 // </View>

 // <View style={styles.propertyDetailRow}>
 // <Icon name="home" size={20} color="#007bff" />
 // <Text style={styles.propertyDetails}>
 // Type: {item.propertyType}
 // </Text>
 // </View>
 // </View>
 // </View>
 // </TouchableOpacity>
<TouchableOpacity style={styles.cardNew} onPress={() => propertyDetails(item)} key={item._id}>

{item.propertyType === "Agricultural land" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>



<Text style={styles.imageText}>{item.title || item.propertyTitle}</Text>
<Text style={styles.priceBottomStyle}>{handlePriceFormat(item.price || item.landDetails?.price)}</Text>
<TouchableOpacity style={styles.shareIcon} onPress={() => handleShare(item)}>
 <Icon name="share" size={24} color="#007bff" />
 </TouchableOpacity>
</ImageBackground>)}

{item.propertyType === "Residential" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg"}}>



<Text style={styles.imageText}>{item.title || item.propertyTitle}</Text>
<Text style={styles.priceBottomStyle}> {handlePriceFormat(item.price || item.landDetails?.price)}</Text>
<TouchableOpacity style={styles.shareIcon} onPress={() => handleShare(item)}>
 <Icon name="share" size={24} color="#007bff" />
 </TouchableOpacity>
</ImageBackground>)}

{item.propertyType === "Commercial" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg"}}>



<Text style={styles.imageText}>{item.title || item.propertyTitle}</Text>
<Text style={styles.priceBottomStyle}>{handlePriceFormat(item.price || item.landDetails?.price)}</Text>
<TouchableOpacity style={styles.shareIcon} onPress={() => handleShare(item)}>
 <Icon name="share" size={24} color="#007bff" />
 </TouchableOpacity>
</ImageBackground>)}

{item.propertyType === "Layout" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg"}}>



<Text style={styles.imageText}>{item.title || item.propertyTitle}</Text>
<Text style={styles.priceBottomStyle}>{handlePriceFormat(item.price || item.landDetails?.price)}</Text>
<TouchableOpacity style={styles.shareIcon} onPress={() => handleShare(item)}>
 <Icon name="share" size={24} color="#007bff" />
 </TouchableOpacity>
</ImageBackground>)}

<View style={styles.detailsContainer}>
 <View style={styles.detailsStyles}>
<Icon name="map-marker" size={24} color="#007bff" />
<Text style={styles.textStyleNew}>{item.district || item.address?.district || item.address}</Text>
</View>
<View style={styles.detailsStyles}>
<Icon name="ruler" size={24} color="#007bff" />
<Text style={styles.textStyleNew}>{item.size || item.size} acres</Text>
</View>
</View>

 </TouchableOpacity>


 );
 const rupeeSymbol = '\u20B9';
 const [maxSize, setMaxSize] = useState(0)
 const [maxPrice, setMaxPrice] = useState(0)
const [appear, setAppear] = useState(true)
 const [value, setValue] = useState('');
 const [sizeValue, setSizeValue] = useState('')
const [land, setLand] =useState('')
 const onRefresh = useCallback(() => {
 setRefreshing(true);
 fetchProperties();
 }, [fetchProperties]);

 return (
 <SafeAreaView style={styles.container}>
 <Modal
 
 animationType="slide"
 transparent={true}
 visible={modalVisible}
 onRequestClose={() => {
 Alert.alert('Modal has been closed.');
 setModalVisible(!modalVisible);
 }}>
 <View style={styles.centeredView}>
 <View style={styles.modalView}>
 

<View style={styles.buttonDirection}>
<Button title='Reset' onPress={resetFunction} style={{textTransform: 'none',borderRadius:10 
}}>

</Button>

<Button title='Close' style={{borderRadius:10}} onPress={() => setModalVisible(!modalVisible)}>

</Button>
</View>
<Text style={styles.label1}>Land Type</Text>
<View style={[styles.pickerWrapper1,{marginTop:10}]}>
<Picker
 selectedValue={land}
 onValueChange={(selectedValue) => setLand(selectedValue)}
 style={styles.picker1}
 
 >
 <Picker.Item label="Select land type" value="" color="#888" />
 <Picker.Item label="Agricultural land" value="Agricultural land" />
 <Picker.Item label="Commercial" value="Commercial" />
 <Picker.Item label="Layout" value="Layout" />
 <Picker.Item label="Residential" value="Residential" />



 </Picker>
 </View>
<Text style={styles.label1}>Price ({rupeeSymbol})</Text>

<View style={{flexDirection:"row", justifyContent: 'space-between',
 alignItems: 'center', marginTop:10}}>
<TextInput placeholder='Minimum price' value={minPrice} onChangeText={(value)=>{
 setMinPrice(value)
}} style={styles.priceInput}/>

<TextInput placeholder='Maximum price' value={maxP} onChangeText={(value)=>{
 setMaxP(value)
}} style={styles.priceMaxInput} />
</View>
{/* {maxPrice > 0 && (
 <Slider
 style={styles.slider}
 minimumValue={0}
 maximumValue={10000000}
 step={1}
 value={value}
 onValueChange={setValue}
 minimumTrackTintColor="#1fb28a"
 maximumTrackTintColor="#d3d3d3"
 thumbTintColor="#b9e4c9"
 />
 )}
 <Text style={{fontSize:16,
 marginBottom:10
 }}>Selected price value: {value}</Text> */}

 <Text style={styles.label1}>Size (⌀)</Text>
 {/* <Slider
 style={{ width: 300, height: 40 }}
 minimumValue={0}
 maximumValue={maxSize}
 step={1}
 value={sizeValue}
 onValueChange={setSizeValue}
 minimumTrackTintColor="#1fb28a"
 maximumTrackTintColor="#d3d3d3"
 thumbTintColor="#b9e4c9"
 /> */}
<View style={{flexDirection:"row", justifyContent:'space-between', marginTop:10}}>
<TextInput placeholder='Enter size' style={styles.input} value={sizeValue}
 onChangeText={setSizeValue}></TextInput>
 <View style={styles.pickerWrapper}>
 <Picker
 selectedValue={sizeUnit}
 onValueChange={(selectedValue) => setSizeUnit(selectedValue)}
 style={styles.picker}

 >
 <Picker.Item label="Select size unit" value=" " />

 <Picker.Item label="Acres" value="acres" />
 <Picker.Item label="Sq. feet" value="sq. ft" />
 <Picker.Item label="Sq. meters" value="sq.m" />
 <Picker.Item label="Sq. yards" value="sq.yards" />
 <Picker.Item label="Cents" value="cents" />

 </Picker>
 </View>
 </View>
{/* 
 <Text style={{fontSize:16,
 marginBottom:10
 }}>Selected size value: {sizeValue}</Text> */}


<View style={[styles.searchheader, {color:'black'}] }>
 {/* <Button title='Search' onPress={getModalSearchDetails} style={{ borderRadius:25,
 }} color='red'/> */}
 <TouchableOpacity style={styles.searchbutton} onPress={getModalSearchDetails}>
 
 <Text style={styles.resettext}>Search</Text>
 </TouchableOpacity>
</View>
 </View>
 </View>
 </Modal>



 {/* <Text style={styles.welcomeContainer} >Welcome, John</Text> */}
 <ScrollView>
 <View style={styles.searchContainer}>
 
 <TextInput
 placeholder="Search By Property Name, Location..."
 style={styles.searchBox}
 value={searchQuery}
 onChangeText={handleSearch}
 />
 <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
 <Icon name="filter" size={30} style={styles.filterButton} />
 </TouchableOpacity>

 
 </View>
 

 <View style={styles.propertyListContainer}>

{resetAppear && (
 <View style={styles.header}>
 <TouchableOpacity style={styles.resetbutton} onPress={resetFunction}>
 
 <Text style={styles.resettext}>Reset</Text>
 <Icon name="refresh" size={20} color="#fff" />
 </TouchableOpacity>
</View>
)}

 {appear && (
 <><View style={styles.textStyle}>
 <Text style={{fontSize:20, fontWeight:"bold"}}>Recommended</Text>
 </View>
 <View style={styles.recommended}>
 <ImageCarousel images={images} />
 </View>
 </>)}
 

 {loading ? (
 <ActivityIndicator size="large" color="#0000ff" />
 ) : (
 <FlatList
 scrollEnabled={false}
 data={filteredProperties}
 renderItem={renderPropertyCard}
 keyExtractor={(item) => item._id}
 contentContainerStyle={styles.propertyList}
 refreshControl={
 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 }
 ListEmptyComponent={
 <Text style={styles.emptyListText}>No properties found</Text>
 }
 />
 )}
 </View>
 </ScrollView>
 
 {
 isBottomSheetVisible && (
 
 <BottomSheetExample />
 
 )
 
 }
 

 </SafeAreaView>

 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#f5f5f5',
 
 }, 
 priceMaxInput:{
 flex: 1, // Ensures both inputs take equal space
 borderColor: '#000', // Light gray border
 borderWidth: 1,
 borderRadius: 5,
 paddingHorizontal: 10,
 fontSize: 14,
 height:40,
 marginBottom:10

 },
 priceInput: {
 flex: 1, // Ensures both inputs take equal space
 borderColor: '#000', // Light gray border
 borderWidth: 1,
 borderRadius: 5,
 paddingHorizontal: 10,
 fontSize: 14,
 height:40,
 marginRight:5,
 marginBottom:10


 },input: { paddingHorizontal: 10,
flex:1,
 marginBottom: 10,
 paddingHorizontal: 10,
 borderWidth: 1,
 borderColor: "black",
 borderRadius: 5,
 marginRight:5,
 height:40,
 },
 slider: {
 width: 300,
 height: 40,
 }, label1: {
 marginTop:5,
 marginBottom: 5,
 fontSize: 16,
 fontWeight: "bold",
 },
 pickerWrapper: {
 height: 40,
 width: 158,
 borderColor: 'black',
 borderWidth: 1, // Apply border to wrapper instead of the Picker
 borderRadius: 5, // Optional, to round the corners
 justifyContent: 'center', // Vertically center the text
 alignItems: 'center', // Horizontally center the text
 },
picker1:{
width:'100%'
},
pickerWrapper1: {
 height: 40,
 width: '100%',
 borderColor: 'black',
 borderWidth: 1, // Apply border to wrapper instead of the Picker
 borderRadius: 5, // Optional, to round the corners
 justifyContent: 'center', // Vertically center the text
 alignItems: 'center', // Horizontally center the text
 marginBottom:10
},
 
 picker: {
 height: 40,
 width: 140, // Width of the dropdown (picker)

 },
 dropdown: {
 borderWidth: 1,
 borderColor: "black",
 borderRadius: 5,
 },
 welcomeContainer:{
 padding:20,
 fontSize:25,
 backgroundColor: '#4184AB',
 color:"white",
 fontStyle:"italic"

 },
 searchContainer: {
 
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 paddingHorizontal: 15,
 paddingVertical: 20,
 backgroundColor: '#4184AB',
 borderBottomWidth: 1,
 borderBottomColor: '#e0e0e0',
 },
 searchBox: {
 flex: 1,
 height: 40,
 borderRadius: 20,
 backgroundColor: "#f0f0f0",
 paddingHorizontal: 15,
 marginRight: 10,
 },
 filterButton: {
 padding: 5,
 borderColor:"white",
 borderWidth:1,
 borderRadius:5
 },
 propertyListContainer: {
 flex: 1,
 },
 propertyList: {
 paddingHorizontal: 15,
 },
 card: {
 backgroundColor: "#fff",
 marginVertical: 10,
 borderRadius: 10,
 overflow: 'hidden',
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 2 },
 shadowRadius: 5,
 elevation: 3,
 },
 shareIcon: {
 position: 'absolute',
 bottom: 10, // Distance from the bottom of the image
 right: 10, // Distance from the right edge of the image
 backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional background for better visibility
 borderRadius: 20, // Circular background
 padding: 8, // Space inside the circular background
 zIndex: 1, // Ensure it appears above the image
 },
 propertyImage: {
 width: "100%",
 height: 200,
 },
 cardContent: {
 padding: 15,
 },
 cardHeader: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 marginBottom: 10,
 },
 propertyName: {
 fontSize: 18,
 fontWeight: "bold",
 },
 propertyDetailsContainer: {
 marginTop: 10,
 },
 propertyDetailRow: {
 flexDirection: 'row',
 alignItems: 'center',
 marginBottom: 5,
 },
 propertyDetails: {
 fontSize: 14,
 color: "gray",
 marginLeft: 5,
 },
 emptyListText: {
 textAlign: 'center',
 marginTop: 50,
 fontSize: 16,
 color: 'gray',
 },
 recommended:{
 paddingHorizontal:10
 },
 textStyle:{
 paddingVertical:10,
 paddingLeft:20,
 fontSize:25,
 },
 detailsStyles:{
 flexDirection:'row'
 },
 textStyleNew:{
 marginLeft:5,
 fontSize:16,
 fontWeight:"500"
 },
 detailsContainer:{
 flexDirection:"row",
 justifyContent:"space-between",
 marginTop:10
 },
 shareIcon: {
 position: 'absolute',
 bottom: 10, // Distance from the bottom of the image
 right: 10, // Distance from the right edge of the image
 backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional background for better visibility
 borderRadius: 20, // Circular background
 padding: 8, // Space inside the circular background
 },
 imageText:{
 backgroundColor: '#f0f8ff', 
 padding: 10, 
 color: '#000', 
 fontSize: 16, 
 fontWeight: 'bold', 
 textAlign: 'center', 
 borderWidth: 1, 
 borderColor: '#007acc', 
 width:"50%",
 borderBottomRightRadius:60,
 
 },
 imageNew:{
 width:"100%",
 height:200
 },
 cardNew: {
 marginVertical: 10,

 backgroundColor: "#fff",
 borderRadius: 10,
 overflow: 'hidden',
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 2 },
 shadowRadius: 5,
 elevation: 3,
 paddingVertical:10,
 paddingHorizontal:10
 },
 priceStyle:{
 backgroundColor: 'rgba(173, 216, 230, 0.7)', 
 padding: 10, 
 color: '#000', 
 fontSize: 16, 
 fontWeight: 'bold', 
 textAlign: 'center', 
 borderWidth: 1, 
 borderColor: '#007acc', 
 width:"40%",
 },
 priceBottomStyle:{
 // position:"absolute",
 // left:10,
 // bottom:10,
 // backgroundColor: 'rgba(173, 216, 230, 0.7)', 
 // padding: 10, 
 // color:"#fff"
 position: 'absolute',
 // borderBottomColor:"#fff",
 // borderBottomWidth:2,
 bottom: 1, // Distance from the bottom of the image
 backgroundColor: '#f0f0f0', // Semi-transparent dark background
 color: '#000', // White text for contrast
 fontSize: 16, // Adjust font size
 fontWeight: 'bold', // Bold text for emphasis
 paddingVertical: 4, // Vertical padding for the text box
 paddingHorizontal: 8, // Horizontal padding for the text box
 },
 centeredView: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 },
 modalView: {
 margin:20,
 
 width:'90%',
 backgroundColor: 'white',
 borderRadius: 10,
 padding: 15,
 shadowColor: '#000',
 shadowOffset: {
 width: 0,
 height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 4,
 elevation: 5,
 height:"80%",
 justifyContent:'center'
 },
 textStyleModal: {
 color: 'white',
 fontWeight: 'bold',
 textAlign: 'center',
 },
 modalText: {
 marginBottom: 15,
 textAlign: 'center',
 },
 button: {
 flexDirection:'row',
 justifyContent:'flex-end',
 borderRadius: 20,
 padding: 10,
 elevation: 2,
 },
 buttonOpen: {
 backgroundColor: '#000',
 },
 buttonClose: {
 backgroundColor: '#2196F3',
 },
 buttonDirection:{
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 marginBottom: 10,
 },
 header: {
 flexDirection: 'row',
 justifyContent: 'flex-end',
padding:10,
 backgroundColor: '#fff',
 },
 searchheader: {
 flexDirection: 'row',
 justifyContent: 'flex-end',
 marginBottom:5
 },
searchbutton: {
 flexDirection: 'row',
 alignItems: 'center',
 backgroundColor: '#007bff',
 paddingHorizontal: 15,
 paddingVertical: 10,
 borderRadius: 5,
 marginTop:10
 },
 reseticon: {
 marginRight: 8,
 },
 resettext: {
 color: '#fff',
 fontSize: 16,
 fontWeight: 'bold',
 },
 resetbutton: {
 flexDirection: 'row',
 alignItems: 'center',
 backgroundColor: '#007bff',
 paddingHorizontal: 10,
 paddingVertical: 5,
 borderRadius: 5,
 },
});

export default AgentHomeScreen;