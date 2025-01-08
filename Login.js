import React, { useState, useEffect, useRef } from 'react';

import {jwtDecode} from 'jwt-decode';
import { MaterialIcons } from '@expo/vector-icons'; // Using Material Icons for eye icon

import { useNavigation } from '@react-navigation/native';
import {
 SafeAreaView,
 StyleSheet,
 TextInput,
 View,
 TouchableOpacity,
 Animated,
 Text,
 ImageBackground,
 Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';



// import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function LoginScreen() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [emailVerify, setEmailVerify] = useState(false);
 const [passwordVerify, setPasswordVerify] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const fadeAnim = useRef(new Animated.Value(0)).current;
 const navigation = useNavigation();
 const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility


        const { t  } = useTranslation();
  

const [sub,setSub]=useState(false)
 useEffect(() => {
 Animated.timing(fadeAnim, {
 toValue: 1,
 duration: 1000,
 useNativeDriver: true,
 }).start();
 }, [fadeAnim]);

 const handleEmailChange = (text) => {
 setEmail(text);
 // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z][3]/;
 const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z.-]+\.(com|in|org|co|net))$/;

 // const emailPattern = /^ []/
 setEmailVerify(emailPattern.test(text));
 };

 const handlePasswordChange = (text) => {
 setPassword(text);
 // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]*$/;
 const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,10}$/


 setPasswordVerify(passwordPattern.test(text));
 };

 // Function to store token in AsyncStorage
 const storeToken = async (token) => {
 try {
 await AsyncStorage.setItem('userToken', token); 
 console.log('Token stored successfully');

 } catch (error) {
 console.log('Failed to store token:', error);
 }
 };
 const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle the password visibility
  };
//  const handleSubmit = async() => {
//  console.log(email, password);
//  const userData = {
//  email: email,
//  password: password,
//  };


//  // http://172.17.15.53:3000/login--- chandini's

//  // axios.post("http://172.17.15.184:3000/login", userData)
 
//  // .then( async res => {
//  // console.log("log res",res.data);

//  // if (res.data.success === true && res.data.token) {
 
 
//  // storeToken(res.data.token) 

 
//  // const decoded=jwtDecode( await AsyncStorage.getItem('userToken')
//  // );
//  // const role=decoded.user.role;
//  // const firstName=decoded.user.firstName;//storing the name
//  // AsyncStorage.setItem('firstName',firstName);// Store token
 
 
//  // console.log("role",role);
//  // if(role === 3){
//  // navigation.navigate('Buyer');
//  // }
//  // else if(role === 1){
//  // console.log("In the role 1")
//  // navigation.navigate('Bottom1');
//  // }else if(role === 0){
//  // navigation.navigate("adminhome");
//  // }
//  // else if(role === 5){
//  // navigation.navigate("csr")
//  // }
//  // else {
//  // navigation.navigate('LandingPage');
//  // } 
//  // Alert.alert("Login Successful");


 

//  // } else {
//  // // Handle the response based on the status code and message
//  // if (res.status === 404) {
//  // Alert.alert("User not found. Please register first.");
//  // } else if (res.status === 400) {
//  // Alert.alert("you have entered the wrong password.");
//  // } else {
//  // Alert.alert("Login Failed");
//  // }
//  // }
//  // })

//  // .catch(error => {
//  // console.log("Error:", error);
//  // Alert.alert("An error occurred during login");
//  // });

//  axios.post("http://172.17.15.184:3000/login", userData)
//  .then(async (res) => {
//  console.log("log res", res.data);

//  if (res.data.success === true && res.data.token) {
//  storeToken(res.data.token);

//  const decoded = jwtDecode(await AsyncStorage.getItem('userToken'));
//  const role = decoded.user.role;
//  const firstName = decoded.user.firstName; // Storing the name
//  AsyncStorage.setItem('firstName', firstName); // Store token

