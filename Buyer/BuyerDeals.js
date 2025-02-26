import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator,Animated, ScrollView, TouchableOpacity,Text, Image,ImageBackground,FlatList, TextInput, Modal, Pressable, Linking } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Title,Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Feather from '@expo/vector-icons/Feather';
 import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRef } from "react";


 
function BuyerDeals({route}){
   console.log("BuyerDeals Params:", route?.params);
  const switched = route.params?.switched;
  console.log("Switched Param:12345678", switched);

console.log("Deepika")
     const scrollY = useRef(new Animated.Value(0)).current;
  
    const buttonWidth = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [150, 60],  
      extrapolate: 'clamp',
    });
  
   
  
    const buttonTextOpacity = scrollY.interpolate({
      inputRange: [0, 20],
      outputRange: [50, 0],  
      extrapolate: 'clamp',
    });


    const navigation=useNavigation()
    const [properties,setProperties] = useState({})
    const [filteredproperties,setFilteredProperties] = useState({})

    const [loading,setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    
    const openAgentModal = (agent) => {
      setSelectedAgent(agent);
      setModalVisible(true);
    };
    
    const closeAgentModal = () => {
      setModalVisible(false);
      setSelectedAgent(null);
    };

    const handleSearch = async () => {
      console.log("SEARCH QUERY", query);
  
      if (!query) {
          // If the search query is empty, fetch the original data
          setLoading(true); // Start loading
          await getDealAssociatedProperties(); // Fetch original data
          setSearched(false); // Reset searched state
          return;
      }
  
      const lowercasedQuery = query.toLowerCase();
      console.log("LOWERCASE QUERY", lowercasedQuery);
      setLoading(true)
  
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

      if(results.length === 0){
setSearched(true)
setLoading(false)

      }
      else{
        setFilteredProperties(results);
setSearched(false)
setLoading(false)

      }
  
   };
  
   
 useFocusEffect(
    useCallback(() => {
        if(!query){
            getDealAssociatedProperties();

        }
    }, [query])
  );
    const getDealAssociatedProperties=useCallback(async()=>{
      console.log("Again in the api")
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }
            let url = "http://172.17.15.189:3000/deal/getAgentDealings2";

            if (switched) {
              url += `/buyer`;  

            }
            else{
              url="http://172.17.15.189:3000/deal/getAgentDealings"
            }
            console.log("Fetching from URL:", url);  

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Rgdjsfnjf", response.status)

            if(response.status === 409){
              setSearched(true)
              setLoading(false);

            }
if(response.status === 200 || response.status === 201){
  setProperties(data.data);
  setFilteredProperties(data.data)
   setLoading(false);
  }
          
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);


        }
    }
  )

const PropertyDealCard = ({ property }) => {
      return (
        <>
        <Card style={styles.card}>
        <Card.Content>
            {property.property.propertyType === 'Agricultural land' && (<>
                <Text style={styles.customerName}>{property.property?.landDetails?.title || "N/A"}</Text>
<View style={styles.detailsContainer}>
<View style={styles.detailItem}>
    <Feather name="at-sign" size={20} color="#057ef0" />
    <Text style={styles.detailText}>{property.property?.propertyId || "N/A"}</Text>
   </View>
    <View style={styles.detailItem}>
    <MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
    <Text style={styles.detailText}>{property.property?.propertyType || "N/A"}</Text>
   </View>
   <View style={styles.detailItem}>
       <MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
       <Text style={styles.detailText}>{property.property?.address?.district || "N/A"}, {property.property?.address?.state || "N/A"}</Text>
   </View>
</View>
            </>
            )}
     {property.property.propertyType === 'Commercial' && (<>
<Text style={styles.customerName}>{property.property?.propertyTitle || "N/A"}</Text>
<View style={styles.detailsContainer}>
<View style={styles.detailItem}>
<Feather name="at-sign" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyId || "N/A"}</Text>
</View>
<View style={styles.detailItem}>
<MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyType || "N/A"}</Text>
</View>
<View style={styles.detailItem}>
<MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyDetails?.landDetails?.address?.district || "N/A"}, {property.property?.propertyDetails?.landDetails?.address?.state || "N/A"}</Text>
</View>
</View>
</>
)}
{property.property.propertyType === 'Layout' && (<>
<Text style={styles.customerName}>{property.property?.layoutDetails?.layoutTitle || "N/A"}</Text>
<View style={styles.detailsContainer}>
<View style={styles.detailItem}>
<Feather name="at-sign" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyId || "N/A"}</Text>
</View>
<View style={styles.detailItem}>
<MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyType || "N/A"}</Text>
</View>
<View style={styles.detailItem}>
<MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.layoutDetails?.address?.district || "N/A"}, {property.property?.layoutDetails?.address?.state || "N/A"}</Text>
</View>
</View>
</>
)}
{property.property.propertyType === 'Residential' && (<>
<Text style={styles.customerName}>{property.property?.propertyDetails?.apartmentName || "N/A"}</Text>
<View style={styles.detailsContainer}>
<View style={styles.detailItem}>
<Feather name="at-sign" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyId || "N/A"}</Text>
</View>
<View style={styles.detailItem}>
<MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.propertyType || "N/A"}</Text>
</View>
<View style={styles.detailItem}>
<MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
<Text style={styles.detailText}>{property.property?.address?.district || "N/A"}, {property.property?.address?.state || "N/A"}</Text>
</View>
</View>
</>
)}
        </Card.Content>
        {property.property.propertyType === 'Residential' && (<>

          <Image
    source={{ uri: property.property?.propPhotos?.[0]  || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }} 
    style={styles.propertyImage}
  />

</>

)}

