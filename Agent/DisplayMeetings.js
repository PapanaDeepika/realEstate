import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
function DisplayMeetings() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false)
    const [role,setRole] =useState()
    const getMeetings = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }
            const tokenData = jwtDecode(token)
           setRole(tokenData.user.role);
            const response = await fetch("http://172.17.15.189:3000/meeting/currentDayMeetings", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.status === 409) {
                setShow(true)
                setLoading(false);
              } 
else{
    setMeetings(data);
    console.log("Fetched properties:", data);
    setLoading(false);
}       
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);
        }
    },[])
   useFocusEffect(
      useCallback(() => {
        getMeetings();
       }, [getMeetings])
    );

    const MeetingCard = ({ meeting }) => {
        console.log("Meeting", meeting.propertyName);
        // const startDate = new Date(meeting.meetingStartTime);
        // const endDate = new Date(meeting.meetingEndTime);
    
        // const formattedDate = startDate.toLocaleDateString(); // Extract date
        // const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract start time
        // const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract end time
    
        const avatarColor = generateAvatarColor(meeting.customerName);
    
        return (
    
            <Card style={styles.card}>
                <Card.Content>
                    {/* Meeting Time */}
                    <Text style={styles.meetingTime}>
                        {new Date(meeting.meetingStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {new Date(meeting.meetingEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
    
    {role === 3 && (
                        <Text style={styles.customerName}>{meeting.agent.firstName} {meeting.agent.lastName}</Text>
    
    )}
    {role === 1 && (
                    <Text style={styles.customerName}>{meeting.customerName}</Text>
    
    )}
    
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
                      { role === 1 && <View style={styles.detailItem}>
                            <FontAwesome5 name="phone-alt" size={20} color="#057ef0" />
                            <Text style={styles.detailText}>{meeting.phoneNumber}</Text>
                        </View>}
                        { role === 3 && <View style={styles.detailItem}>
                            <FontAwesome5 name="phone-alt" size={20} color="#057ef0" />
                            <Text style={styles.detailText}>{meeting.agent.phoneNumber}</Text>
                        </View>}
                        <View style={styles.detailItem}>
                            <Ionicons name="information-circle" size={20} color="#057ef0" />
                            <Text style={styles.detailText}>{meeting.meetingInfo}</Text>
                        </View>
                    </View>
                </Card.Content>
    
                {/* Avatar */}
                <Avatar.Text
                    size={35}
                    label={getCustomerInitials(meeting.customerName)}
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

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ) }
             {show && (
    <View style={styles.noMeetingsContainer}>
        <MaterialIcons name="event-busy" size={30} color="#000" />
        <Text style={styles.noMeetingsText}>No meetings today</Text>
    </View>
)}


{meetings && 
             (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting._id} meeting={meeting} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}





const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        paddingBottom: 15,
        paddingRight: 10,
        marginHorizontal: 10
    },
    customerName: {
        fontSize: 18,
        color: "#333333",
        fontFamily:'Montserrat_500Medium',

    },
    meetingTime: {
        fontSize: 16,
        fontFamily:'Montserrat_700Bold',
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
        fontFamily:'Montserrat_500Medium',

    },
    avatar: {
        position: 'absolute',
        right: 16,
        top: '40%',
        transform: [{ translateY: -24 }], // To center vertically
        fontFamily:'Montserrat_500Medium',

    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    noMeetingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:100,

     },
    noMeetingsText: {
        fontSize: 18,
        color: "#000",
        marginTop: 10, // Add some space between icon and text,
        fontFamily:'Montserrat_500Medium',

    },
    
});

export default DisplayMeetings;
