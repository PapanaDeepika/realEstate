import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import i18n from "../i18n";

function AgentPropertyDeals() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const buttonWidth = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [150, 60],
    extrapolate: "clamp",
  });

  const buttonTextOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [50, 0],
    extrapolate: "clamp",
  });

  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const [page, setPage] = useState(1);

  const [loading1, setLoading1] = useState(false);

  const [hasMoreData, setHasMoreData] = useState(true);

  const handleSearch = async () => {
    console.log("SEARCH QUERY", query);
    setLoading(true);

    if (!query) {
      // If the search query is empty, fetch the original data
      setLoading(true); // Start loading
      await getDealAssociatedProperties(); // Fetch original data
      setSearched(false); // Reset searched state
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/dealsSearchOnProps/${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status !== "false") {
        setLoading(true);
        setProperties(data.data);
        setLoading(false);
      } else {
        console.log("IN THE ELSE");
        setSearched(true);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    setSelectedLang(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!query) {
        getDealAssociatedProperties();
      }
    }, [query])
  );
  const getDealAssociatedProperties = useCallback(async () => {
    try {
      console.log("pageesss..", page);
      if (page === 1) {
        setLoading(true);
      } else {
        setLoading1(true);
      }
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//deal/getDistinctProperties?page=${page}&limit=8`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        setProperties((prevData) => [...prevData, ...data]);

        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);

      setHasMoreData(false);
    } finally {
      setLoading(false);
      setLoading1(false);
    }
  });

  const getDealByCId = (property) => {
    navigation.navigate("getDealByPId", { property: property });
  };

  const PropertyDealCard = ({ property }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.customerName}>
            {property.propertyName || "N/A"}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.detailText}>
                {property.accountId || "N/A"}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.detailText}>
                {i18n.t(property.propertyType) || "N/A"}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.detailText}>
                {i18n.t(property.district) || "N/A"},{" "}
                {i18n.t(property.state) || "N/A"}
              </Text>
            </View>
          </View>
        </Card.Content>

        <Image
          source={{
            uri:
              property.images?.[0] ||
              "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
          }}
          style={styles.propertyImage}
        />

        <View
          style={{ alignItems: "flex-end", marginRight: 20, marginBottom: 10 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#057ef0",
              paddingHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 5,
            }}
            onPress={() => {
              getDealByCId(property);
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {i18n.t("View Deals")}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const getTruncatedPlaceholder = (text) => {
    const maxLength = 39; // Maximum characters before truncating
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "..."; // Truncate and add ellipses
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />

        <TextInput
          placeholder={i18n.t("Search By Name,Location")}
          style={styles.searchBox}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (!text) {
              // If the text is empty, fetch original data
              setLoading(true);
              getDealAssociatedProperties();
              setSearched(false);
            }
          }}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch()}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
      ) : (
        <>
          {searched && (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="group-off" size={24} color="black" />
                <Text>No Properties found</Text>
              </View>
            </>
          )}
          {/* {!searched && (
                 <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                 <View style={styles.listContainer}>
                   <FlatList
                     data={properties}
                     keyExtractor={(item) => item.propertyId || item.accountId}
                     renderItem={({ item }) => <PropertyDealCard property={item} />}
                     scrollEnabled={false}
                   />
                 </View>
               </ScrollView>
              )} */}

          {!searched && (
            <View style={styles.listContainer}>
              <Animated.FlatList
                showsVerticalScrollIndicator={false}
                data={properties}
                keyExtractor={(item) => item.propertyId || item.accountId}
                renderItem={({ item }) => <PropertyDealCard property={item} />}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
                contentContainerStyle={[
                  styles.list,
                  { backgroundColor: "#f0f0f0" },
                ]}
                onEndReached={() => {
                  if (hasMoreData) {
                    getDealAssociatedProperties();
                  }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  <>
                    {loading1 ? (
                      <ActivityIndicator size={"large"} color={"#057ef0"} />
                    ) : null}
                  </>
                }
              />
            </View>
          )}

          <Animated.View
            style={[
              styles.floatingButton,
              {
                width: buttonWidth,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => navigation.navigate("createDeal")}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    marginLeft: buttonTextOpacity.interpolate({
                      inputRange: [0, 0],
                      outputRange: [28, 0], // Moves to center when text fades out
                    }),
                  },
                ]}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </Animated.View>
              <Animated.Text
                style={[styles.buttonText, { opacity: buttonTextOpacity }]}
              >
                {i18n.t("Create a Deal")}
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingBottom: 50,
    fontFamily: "Montserrat_500Medium",
  },
  listContainer: {
    padding: 5,
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
  },
  card: {
    marginBottom: 10,
    elevation: 4,
    fontFamily: "Montserrat_500Medium",

    borderRadius: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
  },

  customerName: {
    fontSize: 18,
    color: "#333333",
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",
  },

  detailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",

    marginVertical: 4,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Space out buttons evenly
    paddingBottom: 8,
    paddingTop: 8,
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    width: 100, // Fixed width for buttons
    marginHorizontal: 4,
    fontFamily: "Montserrat_500Medium",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",

    justifyContent: "center",
  },
  propertyImage: {
    position: "absolute",
    top: 20,
    fontFamily: "Montserrat_500Medium",

    right: 10,
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
    borderRadius: 40, // Optional, to make the image rounded
  },
  searchIcon: {
    marginLeft: 2,
    marginRight: 5, // Space between icon and text input
    color: "white",
    fontFamily: "Montserrat_500Medium",
  },
  searchContainer: {
    paddingHorizontal: 5,
    backgroundColor: "#4184AB", // Light background
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow blur
    elevation: 3, // For Android shadow
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Vertically center the input
    paddingVertical: 10,
    fontFamily: "Montserrat_500Medium",
  },
  searchBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff", // Input background
    borderRadius: 20, // Rounded corners for the input box
    borderWidth: 1,
    fontFamily: "Montserrat_500Medium",

    borderColor: "#ccc", // Border color
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 10,
    height: 50,
    backgroundColor: "#05b7f7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    elevation: 5,
    fontFamily: "Montserrat_500Medium",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Starts aligned to the left
    paddingHorizontal: 10,
    fontFamily: "Montserrat_500Medium",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat_500Medium",

    color: "#05b7f7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    // fontWeight: "bold",    fontFamily: "Montserrat_500Medium",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default AgentPropertyDeals;
