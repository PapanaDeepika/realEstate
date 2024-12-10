// import React, { useEffect, useState } from "react";
// import { IconButton, Icon, useTheme } from "react-native-paper";
// // import Modal from "react-native-paper";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Image,
//   FlatList,
//   Modal,Animated,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import DropDownPicker from "react-native-dropdown-picker";
// import { Checkbox } from 'react-native-paper';

// const CommercialScreen = () => {
//   const [commercials, setCommercials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [openModal, setOpenModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [slideAnim] = useState(new Animated.Value(-300));
//   const [dropDownOpen, setDropDownOpen] = useState(false);
//   const transparent = "rgb(0,0,0,0.2)";

//   const [selectedSize, setSelectedSize] = useState({ min: "", max: "" });
//   const [minPrice, setMinPrice] = useState(""); // State for minimum price
//   const [maxPrice, setMaxPrice] = useState(""); // State for maximum price
//   const [filteredCommercials, setFilteredCommercials] = useState([]); // State to hold filtered data

//    // State for multi-select checkboxes
//    const [isSellChecked, setIsSellChecked] = useState(false);
//    const [isRentChecked, setIsRentChecked] = useState(false);
//    const [isLeaseChecked, setIsLeaseChecked] = useState(false);
 
 
 
//   useEffect(() => {
//     const fetchCommercials = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           return;
//         }

//         const response = await fetch(
//           "http://172.17.15.53:3000/commercials/getallcommercials",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         setCommercials(data);
//         setFilteredCommercials(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch commercials:", error);
//         setLoading(false);
//       }
//     };

//     fetchCommercials();
//   }, []);
//   // function renderModal() {
//   //   <Modal visible={openModal} animationType="slide">
//   //     <View>
//   //       <Text>open modal</Text>
//   //     </View>
//   //   </Modal>;

//   // }
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
// //applyfilter
//   // { it works for remaining condition not for the commercial as seel,rent,lease were there   }

//   // const applyFilter = () => {
//   //   const filtered = commercials.filter((item) => {
//   //     const sizeMatches =
//   //       selectedSize.min !== "" && selectedSize.max !== ""
//   //         ? item.landDetails.size >= parseInt(selectedSize.min) &&
//   //           item.landDetails.size <= parseInt(selectedSize.max)
//   //         : true; // If no size filter, consider it as a match

//   //     const minPriceMatches = minPrice ? item.landDetails.totalPrice >= parseInt(minPrice) : true;
//   //     const maxPriceMatches = maxPrice ? item.landDetails.totalPrice <= parseInt(maxPrice) : true;

//   //     return sizeMatches && minPriceMatches && maxPriceMatches;
//   //   });

//   //   setFilteredCommercials(filtered);
//   //   toggleFilter();
//   // };
  


// //applyfilter  without the sell,rent,lease use states

//   // const applyFilter = () => {
//   //   const filtered = commercials.filter((item) => {
//   //     let plotSize;
//   //     let totalAmount;
      




//   //     // Check which option (sell, rent, or lease) is present and get plotSize and totalAmount
//   //     if (item.propertyDetails.landDetails.sell) {
//   //       plotSize = item.propertyDetails.landDetails.sell.plotSize;
//   //       totalAmount = item.propertyDetails.landDetails.sell.totalAmount;
//   //     } else if (item.propertyDetails.landDetails.rent) {
//   //       plotSize = item.propertyDetails.landDetails.rent.plotSize;
//   //       totalAmount = item.propertyDetails.landDetails.rent.totalAmount;
//   //     } else if (item.propertyDetails.landDetails.lease) {
//   //       plotSize = item.propertyDetails.landDetails.lease.plotSize;
//   //       totalAmount = item.propertyDetails.landDetails.lease.totalAmount;
//   //     }
  
//   //     // Convert plotSize and totalAmount to numbers for comparison
//   //     const numericPlotSize = plotSize ? parseInt(plotSize) : 0;
//   //     const numericTotalAmount = totalAmount ? parseInt(totalAmount) : 0;
  
//   //     // Check size matches
//   //     const sizeMatches =
//   //       selectedSize.min !== "" && selectedSize.max !== ""
//   //         ? numericPlotSize >= selectedSize.min && numericPlotSize <= selectedSize.max
//   //         : true; // If no size filter, consider it as a match
  
