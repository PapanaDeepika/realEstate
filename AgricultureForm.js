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
// const AgricultureForm = () => {
//   const [title, setTitle] = useState('');
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
//   const [country, setCountry] = useState('India');
//   const [state, setState] = useState('Andhra Pradesh');
//   const [district, setDistrict] = useState('');
//   const [mandal, setMandal] = useState('');
//   const [village, setVillage] = useState('');

//   const [districtOptions, setDistrictOptions] = useState([]);
//   const [mandalOptions, setMandalOptions] = useState([]);
//   const [villageOptions, setVillageOptions] = useState([]);

//   const [boreWell, setBoreWell] = useState(false);
//   const [electricity, setElectricity] = useState(false);
//   const [distanceFromRoad, setDistanceFromRoad] = useState('');
//   const [storageFacility, setStorageFacility] = useState(false);
//   const [sizeUnit, setSizeUnit] = useState('acres'); // Land size unit
//   const [priceUnit, setPriceUnit] = useState('/acre'); // Price unit

//   const apiUrl = "http://172.17.15.184:3000/fields/insert";

//    // Utility function for unit conversion and total price calculation
//    const calculateTotalPrice = () => {
//     let sizeInAcres = parseFloat(size);
//     let pricePerAcre = parseFloat(price);

//     // Convert size to acres if necessary
//     if (sizeUnit === 'sq.ft') sizeInAcres /= 43560;
//     else if (sizeUnit === 'sq.yards') sizeInAcres /= 4840;
//     else if (sizeUnit === 'sq.m') sizeInAcres /= 4046.86;
//     else if (sizeUnit === 'cents') sizeInAcres /= 100;

//     // Adjust price per acre if necessary
//     if (priceUnit === '/sq.ft') pricePerAcre *= 43560;
//     else if (priceUnit === '/sq.yard') pricePerAcre *= 4840;
//     else if (priceUnit === '/sq.m') pricePerAcre *= 4046.86;
//     else if (priceUnit === '/cent') pricePerAcre *= 100;

//     if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
//       setTotalPrice((sizeInAcres * pricePerAcre).toFixed(2));
//     } else {
//       setTotalPrice('');
//     }
//   };

//   // Recalculate totalPrice when dependencies change
//   useEffect(() => {
//     calculateTotalPrice();
//   }, [size, price, sizeUnit, priceUnit]);

//   // Fetch district based on pin code
//   useEffect(() => {
//     if (pinCode.length === 6) {
//       const fetchDistricts = async () => {
//         try {
//           const response = await axios.get(`http://172.17.15.184:3000/location/getlocationbypincode/${pinCode}`);
//           const districtList = response.data.districts || [];
//           setDistrictOptions(districtList);
//         } catch (error) {
//           console.error("Error fetching districts:", error);
//         }
//       };
//       fetchDistricts();
//     }
//   }, [pinCode]);

//   // Fetch mandals based on selected district
//   useEffect(() => {
//     if (district) {
//       const fetchMandals = async () => {
//         try {
//           const response = await axios.get(`http://172.17.15.184:3000/location/getmandals/${district}`);
//             console.log('District:', req.params.district);

//           const mandalList = response.data.mandals || [];
//           setMandalOptions(mandalList);
//         } catch (error) {
//           console.error("Error fetching mandals:", error);
//         }
//       };
//       fetchMandals();
//     }
//   }, [district]);

//   // Fetch villages based on selected mandal
//   useEffect(() => {
//     if (mandal) {
//       const fetchVillages = async () => {
//         try {
//           const response = await axios.get(`http://172.17.15.184:3000/location/getvillagesbymandal/${mandal}`);
//           const villageList = response.data.villages || [];
//           setVillageOptions(villageList);
//         } catch (error) {
//           console.error("Error fetching villages:", error);
//         }
//       };
//       fetchVillages();
//     }
//   }, [mandal]);

//   const handleSubmit = async () => {
//     const data = {
//       ownerDetails: {
//         ownerName,
//         phoneNumber: String(phoneNumber),
//       },
//       landDetails: {
//         title,
//         surveyNumber,
//         size: Number(size),
//         sizeUnit, // Add sizeUnit here

//         price: Number(price),
//         priceUnit, // Add priceUnit here

