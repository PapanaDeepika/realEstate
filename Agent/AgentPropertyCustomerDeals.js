import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity,Text, Image,ImageBackground,FlatList, TextInput, Modal } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Title,Paragraph, Menu, IconButton, PaperProvider, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
 import { useFocusEffect, useNavigation } from "@react-navigation/native";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Feather from '@expo/vector-icons/Feather';
import { ToastAndroid } from "react-native";
 

function AgentPropertyCustomerDeals({route}){
 const property = route.params
 

    const navigation=useNavigation()
    const [customers,setCustomers] = useState({})
    const [loading,setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)

    const handleSearch =async()=>{
        console.log("SEARCH QUERY", query)
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

            const response = await fetch(`http://172.17.13.106:3000/deal/searchPropertyDeals/${query}/${property.property.propertyId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if(data.status !== false){
              setCustomers(data.data);
             setLoading(false);
            setSearched(false)

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
      getCustomers();
    }, [getCustomers])
  );
    const getCustomers=useCallback(async()=>{
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch(`http://172.17.13.106:3000/deal/getPropertyDeals/${property.property.propertyId}`, {
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
const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Deal Started Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };
  


  const   startDeal =async( customer)=> {
    console.log("DEAL", customer);
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }
        
         const data={
            dealId: customer.dealId,
            dealStatus:"InProgress"
        }
      
         const response = await fetch(`http://172.17.13.106:3000/deal/startDeal`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
         if (response.ok) {
          console.log("RRESPONSE FROM BACK", response.ok)
          showToastWithGravityAndOffset()
    
      
         } else {
          throw new Error('Failed to start deal');
        }
      } catch (error) {
        console.error("Failed to start deal:", error);
        
      }
    
        }
 
        const scheduleMeet=(property,customer)=>{
          console.log("PROPERTY", property)
          navigation.navigate("scheduleMeet", {deal:property, customer:customer})
              }

const CustomerDealCard = ({ customer }) => {


 

  const [isModalVisible, setModalVisible] = useState(false);
  const [soldStatus, setSoldStatus] = useState(null);
  const [comments, setComments] = useState('');
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const dealClose =async(deal) => {
    console.log("DEALLLL", comments)
    const data1 = {
      dealId:deal.deal?._id,
      comments:comments,
      sellingStatus:soldStatus
    }
    console.log("DATAAAAAAAAAAA", data1)
    try {
    
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }
      const decoded = jwtDecode(token);
      const id = decoded.user.userId;

    

 
      const response = await fetch('http://172.17.13.106:3000/deal/closeDeal', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
      });

      console.log('Response:', response);
      if (response.status === 200) {
        toastForCloseDeal();
        setComments('');
        setSoldStatus(null);

      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }

  }
      
            const [menuVisible, setMenuVisible] = useState(false);
                  const cardBorderColor = customer.dealStatus === "open" ? "orange" : customer.dealStatus === "InProgress" ||  customer.dealStatus === "In Progress" ||  customer.dealStatus === "inProgress"? "green": "red";
                
                  const openMenu = () => {setMenuVisible(true);
                    console.log('IJ THE OPEN MENU METHOD', menuVisible)
                  }
                  const closeMenu = () => {setMenuVisible(false);
                  console.log('IJ THE close MENU METHOD', menuVisible)}

                
                  const handleViewActivity = () => {
                      navigation.navigate("viewActivity", {customer:customer})
                      closeMenu();
                  };
                
                  const handleAddActivity = () => {
                     navigation.navigate("addActivity", {customer:customer})
          
                    closeMenu();
                  };

    return (
      <PaperProvider>

<Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Close Deal</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeMark}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Body */}
            <Text style={styles.label}>Sold</Text>
            <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton
            value="sold"
            status={soldStatus === 'sold' ? 'checked' : 'unchecked'}
            onPress={() => handleSoldStatusChange('sold')}
          />
          <Text>Yes</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="unSold"
            status={soldStatus === 'unSold' ? 'checked' : 'unchecked'}
            onPress={() => handleSoldStatusChange('unSold')}
          />
          <Text>No</Text>
        </View>
       
      </View>

            {/* Comments */}
            <Text style={styles.label}>Comments</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter comments"
              value={comments}
              multiline={true}
              numberOfLines={4}
              onChangeText={setComments}
            />

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={()=>{dealClose(customer)}}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Card style={[styles.card, { borderLeftWidth: 5, borderLeftColor: cardBorderColor }]}>
        <Card.Content style={styles.cardContent}>
     
          <View style={styles.appointmentDetails}>


          <View style={styles.cardHeader}>
          <Title style={styles.buyerName}>{customer.customer.firstName} {customer.customer.lastName}</Title>
          <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
 
                    anchor={
                      <IconButton
                        icon="dots-vertical"
                        size={24}
                        onPress={openMenu}
                      />
                    }
                    style={styles.menu}

                  >
                    <Menu.Item onPress={handleViewActivity} title="View Activity" />
                    <Menu.Item onPress={handleAddActivity} title="Add Activity" />
                  </Menu>
                </View>

            
          

            <View style={styles.detailRow}>
            <Feather name="at-sign" size={20} color="#057ef0" />
            <Text style={styles.detailText}>{customer.customer.accountId || "N/A"}</Text>
            </View>

            <View style={styles.detailRow}>
            <FontAwesome name="phone" size={20} color="#057ef0" />
                          <Text style={styles.detailText}>{customer.customer.phoneNumber}</Text>
            </View>
           
            <View style={[styles.detailRow,{marginLeft:2}]}>
             <FontAwesome name="map-pin" size={20} color="#057ef0" />
                          <Text style={styles.detailText}>{customer.customer.pinCode}</Text>
            </View>
            <View style={styles.detailRow}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#057ef0" />
                          <Text style={styles.detailText}>{customer.customer.district}, {customer.customer.state}</Text>
            </View>
          </View>

        

        </Card.Content>

   <Image
    source={{ uri:  customer.customer.profilePicture || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }} 
    style={styles.propertyImage}
  />
   


   {customer.dealStatus === "open" && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {startDeal( customer)}}>
                      <Text style={styles.buttonText}>Start Deal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={()=>{
                      setModal(true)
                    }}>
                      <Text style={styles.buttonText}>Close Deal</Text>
                    </TouchableOpacity>
                  </View>
                )}
      
                {(customer.dealStatus === "closed" || customer.dealStatus === "Closed") && (
                 <View style={styles.buttonContainer}>
                 <Text style={styles.dealClosedText}>Deal Closed</Text>
             </View>
                )}
      
                {(customer.dealStatus === "In Progress" || customer.dealStatus === "InProgress" || customer.dealStatus === "inProgress") && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => { scheduleMeet( property,customer); }}>
                      <Text style={styles.buttonText}>Schedule Meet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={()=>{
                      setModal(true)
                    }}>
                      <Text style={styles.buttonText}>Close Deal</Text>
                    </TouchableOpacity>
                  </View>
                )}


        {/* {customer.customer.dealStatus === "open" ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => { scheduleMeet(deal, customer); }}>
                                <Text style={styles.buttonText}>Schedule Meet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.closeButton]}>
                                <Text style={styles.buttonText}>Close Deal</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.buttonContainer}>
                            <Text style={styles.dealClosedText}>Deal Closed</Text>
                        </View>
                    )} */}
      </Card>
      </PaperProvider>
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
                          setSearched(false);
                      }
                  }}      returnKeyType='search'
                    onSubmitEditing={() => handleSearch()}
                  />
                                                          <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
                                                            <Icon name="filter" size={30} style={styles.filterButton} />
                                                          </TouchableOpacity>
                                                  
                                                        
                                                        </View>
                                                
                                                        {searched && (
                  <>
                  <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                  <MaterialIcons name="group-off" size={24} color="black" />
                  <Text>No Customers found</Text>
                  </View>
                  </>
              )}
                    {!searched && (
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
                    )}
  </>
            )}
        </View>


   
  );
};

export default AgentPropertyCustomerDeals;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    
    },
    listContainer: {
      padding: 16,
      flex:1
  
    },
    card: {
      marginBottom: 10,
      elevation: 4,
      borderRadius: 12,
     },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appointmentDetails: {
      flex: 1,
      marginLeft: 16,
    },
    buyerName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    detailText: {
      marginLeft: 8,
      fontSize: 14,
      color:"#000"
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
      borderRadius:10
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
    dealClosedText: {
      fontSize: 16,
      color: '#ff0000',  // or any other color for closed deals
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
  },
  propertyImage: {
    position: 'absolute',
    top: 70,
    right: 30,
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
    borderRadius: 40, // Optional, to make the image rounded
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   },
   openButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeMark: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menu: {
    position:"absolute",
    color:"red",
    marginTop:-80
   },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical:'top'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  });