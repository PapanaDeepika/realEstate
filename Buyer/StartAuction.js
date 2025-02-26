import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ToastAndroid
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

const StartAuction = ({ route }) => {
  const deal = route.params?.deal;
  const customer = route.params?.customer;
  console.log("DEALLLLLLLLLL",deal)
  console.log("CUSTOMERRRRRRRRRR", customer)
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [meetingInfo, setMeetingInfo] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [formErrors, setFormErrors] = useState({
    date: false,
    startTime: false,
    endTime: false,
    location: false
  });

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Meeting Scheduled Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  const handleConfirmDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleConfirmStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };

  const handleConfirmEndTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      date: !date,
      startTime: !startTime,
      endTime: !endTime,
     
    };

    setFormErrors(errors);

    // Check if any field is invalid
    for (let key in errors) {
      if (errors[key]) {
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    console.log('Date:', date);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Location:', location);
    console.log('Meeting Info:', meetingInfo);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }
      const decoded = jwtDecode(token);
      const id = decoded.user.userId;

      const postData = {
        propertyName: deal?.deal?.propertyName || deal?.property?.propertyName,
        customerMail: customer.customer.email || '',
        meetingInfo: meetingInfo,
        meetingStartTime: startTime,
        meetingEndTime: endTime,
        scheduleBy: id,
        agentId: deal?.agent?._id || customer?.agent?._id,
        customerId: customer?.customer?.customerId || customer?.customer?._id,
        location: location,
        propertyId: deal?.property?.propertyId
      };

      console.log('POST DATA', postData);

      const response = await fetch('http://172.17.15.189:3000/meeting/schedule', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      console.log('Response:', data);
      if (data.status) {
        showToastWithGravityAndOffset();
        setLocation('');
        setMeetingInfo('');
        setStartTime(new Date());
        setEndTime(new Date());
        setDate(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.label}>
          Start Date <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={[
            styles.input,
            formErrors.date ? styles.errorInput : null
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleConfirmDate}
          />
        )}
        {formErrors.date && (
          <Text style={styles.errorText}>Date is required</Text>
        )}


        

        <Text style={styles.label}>
          Start Time <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={[
            styles.input,
            formErrors.startTime ? styles.errorInput : null
          ]}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text>{startTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            onChange={handleConfirmStartTime}
          />
        )}
        {formErrors.startTime && (
          <Text style={styles.errorText}>Start Time is required</Text>
        )}

        <Text style={styles.label}>
          End Time <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={[
            styles.input,
            formErrors.endTime ? styles.errorInput : null
          ]}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text>{endTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="default"
            onChange={handleConfirmEndTime}
          />
        )}
        {formErrors.endTime && (
          <Text style={styles.errorText}>End Time is required</Text>
        )}

        
       

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#057ef0', padding: 10, borderRadius: 10 }}
            onPress={handleSubmit}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              Start Auction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    borderRadius: 10,
    padding: 10
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold'
  },
  required: {
    color: 'red'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#000'
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  textArea: {
    height: 80
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 5
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10
  },
  errorInput: {
    borderColor: 'red'
  }
});

export default StartAuction;