//         totalPrice: Number(totalPrice),
//         landType,
//         crops: crops.split(','),
//         litigation,
//         litigationDesc,
//         images: images.split(','),
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
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         Alert.alert("Error", "No token found. Please log in again.");
//         return;
//       }

//       const response = await axios.post(apiUrl, data, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       Alert.alert("Success", "Data submitted successfully!");
//       console.log(response.data);
//     } catch (error) {
//       Alert.alert("Error", "Failed to submit data. Please try again.");
//       console.error(error.response?.data || error.message);
//     }
//   };

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

//   <>

//       <View style={styles.customcontainer}>
//         <Text style={styles.stylingtext}>Agriculture Details</Text>

//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>

//       <View style={styles.container}>
//           {/* Single Line Inputs */}
//           <View style={styles.row}>
//             <TextInput placeholder="Owner Name" value={ownerName} onChangeText={setOwnerName} style={styles.input} />
//             <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
//           </View>
//           <View style={styles.row}>
//             <TextInput placeholder="Property Title" value={title} onChangeText={setTitle} style={styles.input} />
//             <TextInput placeholder="Land Type" value={landType} onChangeText={setLandType} style={styles.input} />
//           </View>
//           <View style={styles.row}>
//             <TextInput placeholder="Crops (comma-separated)" value={crops} onChangeText={setCrops} style={styles.input} />
//             <TextInput placeholder="Litigation Description" value={litigationDesc} onChangeText={setLitigationDesc} style={styles.input} />
//           </View>
//           <TextInput placeholder="Survey Number" value={surveyNumber} onChangeText={setSurveyNumber} style={styles.input} />
//           {/* <View style={styles.inputGroup}>
//           <TextInput placeholder="Size (in acres)" value={size} onChangeText={setSize} keyboardType="numeric" style={styles.input} />
//           <Picker
//             selectedValue={sizeUnit}
//             style={styles.picker}
//             onValueChange={(itemValue) => setSizeUnit(itemValue)}
//           >
//             <Picker.Item label="Acres" value="acres" />
//             <Picker.Item label="Sq. Ft" value="sq.ft" />
//             <Picker.Item label="Sq. Yards" value="sq.yards" />
//             <Picker.Item label="Sq. M" value="sq.m" />
//             <Picker.Item label="Cents" value="cents" />
//           </Picker></View>
//           <View style={styles.inputGroup}>
//           <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
//           <Picker
//             selectedValue={priceUnit}
//             style={styles.picker}
//             onValueChange={(itemValue) => setPriceUnit(itemValue)}
//           >
//             <Picker.Item label="/acre" value="/acre" />
//             <Picker.Item label="/sq.ft" value="/sq.ft" />
//             <Picker.Item label="/sq.yard" value="/sq.yard" />
//             <Picker.Item label="/sq.m" value="/sq.m" />
//             <Picker.Item label="/cent" value="/cent" />
//           </Picker></View>
//           <TextInput placeholder="Total Price" value={totalPrice} onChangeText={setTotalPrice} keyboardType="numeric" style={styles.input} /> */}

//       {/* Price and Unit */}
//       <View style={styles.inputGroup}>
//           <TextInput placeholder="Size (in acres)" value={size} onChangeText={setSize} keyboardType="numeric" style={styles.input} />
//           <Picker
//             selectedValue={sizeUnit}
//             style={styles.picker}
//             onValueChange={(itemValue) => setSizeUnit(itemValue)}
//           >
//             <Picker.Item label="Acres" value="acres" />
//             <Picker.Item label="Sq. Ft" value="sq.ft" />
//             <Picker.Item label="Sq. Yards" value="sq.yards" />
//             <Picker.Item label="Sq. M" value="sq.m" />
//             <Picker.Item label="Cents" value="cents" />
//           </Picker></View>
//       <View style={styles.inputGroup}>
//             <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
//             <Picker selectedValue={priceUnit} style={styles.picker} onValueChange={setPriceUnit}>
//               <Picker.Item label="/acre" value="/acre" />
//               <Picker.Item label="/sq.ft" value="/sq.ft" />
//               <Picker.Item label="/sq.yard" value="/sq.yard" />
//               <Picker.Item label="/sq.m" value="/sq.m" />
//               <Picker.Item label="/cent" value="/cent" />
//             </Picker>
//           </View>

