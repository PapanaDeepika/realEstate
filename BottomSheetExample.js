import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Switch, StyleSheet, Dimensions } from "react-native";
import { Chip, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
import { BottomSheet } from 'react-native-btr';

export default function BottomSheetExample() {
  console.log("dhdj")
   const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
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
  const navigation = useNavigation();
  const budgetOptions = Array.from({ length: 10 }, (_, i) => ({
    label: i === 9 ? "10+ L" : `${i + 1}K`,
    value: i === 9 ? "10L+" : (i + 1) * 1000,
  }));
  const toggleApproval = (key) => {
    setApprovals((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const theme = useTheme();
  console.log("fdafd", theme)
  const getChipStyle = (isSelected) => ({
    marginRight: 6,
    backgroundColor: isSelected ? theme.colors.primary : "transparent",
    borderColor: "black",
    borderWidth: 1,
    marginVertical:3
  });
  
  const getChipTextColor = (isSelected) => (isSelected ? "white" : "black");
  const handleSearch = async () => {
    try {
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
    
console.log("RESULTS", response.data)

if(response.data && (response.status === 200 || response.status === 201) ){
  navigation.navigate("residentials", { results: response.data });

}


     } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 const toggleBottomSheet = () => {
   setIsBottomSheetVisible(!isBottomSheetVisible);
 };

  return (
  <BottomSheet
    visible={isBottomSheetVisible}
    onBackButtonPress={toggleBottomSheet}
    onBackdropPress={toggleBottomSheet}
    snapPoints={['50%', '80%']} // Or you can use numeric values like [200, 400]
    initialSnapIndex={0}
  >
     <ScrollView style={{ padding: 16 }}>
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

      <Text style={styles.heading}>Furnishing Status</Text>
      <View style={styles.row}>
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

      <Text style={styles.heading}>Approved</Text>
      {["RERA", "FLP", "TLP"].map((item) => (
        <View key={item} style={styles.switchRow}>
          <Text>{item}</Text>
          <Switch value={approvals[item]} onValueChange={() => toggleApproval(item)} />
        </View>
      ))}

      <Button mode="contained" onPress={() => handleSearch()}>
        Search
      </Button>
    </ScrollView>

  </BottomSheet>
  );
}
const styles = StyleSheet.create({
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
