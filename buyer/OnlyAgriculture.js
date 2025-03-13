// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const OnlyAgriculture = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch data
//   const fetchProperties = async () => {
//     try {
//       const token = await AsyncStorage.getItem("userToken"); // Get token from AsyncStorage
//       if (!token) {
//         console.log("Token not found");
//         setLoading(false);
//         return;
//       }
//     const propertyType="agricultural";
//       const response = await fetch(
//         // const porperty
//         ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbytype/${propertyType}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log('the response cmg --> 40 ',data)
//       if (response) {
//         setProperties(data);
//       } else {
//         console.error("Failed to fetch properties:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   // Render each property item
//   const renderProperty = ({ item }) => (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item.landDetails.images[0] }}
//         style={styles.image}
//       />
//       <Text style={styles.title}>
//         {item.landDetails.title} - {item.propertyId}
//       </Text>
//       <Text style={styles.text}>
//         Location: {item.address.villageTe}, {item.address.districtTe}
//       </Text>
//       <Text style={styles.text}>
//         Price: ₹{item.landDetails.totalPrice.toLocaleString("en-IN")}
//       </Text>

//       {item.propertyInterestedCount && (<Text style={styles.interestedCount}>
//                  {item.propertyInterestedCount} no.of people showing interest </Text>)}
      
//       {/* <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Interested</Text>
//       </TouchableOpacity> */}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
        
//       {loading ? (
//         <ActivityIndicator size="large" color="#00f" />
//       ) : (
//         <FlatList
//           data={properties}
//           keyExtractor={(item) => item._id}
//           renderItem={renderProperty}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f5f5f5",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginVertical: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   image: {
//     width: "100%",
//     height: 150,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   text: {
//     fontSize: 14,
//     color: "#333",
//     marginTop: 5,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default OnlyAgriculture;
// ----------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Modal } from "react-native-paper";
// import { Button } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// const OnlyAgriculture = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(""); // State for search term

//   const [minPrice,setMinPrice]=useState("")
//   const [maxP ,setMaxP]=useState("")
//   const [modalVisible,setModalVisible]=useState(false)

//   const [sizeValue,setSizeValue]=useState("")

//   const [sizeUnit,setSizeUnit]=useState("")
//   // Function to fetch data
//   const fetchProperties = async () => {
//     try {
//       const token = await AsyncStorage.getItem("userToken"); // Get token from AsyncStorage
//       if (!token) {
//         console.log("Token not found");
//         setLoading(false);
//         return;
//       }
//       const propertyType = "agricultural";
//       const response = await fetch(
//         ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbytype/${propertyType}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("The response coming --> ", data);
//       if (response) {
//         setProperties(data);
//         setFilteredProperties(data); // Set filtered properties initially to all fetched properties
//       } else {
//         console.error("Failed to fetch properties:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   // Handle search input change
//   const handleSearchChange = (text) => {
//     setSearchTerm(text);

//     if (text) {
//       const filteredData = properties.filter((property) =>
//       // console.log(property.landDetails.title)
//       property.landDetails.title.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredProperties(filteredData);
//     } else {
//       setFilteredProperties(properties); // Reset to all properties if search is cleared
//     }
//   };
//   const resetFunction = () => {
//     // if(land || sizeValue || sizeUnit || maxP || minPrice ){
//     // setLand('');
//     // setSizeValue('');
//     // setSizeUnit('')
//     // setMaxP('')
//     // setMinPrice('0')
//     // setFilteredProperties(properties);
//     // setAppear(true)
   
//     // }
//     // if(resetAppear){
//     // setLand('');
//     // setSizeValue('');
//     // setSizeUnit('')
//     // setMaxP('')
//     // setMinPrice('0')
//     // setFilteredProperties(properties);
//     // setAppear(true)
//     // setResetAppear(false)
//     // }
   
//    }