//   //     // Check price matches
//   //     const minPriceMatches = minPrice ? numericTotalAmount >= parseInt(minPrice) : true;
//   //     const maxPriceMatches = maxPrice ? numericTotalAmount <= parseInt(maxPrice) : true;
  
//   //     // Apply all conditions
//   //     return sizeMatches && minPriceMatches && maxPriceMatches;
//   //   });
  
//   //   setFilteredCommercials(filtered);
//   //   toggleFilter();
//   // };



//   // {filter funcitons with seel,rent,lease usestates}
// // Filter function with checkboxes
// const applyFilter = () => {
//   const filtered = commercials.filter((item) => {
//     let plotSize;
//     let totalAmount;
    
//     // Determine property type based on checkboxes
//     const isSellType = isSellChecked && item.propertyDetails.landDetails.sell;
//     const isRentType = isRentChecked && item.propertyDetails.landDetails.rent;
//     const isLeaseType = isLeaseChecked && item.propertyDetails.landDetails.lease;

//     if (isSellType) {
//       plotSize = item.propertyDetails.landDetails.sell.plotSize;
//       totalAmount = item.propertyDetails.landDetails.sell.totalAmount;
//     } else if (isRentType) {
//       plotSize = item.propertyDetails.landDetails.rent.plotSize;
//       totalAmount = item.propertyDetails.landDetails.rent.totalAmount;
//     } else if (isLeaseType) {
//       plotSize = item.propertyDetails.landDetails.lease.plotSize;
//       totalAmount = item.propertyDetails.landDetails.lease.totalAmount;
//     } else {
//       return false; // If no checkbox matches, exclude the item
//     }

//     // Convert plotSize and totalAmount to numbers for comparison
//     const numericPlotSize = plotSize ? parseInt(plotSize) : 0;
//     const numericTotalAmount = totalAmount ? parseInt(totalAmount) : 0;

//     // Check size matches
//     const sizeMatches =
//       selectedSize.min !== "" && selectedSize.max !== ""
//         ? numericPlotSize >= selectedSize.min && numericPlotSize <= selectedSize.max
//         : true;

//     // Check price matches
//     const minPriceMatches = minPrice ? numericTotalAmount >= parseInt(minPrice) : true;
//     const maxPriceMatches = maxPrice ? numericTotalAmount <= parseInt(maxPrice) : true;

//     // Apply all conditions
//     return sizeMatches && minPriceMatches && maxPriceMatches ;
//   });

//   setFilteredCommercials(filtered);
//   toggleFilter();
// };

//   const renderCommercialCard = ({ item }) => {
//     const { landDetails, owner } = item.propertyDetails;

//     // Determine the property type
//     let propertyType, details;
//     if (landDetails.sell.plotSize) {
//       propertyType = "Sell";
//       details = {
//         plotSize: landDetails.sell.plotSize,
//         totalAmount: landDetails.sell.totalAmount,
//         landUsage: landDetails.sell.landUsage.join(", "),
//       };
//     } else if (landDetails.rent.plotSize) {
//       propertyType = "Rent";
//       details = {
//         plotSize: landDetails.rent.plotSize,
//         totalAmount: landDetails.rent.totalAmount,
//         landUsage: landDetails.rent.landUsage.join(", "),
//       };
//     } else if (landDetails.lease.plotSize) {
//       propertyType = "Lease";
//       details = {
//         plotSize: landDetails.lease.plotSize,
//         totalAmount: landDetails.lease.totalAmount,
//         landUsage: landDetails.lease.landUsage.join(", "),
//       };
//     }

//     return (
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => handleCardClick(item)}
//       >
//         <Image
//           source={{ uri: item.propertyDetails.uploadPics[0] }}
//           style={styles.cardImage}
//         />
//         <Icon onPress={() => setLoading(true)}>
//           {" "}
//           <Text>filteredFields</Text>
//         </Icon>
//         <View style={styles.cardContent}>
//           <Text style={styles.title}>{item.propertyTitle || "No Title"}</Text>
//           <Text style={styles.type}>{propertyType}</Text>
//           <Text style={styles.size}>Size: {details.plotSize} sq. meters</Text>
//           <Text style={styles.totalAmount}>
//             Total Amount: {details.totalAmount}
//           </Text>
//           <Text style={styles.landUsage}>Land Usage: {details.landUsage}</Text>
//         </View>
//         <View>
          
