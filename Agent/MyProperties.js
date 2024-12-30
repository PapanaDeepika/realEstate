import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

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
import { jwtDecode } from 'jwt-decode';
function MyProperties() {
    const [modalVisible, setModalVisible] = useState(false);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const fetchProperties = useCallback(async () => {
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) {
            console.log("No token found");
            return;
          }
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.user.userId;
          console.log("USER", token)
          const response = await fetch(`http://172.17.15.184:3000/property/getpropbyid/${userId}`
 , {
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

  useEffect(
    useCallback(() => {
      fetchProperties();
    }, [fetchProperties])
  );

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

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: `Check out this property: ${item.title} in ${item.district}. Price: $${item.price}, Size: ${item.size} acres.`,
      });
    } catch (error) {
      console.error("Error sharing property:", error);
    }
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
<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.propertyDetails?.uploadPics?.[0] || item.propPhotos?.[0] || item.uploadPics?.[0]}}>

{/* <Text style={styles.imageText}>{item.title || item.propertyTitle || item.landDetails.title}</Text> */}
{(item.propertyType === 'Layout' || item.propertyType === 'layout') && (
    <Text style={styles.imageText}>{item.layoutDetails.layoutTitle}</Text>

)}
{(item.propertyDetails?.propertyType === 'Commercial'|| item.propertyDetails?.propertyType ==='commercial') && (
    <Text style={styles.imageText}>{item.propertyDetails.title}</Text>

)}

{(item.propertyType === 'Residential' || item.propertyType==='residential' )&& (
    <Text style={styles.imageText}>{item.propertyDetails?.apartmentName}</Text>

)}

{(item.propertyType === 'Agricultural land' || item.propertyType ==='agricultural land') && (
    <Text style={styles.imageText}>{item.landDetails?.title}</Text>
)}



{item.propertyDetails?.propertyType === 'Commercial' && (
    <>
    <Text style={styles.priceBottomStyle}>{item.propertyDetails.landDetails.rent?.totalAmount} {item.propertyDetails.landDetails.rent?.priceUnit}</Text>
    <Text style={styles.priceBottomStyle}>{item.propertyDetails.landDetails.sell?.price} {item.propertyDetails.landDetails.sell?.priceUnit}</Text>
    <Text style={styles.priceBottomStyle}>{item.propertyDetails.landDetails.lease?.leasePrice} {item.propertyDetails.landDetails.lease?.priceUnit}</Text>

    </>
)}
{(item.propertyType === 'Residential' || item.propertyType === 'residential')  && (
    <Text style={styles.priceBottomStyle}>{item.propertyDetails.flatCost}{item.propertyDetails.priceUnit}</Text>
)}

{item.propertyType === 'Agricultural land' && (
    <Text style={styles.priceBottomStyle}>{item.landDetails.price}{item.landDetails.priceUnit}</Text>
)}
{item.propertyType === 'Layout' && (
    <Text style={styles.priceBottomStyle}>{item.layoutDetails.plotPrice}{item.layoutDetails.priceUnit}</Text>
)}

{/* <Text style={styles.priceBottomStyle}>${item.price || item.landDetails?.price}</Text> */}
<TouchableOpacity style={styles.shareIcon} onPress={() => handleShare(item)}>
   <Icon name="share" size={24} color="#007bff" />
 </TouchableOpacity>
</ImageBackground>


<View style={styles.detailsContainer}>
 <View style={styles.detailsStyles}>
