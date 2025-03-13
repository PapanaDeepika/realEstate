// import React, { useState } from "react";
// import LocationPicker from "../LocationPicker";
// import {
//   ActivityIndicator,
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   Switch,
//   Image,
//   ScrollView,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Location from "expo-location";

// import axios from "axios";
// import { Picker } from "@react-native-picker/picker";
// import { useEffect } from "react";
// // import ImageUploader from "../imagePicker";
// // import Modal from 'react-native-modal';
// import MapView, { Marker } from "react-native-maps";
// import { jwtDecode } from "jwt-decode";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import CameraOption from "../cameraForms";
//  import i18n from "../i18n";
// const cloudName = "ddv2y93jq"; // Your Cloudinary Cloud Name
// const LayoutFormAgent = () => {
//   // State variables for owner details and layout details
//   const [checked, setChecked] = useState(false);
//   // const [selectedLocation, setSelectedLocation] = useState(null);
//   const navigation = useNavigation();
//    const handleLocationSelected = (location) => {
//     setSelectedLocation(location);
//     console.log("SETTED", selectedLocation);
//   };
//   const [ownerName, setOwnerName] = useState("");
//   const [ownerContact, setOwnerContact] = useState("");
//   const [ownerEmail, setOwnerEmail] = useState("");
//   const [layoutTitle, setLayoutTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [plotCount, setPlotCount] = useState("");
//   const [availablePlots, setAvailablePlots] = useState("");
//   const [plotSize, setPlotSize] = useState("");
//   const [plotPrice, setPlotPrice] = useState("");
//   const [totalAmount, setTotalAmount] = useState("");

//   const [errors, setErrors] = useState({});
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLogitude] = useState("");
//   const [landMark, setLandmark] = useState("");
//   const [currentLocation, setCurrentLocation] = useState("");
//   const [pinCode, setPincode] = useState("");
//   const [district, setDistrict] = useState("");
//   const [mandal, setMandal] = useState("");
//   const [village, setVillage] = useState("");
//   const [mandals, setMandals] = useState([]);
//   const [villages, setVillages] = useState([]);
//   const [addressDetails, setAddressDetails] = useState({
//     district: "",
//     mandal: "",
//     village: "",
//   });

//   // State variables for layout approvals
//   const [reraRegistered, setReraRegistered] = useState(false);
//   const [dtcpApproved, setDtcpApproved] = useState(false);
//   const [tlpApproved, setTlpApproved] = useState(false);
//   const [flpApproved, setFlpApproved] = useState(false);

//   // State variables for amenities
//   const [underGroundWater, setUnderGroundWater] = useState(false);
//   const [drainageSystem, setDrainageSystem] = useState(false);
//   const [electricityFacility, setElectricityFacility] = useState(false);
//   const [swimmingPool, setSwimmingPool] = useState(false);
//   const [playZone, setPlayZone] = useState(false);
//   const [gym, setGym] = useState(false);
//   const [conventionHall, setConventionHall] = useState(false);
//   const [medical, setMedical] = useState(0);
//   const [educational, setEducational] = useState(0);
//   const [images, setImages] = useState([]); // New state for handling image URLs
//   const [extraAmenitiesString, setextraAmenitiesString] = useState("");
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [extraAmenities, setExtraAmenities] = useState("");
//   const [selectedValue, setSelectedValue] = useState("option1"); // Default selected value
//   const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
//   const [priceUnit, setPriceUnit] = useState("/acre"); // Price unit
//   // const [selectedImages, setSelectedImages] = useState([]); // Selected images
//   const [uploadedImages, setUploadedImages] = useState([]); // Uploaded images URLs

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [agents, setAgents] = useState([]); // State to store the agents
//   const [selectedAgent, setSelectedAgent] = useState(" "); // State to store selected agent's name
//   const [loading, setLoading] = useState(true); // State to manage loading
//    const [contact,setContact]=useState("")
//   const [PhoneNumbererror,setPhoneNumberError]=useState("")

//   const [isSubmitted,setIsSubmitted]=useState(false)

//   // State variable for images
//   // const [uploadPics, setUploadPics] = useState([]);

//   const apiUrl = " https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/layout/insert"; // Replace with your actual API URL

//   // Function to handle image selection
//   const selectImage = () => {
//     const options = {
//       mediaType: "photo",
//       includeBase64: true,
//       quality: 1,
//     };
//   };
//   const handlePincodeChange = async (e) => {
//     const pincodeValue = e.nativeEvent.text;
//     console.log(pincodeValue);

//     setPincode(pincodeValue);

//     setAddressDetails({
//       district: "",
//       mandal: "",
//       village: "",
//     });
//     setMandals([]);
//     setVillages([]);

//     if (pincodeValue.length === 6) {
//       try {
//         const response = await axios.get(
//           ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getlocationbypincode/${pincodeValue}/@/@`
//         );
//         console.log(response.data);
//         const districtList = response.data.districts;
//         const mandalList = response.data.mandals || [];
//         const villageList = response.data.villages || [];

//         setDistrict(districtList[0] || "");
//         setMandals(mandalList);
//         setVillages(villageList);
//         setAddressDetails({
//           district: districtList[0] || "",
//           mandal: mandalList[0] || "",
//           village: villageList[0] || "",
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Alert.alert("Error", "Failed to fetch location data.");
//       }
//     }
//   };

//   const formatPhoneNumber = (value) => {
//     // Remove all non-numeric characters
//     const cleanedValue = value.replace(/\D/g, "");

//     // Format it into 'xxx xxx xxxx'
//     let formattedPhoneNumber = "";
//     if (cleanedValue.length <= 3) {
//       formattedPhoneNumber = cleanedValue;
//     } else if (cleanedValue.length <= 6) {
//       formattedPhoneNumber = cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
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
//     // Remove all non-numeric characters for unformatted value
//     const cleanedValue = value.replace(/\D/g, "");

//     // Format the phone number
//     const formattedNumber = formatPhoneNumber(value);

//     // Update formatted phone number for display
//     setOwnerContact(formattedNumber);

//     // Store unformatted number for backend submission
//     setContact(cleanedValue);

//     // Phone number validation
//     const regex = /^[6-9]\d{9}$/;
//     if (cleanedValue.length > 10) {
//       setPhoneNumberError("Contact number cannot exceed 10 digits");
//     } else if (!regex.test(cleanedValue)) {
//       setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
//     } else {
//       setPhoneNumberError(""); // No error
//     }
//   };

//   // const formatPhoneNumber = (value) => {
//   //   // Remove all non-numeric characters
//   //   const cleanedValue = value.replace(/\D/g, '');

//   //   // Format it into 'xxx xxx xxxx'
//   //   let formattedPhoneNumber = '';
//   //   if (cleanedValue.length <= 3) {
//   //     formattedPhoneNumber = cleanedValue;
//   //   } else if (cleanedValue.length <= 6) {
//   //     formattedPhoneNumber = cleanedValue.substring(0, 3) + ' ' + cleanedValue.substring(3, 6);
//   //   } else {
//   //     formattedPhoneNumber = cleanedValue.substring(0, 3) + ' ' + cleanedValue.substring(3, 6) + ' ' + cleanedValue.substring(6, 10);
//   //   }

//   //   return formattedPhoneNumber;
//   // };
//   // const handleContactNumberChange = (value) => {
//   //   // Format the phone number
//   //   const formattedNumber = formatPhoneNumber(value);
//   //   setOwnerContact(formattedNumber);

//   //   // Remove all spaces to check length and pattern
//   //   const cleanedValue = value.replace(/\D/g, '');

//   //   // Regex to ensure the number starts with 6-9 and is 10 digits
//   //   const regex = /^[6-9]\d{9}$/; // Starts with 6-9 and has exactly 10 digits

//   //   // Validate the phone number
//   //   if (cleanedValue.length > 10) {
//   //     setPhoneNumberError("Contact number cannot exceed 10 digits");
//   //   } else if (!regex.test(cleanedValue)) {
//   //     setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
//   //   } else {
//   //     setPhoneNumberError('');
//   //   }
//   // };

//   // Handle district change
//   const handleDistrictChange = async (selectedDistrict) => {
//     a(selectedDistrict);
//     setMandals([]);
//     setVillages([]);
//     setAddressDetails((prev) => ({ ...prev, district: selectedDistrict }));

//     try {
//       const response = await axios.get(
//         ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getmandals/${selectedDistrict}`
//       );
//       setMandals(response.data.mandals || []);
//     } catch (error) {
//       console.error("Error fetching mandals:", error);
//       Alert.alert("Error", "Failed to fetch mandals.");
//     }
//   };
//   const handleMandalChange = async (selectedMandal) => {
//     setMandal(selectedMandal);
//     setVillages([]);
//     setAddressDetails((prev) => ({ ...prev, mandal: selectedMandal }));

//     try {
//       const response = await axios.get(
//         ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getvillagesbymandal/${selectedMandal}`
//       );
//       setVillages(response.data || []);
//     } catch (error) {
//       console.error("Error fetching villages:", error);
//       Alert.alert("Error", "Failed to fetch villages.");
//     }
//   };
//   const handleVillageChange = (selectedVillage) => {
//     setVillage(selectedVillage);
//     setAddressDetails((prev) => ({ ...prev, village: selectedVillage }));
//   };

//   const handleChooseMap = () => {
//     setModalVisible(true); // Open the modal when button is pressed
//   };

//   const handleMapPress = (e) => {
//     const { coordinate } = e.nativeEvent; // Get latitude and longitude of the selected point
//     setLatitude(coordinate.latitude);
//     setLongitude(coordinate.longitude);
//     setSelectedLocation(coordinate); // Store the selected location
//     setModalVisible(false); // Close the modal after selecting the location
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!ownerName.trim()) newErrors.ownerName = "Owner Name is required";

//     if (!ownerEmail.trim()) {
//       newErrors.ownerEmail = "Email is required";
//     }

//     if (!ownerContact.trim()) {
//       newErrors.ownerContact = "owner contact is required";
//     }