//           {/* {renderModal()} */}
//         </View>
//       </TouchableOpacity>
//       // {renderModal()}
//     );
//   };

//   const handleCardClick = (item) => {
//     console.log("Commercial card clicked:", item);
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

//       <FlatList
//         data={filteredCommercials}
//         renderItem={renderCommercialCard}
//         keyExtractor={(item) => item._id}
//         // contentContainerStyle={styles.list}
//         // numColumns={1} // Single card per row
//         // showsVerticalScrollIndicator={false}
//       />

//       <Modal
//         visible={openModal}
//         animationType="slide"
//         onRequestClose={() => setOpenModal(false)}
//         transparent={true}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Filter Options</Text>

//           {/* ---------------custome slider---------------- */}
//           {/* <SafeAreaView>
//           <CustomSlider min={0} max={Infinity} />
//         </SafeAreaView> */}
//           {/* ------------------------------------------------------ */}
//           <DropDownPicker
//             open={dropDownOpen}
//             value={selectedSize}
//             items={[
//               { label: "0-1000 acres", value: { min: 0, max: 1000 } },
//               { label: "0-2000 acres", value: { min: 0, max: 2000 } },
//               { label: "0-3000 acres", value: { min: 0, max: 3000 } },
//               { label: "0-4000 acres", value: { min: 0, max: 4000 } },
//               { label: "0-5000 acres", value: { min: 0, max: 5000 } },
//               { label: "0-6000 acres", value: { min: 0, max: 6000 } },
//               { label: "0-7000 acres", value: { min: 0, max: 7000 } },
//               { label: "0-8000 acres", value: { min: 0, max: 8000 } },
//               { label: "0-9000 acres", value: { min: 0, max: 9000 } },
//               { label: "0-10000 acres", value: { min: 0, max: 10000 } },


//             ]}
//             setOpen={setDropDownOpen}
//             setValue={setSelectedSize}
//             onChangeValue={(value) => setSelectedSize(value)}
//           />

//           {/* {lets use input boxes for the price } */}
// <View style={styles.yolo}>
//           <View style={styles.forpriceview}>
//             <TextInput
//               value={minPrice}
//               onChangeText={setMinPrice}
//               placeholder="minimum price"
//               keyboardType="numeric"
//               style={styles.forpriceinput}
//             />
//             <TextInput
//               value={maxPrice}
//               onChangeText={setMaxPrice}
//               placeholder="maximum price"
//               keyboardType="numeric"
//               style={styles.forpriceinput}
//             />
//           </View>

//           {/* Multi-select checkboxes for property type */}
//           <Checkbox.Item
//             label="Sell"
//             status={isSellChecked ? 'checked' : 'unchecked'}
//             onPress={() => setIsSellChecked(!isSellChecked)}
//           />
//           <Checkbox.Item
//             label="Rent"
//             status={isRentChecked ? 'checked' : 'unchecked'}
//             onPress={() => setIsRentChecked(!isRentChecked)}
//           />
//           <Checkbox.Item
//             label="Lease"
//             status={isLeaseChecked ? 'checked' : 'unchecked'}
//             onPress={() => setIsLeaseChecked(!isLeaseChecked)}
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
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
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

//   okk: {
//     padding: 10,
//     // flex:1,
//     margingBottom: 20,
//     marginTop: 90,
//     backgroundColor: "green",
//   },
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
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   type: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#2a9d8f",
//   },
//   size: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
//   totalAmount: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
//   landUsage: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent overlay
//     marginTop:450,
//     backgroundColor:"pink",
//     borderCurve:20
//   },
  
//   modalContent: {
//     width: "85%",
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     elevation: 5,
//   },
  
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 20,
//     textAlign: "center",
//     // backgroundColor:"#007BFF"
//   },
  
//   forpriceview: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 15,
//     width: "100%",
//   },
  
//   forpriceinput: {
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//     padding: 10,
//     width: "48%",
//     backgroundColor: "#fff",
//   },

