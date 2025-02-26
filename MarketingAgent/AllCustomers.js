import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity,Text, Image,ImageBackground,FlatList, TextInput } from "react-native";
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
 

function AllCustomers(){
  

    const navigation=useNavigation()
    const [customers,setCustomers] = useState([])
    const [loading,setLoading] = useState(true)
    const [query, setQuery] = useState('')
     const [filteredCustomers, setFilteredCustomers] = useState([]);


  
 useFocusEffect(
    useCallback(() => {
      getCustomers();
    }, [getCustomers])
  );
  const getCustomers = useCallback(async () => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            console.log("No token found");
            return;
        }

        const response = await fetch(`http://172.17.15.189:3000/customer/getCustomer`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
        setLoading(false);
    } catch (error) {
        console.error("Failed to fetch customers:", error);
        setLoading(false);
    }
}, []);
 

const CustomerDealCard = ({ customer }) => {
      
          

    return (
        <Card style={styles.card}>
        <Card.Content>
     
            <Text style={styles.customerName}>{customer.firstName} {customer.lastName}</Text>

             <View style={styles.detailsContainer}>


             <View style={styles.detailItem}>
                 <Feather name="at-sign" size={20} color="#057ef0" />
                 <Text style={styles.detailText}>{customer.accountId}</Text>
                </View>

                 <View style={styles.detailItem}>
                 <MaterialCommunityIcons name="phone" size={20} color="#057ef0" />
                 <Text style={styles.detailText}>{customer.phoneNumber}</Text>
                </View>



                <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
                    <Text style={styles.detailText}>{customer.district}, {customer.state}</Text>
                </View>

            
             
 

             
            </View>
         



        </Card.Content>

        <Image
    source={{ uri: customer.profilePicture || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }}  // Assuming you have the URL for the property image
    style={styles.propertyImage}
  />

       
    
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
  const handleSearch = () => {
    if (!query.trim()) {
        setFilteredCustomers(customers);

        return;
    }

    const lowercasedQuery = query.toLowerCase();
    console.log("LOAWERc ASE QUERY", lowercasedQuery)
    const results = customers.filter(
        (customer) =>
            customer.accountId.toLowerCase().includes(lowercasedQuery) ||
            `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(lowercasedQuery) ||
            customer.district.toLowerCase().includes(lowercasedQuery) ||
            customer.state.toLowerCase().includes(lowercasedQuery)
    );
    console.log("LOAWERc ASE QUERY", results)


    setFilteredCustomers(results);
 
};

  return (

    <View style={styles.container} >
      
            {loading ? (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ) : (
<>

                                               
                                                  <View style={styles.searchContainer}>
                                                  <TextInput
                    placeholder={getTruncatedPlaceholder("Search By Customer Id, Name, Location...")}
                    style={styles.searchBox}
                    value={query}
                    onChangeText={(text) => {
                      setQuery(text);
                      if (!text) {
                          // If the text is empty, fetch original data
                          setLoading(true);
                          getCustomers();
                       }
                  }}      returnKeyType='search'
                    onSubmitEditing={() => handleSearch()}
                  />
                                                      
                                                  
                                                        
                                                        </View>
                                                
                                                        {  filteredCustomers.length === 0 && (
    <View style={styles.noCustomersContainer}>
        <MaterialIcons name="group-off" size={24} color="#000" />
        <Text style={styles.noCustomersText}>No Customers found</Text>
    </View>
)}

                    {  (
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                                                                        
    <View style={styles.listContainer}>
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CustomerDealCard customer={item} />}
        scrollEnabled={false}
      />
    </View>
  </ScrollView>
                    )}
  </>
            )}
        </View>


   
  );
};

export default AllCustomers;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    
    },
    listContainer: {
      padding: 16,
    },
    card: {
        marginBottom: 10,
        elevation: 4,
        borderRadius: 12,
        paddingBottom:15
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
    loader:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#057ef0',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#ff4747',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#4184AB',
       borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      borderRadius:10,
      marginHorizontal:10,
      marginTop:10
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
    filterButton: {
      padding: 5,
      borderColor:"white",
      borderWidth:1,
      borderRadius:5
    },
    dealClosedText: {
      fontSize: 16,
      color: '#ff0000',  // or any other color for closed deals
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
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
propertyImage: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
    borderRadius: 40, // Optional, to make the image rounded
  },
  noCustomersContainer: {
    flex: 1, // Ensures the container takes the full available space
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
 },

noCustomersText: {
    fontSize: 18,
    color: "#000",
    marginTop: 10,
    textAlign: "center",
    fontFamily:'Montserrat_500Medium'

},

  });