//     if (!layoutTitle.trim()) {
//       newErrors.layoutTitle = "layoutTitle is required";
//     }

//     if (!plotCount.trim()) {
//       newErrors.plotCount = " PlotCount is required";
//     }
//     if (!availablePlots.trim()) {
//       newErrors.availablePlots = "AvailablePlots is required";
//     }
//     if (!plotSize) {
//       newErrors.plotSize = " plot size is required";
//     }
//     if (!sizeUnit.trim()) {
//       newErrors.sizeUnit = "Size unit is required";
//     }
//     if (!plotPrice) {
//       newErrors.plotPrice = "plotPrice is required";
//     }
//     if (!priceUnit.trim()) {
//       newErrors.priceUnit = "Price unit is required";
//     }

//     if (!pinCode.trim()) {
//       newErrors.pincode = "Pincode is required";
//     }
//     if (!country.trim()) {
//       newErrors.country = "Country is required";
//     }
//     if (!state.trim()) {
//       newErrors.state = "State is required";
//     }
//     if (!district.trim()) {
//       newErrors.district = "District is required";
//     }
//     if (!village.trim()) {
//       newErrors.village = "Village is required";
//     }
//     if (!mandal.trim()) {
//       newErrors.mandal = "Mandal is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const resetForm = () => {
//     setOwnerName("");
//     setOwnerContact("");
//     setAvailablePlots("");
//     setPlotCount("");
//     setPlotPrice("");

//     setPlayZone("");
//     setFlpApproved("");
//     setTlpApproved("")
//     setDtcpApproved("")
//     setConventionHall("")

//     setLayoutTitle("")
//     setLandmark("")
//     setLatitude("")
//     setLogitude("")
//      setTotalAmount("")

//      setFlatNumber("");
//     setApartmentName("");
//     setBalconyCount("");
//     setBathroomCount("");
//     setCurrentLocation("");
//      setElectricityFacility("");
//     setEducational("");
//     setExtraAmenities("");
//      setAddressDetails("");
//      setPinCode("");
//     setDescription("");
//     setDistrict("");
//     setCountry("");
//     setState("");
//     setSize("");
//     setSizeUnit("");
//     setElectricity("");
//     setImages("");
//     setPrice("");
//     setPriceUnit("");
//      setMandal("");
//     setVillage("");
//     };

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     try {
//       const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
//       if (!token) {
//         Alert.alert("Error", "No token found. Please log in again.");
//         return; // Exit if token is not found
//       }
//       // console.log("Selected Agent ID (userId):", userId); // Debug selected agent

//       // Prepare data to be sent in the request
//       if (validateForm()) {
//         const data = {
//           // agentDetails:{
//           // userId:selectedAgent
//           // },
//           ownerDetails: {
//             ownerName,
//             "ownerContact":contact,
//             ownerEmail,
//           },
//           layoutDetails: {
//             reraRegistered,
//             dtcpApproved,
//             tlpApproved,
//             flpApproved,
//             layoutTitle,
//             description,
//             plotCount: Number(plotCount),
//             availablePlots: Number(availablePlots),
//             plotSize: Number(plotSize),
//             sizeUnit,
//             plotPrice: Number(plotPrice),
//             priceUnit, // Add priceUnit here
//             totalAmount: Number(totalAmount),
//             address: {
//               country: "India",
//               state: "Andhra Pradesh",
//               district,
//               pinCode,
//               mandal,
//               village,
//               latitude: String(latitude),
//             longitude: String(longitude),
//               landMark,
//               // currentLocation
//             },
//           },
//           amenities: {
//             underGroundWater,
//             drainageSystem,
//             electricityFacility,
//             swimmingPool,
//             playZone,
//             gym,
//             conventionHall,
//             medical,
//             educational,
//             extraAmenities: extraAmenitiesString
//               .split(",")
//               .map((amenity) => amenity.trim()),
//           },
//           uploadPics: images, // Cloudinary image URLs
//           // uploadPics: images.split(",").map((img) => img.trim()), // Convert comma-separated URLs into an array
//         };
//         console.log(
//           "Data being submitted to the API:",
//           JSON.stringify(data, null, 2)
//         ); // Debug data
// setIsSubmitted(true)
//         // console.log("the data is --> ",data.agentDetails.userId)

//         // Send POST request to the API
//         const response = await axios.post(apiUrl, data, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in headers
//             "Content-Type": "application/json",
//           },
//         });

//         // Handle success response
//         if (response.status === 200 || response.status === 201) {
//           Alert.alert("Success", "Layout details submitted successfully!");
//           navigation.navigate("asd");
//         } else {
//           Alert.alert("Error", "submit successfull");
//         }
//       }
//     } catch (error) {
//       setIsSubmitted(false)

//       Alert.alert("Error", "Failed to submit data. Please try again.");
//       console.error(error.response?.data || error.message); // Log the error
//     }
//   };
//   // Utility function for unit conversion and total price calculation
//   const calculateTotalPrice = () => {
//     let sizeInAcres = parseFloat(plotSize);
//     let pricePerAcre = parseFloat(plotPrice);

//     // Convert size to acres if necessary
//     if (sizeUnit === "sq.ft") sizeInAcres /= 43560;
//     else if (sizeUnit === "sq.yards") sizeInAcres /= 4840;
//     else if (sizeUnit === "sq.m") sizeInAcres /= 4046.86;
//     else if (sizeUnit === "cents") sizeInAcres /= 100;

//     // Adjust price per acre if necessary
//     if (priceUnit === "/sq.ft") pricePerAcre *= 43560;
//     else if (priceUnit === "/sq.yard") pricePerAcre *= 4840;
//     else if (priceUnit === "/sq.m") pricePerAcre *= 4046.86;
//     else if (priceUnit === "/cents") pricePerAcre *= 100;

//     if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
//       setTotalAmount((sizeInAcres * pricePerAcre).toFixed(2));
//     } else {
//       setTotalAmount("");
//     }
//   };
//   const [selectedImages, setSelectedImages] = useState([]);
//   const getUserLocation = async () => {
//     try {
//       // Request location permission
//       let { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was not granted");
//         return;
//       }

//       // Get user's current position
//       let { coords } = await Location.getCurrentPositionAsync();
//       if (coords) {
//         const { latitude, longitude } = coords;
//         console.log("Latitude and Longitude: ", latitude, longitude);
//         setLatitude(latitude); // Update latitude state
//         setLogitude(longitude); // Update longitude state

//         // Reverse geocode to get address
//         let response = await Location.reverseGeocodeAsync({
//           longitude,
//           latitude,
//         });
//         if (response.length > 0) {
//           const address = response[0];
//           const locationString = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
//           console.log("User Location: ", locationString);
//           const latitude1 = `${latitude}`;
//           const longitude1 = `${longitude}`;
//           console.log("latitue cmg ", latitude, longitude);
//           // setLatitude(latitude1);
//           // setLogitude(longitude1)
//           setLocationDetails(locationString); // Update locationDetails state
//           setCurrentLocation(locationString); // Auto-fill currentLocation field
//           setSelectedLocation(locationString);
//         } else {
//           setLocationDetails("Unable to retrieve address");
//           setCurrentLocation("Unable to retrieve address");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching location: ", error);
//       setErrorMsg("Error fetching location");
//     }
//   };
//   const toggleSelection = (uri) => {
//     setSelectedImages((prevSelectedImages) => {
//       if (prevSelectedImages.includes(uri)) {
//         return prevSelectedImages.filter((item) => item !== uri);
//       } else {
//         return [...prevSelectedImages, uri];
//       }
//     });
//   };
//   const removeImage = (uri) => {
//     setImages((prevImageUris) => prevImageUris.filter((item) => item !== uri));
//     console.log(images);
//   };

//   const renderItem = ({ item }) => {
//     const isSelected = selectedImages.includes(item); // Check if the image is selected
//     return (
//       <TouchableOpacity onPress={() => toggleSelection(item)}>
//         <Image
//           source={{ uri: item }}
//           style={[
//             { width: 100, height: 100, margin: 5 },
//             isSelected && { borderWidth: 3, borderColor: "blue" }, // Add border when selected
//           ]}
//           resizeMode="cover"
//         />

//         {/* {isSelected &&(<Button title="remove" onPress={() => removeImage(item)} />)} */}
//         {isSelected && (
//           <TouchableOpacity
//             style={styles.removeButton}
//             onPress={() => removeImage(item)}
//           >
//             <Text style={styles.removeButtonText}>X</Text>
//           </TouchableOpacity>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   // const [images, setImages] = useState([]);

//   const pickImages = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,

//       aspect: [4, 3],
//       quality: 1,
//       allowsMultipleSelection: true, // Allow multiple images to be selected
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       uploadImages(result.assets);
//     }
//   };

//   // const uploadImages = async (imageAssets) => {
//   // const uploadedUrls = [...uploadedImages]; // Preserve existing URLs
//   // try {
//   // for (const asset of imageAssets) {
//   // const formData = new FormData();
//   // formData.append('file', {
//   // uri: asset.uri,
//   // type: 'image/jpeg',
//   // name: 'upload.jpg',
//   // });
//   // formData.append('upload_preset', 'sni4p6lt');

//   // const response = await axios.post(
//   // `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//   // formData,
//   // {
//   // headers: { 'Content-Type': 'multipart/form-data' },
//   // }
//   // );

//   // if (response.data.secure_url) {
//   // uploadedUrls.push(response.data.secure_url);
//   // }
//   // // setImages(uploadedUrls)

//   // }
//   // setUploadedImages(uploadedUrls); // Update state with all uploaded
//   // Alert.alert('Success', 'Images uploaded successfully!');
//   // console.log('Uploaded URLs:', images);
//   // // ContactsOutlined.log("was they--",uploadedImages);
//   // // Ensure onUrlsReturn is a valid function

//   // } catch (error) {
//   // console.error('Upload error:', error);
//   // Alert.alert('Upload failed', 'There was an error uploading your images.');
//   // }
//   // };

//   // Recalculate totalPrice when dependencies change

//   const uploadImages = async (imageAssets) => {
//     const uploadedUrls = []; // Temporary array to collect URLs
//     try {
//       for (const asset of imageAssets) {
//         const formData = new FormData();
//         formData.append("file", {
//           uri: asset.uri,
//           type: "image/jpeg",
//           name: "upload.jpg",
//         });
//         formData.append("upload_preset", "sni4p6lt"); // Your upload preset

//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (response.data.secure_url) {
//           console.log("Uploaded URL:", response.data.secure_url);
//           uploadedUrls.push(response.data.secure_url); // Push URL to temp array
//         } else {
//           console.error("No secure_url in response:", response.data);
//         }
//       }

//       // Update state after all uploads are done
//       setImages((prevImages) => [...prevImages, ...uploadedUrls]);
//       console.log("All Uploaded URLs:", uploadedUrls);
//     } catch (error) {
//       console.error("Upload error:", error);
//       Alert.alert("Upload failed", "There was an error uploading your images.");
//     }
//   };

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [plotSize, plotPrice, sizeUnit, priceUnit]);
//   const handleImageUpload = async () => {
//     try {
//       const options = {
//         mediaType: "photo",
//         quality: 1,
//       };

