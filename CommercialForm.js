import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput,Switch,ScrollView } from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommercialForm = () => {
  // const [userId, setUserId] = useState(""); // Assuming you will capture userId from some other logic
  const [propertyType, setPropertyType] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [rating, setRating] = useState("0");
  const [ratingCount, setRatingCount] = useState("0"); // Optional
  const [status, setStatus] = useState("0"); // Optional

  // Owner Details
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isLegalDispute, setIsLegalDispute] = useState(false);
  const [disputeDesc, setDisputeDesc] = useState("");

  // Land Details
  const [plotSize, setPlotSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [landUsage, setLandUsage] = useState([]); // Should be managed accordingly
  // const[months,setMonths]=useState('');
  // const[years,setYears]=useState('');

  // Address Details
  const [address, setAddress] = useState({
    pinCode: "",
    country: "India",
    state: "Andhra Pradesh",
    district: "",
    mandal: "",
    village: "",
  });

  // Description and Upload
  const [description, setDescription] = useState("");
  const [uploadPics, setUploadPics] = useState([]); // For managing images

  // Amenities
  const [isElectricity, setIsElectricity] = useState(false);
  const [isWaterFacility, setIsWaterFacility] = useState(false);
  const [isRoadFace, setIsRoadFace] = useState(false);
  // const [sell,setSell]=useState('');
  // const [rent,setRent]=useState('');
  // const [lease,setLease]=useState('');

//    const [selectedValue,setSelectedValue]=useState('option1');
//   const apiUrl = "http://172.17.15.53:3000/residential/add";

//   const submit=()=>{

//  const data={

//   ownerdetails,
//   propertyType,
//   propertyTitle,
//   ratingCount,
//   status,
//   ownerName,
//   ownerEmail,
//   ownerdetails,
//   isLegalDispute,
//   disputeDesc,




//  }
//  try{
//   const token=await AsyncStorage.getItem('userToken');
//   if(!token){
//     Alert.alert("token is not present ,try tologin again");
//   }

//   const response=await axios.post(apiUrl,data,{
//     headers:{
//       'Authorization':`Bearer ${token}`,
//       'content-type':'application/json'
//     }

    

//   })
//   if(response==='ok'){
//     Alert.alert("data submitted successfully")

//   }
//  }
// }}
  return (
    <>
     <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Commercial Property Details</Text>
      </View>
<>
    <ScrollView>
       <View style={styles.container}>
      <TextInput
        placeholder="Property Type"
        value={propertyType}
        onChangeText={setPropertyType}
        style={styles.input}
      />
      <TextInput
        placeholder="Property Title"
        value={propertyTitle}
        onChangeText={setPropertyTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Rating"
        value={rating}
        keyboardType="numeric"
        onChangeText={setRating}
        style={styles.input}
      />
      <TextInput
      placeholder="landusage"
      value={landUsage}
      onChangeText={setLandUsage}
      style={styles.input}
      />
      <Text
      placeholder="Choose purpose of the land"/>
      <TextInput
      value={sell}
      onChangeText={setSell}
      placeholder="sell"
      
      />

      <RadioButton
      placeholder="choose one option"
      value={selectedValue}
      onChangeText={setSelectedValue}
      // status={selectedValue==='option1'
      //   ? 'checked':'unchecked'
      // }

/>
       <TextInput
      // value={option1}
      onChangeText={setRent}
      value={selectedValue(option1)}
      placeholder="Rent"
      
      />
      <TextInput
      value={lease}
      onChangeText={setLease}
      placeholder="Lease"
      />
      <TextInput
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
        style={styles.input}
      />
      <TextInput
        placeholder="Owner Contact"
        value={ownerContact}
        onChangeText={setOwnerContact}
        style={styles.input}
      />
      <TextInput
        placeholder="Owner Email"
        value={ownerEmail}
        onChangeText={setOwnerEmail}
        style={styles.input}
      />
      <View style={styles.switchContainer}>
      <Text>Is There Any Dispute ?</Text>
      <Switch
      // placeholder="is there any dispute ?"
        value={isLegalDispute}
        onValueChange={setIsLegalDispute}
      /></View>
      <TextInput
        placeholder="Dispute Description"
        value={disputeDesc}
        onChangeText={setDisputeDesc}
        style={styles.input}
      
      />
      <TextInput
      placeholder="Rating count"
      value={ratingCount}
      onChangeText={setRatingCount}
      keyboardType="numeric"
      style={styles.input}
      />
      <TextInput
      placeholder="status"
      value={status}
      onChangeText={setStatus}
      style={styles.input}
   
      />
      <TextInput
        placeholder="Plot Size"
        value={plotSize}
        onChangeText={setPlotSize}
        style={styles.input}
       
      />
      <TextInput
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        style={styles.input}
      
      />
      <TextInput
        placeholder="Total Amount"
        value={totalAmount}
        keyboardType="numeric"
        onChangeText={setTotalAmount}
        style={styles.input}
        
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        
      />

      {/* Address Inputs */}
      <TextInput
        placeholder="Pin Code"
        value={address.pinCode}
        onChangeText={(text) => setAddress({ ...address, pinCode: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="District"
        value={address.district}
        onChangeText={(text) => setAddress({ ...address, district: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Mandal"
        value={address.mandal}
        onChangeText={(text) => setAddress({ ...address, mandal: text })}
      style={styles.input}
      />
      <TextInput
        placeholder="Village"
        value={address.village}
        onChangeText={(text) => setAddress({ ...address, village: text })}
        style={styles.input}
      />

      {/* Amenities */}
      <View style={styles.switchContainer}>
        <Text>Electricity</Text>
        <Switch
          value={isElectricity}
          onValueChange={setIsElectricity}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Water Facility</Text>
        <Switch
          value={isWaterFacility}
          onValueChange={setIsWaterFacility}
          style={styles.switchContainer}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Road Face</Text>
        <Switch
          value={isRoadFace}
          onValueChange={setIsRoadFace}
          style={styles.switchContainer}
        />
      </View>

      {/* Upload Pictures Input */}
      {/* Add your logic to handle uploading pictures here */}
      <TextInput placeholder="comma seperated image urls" value={uploadPics} onChangeText={setUploadPics}/>
    </View>
    </ScrollView>
    </> </>
  );
};

const styles = StyleSheet.create({
  // Changed from 'style' to 'styles'
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
    alignItems: "center", // Center align text inside the container
  },
 
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

});

export default CommercialForm;
