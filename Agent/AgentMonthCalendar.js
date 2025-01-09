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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function AgentMonthCalendar() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meetDates, setMeetDates] = useState({});
const [appear,setAppear] = useState(true)
    const today=new Date().toISOString().split('T')[0]
    const [selectedDate, setSelectedDate] = useState(today);


    const handlePress =(day)=>{
        setSelectedDate(day.dateString);
        setAppear(false)

    }

    const getAllMeetings = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch("http://172.17.15.184:3000/meeting/getAllScheduledMeetings", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setMeetings(data.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch meetings:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllMeetings();
    }, []);

    useEffect(() => {
        const markedDates = {
            [new Date().toISOString().split('T')[0]]: {
                selected: true,
                selectedColor: '#60b6fc',
                selectedTextColor: '#FFFFFF',
            }
        };

        meetings.forEach((meeting) => {
            const meetingStartDate = meeting.meetingStartTime.split("T")[0];
            markedDates[meetingStartDate] = { marked: true, dotColor: "red" , selectedColor: '#60b6fc',selected:true};
        });

        setMeetDates(markedDates);
    }, [meetings]);

    const getCustomerInitials = (name) => {
        const words = name.split(' ');
        return words.length > 1
            ? words[0][0] + words[1][0]
            : name[0];
    };

    const generateAvatarColor = (name) => {
        if (!name) return "#6200ea";
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = (hash << 5) - hash + name.charCodeAt(i);
        }
        const colors = [
            "rgb(255, 182, 193)",
            "rgb(173, 216, 230)",
            "rgb(144, 238, 144)",
            "rgb(221, 160, 221)",
            "rgb(255, 165, 0)",
            "rgb(255, 182, 193)"
        ];
        return colors[Math.abs(hash) % colors.length];
    };

    const MeetingCard = () => {
        const filteredMeetings = meetings.filter((meeting) =>
            meeting.meetingStartTime.split("T")[0] === selectedDate
        );

        return (
            <View style={styles.container}>
                {filteredMeetings.map((meeting) => (
                    <Card key={meeting._id} style={styles.card}>
                        <Card.Content>
                            <Text style={styles.meetingTime}>
                                {new Date(meeting.meetingStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                                {new Date(meeting.meetingEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <Text style={styles.customerName}>{meeting.customerName}</Text>
                            <View style={styles.detailsContainer}>
                                <View style={styles.detailItem}>
                                    <MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
                                    <Text style={styles.detailText}>{meeting.propertyName}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Entypo name="location-pin" size={20} color="#057ef0" />
                                    <Text style={styles.detailText}>{meeting.location}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <FontAwesome5 name="phone-alt" size={20} color="#057ef0" />
                                    <Text style={styles.detailText}>{meeting.phoneNumber}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Ionicons name="information-circle" size={20} color="#057ef0" />
                                    <Text style={styles.detailText}>{meeting.meetingInfo}</Text>
                                </View>
                            </View>
                        </Card.Content>
                        <Avatar.Text
                            size={35}
                            label={getCustomerInitials(meeting.customerName)}
                            style={[styles.avatar, { backgroundColor: generateAvatarColor(meeting.customerName) }]}
                        />
                    </Card>
                ))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <>
                        {appear?(<Calendar
                        markedDates={meetDates}
                        onDayPress={(day)=>{
                            handlePress(day)
                        }}
                    />):(
                        <>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={styles.calText}>Choose From Calendar</Text>
                            <FontAwesome name="calendar" size={24} color="#057ef0" style={styles.calIcon} onPress={()=>{
                        setAppear(true)
                      }} />
                           {/* <AntDesign name="calendar" size={24} color="black" style={styles.calIcon} onPress={()=>{
                        setAppear(true)
                      }}  /> */}
                      </View>
                      <ScrollView showsVerticalScrollIndicator={false}>
                   
                        <MeetingCard />
                    </ScrollView>
                    </>
            )}
                </>
            )}
        </View>
    );
}

 

export default AgentMonthCalendar

const styles = StyleSheet.create({
    calText:{
fontSize:16,
color:"black",
marginRight:5,
marginBottom:10
    },calIcon:{
marginBottom:10
    },
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
        color: "#333333"
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