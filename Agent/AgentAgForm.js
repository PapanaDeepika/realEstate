import React, { useState, useEffect, useRef } from "react";
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
Image,
} from "react-native";
import { PermissionsAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Camera } from 'expo-camera';

const cloudName1 = "ddv2y93jq" // Your Cloudinary Cloud Name
const uploadPreset = "sni4p6lt" // Your Cloudinary Upload Preset
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import * as ImagePicker from 'expo-image-picker';
const cloudName = "ddv2y93jq"; // Your Cloudinary Cloud Name
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import LocationPicker from "../LocationPicker";
import { ActivityIndicator } from "react-native-paper";
//  import i18n from "../i18n";
import { sendLocation } from "../sentLocation";
import { BottomSheet } from "react-native-btr";
// import MyCamera from "../camera";

const AgricultureFormAgent = () => {
const navigation = useNavigation();
const [selectedLocation, setSelectedLocation] = useState(null);
const [uploadedImages, setUploadedImages] = useState([]);
const [loading, setLoading] = useState(false);
const handleLocationSelected = (location) => {
setSelectedLocation(location);
console.log("SETTED", selectedLocation);
};
const [extraAmenities, setExtraAmenities] = useState("");
const [roadType, setRoadType] = useState("");
const [eleType, setEleType] = useState("");
const [landMark, setLandmark] = useState("");
const [distance, setDistance] = useState("");
const [contact,setContact]=useState("")
const [title, setTitle] = useState("");
const [ownerName, setOwnerName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [surveyNumber, setSurveyNumber] = useState("");
const [size, setSize] = useState(null);
const [price, setPrice] = useState(null);
const [totalPrice, setTotalPrice] = useState();
const [landType, setLandType] = useState(" ");
const [landName, setLandName] = useState(" ");
const [crops, setCrops] = useState("");
const [litigation, setLitigation] = useState(false);
const [litigationDesc, setLitigationDesc] = useState("");
const [images, setImages] = useState([]);
const [propertyDesc, setPropertyDesc] = useState("");
const [pinCode, setPinCode] = useState("");
const [country, setCountry] = useState("India");
const [state, setState] = useState("Andhra Pradesh");
const [surveyNo, setSurveyNo] = useState(" ");
const [boreWell, setBoreWell] = useState(false);
const [electricity, setElectricity] = useState(false);
const [distanceFromRoad, setDistanceFromRoad] = useState("");
const [storageFacility, setStorageFacility] = useState(false);
const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
const [priceUnit, setPriceUnit] = useState("/acres"); // Price unit
const [errors, setErrors] = useState({});

const [selectedImages, setSelectedImages] = useState([]);

const [pincode, setPincode] = useState("");
const [district, setDistrict] = useState("");
const [mandal, setMandal] = useState("");
const [village, setVillage] = useState("");
const [mandals, setMandals] = useState([]);
const [villages, setVillages] = useState([]);
const [addressDetails, setAddressDetails] = useState({
district: "",
mandal: "",
village: "",
});
const [OwnerNameerror, setOwnerNameError] = useState("");
const [PhoneNumbererror, setPhoneNumberError] = useState("");
const [LandNameerror, setLandNameError] = useState("");
const [LandSizeerror, setLandSizeError] = useState("");
const [LandPriceerror, setLandPriceError] = useState("");
const [pinCodeerror, setPincodeError] = useState("");
const [DistanceError, setDistanceError] = useState("");

const [cameraPermission, setCameraPermission] = useState(null); // For camera permissions
const [isCameraVisible, setIsCameraVisible] = useState(false); // To control visibility of camera
const [cameraType, setCameraType] = useState('back'); // Default to back camera
const cameraRef = useRef(null); // Camera reference


const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
const [uploadedImages1, setUploadedImages1] = useState([])
const toggleBottomSheet = () => {
setIsBottomSheetVisible(!isBottomSheetVisible);
};

const handleImagePick = async (mode) => {
  try {
    let result
    if (mode === "camera") {
      await ImagePicker.requestCameraPermissionsAsync()
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [1, 1],
        quality: 1,
      })
    }

    if (!result.canceled) {
      const sending = sendLocation(result.assets)

      const assets = Array.isArray(result.assets) ? result.assets : [result.assets]
      const uploadedUrls = await Promise.all(assets.map((asset) => uploadToCloudinary(asset.uri)))
      setUploadedImages1((prevImages) => [...prevImages, ...uploadedUrls])
   
    }
  } catch (error) {
    Alert.alert("Error picking images", error.message)
  }  
}

const uploadToCloudinary = async (imageUri) => {
  try {
    const formData = new FormData()
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    })
    formData.append("upload_preset", uploadPreset)

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName1}/image/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    console.log("Uploaded url:", response.data.secure_url)



    return response.data.secure_url
  } catch (error) {
    console.error("Upload error:", error)
    Alert.alert("Upload failed", "There was an error uploading your image.")
    return ""
  }
}

const removeImage1 = (index) => {
  setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index))
}

const renderImageItem = ({ item, index }) => (
  <View style={styles.imageContainer}>
    <Image source={{ uri: item }} style={styles.image} />
    <TouchableOpacity style={styles.removeButton} onPress={() => removeImage1(index)}>
      <Text style={styles.removeButtonText}>Remove</Text>
    </TouchableOpacity>
  </View>
)


