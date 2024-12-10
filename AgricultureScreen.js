// import React, { useEffect, useState } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   TextInput,
//    Modal,
//   Animated,
//   ImageBackground,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { IconButton, useTheme } from "react-native-paper";
// import DropDownPicker from "react-native-dropdown-picker";
// import { color } from "react-native-elements/dist/helpers";
// // import { Picker } from "react-native-web";
// import { Picker } from '@react-native-picker/picker';

// const AgricultureScreen = () => {
//   const [fields, setFields] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigation = useNavigation();
//   const theme = useTheme();
//   const [openModal,setOpenModal]=useState(false);
//   const transparent='rgb(0,0,0,0.2)';
//   const {selectedSize,setSelectedSize}=useState('');

//   useEffect(() => {
//     const fetchFields = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           return;
//         }

//         const response = await fetch(
//           "http://172.17.15.53:3000/fields/getallfields",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         console.log(data);
//         setFields(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch fields:", error);
//         setLoading(false);
//       }
//     };

//     fetchFields();
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

//   const applyFilter = (selectedOptions) => {
//     // Apply filter logic here based on selectedOptions
//     // Example: setFields(filteredFields);
//     toggleFilter();
//   };

//   const renderFieldCard = ({ item }) => (
//     <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
//       <Image
//         source={{ uri: item.landDetails.images[0] }}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />
//       <View style={styles.priceTag}>
//         <Text style={styles.priceText}>
//           ₹{item.landDetails.totalPrice.toLocaleString() || "N/A"}
//         </Text>
//       </View>
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>
//           {item.landDetails.title || "No Title"}
//         </Text>
//         <Text style={styles.cardSize}>Size: {item.landDetails.size} acres</Text>
//         <Text style={styles.cardLocation}>
//           {item.address.district || "N/A"}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const handleCardClick = (item) => {
//     navigation.navigate("AgricultureDetail", { id: item._id });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>

//       {/* Search Bar */}
//       <View style={styles.searchBarContainer}>
//         <ImageBackground
//           source={{
//             uri: "data:image/jpeg;base64,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",
//           }}
//           style={styles.searchBackground}
//           imageStyle={{ borderRadius: 10 }}
//         >
//           <TextInput
//             style={styles.searchInput}
//             placeholder="choose filters"
//             placeholderTextColor="#fff"
//             value={search}
//             onChangeText={(text) => setSearch(text)}
//           />

//           <IconButton
//             icon="filter" // Changed icon name
//             backgroundColor="white"

//             size={24}
//             style={styles.filtericon}
//             onPress={() => setOpenModal(true)}
//           />

//         </ImageBackground>
//         {/* <Modal
//         visible={openModal}
//         animationType="slide"
//         transparent={true}

//         style={styles.a}
//         >

//              <View style={styles.a}>
//                 <View style={styles.b}>

//                   <Text style={styles.modalhead}>Filter Your Search</Text>

//                 </View>
//                 <View style={styles.applycolor}></View>

//                 <TouchableOpacity style={styles.cardTitle1}onPress={()=>setOpenModal(false)}>
//                     <View>
//                         <Text style={styles.c}>close modal</Text>
//                     </View>
//                 </TouchableOpacity>

//             </View>
//         </Modal> */}

// <Modal
//     visible={openModal}
//     animationType="slide"
//     transparent={true}
// >
//     <View style={styles.modalContainer}>
//         <View style={styles.header}>
//             <Text style={styles.modalHead}>Filter Your Search</Text>
//             <TouchableOpacity style={styles.closeButton} onPress={() => setOpenModal(false)}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//         </View>

//         {/* Apply filter button */}
//         <TouchableOpacity style={styles.applyButton} onPress={() => {/* Apply filter logic */}}>
//             <Text style={styles.applyButtonText}>Apply Filters</Text>
//         </TouchableOpacity>

//         <View style={styles.content}>
//             <Text >Size : </Text>
//             <Picker
//             selectedValue={selectedSize}
//             style={styles.picker}
//             onValueChange={(itemValue)=>setSelectedSize(itemValue)}

//             >
//               <Picker.Item label="select value" value=""/>
//               <Picker.Item label="min "value="100"/>
//               <Picker.Item label="min"value="90"/>

//               <Picker.Item label="min"value="200"/>

//               <Picker.Item label="min" value="50"/>

//             </Picker>

//         </View>
//     </View>
// </Modal>

//       </View>

