import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TextInput, ToastAndroid } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card, PaperProvider, Menu, Divider, IconButton, Text } from 'react-native-paper';import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ScheduleMeeting from "./ScheduleMeeting";
import { jwtDecode } from "jwt-decode";
 

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';





function ViewActivity({route}) {
    console.log("DEAL ROUTED", route.params.deal)
    const [modal,setModal] =useState(false)
    const deal = route.params.deal || route.params.customer
const agentId = deal?.agent?._id || deal?.agent?._id 
    const dealId = deal?.deal?._id || deal?.dealId
    
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
 
 



   

    
  const extractDateTime = (s, e) => {
    const dateObj1 = new Date(s);
    const dateObj2 = new Date(e);

    // Format date as 'Jan 16 2025'
    const date = dateObj1.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
    
    // Format time as '22:43:58'
     const displayStartTime = dateObj1.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // 12-hour format
    });
    const displayEndTime = dateObj2.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // 12-hour format
      });
    
    return { date, displayStartTime ,displayEndTime};
  };
     
    const ActivityCard = ({ activity}) => {
        console.log("activity", activity)
        
     
          const { date, displayStartTime,displayEndTime } = extractDateTime(activity.startDate  ,activity.endDate );
      
      

       
     
      
        return (
             <Card style={[styles.card]}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.customerName}>{displayStartTime} - {displayEndTime}</Text>
                  
                </View>
      
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                     <Entypo name="calendar" size={20} color="#057ef0" />
                    <Text style={styles.detailText}>{date}</Text>
                  </View>
      
                  <View style={styles.detailItem}>
                  <Entypo name="location-pin" size={20} color="#057ef0" />
                  <Text style={styles.detailText}>{activity.location}</Text>
                  </View>

                  <View style={styles.detailItem}>
                  <Ionicons name="information-circle" size={20} color="#057ef0" />
                  <Text style={styles.detailText}>{activity.comment}</Text>
                  </View>
      
                  {(activity.activityType === 'One to One' || activity.activityType === 'oneToOne') && (
                    <View style={styles.detailItem}>
                        <FontAwesome6 name="people-arrows" size={20} color="#057ef0" />
                       <Text style={styles.detailText}>{activity.activityType}</Text>
                    </View>
                  )}

{(activity.activityType === 'On Call' || activity.activityType === 'call') && (
                    <View style={styles.detailItem}>
                        <Feather name="phone-call" size={20} color="#057ef0" />
                        <Text style={styles.detailText}>{activity.activityType}</Text>
                    </View>
                  )}
      
       
      
                  
                </View>
       
      
             
             
              </Card.Content>
            </Card>
         );
      };
    

  
     const [activities, setActivities] = useState();
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)

 
    const getActivities = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch(`http://172.17.13.106:3000/activity/activities?agentId=${agentId}&dealingId=${dealId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
console.log("DATAAAAAAAAAAAAAAAAAAAAa",data)
           
            if(response.status === 409){
setSearched(true)
            }
            else {
                setActivities(data.data);
                console.log("Fetched activities:", data.data);
                setLoading(false);
            }

         
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);


        }
    },[]
)


     useFocusEffect(
         useCallback(() => {
            getActivities();
          }, [getActivities])
       );
    
    return (
        <View style={styles.container} >
            {loading  && !searched? (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ) : (

         <>
         
                       
                                                                 {searched && (
                           <>
                           <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                            <MaterialCommunityIcons name="note-off" size={24} color="black" />
                           <Text>No activities found</Text>
                           </View>
                           </>
                       )}

                             {!searched && (
                       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} >
                       {activities.map((activity) => (
                           <ActivityCard key={activity._id} activity={activity} />
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
        marginBottom: 5,
        borderRadius: 10,
          marginHorizontal: 10,
        marginTop:10,
        elevation:4,
       },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:10
       },
      customerName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
     
      detailsContainer: {
       },
      detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      detailText: {
        marginLeft: 10,
      },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
        marginTop: -80, // Adjust this value to fine-tune the position
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
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    
});

export default ViewActivity;