import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const MeetingCard = ({ meeting }) => {
    console.log("Meeting", meeting.propertyName);
    const startDate = new Date(meeting.meetingStartTime);
    const endDate = new Date(meeting.meetingEndTime);
  
    const formattedDate = startDate.toLocaleDateString(); // Extract date
    const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract start time
    const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract end time
  
    // Generate avatar color based on customer name
    const avatarColor = generateAvatarColor(meeting.customerName);
  
    return (
 
      <Card style={styles.card}>
        <Card.Content>
          {/* Meeting Time */}
          <Text style={styles.meetingTime}>
            {new Date(meeting.meetingStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
            {new Date(meeting.meetingEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text style={styles.customerName}>{meeting.customerName || "Rohit Sharma"}</Text>
  
          {/* Meeting Details */}
          <View style={styles.detailsContainer}>
            {/* Property Name */}
            <View style={styles.detailItem}>
            <MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />   
                       <Text style={styles.detailText}>{meeting.propertyName}</Text>
            </View>
  
            {/* Meeting Info */}
            <View style={styles.detailItem}>
            <Entypo name="location-pin" size={20} color="#057ef0" />
                          <Text style={styles.detailText}>{meeting.location}</Text>
            </View>
  
            {/* Customer Email */}
            <View style={styles.detailItem}>
            <Ionicons name="information-circle" size={20} color="#057ef0" />
                          <Text style={styles.detailText}>{meeting.meetingInfo}</Text>
            </View>
          </View>
        </Card.Content>
  
        {/* Avatar */}
        <Avatar.Text
          size={35}
          label={getCustomerInitials("Rohit Sharma")}
          style={[styles.avatar, { backgroundColor: avatarColor }]} // Apply the dynamic background color
        />
      </Card>
      
    );
  };
  
const getCustomerInitials = (name) => {
    const words = name.split(' ');
    return words.length > 1
      ? words[0][0] + words[1][0]
      : name[0];
  
    };

    const generateAvatarColor = (name) => {
        if (!name) return "#6200ea"; // Default color if no name is provided
        
        // Simple hash function to generate a value from initials
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
          hash = (hash << 5) - hash + name.charCodeAt(i);
        }
        
        // Generate a value between 0 and 5 for color selection
        const colorIndex = Math.abs(hash) % 6;  // We have 6 colors (red, blue, green, purple, orange, magenta)
        
        // Define pastel colors in red, blue, green, purple, orange, magenta shades
        const colors = [
          "rgb(255, 182, 193)",  // Pastel Red
          "rgb(173, 216, 230)",  // Pastel Blue
          "rgb(144, 238, 144)",  // Pastel Green
          "rgb(221, 160, 221)",  // Pastel Purple
          "rgb(255, 165, 0)",    // Pastel Orange
          "rgb(255, 182, 193)"   // Pastel Magenta (similar to pastel red)
        ];
        
        // Return the selected color based on the hash value
        return colors[colorIndex];
      };
      
      
      
      
  

function DisplayMeetings() {
    const [meetings, setMeetings] = useState();
    const [loading, setLoading] = useState(true);
    const getMeetings =async()=>{
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
              console.log("No token found");
              return;
            }
      
            const response = await fetch("http://172.17.15.184:3000/meeting/currentDayMeetings", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
      
            const data = await response.json();
            
          setMeetings(data);
          console.log("Fetched properties:", data);
          setLoading(false);
          } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);
    
           
          }
    }
    useEffect(() => {
        getMeetings();
        
      }, []);
//   const meetings = [
//     {
//       _id: "6761d88a5810b4e94dd77b10",
//       propertyName: "Sneha Madhuri Jangam",
//       customerMail: "vemulapallidevichsandini@gmail.com",
//       meetingInfo: "Location",
//       meetingStartTime: "2024-12-12T09:30:00.000Z",
//       meetingEndTime: "2024-12-12T11:30:00.000Z",
//       scheduledByName: "John Doe",
//       name:"Deepika Papana"
//     },
//     {
//       _id: "6761d8a35810b4e94dd77b57",
//       propertyName: "Annie",
//       customerMail: "vemulapallidevichandini@gmail.com",
//       meetingInfo: "Meeting",
//       meetingStartTime: "2024-12-27T10:30:00.000Z",
//       meetingEndTime: "2024-12-27T12:30:00.000Z",
//       scheduledByName: "John Doe",
//       name:"Deepika Papana"

//     },
//   ];


  return (
    <View style={styles.container} >
     {loading ? (
        <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
    ) : (
        <ScrollView   showsVerticalScrollIndicator={false}  contentContainerStyle={{ paddingBottom: 40 }} >
          {meetings.map((meeting) => (
            <MeetingCard key={meeting._id} meeting={meeting} />
          ))}
        </ScrollView>
      )}
    </View>
  )}

   
    


const styles = StyleSheet.create({
card: {
      marginBottom: 10,
      borderRadius: 10,
      overflow: 'hidden',
      paddingBottom:15,
      paddingRight:10,
      marginHorizontal:10
    },
    customerName:{
fontSize:18,
color:"#333333"
    },    
    meetingTime: {
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
    avatar: {
      position: 'absolute',
      right: 16,
      top: '40%',
      transform: [{ translateY: -24 }], // To center vertically
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        flex: 1,  
      },
  });

export default DisplayMeetings;
