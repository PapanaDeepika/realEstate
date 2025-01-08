import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Switch,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import LocationPicker from "../LocationPicker";
import { jwtDecode } from "jwt-decode";

// import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";
import { Checkbox } from "react-native-paper";
// import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { useNavigation } from "@react-navigation/native";
// import { ScrollView } from "react-native-web";
const cloudName = "ddv2y93jq";

const ResidentialAgent = () => {
  // const [userId, setUserId] = useState('');
  const [propertyType, setPropertyType] = useState("Residential");
  const navigation = useNavigation();
  // Owner Info
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [contact, setContact] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log("SETTED", selectedLocation);
  };
  // Property Details
  const [type, setType] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [apartmentLayout, setApartmentLayout] = useState("flat");
  const [flatSize, setFlatSize] = useState(0);
  const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
  const [priceUnit, setPriceUnit] = useState("/acres"); // Price unit
  const [images, setImages] = useState(""); // New state for handling image URLs

  const [flatCost, setFlatCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [flatFacing, setFlatFacing] = useState("");
  const [furnitured, setFurnitured] = useState("");
  const [propDesc, setPropDesc] = useState("");
  const [extraAmenitiesString, setextraAmenitiesString] = useState("");
  const [extraAmenities, setExtraAmenities] = useState("");
  const [errors, setErrors] = useState({});

  // Address

  const [country, setCountry] = useState("India");
  const [pinCode, setPincode] = useState("");

  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [addressDetails, setAddressDetails] = useState({
    district: "",
    mandal: "",
    village: "",
  });
  const [state, setState] = useState("Andhra Pradesh");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLogitude] = useState("");
  const [landMark, setLandmark] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  // Amenities
  const [powerSupply, setPowerSupply] = useState(false);
  const [waterFacility, setWaterFacility] = useState(false);
  const [electricityFacility, setElectricityFacility] = useState("");
  const [elevator, setElevator] = useState(false);
  const [watchman, setWatchman] = useState(false);
  const [cctv, setCctv] = useState(false);
  const [medical, setMedical] = useState(0);
  const [educational, setEducational] = useState(0);
  const [grocery, setGrocery] = useState(0);
  const [gymFacility, setGymFacility] = useState(false);
  const [roadType, setRoadType] = useState("munciple");
  const [distanceFromRoad, setDistancefromroad] = useState(0);
  // Property Photos
  // const [propPhotos, setPropPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]); // Selected images
  const [uploadedImages, setUploadedImages] = useState([]); // Uploaded images URLs
  const [uploadedUrls1, setUploadedUrls1] = useState([]);
  // const[uploadedUrls,setUploadedUrls]=useState([]);
  // const uploadedUrls = []; // Temporary array to collect URLs
  const [uploadedUrls, setUploadedUrls] = useState([]); // State for uploaded URLs
  const [agents, setAgents] = useState([]); // State to store the agents
  const [selectedAgent, setSelectedAgent] = useState(""); // State to store selected agent'
  const [loading, setLoading] = useState(true); // State to manage loading

  const [bathroomCount, setBathroomCount] = useState(0);
  const [balconyCount, setBalconyCount] = useState(0);
  const [floorNumber, setFloorNumber] = useState(0);
  const [propertyAge, setPropertyAge] = useState(0);
  const [maintenanceCost, setMaintenanceCost] = useState(0);
  const [visitorParking, setVisitorParking] = useState(false);
  const [waterSource, setWaterSource] = useState({
    // item1: false,
    // item2: false,
    // item3: false,
    // item4: false,
    muncipal: false,
    borewells: false,
    tankwater: false,
  });
  const [playZone, setPlayZone] = useState(false);
  // const [extraAmenities, setExtraAmenities] = useState([]);
  const [locationDetails, setLocationDetails] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // const [checkboxes, setCheckboxes] = useState({
  // item1: false,
  // item2: false,
  // item3: false,
  // item4: false,
  // });

  // // Configurations

  const [selectedImages1, setSelectedImages1] = useState([]);

  const toggleSelection = (uri) => {
    setSelectedImages1((prevSelectedImages) => {
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
    const isSelected = selectedImages1.includes(item); // Check if the image is selected
    return (
      <TouchableOpacity onPress={() => toggleSelection(item)}>
        <Image
          source={{ uri: item }}
          style={[
            { width: 100, height: 100, margin: 5 },
            isSelected && { borderWidth: 3, borderColor: "blue" }, // Add border when selected
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

  const apiUrl = "http://172.17.15.184:3000/residential/add";
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
          `http://172.17.15.184:3000/location/getlocationbypincode/${pincodeValue}/@/@`
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
        `http://172.17.15.184:3000/location/getmandals/${selectedDistrict}`
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
        `http://172.17.15.184:3000/location/getvillagesbymandal/${selectedMandal}`
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
          // setLatitude(latitude1);
          // setLogitude(longitude1);
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

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format it into 'xxx xxx xxxx'
    let formattedPhoneNumber = "";
    if (cleanedValue.length <= 3) {
      formattedPhoneNumber = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
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
    // Format the phone number
    const formattedNumber = formatPhoneNumber(value);
    setContact(formattedNumber);

    // Remove all spaces to check length and pattern
    const cleanedValue = value.replace(/\D/g, "");

    // Regex to ensure the number starts with 6-9 and is 10 digits
    const regex = /^[6-9]\d{9}$/; // Starts with 6-9 and has exactly 10 digits

    // Validate the phone number
    // if (cleanedValue.length > 10) {
    //   setPhoneNumberError("Contact number cannot exceed 10 digits");
    // } else if (!regex.test(cleanedValue)) {
    //   setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
    // } else {
    //   setPhoneNumberError('');
    // }
  };

  const uploadImages = async (imageAssets) => {
    // const uploadedUrls = []; // Temporary array to collect URLs
    // Temporary array to collect uploaded URLs
    const tempUploadedUrls = [];

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
          // uploadedUrls.push(response.data.secure_url); // Push URL to temp array
          tempUploadedUrls.push(response.data.secure_url); // Add URL to temp array
        } else {
          console.error("No secure_url in response:", response.data);
        }
      }

      // // Update state after all uploads are done
      // setImages((prevImages) => [...prevImages, ...uploadedUrls]);
      // console.log("All Uploaded URLs:", uploadedUrls);
      // setUploadedUrls1(uploadedUrls);
      // console.log("hashhdj", uploadedUrls);
      // Update state after all uploads are done
      setImages((prevImages) => [...prevImages, ...tempUploadedUrls]); // Update images state
      setUploadedUrls1((prevUrls) => [...prevUrls, ...tempUploadedUrls]); // Update uploadedUrls1 state
      console.log("All Uploaded URLs:", tempUploadedUrls);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", "There was an error uploading your images.");
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!ownerName.trim()) newErrors.ownerName = "Owner Name is required";

    if (!ownerEmail.trim()) {
      newErrors.email = "Email is required";
    }

    if (!contact.trim()) {
      newErrors.contact = "Phone number is required";
    }

    if (!propertyType.trim()) {
      newErrors.landType = "Property Type is required";
    }

    if (!apartmentName.trim()) {
      newErrors.apartmentName = "Apartment name is required";
    }

    if (!flatNumber.trim()) {
      newErrors.flatNumber = "Flat Number number is required";
    }

    if (!flatSize) {
      newErrors.flatSize = " Flat size is required";
    }
    if (!sizeUnit.trim()) {
      newErrors.sizeUnit = "Size unit is required";
    }
    if (!flatCost) {
      newErrors.flatCost = "FlatCost is required";
    }
    if (!priceUnit.trim()) {
      newErrors.priceUnit = "Price unit is required";
    }
    if (!totalCost) {
      newErrors.totalCost = "Total cost is required";
    }

    if (!pinCode.trim()) {
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
    if (!apartmentLayout.trim()) {
      newErrors.apartmentLayout = "ApartmentLayout is required";
    }
    if (!flatFacing.trim()) {
      newErrors.flatFacing = "Flat Facing is required";
    }
    if (!furnitured.trim()) {
      newErrors.furnitured = "Furnitured is required";
    }
    if (!electricityFacility.trim()) {
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
    setContact("");
    setApartmentLayout("");
    setFlatCost("");
    setFlatFacing("");
    setFlatNumber("");
    setApartmentName("");
    setBalconyCount("");
    setBathroomCount("");
    setCurrentLocation("");
    setCctv("");
    setElectricityFacility("");
    setEducational("");
    setExtraAmenities("");
    setFloorNumber("");
    setFurnitured("");
    setTotalCost("");
    setAddressDetails("");
    setRoadType("");
    setPinCode("");
    setDescription("");
    setDistrict("");
    setCountry("");
    setState("");
    setSize("");
    setSizeUnit("");
    setElectricity("");
    setImages("");
    setPrice("");
    setPriceUnit("");
    setIsDispute("");
    setMandal("");
    setVillage("");

    setLandmark("");
    setLatitude("");
    setLogitude("");
    };

  const handleSubmit = async () => {
    // const userId=selectedAgent;
    if (validateForm()) {
      const selectedWaterSources = Object.keys(waterSource).filter(
        (key) => waterSource[key]
      );

      // const formattedExtraAmenities = ; // Convert to array

      const data = {
        // userId,
        propertyType,
        //  agentDetails:{
        //   userId:selectedAgent,
        //   },
        owner: {
          ownerName,
          ownerEmail,
          contact: String(contact),
        },
        propertyDetails: {
          type: propertyType,
          apartmentName,
          flatNumber,
          apartmentLayout,
          flatSize: Number(flatSize),
          sizeUnit,
          flatCost: Number(flatCost),
          priceUnit,
          totalCost: Number(totalCost),
          flatFacing,
          furnitured,
          propDesc,
        },
        address: {
          pinCode,
          country,
          state,
          district,
          mandal,
          village,
          latitude: String(latitude),
          longitude: String(longitude),
          landMark,
          //  currentLocation,
        },
        amenities: {
          powerSupply,
          waterFacility,
          electricityFacility,
          elevator,
          watchman,
          cctv,
          medical: Number(medical),
          educational: Number(educational),
          grocery: Number(grocery),
          gymFacility,
          roadType,
          distanceFromRoad,
        },
        // propPhotos: propPhotos.split(","), // Converts comma-separated URLs into an array
        // videos: videos.split(","),
        configurations: {
          bathroomCount: Number(bathroomCount),
          balconyCount: Number(balconyCount),
          floorNumber: Number(floorNumber),
          propertyAge: Number(propertyAge),
          maintenanceCost: Number(maintenanceCost),
          visitorParking,
          waterSource: selectedWaterSources, // Converts comma-separated water sources
          playZone,
          // extraAmenities: extraAmenitiesString.split(",")
          // .map((amenity) => amenity.trim()),
          // extraAmenities:extraAmenities.split(",").map((amenity) => amenity.trim()),
          extraAmenities: extraAmenities
            .split(",")
            .map((amenity) => amenity.trim()),
        },
        propPhotos: uploadedUrls1,
      };
      // ---r

      console.log("Form Data:", data);

      console.log(
        "Data being submitted to the API:",
        JSON.stringify(data, null, 2)
      ); // Debug data

      //  console.log("the data is --> ",data.agentDetails.userId)
      //  console.log("Form Data:", data);

      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("token not found", "please login again");
          return;
        }
        console.log(
          "Data being submitted to the API:",
          JSON.stringify(data, null, 2)
        ); // Debug data

        //  console.log("the user id  is --> ",data.agentDetails.userId)
        const response = await axios.post(apiUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        Alert.alert("data submitted succesfully");
        resetForm();
        navigation.navigate("asd");

        console.log("Response from api : ", response.data);
      } catch (error) {
        Alert.alert("error submitting data please try again");
        console.error(error.response?.data || error.message);
      }
    } else {
      Alert.alert("Required fields needs to filled");
    }
  };
  // Utility function for unit conversion and total price calculation
  const calculateTotalPrice = () => {
    let sizeInAcres = parseFloat(flatSize);
    let pricePerAcre = parseFloat(flatCost);

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
      setTotalCost((sizeInAcres * pricePerAcre).toFixed(2));
    } else {
      setTotalCost("");
    }
  };
  const pickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, // Allow multiple images to be selected

        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        await uploadImages(result.assets);
      }
    } catch (error) {
      console.error("Error picking images:", error);
      Alert.alert("Error", "Could not pick images.");
    }
  };

  const toggleCheckbox = (key) => {
    setWaterSource({ ...waterSource, [key]: !waterSource[key] });
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [flatSize, flatCost, sizeUnit, priceUnit]);
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

  //  useEffect(() => {
  //   const fetchAssignedAgents = async () => {
  //   try {
  //   const token = await AsyncStorage.getItem("userToken");
  //   if (!token) {
  //   console.log("No token found");
  //   setLoading(false);
  //   return;
  //   }

  //   const decodedToken = jwtDecode(token);
  //   const userId = decodedToken.user.userId;

  //   console.log("User ID cmg o:", userId);

  //   // Fetch agents assigned to the user
  //   const response = await fetch(
  //   `http://172.17.15.184:3000/csr/getAssignedAgents/${userId}`,
  //   {
  //   method: "GET",
  //   headers: {
  //   Authorization: `Bearer ${token}`,
  //   "Content-Type": "application/json",
  //   },
  //   }
  //   );

  //   if (!response.ok) {
  //   throw new Error(`Error fetching agents: ${response.statusText}`);
  //   }

  //   const data = await response.json();
  //   console.log("agent details ",data);

  //   setAgents(data); // Assuming data is an array of agents
  //   } catch (error) {
  //   console.error("Failed to fetch assigned agents:", error);
  //   } finally {
  //   setLoading(false);
  //   }
  //   };

  //   fetchAssignedAgents();
  //   }, []);

  //   const handleAgentChange = (itemValue) => {
  //   const selectedAgent = agents.find((agent) => agent.id === itemValue);
  //   setSelectedAgent(selectedAgent ? selectedAgent.name : "");
  //   };

  //   if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <ScrollView>
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Residential Property Details</Text>
      </View>
      <View style={styles.container}>
        {/* <View>
 <Text style={styles.label1}> Select Agent:</Text>
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
        <Text style={styles.label1}>
          Owner Name <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.ownerName && styles.inputError]}
          placeholder="Enter owner name"
          value={ownerName}
          onChangeText={setOwnerName}
        />
        {errors.ownerName && (
          <Text style={styles.errorText}>{errors.ownerName}</Text>
        )}

        <Text style={styles.label1}>
          Owner Email<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter Owner Email"
          value={ownerEmail}
          onChangeText={setOwnerEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label1}>
          Contact Number<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Contact Number"
          value={contact}
          keyboardType="numeric"
          style={[styles.input, errors.contact && styles.inputError]}
          onChangeText={handleContactNumberChange}
        />
        {errors.contact && (
          <Text style={styles.errorText}>{errors.contact}</Text>
        )}

        {/* Property Details type,
   apartmentName,
   flatNumber,
   apartmentLayout,
   flatSize: Number(flatSize),
   flatCost: Number(flatCost),
   totalCost: Number(totalCost),
   flatFacing,
   furnitured,
   propDesc,*/}

        {/* <TextInput placeholder="Rating" value={rating} onChangeText={setRating} keyboardType="numeric" /> */}
        <Text style={styles.label1}>
          Property Type<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Property Type"
          value={propertyType}
          style={[styles.input, errors.propertyType && styles.inputError]}
          onChangeText={setPropertyType}
        />
        {errors.propertyType && (
          <Text style={styles.errorText}>{errors.propertyType}</Text>
        )}

        <Text style={styles.label1}>
          Property Name <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Property Name"
          value={apartmentName}
          style={[styles.input, errors.apartmentName && styles.inputError]}
          onChangeText={setApartmentName}
        />
        {errors.apartmentName && (
          <Text style={styles.errorText}>{errors.apartmentName}</Text>
        )}

        <Text style={styles.label1}>
          Property Number <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Property Number"
          value={flatNumber}
          style={[styles.input, errors.flatNumber && styles.inputError]}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setFlatNumber(numericValue);
          }}
        />

        {errors.flatNumber && (
          <Text style={styles.errorText}>{errors.flatNumber}</Text>
        )}

        <Text style={styles.label1}>
          Flat Size <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Flat Size"
            value={flatSize}
            style={[styles.input, errors.flatSize && styles.inputError]}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ""); // Allow only numbers
              setFlatSize(numericValue);
            }}
          />

          <View
            style={[
              styles.pickerWrapper1,
              errors.sizeUnit && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={sizeUnit}
              style={styles.picker}
              onValueChange={(itemValue) => setSizeUnit(itemValue)}
            >
              <Picker.Item label="None" />

              <Picker.Item label="Cents" value="cents" />
              <Picker.Item label="Acres" value="acres" />
              <Picker.Item label="Sq. Ft" value="sq.ft" />
              <Picker.Item label="Sq. Yards" value="sq.yards" />
              <Picker.Item label="Sq. M" value="sq.m" />
            </Picker>
          </View>
        </View>
        {errors.flatSize && (
          <Text style={styles.errorText}>{errors.flatSize}</Text>
        )}
        {errors.sizeUnit && (
          <Text style={styles.errorText}>{errors.sizeUnit}</Text>
        )}

        <Text style={styles.label1}>
          Flat Cost <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.row}>
          <TextInput
            placeholder="flatCost"
            value={flatCost}
            style={[styles.input, errors.flatCost && styles.inputError]}
            onChangeText={setFlatCost}
          />
          {/* flat price unit drop donw */}
          <View
            style={[
              styles.pickerWrapper1,
              errors.priceUnit && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={priceUnit}
              style={styles.picker}
              onValueChange={setPriceUnit}
            >
              <Picker.Item label="None" />

              <Picker.Item label="/cent" value="/cent" />
              <Picker.Item label="/acre" value="/acre" />
              <Picker.Item label="/sq.ft" value="/sq.ft" />
              <Picker.Item label="/sq.yard" value="/sq.yard" />
              <Picker.Item label="/sq.m" value="/sq.m" />
            </Picker>
          </View>
        </View>

        {errors.flatCost && (
          <Text style={styles.errorText}>{errors.flatCost}</Text>
        )}
        {errors.priceUnit && (
          <Text style={styles.errorText}>{errors.priceUnit}</Text>
        )}

        <Text style={styles.label1}>
          Total Cost<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Total Cost"
          value={`${totalCost} * ${priceUnit}`}
          style={[styles.input, errors.totalCost && styles.inputError]}
          onChangeText={setTotalCost}
        />

        {errors.totalCost && (
          <Text style={styles.errorText}>{errors.totalCost}</Text>
        )}

        {/* drop down */}
        {/* <TextInput
   placeholder="PropertyLayout"
   value={}
   style={styles.input}
   onChangeText={}
   /> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label1}>
            Property Layout<Text style={{ color: "red" }}>*</Text>
          </Text>

          <View
            style={[
              styles.pickerWrapper1,
              errors.apartmentLayout && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={apartmentLayout}
              style={styles.picker}
              onValueChange={setApartmentLayout}
            >
              <Picker.Item label="1BHK" value="1BHK" />
              <Picker.Item label="2BHK" value="2BHK" />
              <Picker.Item label="3BHK" value="3BHK" />
              <Picker.Item label="4BHK" value="4BHK" />
            </Picker>
          </View>
        </View>
        {errors.apartmentLayout && (
          <Text style={styles.errorText}>{errors.apartmentLayout}</Text>
        )}

        {/* drop down */}
        {/* <TextInput
   
   value={}
   style={styles.input}
   onChangeText={}
   /> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label1}>
            Property Facing <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.flatFacing && styles.pickerError,
            ]}
          >
            <Picker
              placeholder="Property Facing"
              selectedValue={flatFacing}
              style={styles.picker}
              onValueChange={setFlatFacing}
            >
              <Picker.Item label="East" value="East" />
              <Picker.Item label="West" value="West" />
              <Picker.Item label="North" value="North" />

              <Picker.Item label="South" value="South" />
            </Picker>
          </View>
        </View>

        {errors.flatFacing && (
          <Text style={styles.errorText}>{errors.flatFacing}</Text>
        )}

        {/* drop down */}
        {/* <TextInput
   placeholder="Furniture"
   value={}
   style={styles.input}
   onChangeText={}
   /> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label1}>
            Furniture <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.furnitured && styles.pickerError,
            ]}
          >
            <Picker
              placeholder="Property Facing"
              selectedValue={furnitured}
              style={styles.picker}
              onValueChange={setFurnitured}
            >
              <Picker.Item label="Semi Furnished" value="Semi Furnished" />
              <Picker.Item label="Fully Furnished" value="Fully Furnishe" />
              <Picker.Item label="UnFurnished" value="UnFurnished" />
            </Picker>
          </View>
        </View>

        {errors.furnitured && (
          <Text style={styles.errorText}>{errors.furnitured}</Text>
        )}

        {/* <TextInput
   placeholder="propDesc"
   value={propDesc}
   style={styles.input}
   onChangeText={setPropDesc}
   /> */}

        {/* Continue for all other fields */}
        {/* { propertyType,
   rating,
   ratingCount,
   status,} */}

        {/* <TextInput
   placeholder="Property Type"
   value={propertyType}
   style={styles.input}
   onChangeText={setPropertyType}
   />
   <TextInput
   placeholder="Property Type"
   value={rating}
   style={styles.input}
   onChangeText={setRating}
   />
   <TextInput
   placeholder="Property Type"
   value={ratingCount}
   style={styles.input}
   onChangeText={setRatingCount}
   />
   <TextInput
   placeholder="Property Type"
   value={status}
   style={styles.input}
   onChangeText={setStatus}
   /> */}

        {/**pincode,
   country,
   state,
   district,
   mandal,
   village, */}
        <Text style={styles.label1}>Property Description</Text>
        <TextInput
          placeholder="Property Description"
          value={propDesc}
          style={styles.input}
          onChangeText={setPropDesc}
        />

        <Text style={styles.label1}>
          Pincode<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Pincode"
          value={pinCode}
          onChange={handlePincodeChange}
          style={[
            styles.input,
            styles.pincodeInput,
            errors.ownerName && styles.inputError,
          ]}
        />
        {errors.pinCode && (
          <Text style={styles.errorText}>{errors.pinCode}</Text>
        )}

        <Text style={styles.label1}>
          Country<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="country"
          value={country}
          style={[styles.input, errors.country && styles.inputError]}
          onChangeText={setCountry}
        />
        {errors.country && (
          <Text style={styles.errorText}>{errors.country}</Text>
        )}

        <Text style={styles.label1}>
          State<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="state"
          value={state}
          style={[styles.input, errors.state && styles.inputError]}
          onChangeText={setState}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

        <Text style={styles.label1}>
          District<Text style={{ color: "red" }}>*</Text>
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
          Mandal<Text style={{ color: "red" }}>*</Text>
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
        {errors.mandal && <Text style={styles.errorText}>{errors.mandal}</Text>}

        <Text style={styles.label1}>
          Village<Text style={{ color: "red" }}>*</Text>
        </Text>

        {/* <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}> */}
        <View
          style={[styles.pickerWrapper1, errors.village && styles.pickerError]}
        >
          <Picker selectedValue={village} onValueChange={handleVillageChange}>
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

        {/**powerSupply,
   waterFacility,
   electricityFacility,
   elevator,
   watchman,
   cctv,
   medical: Number(medical),
   educational: Number(educational),
   grocery: Number(grocery),
   gymFacility, */}
        {/* <Text style={styles.label1}>Latitude</Text>
   <TextInput
   placeholder="Latitude"
   value={latitude}
   style={styles.input}
   onChangeText={setLatitude}
   />
   <Text style={styles.label1}>Longitude</Text>
   <TextInput
   placeholder="Longitude"
   value={longitude}
   style={styles.input}
   onChangeText={setLogitude}
   /> */}
        {/* <Text>CHOOSE LOCATION</Text>
  
   {/* Location Button */}
        {/* <Button
   // mode="contained"
   title="choose location"
   onPress={}
   icon={() => <FontAwesomeIcon icon={faLocationArrow} size={20} />}
   style={styles.locationButton}
   ></Button> */}
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
          placeholder="Longitude"
          value={`${longitude}`}
          editable={false}
        />
        {/* <LocationPicker onLocationSelected={handleLocationSelected} /> */}
        {/* 
  {selectedLocation && (
   <View >
   <Text>Selected Location from LocationPicker:</Text>
   <Text>Latitude: {selectedLocation.latitude}</Text>
   <Text>Longitude: {selectedLocation.longitude}</Text>
   </View>
   )} */}
        {/* {selectedLocation && (
            <>
               
            </>
          )} */}
        <Text style={styles.label1}>
          LandMark<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Landmark"
          value={landMark}
          style={styles.input}
          onChangeText={setLandmark}
        />
        {/* <Text style={styles.label1}>Get Current Location</Text>
   <TextInput
   placeholder="Get current Location"
   value={currentLocation}
   style={styles.input}
   onChangeText={setCurrentLocation}
   /> */}

        {/* switch */}
        {/* <TextInput
   placeholder="power supply"
   value={}
   style={styles.input}
   onChangeText={}
   /> */}
        <View style={styles.switchContainer}>
          <Text>Power Supply</Text>
          <Switch value={powerSupply} onValueChange={setPowerSupply} />
        </View>
        {/* switch */}
        {/* 
   <TextInput
   placeholder=""
   value={}
   style={styles.input}
   onChangeText={}
   /> */}
        <View style={styles.switchContainer}>
          <Text>Water Facility</Text>
          <Switch value={waterFacility} onValueChange={setWaterFacility} />
        </View>
        {/* Dropdown */}
        <View style={styles.row}>
          <Text>
            {" "}
            Electricity Facility<Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.electricityFacility && styles.pickerError,
            ]}
          >
            <Picker
              placeholder="Electricity Facility"
              selectedValue={electricityFacility}
              style={styles.picker}
              onValueChange={setElectricityFacility}
            >
              <Picker.Item label="Domestic" value="Domestic" />
              <Picker.Item label="Industrial" value="Industrial" />
              <Picker.Item label="Commercial" value="Commercial" />
              <Picker.Item label="Residential" value="Residential" />
              <Picker.Item label="None" value="None" />
            </Picker>
          </View>
        </View>
        {errors.electricityFacility && (
          <Text style={styles.errorText}>{errors.electricityFacility}</Text>
        )}

        {/* dropdown */}
        <View style={styles.switchContainer}>
          <Text>Gym facility</Text>
          <Switch value={gymFacility} onValueChange={setGymFacility} />
        </View>
        {/* switch */}

        <View style={styles.switchContainer}>
          <Text>Elevator</Text>
          <Switch value={elevator} onValueChange={setElevator} />
        </View>
        {/* switch */}

        <View style={styles.switchContainer}>
          <Text>Watchman</Text>
          <Switch value={watchman} onValueChange={setWatchman} />
        </View>
        {/* switch */}

        <View style={styles.switchContainer}>
          <Text style={styles.label1}>CCTV Facility</Text>

          <Switch value={cctv} onValueChange={setCctv} />
        </View>
        <Text style={styles.label1}>Nearest Medical Facility</Text>
        <TextInput
          placeholder="nearest medical facility"
          value={medical}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setMedical(numericValue);
          }}
        />
        <Text style={styles.label1}>Education Nearest</Text>
        <TextInput
          placeholder="Educational nearest"
          value={educational}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setEducational(numericValue);
          }}
        />
        <Text style={styles.label1}>Distance From Road</Text>
        <TextInput
          placeholder="Distance from Road"
          value={distanceFromRoad}
          style={styles.input}
          onChangeText={setDistancefromroad}
        />
        <Text style={styles.label1}>NearBy Grocery</Text>
        <TextInput
          placeholder=" NearBy Grocery"
          value={grocery}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setGrocery(numericValue);
          }}
        />

        {/** propPhotos: propPhotos.split(','), */}
        {/* <TextInput
   placeholder="Enter photos with comma seperated"
   value={propPhotos}
   onChangeText={setPropPhotos}
   /> */}
        {/* Submit Button */}
        <Text style={styles.label1}>Bathrooms Count</Text>
        <TextInput
          value={bathroomCount}
          placeholder="bathrooms count"
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setBathroomCount(numericValue);
          }}
        />
        <Text style={styles.label1}>Balcony Count</Text>
        <TextInput
          value={balconyCount}
          placeholder="Balcony Count"
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setBalconyCount(numericValue);
          }}
        />
        <Text style={styles.label1}>Floor Number</Text>
        <TextInput
          value={floorNumber}
          placeholder="Floor Number"
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setFloorNumber(numericValue);
          }}
        />
        <Text style={styles.label1}>Property Age in Years</Text>
        <TextInput
          placeholder="Property age in years"
          value={propertyAge}
          style={styles.input}
          onChangeText={setPropertyAge}
        />
        <Text style={styles.label1}>Maintenance Cost</Text>
        <TextInput
          placeholder="maintainence Cost"
          value={maintenanceCost}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setMaintenanceCost(numericValue);
          }}
        />

        {/* visitorParking: {
  type: Boolean,
  required: true,
  },
  waterSource: {
  type: [String],
  required: true,
  },
  playZone: {
  type: Boolean,
  required: true,
  },
  extraAmenities: {
  type: [String],
  }, */}
        <Text style={styles.label1}>Visitors Parking Available</Text>
        <View style={styles.switchContainer}>
          <Text>Visitors parking Available</Text>
          <Switch value={visitorParking} onValueChange={setVisitorParking} />
        </View>
        {/* <TextInput
   placeholder="waterSource"
   value={waterSource}
   onChangeText={setWaterSource}
   /> */}

        <View style={styles.row}>
          {Object.entries(waterSource).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Checkbox
                status={value ? "checked" : "unchecked"}
                onPress={() => toggleCheckbox(key)}
              />
              <Text style={styles.label}>{key}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.label1}>Play Zone Available</Text>
        <View style={styles.switchContainer}>
          <Text>Play Zone Available</Text>
          <Switch value={playZone} onValueChange={setPlayZone} />
        </View>
        {/* <TextInput
   placeholder="extraAmenities"
   value={extraAmenitiesString}
   onChangeText={setextraAmenitiesString}
   /> */}

        <TextInput
          style={styles.input}
          placeholder="extraAmenities"
          value={extraAmenities}
          onChangeText={setExtraAmenities}
        />

        {/* dropdown */}

        {/* <TextInput
   placeholder="Road Type"
   value={roadType}
   style={styles.input}
   onChangeText={setRoadType}
   /> */}
        <View style={styles.row}>
          <Text style={styles.label1}>
            Nearest Road Type<Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.roadType && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={roadType}
              style={styles.picker}
              onValueChange={setRoadType}
            >
              <Picker.Item label="None" value="None" />

              <Picker.Item label="Near R&B" value="Near R&B" />
              <Picker.Item label="Near Highway" value="Near Highway" />
              <Picker.Item label="Near Panchayat" value="Near Panchayat" />
              <Picker.Item label="Near to Village" value="Near to Village" />
            </Picker>
          </View>
        </View>

        {errors.roadType && (
          <Text style={styles.errorText}>{errors.roadType}</Text>
        )}

        {/* propPhotos */}
        {/* <TextInput
 placeholder="Enter pics (comma separated)"
 value={propPhotos}
 onChangeText={setPropPhotos}
 /> */}
        <Text style={styles.label}>Upload Images</Text>

        {/* <View>
 <Button
 title="Select Images"
 style={styles.imagesbtn}
 onPress={pickImages}
 />
 <ScrollView horizontal>
 {uploadedImages.map((url, index) => (
 <Image
 key={index}
 source={{ uri: url }}
 style={{ width: 100, height: 100, margin: 5 }}
 />
 ))}
 </ScrollView>
 </View> */}
        <View style={{ marginTop: "10px" }}>
          <Button
            title="Select Images"
            onPress={pickImages}
            style={styles.button}
          />
          <ScrollView horizontal>
            {uploadedImages.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={{ width: 100, height: 100, margin: 5 }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={{ marginBottom: 10 }}>
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>

        {/* <ScrollView horizontal>
 {images.map((url, index) => (
 <Image
 key={index}
 source={{ uri: url }}
 style={{ width: 100, height: 100, margin: 5 }}
 />
 ))}
</ScrollView> */}

        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <View></View>
    </ScrollView>
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
    padding: 4,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    padding: 4,
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
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  textAreaContainer: {
    marginBottom: 5,
  },
  textArea: {
    height: 100,
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
    borderColor: "#000",
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
});

export default ResidentialAgent;
