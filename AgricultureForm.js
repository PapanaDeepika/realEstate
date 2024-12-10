// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const AgricultureForm = () => {
//   // State for form fields
//   const [ownerName, setOwnerName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [surveyNumber, setSurveyNumber] = useState('');
//   const [size, setSize] = useState('');
//   const [price, setPrice] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [landType, setLandType] = useState('');
//   const [crops, setCrops] = useState('');
//   const [litigation, setLitigation] = useState(false);
//   const [litigationDesc, setLitigationDesc] = useState('');
//   const [images, setImages] = useState('');
//   const [propertyDesc, setPropertyDesc] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [country, setCountry] = useState('India'); // Default value
//   const [state, setState] = useState('Andhra Pradesh'); // Default value
//   const [district, setDistrict] = useState('');
//   const [mandal, setMandal] = useState('');
//   const [village, setVillage] = useState('');
//   const [boreWell, setBoreWell] = useState(false);
//   const [electricity, setElectricity] = useState(false);
//   const [distanceFromRoad, setDistanceFromRoad] = useState('');
//   const [storageFacility, setStorageFacility] = useState(false);

//   const apiUrl = "http://172.17.15.53:3000/fields/insert";

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     const data = {
//       ownerDetails: {
//         ownerName,
//         phoneNumber: Number(phoneNumber),
//       },
//       landDetails: {
//         title: null, // Assuming this field is optional
//         surveyNumber,
//         size: Number(size),
//         price: Number(price),
//         totalPrice: Number(totalPrice),
//         landType,
//         crops: crops.split(','), // Convert comma-separated string to an array
//         litigation,
//         litigationDesc,
//         images: images.split(','), // Convert comma-separated string to an array
//         propertyDesc,
//       },
//       address: {
//         pinCode,
//         country,
//         state,
//         district,
//         mandal,
//         village,
//       },
//       amenities: {
//         boreWell,
//         electricity,
//         distanceFromRoad,
//         storageFacility,
//       },
//     };

//     try {
//       const response = await axios.post(apiUrl, data);
//       Alert.alert("Success", "Data submitted successfully!");
//       console.log(response.data);
//     } catch (error) {
//       Alert.alert("Error", "Failed to submit data. Please try again.");
//       console.error(error);
//     }
//   };

//   // Custom Checkbox Component
//   const CustomCheckBox = ({ label, value, onValueChange }) => (
//     <TouchableOpacity
//       style={styles.checkboxContainer}
//       onPress={() => onValueChange(!value)}
//     >
//       <View style={value ? styles.checkedBox : styles.uncheckedBox} />
//       <Text style={styles.checkboxLabel}>{label}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Owner Name"
//         value={ownerName}
//         onChangeText={setOwnerName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Survey Number"
//         value={surveyNumber}
//         onChangeText={setSurveyNumber}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Size (in acres)"
//         value={size}
//         onChangeText={setSize}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Price"
//         value={price}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Total Price"
//         value={totalPrice}
//         onChangeText={setTotalPrice}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Land Type"
//         value={landType}
//         onChangeText={setLandType}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Crops (comma-separated)"
//         value={crops}
//         onChangeText={setCrops}
//         style={styles.input}
//       />
//       <CustomCheckBox
//         label="Litigation"
//         value={litigation}
//         onValueChange={setLitigation}
//       />
//       <TextInput
//         placeholder="Litigation Description"
//         value={litigationDesc}
//         onChangeText={setLitigationDesc}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Images (comma-separated URLs)"
//         value={images}
//         onChangeText={setImages}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Property Description"
//         value={propertyDesc}
//         onChangeText={setPropertyDesc}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Pin Code"
//         value={pinCode}
//         onChangeText={setPinCode}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="District"
//         value={district}
//         onChangeText={setDistrict}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Mandal"
//         value={mandal}
//         onChangeText={setMandal}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Village"
//         value={village}
//         onChangeText={setVillage}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Distance from Road"
//         value={distanceFromRoad}
//         onChangeText={setDistanceFromRoad}
//         style={styles.input}
//       />
//       <CustomCheckBox
//         label="Bore Well"
//         value={boreWell}
//         onValueChange={setBoreWell}
//       />
//       <CustomCheckBox
//         label="Electricity"
//         value={electricity}
//         onValueChange={setElectricity}
//       />
//       <CustomCheckBox
//         label="Storage Facility"
//         value={storageFacility}
//         onValueChange={setStorageFacility}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkedBox: {
//     width: 20,
//     height: 20,
//     backgroundColor: 'blue',
//     marginRight: 10,
//   },
//   uncheckedBox: {
//     width: 20,
//     height: 20,
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginRight: 10,
//   },
//   checkboxLabel: {
//     fontSize: 16,
//   },
// });

// export default AgricultureForm;



// --------------

// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity,ScrollView } from 'react-native';
// import axios from 'axios';

// const AgricultureForm = () => {
//   // State for form fields
//   const [ownerName, setOwnerName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [surveyNumber, setSurveyNumber] = useState('');
//   const [size, setSize] = useState('');
//   const [price, setPrice] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [landType, setLandType] = useState('');
//   const [crops, setCrops] = useState(''); // Comma-separated string for crops
//   const [litigation, setLitigation] = useState(false); // Boolean for litigation
//   const [litigationDesc, setLitigationDesc] = useState('');
//   const [images, setImages] = useState(''); // Comma-separated string for image URLs
//   const [propertyDesc, setPropertyDesc] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [country, setCountry] = useState('India'); // Default value for country
//   const [state, setState] = useState('Andhra Pradesh'); // Default value for state
//   const [district, setDistrict] = useState('');
//   const [mandal, setMandal] = useState('');
//   const [village, setVillage] = useState('');
//   const [boreWell, setBoreWell] = useState(false); // Boolean for boreWell
//   const [electricity, setElectricity] = useState(false); // Boolean for electricity
//   const [distanceFromRoad, setDistanceFromRoad] = useState('');
//   const [storageFacility, setStorageFacility] = useState(false); // Boolean for storage facility

//   const apiUrl = "http://172.17.15.53:3000/fields/insert";

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     const data = {
//       ownerDetails: {
//         ownerName,
//         phoneNumber: Number(phoneNumber), // Ensure phone number is treated as a number
//       },
//       landDetails: {
//         title: null, // Assuming this field is optional
//         surveyNumber,
//         size: Number(size), // Convert size to number
//         price: Number(price), // Convert price to number
//         totalPrice: Number(totalPrice), // Convert totalPrice to number
//         landType,
//         crops: crops.split(','), // Convert comma-separated crops to an array
//         litigation,
//         litigationDesc,
//         images: images.split(','), // Convert comma-separated image URLs to an array
//         propertyDesc,
//       },
//       address: {
//         pinCode,
//         country,
//         state,
//         district,
//         mandal,
//         village,
//       },
//       amenities: {
//         boreWell,
//         electricity,
//         distanceFromRoad,
//         storageFacility,
//       },
//     };

//     try {
//       const response = await axios.post(apiUrl, data);
//       Alert.alert("Success", "Data submitted successfully!");
//       console.log(response.data);
//     } catch (error) {
//       Alert.alert("Error", "Failed to submit data. Please try again.");
//       console.error(error);
//     }
//   };

//   // Custom Checkbox Component for reusability in handling boolean fields
//   const CustomCheckBox = ({ label, value, onValueChange }) => (
//     <TouchableOpacity
//       style={styles.checkboxContainer}
//       onPress={() => onValueChange(!value)} // Toggle checkbox value on press
//     >
//       <View style={value ? styles.checkedBox : styles.uncheckedBox} />
//       <Text style={styles.checkboxLabel}>{label}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//     <ScrollView>
//       <TextInput
//         placeholder="Owner Name"
//         value={ownerName}
//         onChangeText={setOwnerName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Survey Number"
//         value={surveyNumber}
//         onChangeText={setSurveyNumber}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Size (in acres)"
//         value={size}
//         onChangeText={setSize}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Price"
//         value={price}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Total Price"
//         value={totalPrice}
//         onChangeText={setTotalPrice}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Land Type"
//         value={landType}
//         onChangeText={setLandType}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Crops (comma-separated)"
//         value={crops}
//         onChangeText={setCrops}
//         style={styles.input}
//       />
//       <CustomCheckBox
//         label="Litigation"
//         value={litigation}
//         onValueChange={setLitigation}
//       />
//       <TextInput
//         placeholder="Litigation Description"
//         value={litigationDesc}
//         onChangeText={setLitigationDesc}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Images (comma-separated URLs)"
//         value={images}
//         onChangeText={setImages}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Property Description"
//         value={propertyDesc}
//         onChangeText={setPropertyDesc}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Pin Code"
//         value={pinCode}
//         onChangeText={setPinCode}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="District"
//         value={district}
//         onChangeText={setDistrict}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Mandal"
//         value={mandal}
//         onChangeText={setMandal}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Village"
//         value={village}
//         onChangeText={setVillage}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Distance from Road"
//         value={distanceFromRoad}
//         onChangeText={setDistanceFromRoad}
//         style={styles.input}
//       />
//       <CustomCheckBox
//         label="Bore Well"
//         value={boreWell}
//         onValueChange={setBoreWell}
//       />
//       <CustomCheckBox
//         label="Electricity"
//         value={electricity}
//         onValueChange={setElectricity}
//       />
//       <CustomCheckBox
//         label="Storage Facility"
//         value={storageFacility}
//         onValueChange={setStorageFacility}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//       </ScrollView>
//     </View>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkedBox: {
//     width: 20,
//     height: 20,
//     backgroundColor: 'blue',
//     marginRight: 10,
//   },
//   uncheckedBox: {
//     width: 20,
//     height: 20,
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginRight: 10,
//   },
//   checkboxLabel: {
//     fontSize: 16,
//   },
// });

// export default AgricultureForm;
// -------------


// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSeedling } from '@fortawesome/free-solid-svg-icons';


// const AgricultureForm = () => {
//   // State for form fields
//   const[title,setTitle]=useState('');
//   const [ownerName, setOwnerName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [surveyNumber, setSurveyNumber] = useState('');
//   const [size, setSize] = useState('');
//   const [price, setPrice] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [landType, setLandType] = useState('');
//   const [crops, setCrops] = useState(''); // Comma-separated string for crops
//   const [litigation, setLitigation] = useState(false); // Boolean for litigation
//   const [litigationDesc, setLitigationDesc] = useState('');
//   const [images, setImages] = useState(''); // Comma-separated string for image URLs
//   const [propertyDesc, setPropertyDesc] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [country, setCountry] = useState('India'); // Default value for country
//   const [state, setState] = useState('Andhra Pradesh'); // Default value for state
//   const [district, setDistrict] = useState('');
//   const [mandal, setMandal] = useState('');
//   const [village, setVillage] = useState('');
//   const [boreWell, setBoreWell] = useState(false); // Boolean for boreWell
//   const [electricity, setElectricity] = useState(false); // Boolean for electricity
//   const [distanceFromRoad, setDistanceFromRoad] = useState('');
//   const [storageFacility, setStorageFacility] = useState(false); // Boolean for storage facility

//   const apiUrl = "http://172.17.15.53:3000/fields/insert";

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     const data = {
//       ownerDetails: {
//         ownerName,
//         // phoneNumber: Number(phoneNumber), // Ensure phone number is treated as a number
//         phoneNumber: String(phoneNumber), // Ensure phone number is treated as a string

//       },
//       landDetails: {
//         // title: null, // Assuming this field is optional
//         title,
//          // Set title as an empty string or any specific string you want

//         surveyNumber,
//         size: Number(size), // Convert size to number
//         price: Number(price), // Convert price to number
//         totalPrice: Number(totalPrice), // Convert totalPrice to number
//         landType,
//         crops: crops.split(','), // Convert comma-separated crops to an array
//         litigation,
//         litigationDesc,
//         images: images.split(','), // Convert comma-separated image URLs to an array
//         propertyDesc,
//       },
//       address: {
//         pinCode,
//         country,
//         state,
//         district,
//         mandal,
//         village,
//       },
//       amenities: {
//         boreWell,
//         electricity,
//         distanceFromRoad,
//         storageFacility,
//       },
//     };

//     try {
//       const token = await AsyncStorage.getItem('userToken'); // Retrieve token from storage
//       if (!token) {
//         Alert.alert("Error", "No token found. Please log in again.");
//         return;
//       }

//       const response = await axios.post(apiUrl, data, {
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the token in headers
//           'Content-Type': 'application/json',
//         },
//       });
      
//       Alert.alert("Success", "Data submitted successfully!");
//       console.log(response.data);
//     } catch (error) {
//       Alert.alert("Error", "Failed to submit data. Please try again.");
//     console.error(error.response?.data || error.message); // Log 
//  }
//   };

//   // Custom Checkbox Component for reusability in handling boolean fields
//   const CustomCheckBox = ({ label, value, onValueChange }) => (
//     <TouchableOpacity
//       style={styles.checkboxContainer}
//       onPress={() => onValueChange(!value)} // Toggle checkbox value on press
//     >
//       <View style={value ? styles.checkedBox : styles.uncheckedBox} />
//       <Text style={styles.checkboxLabel}>{label}</Text>
//     </TouchableOpacity>
//   );

//   return (

//     <>
//     <View style={styles.customcontainer}>
//       <Text style={styles.stylingtext}>Agriculture Details</Text>
//       {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}

//     </View>
//     <View style={styles.container}>
      
//       <ScrollView>
//         <TextInput
//           placeholder="Owner Name"
//           value={ownerName}
//           onChangeText={setOwnerName}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Phone Number"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           // keyboardType="numeric"
//           style={styles.input}
//         />
//         <TextInput
         
//          placeholder='Property Title'
//          value={title}
//          onChangeText={setTitle}
//          style={styles.input}        
//         />
//         <TextInput
//           placeholder="Survey Number"
//           value={surveyNumber}
//           onChangeText={setSurveyNumber}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Size (in acres)"
//           value={size}
//           onChangeText={setSize}
//           keyboardType="numeric"
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Price"
//           value={price}
//           onChangeText={setPrice}
//           keyboardType="numeric"
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Total Price"
//           value={totalPrice}
//           onChangeText={setTotalPrice}
//           keyboardType="numeric"
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Land Type"
//           value={landType}
//           onChangeText={setLandType}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Crops (comma-separated)"
//           value={crops}
//           onChangeText={setCrops}
//           style={styles.input}
//         />
//         <CustomCheckBox
//           label="Litigation"
//           value={litigation}
//           onValueChange={setLitigation}
//         />
//         <TextInput
//           placeholder="Litigation Description"
//           value={litigationDesc}
//           onChangeText={setLitigationDesc}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Images (comma-separated URLs)"
//           value={images}
//           onChangeText={setImages}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Property Description"
//           value={propertyDesc}
//           onChangeText={setPropertyDesc}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Pin Code"
//           value={pinCode}
//           onChangeText={setPinCode}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="District"
//           value={district}
//           onChangeText={setDistrict}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Mandal"
//           value={mandal}
//           onChangeText={setMandal}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Village"
//           value={village}
//           onChangeText={setVillage}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Distance from Road"
//           value={distanceFromRoad}
//           onChangeText={setDistanceFromRoad}
//           style={styles.input}
//         />
//         <CustomCheckBox
//           label="Bore Well"
//           value={boreWell}
//           onValueChange={setBoreWell}
//         />
//         <CustomCheckBox
//           label="Electricity"
//           value={electricity}
//           onValueChange={setElectricity}
//         />
//         <CustomCheckBox
//           label="Storage Facility"
//           value={storageFacility}
//           onValueChange={setStorageFacility}
//         />
//         <Button title="Submit" onPress={handleSubmit} />
//       </ScrollView>
//     </View>
//     </>);
// };

// const styles = StyleSheet.create({
//   stylingtext:{
//     fontSize:25,
//     fontWeight:'bold',
//     color:'white'
//   },
//   customcontainer:{
//     padding:70,
//     paddingTop:60,
//     backgroundColor:'#05223f',
//     borderBottomLeftRadius:100,
//     borderBottomRightRadius:3
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkedBox: {
//     width: 20,
//     height: 20,
//     backgroundColor: 'blue',
//     marginRight: 10,
//   },
//   uncheckedBox: {
//     width: 20,
//     height: 20,
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginRight: 10,
//   },
//   checkboxLabel: {
//     fontSize: 16,
//   },
// });

// export default AgricultureForm;



// ------------



import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Icon, IconButton,MD3Colors } from 'react-native-paper';


const AgricultureForm = () => {
  const [title, setTitle] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [landType, setLandType] = useState('');
  const [crops, setCrops] = useState('');
  const [litigation, setLitigation] = useState(false);
  const [litigationDesc, setLitigationDesc] = useState('');
  const [images, setImages] = useState('');
  const [propertyDesc, setPropertyDesc] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Andhra Pradesh');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');
  const [boreWell, setBoreWell] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [distanceFromRoad, setDistanceFromRoad] = useState('');
  const [storageFacility, setStorageFacility] = useState(false);

  const apiUrl = "http://172.17.15.53:3000/fields/insert";

  const handleSubmit = async () => {
    const data = {
      ownerDetails: {
        ownerName,
        phoneNumber: String(phoneNumber),
      },
      landDetails: {
        title,
        surveyNumber,
        size: Number(size),
        price: Number(price),
        totalPrice: Number(totalPrice),
        landType,
        crops: crops.split(','),
        litigation,
        litigationDesc,
        images: images.split(','),
        propertyDesc,
      },
      address: {
        pinCode,
        country,
        state,
        district,
        mandal,
        village,
      },
      amenities: {
        boreWell,
        electricity,
        distanceFromRoad,
        storageFacility,
      },
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Alert.alert("Success", "Data submitted successfully!");
      console.log(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to submit data. Please try again.");
      console.error(error.response?.data || error.message);
    }
  };

  const CustomCheckBox = ({ label, value, onValueChange }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
    >
      <View style={value ? styles.checkedBox : styles.uncheckedBox} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  

  return (
  
  <>
  
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Agriculture Details</Text>
       
       
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Single Line Inputs */}
          <View style={styles.row}>
            <TextInput placeholder="Owner Name" value={ownerName} onChangeText={setOwnerName} style={styles.input} />
            <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Property Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Land Type" value={landType} onChangeText={setLandType} style={styles.input} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Crops (comma-separated)" value={crops} onChangeText={setCrops} style={styles.input} />
            <TextInput placeholder="Litigation Description" value={litigationDesc} onChangeText={setLitigationDesc} style={styles.input} />
          </View>
          <TextInput placeholder="Survey Number" value={surveyNumber} onChangeText={setSurveyNumber} style={styles.input} />
          <TextInput placeholder="Size (in acres)" value={size} onChangeText={setSize} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Total Price" value={totalPrice} onChangeText={setTotalPrice} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Images (comma-separated URLs)" value={images} onChangeText={setImages} style={styles.input} />
          <TextInput placeholder="Property Description" value={propertyDesc} onChangeText={setPropertyDesc} style={styles.input} />
          <TextInput placeholder="Pin Code" value={pinCode} onChangeText={setPinCode} style={styles.input} />
          <View style={styles.row}>
            <TextInput placeholder="District" value={district} onChangeText={setDistrict} style={styles.input} />
            <TextInput placeholder="Mandal" value={mandal} onChangeText={setMandal} style={styles.input} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Village" value={village} onChangeText={setVillage} style={styles.input} />
            <TextInput placeholder="Distance from Road" value={distanceFromRoad} onChangeText={setDistanceFromRoad} style={styles.input} />
          </View>
          <CustomCheckBox label="Litigation" value={litigation} onValueChange={setLitigation} />
          <CustomCheckBox label="Bore Well" value={boreWell} onValueChange={setBoreWell} />
          <CustomCheckBox label="Electricity" value={electricity} onValueChange={setElectricity} />
          <CustomCheckBox label="Storage Facility" value={storageFacility} onValueChange={setStorageFacility} />
          <Button title="Submit" style={styles.btn} onPress={handleSubmit} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn:{
    backgroundColor: '#05223f',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  stylingtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  customcontainer: {
    padding: 70,
    paddingTop: 60,
    backgroundColor: '#05223f',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 3,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingRight: 0,
    paddingLeft: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Increased margin for more space
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    // Removed shadow properties for clarity
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});



export default AgricultureForm;