//       // Use an image picker (install `expo-image-picker` or React Native equivalents)
//       const result = await ImagePicker.launchImageLibraryAsync(options);

//       if (!result.canceled) {
//         const formData = new FormData();
//         formData.append("file", {
//           uri: result.assets[0].uri,
//           type: "image/jpeg", // Adjust based on file type
//           name: "upload.jpg",
//         });
//         formData.append("upload_preset", "sni4p6lt"); // Replace with Cloudinary preset
//         formData.append("cloud_name", "ddv2y93jq"); // Replace with your Cloudinary cloud name

//         const response = await axios.post(
//           "https://api.cloudinary.com/v1_1/ddv2y93jq/image/upload",
//           formData
//         );

//         if (response.data.secure_url) {
//           setUploadedImages((prev) => [...prev, response.data.secure_url]);
//           Alert.alert("Success", "Image uploaded successfully");
//         }
//       }
//     } catch (error) {
//       console.error("Image upload error:", error);
//       Alert.alert("Error", "Failed to upload image.");
//     }
//   };

//   const sentImage=(locImage)=>{
//     console.log("sdasadas",locImage)

//     setImages(locImage)
//     setSelectedImages(locImage)
//    }

//   useEffect(() => {
//     const fetchAssignedAgents = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           setLoading(false);
//           return;
//         }

//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.user.userId;

//         console.log("User ID cmg o:", userId);

//         // Fetch agents assigned to the user
//         const response = await fetch(
//           ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/getAssignedAgents/${userId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Error fetching agents: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log("omg", data);

//         setAgents(data); // Assuming data is an array of agents
//       } catch (error) {
//         console.error("Failed to fetch assigned agents:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // fetchAssignedAgents();
//   }, []);

//   const handleAgentChange = (itemValue) => {
//     const selectedAgent = agents.find((agent) => agent.id === itemValue);
//     setSelectedAgent(selectedAgent ? selectedAgent.name : "");
//   };

//   useEffect(()=>{
//     loadLanguage();
//   },[])

//     const loadLanguage = async () => {
//       const savedLanguage = await AsyncStorage.getItem('language');
//       if (savedLanguage) {
//         i18n.locale = savedLanguage;
//       }
//     };
//   // if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

//   return (
//     <>
//       <View style={styles.customcontainer}>
//         <Text style={styles.stylingtext}>{i18n.t("Layout Details")} </Text>
//         {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}
//       </View>

//       <View style={styles.container}>
//         <ScrollView>
//           {/* <Text style={styles.title}>Layout Details</Text> */}

//           {/* Owner Details Inputs */}

//           {/* <View>
//  <Text style={styles.label1}>Select Agent:</Text>
//  <Picker
//  selectedValue={selectedAgent}
//  onValueChange={(itemValue) => setSelectedAgent(itemValue)}
//  >
//  {agents.length > 0 ? (
//  agents.map((agent) => (
//  <Picker.Item
//  key={agent._id} // Assuming agent has a unique id
//  label={agent.email} // Assuming agent has a 'name' field
//  value={agent.email} // Use agent's ID as value
//  />
//  ))
//  ) : (
//  <Picker.Item label="No agents available" value=""/>
//  )}
//  </Picker>
//  </View> */}
//           <Text style={styles.label1}>
//             {i18n.t("Owner Name")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.ownerName && styles.inputError]}
//             placeholder={i18n.t("Owner Name")}
//             value={ownerName}
//             onChangeText={setOwnerName}
//           />
//           {errors.ownerName && (
//             <Text style={styles.errorText}>{errors.ownerName}</Text>
//           )}

//           <Text style={styles.label1}>
//             {i18n.t("Owner Contact")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.ownerContact && styles.inputError]}
//             placeholder={i18n.t("Owner Contact")}
//             value={ownerContact}
//             onChangeText={handleContactNumberChange}
//             // onChangeText={(value)=>setOwnerContact(value)}

//             keyboardType="numeric"
//           />
//           {errors.ownerContact && (
//             <Text style={styles.errorText}>{errors.ownerContact}</Text>
//           )}

//           <Text style={styles.label1}>
//             {i18n.t("Owner Email")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.ownerEmail && styles.inputError]}
//             placeholder={i18n.t("Owner Email")}
//             value={ownerEmail}
//             onChangeText={setOwnerEmail}
//             keyboardType="email-address"
//           />

//           {errors.ownerEmail && (
//             <Text style={styles.errorText}>{errors.ownerEmail}</Text>
//           )}

//           <Text style={styles.label1}>
//            {i18n.t("Layout Title")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           {/* Layout Details Inputs */}
//           <TextInput
//             style={[styles.input, errors.layoutTitle && styles.inputError]}
//             placeholder={i18n.t("Layout Title")}
//             value={layoutTitle}
//             onChangeText={setLayoutTitle}
//           />
//           {errors.layoutTitle && (
//             <Text style={styles.errorText}>{errors.layoutTitle}</Text>
//           )}

//           <Text style={styles.label1}>Description</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("Description")}
//             value={description}
//             onChangeText={setDescription}
//           />
//           <Text style={styles.label1}>
//             {i18n.t("Plot Count")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.plotCount && styles.inputError]}
//             placeholder={i18n.t("Plot Count")}
//             value={plotCount}
//             onChangeText={setPlotCount}
//             keyboardType="numeric"
//           />

//           {errors.plotCount && (
//             <Text style={styles.errorText}>{errors.plotCount}</Text>
//           )}

//           <Text style={styles.label1}>
//             {i18n.t("Available Plots")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.availablePlots && styles.inputError]}
//             placeholder={i18n.t("Available Plots")}
//             value={availablePlots}
//             onChangeText={setAvailablePlots}
//             keyboardType="numeric"
//           />
//           {errors.availablePlots && (
//             <Text style={styles.errorText}>{errors.availablePlots}</Text>
//           )}

//           {/* here the plot size is cmg ---> */}

//           {/* <TextInput
//  style={styles.input}
//  placeholder="Plot Price"
//  value={plotPrice}
//  onChangeText={setPlotPrice}
//  keyboardType="numeric"
//  />
//  <TextInput
//  style={styles.input}
//  placeholder="Total Amount"
//  value={totalAmount}
//  onChangeText={setTotalAmount}
//  keyboardType="numeric"
//  /> */}

//           {/* Price and Unit */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label1}>
//               {i18n.t("Size")}<Text style={{ color: "red" }}>*</Text>
//             </Text>
//             <View style={styles.row}>
//               <TextInput
//                 placeholder={i18n.t("Size (in acres)")}
//                 value={plotSize}
//                 onChangeText={setPlotSize}
//                 keyboardType="numeric"
//                 style={[styles.input, errors.plotSize && styles.inputError]}
//               />
//               <View
//                 style={[
//                   styles.pickerWrapper1,
//                   errors.sizeUnit && styles.pickerError,
//                 ]}
//               >
//                 <Picker
//                   selectedValue={sizeUnit}
//                   style={styles.picker}
//                   onValueChange={(itemValue) => setSizeUnit(itemValue)}
//                 >
//                   <Picker.Item label={i18n.t("None")} />

//                   <Picker.Item label={i18n.t("Cents")} value="cents" />

//                   <Picker.Item label={i18n.t("Acres")} value="acres" />
//                   <Picker.Item label={i18n.t("Sq. Ft")} value="sq.ft" />
//                   <Picker.Item label={i18n.t("Sq. Yards")} value="sq.yards" />
//                   <Picker.Item label={i18n.t("Sq. M")} value="sq.m" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           {errors.plotSize && (
//             <Text style={styles.errorText}>{errors.plotSize}</Text>
//           )}
//           {errors.sizeUnit && (
//             <Text style={styles.errorText}>{errors.sizeUnit}</Text>
//           )}

//           <View style={styles.inputGroup}>
//             <Text style={styles.label1}>
//               {i18n.t("Price")}<Text style={{ color: "red" }}>*</Text>
//             </Text>
//             <View style={styles.row}>
//               <TextInput
//                 placeholder={i18n.t("Price")}
//                 value={plotPrice}
//                 onChangeText={setPlotPrice}
//                 keyboardType="numeric"
//                 style={[styles.input, errors.plotPrice && styles.inputError]}
//               />
//               <View
//                 style={[
//                   styles.pickerWrapper1,
//                   errors.priceUnit && styles.pickerError,
//                 ]}
//               >
//                 <Picker
//                   selectedValue={priceUnit}
//                   style={styles.picker}
//                   onValueChange={setPriceUnit}
//                 >
//                   <Picker.Item label={i18n.t("None")} />

//                   <Picker.Item label={i18n.t("/cent")} value="/cent" />