//   // Render each property item
//   const renderProperty = ({ item }) => (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item.landDetails.images[0] }}
//         style={styles.image}
//       />
//       <Text style={styles.title}>
//       {item.landDetails.title} - {item.propertyId}
//       </Text>
//       <Text style={styles.text}>
//       Location: {item.address.villageTe}, {item.address.districtTe}
//       </Text>
//       <Text style={styles.text}>
//       Price: ₹{item.landDetails.totalPrice.toLocaleString("en-IN")}
//       </Text>

//       {item.propertyInterestedCount && (
//         <Text style={styles.interestedCount}>
//           {item.propertyInterestedCount} no. of people showing interest
//         </Text>
//       )}
//     </View>
//   );
 


//   return (
// //     <View style={styles.container}>
// //       {/* Search Bar */}
// //       <View style={styles.container1}>
// //   <TextInput
// //     style={styles.searchInput}
// //     placeholder="Search properties"
// //     value={searchTerm}
// //     onChangeText={handleSearchChange}
// //   />
// //   <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
// //     <Icon name="filter" size={30} style={styles.filterButton} />
// //   </TouchableOpacity>
// // </View>
// // <Modal
 
// //  animationType="slide"
// //  transparent={true}
// //  visible={modalVisible}
// //  onRequestClose={() => {
// //  Alert.alert('Modal has been closed.');
// //  setModalVisible(!modalVisible);
// //  }}>
// //  <View style={styles.centeredView}>
// //  <View style={styles.modalView}>
 

// // <View style={styles.buttonDirection}>
// // <Button title={'Reset'} onPress={resetFunction} style={{textTransform: 'none',borderRadius:10 
// // }}>

// // </Button>

// // <Button title={"Close"} style={{borderRadius:10}} onPress={() => setModalVisible(!modalVisible)}>

// // </Button>
// // </View>
 
// // <Text style={styles.label1}>{"Price"}  </Text>

// // <View style={{flexDirection:"row", justifyContent: 'space-between',
// //  alignItems: 'center', marginTop:10}}>
// // <TextInput placeholder={ 'Minimum price' } value={minPrice} onChangeText={(value)=>{
// //  setMinPrice(value)
// // }} style={styles.priceInput}/>

// // <TextInput placeholder={ 'Maximum price' } value={maxP} onChangeText={(value)=>{
// //  setMaxP(value)
// // }} style={styles.priceMaxInput} />
// // </View>
// // {/* {maxPrice > 0 && (
// //  <Slider
// //  style={styles.slider}
// //  minimumValue={0}
// //  maximumValue={10000000}
// //  step={1}
// //  value={value}
// //  onValueChange={setValue}
// //  minimumTrackTintColor="#1fb28a"
// //  maximumTrackTintColor="#d3d3d3"
// //  thumbTintColor="#b9e4c9"
// //  />
// //  )}
// //  <Text style={{fontSize:16,
// //  marginBottom:10
// //  }}>Selected price value: {value}</Text> */}

// //  <Text style={styles.label1}>{"Size"} (⌀)</Text>
// //  {/* <Slider
// //  style={{ width: 300, height: 40 }}
// //  minimumValue={0}
// //  maximumValue={maxSize}
// //  step={1}
// //  value={sizeValue}
// //  onValueChange={setSizeValue}
// //  minimumTrackTintColor="#1fb28a"
// //  maximumTrackTintColor="#d3d3d3"
// //  thumbTintColor="#b9e4c9"
// //  /> */}
// // <View style={{flexDirection:"row", justifyContent:'space-between', marginTop:10}}>
// // <TextInput placeholder='Enter size' style={styles.input} value={sizeValue}
// //  onChangeText={setSizeValue}></TextInput>
// //  <View style={styles.pickerWrapper}>
// //  {/* <Picker
// //  selectedValue={sizeUnit}
// //  onValueChange={(selectedValue) => setSizeUnit(selectedValue)}
// //  style={styles.picker}

// //  >
// //  <Picker.Item label={t("Select size unit")} value=" " />

