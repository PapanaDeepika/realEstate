import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid, Modal } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { jwtDecode } from 'jwt-decode';
function BuyerRequests  ()  {
       const [requests, setRequests] = useState();
       const [filterData, setFilterData] = useState();
      const [loading, setLoading] = useState(true);
      const [query, setQuery] = useState('')
      const [searched, setSearched] = useState(false)
     
      const getRequests = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch(`http://172.17.15.189:3000/booking/getbookingsbystatus/3/3`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setFilterData(data)
            setRequests(data);
            console.log("Fetched requests:", response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
            setLoading(false);


        }
    },[]
)
const acceptRequest = async (request, mode) => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            console.log("No token found");
            return;
        }

        const response = await fetch(`http://172.17.15.189:3000/booking/updatebookingstatus/${request._id}/${mode}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("RESPONSE FROM BACK", response.ok);

            if (mode === 1) {
                showToastWithGravityAndOffset();
            }
            if (mode === -1) {
                showRejectToastWithGravityAndOffset();
            }

            if(query)
        {    
            // Instead of re-fetching, update the current list
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req._id === request._id ? { ...req, status: mode } : req
                )
            );

            // If search is active, also update the filtered results
            setFilterData((prevFilterData) =>
                prevFilterData.map((req) =>
                    req._id === request._id ? { ...req, status: mode } : req
                )
            );
        }

            // Only fetch data again if no search is active
            if (!query) {
                getRequests();
            }
        } else {
            throw new Error("Failed to update request status");
        }
    } catch (error) {
        console.error("Failed to update request status:", error);
    }
};


     useFocusEffect(
         useCallback(() => {
           getRequests();
          }, [getRequests])
       );
   
       const getTruncatedPlaceholder = (text) => {
        const maxLength = 50; // Maximum characters before truncating
        if (text.length > maxLength) {
          return text.slice(0, maxLength - 3) + '...'; // Truncate and add ellipses
        }
        return text;
      };


      const handleSearch =async()=>{
        console.log("SEARCH QUERY", query)
        setLoading(true)
        if (!query) {
            // If the search query is empty, fetch the original data
            setLoading(true); // Start loading
            await getRequests(); // Fetch original data
            setSearched(false); // Reset searched state
            return;
        }
        const lowercasedQuery = query.toLowerCase();
        console.log("LOWERCASE QUERY", lowercasedQuery);
        setLoading(true)
    
        const results = filterData.filter((req) => {
            return (
                req?.firstName.toLowerCase().includes(lowercasedQuery) || 
                req?.lastName.toLowerCase().includes(lowercasedQuery)
                 
            );
        });
    
        console.log("SEARCH RESULTS", results);
  
        if(results.length === 0){
  setSearched(true)
  setLoading(false)
  
        }
        else{
          setRequests(results);
  setSearched(false)
  setLoading(false)
  
        }
    }

        const showToastWithGravityAndOffset = () => {
            ToastAndroid.showWithGravityAndOffset(
              'Request Accepted Successfully!',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );
          };
  
          const showRejectToastWithGravityAndOffset = () => {
            ToastAndroid.showWithGravityAndOffset(
              'Request Rejected Successfully!',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );
          };
          
          const formatDateTime = (dateString, timeString) => {
            const date = new Date(dateString);
            
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(date);
          
            const [hours, minutes] = timeString.split(":");
            const formattedTime = `${hours}:${minutes}`;
          
            return `${formattedDate}, ${formattedTime}`;
          };

    const RequestCard = ({ request }) => {
      const cardBorderColor = request.status === 1 ? "green" : request.status === 0? "orange": "red";
    return (
        <View style={[styles.card, { borderLeftWidth: 5, borderLeftColor: cardBorderColor }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.customerName}>{request.firstName || "N/A"} {request.lastName || "N/A"}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
              <Feather name="phone" size={20} color="#057ef0" />
              <Text style={styles.infoText}>{request.phoneNumber || "N/A"}</Text>
              </View>
              <View style={styles.infoItem}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#057ef0" />
                    <Text style={styles.infoText}>{formatDateTime(request.date, request.timing) || "N/A"}</Text>
                        </View>
              <View style={styles.infoItem}>
              <MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
              <Text style={styles.infoText}>{request.propertyName || "N/A"}</Text>
              </View>
  <View style={styles.infoItem}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
                    <Text style={styles.infoText}>{request.location || "N/A"}</Text>
                        </View>
            </View>
                          <Image
                          source={{ uri:  
                           request.profilePicture||
                            "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg"  }} 
                          style={styles.profilePic}
                        />
           </View>
          {request.status === -1 && (
                      <View style={styles.buttonContainer}>
                        <Text style={styles.dealClosedText}>Rejected</Text>
                      </View>
                    )}

{request.status === 1 && (
                      <View style={styles.buttonContainer}>
                        <Text style={styles.dealAcceptText}>Accepted</Text>
                      </View>
                    )}
          
                    {(request.status === 0) && (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => { acceptRequest(request, 1) }}>
                          <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => { acceptRequest(request, -1)}}  >
                          <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    )}
        </View>
      );
    };

  return (
    <PaperProvider>
<View style={styles.searchContainer}>
      <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
  
                                                           <TextInput
                             placeholder={getTruncatedPlaceholder("Search By Name...")}
                             style={styles.searchBox}
                             value={query}
                             onChangeText={(text) => {
                               setQuery(text);
                               if (!text) {
                                   // If the text is empty, fetch original data
                                   setLoading(true);
                                   getRequests();
                                   setSearched(false);
                               }
                           }}      returnKeyType='search'
                             onSubmitEditing={() => handleSearch()}
                           />
                                                                 </View>
{loading ? (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ): (
              <>                       
                                                                 {searched && (
                           <>
                           <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                           <MaterialIcons name="group-off" size={24} color="black" />
                           <Text>No Customers found</Text>
                           </View>
                           </>
                       )}
{!searched && (
      <FlatList
        data={requests}
         keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RequestCard key={requests._id} request={item} />}
        contentContainerStyle={styles.container}
      />)}
      </>)}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal:10
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
   },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
      marginTop:10
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
dealClosedText: {
  fontSize: 16,
  color: '#ff0000',  // or any other color for closed deals
  fontWeight: 'bold',
  textAlign: 'center',
  marginHorizontal:10,
  
 },

 dealAcceptText: {
    fontSize: 16,
    color: 'green',  // or any other color for closed deals
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal:10,
    
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
  margin:10
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


});

export default BuyerRequests;