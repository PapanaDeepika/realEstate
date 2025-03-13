import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Share,
  TextInput,
  Modal,
  Button,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Switch } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

const AllPropertiesList1 = () => {
  const navigation = useNavigation();
  const [type, setType] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(""); // State to track the selected filter

  const [propertyType, setPropertyType] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxP, setMaxP] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("acres");

  const [searchTerm, setSearchTerm] = useState();

  const [dispute, setDispute] = useState(false);

  // Fetching properties data from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(
          "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/getallprops",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("the data ", data);
        setProperties(data); // The new API response is directly the properties array
        setFilteredProperties(data); // Initially, set all properties as filtered properties
        //  console.log(" the filtered porperties ",data)
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle search query change
  // useEffect(() => {
  //     const handleSearch = async () => {
  //       if (searchQuery.trim() === "") {
  //         // If the search query is empty, reset to all properties
  //         setFilteredProperties(properties);
  //         return;
  //       }

  //       try {
  //         const token = await AsyncStorage.getItem("userToken");
  //         const response = await fetch(` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropertiesFilter/${searchQuery}`, {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         const data = await response.json();
  //         setFilteredProperties(data);
  //       } catch (error) {
  //         console.error("Failed to fetch filtered properties:", error);
  //       }
  //     };

  //     handleSearch();
  //   }, [searchQuery, properties]);

  const handlePriceFormat = (price) => {
    if (price >= 10000000) {
      // For crores
      return (price / 10000000).toFixed(2) + " Cr"; // Crore
    } else if (price >= 100000) {
      // For lakhs
      return (price / 100000).toFixed(2) + " Lakh"; // Lakh
    } else {
      // For normal INR formatting
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        // Reset to all properties if the search query is empty
        setFilteredProperties(properties);
        return;
      }

      try {
        const token = await AsyncStorage.getItem("userToken");

        // Fetch filtered properties from the backend
        const response = await fetch(
          `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropertiesFilter/${searchQuery}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("The response after search is:", data);

        if (data.length > 0) {
          // Use backend results if available
          setFilteredProperties(data);
        } else {
          // Fallback to local filtering
          performLocalSearch();
        }
      } catch (error) {
        console.error("Failed to fetch filtered properties:", error);
        // Fallback to local filtering in case of an error
        performLocalSearch();
      }
    };

    const performLocalSearch = () => {
      // Exact search logic
      const exactResults = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.district.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (exactResults.length > 0) {
        // Use exact results if matches found
        setFilteredProperties(exactResults);
      } else {
        // Fuzzy search logic for "Did you mean?" suggestions
        const Fuse = require("fuse.js");
        const fuse = new Fuse(properties, {
          keys: ["propertyTitle", "country", "district"], // Search these fields
          threshold: 0.4, // Adjust sensitivity for matches
          includeScore: true, // Include scores for results
        });

        const fuzzyResults = fuse.search(searchQuery);

        if (fuzzyResults.length > 0) {
          const closestMatch = fuzzyResults[0].item;
          console.log(
            "Did you mean:",
            closestMatch.propertyTitle ||
              closestMatch.country ||
              closestMatch.district
          );
          setFilteredProperties([closestMatch]); // Display closest match
        } else {
          console.log("No matches found.");
          setFilteredProperties([]); // No matches found
          // Optionally, show a "No results found" message or suggest alternative searches
        }
      }
    };

    handleSearch();
  }, [searchQuery, properties]);

  const getModalSearchDetails = () => {
    console.log("perc");
    let filteredData = [];
    if (maxP === 0) {
      setMaxP(minPrice + 1);
    }
    if (minPrice && maxP) {
      filteredData = properties.filter((property) => {
        // const { propertyType, propertyDetails, layoutDetails, landDetails } = property;

        if (propertyType === "Layout") {
          return property.price >= minPrice && property.price < maxP;
        }

        if (propertyType === "Residential") {
          console.log("asd", property, propertyDetails);
          return property.price >= minPrice && property.price < maxP;
        }

        if (propertyType === "Commercial") {
          // const { landDetails } = propertyDetails;
          // const { sell, rent, lease } = landDetails;
          return (
            property.price >= minPrice && property.price < maxP
            // (rent.price >= minPrice && rent.price < maxP) ||
            // (lease.price >= minPrice && lease.price < maxP)
          );
        }
        if (propertyType === "Agricultural land") {
          return property.price >= minPrice && property.price < maxP;
        }
        // For other property types

        // filteredData = properties.filter((property) =>
        //  {
        //   property.propertyType==="Layout"?( property.layoutDetails.plotPrice>=minPrice && property.layoutDetails.plotPrice<maxP):(

        //       property.propertyType==="Residential"?(property.propertyDetails.flatCost>=minPrice && property.propertyDetails.flatCost<maxP ):(

        //         property.propertyType==="Commercial"?(  property.propertyDetails.landDetails.sell.price>=minPrice && property.propertyDetails.landDetails.sell.price<maxP ||  property.propertyDetails.landDetails.rent.price>=minPrice && property.propertyDetails.landDetails.rent.price<maxP ||  property.propertyDetails.landDetails.lease.price>=minPrice && property.propertyDetails.landDetails.lease.price<maxP ):( property.landDetails.price>=minPrice && property.landDetails.price<maxP)
        //       )

        //   )
        // property.layoutDetails.plotPrice>=minPrice && property.layoutDetails.plotPrice<maxP ||  property.landDetails.price>=minPrice && property.landDetails.price<maxP||        property.propertyDetails.landDetails.sell.price>=minPrice && property.propertyDetails.landDetails.sell.price<maxP ||  property.propertyDetails.landDetails.rent.price>=minPrice && property.propertyDetails.landDetails.rent.price<maxP ||  property.propertyDetails.landDetails.lease.price>=minPrice && property.propertyDetails.landDetails.lease.price<maxP ||        property.propertyDetails.flatCost>=minPrice && property.propertyDetails.flatCost<maxP
      });
    }

    if (sizeValue) {
      filteredData = properties.filter(
        (property) => property.size >= sizeValue
        // property.layoutDetails.plotSize>=sizeValue  || property.landDetails.size>=sizeValue||      property.propertyDetails.landDetails.sell.plotSize>=sizeValue ||  property.propertyDetails.landDetails.rent.plotSize>=sizeValue||  property.propertyDetails.landDetails.lease.plotSize>=sizeValue  || property.propertyDetails.flatSize>=sizeValue
      );
    }

    if (sizeValue && sizeUnit) {
      filteredData = properties.filter((property) => {
        property.size >= sizeValue && property.sizeUnit === sizeUnit;
      });
    }

    if (propertyType) {
      filteredData = properties.filter((property) => {
        property.propertyType === propertyType;
      });
    }

    // if(dispute)
    // {

    //   filteredData=properties.filter((property)=>{
    //     property.propertyType===propertyType
    //   })

    // }

    setProperties(filteredData);
    console.log(properties);
    setFilteredProperties(filteredData);
    setModalVisible(!modalVisible);
  };
  const getPropertyDetails = (data) => {
    console.log("Get Property Details");

    navigation.navigate("Propdetails", { propByRoute: data });
    // Propdetails
  };
  const resetFunction = () => {
    setMinPrice("");
    setMaxP("");
    setSizeValue("");
    setSizeUnit("");
    setFilteredProperties(properties);
  };
  // Handle filter button click
  const handleFilterClick = (filterName) => {
    console.log(`${filterName} filter clicked`);
    setSelectedFilter(filterName); // Set the selected filter
    setType(filterName);
    if (filterName === "") {
      // Show all properties when no filter is selected
      setFilteredProperties(properties);
    } else {
      // Filter properties based on the selected propertyType
      const filtered = properties.filter(
        (item) => item.propertyType === filterName
      );
      setFilteredProperties(filtered);
    }
  };

  const propertyDetails = (item) => {
    navigation.navigate("propertyDetailsBuyer", { propByRoute: item });
  };

  // Render property card
  const renderPropertyCard = ({ item }) => {
    const imageUrl = item?.images?.[0] || "fallback-image-url"; // Replace with a valid fallback image URL
    return (
      <>
        <TouchableOpacity
          style={styles.card}
          onPress={() => propertyDetails(item)}
        >
          {/* Property Image */}
          <ImageBackground
            source={{ uri: imageUrl }}
            style={styles.propertyImage}
          >
            <Text style={styles.priceTag}>
              Price: {handlePriceFormat(item.price)}
            </Text>
          </ImageBackground>
          {/* <Button title="Interested"></Button> */}
          {/* Property Details */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.propertyName}>
              {" "}
              {item.title ? item.title : item.propertyTitle}
              {item.title && item.propertyTitle ? " or " : ""}
            </Text>

            <TouchableOpacity
              style={{ marginRight: 10, marginTop: 5 }}
              onPress={() => handleShare(item)}
            >
              <Icon name="share" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
          <Text>Location: {item.district}</Text>

          <Text>Type: {item.propertyType}</Text>
          <Text style={styles.propertyDetails}>
            {/* (ite) */}
            {item.propertyInterestedCount && (
              <Text style={styles.interestedCount}>
                {item.propertyInterestedCount} no.of people showing interest{" "}
              </Text>
            )}
          </Text>

          {/* Share Icon */}
        </TouchableOpacity>
      </>
    );
  };
  const handleShare = async (property) => {
    console.log("Sharing property:", property);
    try {
      const result = await Share.share({
        message: `Check out this property:
 Title: ${property.title}
 Type: ${property.propertyType}
 Location: ${property.district}
 Price: $${property.price}
 Image: ${property.images[0]}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed action");
      }
    } catch (error) {
      console.log("In the catch", error.message);
    }
    // Add logic to share property details
  };

  return (
    <>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.container1}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search property or location"
            value={searchQuery}
            onChangeText={setSearchQuery}
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
            Alert.alert("Modal has been closed.");
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

              <View style={styles.priceContainer}>
                <TextInput
                  placeholder="Enter size"
                  value={sizeValue}
                  onChangeText={setSizeValue}
                  style={styles.input}
                />
                <View style={[styles.pickerWrapper]}>
                  <Picker
                    selectedValue={sizeUnit}
                    onValueChange={(selectedValue) =>
                      setSizeUnit(selectedValue)
                    }
                    style={styles.picker}
                    itemStyle={{ fontFamily: "Montserrat_500Medium" }}
                  >
                    <Picker.Item label="None" />
                    <Picker.Item label="Cents" value="cents" />
                    <Picker.Item label="Acres" value="acres" />
                    <Picker.Item label="Square Feet" value="sqft" />
                    <Picker.Item label="Square Meters" value="sqm" />
                    <Picker.Item label="Hectares" value="hectares" />
                  </Picker>
                </View>
              </View>

              <View style={styles.priceContainer}>
                <View style={[styles.pickerWrapper1]}>
                  <Picker
                    selectedValue={propertyType}
                    onValueChange={(selectedValue) =>
                      setPropertyType(selectedValue)
                    }
                    style={styles.picker1}
                    itemStyle={{ fontFamily: "Montserrat_500Medium" }}
                  >
                    <Picker.Item label="Property Type" />
                    <Picker.Item label="Commercial" value="Commercial" />
                    <Picker.Item label="Layout" value="Layout" />
                    <Picker.Item label="Residential" value="Residential" />
                    <Picker.Item
                      label="Agricultural land"
                      value="Agricultural land"
                    />
                  </Picker>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>dispute</Text>
                  <Switch
                    value={dispute}
                    onValueChange={setDispute}
                    thumbColor={dispute ? "#0791fa" : "#f4f3f4"}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Reset" onPress={resetFunction} color="#888" />
                <Button
                  title="Search"
                  onPress={getModalSearchDetails}
                  color="#007BFF"
                />

                <Button title="Close" onPress={() => setModalVisible(false)} />
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
            renderItem={renderPropertyCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  selectedFilterButton: {
    backgroundColor: "black", // Change color when selected
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 20,
    fontFamily:"Montserrat_500Medium"

  },

  pickerWrapper: {
    height: 45,
    width: 130,
    marginLeft: 30,
    borderColor: "gray",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    fontFamily:"Montserrat_500Medium"

  },
  priceTag: {
    position: "absolute",
    top: 0, // Adjust to position the price tag as you like
    left: 0, // Adjust to position the price tag as you like
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color for contrast
    color: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily:"Montserrat_500Medium"

  },

  pickerWrapper1: {
    height: 40,
    width: 150,
    borderColor: "gray",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    fontFamily:"Montserrat_500Medium"

  },
  buttonContainer: {
    marginHorizontal: 5,
  },
  filterButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily:"Montserrat_500Medium"

  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily:"Montserrat_500Medium"

  },
  propertyListContainer: {
    marginTop: 100, // Makes space for the buttons at the top
    paddingHorizontal: 20,
    fontFamily:"Montserrat_500Medium"

  },
  propertyList: {
    paddingBottom: 20,
    fontFamily:"Montserrat_500Medium"

  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    // shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    fontFamily:"Montserrat_500Medium"

  },
  propertyImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    fontFamily:"Montserrat_500Medium"

  },
  propertyName: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily:"Montserrat_500Medium",

    marginVertical: 10,
  },
  propertyDetails: {
    fontSize: 14,
    color: "gray",
    fontFamily:"Montserrat_500Medium"

  },
  selectedChip: {
    backgroundColor: "#00aae7", // Highlight the selected chip
    borderColor: "#00aae7",
    fontFamily:"Montserrat_500Medium"

  },
  chipRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 10,
    fontFamily:"Montserrat_500Medium"

  },
  chipContainer: {
    marginHorizontal: 5,
    fontFamily:"Montserrat_500Medium"

  },
  chip: {
    borderColor: "#007bff",
    borderWidth: 1,
    paddingVertical: 6,
    fontFamily:"Montserrat_500Medium",

    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "white",
  },
  chipText: {
    color: "#007bff",
    fontSize: 14,
  },
  selectedChipText: {
    color: "white",
  },
  propertyListContainer: {
    marginTop: 80, // Adjust for chip row spacing
    paddingHorizontal: 20,
    fontFamily:"Montserrat_500Medium"

  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily:"Montserrat_500Medium"

  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    fontFamily:"Montserrat_500Medium"

  },
  filterButton: {
    color: "#000",
    fontFamily:"Montserrat_500Medium"

  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    position: "absolute", // Absolute positioning to overlay on top of content
    top: 0,
    fontFamily:"Montserrat_500Medium",

    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Ensure the modal is on top
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    // fontWeight: "bold",
    fontFamily:"Montserrat_600SemiBold"

    // marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontFamily:"Montserrat_500Medium"

  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    width: "45%",
    marginBottom: 10,
    fontFamily:"Montserrat_500Medium"
  },

  input1: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    width: "60%",
    fontFamily:"Montserrat_500Medium",

    marginBottom: 10,
  },
  sizeContainer: {
    width: "100%",
    marginBottom: 10,
    fontFamily:"Montserrat_500Medium"

  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    gap: 10,
    fontFamily:"Montserrat_500Medium"

  },
  picker: {
    height: 40,
    width: 140, // Width of the dropdown (picker)
    fontFamily:"Montserrat_500Medium"

  },
  picker1: {
    height: 40,
    width: 180, // Width of the dropdown (picker)
    fontFamily:"Montserrat_500Medium"

  },
});

export default AllPropertiesList1;
