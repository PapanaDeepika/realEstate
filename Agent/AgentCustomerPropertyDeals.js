import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { jwtDecode } from "jwt-decode";
import i18n from "../i18n";

function CustomerPropertyDeals({ route }) {
  const navigation = useNavigation();

  const customer = route.params;
  const [property, setProperty] = useState();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [savedLanguage, setSavedLanguage] = useState("");
  const getDeals = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getCustomerDeals/${customer.customer.customerId}`,
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
  const scheduleMeet = (deal, customer) => {
    navigation.navigate("scheduleMeet", { deal: deal, customer: customer });
  };

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

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language", savedLanguage);
    setSavedLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  const handleSearch = async () => {
    console.log("SEARCH QUERY", query);
    setLoading(true);
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
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/customerFilter/${query}/${customer.customer.customerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.length === 0) {
        setSearched(true);
        setLoading(false);
      } else {
        setProperty(data);
        setLoading(true);

        console.log("Fetched searched properties :", data);
        setLoading(false);
        setSearched(false);
      }

      //             else{
      //                 console.log("IN THE ELSE")
      // setSearched(true)

      //             }
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
        dealId: deal.deal._id,
        dealStatus: "InProgress",
      };
      console.log(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/startDeal"
      );
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
        getDeals();
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

  const PropertyCard = ({ deal }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [soldStatus, setSoldStatus] = useState(null);
    const [comments, setComments] = useState("");
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const cardBorderColor =
      deal.deal.dealStatus === "open"
        ? "orange"
        : deal.deal.dealStatus === "InProgress" ||
          deal.deal.dealStatus === "In Progress" ||
          deal.deal.dealStatus === "inProgress"
        ? "green"
        : "red";

    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const handleViewActivity = (deal) => {
      navigation.navigate("viewActivity", { deal: deal });
      closeMenu();
    };

    const handleAddActivity = (deal) => {
      navigation.navigate("addActivity", { deal: deal });

      closeMenu();
    };

    const dealClose = async (deal) => {
      console.log("DEALLLL", deal);
      const data1 = {
        dealId: deal.deal?._id,
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
    return (
      <View
        style={[
          styles.card,
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
                  <Text>Yes</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="unSold"
                    status={soldStatus === "unSold" ? "checked" : "unchecked"}
                    onPress={() => handleSoldStatusChange("unSold")}
                  />
                  <Text>No</Text>
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
                    dealClose(deal);
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
            {deal.deal.propertyName || "N/A"}
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>
                <Icon name="more-vert" size={24} color="#000" />
              </Button>
            }
          >
            {(deal.deal.dealStatus === "open" ||
              deal.deal.dealStatus === "inProgress") && (
              <Menu.Item
                onPress={() => {
                  handleAddActivity(deal);
                }}
                title={i18n.t("Add Activity")}
              />
            )}
            <Menu.Item
              onPress={() => {
                handleViewActivity(deal);
              }}
              title={i18n.t("View Activity")}
            />
          </Menu>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.infoText}>
                {deal?.property?.propertyId || "N/A"}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.infoText}>
                {i18n.t(deal?.deal?.propertyType) || "N/A"}
              </Text>
            </View>

            {deal?.deal?.propertyType === "Layout" && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#057ef0"
                />
                <Text style={styles.infoText}>
                  {i18n.t(deal.property.layoutDetails.address.district) ||
                    "N/A"}
                  , {i18n.t(deal.property.layoutDetails.address.state) || "N/A"}
                </Text>
              </View>
            )}

            {deal?.deal?.propertyType === "Agricultural land" && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#057ef0"
                />
                <Text style={styles.infoText}>
                  {i18n.t(deal.property?.address?.district) || "N/A"},{" "}
                  {i18n.t(deal.property?.address?.state) || "N/A"}
                </Text>
              </View>
            )}

            {(deal?.deal?.propertyType === "Residential" ||
              deal.deal.propertyType === "residential") && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#057ef0"
                />
                <Text style={styles.infoText}>
                  {i18n.t(deal.property?.address?.district) || "N/A"},{" "}
                  {i18n.t(deal.property?.address?.state) || "N/A"}
                </Text>
              </View>
            )}

            {deal?.deal?.propertyType === "Commercial" && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#057ef0"
                />
                <Text style={styles.infoText}>
                  {i18n.t(
                    deal.property?.propertyDetails?.landDetails?.address
                      ?.district
                  ) || "N/A"}
                  ,{" "}
                  {i18n.t(
                    deal.property?.propertyDetails?.landDetails?.address?.state
                  ) || "N/A"}
                </Text>
              </View>
            )}
          </View>

          {deal?.deal?.propertyType === "Layout" && (
            <Image
              source={{
                uri:
                  deal.property.images?.[0] ||
                  deal.property.landDetails?.images?.[0] ||
                  deal.property.uploadPics?.[0] ||
                  deal.property.propPhotos?.[0] ||
                  "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg",
              }}
              style={styles.profilePic}
            />
          )}

          {deal?.deal?.propertyType === "Agricultural land" && (
            <Image
              source={{
                uri:
                  deal.property.images?.[0] ||
                  deal.property.landDetails?.images?.[0] ||
                  deal.property.uploadPics?.[0] ||
                  deal.property.propPhotos?.[0] ||
                  "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
              }}
              style={styles.profilePic}
            />
          )}

          {(deal?.deal?.propertyType === "Residential" ||
            deal.deal.propertyType === "residential") && (
            <Image
              source={{
                uri:
                  deal.property.images?.[0] ||
                  deal.property.landDetails?.images?.[0] ||
                  deal.property.uploadPics?.[0] ||
                  deal.property.propPhotos?.[0] ||
                  "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg",
              }}
              style={styles.profilePic}
            />
          )}

          {deal?.deal?.propertyType === "Commercial" && (
            <Image
              source={{
                uri:
                  deal.property.images?.[0] ||
                  deal.property.landDetails?.images?.[0] ||
                  deal.property.uploadPics?.[0] ||
                  deal.property.propPhotos?.[0] ||
                  "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg",
              }}
              style={styles.profilePic}
            />
          )}
        </View>

        {deal.deal.dealStatus === "open" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                startDeal(deal, customer);
              }}
            >
              <Text style={styles.buttonText}>{i18n.t("Start Deal")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={openModal}
            >
              <Text style={styles.buttonText}>{i18n.t("Close Deal")}</Text>
            </TouchableOpacity>
          </View>
        )}

        {deal.deal.dealStatus === "closed" && (
          <View style={styles.buttonContainer}>
            <Text style={styles.dealClosedText}>{i18n.t("Deal Closed")}</Text>
          </View>
        )}

        {(deal.deal.dealStatus === "In Progress" ||
          deal.deal.dealStatus === "InProgress" ||
          deal.deal.dealStatus === "inProgress") && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                scheduleMeet(deal, customer);
              }}
            >
              <Text style={styles.buttonText}>{i18n.t("Schedule Meet")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={openModal}
            >
              <Text style={styles.buttonText}>{i18n.t("Close Deal")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <PaperProvider>
      <View style={styles.searchContainer}>
        {/* <Icon name="search" size={24} color="#666" style={styles.searchIcon} /> */}

        <TextInput
          placeholder={i18n.t("Search By Name,Location")}
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
                <Text>No Customers found</Text>
              </View>
            </>
          )}

          {!searched && (
            <FlatList
              data={property}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <PropertyCard key={property._id} deal={item} />
              )}
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily:"Montserrat_500Medium",

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
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,

    fontFamily: "Montserrat_500Medium",
  },
  customerName: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Montserrat_500Medium",
  },
  infoContainer: { fontFamily: "Montserrat_500Medium" },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontFamily: "Montserrat_500Medium",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    fontFamily: "Montserrat_500Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#057ef0",
    paddingVertical: 10,
    borderRadius: 10,
    fontFamily: "Montserrat_500Medium",

    alignItems: "center",
  },
  closeButton: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium",

    backgroundColor: "#ff4747",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",
  },
  dealClosedText: {
    fontSize: 16,
    color: "#ff0000", // or any other color for closed deals
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
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
    margin: 10,
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
    borderColor: "#ccc", // Border color
    fontFamily: "Montserrat_500Medium",
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    fontFamily: "Montserrat_500Medium",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    fontFamily: "Montserrat_500Medium",
  },
  headerText: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Montserrat_&00Bold",
  },
  closeMark: {
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",

    // fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    fontFamily: "Montserrat_500Medium",
  },
  radioText: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    fontFamily: "Montserrat_500Medium",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    fontFamily: "Montserrat_500Medium",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontFamily: "Montserrat_500Medium",
  },
});

export default CustomerPropertyDeals;