React.useEffect(() => {
const getPermissions = async () => {
const cameraStatus = await Camera.requestCameraPermissionsAsync();
const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
console.log("permission",cameraStatus.granted, mediaLibraryStatus.granted)

setCameraPermission(cameraStatus.granted && mediaLibraryStatus.granted);
};

getPermissions();
}, []);

const handleOwnerNameChange = (value) => {
// Check if the value contains only alphabets
const regex = /^[A-Za-z\s]*$/; // Allows alphabets and spaces
if (!regex.test(value)) {
setOwnerNameError("Owner name should contain only alphabets");
} else {
setOwnerNameError("");
}
setOwnerName(value);
};

//   const formatPhoneNumber = (value) => {
//     // Remove all non-numeric characters
//     const cleanedValue = value.replace(/\D/g, "");

//     // Format it into 'xxx xxx xxxx'
//     let formattedPhoneNumber = "";
//     if (cleanedValue.length <= 3) {
//       formattedPhoneNumber = cleanedValue;
//     } else if (cleanedValue.length <= 6) {
//       formattedPhoneNumber =
//         cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
//     } else {
//       formattedPhoneNumber =
//         cleanedValue.substring(0, 3) +
//         " " +
//         cleanedValue.substring(3, 6) +
//         " " +
//         cleanedValue.substring(6, 10);
//     }

//     return formattedPhoneNumber;
//   };
//   const handleContactNumberChange = (value) => {
//     // Format the phone number
//     console.log(value)
//     setContact((prev)=>{prev+value})

//     const formattedNumber = formatPhoneNumber(value);
//     setPhoneNumber(formattedNumber);

//      const cleanedValue = value.replace(/\D/g, "");

//      const regex = /^[6-9]\d{9}$/;

// console.log(contact)
//      if (cleanedValue.length > 10) {
//       setPhoneNumberError("Contact number cannot exceed 10 digits");
//     } else if (!regex.test(cleanedValue)) {
//       setPhoneNumberError(
//         "Contact number must start with 6, 7, 8, or 9 and be 10 digits long"
//       );
//     } else {
//       setPhoneNumberError("");
//     }
//   };


const formatPhoneNumber = (value) => {
// Remove all non-numeric characters
const cleanedValue = value.replace(/\D/g, "");

// Format it into 'xxx xxx xxxx'
let formattedPhoneNumber = "";
if (cleanedValue.length <= 3) {
formattedPhoneNumber = cleanedValue;
} else if (cleanedValue.length <= 6) {
formattedPhoneNumber = cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
} else {
formattedPhoneNumber =
cleanedValue.substring(0, 3) +
" " +
cleanedValue.substring(3, 6) +
" " +
cleanedValue.substring(6, 10);
}

return formattedPhoneNumber;
};

const handleContactNumberChange = (value) => {
// Remove all non-numeric characters for unformatted value
const cleanedValue = value.replace(/\D/g, "");

// Format the phone number
const formattedNumber = formatPhoneNumber(value);

// Update formatted phone number for display
setPhoneNumber(formattedNumber);

// Store unformatted number for backend submission
setContact(cleanedValue);

// Phone number validation
const regex = /^[6-9]\d{9}$/;
if (cleanedValue.length > 10) {
setPhoneNumberError("Contact number cannot exceed 10 digits");
} else if (!regex.test(cleanedValue)) {
setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
} else {
setPhoneNumberError(""); // No error
}
};


// const handleContactNumberChange = (value) => {
//     setPhoneNumber(value);
//     // Check if the value matches the required pattern
//     const regex = /^[6-9]\d{0,9}$/; // Starts with 6-9 and has up to 10 digits
//     if (value.length > 10) {
//         setPhoneNumberError('Contact number cannot exceed 10 digits');

//     } else if (!regex.test(value)) {
//         setPhoneNumberError('Contact number must start with 6, 7, 8, or 9 and be 10 digits long');
//     } else {
//         setPhoneNumberError('');
//     }

// };
// const [selectedImages, setSelectedImages] = useState([]);

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
console.log(images);
};

