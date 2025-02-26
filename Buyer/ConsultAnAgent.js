import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

const UserProfileScreen = ({ route }) => {
  const navigation = useNavigation()
  console.log("edfghjk", route.params.property);
  const agentDetails = route.params.property;
  console.log("edfghjk",agentDetails.agentId || agentDetails.userId);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setErrors((prev) => ({ ...prev, date: "" }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      setErrors((prev) => ({ ...prev, time: "" }));
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!location.trim()) newErrors.location = "Location is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    

    const requestData = {
      date: date.toISOString().split("T")[0],
      timing: time.toTimeString().split(" ")[0],
      location:location,
      agentId:agentDetails?.userId,
      propertyId:agentDetails?._id,
      propertyType:agentDetails?.propertyType,
    };
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
          console.log("No token found");
          return;
      }

    const decoded = jwtDecode(token)      
      const response = await axios.post("http://172.17.15.189:3000/booking/userbook", requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // Sending token in headers
          "Content-Type": "application/json",
        },
      });
  
      console.log("Data submitted successfully", response.data);
if(response.status === 200 || response.status === 201){
  setDate(null);
  setTime(null);
  setLocation("");
  setErrors({});
  showToastWithGravityAndOffset()
}

    } catch (error) {
      console.error("Error submitting data", error);
    }
  };
  
const showToastWithGravityAndOffset = () => {
  ToastAndroid.showWithGravityAndOffset(
    'Request sent Successfully!',
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    25,
    50,
  );
};
  const handleCancel = () => {
    setDate(null);
    setTime(null);
    setLocation("");
    setErrors({});
    navigation.goBack()
    
  };

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: agentDetails.agentProfilePicture }} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{agentDetails.agentName}</Text>
          <Text style={styles.profileInfo}>Mobile: {agentDetails.agentNumber}</Text>
          <Text style={styles.profileInfo}>City: {agentDetails.agentCity}</Text>
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Date Picker */}
        <Text style={styles.inputLabel}>Select Date <Text style={styles.required}>*</Text></Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.inputContainer, errors.date && styles.inputError]}>
          <Text style={[styles.inputValue, !date && styles.placeholderText]}>
            {date ? date.toDateString() : "Select a date"}
          </Text>
        </TouchableOpacity>
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        {showDatePicker && (
          <DateTimePicker mode="date" value={date || new Date()} display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleDateChange} />
        )}

        {/* Time Picker */}
        <Text style={styles.inputLabel}>Select Time <Text style={styles.required}>*</Text></Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={[styles.inputContainer, errors.time && styles.inputError]}>
          <Text style={[styles.inputValue, !time && styles.placeholderText]}>
            {time ? time.toLocaleTimeString() : "Select a time"}
          </Text>
        </TouchableOpacity>
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        {showTimePicker && (
          <DateTimePicker mode="time" value={time || new Date()} display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleTimeChange} />
        )}

        {/* Location Input */}
        <Text style={styles.inputLabel}>Location <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.textInput, errors.location && styles.inputError]}
          placeholder="Enter location"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            setErrors((prev) => ({ ...prev, location: "" }));
          }}
        />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
      
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  profileContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20, padding: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  profileDetails: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: "700", marginBottom: 5 },
  profileInfo: { fontSize: 16, color: "#555", marginBottom: 3 },
  form: { padding: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 3 },
  inputContainer: { marginBottom: 5, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
  inputLabel: { fontSize: 14, color: "#000", marginBottom: 5, fontWeight:'bold' },
  required: { color: "red" },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom:5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { flex: 1, padding: 10, borderRadius: 5, alignItems: "center", justifyContent: "center", marginHorizontal: 5 },
  submitButton: { backgroundColor: "#057ef0" },
  cancelButton: { backgroundColor: "#f44336" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  textInput: {
    marginBottom: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical:5
  },
});

export default UserProfileScreen;
