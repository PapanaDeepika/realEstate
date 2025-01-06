import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Switch,ScrollView,Button,Alert ,FlatList,Image} from "react-native";
 
 import {   RadioButton ,CheckBox, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import * as Location from "expo-location";

import * as ImagePicker from 'expo-image-picker';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
 const CommercialForm = () => {
    const [checked, setChecked] = useState(false);

const [uploadedUrls1,setUploadedUrls1]=useState("")
const [images,setImages]=useState([])
 const [userId, setUserId] = useState("");  
 const [propertyType, setPropertyType] = useState("Commercial");
 const [propertyTitle, setPropertyTitle] = useState("");
 const [rating, setRating] = useState("");
 const [ratingCount, setRatingCount] = useState("");  
 const [status, setStatus] = useState("0");  
 const [roadType,setRoadType]=useState("")

 const [villages,setVillages]=useState([])
 // Owner Details
 const [ownerName, setOwnerName] = useState("");
 const [ownerContact, setOwnerContact] = useState("");
 const [ownerEmail, setOwnerEmail] = useState("");
 const [isLegalDispute, setIsLegalDispute] = useState(false);
 const [disputeDesc, setDisputeDesc] = useState("");
const [locationDetails,setLocationDetails]=useState("")
 const [roadProximity,setRoadProximity]=useState("")
 // Land Details
 const [plotSize, setPlotSize] = useState("");
 const [price, setPrice] = useState("");
 const [totalAmount, setTotalAmount] = useState("");
 const [landUsage, setLandUsage] = useState([]); // Should be managed accordingly
 const[months,setMonths]=useState('');
 const[years,setYears]=useState('');
 




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
  console.log(images)
 };

  const renderItem = ({ item }) => {
   const isSelected = selectedImages.includes(item);  // Check if the image is selected
   return (
     <TouchableOpacity onPress={() => toggleSelection(item)}>
       <Image
         source={{ uri: item }}
         style={[
           { width: 100, height: 100, margin: 5 },
           isSelected && { borderWidth: 3, borderColor: 'blue' }  // Add border when selected
         ]}
         resizeMode="cover"
       />

{/* {isSelected &&(<Button title="remove"  onPress={() => removeImage(item)} />)} */}
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

 const [address, setAddress] = useState({
 pinCode: "",
 country: "India",
 state: "Andhra Pradesh",
 district: "",
 mandal: "",
 village: "",
 latitude:"",
 longitude:"",
 landMark:""
 });




  const [description, setDescription] = useState("");
 const [uploadPics, setUploadPics] = useState([]); // For managing images
const [sizeUnit,setSizeUnit]=useState('acre')
 const [priceUnit,setPriceUnit]=useState('')
 const [isElectricity, setIsElectricity] = useState(false);
 const [isWaterFacility, setIsWaterFacility] = useState(false);
 const [isRoadFace, setIsRoadFace] = useState(false);
 const [sell,setSell]=useState('');
 const [rent,setRent]=useState('');
 const [lease,setLease]=useState('');
// const [role,selectedRole]=useState(AsyncStorage.getItem("role"))
const cloudName = 'ddv2y93jq';
const [plotPrice,setPlotPrice]=useState('')
const [selectedValue,setSelectedValue]=useState('sell');
const [uploadedImages, setUploadedImages] = useState([]);
 
const [currentLocation,setCurrentLocation]=useState('') 

const handlePincodeChange=async (text)=>
{
    const token = await AsyncStorage.getItem("userToken");

     if (!token) {
    Alert.alert("token not found", "please login again");
    return;
    }
   const uri=`http://172.17.15.184:3000/location/getlocationbypincode/${text}/@/@`
  setAddress({ ...address, pinCode: text })
await axios({
  url:uri,
  method:"get",
  headers:{
    Authorization: `Bearer ${token}`,  
    "Content-Type": "application/json",
  }
}).then(response=>{
  console.log(response.data)

  setAddress({ ...address,district:response.data.districts[0],mandal:response.data.mandals[0]})
  setVillages(response.data.villages)
}).catch(err=>{
  console.log(err)
})

}

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
      console.log("Latitude and Longitude: ", latitude.toString(), longitude.toString());
    
      setAddress({ ...address, latitude:latitude,longitude:longitude})
console.log("ad",address)
      // let response = await Location.reverseGeocodeAsync({ longitude, latitude });
      // if (response.length > 0) {
      //   const address1 = response[0];
      //   const locationString = `${address1.name}, ${address1.street}, ${address1.city}, ${address1.region}, ${address1.country}`;
      //   console.log("User Location: ", locationString);
      //   const latitude1=`${latitude}`;
      //   const longitude1=`${longitude}`;
      //   console.log("latitue cmg ",latitude1,longitude1);
      //   console.log(address)
      //   // setAddress({...address,currentLocation:locationString})

      //   setLocationDetails(locationString);  // Update locationDetails state
      //   setCurrentLocation(locationString);  // Auto-fill currentLocation field
      // } else {
      //   setLocationDetails("Unable to retrieve address");
      //   setCurrentLocation("Unable to retrieve address");
      // }
    }
    ;  
    }
   catch (error) {
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
        console.log(asset.uri)
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
      console.log('All Uploaded URLs:', uploadedUrls,images);
      setUploadedUrls1(uploadedUrls);
      console.log('hashhdj',uploadedUrls1)
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload failed', 'There was an error uploading your images.');
    }
  };