const renderItem = ({ item }) => {
const isSelected = selectedImages.includes(item); // Check if the image is selected
return (
<TouchableOpacity onPress={() => toggleSelection(item)}>
<Image
source={{ uri: item.uri }}
style={[
{ width: 100, height: 100, margin: 5 },
isSelected && { borderWidth: 3, borderColor: "blue" },
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

const handleCheckboxChange = (value) => {
if (landUsage.includes(value)) {
setLandUsage(landUsage.filter((item) => item !== value));
} else {
setLandUsage([...landUsage, value]);
}
};

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
console.log("latitue cmg ", latitude, longitude);
// setLatitude(latitude1);
// setLogitude(longitude1)
setLocationDetails(locationString); // Update locationDetails state
setCurrentLocation(locationString); // Auto-fill currentLocation field
setSelectedLocation(locationString);
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
const [currentLocation, setCurrentLocation] = useState("");
const [locationDetails, setLocationDetails] = useState("");
const [latitude, setLatitude] = useState("");
const [longitude, setLogitude] = useState("");
// const [landMark, setLandmark] = useState("");
const validateDistance = (value) => {
const regex = /^\d+$/;
if (!regex.test(value)) {
alert("Kilometers should be in digits");
return false;
}
return true;
};

// Handle pincode change
const handlePincodeChange = async (e) => {
const pincodeValue = e.nativeEvent.text;

console.log(pincodeValue);

setPincode(pincodeValue);
setAddressDetails({
district: "",
mandal: "",
village: "",
});
setMandals([]);
setVillages([]);

if (pincodeValue.length === 6) {
try {
const response = await axios.get(
`https://real-estate-back-end-zin4-31beobvym-pindu123s-projects.vercel.app/location/getlocationbypincode/${pincodeValue}/@/@`
);
console.log(response.data);
const districtList = response.data.districts;
const mandalList = response.data.mandals || [];
const villageList = response.data.villages || [];

setDistrict(districtList[0] || "");
setMandals(mandalList);
setVillages(villageList);
setAddressDetails({
district: districtList[0] || "",
mandal: mandalList[0] || "",
village: villageList[0] || "",
});
} catch (error) {
console.error("Error fetching data:", error);
Alert.alert("Error", "Failed to fetch location data.");
}
}
};

const handleDistrictChange = async (selectedDistrict) => {
setDistrict(selectedDistrict);
setMandals([]);
setVillages([]);
setAddressDetails((prev) => ({ ...prev, district: selectedDistrict }));

try {
const response = await axios.get(
`https://real-estate-back-end-zin4-31beobvym-pindu123s-projects.vercel.app/location/getmandals/${selectedDistrict}`
);
setMandals(response.data.mandals || []);
} catch (error) {
console.error("Error fetching mandals:", error);
Alert.alert("Error", "Failed to fetch mandals.");
}
};

const handleMandalChange = async (selectedMandal) => {
setMandal(selectedMandal);
setVillages([]);
setAddressDetails((prev) => ({ ...prev, mandal: selectedMandal }));

try {
const response = await axios.get(
`https://real-estate-back-end-zin4-31beobvym-pindu123s-projects.vercel.app/location/getvillagesbymandal/${selectedMandal}`
);
setVillages(response.data || []);
} catch (error) {
console.error("Error fetching villages:", error);
Alert.alert("Error", "Failed to fetch villages.");
}
};

const handleVillageChange = (selectedVillage) => {
setVillage(selectedVillage);
setAddressDetails((prev) => ({ ...prev, village: selectedVillage }));
};

const apiUrl = "https://real-estate-back-end-zin4-31beobvym-pindu123s-projects.vercel.app/fields/insert";

const calculateTotalPrice = () => {
let sizeInAcres = parseFloat(size);
let pricePerAcre = parseFloat(price);

if (sizeUnit === "sq.ft") sizeInAcres /= 43560;
else if (sizeUnit === "sq.yards") sizeInAcres /= 4840;
else if (sizeUnit === "sq.m") sizeInAcres /= 4046.86;
else if (sizeUnit === "cents") sizeInAcres /= 100;

if (priceUnit === "/sq.ft") pricePerAcre *= 43560;
else if (priceUnit === "/sq.yard") pricePerAcre *= 4840;
else if (priceUnit === "/sq.m") pricePerAcre *= 4046.86;
else if (priceUnit === "/cents") pricePerAcre *= 100;

if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
setTotalPrice((sizeInAcres * pricePerAcre).toFixed(2));
} else {
setTotalPrice("");
}
};
const routing = () => {
console.log("In the routing");
navigation.navigate("asd");
};

const validateForm = () => {
const newErrors = {};
if (!ownerName.trim()) newErrors.ownerName = "Owner Name is required";

if (!phoneNumber.trim()) {
newErrors.phoneNumber = "Phone number is required";
}

if (!landType.trim()) {
newErrors.landType = "Land Type is required";
}

if (!landName.trim()) {
newErrors.landName = "Land title is required";
}

if (!surveyNo.trim()) {
newErrors.surveyNo = "Surbey number is required";
}

if (!size) {
newErrors.size = "Size is required";
}
if (!sizeUnit.trim()) {
newErrors.sizeUnit = "Size unit is required";
}
if (!price) {
newErrors.price = "Price is required";
}
if (!priceUnit.trim()) {
newErrors.priceUnit = "Price unit is required";
}
if (!totalPrice) {
newErrors.totalPrice = "Total price is required";
}
if (isDispute) {
if (!description.trim()) {
newErrors.litigationDesc = "Litigation description is required";
}
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

if (!eleType.trim()) {
newErrors.eleType = "Electricity Type is required";
}
if (!roadType.trim()) {
newErrors.roadType = "Road type is required";
}

setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const resetForm = () => {
setOwnerName("");
setPhoneNumber("");
setLandType("");
setPinCode("");
setDescription("");
setDistrict("");
setCountry("");
setState("");
setSize("");
setSizeUnit("");
setEleType("");
setElectricity("");
setDistanceFromRoad("");
setBoreWell("");
setImages("");
setPrice("");
setPriceUnit("");
setIsDispute("");
setLitigationDesc("");
setMandal("");
setRoadType("");
setTotalPrice("");
setSurveyNo("");
setLandmark("");
setLatitude("");
setLogitude("");
};

const SubmitForm = async () => {
// console.log("price", values.price);
try {
// const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
// console.log("Token:", token);

// if (!token) {
// Alert.alert("Error", "No token found. Please log in again.");
// return; // Exit if token is not found
// }

const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
if (!token) {
Alert.alert("Error", "No token found. Please log in again.");
return; // Exit if token is not found
}

console.log("UPLOADEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD1", uploadedImages1)
const data = {
ownerDetails: {
ownerName,
phoneNumber: String(contact),
},
landDetails: {
title: landName,
surveyNumber: surveyNo,
size: size,
sizeUnit,
price: price,
priceUnit,
landType,
totalPrice: totalPrice,
images: uploadedImages1,
litigation: isDispute,
litigationDesc: description || "fdgdsf",
propertyDesc: String(propertyDesc),
},
address: {
pinCode: pincode,
country,
state,
district: addressDetails.district,
mandal: addressDetails.mandal,
village: addressDetails.village,
// latitude: String(selectedLocation?.latitude),
latitude: String(latitude),
longitude: String(longitude),

// longitude: String(selectedLocation?.longitude)
},
amenities: {
boreWell,
electricity: eleType,
distanceFromRoad: distance,
storageFacility,
roadType,
},
};
// console.log(values.price)
console.log("Form Data:", data);
// Send POST request to the API

await axios
.post("http://172.17.15.189:3000/fields/insert", data, {
headers: {
Authorization: `Bearer ${token}`, // Include the token in headers
"Content-Type": "application/json",
},
})
.then((response) => {
console.log("response", response.status);
if (response.status === 201) {
console.log("data cmg afterhitting", response);
Alert.alert(
"Success",
"Agricultural Land details submitted successfully!"
);
resetForm();
navigation.navigate("asd");
} else {
Alert.alert("Error", "submit successfull");
}
});
 

Alert.alert("Required Fields are Missing")
} catch (error) {
Alert.alert("Error", "Failed to submit data. Please try again.");
// console.error(error.response?.data || error.message); // Log the error
console.error(
"API Response Error:",
error.response?.data || error.message
);
}
};
const validateNumericInput = (value) => {
const parsedValue = parseFloat(value);
return isNaN(parsedValue) ? 0 : parsedValue; // Return 0 if value is NaN
};
useEffect(() => {
calculateTotalPrice();
}, [size, price, sizeUnit, priceUnit]);

const CustomCheckBox = ({ label, value, onValueChange }) => (
<TouchableOpacity
style={styles.checkboxContainer}
onPress={() => onValueChange(!value)}
>
<View style={value ? styles.checkedBox : styles.uncheckedBox} />
<Text style={styles.checkboxLabel}>{label}</Text>
</TouchableOpacity>
);

// const pickImages = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//     allowsMultipleSelection: true, // Allow multiple images to be selected
//   });

//   if (!result.canceled && result.assets.length > 0) {
//     setLoading(true);

//     setImages(result.assets);

//     uploadImages(result.assets);
//   }
// };


const pickImages = async () => {
const result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
allowsEditing: true,
aspect: [4, 3],
quality: 1,
allowsMultipleSelection: true, // Allow multiple images to be selected
});



if (!result.canceled && result.assets.length > 0) {
setLoading(true);
setImages(result.assets); // Store selected images
uploadImages(result.assets); // Start uploading images
}
};

// useEffect(()=>{
// loadLanguage();
// },[])

// const loadLanguage = async () => {
// const savedLanguage = await AsyncStorage.getItem('language');
// if (savedLanguage) {
// i18n.locale = savedLanguage;
// }
// };

const uploadImages = async (imageAssets) => {
const uploadedUrls = [];

try {
for (const asset of imageAssets) {
const formData = new FormData();
formData.append("file", {
uri: asset.uri,
type: "image/jpeg",
name: "upload.jpg",
});
formData.append("upload_preset", "sni4p6lt");

const response = await axios.post(
`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
formData,
{
headers: { "Content-Type": "multipart/form-data" },
}
);

uploadedUrls.push(response.data.secure_url);
setSelectedImages(uploadedUrls);
setUploadedImages(uploadedUrls);
}
console.log("Uploaded URLs:", uploadedUrls);
setSelectedImages(uploadedUrls);
console.log("Uploaded :", uploadedUrls);

// Ensure onUrlsReturn is a valid function
} catch (error) {
console.error("Upload error:", error);
Alert.alert("Upload failed", "There was an error uploading your images.");
} finally {
setLoading(false);
}
};
const sentImage=(locImage)=>{
console.log("sdasadas",locImage)

setImages(locImage)
setSelectedImages(locImage)
}

const takePicture = async () => {
if (cameraRef.current) {
const photo = await cameraRef.current.takePictureAsync();
setImages([photo]); // Store taken picture in the images state
setIsCameraVisible(false); // Hide camera after taking the picture
uploadImages([photo]); // Upload the taken picture
}
};
const toggleCameraType = () => {
setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
};



//   if (cameraPermission === null) {
//     return <View><Text>Requesting permissions...</Text></View>;
//   }
// else {
//     return <View><Text>Permission to access camera and gallery is required!</Text></View>;
//   }


const [isDispute, setIsDispute] = useState(false); // State for toggle
const [description, setDescription] = useState(""); // State for description field

const toggleDispute = (value) => {
setIsDispute(value);
};
return (
<>
<ScrollView>
<View style={styles.customcontainer}>
<Text style={styles.stylingtext}>Agriculture Land Details</Text>
{/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}
</View>

<View style={styles.container}>
<Text style={styles.label1}>
Owner Name <Text style={{ color: "red" }}>*</Text>
</Text>
<TextInput
style={[styles.input, errors.ownerName && styles.inputError]}
placeholder="Enter owner name"
value={ownerName}
onChangeText={handleOwnerNameChange}
/>
{OwnerNameerror ? (
<Text style={styles.errorText}>{OwnerNameerror}</Text>
) : null}
{errors.ownerName && (
<Text style={styles.errorText}>{errors.ownerName}</Text>
)}

<Text style={styles.label1}>
Contact Number <Text style={{ color: "red" }}>*</Text>
</Text>
<TextInput
style={[styles.input, errors.phoneNumber && styles.inputError]}
placeholder="Enter contact number"
value={phoneNumber}
keyboardType="numeric"
onChangeText={handleContactNumberChange}
// onChangeText={(value) => setPhoneNumber(value)}
/>

{PhoneNumbererror ? (
<Text style={styles.errorText}>{PhoneNumbererror}</Text>
) : null}
{errors.phoneNumber && (
<Text style={styles.errorText}>{errors.phoneNumber}</Text>
)}

<View style={styles.switchContainer}>
<Text style={styles.label}>Is this a dispute?</Text>
<Switch value={isDispute} onValueChange={toggleDispute} />
</View>

{/* Text Input for Description (only required if dispute is true) */}
{isDispute && (
<View style={styles.textAreaContainer}>
<Text style={styles.label}>
Description (Required for disputes){" "}
<Text style={{ color: "red" }}>*</Text>
</Text>
<TextInput
style={[
styles.textArea,
errors.litigationDesc && styles.inputError,
]}
placeholder="Enter description"
value={description}
onChangeText={setDescription}
multiline
numberOfLines={4}
/>
</View>
)}

<Text style={styles.label1}>
Land Type <Text style={{ color: "red" }}>*</Text>
</Text>

<View
style={[
styles.pickerWrapper1,
errors.landType && styles.pickerError,
]}
>
<Picker
selectedValue={landType}
onValueChange={(selectedValue) => setLandType(selectedValue)}
>
<Picker.Item label="Select land type" value="" color="#888" />
<Picker.Item label="Dry Land" value="Dry Land" />
<Picker.Item label="Wet Land" value="Wet Land" />
<Picker.Item label="Converted Land" value="Converted Land" />
</Picker>
</View>
{errors.landType && (
<Text style={styles.errorText}>{errors.landType}</Text>
)}

<Text style={styles.label1}>
Land Name <Text style={{ color: "red" }}> *</Text>
</Text>
<TextInput
style={[styles.input, errors.landType && styles.inputError]}
placeholder="Enter land name"
value={landName}
onChangeText={(value) => {
const regex = /^[A-Za-z\s]*$/;
if (!regex.test(value)) {
setLandNameError("Land name should contain only alphabets");
} else {
setLandNameError("");
}
setLandName(value);
}}
/>
{LandNameerror ? (
<Text style={styles.errorText}>{LandNameerror}</Text>
) : null}
{errors.landName && (
<Text style={styles.errorText}>{errors.landName}</Text>
)}

<Text style={styles.label1}>
Survey No <Text style={{ color: "red" }}> *</Text>
</Text>
<TextInput
style={[styles.input, errors.surveyNo && styles.inputError]}
placeholder="Enter survey no"
value={surveyNo}
onChangeText={(value) => setSurveyNo(value)}
/>
{errors.surveyNo && (
<Text style={styles.errorText}>{errors.surveyNo}</Text>
)}

<Text style={styles.label1}>
Land Size <Text style={{ color: "red" }}>*</Text>
</Text>
<View style={styles.inputContainer}>
{/* Land Size Text Input */}
<TextInput
style={[styles.input, errors.size && styles.inputError]}
value={size}
placeholder="Enter land size"
keyboardType="numeric" // Ensures numeric input only
onChangeText={(value) => {
const regex = /^[0-9]*\.?[0-9]*$/;

if (!regex.test(value)) {
setLandSizeError("Land size should contain only Numbers");
} else {
setLandSizeError("");
}
setSize(value);
}}
/>

<View
style={[
styles.pickerWrapper,
errors.sizeUnit && styles.pickerError,
]}
>
<Picker
selectedValue={sizeUnit}
onValueChange={(selectedValue) => setSizeUnit(selectedValue)}
style={[styles.picker, errors.sizeUnit && styles.pickerError]}
>
<Picker.Item label="None" />
<Picker.Item label="Cents" value="cents" />
<Picker.Item label="Acres" value="acres" />
<Picker.Item label="Square Feet" value="sqft" />
<Picker.Item label="Square Meters" value="sqm" />
<Picker.Item label="Hectares" value="hectares" />
</Picker>
</View>
</View>
{errors.size && <Text style={styles.errorText}>{errors.size}</Text>}

{LandSizeerror ? (
<Text style={styles.errorText}>{LandSizeerror}</Text>
) : null}
{errors.sizeUnit && (
<Text style={styles.errorText}>{errors.sizeUnit}</Text>
)}

<Text style={styles.label1}>
Price <Text style={{ color: "red" }}>*</Text>
</Text>

<View style={styles.inputContainer}>
{/* Land Size Text Input */}
<TextInput
style={[styles.input, errors.price && styles.inputError]}
placeholder="Enter price"
keyboardType="numeric"
value={price}
onChangeText={(value) => {
const regex = /^[0-9]*\.?[0-9]*$/;

if (!regex.test(value)) {
setLandPriceError("Land size should contain only alphabets");
} else {
setLandPriceError("");
}
setPrice(value);
}}
/>

<View
style={[
styles.pickerWrapper,
errors.priceUnit && styles.pickerError,
]}
>
<Picker
selectedValue={priceUnit}
onValueChange={(selectedValue) => {
setPriceUnit(selectedValue);
}}
style={[styles.picker, errors.priceUnit && styles.pickerError]}
>
<Picker.Item label="None" />
<Picker.Item label="Cents" value="/cents" />
<Picker.Item label="Acres" value="/acres" />
<Picker.Item label="Square Feet" value="/sq.ft" />
<Picker.Item label="Square Meters" value="/sq.m" />
<Picker.Item label="Hectares" value="/hectares" />
</Picker>
</View>
</View>
{LandPriceerror ? (
<Text style={styles.errorText}>{LandPriceerror}</Text>
) : null}
{errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
{errors.priceUnit && (
<Text style={styles.errorText}>{errors.priceUnit}</Text>
)}

<Text style={styles.label1}>
Total Price <Text style={{ color: "red" }}>*</Text>
</Text>

<View>
<TextInput
placeholder="Total Price"
value={`${totalPrice} `}
editable={false}
style={[styles.input, errors.totalPrice && styles.inputError]}
/>
</View>
{errors.totalPrice && (
<Text style={styles.errorText}>{errors.totalPrice}</Text>
)}
<Text style={styles.label1}>Description</Text>

<View style={styles.textAreaContainer}>
<TextInput
style={styles.textArea}
placeholder="Enter description"
value={propertyDesc}
onChangeText={(value) => setPropertyDesc(value)}
multiline
numberOfLines={4}
/>
</View>
<Text style={styles.label1}>
Country <Text style={{ color: "red" }}>*</Text>
</Text>
<TextInput
style={[styles.input, errors.country && styles.inputError]}
placeholder="Enter country"
value={country}
onChangeText={(value) => {
setCountry(value);
}}
/>
{errors.country && (
<Text style={styles.errorText}>{errors.country}</Text>
)}

<Text style={styles.label1}>
State <Text style={{ color: "red" }}>*</Text>
</Text>
<TextInput
style={[styles.input, errors.state && styles.inputError]}
placeholder="Enter state"
value={state}
onChangeText={(value) => setState(value)}
/>
{errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

<Text style={styles.label1}>
Pincode <Text style={{ color: "red" }}>*</Text>
</Text>

<TextInput
placeholder="Pincode"
value={pincode}
onChange={handlePincodeChange}
style={[
styles.input,
styles.pincodeInput,
errors.pincode && styles.inputError,
]}
/>
{pinCodeerror ? (
<Text style={styles.errorText}>{pinCodeerror}</Text>
) : null}
{errors.pinCode && (
<Text style={styles.errorText}>{errors.pincode}</Text>
)}

<Text style={styles.label1}>
District <Text style={{ color: "red" }}>*</Text>
</Text>

<TextInput
placeholder="District"
value={district}
onChangeText={handleDistrictChange}
style={[
styles.input,
styles.districtInput,
errors.district && styles.inputError,
]}
editable={false}
/>
{errors.district && (
<Text style={styles.errorText}>{errors.district}</Text>
)}

<Text style={styles.label1}>
Mandal <Text style={{ color: "red" }}>*</Text>
</Text>
<View
style={[styles.pickerWrapper1, errors.mandal && styles.pickerError]}
>
<Picker selectedValue={mandal} onValueChange={handleMandalChange}>
{mandals.length > 0 ? (
mandals.map((mandalOption, index) => (
<Picker.Item
key={index}
label={mandalOption}
value={mandalOption}
/>
))
) : (
<Picker.Item label="Mandal" value="" />
)}
</Picker>
</View>
{errors.mandal && (
<Text style={styles.errorText}>{errors.mandal}</Text>
)}

<Text style={styles.label1}>
Village <Text style={{ color: "red" }}>*</Text>
</Text>

{/* <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5  ,styles.pickerWrapper1 ,errors.mandal&&styles.pickerError]}> */}
<View
style={[
styles.pickerWrapper1,
errors.village && styles.pickerError,
]}
>
<Picker
selectedValue={village}
onValueChange={handleVillageChange}
style={[errors.village && styles.pickerError]}
>
{villages.length > 0 ? (
villages.map((villageOption, index) => (
<Picker.Item
key={index}
label={villageOption}
value={villageOption}
/>
))
) : (
<Picker.Item label="Village" value="" />
)}
</Picker>
</View>
{errors.village && (
<Text style={styles.errorText}>{errors.village}</Text>
)}

<Text style={styles.label1}>
Land Mark<Text style={{ color: "red" }}>*</Text>
</Text>

<TextInput
style={styles.input}
placeholder="Enter land mark"
value={landMark}
onChangeText={(value) => {
setLandmark(value);
}}
/>
<Text style={styles.label1}>
Electricity Type <Text style={{ color: "red" }}>*</Text>
</Text>

{/* <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}> */}
<View
style={[
styles.pickerWrapper1,
errors.eleType && styles.pickerError,
]}
>
<Picker
selectedValue={eleType}
onValueChange={(selectedValue) => {
setEleType(selectedValue);
}}
style={[errors.eleType && styles.pickerError]}
>
{/* <Picker.Item label="Select electricity type" value="" color="#888" /> */}
<Picker.Item label="None" value="none" />

<Picker.Item label="Agricultural" value="agricultural" />
<Picker.Item label="Commercial" value="commercial" />

<Picker.Item label="Domestic" value="domestic" />
<Picker.Item label="Industrial" value="industrial" />
</Picker>
</View>

{errors.eleType && (
<Text style={styles.errorText}>{errors.eleType}</Text>
)}

<View style={styles.switchContainer}>
<Text style={styles.label}>Bore Facility</Text>
<Switch
value={boreWell}
onValueChange={(value) => {
setBoreWell(value);
}}
/>
</View>

<View style={styles.switchContainer}>
<Text style={styles.label}>Storage Facility</Text>
<Switch
value={storageFacility}
onValueChange={(value) => {
setStorageFacility(value);
}}
/>
</View>
<Text style={styles.label1}>Distance from road (or) Highway </Text>

<TextInput
style={[styles.input]}
placeholder= "Enter distance in Kms"
keyboardType="numeric"
value={distance}
onChangeText={(value) => {
const regex = /^[0-9]*\.?[0-9]*$/;
if (regex.test(value) || value === "") {
setDistance(value);
setDistanceError("");
} else {
setDistanceError("Distance must only contain numbers");
}
}}
/>
{DistanceError ? (
<Text style={styles.errorText}>{DistanceError}</Text>
) : null}
<Text style={styles.label1}>
Select Road Type <Text style={{ color: "red" }}>*</Text>
</Text>
{/* <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}> */}
<View
style={[
styles.pickerWrapper1,
errors.roadType && styles.pickerError,
]}
>
<Picker
selectedValue={roadType}
onValueChange={(selectedValue) => {
setRoadType(selectedValue);
}}
>
{/* <Picker.Item label="Select road type" value="" color="#888" /> */}
<Picker.Item label="None" value="none" />

<Picker.Item label="Near to R&B" value="nearToR&B" />
<Picker.Item label="Near to Highway" value="nearToHighway" />

<Picker.Item label="Near to Panchayat" value="nearToPanchayat" />
<Picker.Item label="Near to Village" value="neatToVillage" />
</Picker>
</View>
{errors.roadType && (
<Text style={styles.errorText}>{errors.roadType}</Text>
)}

<View style={styles.textAreaContainer}>
<Text style={styles.label1}>Extra amenities</Text>
<TextInput
style={styles.textArea}
placeholder="Enter description"
value={extraAmenities}
onChange={(value) => {
setExtraAmenities(value);
}}
multiline
numberOfLines={4}
/>
</View>

<Text style={styles.label1}>Current location</Text>
<Button
// mode="contained"
title="choose location"
onPress={getUserLocation}
icon={() => <Icon name="md-compass" size={20} color="#000" />}
style={styles.locationButton}
></Button>

<Text style={styles.label1}>Latitude</Text>
<TextInput
style={styles.input}
placeholder="Latitude"
value={`${latitude}`}
editable={false}
/>
<Text style={styles.label1}>Longitude</Text>
<TextInput
style={styles.input}
placeholder= "Longitude"
value={`${longitude}`}
editable={false}
/>

<LocationPicker onLocationSelected={handleLocationSelected} />
{/*
{selectedLocation && (
<View >
<Text>Selected Location from LocationPicker:</Text>
<Text>Latitude: {selectedLocation.latitude}</Text>
<Text>Longitude: {selectedLocation.longitude}</Text>
</View>
)} */}
{/* {selectedLocation && (
<> */}
{/* </> */}
{/* )} */}

{/* <TextInput
style={styles.input}
placeholder="currentLocation"
value={currentLocation}
onChangeText={setCurrentLocation}
/> */}

{/* <Text style={styles.label1}>{i18n.t("Upload Images")}</Text> */}

{/* <View style={{marginBottom:10}}>
<Button title="Pick images from camera roll" onPress={pickImages} />

<FlatList
data={images}
horizontal
keyExtractor={(item, index) => index.toString()}
scrollEnabled={false}
renderItem={({ item }) => (
<Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 5 }} />
)}
/>

</View> */}

{/* <View style={{ marginTop: "10px" }}>
<Button
title="Select Images"
onPress={pickImages}
style={styles.button}
/>

</View>
<View style={{ marginBottom: 10, flex: 1 }}>
{loading ? (
<ActivityIndicator
size="small"
color="blue"
style={{
flex: 1,
justifyContent: "center",
alignItems: "center",
}}
/>
) : (
<FlatList
data={images}
horizontal
keyExtractor={(item, index) => index.toString()}
renderItem={renderItem}
/>
)}
</View>   */}
{/* <CameraOption onSelectImage={sentImage}/> */}


 <BottomSheet
      visible={isBottomSheetVisible}
      onBackButtonPress={toggleBottomSheet}
      onBackdropPress={toggleBottomSheet}
      snapPoints={['50%', '80%']} // Or you can use numeric values like [200, 400]
      initialSnapIndex={0}
    >
      <View style={styles.panel}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose your profile photo</Text>
        </View>
        <TouchableOpacity style={styles.panelButton}  
    onPress={() => handleImagePick("camera")}
       >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton}   onPress={() => handleImagePick("gallery")}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>

    <Button title="Upload images" onPress={toggleBottomSheet} ></Button>


    <FlatList
        data={uploadedImages1}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.imageList}
      />

{/*
<View style={{ marginBottom: 10, flex: 1 }}>
{loading ? (
<ActivityIndicator
size="small"
color="blue"
style={{
flex: 1,
justifyContent: "center",
alignItems: "center",
}}
/>
) : (
<FlatList
data={images}
horizontal
keyExtractor={(item, index) => index.toString()}
renderItem={renderItem}
/>
)}
</View>     */}

{/* <View style={{ marginTop: 10 }}>
<Button title="Select Images" onPress={pickImages} />
<Button title="Use Camera" onPress={() => setIsCameraVisible(true)} />

{console.log("camvis", isCameraVisible)}
{isCameraVisible ? (    <View style={{ flex: 1, justifyContent: 'center' }}>
<Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
<Button title="Take Picture" onPress={takePicture} />
<Button title="Switch Camera" onPress={toggleCameraType} />
</Camera>
</View>) :( null)}


{
isCameraVisible&&(<View>abc</View>)
}
<View style={{ marginBottom: 10, flex: 1 }}>
{loading ? (
<ActivityIndicator
size="small"
color="blue"
style={{
flex: 1,
justifyContent: 'center',
alignItems: 'center',
}}
/>
) : (
<FlatList
data={selectedImages} // Display the uploaded image URLs
horizontal
keyExtractor={(item, index) => index.toString()}
renderItem={renderItem}
/>
)}
</View>
</View> */}

{/* <MyCamera/> */}
<Button title="Submit" color="#4184AB" onPress={SubmitForm}></Button>
</View>
</ScrollView>
</>
);
};
// export default AgricultureFormAgent;

const styles = StyleSheet.create({
// container: {
// flex: 1,
// paddingTop: 20,
// paddingLeft:20,
// paddingRight:20,
// paddingBottom:100,
// backgroundColor: "#fff",
// },

container: {
flex: 1,
paddingTop: 20,
paddingLeft: 20,
paddingRight: 20,
paddingBottom: 20,
justifyContent: "start",
backgroundColor: "#fff",
},
label1: {
marginTop: 5,
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
},
switchContainer: {
flexDirection: "row", // Align switch and label horizontally
justifyContent: "space-between", // Spread out the elements
alignItems: "center", // Center vertically
},
errorText: {
color: "red",
fontSize: 14,
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
errorText: {
color: "red",
fontSize: 14,
},
borderColor: "gray",
borderWidth: 1,
padding: 10,
textAlignVertical: "top",
},

inputContainer: {
flexDirection: "row", // Align elements horizontally
alignItems: "center", // Vertically align the elements
justifyContent: "space-between", // Space between the text input and picker
},
input: {
flex: 1, // Take half the available width
height: 40,
width: "100%",
borderColor: "gray",
borderWidth: 1,
marginRight: 10, // Space between text input and picker
paddingLeft: 10,
borderRadius: 10,
},
pickerWrapper: {
height: 40,
width: 130,
borderColor: "gray",
borderWidth: 1, // Apply border to wrapper instead of the Picker
borderRadius: 5, // Optional, to round the corners
justifyContent: "center", // Vertically center the text
alignItems: "center", // Horizontally center the text
},
pickerWrapper1: {
height: 50,

borderColor: "gray",
borderWidth: 1, // Apply border to wrapper instead of the Picker
borderRadius: 5, // Optional, to round the corners
},

picker: {
height: 40,
width: 140, // Width of the dropdown (picker)
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
position: "absolute",
top: 0,
right: 0,
backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
borderRadius: 15,
width: 20,
height: 20,
justifyContent: "center",
alignItems: "center",
},
removeButtonText: {
color: "white",
fontSize: 16,
fontWeight: "bold",
textAlign: "center",
marginTop: -2, // Slight adjustment for vertical centering
},

inputError: { borderColor: "red", borderWidth: 1 },
errorText: { color: "red", fontSize: 12, marginTop: 5 },
pickerError: {
borderColor: "red", // Add a red border if there's an error
},
bottomSheetContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelButtonTitle: {
    fontSize: 16, // Font size of the text
    color: '#ffffff', // White text color
   },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  imageList: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: "48%",
    aspectRatio: 1,
    margin: "1%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  removeButton: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 3,
  },
  removeButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default AgricultureFormAgent;