//   yolo: {
//     backgroundColor: "white",
//     width: "100%",
//   },

//   applyButton: {
//     backgroundColor: "#007BFF",
//     paddingVertical: 12,
//     borderRadius: 8,
//     width: "100%",
//     alignItems: "center",
//     marginTop: 20,
//   },
  
//   applyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   closeButton: {
//     backgroundColor: "#FF0000",
//     paddingVertical: 12,
//     borderRadius: 8,
//     width: "100%",
//     alignItems: "center",
//     marginTop: 10,
//   },
  
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   checkboxContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//   },
// });

// export default CommercialScreen;
// --------------------
import React, { useEffect, useState } from "react";
import { IconButton, Icon, useTheme } from "react-native-paper";
// import Modal from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Modal,Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { Checkbox } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";


const CommercialScreen = () => {
  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-300));
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownOpen1,setDropDownOpen1]=useState(false);
  const transparent = "rgb(0,0,0,0.2)";
  const navigation=useNavigation();

  const [selectedSize, setSelectedSize] = useState({ min: "", max: "" });
  const [minPrice, setMinPrice] = useState(""); // State for minimum price
  const [maxPrice, setMaxPrice] = useState(""); // State for maximum price
  const [filteredCommercials, setFilteredCommercials] = useState([]); // State to hold filtered data

   // State for multi-select checkboxes
   const [isSellChecked, setIsSellChecked] = useState(false);
   const [isRentChecked, setIsRentChecked] = useState(false);
   const [isLeaseChecked, setIsLeaseChecked] = useState(false);
   const [selectedLocation,setSelectedLocation]=useState(false);
 
 
  useEffect(() => {
    const fetchCommercials = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(
          "http://172.17.15.53:3000/commercials/getallcommercials",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setCommercials(data);
        console.log("sneha -->",commercials,"data is ")
        setFilteredCommercials(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch commercials:", error);
        setLoading(false);
      }
    };

    fetchCommercials();
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
    const filtered = commercials.filter((item) => {
      let plotSize;
      let totalAmount;
  
      // Determine the property type based on checkboxes
      const isSellType = isSellChecked && item.propertyDetails.landDetails.sell;
      const isRentType = isRentChecked && item.propertyDetails.landDetails.rent;
      const isLeaseType = isLeaseChecked && item.propertyDetails.landDetails.lease;
       // If no checkboxes are selected, exclude the item
    if (!isSellType && !isRentType && !isLeaseType) {
      return false;
    }
      if (isSellType) {
        plotSize = item.propertyDetails.landDetails.sell.plotSize;
        totalAmount = item.propertyDetails.landDetails.sell.totalAmount;
      } else if (isRentType) {
        plotSize = item.propertyDetails.landDetails.rent.plotSize;
        totalAmount = item.propertyDetails.landDetails.rent.totalAmount;
      } else if (isLeaseType) {
        plotSize = item.propertyDetails.landDetails.lease.plotSize;
        totalAmount = item.propertyDetails.landDetails.lease.totalAmount;
      } else if (isSellChecked || isRentChecked || isLeaseChecked) {
        // Skip this item if a property type is checked but doesn't match
        return false;
      } else {
        // If no property type is checked, proceed with the rest of the filters
        plotSize = item.propertyDetails.landDetails.sell?.plotSize ||
                   item.propertyDetails.landDetails.rent?.plotSize ||
                   item.propertyDetails.landDetails.lease?.plotSize;
        totalAmount = item.propertyDetails.landDetails.sell?.totalAmount ||
                      item.propertyDetails.landDetails.rent?.totalAmount ||
                      item.propertyDetails.landDetails.lease?.totalAmount;
      }
  
      // Convert plotSize and totalAmount to numbers for comparison
      const numericPlotSize = plotSize ? parseInt(plotSize) : 0;
      const numericTotalAmount = totalAmount ? parseInt(totalAmount) : 0;
  
      // Check conditions separately
      const sizeMatches =
        selectedSize.min !== "" && selectedSize.max !== ""
          ? numericPlotSize >= selectedSize.min && numericPlotSize <= selectedSize.max
          : true;
  
      const minPriceMatches = minPrice ? numericTotalAmount >= parseInt(minPrice) : true;
      const maxPriceMatches = maxPrice ? numericTotalAmount <= parseInt(maxPrice) : true;
      const locationMatches= selectedLocation? item.propertyDetails.landDetails.address.district === selectedLocation : true;
      // Combine all conditions and return the filtered result
      return sizeMatches && minPriceMatches && maxPriceMatches && locationMatches;
    });
  
    setFilteredCommercials(filtered);
    toggleFilter();
  };
  

  const renderCommercialCard = ({ item }) => {
    const { landDetails, owner } = item.propertyDetails;

    // Determine the property type
    let propertyType, details;
    if (landDetails.sell.plotSize) {
      propertyType = "Sell";
      details = {
        plotSize: landDetails.sell.plotSize,
        totalAmount: landDetails.sell.totalAmount,
        landUsage: landDetails.sell.landUsage.join(", "),
      };
    } else if (landDetails.rent.plotSize) {
      propertyType = "Rent";
      details = {
        plotSize: landDetails.rent.plotSize,
        totalAmount: landDetails.rent.totalAmount,
        landUsage: landDetails.rent.landUsage.join(", "),
      };
    } else if (landDetails.lease.plotSize) {
      propertyType = "Lease";
      details = {
        plotSize: landDetails.lease.plotSize,
        totalAmount: landDetails.lease.totalAmount,
        landUsage: landDetails.lease.landUsage.join(", "),
      };
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardClick(item)}
      >
        <Image
          source={{ uri: item.propertyDetails.uploadPics[0] }}
          style={styles.cardImage}
        />
        <Icon onPress={() => setLoading(true)}>
          {" "}
          <Text>filteredFields</Text>
        </Icon>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.propertyTitle || "No Title"}</Text>
          <Text style={styles.type}>PropertyType:{item.propertyType}</Text>
          <Text style={styles.size}>Size: {details.plotSize} sq. meters</Text>
          <Text style={styles.totalAmount}>
            Total Amount: {details.totalAmount}
          </Text>
          <Text style={styles.landUsage}>Land Usage: {details.landUsage}</Text>
          {/* <Text style={styles.landUsage}>address :{} </Text> */}
        </View>
        <View>
          
          {/* {renderModal()} */}
        </View>
      </TouchableOpacity>
      // {renderModal()}
    );
  };
