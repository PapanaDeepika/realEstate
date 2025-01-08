import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Button,
  Alert,
  FlatList,
  Image,
} from "react-native";

import { RadioButton, CheckBox, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import * as Location from "expo-location";
import LocationPicker from "../LocationPicker";

import * as ImagePicker from "expo-image-picker";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useNavigation } from "@react-navigation/native";
const CommercialFormCsr = () => {
  const [checked, setChecked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log("SETTED", selectedLocation);
  };
  const [uploadedUrls1, setUploadedUrls1] = useState("");
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState("");
  const [propertyType, setPropertyType] = useState("Commercial");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [rating, setRating] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [status, setStatus] = useState("0");
  const [roadType, setRoadType] = useState("");

  const [villages, setVillages] = useState([]);
  // Owner Details
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isLegalDispute, setIsLegalDispute] = useState(false);
  const [disputeDesc, setDisputeDesc] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [roadProximity, setRoadProximity] = useState("");
  // Land Details
  const [plotSize, setPlotSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [landUsage, setLandUsage] = useState([]); // Should be managed accordingly
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");

  const [agents, setAgents] = useState([]); // State to store the agents
  const [selectedAgent, setSelectedAgent] = useState(" "); // State to store selected agent's name
  const [loading, setLoading] = useState(true); // State to manage loading

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
    console.log(images);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedImages.includes(item); // Check if the image is selected
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

  const handleCheckboxChange = (value) => {
    if (landUsage.includes(value)) {
      setLandUsage(landUsage.filter((item) => item !== value));
    } else {
      setLandUsage([...landUsage, value]);
    }
  };


  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, '');

    // Format it into 'xxx xxx xxxx'
    let formattedPhoneNumber = '';
    if (cleanedValue.length <= 3) {
      formattedPhoneNumber = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedPhoneNumber = cleanedValue.substring(0, 3) + ' ' + cleanedValue.substring(3, 6);
    } else {
      formattedPhoneNumber = cleanedValue.substring(0, 3) + ' ' + cleanedValue.substring(3, 6) + ' ' + cleanedValue.substring(6, 10);
    }

    return formattedPhoneNumber;
  };
  const handleContactNumberChange = (value) => {
    // Format the phone number
    const formattedNumber = formatPhoneNumber(value);
    setOwnerContact(formattedNumber);

    // Remove all spaces to check length and pattern
    const cleanedValue = value.replace(/\D/g, '');

    // Regex to ensure the number starts with 6-9 and is 10 digits
    const regex = /^[6-9]\d{9}$/; // Starts with 6-9 and has exactly 10 digits

    // Validate the phone number
    if (cleanedValue.length > 10) {
      setPhoneNumberError("Contact number cannot exceed 10 digits");
    } else if (!regex.test(cleanedValue)) {
      setPhoneNumberError("Contact number must start with 6, 7, 8, or 9 and be 10 digits long");
    } else {
      setPhoneNumberError('');
    }
  };

  const [address, setAddress] = useState({
    pinCode: "",
    country: "India",
    state: "Andhra Pradesh",
    district: "",
    mandal: "",
    village: "",
    latitude: "",
    longitude: "",
    landMark: "",
  });

  const [description, setDescription] = useState("");
  const [uploadPics, setUploadPics] = useState([]); // For managing images
  const [sizeUnit, setSizeUnit] = useState("acre");
  const [priceUnit, setPriceUnit] = useState("");
  const [isElectricity, setIsElectricity] = useState(false);
  const [isWaterFacility, setIsWaterFacility] = useState(false);
  const [isRoadFace, setIsRoadFace] = useState(false);
  const [sell, setSell] = useState("");
  const [rent, setRent] = useState("");
  const [lease, setLease] = useState("");
  // const [role,selectedRole]=useState(AsyncStorage.getItem("role"))
  const cloudName = "ddv2y93jq";
  const [plotPrice, setPlotPrice] = useState("");
  const [selectedValue, setSelectedValue] = useState("sell");
  const [uploadedImages, setUploadedImages] = useState([]);
