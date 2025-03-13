import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Alert, Image, Modal, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { faL } from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";

function AuctionData() {
  const [allAuctions, setAllAuctions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);

  const [hasMoreData, setHasMoreData] = useState(true);

  const [loading1, setLoading1] = useState(false);

  const [propItem, setPropItem] = useState({ buyers: [], property: [] });
  const navigation = useNavigation();

  useEffect(() => {
    console.log("asdsdsasd");
    loadLanguage();
    fectchAllAuctions();
  }, []);
  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language", savedLanguage);
    // setSavedLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };
  const fectchAllAuctions = async () => {
    try {
      console.log("pagesss", page);

      if (page === 1) {
        setLoading(true);
      } else {
        setLoading1(true);
      }
      const token = await AsyncStorage.getItem("userToken");

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/getAllAuctions?page=${page}&&limit=8`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          console.log("Response.data", resp.data.data);

          const data = resp.data.data;
          setAllAuctions((prevData) => [...prevData, ...data]);

          setPage((prevPage) => prevPage + 1);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);

          setHasMoreData(false);
        });
    } catch (error) {
      console.log(error);
      setHasMoreData(false);
    } finally {
      setLoading(false);

      setLoading1(false);
    }
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

  const handleCancel = (item) => {
    Alert.alert("Confirm Action", "Are you sure you want to cancel auction?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => handleClose(item) },
    ]);
  };

  const handleClose = async (item) => {
    try {
      const url = `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/closeAuction/:auctionId`;
      const token = await AsyncStorage.getItem("userToken");

      const auctionId = item._id;
      console.log(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/closeAuction/${auctionId}`
      );
      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/closeAuction/${auctionId}`,
        {
          method: "put",
          data: { auctionId: auctionId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
          ToastAndroid.showWithGravityAndOffset(
            "Auction Cancelled Successfully",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
          fectchAllAuctions();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("error");
    }
  };

  const handleModel = (item) => {
    navigation.navigate("bidData", { bid: item });
    setPropItem(item);
    console.log("itemsss", item);
    setShowModal(true);
  };

  const renderAuction = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.detailsContainer}>
          {new Date(item.startDate).toLocaleString() >
          new Date().toLocaleString() ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                <MaterialCommunityIcons
                  name="progress-clock"
                  size={20}
                  color="#007bff"
                />
                {i18n.t("Auction Not Started")}
              </Text>
            </View>
          ) : new Date(item.endDate).toLocaleString() <
            new Date().toLocaleString() ? (
            <View style={styles.tag}>
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color="#007bff"
              />
              <Text style={styles.tagText}>{i18n.t("Closed")}</Text>
            </View>
          ) : (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={20}
                  color="#007bff"
                />
                {i18n.t("On Going")}
              </Text>
            </View>
          )}
          <Text style={styles.propertyTitle}>{getPropertyName(item)}</Text>
          <Text style={styles.amount}>{handlePriceFormat(item.amount)}</Text>
          <Text style={styles.date}>
            {i18n.t("Ends")}: {new Date(item.endDate).toLocaleString()}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: getImageUri(item) }}
            style={styles.propertyImage}
          />
        </View>
      </View>

      {console.log(
        new Date(item.startDate),
        (new Date(item.startDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60)
      )}
      {new Date(item.startDate).toLocaleString() >
      new Date().toLocaleString() ? (
        Math.floor(
          (new Date(item.startDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60)
        ) === 18 ? (
          <View>
            <TouchableOpacity
              style={styles.viewMoreButton1}
              onPress={() => handleCancel(item)}
              disabled={true}
            >
              <Text style={styles.buttonText}>{i18n.t("Cancel")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => handleCancel(item)}
            >
              <Text style={styles.buttonText}>{i18n.t("Cancel")}</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => handleModel(item)}
          >
            <Text style={styles.buttonText}>{i18n.t("View Bids")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const getImageUri = (item) => {
    if (item.property[0].propertyType === "Agricultural land") {
      return item.property[0]?.landDetails?.images?.[0] || "default_image_url";
    }
    if (item.property[0].propertyType === "Commercial") {
      return (
        item.property[0]?.propertyDetails?.uploadPics?.[0] ||
        "default_image_url"
      );
    }
    if (item.property[0].propertyType === "Layout") {
      return item.property[0]?.uploadPics?.[0] || "default_image_url";
    }
    if (item.property[0].propertyType === "Residential") {
      return item.property[0]?.propPhotos?.[0] || "default_image_url";
    }
    return "default_image_url";
  };

  const getPropertyName = (item) => {
    if (item.property[0].propertyType === "Agricultural land") {
      return item.property[0]?.landDetails?.title || "N/A";
    }
    if (item.property[0].propertyType === "Commercial") {
      return item.property[0]?.propertyTitle || "N/A";
    }
    if (item.property[0].propertyType === "Layout") {
      return item.property[0]?.layoutDetails?.layoutTitle || "N/A";
    }
    if (item.property[0].propertyType === "Residential") {
      return item.property[0]?.propertyDetails?.apartmentName || "N/A";
    }
    return "Unknown Property";
  };

  return (
    <View>
      {console.log("asdsadsdsad", allAuctions, allAuctions.length)}
      {loading ? (
        <View style={{ marginVertical: 300 }}>
          <ActivityIndicator size={"large"} color={"#007bff"} />
        </View>
      ) : allAuctions.length > 0 ? (
        <FlatList
          data={allAuctions}
          renderItem={renderAuction}
          onEndReached={() => {
            if (hasMoreData) {
              fectchAllAuctions();
            }
          }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <>
              {loading1 ? (
                <ActivityIndicator size={"large"} color={"#007bff"} />
              ) : null}
            </>
          }
        />
      ) : (
        <View>
          <Text>{i18n.t("No Active Auctions")}</Text>
        </View>
      )}

      <View style={styles.overlayButtonContainer}>
        <TouchableOpacity
          style={styles.overlayButton}
          onPress={() => navigation.navigate("auctionForm")}
        >
          <Text style={styles.overlayButtonText}>
            <Feather name="plus" size={20} color="white" /> {i18n.t("Start Auction")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AuctionData;

const styles = StyleSheet.create({
  list: {
    padding: 10,
    fontFamily: "Montserrat_500Medium",
  },
  overlayButtonContainer: {
    position: "absolute", // Ensure it's positioned relative to the parent
    top: 700, // Adjust as needed
    right: 10, // Adjust as needed
    zIndex: 1, // Ensure it stays on top of other elements
    fontFamily: "Montserrat_500Medium",
  },
  overlayButton: {
    backgroundColor: "#368ca8", // Or your button style
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontFamily: "Montserrat_500Medium",
  },
  overlayButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    // fontWeight:"600"
    fontFamily: "Montserrat_500Medium",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    fontFamily: "Montserrat_500Medium",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E86C1",
    fontFamily: "Montserrat_500Medium",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27AE60",
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
  },
  date: {
    fontSize: 12,
    color: "#7D7D7D",
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
  },
  property: {
    fontSize: 14,
    fontWeight: "500",
    color: "#34495E",
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginHorizontal: 10,
    fontFamily: "Montserrat_500Medium",
    elevation: 4, // For Android shadow
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
  },
  detailsContainer: {
    flex: 1,
    paddingRight: 10, // Space between text and image
  },
  propertyTitle: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium",
  },
  amount: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#27AE60",
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium",
  },
  status: {
    fontSize: 14,
    // fontWeight: "600",
    color: "#E67E22",
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium",
  },
  date: {
    fontSize: 14,
    color: "#7D7D7D",
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 10,
    overflow: "hidden",
  },
  propertyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontFamily: "Montserrat_500Medium",
  },
  closeAuctionButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
    fontFamily: "Montserrat_500Medium",
  },
  viewMoreButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
    fontFamily: "Montserrat_500Medium",
  },
  viewMoreButton1: {
    flex: 1,
    backgroundColor: "#3d7cbf",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
    fontFamily: "Montserrat_500Medium",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background,

    fontFamily: "Montserrat_500Medium",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "flex-start",
    fontFamily: "Montserrat_500Medium",
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#333",
    fontFamily: "Montserrat_500Medium",
  },
  tableContainer: {
    marginTop: 20,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    fontFamily: "Montserrat_500Medium",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#4184AB",
    fontFamily: "Montserrat_500Medium",
  },
  tableHeaderText: {
    // fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    width: "33%",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableText: {
    fontSize: 16,
    color: "#555",
    width: "33%",
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  //   closeButton: {
  //     // marginTop: 20,
  //     color: '#007BFF',
  //     fontSize: 16,
  //     // fontWeight: 'bold',
  //     position:"absolute",
  //     bottom:-20,
  //      left:320,
  //     backgroundColor: 'rgba(172, 166, 166, 0.5)', // Dim the background,
  //     padding:5,
  //     borderRadius:20
  //   },

  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for overlay
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    width: "100%",
  },
  closeButton: {
    fontSize: 20,
    // fontWeight: "bold",

    fontFamily: "Montserrat_500Medium",
    position: "absolute",
    top: -8,
    right: 5,
    color: "black",
  },

  modalText: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_500Medium",
  },

  tag: {
    position: "absolute",
    top: 0,
    padding: 10,
    backgroundColor: "rgba(163, 210, 224, 0.47)",
    width: "auto",
    borderBottomRightRadius: 20,
    fontFamily: "Montserrat_500Medium",
  },
  tagText: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Montserrat_500Medium",
  },
});