// //  <Picker.Item label={t("Acres")} value="acres" />
// //  <Picker.Item label={t("Sq.feet") }value="sq.ft" />
// //  <Picker.Item label={t("Sq.meters")} value="sq.m" />
// //  <Picker.Item label={t("Sq.yards")} value="sq.yards" />
// //  <Picker.Item label={t("Cents")} value="cents" />

// //  </Picker> */}
// //  </View>
// //  </View>
// // {/* 
// //  <Text style={{fontSize:16,
// //  marginBottom:10
// //  }}>Selected size value: {sizeValue}</Text> */}


// // <View style={[styles.searchheader, {color:'black'}] }>
// //  {/* <Button title='Search' onPress={getModalSearchDetails} style={{ borderRadius:25,
// //  }} color='red'/> */}
// //  {/* <TouchableOpacity style={styles.searchbutton} onPress={getModalSearchDetails}> */}
 
// //  <Text style={styles.resettext}>{"Search"}</Text>
// //  {/* </TouchableOpacity> */}
// // </View>
// //  </View>
// //  </View>
// //  </Modal>

// //       {loading ? (
// //         <ActivityIndicator size="large" color="#00f" />
// //       ) : (
// //         <FlatList
// //           data={filteredProperties}
// //           keyExtractor={(item) => item._id}
// //           renderItem={renderProperty}
// //           showsVerticalScrollIndicator={false}
// //         />
// //       )}
// //     </View>
// <View style={styles.container}>
// {/* Search Bar */}
// <View style={styles.container1}>
//   <TextInput
//     style={styles.searchInput}
//     placeholder="Search properties"
//     value={searchTerm}
//     onChangeText={handleSearchChange}
//   />
//   <TouchableOpacity onPress={() => setModalVisible(true)}>
//     <Icon name="filter" size={30} style={styles.filterButton} />
//   </TouchableOpacity>
// </View>

// {/* Modal for Filter */}
// <Modal
//   animationType="slide"
//   transparent={true}
//   visible={modalVisible}
//   onRequestClose={() => {
//     Alert.alert('Modal has been closed.');
//     setModalVisible(false);
//   }}
// >
//   <View style={styles.overlay}>
//     <View style={styles.modalView}>
//       <Text style={styles.label}>Price</Text>
//       <View style={styles.priceContainer}>
//         <TextInput
//           placeholder="Min Price"
//           value={minPrice}
//           onChangeText={setMinPrice}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Max Price"
//           value={maxP}
//           onChangeText={setMaxP}
//           style={styles.input}
//         />
//       </View>

//       <Text style={styles.label}>Size (⌀)</Text>
//       <View style={styles.sizeContainer}>
//         <TextInput
//           placeholder="Enter size"
//           value={sizeValue}
//           onChangeText={setSizeValue}
//           style={styles.input}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button title="Reset" onPress={resetFunction} color="#888" />
//         {/* <Button title="Search" onPress={getModalSearchDetails} color="#007BFF" /> */}
//         <Button title="Close" onPress={() => setModalVisible(false)} color="#FF0000" />
//       </View>
//     </View>
//   </View>
// </Modal>

// {loading ? (
//   <ActivityIndicator size="large" color="#00f" />
// ) : (
//   <FlatList
//     data={filteredProperties}
//     keyExtractor={(item) => item._id}
//     renderItem={renderProperty}
//     showsVerticalScrollIndicator={false}
//   />
// )}
// </View>
// );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f5f5f5",
//   },
//   searchInput: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginVertical: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   image: {
//     width: "100%",
//     height: 150,
//     borderRadius: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     },
//     modalView: {
//     margin:20,
    
//     width:'90%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//     width: 0,
//     height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     height:"80%",
//     justifyContent:'center'
//     },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   text: {
//     fontSize: 14,
//     color: "#333",
//     marginTop: 5,
//   },
//   interestedCount: {
//     fontSize: 12,
//     color: "#555",
//     marginTop: 10,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },

