import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Animated,
  TextInput,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton, useTheme } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton, Text as PaperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// import Modal from 'react-native-paper';

const ResidentialScreen = () => {
  const [residentials, setResidentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownOpen1, setDropDownOpen1] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  //  const [selectedSize,setSelectedSize]=useState("");
  const [filteredResidentials, setFilteredResidentials] = useState([]);
  const [slideAnim] = useState(new Animated.Value(-300));

  const [selectedSize, setSelectedSize] = useState({ min: "", max: "" });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // ---------
  const [type, setType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const navigation = useNavigation();




  useEffect(() => {
    const fetchResidentials = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(
          "http://172.17.15.53:3000/residential/getallresidentials",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setResidentials(data);
        setFilteredResidentials(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch residentials:", error);
        setLoading(false);
      }
    };

    fetchResidentials();
  }, []);

  const applyFilter = () => {
    const filtered = residentials.filter((item) => {
      const sizeMatches =
        selectedSize.min !== "" && selectedSize.max !== ""
          ? item.propertyDetails.flatSize >= parseInt(selectedSize.min) &&
            item.propertyDetails.flatSize <= parseInt(selectedSize.max)
          : true;
      const minPriceMatches = minPrice
        ? item.propertyDetails.totalCost >= parseInt(minPrice)
        : true;
      const maxPriceMatches = maxPrice
        ? item.propertyDetails.totalCost <= parseInt(maxPrice)
        : true;

      const typeMatches = type ? item.propertyDetails.type === type : true;
      const locationMatches = selectedLocation
        ? item.address.district === selectedLocation
        : true;
      return (
        sizeMatches &&
        minPriceMatches &&
        maxPriceMatches &&
        typeMatches &&
        locationMatches
      );
    });

    setFilteredResidentials(filtered);
    toggleFilter();
  };
  const toggleFilter = () => {
    if (filterVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setFilterVisible(false));
    } else {
      setFilterVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderResidentialCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
      <Image source={{ uri: item.propPhotos[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.apartmentName}>
          {item.propertyDetails.apartmentName}
        </Text>
        <Text style={styles.flatCost}>
          Flat Cost: ₹{item.propertyDetails.flatCost}
        </Text>
        <Text style={styles.flatSize}>
          flat Size: {item.propertyDetails.flatSize}
        </Text>
        <Text style={styles.district}>District: {item.address.district}</Text>
      </View>
    </TouchableOpacity>
  );

  

  const handleCardClick = (item) => {
    navigation.navigate("ResidentialDetail", {property_id:item._id});
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <IconButton
            icon="filter"
            style={styles.filterIcon}
            size={24}
            onPress={() => setOpenModal(true)}
          />
          {/* <Ionicons name="filter-outline" style={styles.filterIcon} size={24} color="#fff" /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredResidentials}
        renderItem={renderResidentialCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        numColumns={1} // Single card per row
        showsVerticalScrollIndicator={false}
      />
      <Modal
        visible={openModal}
        animationType="slide"
        onRequestClose={() => setOpenModal(false)}
        // transparent={true}

        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          {/* ---------------custome slider---------------- */}
          {/* <SafeAreaView>
          <CustomSlider min={0} max={Infinity} />
        </SafeAreaView> */}
          {/* ------------------------------------------------------ */}
          <DropDownPicker
            open={dropDownOpen}
            value={selectedSize}
            items={[
              { label: "0-1000 acres", value: { min: 0, max: 1000 } },
              { label: "0-2000 acres", value: { min: 0, max: 2000 } },
              { label: "0-3000 acres", value: { min: 0, max: 3000 } },
              { label: "0-4000 acres", value: { min: 0, max: 4000 } },

              { label: "0-5000 acres", value: { min: 0, max: 5000 } },

              { label: "0-6000 acres", value: { min: 0, max: 6000 } },
              { label: "0-7000 acres", value: { min: 0, max: 7000 } },
              { label: "0-8000 acres", value: { min: 0, max: 8000 } },
              { label: "0-9000 acres", value: { min: 0, max: 9000 } },
              { label: "0-10000 acres", value: { min: 0, max: 10000 } },
            ]}
            setOpen={setDropDownOpen}
            setValue={setSelectedSize}
            onChangeValue={(value) => setSelectedSize(value)}
          />

          {/* {lets use input boxes for the price } */}

          <View style={styles.forpriceview}>
            <TextInput
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="minimum price"
              keyboardType="numeric"
              style={styles.forpriceinput}
            />
            <TextInput
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="maximum price"
              keyboardType="numeric"
              style={styles.forpriceinput}
            />
          </View>
          <DropDownPicker
            open={dropDownOpen1}
            value={selectedLocation}
            items={[
              { label: "Visakhapatnam", value: "Visakhapatnam" },
              { label: "Vizianagaram", value: "Vizianagaram" },
              { label: "Srikakulam", value: "Srikakulam" },
            ]}
            setOpen={setDropDownOpen1}
            setValue={setSelectedLocation}
            onChangeValue={(newValue) => setSelectedLocation(newValue)}
          />

          {/* {for the choose th type (flat or house)} */}
          <Text style={styles.selectionText}>Choose Type Of Property</Text>
          <View style={styles.fortype}>
            <RadioButton.Group
              value={type}
              onValueChange={(newValue) => setType(newValue)}
            >
              <View style={styles.radioContainer}>
                <RadioButton value="Flat" color="blue" />

                <PaperText>Flat</PaperText>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="House" color="blue" />

                <PaperText>House</PaperText>
              </View>
            </RadioButton.Group>
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpenModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // fortype: { padding: 20 },
  // radioContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // selectionText: {
  //   marginTop: 20,
  //   fontSize: 16,
  // },
  filterIcon: {
    marginLeft: 300,
    backgroundColor: "#A3C1DA",
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
  },
  searchBarContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center vertically
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    padding: 15,
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  apartmentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  flatCost: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  flatSize: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  district: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  modalContainer: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "skyblue",
    borderRadius: 20,
    margin: 20,
    marginTop: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  selectionText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  fortype: {
    marginTop: 6,
    marginBottom: 2,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  applyButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#FF4D4D",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  forpriceview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  forpriceinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "48%",
    backgroundColor: "#fff",
  },
});

export default ResidentialScreen;

//  new code from here........

// import React, { useEffect, useState } from "react";
// import DropDownPicker from "react-native-dropdown-picker";

// import {
//   Animated,
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   TextInput,Modal
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { IconButton } from "react-native-paper";

// const ResidentialScreen = () => {
//   const [residentials, setResidentials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigation = useNavigation();
//   const [openModal,setOpenModal]=useState(false);
//   const [slideAnim] = useState(new Animated.Value(-300));
//   const transparent='rgb(0,0,0,0.2)';

//   const [selectedSize,setSelectedSize]=useState("");

//   const [minPrice,setMinPrice]=useState("");
//   const [maxPrice,setMaxPrice]=useState("");

// //   const [dropDownOpen, setDropDownOpen] = useState(false);
// //   const [selectedSize, setSelectedSize] = useState("");
// //   const [filteredFields, setFilteredFields] = useState([]); // State to hold filtered data
//   const [filteredResidentials,setFilteredResidentials]=useState([]);
//   const [dropDownOpen,setDropDownOpen]=useState(false);
//   const [filterVisible,setFilterVisible]=useState(false);

//   useEffect(() => {
//     const fetchResidentials = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           return;
//         }

//         const response = await fetch(
//           "http://172.17.15.53:3000/residential/getallresidentials",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         setResidentials(data);
//         setFilteredResidentials(data); //here------
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch residentials:", error);
//         setLoading(false);
//       }
//     };

//     fetchResidentials();
//   }, []);
//   const toggleFilter = () => {
//     if (filterVisible) {
//       Animated.timing(slideAnim, {
//         toValue: -300,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setFilterVisible(false));
//     } else {
//       setFilterVisible(true);
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const applyFilter=()=>{
//     if(selectedSize){
//       const filtered=residentials.filter((item)=>

//         // selectedSize ? item.propertyDetails.flatSize === parseInt(selectedSize):true
//         // setSelectedSize(selectedSize);

//         item.propertyDetails.flatSize >= selectedSize.min
//         &&
//         item.propertyDetails.flatSize <= selectedSize.max
//    );
//    setFilteredResidentials(filtered);
//     }else{
//       setFilteredResidentials(residentials);
//     }

//    toggleFilter();

//   }

//   const renderResidentialCard = ({ item }) => (
//     <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
//       <Image source={{ uri: item.propPhotos[0] }} style={styles.cardImage} />
//       <View style={styles.cardContent}>
//         <Text style={styles.apartmentName}>
//           {item.propertyDetails.apartmentName || "No Name"}
//         </Text>
//         <Text style={styles.flatCost}>
//           Flat Cost: ₹{item.propertyDetails.flatCost.toLocaleString() || "N/A"}
//         </Text>
//         <Text style={styles.flatSize}>
//           Flat Size: {item.propertyDetails.flatSize} sq. ft.
//         </Text>
//         <Text style={styles.district}>
//           District: {item.address.district || "N/A"}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const handleCardClick = (item) => {
//     navigation.navigate("ResidentialDetail", { id: item._id }); // Navigate to detail screen
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // Filter the residentials based on the search input
// //   const filteredResidentials = residentials.filter((item) =>
// //     item.propertyDetails.apartmentName
// //       .toLowerCase()
// //       .includes(search.toLowerCase())
// //   );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchBarContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search"
//           value={search}
//           onChangeText={setSearch}
//         />
//         <TouchableOpacity onPress={() => setOpenModal(true)}>
//           <IconButton icon="filter" style={styles.filterIcon} size={24} />
//           {/* <Ionicons name="filter-outline" style={styles.filterIcon} size={24} color="#fff" /> */}

//         </TouchableOpacity>
//       </View>

//       {/* Residential Cards */}
//       {/* <FlatList
//         data={filteredResidentials}
//         renderItem={renderResidentialCard}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.list}
//         numColumns={1} // Single card per row
//         showsVerticalScrollIndicator={false}
//       /> */}

//        {/* Field List */}
//        {/* <FlatList
//         data={filteredFields} // Use filtered data for FlatList
//         renderItem={renderResidentialCard}
//         keyExtractor={(item) => item._id}
//       /> */}

//       <FlatList

//       data={filteredResidentials}
//       renderItem={renderResidentialCard}
//       keyExtractor={(item)=>item._id}

//       />

// <Modal
//         visible={openModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setOpenModal(false)}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Filter Options</Text>
//           <DropDownPicker
//             open={dropDownOpen}
//             value={selectedSize}

//             items={[
//               { label: "0-1000 acres", value: {min:0,max:1000} },
//               { label: "0-2000 acres", value: {min:0,max:2000} },
//               { label: "0-3000 acres", value: {min:0,max:3000} },
//               { label: "0-4000 acres", value: {min:0,max:4000} },
//               { label: "0-5000 acres", value: {min:0,max:5000} },
//               { label: "0-6000 acres", value: {min:0,max:6000} },
//               { label: "0-7000 acres", value: {min:0,max:7000} },
//               { label: "0-8000 acres", value: {min:0,max:8000} },
//               { label: "0-9000 acres", value: {min:0,max:9000} },
//               { label: "0-10000 acres", value: {min:0,max:10000} },
//               { label: "0-11000 acres", value: {min:0,max:11000} },

//             ]}
//             setOpen={setDropDownOpen}
//             setValue={setSelectedSize}
//             onChangeValue={(value) => setSelectedSize(value)} //imp----->
//           />

//           <View style={styles.forpriceview}>
//             <TextInput
//             value={minPrice}
//             onChangeText={setMinPrice}
//             placeholder="min value"
//             style={styles.forpriceinput}
//             ></TextInput>

//             <TextInput
//             placeholder="max value"
//             value={maxPrice}
//             onChangeText={setMaxPrice}
//             style={styles.forpriceinput}
//             ></TextInput>

//           </View>

//           {/* {have to keep onPress={applyFilter} in the apply filter } */}
//           <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
//             <Text style={styles.applyButtonText}>Apply Filter</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setOpenModal(false)}
//           >
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({

//       // Updated searchBarContainer style for better alignment and spacing
//   searchBarContainer: {
//     flexDirection: "row", // Align items in a row
//     alignItems: "center", // Center vertically
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     backgroundColor: "#f0f0f0",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     marginBottom: 20,
//   },

//   // Updated searchInput style for a more polished appearance
//   searchInput: {
//     flex: 1, // Take up remaining space
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     color: "#333",
//   },

//   // Style for the filter icon to fit well with the input
//   filterIcon: {
//     marginLeft: 10,
//     backgroundColor: "#A3C1DA",
//     borderRadius: 10,
//     padding: 5,
//     alignSelf: "center",
//   },
// //   container: { flex: 1, padding: 25 },

//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   list: {
//     paddingBottom: 20,
//   },

//   card: {
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     marginVertical: 10,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     width: "100%",
//     padding: 15,
//   },
//   cardImage: {
//     width: "100%",
//     height: 150,
//     resizeMode: "cover",
//     borderRadius: 10,
//   },
//   cardContent: {
//     padding: 10,
//   },
//   apartmentName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   flatCost: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
//   flatSize: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
//   district: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },

//   modalContainer: {
//     // flex: 1,
//     padding: 10,
//     justifyContent: "center",
//     height:305,
//     backgroundColor: "skyblue",
//     marginTop:540,
//     borderRadius:20
//   },
//   modalTitle: { fontSize: 20, marginBottom: 20 },
//   applyButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   applyButtonText: { color: "#fff", textAlign: "center" },
//   closeButton: {
//     marginTop: 10,
//     backgroundColor: "#FF0000",
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: { color: "#fff", textAlign: "center" },
//   forpriceview:{flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10},

//     forpriceinput:{borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 5,
//       padding: 10,
//       width: '48%', // Adjust width to fit side by side
//     }
// });

// export default ResidentialScreen;
