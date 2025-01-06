import React, { useState } from "react";
import LocationPicker from "../LocationPicker";
import {ActivityIndicator,
 View,
 Text,
 TextInput,
 Button,
 StyleSheet,
 Alert,
 Switch,
 Image,
 ScrollView,
 FlatList,
 TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { useEffect } from "react";
// import ImageUploader from "../imagePicker";
// import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import { jwtDecode } from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';

const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
 const LayoutForm1= () => {
 // State variables for owner details and layout details
 const [checked, setChecked] = useState(false);
// const [selectedLocation, setSelectedLocation] = useState(null);

 const handleLocationSelected = (location) => {
 setSelectedLocation(location);
 console.log("SETTED", selectedLocation)
 };
 const [ownerName, setOwnerName] = useState("");
 const [ownerContact, setOwnerContact] = useState("");
 const [ownerEmail, setOwnerEmail] = useState("");
 const [layoutTitle, setLayoutTitle] = useState("");
 const [description, setDescription] = useState("");
 const [plotCount, setPlotCount] = useState("");
 const [availablePlots, setAvailablePlots] = useState("");
 const [plotSize, setPlotSize] = useState("");
 const [plotPrice, setPlotPrice] = useState("");
 const [totalAmount, setTotalAmount] = useState("");

 const [latitude, setLatitude] = useState("");
 const [longitude, setLogitude] = useState("");
 const [landMark, setLandmark] = useState("");
 const [currentLocation, setCurrentLocation] = useState("");
 const [pinCode, setPincode] = useState('');
 const [district, setDistrict] = useState('');
 const [mandal, setMandal] = useState('');
 const [village, setVillage] = useState('');
 const [mandals, setMandals] = useState([]);
 const [villages, setVillages] = useState([]);
 const [addressDetails, setAddressDetails] = useState({
 district: '',
 mandal: '',
 village: ''
 });

 // State variables for layout approvals
 const [reraRegistered, setReraRegistered] = useState(false);
 const [dtcpApproved, setDtcpApproved] = useState(false);
 const [tlpApproved, setTlpApproved] = useState(false);
 const [flpApproved, setFlpApproved] = useState(false);

 // State variables for amenities
 const [underGroundWater, setUnderGroundWater] = useState(false);
 const [drainageSystem, setDrainageSystem] = useState(false);
 const [electricityFacility, setElectricityFacility] = useState(false);
 const [swimmingPool, setSwimmingPool] = useState(false);
 const [playZone, setPlayZone] = useState(false);
 const [gym, setGym] = useState(false);
 const [conventionHall, setConventionHall] = useState(false);
 const [medical, setMedical] = useState(0);
 const [educational, setEducational] = useState(0);
 const [images, setImages] = useState([]); // New state for handling image URLs
 const [extraAmenitiesString, setextraAmenitiesString] = useState("");
 const [country, setCountry] = useState("");
 const [state, setState] = useState("");
 const [extraAmenities, setExtraAmenities] = useState("");
 const [selectedValue, setSelectedValue] = useState("option1"); // Default selected value
 const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
 const [priceUnit, setPriceUnit] = useState("/acre"); // Price unit
// const [selectedImages, setSelectedImages] = useState([]); // Selected images
 const [uploadedImages, setUploadedImages] = useState([]); // Uploaded images URLs


 const [modalVisible, setModalVisible] = useState(false);
 const [selectedLocation, setSelectedLocation] = useState(null);
 const [agents, setAgents] = useState([]); // State to store the agents
 const [selectedAgent, setSelectedAgent] = useState(" "); // State to store selected agent's name
 const [loading, setLoading] = useState(true); // State to manage loading


 // State variable for images
 // const [uploadPics, setUploadPics] = useState([]);

 const apiUrl = "http://172.17.15.184:3000/layout/insert"; // Replace with your actual API URL

 // Function to handle image selection
 const selectImage = () => {
 const options = {
 mediaType: "photo",
 includeBase64: true,
 quality: 1,
 };
 };
 const handlePincodeChange = async (e) => {
 const pincodeValue = e.nativeEvent.text;
 console.log(pincodeValue);

 setPincode(pincodeValue);


 setAddressDetails({
 district: '',
 mandal: '',
 village: ''
 });
 setMandals([]);
 setVillages([]);

 if (pincodeValue.length === 6) {
 try {
 const response = await axios.get(`http://172.17.15.184:3000/location/getlocationbypincode/${pincodeValue}/@/@`);
 console.log(response.data);
 const districtList = response.data.districts;
 const mandalList = response.data.mandals || [];
 const villageList = response.data.villages || [];

 setDistrict(districtList[0] || '');
 setMandals(mandalList);
 setVillages(villageList);
 setAddressDetails({
 district: districtList[0] || '',
 mandal: mandalList[0] || '',
 village: villageList[0] || ''
 });
 } catch (error) {
 console.error("Error fetching data:", error);
 Alert.alert('Error', 'Failed to fetch location data.');
 }
 }
 };

 // Handle district change
 const handleDistrictChange = async (selectedDistrict) => {
 a(selectedDistrict);
 setMandals([]);
 setVillages([]);
 setAddressDetails((prev) => ({ ...prev, district: selectedDistrict }));

 try {
 const response = await axios.get(`http://172.17.15.184:3000/location/getmandals/${selectedDistrict}`);
 setMandals(response.data.mandals || []);
 } catch (error) {
 console.error("Error fetching mandals:", error);
 Alert.alert('Error', 'Failed to fetch mandals.');
 }
 };
 const handleMandalChange = async (selectedMandal) => {
 setMandal(selectedMandal);
 setVillages([]);
 setAddressDetails((prev) => ({ ...prev, mandal: selectedMandal }));

 try {
 const response = await axios.get(`http://172.17.15.184:3000/location/getvillagesbymandal/${selectedMandal}`);
 setVillages(response.data || []);
 } catch (error) {
 console.error("Error fetching villages:", error);
 Alert.alert('Error', 'Failed to fetch villages.'); 
 }
 };
 const handleVillageChange = (selectedVillage) => {
 setVillage(selectedVillage);
 setAddressDetails((prev) => ({ ...prev, village: selectedVillage }));
 };

 
 const handleChooseMap = () => {
 setModalVisible(true); // Open the modal when button is pressed
 };
 
 const handleMapPress = (e) => {
 const { coordinate } = e.nativeEvent; // Get latitude and longitude of the selected point
 setLatitude(coordinate.latitude);
 setLongitude(coordinate.longitude);
 setSelectedLocation(coordinate); // Store the selected location
 setModalVisible(false); // Close the modal after selecting the location
 };
 
 // Function to handle form submission
 const handleSubmit = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
 if (!token) {
 Alert.alert("Error", "No token found. Please log in again.");
 return; // Exit if token is not found
 }
// console.log("Selected Agent ID (userId):", userId); // Debug selected agent

 // Prepare data to be sent in the request
 const data = {
//  agentDetails:{
//  userId:selectedAgent
//  },
 ownerDetails: {
 ownerName,
 ownerContact,
 ownerEmail,
 },
 layoutDetails: {
 reraRegistered,
 dtcpApproved,
 tlpApproved,
 flpApproved,
 layoutTitle,
 description,
 plotCount: Number(plotCount),
 availablePlots: Number(availablePlots),
 plotSize: Number(plotSize),
 sizeUnit,
 plotPrice: Number(plotPrice),
 priceUnit, // Add priceUnit here
 totalAmount: Number(totalAmount),
 address: {
 country:"India",
 state:"Andhra Pradesh",
 district,
 pinCode,
 mandal,
 village,
 latitude,
 longitude,
 landMark,
// currentLocation
 },
 },
 amenities: {
 underGroundWater,
 drainageSystem,
 electricityFacility,
 swimmingPool,
 playZone,
 gym,
 conventionHall,
 medical,
 educational,
 extraAmenities: extraAmenitiesString.split(",").map((amenity) => amenity.trim()),

 },
 uploadPics: images, // Cloudinary image URLs
 // uploadPics: images.split(",").map((img) => img.trim()), // Convert comma-separated URLs into an array
 };
 console.log("Data being submitted to the API:", JSON.stringify(data, null, 2)); // Debug data

//  console.log("the data is --> ",data.agentDetails.userId)

 // Send POST request to the API
 const response = await axios.post(apiUrl, data, {
 headers: {
 Authorization: `Bearer ${token}`, // Include the token in headers
 "Content-Type": "application/json",
 },
 });

 // Handle success response
 if (response.status === 200 || response.status === 201) {
 Alert.alert("Success", "Layout details submitted successfully!");
 } else {
 Alert.alert("Error", "submit successfull");
 }
 } catch (error) {
 Alert.alert("Error", "Failed to submit data. Please try again.");
 console.error(error.response?.data || error.message); // Log the error
 }
 };
 // Utility function for unit conversion and total price calculation
 const calculateTotalPrice = () => {
 let sizeInAcres = parseFloat(plotSize);
 let pricePerAcre = parseFloat(plotPrice);

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
 setTotalAmount((sizeInAcres * pricePerAcre).toFixed(2));
 } else {
 setTotalAmount("");
 }
 };
 const [selectedImages, setSelectedImages] = useState([]);

 const toggleSelection = (uri) => {
 setSelectedImages((prevSelectedImages) => {
 if (prevSelectedImages.includes(uri)) {
 return prevSelectedImages.filter((item) => item !== uri); 
 } else {
 return [...prevSelectedImages, uri]; 
 }
 });
 };
 const removeImage = (uri) => {
 setImages((prevImageUris) => prevImageUris.filter((item) => item !== uri));
 console.log(images)
 };

 const renderItem = ({ item }) => {
 const isSelected = selectedImages.includes(item); // Check if the image is selected
 return (
 <TouchableOpacity onPress={() => toggleSelection(item)}>
 <Image
 source={{ uri: item }}
 style={[
 { width: 100, height: 100, margin: 5 },
 isSelected && { borderWidth: 3, borderColor: 'blue' } // Add border when selected
 ]}
 resizeMode="cover"
 />

{/* {isSelected &&(<Button title="remove" onPress={() => removeImage(item)} />)} */}
{isSelected && (
 <TouchableOpacity
 style={styles.removeButton}
 onPress={() => removeImage(item)}
 >
 <Text style={styles.removeButtonText}>X</Text>
 </TouchableOpacity>
 )}
 </TouchableOpacity>

 );
 };

 // const [images, setImages] = useState([]);

 const pickImages = async () => {
 let result = await ImagePicker.launchImageLibraryAsync({
 mediaTypes: ImagePicker.MediaTypeOptions.Images,

 aspect: [4, 3],
 quality: 1,
 allowsMultipleSelection: true, // Allow multiple images to be selected
 });

 if (!result.canceled && result.assets.length > 0) {

 uploadImages(result.assets);
 }
 };

 // const uploadImages = async (imageAssets) => {
 // const uploadedUrls = [...uploadedImages]; // Preserve existing URLs
 // try {
 // for (const asset of imageAssets) {
 // const formData = new FormData();
 // formData.append('file', {
 // uri: asset.uri,
 // type: 'image/jpeg',
 // name: 'upload.jpg',
 // });
 // formData.append('upload_preset', 'sni4p6lt');

 // const response = await axios.post(
 // `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
 // formData,
 // {
 // headers: { 'Content-Type': 'multipart/form-data' },
 // }
 // );

 // if (response.data.secure_url) {
 // uploadedUrls.push(response.data.secure_url);
 // } 
 // // setImages(uploadedUrls)

 // }
 // setUploadedImages(uploadedUrls); // Update state with all uploaded
 // Alert.alert('Success', 'Images uploaded successfully!');
 // console.log('Uploaded URLs:', images);
 // // ContactsOutlined.log("was they--",uploadedImages);
 // // Ensure onUrlsReturn is a valid function

 // } catch (error) {
 // console.error('Upload error:', error);
 // Alert.alert('Upload failed', 'There was an error uploading your images.');
 // }
 // };

 // Recalculate totalPrice when dependencies change

 const uploadImages = async (imageAssets) => {
 const uploadedUrls = []; // Temporary array to collect URLs
 try {
 for (const asset of imageAssets) {
 const formData = new FormData();
 formData.append('file', {
 uri: asset.uri,
 type: 'image/jpeg',
 name: 'upload.jpg',
 });
 formData.append('upload_preset', 'sni4p6lt'); // Your upload preset

 const response = await axios.post(
 `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
 formData,
 {
 headers: { 'Content-Type': 'multipart/form-data' },
 }
 );

 if (response.data.secure_url) {
 console.log('Uploaded URL:', response.data.secure_url);
 uploadedUrls.push(response.data.secure_url); // Push URL to temp array
 } else {
 console.error('No secure_url in response:', response.data);
 }
 }

 // Update state after all uploads are done
 setImages((prevImages) => [...prevImages, ...uploadedUrls]);
 console.log('All Uploaded URLs:', uploadedUrls);
 } catch (error) {
 console.error('Upload error:', error);
 Alert.alert('Upload failed', 'There was an error uploading your images.');
 }
 };

 useEffect(() => {
 calculateTotalPrice();
 }, [plotSize, plotPrice, sizeUnit, priceUnit]);
 const handleImageUpload = async () => {
 try {
 const options = {
 mediaType: "photo",
 quality: 1,
 };

 // Use an image picker (install `expo-image-picker` or React Native equivalents)
 const result = await ImagePicker.launchImageLibraryAsync(options);

 if (!result.canceled) {
 const formData = new FormData();
 formData.append("file", {
 uri: result.assets[0].uri,
 type: "image/jpeg", // Adjust based on file type
 name: "upload.jpg",
 });
 formData.append("upload_preset", "sni4p6lt"); // Replace with Cloudinary preset
 formData.append("cloud_name", "ddv2y93jq"); // Replace with your Cloudinary cloud name

 const response = await axios.post(
 "https://api.cloudinary.com/v1_1/ddv2y93jq/image/upload",
 formData
 );

 if (response.data.secure_url) {
 setUploadedImages((prev) => [...prev, response.data.secure_url]);
 Alert.alert("Success", "Image uploaded successfully");
 }
 }
 } catch (error) {
 console.error("Image upload error:", error);
 Alert.alert("Error", "Failed to upload image.");
 }
 };
 useEffect(() => {
 const fetchAssignedAgents = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 setLoading(false);
 return;
 }

 const decodedToken = jwtDecode(token);
 const userId = decodedToken.user.userId;

 console.log("User ID cmg o:", userId);

 // Fetch agents assigned to the user
 const response = await fetch(
 `http://172.17.15.184:3000/csr/getAssignedAgents/${userId}`,
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 if (!response.ok) {
 throw new Error(`Error fetching agents: ${response.statusText}`);
 }

 const data = await response.json();
 console.log("omg",data);

 setAgents(data); // Assuming data is an array of agents
 } catch (error) {
 console.error("Failed to fetch assigned agents:", error);
 } finally {
 setLoading(false);
 }
 };

//  fetchAssignedAgents();
 }, []);

 const handleAgentChange = (itemValue) => {
 const selectedAgent = agents.find((agent) => agent.id === itemValue);
 setSelectedAgent(selectedAgent ? selectedAgent.name : "");
 };