//  const district1=landDetails.landDetails?.address.district;
  const handleCardClick = (item) => {
    // console.log("sneha your item is --> ",item)
const district1=item.propertyDetails.landDetails.address.district;

  navigation.navigate("CommercialDetail",
    
    {property_id:item._id,
      district:district1
    });
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
          <IconButton icon="filter" style={styles.filterIcon} size={24} />
          {/* <Ionicons name="filter-outline" style={styles.filterIcon} size={24} color="#fff" /> */}
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCommercials}
        renderItem={renderCommercialCard}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={styles.list}
        // numColumns={1} // Single card per row
        // showsVerticalScrollIndicator={false}
      />

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
          {/* {lets use input boxes for the price } */}
<View style={styles.yolo}>
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

          {/* Multi-select checkboxes for property type */}
          <Checkbox.Item
            label="Sell"
            status={isSellChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsSellChecked(!isSellChecked)}
          />
          <Checkbox.Item
            label="Rent"
            status={isRentChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsRentChecked(!isRentChecked)}
          />
          <Checkbox.Item
            label="Lease"
            status={isLeaseChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsLeaseChecked(!isLeaseChecked)}
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

  okk: {
    padding: 10,
    // flex:1,
    margingBottom: 20,
    marginTop: 90,
    backgroundColor: "green",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius: 10,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a9d8f",
  },
  size: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  totalAmount: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  landUsage: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  modalContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent overlay
    // marginTop:450,
    // backgroundColor:"pink",
    // borderCurve:20
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
  
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    // backgroundColor:"#007BFF"
  },
  
  forpriceview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    width: "100%",
  },
  
  forpriceinput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "48%",
    backgroundColor: "#fff",
  },

  yolo: {
    backgroundColor: "white",
    width: "100%",
  },

  applyButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  closeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default CommercialScreen;
