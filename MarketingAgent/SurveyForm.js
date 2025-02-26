import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  FlatList,
  Image
} from "react-native";
import { PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
 import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import * as ImagePicker from 'expo-image-picker';
const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
import * as Location from "expo-location"
import { useNavigation } from "@react-navigation/native"
import LocationPicker from "../LocationPicker"
import Test from "../Agent/testing"
import { RadioButton } from "react-native-paper";
function SurveyForm(){
    const navigation = useNavigation()
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [contactNo, setContactNo] = useState('')
const [whatsapp, setWhatsapp] = useState('')
const [occupation, setOccupation] = useState('')
const [contactStatus, setContactStatus] = useState('')
const [description, setDescription] = useState('')
const [country,setCountry] = useState("India")
const [state, setState] = useState('Andhra Pradesh')
const [village,setVillage] = useState('')
const [district,setDistrict] = useState('')
const [mandal,setMandal] = useState('')
const [pincode, setPincode] = useState('')
const [role, setRole] = useState('')
const [budget, setBudget] = useState('')
    const [errors, setErrors] = useState({});
    const validateForm = () => {
         const newErrors = {};
       
        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!contactNo.trim()) {
            newErrors.contactNo = "Contact Number is required";
        }
          
        if (!contactStatus.trim()) {
            newErrors.contactStatus = "This is required";
        }
    
        if (!pincode.trim()) {
          newErrors.pincode = "Pincode is required";
        }
        if (!country.trim()) {
          newErrors.country = "Country is required";
        }
        if (!state.trim()) {
          newErrors.state = "State is required";
        }
        if (!district.trim()) {
          newErrors.district = "District is required";
        }
        if (!village.trim()) {
          newErrors.village = "Village is required";
        }
        if (!mandal.trim()) {
          newErrors.mandal = "Mandal is required";
        }
        if(contactStatus === '0' && !whatsapp.trim()){
            newErrors.whatsapp = "Whatsapp Number is required";

        }
        if(role === 'buyer' && !budget.trim()){
            newErrors.budget = "Budget is required";

        }
        if(!role.trim()){
            newErrors.role = "Role is required";

        }  
          console.log("NEWWWWW", newErrors)
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
  const handleSubmit = async () => {
    console.log("in the handle sunjvmns")
    try {
      const token = await AsyncStorage.getItem("userToken");  
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;  
      }
       

      console.log("safdhngfmhghj",)
      if (validateForm()) {
        const data = [{
          
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: contactNo,
            pinCode: pincode,
            state: state,
            country: country,
            district: district,
            mandal: mandal,
            village: village,
            occupation:occupation,
            customerRole:role,
            ...(role === 'buyer' && { budget: budget }),
                        description:description,
                        ...(contactStatus === '0' ? { whatsAppNumber:whatsapp } : { whatsAppNumber:contactNo }),
         }];
        console.log(
          "Data being submitted to the API:",
          JSON.stringify(data, "Deepika")
        ); 

        // Send POST request to the API
        const response = await axios.post("http://172.17.15.189:3000/customer/insertSurvey", data, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
            "Content-Type": "application/json",
          },
        });

        // Handle success response
        if (response.status === 200 || response.status === 201) {
          Alert.alert("Success", "Customer details submitted successfully!");
          } else {
          Alert.alert("Error", "submit successfull");
        }
      }
    } catch (error) {
 
      Alert.alert("Error", "Failed to submit data. Please try again.");
      console.error(error.response?.data || error.message); // Log the error
    }
  };

  const handleSoldStatusChange = (value) => {
    setContactStatus(value);
    console.log("dfsgsd", value)
 };
 

return(
      <ScrollView>
          <View style={styles.customcontainer}>
     <Text style={styles.stylingtext}>Survey Form</Text>
     
     </View>
     <View style={styles.container}>
    
              <Text style={styles.label}>
                    First Name <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    
                    
                    placeholder="Enter first name"
                    value={firstName}
                    onChangeText={(value) => {
                      setFirstName(value);
                     }}
                  />
                  {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                  <Text style={styles.label}>
                    Last Name <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}                   
                    placeholder="Enter last name"
                    value={lastName}
                    onChangeText={(value) => {
                      setLastName(value);
                     }}
                  />
                  {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                  <Text style={styles.label}>
                     Email 
                  </Text>
                  <TextInput
                    style={[styles.input, ]}
                
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                     }}
                  />
<Text style={styles.label}>
                    Contact Number <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.contactNo && styles.inputError]}
                    
                    placeholder="Enter contact number"
                    value={contactNo}
                    onChangeText={(value) => {
                      setContactNo(value);
                     }}
                  />
                                    {errors.contactNo && <Text style={styles.errorText}>{errors.contactNo}</Text>}
                                    <Text style={styles.label}>Is this your whatsapp number?</Text>
                <View style={styles.radioGroup}>
            <View style={[styles.radioOption, ]}>
              <RadioButton
                value="1"
                status={contactStatus === '1' ? 'checked' : 'unchecked'}
                onPress={() => handleSoldStatusChange('1')}
                style={[errors.contactStatus && styles.inputError]}
              />
              <Text>Yes</Text>
            </View>
            <View style={[styles.radioOption, ]}>
              <RadioButton
                value="0"
                status={contactStatus === '0' ? 'checked' : 'unchecked'}
                onPress={() => handleSoldStatusChange('0')}
                style={[errors.contactStatus && styles.inputError]}
              />
              <Text>No</Text>
            </View>
           
          </View>
          {errors.contactStatus && <Text style={styles.errorText}>{errors.contactStatus}</Text>}
      {(contactStatus === '0') && (  <> 
      <Text style={styles.label}>
                    Whatsapp Number <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.whatsapp && styles.inputError]}
                    
                    placeholder="Enter whatsapp number"
                    value={whatsapp}
                    onChangeText={(value) => {
                      setWhatsapp(value);
                     }}
                  />
                                    {errors.whatsapp && <Text style={styles.errorText}>{errors.whatsapp}</Text>}
                                    </>)}
