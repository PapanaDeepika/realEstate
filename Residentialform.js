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

// import React, { useState } from "react";
// import { View, TextInput, Alert, StyleSheet, Button, ScrollView, Text, Switch } from "react-native";
// import axios from "axios"; // Make sure to import axios
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ResidentialForm = () => {
//   // State variables
//   // const[propertyId,setPropertyId]=useState('');
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
//   const [flatSize, setFlatSize] = useState('');
//   const [flatCost, setFlatCost] = useState('');
//   const [totalCost, setTotalCost] = useState('');
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
//   const [propPhotos, setPropPhotos] = useState('');


//   const [bathroomCount, setBathroomCount] = useState(0);
//     const [balconyCount, setBalconyCount] = useState(0);
//     const [floorNumber, setFloorNumber] = useState(0);
//     const [propertyAge, setPropertyAge] = useState(0);
//     const [maintenanceCost, setMaintenanceCost] = useState(0);
//     const [visitorParking, setVisitorParking] = useState(false);
//     const [waterSource, setWaterSource] = useState([]);
//     const [playZone, setPlayZone] = useState(false);
//     const [extraAmenities, setExtraAmenities] = useState([]);

//   const apiUrl = "http://172.17.15.53:3000/residential/add";

//   const handleSubmit = async () => {
//     const data = {
//       // userId,
//       // propertyId,

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
//       propPhotos: propPhotos.split(','),
//       configurations: {
//                 bathroomCount: Number(bathroomCount),
//                 balconyCount: Number(balconyCount),
//                 floorNumber: Number(floorNumber),
//                 propertyAge: Number(propertyAge),
//                 maintenanceCost: Number(maintenanceCost),
//                 visitorParking,
//                 waterSource: waterSource.split(','), // Converts comma-separated water sources
//                 playZone,
//                 extraAmenities: extraAmenities.split(','), // Converts comma-separated amenities
//               },
//     };

//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         Alert.alert("Token not found", "Please log in again");
//         return;
//       }

//       const response = await axios.post(apiUrl, data, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       Alert.alert("Data submitted successfully");
//       console.log(response.data);
//     } catch (error) {
//       Alert.alert("Error submitting data, please try again");
//       console.error(error.response?.data || error.message);
//     }
//   };

//   return (
//     <>
//     <View style={styles.customcontainer}>
//         <Text style={styles.stylingtext}>Residential Details</Text>
//       </View>
//     <View style={styles.container}>
//       <ScrollView>
//         {/* Owner Section */}
//         <TextInput placeholder="Owner Name" value={ownerName} style={styles.input} onChangeText={setOwnerName} />
//         <TextInput placeholder="Owner Email" value={ownerEmail} style={styles.input} onChangeText={setOwnerEmail} />
//         <TextInput placeholder="Contact Number" value={contact} style={styles.input} onChangeText={setContact} />
// <TextInput placeholder="property type" value={propertyType} style={styles.input} onChangeText={setPropertyType}/>
//         {/* Property Details */}
//         <TextInput placeholder="type" value={type} onChangeText={setType} style={styles.input}/>
//         <TextInput placeholder="Apartment Name" value={apartmentName} style={styles.input} onChangeText={setApartmentName} />
//         <TextInput placeholder="Flat Number" value={flatNumber} style={styles.input} onChangeText={setFlatNumber} />
//         <TextInput placeholder="Apartment Layout" value={apartmentLayout} style={styles.input} onChangeText={setApartmentLayout} />
//         <TextInput placeholder="Flat Size" value={flatSize} keyboardType="numeric" style={styles.input} onChangeText={setFlatSize} />
//         <TextInput placeholder="Flat Cost" value={flatCost} keyboardType="numeric" style={styles.input} onChangeText={setFlatCost} />
//         <TextInput placeholder="Total Cost" value={totalCost} keyboardType="numeric" style={styles.input} onChangeText={setTotalCost} />
//         <TextInput placeholder="Flat Facing" value={flatFacing} style={styles.input} onChangeText={setFlatFacing} />
//         <TextInput placeholder="Furnitured" value={furnitured} style={styles.input} onChangeText={setFurnitured} />
//         <TextInput placeholder="Property Description" value={propDesc} style={styles.input} onChangeText={setPropDesc} />

//         {/* Ratings */}
//         <TextInput placeholder="Rating" value={String(rating)} keyboardType="numeric" style={styles.input} onChangeText={text => setRating(Number(text))} />
//         <TextInput placeholder="Rating Count" value={String(ratingCount)} keyboardType="numeric" style={styles.input} onChangeText={text => setRatingCount(Number(text))} />
//         <TextInput placeholder="Status" value={String(status)} keyboardType="numeric" style={styles.input} onChangeText={text => setStatus(Number(text))} />

//         {/* Address Section */}
//         <TextInput placeholder="Pincode" value={pincode} style={styles.input} onChangeText={setPincode} />
//         <TextInput placeholder="Country" value={country} style={styles.input} onChangeText={setCountry} />
//         <TextInput placeholder="State" value={state} style={styles.input} onChangeText={setState} />
//         <TextInput placeholder="District" value={district} style={styles.input} onChangeText={setDistrict} />
//         <TextInput placeholder="Mandal" value={mandal} style={styles.input} onChangeText={setMandal} />
//         <TextInput placeholder="Village" value={village} style={styles.input} onChangeText={setVillage} />

//         {/* Amenities Section */}
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Power Supply</Text>
//           <Switch value={powerSupply} onValueChange={setPowerSupply} />
//         </View>
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Water Facility</Text>
//           <Switch value={waterFacility} onValueChange={setWaterFacility} />
//         </View>
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Electricity Facility</Text>
//           <Switch value={electricityFacility} onValueChange={setElectricityFacility} />
//         </View>
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Elevator</Text>
//           <Switch value={elevator} onValueChange={setElevator} />
//         </View>
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Watchman</Text>
//           <Switch value={watchman} onValueChange={setWatchman} />
//         </View>
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>CCTV Facility</Text>
//           <Switch value={cctv} onValueChange={setCctv} />
//         </View>
//         <View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Gym Facility</Text>
//           <Switch value={gymFacility} onValueChange={setGymFacility} />
//         </View>

//         {/* Amenities Count */}
//         <View style={styles.countContainer}>
//           <TextInput placeholder="Nearest Medical Facility" value={medical.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setMedical(Number(text))} />
//           <TextInput placeholder="Nearest Educational Facility" value={educational.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setEducational(Number(text))} />
//           <TextInput placeholder="Nearest Grocery Facility" value={grocery.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setGrocery(Number(text))} />
//         </View>


//         <TextInput placeholder="bath room count" value={bathroomCount} keyboardType="numeric" style={styles.countInput} onChangeText={text => setBathroomCount(Number(text))} />
//         <TextInput placeholder="balcony count" value={balconyCount.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setBalconyCount(Number(text))} />
//         <TextInput placeholder="Floor number" value={floorNumber.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setFloorNumber(Number(text))} />
//         <TextInput placeholder="Property Age" value={propertyAge.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setPropertyAge(Number(text))} />
//         <TextInput placeholder="maintainence cost" value={maintenanceCost.toString()} keyboardType="numeric" style={styles.countInput} onChangeText={text => setMaintenanceCost(Number(text))} />
//         {/* <TextInput placeholder="visitor parking" value={visitorParking} style={styles.input} onChangeText={setVisitorParking} /> */}
//         <TextInput placeholder="water source" value={visitorParking} style={styles.input} onChangeText={setWaterSource} />
//         <TextInput placeholder="extra amenities" value={extraAmenities} style={styles.input} onChangeText={setExtraAmenities} />

//        < View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>visitor parking</Text>
//           <Switch value={visitorParking} onValueChange={setVisitorParking} />
//         </View>
//         < View style={styles.amenitiesContainer}>
//           <Text style={styles.switchLabel}>Play Zone</Text>
//           <Switch value={playZone} onValueChange={setPlayZone} />
//         </View>



//         {/* Property Photos 

//         */}
//         <TextInput placeholder="Property Photos (comma separated)" value={propPhotos} style={styles.input} onChangeText={setPropPhotos} />

//         <Button title="Submit" onPress={handleSubmit} />
//       </ScrollView>
//     </View>
//     </>
//     );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f7f7f7',
//   },
//   input: {
//     height: 40,
//     borderColor: '#000',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   stylingtext: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   customcontainer: {
//     padding: 70,
//     paddingTop: 60,
//     backgroundColor: '#05223f',
//     borderBottomLeftRadius: 100,
//     borderBottomRightRadius: 3,
//   },
//   amenitiesContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   switchLabel: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   countContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   countInput: {
//     height: 40,
//     borderColor: '#000',
//     borderWidth: 1,
//     flex: 1,
//     marginRight: 5,
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   button: {
//     marginTop: 20,
//   },
// });

// export default ResidentialForm;
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  Switch,
} from "react-native";
import axios from "axios"; // Make sure to import axios
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const ResidentialForm = () => {
  // State variables
  // const[propertyId,setPropertyId]=useState('');
  const [propertyType, setPropertyType] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [status, setStatus] = useState(0);

  // Owner Info
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [contact, setContact] = useState("");

  // Property Details
  const [type, setType] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [apartmentLayout, setApartmentLayout] = useState("");
  const [flatSize, setFlatSize] = useState("");
  const [flatCost, setFlatCost] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [flatFacing, setFlatFacing] = useState("");
  const [furnitured, setFurnitured] = useState("");
  const [propDesc, setPropDesc] = useState("");

  // Address
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Andhra Pradesh");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");

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
  const [propPhotos, setPropPhotos] = useState("");
  const [sizeUnit, setSizeUnit] = useState("acres"); // Land size unit
  const [priceUnit, setPriceUnit] = useState("/acre"); // Price unit

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
        sizeUnit,
        flatCost: Number(flatCost),
        priceUnit,
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
        latitude,
        longitude,
        landMark,
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
      propPhotos: propPhotos.split(","),
      configurations: {
        bathroomCount: Number(bathroomCount),
        balconyCount: Number(balconyCount),
        floorNumber: Number(floorNumber),
        propertyAge: Number(propertyAge),
        maintenanceCost: Number(maintenanceCost),
        visitorParking,
        waterSource: waterSource.split(","), // Converts comma-separated water sources
        playZone,
        extraAmenities: extraAmenities.split(","),
      },
    };

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Token not found", "Please log in again");
        return;
      }

      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Alert.alert("Data submitted successfully");
      console.log(response.data);
    } catch (error) {
      Alert.alert("Error submitting data, please try again");
      console.error(error.response?.data || error.message);
    }
  };

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
    else if (priceUnit === "/cent") pricePerAcre *= 100;

    if (!isNaN(sizeInAcres) && !isNaN(pricePerAcre)) {
      setTotalCost((sizeInAcres * pricePerAcre).toFixed(2));
    } else {
      setTotalCost("");
    }
  };

  // Recalculate totalPrice when dependencies change
  useEffect(() => {
    calculateTotalPrice();
  }, [flatSize, flatCost, sizeUnit, priceUnit]);

  return (
    <>
      <View style={styles.customcontainer}>
        <Text style={styles.stylingtext}>Residential Details</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            placeholder="Owner Name"
            value={ownerName}
            style={styles.input}
            onChangeText={setOwnerName}
          />
          <TextInput
            placeholder="Owner Email"
            value={ownerEmail}
            style={styles.input}
            onChangeText={setOwnerEmail}
          />
          <TextInput
            placeholder="Contact Number"
            value={contact}
            style={styles.input}
            onChangeText={setContact}
          />
          <TextInput
            placeholder="property type"
            value={propertyType}
            style={styles.input}
            onChangeText={setPropertyType}
          />
          <TextInput
            placeholder="type"
            value={type}
            onChangeText={setType}
            style={styles.input}
          />
          <TextInput
            placeholder="Apartment Name"
            value={apartmentName}
            style={styles.input}
            onChangeText={setApartmentName}
          />
          <TextInput
            placeholder="Flat Number"
            value={flatNumber}
            style={styles.input}
            onChangeText={setFlatNumber}
          />
          <TextInput
            placeholder="Apartment Layout"
            value={apartmentLayout}
            style={styles.input}
            onChangeText={setApartmentLayout}
          />
          <TextInput
            placeholder="Flat Size"
            value={flatSize}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setFlatSize}
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
          <TextInput
            placeholder="Flat Cost"
            value={flatCost}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setFlatCost}
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
          <Text>Total Price</Text>
          <TextInput
            placeholder="Total Price"
            value={`${totalCost} ${priceUnit}`}
            editable={false}
            style={styles.input}
          />{" "}
          <TextInput
            placeholder="Flat Facing"
            value={flatFacing}
            style={styles.input}
            onChangeText={setFlatFacing}
          />
          <TextInput
            placeholder="Furnitured"
            value={furnitured}
            style={styles.input}
            onChangeText={setFurnitured}
          />
          <TextInput
            placeholder="Property Description"
            value={propDesc}
            style={styles.input}
            onChangeText={setPropDesc}
          />
          <TextInput
            placeholder="Rating"
            value={String(rating)}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setRating(Number(text))}
          />
          <TextInput
            placeholder="Rating Count"
            value={String(ratingCount)}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setRatingCount(Number(text))}
          />
          <TextInput
            placeholder="Status"
            value={String(status)}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setStatus(Number(text))}
          />
          <TextInput
            placeholder="Pincode"
            value={pincode}
            style={styles.input}
            onChangeText={setPincode}
          />
          <TextInput
            placeholder="Country"
            value={country}
            style={styles.input}
            onChangeText={setCountry}
          />
          <TextInput
            placeholder="State"
            value={state}
            style={styles.input}
            onChangeText={setState}
          />
          <TextInput
            placeholder="District"
            value={district}
            style={styles.input}
            onChangeText={setDistrict}
          />
          <TextInput
            placeholder="Mandal"
            value={mandal}
            style={styles.input}
            onChangeText={setMandal}
          />
          <TextInput
            placeholder="Village"
            value={village}
            style={styles.input}
            onChangeText={setVillage}
          />
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
            <Switch
              value={electricityFacility}
              onValueChange={setElectricityFacility}
            />
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
          <View style={styles.countContainer}>
            <TextInput
              placeholder="Nearest Medical Facility"
              value={medical.toString()}
              keyboardType="numeric"
              style={styles.countInput}
              onChangeText={(text) => setMedical(Number(text))}
            />
            <TextInput
              placeholder="Nearest Educational Facility"
              value={educational.toString()}
              keyboardType="numeric"
              style={styles.countInput}
              onChangeText={(text) => setEducational(Number(text))}
            />
            <TextInput
              placeholder="Nearest Grocery Facility"
              value={grocery.toString()}
              keyboardType="numeric"
              style={styles.countInput}
              onChangeText={(text) => setGrocery(Number(text))}
            />
          </View>
          <TextInput
            placeholder="bath room count"
            value={bathroomCount}
            keyboardType="numeric"
            style={styles.countInput}
            onChangeText={(text) => setBathroomCount(Number(text))}
          />
          <TextInput
            placeholder="balcony count"
            value={balconyCount.toString()}
            keyboardType="numeric"
            style={styles.countInput}
            onChangeText={(text) => setBalconyCount(Number(text))}
          />
          <TextInput
            placeholder="Floor number"
            value={floorNumber.toString()}
            keyboardType="numeric"
            style={styles.countInput}
            onChangeText={(text) => setFloorNumber(Number(text))}
          />
          <TextInput
            placeholder="Property Age"
            value={propertyAge.toString()}
            keyboardType="numeric"
            style={styles.countInput}
            onChangeText={(text) => setPropertyAge(Number(text))}
          />
          <TextInput
            placeholder="maintainence cost"
            value={maintenanceCost.toString()}
            keyboardType="numeric"
            style={styles.countInput}
            onChangeText={(text) => setMaintenanceCost(Number(text))}
          />
          <TextInput
            placeholder="water source"
            value={visitorParking}
            style={styles.input}
            onChangeText={setWaterSource}
          />
          <TextInput
            placeholder="extra amenities"
            value={extraAmenities}
            style={styles.input}
            onChangeText={setExtraAmenities}
          />
          <View style={styles.amenitiesContainer}>
            <Text style={styles.switchLabel}>visitor parking</Text>
            <Switch value={visitorParking} onValueChange={setVisitorParking} />
          </View>
          <View style={styles.amenitiesContainer}>
            <Text style={styles.switchLabel}>Play Zone</Text>
            <Switch value={playZone} onValueChange={setPlayZone} />
          </View>
          <TextInput
            placeholder="Property Photos (comma separated)"
            value={propPhotos}
            style={styles.input}
            onChangeText={setPropPhotos}
          />
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
    backgroundColor: "#f7f7f7",
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
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
  amenitiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  countInput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    marginRight: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
  },
});

export default ResidentialForm;