//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//   },
//   modalView: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   container1: {
//     flexDirection: 'row', // Aligns items horizontally
//     alignItems: 'center', // Vertically aligns items to the center
//     justifyContent: 'space-between', // Optional, if you want to space them out
//     marginHorizontal: 10, // Optional, for some spacing around the container
//   },
//   searchInput: {
//     flex: 1, // Takes up remaining space
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginRight: 10, // Optional, adds space between input and button
//   },
// });


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropertyDetails from '../PropertyDetails';
import { useNavigation } from "@react-navigation/native";
import i18n from '../i18n';

const OnlyAgriculture = () => {

  const navigation=useNavigation()
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [minPrice, setMinPrice] = useState(0);
  const [maxP, setMaxP] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");

  const fetchProperties = async () => {
        try {
          const token = await AsyncStorage.getItem("userToken"); // Get token from AsyncStorage
          if (!token) {
            console.log("Token not found");
            setLoading(false);
            return;
          }
          const propertyType = "agricultural";
          const response = await fetch(
            ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/
property/getpropbytype/${propertyType}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                "Content-Type": "application/json",
              },
            }
          );
    
          const data = await response.json();
          console.log("The response coming --> ", data);
          if (response) {
            setProperties(data);
            setFilteredProperties(data); // Set filtered properties initially to all fetched properties
          } else {
            console.error("Failed to fetch properties:", data.message);
          }
        } catch (error) {
          console.error("Error fetching properties:", error);
        } finally {
          setLoading(false);
        }
      };

      const loadLanguage = async () => {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          i18n.locale = savedLanguage;
        }
      };


  useEffect(() => {
    fetchProperties();
    loadLanguage();
  }, []);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = properties.filter((property) =>
        property.landDetails.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProperties(filteredData);
    } else {
      setFilteredProperties(properties);
    }
  };

  const handlePriceFormat = (price) => {
    if (price >= 10000000) {
      // For crores
      return (price / 10000000).toFixed(2) + ' Cr'; // Crore
    } else if (price >= 100000) {
      // For lakhs
      return (price / 100000).toFixed(2) + ' Lakh'; // Lakh
    } else {
      // For normal INR formatting
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(price);
    }
  }

  const resetFunction = () => {
    setMinPrice("");
    setMaxP("");
    setSizeValue("");
    setSizeUnit("");
    setFilteredProperties(properties);
  };

