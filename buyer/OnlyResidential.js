import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const OnlyResidential = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const [minPrice, setMinPrice] = useState(0);
  const [maxP, setMaxP] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");

  const [searchTerm,setSearchTerm]=useState()

  const navigation=useNavigation()

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = properties.filter((property) =>
        property.landDetails.title.toLowerCase().includes(text.toLowerCase())
      );
      setProperties(filteredData);
    } else {
      setProperties(properties);
    }
  };
//   const handlePriceFormat =(price)=>{
//     return Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//       }).format(price);
//  }


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

  const getModalSearchDetails=()=>{
    let filteredData=[]
    if(maxP===0)
    {
    setMaxP(minPrice+1)
    }
    if (minPrice&&maxP) {
        filteredData = properties.filter((property) =>
         
        property.propertyDetails.flatCost>=minPrice && property.propertyDetails.flatCost<maxP  
           

      );
   }
    
   if(sizeValue)
   {
    filteredData = properties.filter((property) =>

      property.propertyDetails.flatSize>=sizeValue  

     );
   }

   setProperties(filteredData);
setModalVisible(!modalVisible)
  }

  const fetchProperties = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }
const propertyType='residential';
      // Fetch property details from the API
      const response = await axios.get(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbytype/${propertyType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  const getPropertyDetails=(data)=>{
    console.log("Get Property Details")
  
    navigation.navigate("propertyDetailsBuyer", {propByRoute:data})
      // Propdetails
  }
  useEffect(() => {
    fetchProperties();
  }, []);

//   const renderProperty = ({ item }) => (
//  <TouchableOpacity onPress={getPropertyDetails}> 
//       <View style={styles.card}>
//       <Image
//         source={{ uri: item.propPhotos[0]   }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <Text style={styles.title}>{item.propertyDetails.apartmentName} - {item.propertyId}</Text>
//       <Text style={styles.subtitle}>Type: {item.propertyDetails.type}</Text>
//       <Text style={styles.subtitle}>Layout: {item.propertyDetails.apartmentLayout}</Text>
//       <Text style={styles.subtitle}>
//         Cost: ₹{item.propertyDetails.totalCost.toLocaleString()}
//       </Text>
//       <Text style={styles.subtitle}>Owner: {item.owner.ownerName}</Text>
//         {item.propertyInterestedCount && (<Text style={styles.interestedCount}>
//                        {item.propertyInterestedCount} no.of people showing interest </Text>)}
            
//     </View>

//     </TouchableOpacity>
//   );


const renderProperty = ({ item }) => (
  <TouchableOpacity onPress={() => getPropertyDetails(item)}> 
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item.propPhotos[0] }}
        style={styles.image}
        resizeMode="cover"
      >
        
             <Text style={styles.priceTag}>{handlePriceFormat( item?.propertyDetails.flatCost)}
              </Text> 
        </ImageBackground>
      <Text style={styles.title}>{item.propertyDetails.apartmentName} - {item.propertyId}</Text>
      <Text style={styles.subtitle}>Type: {item.propertyDetails.type}</Text>
      <Text style={styles.subtitle}>Layout: {item.propertyDetails.apartmentLayout}</Text>
      {/* <Text style={styles.subtitle}>
        Cost: ₹{item.propertyDetails.totalCost.toLocaleString()}
      </Text> */}
      <Text style={styles.subtitle}>Owner: {item.owner.ownerName}</Text>
      {item.propertyInterestedCount && (
<Text style={styles.highlightedInterestedCount}>
People showing interest on This Property : {item.propertyInterestedCount}
</Text>
)}

      
    </View>
  </TouchableOpacity>
);


  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    // <FlatList
    //   data={properties}
    //   keyExtractor={(item) => item.propertyId}
    //   renderItem={renderProperty}
    //   contentContainerStyle={styles.container}
    // />

     <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.container1}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties"
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
              <Text style={styles.label}>Price</Text>
              <View style={styles.priceContainer}>
                <TextInput
                  placeholder="Min Price"
                  value={minPrice}
                  onChangeText={setMinPrice}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Max Price"
                  value={maxP}
                  onChangeText={setMaxP}
                  style={styles.input}
                />
              </View>
  
              <Text style={styles.label}>Size (⌀)</Text>
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
            data={properties}
            keyExtractor={(item) => item._id}
            renderItem={renderProperty}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>


  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 5,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

export default OnlyResidential;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    position: 'relative', // Add position relative to position the overlay correctly
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  filterButton: {
    color: '#000',
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
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    width: '45%',
    marginBottom: 10,
  },
  sizeContainer: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  interestedCount: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  pickerWrapper: {
    height: 40,
    width: 100,
    borderColor: 'black',
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: 'center', // Vertically center the text
    alignItems: 'center', // Horizontally center the text
    },
   picker1:{
   width:'100%'
   },
   highlightedInterestedCount: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#ff6f61",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 10,
    fontWeight: "bold",
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
      fontWeight: 'bold',
    },
})