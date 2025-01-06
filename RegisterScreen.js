import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [country, setCountry] = useState('');
 const [state, setState] = useState('');
 const [district, setDistrict] = useState('');
 const [pincode, setPincode] = useState('');
 const [city, setCity] = useState('');
 const [mandal, setMandal] = useState('');
 const [role, setRole] = useState('');
 const [emailVerify, setEmailVerify] = useState(true); // Default value is true
 const [passwordVerify, setPasswordVerify] = useState(true); // Default value is true
 const [passwordMatch, setPasswordMatch] = useState(true); // Default value is true


 const navigation=useNavigation();


 // Email pattern: only allows valid domains
 const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z.-]+\.(com|in|org|co|net))$/;

 // Password pattern: minimum 6 and maximum 10 characters, with uppercase, lowercase, digit, and special character
 const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,10}$/;

 const infoMessages = {
 firstName: 'Enter your first name as it appears on official documents.',
 lastName: 'Enter your last name or family name.',
 email: 'Provide a valid email address for communication.',
 phone: 'Enter a 10-digit phone number for contact purposes.',
 password: 'Create a strong password (8+ characters, including letters and numbers).',
 confirmPassword: 'Re-enter the password to confirm it matches.',
 role: 'Select the role that best describes you.',
 country: 'Enter the name of your country.',
 state: 'Specify the state you reside in.',
 district: 'Provide the district where you live.',
 pincode: 'Enter the 6-digit postal code of your area.',
 city: 'Enter the name of your city.',
 mandal: 'Specify the mandal or sub-region of your address.',
 };


 const InfoButton = ({ info }) => (
 <TouchableOpacity style={styles.infoButton}>
 <Text style={styles.infoText}>i</Text>
 <View style={styles.infoTooltip}>
 <Text style={styles.infoTooltipText}>{info}</Text>
 </View>
 </TouchableOpacity>
 );

 const handleRegister = async () => {
 if (password === confirmPassword) {
 // const roleNumber = role === "agent" ? 1 : role === "seller" ? 2 : 3;
 const roleNumber =
 role === "admin"
 ? 0
 : role === "csr"
 ? 5
 : role === "agent"
 ? 1
 : role === "seller"
 ? 2
 : 3; // Default role number (optional)


 try {
 const response = await axios.post('http://172.17.15.184:3000/create', {
 firstName,
 lastName,
 email,
 phoneNumber: phone,
 password,
 country,
 state,
 district,
 pinCode: pincode,
 city,
 mandal,
 role: roleNumber,
 });
 console.log('Registered successfully:', response.data);
 Alert.alert(
 'Registration Successful',
 'You have been registered successfully.',
 [
 {
 text: 'OK',
 onPress: () => navigation.navigate('Login'), // Navigate to login screen
 },
 ]
 );
 } catch (error) {
 if (error.response) {
 console.error('Error registering user:', error.response.data);
 console.error('Error status:', error.response.status);
 } else {
 console.error('Error registering user:', error.message);
 }
 }
 } else {
 console.log('Passwords do not match!');
 }
 };
 // Email validation
 const handleEmailChange = (text) => {
 setEmail(text);
 setEmailVerify(emailPattern.test(text)); // Set emailVerify based on email pattern match
};

// Password validation
const handlePasswordChange = (text) => {
 setPassword(text);
 setPasswordVerify(passwordPattern.test(text)); // Set passwordVerify based on password pattern match
};