const getPropertyDetails=(data)=>{
  console.log("Get Property Details")

  navigation.navigate("propertyDetailsBuyer", {propByRoute:data})
    // Propdetails
}

  const renderProperty = ({ item }) => (
  <TouchableOpacity onPress={()=>getPropertyDetails(item)}> 
     <View style={styles.card}>
      <ImageBackground source={{ uri: item.landDetails.images[0] }} style={styles.image} imageStyle={{borderRadius:10}} ><Text style={styles.priceTag}> ₹{handlePriceFormat(item.landDetails.totalPrice)}</Text></ImageBackground>
      <Text style={styles.title}>{item.landDetails.title} - {item.propertyId}</Text>
      <Text style={styles.text}>{i18n.t("Location")}: {item.address.village}, {item.address.district}</Text>
      <Text style={styles.text}>{i18n.t("Size")}:{item.landDetails.size} {item.landDetails.sizeUnit}</Text>

      {item.propertyInterestedCount && (
<Text style={styles.highlightedInterestedCount}>
People showing interest on This Property : {item.propertyInterestedCount}
</Text>
)}
    </View>
    </TouchableOpacity>
  );


  const getModalSearchDetails=()=>{
    let filteredData=[]
    if(maxP===0)
    {
    setMaxP(minPrice+1)
    }
    if (minPrice&&maxP) {
        filteredData = properties.filter((property) =>
        property.landDetails.price>=minPrice && property.landDetails.price<maxP
      );
   }
    
   if(sizeValue)
   {
    filteredData = properties.filter((property) =>
      property.landDetails.size>=sizeValue
    );
   }

   setFilteredProperties(filteredData);
setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.container1}>
        <TextInput
          style={styles.searchInput}
          placeholder={i18n.t("Search properties")}
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={30} style={styles.filterButton} />
        </TouchableOpacity>
      </View>

      {/* Modal for Filter */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.label}>{i18n.t("Price")}</Text>
            <View style={styles.priceContainer}>
              <TextInput
                placeholder={i18n.t("Min Price")}
                value={minPrice}
                onChangeText={setMinPrice}
                style={styles.input}
              />
              <TextInput
                placeholder={i18n.t("Max Price")}
                value={maxP}
                onChangeText={setMaxP}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>{i18n.t("Size")} (⌀)</Text>
               <TextInput
                placeholder="Enter size"
                value={sizeValue}
                onChangeText={setSizeValue}
                style={styles.input}
              />
 
            {/* <View style={styles.pickerWrapper}>
 <Picker
 selectedValue={sizeUnit}
 onValueChange={(selectedValue) => setSizeUnit(selectedValue)}
 
 >
 <Picker.Item label={ "None"} value="None" />

 <Picker.Item label={ "Acres" } value="acres" />
 <Picker.Item label={ "Sq.feet"  }value="sq.ft" />
 <Picker.Item label={ "Sq.meters" } value="sq.m" />
 <Picker.Item label={ "Sq.yards" } value="sq.yards" />
 <Picker.Item label={ "Cents" } value="cents" />

 </Picker>
 </View> */}

            <View style={styles.buttonContainer}>
              <Button title="Reset" onPress={resetFunction} color="#888" />
              <Button title="Search" onPress={getModalSearchDetails} color="#007BFF" />

              <Button title="Close" onPress={() => setModalVisible(false)}  />
            </View>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item._id}
          renderItem={renderProperty}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative', // Add position relative to position the overlay correctly
    fontFamily:"Montserrat_500Medium"

  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily:"Montserrat_500Medium"

  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    fontFamily:"Montserrat_500Medium"

  },
  filterButton: {
    color: '#000',
    fontFamily:"Montserrat_500Medium"

  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    position: 'absolute', // Absolute positioning to overlay on top of content
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Ensure the modal is on top
    fontFamily:"Montserrat_500Medium"

  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    fontFamily:"Montserrat_500Medium"

  },
  label: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:"Montserrat_600SemiBold"

  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    fontFamily:"Montserrat_500Medium"

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    width: '45%',
    marginBottom: 10,
    fontFamily:"Montserrat_500Medium"

  },
  sizeContainer: {
    width: '100%',
    marginBottom: 10,
    fontFamily:"Montserrat_500Medium"

  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    gap: 10,
    fontFamily:"Montserrat_500Medium"

  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    fontFamily:"Montserrat_500Medium",

    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius:20,
    fontFamily:"Montserrat_500Medium"

  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily:"Montserrat_600SemiBold",

    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
    fontFamily:"Montserrat_500Medium"

  },
  interestedCount: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    fontFamily:"Montserrat_500Medium"

  },
  pickerWrapper: {
    height: 40,
    width: 100,
    borderColor: 'black',
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: 'center', // Vertically center the text
    alignItems: 'center', // Horizontally center the text
    fontFamily:"Montserrat_500Medium"

    },
   picker1:{
   width:'100%',
   fontFamily:"Montserrat_500Medium"

   },
   highlightedInterestedCount: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#ff6f61",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 10,
    // fontWeight: "bold",
    fontFamily:"Montserrat_600SemiBold"

    },

    priceTag: {
      position: 'absolute',
      top: 165, // Adjust to position the price tag as you like
      right: 2, // Adjust to position the price tag as you like
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color for contrast
      color: 'white',
      padding: 5,
      borderRadius: 5,
        fontSize: 16,
      // fontWeight: 'bold',
      fontFamily:"Montserrat_600SemiBold"

    },
});

 

export default OnlyAgriculture;
