// import React from "react";
// import {  View, TextInput, Alert ,StyleSheet,Button,ScrollView} from "react-native";
// import { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useState } from "react";
// // import { ScrollView } from "react-native-web";

// const Residentialform = () => {
//   // const [userId, setUserId] = useState('');
//   const [propertyType, setPropertyType] = useState('');
//   const [rating, setRating] = useState(0);
//   const [ratingCount, setRatingCount] = useState(0);
//   const [status, setStatus] = useState(0);

//   // Owner Info
//   const [ownerName, setOwnerName] = useState('');
//   const [ownerEmail, setOwnerEmail] = useState('');
//   const [contact, setContact] = useState('');

//   // Property Details
//   const [type, setType] = useState('');
//   const [apartmentName, setApartmentName] = useState('');
//   const [flatNumber, setFlatNumber] = useState('');
//   const [apartmentLayout, setApartmentLayout] = useState('');
//   const [flatSize, setFlatSize] = useState(0);
//   const [flatCost, setFlatCost] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [flatFacing, setFlatFacing] = useState('');
//   const [furnitured, setFurnitured] = useState('');
//   const [propDesc, setPropDesc] = useState('');

//   // Address
//   const [pincode, setPincode] = useState('');
//   const [country, setCountry] = useState('India');
//   const [state, setState] = useState('Andhra Pradesh');
//   const [district, setDistrict] = useState('');
//   const [mandal, setMandal] = useState('');
//   const [village, setVillage] = useState('');

//   // Amenities
//   const [powerSupply, setPowerSupply] = useState(false);
//   const [waterFacility, setWaterFacility] = useState(false);
//   const [electricityFacility, setElectricityFacility] = useState(false);
//   const [elevator, setElevator] = useState(false);
//   const [watchman, setWatchman] = useState(false);
//   const [cctv, setCctv] = useState(false);
//   const [medical, setMedical] = useState(0);
//   const [educational, setEducational] = useState(0);
//   const [grocery, setGrocery] = useState(0);
//   const [gymFacility, setGymFacility] = useState(false);

//   // Property Photos
//   const [propPhotos, setPropPhotos] = useState([]);

//   // // Configurations
//   // const [bathroomCount, setBathroomCount] = useState(0);
//   // const [balconyCount, setBalconyCount] = useState(0);
//   // const [floorNumber, setFloorNumber] = useState(0);
//   // const [propertyAge, setPropertyAge] = useState(0);
//   // const [maintenanceCost, setMaintenanceCost] = useState(0);
//   // const [visitorParking, setVisitorParking] = useState(false);
//   // const [waterSource, setWaterSource] = useState([]);
//   // const [playZone, setPlayZone] = useState(false);
//   // const [extraAmenities, setExtraAmenities] = useState([]);

//   const apiUrl="http://172.17.15.53:3000/property/insertproprating";

//   const handleSubmit=async()=>{

//     const data = {
//       userId,
//       propertyType,
//       rating,
//       ratingCount,
//       status,
//       owner: {
//         ownerName,
//         ownerEmail,
//         contact: String(contact),
//       },
//       propertyDetails: {
//         type,
//         apartmentName,
//         flatNumber,
//         apartmentLayout,
//         flatSize: Number(flatSize),
//         flatCost: Number(flatCost),
//         totalCost: Number(totalCost),
//         flatFacing,
//         furnitured,
//         propDesc,
//       },
//       address: {
//         pincode,
//         country,
//         state,
//         district,
//         mandal,
//         village,
//       },
//       amenities: {
//         powerSupply,
//         waterFacility,
//         electricityFacility,
//         elevator,
//         watchman,
//         cctv,
//         medical: Number(medical),
//         educational: Number(educational),
//         grocery: Number(grocery),
//         gymFacility,
//       },
//       propPhotos: propPhotos.split(','), // Converts comma-separated URLs into an array
//       // configurations: {
//       //   bathroomCount: Number(bathroomCount),
//       //   balconyCount: Number(balconyCount),
//       //   floorNumber: Number(floorNumber),
//       //   propertyAge: Number(propertyAge),
//       //   maintenanceCost: Number(maintenanceCost),
//       //   visitorParking,
//       //   waterSource: waterSource.split(','), // Converts comma-separated water sources
//       //   playZone,
//       //   extraAmenities: extraAmenities.split(','), // Converts comma-separated amenities
//       // },
//     };
//     // ---

//     try{

//       const token=await AsyncStorage.getItem('userToken');
//       if(!token){
      
