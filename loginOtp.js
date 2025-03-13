
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Animated,StyleSheet,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LoginOtp = () => {
  const [inputValue, setInputValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCheck, setOtpCheck] = useState('');
  const [timer, setTimer] = useState(120);
  const [emailPasswordMode, setEmailPasswordMode] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const validateInput = async () => {
    setIsLoading(true);
    if (inputValue.length === 10 && !isNaN(inputValue)) {
      // Phone number validation
      try {
        const response = await axios.get(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/verifyPhno/${inputValue}`);
        if (response.status === 200) {
          sendOTP();
        }
      } catch (error) {
        Alert.alert('Phone number not registered');
      }
    } else if (inputValue.includes('@')) {
      // Email validation
      try {
        const response = await axios.get(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/verifyEmail/${inputValue}`);
        if (response.status === 200) {
          setEmailPasswordMode(true);
        }
      } catch (error) {
        Alert.alert('Invalid Email Address');
      }
    } else {
      Alert.alert('Invalid Input');
    }
    setIsLoading(false);
  };

  const sendOTP = async () => {
    try {
      await axios.post('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/otp', { phoneNumber: inputValue });
      setOtpSent(true);
      startTimer();
    } catch (error) {
      Alert.alert('Failed to send OTP');
    }
  };

  const startTimer = () => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(countdown);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/verify', {
        phoneNumber: inputValue,
        otp: otpCheck,
      });
      if (response.data.success) {
        handleLoginSuccess(response.data.token);
        // navigation.navigate('')
      } else {
        Alert.alert('Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error verifying OTP');
    }
  };

  const handleLoginSuccess = async (token) => {
    await AsyncStorage.setItem('userToken', token);
    const decoded = jwtDecode(token);
    const role = decoded.user.role;
    const firstName = decoded.user.firstName;
    await AsyncStorage.setItem('firstName', firstName);

    // Navigate based on role
    // switch (role) {
    //   case 3:
    //     navigation.navigate('Buyer');
    //     break;
    //   case 1:
    //     navigation.navigate('Bottom1');
    //     break;
    //   case 0:
    //     navigation.navigate('adminhome');
    //     break;
    //   case 6:
    //     navigation.navigate('marketinghome');
    //     break;
    //   case 5:
    //     navigation.navigate('csr');
    //     break;
    //   default:
    //     navigation.navigate('LandingPage');
    // }
    if (role === 3) {
      navigation.navigate('buyerDrawer');
    } else if (role === 1) {
      console.log("In the role 1");
      navigation.navigate('Bottom1');
    } else if (role === 0) {
      navigation.navigate("adminhome");
    } else if (role === 5) {
      navigation.navigate("csr");
    }
    else if(role===6)
    {
      navigation.navigate("mAgent")
    }
     else {
      navigation.navigate('LandingPage');
    }
ToastAndroid.showWithGravityAndOffset(
  'Login Successful',
  ToastAndroid.LONG,
  ToastAndroid.TOP,
  25,
  50
);
   };

  const handleEmailLogin = async () => {
    const userData = { email: inputValue, password };
    setIsLoading(true);
    try {
      const res = await axios.post('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/login', userData);
      if (res.data.success && res.data.token) {
        handleLoginSuccess(res.data.token);
      } else {
        Alert.alert('Invalid Credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const resendOTP = async () => {
    setOtpCheck('');
    setTimer(120);
    await sendOTP();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2b96ed" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
        <TextInput
          placeholder="Enter phone number or email"
          value={inputValue}
          onChangeText={setInputValue}
          style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
        />
        <TouchableOpacity onPress={validateInput} style={{ marginBottom: 20 }}>
          <Text style={{ color: 'blue' }}>Submit</Text>
        </TouchableOpacity>

        {otpSent && (
          <>
            <TextInput
              placeholder="Enter OTP"
              value={otpCheck}
              onChangeText={setOtpCheck}
              style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
            />
            <Text>{`Time left: ${timer}s`}</Text>
            <TouchableOpacity onPress={verifyOTP}>
              <Text style={{ color: 'blue', marginBottom: 10 }}>Submit OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resendOTP}>
              <Text style={{ color: 'blue' }}>Resend OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {emailPasswordMode && (
          <>
            <TextInput
              placeholder="Enter your Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <MaterialIcons
                name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEmailLogin}>
              <Text style={{ color: 'blue', marginTop: 10 }}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};
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
export default LoginOtp;