const [errors,setErrors]=useState({})
  const [currentLocation, setCurrentLocation] = useState("");
  const [OwnerNameerror, setOwnerNameError] = useState("");
  const [OwnerEmailerror, setOwnerEmailError] = useState("");
  const [PhoneNumbererror, setPhoneNumberError] = useState("");
  const [LandNameerror, setLandNameError] = useState("");
  const [LandSizeerror, setLandSizeError] = useState("");
  const [LandPriceerror, setLandPriceError] = useState("");
  const [Monthserror, setMonthsError] = useState("");
  const [pinCodeerror, setPincodeError] = useState("");
  const [DistanceError, setDistanceError] = useState("");

  const navigation = useNavigation();


  const handlePincodeChange = async (text) => {
    console.log("sad", text);
    const uri = `http://172.17.15.184:3000/location/getlocationbypincode/${text}/@/@`;
    console.log(uri);
    setAddress({ ...address, pinCode: text });
    await axios({
      url: uri,
      method: "get",
      // headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      // }
    })
      .then((response) => {
        console.log(response.data);

        setAddress({
          ...address,
          district: response.data.districts[0],
          mandal: response.data.mandals[0],
        });
        setVillages(response.data.villages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  // const handleContactNumberChange = (value) => {
  //   setOwnerContact(value);
  //   // Check if the value matches the required pattern
  //   const regex = /^[6-9]\d{0,9}$/; // Starts with 6-9 and has up to 10 digits
  //   if (value.length > 10) {
  //     setPhoneNumberError("Contact number cannot exceed 10 digits");
  //   } else if (!regex.test(value)) {
  //     setPhoneNumberError(
  //       "Contact number must start with 6, 7, 8, or 9 and be 10 digits long"
  //     );
  //   } else {
  //     setPhoneNumberError("");
  //   }
  // };
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
        console.log(
          "Latitude and Longitude: ",
          latitude.toString(),
          longitude.toString()
        );

        setAddress({ ...address, latitude: latitude.toString(), longitude: longitude.toString() });
        console.log("ad", address);
        // let response = await Location.reverseGeocodeAsync({ longitude, latitude });
        // if (response.length > 0) {
        // const address1 = response[0];
        // const locationString = `${address1.name}, ${address1.street}, ${address1.city}, ${address1.region}, ${address1.country}`;
        // console.log("User Location: ", locationString);
        // const latitude1=`${latitude}`;
        // const longitude1=`${longitude}`;
        // console.log("latitue cmg ",latitude1,longitude1);
        // console.log(address)
        // // setAddress({...address,currentLocation:locationString})

        // setLocationDetails(locationString); // Update locationDetails state
        // setCurrentLocation(locationString); // Auto-fill currentLocation field
        // } else {
        // setLocationDetails("Unable to retrieve address");
        // setCurrentLocation("Unable to retrieve address");
        // }
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
      setErrorMsg("Error fetching location");
    }
  };

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
        console.log(asset.uri);
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
      console.log("All Uploaded URLs:", uploadedUrls, images);
      setUploadedUrls1(uploadedUrls);
      console.log("hashhdj", uploadedUrls1);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", "There was an error uploading your images.");
    }
  };

  const resetForm = () => {
    setOwnerContact("");
    setOwnerEmail("");
    setOwnerName("");
    setAddress("");
    setLandUsage("");
    setImages("");
    setIsElectricity("");
    setIsLegalDispute("");
    setIsRoadFace("");
    setIsWaterFacility("");
    setSizeUnit("");
    setPlotSize("");
    setPrice("");
    setPriceUnit("");
    setPropertyTitle("");
    setPropertyType("");
    setRoadProximity("");
    setRoadType("");
    setYears("");
    setMonths("");
    setSell("");
    setLease("");
    setRent("");
    setUploadPics([]);
    setDescription("");
    setDisputeDesc("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ownerName.trim()) newErrors.ownerName = "Owner Name is required";

    if (!ownerEmail.trim()) {
      newErrors.ownerEmail = "Email is required";
    }

    if (!ownerContact.trim()) {
      newErrors.ownerContact = "owner contact is required";
    }
if(!propertyType.trim())
{
 newErrors.propertyType="property Type is required"
}
    if (!propertyTitle.trim()) {
      newErrors.propertyTitle = "layoutTitle is required";
    }

    // if (!plotCount.trim()) {
    //   newErrors.plotCount = " PlotCount is required";
    // }
    // if (!availablePlots.trim()) {
    //   newErrors.availablePlots = "AvailablePlots is required";
    // }
    if (!plotSize) {
      newErrors.plotSize = " plot size is required";
    }
    if (!sizeUnit.trim()) {
      newErrors.sizeUnit = "Size unit is required";
    }
    if (!plotPrice) {
      newErrors.plotPrice = "plotPrice is required";
    }
    if (!priceUnit.trim()) {
      newErrors.priceUnit = "Price unit is required";
    }

    if (!address.pinCode.trim()) {
      newErrors.pincode = "Pincode is required";
    }
    if (!address.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!address.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!address.district.trim()) {
      newErrors.district = "District is required";
    }
    if (!address.village.trim()) {
      newErrors.village = "Village is required";
    }
    if (!address.mandal.trim()) {
      newErrors.mandal = "Mandal is required";
    }

    if(!roadType.trim())
    {
      newErrors.roadType="Road type is required"
    }
 
if(landUsage.length===0)
{
    newErrors.landUsage="landusage is required"
}
if(isLegalDispute)
{
    if(!disputeDesc.trim())
    {
        newErrors.disputeDesc="Description is required"
    }
}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return; // Exit if token is not found
    }
    // const userId=selectedAgent;

    if(validateForm())
    {
    let data = {
      propertyType: propertyType,
      propertyTitle: propertyTitle,

      propertyDetails: {
        agentDetails: {
          userId: selectedAgent,
        },

        owner: {
          ownerName: ownerName,
          ownerEmail: ownerEmail,
          ownerContact: ownerContact,
          isLegalDispute: isLegalDispute,
        },
        landDetails: {
          description: description,
          address: address,
        },
        amenities: {
          isElectricity: isElectricity,
          isWaterFacility: isWaterFacility,
          isRoadFace: isRoadFace,
          roadType: roadType,
        },
        uploadPics: images,
      },
    };
    if (isLegalDispute === true) {
      data.propertyDetails.owner.disputeDesc = disputeDesc;
    }

    if (roadProximity) {
      data.propertyDetails.amenities.distanceFromRoad = roadProximity;
    }
    // if(role===5)
    // {
    // data.propertyDetails.agentDetails={
    // "userId":agentId
    // }
    // }
    // Conditionally add landDetails based on selectedValue (sell, rent, lease)
    if (selectedValue === "sell") {
      data.propertyDetails.landDetails.sell = {
        plotSize: plotSize,
        sizeUnit: sizeUnit,
        price: plotPrice,
        totalAmount: totalAmount,
        landUsage: landUsage,
      };
    } else if (selectedValue === "rent") {
      data.propertyDetails.landDetails.rent = {
        plotSize: plotSize,
        sizeUnit: sizeUnit,
        // price: plotPrice,
        // priceUnit:priceUnit,
        totalAmount: totalAmount,
        landUsage: landUsage,
        rent: plotPrice,
        noOfMonths: months,
      };
    } else if (selectedValue === "lease") {
      data.propertyDetails.landDetails.lease = {
        plotSize: plotSize,
        sizeUnit: sizeUnit,
        leasePrice: plotPrice,
        totalAmount: totalAmount,
        landUsage: landUsage,
        // lease: lease,
        duration: years,
      };
    }
    console.log(
      " the agent details --> ",
      data.propertyDetails.agentDetails.userId
    );
    console.log("form data", data);

    //  console.log("address",data.propertyDetails.landDetails.address,data.propertyDetails.landDetails.sell )

    const apiUrl = `http://172.17.15.184:3000/commercials/postcommercial`;

    await axios({
      url: apiUrl,
      method: "post",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        
        Alert.alert(resp.data);
        resetForm()
        navigation.navigate("asd")
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
    }
    else
    {
      Alert.alert("Required fields needs to be filled")
    }
  };

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
  useEffect(() => {
    calculateTotalPrice();
  }, [plotSize, plotPrice, sizeUnit, priceUnit]);

  useEffect(() => {
    setTotalAmount(plotSize * rent * months);
  }, [plotSize, rent, months]);

  useEffect(() => {
    setTotalAmount(plotSize * lease * years);
  }, [plotSize, lease, years]);

  useEffect(() => {
    console.log(address.pinCode);
    if (address.pinCode != undefined && address.pinCode.length === 6) {
      console.log("asd", address.pinCode);
      handlePincodeChange(address.pinCode);
    }
  }, [address.pinCode]);

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
        console.log("omg", data);

        setAgents(data); // Assuming data is an array of agents
      } catch (error) {
        console.error("Failed to fetch assigned agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedAgents();
  }, []);

  const handleAgentChange = (itemValue) => {
    const selectedAgent = agents.find((agent) => agent.id === itemValue);
    setSelectedAgent(selectedAgent ? selectedAgent.name : "");
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <ScrollView>
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Commercial Property Details</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text>Select Agent:</Text>
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
              <Picker.Item label="No agents available" value="" />
            )}
          </Picker>
        </View>

        <Text style={styles.label1}>
          Owner Name<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Owner Name"
          value={ownerName}
          onChangeText={handleOwnerNameChange}
          style={[styles.input, errors.ownerName && styles.inputError]}
        />
        {OwnerNameerror ? (
          <Text style={styles.errorText}>{OwnerNameerror}</Text>
        ) : null}

        {errors.ownerName && (
          <Text style={styles.errorText}>{errors.ownerName}</Text>
        )}

        <Text style={styles.label1}>
          Contact Number<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="Owner Contact"
          value={ownerContact}
          onChangeText={handleContactNumberChange}
          style={[styles.input, errors.ownerContact && styles.inputError]}
        />
        {PhoneNumbererror ? (
          <Text style={styles.errorText}>{PhoneNumbererror}</Text>
        ) : null}

        {errors.ownerContact && (
          <Text style={styles.errorText}>{errors.ownerContact}</Text>
        )}

        <Text style={styles.label1}>
          Email<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="Owner Email"
          value={ownerEmail}
          onChangeText={(value) => {
            setOwnerEmail(value);

            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(value)) {
              setOwnerEmailError("Please enter a valid email address");
            } else {
              setOwnerEmailError(""); // Clear the error if valid
            }
          }}
          style={[styles.input, errors.ownerEmail && styles.inputError]}
        />
        {OwnerEmailerror ? (
          <Text style={styles.errorText}>{OwnerEmailerror}</Text>
        ) : null}

        {errors.ownerEmail && (
          <Text style={styles.errorText}>{errors.ownerEmail}</Text>
        )}
        <View style={styles.switchContainer}>
          <Text style={styles.label1}>Is There Any Dispute ?</Text>
          <Switch
            // placeholder="is there any dispute ?"
            value={isLegalDispute}
            onValueChange={setIsLegalDispute}
          />
        </View>
        {isLegalDispute && (
          <View>
            <Text style={styles.label1}>
              Description<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              placeholder="Dispute Description"
              value={disputeDesc}
              multiline
              numberOfLines={4}
              onChangeText={setDisputeDesc}
              style={[styles.textArea, errors.disputeDesc && styles.inputError]}
            />
            {errors.disputeDesc && (
              <Text style={styles.errorText}>{errors.disputeDesc}</Text>
            )}
          </View>
        )}
        <Text style={styles.label1}>
          Property Type<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Property Type"
          value={propertyType}
          onChangeText={setPropertyType}
          style={[styles.input, errors.propertyType && styles.inputError]}
        />

        {errors.propertyType && (
          <Text style={styles.errorText}>{errors.propertyType}</Text>
        )}
        <Text style={styles.label1}>
          Property Title<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="Property Title"
          value={propertyTitle}
          onChangeText={setPropertyTitle}
          style={[styles.input, errors.propertyTitle && styles.inputError]}
        />
        {errors.propertyTitle && (
          <Text style={styles.errorText}>{errors.propertyTitle}</Text>
        )}
        <RadioButton.Group
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
        >
          <Text style={styles.label1}>
            Please Select One<Text style={{ color: "red" }}>*</Text>
          </Text>
          <View style={[styles.radioContainer, { flexDirection: "row" }]}>
            <View style={styles.radioOption}>
              <RadioButton value="sell" />
              <Text style={styles.radioLabel}>Sell</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="rent" />
              <Text style={styles.radioLabel}>Rent</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="lease" />
              <Text style={styles.radioLabel}>Lease</Text>
            </View>
          </View>
        </RadioButton.Group>

        {selectedValue === "sell" && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Size (in acres)"
                value={plotSize}
                onChangeText={(value) => {
                  const regex = /^[0-9]*\.?[0-9]*$/;

                  if (!regex.test(value)) {
                    setLandSizeError("size should contain only Numbers");
                  } else {
                    setLandSizeError("");
                  }
                  setPlotSize(value);
                }}
                keyboardType="numeric"
                style={[styles.input, errors.plotSize && styles.inputError]}
              />
              <View
                style={[
                  styles.pickerWrapper,
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
            {LandSizeerror ? (
              <Text style={styles.errorText}>{LandSizeerror}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Price"
                value={plotPrice}
                onChangeText={(value) => {
                  const regex = /^[0-9]*\.?[0-9]*$/;

                  if (!regex.test(value)) {
                    setLandPriceError("Land size should contain only Numbers");
                  } else {
                    setLandPriceError("");
                  }
                  setPlotPrice(value);
                }}
                keyboardType="numeric"
                style={[styles.input, errors.plotPrice && styles.inputError]}
              />
              <View
                style={[
                  styles.pickerWrapper,
                  errors.priceUnit && styles.pickerError,
                ]}
              >
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
            {LandPriceerror ? (
              <Text style={styles.errorText}>{LandPriceerror}</Text>
            ) : null}
            <Text style={styles.label1}>Total Amount</Text>
            <TextInput
              placeholder="Total Amount"
              value={`${totalAmount} ${priceUnit}`}
              editable={false}
              style={styles.input}
            />
          </View>
        )}

        {selectedValue === "rent" && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Size (in acres)"
                value={plotSize}
                onChangeText={(value) => {
                  const regex = /^[0-9]*\.?[0-9]*$/;

                  if (!regex.test(value)) {
                    setLandSizeError("size should contain only Numbers");
                  } else {
                    setLandSizeError("");
                  }
                  setPlotSize(value);
                }}
                keyboardType="numeric"
                style={styles.input}
              />
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
            {LandSizeerror ? (
              <Text style={styles.errorText}>{LandSizeerror}</Text>
            ) : null}
            <Text style={styles.label1}>Enter Rent per Month</Text>

            <TextInput
              placeholder="Enter Rent per Month"
              value={rent}
              onChangeText={(value) => {
                const regex = /^[0-9]*\.?[0-9]*$/;

                if (!regex.test(value)) {
                  setLandPriceError("Rent should contain only Numbers");
                } else {
                  setLandPriceError("");
                }
                setRent(value);
              }}
              style={styles.input}
            />
            {LandPriceerror ? (
              <Text style={styles.errorText}>{LandPriceerror}</Text>
            ) : null}
            <Text style={styles.label1}>No of Months</Text>

            <TextInput
              placeholder="No of Months"
              value={months}
              onChangeText={(value) => {
                const regex = /^[0-9]+$/;

                if (!regex.test(value)) {
                  setMonthsError("Months should contain only Numbers");
                } else {
                  setMonthsError("");
                }
                setMonths(value);
              }}
              style={styles.input}
            />
            {Monthserror ? (
              <Text style={styles.errorText}>{Monthserror}</Text>
            ) : null}
            <Text style={styles.label1}>Total Amount</Text>
            <TextInput
              placeholder="Total Amount"
              value={`${totalAmount} ${priceUnit}`}
              editable={false}
              style={styles.input}
            />
          </View>
        )}

        {selectedValue === "lease" && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Size (in acres)"
                value={plotSize}
                onChangeText={(value) => {
                  const regex = /^[0-9]*\.?[0-9]*$/;

                  if (!regex.test(value)) {
                    setLandSizeError("size should contain only Numbers");
                  } else {
                    setLandSizeError("");
                  }
                  setPlotSize(value);
                }}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={styles.pickerWrapper}>
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
                  {/* <Picker.Item label="Cents" value="cents" /> */}
                </Picker>
              </View>
            </View>
            {LandSizeerror ? (
              <Text style={styles.errorText}>{LandSizeerror}</Text>
            ) : null}
            <Text style={styles.label1}>Enter Lease per Year</Text>

            <TextInput
              placeholder="Enter Lease per Year"
              value={lease}
              onChangeText={(value) => {
                const regex = /^[0-9]*\.?[0-9]*$/;

                if (!regex.test(value)) {
                  setLandPriceError("Lease should contain only Numbers");
                } else {
                  setLandPriceError("");
                }
                setLease(value);
              }}
              style={styles.input}
            />
            {LandPriceerror ? (
              <Text style={styles.errorText}>{LandPriceerror}</Text>
            ) : null}
            <Text style={styles.label1}>No of Years</Text>

            <TextInput
              placeholder="No of Years"
              value={years}
              onChangeText={(value) => {
                const regex = /^[0-9]+$/;

                if (!regex.test(value)) {
                  setMonthsError("Years should contain only Numbers");
                } else {
                  setMonthsError("");
                }
                setYears(value);
              }}
              style={styles.input}
            />
            {Monthserror ? (
              <Text style={styles.errorText}>{Monthserror}</Text>
            ) : null}
            <Text style={styles.label1}>Total Amount</Text>
            <TextInput
              placeholder="Total Amount"
              value={`${totalAmount} ${priceUnit}`}
              editable={false}
              style={styles.input}
            />
          </View>
        )}

        <Text style={styles.label1}>Description</Text>

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
        />
        <Text style={styles.label1}>
          Can be used for<Text style={{ color: "red" }}>*</Text>
        </Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={landUsage.includes("Retail") ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange("Retail")}
          />
          <Text style={styles.checkboxLabel}>Retail</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={landUsage.includes("Industrial") ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange("Industrial")}
          />
          <Text style={styles.checkboxLabel}>Industrial</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={landUsage.includes("Hospitality") ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange("Hospitality")}
          />
          <Text style={styles.checkboxLabel}>Hospitality</Text>
        </View>

        {/* Social Activities Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={
              landUsage.includes("Social Activities") ? "checked" : "unchecked"
            }
            onPress={() => handleCheckboxChange("Social Activities")}
          />
          <Text style={styles.checkboxLabel}>Social Activities</Text>
        </View>
        {errors.landUsage && (
          <Text style={styles.errorText}>{errors.landUsage}</Text>
        )}
        {/* Address Inputs */}
        <Text style={styles.label1}>
          Pincode<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="Pin Code"
          value={address.pinCode}
          onChangeText={(text) => setAddress({ ...address, pinCode: text })}
          style={[styles.input, errors.pinCode && styles.inputError]}
        />
        {errors.pinCode && (
          <Text style={styles.errorText}>{errors.pinCode}</Text>
        )}
        <Text style={styles.label1}>
          District<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="District"
          value={address.district}
          onChangeText={(text) => setAddress({ ...address, district: text })}
          style={[styles.input, errors.district && styles.inputError]}
        />

        {errors.district && (
          <Text style={styles.errorText}>{errors.district}</Text>
        )}
        <Text style={styles.label1}>
          Mandal<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="Mandal"
          value={address.mandal}
          onChangeText={(text) => setAddress({ ...address, mandal: text })}
          style={[styles.input, errors.mandal && styles.inputError]}
        />

        {errors.mandal && <Text style={styles.errorText}>{errors.mandal}</Text>}
        <Text style={styles.label1}>
          Village<Text style={{ color: "red" }}>*</Text>
        </Text>

        <View style={styles.inputContainer}>
          {villages.length > 0 ? (
            <View
              style={[
                styles.pickerWrapper1,
                errors.village && styles.pickerError,
              ]}
            >
              <Picker
                selectedValue={address.village}
                onValueChange={(itemValue) =>
                  setAddress({ ...address, village: itemValue })
                }
                style={{ height: 60, width: 300 }}
              >
                {villages.map((villageOption, index) => (
                  <Picker.Item
                    key={index}
                    label={villageOption}
                    value={villageOption}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <TextInput
              placeholder="Village"
              value={address.village}
              onChangeText={(text) => setAddress({ ...address, village: text })}
              style={[styles.input, errors.village && styles.inputError]}
            />
          )}
        </View>
        {errors.village && (
          <Text style={styles.errorText}>{errors.village}</Text>
        )}
        <Text style={styles.label1}>
          Country<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="Country"
          value={address.country}
          onChangeText={(text) => setAddress({ ...address, country: text })}
          style={[styles.input, errors.country && styles.inputError]}
        />

        {errors.country && (
          <Text style={styles.errorText}>{errors.country}</Text>
        )}
        <Text style={styles.label1}>
          State<Text style={{ color: "red" }}>*</Text>
        </Text>

        <TextInput
          placeholder="State"
          value={address.state}
          onChangeText={(text) => setAddress({ ...address, state: text })}
          style={[styles.input, errors.state && styles.inputError]}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
        {/* <View style={{ marginTop: 10 }} > 
         <Button
          // mode="contained"
          title="choose location"
          onPress={getUserLocation}
          icon={() => <FontAwesomeIcon icon={faLocationArrow} size={20} />}
          style={styles.button}
          />
          </View> */}

        {/* ----above works fine fo location-- */}

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
          value={`${address.latitude}`}
          editable={false}
        />
        <Text style={styles.label1}>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={`${address.longitude}`}
          editable={false}
        />
        {/* <LocationPicker onLocationSelected={handleLocationSelected} />
        {/* 
         {selectedLocation && (
                 <View >
                   <Text>Selected Location from LocationPicker:</Text>
                   <Text>Latitude: {selectedLocation.latitude}</Text>
                   <Text>Longitude: {selectedLocation.longitude}</Text>
                 </View>
               )} *
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
        )} */}

        {/* <TextInput
          placeholder="Latitude"
          value={address.latitude}
          onChangeText={(text) => setAddress({ ...address, latitude: text })}
          style={styles.input}
          />
         
         <TextInput
          placeholder="Longitude"
          value={address.longitude}
          onChangeText={(text) => setAddress({ ...address, longitude: text })}
          style={styles.input}
          />
          */}
        <TextInput
          placeholder="Landmark"
          value={address.landMark}
          onChangeText={(text) => setAddress({ ...address, landMark: text })}
          style={styles.input}
        />

        {/* Amenities */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Electricity</Text>
          <Switch value={isElectricity} onValueChange={setIsElectricity} />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Water Facility</Text>
          <Switch
            value={isWaterFacility}
            onValueChange={setIsWaterFacility}
            style={styles.switchContainer}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Road Face</Text>
          <Switch
            value={isRoadFace}
            onValueChange={setIsRoadFace}
            style={styles.switchContainer}
          />
        </View>

        <View>
          {/* <TextInput
          placeholder="Road Proximity"
          value={roadProximity}
          onChangeText={setRoadProximity}
          style={styles.input}
          /> */}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Type of road<Text style={{ color: "red" }}>*</Text>
          </Text>
          <View
            style={[
              styles.pickerWrapper,
              errors.roadType && styles.pickerError,
            ]}
          >
            <Picker
              selectedValue={roadType}
              style={styles.picker}
              onValueChange={(itemValue) => setRoadType(itemValue)}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Near to R&B" value="Near to R&B" />
              <Picker.Item label="Near to Highway" value="Near to Highway" />
              <Picker.Item
                label="Near to Panchayat"
                value="Near to Panchayat"
              />
              <Picker.Item label="Near to Village" value="Near to Village" />
            </Picker>
          </View>
        </View>

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

        <Button
          onPress={handleSubmit}
          title="Submit Form"
          style={styles.button}
        />
      </View>
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

  container: {
    flex: 1,
    marginTop: 15,
    paddingTop: 20,
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 20,
    justifyContent: "start",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
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
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  textAreaContainer: {
    marginBottom: 5,
  },
  textArea: {
    marginTop: 10,

    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
  },

  radioContainer: {
    flexDirection: "row", // Arrange radio buttons in a row
    alignItems: "center", // Align items vertically
    justifyContent: "flex-start", // Align content to the left (optional)
  },
  radioOption: {
    marginRight: 15, // Add some space between the radio buttons
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },

  inputContainer: {
    flexDirection: "row", // Align elements horizontally
    alignItems: "center", // Vertically align the elements
    justifyContent: "space-between", // Space between the text input and picker
  },
  input: {
    flex: 1, // Take half the available width
    height: 40,
    marginTop: 5,
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
    marginTop: 10,

    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerWrapper1: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,

    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
  },

  picker: {
    height: 60,
    width: 140,
    fontSize: 5,
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

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  button: {
    // width: '80%', // Takes up 80% of the container width
    // paddingVertical: 12, // Vertical padding for a larger button
    // marginBottom: 20, // Adds space between buttons
    // backgroundColor: '#4CAF50', // Green background color
    // borderRadius: 5, // Rounded corners
    marginTop: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
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

export default CommercialFormCsr;