//         Alert.alert("token not found","please login again");
//        return;
//       }

//       const response=await axios.post(apiUrl,data,{
//         headers:{
//           'Authorization':`Bearer ${token}`,
//           'Content-Type':'application/json'
//         }

//       })
//       Alert.alert("data submitted succesfully");
//       console.log(response.data);

//     }catch(error){
      
//       Alert.alert("error submitting data please try again");
//       console.error(error.response?.data||error.message);

//     }

//   };
  

//   return (
//     <View>
//       <ScrollView>
//        {/* Owner Section */}
//        <TextInput placeholder="Owner Name" value={ownerName} style={styles.input}onChangeText={setOwnerName} />
//       <TextInput placeholder="Owner Email" value={ownerEmail}style={styles.input} onChangeText={setOwnerEmail} />
//       <TextInput placeholder="Contact Number" value={contact} style={styles.input} onChangeText={setContact} />

//       {/* Property Details  type,
//         apartmentName,
//         flatNumber,
//         apartmentLayout,
//         flatSize: Number(flatSize),
//         flatCost: Number(flatCost),
//         totalCost: Number(totalCost),
//         flatFacing,
//         furnitured,
//         propDesc,*/}
//       {/* <TextInput placeholder="Property Type" value={propertyType} onChangeText={setPropertyType} /> */}
//       {/* <TextInput placeholder="Rating" value={rating} onChangeText={setRating} keyboardType="numeric" /> */}
//       <TextInput placeholder="Apartment Name" value={apartmentName} style={styles.input}  onChangeText={setApartmentName} />
//       <TextInput placeholder="Flat Number" value={flatNumber}style={styles.input}  onChangeText={setFlatNumber} />
//       <TextInput placeholder="apartmentLayout" value={apartmentLayout}style={styles.input}  onChangeText={setApartmentLayout} />
//       <TextInput placeholder="Flat Size" value={flatSize}style={styles.input}  onChangeText={setFlatSize} />
//       <TextInput placeholder="flatCost" value={flatCost} style={styles.input}  onChangeText={setFlatCost} />
//       <TextInput placeholder="totalCost" value={totalCost} style={styles.input} onChangeText={setTotalCost} />
//       <TextInput placeholder="flatFacing" value={flatFacing}style={styles.input}  onChangeText={setFlatFacing} />
//       <TextInput placeholder="furnitured" value={furnitured}style={styles.input}  onChangeText={setFurnitured} />
//       <TextInput placeholder="propDesc" value={propDesc} style={styles.input} onChangeText={setPropDesc} />

//       {/* Continue for all other fields */}
//       {/* { propertyType,
//       rating,
//       ratingCount,
//       status,} */}

//       <TextInput placeholder="Property Type" value={propertyType}style={styles.input}  onChangeText={setPropertyType}/>
//       <TextInput placeholder="Property Type" value={ rating} style={styles.input} onChangeText={setRating}/>
//       <TextInput placeholder="Property Type" value={ratingCount} style={styles.input} onChangeText={setRatingCount}/>
//       <TextInput placeholder="Property Type" value={status} style={styles.input} onChangeText={setStatus}/>

//       {/**pincode,
//         country,
//         state,
//         district,
//         mandal,
//         village, */}

// <TextInput placeholder="pincode" value={pincode} style={styles.input} onChangeText={setPincode}/>
// <TextInput placeholder="country" value={country} style={styles.input} onChangeText={setCountry}/>
// <TextInput placeholder="state" value={state} style={styles.input} onChangeText={setState}/>
// <TextInput placeholder="district" value={district}style={styles.input}  onChangeText={setDistrict}/>
// <TextInput placeholder="mandal" value={mandal} style={styles.input} onChangeText={setMandal}/>
// <TextInput placeholder="village" value={village} style={styles.input} onChangeText={setVillage}/>


// {/**powerSupply,
//         waterFacility,
//         electricityFacility,
//         elevator,
//         watchman,
//         cctv,
//         medical: Number(medical),
//         educational: Number(educational),
//         grocery: Number(grocery),
//         gymFacility, */}

