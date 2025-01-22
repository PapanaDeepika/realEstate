 

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
import DropDownPicker from 'react-native-dropdown-picker'; // Import DropDownPicker

const AddActivity = ({ route }) => {
 
 const deal = route.params.deal || route.params.customer
 const agentId = deal?.agent?._id || deal?.agent?._id 
     const dealId = deal?.deal?._id || deal?.dealId

 const param = route.params.deal
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [feedBack, setFeedBack] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'On Call', value: 'On Call' },
    { label: 'One to One', value: 'One to One' }
  ]);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    date: false,
    startTime: false,
    endTime: false,
    location: false,
    activityType: false,
    feedBack:false


  });

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Activity Added Successfully!',
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
      location: !location.trim(),
      activityType: !selectedActivityType,
      feedBack:!feedBack

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
    console.log('Activity Type:', selectedActivityType);
    console.log('Feedback:', feedBack);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }
      const decoded = jwtDecode(token);

      const postData = {
        agentId: agentId,
        comment: feedBack,
        dealingId: dealId,
        location: location,
        endDate: String(endTime),
        startDate: String(startTime),
        activityType: selectedActivityType
      };

      console.log('POST DATA', postData);

      const response = await fetch('http://172.17.13.106:3000/activity/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      console.log('Response:', data);
      if (response.status === 201) {
        showToastWithGravityAndOffset();
        setLocation('');
        setFeedBack('');
        setStartTime(new Date());
        setEndTime(new Date());
        setDate(new Date());
        setSelectedActivityType(null);
      }
    } 
    catch (error) {
      console.error('Failed to add activity:', error);
    }
  };

  
      
   

  const handleLocationChange = (text) => {
    setLocation(text);
    if (text.trim() !== '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        location: false
      }));
    }
    else{
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        location: true
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.label}>
          Select Date <Text style={styles.required}>*</Text>
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

<Text style={styles.label}>
          Activity Type <Text style={styles.required}>*</Text>
        </Text>
        <DropDownPicker
          open={open}
          value={selectedActivityType}
          items={dropdownItems}
          setOpen={setOpen}
          setValue={setSelectedActivityType}
          setItems={setDropdownItems}
           placeholder="Select an activity type"
           zIndex={2000}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          onOpen={() => {}}
          maxHeight={200}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true
          }}
        />
        {formErrors.activityType && (
          <Text style={styles.errorText}>Activity Type is required</Text>
        )}

        <Text style={styles.label}>
          Location <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.textInput,
            formErrors.location ? styles.errorInput : null
          ]}
          placeholder="Enter location"
          value={location}
          onChangeText={handleLocationChange} // Using the new function here
        />
        {formErrors.location && (
          <Text style={styles.errorText}>Location is required</Text>
        )}

        <Text style={styles.label}>Feed Back <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.textInput, { textAlignVertical: 'top' }]}
          placeholder="Enter activity details"
          value={feedBack}
          onChangeText={setFeedBack}
          multiline={true}
          numberOfLines={4}
        />
          {formErrors.feedBack && (
          <Text style={styles.errorText}>Feed Back is required</Text>
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
              Add Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddActivity
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
  },
  dropdown: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  dropdownContainer: {
    borderColor: '#000'
  },
});
