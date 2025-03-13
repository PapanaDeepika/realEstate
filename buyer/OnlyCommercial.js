import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TextInput, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnlyCommercial = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxP, setMaxP] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");

  const [searchTerm,setSearchTerm]=useState()

   const navigation=useNavigation()

  const fetchProperties = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('No token found');
        return;
      }
    const propertyType="commercial"
      const response = await fetch(` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbytype/${propertyType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch data:', response.status);
        return;
      }

      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
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

const getPropertyDetails=(data)=>{
  console.log("Get Property Details")

  navigation.navigate("propertyDetailsBuyer", {propByRoute:data})
    // Propdetails
}

  useEffect(() => {
    fetchProperties();
  }, []);


  const handleSearchChange = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = properties.filter((property) =>
        property.propertyTitle.toLowerCase().includes(text.toLowerCase())
      );
      setProperties(filteredData);
    } else {
      setProperties(properties);
    }
  };
  const getModalSearchDetails=()=>{
    let filteredData=[]
    if(maxP===0)
    {
    setMaxP(minPrice+1)
    }
    if (minPrice&&maxP) {
        filteredData = properties.filter((property) =>
         
        property.propertyDetails.landDetails.sell.price>=minPrice && property.propertyDetails.landDetails.sell.price<maxP ||  property.propertyDetails.landDetails.rent.price>=minPrice && property.propertyDetails.landDetails.rent.price<maxP ||  property.propertyDetails.landDetails.lease.price>=minPrice && property.propertyDetails.landDetails.lease.price<maxP
           

      );
   }
    
   if(sizeValue)
   {
    filteredData = properties.filter((property) =>

      property.propertyDetails.landDetails.sell.plotSize>=sizeValue ||  property.propertyDetails.landDetails.rent.plotSize>=sizeValue||  property.propertyDetails.landDetails.lease.plotSize>=sizeValue  

     );
   }

   setProperties(filteredData);
setModalVisible(!modalVisible)
  }

  const renderProperty = ({ item }) => {
    const { propertyDetails, propertyTitle, rating, uploadPics } = item;
    const imageUrl = item.propertyDetails?.uploadPics?.[0] || 'fallback-image-url'; // Replace with a valid fallback image URL

    return (
       <View style={styles.card}>
              <TouchableOpacity onPress={()=>getPropertyDetails(item)}> 

        <ImageBackground source={{ uri: imageUrl }} style={styles.image} >  
             <Text style={styles.priceTag}> {handlePriceFormat( item?.propertyDetails.landDetails.sell.totalAmount  || item?.propertyDetails.landDetails.rent.rent ||item?.propertyDetails.landDetails.lease.leasePrice) }</Text>
        </ImageBackground>
        <Text style={styles.title}>{propertyTitle} - {item.propertyId}</Text>
        <Text>Owner: {propertyDetails.owner.ownerName}</Text>
        <Text>Contact: {propertyDetails.owner.ownerContact}</Text>
        <Text>Rating: {rating}</Text>
        {item.propertyInterestedCount && (
<Text style={styles.interestedCount}>
People showing interest : {item.propertyInterestedCount}
</Text>
)}
                         </TouchableOpacity>

        {/* <Text style={styles.description}>{propertyDetails.landDetails.description}</Text> */}
      </View>
     );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
       <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={properties}
    //     keyExtractor={(item) => item.propertyId}
    //     renderItem={renderProperty}
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
          data={properties}
          keyExtractor={(item) => item._id}
          renderItem={renderProperty}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>

  );
};

export default OnlyCommercial;

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
    fontFamily:"Montserrat_500Medium",

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
    fontFamily:"Montserrat_500Medium",

    bottom: 0,
    zIndex: 999, // Ensure the modal is on top
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
    fontFamily:"Montserrat_600SemiBold",

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
    fontFamily:"Montserrat_500Medium"

  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginVertical: 10,
    fontFamily:"Montserrat_500Medium"

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
   interestedCount: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily:"Montserrat_500Medium",

    color: "#fff",
    backgroundColor: "#ff5722",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
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
      fontFamily:"Montserrat_500Medium"

    },
});