<Icon name="map-marker" size={24} color="#007bff" />
{item.propertyDetails?.propertyType === 'Commercial' && (
    <>
<Text style={styles.textStyleNew}>{item.propertyDetails.address?.district}</Text>

    </>

)}
{item.propertyType === 'Agricultural land' && (
    <>
<Text style={styles.textStyleNew}>{item.address?.district}</Text>

    </>

)}
{(item.propertyType === 'Residential' || item.propertyType === 'residential') && (
    
<Text style={styles.textStyleNew}>{item.address?.district}</Text>



)}
{item.propertyType === 'Layout' && (
    
    <Text style={styles.textStyleNew}>{item.layoutDetails?.address?.district}</Text>
    
    
    
    )}
{/* <Text style={styles.textStyleNew}>{item.district || item.address?.district || item.address}</Text> */}
</View>
<View style={styles.detailsStyles}>
<Icon name="ruler" size={24} color="#007bff" />
{/* <Text style={styles.textStyleNew}>{item.size || item.landDetails.size} acres</Text> */}
{item.propertyDetails?.propertyType === 'Commercial' && (
    <>
    <Icon name="ruler" size={24} color="#007bff" />
        <Text style={styles.textStyleNew}>{item.propertyDetails.landDetails.rent?.plotSize} {item.propertyDetails.landDetails.rent?.sizeUnit}</Text>
        <Text style={styles.textStyleNew}>{item.propertyDetails.landDetails.sell?.plotSize} {item.propertyDetails.landDetails.sell?.sizeUnit}</Text>
        <Text style={styles.textStyleNew}>{item.propertyDetails.landDetails.lease?.plotSize} {item.propertyDetails.landDetails.lease?.sizeUnit}</Text>

    </>

)}


{item.propertyType === 'Agricultural land' && (
    
    <>

    <Text style={styles.textStyleNew}>{item.landDetails.size} {item.landDetails.sizeUnit}</Text>
       

    </>

)}
{(item.propertyType === 'Residential' || item.propertyType === 'residential')  && (
    
    

    <Text style={styles.textStyleNew}>{item.propertyDetails.flatSize} {item.propertyDetails.sizeUnit}</Text>
       
 

)}
{item.propertyType === 'Layout' && (
    
    

    <Text style={styles.textStyleNew}>{item.layoutDetails?.plotSize} {item.layoutDetails?.sizeUnit}</Text>
       
 

)}
</View>
</View>

 </TouchableOpacity>


  );
  const rupeeSymbol = '\u20B9';
  const [value, setValue] = useState(0);
  const [sizeValue, setSizeValue] = useState(0)

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
<Button title='Reset' style={{textTransform: 'none', 
}}>

</Button>

<Button title='Close'            onPress={() => setModalVisible(!modalVisible)}>

</Button>
</View>
<Text>Price ({rupeeSymbol})</Text>
<Slider
 style={{ width: 300, height: 40 }}
 minimumValue={0}
 maximumValue={100}
 step={1}
 value={value}
 onValueChange={setValue}
 minimumTrackTintColor="#1fb28a"
 maximumTrackTintColor="#d3d3d3"
 thumbTintColor="#b9e4c9"
/>
     <Text style={{fontSize:16,
       marginBottom:10
     }}>Selected price value: {value}</Text>

     <Text>Size (⌀)</Text>
     <Slider
 style={{ width: 300, height: 40 }}
 minimumValue={0}
 maximumValue={100}
 step={1}
 value={sizeValue}
 onValueChange={setSizeValue}
 minimumTrackTintColor="#1fb28a"
 maximumTrackTintColor="#d3d3d3"
 thumbTintColor="#b9e4c9"
/>
<Text style={{fontSize:16,
       marginBottom:10
     }}>Selected size value: {sizeValue}</Text>


        <Pressable
         style={[styles.button, styles.buttonClose]}
>
         <Text style={styles.textStyleModal}>Search</Text>
       </Pressable>
     </View>
   </View>
 </Modal>



    {/* <Text style={styles.welcomeContainer} >Welcome, John</Text> */}
<View style={styles.searchContainer}>

 <TextInput
   placeholder="Search By Property Name, Location..."
   style={styles.searchBox}
   value={searchQuery}
   onChangeText={handleSearch}
 />
 <TouchableOpacity  onPress={() => setModalVisible(true)}>
   <Icon name="filter" size={30} style={styles.filterButton} />
 </TouchableOpacity>


</View>
<ScrollView>
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
  )
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
      marginVertical: 15,
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
          marginVertical: 15,
  
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
           height:'70%',
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
          }
  });
export default MyProperties;