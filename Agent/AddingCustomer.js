import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {Text,ToastAndroid, TextInput,View, StyleSheet, FlatList, ScrollView ,ActivityIndicator, TouchableOpacity} from 'react-native';

function AddingCustomer() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [mandal,setMandal] = useState('')
    const [state,setState] = useState('')
    const [village,setVillage] = useState('')
    const [occupation,setOccupation] = useState('')
    const [pinCode,setPinCode] = useState('')
    const [income,setIncome] = useState('')
    const [budget,setBudget] = useState('')
    const [country,setCountry] = useState('India')

    const [district,setDistrict] = useState('')

      const [errors, setErrors] = useState({});
      const nav = useNavigation()
    
const showToastWithGravityAndOffset = () => {
  ToastAndroid.showWithGravityAndOffset(
    'Customer added Successfully!',
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    25,
    50,
  );
};

    const validateForm = () => {
        const newErrors = {};
        if (!ownerName.trim()) newErrors.ownerName = 'Owner Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const addCustomer=async()=>{
        let data;
        if(email){
              data={
                firstName:firstName,
                lastName:lastName,
                phoneNumber:phoneNumber,
                email:email,
                income:income,
                budget:budget,
                state:state,
                mandal:mandal,
                village:village,
                pinCode:pinCode,
                role:"3",
                occupation:occupation,
                district:district,
                country:country
            }
        }
        if(!email){
              data={
                firstName:firstName,
                lastName:lastName,
                phoneNumber:phoneNumber,
                 income:income,
                budget:budget,
                state:state,
                mandal:mandal,
                village:village,
                pinCode:pinCode,
                role:"3",
                occupation:occupation,
                district:district,
                country:country

            }
        }

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
              console.log("No token found");
              return;
            }
            
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user.userId;
            console.log("USER", data);
            
            const response = await fetch(`http://172.17.15.184:3000/users/createCSR`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
        
             if (response.ok) {
              console.log("RRESPONSE FROM BACK", response.ok)
                 showToastWithGravityAndOffset()
 
              nav.navigate('myCustomers');  // Assuming 'Profile' is the name of the screen
            } else {
              throw new Error('Failed to add customer');
            }
          } catch (error) {
            console.error("Failed to add customer:", error);
            
          }



      }

  return (
    <ScrollView>
<View style={styles.container}>

      <Text style={styles.label1}>
        First Name <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.firstName && styles.inputError]}
        placeholder="Enter first name"
        value={firstName}
        onChangeText={(value) => {
          setFirstName(value);
          setErrors((prev) => ({ ...prev, firstName: '' }));
        }}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <Text style={styles.label1}>
        Last Name <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.lastName && styles.inputError]}
        placeholder="Enter last name"
        value={lastName}
        onChangeText={(value) => {
          setLastName(value);
          setErrors((prev) => ({ ...prev, lastName: '' }));
        }}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <Text style={styles.label1}>
        Email  
      </Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Enter email address"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setErrors((prev) => ({ ...prev, email: '' }));
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label1}>
        Phone Number <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.phoneNumber && styles.inputError]}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={(value) => {
            setPhoneNumber(value);
          setErrors((prev) => ({ ...prev, phoneNumber: '' }));
        }}
      />
      {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

      <Text style={styles.label1}>
        Ocuupation  
      </Text>
      <TextInput
        style={[styles.input, errors.occupation && styles.inputError]}
        placeholder="Enter occupation"
        value={occupation}
        onChangeText={(value) => {
            setOccupation(value);
          setErrors((prev) => ({ ...prev, phoneNumber: '' }));
        }}
      />
      {errors.occupation && <Text style={styles.errorText}>{errors.occupation}</Text>}

      <Text style={styles.label1}>
        Income  
      </Text>
      <TextInput
        style={[styles.input, errors.income && styles.inputError]}
        placeholder="Enter income"
        value={income}
        onChangeText={(value) => {
            setIncome(value);
          setErrors((prev) => ({ ...prev, income: '' }));
        }}
      />
      {errors.income && <Text style={styles.errorText}>{errors.income}</Text>}

      <Text style={styles.label1}>
        Budget  
      </Text>
      <TextInput
        style={[styles.input, errors.budget && styles.inputError]}
        placeholder="Enter budget"
        value={budget}
        onChangeText={(value) => {
            setBudget(value);
          setErrors((prev) => ({ ...prev, budget: '' }));
        }}
      />
      {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
       <Text style={styles.label1}>
        Country  <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.country && styles.inputError]}
        placeholder="Enter country"
        value={country}
        onChangeText={(value) => {
            setCountry(value);
          setErrors((prev) => ({ ...prev, country: '' }));
        }}
      />
      {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

      <Text style={styles.label1}>
        Village <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.village && styles.inputError]}
        placeholder="Enter village"
        value={village}
        onChangeText={(value) => {
            setVillage(value);
          setErrors((prev) => ({ ...prev, village: '' }));
        }}
      />
      {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}

      <Text style={styles.label1}>
        Mandal <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.mandal && styles.inputError]}
        placeholder="Enter mandal"
        value={mandal}
        onChangeText={(value) => {
            setMandal(value);
          setErrors((prev) => ({ ...prev, mandal: '' }));
        }}
      />
      {errors.mandal && <Text style={styles.errorText}>{errors.mandal}</Text>}

      <Text style={styles.label1}>
        District <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.district && styles.inputError]}
        placeholder="Enter district"
        value={district}
        onChangeText={(value) => {
            setDistrict(value);
          setErrors((prev) => ({ ...prev, district: '' }));
        }}
      />
      {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

      <Text style={styles.label1}>
        State <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.state && styles.inputError]}
        placeholder="Enter state"
        value={state}
        onChangeText={(value) => {
            setState(value);
          setErrors((prev) => ({ ...prev, state: '' }));
        }}
      />
      {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

      <Text style={styles.label1}>
        Pincode <Text style={{color:'red'}}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, errors.pinCode && styles.inputError]}
        placeholder="Enter pincode"
        value={pinCode}
        onChangeText={(value) => {
            setPinCode(value);
          setErrors((prev) => ({ ...prev, pinCode: '' }));
        }}
      />
      {errors.pinCode && <Text style={styles.errorText}>{errors.pinCode}</Text>}

</View>

<TouchableOpacity style={{backgroundColor:"#057ef0", padding:10, margin:10, alignItems:'center', borderRadius:10}}
onPress={addCustomer}
>
    <Text style={{fontSize:16, color:"#fff", fontWeight:"bold"}}>Add Customer</Text>
</TouchableOpacity>

</ScrollView>
)
}

export default AddingCustomer

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    label1: {
        marginTop:5,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold",
      },
      input: {
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
      },
      inputError:{

      },
      errorText:{

      },
})