//  console.log("role", role);
//  if (role === 3) {
//  navigation.navigate('Buyer');
//  } else if (role === 1) {
//  console.log("In the role 1");
//  navigation.navigate('Bottom1');
//  } else if (role === 0) {
//  navigation.navigate("adminhome");
//  } else if (role === 5) {
//  navigation.navigate("csr");
//  } else {
//  navigation.navigate('LandingPage');
//  }
//  Alert.alert("Login Successful");}
//  // } else {
//  // // Handle the response based on the message received
//  // if (res.status=== 400 && res.data.message === "Invalid credentials") {
//  // Alert.alert("Email is registered, but you have entered the wrong password.");
//  // } else if (res.data.message === "User not found") {
//  // Alert.alert("User not found. Please register first.");
//  // } else {
//  // Alert.alert("Login Failed");
//  // }
//  // }
//  })
//  // .catch((error) => {
//  // console.log("Error:", error);
//  // Alert.alert("An error occurred during login");
//  // });

//  .catch((error) => {
//  console.log("Error:", error); // This will log the full error for debugging

//  // Log the response and status for better insight
//  // if (error.response) {
//  // console.log("Response Error Data:", error.response.data);
//  // console.log("Response Error Status:", error.response.status);
//  // console.log("Response Error Headers:", error.response.headers);
//  // } else if (error.request) {
//  // console.log("Request Error Data:", error.request);
//  // } else {
//  // console.log("Unknown Error:", error.message);
//  // }

//  console.log("Error:", error); // This will log the full error for debugging

//  // Log the response and status for better insight
//  if (error.response) {
//  console.log("Response Error Data:", error.response.data);
//  console.log("Response Error Status:", error.response.status);
//  console.log("Response Error Headers:", error.response.headers);

//  if (error.response.status === 400 && error.response.data.message === "Invalid credentials") {
//  Alert.alert("Email is registered, but you have entered the wrong password.");
//  } else if (error.response.status === 404 && error.response.data.message === "User not found") {
//  Alert.alert("User not found. Please Sing Up first.");
//  } else {
//  Alert.alert("Login Failed");
//  }
//  } else if (error.request) {
//  console.log("Request Error Data:", error.request);
//  } else {
//  console.log("Unknown Error:", error.message);
//  }

//  // Alert.alert("An error occurred during login"); });
//  });


//  };


const resetForm=()=>{
  setEmail("")
  setPassword("")
}

