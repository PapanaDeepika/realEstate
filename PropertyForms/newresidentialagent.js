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
import CameraOption from "../cameraForms";
import i18n from "../i18n";
import { placeholder } from "i18n-js";
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
  const [images, setImages] = useState([]); // New state for handling image URLs

  const [flatCost, setFlatCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [flatFacing, setFlatFacing] = useState("");
  const [furnitured, setFurnitured] = useState("");
  const [propDesc, setPropDesc] = useState("");
  const [extraAmenitiesString, setextraAmenitiesString] = useState("");
  const [extraAmenities, setExtraAmenities] = useState("");
  const [errors, setErrors] = useState({});

  const [propertyFor, setPropertyFor] = useState("");
  const [flats, setFlats] = useState([]);

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

  const [role, setRole] = useState("");

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
  const [ownerContact, setOwnerContact] = useState("");
  const [bathroomCount, setBathroomCount] = useState(0);
  const [balconyCount, setBalconyCount] = useState(0);
  const [floorNumber, setFloorNumber] = useState(0);
  const [propertyAge, setPropertyAge] = useState(0);
  const [maintenanceCost, setMaintenanceCost] = useState(0);

  const [flatSizeUnit, setFlatSizeUnit] = useState("");

  const [sameFlats, setSameFlats] = useState(false);

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

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const [checkboxes, setCheckboxes] = useState({
  // item1: false,
  // item2: false,
  // item3: false,
  // item4: false,
  // });

  // // Configurations

  const [selectedImages1, setSelectedImages1] = useState([]);

  const [flatCount, setFlatCount] = useState("");

  const [bedroomCount, setBedRooomCount] = useState("");

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

  const apiUrl = "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/residential/add";
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

  // const formatPhoneNumber = (value) => {
  //   // Remove all non-numeric characters
  //   const cleanedValue = value.replace(/\D/g, "");

  //   // Format it into 'xxx xxx xxxx'
  //   let formattedPhoneNumber = "";
  //   if (cleanedValue.length <= 3) {
  //     formattedPhoneNumber = cleanedValue;
  //   } else if (cleanedValue.length <= 6) {
  //     formattedPhoneNumber =
  //       cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
  //   } else {
  //     formattedPhoneNumber =
  //       cleanedValue.substring(0, 3) +
  //       " " +
  //       cleanedValue.substring(3, 6) +
  //       " " +
  //       cleanedValue.substring(6, 10);
  //   }

  //   return formattedPhoneNumber;
  // };
  // const handleContactNumberChange = (value) => {
  //   // Format the phone number
  //   const formattedNumber = formatPhoneNumber(value);
  //   setContact(formattedNumber);

  //   // Remove all spaces to check length and pattern
  //   const cleanedValue = value.replace(/\D/g, "");

  //   // Regex to ensure the number starts with 6-9 and is 10 digits
  //   const regex = /^[6-9]\d{9}$/; // Starts with 6-9 and has exactly 10 digits

  //   // Validate the phone number
  //   // if (cleanedValue.length > 10) {
  //   //   setPhoneNumberError("Contact number cannot exceed 10 digits");
  //   // } else if (!regex.test(cleanedValue)) {
  //   //   setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
  //   // } else {
  //   //   setPhoneNumberError('');
  //   // }
  // };

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
    // Remove all non-numeric characters for unformatted value
    const cleanedValue = value.replace(/\D/g, "");

    // Format the phone number
    const formattedNumber = formatPhoneNumber(value);

    // Update formatted phone number for display
    setContact(formattedNumber);

    // Store unformatted number for backend submission
    setOwnerContact(cleanedValue);

    // Phone number validation
    const regex = /^[6-9]\d{9}$/;
    // if (cleanedValue.length > 10) {
    //   // setPhoneNumberError("Contact number cannot exceed 10 digits");
    // } else if (!regex.test(cleanedValue)) {
    //   setPhoneNumberError(
    //     "Contact number must start with 6, 7, 8, or 9 and be 10 digits long"
    //   );
    // } else {
    //   setPhoneNumberError(""); // No error
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

    if (!flatSize && flats.length == 0) {
      newErrors.flatSize = " Flat size is required";
    }
    if (!sizeUnit.trim()) {
      newErrors.sizeUnit = "Size unit is required";
    }
    if (!flatCost && flats.length == 0) {
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
    if (!flatFacing.trim() && flats.length == 0) {
      newErrors.flatFacing = "Flat Facing is required";
    }
    if (!furnitured.trim() && flats.length == 0) {
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
    setImages([]);
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
    console.log("flats ", flats);

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
          contact: String(ownerContact),
        },
        propertyDetails: {
          type: type,
          apartmentName,
          flatNumber,
          apartmentLayout,
          flatSize: Number(flatSize),
          sizeUnit,
          flatCost: Number(flatCost),
          priceUnit,
          totalCost: Number(totalCost),

          propertyPurpose: propertyFor,
          propDesc,
          flat: flats,
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
        propPhotos: images,
      };
      if (role === 5) {
        data.agentDetails = {
          userId: selectedAgent,
        };
      }
      if (flats.length === 0) {
        data.propertyDetails.flatFacing = flatFacing;
        data.propertyDetails.furnitured = furnitured;
      }
      console.log("Form Data:", data);

      console.log(
        "Data being submitted to the API:",
        JSON.stringify(data, null, 2)
      ); // Debug data
      setIsSubmitted(true);
      console.log("Form Data:", data);

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
        const response = await axios.post(
          `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/residential/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Alert.alert("data submitted succesfully");
        resetForm();
        navigation.navigate("asd");

        console.log("Response from api : ", response.data);
      } catch (error) {
        Alert.alert("error submitting data please try again");
        console.log(error);
        console.error(error.response?.data || error.message);
        setIsSubmitted(false);
      }
    } else {
      Alert.alert("Required fields needs to filled");
    }
  };

  const sentImage = (locImage) => {
    console.log("sdasadas", locImage, locImage.imageUrl);

    setImages(locImage.imageUrl);
    setSelectedImages(locImage);
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
    const loadData = async () => {
      const decoded = jwtDecode(await AsyncStorage.getItem("userToken"));
      const role = decoded.user.role;
      setRole(role);
      console.log("role", role);
    };

    loadData();
    loadLanguage();
    fetchAssignedAgents();
  }, []);

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
      console.log("omg", data);

      setAgents(data); // Assuming data is an array of agents
    } catch (error) {
      console.error("Failed to fetch assigned agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  const handleFlatsChange = (value) => {
    // setAvailablePlots(value);
    setFlatCount(value);
    const numberOfFlats = parseInt(value);

    if (numberOfFlats) {
      const newFlats = Array(numberOfFlats)
        .fill()
        .map((_, index) => ({
          flatNumber: index + 1,
          flatFacing,
          bedroomCount,
          floorNumber,
          furnitured,
          flatSize,
          flatSizeUnit,
          balconyCount,
          flatCost,
        }));

      setFlats(newFlats);
      // console.log("flats", newFlats);
    }
  };

  const handleDiffFlatChange = (index, field, value) => {
    const updatedFlats = [...flats];
    updatedFlats[index][field] = value;

    if (field === "flatSize" || field === "flatSizeUnit") {
      const plot = updatedFlats[index];
      const plotTotal = calculateFlatTotal(
        plot.plotSize,
        plot.sizeUnit,
        plot.plotAmount,
        priceUnit
      );
      updatedFlats[index].flatCost = plotTotal;
    }

    // Recalculate total amount when plotAmount is updated
    if (field === "flatCost") {
      const newTotal = updatedFlats.reduce(
        (acc, plot) => acc + parseFloat(plot.flatCost || 0),
        0
      );
      setTotalCost(newTotal.toFixed(2)); // Round off to 2 decimal places
      console.log(totalCost);
    }
    setFlats(updatedFlats);
    console.log("updated");
  };

  const handleFlats = (field, value) => {
    flats.map((item) => {
      item[field] = value;
    });
    if (field === "flatCost") {
      calculateFlatTotal(
        flats[0].flatSize,
        flats[0].flatSizeUnit,
        flats[0].flatCost,
        priceUnit
      );
    }

    console.log("flats", flats[0]);
  };

  const calculateFlatTotal = (plotSize, sizeUnit, price, priceUnit) => {
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
  //   ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/getAssignedAgents/${userId}`,
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>
          {i18n.t("Residential Property Details")}
        </Text>
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

        {role === 5 && (
          <View>
            <Text style={styles.label1}>Select Agent:</Text>
            <View style={[styles.pickerWrapper1]}>
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
                  <Picker.Item label="No agents available" value="" />
                )}
              </Picker>
            </View>
          </View>
        )}
        <Text style={styles.label1}>
          {i18n.t("Owner Name")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.ownerName && styles.inputError]}
          placeholder={i18n.t("Enter owner name")}
          value={ownerName}
          onChangeText={setOwnerName}
        />
        {errors.ownerName && (
          <Text style={styles.errorText}>{errors.ownerName}</Text>
        )}

        <Text style={styles.label1}>
          {i18n.t("Owner Email")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder={i18n.t("Enter Owner Email")}
          value={ownerEmail}
          onChangeText={setOwnerEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label1}>
          {i18n.t("Contact Number")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Contact Number")}
          value={contact}
          keyboardType="numeric"
          style={[styles.input, errors.contact && styles.inputError]}
          onChangeText={handleContactNumberChange}
          // onChangeText={(value)=>setContact(value)}
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
        {/* <Text style={styles.label1}>
          {i18n.t("Property Type")}<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Property Type")}
          value={propertyType}
          style={[styles.input, errors.propertyType && styles.inputError]}
          onChangeText={setPropertyType}
        />
        {errors.propertyType && (
          <Text style={styles.errorText}>{errors.propertyType}</Text>
        )} */}

        <Text style={styles.label1}>
          {i18n.t("Property Name")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Property Name")}
          value={apartmentName}
          style={[styles.input, errors.apartmentName && styles.inputError]}
          onChangeText={setApartmentName}
        />
        {errors.apartmentName && (
          <Text style={styles.errorText}>{errors.apartmentName}</Text>
        )}

        <Text style={styles.label1}>
          {i18n.t("Property Number")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Property Number")}
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

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text style={styles.label1}>
            {i18n.t("Property For")}
            <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.sizeUnit && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={propertyFor}
              style={[styles.picker, { flex: 1 }]} // Use flex to make the picker take available space
              onValueChange={(itemValue) => setPropertyFor(itemValue)}

              itemStyle={{    fontFamily: "Montserrat_500Medium",
              }}
            >
              <Picker.Item label={i18n.t("None")} value="None" />

              <Picker.Item label={i18n.t("Sell")} value="sell" />
              <Picker.Item label={i18n.t("Rent")} value="rent" />
              <Picker.Item label={i18n.t("Lease")} value="lease" />
            </Picker>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label1}>
            {i18n.t("Select property Type")}{" "}
            <Text style={{ color: "red" }}> *</Text>{" "}
          </Text>

          <View
            style={[
              styles.pickerWrapper1,
              { marginLeft: 65 },

              errors.priceUnit && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={type}
              style={styles.picker}
              onValueChange={setType}

              itemStyle={{    fontFamily: "Montserrat_500Medium",
              }}
            >
              <Picker.Item label={i18n.t("None")} />

              <Picker.Item label={i18n.t("House")} value="House" />
              <Picker.Item label={i18n.t("Apartment")} value="Apartment" />
            </Picker>
          </View>
        </View>

        <View>
          {type === "Apartment" && (
            <View>
              <Text style={styles.label1}>
                Number of Flats<Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={flatCount}
                onChangeText={(value) => handleFlatsChange(value)}
                placeholder="Number of Flats"
              />

              <View style={styles.row}>
                <Text style={styles.label1}>
                  {" "}
                  Are all the Flats of the same size?{" "}
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Switch
                  value={sameFlats}
                  onValueChange={setSameFlats}
                  thumbColor={sameFlats ? "#0791fa" : "#f4f3f4"}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
              </View>

              <View style={styles.row}>
                <View>
                  <Text style={styles.label1}>
                    Price Unit <Text style={{ color: "red" }}>*</Text>
                  </Text>
                </View>
                <View
                  style={[
                    styles.pickerWrapper1,
                    errors.sizeUnit && styles.pickerError,
                  ]}
                >
                  <Picker
                    selectedValue={priceUnit}
                    style={[styles.picker, { width: 150 }]}
                    onValueChange={(itemValue) => setPriceUnit(itemValue)}

                    itemStyle={{    fontFamily: "Montserrat_500Medium",
                    }}
                  >
                    <Picker.Item label={"None"} />
                    <Picker.Item label={"Cents"} value="cents" />
                    <Picker.Item label={"Acres"} value="acres" />
                    <Picker.Item label={"Sq. Ft"} value="sq.ft" />
                    <Picker.Item label={"Sq. Yards"} value="sq.yards" />
                    <Picker.Item label={"Sq. M"} value="sq.m" />
                  </Picker>
                </View>
              </View>
              <View>
                {sameFlats === true ? (
                  <View>
                    {
                      <View>
                        <View style={styles.row}>
                          <TextInput
                            placeholder={i18n.t("Flat Size")}
                            value={flats[0].flatSize}
                            style={[
                              styles.input,
                              errors.flatSize && styles.inputError,
                            ]}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                              const numericValue = text.replace(/[^0-9]/g, ""); // Allow only numbers
                              // setFlatSize(numericValue);
                              handleFlats("flatSize", numericValue);
                            }}
                          />

                          <View
                            style={[
                              styles.pickerWrapper1,
                              errors.sizeUnit && styles.pickerError,
                            ]}
                          >
                            <Picker
                              selectedValue={flats[0].flatSizeUnit}
                              style={styles.picker}
                              onValueChange={(itemValue) => {
                                setFlatSizeUnit(itemValue);
                                handleFlats("flatSizeUnit", itemValue);
                              }}

                              itemStyle={{    fontFamily: "Montserrat_500Medium",
                              }}
                            >
                              <Picker.Item label={"None"} />

                              <Picker.Item label={"Cents"} value="cents" />
                              <Picker.Item label={"Acres"} value="acres" />
                              <Picker.Item label={"Sq. Ft"} value="sq.ft" />
                              <Picker.Item
                                label={"Sq. Yards"}
                                value="sq.yards"
                              />
                              <Picker.Item label={"Sq. M"} value="sq.m" />
                            </Picker>
                          </View>
                        </View>
                        <TextInput
                          placeholder={i18n.t("Flat Cost")}
                          value={flatCost}
                          style={[styles.input]}
                          keyboardType="numeric"
                          onChangeText={(text) => {
                            const numericValue = text.replace(/[^0-9]/g, "");
                            setFlatCost(numericValue);
                            handleFlats("flatCost", numericValue);
                          }}
                        />
                        <TextInput
                          style={styles.input}
                          value={floorNumber}
                          onChangeText={(value) => {
                            handleFlats("floorNumber", value);
                            setFloorNumber(value);
                          }}
                          placeholder="Floor Number"
                        />

                        <Text style={styles.label1}>
                          {" "}
                          Balcony Count <Text style={{ color: "red" }}>*</Text>
                        </Text>

                        <TextInput
                          style={styles.input}
                          value={balconyCount}
                          onChangeText={(value) => {
                            handleFlats("balconyCount", value);

                            setBalconyCount(value);
                          }}
                          placeholder="Balcony Count"
                        />

                        <Text style={styles.label1}>
                          BedRoom Count <Text style={{ color: "red" }}>*</Text>
                        </Text>

                        <TextInput
                          style={styles.input}
                          value={bedroomCount}
                          onChangeText={(value) => {
                            handleFlats("bedroomCount", value);
                            setBedRooomCount(value);
                          }}
                          placeholder="Bedroom count"
                        />

                        <View style={styles.row}>
                          <View
                            style={[
                              styles.pickerWrapper1,
                              errors.flatFacing && styles.pickerError,
                            ]}
                          >
                            <Picker
                              placeholder={i18n.t("Property Facing")}
                              selectedValue={flatFacing}
                              style={styles.picker}
                              onValueChange={(value) => {
                                handleFlats("flatFacing", value);
                                setFlatFacing(value);
                              }}

                              itemStyle={{    fontFamily: "Montserrat_500Medium",
                              }}
                            >
                              <Picker.Item label={"Facing"} />

                              <Picker.Item
                                label={i18n.t("East")}
                                value="East"
                              />
                              <Picker.Item
                                label={i18n.t("West")}
                                value="West"
                              />
                              <Picker.Item
                                label={i18n.t("North")}
                                value="North"
                              />

                              <Picker.Item
                                label={i18n.t("South")}
                                value="South"
                              />
                            </Picker>
                          </View>

                          <View
                            style={[
                              styles.pickerWrapper1,
                              { marginLeft: 10 },
                              errors.furnitured && styles.pickerError,
                            ]}
                          >
                            <Picker
                              placeholder={i18n.t("Property Facing")}
                              selectedValue={flats[0].furnitured}
                              style={styles.picker}
                              onValueChange={(value) => {
                                handleFlats("furnitured", value);
                                setFurnitured(value);
                              }}
                              itemStyle={{    fontFamily: "Montserrat_500Medium",
                              }}
                            >
                              <Picker.Item label={"Furniture"} />
                              <Picker.Item
                                label={i18n.t("Semi Furnished")}
                                value="Semi Furnished"
                              />
                              <Picker.Item
                                label={i18n.t("Fully Furnished")}
                                value="Fully Furnished"
                              />
                              <Picker.Item
                                label={i18n.t("UnFurnished")}
                                value="UnFurnished"
                              />
                            </Picker>
                          </View>
                        </View>
                      </View>
                    }
                  </View>
                ) : (
                  <View>
                    {/* {
                      flats.map(item =>{
                        console.log("items",item)
                      })
                    } */}
                    {flats.map((item, index) => {
                      return (
                        <View key={item.flatNumber}>
                          <Text style={styles.label1}>
                            {" "}
                            Flat : {item.flatNumber}
                          </Text>
                          <View style={styles.row}>
                            <TextInput
                              placeholder={i18n.t("Flat Size")}
                              value={item.flatSize}
                              style={[
                                styles.input,
                                errors.flatSize && styles.inputError,
                              ]}
                              keyboardType="numeric"
                              onChangeText={(text) => {
                                const numericValue = text.replace(
                                  /[^0-9]/g,
                                  ""
                                ); // Allow only numbers
                                // setFlatSize(numericValue);
                                handleDiffFlatChange(
                                  index,
                                  "flatSize",
                                  numericValue
                                );
                              }}
                            />

                            <View
                              style={[
                                styles.pickerWrapper1,
                                errors.sizeUnit && styles.pickerError,
                              ]}
                            >
                              <Picker
                                selectedValue={item.flatSizeUnit}
                                style={styles.picker}

                                itemStyle={{    fontFamily: "Montserrat_500Medium",
                                }}
                                onValueChange={(itemValue) =>
                                  // setFlatSizeUnit(itemValue)
                                  handleDiffFlatChange(
                                    index,
                                    "flatSizeUnit",
                                    itemValue
                                  )
                                }
                              >
                                <Picker.Item label={"None"} />

                                <Picker.Item label={"Cents"} value="cents" />
                                <Picker.Item label={"Acres"} value="acres" />
                                <Picker.Item label={"Sq. Ft"} value="sq.ft" />
                                <Picker.Item
                                  label={"Sq. Yards"}
                                  value="sq.yards"
                                />
                                <Picker.Item label={"Sq. M"} value="sq.m" />
                              </Picker>
                            </View>
                          </View>

                          <View style={styles.row}>
                            <TextInput
                              placeholder={i18n.t("Flat Cost")}
                              value={item.flatCost}
                              style={[styles.input]}
                              keyboardType="numeric"
                              onChangeText={(text) => {
                                const numericValue = text.replace(
                                  /[^0-9]/g,
                                  ""
                                ); // Allow only numbers
                                // setFlatSize(numericValue);
                                handleDiffFlatChange(
                                  index,
                                  "flatCost",
                                  numericValue
                                );
                              }}
                            />

                            {/* <View
                            style={[
                              styles.pickerWrapper1,
                              errors.sizeUnit && styles.pickerError,
                            ]}
                          >
                            <Picker
                              selectedValue={priceUnit}
                              style={styles.picker}
                              onValueChange={(itemValue) =>
                                // setFlatSizeUnit(itemValue)
                                setPriceUnit(itemValue)
                                // handleDiffFlatChange(index,"PriceUnit",itemValue)
                              }
                            >
                              <Picker.Item label={"None"} />

                              <Picker.Item label={"Cents"} value="cents" />
                              <Picker.Item label={"Acres"} value="acres" />
                              <Picker.Item label={"Sq. Ft"} value="sq.ft" />
                              <Picker.Item
                                label={"Sq. Yards"}
                                value="sq.yards"
                              />
                              <Picker.Item label={"Sq. M"} value="sq.m" />
                            </Picker> 
                          </View>*/}
                          </View>

                          <TextInput
                            style={styles.input}
                            value={item.floorNumber}
                            onChangeText={(value) =>
                              // setFloorNumber(value)
                              handleDiffFlatChange(index, "floorNumber", value)
                            }
                            placeholder="Floor Number"
                          />

                          <Text style={styles.label1}>
                            {" "}
                            Balcony Count{" "}
                            <Text style={{ color: "red" }}>*</Text>
                          </Text>

                          <TextInput
                            style={styles.input}
                            value={item.balconyCount}
                            onChangeText={(value) => {
                              // setBalconyCount(value)

                              handleDiffFlatChange(
                                index,
                                "balconyCount",
                                value
                              );
                            }}
                            placeholder="Balcony Count"
                          />

                          <Text style={styles.label1}>
                            BedRoom Count{" "}
                            <Text style={{ color: "red" }}>*</Text>
                          </Text>

                          <TextInput
                            style={styles.input}
                            value={item.bedroomCount}
                            onChangeText={(value) =>
                              // setBedRooomCount(value)
                              handleDiffFlatChange(index, "bedroomCount", value)
                            }
                            placeholder="Bedroom count"
                          />

                          <View style={[styles.row, { marginTop: 10 }]}>
                            <View
                              style={[
                                styles.pickerWrapper1,
                                errors.flatFacing && styles.pickerError,
                              ]}
                            >
                              <Picker
                                placeholder={i18n.t("Property Facing")}
                                selectedValue={item.flatFacing}
                                style={styles.picker}
                                  itemStyle={{    fontFamily: "Montserrat_500Medium",
                                  }}

                                onValueChange={(value) =>
                                  // setFlatFacing(value)
                                  handleDiffFlatChange(
                                    index,
                                    "flatFacing",
                                    value
                                  )
                                }
                              >
                                <Picker.Item label={"Facing"} />

                                <Picker.Item
                                  label={i18n.t("East")}
                                  value="East"
                                />
                                <Picker.Item
                                  label={i18n.t("West")}
                                  value="West"
                                />
                                <Picker.Item
                                  label={i18n.t("North")}
                                  value="North"
                                />

                                <Picker.Item
                                  label={i18n.t("South")}
                                  value="South"
                                />
                              </Picker>
                            </View>

                            <View
                              style={[
                                styles.pickerWrapper1,
                                { marginLeft: 10 },
                              ]}
                            >
                              <Picker
                                placeholder={i18n.t("Property Facing")}
                                selectedValue={item.furnitured}
                                style={[styles.picker, { width: 150 }]}

                                   itemStyle={{    fontFamily: "Montserrat_500Medium",
                                   }}

                                onValueChange={(value) =>
                                  // setFurnitured(value)
                                  handleDiffFlatChange(
                                    index,
                                    "furnitured",
                                    value
                                  )
                                }
                              >
                                <Picker.Item label={"Furniture"} />
                                <Picker.Item
                                  label={i18n.t("Semi Furnished")}
                                  value="Semi Furnished"
                                />
                                <Picker.Item
                                  label={i18n.t("Fully Furnished")}
                                  value="Fully Furnished"
                                />
                                <Picker.Item
                                  label={i18n.t("UnFurnished")}
                                  value="UnFurnished"
                                />
                              </Picker>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        <View>
          {type === "House" && (
            <View>
              <View>
                <View style={styles.row}>
                  <TextInput
                    placeholder={i18n.t("Flat Size")}
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
                      selectedValue={flatSizeUnit}
                      style={styles.picker}
                      onValueChange={(itemValue) => setFlatSizeUnit(itemValue)}

                      itemStyle={{    fontFamily: "Montserrat_500Medium",
                      }}
                    >
                      <Picker.Item label={"None"} />
                      <Picker.Item label={"Cents"} value="cents" />
                      <Picker.Item label={"Acres"} value="acres" />
                      <Picker.Item label={"Sq. Ft"} value="sq.ft" />
                      <Picker.Item label={"Sq. Yards"} value="sq.yards" />
                      <Picker.Item label={"Sq. M"} value="sq.m" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.row}>
                  <TextInput
                    placeholder={i18n.t("Flat Cost")}
                    value={flatCost}
                    style={[styles.input, errors.flatSize && styles.inputError]}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, ""); // Allow only numbers
                      setFlatCost(numericValue);
                    }}
                  />

                  <View
                    style={[
                      styles.pickerWrapper1,
                      errors.sizeUnit && styles.pickerError,
                    ]}
                  >
                    <Picker
                      selectedValue={priceUnit}
                      style={styles.picker}
                      onValueChange={(itemValue) => setPriceUnit(itemValue)}

                      itemStyle={{    fontFamily: "Montserrat_500Medium",
                      }}
                    >
                      <Picker.Item label={"None"} />
                      <Picker.Item label={"Cents"} value="cents" />
                      <Picker.Item label={"Acres"} value="acres" />
                      <Picker.Item label={"Sq. Ft"} value="sq.ft" />
                      <Picker.Item label={"Sq. Yards"} value="sq.yards" />
                      <Picker.Item label={"Sq. M"} value="sq.m" />
                    </Picker>
                  </View>
                </View>

                <TextInput
                  style={styles.input}
                  value={floorNumber}
                  onChangeText={(value) => setFloorNumber(value)}
                  placeholder="Floor Number"
                />

                <Text style={styles.label1}>
                  {" "}
                  Balcony Count <Text style={{ color: "red" }}>*</Text>
                </Text>

                <TextInput
                  style={styles.input}
                  value={balconyCount}
                  onChangeText={setBalconyCount}
                  placeholder="Balcony Count"
                />

                <Text style={styles.label1}>
                  BedRoom Count <Text style={{ color: "red" }}>*</Text>
                </Text>

                <TextInput
                  style={styles.input}
                  value={bedroomCount}
                  onChangeText={(value) => setBedRooomCount(value)}
                />

                <View style={[styles.row, { marginTop: 10 }]}>
                  <View
                    style={[
                      styles.pickerWrapper1,
                      errors.flatFacing && styles.pickerError,
                    ]}
                  >
                    <Picker
                      placeholder={i18n.t("Property Facing")}
                      selectedValue={flatFacing}
                      style={styles.picker}
                      onValueChange={setFlatFacing}

                      itemStyle={{    fontFamily: "Montserrat_500Medium",
                      }}
                    >
                      <Picker.Item label={"Facing"} />

                      <Picker.Item label={i18n.t("East")} value="East" />
                      <Picker.Item label={i18n.t("West")} value="West" />
                      <Picker.Item label={i18n.t("North")} value="North" />

                      <Picker.Item label={i18n.t("South")} value="South" />
                    </Picker>
                  </View>

                  <View
                    style={[
                      styles.pickerWrapper1,
                      { marginLeft: 10 },
                      errors.furnitured && styles.pickerError,
                    ]}
                  >
                    <Picker
                      placeholder={i18n.t("Property Facing")}
                      selectedValue={furnitured}
                      style={styles.picker}

                      itemStyle={{    fontFamily: "Montserrat_500Medium",
                      }}
                      onValueChange={setFurnitured}
                    >
                      <Picker.Item label={"Furniture"} />
                      <Picker.Item
                        label={i18n.t("Semi Furnished")}
                        value="Semi Furnished"
                      />
                      <Picker.Item
                        label={i18n.t("Fully Furnished")}
                        value="Fully Furnished"
                      />
                      <Picker.Item
                        label={i18n.t("UnFurnished")}
                        value="UnFurnished"
                      />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* <Text style={styles.label1}>
          {i18n.t("Flat Size")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.row}>
          <TextInput
            placeholder={i18n.t("Flat Size")}
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
              <Picker.Item label={i18n.t("None")} />

              <Picker.Item label={i18n.t("Cents")} value="cents" />
              <Picker.Item label={i18n.t("Acres")} value="acres" />
              <Picker.Item label={i18n.t("Sq. Ft")} value="sq.ft" />
              <Picker.Item label={i18n.t("Sq. Yards")} value="sq.yards" />
              <Picker.Item label={i18n.t("Sq. M")} value="sq.m" />
            </Picker>
          </View>
        </View> */}
        {/* {errors.flatSize && (
          <Text style={styles.errorText}>{errors.flatSize}</Text>
        )}
        {errors.sizeUnit && (
          <Text style={styles.errorText}>{errors.sizeUnit}</Text>
        )} */}

        {/* <Text style={styles.label1}>
          {i18n.t("Flat Cost")} <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.row}>
          <TextInput
            placeholder={i18n.t("flatCost")}
            value={flatCost}
            style={[styles.input, errors.flatCost && styles.inputError]}
            onChangeText={setFlatCost}
          />
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
              <Picker.Item label={i18n.t("None")} />

              <Picker.Item label={i18n.t("/cent")} value="/cent" />
              <Picker.Item label={i18n.t("/acre")} value="/acre" />
              <Picker.Item label={i18n.t("/sq.ft")} value="/sq.ft" />
              <Picker.Item label={i18n.t("/sq.yard")} value="/sq.yard" />
              <Picker.Item label={i18n.t("/sq.m")} value="/sq.m" />
            </Picker>
          </View>
        </View> */}

        {/* {errors.flatCost && (
          <Text style={styles.errorText}>{errors.flatCost}</Text>
        )}
        {errors.priceUnit && (
          <Text style={styles.errorText}>{errors.priceUnit}</Text>
        )} */}

        <Text style={styles.label1}>
          {i18n.t("Total Cost")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Total Cost")}
          value={`${totalCost}`}
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
            {i18n.t("Property Layout")}
            <Text style={{ color: "red" }}>*</Text>
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
              itemStyle={{    fontFamily: "Montserrat_500Medium",
              }}
            >
              <Picker.Item label={"1BHK"} value="1BHK" />
              <Picker.Item label={"2BHK"} value="2BHK" />
              <Picker.Item label={"3BHK"} value="3BHK" />
              <Picker.Item label={"4BHK"} value="4BHK" />
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

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label1}>
            {i18n.t("Property Facing")} <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.flatFacing && styles.pickerError,
            ]}
          >
            <Picker
              placeholder={i18n.t("Property Facing")}
              selectedValue={flatFacing}
              style={styles.picker}
              onValueChange={setFlatFacing}
            >
              <Picker.Item label={i18n.t("East")} value="East" />
              <Picker.Item label={i18n.t("West")} value="West" />
              <Picker.Item label={i18n.t("North")} value="North" />

              <Picker.Item label={i18n.t("South")} value="South" />
            </Picker>
          </View>
        </View> */}

        {/* {errors.flatFacing && (
          <Text style={styles.errorText}>{errors.flatFacing}</Text>
        )} */}

        {/* drop down */}
        {/* <TextInput
   placeholder="Furniture"
   value={}
   style={styles.input}
   onChangeText={}
   /> */}
        {/* 
        <View style={styles.inputContainer}>
          <Text style={styles.label1}>
            {i18n.t("Furniture")} <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              errors.furnitured && styles.pickerError,
            ]}
          >
            <Picker
              placeholder={i18n.t("Property Facing")}
              selectedValue={furnitured}
              style={styles.picker}
              onValueChange={setFurnitured}
            >
              <Picker.Item
                label={i18n.t("Semi Furnished")}
                value="Semi Furnished"
              />
              <Picker.Item
                label={i18n.t("Fully Furnished")}
                value="Fully Furnished"
              />
              <Picker.Item label={i18n.t("UnFurnished")} value="UnFurnished" />
            </Picker>
          </View>
        </View>

        {errors.furnitured && (
          <Text style={styles.errorText}>{errors.furnitured}</Text>
        )} */}

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
        <Text style={styles.label1}>{i18n.t("Property Description")}</Text>
        {/* <TextInput
          placeholder={i18n.t("Property Description")}
          value={propDesc}
          multiline={true}
          numberOfLines={4}
          // style={styles.input}
          onChangeText={setPropDesc}
        /> */}

        <TextInput
          style={[styles.textInput, { textAlignVertical: "top" }]}
          placeholder={i18n.t("Property Description")}
          value={propDesc}
          onChangeText={setPropDesc}
          multiline={true}
          numberOfLines={4}
        />

        <Text style={styles.label1}>
          {i18n.t("Pincode")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Pincode")}
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
          {i18n.t("Country")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("country")}
          value={country}
          style={[styles.input, errors.country && styles.inputError]}
          onChangeText={setCountry}
        />
        {errors.country && (
          <Text style={styles.errorText}>{errors.country}</Text>
        )}

        <Text style={styles.label1}>
          {i18n.t("State")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("state")}
          value={state}
          style={[styles.input, errors.state && styles.inputError]}
          onChangeText={setState}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

        <Text style={styles.label1}>
          {i18n.t("District")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("District")}
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
          {i18n.t("Mandal")}
          <Text style={{ color: "red" }}>*</Text>
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
          {i18n.t("Village")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>

        {/* <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}> */}
        <View
          style={[styles.pickerWrapper1, errors.village && styles.pickerError]}
        >
          <Picker selectedValue={village} onValueChange={handleVillageChange} itemStyle={{    fontFamily: "Montserrat_500Medium",
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
          {i18n.t("LandMark")}
          <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder={i18n.t("Landmark")}
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
          <Text style={styles.label1}>{i18n.t("Power Supply")}</Text>
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
          <Text style={styles.label1}>{i18n.t("Water Facility")}</Text>
          <Switch value={waterFacility} onValueChange={setWaterFacility} />
        </View>
        {/* Dropdown */}
        <View style={styles.row}>
          <Text style={styles.label1}>
            {i18n.t("Electricity Facility")}
            <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              { marginLeft: 95 },

              errors.electricityFacility && styles.pickerError,
            ]}
          >
            <Picker
              placeholder={i18n.t("Electricity Facility")}
              selectedValue={electricityFacility}
              style={styles.picker}
              onValueChange={setElectricityFacility}

              itemStyle={{    fontFamily: "Montserrat_500Medium",
              }}
            >
              <Picker.Item label={i18n.t("Domestic")} value="Domestic" />
              <Picker.Item label={i18n.t("Industrial")} value="Industrial" />
              <Picker.Item label={i18n.t("Commercial")} value="Commercial" />
              <Picker.Item label={i18n.t("Residential")} value="Residential" />
              <Picker.Item label={i18n.t("None")} value="None" />
            </Picker>
          </View>
        </View>
        {errors.electricityFacility && (
          <Text style={styles.errorText}>{errors.electricityFacility}</Text>
        )}

        {/* dropdown */}
        <View style={styles.switchContainer}>
          <Text style={styles.label1}>{i18n.t("Gym facility")}</Text>
          <Switch value={gymFacility} onValueChange={setGymFacility} />
        </View>
        {/* switch */}

        <View style={styles.switchContainer}>
          <Text style={styles.label1}>{i18n.t("Elevator")}</Text>
          <Switch value={elevator} onValueChange={setElevator} />
        </View>
        {/* switch */}

        <View style={styles.switchContainer}>
          <Text style={styles.label1}>{i18n.t("Watchman")}</Text>
          <Switch value={watchman} onValueChange={setWatchman} />
        </View>
        {/* switch */}

        <View style={styles.switchContainer}>
          <Text style={styles.label1}>{i18n.t("CCTV Facility")}</Text>

          <Switch value={cctv} onValueChange={setCctv} />
        </View>
        <Text style={styles.label1}>{i18n.t("Nearest Medical Facility")}</Text>
        <TextInput
          placeholder={i18n.t("nearest medical facility")}
          value={medical}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setMedical(numericValue);
          }}
        />
        <Text style={styles.label1}>{i18n.t("Education Nearest")}</Text>
        <TextInput
          placeholder={i18n.t("Educational nearest")}
          value={educational}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setEducational(numericValue);
          }}
        />
        <Text style={styles.label1}>{i18n.t("Distance From Road")}</Text>
        <TextInput
          placeholder={i18n.t("Distance from Road")}
          value={distanceFromRoad}
          style={styles.input}
          onChangeText={setDistancefromroad}
        />
        <Text style={styles.label1}>{i18n.t("NearBy Grocery")}</Text>
        <TextInput
          placeholder={i18n.t("NearBy Grocery")}
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
        <Text style={styles.label1}>{i18n.t("Bathrooms Count")}</Text>
        <TextInput
          value={bathroomCount}
          placeholder={i18n.t("Bathrooms Count")}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setBathroomCount(numericValue);
          }}
        />
        <Text style={styles.label1}>{i18n.t("Balcony Count")}</Text>
        <TextInput
          value={balconyCount}
          placeholder={i18n.t("Balcony Count")}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setBalconyCount(numericValue);
          }}
        />
        <Text style={styles.label1}>{i18n.t("Floor Number")}</Text>
        <TextInput
          value={floorNumber}
          placeholder={i18n.t("Floor Number")}
          style={styles.input}
          onChangeText={(text) => {
            // Allow only numeric characters
            const numericValue = text.replace(/[^0-9]/g, "");
            setFloorNumber(numericValue);
          }}
        />
        <Text style={styles.label1}>{i18n.t("Property Age in Years")}</Text>
        <TextInput
          placeholder={i18n.t("Property age in years")}
          value={propertyAge}
          style={styles.input}
          onChangeText={setPropertyAge}
        />
        <Text style={styles.label1}>{i18n.t("Maintenance Cost")}</Text>
        <TextInput
          placeholder={i18n.t("Maintainence Cost")}
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
        {/* <Text style={styles.label1}>
          {i18n.t("Visitors Parking Available")}
        </Text> */}
        <View style={styles.switchContainer}>
          <Text style={styles.label1}>
            {i18n.t("Visitors parking Available")}
          </Text>
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
              <Text style={styles.label}>{i18n.t(key)}</Text>
            </View>
          ))}
        </View>
        {/* <Text style={styles.label1}>{i18n.t("Play Zone Available")}</Text> */}
        <View style={styles.switchContainer}>
          <Text style={styles.label1}>{i18n.t("Play Zone Available")}</Text>
          <Switch value={playZone} onValueChange={setPlayZone} />
        </View>
        {/* <TextInput
   placeholder="extraAmenities"
   value={extraAmenitiesString}
   onChangeText={setextraAmenitiesString}
   /> */}

        <TextInput
          style={styles.input}
          placeholder={i18n.t("extraAmenities")}
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
            {i18n.t("Nearest Road Type")}
            <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper1,
              { marginLeft: 80 },
              errors.roadType && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={roadType}
              style={styles.picker}
              

              onValueChange={setRoadType}
              itemStyle={{    fontFamily: "Montserrat_500Medium",
              }}
            >
              <Picker.Item label={i18n.t("None")} value="None" />

              <Picker.Item label={i18n.t("Near R&B")} value="Near R&B" />
              <Picker.Item
                label={i18n.t("Near Highway")}
                value="Near Highway"
              />
              <Picker.Item
                label={i18n.t("Near Panchayat")}
                value="Near Panchayat"
              />
              <Picker.Item
                label={i18n.t("Near to Village")}
                value="Near to Village"
              />
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
        {/* <Text style={styles.label}>{i18n.t("Upload Images")}</Text> */}

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
        {/* <View style={{ marginTop: "10px" }}>
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
        </View> */}
        <CameraOption onSelectImage={sentImage} />

        {/* <ScrollView horizontal>
 {images.map((url, index) => (
 <Image
 key={index}
 source={{ uri: url }}
 style={{ width: 100, height: 100, margin: 5 }}
 />
 ))}
</ScrollView> */}

        <Button title={i18n.t("Submit")} onPress={handleSubmit} />
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
    fontFamily: "Montserrat_500Medium"
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 20,
    justifyContent: "start",
    backgroundColor: "#fff",
    fontFamily: "Montserrat_500Medium"
  },
  label1: {
    padding: 4,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold"
  },
  input: {
    padding: 10,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium"
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium"
  },
  switchContainer: {
    flexDirection: "row", // Align switch and label horizontally
    justifyContent: "space-between", // Spread out the elements
    alignItems: "center", // Center vertically
    fontFamily: "Montserrat_500Medium"
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    marginRight: 10,
  },
  textAreaContainer: {
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium"
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
    fontFamily: "Montserrat_500Medium"
  },

  inputContainer: {
    flexDirection: "row", // Align elements horizontally
    alignItems: "center", // Vertically align the elements
    justifyContent: "space-between", // Space between the text input and picker
    fontFamily: "Montserrat_500Medium"
  },
  input: {
    flex: 1, // Take half the available width
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10, // Space between text input and picker
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: "Montserrat_500Medium"
  },
  pickerWrapper: {
    height: 40,
    width: 130,
    borderColor: "gray",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    fontFamily: "Montserrat_500Medium"
  },
  pickerWrapper1: {
    height: 50,
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    fontFamily: "Montserrat_500Medium"
  },

  picker: {
    height: 40,
    width: 140, // Width of the dropdown (picker)
    borderColor: "#000",
    fontFamily: "Montserrat_500Medium"
  },
  stylingtext: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Montserrat_500Medium",
    color: "white",
  },
  customcontainer: {
    padding: 30,

    backgroundColor: "#4184AB",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 3,
    fontFamily: "Montserrat_500Medium"
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
    fontFamily: "Montserrat_500Medium"
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    // fontWeight: "bold",
    textAlign: "center",
    marginTop: -2, // Slight adjustment for vertical centering
    fontFamily: "Montserrat_500Medium"
  },
  inputError: { borderColor: "red", borderWidth: 1 ,fontFamily: "Montserrat_500Medium"},
  errorText: { color: "red", fontSize: 12, marginTop: 5,fontFamily: "Montserrat_500Medium" },
  pickerError: {
    borderColor: "red", // Add a red border if there's an error
    fontFamily: "Montserrat_500Medium"
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontFamily: "Montserrat_500Medium"
  },
});

export default ResidentialAgent;
