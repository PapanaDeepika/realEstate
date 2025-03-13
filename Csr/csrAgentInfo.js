import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SegmentedButtons } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CsrAgentInfo = ({ route }) => {
  const navigation = useNavigation();
  const [value, setValue] = useState("walk");

  const [properties, setProperties] = useState([]);

  const [customres, setCustomers] = useState([]);

  const [propertyName, setPropertyName] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleShare = async (property) => {
    let propImage = "";

    console.log("Sharing property:", property);

    if (property.propertyType === "Agricultural land") {
      propImage =
        property.images?.[0] ||
        property.landDetails?.images?.[0] ||
        property.uploadPics?.[0] ||
        property.propPhotos?.[0] ||
        "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg";
    } else if (property.propertyType === "Commercial") {
      propImage =
        property.images?.[0] ||
        property.landDetails?.images?.[0] ||
        property.uploadPics?.[0] ||
        property.propPhotos?.[0] ||
        "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg";
    } else if (property.propertyType === "Layout") {
      propImage =
        property.images?.[0] ||
        property.landDetails?.images?.[0] ||
        property.uploadPics?.[0] ||
        property.propPhotos?.[0] ||
        "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg";
    } else if (property.propertyType === "Residential") {
      propImage =
        property.images?.[0] ||
        property.landDetails?.images?.[0] ||
        property.uploadPics?.[0] ||
        property.propPhotos?.[0] ||
        "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg";
    }

    try {
      const result = await Share.share({
        message: `Check out this property:
       Title: ${property.title || property.propertyTitle}
       Type: ${property.propertyType}
       Location: ${property.district}
       Price: $${property.price}
       Image: ${propImage}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type of", result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed action");
      }
    } catch (error) {
      console.log("In the catch", error.message);
    }
  };

  useEffect(() => {
    const { agentId } = route.params;

    if (value === "walk") {
      agentProperties();
    } else {
      agentCustomers();
    }
  }, [value]);

  const propertyDetails = (item) => {
    navigation.navigate("Propdetails", { propByRoute: item });
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format it into 'xxx xxx xxxx'
    let formattedPhoneNumber = "";
    if (cleanedValue.length <= 3) {
      formattedPhoneNumber = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
    } else {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) +
        "-" +
        cleanedValue.substring(3, 6) +
        "-" +
        cleanedValue.substring(6, 10);
    }

    return formattedPhoneNumber;
  };

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
          style={styles.imageNew}
          source={{
            uri:
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
          }}
        >
          <Text style={styles.imageText}>
            {item.landDetails.title ||
              item.propertyTitle ||
              item.propertyDetails.apartmentName ||
              item.layoutDetails.layoutTitle}{" "}
            @ {item.propId || item.propertyId}
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
          style={styles.imageNew}
          source={{
            uri:
              item.propPhotos?.[0] ||
              "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg",
          }}
        >
          <Text style={styles.imageText}>
            {item.title || item.propertyDetails.apartmentName}@{" "}
            {item.propId || item.propertyId}
          </Text>
          <Text style={styles.priceBottomStyle}>
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
          style={styles.imageNew}
          source={{
            uri:
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.propertyDetails.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg",
          }}
        >
          <Text style={styles.imageText}>
            {item.title || item.propertyTitle}@ {item.propId || item.propertyId}
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
          <Text style={styles.imageText}>
            {item.title || item.layoutDetails.layoutTitle}@{" "}
            {item.propId || item.propertyId}
          </Text>
          <Text style={styles.priceBottomStyle}>
            {handlePriceFormat(item.price || item.layoutDetails?.plotPrice)}
          </Text>
          <TouchableOpacity
            style={styles.shareIcon}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={24} color="#007bff" />
          </TouchableOpacity>
        </ImageBackground>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.detailsStyles}>
          <Icon name="map-marker" size={24} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {item.district || item.address?.district || item.address}
          </Text>
        </View>
        <View style={styles.detailsStyles}>
          <Icon name="ruler" size={24} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {item.size || item.size} {"Acres"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/customer/getCustomer?agentId=673f4ceb4db48b0c88b863cf

  const renderCustomer = ({ item }) => {
    return (
      <View style={[styles.cardContainer, { flex: 1 }]}>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.contact}>
                Phone: {formatPhoneNumber(item.phoneNumber)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const agentProperties = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const { agentId } = route.params;
      setLoading(true);
      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbyid/${agentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching agents: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("response.data", data);
      setProperties(data);
      setLoading(false);
      setFilteredProperties(data);
    } catch (error) {}
  };

  const handlePropertySearch = (text) => {
    setPropertyName(text);
    setLoading(true);
    if (text === "") {
      setFilteredProperties(properties);
    } else {
      const data = properties.filter((props) => {
        if (props.propertyType === "Agricultural land") {
          return props.landDetails.title
            .toLowerCase()
            .includes(text.toLowerCase());
        }

        if (props.propertyType === "Layout") {
          return props.layoutDetails.layoutTitle
            .toLowerCase()
            .includes(text.toLowerCase());
        }

        if (props.propertyType === "Residential") {
          return props.propertyDetails.apartmentName
            .toLowerCase()
            .includes(text.toLowerCase());
        }

        if (props.propertyType === "Commercial") {
          return props.propertyTitle.toLowerCase().includes(text.toLowerCase());
        }
      });

      setFilteredProperties(data);
      setLoading(false);
    }
  };

  const handleCustomerSearch = (text) => {
    setCustomerName(text);
    setLoading1(true)
    if (text === "") {
      setFilteredCustomers(customres);
    }

    const data = customres.filter((props) => {
      return (
        props.firstName.toLowerCase().includes(text.toLowerCase()) ||
        props.lastName.toLowerCase().includes(text.toLowerCase())
      );
    });

    setFilteredCustomers(data);
    setLoading1(false)
  };

  const agentCustomers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
   

      setLoading1(true)
      const { agentId } = route.params;

      const response = await fetch(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/customer/getCustomer?agentId=${agentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching agents: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("customer.data", data);
      // setProperties(data)

      setCustomers(data);
       setLoading1(false)
      setFilteredCustomers(data);
    } catch (error) {}
  };

  return (
    <View>
      <SafeAreaView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ marginBottom: 10 }}
          buttons={[
            {
              value: "walk",
              label: "Properties",
              labelStyle:{fontFamily:"Montserrat_600SemiBold"}

            },
            {
              value: "train",
              label: "Customers",
              labelStyle:{fontFamily:"Montserrat_500SemiBold"}

            },
          ]}
        />

        {value === "walk" && (
          <View style={{ marginBottom: 150 }}>
            <View
              style={{ backgroundColor: "#4184AB", padding: 10, elevation: 2 }}
            >
              <TextInput
                placeholder="Search by Property Name"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "white",
                }}
                placeholderTextColor={"black"}
                value={propertyName}
                onChangeText={(value) => {
                  handlePropertySearch(value);
                }}
              />
            </View>
            {loading ? (
              <View style={{ marginVertical: 250 }}>
                <ActivityIndicator size={"large"} color={"#007bff"} />
              </View>
            ) : (
              <FlatList
                data={filteredProperties}
                renderItem={renderPropertyCard}
                style={{marginBottom:220}}
                showsVerticalScrollIndicator={false}

              />
            )}
          </View>
        )}

        {value === "train" && (
          <View>
            <View
              style={{ backgroundColor: "#4184AB", padding: 10, elevation: 2 }}
            >
              <TextInput
                placeholder="Search by Customer Name"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "white",
                }}
                placeholderTextColor={"black"}
                value={customerName}
                onChangeText={(value) => {
                  handleCustomerSearch(value);
                }}
              />
            </View>
 {
  loading1?(<View style={{marginVertical:250}}><ActivityIndicator size={"large"} color={"#007bff"} /></View>):(<FlatList data={filteredCustomers} renderItem={renderCustomer}  style={{marginBottom:50}}/>)
 }
             
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily:"Montserrat_700Bold"

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
    fontFamily:"Montserrat_700Bold"

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
    fontFamily:"Montserrat_700Bold"

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
    fontFamily:"Montserrat_700Bold"

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
    fontFamily:"Montserrat_700Bold"

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
    fontFamily:"Montserrat_700Bold"

  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
  recommended: {
    paddingHorizontal: 10,
  },
  textStyle: {
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 25,
    fontFamily:"Montserrat_700Bold"

  },
  detailsStyles: {
    flexDirection: "row",
  },
  textStyleNew: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
    fontFamily:"Montserrat_700Bold"

  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  shareIcon: {
    position: "absolute",
    bottom: 0, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
  },
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold",

    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
  },
  imageNew: {
    width: "100%",
    height: 200,
  },
  cardNew: {
    marginVertical: 10,

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
    fontFamily:"Montserrat_700Bold",

    width: "40%",
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
    fontFamily:"Montserrat_700Bold"

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    fontFamily:"Montserrat_700Bold"

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
    fontFamily:"Montserrat_700Bold"

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
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
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
    fontFamily:"Montserrat_700Bold"

  },
  email: {
    fontSize: 16,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
  contact: {
    fontSize: 16,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
});

export default CsrAgentInfo;