const handleSubmit = async () => {
    console.log(email, password);
    const userData = {
      email: email,
      password: password,
    };

    setIsLoading(true); // Set loading to true when login starts
setSub(true)
    try {
      // Send the login request
      const res = await axios.post(
        "http://172.17.15.184:3000/login",
        userData
      );

      console.log("log res", res.data);

      if (res.data.success === true && res.data.token) {
        storeToken(res.data.token);

        // Decode the token and check the role
        const decoded = jwtDecode(await AsyncStorage.getItem('userToken'));
        const role = decoded.user.role;
        const firstName = decoded.user.firstName;
        AsyncStorage.setItem('firstName', firstName); // Store first name

        console.log("role", role);
        resetForm()
        // Navigate based on role
        if (role === 3) {
          navigation.navigate('Buyer');
        } else if (role === 1) {
          console.log("In the role 1");
          navigation.navigate('Bottom1');
        } else if (role === 0) {
          navigation.navigate("adminhome");
        } else if (role === 5) {
          navigation.navigate("csr");
        } else {
          navigation.navigate('LandingPage');
        }

        Alert.alert("Login Successful");
      } else {
        Alert.alert("Login Failed");
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === "Invalid credentials") {
          Alert.alert("Email is registered, but you have entered the wrong password.");
        } else if (error.response.status === 404 && error.response.data.message === "User not found") {
          Alert.alert("User not found. Please Sign Up first.");
        } else {
          Alert.alert("Login Failed");
        }
      } else if (error.request) {
        console.log("Request Error Data:", error.request);
      } else {
        console.log("Unknown Error:", error.message);
      }
    } finally {
      setIsLoading(false); // Hide the loading spinner when request is complete
    }
  };


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2b96ed" />
      </View>
    );
  }


 return (
 <SafeAreaView style={styles.container}>
 <ImageBackground
 source={{ uri: 'data:image/jpeg;base64,/9j/4AA...' }}
 style={styles.backgroundImage}
 resizeMode="cover"
 >



 
        <>
           
 
 <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
 <Text style={styles.title}>{t("Login")}</Text>
 <View style={styles.inputContainer}>
 <TextInput
 style={styles.input}
 placeholder={t("Enter your Email")}
 placeholderTextColor="#000000"
 value={email}
 onChangeText={handleEmailChange}
 />
 {/* {email.length > 0 && (
 <FontAwesome
 name={emailVerify ? 'check' : 'times'}
 size={20}
 color={emailVerify ? 'green' : 'red'}
 style={styles.icon}
 />
 )} */}
 </View>
 {!emailVerify && email.length > 0 && <Text style={styles.errorText}>Invalid Email</Text>}
 
 <View style={styles.inputContainer}>
 <TextInput
 style={styles.input}
 placeholder={t("Enter your Password")}
 placeholderTextColor="#000000"
 secureTextEntry={!isPasswordVisible}
  value={password}
 onChangeText={handlePasswordChange}
 />

<TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
        <MaterialIcons
          name={isPasswordVisible ? 'visibility-off' : 'visibility'} // Show closed eye if password is visible, open eye otherwise
          size={24}
          color="gray"
        />
      </TouchableOpacity>
 {/* {password.length > 0 && (
 <FontAwesome
 name={passwordVerify ? 'check' : 'times'}
 size={20}
 color={passwordVerify ? 'green' : 'red'}
 style={styles.icon}
 />
 )} */}
 </View>
 {!passwordVerify && password.length > 0 && <Text style={styles.errorText}>Password must include letters, numbers, and symbols</Text>}

 <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
 <Text style={styles.buttonText}>{t("Login")}</Text>
 </TouchableOpacity>

 <View style={styles.signUpContainer}>
 <Text style={styles.footer}>
 {t("Don't have an account?")} {" "}
 <Text style={styles.link} onPress={() => navigation.navigate('RegisterScreen')}>
 {t("Sign Up Now")}
 </Text>
 </Text>
 </View>
 </Animated.View> 
         </>
     
 </ImageBackground>
 </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 link:{
 color:"#00aae7",
 fontWeight:'bold'
 },
 
 signUpContainer: {
 marginTop: 20,
 alignItems: 'center',
 },
 footer: {
 fontSize: 16,
 color: '#6c757d',
 textAlign: 'center',
 marginTop: 20,
 },
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#F3F4F6',
 },
 backgroundImage: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 width: '100%',
 height: '100%',
 },
 formContainer: {
 backgroundColor: 'rgba(255, 255, 255, 0.9)',
 padding: 25,
 borderRadius: 15,
 width: '85%',
 elevation: 5, // Adds shadow on Android
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.2,
 shadowRadius: 5,
 },
 title: {
 fontSize: 26,
 fontWeight: 'bold',
 marginBottom: 25,
 textAlign: 'center',
 color: '#05223F',
 textShadowColor: 'rgba(0, 0, 0, 0.1)',
 textShadowOffset: { width: 1, height: 1 },
 textShadowRadius: 3,
 },
 inputContainer: {
 flexDirection: 'row',
 alignItems: 'center',
 marginBottom: 20,
 borderBottomWidth: 1.5,
 borderBottomColor: '#007BFF',
 paddingBottom: 5,
 },
 input: {
 flex: 1,
 height: 45,
 fontSize: 16,
 color: '#495057',
 },
 icon: {
 marginLeft: 10,
 color: '#007BFF', // Change the color to match the theme
 },
 errorText: {
 color: 'red',
 marginBottom: 10,
 fontSize: 14,
 },
 loginButton: {
 // backgroundColor: '#05223F',
 backgroundColor:'#00aae7',
 
 padding: 15,
 borderRadius: 10,
 alignItems: 'center',
 marginTop: 20,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 3 },
 shadowOpacity: 0.3,
 shadowRadius: 5,
 elevation: 5, // Adds shadow on Android
 },
 buttonText: {
 color: '#FFFFFF',
 fontSize: 18,
 fontWeight: 'bold',
 textTransform: 'uppercase',
 letterSpacing: 1,
 },
 gradientBackground: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 width: '100%',
 height: '100%',
 backgroundColor: 'linear-gradient(135deg, #007BFF, #6610f2)', // Gradient from blue to purple
 },
 linkText: {
 color: '#007BFF',
 fontWeight: '600',
 marginTop: 15,
 },
 eyeIcon: {
    position: 'absolute',
    right: 5,
    top: 20, // Position the eye icon inside the input box
  },
  inputContainer1: {
    flex: 1,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});