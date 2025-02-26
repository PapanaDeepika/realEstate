import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
// import ScheduleMeeting from "./ScheduleMeeting";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function MarketingAgentCustomerPropertyDeals({ route }) {
  const [modal, setModal] = useState(false);

  const navigation = useNavigation();

  const PropertyCard = ({ deal }) => {
    const cardBorderColor = deal.deal.dealStatus === "open" ? "green" : "red";

    return (
      <Card
        style={[
          styles.card,
          { borderLeftWidth: 5, borderLeftColor: cardBorderColor },
        ]}
      >
        <Card.Content>
          <Text style={styles.customerName}>{deal.deal.propertyName}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.detailText}>{deal.property.propertyId}</Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.detailText}>{deal.deal.propertyType}</Text>
            </View>

            {deal.deal.propertyType === "Layout" && (
              <View style={styles.detailItem}>
                <Entypo name="location-pin" size={20} color="#057ef0" />
                <Text style={styles.detailText}>
                  {deal.property.layoutDetails.address.district},{" "}
                  {deal.property.layoutDetails.address.state}
                </Text>
              </View>
            )}

            {deal.property.propertyType === "Agricultural land" && (
              <View style={styles.detailItem}>
                <Entypo name="location-pin" size={20} color="#057ef0" />
                <Text style={styles.detailText}>
                  {deal.property?.address?.district},{" "}
                  {deal.property?.address?.state}
                </Text>
              </View>
            )}

            {(deal.deal.propertyType === "Residential" ||
              deal.deal.propertyType === "residential") && (
              <View style={styles.detailItem}>
                <Entypo name="location-pin" size={20} color="#057ef0" />
                <Text style={styles.detailText}>
                  {deal.property?.address?.district},{" "}
                  {deal.property?.address?.state}
                </Text>
              </View>
            )}

            {deal.deal.propertyType === "Commercial" && (
              <View style={styles.detailItem}>
                <Entypo name="location-pin" size={20} color="#057ef0" />
                <Text style={styles.detailText}>
                  {
                    deal.property?.propertyDetails?.landDetails?.address
                      ?.district
                  }
                  ,{" "}
                  {deal.property?.propertyDetails?.landDetails?.address?.state}
                </Text>
              </View>
            )}
          </View>
        </Card.Content>

        {deal.deal.propertyType === "Commercial" && (
          <Image
            source={{
              uri:
                deal?.property?.propertyDetails?.uploadPics[0] ||
                "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
            }} // Assuming you have the URL for the property image
            style={styles.propertyImage}
          />
        )}
        {deal.deal.propertyType === "Agricultural land" && (
          <Image
            source={{
              uri:
                deal?.property?.landDetails?.images[0] ||
                "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
            }} // Assuming you have the URL for the property image
            style={styles.propertyImage}
          />
        )}
        {deal.deal.propertyType === "Layout" && (
          <Image
            source={{
              uri:
                deal?.property?.uploadPics[0] ||
                "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
            }} // Assuming you have the URL for the property image
            style={styles.propertyImage}
          />
        )}
        {deal.deal.propertyType === "Residential" && (
          <Image
            source={{
              uri:
                deal?.property?.propPhotos[0] ||
                "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
            }} // Assuming you have the URL for the property image
            style={styles.propertyImage}
          />
        )}
      </Card>
    );
  };

  const customer = route.params;
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  console.log("CUSTOMER ID", customer.customer.deal.customerId);

  const handleSearch = async () => {
    console.log("SEARCH QUERY", query);
    if (!query) {
      // If the search query is empty, fetch the original data
      setLoading(true); // Start loading
      await getDeals(); // Fetch original data
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
        `http://172.17.15.189:3000/deal/customerDealsFilter/${customer.customer.deal.customerId}?text=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setProperty(data);
      console.log("Fetched searched properties :", data);
      setLoading(false);
      setSearched(false);

      //             else{
      //                 console.log("IN THE ELSE")
      // setSearched(true)

      //             }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setLoading(false);
    }
  };
  const getDeals = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        `http://172.17.15.189:3000/deal/getCustomerDeals/${customer.customer.deal.customerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setProperty(data);
      console.log("Fetched properties:", data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDeals();
    }, [getDeals])
  );
  const getTruncatedPlaceholder = (text) => {
    const maxLength = 50; // Maximum characters before truncating
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "..."; // Truncate and add ellipses
    }
    return text;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder={getTruncatedPlaceholder(
                "Search By Property Id, Name, Location, Type..."
              )}
              style={styles.searchBox}
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                if (!text) {
                  // If the text is empty, fetch original data
                  setLoading(true);
                  getDeals();
                  setSearched(false);
                }
              }}
              returnKeyType="search"
              onSubmitEditing={() => handleSearch()}
            />
          </View>

          {property.length === 0 && (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="building" size={24} color="black" />
                <Text>No Properties found</Text>
              </View>
            </>
          )}
          {!searched && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              {property.map((property) => (
                <PropertyCard key={property._id} deal={property} />
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 5,
    paddingRight: 10,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 4,
  },
  customerName: {
    fontSize: 18,
    color: "#333333",
    fontFamily:'Montserrat_500Medium'
  },
  propertyTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily:'Montserrat_500Medium'

  },
  avatar: {
    position: "absolute",
    right: 16,
    top: "40%",
    transform: [{ translateY: -24 }], // To center vertically
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#057ef0",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#ff4747",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#4184AB",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderRadius: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginRight: 10,
    fontFamily:'Montserrat_400Regular'
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  dealClosedText: {
    fontSize: 16,
    color: "#ff0000", // or any other color for closed deals
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  propertyImage: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
    borderRadius: 40, // Optional, to make the image rounded
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default MarketingAgentCustomerPropertyDeals;