// <TextInput placeholder="power supply" value={powerSupply} style={styles.input} onChangeText={setPowerSupply}/>
// <TextInput placeholder="Water Facility" value={waterFacility} style={styles.input} onChangeText={setWaterFacility}/>
// <TextInput placeholder="Electricity Facility" value={electricityFacility} style={styles.input} onChangeText={setElectricityFacility}/>
// <TextInput placeholder="Elevator" value={elevator} style={styles.input} onChangeText={setElevator}/>
// <TextInput placeholder="Watchman" value={watchman} style={styles.input} onChangeText={setWatchman}/>
// <TextInput placeholder="CCTV facility" value={cctv} style={styles.input} onChangeText={setCctv}/>
// <TextInput placeholder="nearest medical facility" value={medical} style={styles.input} onChangeText={setMedical}/>
// <TextInput placeholder="Educational nearest" value={ educational} style={styles.input} onChangeText={setEducational}/>
// <TextInput placeholder="grocery" value={grocery} style={styles.input}onChangeText={setGrocery}/>
// <TextInput placeholder="Gym facility" value={gymFacility} style={styles.input} onChangeText={setGymFacility}/>
// {/** propPhotos: propPhotos.split(','), */}
// <TextInput placeholder="Enter photos with comma seperated" value={propPhotos} onChangeText={setPropPhotos}/>
//       {/* Submit Button */}
//       <Button title="Submit" onPress={handleSubmit} />

    
    
//       </ScrollView>
//       </View>
//   );
// };
// const styles=StyleSheet.create({
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 1,
//     marginRight: 10,
//     paddingLeft: 10,
//     borderRadius: 5,
//     // Removed shadow properties for clarity
//   }
// });




// -------------- iam getting propertyId required error

