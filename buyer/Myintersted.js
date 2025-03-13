import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Platform,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";

import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the new DateTimePicker
import { Searchbar } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { jwtDecode } from "jwt-decode";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "react-native-elements/dist/helpers";
import i18n, { translateKey } from "../i18n";
// import { LinearGradient } from 'expo-linear-gradient';

// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const Myintersted = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [csrId, setCsrId] = useState("");
  const [agentId, setagentId] = useState("");
  const [dealingId, setdealinId] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyId, setpropertyId] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [language, setLanguage] = useState("en");

  // State to store selected property details
  // const [selectedProperty, setSelectedProperty] = useState(null);

  // const[location]

  //   const []

  // useEffect(() => {
  //     const handleSearch = async () => {
  //       if (searchQuery.trim() === "") {
  //         // Reset to all properties if the search query is empty
  //         setFilteredProperties(properties);
  //         return;
  //       }

  //       try {
  //         const token = await AsyncStorage.getItem("userToken");

  //         // Fetch filtered properties from the backend
  //         const response = await fetch(` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropertiesFilter/${searchQuery}`, {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         const data = await response.json();
  //         console.log("The response after search is:", data);

  //         if (data.length > 0) {
  //           // Use backend results if available
  //           setFilteredProperties(data);
  //         } else {
  //           // Fallback to local filtering
  //           performLocalSearch();
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch filtered properties:", error);
  //         // Fallback to local filtering in case of an error
  //         performLocalSearch();
  //       }
  //     };

  //     const performLocalSearch = () => {
  //       // Exact search logic
  //       const exactResults = properties.filter(
  //         (property) =>
  //           property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           property.district.toLowerCase().includes(searchQuery.toLowerCase())
  //       );

  //       if (exactResults.length > 0) {
  //         // Use exact results if matches found
  //         setFilteredProperties(exactResults);
  //       } else {
  //         // Fuzzy search logic for "Did you mean?" suggestions
  //         const Fuse = require("fuse.js");
  //         const fuse = new Fuse(properties, {
  //           keys: ["propertyTitle", "country","district"], // Search these fields
  //           threshold: 0.4, // Adjust sensitivity for matches
  //           includeScore: true, // Include scores for results
  //         });

  //         const fuzzyResults = fuse.search(searchQuery);

  //         if (fuzzyResults.length > 0) {
  //             const closestMatch = fuzzyResults[0].item;
  //             console.log("Did you mean:", closestMatch.propertyTitle || closestMatch.country || closestMatch.district);
  //             setFilteredProperties([closestMatch]); // Display closest match
  //           } else {
  //             console.log("No matches found.");
  //             setFilteredProperties([]); // No matches found
  //             // Optionally, show a "No results found" message or suggest alternative searches
  //           }
  //       }
  //     };

  //     handleSearch();
  //   }, [searchQuery, properties]);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    setLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken"); // Replace with your token
        if (!token) {
          throw new Error("Token is missing");
        }
        const response = await axios.get(
          "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getIntrestedProperties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProperties(response.data);
        setFilteredProperties(response.data); // Initialize filtered properties

        setCsrId(response.data.csrId || "");
        setdealinId(response.data.dealingId || "");
        setPropertyName(response.data.propertyName);
        setagentId(response.data.setagentId);
        setpropertyId(response.data.setpropertyId);
        // setp
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
    loadLanguage();
  }, []);

  // Update filtered properties based on search query
  useEffect(() => {
    const filtered = properties.filter((property) =>
      property.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchQuery, properties]);

  // const handleScheduleMeeting = async () => {
  //     if (!place ) {
  //         alert('Please enter the place.');
  //         return;
  //     }

  //     if (!selectedProperty) {
  //         alert('No property selected.');
  //         return;
  //     }
  //     try {
  //         const token = await AsyncStorage.getItem('userToken');
  //         const decoded = jwtDecode(token);
  //         const customrid = decoded.user.userId;
  //         const email = decoded.user.email
  //         //   const user = JSON.parse(token); // Assuming token contains user info as JSON
  //         // const email=jwtDecode.token.user.email;
  //         // const customerId=jwtDecode.token.user._id;
  //         const meetingDetails = {

  //             propertyName: selectedProperty.propertyName,
  //             customerMail: email,

  //             meetingInfo: "meeting scheduled !",

  //             meetingStartTime: dateTime.toISOString(),

  //             meetingEndTime: dateTime.toISOString(), // Assuming 1-hour meetings

  //             scheduledBy: customrid,

  //             csrId:  selectedProperty.property.csrId,
  //             agentId: selectedProperty.property.agentId, // Static for now
  //             dealingId: selectedProperty.property.dealingId, // Static for now
  //             propertyId:selectedProperty.propertyId,
  //             customerId: customrid, // Static for now
  //             location: place,
  //         };

  //         console.log('Meeting details:', meetingDetails);

  //         const response = await axios.post(' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/meeting/schedule', meetingDetails, {
  //             headers: {
  //                 Authorization: `Bearer ${token}`,
  //                 'Content-Type': 'application/json',
  //             },
  //         });

  //         console.log('Meeting scheduled successfully:', response.data);
  //         setModalVisible(false);
  //         Alert.alert(' the meeting is scheduled successfully')

  //     } catch (error) {
  //         console.error('Error scheduling meeting:', error);
  //     }
  // };

  // Function to toggle the visibility of the date-time picker
  const toggleDatepicker = () => {
    // if (Platform.OS === 'android' && showPicker) {
    //     // Explicitly dismiss DateTimePicker for Android
    //     DateTimePickerAndroid.dismiss();
    //   }
    setShowPicker(!showPicker);
  };

  // Handling changes from the DateTimePicker
  //    const onChange = ({ type }, selectedDate) => {
  //     if (type === 'set') {
  //       const currentDate = selectedDate || dateTime;
  //       setDateTime(currentDate);
  //       if (Platform.OS === 'android') {
  //         toggleDatepicker();
  //       }
  //     } else {
  //       toggleDatepicker();
  //     }
  //   };

  // Handling changes from the DateTimePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setDateTime(currentDate);

    // setDateTime(currentDate);
    if (event.type === "set") {
      setDateTime(currentDate); // Set the selected date-time
    } else {
      setDateTime(null); // Set to null if canceled
    }

    // if (Platform.OS === 'android') {
    //     // toggleDatepicker();  // Close picker on Android
    //     DateTimePickerAndroid.dismiss();

    // }

    if (Platform.OS === "android") {
      toggleDatepicker();
    }
  };
  const handleScheduleMeeting = async () => {
    if (!place) {
      alert("Please enter the place.");
      return;
    }

    if (!selectedProperty) {
      alert("No property selected.");
      return;
    }
    if (!dateTime) {
      alert("Please select a date and time.");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("userToken");
      const decoded = jwtDecode(token);
      const customrid = decoded.user.userId;
      const email = decoded.user.email;
      // Add 1 hour (or 2 hours) to the start time for end time calculation
      const endTime = new Date(dateTime);
      endTime.setHours(endTime.getHours() + 1); // or use 2 instead of 1 for a 2-hour meeting

      const meetingDetails = {
        propertyName: selectedProperty.propertyName,
        customerMail: email,
        meetingInfo: "meeting scheduled !",
        meetingStartTime: dateTime.toISOString(), // Send null if no date-time is selected  // Use the selected date-time
        meetingEndTime: endTime.toISOString(), // Same logic for end time
        scheduledBy: customrid,
        csrId: selectedProperty.property.csrId,
        agentId: selectedProperty.property.userId,
        dealingId: selectedProperty.dealId,
        propertyId: selectedProperty.property.propertyId,
        customerId: customrid,
        location: place,
      };

      console.log("Meeting details:", meetingDetails);

      const response = await axios.post(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/meeting/schedule",
        meetingDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Meeting scheduled successfully:", response.data);
      setModalVisible(false);
      Alert.alert("Meeting is scheduled successfully");
      if (error.response?.status === 409) {
        Alert.alert(
          "Conflict",
          "Meeting conflicts with existing schedules. Please choose other timings."
        );
      }
    } catch (error) {
      //   console.error('Error scheduling meeting:', error);
      //   Alert.alert('Error', error.response?.data?.error || 'An unexpected error occurred.');

      if (error.response?.status === 409) {
        Alert.alert(
          "Conflict",
          "Meeting conflicts with existing schedules. Please choose other timings."
        );
      }
      //   } else {
      //     Alert.alert('Error', error.response?.data?.error || 'An unexpected error occurred.');
      //   }
    }
  };

  // Function to show the date-time picker
  const showDatePicker = () => {
    setShowPicker(true);
  };

  // Function to hide the date-time picker
  const hideDatePicker = () => {
    setShowPicker(false);
  };

  // Handling confirmation of selected date
  const handleConfirm = (date) => {
    setDateTime(date);
    hideDatePicker();
  };

  const renderPropertyCard = ({ item }) => {
    const { property, propertyName, propertyType, propertyId, dealId } = item;

    const renderDetails = () => {
      switch (propertyType) {
        case "Residential":
          return (
            <View>
              {language === "en" ? (
                <Text style={styles.title}>
                  {" "}
                  {propertyName} @ {property.propertyId}
                </Text>
              ) : (
                <Text style={styles.title}>
                  {" "}
                  {property.propertyDetails.apartmentNameTe || propertyName} @ {property.propertyId}
                </Text>
              )}

              <Text style={styles.text}>
                {i18n.t("Location")}: {i18n.t(property.address.district)}
              </Text>

              {/* <Text style={styles.text}>{i18n.t("Land Type")}: {property.landDetails.landType}</Text> */}
              <Text style={styles.text}>
                {i18n.t("Size")}: {property.propertyDetails.flatSize}{" "}
                {translateKey(property.propertyDetails.sizeUnit||" ")}
              </Text>
            </View>
          );
        case "Agricultural land":
          return (
            <View>
              {language === "en" ? (
                <Text style={styles.title}>
                  {" "}
                  {propertyName} @ {property.propertyId}
                </Text>
              ) : (
                <Text style={styles.title}>
                  {" "}
                  {property.landDetails.titleTe||propertyName} @ {property.propertyId}
                </Text>
              )}

              <Text style={styles.text}>
                {i18n.t("Location")}: {property.address.district}
              </Text>
              {/* <Text style={styles.text}>{i18n.t("Land Type")}: {property.landDetails.landType}</Text> */}
              <Text style={styles.text}>
                {i18n.t("Size")}: {property.landDetails.size}{" "}
                {translateKey(property.landDetails.sizeUnit||" ")}
              </Text>
            </View>
          );

        case "Commercial":
          return (
            <View>
              {language === "en" ? (
                <Text style={styles.title}>
                  {" "}
                  {propertyName} @ {property.propertyId}
                </Text>
              ) : (
                <Text style={styles.title}>
                  {" "}
                  {property.propertyDetails.propertyTitleTe||propertyName} @ {property.propertyId}
                </Text>
              )}

              <Text style={styles.text}>
                {i18n.t("Location")}:{" "}
                {i18n.t(property.propertyDetails.landDetails.address.district)}
              </Text>

              <Text style={styles.text}>
                {i18n.t("Size")}:{" "}
                {property.propertyDetails.landDetails.sell.plotSize ||
                  property.propertyDetails.landDetails.rent.plotSize ||
                  property.propertyDetails.landDetails.lease.plotSize}{" "}
                {translateKey(property.propertyDetails.landDetails.sell.sizeUnit ||
                  property.propertyDetails.landDetails.rent.sizeUnit ||
                  property.propertyDetails.landDetails.lease.sizeUnit||" ")}
              </Text>
            </View>
          );
        case "Layout":
          return (
            <View>
              {language === "en" ? (
                <Text style={styles.title}>
                  {" "}
                  {propertyName} @ {property.propertyId}
                </Text>
              ) : (
                <Text style={styles.title}>
                  {" "}
                  { property.layoutTitleTe||propertyName} @ {property.propertyId}
                </Text>
              )}

              <Text style={styles.text}>
                {i18n.t("Location")}: {i18n.t(property.layoutDetails.address.district)}
              </Text>
            </View>
          );
        default:
        // return <Text style={styles.text}>Details not available</Text>;
      }
    };

    return (
      <View>
        {/* <Searc */}

        <View style={styles.card}>
          {property.propertyType === "Commercial" && (
            <Image
              source={{
                uri:
                  property?.propertyDetails.uploadPics?.[0] ||
                  "https://www.google.com/imgres?q=default%20images%20lands%20cartoon&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fblank-landscape-nature-park-scene-with-many-pines_1308-47926.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fcartoon-land&docid=tBZUXPtHojq4NM&tbnid=nNcWAo0PKpEsSM&vet=12ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA..i&w=626&h=301&hcb=2&ved=2ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA",
              }}
              style={styles.image}
            />
          )}

          {property.propertyType === "Layout" && (
            <Image
              source={{
                uri:
                  property?.uploadPics?.[0] ||
                  "https://www.google.com/imgres?q=default%20images%20lands%20cartoon&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fblank-landscape-nature-park-scene-with-many-pines_1308-47926.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fcartoon-land&docid=tBZUXPtHojq4NM&tbnid=nNcWAo0PKpEsSM&vet=12ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA..i&w=626&h=301&hcb=2&ved=2ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA",
              }}
              style={styles.image}
            />
          )}
          {property.propertyType === "Residential" && (
            <Image
              source={{
                uri:
                  property?.propPhotos?.[0] ||
                  "https://www.google.com/imgres?q=default%20images%20lands%20cartoon&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fblank-landscape-nature-park-scene-with-many-pines_1308-47926.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fcartoon-land&docid=tBZUXPtHojq4NM&tbnid=nNcWAo0PKpEsSM&vet=12ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA..i&w=626&h=301&hcb=2&ved=2ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA",
              }}
              style={styles.image}
            />
          )}

          {property.propertyType === "Agricultural land" && (
            <Image
              source={{
                uri:
                  property?.landDetails?.images?.[0] ||
                  "https://www.google.com/imgres?q=default%20images%20lands%20cartoon&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fblank-landscape-nature-park-scene-with-many-pines_1308-47926.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fcartoon-land&docid=tBZUXPtHojq4NM&tbnid=nNcWAo0PKpEsSM&vet=12ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA..i&w=626&h=301&hcb=2&ved=2ahUKEwjeoPfPmfOKAxVV1DQHHduGFAAQM3oECGcQAA",
              }}
              style={styles.image}
            />
          )}

          {/* <Text style={styles.text}>{i18n.t("Property ID")}: {property.propertyId}</Text> */}

          {/* <Text>csrid:{property.csrId}</Text> */}

          {renderDetails()}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setSelectedProperty(item); // Set the selected property
              setModalVisible(true); // Open the modal
            }}
          >
            <View style={styles.row}>
              <Text style={styles.buttonText}>
                {i18n.t("Schedule Meeting")}
              </Text>
              <Icon
                name="clock-o"
                size={20}
                style={styles.icon}
                color={"white"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
       <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <FlatList
                data={properties}
                keyExtractor={(item) => item.propertyId}
                renderItem={renderPropertyCard}
            /> */}

      <TextInput
        style={styles.searchBar}
        placeholder={i18n.t("Search property by name")}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={properties}
        keyExtractor={(item) => item.propertyId}
        renderItem={renderPropertyCard}
        showsVerticalScrollIndicator={false}

      />

      <Modal
        visible={modalVisible}
        // animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* <LinearGradient></LinearGradient> */}
        <View style={styles.modalContainer}>
            <View style={styles.meetings}>

           <Text style={styles.modalTitle}>{i18n.t("Schedule Meeting")}</Text>
          <TextInput
            placeholder={i18n.t("Enter Place")}
            style={styles.input}
            value={place}
            onChangeText={setPlace}
          />
          {/* <TextInput
                        placeholder="Enter Date (YYYY-MM-DD)"
                        style={styles.input}
                        value={date}
                        onChangeText={setDate}
                    /> */}

          {/* Date-Time Picker for selecting meeting date */}
          {/* {showPicker && (
        <DateTimePicker
          mode="datetime"
          display="spinner"
          value={dateTime}
          onChange={onChange}
        />
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatepicker}>
          <Text style={styles.datePickerText}>
            {dateTime ? dateTime.toLocaleString() : 'Select Date and Time'}
          </Text>
        </Pressable>
      )} */}

          {/* Date-Time Picker Modal */}
          <Pressable onPress={showDatePicker}>
            <Button style={styles.cal}><Text style={{color:"white", fontSize:20}}> choose Date</Text> </Button>
            <Text style={styles.display}>
              {dateTime ? dateTime.toLocaleString() : i18n.t("Meeting Timings")}
            </Text>
          </Pressable>

          <DateTimePickerModal
            isVisible={showPicker}
            mode="datetime"
            date={dateTime}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Other inputs and meeting scheduling logic */}
          {/* <TextInput
        placeholder="Enter Place"
        style={styles.input}
        value={place}
        onChangeText={setPlace}
      /> */}
          {/* <TextInput
                        placeholder="Enter Time (HH:MM)"
                        style={styles.input}
                        value={time}
                        onChangeText={setTime}
                    /> */}
          <Button onPress={handleScheduleMeeting} style={styles.button1}>
            <Text style={{color:"white",fontSize:20,marginLeft:10}}>  {i18n.t("send")}</Text>
          </Button>
          <Button
            style={styles.button1}
            onPress={() => setModalVisible(false)}
          >
           <Text style={{color:"white",fontSize:20,marginLeft:10}}>{i18n.t("Cancel")}</Text>  
          </Button>
          </View>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    marginTop:20,
    //  fontWeight: "bold",
    fontSize: 16,
    padding:10,
    width:250,
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'white'
  },
  cal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor:"#1677ff"
   },
  row: {
    flexDirection: "row",
    alignItems: "center", // Vertically centers the text and icon
    justifyContent: "center", // Horizontally centers the text and icon
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // alignSelf:"center", // Horizontally centers the text and icon
    marginLeft: 95,
    // marginRight: 10, // Adds spacing between the text and icon
  },
  icon: {
    marginLeft: 5, // Adds a small margin to the left of the icon if needed
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    backgroundColor: "#1677ff",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignContent: "center",
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignSelf: "center",
  },
  datePickerText: {
    color: "red",
  },
  // buttonText:{
  //     color:'red'
  // },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E6E6FA",
    // backgroundColor:'black'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    // backgroundColor:"yellow",
    // backgroundColor:'red',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "red",
    // borderRadius:40
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    // marginTop:10,
  },
  scheduleButton: {
    color: "blue",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    // marginVertical:250,
    // marginHorizontal:45,
    padding: 10,
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(197, 218, 245, 0.7)",
    // backgroundColor: "#dfe9f5", // Set modal background color
    borderRadius: 10, // Optional: Add border radius to make the modal corners round
  },
  modalContent: {
    backgroundColor: "#fff", // Modal content background
    padding: 20,
    width: "90%", // Ensure content is well-spaced
    borderRadius: 10, // Round corners of the content box
    maxHeight: "80%", // Ensure modal content doesn't overflow
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight:"bold",
    marginBottom: 20,
   marginLeft:45
  },
