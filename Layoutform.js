
import React, { useState,useRef} from "react";
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
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { useEffect } from "react";
import * as Location from "expo-location";
// import ImageUploader from "../imagePicker";
 import MapView, { Marker } from 'react-native-maps';


import * as ImagePicker from 'expo-image-picker';

const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
const LayoutForm = () => {
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

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [currentLocation, setCurrentLocation] = useState("");
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
  const [selectedImages, setSelectedImages] = useState([]); // Selected images
  const [uploadedImages, setUploadedImages] = useState([]); // Uploaded images URLs


  // State variable for images
  // const [uploadPics, setUploadPics] = useState([]);

  const apiUrl = "http://172.17.15.68:3000/layout/insert"; // Replace with your actual API URL

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
        const response = await axios.get(`http://172.17.15.189:3000/location/getlocationbypincode/${pincodeValue}/@/@`);
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
      const response = await axios.get(`http://172.17.15.189:3000/location/getmandals/${selectedDistrict}`);
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
      const response = await axios.get(`http://172.17.15.189:3000/location/getvillagesbymandal/${selectedMandal}`);
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

  const [errorMsg, setErrorMsg] = useState("");
 
    const [locationDetails, setLocationDetails] = useState("");

    const getUserLocation = async () => {
        try {
            // Request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was not granted');
                return;
            }

            // Get user's current position
            let { coords } = await Location.getCurrentPositionAsync();
            if (coords) {
                const { latitude, longitude } = coords;
                console.log("Latitude and Longitude: ", latitude, longitude);
                setLatitude(latitude);
                setLongitude(longitude);

                // Reverse geocode to get address
                let response = await Location.reverseGeocodeAsync({ longitude, latitude });
                if (response.length > 0) {
                    const address = response[0];
                    const locationString = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
                    console.log("User Location: ", locationString);
                    setLocationDetails(locationString);
                } else {
                    setLocationDetails("Unable to retrieve address");
                }
            }
        } catch (error) {
            console.error("Error fetching location: ", error);
            setErrorMsg("Error fetching location");
        }
    };
  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return; // Exit if token is not found
      }

      // Prepare data to be sent in the request
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
            currentLocation
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
        uploadPics: uploadedImages, // Cloudinary image URLs
        // uploadPics: images.split(",").map((img) => img.trim()), // Convert comma-separated URLs into an array
      };

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


  return (
    <>
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Layout Details</Text>
        {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}
      </View>

      <View style={styles.container}>
        <ScrollView>
          {/* <Text style={styles.title}>Layout Details</Text> */}

          {/* Owner Details Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Owner Name"
            value={ownerName}
            onChangeText={setOwnerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Owner Contact"
            value={ownerContact}
            onChangeText={setOwnerContact}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Owner Email"
            value={ownerEmail}
            onChangeText={setOwnerEmail}
            keyboardType="email-address"
          />

          {/* Layout Details Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Layout Title"
            value={layoutTitle}
            onChangeText={setLayoutTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Plot Count"
            value={plotCount}
            onChangeText={setPlotCount}
            keyboardType="numeric"
          />
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
          <View style={styles.inputGroup}>
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

          {/* Total Price with Unit */}
          <Text>Total Price</Text>
          <TextInput
            placeholder="Total Price"
            value={`${totalAmount} ${priceUnit}`}
            editable={false}
            style={styles.input}
          />

          <TextInput
            style={styles.input}
            placeholder="country"
            value={country}
            onChangeText={setCountry}
          />

          <TextInput
            style={styles.input}
            placeholder="state"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            placeholder="District"
            value={district}
            onChangeText={handleDistrictChange}
            style={[styles.input, styles.districtInput]}
            editable={false}
          />

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

          <TextInput
            placeholder="Pincode"
            value={pincode}
            onChange={handlePincodeChange}
            style={[styles.input, styles.pincodeInput]}
          />

          <TextInput
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
          />

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

          <View>
            <Button title="Select Images" onPress={pickImages} />
            <ScrollView horizontal>
              {uploadedImages.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100, margin: 5 }} />
              ))}
            </ScrollView>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Get Current Location</Text>
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
            <Button mode="contained" onPress={getUserLocation} style={styles.button} title="Get Location" />

            <View style={styles.infoContainer}>
                {latitude && longitude ? (
                    <Text style={styles.info}>
                        Latitude: {latitude}{"\n"}
                        Longitude: {longitude}{"\n"}
                        Address: {locationDetails || "Fetching..."}
                    </Text>
                ) : (
                    <Text style={styles.info}>Click the button to get your location</Text>
                )}
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
    padding: 16,
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

export default LayoutForm;



