import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
  Image,
  SafeAreaView
  
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
 import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { useCallback } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Title,Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Feather, MaterialIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

function MarketingAgentDeals  () {
   const scrollY = useRef(new Animated.Value(0)).current;


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
          await getDealAssociatedProperties(); // Fetch original data
          setSearched(false); // Reset searched state
          return;
      }

      try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) {
              console.log("No token found");
              return;
          }

          const response = await fetch(`http://172.17.13.106:3000/deal/getDeals?text=${query}`, {
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
 
useFocusEffect(
  useCallback(() => {
      if(!query){
        getCustomers();

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

          const response = await fetch("http://172.17.13.106:3000/deal/getDeals", {
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
navigation.navigate("mCustDeals", {customer:customer})
}

const CustomerDealCard = ({ customer }) => {


  return (
      <Card style={styles.card}>
      <Card.Content>
   
          <Text style={styles.customerName}>{customer.customer.firstName} {customer.customer.lastName}</Text>

           <View style={styles.detailsContainer}>


           <View style={styles.detailItem}>
               <Feather name="at-sign" size={20} color="#057ef0" />
               <Text style={styles.detailText}>{customer.customer.accountId}</Text>
              </View>

               <View style={styles.detailItem}>
               <MaterialCommunityIcons name="phone" size={20} color="#057ef0" />
               <Text style={styles.detailText}>{customer.customer.phoneNumber}</Text>
              </View>

              <View style={styles.detailItem}>
               <MaterialCommunityIcons name="email" size={20} color="#057ef0" />
               <Text style={styles.detailText}>{customer.customer.email}</Text>
              </View>



              <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#057ef0" />
                  <Text style={styles.detailText}>{customer.customer.district}, {customer.customer.state}</Text>
              </View>

          
           


           
          </View>
       



      </Card.Content>

      <Image
  source={{ uri: customer.profilePicture || "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg"  }}  // Assuming you have the URL for the property image
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
  const maxLength = 70  ; // Maximum characters before truncating
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + '...'; // Truncate and add ellipses
  }
  return text;
};


  // Button width animation (expands and shrinks)
  const buttonWidth = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [150, 60], // Expand when not scrolling, shrink when scrolling
    extrapolate: 'clamp',
  });

  // Text opacity animation (fades out)
  const buttonTextOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [50, 0], // Fully visible when not scrolling, hidden when scrolling
    extrapolate: 'clamp',
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item}</Text>
    </View>
  );

  return (
<SafeAreaView style={styles.container}>

{loading ? (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ) :
             (
                <>
                                                <View style={styles.searchContainer}>
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
                                                        {customers.length === 0 && (
                  <>
                  <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                  <MaterialIcons name="group-off" size={24} color="black" />
                  <Text>No Properties found</Text>
                  </View>
                  </>
              )}

              
              {!searched && (
                  <View style={styles.listContainer}>
                 <Animated.FlatList data={customers}
 

        renderItem={({ item }) => <CustomerDealCard customer={item} />}
                keyExtractor={(item, index) => index.toString()}
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

              </>

     





  )
}
</SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop:10,
        paddingHorizontal:10,
        paddingBottom:60
      },
      listContainer: {
 
    
        },
      card: {
        marginBottom: 15,
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
          fontWeight:"bold"
      },
      dealTime: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 8,
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
          width:"100%"
        },
        searchBox: {
          flex: 1,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#f0f0f0",
          paddingHorizontal: 15,
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
    elevation: 5, // Add shadow for a floating effect
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
});

export default MarketingAgentDeals;
