import React, { useEffect, useState, useRef, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  ImageBackground,
  Share,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode"; // to decode the JWT token
// import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import i18n from "../i18n";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const actions = [
  {
    text: "Residential",
    icon: <Ionicons name="home" size={24} color="#fff" />, // Icon updated to "home" for buildings
    name: "bt_residential",
    position: 2,
  },
  {
    text: "Agriculture",
    icon: <MaterialCommunityIcons name="sprout" size={24} color="white" />, // Icon updated to "leaf" for crops
    name: "bt_agriculture",
    position: 1,
  },

  {
    text: "Commercial",
    icon: <Ionicons name="storefront" size={24} color="#fff" />, // Icon updated to "storefront" for shops/stores
    name: "bt_commercial",
    position: 3,
  },
  {
    text: "Layout",
    icon: <Ionicons name="grid-outline" size={24} color="#fff" />, // Icon updated to "grid-outline" for square outlines
    name: "bt_layout",
    position: 4,
  },
];

export const CsrHomePage = () => {

  const insets=useSafeAreaInsets()
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [assignedAgents, setAssignedAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const floatingActionRef = useRef(null);
  const [isFABOpen, setIsFABOpen] = useState(false);

  const [name, setName] = useState("");
  const [props, setProps] = useState([]);
  const [lastName, setLastName] = useState("");

  const [profile, setProfile] = useState("");

  const [propLoading, setPropLoading] = useState(false);

  const [language, setLanguage] = useState(i18n.locale);
  

  // Add ref to FlatList to control scrolling
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchLayouts = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getTopPropOnPrice",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setProperties(data);
      } else {
        console.log("Unexpected data format:", data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching layouts:", error.message);
      setLoading(false);
    }
  };

  const handleShare = async (property) => {
    console.log("Sharing property:", property);
    try {
      const result = await Share.share({
        message: `Check out this property:
        Title:${property.landDetails.title}
   Type: ${property.propertyType}`,
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

  const fetchAssignedAgents = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.userId;

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/getAssignedAgents/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Fetched assigned agents:", data);

      if (Array.isArray(data)) {
        setAssignedAgents(data);
      } else {
        console.log("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching assigned agents:", error.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      const token = await AsyncStorage.getItem("userToken");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.firstName;
      setName(userId);
      setLastName(decodedToken.user.lastName);

      setProfile(decodedToken.user.profilePicture);
    };
    fetchLayouts();
    fetchAssignedAgents();
    fetchProperties();

    load();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLanguage();
    }, [loadLanguage])
  );

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language", savedLanguage);

    if (savedLanguage) {
      i18n.locale = savedLanguage;
      setLanguage(savedLanguage);
    }
  };

  // Auto-scrolling functionality for the cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % properties.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); // Change the card every 3 seconds

    return () => clearInterval(interval);
  }, [properties]);

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

  const fetchProperties = async () => {
    try {
      setPropLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/latestprops`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          setProps(resp.data);
          setPropLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPropLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardNew}
      key={item._id}
      onPress={() => {
        navigation.navigate("Propdetails", { propByRoute: item });
      }}
    >
      {item.propertyType === "Agricultural land" && (
        <ImageBackground
          style={[styles.imageNew]}
          source={{
            uri:
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
          }}
        >
          <Text style={[styles.imageText]}>
            {item.landDetails.title ||
              item.propertyTitle ||
              item.propertyDetails.apartmentName ||
              item.layoutDetails.layoutTitle}{" "}
          </Text>
          <Text style={styles.priceBottomStyle}>
            {handlePriceFormat(item.price || item.landDetails?.price)}
          </Text>
          <TouchableOpacity
            style={styles.shareIcon}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={24} color="#007bff" />
          </TouchableOpacity>
        </ImageBackground>
      )}

      {item.propertyType === "Residential" && (
        <ImageBackground
          style={[styles.imageNew]}
          source={{
            uri:
              item.propPhotos?.[0] ||
              "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg",
          }}
        >
          <Text style={[styles.imageText]}>
            {item.title || item.propertyDetails.apartmentName}@{" "}
            {item.propId || item.propertyId}
          </Text>
          <Text style={[styles.priceBottomStyle]}>
            {" "}
            {handlePriceFormat(item.price || item.propertyDetails?.flatCost)}
          </Text>
          <TouchableOpacity
            style={styles.shareIcon}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={24} color="#007bff" />
          </TouchableOpacity>
        </ImageBackground>
      )}

      {item.propertyType === "Commercial" && (
        <ImageBackground
          style={[styles.imageNew]}
          source={{
            uri:
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.propertyDetails.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "http://www.floortap.com/resources/wp-content/uploads/2024/04/49a4c54e23.jpeg",
          }}
        >
          <Text style={[styles.imageText]}>
            {item.propertyTitle || item.propertyTitle}@{" "}
            {item.propId || item.propertyId}
          </Text>
          <Text style={styles.priceBottomStyle}>
            {handlePriceFormat(
              item.price ||
                item.propertyDetails.landDetails?.lease.leasePrice ||
                item.propertyDetails.landDetails.sell.price ||
                item.propertyDetails.landDetails.rent.rent
            )}
          </Text>
          <TouchableOpacity
            style={styles.shareIcon}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={24} color="#007bff" />
          </TouchableOpacity>
        </ImageBackground>
      )}

      {item.propertyType === "Layout" && (
        <ImageBackground
          style={styles.imageNew}
          source={{
            uri:
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg",
          }}
        >
          <Text style={[styles.imageText]}>
            {item.title || item.layoutDetails.layoutTitle}@{" "}
            {item.propId || item.propertyId}
          </Text>
          <Text style={[styles.priceBottomStyle]}>
            {handlePriceFormat(item.price || item.layoutDetails?.plotPrice)}
          </Text>
          <TouchableOpacity
            style={styles.shareIcon}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={20} color="#007bff" />
          </TouchableOpacity>
        </ImageBackground>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.detailsStyles}>
          <Icon name="map-marker" size={20} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {/* {item.district || item.address?.district || item.address|| "Vizianagaram"} */}
            {item.propertyType === "Residential" && item.address.district}
            {item.propertyType === "Agricultural land" && item.address.district}
            {item.propertyType === "Layout" &&
              item.layoutDetails.address.district}
            {item.propertyType === "Commercial" &&
              item.propertyDetails.landDetails.address.district}
          </Text>
        </View>
        <View style={styles.detailsStyles}>
          <Icon name="ruler" size={20} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {item.propertyType === "Residential" &&
              item.propertyDetails.flatSize}{" "}
            {item.propertyType === "Agricultural land" && item.landDetails.size}
            {item.propertyType === "Layout" && item.layoutDetails.plotSize}
            {item.propertyType === "Commercial" &&
              item.propertyDetails.landDetails.sell.plotSize}
            {item.propertyType === "Commercial" &&
              item.propertyDetails.landDetails.lease.plotSize}
            {item.propertyType === "Commercial" &&
              item.propertyDetails.landDetails.rent.plotSize}
            {"Acres"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container,{paddingTop:insets.top}]}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <View style={{ flexDirection: "row" }}>
          {/* <Ionicons
            name="menu"
            size={25}
            color="#fff"
            style={styles.menuIcon}
          /> */}
          {/* {""} */}
          {/* <Ionicons name="calendar" size={24} color="#fff"style={{marginLeft:220}}/> */}
          <Ionicons
            name="notifications"
            color="#fff"
            size={25}
            style={{ marginLeft: 300, marginTop: 10, marginHorizontal: 10 }}
            onPress={() => {
              navigation.navigate("notification");
            }}
          />

          <Ionicons
            name="power"
            color="#fff"
            style={{ marginTop: 10 }}
            onPress={() => {
              navigation.navigate("Login");
            }}
            size={25}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Image
            source={{ uri: profile }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 30,
              alignSelf: "center",
            }}
            resizeMode="cover"
          />
          <Text style={[styles.navTitle,{    fontFamily: "Montserrat_700Bold"}]}>{`Hello ${name} ${lastName}`}</Text>
          {/* <TextInput
            placeholder="Search"
            style={{
              backgroundColor: "white",
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
            }}
          /> */}
        </View>
      </View>

      <View style={styles.iconGrid}>
        {[
          {
            name: "create",
            label: i18n.t("Survey Data"),
            screen: "surveyData",
          },
          { name: "people", label: i18n.t("Agents"), screen: "csrAgents" },
          { name: "happy", label: i18n.t("Customers"), screen: "customers" },

          { name: "briefcase", label: i18n.t("Deals"), screen: "CsrDeals" },
          //  { name: "calendar", label: "Calendar", screen: "MyPropertiescsr" },

          {
            name: "megaphone",
            label: i18n.t("Marketing Agents"),
            screen: "csrmarketingAgents",
          },
          //  { name: "bar-chart", label: "Reports", screen: "MyPropertiescsr" },
          //  { name: "bar-chart", label: "My Properties", screen: "mycsrprops" },

          {
            name: "business",
            label: i18n.t("All Properties"),
            screen: "ViewpropbyCSR",
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconItemContainer}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconItem}>
              <Ionicons name={item.name} size={35} color="white" />
            </View>
            <Text style={styles.iconLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
               fontSize: 18,
              marginHorizontal: 20,
              fontFamily: "Montserrat_700Bold",
            }}
          >
            {i18n.t("Explore Latest Properties")}
          </Text>
        </View>
        {propLoading ? (
          <ActivityIndicator
            size={"small"}
            color={"#007bff"}
            style={{ marginTop: 10 }}
          />
        ) : (
          <FlatList
            data={props}
            renderItem={renderPropertyCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          />
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("csr")}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={{ color: "#fff" ,fontFamily:"Montserrat_700Bold"}}>{i18n.t("Home")}</Text>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("surveyData")}
        >
          <MaterialIcons name="person-search" size={24} color="#fff" />
          <Text style={{color:"#fff"}}>Survey Data</Text>
        </TouchableOpacity> */}

        {/* Floating Action */}
        <View style={styles.highlightedButtonContainer}>
          {/* <FloatingAction
            ref={floatingActionRef}
            actions={actions}
            color="#ff5722"
            onPressItem={(name) => {
              console.log(`Selected button: ${name}`);
              if (name === "bt_accessibility") {
                navigation.navigate("AccessibilityScreen");
              } else if (name === "bt_language") {
                navigation.navigate("LanguageScreen");
              } else if (name === "bt_room") {
                navigation.navigate("LocationScreen");
              } else if (name === "bt_videocam") {
                navigation.navigate("VideoScreen");
              }
            }}
          /> */}
          <FloatingAction
            ref={floatingActionRef}
            actions={actions}
            color="#4184ab"
            onPressItem={(name) => {
              console.log(`Selected button: ${name}`);
              switch (name) {
                case "bt_residential":
                  navigation.navigate("residentialForm"); // Navigate to Residential screen
                  break;
                case "bt_agriculture":
                  navigation.navigate("agricultureForm"); // Navigate to Agriculture screen
                  break;
                case "bt_commercial":
                  navigation.navigate("CommercialForm"); // Navigate to Commercial screen
                  break;
                case "bt_layout":
                  navigation.navigate("LayoutForm"); // Navigate to Layout screen
                  break;
                default:
                  console.log("Unknown action selected");
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("myProfile")}
        >
          {/* <Ionicons name="share" size={24} color="#fff" /> */}
          <Octicons name="person" size={24} color="#fff" />
          <Text style={{ color: "#fff" ,fontFamily:"Montserrat_700Bold"}}>{i18n.t("Profile")}</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconGrid: {
    flexDirection: "row", // Row layout
    flexWrap: "wrap", // Allow wrapping
    justifyContent: "space-between", // Distribute items evenly
    paddingHorizontal: 10, // Add some padding
    marginTop: 20, // Top margin
  },
  iconItemContainer: {
    width: "30%", // Set width to 30% for 3 items per row
    alignItems: "center", // Center icon and text
    marginBottom: 20, // Add spacing between rows
    //  backgroundColor:'#4184AB',
    backgroundColor: "#c7dfed",
    borderRadius: 10,
    padding: 10,
  },
  iconItem: {
    backgroundColor: "#4184AB", // Light gray background
    // backgroundColor:'#4184AB',

    borderRadius: 10, // Rounded corners
    padding: 15, // Padding around icon
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 10, // Space between icon and label
    textAlign: "center",
    fontSize: 14,
     color: "#333", // Dark text color
    fontFamily: "Montserrat_700Bold",
  },
  agentSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  agentCard: {
    width: 350,
    height: 300,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  agentImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  agentRole: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Montserrat_700Bold",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    // backgroundColor:"#ADD8E4",
    borderRadius: 50,
    marginTop: 20,
  },
  iconItem: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    // backgroundColor:"black",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",

    paddingTop: 100,
    // backgroundColor:'#4184AB'
  },
  topNav: {
    //  backgroundColor: "#007bff",
    backgroundColor: "#4184AB",

    padding: 15,
    //  marginTop:25,
    //  flexDirection: "row",
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // alignItems: "center",
    // alignContent:"center",
    // marginLeft:20
    //  justifyContent: "space-between",
  },
  menuIcon: {
    marginLeft: 10,
  },
  navTitle: {
    color: "#fff",
    fontSize: 24,
    // fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  content: {
    flex: 1,
  },
  smallHeadingContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  smallHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    alignContent: "center",
    marginLeft: 160,
    // alignItems:"centre",
    fontFamily: "Montserrat_700Bold",

    fontWeight: "bold",
  },
  viewMoreText: {
    fontSize: 14,
    color: "#007bff",
    marginTop: 13,
    textAlign: "right",
    marginRight: 15,
    fontFamily: "Montserrat_700Bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    width: 200,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  agentSection: {
    marginTop: 20,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  // agentCard: {
  // padding: 15,
  // backgroundColor: "#fff",
  // borderRadius: 10,
  // marginBottom: 10,
  // shadowColor: "#000",
  // shadowOpacity: 0.1,
  // shadowOffset: { width: 0, height: 4 },
  // shadowRadius: 5,
  // elevation: 3,
  // },
  agentCard: {
    width: 200, // Increased width for agent card
    height: 250, // Increased height for agent card
    padding: 20, // Adjusted padding for better content spacing
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 20, // Added more space between agent cards horizontally
    marginBottom: 20, // Added space at the bottom of the card
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat_700Bold",
  },

  agentName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  agentRole: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",

    color: "#777",
  },
  //  containerforfab: {
  //     flex: 1,
  //     backgroundColor: "#f5f5f5",
  //   },
  //   example1: {
  //     textAlign: "center",
  //     marginVertical: 10,
  //     fontSize: 16,
  //     color: "#333",
  //   },
  bottomNav: {
    flexDirection: "row",
    // backgroundColor: "#333",
    backgroundColor: "#4184AB",

    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedButtonContainer: {
    position: "absolute",
    bottom: 20, // Adjusted to move it above the bottom navigation bar
    right: "38%",
    transform: [{ translateX: -10 }], // Centers the button horizontally
  },
  highlightedButton: {
    // backgroundColor: "#ff5722", // Highlight color for the button
    // marginTop:-20,
    backgroundColor: "black",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Adds shadow for a raised effect
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
  },
  district: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    fontFamily: "Montserrat_700Bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  priceMaxInput: {
    flex: 1, // Ensures both inputs take equal space
    borderColor: "#000", // Light gray border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  priceInput: {
    flex: 1, // Ensures both inputs take equal space
    borderColor: "#000", // Light gray border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
    marginRight: 5,
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  input: {
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginRight: 5,
    height: 40,
  },
  slider: {
    width: 300,
    height: 40,
  },
  label1: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerWrapper: {
    height: 40,
    width: 158,
    borderColor: "black",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
  },
  picker1: {
    width: "100%",
  },
  pickerWrapper1: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    marginBottom: 10,
  },

  picker: {
    height: 40,
    width: 140, // Width of the dropdown (picker)
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  welcomeContainer: {
    padding: 20,
    fontSize: 25,
    backgroundColor: "#4184AB",
    color: "white",
    fontStyle: "italic",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#4184AB",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  propertyListContainer: {
    flex: 1,
  },
  propertyList: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  shareIcon: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
    zIndex: 1, // Ensure it appears above the image
  },
  propertyImage: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  propertyDetailsContainer: {
    marginTop: 10,
  },
  propertyDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  propertyDetails: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
    fontFamily: "Montserrat_700Bold",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_700Bold",
  },
  recommended: {
    paddingHorizontal: 10,
  },
  textStyle: {
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
  },
  detailsStyles: {
    flexDirection: "row",
  },
  textStyleNew: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Montserrat_600SemiBold",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  shareIcon: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
  },
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 12,
     textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "75%",
    borderBottomRightRadius: 60,
    fontFamily: "Montserrat_700Bold",
  },
  imageNew: {
    width: "100%",
    height: 150,
  fontFamily: "Montserrat_700Bold"
  },
  cardNew: {
    marginVertical: 10,
    marginHorizontal: 3,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  priceStyle: {
    backgroundColor: "rgba(173, 216, 230, 0.7)",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "40%",
    fontFamily: "Montserrat_700Bold",
  },
  priceBottomStyle: {
    // position:"absolute",
    // left:10,
    // bottom:10,
    // backgroundColor: 'rgba(173, 216, 230, 0.7)',
    // padding: 10,
    // color:"#fff"
    position: "absolute",
    // borderBottomColor:"#fff",
    // borderBottomWidth:2,
    bottom: 1, // Distance from the bottom of the image
    backgroundColor: "#f0f0f0", // Semi-transparent dark background
    color: "#000", // White text for contrast
    fontSize: 16, // Adjust font size
    fontWeight: "bold", // Bold text for emphasis
    paddingVertical: 4, // Vertical padding for the text box
    paddingHorizontal: 8, // Horizontal padding for the text box
    fontFamily: "Montserrat_700Bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalView: {
    margin: 20,

    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
    justifyContent: "center",
  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",

    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchheader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  searchbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reseticon: {
    marginRight: 8,
  },
  resettext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  resetbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // To make the image round
    marginRight: 15,
  },
  textContainer: {
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_700Bold",
  },
  contact: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_700Bold",
  },
});

export default CsrHomePage;
