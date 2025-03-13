// this is  actual code for the vie wmore
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Share,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

import Fontisto from "@expo/vector-icons/Fontisto";
import DateTimePicker from "@react-native-community/datetimepicker";
import i18n from "../i18n";

const ImIntrested = ({ navigation }) => {
  //  const navigation = useNavigation()
  const [type, setType] = useState();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(""); // State to track the selected filter

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [language,setLanguage]=useState(i18n.locale)

  // Fetching properties data from the API

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    setLanguage(savedLanguage)
    if (savedLanguage) {
      i18n.locale = savedLanguage; 
    }
  };

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
        console.log(data);
        setProperties(data); // The new API response is directly the properties array
        setFilteredProperties(data); // Initially, set all properties as filtered properties
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
    loadLanguage();
  }, []);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDateTime(date);
    }
    setShowPicker(false);
  };

  const openDateTimePicker = () => {
    setShowPicker(true);
  };

  const handleScheduleMeeting = () => {
    // Logic to post `selectedDateTime` to the backend
    console.log("Scheduled Date and Time:", selectedDateTime);
    setIsModalVisible(false);
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

  // Render property card
  //  const renderPropertyCard = ({ item }) => (
  // <TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)}>
  // {/* Property Image */}
  //  <Image source={{ uri: item.images[0] }} style={styles.propertyImage} />

  //  {/* <Button title="Interested"></Button> */}
  //  {/* Property Details */}
  //  <View style={{flexDirection:"row", justifyContent:"space-between"}}>
  //  <Text style={styles.propertyName}>{item.title}</Text>
  //  <TouchableOpacity
  //  style={{marginRight:10, marginTop:5}}
  //  onPress={() => handleShare(item)}
  //  >
  //  <Icon name="share" size={24} color="#007bff" />
  //  </TouchableOpacity>
  //  </View>
  //  <Text style={styles.propertyDetails}>
  //  Location: {item.district} | Price: ${item.price} | Type: {item.propertyType}
  //  </Text>

  //  {/* Share Icon */}

  //  </TouchableOpacity>
  //  );
  const propertyDetails = (item) => {
    navigation.navigate("Propdetails", { propByRoute: item });
  };
  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)}>
      {/* Property Image Container */}
      <View style={{ position: "relative" }}>
        {/* Property Image */}
        <Image source={{ uri: item.images[0] }} style={styles.propertyImage} />

        {/* "I'm Interested" Button on top of the image */}
        {/* <TouchableOpacity
                style={styles.interestedButton}
                onPress={() => handleInterested(item)}
            >
                <Text style={styles.interestedButtonText}>I'm Interested</Text>
            </TouchableOpacity> */}
      </View>

      {/* Property Details */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.propertyName}>{item.title}</Text>
        <TouchableOpacity
          style={{ marginRight: 10, marginTop: 5 }}
          onPress={() => handleShare(item)}
        >
          {/* <Icon name="share" size={24} color="#007bff" />
           */}
          <Fontisto name="share" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.propertyDetails}>
        {i18n.t("Location")}: {item.district} | Price: ${item.price} | Type:{" "}
        {item.propertyType}
      </Text>
    </TouchableOpacity>
  );
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
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <MaterialIcons name="arrow-back" size={30} color="black" /> */}
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>
          {i18n.t("Properties List")}
        </Text>
      </View>

      {/* Property List View */}
      <View style={styles.propertyListContainer}>
        {loading ? (
          <View style={{ marginVertical: 300 }}>
            <ActivityIndicator size={"large"} color={"#4184AB"} />
          </View>
        ) : (
          <FlatList
            data={filteredProperties} // Render filtered properties
            // data={setProperties}
            renderItem={renderPropertyCard}
            keyExtractor={(item) => item.propertyId} // Use propertyId as the unique key
            contentContainerStyle={styles.propertyList}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1,
  },
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
  },
  buttonContainer: {
    marginHorizontal: 5,
  },
  filterButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  propertyListContainer: {
    marginTop: 100, // Makes space for the buttons at the top
    paddingHorizontal: 20,
  },
  propertyList: {
    paddingBottom: 20,
  },
  //  card: {
  //  backgroundColor: "#fff",
  //  marginBottom: 15,
  //  padding: 10,
  //  borderRadius: 5,
  //  shadowColor: "#000",
  //  shadowOpacity: 0.1,
  //  shadowOffset: { width: 0, height: 2 },
  //  shadowRadius: 5,
  //  elevation: 3,
  //  },
  //  propertyImage: {
  //  width: "100%",
  //  height: 200,
  //  borderRadius: 5,
  //  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  propertyImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  // propertyName: {
  //  fontSize: 18,
  //  fontWeight: "bold",
  //  marginVertical: 10,
  //  },
  interestedButton: {
    position: "absolute",
    top: 10, // Adjust the position based on where you want the button
    left: "80%",
    transform: [{ translateX: -70 }], // Center the button horizontally
    backgroundColor: "#FF6347", // Highlighted button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 10, // Ensure button is above the image
  },
  interestedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  propertyDetails: {
    fontSize: 14,
    color: "gray",
  },
  selectedChip: {
    backgroundColor: "#00aae7", // Highlight the selected chip
    borderColor: "#00aae7",
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
  },
  chipContainer: {
    marginHorizontal: 5,
  },
  chip: {
    borderColor: "#007bff",
    borderWidth: 1,
    paddingVertical: 6,
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
  },
});

export default ImIntrested;

// -------------------------------------------------------
// lets try the property details