import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Button, ScrollView, Text, Switch } from "react-native";
import axios from "axios"; // Make sure to import axios
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResidentialForm = () => {
  // State variables
  // const[propertyId,setPropertyId]=useState('');
  const [propertyType, setPropertyType] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [status, setStatus] = useState(0);

  // Owner Info
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [contact, setContact] = useState('');

  // Property Details
  const [type, setType] = useState('');
  const [apartmentName, setApartmentName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [apartmentLayout, setApartmentLayout] = useState('');
  const [flatSize, setFlatSize] = useState('');
  const [flatCost, setFlatCost] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [flatFacing, setFlatFacing] = useState('');
  const [furnitured, setFurnitured] = useState('');
  const [propDesc, setPropDesc] = useState('');

  // Address
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Andhra Pradesh');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');

  // Amenities
  const [powerSupply, setPowerSupply] = useState(false);
  const [waterFacility, setWaterFacility] = useState(false);
  const [electricityFacility, setElectricityFacility] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [watchman, setWatchman] = useState(false);
  const [cctv, setCctv] = useState(false);
  const [medical, setMedical] = useState(0);
  const [educational, setEducational] = useState(0);
  const [grocery, setGrocery] = useState(0);
  const [gymFacility, setGymFacility] = useState(false);

  // Property Photos
  const [propPhotos, setPropPhotos] = useState('');


  const [bathroomCount, setBathroomCount] = useState(0);
    const [balconyCount, setBalconyCount] = useState(0);
    const [floorNumber, setFloorNumber] = useState(0);
    const [propertyAge, setPropertyAge] = useState(0);
    const [maintenanceCost, setMaintenanceCost] = useState(0);
    const [visitorParking, setVisitorParking] = useState(false);
    const [waterSource, setWaterSource] = useState([]);
    const [playZone, setPlayZone] = useState(false);
    const [extraAmenities, setExtraAmenities] = useState([]);

  const apiUrl = "http://172.17.15.53:3000/residential/add";

  const handleSubmit = async () => {
    const data = {
      // userId,
      // propertyId,

      propertyType,
      rating,
      ratingCount,
      status,
      owner: {
        ownerName,
        ownerEmail,
        contact: String(contact),
      },
      propertyDetails: {
        type,
        apartmentName,
        flatNumber,
        apartmentLayout,
        flatSize: Number(flatSize),
        flatCost: Number(flatCost),
        totalCost: Number(totalCost),
        flatFacing,
        furnitured,
        propDesc,
      },
      address: {
        pincode,
        country,
        state,
        district,
        mandal,
        village,
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
      },
      propPhotos: propPhotos.split(','),
      configurations: {
                bathroomCount: Number(bathroomCount),
                balconyCount: Number(balconyCount),
                floorNumber: Number(floorNumber),
                propertyAge: Number(propertyAge),
                maintenanceCost: Number(maintenanceCost),
                visitorParking,
                waterSource: waterSource.split(','), // Converts comma-separated water sources
                playZone,
                extraAmenities: extraAmenities.split(','), // Converts comma-separated amenities
              },
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Token not found", "Please log in again");
        return;
      }

      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      Alert.alert("Data submitted successfully");
      console.log(response.data);
    } catch (error) {
      Alert.alert("Error submitting data, please try again");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
    <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Residential Details</Text>
      </View>
    <View style={styles.container}>
      <ScrollView>
        {/* Owner Section */}
        <TextInput placeholder="Owner Name" value={ownerName} style={styles.input} onChangeText={setOwnerName} />
        <TextInput placeholder="Owner Email" value={ownerEmail} style={styles.input} onChangeText={setOwnerEmail} />
        <TextInput placeholder="Contact Number" value={contact} style={styles.input} onChangeText={setContact} />
<TextInput placeholder="property type" value={propertyType} style={styles.input} onChangeText={setPropertyType}/>
        {/* Property Details */}
        <TextInput placeholder="type" value={type} onChangeText={setType} style={styles.input}/>
        <TextInput placeholder="Apartment Name" value={apartmentName} style={styles.input} onChangeText={setApartmentName} />
        <TextInput placeholder="Flat Number" value={flatNumber} style={styles.input} onChangeText={setFlatNumber} />
        <TextInput placeholder="Apartment Layout" value={apartmentLayout} style={styles.input} onChangeText={setApartmentLayout} />
        <TextInput placeholder="Flat Size" value={flatSize} keyboardType="numeric" style={styles.input} onChangeText={setFlatSize} />
        <TextInput placeholder="Flat Cost" value={flatCost} keyboardType="numeric" style={styles.input} onChangeText={setFlatCost} />
        <TextInput placeholder="Total Cost" value={totalCost} keyboardType="numeric" style={styles.input} onChangeText={setTotalCost} />
        <TextInput placeholder="Flat Facing" value={flatFacing} style={styles.input} onChangeText={setFlatFacing} />
        <TextInput placeholder="Furnitured" value={furnitured} style={styles.input} onChangeText={setFurnitured} />
        <TextInput placeholder="Property Description" value={propDesc} style={styles.input} onChangeText={setPropDesc} />

        {/* Ratings */}
        <TextInput placeholder="Rating" value={String(rating)} keyboardType="numeric" style={styles.input} onChangeText={text => setRating(Number(text))} />
        <TextInput placeholder="Rating Count" value={String(ratingCount)} keyboardType="numeric" style={styles.input} onChangeText={text => setRatingCount(Number(text))} />
        <TextInput placeholder="Status" value={String(status)} keyboardType="numeric" style={styles.input} onChangeText={text => setStatus(Number(text))} />

        {/* Address Section */}
        <TextInput placeholder="Pincode" value={pincode} style={styles.input} onChangeText={setPincode} />
        <TextInput placeholder="Country" value={country} style={styles.input} onChangeText={setCountry} />
        <TextInput placeholder="State" value={state} style={styles.input} onChangeText={setState} />
        <TextInput placeholder="District" value={district} style={styles.input} onChangeText={setDistrict} />
        <TextInput placeholder="Mandal" value={mandal} style={styles.input} onChangeText={setMandal} />
        <TextInput placeholder="Village" value={village} style={styles.input} onChangeText={setVillage} />

        {/* Amenities Section */}
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Power Supply</Text>
          <Switch value={powerSupply} onValueChange={setPowerSupply} />
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Water Facility</Text>
          <Switch value={waterFacility} onValueChange={setWaterFacility} />
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Electricity Facility</Text>
          <Switch value={electricityFacility} onValueChange={setElectricityFacility} />
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Elevator</Text>
          <Switch value={elevator} onValueChange={setElevator} />
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Watchman</Text>
          <Switch value={watchman} onValueChange={setWatchman} />
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>CCTV Facility</Text>
          <Switch value={cctv} onValueChange={setCctv} />
        </View>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Gym Facility</Text>
          <Switch value={gymFacility} onValueChange={setGymFacility} />
        </View>
        
        {/* Amenities Count */}
        <View style={styles.countContainer}>
          <TextInput placeholder="Nearest Medical Facility" value={medical.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setMedical(Number(text))} />
          <TextInput placeholder="Nearest Educational Facility" value={educational.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setEducational(Number(text))} />
          <TextInput placeholder="Nearest Grocery Facility" value={grocery.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setGrocery(Number(text))} />
        </View>

        {/**porperty add more options
         * 
         * 
         *  bathroomCount: Number(bathroomCount),
                balconyCount: Number(balconyCount),
                floorNumber: Number(floorNumber),
                propertyAge: Number(propertyAge),
                maintenanceCost: Number(maintenanceCost),
                visitorParking,
                waterSource: waterSource.split(','), // Converts comma-separated water sources
                playZone,
                extraAmenities: extraAmenities.split(','), // Converts comma-separated amenities
            
         */}
        <TextInput placeholder="bath room count" value={bathroomCount} keyboardType="numeric" style={styles.countInput} onChangeText={text => setBathroomCount(Number(text))} />
        <TextInput placeholder="balcony count" value={balconyCount.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setBalconyCount(Number(text))} />
        <TextInput placeholder="Floor number" value={floorNumber.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setFloorNumber(Number(text))} />
        <TextInput placeholder="Property Age" value={propertyAge.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setPropertyAge(Number(text))} />
        <TextInput placeholder="maintainence cost" value={maintenanceCost.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setMaintenanceCost(Number(text))} />
        {/* <TextInput placeholder="visitor parking" value={visitorParking} style={styles.input} onChangeText={setVisitorParking} /> */}
        <TextInput placeholder="water source" value={visitorParking} style={styles.input} onChangeText={setWaterSource} />
        <TextInput placeholder="extra amenities" value={extraAmenities} style={styles.input} onChangeText={setExtraAmenities} />

       < View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>visitor parking</Text>
          <Switch value={visitorParking} onValueChange={setVisitorParking} />
        </View>
        < View style={styles.amenitiesContainer}>
          <Text style={styles.switchLabel}>Play Zone</Text>
          <Switch value={playZone} onValueChange={setPlayZone} />
        </View>



        {/* Property Photos 
        
        */}
        <TextInput placeholder="Property Photos (comma separated)" value={propPhotos} style={styles.input} onChangeText={setPropPhotos} />

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
    </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  stylingtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  customcontainer: {
    padding: 70,
    paddingTop: 60,
    backgroundColor: '#05223f',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 3,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  countInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    flex: 1,
    marginRight: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
  },
});