const handleSubmit = async () => {
    let data = {
      propertyType: propertyType,
      propertyTitle: propertyTitle,
  
      propertyDetails: {
        owner: {
            ownerName: ownerName,
            ownerEmail: ownerEmail,
            ownerContact: ownerContact,
            isLegalDispute:isLegalDispute
          },
        landDetails: {
          description:description,
          address:address
        },
        amenities: {
          isElectricity: isElectricity,
          isWaterFacility: isWaterFacility,
          isRoadFace: isRoadFace,
          roadType: roadType,
         },
        uploadPics:images
      },
    };
  if(isLegalDispute===true)
  {
    data.propertyDetails.owner.disputeDesc=disputeDesc
  }

  if(roadProximity)
  {
    data.propertyDetails.amenities.distanceFromRoad=roadProximity
  }
    // if(role===5)
    // {
    //     data.propertyDetails.agentDetails={
    //         "userId":agentId
    //     }
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
  
    console.log(data);
 
    const token = await AsyncStorage.getItem("userToken");





    console.log("address",data.propertyDetails.landDetails.address,data.propertyDetails.landDetails.lease )

const apiUrl=`http://172.17.15.184:3000/commercials/postcommercial`

    await axios({
      url:apiUrl,
      method:"post",
      data:data,
      headers:{
        Authorization: `Bearer ${token}`,  
        "Content-Type": "application/json",
      }
    }).then(resp=>{
      console.log(resp)
      Alert.alert(resp.data)
      navigation.navigate("asd")

    }).catch(err=>{
      console.log("error")
      console.log(err)
    })
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

useEffect(()=>{
  setTotalAmount(plotSize*rent*months)
},[plotSize,rent,months])

useEffect(()=>{
  setTotalAmount(plotSize*lease*years)
},[plotSize,lease,years])

  useEffect(() => {
console.log(address.pinCode)
     if ( address.pinCode!=undefined && address.pinCode.length === 6) {
       handlePincodeChange(address.pinCode);
    }
  }, [address.pinCode]);
 return (
 
 <ScrollView>
   <View style={styles.customcontainer}>
 <Text style={styles.stylingtext}>Commercial Property Details</Text>
 </View>
 <View style={styles.container}>



{/* {role===5 &&()} */}
<Text style={styles.label1}>Owner Name</Text>
 <TextInput
 placeholder="Owner Name"
 value={ownerName}
 onChangeText={setOwnerName}
 style={styles.input}
 />

<Text style={styles.label1}>Contact Number</Text>

 <TextInput
 placeholder="Owner Contact"
 value={ownerContact}
 onChangeText={setOwnerContact}
 style={styles.input}
 />
 <Text style={styles.label1}>Email</Text>

 <TextInput
 placeholder="Owner Email"
 value={ownerEmail}
 onChangeText={setOwnerEmail}
 style={styles.input}
 />

<View style={styles.switchContainer}>
 <Text style={styles.label1}>Is There Any Dispute ?</Text>
 <Switch
 // placeholder="is there any dispute ?"
 value={isLegalDispute}
 onValueChange={setIsLegalDispute}
 /></View>
 {isLegalDispute&&(<TextInput
 placeholder="Dispute Description"
 value={disputeDesc}
 onChangeText={setDisputeDesc}
 style={styles.input}
 
 />)}

 <TextInput
 placeholder="Property Type"
 value={propertyType}
 onChangeText={setPropertyType}
 style={styles.input}
 />
  <Text style={styles.label1}>Property Title</Text>

 <TextInput
 placeholder="Property Title"
 value={propertyTitle}
 onChangeText={setPropertyTitle}
 style={styles.input}
 />
  
<RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}>
  <Text style={styles.label1}>Please Select One :</Text>
  <View style={[styles.radioContainer, { flexDirection: 'row' }]}>
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


      {selectedValue === 'sell' && (
        <View style={{ marginTop: 20 }}>
 
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Size (in acres)"
              value={plotSize}
              onChangeText={setPlotSize}
              keyboardType="numeric"
              style={styles.input}
            />
                        <View style={styles.pickerWrapper}>

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
          </View>
  
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Price"
              value={plotPrice}
              onChangeText={setPlotPrice}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.pickerWrapper}>


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
          <Text style={styles.label1}>Total Amount</Text>
          <TextInput
            placeholder="Total Amount"
            value={`${totalAmount} ${priceUnit}`}
            editable={false}
            style={styles.input}
          />
        </View>
      )}
 
 {selectedValue === 'rent' && (
        <View style={{ marginTop: 20 }}>
       <View style={styles.inputContainer}>
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
      <Text style={styles.label1} >Enter Rent per Month</Text>

           <TextInput 
            placeholder="Enter Rent per Month" 
            value={rent}
            onChangeText={setRent}
            style={styles.input}

           />
                   <Text style={styles.label1} >No of Months</Text>

           <TextInput 
            placeholder="No of Months" 
            value={months}
            onChangeText={setMonths}
            style={styles.input}
          />
        <Text style={styles.label1} >Total Amount</Text>
        <TextInput
            placeholder="Total Amount"
            value={`${totalAmount} ${priceUnit}`}
            editable={false}
            style={styles.input}
          />
        </View>
         
      )}