//   input: {
//     backgroundColor: "yellow",
//     width: "80%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     border:5,
//     borderColor:"black",
//   },

input: {
    // flex: 1, // Take half the available width
     borderColor: "gray",
     height:50,
    borderWidth: 2,
    marginRight: 10, // Space between text input and picker
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom:10

  },
  modalText: {
    color: "#fff", // Text color inside modal
    fontSize: 16,
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  // input: {
  //     backgroundColor: '#fff',
  //     width: '80%',
  //     padding: 10,
  //     marginBottom: 10,
  //     borderRadius: 5,
  // },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  meetings:{
    backgroundColor:"white",
    borderRadius:10,
    padding:20,
     width:300
  },

  button1:{
   marginTop:10,
    backgroundColor:"#1677ff"
  }

});

export default Myintersted;
// -----------------------
//date picker lets try

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput,Platform,Pressable, Button, Alert } from 'react-native';
// import axios from 'axios';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const Myintersted = () => {
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState("");
// const [formReady,setFormReady]=useState(false);
// const[date,setDate]=useState(new Date());
// const [showPicker,setShowPicker]=useState(false);

// const toggleDatepicker =()=>{
//     setShowPicker(!showPicker);

// }

// const onChange=({type},selectedDate)=>{
//     if(type == "set"){
//         const currentDate=selectedDate || date;
//         setDate(currentDate);
//         if(Platform.OS === 'android'){
//             toggleDatepicker();
//             setDob(currentDate.toDateString());
//         }
//     }else{
//         toggleDatepicker();
//     }

