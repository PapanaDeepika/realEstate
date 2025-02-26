import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { View, Modal,Text, TouchableOpacity, SafeAreaView,
   StyleSheet, FlatList, Image, TextInput, RefreshControl, Pressable,Button,
   ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Share } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
 import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetExample from '../BottomSheetExample';
import { ImageBackground } from 'react-native';
import { LanguageContext } from '../LanguageContext';
const SCALE_FACTOR = 1000000; // 1 million

function InterestedProperties({ navigation }) {
  
  
   const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
 const { isTelugu } = useContext(LanguageContext);

const lang = isTelugu === 'English' ? 'en' : 'te'

  const fetchProperties = useCallback(async () => {
    console.log("DFGHJK", isTelugu)
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch("http://172.17.15.189:3000/deal/getIntrestedProperties", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
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

      checkinglanguage();
    }, [fetchProperties,checkinglanguage])
  );

const checkinglanguage = useCallback(async () => {
 const value = AsyncStorage.getItem('lang');
 console.log("VALUE for the language", value)
}, [])


  const getSearchDetails = async () => {
    if (searchQuery.trim() === "") {
      setFilteredProperties(properties);
      return;
    }

    // try {
    //   const token = await AsyncStorage.getItem("userToken");
    //   if (!token) {
    //     console.log("No token found");
    //     return;
    //   }

    //   console.log("Sending search request with query:", searchQuery);
    //   const response = await axios.get(`http://172.17.15.189:3000/admin/getPropertiesFilter/${searchQuery}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   console.log("Search response:", response.data);
      
    //   if (response.data && Array.isArray(response.data)) {
    //     setFilteredProperties(response.data);
    //   } else {
    //     console.error("Unexpected response format:", response.data);
    //     setFilteredProperties([]);
    //   }
    // } catch (error) {
    //   console.error("Failed to search properties:", error);
    //   setFilteredProperties([]);
    // }

  
    const lowercasedQuery = searchQuery.toLowerCase();
    console.log("LOWERCASE QUERY", lowercasedQuery);
     

    const results = properties.filter((prop) => {
        return (
            prop.property?.propertyId?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.landDetails?.title?.toLowerCase().includes(lowercasedQuery) || 
            prop.property?.layoutDetails?.layoutTitle?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.propertyDetails?.apartmentName?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.propertyTitle?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.address?.state?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.layoutDetails?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.layoutDetails?.address?.state?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.propertyDetails?.landDetails?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.property?.propertyDetails?.landDetails?.address?.state?.toLowerCase().includes(lowercasedQuery)
        );
    });

    console.log("SEARCH RESULTS", results);

    setFilteredProperties(results);

  };

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
   

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} L`; 
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(1)} K`;
    }
    return price;
  };

  const renderPropertyCard = ({ item }) => (
    // <TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)} key={item._id}>
    //   {/* Image */}
    //   {(item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0]) ? (
    //     <Image 
    //       source={{ uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] }} 
    //       style={styles.propertyImage} 
    //     />
    //   ) : (
    //     <Text>No image available</Text>
    //   )}

    //   <View style={styles.cardContent}>
    //     <View style={styles.cardHeader}>
    //       <Text style={styles.propertyName}>{item.title || item.propertyTitle}</Text>
    //       <TouchableOpacity onPress={() => handleShare(item)}>
    //         <Icon name="share" size={24} color="#007bff" />
    //       </TouchableOpacity>
    //     </View>

    //     <View style={styles.propertyDetailsContainer}>
    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="map-marker" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Location: {item.district || item.address?.district || item.address}
    //         </Text>
    //       </View>

    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="currency-usd" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Price: ${item.price || item.landDetails?.price}
    //         </Text>
    //       </View>

    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="ruler" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Size: {item.size || item.size} acres
    //         </Text>
    //       </View>

    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="home" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Type: {item.propertyType}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
 <TouchableOpacity style={styles.cardNew} onPress={() => propertyDetails(item)} key={item._id}>
    
    {(item.propertyType === "Agricultural land" || item.propertyType === "Agricultural" ) && (<ImageBackground style={styles.imageNew} source ={{uri: item.property?.images?.[0] || item.property?.landDetails?.images?.[0]
         || item.property?.uploadPics?.[0] || item.property?.propPhotos?.[0] ||
          "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
    
    
    
    <Text style={styles.imageText}>{item.property?.landDetails?.title} @ {item.property?.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.property?.landDetails?.price)} / {item.property?.landDetails?.priceUnit}</Text>
  
    </ImageBackground>)}
    
    {item.propertyType === "Residential" && (<ImageBackground
     style={styles.imageNew} source ={{uri:  (item.property?.propPhotos	?.length > 0) ? (item.property?.propPhotos	?.[0]) :
     ( "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg")}}>
    
    
    
    <Text style={styles.imageText}>{item.property?.propertyDetails?.apartmentName} @ {item.property?.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.property?.propertyDetails?.flatCost )}</Text>
 
    </ImageBackground>)}
    
    {item.propertyType === "Commercial" && (<ImageBackground style={styles.imageNew} source ={{uri: item.property?.propertyDetails?.uploadPics?.[0]  ||  "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
    
    
    
    <Text style={styles.imageText}>{ item.property?.propertyTitle} @ {item.property?.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.property?.propertyDetails?.landDetails?.sell?.price
     || item.property?.propertyDetails?.landDetails?.rent?.rent || 
     item.property?.propertyDetails?.landDetails?.lease?.leasePrice)} / {item.property?.propertyDetails?.landDetails?.sell?.sizeUnit ||
     item.property?.propertyDetails?.landDetails?.rent?.sizeUnit ||
      item.property?.propertyDetails?.landDetails?.lease?.sizeUnit}</Text>
     
    </ImageBackground>)}
    
    {item.propertyType === "Layout" && (<ImageBackground style={styles.imageNew} source ={{uri: item.property?.images?.[0] || item.property?.landDetails?.images?.[0] || item.property?.uploadPics?.[0] || item.property?.propPhotos?.[0] || "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg"}}>
    
    
    
    <Text style={styles.imageText}>{item.property?.layoutDetails?.layoutTitle } @ {item.property?.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.property?.layoutDetails?.plotPrice)} / {item.property?.layoutDetails?.priceUnit}</Text>
 
    </ImageBackground>)}
    
    <View style={styles.detailsContainer}>
     <View style={styles.detailsStyles}>
    <Icon name="map-marker" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{item.property?.layoutDetails?.address?.district || item.property?.propertyDetails?.landDetails?.address?.district || item.property?.address?.district || item.property?.address?.district }</Text>
    </View>
    <View style={styles.detailsStyles}>
    <Icon name="ruler" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{item.property?.layoutDetails?.plotSize || item.property?.propertyDetails?.landDetails?.sell?.plotSize || item.property?.propertyDetails?.landDetails?.rent?.plotSize|| item.propertyDetails?.landDetails?.lease?.plotSize|| item.property?.propertyDetails?.flatSize || item.property?.landDetails?.size } {item.property?.layoutDetails?.sizeUnit || item.property?.propertyDetails?.landDetails?.sell?.sizeUnit || item.property?.propertyDetails?.landDetails?.rent?.sizeUnit|| item.property?.propertyDetails?.landDetails?.lease?.sizeUnit|| item.property?.propertyDetails?.sizeUnit || item.property?.landDetails?.sizeUnit }</Text>
    </View>
    </View>
    
     </TouchableOpacity>


  );
 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProperties();
  }, [fetchProperties]);

  return (
    <SafeAreaView style={styles.container}>






           {/* <Text style={styles.welcomeContainer} >Welcome, John</Text> */}
           <ScrollView>
      <View style={styles.searchContainer}>
   

         <TextInput
          placeholder="Search By Property Name, Location..."
          style={styles.searchBox}
          value={searchQuery}
           
          onChangeText={(value) => {
            setSearchQuery(value);
            if (!value) {
                setLoading(true);
                fetchProperties();
                
            }
        }}      returnKeyType='search'
          onSubmitEditing={() => getSearchDetails()}
 
        />
      

      
      </View>
   

      <View style={styles.propertyListContainer}>



      
      

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
      
     
 

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
 
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
    fontFamily:'Montserrat_400Regular'
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
     fontFamily: "Montserrat_500Medium",

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
         textAlign: 'center',  
         borderWidth: 1, 
        borderColor: '#007acc',  
        width:"50%",
        borderBottomRightRadius:60,
        fontFamily: "Montserrat_700Bold",
    
        
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
         paddingVertical: 4, // Vertical padding for the text box
        paddingHorizontal: 8, // Horizontal padding for the text box
        fontFamily:'Montserrat_700Bold'
        },
      
});

export default InterestedProperties;
