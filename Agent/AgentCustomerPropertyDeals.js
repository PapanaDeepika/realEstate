import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TextInput, ToastAndroid } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, PaperProvider, Menu, Divider, IconButton, Text, RadioButton, Avatar } from 'react-native-paper';import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ScheduleMeeting from "./ScheduleMeeting";
import { jwtDecode } from "jwt-decode";
import { Modal } from "react-native";
import { Image } from "react-native";







function AgentCustomerPropertyDeals({route}) {
    const [modal,setModal] =useState(false)
    
const navigation= useNavigation()
const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Deal Started Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

    const toastForCloseDeal = () => {
      ToastAndroid.showWithGravityAndOffset(
        'Deal Closed Successfully!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    };
 
 


    const scheduleMeet=(deal,customer)=>{
navigation.navigate("scheduleMeet", {deal:deal, customer:customer})
    }

   

  const   startDeal =async(deal, customer)=> {
console.log("DEAL", deal);
try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.log("No token found");
      return;
    }
    
    const decodedToken = jwtDecode(token);
    const data={
        dealId: deal.deal._id,
        dealStatus:"InProgress"
    }
  
     const response = await fetch(`http://172.17.15.189:3000/deal/startDeal`, {
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
    
  
    
     
    const PropertyCard = ({ deal}) => {
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
  
      
  
   
        const response = await fetch('http://172.17.15.189:3000/deal/closeDeal', {
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
        const cardBorderColor = deal.deal.dealStatus === "open" ? "orange" : deal.deal.dealStatus === "InProgress" ||  deal.deal.dealStatus === "In Progress" ||  deal.deal.dealStatus === "inProgress"? "green": "red";
      
        const openMenu = () => setMenuVisible(true);
        const closeMenu = () => setMenuVisible(false);
      
        const handleViewActivity = () => {
            navigation.navigate("viewActivity", {deal:deal})
            closeMenu();
        };
      
        const handleAddActivity = () => {
           navigation.navigate("addActivity", {deal:deal})

          closeMenu();
        };
        const handleSoldStatusChange = (value) => {
          setSoldStatus(value)
       
         
          
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
          <Text style={styles.buyerName}>{deal.deal.propertyName}</Text>
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
                 

                  >
                    <Menu.Item onPress={handleViewActivity} title="View Activity" />
                    <Menu.Item onPress={handleAddActivity} title="Add Activity" />
                      <Menu.Item onPress={handleAddActivity} title="Add Activity" />

                      <Menu.Item onPress={handleAddActivity} title="Add Activity" />

                  </Menu>
                </View>

            
          

            <View style={styles.detailRow}>
            <Feather name="at-sign" size={20} color="#057ef0" />
            <Text style={styles.detailText}>{deal?.property?.propertyId || "PA345"}</Text>
            </View>

            <View style={styles.detailRow}>
            <MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
            <Text style={styles.detailText}>{deal?.deal?.propertyType || "error"}</Text>
            </View>
           
        


            {deal?.deal?.propertyType === 'Layout' && (
                    <View style={[styles.detailRow ]}>
                      <Entypo name="location-pin" size={20} color="#057ef0" />
                      <Text style={styles.detailText}>{deal.property.layoutDetails.address.district}, {deal.property.layoutDetails.address.state}</Text>
                    </View>
                  )}
      
                  {deal?.deal?.propertyType === 'Agricultural land' && (
                    <View style={[styles.detailRow ]}>
                      <Entypo name="location-pin" size={20} color="#057ef0" />
                      <Text style={styles.detailText}>{deal.property?.address?.district}, {deal.property?.address?.state}</Text>
                    </View>
                  )}
      
                  {(deal?.deal?.propertyType === 'Residential' || deal.deal.propertyType === 'residential') && (
                    <View style={[styles.detailRow ]}>
                      <Entypo name="location-pin" size={20} color="#057ef0" />
                      <Text style={styles.detailText}>{deal.property?.address?.district}, {deal.property?.address?.state}</Text>
                    </View>
                  )}
      
                  {deal?.deal?.propertyType === 'Commercial' && (
                    <View style={[styles.detailRow ]}>
                      <Entypo name="location-pin" size={20} color="#057ef0" />
                      <Text style={styles.detailText}>{deal.property?.propertyDetails?.landDetails?.address?.district}, {deal.property?.propertyDetails?.landDetails?.address?.state}</Text>
                    </View>
                  )}

          </View>
      
       

        </Card.Content>




{deal?.deal?.propertyType === 'Layout' && (
                      <Image
                      source={{ uri:    deal.property.images?.[0] ||
                        deal.property.landDetails?.images?.[0] ||
                        deal.property.uploadPics?.[0] ||
                        deal.property.propPhotos?.[0] ||
                        "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg"  }} 
                      style={styles.propertyImage}
                    />
                  )}
      
                  {deal?.deal?.propertyType === 'Agricultural land' && (
                      <Image
                      source={{ uri:   deal.property.images?.[0] ||
                        deal.property.landDetails?.images?.[0] ||
                        deal.property.uploadPics?.[0] ||
                        deal.property.propPhotos?.[0] ||
                        "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"  }} 
                      style={styles.propertyImage}
                    />
                  )}
      
                  {(deal?.deal?.propertyType === 'Residential' || deal.deal.propertyType === 'residential') && (
                      <Image
                      source={{ uri:   deal.property.images?.[0] ||
                        deal.property.landDetails?.images?.[0] ||
                        deal.property.uploadPics?.[0] ||
                        deal.property.propPhotos?.[0] ||
                        "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg" }} 
                      style={styles.propertyImage}
                    />
                  )}
      
                  {deal?.deal?.propertyType === 'Commercial' && (
                      <Image
                      source={{ uri:  
                        deal.property.images?.[0] ||
                        deal.property.landDetails?.images?.[0] ||
                        deal.property.uploadPics?.[0] ||
                        deal.property.propPhotos?.[0] ||
                        "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg"  }} 
                      style={styles.propertyImage}
                    />
                  )}

{deal.deal.dealStatus === "open" && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {startDeal(deal, customer)}}>
                      <Text style={styles.buttonText}>Start Deal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={
                    openModal}>
                      <Text style={styles.buttonText}>Close Deal</Text>
                    </TouchableOpacity>
                  </View>
                )}
      
      {deal.deal.dealStatus === "closed" && (
                  <View style={styles.buttonContainer}>
                    <Text style={styles.dealClosedText}>Deal Closed</Text>
                  </View>
                )}
      
                {(deal.deal.dealStatus === "In Progress" || deal.deal.dealStatus === "InProgress" || deal.deal.dealStatus === "inProgress") && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => { scheduleMeet(deal, customer); }}>
                      <Text style={styles.buttonText}>Schedule Meet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.closeButton]}  onPress={
                    openModal}>
                      <Text style={styles.buttonText}>Close Deal</Text>
                    </TouchableOpacity>
                  </View>
                )}
   


   {/* {customer.dealStatus === "open" && (
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
                )} */}


        
      </Card>
      </PaperProvider>
        );
      };
    

 const customer = route.params
     const [property, setProperty] = useState();
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)

    const handleSearch =async()=>{
        console.log("SEARCH QUERY", query)
        if (!query) {
            // If the search query is empty, fetch the original data
            setLoading(true); // Start loading
            await getDeals(); // Fetch original data
            setSearched(false); // Reset searched state
            return;
        }

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch(`http://172.17.15.189:3000/deal/customerFilter/${query}/${customer.customer.customerId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

              setProperty(data);
            console.log("Fetched searched properties :", data);
            setLoading(false);
            setSearched(false)

 
//             else{
//                 console.log("IN THE ELSE")
// setSearched(true)

//             }
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setLoading(false);


        }

    }
    const getDeals = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch(`http://172.17.15.189:3000/deal/getCustomerDeals/${customer.customer.customerId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setProperty(data);
            console.log("Fetched properties:", data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);


        }
    },[]
)


     useFocusEffect(
         useCallback(() => {
           getDeals();
          }, [getDeals])
       );
       const getTruncatedPlaceholder = (text) => {
        const maxLength = 50; // Maximum characters before truncating
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
                             placeholder={getTruncatedPlaceholder("Search By Property Id, Name, Location, Type...")}
                             style={styles.searchBox}
                             value={query}
                             onChangeText={(text) => {
                               setQuery(text);
                               if (!text) {
                                   // If the text is empty, fetch original data
                                   setLoading(true);
                                   getDeals();
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
                       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} >
                       {property.map((property) => (
                           <PropertyCard key={property._id} deal={property} />
                       ))}
                   </ScrollView>
                             )}
           </>       

            
            )}
        </View>
    )
}





const styles = StyleSheet.create({
    
      card: {
        margin: 10,
        elevation: 4,
        borderRadius: 12,
       },
     
      cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       },
      customerName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
     
      detailsContainer: {
        marginBottom: 10,
       },
      detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      detailText: {
        marginLeft: 5,
      },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        position:"relative"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:10
        
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
      menu: {
        position:"absolute",
        color:"red",
        marginTop:-80
       },
    
    loader:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
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
        marginHorizontal:10,
        marginBottom:10
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
      propertyImage: {
        position: 'absolute',
        top: 50,
        right: 30,
        width: 80, // Adjust size as needed
        height: 80, // Adjust size as needed
        borderRadius: 40, // Optional, to make the image rounded
   
      },
      
});

export default AgentCustomerPropertyDeals;