// Confirm password validation
const handleConfirmPasswordChange = (text) => {
 setConfirmPassword(text);
 setPasswordMatch(text === password); // Check if the confirm password matches the password
};

 return (
 <ScrollView contentContainerStyle={styles.container}>
 <Text style={styles.header}>Register</Text>



<Text style={styles.inputs}>Enter Your First name </Text>
 <TextInput
 placeholder="First Name"
 value={firstName}
 onChangeText={setFirstName}
 style={styles.input}
 />

 <TextInput
 placeholder="Last Name"
 value={lastName}
 onChangeText={setLastName}
 style={styles.input}
 />

 {/* <TextInput
 placeholder="Email"
 value={email}
 onChangeText={setEmail}
 // onChangeText={handleEmailChange}

 style={styles.input}
 /> */}
 <TextInput
 placeholder="Email"
 value={email}
 onChangeText={handleEmailChange}
 style={styles.input}
 />
 {!emailVerify && email.length > 0 && <Text style={styles.errorText}>Please enter a valid email.</Text>}

 
 <TextInput
 placeholder="Phone Number"
 value={phone}
 onChangeText={setPhone}
 style={styles.input}
 />

 {/* <TextInput
 placeholder="Password"
 value={password}
 onChangeText={setPassword}
 secureTextEntry
 style={styles.input}
 /> */}
 <TextInput
 placeholder="Password"
 value={password}
 onChangeText={handlePasswordChange}
 secureTextEntry
 style={styles.input}
 />
 {!passwordVerify && password.length > 0 && (
 <Text style={styles.errorText}>Password must be 6-10 characters with uppercase, lowercase, digit, and special character.</Text>
 )}

 {/* <TextInput
 placeholder="Confirm Password"
 value={confirmPassword}
 onChangeText={setConfirmPassword}
 secureTextEntry
 style={styles.input}
 /> */}
 <TextInput
 placeholder="Confirm Password"
 value={confirmPassword}
 onChangeText={handleConfirmPasswordChange}
 secureTextEntry
 style={styles.input}
 />
 {!passwordMatch && confirmPassword.length > 0 && (
 <Text style={styles.errorText}>Passwords do not match!</Text>
 )}

 <Text style={styles.label}>Select Role:</Text>
 <Picker
 selectedValue={role}
 onValueChange={(itemValue) => setRole(itemValue)}
 style={styles.input}
 >
 <Picker.Item label="Select a role" value="" />
 <Picker.Item label="Agent" value="agent" />
 <Picker.Item label="Seller" value="seller" />
 <Picker.Item label="Buyer" value="buyer" />
 <Picker.Item label="csr" value="csr"/>
 <Picker.Item label="admin" value="admin"/>

 </Picker>

 <TextInput
 placeholder="Country"
 value={country}
 onChangeText={setCountry}
 style={styles.input}
 />

 <TextInput
 placeholder="State"
 value={state}
 onChangeText={setState}
 style={styles.input}
 />

 <TextInput
 placeholder="District"
 value={district}
 onChangeText={setDistrict}
 style={styles.input}
 />

 <TextInput
 placeholder="Pincode"
 value={pincode}
 onChangeText={setPincode}
 style={styles.input}
 />

 <TextInput
 placeholder="City"
 value={city}
 onChangeText={setCity}
 style={styles.input}
 />

 <TextInput
 placeholder="Mandal"
 value={mandal}
 onChangeText={setMandal}
 style={styles.input}
 />

 <Button title="Register" style={styles.loginbtn}onPress={handleRegister} />
 </ScrollView>
 );
};

const styles = StyleSheet.create({
 errorText:{color:'red'},
 loginbtn:{

 backgroundColor: '#05223F',

 },
 container: {
 padding: 20,
 backgroundColor: '#f9f9f9',
 borderRadius: 10,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.1,
 shadowRadius: 4,
 elevation: 3, // Adds shadow on Android
 margin: 20,
 },
 inputs:{
 fontSize: 13,
 // marginBottom: 20,
 // textAlign: 'center',
 fontWeight: 'bold',
 color: '#05223f',
 // textTransform: 'uppercase',
 // letterSpacing: 1.2,

 },
 header: {
 fontSize: 26,
 marginBottom: 20,
 textAlign: 'center',
 fontWeight: 'bold',
 color: '#05223f',
 textTransform: 'uppercase',
 letterSpacing: 1.2,
 textShadowColor: 'rgba(0, 0, 0, 0.1)',
 textShadowOffset: { width: 1, height: 1 },
 textShadowRadius: 3,
 },
 input: {
 height: 45,
 borderColor: '#007BFF',
 borderWidth: 1.5,
 borderRadius: 8,
 marginBottom: 15,
 paddingHorizontal: 12,
 fontSize: 16,
 backgroundColor: '#fff',
 color: '#333',
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 1 },
 shadowOpacity: 0.1,
 shadowRadius: 2,
 elevation: 2, // Adds shadow on Android
 },
 label: {
 fontSize: 18,
 marginBottom: 10,
 color: '#495057',
 fontWeight: '600',
 },
});

export default RegisterScreen;