//                   <Picker.Item label={i18n.t("/acre")} value="/acre" />
//                   <Picker.Item label={i18n.t("/sq.ft")} value="/sq.ft" />
//                   <Picker.Item label={i18n.t("/sq.yard")} value="/sq.yard" />
//                   <Picker.Item label={i18n.t("/sq.m")} value="/sq.m" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           {errors.plotPrice && (
//             <Text style={styles.errorText}>{errors.plotPrice}</Text>
//           )}
//           {errors.priceUnit && (
//             <Text style={styles.errorText}>{errors.priceUnit}</Text>
//           )}

//           {/* Total Price with Unit */}
//           <Text style={styles.label1}>
//             {i18n.t("Total Price")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             placeholder={i18n.t("Total Price")}
//             value={`${totalAmount} ${priceUnit}`}
//             editable={false}
//             style={styles.input}
//           />
//           <Text style={styles.label1}>
//             {i18n.t("Country")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.country && styles.inputError]}
//             placeholder={i18n.t("Country")}
//             value={country}
//             onChangeText={setCountry}
//           />

//           {errors.country && (
//             <Text style={styles.errorText}>{errors.country}</Text>
//           )}

//           <Text style={styles.label1}>
//             {i18n.t("State")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             style={[styles.input, errors.state && styles.inputError]}
//             placeholder={i18n.t("state")}
//             value={state}
//             onChangeText={setState}
//           />
//           {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

//           <Text style={styles.label1}>
//             {i18n.t("Pincode")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             placeholder={i18n.t("Pincode")}
//             value={pinCode}
//             onChange={handlePincodeChange}
//             style={[
//               styles.input,
//               styles.pincodeInput,
//               errors.pinCode && styles.inputError,
//             ]}
//           />
//           {errors.pinCode && (
//             <Text style={styles.errorText}>{errors.pinCode}</Text>
//           )}

//           <Text style={styles.label1}>
//             {i18n.t("District")}<Text style={{ color: "red" }}>*</Text>
//           </Text>
//           <TextInput
//             placeholder={i18n.t("District")}
//             value={district}
//             onChangeText={handleDistrictChange}
//             style={[
//               styles.input,
//               styles.districtInput,
//               errors.district && styles.inputError,
//             ]}
//             editable={false}
//           />

//           {errors.district && (
//             <Text style={styles.errorText}>{errors.district}</Text>
//           )}

//           <View style={styles.row}>
//             <Text style={styles.label1}>
//               {i18n.t("Mandal")}<Text style={{ color: "red" }}>*</Text>
//             </Text>
//             <View
//               style={[
//                 styles.pickerWrapper1,
//                 errors.mandal && styles.pickerError,
//               ]}
//             >
//               <Picker
//                 selectedValue={mandal}
//                 onValueChange={handleMandalChange}
//                 style={[
//                   { height: 50, width: 150 },
//                   errors.mandal && styles.inputError,
//                 ]}
//               >
//                 {mandals.length > 0 ? (
//                   mandals.map((mandalOption, index) => (
//                     <Picker.Item
//                       key={index}
//                       label={mandalOption}
//                       value={mandalOption}
//                     />
//                   ))
//                 ) : (
//                   <Picker.Item label="Mandal" value="" />
//                 )}
//               </Picker>
//             </View>
//           </View>
//           {errors.mandal && (
//             <Text style={styles.errorText}>{errors.mandal}</Text>
//           )}

//           <View style={styles.row}>
//             <Text style={styles.label1}>
//               {i18n.t("Village")}<Text style={{ color: "red" }}>*</Text>
//             </Text>
//             <View
//               style={[
//                 styles.pickerWrapper1,
//                 errors.village && styles.pickerError,
//               ]}
//             >
//               <Picker
//                 selectedValue={village}
//                 onValueChange={handleVillageChange}
//                 style={{
//                   height: 50,
//                   width: 150,
//                   borderColor: "black",
//                   borderWidth: 1,
//                   borderRadius: 5,
//                 }}
//               >
//                 {villages.length > 0 ? (
//                   villages.map((villageOption, index) => (
//                     <Picker.Item
//                       key={index}
//                       label={villageOption}
//                       value={villageOption}
//                     />
//                   ))
//                 ) : (
//                   <Picker.Item label="Village" value="" />
//                 )}
//               </Picker>
//             </View>
//           </View>
//           {errors.village && (
//             <Text style={styles.errorText}>{errors.village}</Text>
//           )}

//           {/* <TextInput
//  style={styles.input}
//  placeholder="latitude"
//  value={latitude}
//  onChangeText={setLatitude}
//  />

//  <TextInput
//  style={styles.input}
//  placeholder="Longitude"
//  value={longitude}
//  onChangeText={setLogitude}
//  /> */}
//           <Text style={styles.label1}>{i18n.t("Land Mark")}<Text style={{color:'red'}}>*</Text></Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("landmark")}
//             value={landMark}
//             onChangeText={setLandmark}
//           />

//           {/* Toggle Switches for Approvals */}
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("RERA Registered")}</Text>
//             <Switch value={reraRegistered} onValueChange={setReraRegistered} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("DTCP Approved")}</Text>
//             <Switch value={dtcpApproved} onValueChange={setDtcpApproved} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("TLP Approved")}</Text>
//             <Switch value={tlpApproved} onValueChange={setTlpApproved} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("FLP Approved")}</Text>
//             <Switch value={flpApproved} onValueChange={setFlpApproved} />
//           </View>

//           {/* Toggle Switches for Amenities */}
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Under Ground Water")}</Text>
//             <Switch
//               value={underGroundWater}
//               onValueChange={setUnderGroundWater}
//             />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Drainage System")}</Text>
//             <Switch value={drainageSystem} onValueChange={setDrainageSystem} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Electricity Facility")}</Text>
//             <Switch
//               value={electricityFacility}
//               onValueChange={setElectricityFacility}
//             />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Swimming Pool")}</Text>
//             <Switch value={swimmingPool} onValueChange={setSwimmingPool} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Play Zone")}</Text>
//             <Switch value={playZone} onValueChange={setPlayZone} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Gym")}</Text>
//             <Switch value={gym} onValueChange={setGym} />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text>{i18n.t("Convention Hall")}</Text>
//             <Switch value={conventionHall} onValueChange={setConventionHall} />
//           </View>

//           {/* Inputs for Medical and Educational Facilities */}
//           <Text style={styles.label1}>{i18n.t("Medical Facilities")}</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("Medical Facilities (Count)")}
//             value={String(medical)}
//             onChangeText={(text) => setMedical(Number(text))}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label1}>{i18n.t("Educational Facilities")}</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("Educational Facilities (Count)")}
//             value={String(educational)}
//             onChangeText={(text) => setEducational(Number(text))}
//             keyboardType="numeric"
//           />

//           <Text style={styles.label1}>{i18n.t("Extra Amenities")}</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("extraAmenities")}
//             value={extraAmenitiesString}
//             onChangeText={setextraAmenitiesString}
//           />

//           <Text style={styles.label}>{i18n.t("Upload Images")}</Text>
//           {/* <View>
//  <Button title="Pick images from camera roll" onPress={pickImages} />

//  <FlatList
//  data={images}
//  horizontal
//  keyExtractor={(item, index) => index.toString()}
//  scrollEnabled={false}
//  renderItem={({ item }) => (
//  <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 5 }} />
//  )}
//  />
//  </View> */}

//           {/* <View>
//  <Button title="Select Images" onPress={pickImages} />
//  <ScrollView horizontal>
//  {uploadedImages.map((url, index) => (
//  <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100, margin: 5 }} />
//  ))}
//  </ScrollView>
//  </View> */}

//           {/* <View style={{ marginTop: "10px" }}>
//             <Button
//               title="Select Images"
//               onPress={pickImages}
//               style={styles.button}
//             />
//             <ScrollView horizontal>
//               {uploadedImages.map((url, index) => (
//                 <Image
//                   key={index}
//                   source={{ uri: url }}
//                   style={{ width: 100, height: 100, margin: 5 }}
//                 />
//               ))}
//             </ScrollView>
//           </View>
//           <View style={{ marginBottom: 10 }}>
//             <FlatList
//               data={images}
//               horizontal
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={renderItem}
//             />
//           </View> */}
// <CameraOption onSelectImage={sentImage}/>
//           {/* <Text style={styles.title}>Choose Location on Map</Text>

// <Button title="Choose Map" onPress={handleChooseMap} /> */}

//           <Text style={styles.label1}>{i18n.t("Current location")}</Text>
//           <Button
//             // mode="contained"
//             title={i18n.t("choose location")}
//             onPress={getUserLocation}
//             icon={() => <Icon name="md-compass" size={20} color="#000" />}
//             style={styles.locationButton}
//           ></Button>

//           <Text style={styles.label1}>{i18n.t("Latitude")}</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("Latitude")}
//             value={`${latitude}`}
//             editable={false}
//           />
//           <Text style={styles.label1}>{i18n.t("Longitude")}</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={i18n.t("Longitude")}
//             value={`${longitude}`}
//             editable={false}
//           />

//           {/* <LocationPicker onLocationSelected={handleLocationSelected} />

//           {selectedLocation && (
//             <>
//               <Text style={styles.label1}>Latitude</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Latitude"
//                 value={String(selectedLocation.latitude)}
//                 editable={false}
//               />
//               <Text style={styles.label1}>Longitude</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Longitude"
//                 value={String(selectedLocation.longitude)}
//                 editable={false}
//               />
//             </>
//           )} */}
//           <View>
//             {/* The Modal for Map Selection */}
//             {/* <Modal
//  isVisible={modalVisible}
//  onBackdropPress={() => setModalVisible(false)} // Close modal on backdrop press
//  onBackButtonPress={() => setModalVisible(false)} // Close modal on hardware back press
//  >
//  <View style={styles.modalContent}>
//  <MapView
//  style={styles.map}
//  initialRegion={{
//  latitude: 37.78825, // Default latitude if no selection is made
//  longitude: -122.4324, // Default longitude if no selection is made
//  latitudeDelta: 0.0922,
//  longitudeDelta: 0.0421,
//  }}
//  onPress={handleMapPress} // Get coordinates on map press
//  >
//  {selectedLocation && (
//  <Marker coordinate={selectedLocation} />
//  )}
//  </MapView>
//  <Button title="Close" onPress={() => setModalVisible(false)} />
//  </View>
//  </Modal> */}

