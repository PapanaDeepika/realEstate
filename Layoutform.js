

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
  Image,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Layoutform = () => {
  // State variables for owner details and layout details
  const [ownerName, setOwnerName] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [layoutTitle, setLayoutTitle] = useState('');
  const [description, setDescription] = useState('');
  const [plotCount, setPlotCount] = useState('');
  const [availablePlots, setAvailablePlots] = useState('');
  const [plotSize, setPlotSize] = useState('');
  const [plotPrice, setPlotPrice] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');

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
  const [images, setImages] = useState('');  // New state for handling image URLs
  const [country,setCountry]=useState('');
  const [state,setState]=useState('');

  // State variable for images
  // const [uploadPics, setUploadPics] = useState([]);

  const apiUrl = 'http://172.17.15.53:3000/layout/insert'; // Replace with your actual API URL

  // Function to handle image selection
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
    };

   
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Retrieve token from storage
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
          plotPrice: Number(plotPrice),
          totalAmount: Number(totalAmount),
          address: {
            country,
            state,
            district,
            mandal,
            village,
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
        },
        uploadPics: images.split(',').map(img => img.trim()),  // Convert comma-separated URLs into an array
      };

      // Send POST request to the API
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in headers
          'Content-Type': 'application/json',
        },
      });

      // Handle success response
      if (response.status === 200) {
        Alert.alert("Success", "Layout details submitted successfully!");
      } 
      
      else {
        Alert.alert("Error", "submit successfull");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit data. Please try again.");
      console.error(error.response?.data || error.message); // Log the error
    }
  };

  return (<>
    <View style={styles.customcontainer}>
      <Text style={styles.stylingtext}>Layout Details</Text>
      {/* <FontAwesomeIcon icon={faSeedling} size="2x" /> */}

    </View>
    <ScrollView>


    <View style={styles.container}>
     
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
      <TextInput
        style={styles.input}
        placeholder="Plot Size (sq ft)"
        value={plotSize}
        onChangeText={setPlotSize}
        keyboardType="numeric"
      />
      <TextInput
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
      />
      <TextInput
      
      style={styles.input}
      placeholder='country'
      value={country}
      onChangeText={setCountry}
      />

      <TextInput
      style={styles.input}
      placeholder='state'
      value={state}
      onChangeText={setState}     
      
      />
      <TextInput
        style={styles.input}
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
      />
      <TextInput
        style={styles.input}
        placeholder="Mandal"
        value={mandal}
        onChangeText={setMandal}
      />
      <TextInput
        style={styles.input}
        placeholder="Village"
        value={village}
        onChangeText={setVillage}
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
        <Switch value={underGroundWater} onValueChange={setUnderGroundWater} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Drainage System</Text>
        <Switch value={drainageSystem} onValueChange={setDrainageSystem} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Electricity Facility</Text>
        <Switch value={electricityFacility} onValueChange={setElectricityFacility} />
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
        onChangeText={text => setMedical(Number(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Educational Facilities (Count)"
        value={String(educational)}
        onChangeText={text => setEducational(Number(text))}
        keyboardType="numeric"
      />

      {/* Image Upload Button */}
      {/* <Button title="Select Images" onPress={selectImage} />
      <View style={styles.imageContainer}>
        {uploadPics.map((pic, index) => (
          <Image
            key={index}
            source={{ uri: `data:image/jpeg;base64,${pic}` }}
            style={styles.image}
          />
        ))}
      </View> */}

      {/* Input for comma-separated image URLs */}
      <TextInput
        placeholder="Images (comma-separated URLs)"
        value={images}
        onChangeText={setImages}
        style={styles.input}
      />

      {/* Submit Button */}
      <Button title="Submit Layout" onPress={handleSubmit} />
     
    </View>
    </ScrollView>
    </> );
};

const styles = StyleSheet.create({
  stylingtext:{
    fontSize:25,
    fontWeight:'bold',
    color:'white'
  },
  customcontainer:{
    padding:70,
    paddingTop:60,
    backgroundColor:'#05223f',
    borderBottomLeftRadius:100,
    borderBottomRightRadius:3
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default Layoutform;


// ----------

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   Switch,
//   ScrollView
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Layoutform = () => {
//   // State variables for owner details and layout details
//   const [ownerName, setOwnerName] = useState('');
//   const [ownerContact, setOwnerContact] = useState('');
//   const [ownerEmail, setOwnerEmail] = useState('');
//   const [layoutTitle, setLayoutTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [plotCount, setPlotCount] = useState('');
//   const [availablePlots, setAvailablePlots] = useState('');
//   const [plotSize, setPlotSize] = useState('');
//   const [plotPrice, setPlotPrice] = useState('');
//   const [totalAmount, setTotalAmount] = useState('');
//   const [district, setDistrict] = useState('');
//   const [mandal, setMandal] = useState('');
//   const [village, setVillage] = useState('');

//   // State variables for layout approvals
//   const [reraRegistered, setReraRegistered] = useState(false);
//   const [dtcpApproved, setDtcpApproved] = useState(false);
//   const [tlpApproved, setTlpApproved] = useState(false);
//   const [flpApproved, setFlpApproved] = useState(false);

//   // State variables for amenities
//   const [underGroundWater, setUnderGroundWater] = useState(false);
//   const [drainageSystem, setDrainageSystem] = useState(false);
//   const [electricityFacility, setElectricityFacility] = useState(false);
//   const [swimmingPool, setSwimmingPool] = useState(false);
//   const [playZone, setPlayZone] = useState(false);
//   const [gym, setGym] = useState(false);
//   const [conventionHall, setConventionHall] = useState(false);
//   const [medical, setMedical] = useState(0);
//   const [educational, setEducational] = useState(0);
//   const [images, setImages] = useState('');  // New state for handling image URLs
//   const [country, setCountry] = useState('');
//   const [state, setState] = useState('');

//   const apiUrl = 'http://172.17.15.53:3000/layout/insert'; // Replace with your actual API URL

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken'); // Retrieve token from storage
//       if (!token) {
//         Alert.alert("Error", "No token found. Please log in again.");
//         return; // Exit if token is not found
//       }

//       // Prepare data to be sent in the request
//       const data = {
//         ownerDetails: {
//           ownerName,
//           ownerContact,
//           ownerEmail,
//         },
//         layoutDetails: {
//           reraRegistered,
//           dtcpApproved,
//           tlpApproved,
//           flpApproved,
//           layoutTitle,
//           description,
//           plotCount: Number(plotCount),
//           availablePlots: Number(availablePlots),
//           plotSize: Number(plotSize),
//           plotPrice: Number(plotPrice),
//           totalAmount: Number(totalAmount),
//           address: {
//             country,
//             state,
//             district,
//             mandal,
//             village,
//           },
//         },
//         amenities: {
//           underGroundWater,
//           drainageSystem,
//           electricityFacility,
//           swimmingPool,
//           playZone,
//           gym,
//           conventionHall,
//           medical,
//           educational,
//         },
//         uploadPics: images.split(',').map(img => img.trim()),  // Convert comma-separated URLs into an array
//       };

//       // Send POST request to the API
//       const response = await axios.post(apiUrl, data, {
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the token in headers
//           'Content-Type': 'application/json',
//         },
//       });

//       // Handle success response
//       if (response.status === 200) {
//         Alert.alert("Success", "Layout details submitted successfully!");
//       } else {
//         Alert.alert("Error", "Submit successful");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to submit data. Please try again.");
//       console.error(error.response?.data || error.message); // Log the error
//     }
//   };

//   return (
//     <>
//       <View style={styles.customcontainer}>
//         <Text style={styles.stylingtext}>Layout Details</Text>
//       </View>
//       <ScrollView>
//         <View style={styles.container}>
//           {/* <Text style={styles.title}>Layout Details</Text> */}

//           {/* Owner Details */}
//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="Owner Name"
//               value={ownerName}
//               onChangeText={setOwnerName}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Owner Contact"
//               value={ownerContact}
//               onChangeText={setOwnerContact}
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="Owner Email"
//               value={ownerEmail}
//               onChangeText={setOwnerEmail}
//               keyboardType="email-address"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Layout Title"
//               value={layoutTitle}
//               onChangeText={setLayoutTitle}
//             />
//           </View>

//           {/* Layout Details */}
//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="Plot Count"
//               value={plotCount}
//               onChangeText={setPlotCount}
//               keyboardType="numeric"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Available Plots"
//               value={availablePlots}
//               onChangeText={setAvailablePlots}
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="Plot Size (sq ft)"
//               value={plotSize}
//               onChangeText={setPlotSize}
//               keyboardType="numeric"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Plot Price"
//               value={plotPrice}
//               onChangeText={setPlotPrice}
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="Total Amount"
//               value={totalAmount}
//               onChangeText={setTotalAmount}
//               keyboardType="numeric"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Country"
//               value={country}
//               onChangeText={setCountry}
//             />
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="State"
//               value={state}
//               onChangeText={setState}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="District"
//               value={district}
//               onChangeText={setDistrict}
//             />
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="Mandal"
//               value={mandal}
//               onChangeText={setMandal}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Village"
//               value={village}
//               onChangeText={setVillage}
//             />
//           </View>

//           {/* Approvals */}
//           <View style={styles.row}>
//             <View style={styles.switchContainer}>
//               <Text>RERA Registered</Text>
//               <Switch value={reraRegistered} onValueChange={setReraRegistered} />
//             </View>
//             <View style={styles.switchContainer}>
//               <Text>DTCP Approved</Text>
//               <Switch value={dtcpApproved} onValueChange={setDtcpApproved} />
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.switchContainer}>
//               <Text>TLP Approved</Text>
//               <Switch value={tlpApproved} onValueChange={setTlpApproved} />
//             </View>
//             <View style={styles.switchContainer}>
//               <Text>FLP Approved</Text>
//               <Switch value={flpApproved} onValueChange={setFlpApproved} />
//             </View>
//           </View>

//           {/* Amenities */}
//           <View style={styles.row}>
//             <View style={styles.switchContainer}>
//               <Text>Under Ground Water</Text>
//               <Switch value={underGroundWater} onValueChange={setUnderGroundWater} />
//             </View>
//             <View style={styles.switchContainer}>
//               <Text>Drainage System</Text>
//               <Switch value={drainageSystem} onValueChange={setDrainageSystem} />
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.switchContainer}>
//               <Text>Electricity Facility</Text>
//               <Switch value={electricityFacility} onValueChange={setElectricityFacility} />
//             </View>
//             <View style={styles.switchContainer}>
//               <Text>Swimming Pool</Text>
//               <Switch value={swimmingPool} onValueChange={setSwimmingPool} />
//             </View>
//           </View>

//           {/* Submit Button */}
//           <Button title="Submit" onPress={handleSubmit} />
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// // Styling
// const styles = StyleSheet.create({
//   stylingtext:{
//         fontSize:25,
//         fontWeight:'bold',
//         color:'white'
//       },
//       customcontainer:{
//         padding:70,
//         paddingTop:60,
//         backgroundColor:'#05223f',
//         borderBottomLeftRadius:100,
//         borderBottomRightRadius:3
//       },
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   switchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginRight: 10,
//   },
// });

// export default Layoutform;
