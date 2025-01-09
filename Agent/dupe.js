import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarComponent = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const meetings =  [
    {
        "_id": "6761d88a5810b4e94dd77b10",
        "propertyName": "Sneha Madhuri Jangam",
        "customerMail": "vemulapallidevichsandini@gmail.com",
        "meetingInfo": "Location",
        "meetingStartTime": "2024-12-12T09:30:00.000Z",
        "meetingEndTime": "2024-12-12T11:30:00.000Z",
        "scheduledBy": "673f4ceb4db48b0c88b863cf",
        "agentId": "673f4ceb4db48b0c88b863cf",
        "customerId": "67595cfefc43729f91745306",
        "propertyId": "674490bd5bbb58ca775cc210",
        "createdAt": "2024-12-17T20:01:14.811Z",
        "updatedAt": "2024-12-17T20:01:14.811Z",
        "__v": 0,
        "location": "Bhogapuram, Aparna Hotel",
        "scheduledByName": "John Doe"
    },
    {
        "_id": "6761d8a35810b4e94dd77b57",
        "propertyName": "Annie",
        "customerMail": "vemulapallidevichandini@gmail.com",
        "meetingInfo": "Meeting",
        "meetingStartTime": "2024-12-27T10:30:00.000Z",
        "meetingEndTime": "2024-12-27T12:30:00.000Z",
        "scheduledBy": "673f4ceb4db48b0c88b863cf",
        "agentId": "673f4ceb4db48b0c88b863cf",
        "customerId": "6751b7ca1354f84515cb04d1",
        "propertyId": "673f6ac05d97fa31e42b48a6",
        "createdAt": "2024-12-17T20:01:39.317Z",
        "updatedAt": "2024-12-17T20:01:39.317Z",
        "__v": 0,
        "location": "Kancheru",
        "scheduledByName": "John Doe"
    },
    {
        "_id": "67757e5b48f550ae75e1c344",
        "propertyName": "Annie",
        "customerMail": "vemulapallidevichandini@gmail.com",
        "meetingInfo": "aaaa",
        "meetingStartTime": "2024-12-31T18:33:00.000Z",
        "meetingEndTime": "2024-12-31T18:38:00.000Z",
        "scheduledBy": "673f4ceb4db48b0c88b863cf",
        "agentId": "673f4ceb4db48b0c88b863cf",
        "customerId": "6751b7ca1354f84515cb04d1",
        "propertyId": "673f6ac05d97fa31e42b48a6",
        "createdAt": "2025-01-01T17:41:47.154Z",
        "updatedAt": "2025-01-01T17:41:47.154Z",
        "__v": 0,
        "location": "Thagarapuvalasa",
        "scheduledByName": "John Doe"
    },
    {
        "_id": "677670bdf592b1b3cc5f0fe0",
        "propertyName": "Indira",
        "customerMail": "j@gmail.com",
        "meetingInfo": "Meeting is about to explain details of the property",
        "meetingStartTime": "2025-01-02T12:30:00.000Z",
        "meetingEndTime": "2025-01-02T13:30:00.000Z",
        "scheduledBy": "673f4ceb4db48b0c88b863cf",
        "agentId": "673f4ceb4db48b0c88b863cf",
        "customerId": "6761b5b15773c0e8705d3488",
        "propertyId": "6744962ea25a551221dbf131",
        "createdAt": "2025-01-02T10:55:57.147Z",
        "updatedAt": "2025-01-02T10:55:57.147Z",
        "__v": 0,
        "location": "Srikakulam",
        "scheduledByName": "John Doe"
    },
    {
        "_id": "6776717af592b1b3cc5f1026",
        "propertyName": "Indira",
        "customerMail": "j@gmail.com",
        "meetingInfo": "Regarding payment",
        "meetingStartTime": "2025-01-03T09:30:00.000Z",
        "meetingEndTime": "2025-01-03T11:30:00.000Z",
        "scheduledBy": "673f4ceb4db48b0c88b863cf",
        "agentId": "673f4ceb4db48b0c88b863cf",
        "customerId": "6761b5b15773c0e8705d3488",
        "propertyId": "6744962ea25a551221dbf131",
        "createdAt": "2025-01-02T10:59:06.086Z",
        "updatedAt": "2025-01-02T10:59:06.086Z",
        "__v": 0,
        "location": "Guntur",
        "scheduledByName": "John Doe"
    },
    {
        "_id": "677671a1f592b1b3cc5f1060",
        "propertyName": "Indira",
        "customerMail": "j@gmail.com",
        "meetingInfo": "Payment issues",
        "meetingStartTime": "2025-01-04T08:30:00.000Z",
        "meetingEndTime": "2025-01-04T09:30:00.000Z",
        "scheduledBy": "673f4ceb4db48b0c88b863cf",
        "agentId": "673f4ceb4db48b0c88b863cf",
        "customerId": "6761b5b15773c0e8705d3488",
        "propertyId": "6744962ea25a551221dbf131",
        "createdAt": "2025-01-02T10:59:45.193Z",
        "updatedAt": "2025-01-02T10:59:45.193Z",
        "__v": 0,
        "location": "Hyderabad",
        "scheduledByName": "John Doe"
    }]
  // Prepare marked dates for the calendar
  const markedDates = meetings.reduce((acc, meeting) => {
    const date = meeting.meetingStartTime.split("T")[0];
    acc[date] = { marked: true, dotColor: "blue" }; // Customize the dot color if needed
    return acc;
  }, {});




  const handleDayPress = (day) => {

    const meeting = meetings.find(
      (m) => m.meetingStartTime.split("T")[0] === day.dateString
    );
    if (meeting) {
      setSelectedMeeting(meeting);
      setCalendarVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Calendar Icon */}
      {!isCalendarVisible && (
        <TouchableOpacity
          style={styles.calendarIcon}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.iconText}>📅</Text>
        </TouchableOpacity>
      )}

      {/* Calendar Modal */}
      <Modal visible={isCalendarVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCalendarVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Meeting Info */}
      {selectedMeeting && (
        <View style={styles.meetingDetails}>
          <Text style={styles.meetingText}>Property: {selectedMeeting.propertyName}</Text>
          <Text style={styles.meetingText}>Location: {selectedMeeting.location}</Text>
          <Text style={styles.meetingText}>
            Start Time: {new Date(selectedMeeting.meetingStartTime).toLocaleString()}
          </Text>
          <Text style={styles.meetingText}>
            End Time: {new Date(selectedMeeting.meetingEndTime).toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  calendarIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
  },
  iconText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#f00",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  meetingDetails: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  meetingText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CalendarComponent;
