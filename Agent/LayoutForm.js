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
import axios, { Axios } from "axios";
 import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import * as ImagePicker from 'expo-image-picker';
const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
import * as Location from "expo-location"
import { useNavigation } from "@react-navigation/native"
import LocationPicker from "../LocationPicker"
import Test from "../Agent/testing"

function LayoutForm(){
    const navigation = useNavigation()
const [ownerName, setOwnerName] = useState('')
const [contactNo, setContactNo] = useState('')
const [email, setEmail] = useState('')
const [altContactNo, setAltContactNo] = useState('')
const [title, setTitle] = useState('')
const [noOfPlots, setNoOfPlots] = useState('')
const [availablePlots, setAvailablePlots] = useState('')
const [plotSize, setPlotSize] = useState('')
const [price, setPrice] = useState('')
const [totalAmount, setTotalAmount]= useState('')
const [description, setDescription] = useState('')
const [rera, setRera] = useState(false)
const [dtcp, setDtcp] = useState(false)
const [tlp,setTlp] = useState(false)
const [flp,setFlp] = useState(false)
const [country,setCountry] = useState("India")
const [state, setState] = useState('Andhra Pradesh')
const [village,setVillage] = useState('')
const [district,setDistrict] = useState('')
const [mandal,setMandal] = useState('')
const [landMark,setLandmark] = useState('')
const [pincode, setPincode] = useState('')
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [underGroundWater, setUnderGroundWater] = useState(false)
  const [drainageSystem, setDrainageSystem] =useState(false)
  const [swimmingPool, setSwimmingPool] =useState(false)
  const [playZone, setPlayZone] = useState(false)
  const [gym, setGym] = useState(false)
  const [conventionHall, setConventionHall] = useState(false)
  const [parking, setParking] = useState(false)
  const [security, setSecurity] = useState(false)
  const [laundry, setLaundry] = useState(false)
  const [medical, setMedical] = useState('')
  const [educational, setEducational] = useState('')
  const [extraAmenities, setExtraAmenities] = useState('')
  const [roadType, setRoadType] = useState('')
  const [electricity, setElectricity] =useState('')
  const [sizeUnit, setSizeUnit] = useState('')
  const [priceUnit, setPriceUnit] = useState('')

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

const [roadProximity, setRoadProximity] =useState('')
    const [addressDetails, setAddressDetails] = useState({
      district: '',
      mandal: '',
      village: ''
    });
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        console.log("In the valdate form")
        const newErrors = {};
        console.log("PSDFGHJKL:", ownerName)
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
      
          console.log("NEWWWWW", newErrors)
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
        console.log("in the try block")
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
  const handleDistrictChange = async (selectedDistrict) => {
    setDistrict(selectedDistrict);
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
  const handleSubmit = async () => {
    console.log("in the handle sunjvmns")
    try {
      const token = await AsyncStorage.getItem("userToken");  
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;  
      }
       

      console.log("safdhngfmhghj",)
      if (validateForm()) {
        const data = {
          
          ownerDetails: {
            ownerName:ownerName,
            ownerContact:contactNo,
            ownerEmail:email,
          },
          layoutDetails: {
            reraRegistered:rera,
            dtcpApproved:dtcp,
            tlpApproved:tlp,
            flpApproved:flp,
            layoutTitle:title,
            description:description,
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
              pinCode:pincode,
              mandal,
              village,
            //   latitude: String(latitude),
            // longitude: String(longitude),
              landMark,
              
            },
          },
          amenities: {
            underGroundWater:underGroundWater,
            drainageSystem:drainageSystem,
            electricityFacility:electricity,
            swimmingPool:swimmingPool,
            playZone:playZone,
            gym:gym,
            conventionHall:conventionHall,
            medical:medical,
            educational:educational,
            extraAmenities: extraAmenities
              .split(",")
              .map((amenity) => amenity.trim()),
          },
        //   uploadPics: images, 
         };
        console.log(
          "Data being submitted to the API:",
          JSON.stringify(data, "Deepika")
        ); 
 
         

        // Send POST request to the API
        const response = await axios.post("http://172.17.15.189:3000/layout/insert", data, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
            "Content-Type": "application/json",
          },
        });

        // Handle success response
        if (response.status === 200 || response.status === 201) {
          Alert.alert("Success", "Layout details submitted successfully!");
          resetFunction()
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

  const resetFunction = () => {
    setOwnerName("");
    setContactNo("");
    setAltContactNo("");
    setNoOfPlots("");
    setAvailablePlots("");
setTitle("")
setPlotSize("")
setPrice("")
setTotalAmount("")
setDescription("")
setRera(false)
setDtcp(false)
setTlp(false)
setFlp(false)
setCountry("")
setState("")
setDistrict("")
setMandal("")
setVillage("")
setLandmark("")
setSecurity(false)
setLaundry(false)
setUnderGroundWater(false)
setDrainageSystem(false)
setSwimmingPool(false)
    setPlayZone(false);
    setConventionHall(false)
    setGym(false)
    setMedical("")
    setEducational("")
    setRoadProximity("")
    setElectricity("")
    setRoadType("")
    setExtraAmenities("")
 
 

 
    };

return(
      <ScrollView>
          <View style={styles.customcontainer}>
     <Text style={styles.stylingtext}>Add your land details here</Text>
     
     </View>
     <View style={styles.container}>
    
              <Text style={styles.label}>
                    Owner Name <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.ownerName && styles.inputError]}
                    
                    
                    placeholder="Enter owner name"
                    value={ownerName}
                    onChangeText={(value) => {
                      setOwnerName(value);
                     }}
                  />
                  {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

                  <Text style={styles.label}>
                    Owner Email <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                
                    placeholder="Enter owner email"
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                     }}
                  />
                                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}