//       <FlatList
//         data={fields}
//         renderItem={renderFieldCard}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.list}
//         numColumns={1}
//         showsVerticalScrollIndicator={false}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({

//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
//     padding: 20,
//     // backgroundColor:"violet"
// },
// header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "black",
//     width: "100%",
//     padding: 15,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
// },
// modalHead: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "red",
// },
// closeButton: {
//     padding: 10,
// },
// closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
// },
// applyButton: {
//     padding: 15,
//     backgroundColor: "red",
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 20,
//     width: "100%",
// },
// applyButtonText: {
//     color: "white",
//     fontWeight: "bold",
// },
// content: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "100%",
//     minHeight: 100, // Minimum height for content
// },
// applycolor: {
//     backgroundColor: "red",
// },
// picker: {
//   height: 50,
//   width: 150,
// },

// // -----
//   applycolor:{
//     backgroundColor:"red"
//   },
//   size:{

//     color:"black",
//     backgroundColor:"red"

//   },
//     a: {
//         padding: 200,
//         marginTop: 500,
//         backgroundColor: "white",
//     },
//     b: {
//         marginTop: 20,
//         top: -220,
//         left: -299,
//         alignContent: "space-evenly",
//         alignItems: "center",
//         width: 550,
//         height: 50,
//         borderRadius: 10,
//         backgroundColor: "black",
//         paddingBottom:20
//     },
//     modalhead: {
//         marginTop: 15,
//         marginLeft: 2,
//         fontWeight: "bold",
//         color: "red",
//         textAlign: "center",
//     },
//     buttonContainer: {
//         flexDirection: "row",       // Arrange buttons horizontally
//         justifyContent: "space-between", // Space them apart
//         marginTop: 20,              // Adjust for placement within the modal
//         paddingHorizontal: 20,      // Add spacing on the sides if needed
//     },
//     cardTitle1: {
//         // Button style for Close Modal
//         padding: 10,
//         backgroundColor: "lightgray",
//         borderRadius: 5,
//         alignItems: "center",
//     },
//     applyButton: {
//         // Button style for Apply All Filters
//         padding: 10,
//         backgroundColor: "lightgray",
//         borderRadius: 5,
//         alignItems: "center",
//     },
//     c: {
//         color: "black",
//         fontWeight: "bold",
//         width:700

//     },
//     filtericon:{

//         marginLeft:20

//     },
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
//   searchBarContainer: {
//     flexDirection:"row",
//     alignItems:"centre",
//     marginBottom: 20,
//     marginTop: 90,
//   },
//   searchBackground: {

//     flexDirection:"row",

