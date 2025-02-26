import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { View, Modal,Text, TouchableOpacity, SafeAreaView,
   StyleSheet, FlatList, Image, TextInput, RefreshControl, Pressable,Dimensions,Switch,
   ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { LanguageContext } from '../LanguageContext';
  import { jwtDecode } from "jwt-decode";
import { useTheme } from "react-native-paper";
import { Chip, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
import { BottomSheet } from 'react-native-btr';

import axios from 'axios';
function Residentials({route}) {
  const params = route?.params?.params
 

 
const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("");
const [minBudget, setMinBudget] = useState(null);
const [maxBudget, setMaxBudget] = useState(null);
const [bedroom, setBedroom] = useState(null);
const [furnishing, setFurnishing] = useState(null);
const [amenities, setAmenities] = useState([]);
const [area, setArea] = useState("");
const [areaUnit, setAreaUnit] = useState("sqft");
const [approvals, setApprovals] = useState({ RERA: false, FLP: false, TLP: false });
const [roadProximity, setRoadProximity] =useState('')
const [medical, setMedical] = useState('')
const [educational, setEducational] = useState('')
const [facing, setFacing] = useState('')
const [propertyType, setPropertyType] = useState('')


const clearAll =()=> {
  setSelectedCategory('')
  setMaxBudget('')
  setMinBudget('')
  setBedroom('')
  setFurnishing('')
  setAmenities([])
  setArea('')
  setAreaUnit('')
  setRoadProximity('')
  setMedical('')
  setFacing('')
  setEducational('')
  setPropertyType('')
}

const navigation = useNavigation();
const budgetOptions = Array.from({ length: 10 }, (_, i) => ({
 label: i === 9 ? "10+ L" : `${i + 1}K`,
 value: i === 9 ? "10L+" : (i + 1) * 1000,
}));
const toggleApproval = (key) => {
 setApprovals((prev) => ({ ...prev, [key]: !prev[key] }));
};
const theme = useTheme();
 const getChipStyle = (isSelected) => ({
 marginRight: 6,
 backgroundColor: isSelected ? theme.colors.primary : "transparent",
 borderColor: isSelected ? "white" :"black",
 borderWidth: 1,
 marginVertical:3,
 paddingHorizontal:8
});

const getChipTextColor = (isSelected) => (isSelected ? "white" : "black");
const handleSearch = async () => {
 try {
  setLoading(true)

   const apiUrl = "http://172.17.15.189:3000/filterRoutes/residentialSearch";
   
   // Construct amenities object
   const amenitiesObject = {};
   const availableAmenities = {
     "Power Backup": "powerSupply",
     "Parking": "parking",
     "Park": "park",
     "Swimming": "swimming",
     "Lift": "lift",
     "Gym": "gym",
     "Security": "security",
   };

   amenities.forEach((amenity) => {
      if (availableAmenities[amenity]) {
        amenitiesObject[availableAmenities[amenity]] = true;
     }
   });
   let bedroomCount = bedroom ? parseInt(bedroom.split(" ")[0]) || "" : "";

   // Construct dynamic query parameters
   const params = {};


   if (selectedCategory) params.purchaseType = selectedCategory;
   if (furnishing) params.furniture = furnishing;
   if (bedroom) params.propertyLayout = bedroom;
   if (area) params.size = area;
   if (maxBudget) params.price = maxBudget;
   if (roadProximity) params.road = roadProximity;
   if (medical) params.medical = medical;
   if (educational) params.educational = educational;
   if (facing) params.facing = facing;
   if(propertyType) params.propertyType = propertyType;


   if(bedroomCount) params.bedRoom = bedroomCount

   // Adding amenities only if the user selects any
   if (Object.keys(amenitiesObject).length > 0) {
     params.amenities = (amenitiesObject);
   }


   console.log("SEarch paams", params)



    
     const token = await AsyncStorage.getItem('userToken');
     if (!token) {
       console.log('No token found');
       return;
     }
     const decoded = jwtDecode(token);

     

     const response = await axios.get(apiUrl, {
       params,
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
 
 
if(response.data.data && (response.status === 200 || response.status === 201) ){
  console.log("200202020202020200202020202020000000000000000")
 setFilteredProperties(response.data.data)
 setProperties(response.data.data)
 toggleBottomSheet()
 setLoading(false)

}


  } catch (error) {
   console.error("Error fetching data:", error);
 }
};

const toggleBottomSheet = () => {
setIsBottomSheetVisible(!isBottomSheetVisible);
};


   const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
 const { isTelugu } = useContext(LanguageContext);


  const fetchProperties = useCallback(async () => {
    setLoading(true);

     try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      const savedFilters = await AsyncStorage.getItem("searchFiltersResidential");

      console.log("123", JSON.parse(savedFilters))
if(JSON.parse(savedFilters)){
  const parsedFilters = JSON.parse(savedFilters);

  const response = await axios.get("http://172.17.15.189:3000/filterRoutes/residentialSearch", {
    params: parsedFilters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


if(response.data && (response.status === 200 || response.status === 201) ){
setFilteredProperties(response.data.data)
setProperties(response.data.data)
setLoading(false);

}
}
if(!savedFilters){
  const response = await fetch("http://172.17.15.189:3000/residential/getallresidentials", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
   setProperties(data);
  setFilteredProperties(data);
  setLoading(false);
  setRefreshing(false);

}
   

    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("aaaaaaa")
   fetchProperties();
 
    }, [fetchProperties])
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("bbbbbbbbbbbbbb")

  //      if(params)
  //     handleSearch1();
 
  //   }, [params])
  // );


  const handleSearch1=async() => {
try{
          const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.log('No token found');
          return;
        }
        const decoded = jwtDecode(token);
  
        
  
   
        const response = await axios.get("http://172.17.15.189:3000/filterRoutes/residentialSearch", {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
 
if(response.data && (response.status === 200 || response.status === 201) ){
  setFilteredProperties(response.data.data)
  setProperties(response.data.data)
}



}
 catch (error) {
  console.error("Error fetching data:", error);
}
  }
 
  const getSearchDetails = async () => {
    if (searchQuery.trim() === "") {
      setFilteredProperties(properties);
      return;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    console.log("LOWERCASE QUERY", lowercasedQuery);
    const results = properties.filter((prop) => {
        return (
            prop.propertyId?.toLowerCase().includes(lowercasedQuery) ||
            prop.landDetails?.title?.toLowerCase().includes(lowercasedQuery) || 
            prop.layoutDetails?.layoutTitle?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyDetails?.apartmentName?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyTitle?.toLowerCase().includes(lowercasedQuery) ||
            prop.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.address?.state?.toLowerCase().includes(lowercasedQuery) ||
            prop.layoutDetails?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.layoutDetails?.address?.state?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyDetails?.landDetails?.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            prop.propertyDetails?.landDetails?.address?.state?.toLowerCase().includes(lowercasedQuery)
        );
    });

    console.log("SEARCH RESULTS", results);

    setFilteredProperties(results);

  };
  const propertyDetails = (item) => {
    navigation.navigate('Propdetails', { propByRoute: item });
  };
   

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} L`; 
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(1)} K`;
    }
    return price;
  };

  const renderPropertyCard = ({ item }) => (
 <TouchableOpacity style={styles.cardNew} onPress={() => propertyDetails(item)} key={item._id}>
 
    {item.propertyType === "Residential" && (<ImageBackground
     style={styles.imageNew} source ={{uri:  (item.propPhotos	?.length > 0) ? (item.propPhotos	?.[0]) :
     ( "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg")}}>

    <Text style={styles.imageText}>{item.propertyDetails?.apartmentName} @ {item.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.propertyDetails?.flatCost )}</Text>
 
    </ImageBackground>)}
 
    <View style={styles.detailsContainer}>
     <View style={styles.detailsStyles}>
    <Icon name="map-marker" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{ item.address?.district }</Text>
    </View>
    <View style={styles.detailsStyles}>
    <Icon name="ruler" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{  item.propertyDetails?.flatSize } { item.propertyDetails?.sizeUnit }</Text>
    </View>
    </View>
     </TouchableOpacity>

  );

  const filtersScreen =()=> {
// toggleBottomSheet()  
navigation.navigate("as", {type:"residential"})  
  }
 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProperties();
  }, [fetchProperties]);

  return (
    <SafeAreaView style={styles.container}>
            <ScrollView>


            {/* <BottomSheet
    visible={isBottomSheetVisible}
    onBackButtonPress={toggleBottomSheet}
    onBackdropPress={toggleBottomSheet}
    snapPoints={['50%', '80%']} // Or you can use numeric values like [200, 400]
    initialSnapIndex={0}
    style={{}}
  >
     <ScrollView style={{ padding: 16, backgroundColor:"#f5f5f5" }}>
 
      <TouchableOpacity
        onPress={toggleBottomSheet}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10, // Ensures it's above other elements
        }}
      >
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>Looking To</Text>
   
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
      {["rent", "sell"].map((item) => (
  <Chip
    key={item}
    selected={selectedCategory === item}
    onPress={() => setSelectedCategory((prev) => (prev === item ? "" : item))}
    style={getChipStyle(selectedCategory === item)}
    selectedColor={getChipTextColor(selectedCategory === item)}
  >
    {item.charAt(0).toUpperCase() + item.slice(1)}
  </Chip>
))}

      </View>
    

      <Text style={styles.heading}>Budget (₹)</Text>
      <View style={styles.row}>
        <View style={[styles.pickerWrapper, { width: (screenWidth - 40) / 2 }]}>
          <Picker selectedValue={minBudget} onValueChange={setMinBudget} style={styles.picker}>
            <Picker.Item label="Min" value={null} />
            {budgetOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
        <View style={[styles.pickerWrapper, { width: (screenWidth - 40) / 2 }]}>
          <Picker selectedValue={maxBudget} onValueChange={setMaxBudget} style={styles.picker}>
            <Picker.Item label="Max" value={null} />
            {budgetOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>


      <Text style={styles.heading}>Property Type</Text>
      <View style={styles.wrap}>
      {["Flat", "Apartment", "House"].map((item) => (
  <Chip
    key={item}
    selected={propertyType === item}
    onPress={() => setPropertyType((prev) => (prev === item ? null : item))}
    style={getChipStyle(propertyType === item)}
    selectedColor={getChipTextColor(propertyType === item)}
  >
    {item}
  </Chip>
))}
</View>


      <Text style={styles.heading}>No. of Bedrooms</Text>
      <View style={styles.wrap}>
      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map((item) => (
  <Chip
    key={item}
    selected={bedroom === item}
    onPress={() => setBedroom((prev) => (prev === item ? null : item))}
    style={getChipStyle(bedroom === item)}
    selectedColor={getChipTextColor(bedroom === item)}
  >
    {item}
  </Chip>
))}

      </View>


      <Text style={styles.heading}>Facing</Text>
      <View style={styles.wrap}>
      {["North", "South", "East", "West"].map((item) => (
  <Chip
    key={item}
    selected={facing === item}
    onPress={() => setFacing((prev) => (prev === item ? null : item))}
    style={getChipStyle(facing === item)}
    selectedColor={getChipTextColor(facing === item)}
  >
    {item}
  </Chip>
))}

      </View>

      <Text style={styles.heading}>Furnishing Status</Text>
      <View style={styles.wrap}>
      {["Furnished", "Semi-Furnished", "Unfurnished"].map((item) => (
  <Chip
    key={item}
    selected={furnishing === item}
    onPress={() => setFurnishing((prev) => (prev === item ? null : item))}
    style={getChipStyle(furnishing === item)}
    selectedColor={getChipTextColor(furnishing === item)}
  >
    {item}
  </Chip>
))}
      </View>
      <Text style={styles.heading}>Amenities</Text>
      <View style={styles.wrap}>
  {["Parking", "Power Backup", "Park", "Swimming", "Lift", "Gym", "Security"].map((item) => (
    <Chip
      key={item}
      selected={amenities.includes(item)}
      onPress={() =>
        setAmenities((prev) =>
          prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        )
      }
      style={getChipStyle(amenities.includes(item))}
      selectedColor={getChipTextColor(amenities.includes(item))}
    >
      {item}
    </Chip>
  ))}
</View>

      <Text style={styles.heading}>Area</Text>
      <View style={styles.row}>
        <TextInput placeholder="Enter size" style={[styles.input, { width: (screenWidth - 40) / 2 }]} value={area} onChangeText={setArea} />
        <View style={[styles.pickerWrapper, { width: (screenWidth - 40) / 2 }]}>
          <Picker selectedValue={areaUnit} onValueChange={setAreaUnit} style={styles.picker}>
            <Picker.Item label="Select size unit" value=" " />
            <Picker.Item label="Acres" value="acres" />
            <Picker.Item label="Sq. feet" value="sq. ft" />
            <Picker.Item label="Sq. meters" value="sq.m" />
            <Picker.Item label="Sq. yards" value="sq.yards" />
            <Picker.Item label="Cents" value="cents" />
          </Picker>
        </View>
      </View>
     <Text style={styles.heading}>Road Proximity</Text>
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


    <Text style={styles.heading}>Medical Facilities</Text>
<View style={styles.inputGroup}>
      <TextInput
        style={styles.inputMedical}
        placeholder="Enter distance"
      value={medical}
      onChangeText={(value)=>{
        setMedical(value)
      }}
        keyboardType="numeric"

      />
      <Text style={styles.addon}>km</Text>
    </View>

    <Text style={styles.heading}>Educational Institutions</Text>
<View style={styles.inputGroup}>
      <TextInput
        style={styles.inputMedical}
        placeholder="Enter distance"
      value={educational}
      onChangeText={(value)=>{
        setEducational(value)
      }}
        keyboardType="numeric"

      />
      <Text style={styles.addon}>km</Text>
    </View>

      

<View style={{ flexDirection: "row", gap: 10,paddingBottom:30 }}>
 
  <TouchableOpacity
    onPress={() => toggleBottomSheet()}
    style={{ flex: 1, backgroundColor: "red", padding: 12, borderRadius: 8, alignItems: "center" }}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      fetchProperties();
      clearAll();
    }}
    style={{ flex: 1, backgroundColor: "gray", padding: 12, borderRadius: 8, alignItems: "center" }}
  >
    <Text style={{ color: "#fff", fontWeight: "bold" }}>Clear All</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => handleSearch()}
    style={{ flex: 1, backgroundColor: "#007BFF", padding: 12, borderRadius: 8, alignItems: "center" }}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
  </TouchableOpacity>
</View>



    </ScrollView>

  </BottomSheet> */}

      <View style={styles.searchContainer}>
         <TextInput
          placeholder="Search By Property Name, Location..."
          style={styles.searchBox}
          value={searchQuery}
           
          onChangeText={(value) => {
            setSearchQuery(value);
            if (!value) {
                setLoading(true);
                fetchProperties();
                
            }
        }}      returnKeyType='search'
          onSubmitEditing={() => getSearchDetails()}
 
        />
                <TouchableOpacity  onPress={filtersScreen}
                >
                  <Icon name="filter" size={30} style={styles.filterButton} />
                </TouchableOpacity>
      </View>
      <View style={styles.propertyListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
          scrollEnabled={false}
            data={filteredProperties}
            renderItem={renderPropertyCard}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.propertyList}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No properties found</Text>
            }
          />
        )}
      </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
 
  }, 
 
  welcomeContainer:{
    padding:20,
    fontSize:25,
    backgroundColor: '#4184AB',
    color:"white",
    fontStyle:"italic"

  },
  searchContainer: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#4184AB',
     borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginRight: 10,
  },
  
  propertyListContainer: {
    flex: 1,
  },
  propertyList: {
    paddingHorizontal: 15,
  },
 
  propertyDetails: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
  textStyle:{
    paddingVertical:10,
    paddingLeft:20,
    fontSize:25,
  },
  detailsStyles:{
    flexDirection:'row'
      },
      textStyleNew:{
        marginLeft:5,
    fontSize:16,
    fontWeight:"500"
      },
      detailsContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    marginTop:10
      },
      shareIcon: {
        position: 'absolute',
        bottom: 10, // Distance from the bottom of the image
        right: 10, // Distance from the right edge of the image
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional background for better visibility
        borderRadius: 20, // Circular background
        padding: 8, // Space inside the circular background
       },
       imageText:{
        backgroundColor: '#f0f8ff',  
        padding: 10, 
         color: '#000', 
        fontSize: 16,  
        fontWeight: 'bold',  
        textAlign: 'center',  
         borderWidth: 1, 
        borderColor: '#007acc',  
        width:"50%",
        borderBottomRightRadius:60,
        
      },
      imageNew:{
        width:"100%",
        height:200
      },
      cardNew: {
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        paddingVertical:10,
        paddingHorizontal:10
      },
      priceStyle:{
        backgroundColor: 'rgba(173, 216, 230, 0.7)', 
        padding: 10, 
         color: '#000',  
        fontSize: 16,  
        fontWeight: 'bold',  
        textAlign: 'center', 
         borderWidth: 1,  
        borderColor: '#007acc',  
        width:"40%",
       },
       priceBottomStyle:{
        position: 'absolute',
        bottom: 1, // Distance from the bottom of the image
         backgroundColor: '#f0f0f0', // Semi-transparent dark background
        color: '#000', // White text for contrast
        fontSize: 16, // Adjust font size
        fontWeight: 'bold', // Bold text for emphasis
        paddingVertical: 4, // Vertical padding for the text box
        paddingHorizontal: 8, // Horizontal padding for the text box
        },
        filterButton: {
          padding: 5,
          borderColor:"white",
          borderWidth:1,
          borderRadius:5
        },
        heading: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 8,
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          justifyContent: "space-between",
        },
        wrap: {
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 16,
        },
        chip: {
          marginRight: 8,
          marginBottom: 8,
        },
        input: {
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 5,
          height: 40,
        },
        pickerWrapper: {
          height: 40,
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        },
        picker: {
          height: 40,
          width: "100%",
        },
        switchRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        },
        addon: {
          fontSize: 14,
          color: '#333',
          marginLeft: 5,
        },
        inputMedical: {
          flex: 1,
          fontSize: 14,
           
        },
        inputGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 5,
          backgroundColor: '#f5f5f5',
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginBottom: 15,
      
        },
});
export default Residentials;