//  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;


 return (
 <>
 <View style={styles.customcontainer}>
 <Text style={styles.stylingtext}>Layout Details </Text>
 {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}
 </View>

 <View style={styles.container}>
 <ScrollView>
 {/* <Text style={styles.title}>Layout Details</Text> */}

 {/* Owner Details Inputs */}

 {/* <View>
 <Text style={styles.label1}>Select Agent:</Text>
 <Picker
 selectedValue={selectedAgent}
 onValueChange={(itemValue) => setSelectedAgent(itemValue)}
 >
 {agents.length > 0 ? (
 agents.map((agent) => (
 <Picker.Item
 key={agent._id} // Assuming agent has a unique id
 label={agent.email} // Assuming agent has a 'name' field
 value={agent.email} // Use agent's ID as value
 />
 ))
 ) : (
 <Picker.Item label="No agents available" value=""/>
 )}
 </Picker>
 </View> */}
 <Text style={styles.label1}>Owner Name</Text>
 <TextInput
 style={styles.input}
 placeholder="Owner Name"
 value={ownerName}
 onChangeText={setOwnerName}
 />
  <Text style={styles.label1}>Owner Contact</Text>
 <TextInput
 style={styles.input}
 placeholder="Owner Contact"
 value={ownerContact}
 onChangeText={setOwnerContact}
 keyboardType="numeric"
 />
  <Text style={styles.label1}>Owner Email</Text>
 <TextInput
 style={styles.input}
 placeholder="Owner Email"
 value={ownerEmail}
 onChangeText={setOwnerEmail}
 keyboardType="email-address"
 />
 <Text style={styles.label1}>Layout Title</Text>
 {/* Layout Details Inputs */}
 <TextInput
 style={styles.input}
 placeholder="Layout Title"
 value={layoutTitle}
 onChangeText={setLayoutTitle}
 />
  <Text style={styles.label1}>Description</Text>
 <TextInput
 style={styles.input}
 placeholder="Description"
 value={description}
 onChangeText={setDescription}
 />
  <Text style={styles.label1}>Plot Count</Text>
 <TextInput
 style={styles.input}
 placeholder="Plot Count"
 value={plotCount}
 onChangeText={setPlotCount}
 keyboardType="numeric"
 />
  <Text style={styles.label1}>Available Plots</Text>
 <TextInput
 style={styles.input}
 placeholder="Available Plots"
 value={availablePlots}
 onChangeText={setAvailablePlots}
 keyboardType="numeric"
 />


 {/* here the plot size is cmg ---> */}

 {/* <TextInput
 style={styles.input}
 placeholder="Plot Price"
 value={plotPrice}
 onChangeText={setPlotPrice}
 keyboardType="numeric"
 />
 <TextInput
 style={styles.input}
 placeholder="Total Amount"
 value={totalAmount}
 onChangeText={setTotalAmount}
 keyboardType="numeric"
 /> */}


 {/* Price and Unit */}
 <View style={styles.inputGroup}>
 <Text style={styles.label1}>Size</Text>
 <View style={styles.row}>
 <TextInput
 placeholder="Size (in acres)"
 value={plotSize}
 onChangeText={setPlotSize}
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
 </View>
 <View style={styles.inputGroup}>
 <Text style={styles.label1}>Price</Text>
 <View style={styles.row}>
 <TextInput
 placeholder="Price"
 value={plotPrice}
 onChangeText={setPlotPrice}
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
 </View>
 {/* Total Price with Unit */}
 <Text style={styles.label1}>Total Price</Text>
 <TextInput
 placeholder="Total Price"
 value={`${totalAmount} ${priceUnit}`}
 editable={false}
 style={styles.input}
 />
 <Text style={styles.label1}>Country</Text>
 <TextInput
 style={styles.input}
 placeholder="country"
 value={country}
 onChangeText={setCountry}
 />
 <Text style={styles.label1}>State</Text>
 <TextInput
 style={styles.input}
 placeholder="state"
 value={state}
 onChangeText={setState}
 />

<Text style={styles.label1}>Pincode</Text>
 <TextInput
 placeholder="Pincode"
 value={pinCode}
 onChange={handlePincodeChange}
 style={[styles.input, styles.pincodeInput]}
 />

  <Text style={styles.label1}>District</Text>
 <TextInput
 placeholder="District"
 value={district}
 onChangeText={handleDistrictChange}
 style={[styles.input, styles.districtInput]}
 editable={false}
 />
 <View style={styles.row}>
 <Text style={styles.label1}>Mandal</Text>
 <Picker
 selectedValue={mandal}
 onValueChange={handleMandalChange}
 style={{ height: 50, width: 150 }}
 >
 {mandals.length > 0
 ? mandals.map((mandalOption, index) => (
 <Picker.Item key={index} label={mandalOption} value={mandalOption} />
 ))
 : <Picker.Item label="Mandal" value="" />
 }
 </Picker>
 </View>
 <View style={styles.row}>
 <Text style={styles.label1}>Village</Text>
 <Picker
 selectedValue={village}
 onValueChange={handleVillageChange}
 style={{ height: 50, width: 150, borderColor: 'black', borderWidth: 1, borderRadius: 5 }}
 >
 {villages.length > 0
 ? villages.map((villageOption, index) => (
 <Picker.Item key={index} label={villageOption} value={villageOption} />
 ))
 : <Picker.Item label="Village" value="" />
 }
 </Picker>
 </View>
 
 {/* <TextInput
 style={styles.input}
 placeholder="latitude"
 value={latitude}
 onChangeText={setLatitude}
 />

 <TextInput
 style={styles.input}
 placeholder="Longitude"
 value={longitude}
 onChangeText={setLogitude}
 /> */}
 <Text style={styles.label1}>Land Mark</Text>
 <TextInput
 style={styles.input}
 placeholder="landmark"
 value={landMark}
 onChangeText={setLandmark}
 />


 {/* Toggle Switches for Approvals */}
 <View style={styles.switchContainer}>
 <Text>RERA Registered</Text>
 <Switch value={reraRegistered} onValueChange={setReraRegistered} />
 </View>
 <View style={styles.switchContainer}>
 <Text>DTCP Approved</Text>
 <Switch value={dtcpApproved} onValueChange={setDtcpApproved} />
 </View>
 <View style={styles.switchContainer}>
 <Text>TLP Approved</Text>
 <Switch value={tlpApproved} onValueChange={setTlpApproved} />
 </View>
 <View style={styles.switchContainer}>
 <Text>FLP Approved</Text>
 <Switch value={flpApproved} onValueChange={setFlpApproved} />
 </View>

 {/* Toggle Switches for Amenities */}
 <View style={styles.switchContainer}>
 <Text>Under Ground Water</Text>
 <Switch
 value={underGroundWater}
 onValueChange={setUnderGroundWater}
 />
 </View>
 <View style={styles.switchContainer}>
 <Text>Drainage System</Text>
 <Switch value={drainageSystem} onValueChange={setDrainageSystem} />
 </View>
 <View style={styles.switchContainer}>
 <Text>Electricity Facility</Text>
 <Switch
 value={electricityFacility}
 onValueChange={setElectricityFacility}
 />
 </View>
 <View style={styles.switchContainer}>
 <Text>Swimming Pool</Text>
 <Switch value={swimmingPool} onValueChange={setSwimmingPool} />
 </View>
 <View style={styles.switchContainer}>
 <Text>Play Zone</Text>
 <Switch value={playZone} onValueChange={setPlayZone} />
 </View>
 <View style={styles.switchContainer}>
 <Text>Gym</Text>
 <Switch value={gym} onValueChange={setGym} />
 </View>
 <View style={styles.switchContainer}>
 <Text>Convention Hall</Text>
 <Switch value={conventionHall} onValueChange={setConventionHall} />
 </View>

 {/* Inputs for Medical and Educational Facilities */}
 <TextInput
 style={styles.input}
 placeholder="Medical Facilities (Count)"
 value={String(medical)}
 onChangeText={(text) => setMedical(Number(text))}
 keyboardType="numeric"
 />
 <TextInput
 style={styles.input}
 placeholder="Educational Facilities (Count)"
 value={String(educational)}
 onChangeText={(text) => setEducational(Number(text))}
 keyboardType="numeric"
 />

<Text style={styles.label1}>Extra Amenities</Text>
 <TextInput
 style={styles.input}
 placeholder="extraAmenities"
 value={extraAmenitiesString}
 onChangeText={setextraAmenitiesString}
 />
 



 <Text style={styles.label}>Upload Images</Text>
 {/* <View>
 <Button title="Pick images from camera roll" onPress={pickImages} />
 
 <FlatList
 data={images}
 horizontal
 keyExtractor={(item, index) => index.toString()}
 scrollEnabled={false}
 renderItem={({ item }) => (
 <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 5 }} />
 )}
 />
 </View> */}


 

 {/* <View>
 <Button title="Select Images" onPress={pickImages} />
 <ScrollView horizontal>
 {uploadedImages.map((url, index) => (
 <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100, margin: 5 }} />
 ))}
 </ScrollView>
 </View> */}


<View style={{marginTop:"10px"}}>
 <Button title="Select Images" onPress={pickImages} style={styles.button}/>
 <ScrollView horizontal>
 {uploadedImages.map((url, index) => (
 <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100, margin: 5 }} />
 ))}
 </ScrollView>