{selectedValue === 'lease' && (
        <View style={{ marginTop: 20 }}>
         <View style={styles.inputContainer}>
            <TextInput
              placeholder="Size (in acres)"
              value={plotSize}
              onChangeText={setPlotSize}
              keyboardType="numeric"
              style={styles.input}
            />
                        <View style={styles.pickerWrapper}>

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
          </View>
          <Text style={styles.label1} >Enter Lease per Year</Text>

           <TextInput 
            placeholder="Enter Lease per Year" 
            value={lease}
            onChangeText={setLease}
            style={styles.input}

           />
            <Text style={styles.label1} >No of Years</Text>

           <TextInput 
            placeholder="No of Years" 
            value={years}
            onChangeText={setYears}
            style={styles.input}
          />
          <Text style={styles.label1}>Total Amount</Text>
          <TextInput
            placeholder="Total Amount"
            value={`${totalAmount} ${priceUnit}`}
            editable={false}
            style={styles.input}
          />
        </View>
      )}


  
<Text style={styles.label1} >Description</Text>

 <TextInput
 placeholder="Description"
 value={description}
 onChangeText={setDescription}
 style={styles.input}
 
 />
<Text  style={styles.label1}>Can be used for</Text>

<View style={styles.checkboxContainer}>
 
        <Checkbox
          status={landUsage.includes('Retail') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Retail')}
        /><Text style={styles.checkboxLabel}>Retail</Text>

       </View>
 
      <View style={styles.checkboxContainer}>
 
        <Checkbox
          status={landUsage.includes('Industrial') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Industrial')}
        />
              <Text style={styles.checkboxLabel}>Industrial</Text>

       </View>

       <View style={styles.checkboxContainer}>
 
        <Checkbox
          status={landUsage.includes('Hospitality') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Hospitality')}
        />
              <Text style={styles.checkboxLabel}>Hospitality</Text>

       </View>

      {/* Social Activities Checkbox */}
      <View style={styles.checkboxContainer}>
 
        <Checkbox
          status={landUsage.includes('Social Activities') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Social Activities')}
        />
              <Text style={styles.checkboxLabel}>Social Activities</Text>

       </View>
  
 {/* Address Inputs */}
 <Text style={styles.label1} >Pincode</Text>

 <TextInput
 placeholder="Pin Code"
 value={address.pinCode}
 onChangeText={(text) =>setAddress({ ...address, pinCode: text })}
 
 style={styles.input}
 />
 <Text style={styles.label1}>District</Text>
 <TextInput
 placeholder="District"
 value={address.district}
 onChangeText={(text) => setAddress({ ...address, district: text })}
 style={styles.input}
 />
  <Text style={styles.label1}>Mandal</Text>

 <TextInput
 placeholder="Mandal"
 value={address.mandal}
 onChangeText={(text) => setAddress({ ...address, mandal: text })}
 style={styles.input}
 />
   <Text style={styles.label1}>Village</Text>

<View style={styles.inputContainer}> 

   {
   villages.length > 0 ? (
 

<View style={styles.pickerWrapper1}>
    <Picker
    selectedValue={address.village}
    onValueChange={(itemValue) => setAddress({ ...address, village: itemValue })}
    style={{ height:60 , width:300}}
  >
    {villages.map((villageOption, index) => (
      <Picker.Item key={index} label={villageOption} value={villageOption} />
    ))}
  </Picker>
  </View>
   ) : (
    <TextInput
      placeholder="Village"
      value={address.village}
      onChangeText={(text) => setAddress({ ...address, village: text })}
      style={styles.input}
    />
  )
}
</View>

   <Text style={styles.label1}>Country</Text>

<TextInput
 placeholder="Country"
 value={address.country}
 onChangeText={(text) => setAddress({ ...address, country: text })}
 style={styles.input}
 />
    <Text style={styles.label1}>State</Text>

<TextInput
 placeholder="State"
 value={address.state}
 onChangeText={(text) => setAddress({ ...address, state: text })}
 style={styles.input}
 />


<View style={{ marginTop: 10 }} > 
<Button
        // mode="contained"
        title="choose location"
        onPress={getUserLocation}
        icon={() => <FontAwesomeIcon icon={faLocationArrow} size={20} />}
        style={styles.button}
      />
      </View>
    
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
 <Switch
 value={isElectricity}
 onValueChange={setIsElectricity}
 />
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
 
    <TextInput
 placeholder="Road Proximity"
 value={roadProximity}
 onChangeText={setRoadProximity}
 style={styles.input}
 />
</View>
 
<View style={styles.inputContainer}>
    <Text style={styles.label}>Type of road: </Text>
    <View style={styles.pickerWrapper}>

    <Picker
              selectedValue={roadType}
              style={styles.picker}
              onValueChange={(itemValue) => setRoadType(itemValue)}
            >
               <Picker.Item label="None" value="None" />
              <Picker.Item label="Near to R&B" value="Near to R&B" />
              <Picker.Item label="Near to Highway" value="Near to Highway" />
              <Picker.Item label="Near to Panchayat" value="Near to Panchayat" />
              <Picker.Item label="Near to Village" value="Near to Village" />
              
            </Picker>
            </View>
</View>

 
 <View style={{marginTop:"10px"}}>
  <Button title="Select Images" onPress={pickImages}  style={styles.button}/>
  <ScrollView horizontal>
    {uploadedImages.map((url, index) => (
      <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100, margin: 5 }} />
    ))}
  </ScrollView>
</View>
<View style={{marginBottom:10}}>

           
   <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

          </View>
           
 <Button onPress={handleSubmit} title="Submit Form" style={styles.button} />
 </View>
 </ScrollView>
  );
};

 
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
    marginTop:15,
    paddingTop: 20,
    paddingLeft: 45,
    paddingRight: 45,
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
    marginTop:10,

    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },

  radioContainer: {
    flexDirection: 'row', // Arrange radio buttons in a row
    alignItems: 'center', // Align items vertically
    justifyContent: 'flex-start', // Align content to the left (optional)
  },
  radioOption: {
    marginRight: 15, // Add some space between the radio buttons
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },

  inputContainer: {
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Vertically align the elements
    justifyContent: 'space-between', // Space between the text input and picker
  },
  input: {
    flex: 1, // Take half the available width
    height: 40,
    marginTop:5,
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
    marginTop:10,

    borderColor: 'gray',
    borderWidth: 1,  
    borderRadius: 5,  
    justifyContent: 'center', 
    alignItems: 'center',  
  },
  pickerWrapper1: {
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center',  
    borderRadius: 5,  

    borderColor: 'gray',
    borderWidth: 1,  
     marginTop:10,

  },
   
  picker: {
    height: 60,
    width: 140, 
    fontSize:5,
 
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

    button: {
      
    // width: '80%', // Takes up 80% of the container width
    // paddingVertical: 12, // Vertical padding for a larger button
    // marginBottom: 20, // Adds space between buttons
    // backgroundColor: '#4CAF50', // Green background color
    // borderRadius: 5, // Rounded corners
    marginTop:10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },

  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Semi-transparent background
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -2,  // Slight adjustment for vertical centering
  },
});

export default CommercialForm;