import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity,Text, Image,ImageBackground,FlatList, TextInput, Animated } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Title,Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
 import { useFocusEffect, useNavigation } from "@react-navigation/native";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
 
import Feather from '@expo/vector-icons/Feather';
import { useRef } from "react";
 

function AgentCustomerDeals(){
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
    const [customers,setCustomers] = useState({})
    const [loading,setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)

    const handleSearch =async()=>{
        console.log("SEARCH QUERY", query)
        setLoading(true)
        setSearched(true)
        if (!query) {
            // If the search query is empty, fetch the original data
            setLoading(true); // Start loading
            await getCustomers(); // Fetch original data
            setSearched(false); // Reset searched state
            return;
        }

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch(`http://172.17.15.184:3000/deal/dealSearchOnCustomer/${query}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if(data.status !== "false"){
              setLoading(true)

            setCustomers(data.data);
             setLoading(false);
            }
            else{
                console.log("IN THE ELSE")
setSearched(true)

            }
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setLoading(false);


        }

    }
    useFocusEffect(
        useCallback(() => {
          // If query is not empty, we fetch the searched data
          if (!query) {
         
            getCustomers(); // Fetch the original data
          }
        }, [query])
      );
      
    const getCustomers=useCallback(async()=>{
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch("http://172.17.13.106:3000/deal/getIntresetedCustomers", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setCustomers(data);
             setLoading(false);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setLoading(false);


        }
    }
  )

  const getDealByCId=(customer)=>{
navigation.navigate("getDealByCIdNew", {customer:customer})
  }

const CustomerDealCard = ({ customer }) => {
 

    return (
      <Card style={styles.card}>
      <Card.Content>
   
          <Text style={styles.customerName}>{customer.customerName || "N/A"} </Text>

           <View style={styles.detailsContainer}>


           <View style={styles.detailItem}>
           <Feather name="at-sign" size={20} color="#057ef0" />
           <Text style={styles.detailText}>{customer.userId || "N/A"}</Text>
              </View>

               <View style={styles.detailItem}>
               <FontAwesome name="phone" size={20} color="#057ef0" />
               <Text style={styles.detailText}>{customer.phoneNumber || "N/A"}</Text>
              </View>



              <View style={styles.detailItem}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
              <Text style={styles.detailText}>{customer.district || "N/A"}, {customer.state || "N/A"}</Text>
              </View>

          
           


           
          </View>
       



      </Card.Content>

      <Image
  source={{ uri: customer.profilePicture  }} 
  style={styles.propertyImage}
/>

      <View style={{alignItems:'flex-end',marginRight:20,marginBottom:10}}>
  <TouchableOpacity style={{backgroundColor:"#057ef0",paddingHorizontal:10,borderRadius:10,paddingVertical:5}} onPress={()=>{
     getDealByCId(customer)}}>
<Text style={{color:"white", fontSize:16}}>View Deals</Text>
  </TouchableOpacity>

</View>
  
  </Card>
    );
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
                {loading ? (
                    <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
                ) : (
       
<>
 


                                   {!searched && (
                                    <View style={styles.searchContainer}>
                                            <Icon name="search" size={24} color="#fff" style={styles.searchIcon} />
                                      
                                    <TextInput
      placeholder={getTruncatedPlaceholder("Search By Customer Id, Name, Location...")}
      style={styles.searchBox}
      value={query}
      onChangeText={(text) => {
        setQuery(text);
        if (!text) {
            setLoading(true);
            getCustomers();
            setSearched(false);
        }
    }}      returnKeyType='search'
      onSubmitEditing={() => handleSearch()}
    />
                                            
                                    
                                          
                                          </View>
                                   )}  
                                          {searched && (
    <>
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
    <MaterialIcons name="group-off" size={24} color="black" />
    <Text>No Customers found</Text>
    </View>
    </>
)}


         {!searched && (
                            <View style={styles.listContainer}>
          
                       <Animated.FlatList 
                       data={customers}
                       showsVerticalScrollIndicator={false}
                       keyExtractor={(item) => item.id}
                       renderItem={({ item }) => <CustomerDealCard customer={item} />}
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
  <TouchableOpacity style={styles.buttonContent} onPress={()=> navigation.navigate('createDeal')}>
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

{/* {!searched && (
       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <View style={styles.listContainer}>
         <FlatList
           data={customers}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => <CustomerDealCard customer={item} />}
           scrollEnabled={false}
         />
       </View>
     </ScrollView>
)} */}
 
  </>
                )}
            </View>




  );
};

export default AgentCustomerDeals;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingBottom:50
    },
    listContainer: {
       marginTop:10
    },
    detailsContainer: {
      marginTop: 8,
  },
  propertyImage: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
    borderRadius: 40, // Optional, to make the image rounded
  },
    card: {
      marginBottom: 10,
      elevation: 4,
      borderRadius: 12,
     },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight:"bold"
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
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appointmentDetails: {
      flex: 1,
      marginLeft: 10,
    },
    customerName: {
      fontSize: 18,
      color: "#333333",
      fontWeight:"bold"
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
},
detailText: {
    marginLeft: 10,
    fontSize: 14,
},
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#05b7f7',
     
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
    searchIcon: {
      marginLeft: 2,
      marginRight: 5, // Space between icon and text input
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
    },
      filterButton: {
        padding: 5,
        borderColor:"white",
        borderWidth:1,
        borderRadius:5
      },
  });