</View>
<View style={{marginBottom:10}}>

 
 <FlatList
 data={images}
 horizontal
 keyExtractor={(item, index) => index.toString()}
 renderItem={renderItem}
 />

 </View>

 {/* <Text style={styles.title}>Choose Location on Map</Text>

<Button title="Choose Map" onPress={handleChooseMap} /> */}
 
 <Text style={styles.label1}>Current location</Text>

<LocationPicker onLocationSelected={handleLocationSelected} />
{/* 
{selectedLocation && (
 <View >
 <Text>Selected Location from LocationPicker:</Text>
 <Text>Latitude: {selectedLocation.latitude}</Text>
 <Text>Longitude: {selectedLocation.longitude}</Text>
 </View>
 )} */}
 {selectedLocation && (
 <>
 <Text style={styles.label1}>Latitude</Text>
 <TextInput
 style={styles.input}
 placeholder="Latitude"
 value={String(selectedLocation.latitude)} 
 editable={false} 
 />
 <Text style={styles.label1}>Longitude</Text>
 <TextInput
 style={styles.input}
 placeholder="Longitude"
 value={String(selectedLocation.longitude)} 
 editable={false} 
 />
 </>
 )}
 <View >
 
 {/* The Modal for Map Selection */}
 {/* <Modal
 isVisible={modalVisible}
 onBackdropPress={() => setModalVisible(false)} // Close modal on backdrop press
 onBackButtonPress={() => setModalVisible(false)} // Close modal on hardware back press
 >
 <View style={styles.modalContent}>
 <MapView
 style={styles.map}
 initialRegion={{
 latitude: 37.78825, // Default latitude if no selection is made
 longitude: -122.4324, // Default longitude if no selection is made
 latitudeDelta: 0.0922,
 longitudeDelta: 0.0421,
 }}
 onPress={handleMapPress} // Get coordinates on map press
 >
 {selectedLocation && (
 <Marker coordinate={selectedLocation} />
 )}
 </MapView>
 <Button title="Close" onPress={() => setModalVisible(false)} />
 </View>
 </Modal> */}

 <View style={styles.inputContainer}>
 {/* <Text style={styles.label}>Latitudehgf:</Text>
 <TextInput
 style={styles.input}
 value={latitude ? latitude.toString() : ''}
 editable={false}
 />
 <Text style={styles.label}>Longitude:</Text>
 <TextInput
 style={styles.input}
 value={longitude ? longitude.toString() : ''}
 editable={false}
 /> */}
 </View>
 </View>


 {/* Submit Button */}

 <Button title="Submit Layout" onPress={handleSubmit} />
 </ScrollView>
 </View>


 </>
 );
};

