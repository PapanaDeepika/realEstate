import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid, Modal } from 'react-native';
import { Provider as PaperProvider, Menu, Button, Divider, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { jwtDecode } from 'jwt-decode';









function MyRequests  ({route})  {


const navigation = useNavigation()

   
   const customer = route.params
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

            const response = await fetch(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/booking/buyerreqs`, {
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

{request.status === 0 && (
                      <View style={styles.buttonContainer}>
                        <Text style={styles.dealAcceptText}>Pending</Text>
                      </View>
                    )}
          
            
        </View>
      );
    };

  return (
    <PaperProvider>
<View style={styles.searchContainer}>
      {/* <Icon name="search" size={24} color="#666" style={styles.searchIcon} /> */}
  
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
        showsVerticalScrollIndicator={false}

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
    fontFamily: "Montserrat_500Medium",

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
    marginHorizontal:10,
    fontFamily: "Montserrat_500Medium",

  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",

  },
  customerName: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: "Montserrat_600SemiBold",

  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: "Montserrat_500Medium",

  },
  infoContainer: {
    fontFamily: "Montserrat_500Medium",

   },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium",

  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",

    color: '#333',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    fontFamily: "Montserrat_500Medium",

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
      marginTop:10,
      fontFamily: "Montserrat_500Medium",

 },
button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#057ef0',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    fontFamily: "Montserrat_500Medium",

 },
closeButton: {
    backgroundColor: '#ff4747',
    fontFamily: "Montserrat_500Medium",

},
buttonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: "Montserrat_600SemiBold",

},
dealClosedText: {
  fontSize: 16,
  color: '#ff0000',  // or any other color for closed deals
  // fontWeight: 'bold',
  fontFamily: "Montserrat_600SemiBold",

  textAlign: 'center',
  marginHorizontal:10,
  
 },

 dealAcceptText: {
    fontSize: 16,
    color: 'green',  // or any other color for closed deals
    // fontWeight: 'bold',
    fontFamily: "Montserrat_600SemiBold",

    textAlign: 'center',
    marginHorizontal:10,
    
   },
 searchIcon: {
  marginLeft: 2,
  marginRight: 5, // Space between icon and text input
  color:"white",    fontFamily: "Montserrat_500Medium",

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
  margin:10,
  fontFamily: "Montserrat_500Medium",

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
  fontFamily: "Montserrat_500Medium",

},
filterButton: {
  padding: 5,
  borderColor:"white",
  borderWidth:1,
  borderRadius:5,
  fontFamily: "Montserrat_500Medium",

},
modalOverlay: {
  flex: 1,
  fontFamily: "Montserrat_500Medium",

  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  fontFamily: "Montserrat_500Medium",

},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  fontFamily: "Montserrat_500Medium",

  marginBottom: 20,
},
headerText: {
  fontSize: 18,
  // fontWeight: 'bold',
  fontFamily: "Montserrat_600SemiBold",

},
closeMark: {
  fontSize: 24,
  // fontWeight: 'bold',
  fontFamily: "Montserrat_600SemiBold",

},
label: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
  fontFamily: "Montserrat_500Medium",

},
radioGroup: {
  flexDirection: 'row',
  marginBottom: 10,
  fontFamily: "Montserrat_500Medium",

},
radioOption: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20,
  fontFamily: "Montserrat_500Medium",

},
radioText: {
  fontSize: 16,
  fontFamily: "Montserrat_500Medium",

},
textInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
  textAlignVertical:'top',
  fontFamily: "Montserrat_500Medium",

},
footer: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  fontFamily: "Montserrat_500Medium",

},
cancelButton: {
  backgroundColor: '#6c757d',
  padding: 10,
  borderRadius: 5,
  marginRight: 10,
  fontFamily: "Montserrat_500Medium",

},
});

export default MyRequests;