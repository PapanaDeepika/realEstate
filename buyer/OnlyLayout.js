import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, Modal, Button, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

const OnlyLayout = () => {
  const [layouts, setLayouts] = useState([]);
    const [loading, setLoading] = useState(true);
  

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
          setLayouts(filteredData);
        } else {
          setLayouts(properties);
        }
      };
    

      const getModalSearchDetails=( )=>{
        let filteredData=[]
        if(maxP===0)
        {
        setMaxP(minPrice+1)
        }
        if (minPrice&&maxP) {
            filteredData = layouts.filter((property) =>
             
              property.layoutDetails.plotPrice>=minPrice && property.layoutDetails.plotPrice<maxP  
               
    
          );
       }
        
       if(sizeValue)
       {
        filteredData = layouts.filter((property) =>
    
          property.layoutDetails.plotSize>=sizeValue  
    
         );
       }
    
       setLayouts(filteredData);
    setModalVisible(!modalVisible)
      }

      const resetFunction = () => {
        setMinPrice("");
        setMaxP("");
        setSizeValue("");
        setSizeUnit("");
        setFilteredProperties(properties);
      };
  // Function to fetch data
  const fetchProperties = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken"); // Get token from AsyncStorage
      if (!token) {
        console.log("Token not found");
        setLoading(false);
        return;
      }
    const propertyType="layout";
      const response = await fetch(
        // const porperty
        ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbytype/${propertyType}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log('the response layouts cmg --> 40 ',data)
      if (response) {
        setLayouts(data);
      } else {
        console.error("Failed to fetch properties:", data.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

//   useEffect(() => {
//     // Fetch data from the API
//     axios.get(' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbytype/layout')
//       .then((response) => {
//         setLayouts(response.data); // Store the data in state
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

  // Render each layout item

  const getPropertyDetails=(data)=>{
    console.log("Get Property Details")
  
    navigation.navigate("propertyDetailsBuyer", {propByRoute:data})
      // Propdetails
  }
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => getPropertyDetails(item)} // Wrap the function call in an anonymous function
    >
      <ImageBackground
        source={{ uri: item.uploadPics[0] }}
        style={styles.image}
        resizeMode="cover"
      >
             <Text style={styles.priceTag}>{handlePriceFormat( item?.layoutDetails.totalAmount)}</Text>
        
      </ImageBackground>
      <View style={styles.info}>
        <Text style={styles.title}>
          {item.layoutDetails.layoutTitle} - {item.propertyId}
        </Text>
        <Text style={styles.description}>{item.layoutDetails.description}</Text>
        <Text style={styles.price}>
          Price: {item.layoutDetails.plotPrice} {item.layoutDetails.priceUnit}
        </Text>
        <Text style={styles.location}>
          Location: {item.layoutDetails.address.village}, {item.layoutDetails.address.district}
        </Text>
        {item.propertyInterestedCount && (
<Text style={styles.highlightedInterestedCount}>
People showing interest on This Property : {item.propertyInterestedCount}
</Text>
)}
      </View>
    </TouchableOpacity>
  );
  

  return (
    // <View style={styles.container}>
    //   <Text style={styles.header}>Available Layouts</Text>
    //   <FlatList
    //     data={layouts}
    //     renderItem={renderItem}
    //     keyExtractor={(item) => item.propertyId}
    //     contentContainerStyle={styles.list}
    //   />
    // </View>


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
                data={layouts}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
  );
};

export default OnlyLayout;

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
    fontFamily:"Montserrat_500Medium",

    marginBottom: 10,
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
    backgroundColor: '#fff',
    fontFamily:"Montserrat_500Medium"

  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
 
  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginVertical: 10,
    fontFamily:"Montserrat_600SemiBold"

  },
  text: {
    fontSize: 14,
    color: '#555',
    fontFamily:"Montserrat_600SemiBold"

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

});
