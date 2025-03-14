import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
  Pressable,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Share } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetExample from "../BottomSheetExample";
import { ImageBackground } from "react-native";
const SCALE_FACTOR = 1000000; // 1 million

function Commercials({ navigation }) {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading1, setLoading1] = useState(false);

  const fetchProperties =  async () => {
     try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const savedFilters = await AsyncStorage.getItem(
        "searchFiltersCommercial"
      );

      console.log("123", JSON.parse(savedFilters));
      if (JSON.parse(savedFilters)) {
        const parsedFilters = JSON.parse(savedFilters);

        const response = await axios.get(
          "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/filterRoutes/commercialSearch",
          {
            params: parsedFilters,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.data &&
          (response.status === 200 || response.status === 201)
        ) {
          console.log("12345", response.data.data);
          setFilteredProperties(response.data.data);
           setLoading(false);
        }
      }
      if (!savedFilters) {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoading1(true);
        }
        console.log(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//commercials/getallcommercials?page=${page}&limit=8`)
        const response = await fetch( `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//commercials/getallcommercials?page=${page}&limit=8`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("dtaa",data)
        if (data.length > 0) {
          setProperties((prevData) => [...prevData, ...data]);
          setFilteredProperties((prevData) => [...prevData, ...data]);
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
          setRefreshing(false);
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
      setRefreshing(false);
    } finally {
      setLoading(false);
      setLoading1(false)
    }
  };

useEffect(() => {
  console.log("sdsdasd")
      fetchProperties();
    }, [])
 
  const checkinglanguage = useCallback(async () => {
    const value = AsyncStorage.getItem("lang");
    console.log("VALUE for the language", value);
  }, []);

  const getSearchDetails = async () => {
    console.log("In the search method")
    if (searchQuery.trim() === "") {

      setFilteredProperties(properties);
      return;
    }

    // try {
    //   const token = await AsyncStorage.getItem("userToken");
    //   if (!token) {
    //     console.log("No token found");
    //     return;
    //   }

    //   console.log("Sending search request with query:", searchQuery);
    //   const response = await axios.get(` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropertiesFilter/${searchQuery}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   console.log("Search response:", response.data);

    //   if (response.data && Array.isArray(response.data)) {
    //     setFilteredProperties(response.data);
    //   } else {
    //     console.error("Unexpected response format:", response.data);
    //     setFilteredProperties([]);
    //   }
    // } catch (error) {
    //   console.error("Failed to search properties:", error);
    //   setFilteredProperties([]);
    // }

    const lowercasedQuery = searchQuery.toLowerCase();
    console.log("LOWERCASE QUERY", lowercasedQuery);

    const results = properties.filter((prop) => {
      return (
        prop.propertyId?.toLowerCase().includes(lowercasedQuery) ||
        prop.landDetails?.title?.toLowerCase().includes(lowercasedQuery) ||
        prop.layoutDetails?.layoutTitle
          ?.toLowerCase()
          .includes(lowercasedQuery) ||
        prop.propertyDetails?.apartmentName
          ?.toLowerCase()
          .includes(lowercasedQuery) ||
        prop.propertyTitle?.toLowerCase().includes(lowercasedQuery) ||
        prop.address?.district?.toLowerCase().includes(lowercasedQuery) ||
        prop.address?.state?.toLowerCase().includes(lowercasedQuery) ||
        prop.layoutDetails?.address?.district
          ?.toLowerCase()
          .includes(lowercasedQuery) ||
        prop.layoutDetails?.address?.state
          ?.toLowerCase()
          .includes(lowercasedQuery) ||
        prop.propertyDetails?.landDetails?.address?.district
          ?.toLowerCase()
          .includes(lowercasedQuery) ||
        prop.propertyDetails?.landDetails?.address?.state
          ?.toLowerCase()
          .includes(lowercasedQuery)
      );
    });

    console.log("SEARCH RESULTS", results);

    setFilteredProperties(results);
  };

  const filtersScreen = () => {
    // toggleBottomSheet()
    navigation.navigate("as", { type: "commercial" });
  };

  const propertyDetails = (item) => {
    navigation.navigate("Propdetails", { propByRoute: item });
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
    // <TouchableOpacity style={styles.card} onPress={() => propertyDetails(item)} key={item._id}>
    //   {/* Image */}
    //   {(item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0]) ? (
    //     <Image
    //       source={{ uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] }}
    //       style={styles.propertyImage}
    //     />
    //   ) : (
    //     <Text>No image available</Text>
    //   )}

    //   <View style={styles.cardContent}>
    //     <View style={styles.cardHeader}>
    //       <Text style={styles.propertyName}>{item.title || item.propertyTitle}</Text>
    //       <TouchableOpacity onPress={() => handleShare(item)}>
    //         <Icon name="share" size={24} color="#007bff" />
    //       </TouchableOpacity>
    //     </View>

    //     <View style={styles.propertyDetailsContainer}>
    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="map-marker" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Location: {item.district || item.address?.district || item.address}
    //         </Text>
    //       </View>

    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="currency-usd" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Price: ${item.price || item.landDetails?.price}
    //         </Text>
    //       </View>

    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="ruler" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Size: {item.size || item.size} acres
    //         </Text>
    //       </View>

    //       <View style={styles.propertyDetailRow}>
    //         <Icon name="home" size={20} color="#007bff" />
    //         <Text style={styles.propertyDetails}>
    //           Type: {item.propertyType}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      style={styles.cardNew}
      onPress={() => propertyDetails(item)}
      key={item._id}
    >
      {item.propertyType === "Commercial" && (
        <ImageBackground
          style={styles.imageNew}
          source={{
            uri:
              item.propertyDetails?.uploadPics?.[0] ||
              "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
          }}
        >
          <Text style={styles.imageText}>
            {item.propertyTitle} @ {item.propertyId}
          </Text>
          <Text style={styles.priceBottomStyle}>
            {formatPrice(
              item.propertyDetails?.landDetails?.sell?.price ||
                item.propertyDetails?.landDetails?.rent?.rent ||
                item.propertyDetails?.landDetails?.lease?.leasePrice
            )}{" "}
            /{" "}
            {item.propertyDetails?.landDetails?.sell?.sizeUnit ||
              item.propertyDetails?.landDetails?.rent?.sizeUnit ||
              item.propertyDetails?.landDetails?.lease?.sizeUnit}
          </Text>
        </ImageBackground>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.detailsStyles}>
          <Icon name="map-marker" size={24} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {item.propertyDetails?.landDetails?.address?.district}
          </Text>
        </View>
        <View style={styles.detailsStyles}>
          <Icon name="ruler" size={24} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {item.propertyDetails?.landDetails?.sell?.plotSize ||
              item.propertyDetails?.landDetails?.rent?.plotSize ||
              item.propertyDetails?.landDetails?.lease?.plotSize}{" "}
            {item.propertyDetails?.landDetails?.sell?.sizeUnit ||
              item.propertyDetails?.landDetails?.rent?.sizeUnit ||
              item.propertyDetails?.landDetails?.lease?.sizeUnit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProperties();
  }, [fetchProperties]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.welcomeContainer} >Welcome, John</Text> */}
         <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search By Property Name, Location..."
            style={styles.searchBox}
            value={searchQuery}
            onChangeText={(value) => {
              setSearchQuery(value);
              if (!value) {
                setLoading(true);
                setPage(1)
                fetchProperties();
              }
            }}
            returnKeyType="search"
            onSubmitEditing={() => getSearchDetails()}
          />
          <TouchableOpacity onPress={filtersScreen}>
            <Icon name="filter" size={30} style={styles.filterButton} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.propertyListContainer}>
          {loading ? (
            <View style={{ marginVertical: 300 }}>
              <ActivityIndicator size="large" color="#007bff" />
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={filteredProperties}
              renderItem={renderPropertyCard}
               contentContainerStyle={styles.propertyList}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <Text style={styles.emptyListText}>No properties found</Text>
              }

              onEndReached={()=>{
                if(hasMoreData)
                {
                  fetchProperties()
                }
              }}

              ListFooterComponent={<>{loading1?(<ActivityIndicator size={"large"} />):(null)}</>}
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
    backgroundColor: "#f5f5f5",
    fontFamily: "Montserrat_500Medium",

  },

  welcomeContainer: {
    padding: 20,
    fontSize: 25,
    backgroundColor: "#4184AB",
    color: "white",
    fontStyle: "italic",
    fontFamily: "Montserrat_500Medium",

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
    fontFamily: "Montserrat_500Medium",

  },
  searchBox: {
    flex: 1,
    fontFamily: "Montserrat_500Medium",

    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginRight: 10,
  },

  propertyListContainer: {
    flex: 1,
    fontFamily: "Montserrat_500Medium",

  },
  propertyList: {
    paddingHorizontal: 15,
    fontFamily: "Montserrat_500Medium",

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
    fontFamily: "Montserrat_500Medium",

  },
  shareIcon: {
    position: "absolute",
    fontFamily: "Montserrat_500Medium",

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
    fontFamily: "Montserrat_500Medium",

  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,

    fontFamily: "Montserrat_500Medium",

  },
  propertyName: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",

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
    fontFamily: "Montserrat_500Medium",

  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_500Medium",

  },
  recommended: {
    paddingHorizontal: 10,
  },
  textStyle: {
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_500Medium",

  },
  detailsStyles: {
    flexDirection: "row",
  },
  textStyleNew: {
    marginLeft: 5,
    fontSize: 16,
    // fontWeight: "500",
    
    fontFamily: "Montserrat_500Medium",


  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontFamily: "Montserrat_500Medium",

  },
  shareIcon: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
    fontFamily: "Montserrat_500Medium",

  },
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
  },
  imageNew: {
    width: "100%",
    height: 200,
    fontFamily: "Montserrat_500Medium",

  },
  cardNew: {
    marginVertical: 10,
    fontFamily: "Montserrat_500Medium",

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
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",

    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
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
    // fontWeight: "bold", // Bold text for emphasis
    paddingVertical: 4, // Vertical padding for the text box
    paddingHorizontal: 8, // Horizontal padding for the text box
    fontFamily: "Montserrat_600SemiBold",

  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    fontFamily: "Montserrat_500Medium",

    borderRadius: 5,
  },
});

export default Commercials;
