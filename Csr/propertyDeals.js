import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Modal,
} from "react-native";
import {
  Provider as PaperProvider,
  Menu,
  Button,
  Divider,
  RadioButton,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { jwtDecode } from "jwt-decode";
import { text } from "@fortawesome/fontawesome-svg-core";

function PropertyDeals({ route }) {
  const navigation = useNavigation();

  const property = route.params;
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getCustomers();
    }, [getCustomers])
  );
  const getCustomers = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getPropertyDeals/${property.property.propertyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setLoading(false);
    }
  });

  const getTruncatedPlaceholder = (text) => {
    const maxLength = 50; // Maximum characters before truncating
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "..."; // Truncate and add ellipses
    }
    return text;
  };

  const handleSearch = async () => {
    console.log("SEARCH QUERY", query);
    setLoading(true);
    if (!query) {
      // If the search query is empty, fetch the original data
      setLoading(true); // Start loading
      await getCustomers(); // Fetch original data
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
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/searchPropertyDeals/${query}/${property.property.propertyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status !== false) {
        setLoading(true);

        setCustomers(data.data);
        setLoading(false);
        setSearched(false);

        console.log("SERACH response", data.data);
      } else {
        console.log("IN THE ELSE");
        setSearched(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setLoading(false);
    }
  };

  const startDeal = async (deal, customer) => {
    console.log("DEAL", deal);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const decodedToken = jwtDecode(token);
      const data = {
        dealId: deal.deal?._id || deal?.dealId,
        dealStatus: "InProgress",
      };

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/startDeal`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("RRESPONSE FROM BACK", response.ok);
        showToastWithGravityAndOffset();
        getCustomers();
      } else {
        throw new Error("Failed to start deal");
      }
    } catch (error) {
      console.error("Failed to start deal:", error);
    }
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Deal Started Successfully!",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  const scheduleMeet = (property, customer) => {
    console.log("PROPERTY", property);
    navigation.navigate("scheduleMeet", { deal: property, customer: customer });
  };

  const CustomerDealCard = ({ customer }) => {
    const cardBorderColor =
      customer.dealStatus === "open"
        ? "orange"
        : customer.dealStatus === "InProgress" ||
          customer.dealStatus === "In Progress" ||
          customer.dealStatus === "inProgress"
        ? "green"
        : "red";

    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [soldStatus, setSoldStatus] = useState(null);
    const [comments, setComments] = useState("");
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleViewActivity = () => {
      navigation.navigate("viewActivity", { customer: customer });
      closeMenu();
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

    const handleAddActivity = () => {
      navigation.navigate("addActivity", { customer: customer });

      closeMenu();
    };
    const handleSoldStatusChange = (value) => {
      setSoldStatus(value);
    };

    const toastForCloseDeal = () => {
      ToastAndroid.showWithGravityAndOffset(
        "Deal Closed Successfully!",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    };

    const dealClose = async (deal) => {
      console.log("DEALLLL", comments);
      const data1 = {
        dealId: deal.deal?._id || deal?.dealId,
        comments: comments,
        sellingStatus: soldStatus,
      };
      console.log("DATAAAAAAAAAAA", data1);
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }
        const decoded = jwtDecode(token);
        const id = decoded.user.userId;

        const response = await fetch(
          "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/closeDeal",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data1),
          }
        );

        console.log("Response:", response);
        if (response.status === 200) {
          toastForCloseDeal();
          setComments("");
          setSoldStatus(null);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    return (
      <View
        style={[
          styles.card,
          styles.text,
          { borderLeftWidth: 5, borderLeftColor: cardBorderColor },
        ]}
      >
        <Modal
          transparent
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerText}>Close Deal</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.closeMark}>×</Text>
                </TouchableOpacity>
              </View>

              {/* Body */}
              <Text style={styles.label}>Sold</Text>
              <View style={styles.radioGroup}>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="sold"
                    status={soldStatus === "sold" ? "checked" : "unchecked"}
                    onPress={() => handleSoldStatusChange("sold")}
                  />
                  <Text style={styles.text}>Yes</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="unSold"
                    status={soldStatus === "unSold" ? "checked" : "unchecked"}
                    onPress={() => handleSoldStatusChange("unSold")}
                  />
                  <Text style={styles.text}>No</Text>
                </View>
              </View>

              {/* Comments */}
              <Text style={styles.label}>Comments</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter comments"
                value={comments}
                multiline={true}
                numberOfLines={4}
                onChangeText={setComments}
              />

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    dealClose(customer);
                  }}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.cardHeader}>
          <Text style={styles.customerName}>
            {customer.customer.firstName} {customer.customer.lastName}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.infoText}>
                {customer.customer.accountId || "N/A"}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="phone" size={20} color="#057ef0" />
              <Text style={styles.infoText}>
                {formatPhoneNumber(customer.customer.phoneNumber) || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.infoText}>
                {customer.customer.district || "N/A"},{" "}
                {customer.customer.state || "N/A"}
              </Text>
            </View>
          </View>

          <Image
            source={{
              uri:
                customer.customer.profilePicture ||
                "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
            }}
            style={styles.profilePic}
          />
        </View>
      </View>
    );
  };

  return (
    <PaperProvider>
      <View style={styles.searchContainer}>
        {/* <Icon name="search" size={24} color="#666" style={styles.searchIcon} /> */}

        <TextInput
          placeholder={getTruncatedPlaceholder(
            "Search By Customer Id, Name, Location..."
          )}
          style={styles.searchBox}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (!text) {
              // If the text is empty, fetch original data
              setLoading(true);
              getCustomers();
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
                <Text style={styles.text}>No Customers found</Text>
              </View>
            </>
          )}

          {!searched && (
            <FlatList
              data={customers}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <CustomerDealCard customer={item} />}
              contentContainerStyle={styles.container}
            />
          )}
        </>
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  text:
  {
    fontFamily:"Montserrat_700Bold"

  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily:"Montserrat_700Bold"

  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 10,
    fontFamily:"Montserrat_700Bold"

  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily:"Montserrat_700Bold"

  },
  infoContainer: {},
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    fontFamily:"Montserrat_700Bold"

  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontFamily:"Montserrat_700Bold"

  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    fontFamily:"Montserrat_700Bold"

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    fontFamily:"Montserrat_700Bold"

  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#057ef0",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    fontFamily:"Montserrat_700Bold"

  },
  closeButton: {
    backgroundColor: "#ff4747",
    fontFamily:"Montserrat_700Bold"

  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  dealClosedText: {
    fontSize: 16,
    color: "#ff0000", // or any other color for closed deals
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  searchIcon: {
    marginLeft: 2,
    marginRight: 5, // Space between icon and text input
    color: "white",
    fontFamily:"Montserrat_700Bold"

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
    margin: 10,
    fontFamily:"Montserrat_700Bold"

  },
  searchBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff", // Input background
    borderRadius: 20, // Rounded corners for the input box
    borderWidth: 1,
    borderColor: "#ccc", // Border color
    fontFamily:"Montserrat_700Bold"

  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontFamily:"Montserrat_700Bold"

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontFamily:"Montserrat_700Bold"

  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    fontFamily:"Montserrat_700Bold"

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    fontFamily:"Montserrat_700Bold"

  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  closeMark: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    fontFamily:"Montserrat_700Bold"

  },
  radioText: {
    fontSize: 16,
    fontFamily:"Montserrat_700Bold"

  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    fontFamily:"Montserrat_700Bold"

  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    fontFamily:"Montserrat_700Bold"

  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontFamily:"Montserrat_700Bold"

  },
});

export default PropertyDeals;