//     // alignItems:"centre",
//     width:400,
//     height:90,
//     padding: 20,
//     alignItems:"centre",
//     borderRadius: 20,
//     marginRight:90,
//     borderWidth: 5,
//     borderColor: "#ccc",
//     overflow: "hidden",
//   },
//   searchInput: {
//     fontSize: 19,
//     color: "#fff",
//     fontWeight:"bold"
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     marginBottom: 18,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   cardImage: {
//     height: 150,
//     width: "100%",
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   priceTag: {
//     position: "absolute",
//     top: 0,
//     right: 260,
//     backgroundColor: "#329da8",
//     padding: 8,
//     borderRadius: 5,
//   },
//   priceText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   cardContent: {
//     padding: 10,
//   },
//   cardTitle: {
//     fontWeight: "bold",
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   cardSize: {
//     color: "#555",
//     marginBottom: -18,
//   },
//   cardLocation: {
//     color: "#777",
//     fontSize: 14,
//     left: 200,
//   },
// });

// export default AgricultureScreen;

// ---------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";

// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Modal,
//   Animated,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { IconButton } from "react-native-paper";
// import DropDownPicker from "react-native-dropdown-picker";

// const AgricultureScreen = () => {
//   const [fields, setFields] = useState([]);
//   const [filteredFields, setFilteredFields] = useState([]); // State to hold filtered data
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigation = useNavigation();
//   const [openModal, setOpenModal] = useState(false);
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [slideAnim] = useState(new Animated.Value(-300));
//   const [selectedSize, setSelectedSize] = useState("");
//   const [dropDownOpen, setDropDownOpen] = useState(false);
//   const transparent='rgb(0,0,0,0.2)';

//   useEffect(() => {
//     const fetchFields = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           return;
//         }

//         const response = await fetch(
//           "http://172.17.15.53:3000/fields/getallfields",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         console.log(data);
//         setFields(data.data);
//         setFilteredFields(data.data); // Initialize with full data set
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch fields:", error);
//         setLoading(false);
//       }
//     };

//     fetchFields();
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

//   const applyFilter = () => {
//     // Filter fields based on selectedSize
//     if(selectedSize){
//       const filtered = fields.filter((item) =>
//         // selectedSize ? item.landDetails.size === parseInt(selectedSize) : true
//       item.landDetails.size >= selectedSize.min
//       &&
//       item.landDetails.size <= selectedSize.max
//       );
//       setFilteredFields(filtered); // Update the filteredFields state

//     }
//     else{
//       setFilteredFields(fields);
//     }
//     toggleFilter();
//   };

//   const renderFieldCard = ({ item }) => (
//     <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
//       <Image
//         source={{ uri: item.landDetails.images[0] }}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />
//       <View style={styles.priceTag}>
//         <Text style={styles.priceText}>
//           ₹{item.landDetails.totalPrice.toLocaleString() || "N/A"}
//         </Text>
//       </View>
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>
//           {item.landDetails.title || "No Title"}
//         </Text>
//         <Text style={styles.cardSize}>Size: {item.landDetails.size} acres</Text>
//         <Text style={styles.cardLocation}>
//           {item.address.district || "N/A"}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const handleCardClick = (item) => {
//     navigation.navigate("AgricultureDetail", { id: item._id });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

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

//       {/* Field List */}
//       <FlatList
//         data={filteredFields} // Use filtered data for FlatList
//         renderItem={renderFieldCard}
//         keyExtractor={(item) => item._id}
//       />

//       {/* Modal for Filter Options */}
//       <Modal
//         visible={openModal}
//         animationType="slide"
//         onRequestClose={() => setOpenModal(false)}
//         // transparent={true}

//         transparent={true}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Filter Options</Text>
//           <DropDownPicker
//             open={dropDownOpen}
//             value={selectedSize}
//             items={[
//               { label: "0-10 acres", value: {min:0,max:10} },
//               { label: "0-20 acres", value:{min:0,max:20} },
//               { label: "0-30 acres", value: {min:0,max:30}},
//             ]}
//             setOpen={setDropDownOpen}
//             setValue={setSelectedSize}
//             onChangeValue={(value) => setSelectedSize(value)}
//           />

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
//   // Updated searchBarContainer style for better alignment and spacing
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
//   container: { flex: 1, padding: 25 },
//   // searchBarContainer: { marginBottom: 20,height:70, backgroundColor:"#A3C1DA",padding:5, borderRadius:10},
//   // searchInput: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 5, width:300 ,marginTop:5,marginLeft:15,},
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: { marginBottom: 20, borderRadius: 10, overflow: "hidden" },
//   cardImage: { width: "100%", height: 150 },
//   priceTag: { position: "absolute", bottom: 10, left: 10 },
//   priceText: { color: "#fff", fontWeight: "bold" },
//   cardContent: { padding: 10 },
//   cardTitle: { fontSize: 16, fontWeight: "bold" },
//   cardSize: { fontSize: 14 },
//   cardLocation: { fontSize: 12, color: "#777" },
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
// });

// export default AgricultureScreen;
// -----------------------------------------------------------------------------
// import RangeSlider from "react-native-range-slider";
// import RangeSlider from "react-native-range-slider-expo";
// import CustomSlider from "./CustomSlider";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Animated,
} from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
// import Slider from '@react-native-community/slider'; // Make sure this is installed

const AgricultureScreen = () => {
  const [fields, setFields] = useState([]);
  const [filteredFields, setFilteredFields] = useState([]); // State to hold filtered data
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-300));
  // const [selectedSize, setSelectedSize] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownOpen1, setDropDownOpen1] = useState(false);

  const transparent = "rgb(0,0,0,0.2)";
  // const [minPrice,setMinPrice]=useState('0');
  // const [maxPrice,setMaxPrice]= useState(Infinity);
  

  const [selectedSize, setSelectedSize] = useState({ min: "", max: "" });
  const [minPrice, setMinPrice] = useState(""); // State for minimum price
  const [maxPrice, setMaxPrice] = useState(""); // State for maximum price
  const [selectedLocation,setSelectedLocation]=useState("");

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(
          "http://172.17.15.53:3000/fields/getallfields",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setFields(data.data);
        setFilteredFields(data.data); // Initialize with full data set
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch fields:", error);
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

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

  const applyFilter = () => {
    const filtered = fields.filter((item) => {
      const sizeMatches =
        selectedSize.min !== "" && selectedSize.max !== ""
          ? item.landDetails.size >= parseInt(selectedSize.min) &&
            item.landDetails.size <= parseInt(selectedSize.max)
          : true; // If no size filter, consider it as a match

      const minPriceMatches = minPrice ? item.landDetails.totalPrice >= parseInt(minPrice) : true;
      const maxPriceMatches = maxPrice ? item.landDetails.totalPrice <= parseInt(maxPrice) : true;
      const locationMatches = selectedLocation ? item.address.district === selectedLocation : true;
      return sizeMatches && minPriceMatches && maxPriceMatches && locationMatches;
    });

    setFilteredFields(filtered);
    toggleFilter();
  };

  const renderFieldCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
      <Image
        source={{ uri: item.landDetails.images[0] }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      {/* <View style={styles.priceTag}>
        <Text style={styles.priceText}>
          ₹{item.landDetails.totalPrice.toLocaleString() || "N/A"}
        </Text>
      </View> */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.landDetails.title || "No Title"}
        </Text>
        <Text style={styles.cardSize}>Size: {item.landDetails.size} acres</Text>
        <Text  style={styles.cardSize}>Total Price: ₹{item.landDetails.totalPrice}</Text>
        <Text style={styles.cardLocation}> Location :
          {item.address.district || "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // const handleCardClick = (item) => {
  //   navigation.navigate("AgriEachCard", { item:_id });
  // };
 {/* <View></View> */}
 
  const handleCardClick = (item) => {
    navigation.navigate("AgricultureDetail", { property_id: item._id });
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
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <IconButton icon="filter" style={styles.filterIcon} size={24} />
          {/* <Ionicons name="filter-outline" style={styles.filterIcon} size={24} color="#fff" /> */}
        </TouchableOpacity>
      </View>

      {/* Field List */}
      <FlatList
        data={filteredFields} // Use filtered data for FlatList
        renderItem={renderFieldCard}
        keyExtractor={(item) => item._id}
      />

      {/* Modal for Filter Options */}
      <Modal
        visible={openModal}
        animationType="slide"
        onRequestClose={() => setOpenModal(false)}
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
              { label: "0-10 acres", value: { min: 0, max: 10 } },
              { label: "0-20 acres", value: { min: 0, max: 20 } },
              { label: "0-30 acres", value: { min: 0, max: 30 } },
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
              style={styles.forpriceinput}/>
              <TextInput
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="maximum price"
              keyboardType="numeric"
              style={styles.forpriceinput}/>
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
  // Updated searchBarContainer style for better alignment and spacing
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

  // Updated searchInput style for a more polished appearance
  searchInput: {
    flex: 1, // Take up remaining space
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },

  // Style for the filter icon to fit well with the input
  filterIcon: {
    marginLeft: 10,
    backgroundColor: "#A3C1DA",
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
  },
  container: { flex: 1, padding: 25,backgroundColor:"#E6E6FA" },
  // searchBarContainer: { marginBottom: 20,height:70, backgroundColor:"#A3C1DA",padding:5, borderRadius:10},
  // searchInput: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 5, width:300 ,marginTop:5,marginLeft:15,},
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { marginBottom: 20, borderRadius: 20, overflow: "hidden",backgroundColor:"#A3C1DA" },
  cardImage: { width: "100%", height: 150 },
  priceTag: { position: "absolute", bottom: 10, left: 10 },
  priceText: { color: "#fff", fontWeight: "bold" },
  cardContent: { padding: 10,backgroundColor:"white" },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardSize: { fontSize: 14 },
  cardLocation: {  fontWeight:"bold",fontSize: 12, color: "black" },
  modalContainer: {
    // padding: 10,
    // justifyContent: "center",
    // height: 305,
    // backgroundColor: "skyblue",
    // marginTop: 580,
    // borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "skyblue",
    borderRadius: 20,
    margin: 20,
    marginTop: 540,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, marginBottom: 20,textAlign:"center",fontWeight:"bold",marginTop:10 },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  applyButtonText: { color: "#fff", textAlign: "center" },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: { color: "#fff", textAlign: "center" },

  forpriceview:{flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,},
    forpriceinput:{borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      width: '48%', // Adjust width to fit side by side
    }
});

export default AgricultureScreen;