<Text style={styles.label}>
                    Owner Contact Number <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.contactNo && styles.inputError]}
                    
                    placeholder="Enter owner contact number"
                    value={contactNo}
                    onChangeText={(value) => {
                      setContactNo(value);
                     }}
                  />
                                    {errors.contactNo && <Text style={styles.errorText}>{errors.contactNo}</Text>}


<Text style={styles.label}>
                    Alternative Contact Number  
                  </Text>
                  <TextInput
                    // style={[styles.input, errors.ownerName && styles.inputError]}
                    style={[styles.input,]}
                    placeholder="Enter alternative contact number"
                    value={altContactNo}
                    onChangeText={(value) => {
                      setAltContactNo(value);
                     }}
                  />
 <Text style={styles.label}>
                   Layout Title <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.title && styles.inputError]}
                    
                    
                    placeholder="Enter layout title"
                    value={title}
                    onChangeText={(value) => {
                      setTitle(value);
                     }}
                  />
                  {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

<Text style={styles.label}>
                    Total Number of Plots <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.noOfPlots && styles.inputError]}
                    placeholder="Enter total no of plots"
                    value={noOfPlots}
                    onChangeText={(value) => {
                      setNoOfPlots(value);
                     }}
                  />
                                    {errors.noOfPlots && <Text style={styles.errorText}>{errors.noOfPlots}</Text>}

                  <Text style={styles.label}>
                    Available Plots <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.availablePlots && styles.inputError]}
                    placeholder="Enter available plots"
                    value={availablePlots}
                    onChangeText={(value) => {
                      setAvailablePlots(value);
                     }}
                  />
                    {errors.availablePlots && <Text style={styles.errorText}>{errors.availablePlots}</Text>}
<Text style={styles.label}>
                    Plot Size <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <View style={styles.row}>
        {/* TextInput for Price */}
        <TextInput
          style={[styles.input, styles.halfWidth,  errors.plotSize && styles.inputError]}
          placeholder="Enter plot size"
          value={plotSize}
          onChangeText={(value) => setPlotSize(value)}
          keyboardType="numeric"
        />

        {/* Picker for Road Type */}
        <View style={[styles.pickerContainer, styles.halfWidth]}>
          <Picker
               selectedValue={sizeUnit}
               onValueChange={(selectedValue) => {setSizeUnit(selectedValue)}}
           
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
      {errors.plotSize && <Text style={styles.errorText}>{errors.plotSize}</Text>}

        
      <Text style={styles.label}>
                    Price <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <View style={styles.row}>
        {/* TextInput for Price */}
        <TextInput
          style={[styles.input, styles.halfWidth, errors.price && styles.inputError]}
          placeholder="Enter price"
          value={price}
          onChangeText={(value) => setPrice(value)}
          keyboardType="numeric"
        />
                  

        {/* Picker for Road Type */}
        <View style={[styles.pickerContainer, styles.halfWidth]}>
          <Picker
    
           selectedValue={priceUnit}
           onValueChange={(selectedValue) => {setPriceUnit(selectedValue)}}
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
      </View>
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
               
      <Text style={styles.label}>
                    Total Amount
                  </Text>
                  <TextInput
                    // style={[styles.input, errors.ownerName && styles.inputError]}
                    style={[styles.input,]}
                    placeholder="Total amount"
                    value={totalAmount}
                    onChangeText={(value) => {
                      setTotalAmount(value);
                     }}
                     editable={false}
                  />
      <Text style={styles.label}>