{property.property.propertyType === 'Commercial' && (<>

<Image
source={{ uri: property.property?.propertyDetails?.uploadPics?.[0]  || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }} 
style={styles.propertyImage}
/>

</>

)}
{property.property.propertyType === 'Agricultural land' && (<>

<Image
source={{ uri: property.property?.landDetails?.images?.[0]  || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }} 
style={styles.propertyImage}
/>

</>

)}

{property.property.propertyType === 'Layout' && (<>

<Image
source={{ uri: property.property?.uploadPics?.[0]  || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }} 
style={styles.propertyImage}
/>

</>

)}
        <View style={{alignItems:'flex-end',marginRight:20,marginBottom:10}}>
    <TouchableOpacity style={{backgroundColor:"#057ef0",paddingHorizontal:10,borderRadius:10,paddingVertical:5}} 
    onPress={() => openAgentModal(property.agentData)}
    >
<Text style={{color:"white", fontSize:16, fontFamily:'Montserrat_500Medium'}} >View Agent</Text>
    </TouchableOpacity>
</View>
    </Card>
</>
    );
  };

  const AgentDetailsModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeAgentModal}
      
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeAgentModal}>
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>

      {selectedAgent ? (
        <View style={styles.agentContainer}>

         
          <View style={styles.centerContent}>
            <Image source={{ uri: selectedAgent?.profilePicture || "" }} style={styles.agentProfileImage} />
            <Text style={styles.agentName}>{selectedAgent?.firstName} {selectedAgent?.lastName}</Text>
            <Text style={styles.accountId}>Account ID: {selectedAgent.accountId}</Text>
          </View>

 
          <View style={styles.infoWrapper}>
            <View style={styles.infoRow}>
              <Feather name="mail" size={20} color="#057ef0" />
              <Text style={styles.infoText}>{selectedAgent.email}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Feather name="phone" size={20} color="#057ef0" />
              <Text style={styles.infoText}>{selectedAgent.phoneNumber}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialIcons name="location-pin" size={20} color="#057ef0" />
              <Text style={styles.infoText}>
                {selectedAgent.mandal}, {selectedAgent.district}, {selectedAgent.city}, {selectedAgent.state}, {selectedAgent.country} - {selectedAgent.pinCode}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>

        </View>
      ) : (
        <Text>No Agent Found</Text>
      )}
         
          </View>
        </View>
      </Modal>
    );
  };
  const handleContactPress = () => {
    Linking.openURL(`tel:${selectedAgent.phoneNumber}`);
  };

  const getTruncatedPlaceholder = (text) => {
    const maxLength = 39; // Maximum characters before truncating
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...'; // Truncate and add ellipses
    }
    return text;
  };
  return (

 <View style={styles.container} >
<AgentDetailsModal />


  <View style={styles.searchContainer}>
  <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
  <TextInput
    placeholder={getTruncatedPlaceholder("Search By Property Id, Name, Location, Type...")}
    style={styles.searchBox}
    value={query}
    onChangeText={(text) => {
      setQuery(text);
      if (!text) {
        // If the text is empty, fetch original data
        setLoading(true);
        getDealAssociatedProperties();
        setSearched(false);
      }
    }}
    returnKeyType="search"
    onSubmitEditing={() => handleSearch()}
  />
</View>

            {loading ? (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ) : (
                <>
                                                        {searched && (
                  <>
                  <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                  <MaterialIcons name="group-off" size={24} color="black" />
                  <Text>No Properties found</Text>
                  </View>
                  </>
              )}
                {!searched && (
                                          <View style={styles.listContainer}>
                        
                                     <Animated.FlatList 
                                     showsVerticalScrollIndicator={false}
                                       data={filteredproperties}
                                       keyExtractor={(item) => item.propertyId || item.accountId}
                                       renderItem={({ item }) => <PropertyDealCard property={item} />}
                           onScroll={Animated.event(
                             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                             { useNativeDriver: false },
                            
                            )}
                           contentContainerStyle={[styles.list, { backgroundColor: '#f0f0f0' }]}
                         />
                         </View>
                               
                                 )}


<Animated.View
  style={[
    styles.floatingButton,
    {
      width: buttonWidth,
    },
  ]}
>
  <TouchableOpacity style={styles.buttonContent} onPress={()=> navigation.navigate('createDeal', {ba:switched})}>
    <Animated.View
      style={[
        styles.iconContainer,
        {
          marginLeft: buttonTextOpacity.interpolate({
            inputRange: [0, 0],
            outputRange: [28, 0], // Moves to center when text fades out
          }),
        },
      ]}
    >
      <Ionicons name="add" size={24} color="#fff" />
    </Animated.View>
    <Animated.Text
      style={[styles.buttonText, { opacity: buttonTextOpacity }]}
    >
      Create a Deal
    </Animated.Text>
  </TouchableOpacity>
</Animated.View>
               
              </>
            )}
        </View>


  );
};

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingBottom:70
    },
    listContainer: {
        padding: 5,
        marginTop:5    },
    card: {
      marginBottom: 10,
      elevation: 4,
      borderRadius: 12,
     },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    customerName: {
        fontSize: 18,
        color: "#333333",
         fontFamily:'Montserrat_700Bold'
    },
    
    detailsContainer: {
        marginTop: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    detailText: {
        marginLeft: 10,
        fontSize: 14,
        fontFamily:'Montserrat_500Medium'
    },
    infoText: {
       fontSize: 14,
      fontFamily:'Montserrat_500Medium'
  },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end', // Space out buttons evenly
      paddingBottom: 8,
      paddingTop: 8,
    },
    button: {
      width: 100, // Fixed width for buttons
      marginHorizontal: 4,
    },
    loader:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    propertyImage: {
        position: 'absolute',
        top: 20,
        right: 10,
        width: 80, // Adjust size as needed
        height: 80, // Adjust size as needed
        borderRadius: 40, // Optional, to make the image rounded
      },
      searchIcon: {
        marginLeft: 2,
        marginRight: 5, // Space between icon and text input
        color:"white"
      },
      searchContainer: {
          paddingHorizontal: 5,
        backgroundColor: '#4184AB', // Light background
        borderRadius: 10, // Rounded corners
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 5, // Shadow blur
        elevation: 3, // For Android shadow
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Vertically center the input
        paddingVertical:10,
        marginHorizontal:10,
        marginTop:10
      },
      searchBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff', // Input background
        borderRadius: 20, // Rounded corners for the input box
        borderWidth: 1,
        borderColor: '#ccc', // Border color
        fontFamily:'Montserrat_400Regular',
        
       },
      filterButton: {
        padding: 5,
        borderColor:"white",
        borderWidth:1,
        borderRadius:5
      },
      floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        height: 50,
        backgroundColor: '#05b7f7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 5,  
      },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Starts aligned to the left
        paddingHorizontal: 10,
      },
      iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#05b7f7',
       
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight:"bold"
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        backgroundColor: "white",
        width: "80%",
        padding: 20,
        borderRadius: 10,
  
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      agentContainer: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
   
      },
    
centerContent: {
  alignItems: 'center',
  marginBottom: 10,
},

agentProfileImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginBottom: 10,
},

agentName: {
  fontSize: 18,
   textAlign: 'center',
  fontFamily:'Montserrat_700Bold'
},

accountId: {
  fontSize: 16,
  color: 'gray',
  textAlign: 'center',
  fontFamily:'Montserrat_500Medium'

},

infoWrapper: {
  
  gap: 10,
},

infoRow: {
  flexDirection: 'row',
  gap: 10,
},

      contactButton: {
 marginTop:10,
        backgroundColor: "#057ef0",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      contactText: {
        color: "white",
        fontSize: 16,
        fontFamily:'Montserrat_700Bold'
       },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 10,
      },
  });



export default BuyerDeals;