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

// import { launchImageLibrary } from 'react-native-image-picker';
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

 const [pincode, setPincode] = useState('');
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

 // Handle pincode change
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
 const response = await axios.get(`http://172.17.13.106:3000/location/getlocationbypincode/${pincodeValue}/@/@`);
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
 setDistrict(selectedDistrict);
 setMandals([]);
 setVillages([]);
 setAddressDetails((prev) => ({ ...prev, district: selectedDistrict }));

 try {
 const response = await axios.get(`http://172.17.13.106:3000/location/getmandals/${selectedDistrict}`);
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
 const response = await axios.get(`http://172.17.13.106:3000/location/getvillagesbymandal/${selectedMandal}`);
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
 const apiUrl = "http://172.17.13.106:3000/fields/insert";

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
 // const options = { mediaType: "photo", includeBase64: false };

 // launchImageLibrary(options, async (response) => {
 // if (response.didCancel) {
 // return;
 // }
 // const file = response.assets[0];

 // if (!file) {
 // Alert.alert("No image selected", "Please select an image to upload.");
 // return;
 // }

 // setIsUploading(true);
 // setUploadProgress(0);

 // // Handle the image upload and set URL after uploading
 // const url = await Upload(file, (progress) => {
 // setUploadProgress(progress);
 // });

 // if (url) {
 // setImageUrls((prevUrls) => [...prevUrls, url]);
 // }

 // setIsUploading(false);
 // });
 // };

 // const deleteImage = (index) => {
 // setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
 // };

 // const requestPermission = async () => {
 // const granted = await PermissionsAndroid.request(
 // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
 // {
 // title: "Storage Permission",
 // message: "App needs access to your storage to upload images",
 // }
 // );
 // return granted === PermissionsAndroid.RESULTS.GRANTED;
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
 // images: imageUrls.join(","),

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
 <View style={styles.row}>
 <TextInput
 placeholder="Survey Number"
 value={surveyNumber}
 onChangeText={setSurveyNumber}
 style={styles.input}
 />
 
 </View>
 
 <View style={styles.row}>
 
 <TextInput
 placeholder="Size (in acres)"
 value={size}
 onChangeText={setSize}
 keyboardType="numeric"
 style={[styles.input, { flex: 1, marginRight: 10 }]}
 />
 <Picker
 selectedValue={sizeUnit}
 style={[styles.picker, { flex: 1,width:5 }]}
 onValueChange={(itemValue) => setSizeUnit(itemValue)}
 >
 <Picker.Item label="Acres" value="acres" />
 <Picker.Item label="Sq. Ft" value="sq.ft" />
 <Picker.Item label="Sq. Yards" value="sq.yards" />
 <Picker.Item label="Sq. M" value="sq.m" />
 <Picker.Item label="Cents" value="cents" />
 </Picker>
 </View>
 
 
 <View style={styles.row}>
 <TextInput
 placeholder="Price"
 value={price}
 onChangeText={setPrice}
 keyboardType="numeric"
 style={styles.input}
 />
 <Picker
 selectedValue={priceUnit}
 style={[styles.picker, { flex: 1 }]}
 onValueChange={setPriceUnit}
 >
 <Picker.Item label="/acre" value="/acre" />
 <Picker.Item label="/sq.ft" value="/sq.ft" />
 <Picker.Item label="/sq.yard" value="/sq.yard" />
 <Picker.Item label="/sq.m" value="/sq.m" />
 <Picker.Item label="/cent" value="/cent" />
 </Picker>
 
 </View>
 <View style={styles.row}>
 
 <Text>Total Price</Text>
 <TextInput
 placeholder="Total Price"
 value={`${totalPrice} ${priceUnit}`}
 editable={false}
 style={styles.input}
 />
 </View>
 {/* Total Price with Unit */}
 
 {/* <TextInput placeholder="Images (comma-separated URLs)" value={images} onChangeText={setImages} style={styles.input} /> */}
 {/* 
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
 </View> */}

 <View style={styles.row}>
 <TextInput
 placeholder="Property Description"
 value={propertyDesc}
 onChangeText={setPropertyDesc}
 style={styles.input}
 />
 </View>
 {/* Wrap the Pincode and District in a row container */}
 <View style={styles.row}>
 <TextInput
 placeholder="Pincode"
 value={pincode}
 onChange={handlePincodeChange}
 style={[styles.input, styles.pincodeInput]}
 />
 <TextInput
 placeholder="District"
 value={district}
 onChangeText={handleDistrictChange}
 style={[styles.input, styles.districtInput]}
 editable={false}
 />
 </View>
 
 <View style={styles.row}>
 <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
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
 <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
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
 </View>


 <View>
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
 </View> </>
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
 paddingTop: 20,
 paddingLeft:20,
 paddingRight:20,
 paddingBottom:100,
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
 pickerContainer: {
 borderWidth: 1,
 borderColor: 'black',
 borderRadius: 5,
 overflow: 'hidden', // Ensures the border radius works
 },
 picker: {
 height: 50,
 },
});

export default AgricultureForm;
