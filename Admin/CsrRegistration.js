import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, ScrollView, Alert, Button } from 'react-native'
import { Picker } from "@react-native-picker/picker"; 
import { useEffect } from 'react';
import axios from 'axios';
function CsrRegistration() {
  useEffect(() => {


  }, []);
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const [mandal, setMandal] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    country: "",
    state: "",
    pincode: "",
    district: "",
    mandal: "",
    village: "",
    email: "",
    assignedDistrict: "",
    assignedMandal: "",
    role: ""

  });

  const handleSubmit = async () => {
    const { firstName, lastName, email, contact,  } = formData;

    if (!name || !email || !password || !selectedCountry) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const response = await axios.post("    ", formData);

      if (response.status === 200) {
        Alert.alert("Success", "User registered successfully!");
      } else {
        Alert.alert("Error", "Failed to register user. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while registering the user.");
    }
  };
 
  const getMandals = async(district) =>{
    console.log(district)
    // http://172.17.13.106:3000/location/getmandals/Vizianagaram

    try {
      const response = await axios.get(`http://172.17.13.106:3000/location/getmandals/${district}`);

      if (response.status === 200) {
        console.log("RESPONSE", response['data'])
        setMandal(response['data'].mandals)
        console.log("MANDALS", mandal)

      } else {
        console.log("Error")
      }
    } catch (error) {
      console.error(error, `http://172.17.13.106:3000/location/getmandals/${district}`);
      
    }





  }
  return (

    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          value={formData.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          value={formData.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
        />
        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={formData.name}
          onChangeText={(value) => handleChange("email", value)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          value={formData.contact}
          onChangeText={(value) => handleChange("contact", value)}
        />

        <Text style={styles.label}>Select Role</Text>
        <Picker
          selectedValue={formData.role}
           
          onValueChange={(selectedValue) => handleChange("role", selectedValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="CSR" value="csr" />
          <Picker.Item label="Agent" value="agent" />

        </Picker>

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter country"
          value={formData.country}
          onChangeText={(value) => handleChange("country", value)}
        />
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter state"
          value={formData.state}
          onChangeText={(value) => handleChange("state", value)}
        />
        <Text style={styles.label}>District</Text>
        <Picker
          selectedValue={formData.district}
          onValueChange={(selectedValue) => {
            handleChange("district",selectedValue);
            getMandals(selectedValue);
          }}
          
        >
          <Picker.Item label="Select district" value="" />
          <Picker.Item label="Visakhaptanam" value="Visakhapatnam" />
          <Picker.Item label="Vizianagaram" value="Vizianagaram" />
          <Picker.Item label="Srikakulam" value="Srikakulam" />
        </Picker>

        


        <Text style={styles.label}>Mandal</Text>
        <Picker
          selectedValue={formData.mandal}
           onValueChange={(selectedValue) => {
            handleChange("mandal",selectedValue);
            getMandals(selectedValue);
          }}
          
        >
           <Picker.Item label="Select Mandal" value="" />
        {mandal.map((mandal, index) => (
          <Picker.Item key={index} label={mandal.name} value={mandal.name} />
        ))}
          </Picker>
        <TextInput
          style={styles.input}
          placeholder="Enter mandal"
          value={formData.mandal}
          onChangeText={(value) => handleChange("mandal", value)}
        />
        <Text style={styles.label}>Village:</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter village"
          value={formData.village}
          onChangeText={(value) => handleChange("village", value)}
        />

        <Text style={styles.label}>Assign District</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter district"
          value={formData.assignedDistrict}
          onChangeText={(value) => handleChange("assignedDistrict", value)}
        />
        <Text style={styles.label}>Assign Mandal</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter mandal"
          value={formData.assignedMandal}
          onChangeText={(value) => handleChange("assignedMandal", value)}
        />
        <Button title="Register" color="midnightblue"></Button>
        {/* <RNPickerSelect
        onValueChange={(value) => handleChange('selectedCountry', value)}
        value={formData.selectedCountry}
        items={countries} // Populate dropdown with the fetched country list
        style={{
          inputAndroid: styles.input,
          inputIOS: styles.input,
        }}
      /> */}
        {/* try {
    const mockData = [
      { name: 'USA', code: 'usa' },
      { name: 'Canada', code: 'canada' },
      { name: 'UK', code: 'uk' },
      { name: 'India', code: 'india' },
    ];
    setCountries(mockData.map(country => ({
      label: country.name,
      value: country.code,
    })));
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred while fetching country data.');
  } */}

      </ScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "start",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  }
});

export default CsrRegistration