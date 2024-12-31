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
  Image
} from "react-native";
import { PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
 import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import * as ImagePicker from 'expo-image-picker';
const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import LocationPicker from "../LocationPicker";
 



function AgricultureForm() {
  const navigation = useNavigation()
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log("SETTED", selectedLocation)
  };
  const [extraAmenities, setExtraAmenities] = useState('')
  const [roadType, setRoadType] = useState('')
  const [eleType, setEleType] = useState('')
  const [landMark, setLandmark] = useState('')
  const [distance, setDistance] = useState('');
  const [title, setTitle] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [surveyNumber, setSurveyNumber] = useState("");
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState();
  const [landType, setLandType] = useState("");
  const [landName, setLandName] = useState('')
  const [crops, setCrops] = useState("");
  const [litigation, setLitigation] = useState(false);
  const [litigationDesc, setLitigationDesc] = useState("");
  const [images, setImages] = useState([]);
  const [propertyDesc, setPropertyDesc] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Andhra Pradesh");
  const [surveyNo, setSurveyNo] = useState()
  const [boreWell, setBoreWell] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [distanceFromRoad, setDistanceFromRoad] = useState("");
  const [storageFacility, setStorageFacility] = useState(false);
  const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
  const [priceUnit, setPriceUnit] = useState("/acre"); // Price unit

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
        setLatitude(latitude); // Update latitude state
        setLogitude(longitude); // Update longitude state

        // Reverse geocode to get address
        let response = await Location.reverseGeocodeAsync({ longitude, latitude });
        if (response.length > 0) {
          const address = response[0];
          const locationString = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
          console.log("User Location: ", locationString);
          const latitude1 = `${latitude}`;
          const longitude1 = `${longitude}`;
          console.log("latitue cmg ", latitude1);
          setLatitude(latitude1);
          setLogitude(longitude1)
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
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLogitude] = useState("");
  // const [landMark, setLandmark] = useState("");
  const validateDistance = (value) => { const regex = /^\d+$/; if (!regex.test(value)) { alert('Kilometers should be in digits'); return false; } return true; };

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

  const handleDistrictChange = async (selectedDistrict) => {
    setDistrict(selectedDistrict);
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

  const apiUrl = "http://172.17.15.184:3000/fields/insert";

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
    else if (priceUnit === "/cent") pricePerAcre *= 100;

    if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
      setTotalPrice((sizeInAcres * pricePerAcre).toFixed(2));
    } else {
      setTotalPrice("");
    }
  };
   const routing= ()=>{
    console.log("In the routing")
    navigation.navigate('asd')
    
    }
  const SubmitForm = async () => {


    // console.log("price", values.price);
    try {
      const token = await AsyncStorage.getItem("userToken"); // Retrieve token from storage
      console.log("Token:", token);

      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return; // Exit if token is not found
      }









      const data = {
        ownerDetails: {
          ownerName,
          phoneNumber: String(phoneNumber),
        },
        landDetails: {
          title: landName,
          surveyNumber: surveyNo,
          size: 100,
          sizeUnit,
          price: 10000,
          priceUnit,
          landType,
          totalPrice: 65555,
          images:selectedImages,
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
          latitude:String(selectedLocation?.latitude),
          longitude:String(selectedLocation?.longitude)
        },
        amenities: {
          boreWell,
          electricity: eleType,
          distanceFromRoad: distance,
          storageFacility,
          roadType
        },
      
      };
      // console.log(values.price)
      console.log("Form Data:", data);
      // Send POST request to the API

      await axios.post('http://172.17.15.184:3000/fields/insert', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
          "Content-Type": "application/json",
        },
      }).then(response => {
        console.log("response", response.status)
        if (response.status === 201) {
          console.log("data cmg afterhitting", response)
          Alert.alert("Success", "Agricultural Land details submitted successfully!");
          navigation.navigate("asd")
          
        } else {
          Alert.alert("Error", "submit successfull");
        }
      })
      // Handle success response

    } catch (error) {
      Alert.alert("Error", "Failed to submit data. Please try again.");
      // console.error(error.response?.data || error.message); // Log the error
      console.error("API Response Error:", error.response?.data || error.message);

    }

  }
  const validateNumericInput = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue; // Return 0 if value is NaN
  };
  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [size, price, sizeUnit, priceUnit]);



  const CustomCheckBox = ({ label, value, onValueChange }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
    >
      <View style={value ? styles.checkedBox : styles.uncheckedBox} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple images to be selected
    });

    if (!result.canceled && result.assets.length > 0) {
      setImages(result.assets);
      uploadImages(result.assets);
    }
  };

  const uploadImages = async (imageAssets) => {
    const uploadedUrls = [];

    try {
      for (const asset of imageAssets) {
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
        formData.append('upload_preset', 'sni4p6lt');

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        uploadedUrls.push(response.data.secure_url);
        setSelectedImages(uploadedUrls)

      }
      console.log('Uploaded URLs:', uploadedUrls);
      setSelectedImages(uploadedUrls)
      console.log('Uploaded :', selectedImages);

      // Ensure onUrlsReturn is a valid function
     
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload failed', 'There was an error uploading your images.');
    }
  };
  const [isDispute, setIsDispute] = useState(false); // State for toggle
  const [description, setDescription] = useState(''); // State for description field

  const toggleDispute = (value) => {
    setIsDispute(value);
  };
  return (
    <>
      <ScrollView>
      <View style={styles.customcontainer}>
 <Text style={styles.stylingtext}>Add your land details here</Text>
 {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}
 </View>

        <View style={styles.container}>

          <Text style={styles.label1}>Owner Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter owner name"
            value={ownerName}
            onChangeText={(value) => setOwnerName(value)}
          />
          <Text style={styles.label1}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Is this a dispute?</Text>
            <Switch
              value={isDispute}
              onValueChange={toggleDispute}
            />
          </View>

          {/* Text Input for Description (only required if dispute is true) */}
          {isDispute && (
            <View style={styles.textAreaContainer}>
              <Text style={styles.label}>Description (Required for disputes)</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>
          )}





          <Text style={styles.label1}>Land Type</Text>

          <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>

            <Picker
              selectedValue={landType}
              onValueChange={(selectedValue) => setLandType(selectedValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="Select land type" value="" color="#888" />
              <Picker.Item label="Dry Land" value="Dry Land" />
              <Picker.Item label="Wet Land" value="Wet Land" />
              <Picker.Item label="Converted Land" value="Converted Land" />


            </Picker>
          </View>

          <Text style={styles.label1}>Land Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter land name"
            value={landName}
            onChangeText={(value) => setLandName(value)}
          />
          <Text style={styles.label1}>Survey No</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter survey no"
            value={surveyNo}
            onChangeText={(value) => setSurveyNo(value)}
          />
          <Text style={styles.label1}>Land Size</Text>
          <View style={styles.inputContainer}>
            {/* Land Size Text Input */}
            <TextInput
              style={styles.input}
              value={size}
              placeholder="Enter land size"
              keyboardType="numeric" // Ensures numeric input only
              onChange={(value) => setSize(value)}

            />
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={sizeUnit}
                onValueChange={(selectedValue) => setSizeUnit(selectedValue)}
                style={styles.picker}

              >
                <Picker.Item label="Acres" value="acres" />
                <Picker.Item label="Square Feet" value="sqft" />
                <Picker.Item label="Square Meters" value="sqm" />
                <Picker.Item label="Hectares" value="hectares" />
              </Picker>
            </View>
          </View>

          <Text style={styles.label1}>Price</Text>

          <View style={styles.inputContainer}>
            {/* Land Size Text Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              keyboardType="numeric"
              value={price}
              onChange={(value) => setPrice(value)}

            />


            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={priceUnit}
                onChange={(selectedValue) => {
                  setPriceUnit(selectedValue)
                }}
                style={styles.picker}

              >
                <Picker.Item label="Acres" value="acres" />
                <Picker.Item label="Square Feet" value="sqft" />
                <Picker.Item label="Square Meters" value="sqm" />
                <Picker.Item label="Hectares" value="hectares" />
              </Picker>
            </View>
          </View>
          <Text style={styles.label1}>Description</Text>

          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter description"
              value={propertyDesc}
              onChange={(value) => setPropertyDesc(value)}
              multiline
              numberOfLines={4}
            />
          </View>
          <Text style={styles.label1}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            value={country}
            onChange={(value) => {
              setCountry(value)
            }}
          />

          <Text style={styles.label1}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter state"
            value={state}
            onChangeText={(value) => setState(value)}
          />

          <Text style={styles.label1}>Pincode</Text>

          <TextInput
            placeholder="Pincode"
            value={pincode}
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
          <Text style={styles.label1}>Mandal</Text>
          <View style={styles.pickerWrapper1}>


             <Picker 
              selectedValue={mandal}
              onValueChange={handleMandalChange}

            >
              {mandals.length > 0
                ? mandals.map((mandalOption, index) => (
                  <Picker.Item key={index} label={mandalOption} value={mandalOption} />
                ))
                : <Picker.Item label="Mandal" value="" />
              }
            </Picker>
            </View>
 
          <Text style={styles.label1}>Village</Text>

          <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
            <Picker
              selectedValue={village}
              onValueChange={handleVillageChange}

            >
              {villages.length > 0
                ? villages.map((villageOption, index) => (
                  <Picker.Item key={index} label={villageOption} value={villageOption} />
                ))
                : <Picker.Item label="Village" value="" />
              }
            </Picker>
          </View>

          <Text style={styles.label1}>Land Mark</Text>


          <TextInput
            style={styles.input}
            placeholder="Enter land mark"
            value={landMark}
            onChangeText={(value) => {
              setLandmark(value)
            }}
          />
          <Text style={styles.label1}>Electricity Type</Text>

          <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
            <Picker

              selectedValue={eleType}
              onValueChange={(selectedValue) => {
                setEleType(selectedValue)
              }}
            >
              <Picker.Item label="Select electricity type" value="" color="#888" />

              <Picker.Item label="Agricultural" value="agricultural" />
              <Picker.Item label="Commercial" value="commercial" />

              <Picker.Item label="Domestic" value="domestic" />
              <Picker.Item label="Industrial" value="industrial" />
              <Picker.Item label="None" value="none" />

            </Picker>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Bore Facility</Text>
            <Switch
              value={boreWell}
              onValueChange={(value) => {
                setBoreWell(value)
              }}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Storage Facility</Text>
            <Switch
              value={storageFacility}
              onValueChange={(value) => {
                setStorageFacility(value)
              }}
            />
          </View>
          <Text style={styles.label1}>Distance from road (or) Highway:</Text>

          <TextInput style={styles.input} placeholder="Enter distance in Kms" keyboardType="numeric" value={distance} onChangeText={(value) => { if (validateDistance(value) || value === '') setDistance(value); }} />
          <Text style={styles.label1}>Select Road Type:</Text>
          <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
            <Picker

              selectedValue={roadType}
              onValueChange={(selectedValue) => {
                setRoadType(selectedValue)
              }}
            >
              <Picker.Item label="Select road type" value="" color="#888" />

              <Picker.Item label="Near to RNB" value="nearToRNB" />
              <Picker.Item label="Near to Highway" value="nearToHighway" />

              <Picker.Item label="Near to Panchayat" value="nearToPanchayat" />
              <Picker.Item label="Near to Village" value="neatToVillage" />
              <Picker.Item label="None" value="none" />

            </Picker>
          </View>

          <View style={styles.textAreaContainer}>
            <Text style={styles.label1}>Extra amenities</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter description"
              value={extraAmenities}
              onChange={(value) => {
                setExtraAmenities(value)
              }}
              multiline
              numberOfLines={4}
            />
          </View>
       
       
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

{/* <TextInput
            style={styles.input}
            placeholder="currentLocation"
            value={currentLocation}
            onChangeText={setCurrentLocation}
          /> */}


<Text style={styles.label1}>Upload Images</Text>

          <View style={{marginBottom:10}}>
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

          </View>
          <Button title="Submit" color="#4184AB" onPress={SubmitForm}></Button>

        </View>
      </ScrollView>
    </>
  );
};
export default AgricultureForm;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 20,
  //   paddingLeft:20,
  //   paddingRight:20,
  //   paddingBottom:100,
  //   backgroundColor: "#fff",
  //   },

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
    marginTop:5,
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
});