//           {/* Total Price with Unit */}
//           <Text >Total Price</Text>
//           <TextInput  placeholder="Total Price" value={`${totalPrice} ${priceUnit}`} editable={false} style={styles.input} />
//           <TextInput placeholder="Images (comma-separated URLs)" value={images} onChangeText={setImages} style={styles.input} />
//           <TextInput placeholder="Property Description" value={propertyDesc} onChangeText={setPropertyDesc} style={styles.input} />
//           <TextInput placeholder="Pin Code" value={pinCode} onChangeText={setPinCode} style={styles.input} />
//           {/* <View style={styles.row}>
//             <TextInput placeholder="District" value={district} onChangeText={setDistrict} style={styles.input} />
//             <TextInput placeholder="Mandal" value={mandal} onChangeText={setMandal} style={styles.input} />
//           </View>
//           <View style={styles.row}>
//             <TextInput placeholder="Village" value={village} onChangeText={setVillage} style={styles.input} /> */}
//              {/* District Dropdown */}
//         <View style={styles.row}>
//           <Picker
//             selectedValue={district}
//             onValueChange={setDistrict}
//             style={styles.picker}
//           >
//             {districtOptions.map((districtItem, index) => (
//               <Picker.Item key={index} label={districtItem} value={districtItem} />
//             ))}
//           </Picker>
//         </View>

//         {/* Mandal Dropdown */}
//         <View style={styles.row}>
//           <Picker
//             selectedValue={mandal}
//             onValueChange={setMandal}
//             style={styles.picker}
//           >
//             {mandalOptions.map((mandalItem, index) => (
//               <Picker.Item key={index} label={mandalItem} value={mandalItem} />
//             ))}
//           </Picker>
//         </View>

//         {/* Village Dropdown */}
//         <View style={styles.row}>
//           <Picker
//             selectedValue={village}
//             onValueChange={setVillage}
//             style={styles.picker}
//           >
//             {villageOptions.map((villageItem, index) => (
//               <Picker.Item key={index} label={villageItem} value={villageItem} />
//             ))}
//           </Picker>
//         </View>
//             <TextInput placeholder="Distance from Road" value={distanceFromRoad} onChangeText={setDistanceFromRoad} style={styles.input} />
//           </View>
//           <CustomCheckBox label="Litigation" value={litigation} onValueChange={setLitigation} />
//           <CustomCheckBox label="Bore Well" value={boreWell} onValueChange={setBoreWell} />
//           <CustomCheckBox label="Electricity" value={electricity} onValueChange={setElectricity} />
//           <CustomCheckBox label="Storage Facility" value={storageFacility} onValueChange={setStorageFacility} />
//           <Button title="Submit" style={styles.btn} onPress={handleSubmit} />
//            </ScrollView>

//     </>
//   );
// };

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
} from "react-native";
import { PermissionsAndroid } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Icon, IconButton, MD3Colors } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';


