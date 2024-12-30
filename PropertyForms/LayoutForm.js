
import React, { useState } from "react";
import {
 View,
 Text,
 TextInput,
 Button,
 StyleSheet,
 Alert,
 Switch,
 Image,
 ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"; // Import the location icon

import * as Location from "expo-location";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const cloudName = "ddv2y93jq";

function LayoutForm  () {
    const navigation = useNavigation()
 // State variables for owner details and layout details

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
 const [district, setDistrict] = useState("");
 const [mandal, setMandal] = useState("");
 const [village, setVillage] = useState("");
 const [pinCode, setPincode] = useState("");
 const [latitude, setLatitude] = useState("");
 const [longitude, setLogitude] = useState("");
 const [landMark, setLandmark] = useState("");

 // State variables for layout approvals
 const [reraRegistered, setReraRegistered] = useState(false);
 const [dtcpApproved, setDtcpApproved] = useState(false);
 const [tlpApproved, setTlpApproved] = useState(false);
 const [flpApproved, setFlpApproved] = useState(false);
 const [currentLocation, setCurrentLocation] = useState("");
 const [locationDetails, setLocationDetails] = useState("");
 const [errorMsg, setErrorMsg] = useState("");

 // State variables for amenities
 const [underGroundWater, setUnderGroundWater] = useState(false);
 const [drainageSystem, setDrainageSystem] = useState(false);
 const [electricityFacility, setElectricityFacility] = useState(false);
 const [swimmingPool, setSwimmingPool] = useState(false);
 const [playZone, setPlayZone] = useState(false);
 const [gym, setGym] = useState(false);
 const [conventionHall, setConventionHall] = useState(false);
 const [medical, setMedical] = useState();
 const [educational, setEducational] = useState(0);
 const [images, setImages] = useState(""); // New state for handling image URLs
 const [extraAmenitiesString, setextraAmenitiesString] = useState("");
 const [country, setCountry] = useState("");
 const [state, setState] = useState("");
 const [extraAmenities, setExtraAmenities] = useState("");
 const [selectedValue, setSelectedValue] = useState("option1"); // Default selected value
 const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
 const [priceUnit, setPriceUnit] = useState("/acre"); // Price unit

 const [selectedImages, setSelectedImages] = useState([]); // Selected images
 const [uploadedImages, setUploadedImages] = useState([]); // Uploaded images URLs
 const [uploadedUrls1, setUploadedUrls1] = useState([]);

 // State variable for images
 // const [uploadPics, setUploadPics] = useState([]);

 const apiUrl = "http://172.17.15.184:3000/layout/insert"; // Replace with your actual API URL
//  const apiUrl =
//  "https://real-estate-back-end-s5bk-ob8ks6pdi-pindu123s-projects.vercel.app/layout/insert";
 const getUserLocation = async () => {
 try {
 // Request location permission
 let { status } = await Location.requestForegroundPermissionsAsync();

 if (status !== "granted") {
 setErrorMsg("Permission to access location was not granted");
 return;
 }

 // Get user's current position
 let { coords } = await Location.getCurrentPositionAsync();
 if (coords) {
 const { latitude, longitude } = coords;
 console.log("Latitude and Longitude: ", latitude, longitude);
 setLatitude(latitude); // Update latitude state
 setLogitude(longitude); // Update longitude state

 // Reverse geocode to get address
 let response = await Location.reverseGeocodeAsync({
 longitude,
 latitude,
 });
 if (response.length > 0) {
 const address = response[0];
 const locationString = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
 console.log("User Location: ", locationString);
 const latitude1 = `${latitude}`;
 const longitude1 = `${longitude}`;
 console.log("latitue cmg ", latitude1);
 setLatitude(latitude1);
 setLogitude(longitude1);
 setLocationDetails(locationString); // Update locationDetails state
 setCurrentLocation(locationString); // Auto-fill currentLocation field
 } else {
 setLocationDetails("Unable to retrieve address");
 setCurrentLocation("Unable to retrieve address");
 }
 }
 } catch (error) {
 console.error("Error fetching location: ", error);
 setErrorMsg("Error fetching location");
 }
 };

 // Function to handle image selection
 const selectImage = () => {
 const options = {
 mediaType: "photo",
 includeBase64: true,
 quality: 1,
 };
 };
 const uploadImages = async (imageAssets) => {
 const uploadedUrls = []; // Temporary array to collect URLs
 try {
 for (const asset of imageAssets) {
 const formData = new FormData();
 formData.append("file", {
 uri: asset.uri,
 type: "image/jpeg",
 name: "upload.jpg",
 });
 formData.append("upload_preset", "sni4p6lt"); // Your upload preset

 const response = await axios.post(
 `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
 formData,
 {
 headers: { "Content-Type": "multipart/form-data" },
 }
 );

 if (response.data.secure_url) {
 console.log("Uploaded URL:", response.data.secure_url);
 uploadedUrls.push(response.data.secure_url); // Push URL to temp array
 } else {
 console.error("No secure_url in response:", response.data);
 }
 }

 // Update state after all uploads are done
 setImages((prevImages) => [...prevImages, ...uploadedUrls]);
 console.log("All Uploaded URLs:", uploadedUrls);
 setUploadedUrls1(uploadedUrls);
 console.log("hashhdj", uploadedUrls1);
 } catch (error) {
 console.error("Upload error:", error);
 Alert.alert("Upload failed", "There was an error uploading your images.");
 }
 };

 // Function to handle form submission
 const handleSubmit = async () => {
 try {
 const token =
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY3M2Y0Y2ViNGRiNDhiMGM4OGI4NjNjZiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwaG9uZU51bWJlciI6Ijc4Nzg3ODc4NzgiLCJyb2xlIjoxLCJkaXN0cmljdCI6IlZpemlhbmFnYXJhbSJ9LCJpYXQiOjE3MzQ2MDU5NzcsImV4cCI6MTczNDY5MjM3N30.2Md4DVYe5FIeqP1eUiC4J9DPMX9FqXHLlW0CdHX8VJ4";
 // await AsyncStorage.getItem("userToken"); // Retrieve token from storage
 console.log("Token:", token);

 if (!token) {
 Alert.alert("Error", "No token found. Please log in again.");
 return; // Exit if token is not found
 }
 console.log("apiUrl", apiUrl, uploadedUrls1);
 // Prepare data to be sent in the request

 // Function to get user location
 // const getUserLocation = async () => {
 // try {
 // let { status } = await Location.requestForegroundPermissionsAsync();

 // if (status !== 'granted') {
 // Alert.alert('Permission denied', 'Permission to access location was not granted');
 // return;
 // }

 // // Get user's current position
 // let { coords } = await Location.getCurrentPositionAsync();
 // if (coords) {
 // const { latitude, longitude } = coords;
 // setLatitude(latitude);
 // setLongitude(longitude);

 // // Reverse geocode to get address
 // let response = await Location.reverseGeocodeAsync({ longitude, latitude });
 // if (response.length > 0) {
 // const address = response[0];
 // const locationString = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
 // setCurrentLocation(locationString);
 // } else {
 // setCurrentLocation("Unable to retrieve address");
 // }
 // }
 // } catch (error) {
 // console.error("Error fetching location: ", error);
 // Alert.alert("Error", "Failed to fetch location");
 // }
 // };
 const data = {
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
 country,
 state,
 district,
 pinCode,
 mandal,
 village,
 latitude,
 longitude,
 landMark,
 currentLocation,
 },
 },
 amenities: {
 underGroundWater,
 drainageSystem,
 electricityFacility: String(electricityFacility),
 swimmingPool,
 playZone,
 gym,
 conventionHall,
 medical,
 educational,
 extraAmenities: extraAmenitiesString
 .split(",")
 .map((amenity) => amenity.trim()),
 },
 // uploadPics: images.split(",").map((img) => img.trim()), // Convert comma-separated URLs into an array
 uploadPics: uploadedUrls1, // Cloudinary image URLs
 };

 console.log("Form Data:", data);

 // Send POST request to the API
 await axios
 .post(apiUrl, data, {
 headers: {
 Authorization: `Bearer ${token}`, // Include the token in headers
 "Content-Type": "application/json",
 },
 })
 .then((response) => {
 console.log("response", response.status);
 if (response.status === 201) {
 console.log("data cmg afterhitting", response);
 Alert.alert("Success", "Layout details submitted successfully!");
 navigation.navigate("asd")
 
 } else {
 Alert.alert("Error", "submit successfull");
 }
 });
 // Handle success response
 } catch (error) {
 Alert.alert("Error", "Failed to submit data. Please try again.");
 // console.error(error.response?.data || error.message); // Log the error
 console.error(
 "API Response Error:",
 error.response?.data || error.message
 );
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

 // Recalculate totalPrice when dependencies change
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

 return (
 <>
 <View style={styles.customcontainer}>
 <Text style={styles.stylingtext}>Layout Details</Text>
 {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}
 </View>
 <ScrollView>
 <View style={styles.container}>
 {/* <Text style={styles.title}>Layout Details</Text> */}

 {/* Owner Details Inputs */}
 <Text style={{ fontWeight: "bold" }}>Owner Name:</Text>
 <TextInput
 style={styles.input}
 placeholder="Owner Name"
 value={ownerName}
 onChangeText={setOwnerName}
 />
 <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>
 <TextInput
 style={styles.input}
 placeholder="Owner Contact"
 value={ownerContact}
 onChangeText={setOwnerContact}
 keyboardType="numeric"
 />
 <Text style={{ fontWeight: "bold" }}>Email:</Text>
 <TextInput
 style={styles.input}
 placeholder="Owner Email"
 value={ownerEmail}
 onChangeText={setOwnerEmail}
 keyboardType="email-address"
 />
 <Text style={{ fontWeight: "bold" }}>Layout Title:</Text>
 {/* Layout Details Inputs */}
 <TextInput
 style={styles.input}
 placeholder="Layout Title"
 value={layoutTitle}
 onChangeText={setLayoutTitle}
 />
 <Text style={{ fontWeight: "bold" }}>Layout Description:</Text>
 <TextInput
 style={styles.input}
 placeholder="Description"
 value={description}
 onChangeText={setDescription}
 />
 <Text style={{ fontWeight: "bold" }}>Plot Count:</Text>
 <TextInput
 style={styles.input}
 placeholder="Plot Count"
 value={plotCount}
 onChangeText={setPlotCount}
 keyboardType="numeric"
 />
 <Text style={{ fontWeight: "bold" }}>Available Plots:</Text>
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
 <Text style={{ fontWeight: "bold", marginRight: 10 }}>Size:</Text>

 <View
 style={{
 flexDirection: "row",
 alignItems: "center",
 marginBottom: 10,
 }}
 >
 

 <TextInput
 placeholder="Size (in acres)"
 value={plotSize}
 onChangeText={setPlotSize}
 keyboardType="numeric"
 style={{
 flex: 1,
 borderWidth: 1,
 padding: 10,
 marginRight: 10,
 borderColor: "gray",
 }}
 />

 <Picker
 selectedValue={sizeUnit}
 style={{
 height: 50,
 flex: 1,
 marginLeft: 10,
 }}
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
 <Text style={{ fontWeight: "bold", marginRight: 10 }}>Price:</Text>

 <View
 style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
 >
 <TextInput
 placeholder="Price"
 value={plotPrice}
 onChangeText={setPlotPrice}
 keyboardType="numeric"
 style={[styles.input, { flex: 1, marginRight: 10 }]} // Adjust margin and flex to align side by side
 />

 <Picker
 selectedValue={priceUnit}
 style={[styles.picker, { height: 50, flex: 1 }]} // Ensure picker takes available space
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
 <Text>Total Price</Text>
 <TextInput
 placeholder="Total Price"
 value={`${totalAmount} ${priceUnit}`}
 editable={false}
 style={styles.input}
 />
 <Text style={{ fontWeight: "bold" }}>Country:</Text>
 <TextInput
 style={styles.input}
 placeholder="country"
 value={country}
 onChangeText={setCountry}
 />
 <Text style={{ fontWeight: "bold" }}>State:</Text>
 <TextInput
 style={styles.input}
 placeholder="state"
 value={state}
 onChangeText={setState}
 />
 <Text style={{ fontWeight: "bold" }}>District:</Text>
 <TextInput
 style={styles.input}
 placeholder="District"
 value={district}
 onChangeText={setDistrict}
 />
 <Text style={{ fontWeight: "bold" }}>Mandal:</Text>
 <TextInput
 style={styles.input}
 placeholder="Mandal"
 value={mandal}
 onChangeText={setMandal}
 />
 <Text style={{ fontWeight: "bold" }}>Village:</Text>
 <TextInput
 style={styles.input}
 placeholder="Village"
 value={village}
 onChangeText={setVillage}
 />
 <Text style={{ fontWeight: "bold" }}>Pincode:</Text>
 <TextInput
 style={styles.input}
 placeholder="pincode"
 value={pinCode}
 onChangeText={setPincode}
 />
 <Text>CHOOSE LOCATION</Text>

 {/* Location Button */}
 <Button
 // mode="contained"
 title="choose location"
 onPress={getUserLocation}
 icon={() => <Icon name="md-compass" size={20} color="#000" />}
 style={styles.locationButton}
 ></Button>
 <Text style={{ fontWeight: "bold" }}>Latitude:</Text>
 <TextInput
 style={styles.input}
 placeholder="latitude"
 value={latitude}
 onChangeText={setLatitude}
 />
 <Text style={{ fontWeight: "bold" }}>Longitude:</Text>
 <TextInput
 style={styles.input}
 placeholder="Longitude"
 value={longitude}
 onChangeText={setLogitude}
 />
 <Text style={{ fontWeight: "bold" }}>landMark:</Text>
 <TextInput
 style={styles.input}
 placeholder="landmark"
 value={landMark}
 onChangeText={setLandmark}
 />
 <Text style={{ fontWeight: "bold" }}>Current Location:</Text>

 <TextInput
 style={styles.input}
 placeholder="currentLocation"
 value={currentLocation}
 onChangeText={setCurrentLocation}
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

 <TextInput
 style={styles.input}
 placeholder="Near By Medical Facilities in Km"
 value={medical}
 onChangeText={(text) => setMedical(Number(text))}
 keyboardType="numeric"
 />
 <TextInput
 style={styles.input}
 placeholder="Near By Educational Facilities in Km"
 value={educational}
 onChangeText={(text) => setEducational(Number(text))}
 keyboardType="numeric"
 />

 <TextInput
 style={styles.input}
 placeholder="extraAmenities"
 value={extraAmenitiesString}
 onChangeText={setextraAmenitiesString}
 />


 <Text style={styles.label}>Upload Images</Text>



 <View>
 <Button
 title="Select Images"
 style={styles.imagesbtn}
 onPress={pickImages}
 />
 
 {uploadedImages.map((url, index) => (
 <Image
 key={index}
 source={{ uri: url }}
 style={{ width: 100, height: 100, margin: 5 }}
 />
 ))}
 
 </View>

 {/* Submit Button */}
 <Button title="Submit Layout" onPress={handleSubmit} style={{marginTop:10}}/>
 </View>
 </ScrollView>
 </>
 );
};
export default LayoutForm
const styles = StyleSheet.create({
 imagesbtn: {
 marginBottom: 20,
 borderRadius: 20,
 },
 stylingtext: {
 fontSize: 25,
 fontWeight: "bold",
 color: "white",
 },
 customcontainer: {
 width:-120,
 padding: 70,
 paddingTop: 60,
 backgroundColor: "#05223f",
 borderBottomLeftRadius: 100,
 borderBottomRightRadius: 3,
 },
 container: {
 // width:20,
 flex: 2,
 padding: 20,
 },
 title: {
 fontSize: 24,
 fontWeight: "bold",
 marginBottom: 16,
 },
 input: {
 height: 40,
 borderColor: "#ccc",
 borderWidth: 1,
 marginBottom: 12,
 paddingHorizontal: 8,
 },
 switchContainer: {
 flexDirection: "row",
 alignItems: "center",
 justifyContent: "space-between",
 marginBottom: 12,
 },
 imageContainer: {
 flexDirection: "row",
 flexWrap: "wrap",
 marginVertical: 10,
 },
 image: {
 width: 100,
 height: 100,
 margin: 5,
 },
});







