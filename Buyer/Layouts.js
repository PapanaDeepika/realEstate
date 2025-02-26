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

function Layouts({ navigation }) {
  
  
   const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
 const { isTelugu } = useContext(LanguageContext);

const lang = isTelugu === 'English' ? 'en' : 'te'

  const fetchProperties = useCallback(async () => {
    console.log("DFGHJK", loading)
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const savedFilters = await AsyncStorage.getItem("searchFilters");

      console.log("123", JSON.parse(savedFilters))
if(JSON.parse(savedFilters)){
  const parsedFilters = JSON.parse(savedFilters);

  const response = await axios.get("http://172.17.15.189:3000/filterRoutes/layoutSearch", {
    params: parsedFilters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


if(response.data && (response.status === 200 || response.status === 201) ){
  console.log("12345", response.data.data)
setFilteredProperties(response.data.data)
setProperties(response.data.data)
setLoading(false);

}
}

if(!savedFilters){





      const response = await fetch("http://172.17.15.189:3000/layout/getalllayouts", {
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
    }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProperties();

     }, [fetchProperties])
  );

 


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
            prop.propertyId?.toLowerCase().includes(lowercasedQuery) ||
            prop.landDetails?.title?.toLowerCase().includes(lowercasedQuery) || 
            prop.layoutDetails?.layoutTitle?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyDetails?.apartmentName?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyTitle?.toLowerCase().includes(lowercasedQuery) ||
            prop.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.address?.state?.toLowerCase().includes(lowercasedQuery) ||
            prop.layoutDetails?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.layoutDetails?.address?.state?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyDetails?.landDetails?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyDetails?.landDetails?.address?.state?.toLowerCase().includes(lowercasedQuery)
        );
    });

    console.log("SEARCH RESULTS", results);

    setFilteredProperties(results);

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


  const filtersScreen =()=> {
    // toggleBottomSheet()  
    navigation.navigate("as", {type:"layout"})  
      }

  const renderPropertyCard = ({ item }) => (
    
    
 <TouchableOpacity style={styles.cardNew} onPress={() => propertyDetails(item)} key={item._id}>
    
    
    
    {item.propertyType === "Layout" && (<ImageBackground style={styles.imageNew} source ={{uri: 
   
         item.uploadPics?.[0] || 
         "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg"}}>
    
    
    
    <Text style={styles.imageText}>{item.layoutDetails?.layoutTitle } @ {item.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.layoutDetails?.plotPrice)} / {item.layoutDetails?.priceUnit}</Text>
 
    </ImageBackground>)}
    
    <View style={styles.detailsContainer}>
     <View style={styles.detailsStyles}>
    <Icon name="map-marker" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{item.layoutDetails?.address?.district}</Text>
    </View>
    <View style={styles.detailsStyles}>
    <Icon name="ruler" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{item.layoutDetails?.plotSize } {item.layoutDetails?.sizeUnit}</Text>
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

         <TouchableOpacity  onPress={filtersScreen}
                        >
                          <Icon name="filter" size={30} style={styles.filterButton} />
                        </TouchableOpacity>
      

      
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
        filterButton: {
          padding: 5,
          borderColor:"white",
          borderWidth:1,
          borderRadius:5
        },
});

export default Layouts;