//             <View style={styles.inputContainer}>
//               {/* <Text style={styles.label}>Latitudehgf:</Text>
//  <TextInput
//  style={styles.input}
//  value={latitude ? latitude.toString() : ''}
//  editable={false}
//  />
//  <Text style={styles.label}>Longitude:</Text>
//  <TextInput
//  style={styles.input}
//  value={longitude ? longitude.toString() : ''}
//  editable={false}
//  /> */}
//             </View>
//           </View>

//           {/* Submit Button */}

//           <Button title={i18n.t("Submit")} onPress={handleSubmit} disabled={isSubmitted} />
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   // flex: 1,
//   // paddingTop: 20,
//   // paddingLeft:20,
//   // paddingRight:20,
//   // paddingBottom:100,
//   // backgroundColor: "#fff",
//   // },
//   row: {
//     flexDirection: "row",
//     alignItems: "center", // Vertically center the elements
//     marginBottom: 16,
//   },
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     paddingLeft: 50,
//     paddingRight: 50,
//     paddingBottom: 20,
//     justifyContent: "start",
//     backgroundColor: "#fff",
//   },
//   label1: {
//     padding: 4,
//     marginTop: 5,
//     marginBottom: 5,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   input: {
//     padding: 4,
//     marginBottom: 15,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 5,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 5,
//   },
//   switchContainer: {
//     flexDirection: "row", // Align switch and label horizontally
//     justifyContent: "space-between", // Spread out the elements
//     alignItems: "center", // Center vertically
//   },
//   label: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   textAreaContainer: {
//     marginBottom: 5,
//   },
//   textArea: {
//     height: 100,
//     borderColor: "gray",
//     borderWidth: 1,
//     padding: 10,
//     textAlignVertical: "top",
//   },

//   inputContainer: {
//     flexDirection: "row", // Align elements horizontally
//     alignItems: "center", // Vertically align the elements
//     justifyContent: "space-between", // Space between the text input and picker
//   },
//   input: {
//     flex: 1, // Take half the available width
//     height: 40,
//     width: "100%",
//     borderColor: "gray",
//     borderWidth: 1,
//     marginRight: 10, // Space between text input and picker
//     paddingLeft: 10,
//     borderRadius: 10,
//   },
//   pickerWrapper: {
//     height: 40,
//     width: 130,
//     borderColor: "gray",
//     borderWidth: 1, // Apply border to wrapper instead of the Picker
//     borderRadius: 5, // Optional, to round the corners
//     justifyContent: "center", // Vertically center the text
//     alignItems: "center", // Horizontally center the text
//   },
//   pickerWrapper1: {
//     height: 50,

//     borderColor: "gray",
//     borderWidth: 1, // Apply border to wrapper instead of the Picker
//     borderRadius: 5, // Optional, to round the corners
//   },

//   picker: {
//     height: 40,
//     width: 140, // Width of the dropdown (picker)
//     borderColor: "#000",
//   },
//   stylingtext: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "white",
//   },
//   customcontainer: {
//     padding: 50,

//     backgroundColor: "#4184AB",
//     borderBottomLeftRadius: 100,
//     borderBottomRightRadius: 3,
//   },
//   removeButton: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
//     borderRadius: 15,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pickerWrapper: {
//     height: 40,
//     width: 130,
//     borderColor: "gray",
//     borderWidth: 1, // Apply border to wrapper instead of the Picker
//     borderRadius: 5, // Optional, to round the corners
//     justifyContent: "center", // Vertically center the text
//     alignItems: "center", // Horizontally center the text
//   },
//   pickerWrapper1: {
//     height: 50,

//     borderColor: "gray",
//     borderWidth: 1, // Apply border to wrapper instead of the Picker
//     borderRadius: 5, // Optional, to round the corners
//   },
//   removeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: -2, // Slight adjustment for vertical centering
//   },
//   inputError: { borderColor: "red", borderWidth: 1 },
//   errorText: { color: "red", fontSize: 12, marginTop: 5 },
//   pickerError: {
//     borderColor: "red", // Add a red border if there's an error
//   },
// });