const styles = StyleSheet.create({
    // container: {
    // flex: 1,
    // paddingTop: 20,
    // paddingLeft:20,
    // paddingRight:20,
    // paddingBottom:100,
    // backgroundColor: "#fff",
    // },
    row: {
        flexDirection: "row",
        alignItems: "center", // Vertically center the elements
        marginBottom: 16,
      },
    container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    justifyContent: "start",
    backgroundColor: "#fff",
   
    },
    label1: {
        padding:4,
    marginTop:5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    },
    input: {
        padding:4,
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
    },
    switchContainer: {
    flexDirection: 'row', // Align switch and label horizontally
    justifyContent: 'space-between', // Spread out the elements
    alignItems: 'center', // Center vertically
    },
    label: {
    fontSize: 16,
    marginRight: 10,
    },
    textAreaContainer: {
    marginBottom: 5,
    },
    textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    },
   
    inputContainer: {
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Vertically align the elements
    justifyContent: 'space-between', // Space between the text input and picker
    },
    input: {
    flex: 1, // Take half the available width
    height: 40,
    width:"100%",
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10, // Space between text input and picker
    paddingLeft: 10,
    borderRadius:10
    },
    pickerWrapper: {
    height: 40,
    width: 130,
    borderColor: 'gray',
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: 'center', // Vertically center the text
    alignItems: 'center', // Horizontally center the text
    },
    pickerWrapper1: {
    height: 50,
    
    borderColor: 'gray',
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    
    },
    
    picker: {
    height: 40,
    width: 140, // Width of the dropdown (picker)
    borderColor: '#000', 
    },
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
    removeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
      borderRadius: 15,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      },
      removeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: -2, // Slight adjustment for vertical centering
      },
   });

export default LayoutForm1;