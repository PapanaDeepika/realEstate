import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const AgendaWeekCalendar = () => {
    const [items, setItems] = useState({});
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [meetDates, setMeetDates] = useState({});
  
    const fetchMeetings = async () => {
      try {
        setLoading(true); // Start loading
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          setLoading(false);
          return;
        }
  
        const response = await fetch("http://172.17.15.184:3000/meeting/currentWeek", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    useEffect(() => {
      fetchMeetings();
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
        const meetingEndDate = meeting.meetingEndTime.split("T")[0];
  
        markedDates[meetingStartDate] = { marked: true };
        if (meetingStartDate !== meetingEndDate) {
          markedDates[meetingEndDate] = {
            marked: true,
            dotColor: markedDates[meetingEndDate]?.dotColor || "red",
          };
        }
      });
      setMeetDates(markedDates);
      loadItems({ timestamp: new Date(selectedDate).getTime() });
    }, [meetings, selectedDate]);
  
    const loadItems = (day) => {
      const newItems = {};
      const strTime = new Date(day.timestamp).toISOString().split('T')[0];
  
      newItems[strTime] = meetings
        .filter(meeting => new Date(meeting.meetingStartTime).toISOString().split('T')[0] === strTime)
        .map(meeting => ({
          customerName: meeting.customerName,
          meetingInfo: meeting.meetingInfo,
          meetingStartTime: meeting.meetingStartTime,
          meetingEndTime: meeting.meetingEndTime,
          propertyName: meeting.propertyName,
          location: meeting.location,
          cid: meeting.customerId,
          pid: meeting.propertyId,
          aid: meeting.agentId,
          cmail: meeting.customerMail,
          meetId: meeting._id,
          phoneNumber:meeting.phoneNumber,
          height: 100,
        }));
  
      setItems(newItems);
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
    const renderItem = (meeting) => (
      <Card style={styles.card}>
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
          backgroundColor={generateAvatarColor(meeting.customerName)}
          style={[styles.avatar]} // Apply the dynamic background color
        />
      </Card>
    );
  
    const renderEmptyDate = () => (
      <View style={styles.emptyDate}>
        <Text>No events on this day</Text>
      </View>
    );
  
    return (
      loading ? (
        <ActivityIndicator size="large" color="#2b96ed" style={styles.loader} />
      ) : (
        <Agenda
          onDayPress={(day) => {
            console.log("Pressed", day);
            setSelectedDate(day.dateString);
          }}
          items={items}
          selected={selectedDate}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={(r1, r2) => r1.name !== r2.name}
          theme={{
            agendaTodayColor: '#057ef0',
            agendaKnobColor: '#4705f0',
            agendaDayNumColor: "#057ef0",
            agendaDayTextColor: "#057ef0",
            backgroundColor: '#FFFFFF',
            calendarBackground: '#FFFFFF',
            textSectionTitleColor: '#000',
            dayTextColor: '#000000',
            todayTextColor: '#057ef0',
            selectedDayTextColor: '#FFFFFF',
            selectedDayBackgroundColor: '#60b6fc',
            textDisabledColor: '#D9E1E8',
            dotColor: '#057ef0',
            selectedDotColor: 'red',
            arrowColor: '#4705f0',
            monthTextColor: '#4705f0',
          }}
          markedDates={meetDates}
          hideKnob={true}
          style={styles.agendaStyle}
        />
      )
    );
  };
  
  const styles = StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    agendaStyle:{
 
    },
    emptyDate: {
      margin: 10,
      height: "100%",
      backgroundColor: "white",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 10,
    },
    card: {
      marginTop: 10,
      marginBottom:10,
      marginRight:5,
      borderRadius: 10,
      overflow: 'hidden',
      paddingBottom: 15,
      paddingRight: 10,
    },
    customerName: {
      fontSize: 18,
      color: "#333333",
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
    },   avatar: {
        position: 'absolute',
        right: 16,
        top: '40%',
        transform: [{ translateY: -24 }], // To center vertically
      },
  });
  
  export default AgendaWeekCalendar;
  