export default ResidentialForm;
// ----------------------------------------


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ResidentialForm = ({ setShowFormType }) => {
//   const [formValues, setFormValues] = useState({
//     ownerName: '',
//     ownerEmail: '',
//     contact: '',
//     propertyType: '',
//     apartmentName: '',
//     apartmentNumber: '',
//     apartmentLayout: '',
//     flatSize: '',
//     flatCost: '',
//     flatFacing: '',
//     furnitured: '',
//     propDesc: '',
//     powerSupply: false,
//     waterFacility: false,
//     electricityFacility: false,
//     elevator: false,
//     watchman: false,
//     cctv: false,
//     gymFacility: false,
//     medical: 0,
//     educational: 0,
//     grocery: 0,
//     bathroomCount: 0,
//     balconyCount: 0,
//     floorNumber: 0,
//     propertyAge: 0,
//     maintenanceCost: 0,
//     visitorParking: false,
//     waterSource: [],
//     playZone: false,
//   });

//   const [addressDetails, setAddressDetails] = useState({
//     country: "India",
//     state: "Andhra Pradesh",
//     district: "",
//     mandal: "",
//     village: "",
//     pincode: "",
//   });
  
//   const [imageUrls, setImageUrls] = useState([]);
//   const [extraAmmenitiesData, setExtraAmmenitiesData] = useState([]);

//   // Function to handle input changes (values) in form fields
//   const handleInputChange = (name, value) => {
//     setFormValues({ ...formValues, [name]: value });
//   };

//   // Function to retrieve token from AsyncStorage
//   const getToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       return token;
//     } catch (e) {
//       console.error('Error retrieving token:', e);
//       return null;
//     }
//   };

//   // Function to handle form submission
//   const onFinish = async () => {
//     let values = formValues;
//     let object = {
//       propertyType: "Residential",
//       rating: 0,
//       ratingCount: 0,
//       status: 0,
//       owner: {
//         ownerName: values.ownerName,
//         ownerEmail: values.ownerEmail || '',
//         contact: values.contact,
//       },
//       propertyDetails: {
//         type: values.propertyType,
//         apartmentName: values.apartmentName,
//         flatNumber: values.apartmentNumber,
//         apartmentLayout: values.apartmentLayout,
//         flatSize: values.flatSize,
//         flatCost: values.flatCost,
//         totalCost: values.flatSize * values.flatCost,
//         flatFacing: values.flatFacing,
//         furnitured: values.furnitured,
//         propDesc: values.propDesc,
//       },
//       amenities: {
//         powerSupply: values.powerSupply || false,
//         waterFacility: values.waterFacility || false,
//         electricityFacility: values.electricityFacility || false,
//         elevator: values.elevator || false,
//         watchman: values.watchman || false,
//         cctv: values.cctv || false,
//         gymFacility: values.gymFacility || false,
//         medical: values.medical || 0,
//         educational: values.educational || 0,
//         grocery: values.grocery || 0,
//       },
//       configurations: {
//         bathroomCount: values.bathroomCount || 0,
//         balconyCount: values.balconyCount || 0,
//         floorNumber: values.floorNumber || 0,
//         propertyAge: values.propertyAge || 0,
//         maintenanceCost: values.maintenanceCost || 0,
//         visitorParking: values.visitorParking || false,
//         waterSource: values.waterSource || [],
//         playZone: values.playZone || false,
//       },
//       propPhotos: imageUrls,
//       address: addressDetails,
//     };

//     const token = await getToken();

//     try {
//       const response = await fetch('https://your-api-endpoint.com/residential/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(object),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', 'Property added successfully!');
//         setShowFormType(null); 
//       } else {
//         throw new Error(data.message || 'Submission failed');
//       }
//     } catch (error) {
//       console.error('Error adding property:', error);
//       Alert.alert('Error', 'Submission failed, please try again.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Residential Property Details</Text>

//       {/* Owner Details */}
//       <Text style={styles.label}>Owner Name:</Text>
//       <TextInput style={styles.input} value={formValues.ownerName} onChangeText={(text) => handleInputChange('ownerName', text)} />

//       <Text style={styles.label}>Owner Email:</Text>
//       <TextInput style={styles.input} value={formValues.ownerEmail} onChangeText={(text) => handleInputChange('ownerEmail', text)} />

//       <Text style={styles.label}>Contact:</Text>
//       <TextInput style={styles.input} value={formValues.contact} onChangeText={(text) => handleInputChange('contact', text)} keyboardType="phone-pad" />

//       {/* Flat Details */}
//       <Text style={styles.label}>Property Type:</Text>
//       <TextInput style={styles.input} value={formValues.propertyType} onChangeText={(text) => handleInputChange('propertyType', text)} />

//       <Text style={styles.label}>Apartment Name:</Text>
//       <TextInput style={styles.input} value={formValues.apartmentName} onChangeText={(text) => handleInputChange('apartmentName', text)} />

//       <Text style={styles.label}>Flat Number:</Text>
//       <TextInput style={styles.input} value={formValues.apartmentNumber} onChangeText={(text) => handleInputChange('apartmentNumber', text)} />

//       <Text style={styles.label}>Flat Size:</Text>
//       <TextInput style={styles.input} value={formValues.flatSize} onChangeText={(text) => handleInputChange('flatSize', text)} keyboardType="numeric" />

//       <Text style={styles.label}>Flat Cost:</Text>
//       <TextInput style={styles.input} value={formValues.flatCost} onChangeText={(text) => handleInputChange('flatCost', text)} keyboardType="numeric" />

//       {/* Address Details */}
//       <Text style={styles.label}>Country:</Text>
//       <TextInput style={styles.input} value={addressDetails.country} editable={false} />

//       <Text style={styles.label}>State:</Text>
//       <TextInput style={styles.input} value={addressDetails.state} editable={false} />

//       <Text style={styles.label}>District:</Text>
//       <TextInput style={styles.input} value={addressDetails.district} onChangeText={(text) => setAddressDetails({ ...addressDetails, district: text })} />

//       <Text style={styles.label}>Mandal:</Text>
//       <TextInput style={styles.input} value={addressDetails.mandal} onChangeText={(text) => setAddressDetails({ ...addressDetails, mandal: text })} />

//       <Text style={styles.label}>Village:</Text>
//       <TextInput style={styles.input} value={addressDetails.village} onChangeText={(text) => setAddressDetails({ ...addressDetails, village: text })} />

//       <Text style={styles.label}>Pincode:</Text>
//       <TextInput style={styles.input} value={addressDetails.pincode} onChangeText={(text) => setAddressDetails({ ...addressDetails, pincode: text })} keyboardType="numeric" />

//       {/* Amenities, Configurations, etc. */}
//       <Text style={styles.label}>Medical:</Text>
//       <TextInput style={styles.input} value={formValues.medical.toString()} onChangeText={(text) => handleInputChange('medical', Number(text))} keyboardType="numeric" />

//       {/* Submit Button */}
//       <TouchableOpacity style={styles.submitButton} onPress={onFinish}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   },
//   submitButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default ResidentialForm;