Layout Description
                  </Text>
                  <TextInput
                    // style={[styles.input, errors.ownerName && styles.inputError]}
                    style={[styles.input,styles.textarea]}
                    placeholder="Enter layout description"
                    value={description}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(value) => {
                      setDescription(value);
                     }}
                  />
                     <View style={styles.toggleSection}>
            <Text style={styles.label}>RERA Approved</Text>
            <Switch
              value={rera}
              onValueChange={setRera}
              thumbColor={rera ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>DTCP Approved</Text>
            <Switch
              value={dtcp}
              onValueChange={setDtcp}
              thumbColor={dtcp ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>TLP Approved</Text>
            <Switch
              value={tlp}
              onValueChange={setTlp}
              thumbColor={tlp ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>FLP Approved</Text>
            <Switch
              value={flp}
              onValueChange={setFlp}
              thumbColor={flp ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>

          <Text style={styles.label}>Country <Text style={{color:'red'}}>*</Text></Text>
          <TextInput
                    style={[styles.input, errors.country && styles.inputError]}
                     placeholder="Enter alternative contact number"
                    value={country}
                    onChangeText={(value) => {
                      setCountry(value);
                     }}
                     editable={false}
                  />
                                     {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}


                                     <Text style={styles.label}>
                  State <Text style={{color:'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={[styles.input, errors.title && styles.inputError]}
                    
                    
                    placeholder="Enter layout title"
                    value={state}
                    onChangeText={(value) => {
                      setState(value);
                     }}
                  />
                  {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

<Text style={styles.label}>Pincode <Text style={{color:'red'}}>*</Text></Text>
          <TextInput
                    style={[styles.input, errors.pinCode && styles.inputError]}
                     placeholder="Enter pincode"
                    value={pincode}
                    onChange={handlePincodeChange}
                    
                  />
                                                       {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

  <Text style={styles.label}>District <Text style={{color:'red'}}>*</Text></Text>


          <TextInput
            placeholder="District"
            value={district}
            onChangeText={handleDistrictChange}
            style={[styles.input,  errors.district && styles.inputError]}
            editable={false}
          />

                                                       {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

          <Text style={styles.label}>Mandal <Text style={{color:'red'}}>*</Text></Text>
          <View style={[{ borderColor: 'black', borderWidth: 1, borderRadius: 5, marginBottom:10,  }, errors.mandal && styles.inputError]}>


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
            {errors.mandal && <Text style={styles.errorText}>{errors.mandal}</Text>}
          <Text style={styles.label}>Village <Text style={{color:'red'}}>*</Text></Text>

          <View style={[{ borderColor: 'black', borderWidth: 1, borderRadius: 5 ,marginBottom:10 }, errors.village && styles.inputError]}>
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
          {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}

          <Text style={styles.label}>Land Mark <Text style={{color:'red'}}>*</Text></Text>
<TextInput
  placeholder="Enter land mark"
  value={landMark}
  onChangeText={setLandmark}
  style={[styles.input, errors.landMark && styles.inputError]}
  
/>
{errors.landMark && <Text style={styles.errorText}>{errors.landMark}</Text>}

<View style={styles.toggleSection}>
            <Text style={styles.label}>Security</Text>
            <Switch
              value={security}
              onValueChange={setSecurity}
              thumbColor={security ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />     
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>Laundry</Text>
            <Switch
              value={laundry}
              onValueChange={setLaundry}
              thumbColor={laundry ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />     
          </View>

<View style={styles.toggleSection}>
            <Text style={styles.label}>Underground Water</Text>
            <Switch
              value={underGroundWater}
              onValueChange={setUnderGroundWater}
              thumbColor={underGroundWater ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />   
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>Drainage System</Text>
            <Switch
              value={drainageSystem}
              onValueChange={setDrainageSystem}
              thumbColor={drainageSystem ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>Swimming Pool</Text>
            <Switch
              value={swimmingPool}
              onValueChange={setSwimmingPool}
              thumbColor={swimmingPool ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>Play Zone</Text>
            <Switch
              value={playZone}
              onValueChange={setPlayZone}
              thumbColor={playZone ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>Gym</Text>
            <Switch
              value={gym}
              onValueChange={setGym}
              thumbColor={gym ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />     
          </View>
          <View style={styles.toggleSection}>
            <Text style={styles.label}>Convention Hall</Text>
            <Switch
              value={conventionHall}
              onValueChange={setConventionHall}
              thumbColor={conventionHall ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />     
          </View>

          <Text style={styles.label}>Near By Medical Facility</Text>

  <View style={styles.inputGroup}>
        <TextInput
          style={styles.inputMedical}
          placeholder="Enter distance"
          value={medical}
        onChangeText={setMedical}
          keyboardType="numeric"
  
        />
        <Text style={styles.addon}>km</Text>
      </View>
      <Text style={styles.label}>Near By Educational Institutions</Text>


  <View style={styles.inputGroup}>
        <TextInput
          style={styles.inputMedical}
          placeholder="Enter distance"
          value={educational}
          onChangeText={setEducational}
          keyboardType="numeric"
  
        />
        <Text style={styles.addon}>km</Text>
      </View>
      <Text style={styles.label}>Road Proximity</Text>
<View style={styles.inputGroup}>
      <TextInput
        style={styles.inputMedical}
        placeholder="Enter distance"
      value={roadProximity}
      onChangeText={(value)=>{
        setRoadProximity(value)
      }}
        keyboardType="numeric"

      />
      <Text style={styles.addon}>km</Text>
    </View>

<Text style={styles.label}>Type of Electricity</Text>
    <View style={[styles.pickerContainer]}>
          <Picker
    selectedValue={electricity}
    onValueChange={(selectedValue) => {
        setElectricity(selectedValue)
    }}
           
          >
            <Picker.Item label="Select type of electricity" value="" color="#888" />
            <Picker.Item label="Domestic" value="domestic" />
            <Picker.Item label="Industrial" value="industrial" />
            <Picker.Item label="Commercial" value="commercial" />
            <Picker.Item label="Residential" value="residential" />
            <Picker.Item label="None" value="none" />
          </Picker>

                  </View>

                  <Text style={styles.label}>Near By Type of Road</Text>
    <View style={[styles.pickerContainer]}>
          <Picker
          selectedValue={roadType}
          onValueChange={(selectedValue) => {
setRoadType(selectedValue)
          }}
    
           
          >
            <Picker.Item label="Select type of road" value="" color="#888" />
            <Picker.Item label="R & B" value="nearToRNB" />
            <Picker.Item label="Near to Highway" value="nearToHighway" />
            <Picker.Item label="Near to Panchayat" value="nearToPanchayat" />
            <Picker.Item label="Near to Village" value="nearToVillage" />
            <Picker.Item label="None" value="none" />
          </Picker>

                  </View>

                  <Text style={styles.label}>
Extra Amenities
                  </Text>
                  <TextInput
                    // style={[styles.input, errors.ownerName && styles.inputError]}
                    style={[styles.input,styles.textarea]}
                    placeholder="Enter extra emenities"
                    value={extraAmenities}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(value) => {
                      setExtraAmenities(value);
                     }}
                  />


                  <TouchableOpacity style={{backgroundColor:'#4184AB',padding:10, borderRadius:5, alignItems:'center', marginBottom:10 }} onPress={handleSubmit}>
                    <Text style={{fontSize:18, color:'#fff', fontWeight:'bold'}}>Submit</Text>
                  </TouchableOpacity>
</View>
              
           
            </ScrollView>
)

}
export default LayoutForm;

const styles = StyleSheet.create({
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
        input: {
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
          },
          label: {
            fontSize: 16,
            marginRight: 10,
            marginBottom:5,
            fontWeight:'bold'
          },

           container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft:10,
    paddingRight:10,
     backgroundColor: "#fff",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      halfWidth: {
        width: '48%', // Adjusted to avoid overlap
      },
    
      pickerContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        marginBottom: 15,

        
      },
      textarea: {
        textAlignVertical: 'top', // Ensures text starts at the top
        height: 100, // Sets the height for the textarea
      },
      toggleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        },
        inputGroup: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 5,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 15,

          },
          addon: {
            fontSize: 14,
            color: '#333',
            marginLeft: 5,
          },
          inputMedical: {
            flex: 1,
            fontSize: 14,
            padding: 5,
            
          },
          errorText:{
            color:'red',
            fontSize:12,
            marginBottom:5
          },
          inputError:{
            borderColor:'red',
            borderWidth:1   
          }
})