const AgricultureForm = () => {
  const [title, setTitle] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [surveyNumber, setSurveyNumber] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [landType, setLandType] = useState("");
  const [crops, setCrops] = useState("");
  const [litigation, setLitigation] = useState(false);
  const [litigationDesc, setLitigationDesc] = useState("");
  const [images, setImages] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Andhra Pradesh");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");

  const [boreWell, setBoreWell] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [distanceFromRoad, setDistanceFromRoad] = useState("");
  const [storageFacility, setStorageFacility] = useState(false);
  const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
  const [priceUnit, setPriceUnit] = useState("/acre"); // Price unit

  // const [imageUrls, setImageUrls] = useState([]);
  // const [uploadProgress, setUploadProgress] = useState(0);
  // const [isUploading, setIsUploading] = useState(false);


  const [selectedImages, setSelectedImages] = useState([]);


  const apiUrl = "http://172.17.15.184:3000/fields/insert";

  // Utility function for unit conversion and total price calculation
  const calculateTotalPrice = () => {
    let sizeInAcres = parseFloat(size);
    let pricePerAcre = parseFloat(price);

    // Convert size to acres if necessary
    if (sizeUnit === "sq.ft") sizeInAcres /= 43560;
    else if (sizeUnit === "sq.yards") sizeInAcres /= 4840;
    else if (sizeUnit === "sq.m") sizeInAcres /= 4046.86;
    else if (sizeUnit === "cents") sizeInAcres /= 100;

    // Adjust price per acre if necessary
    if (priceUnit === "/sq.ft") pricePerAcre *= 43560;
    else if (priceUnit === "/sq.yard") pricePerAcre *= 4840;
    else if (priceUnit === "/sq.m") pricePerAcre *= 4046.86;
    else if (priceUnit === "/cent") pricePerAcre *= 100;

    if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
      setTotalPrice((sizeInAcres * pricePerAcre).toFixed(2));
    } else {
      setTotalPrice("");
    }
  };

  // Recalculate totalPrice when dependencies change
  useEffect(() => {
    calculateTotalPrice();
  }, [size, price, sizeUnit, priceUnit]);

  // const handleImageUpload = async () => {
  //   const options = { mediaType: "photo", includeBase64: false };

  //   launchImageLibrary(options, async (response) => {
  //     if (response.didCancel) {
  //       return;
  //     }
  //     const file = response.assets[0];

  //     if (!file) {
  //       Alert.alert("No image selected", "Please select an image to upload.");
  //       return;
  //     }

  //     setIsUploading(true);
  //     setUploadProgress(0);

  //     // Handle the image upload and set URL after uploading
  //     const url = await Upload(file, (progress) => {
  //       setUploadProgress(progress);
  //     });

  //     if (url) {
  //       setImageUrls((prevUrls) => [...prevUrls, url]);
  //     }

  //     setIsUploading(false);
  //   });
  // };

  // const deleteImage = (index) => {
  //   setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  // };

  // const requestPermission = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //     {
  //       title: "Storage Permission",
  //       message: "App needs access to your storage to upload images",
  //     }
  //   );
  //   return granted === PermissionsAndroid.RESULTS.GRANTED;
  // };

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
        sizeUnit, // Add sizeUnit here

        price: Number(price),
        priceUnit, // Add priceUnit here

        totalPrice: Number(totalPrice),
        landType,
        crops: crops.split(","),
        litigation,
        litigationDesc,
        // images: images.split(","),
        images: imageUrls.join(","),

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
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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





  // Function to pick images
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets); // Store the selected images
    }
  };

  // Function to upload images to Cloudinary
  const uploadImages = async () => {
    try {
      const formData = new FormData();
      selectedImages.forEach((image, index) => {
        formData.append("file", {
          uri: image.uri,
          type: "image/jpeg", // or image/png based on the file type
          name: `image_${index}.jpg`,
        });
      });

      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Set your Cloudinary upload preset here

      // Sending the request to Cloudinary API
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Images uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <>
    
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Agriculture Details</Text>
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Single Line Inputs */}
          <View style={styles.row}>
            <TextInput
              placeholder="Owner Name"
              value={ownerName}
              onChangeText={setOwnerName}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              placeholder="Property Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Land Type"
              value={landType}
              onChangeText={setLandType}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              placeholder="Crops (comma-separated)"
              value={crops}
              onChangeText={setCrops}
              style={styles.input}
            />
            <TextInput
              placeholder="Litigation Description"
              value={litigationDesc}
              onChangeText={setLitigationDesc}
              style={styles.input}
            />
          </View>
          <TextInput
            placeholder="Survey Number"
            value={surveyNumber}
            onChangeText={setSurveyNumber}
            style={styles.input}
          />
          {/* <View style={styles.inputGroup}>
          <TextInput placeholder="Size (in acres)" value={size} onChangeText={setSize} keyboardType="numeric" style={styles.input} />
          <Picker
            selectedValue={sizeUnit}
            style={styles.picker}
            onValueChange={(itemValue) => setSizeUnit(itemValue)}
          >
            <Picker.Item label="Acres" value="acres" />
            <Picker.Item label="Sq. Ft" value="sq.ft" />
            <Picker.Item label="Sq. Yards" value="sq.yards" />
            <Picker.Item label="Sq. M" value="sq.m" />
            <Picker.Item label="Cents" value="cents" />
          </Picker></View>
          <View style={styles.inputGroup}>
          <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
          <Picker
            selectedValue={priceUnit}
            style={styles.picker}
            onValueChange={(itemValue) => setPriceUnit(itemValue)}
          >
            <Picker.Item label="/acre" value="/acre" />
            <Picker.Item label="/sq.ft" value="/sq.ft" />
            <Picker.Item label="/sq.yard" value="/sq.yard" />
            <Picker.Item label="/sq.m" value="/sq.m" />
            <Picker.Item label="/cent" value="/cent" />
          </Picker></View>
          <TextInput placeholder="Total Price" value={totalPrice} onChangeText={setTotalPrice} keyboardType="numeric" style={styles.input} /> */}

          {/* Price and Unit */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Size (in acres)"
              value={size}
              onChangeText={setSize}
              keyboardType="numeric"
              style={styles.input}
            />
            <Picker
              selectedValue={sizeUnit}
              style={styles.picker}
              onValueChange={(itemValue) => setSizeUnit(itemValue)}
            >
              <Picker.Item label="Acres" value="acres" />
              <Picker.Item label="Sq. Ft" value="sq.ft" />
              <Picker.Item label="Sq. Yards" value="sq.yards" />
              <Picker.Item label="Sq. M" value="sq.m" />
              <Picker.Item label="Cents" value="cents" />
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
            />
            <Picker
              selectedValue={priceUnit}
              style={styles.picker}
              onValueChange={setPriceUnit}
            >
              <Picker.Item label="/acre" value="/acre" />
              <Picker.Item label="/sq.ft" value="/sq.ft" />
              <Picker.Item label="/sq.yard" value="/sq.yard" />
              <Picker.Item label="/sq.m" value="/sq.m" />
              <Picker.Item label="/cent" value="/cent" />
            </Picker>
          </View>

          {/* Total Price with Unit */}
          <Text>Total Price</Text>
          <TextInput
            placeholder="Total Price"
            value={`${totalPrice} ${priceUnit}`}
            editable={false}
            style={styles.input}
          />
          {/* <TextInput placeholder="Images (comma-separated URLs)" value={images} onChangeText={setImages} style={styles.input} /> */}

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Button title="Upload Image" onPress={handleImageUpload} />

            {isUploading && (
              <>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={uploadProgress / 100}
                />
                <Text>Uploading {uploadProgress}%</Text>
              </>
            )}

            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}
            >
              {imageUrls.map((url, index) => (
                <View key={index} style={{ margin: 10 }}>
                  <Image
                    source={{ uri: url }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <Button title="Delete" onPress={() => deleteImage(index)} />
                </View>
              ))}
            </View>
          </View>

          <TextInput
            placeholder="Property Description"
            value={propertyDesc}
            onChangeText={setPropertyDesc}
            style={styles.input}
          />
          <TextInput
            placeholder="Pin Code"
            value={pinCode}
            onChangeText={setPinCode}
            style={styles.input}
          />
          <View style={styles.row}>
            <TextInput
              placeholder="District"
              value={district}
              onChangeText={setDistrict}
              style={styles.input}
            />
            <TextInput
              placeholder="Mandal"
              value={mandal}
              onChangeText={setMandal}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              placeholder="Village"
              value={village}
              onChangeText={setVillage}
              style={styles.input}
            />
            <TextInput
              placeholder="Distance from Road"
              value={distanceFromRoad}
              onChangeText={setDistanceFromRoad}
              style={styles.input}
            />
          </View>
          <CustomCheckBox
            label="Litigation"
            value={litigation}
            onValueChange={setLitigation}
          />
          <CustomCheckBox
            label="Bore Well"
            value={boreWell}
            onValueChange={setBoreWell}
          />
          <CustomCheckBox
            label="Electricity"
            value={electricity}
            onValueChange={setElectricity}
          />
          <CustomCheckBox
            label="Storage Facility"
            value={storageFacility}
            onValueChange={setStorageFacility}
          />
          <Button title="Submit" style={styles.btn} onPress={handleSubmit} />
        </ScrollView>
      </View>


      <View>
      <Button title="Pick Images" onPress={pickImages} />
      <Button title="Upload Images" onPress={uploadImages} disabled={selectedImages.length === 0} />
      
      {selectedImages.length > 0 && (
        <View>
          <Text>Selected Images:</Text>
          {selectedImages.map((image, index) => (
            <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
          ))}
        </View>
      )}
    </View>  </>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#05223f",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  stylingtext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  customcontainer: {
    padding: 70,
    paddingTop: 60,
    backgroundColor: "#05223f",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 3,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingRight: 0,
    paddingLeft: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15, // Increased margin for more space
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    // Removed shadow properties for clarity
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
    marginRight: 10,
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default AgricultureForm;
// ------------------------------------------