<Text style={styles.label}>
                    Occupation
                  </Text>
                  <TextInput
                     style={[styles.input,]}
                    placeholder="Enter Occupation"
                    value={occupation}
                    onChangeText={(value) => {
                      setOccupation(value);
                     }}
                  />  
          <Text style={styles.label}>Country <Text style={{color:'red'}}>*</Text></Text>
          <TextInput
                    style={[styles.input, errors.country && styles.inputError]}
                     placeholder="Enter Country"
                    value={country}
                    onChangeText={(value) => {
                      setCountry(value);
                     }}
                     editable={false}
                  />
                                     {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
                                     <Text style={styles.label}>
                  State <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.title && styles.inputError]}                    
                    placeholder="Enter State"
                    value={state}
                    onChangeText={(value) => {
                      setState(value);
                     }}
                  />
                  {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

<Text style={styles.label}>Pincode <Text style={{color:'red'}}>*</Text></Text>
          <TextInput
                    style={[styles.input, errors.pincode && styles.inputError]}
                     placeholder="Enter pincode"
                    value={pincode}
                    onChangeText={(value) => {
                        setPincode(value);
                       }}
                    
                  />
                                                       {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

  <Text style={styles.label}>District <Text style={{color:'red'}}>*</Text></Text>
          <TextInput
            placeholder="District"
            value={district}
            onChangeText={setDistrict}
            style={[styles.input,  errors.district && styles.inputError]}
             
          />
                                                       {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}
          <Text style={styles.label}>Mandal <Text style={{color:'red'}}>*</Text></Text>
        
          <TextInput
            placeholder="Enter Mandal"
            value={mandal}
            onChangeText={setMandal}
            style={[styles.input,  errors.mandal && styles.inputError]}
             
          />
            {errors.mandal && <Text style={styles.errorText}>{errors.mandal}</Text>}
          <Text style={styles.label}>Village <Text style={{color:'red'}}>*</Text></Text>
          <TextInput placeholder="Enter Village"
            value={village}
            onChangeText={setVillage}
            style={[styles.input,  errors.mandal && styles.inputError]}            
          />
         
          {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}
<Text style={styles.label}>Select a Role</Text>
    <View style={[styles.pickerContainer,errors.role && styles.inputError]}>
          <Picker
    selectedValue={role}
    onValueChange={(selectedValue) => {
        setRole(selectedValue)
    }}          
          >
            <Picker.Item label="Select a role" value="" color="#888" />
            <Picker.Item label="Buyer" value="buyer" />
            <Picker.Item label="Seller" value="seller" />
            <Picker.Item label="Both" value="both" />
             <Picker.Item label="None" value="none" />
          </Picker>
                  </View>
                  {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}                
                  {(role === 'buyer') && (  <>
                   <Text style={styles.label}>
                   Budget <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.budget && styles.inputError]}
                    
                    placeholder="Enter budget"
                    value={budget}
                    onChangeText={(value) => {
                      setBudget(value);
                     }}
                  />
                                    {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
                                    </>)}
                  <Text style={styles.label}>
Comments
                  </Text>
                  <TextInput
                     style={[styles.input,styles.textarea]}
                    placeholder="Comments..."
                    value={description}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(value) => {
                      setDescription(value);
                     }}
                  />
                  <TouchableOpacity style={{backgroundColor:'#4184AB',padding:10, borderRadius:5, alignItems:'center', marginBottom:10 }} onPress={handleSubmit}>
                    <Text style={{fontSize:18, color:'#fff', fontWeight:'bold'}}>Submit</Text>
                  </TouchableOpacity>
</View>         
            </ScrollView>
)

}
export default SurveyForm;

const styles = StyleSheet.create({
      stylingtext: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        },
        customcontainer: {
        padding: 50,
    
        backgroundColor: "#4184AB",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 3,
        },
        input: {
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
          },
          label: {
            fontSize: 16,
            marginRight: 10,
            marginBottom:5,
            fontWeight:'bold'
          },

           container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft:10,
    paddingRight:10,
     backgroundColor: "#fff",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      halfWidth: {
        width: '48%', // Adjusted to avoid overlap
      },
    
      pickerContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        marginBottom: 15,

        
      },
      textarea: {
        textAlignVertical: 'top', // Ensures text starts at the top
        height: 100, // Sets the height for the textarea
      },
      toggleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        },
        inputGroup: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 5,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 15,

          },
          addon: {
            fontSize: 14,
            color: '#333',
            marginLeft: 5,
          },
          inputMedical: {
            flex: 1,
            fontSize: 14,
            padding: 5,
            
          },
          errorText:{
            color:'red',
            fontSize:12,
            marginBottom:5
          },
          inputError:{
            borderColor:'red',
            borderWidth:1   
          },
          radioGroup: {
            flexDirection: 'row',
            marginBottom: 10,
          },
          radioOption: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
          },
})