// }

// useEffect(()=>{
//     setFormReady(name&&dob);
// }
// ,[name,dob]);

// const onSubmit =()=>{
//     alert(`${name} ${dob}`)
// }

//   const handleSubmit = async () => {
//     if (!name || !dob) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     const formData = {
//       name,
//       dob,
//     };

//     try {
//       const response = await axios.post('http://your-api-endpoint.com/submit', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Data submitted successfully');
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       Alert.alert('Error', 'Failed to submit data');
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, marginBottom: 10 }}>Name</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 20,
//           paddingLeft: 10,
//         }}
//         value={name}
//         onChangeText={setName}
//         placeholder="Enter your name"
//       />

//       <Text style={{ fontSize: 18, marginBottom: 10 }}>Date of Birth</Text>

//      {showPicker&& <DateTimePicker
//       mode='date'
//       display='spinner'
//       value={date}

//       onChange={onChange}

//       />}

//     {!showPicker && (
//           <Pressable
//           onPress={toggleDatepicker}
//           >
//              {/* <TextInput
//             style={{
//               height: 40,
//               borderColor: 'gray',
//               borderWidth: 1,
//               marginBottom: 20,
//               paddingLeft: 10,
//             }}
//             value={dob}
//             onChangeText={setDob}
//             placeholder="YYYY-MM-DD"
//             editable={false}
//           /> */}
//            <Text style={{
//             height: 40,
//             borderColor: 'gray',
//             borderWidth: 1,
//             marginBottom: 20,
//             paddingLeft: 10,
//             lineHeight: 40, // to align text properly
//           }}>
//             {dob || 'Select Date of Birth'}
//           </Text>
//           </Pressable>

//     )}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default Myintersted;