// export default LayoutFormAgent;

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
  Image,
} from "react-native";
import { PermissionsAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import * as ImagePicker from 'expo-image-picker';
const cloudName = "ddv2y93jq"; // Your Cloudinary Cloud Name
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import CameraOption from "../cameraForms";
import i18n from "../i18n";
import { jwtDecode } from "jwt-decode";

function LayoutFormAgent() {
  const navigation = useNavigation();
  const [ownerName, setOwnerName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [altContactNo, setAltContactNo] = useState("");
  const [title, setTitle] = useState("");
  const [noOfPlots, setNoOfPlots] = useState("");
  const [availablePlots, setAvailablePlots] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [description, setDescription] = useState("");
  const [rera, setRera] = useState(false);
  const [dtcp, setDtcp] = useState(false);
  const [tlp, setTlp] = useState(false);
  const [flp, setFlp] = useState(false);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Andhra Pradesh");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [landMark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [underGroundWater, setUnderGroundWater] = useState(false);
  const [drainageSystem, setDrainageSystem] = useState(false);
  const [swimmingPool, setSwimmingPool] = useState(false);
  const [playZone, setPlayZone] = useState(false);
  const [gym, setGym] = useState(false);
  const [conventionHall, setConventionHall] = useState(false);
  const [parking, setParking] = useState(false);
  const [security, setSecurity] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [medical, setMedical] = useState("");
  const [educational, setEducational] = useState("");
  const [extraAmenities, setExtraAmenities] = useState("");
  const [roadType, setRoadType] = useState("");
  const [electricity, setElectricity] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLogitude] = useState("");

  const [plots, setPlots] = useState([]);

  const [samePlots, setSamePlots] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState([]);

  const [selectedAgent,setSelectedAgent]=useState("")

  const [agents,setAgents]=useState([])
const [role,setRole]=useState(AsyncStorage.getItem("role"))

useEffect(()=>{
  const loadData=async()=>{
      
  const decoded = jwtDecode(await AsyncStorage.getItem('userToken'));
  const role = decoded.user.role;
setRole(role)  
console.log(role)
  }

  loadData()
fetchAssignedAgents();

},[])

  useEffect(() => {
    calculateTotalPrice();
  }, [plotSize, price, sizeUnit, priceUnit]);

  const calculateTotalPrice = () => {
    let sizeInAcres = parseFloat(plotSize);
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
    else if (priceUnit === "/cents") pricePerAcre *= 100;

    if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
      setTotalAmount((sizeInAcres * pricePerAcre).toFixed(2));
    } else {
      setTotalAmount("");
    }
  };

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
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/getAssignedAgents/${userId}`,
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

 
  const calculatePlotTotal = (plotSize, sizeUnit, price, priceUnit) => {
    let sizeInAcres = parseFloat(plotSize);
    let pricePerAcre = parseFloat(price);

    // Convert size to acres based on sizeUnit
    if (sizeUnit === "sq.ft") sizeInAcres /= 43560;
    else if (sizeUnit === "sq.yards") sizeInAcres /= 4840;
    else if (sizeUnit === "sq.m") sizeInAcres /= 4046.86;
    else if (sizeUnit === "cents") sizeInAcres /= 100;

    // Adjust price per acre based on priceUnit
    if (priceUnit === "/sq.ft") pricePerAcre *= 43560;
    else if (priceUnit === "/sq.yard") pricePerAcre *= 4840;
    else if (priceUnit === "/sq.m") pricePerAcre *= 4046.86;
    else if (priceUnit === "/cents") pricePerAcre *= 100;

    // Calculate total amount
    if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
      return sizeInAcres * pricePerAcre;
    } else {
      return 0;
    }
  };
  const handleAvailablePlotsChange = (value) => {
    setAvailablePlots(value);

    const numberOfPlots = parseInt(value);
    // const newPlots = Array(numberOfPlots).fill({
    //    sizeUnit:"0",
    //   sizeUnitTe: '', // You can set this value based on language or logic
    //   plotAmount: "",
    // });
if(numberOfPlots)
{
    const newPlots = Array(numberOfPlots)
      .fill()
      .map((_, index) => ({
        plotId: index + 1, // Assign a unique plotId starting from 1
        plotSize,
        sizeUnit,
         // sizeUnitTe: "", // You can set this value based on language or logic
        plotAmount: "",
      }));
    setPlots(newPlots);
    console.log("plots", newPlots);

    }
   };


  useEffect(()=>{
    loadLanguage();
  },[])


      const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        i18n.locale = savedLanguage;
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
          // setLocationDetails(locationString); // Update locationDetails state
          // setCurrentLocation(locationString); // Auto-fill currentLocation field
          // setSelectedLocation(locationString);
        } else {
          // setLocationDetails("Unable to retrieve address");
          // setCurrentLocation("Unable to retrieve address");
        }
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
      setErrorMsg("Error fetching location");
    }
  };

  const [roadProximity, setRoadProximity] = useState("");
const [phoneNumber,setPhoneNumber]=useState("")

  const [addressDetails, setAddressDetails] = useState({
    district: "",
    mandal: "",
    village: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    console.log("In the valdate form");
    const newErrors = {};
    console.log("PSDFGHJKL:", ownerName);
    if (!ownerName.trim()) {
      newErrors.ownerName = "Owner Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!contactNo.trim()) {
      newErrors.contactNo = "owner contact is required";
    }

    if (!title.trim()) {
      newErrors.title = "layoutTitle is required";
    }

    if (!noOfPlots.trim()) {
      newErrors.noOfPlots = " PlotCount is required";
    }
    if (!availablePlots.trim()) {
      newErrors.availablePlots = "AvailablePlots is required";
    }
    if (!plotSize.trim()) {
      newErrors.plotSize = " plot size is required";
    }

    if (!price.trim()) {
      newErrors.price = "plotPrice is required";
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
    if (!landMark.trim()) {
      newErrors.landMark = "Land Mark is required";
    }

    console.log("NEWWWWW", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        console.log("in the try block");
        const response = await axios.get(
          `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getlocationbypincode/${pincodeValue}/@/@`
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
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getmandals/${selectedDistrict}`
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
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getvillagesbymandal/${selectedMandal}`
      );
      setVillages(response.data || []);
    } catch (error) {
      console.error("Error fetching villages:", error);
      Alert.alert("Error", "Failed to fetch villages.");
    }
  };

  const sentImage = (locImage) => {
    console.log("sdasadas", locImage);

    setImages( locImage.imageUrl);
    // setSelectedImages(...locImage.imageUrl);
  };

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
  

  const handleVillageChange = (selectedVillage) => {
    setVillage(selectedVillage);
    setAddressDetails((prev) => ({ ...prev, village: selectedVillage }));
  };
  const handleSubmit = async () => {
    console.log("in the handle sunjvmns");
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }
const decoded=jwtDecode(token)
const role=decoded.user.role
      console.log("safdhngfmhghj");
console.log("plots",plots)

      if (validateForm()) {
        const data = {
          // agentDetails: {
          //   userId: selectedAgent,
          // },

          ownerDetails: {
            ownerName: ownerName,
            ownerContact: contactNo,
            ownerEmail: email,
          },
          layoutDetails: {
            reraRegistered: rera,
            dtcpApproved: dtcp,
            tlpApproved: tlp,
            flpApproved: flp,
            layoutTitle: title,
            description: description,
            plotCount: Number(noOfPlots),
            availablePlots: Number(availablePlots),
            plotSize: Number(plotSize),
            sizeUnit,
            plotPrice: Number(price),
            priceUnit, // Add priceUnit here
            totalAmount: Number(totalAmount),
            address: {
              country: country,
              state: state,
              district,
              pinCode: pincode,
              mandal,
              village,
              latitude: String(latitude),
              longitude: String(longitude),
              landMark,
            },

            plots:plots
          },
          amenities: {
            underGroundWater: underGroundWater,
            drainageSystem: drainageSystem,
            electricityFacility: electricity,
            swimmingPool: swimmingPool,
            playZone: playZone,
            gym: gym,
            conventionHall: conventionHall,
            medical: medical,
            educational: educational,
            extraAmenities: extraAmenities
              .split(",")
              .map((amenity) => amenity.trim()),
          },
            uploadPics: images,
        };



           if(role===5)
    {
        data.agentDetails={
            "userId":selectedAgent
        }
    }
        console.log(
          "Data being submitted to the API:",
          JSON.stringify(data, "Deepika")
        );

        // Send POST request to the API
        const response = await axios.post(
          "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/layout/insert",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
              "Content-Type": "application/json",
            },
          }
        );

        // Handle success response
        if (response.status === 200 || response.status === 201) {
          Alert.alert("Success", "Layout details submitted successfully!");
          resetFunction();
          navigation.navigate("asd");
        } else {
          Alert.alert("Error", "submit successfull");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit data. Please try again.");
      console.error(error.response?.data || error.message); // Log the error
    }
  };

  handlePlotSize = (value) => {
    setPlotSize(value);
    plots.map((item) => {
      item.plotSize = value;
    });
    console.log(plots);
  };

  handleSizeUnit = (value) => {
    setSizeUnit(value);

    plots.map((item) => {
      item.sizeUnit = value;
    });
  };

  handlePlotPrice = (value) => {
    setPrice(value);
 
    plots.map((item) => {
      item.plotAmount = value;
    });
    console.log(plots);
  };

  const handlePlotChange = (index, field, value) => {
    const updatedPlots = [...plots];
    updatedPlots[index][field] = value;
  
    // Handle plotAmount calculation based on plotSize, sizeUnit, priceUnit
    if (field === "plotSize" || field === "sizeUnit" || field === "priceUnit") {
      const plot = updatedPlots[index];
      const plotTotal = calculatePlotTotal(plot.plotSize, plot.sizeUnit, plot.plotAmount, plot.priceUnit);
      updatedPlots[index].plotAmount = plotTotal;
    }
  
    // Recalculate total amount when plotAmount is updated
    if (field === "plotAmount") {
      const newTotal = updatedPlots.reduce((acc, plot) => acc + parseFloat(plot.plotAmount || 0), 0);
      setTotalAmount(newTotal.toFixed(2));  // Round off to 2 decimal places
    }
  
    setPlots(updatedPlots);
  };


//   const handlePlotChange = (index, field, value) => {
//     const updatedPlots = [...plots];
//     updatedPlots[index][field] = value;

//     if(field==="plotAmount")
//     {
//       const newTotal = updatedPlots.reduce((acc, plot) => Number(acc) + Number(plot.plotAmount), 0);
//  setTotalAmount(newTotal)
//     }

 
//     setPlots(updatedPlots);
//   };



const handleContactNumberChange = (value) => {
  // Remove all non-numeric characters for unformatted value
  const cleanedValue = value.replace(/\D/g, "");
  
  // Format the phone number
  const formattedNumber = formatPhoneNumber(value);
  
  // Update formatted phone number for display
  setPhoneNumber(formattedNumber);

  // Store unformatted number for backend submission
  setContactNo(cleanedValue);

  // Phone number validation
  const regex = /^[6-9]\d{9}$/;  
  if (cleanedValue.length > 10) {
    // setPhoneNumberError("Contact number cannot exceed 10 digits");
  } else if (!regex.test(cleanedValue)) {
    // setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
  } else {
    // setPhoneNumberError(""); // No error
  }
};


  const resetFunction = () => {
    setOwnerName("");
    setContactNo("");
    setAltContactNo("");
    setNoOfPlots("");
    setAvailablePlots("");
    setTitle("");
    setPlotSize("");
    setPrice("");
    setTotalAmount("");
    setDescription("");
    setRera(false);
    setDtcp(false);
    setTlp(false);
    setFlp(false);
    setCountry("");
    setState("");
    setDistrict("");
    setMandal("");
    setVillage("");
    setLandmark("");
    setSecurity(false);
    setLaundry(false);
    setUnderGroundWater(false);
    setDrainageSystem(false);
    setSwimmingPool(false);
    setPlayZone(false);
    setConventionHall(false);
    setGym(false);
    setMedical("");
    setEducational("");
    setRoadProximity("");
    setElectricity("");
    setRoadType("");
    setExtraAmenities("");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>{i18n.t("Add your layout details here")}</Text>
      </View>
      <View style={styles.container}>




       {
        role===5&&(

                    <View>
                      <Text style={styles.label1}>{i18n.t("Select Agent")}:</Text>

                         <View
                                  style={[
                                    styles.pickerWrapper1
                                   ]}
                                >
                      <Picker
                        selectedValue={selectedAgent}
                        onValueChange={(itemValue) => setSelectedAgent(itemValue)}


                        itemStyle={{    fontFamily: "Montserrat_500Medium",
                        }}
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
                          <Picker.Item label={i18n.t("No agents available")} value="" />
                        )}
                      </Picker>
                    </View>
                    </View>
        )
       }


        <Text style={styles.label}>
         {i18n.t("Owner Name")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.ownerName && styles.inputError]}
          placeholder={i18n.t("Enter owner name")}
          value={ownerName}
          onChangeText={(value) => {
            setOwnerName(value);
          }}
        />
        {errors.ownerName && (
          <Text style={styles.errorText}>{errors.ownerName}</Text>
        )}

        <Text style={styles.label}>
          {i18n.t("Owner Email")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder={i18n.t("Enter owner email")}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>
          {i18n.t("Owner Contact Number")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.contactNo && styles.inputError]}
          placeholder={i18n.t("Enter owner contact number")}
          value={contactNo}
          onChangeText={(value) => {
            handleContactNumberChange(value)          }}
        />
        {errors.contactNo && (
          <Text style={styles.errorText}>{errors.contactNo}</Text>
        )}

        <Text style={styles.label}>{i18n.t("Alternative Contact Number")}</Text>
        <TextInput
          // style={[styles.input, errors.ownerName && styles.inputError]}
          style={[styles.input]}
          placeholder={i18n.t("Enter alternative contact number")}
          value={altContactNo}
          onChangeText={(value) => {
            setAltContactNo(value);
          }}
        />
        <Text style={styles.label}>
          {i18n.t("Layout Title")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          placeholder={i18n.t("Enter layout title")}
          value={title}
          onChangeText={(value) => {
            setTitle(value);
          }}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

        <Text style={styles.label}>
          {i18n.t("Total Number of Plots")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.noOfPlots && styles.inputError]}
          placeholder={i18n.t("Enter total no of plots")}
          value={noOfPlots}
          onChangeText={(value) => {
            setNoOfPlots(value);
          }}
        />
        {errors.noOfPlots && (
          <Text style={styles.errorText}>{errors.noOfPlots}</Text>
        )}

        <Text style={styles.label}>
          {i18n.t("Available Plots")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.availablePlots && styles.inputError]}
          placeholder={i18n.t("Enter available plots")}
          value={availablePlots}
          onChangeText={(value) => {
            handleAvailablePlotsChange(value);
          }}
        />
        {errors.availablePlots && (
          <Text style={styles.errorText}>{errors.availablePlots}</Text>
        )}

        <View style={styles.toggleSection}>
          {/* <Text style={styles.label}>RERA Approved</Text> */}
          <Text style={styles.label}>
            {i18n.t("Are all the plots of the same size?")}{" "}
            <Text style={{ color: "red" }}>*</Text>{" "}
            {/* <Text>Are there groups of plots with the same dimensions?<Text style={{color:"red"}}>*</Text> */}
          {/* </Text> */}
</Text>
          <Switch
            value={samePlots}
            onValueChange={setSamePlots}
            thumbColor={samePlots ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <View style={[styles.pickerContainer ]}>
            <Picker
              selectedValue={priceUnit}
              onValueChange={(selectedValue) => {
                setPriceUnit(selectedValue);
              }}

              itemStyle={{    fontFamily: "Montserrat_500Medium",
              }}
            >
              <Picker.Item label="Select price unit" value="" color="#888" />

              <Picker.Item label="Cents" value="cents" />

              <Picker.Item label="Acres" value="acres" />
              <Picker.Item label="Sq.ft" value="sq.ft" />
              <Picker.Item label="Sq.yard" value="sq.yard" />
              <Picker.Item label="Sq.m" value="sq.m" />
              <Picker.Item label="None" value="none" />
            </Picker>
          </View> 


        {samePlots ? (
          <View>
            <Text style={styles.label}>
              Plot Size <Text style={{ color: "red" }}>*</Text>{" "}
            </Text>
            <View style={styles.row}>
              <TextInput
                style={[
                  styles.input,
                  styles.halfWidth,
                  errors.plotSize && styles.inputError,
                ]}
                placeholder={i18n.t("Enter plot size")}
                value={plotSize}
                onChangeText={(value) => handlePlotSize(value)}
                keyboardType="numeric"
              />

              <View style={[styles.pickerContainer, styles.halfWidth]}>
                <Picker
                  selectedValue={sizeUnit}
                  onValueChange={(selectedValue) => {
                    handleSizeUnit(selectedValue);
                  }}

                  itemStyle={{    fontFamily: "Montserrat_500Medium",
                  }}
                >
                  <Picker.Item label="Select size unit" value="" color="#888" />
                  <Picker.Item label="Cents" value="cents" />

                  <Picker.Item label="Acres" value="acres" />
                  <Picker.Item label="Sq.ft" value="sq.ft" />
                  <Picker.Item label="Sq.yard" value="sq.yard" />
                  <Picker.Item label="Sq.m" value="sq.m" />
                  <Picker.Item label="None" value="none" />
                </Picker>
              </View>
            </View>

            <Text style={styles.label}>
              Plot Price <Text style={{ color: "red" }}>*</Text>{" "}
            </Text>
            <TextInput
              style={[styles.input, errors.price && styles.inputError]}
              placeholder={i18n.t("Enter plot price")}
              value={price}
              onChangeText={(value) => handlePlotPrice(value)}
              keyboardType="numeric"
            />
          </View>
        ) : (
          <View>
            {availablePlots && (
              <View>
                {
            //       <View>
            //         {plots.map((item) => (
            //           <View key={item.plotId}>
            //             <Text style={styles.label}>{`Plot ID: ${item.plotId}`}</Text>
            // {/* // <TextInput value={item.plotSize} style={styles.input}  placeholder="Entre Plot Size" onChangeText={(value)=>{item.plotSize=value}}/> 
            // // <Text>{`Amount: ${item.plotAmount}`}</Text> */}

            //             <Text style={styles.label}>
            //               Plot Size <Text style={{ color: "red" }}>*</Text>{" "}
            //             </Text>
            //             <View style={styles.row}>
            //               <TextInput
            //                 style={[
            //                   styles.input,
            //                   styles.halfWidth,
            //                   errors.plotSize && styles.inputError,
            //                 ]}
            //                 placeholder="Enter plot size"
            //                 value={item.plotSize}
            //                 onChangeText={(value) =>{item.plotSize=value }}
            //                 keyboardType="numeric"
            //               />

            //               <View
            //                 style={[styles.pickerContainer, styles.halfWidth]}
            //               >
            //                 <Picker
            //                   selectedValue={item.sizeUnit}
            //                   onValueChange={(selectedValue) => {
            //                     item.sizeUnit=selectedValue
            //                    }}
            //                 >
            //                   <Picker.Item
            //                     label="Select size unit"
            //                     value=""
            //                     color="#888"
            //                   />
            //                   <Picker.Item label="Cents" value="cents" />

            //                   <Picker.Item label="Acres" value="acres" />
            //                   <Picker.Item label="Sq.ft" value="sq.ft" />
            //                   <Picker.Item label="Sq.yard" value="sq.yard" />
            //                   <Picker.Item label="Sq.m" value="sq.m" />
            //                   <Picker.Item label="None" value="none" />
            //                 </Picker>
            //               </View>
            //             </View>

            //             <Text style={styles.label}>
            //               Plot Price <Text style={{ color: "red" }}>*</Text>{" "}
            //             </Text>
            //             <TextInput
            //               style={[
            //                 styles.input,
            //                 errors.price && styles.inputError,
            //               ]}
            //               placeholder="Enter plot price"
            //               value={item.plotAmount}
            //               onChangeText={(value) => { item.plotAmount=value}}
            //               keyboardType="numeric"
            //             />
            //           </View>
            //         ))}
            //       </View>



            <View>
            {plots.map((item, index) => (
              <View key={item.plotId}>
                <Text style={styles.label}>{`Plot ID: ${item.plotId}`}</Text>
      
                {/* Plot Size */}
                <Text style={styles.label}>
                  {i18n.t("Plot Size")} <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.row}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.halfWidth,
                      errors.plotSize && styles.inputError,
                    ]}
                    placeholder={i18n.t("Enter plot size")}
                    value={item.plotSize}
                    onChangeText={(value) => handlePlotChange(index, "plotSize", value)}
                    keyboardType="numeric"
                  />
      
                  <View style={[styles.pickerContainer, styles.halfWidth]}>
                    <Picker
                      selectedValue={item.sizeUnit}
                      onValueChange={(selectedValue) => handlePlotChange(index, "sizeUnit", selectedValue)}

                      itemStyle={{    fontFamily: "Montserrat_500Medium",
                      }}
                    >
                      <Picker.Item label={i18n.t("Select size unit")} value="" color="#888" />
                      <Picker.Item label={i18n.t("Cents")} value="cents" />
                      <Picker.Item label={i18n.t("Acres" )}value="acres" />
                      <Picker.Item label={i18n.t("Sq.ft")} value="sq.ft" />
                      <Picker.Item label={i18n.t("Sq.yard")} value="sq.yard" />
                      <Picker.Item label={i18n.t("Sq.m")} value="sq.m" />
                      <Picker.Item label={i18n.t("None")} value="none" />
                    </Picker>
                  </View>
                </View>
      
                {/* Plot Price */}
                <Text style={styles.label}>
                  {i18n.t("Plot Price")} <Text style={{ color: "red" }}>*</Text>
                </Text>
                 <TextInput
                  style={[
                    styles.input,
                    errors.price && styles.inputError,
                  ]}
                  placeholder={i18n.t("Enter plot price")}
                  value={item.plotAmount}
                  onChangeText={(value) => handlePlotChange(index, "plotAmount", value)}
                  keyboardType="numeric"
                />


 
          </View>
             ))}
          </View>
                }
              </View>
            )}
          </View>
        )}

        {/* <View>
{
  samePlots&&plotSize&&price&&(<View>{
    plots.map((item)=>{
      <View>
        <TextInput  value={item.plotSize} />
        </View>
    })
    
    } </View>)
}
</View> */}
{/* 
        <Text style={styles.label}>
          Plot Size <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.row}>
           <TextInput
            style={[styles.input, errors.plotSize && styles.inputError]}
            placeholder="Enter plot size"
            value={plotSize}
            onChangeText={(value) => setPlotSize(value)}
            keyboardType="numeric"
          /> */}
{/* 
           <View style={[styles.pickerContainer, styles.halfWidth]}>
            <Picker
              selectedValue={sizeUnit}
              onValueChange={(selectedValue) => {
                setSizeUnit(selectedValue);
              }}
            >
              <Picker.Item label="Select size unit" value="" color="#888" />
              <Picker.Item label="Cents" value="cents" />

              <Picker.Item label="Acres" value="acres" />
              <Picker.Item label="Sq.ft" value="sq.ft" />
              <Picker.Item label="Sq.yard" value="sq.yard" />
              <Picker.Item label="Sq.m" value="sq.m" />
              <Picker.Item label="None" value="none" />
            </Picker>
          </View>
        </View>
        {errors.plotSize && (
          <Text style={styles.errorText}>{errors.plotSize}</Text>
        )} */}

        {/* <Text style={styles.label}>
          Price <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.row}>
           <TextInput
            style={[
              styles.input,
              styles.halfWidth,
              errors.price && styles.inputError,
            ]}
            placeholder="Enter price"
            value={price}
            onChangeText={(value) => setPrice(value)}
            keyboardType="numeric"
          /> */}

          {/* Picker for Road Type */}
          {/* <View style={[styles.pickerContainer, styles.halfWidth]}>
            <Picker
              selectedValue={priceUnit}
              onValueChange={(selectedValue) => {
                setPriceUnit(selectedValue);
              }}
            >
              <Picker.Item label="Select price unit" value="" color="#888" />

              <Picker.Item label="Cents" value="cents" />

              <Picker.Item label="Acres" value="acres" />
              <Picker.Item label="Sq.ft" value="sq.ft" />
              <Picker.Item label="Sq.yard" value="sq.yard" />
              <Picker.Item label="Sq.m" value="sq.m" />
              <Picker.Item label="None" value="none" />
            </Picker>
          </View> */}
        {/* </View> */}
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <Text style={styles.label}>{i18n.t("Total Amount")}</Text>
        <TextInput
          // style={[styles.input, errors.ownerName && styles.inputError]}
          style={[styles.input]}
          placeholder={i18n.t("Total amount")}
          value={totalAmount}
          onChangeText={(value) => {
            setTotalAmount(value);
          }}
          editable={false}
        />
        <Text style={styles.label}>{i18n.t("Layout Description")}</Text>
        <TextInput
          // style={[styles.input, errors.ownerName && styles.inputError]}
          style={[styles.input, styles.textarea]}
          placeholder={i18n.t("Enter layout description")}
          value={description}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => {
            setDescription(value);
          }}
        />
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("RERA Approved")}</Text>
          <Switch
            value={rera}
            onValueChange={setRera}
            thumbColor={rera ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("DTCP Approved")}</Text>
          <Switch
            value={dtcp}
            onValueChange={setDtcp}
            thumbColor={dtcp ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("TLP Approved")}</Text>
          <Switch
            value={tlp}
            onValueChange={setTlp}
            thumbColor={tlp ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("FLP Approved")}</Text>
          <Switch
            value={flp}
            onValueChange={setFlp}
            thumbColor={flp ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text style={styles.label}>
          Country <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.country && styles.inputError]}
          placeholder={i18n.t("Enter alternative contact number")}
          value={country}
          onChangeText={(value) => {
            setCountry(value);
          }}
          editable={false}
        />
        {errors.country && (
          <Text style={styles.errorText}>{errors.country}</Text>
        )}

        <Text style={styles.label}>
          State <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          placeholder={i18n.t("Enter layout title")}
          value={state}
          onChangeText={(value) => {
            setState(value);
          }}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

        <Text style={styles.label}>
          Pincode <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.pinCode && styles.inputError]}
          placeholder={i18n.t("Enter pincode")}
          value={pincode}
          onChange={handlePincodeChange}
        />
        {errors.pincode && (
          <Text style={styles.errorText}>{errors.pincode}</Text>
        )}

        <Text style={styles.label}>
          {i18n.t("District")} <Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder={i18n.t("District")}
          value={district}
          onChangeText={handleDistrictChange}
          style={[styles.input, errors.district && styles.inputError]}
          editable={false}
        />

        {errors.district && (
          <Text style={styles.errorText}>{errors.district}</Text>
        )}

        <Text style={styles.label}>
          {i18n.t("Mandal")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View
          style={[
            {
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 10,
            },
            errors.mandal && styles.inputError,
          ]}
        >
          <Picker selectedValue={mandal} onValueChange={handleMandalChange} itemStyle={{    fontFamily: "Montserrat_500Medium",
}} >
            {mandals.length > 0 ? (
              mandals.map((mandalOption, index) => (
                <Picker.Item
                  key={index}
                  label={mandalOption}
                  value={mandalOption}
                />
              ))
            ) : (
              <Picker.Item label={i18n.t("Mandal")} value="" />
            )}
          </Picker>
        </View>
        {errors.mandal && <Text style={styles.errorText}>{errors.mandal}</Text>}
        <Text style={styles.label}>
          {i18n.t("Village")} <Text style={{ color: "red" }}>*</Text>
        </Text>

        <View
          style={[
            {
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 10,
            },
            errors.village && styles.inputError,
          ]}
        >
          <Picker selectedValue={village} onValueChange={handleVillageChange}  itemStyle={{    fontFamily: "Montserrat_500Medium",
}} >
            {villages.length > 0 ? (
              villages.map((villageOption, index) => (
                <Picker.Item
                  key={index}
                  label={villageOption}
                  value={villageOption}
                />
              ))
            ) : (
              <Picker.Item label={i18n.t("Village")} value="" />
            )}
          </Picker>
        </View>
        {errors.village && (
          <Text style={styles.errorText}>{errors.village}</Text>
        )}

        <Text style={styles.label}>
          {i18n.t("Land Mark")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Enter land mark")}
          value={landMark}
          onChangeText={setLandmark}
          style={[styles.input, errors.landMark && styles.inputError]}
        />
        {errors.landMark && (
          <Text style={styles.errorText}>{errors.landMark}</Text>
        )}

        <Text style={styles.label1}>{i18n.t("Current location")}</Text>
        <Button
          // mode="contained"
          title={i18n.t("choose location")}
          onPress={getUserLocation}
          icon={() => <Icon name="md-compass" size={20} color="#000" />}
          style={styles.locationButton}
        ></Button>

        <Text style={styles.label1}>{i18n.t("Latitude")}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t("Latitude")}
          value={`${latitude}`}
          editable={false}
        />
        <Text style={styles.label1}>{i18n.t("Longitude")}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t("Longitude")}
          value={`${longitude}`}
          editable={false}
        />

        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Security")}</Text>
          <Switch
            value={security}
            onValueChange={setSecurity}
            thumbColor={security ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Laundry")}</Text>
          <Switch
            value={laundry}
            onValueChange={setLaundry}
            thumbColor={laundry ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Underground Water")}</Text>
          <Switch
            value={underGroundWater}
            onValueChange={setUnderGroundWater}
            thumbColor={underGroundWater ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Drainage System")}</Text>
          <Switch
            value={drainageSystem}
            onValueChange={setDrainageSystem}
            thumbColor={drainageSystem ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Swimming Pool")}</Text>
          <Switch
            value={swimmingPool}
            onValueChange={setSwimmingPool}
            thumbColor={swimmingPool ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Play Zone")}</Text>
          <Switch
            value={playZone}
            onValueChange={setPlayZone}
            thumbColor={playZone ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Gym")}</Text>
          <Switch
            value={gym}
            onValueChange={setGym}
            thumbColor={gym ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.label}>{i18n.t("Convention Hall")}</Text>
          <Switch
            value={conventionHall}
            onValueChange={setConventionHall}
            thumbColor={conventionHall ? "#0791fa" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text style={styles.label}>{i18n.t("Near By Medical Facility")}</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputMedical}
            placeholder={i18n.t("Enter distance")}
            value={medical}
            onChangeText={setMedical}
            keyboardType="numeric"
          />
          <Text style={styles.addon}>km</Text>
        </View>
        <Text style={styles.label}>{i18n.t("Near By Educational Institutions")}</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputMedical}
            placeholder={i18n.t("Enter distance")}
            value={educational}
            onChangeText={setEducational}
            keyboardType="numeric"
          />
          <Text style={styles.addon}>km</Text>
        </View>
        <Text style={styles.label}>{i18n.t("Road Proximity")}</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputMedical}
            placeholder={i18n.t("Enter distance")}
            value={roadProximity}
            onChangeText={(value) => {
              setRoadProximity(value);
            }}
            keyboardType="numeric"
          />
          <Text style={styles.addon}>km</Text>
        </View>

        <Text style={styles.label}>{i18n.t("Type of Electricity")}</Text>
        <View style={[styles.pickerContainer]}>
          <Picker
            selectedValue={electricity}
            onValueChange={(selectedValue) => {
              setElectricity(selectedValue);
            }}

            itemStyle={{    fontFamily: "Montserrat_500Medium",
            }}
          >
            <Picker.Item
              label={i18n.t("Select type of electricity")}
              value=""
              color="#888"
            />
            <Picker.Item label={i18n.t("Domestic" )}value="domestic" />
            <Picker.Item label={i18n.t("Industrial")} value="industrial" />
            <Picker.Item label={i18n.t("Commercial")} value="commercial" />
            <Picker.Item label={i18n.t("Residential")} value="residential" />
            <Picker.Item label={i18n.t("None")} value="none" />
          </Picker>
        </View>

        <Text style={styles.label}>{i18n.t("Near By Type of Road")}</Text>
        <View style={[styles.pickerContainer]}>
          <Picker
            selectedValue={roadType}
            onValueChange={(selectedValue) => {
              setRoadType(selectedValue);
            }}

            itemStyle={{    fontFamily: "Montserrat_500Medium",
            }}
          >
            <Picker.Item label={i18n.t("Select type of road")} value="" color="#888" />
            <Picker.Item label={i18n.t("R & B")} value="nearToRNB" />
            <Picker.Item label={i18n.t("Near to Highway")} value="nearToHighway" />
            <Picker.Item label={i18n.t("Near to Panchayat")} value="nearToPanchayat" />
            <Picker.Item label={i18n.t("Near to Village")} value="nearToVillage" />
            <Picker.Item label={i18n.t("None")} value="none" />
          </Picker>
        </View>

        <Text style={styles.label}>{i18n.t("Extra Amenities")}</Text>
        <TextInput
          // style={[styles.input, errors.ownerName && styles.inputError]}
          style={[styles.input, styles.textarea]}
          placeholder={i18n.t("Enter extra amenities")}
          value={extraAmenities}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => {
            setExtraAmenities(value);
          }}
        />

        <CameraOption onSelectImage={sentImage} />

        <TouchableOpacity
          style={{
            backgroundColor: "#4184AB",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default LayoutFormAgent;

const styles = StyleSheet.create({
  stylingtext: {
    fontSize: 25,
    // fontWeight: "bold",
    color: "white",
    fontFamily: "Montserrat_500Medium"
  },
  customcontainer: {
    padding: 50,

    backgroundColor: "#4184AB",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 3,
    fontFamily: "Montserrat_500Medium"
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium"
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 5,
    marginTop:10,
    // fontWeight: "bold",
    fontFamily: "Montserrat_500Medium"
  },

  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    fontFamily: "Montserrat_500Medium"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium"
  },
  halfWidth: {
    width: "48%", // Adjusted to avoid overlap
    fontFamily: "Montserrat_500Medium"
  },

  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 15,
    fontFamily: "Montserrat_500Medium"
  },
  textarea: {
    textAlignVertical: "top", // Ensures text starts at the top
    height: 100, // Sets the height for the textarea
    fontFamily: "Montserrat_500Medium"
  },
  toggleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium"
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    fontFamily: "Montserrat_500Medium"
  },
  addon: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
    fontFamily: "Montserrat_500Medium"
  },
  inputMedical: {
    flex: 1,
    fontSize: 14,
    padding: 5,
    fontFamily: "Montserrat_500Medium"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium"
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
    fontFamily: "Montserrat_500Medium"
  },
  label1: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold"
  },
  pickerWrapper1: {
    height: 50,

    borderColor: "black",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    fontFamily: "Montserrat_500Medium"
  },

});
