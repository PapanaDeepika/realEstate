import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import i18n, { translateKey } from "../i18n";

const BuyerDeals = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState(i18n.locale);

  // Function to handle closing the modal
  const closeModal = () => {
    setModalVisible(false);
  };
  // Sample token for Authorization header

  const handleDeals = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const url = ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getAgentDealings`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.status);
      if (response.status === false) {
        setMessage(response.message);
      } else {
        setDeals(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
      setMessage("No deals found for this customer");
    } finally {
      setIsLoading(false); // Hide loading spinner after fetching
    }
  };

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    setLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  useEffect(() => {
    handleDeals();
    loadLanguage();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     handleDeals();
  //   }, [handleDeals])

  //   );

  // const renderProperty = ({ item }) => {

  //   console.log("itemssss",item)
  //   return(<View style={styles.card}>

  // <Image src={}></Image>

  // <Text>
  //   Property Title :
  // { item.property.propertyType==="Agricultural land"&&(<Text style={styles.cardTitle}>{item.property.landDetails.title}</Text>)
  // }

  // { item.property.propertyType==="Commercial"&&(<Text style={styles.cardTitle}>{item.property.propertyTitle}</Text>)
  // }
  // { item.property.propertyType==="Residential"&&(<Text style={styles.cardTitle}>{item.property.propertyDetails.apartmentName}</Text>)
  // }
  // { item.property.propertyType==="Layout"&&(<Text style={styles.cardTitle}>{item.property.layoutDetails.layoutTitle}</Text>)
  // }
  // </Text>
  // <Text>
  // Size :

  // { item.property.propertyType==="Agricultural land"&&(<Text style={styles.cardTitle}>{item.property.landDetails.size} {item.property.landDetails.sizeUnit}</Text>)
  // }

  // { item.property.propertyType==="Commercial"&&(<Text style={styles.cardTitle}>{item.property.propertyDetails.landDetails.sell.plotSize || item.property.propertyDetails.landDetails.rent.plotSize || item.property.propertyDetails.landDetails.lease.plotSize} {item.property.propertyDetails.landDetails.sell.sizeUnit || item.property.propertyDetails.landDetails.rent.sizeUnit || item.property.propertyDetails.landDetails.lease.sizeUnit}</Text>)
  // }
  // { item.property.propertyType==="Residential"&&(<Text style={styles.cardTitle}>{item.property.propertyDetails.flatSize} {item.property.propertyDetails.sizeUnit}</Text>)
  // }
  // { item.property.propertyType==="Layout"&&(<Text style={styles.cardTitle}>{item.property.layoutDetails.plotSize}  {item.property.layoutDetails.sizeUnit}</Text>)
  // }
  // </Text>

  // <Text>
  // Price :

  // { item.property.propertyType==="Agricultural land"&&(<Text style={styles.cardTitle}>{item.property.landDetails.price}  </Text>)
  // }

  // { item.property.propertyType==="Commercial"&&(<Text style={styles.cardTitle}>{item.property.propertyDetails.landDetails.sell.price || item.property.propertyDetails.landDetails.rent.price || item.property.propertyDetails.landDetails.lease.price}</Text>)
  // }
  // { item.property.propertyType==="Residential"&&(<Text style={styles.cardTitle}>{item.property.propertyDetails.flatSize} {item.property.propertyDetails.sizeUnit}</Text>)
  // }
  // { item.property.propertyType==="Layout"&&(<Text style={styles.cardTitle}>{item.property.layoutDetails.plotSize}  {item.property.layoutDetails.sizeUnit}</Text>)
  // }
  // </Text>

  //    </View>)
  //   //   <View style={styles.card}>
  //   //     {/* <Image source={{ uri: item.landDetails.images[0] }} style={styles.cardImage} /> */}
  //   //   {/* <Text style={styles.cardTitle}>{item.landDetails.title}</Text>
  //   //   <Text style={styles.cardDescription}>{item.landDetails.size}</Text> */}
  //   //   {/* <TouchableOpacity style={styles.button}>
  //   //     <Text style={styles.buttonText}>View Details</Text>
  //   //   </TouchableOpacity> */}
  //   //   <Text>Asdf</Text>
  //   // </View>
  // }

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

  const renderProperty = ({ item }) => {
    console.log("itemssss", item);

    return (
      <View style={styles.card}>
        {/* Details Section on the Left */}
        <View style={styles.detailsContainer}>
          <Text style={styles.propertyTitle}>
            {item.property.propertyType === "Agricultural land" && (
              <Text style={styles.cardTitle}>
                {item.property.landDetails.title}
              </Text>
            )}
            {item.property.propertyType === "Agricultural land" &&
              language === "te" && (
                <Text style={styles.cardTitle}>
                  {item.property.landDetails.titleTe ||
                    item.property.landDetails.title}
                </Text>
              )}
            {item.property.propertyType === "Commercial" && (
              <Text style={styles.cardTitle}>
                {item.property.propertyTitle}
              </Text>
            )}
            {item.property.propertyType === "Commercial" &&
              language ===
                "te"(
                  <Text style={styles.cardTitle}>
                    {item.property.propertyTitleTe ||
                      item.property.propertyTitle}
                  </Text>
                )}
            {item.property.propertyType === "Residential" && (
              <Text style={styles.cardTitle}>
                {item.property.propertyDetails.apartmentName}
              </Text>
            )}
            {item.property.propertyType === "Residential" &&
              language ===
                "te"(
                  <Text style={styles.cardTitle}>
                    {item.property.propertyDetails.apartmentNameTe ||
                      item.property.propertyDetails.apartmentName}
                  </Text>
                )}

            {item.property.propertyType === "Layout" && (
              <Text style={styles.cardTitle}>
                {item.property.layoutDetails.layoutTitle}
              </Text>
            )}
            {item.property.propertyType === "Layout" &&
              language ===
                "te"(
                  <Text style={styles.cardTitle}>
                    {item.property.layoutDetails.layoutTitleTe ||
                      item.property.layoutDetails.layoutTitle}
                  </Text>
                )}
          </Text>

          <Text style={styles.propertySize}>
            {i18n.t("Size")}:
            {item.property.propertyType === "Agricultural land" && (
              <Text style={styles.cardTitle}>
                {item.property.landDetails.size}{" "}
                {translateKey(item.property.landDetails.sizeUnit)}
              </Text>
            )}
            {item.property.propertyType === "Commercial" && (
              <Text style={styles.cardTitle}>
                {item.property.propertyDetails.landDetails.sell.plotSize ||
                  item.property.propertyDetails.landDetails.rent.plotSize ||
                  item.property.propertyDetails.landDetails.lease.plotSize}
                {translateKey(
                  item.property.propertyDetails.landDetails.sell.sizeUnit ||
                    item.property.propertyDetails.landDetails.rent.sizeUnit ||
                    item.property.propertyDetails.landDetails.lease.sizeUnit
                )}
              </Text>
            )}
            {item.property.propertyType === "Residential" && (
              <Text style={styles.cardTitle}>
                {item.property.propertyDetails.flatSize}{" "}
                {translateKey(item.property.propertyDetails.sizeUnit)}
              </Text>
            )}
            {item.property.propertyType === "Layout" && (
              <Text style={styles.cardTitle}>
                {item.property.layoutDetails.plotSize}{" "}
                {translateKey(item.property.layoutDetails.sizeUnit)}
              </Text>
            )}
          </Text>

          <Text style={styles.propertyPrice}>
            {i18n.t("Price")}:
            {item.property.propertyType === "Agricultural land" && (
              <Text style={styles.cardTitle}>
                {handlePriceFormat(item.property.landDetails.price)}
              </Text>
            )}
            {item.property.propertyType === "Commercial" && (
              <Text style={styles.cardTitle}>
                {handlePriceFormat(
                  item.property.propertyDetails.landDetails.sell.price ||
                    item.property.propertyDetails.landDetails.rent.price ||
                    item.property.propertyDetails.landDetails.lease.price
                )}
              </Text>
            )}
            {item.property.propertyType === "Residential" && (
              <Text style={styles.cardTitle}>
                {handlePriceFormat(item.property.propertyDetails.flatCost)}
              </Text>
            )}
            {item.property.propertyType === "Layout" && (
              <Text style={styles.cardTitle}>
                {handlePriceFormat(item.property.layoutDetails.plotPrice)}
              </Text>
            )}
          </Text>

          <Text style={styles.propertyPrice}>
            {i18n.t("Location")}:
            {item.property.propertyType === "Agricultural land" && (
              <Text style={styles.cardTitle}>
                {i18n.t(item.property.address.district)}
              </Text>
            )}
            {item.property.propertyType === "Commercial" && (
              <Text style={styles.cardTitle}>
                {i18n.t(
                  item.property.propertyDetails.landDetails.address.district
                )}
              </Text>
            )}
            {item.property.propertyType === "Residential" && (
              <Text style={styles.cardTitle}>
                {i18n.t(item.property.address.district)}
              </Text>
            )}
            {item.property.propertyType === "Layout" && (
              <Text style={styles.cardTitle}>
                {i18n.t(item.property.layoutDetails.address.district)}
              </Text>
            )}
          </Text>

          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => setModalVisible(true)} // Show modal on click
          >
            <Text style={styles.viewMoreText}>{i18n.t("Agent")}</Text>
          </TouchableOpacity>
        </View>

        {/* Image Section on the Right */}
        {/* <Image 
        source={{ uri: item.property.propertyDetails.uploadPics[0]||item.property.uploadPics[0]||item.property.propPhotos[0]||item.property.landDetails.images[0] }} 
        style={styles.cardImage}
      /> */}

        <Image
          source={{
            uri:
              (item.property.propertyType === "Agricultural land" &&
                item.property.landDetails.images[0]) ||
              (item.property.propertyType === "Commercial" &&
                item.property.propertyDetails.uploadPics[0]) ||
              (item.property.propertyType === "Layout" &&
                item.property.uploadPics[0]) ||
              (item.property.propertyType === "Residential" &&
                item.property.propPhotos[0]) ||
              "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg",
          }}
          style={styles.cardImage}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{i18n.t("Agent Details")}</Text>
              <Text style={styles.modalText}>
                {i18n.t("Name")}: {item.agentData.firstName}
              </Text>
              <Text style={styles.modalText}>
                {i18n.t("Phone")}: {item.agentData.phoneNumber}
              </Text>

              {/* Close Button */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>{i18n.t("Close")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View  style={{marginVertical:300}}>
          <ActivityIndicator size={"large"} color={"#4184AB"} />
          </View>
       ) : (
        <View>
          {deals.length > 0 ? (
            <FlatList
              data={deals}
              keyExtractor={(item) => item.dealDetails._id}
              renderItem={renderProperty}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                marginLeft: 65,
                marginTop: 250,
              }}
            >
              {message}
            </Text>
          )}
          {/* //  <FlatList 
      //            data={deals}
      //            keyExtractor={(item) => item.dealDetails._id}
      //            renderItem={renderProperty}
      //            showsVerticalScrollIndicator={false}
      //          /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00aae7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertySize: {
    fontSize: 16,
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: "#333",
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginLeft: 16,
  },
  viewMoreButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1677ff",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default BuyerDeals;
