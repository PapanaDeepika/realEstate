import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CountdownTimer from "../Screens/CountdownTimer";
import { SectionList } from "react-native-web";
import axios from "axios";
import i18n from "../i18n";
import { translateKey } from "../i18n";
export default function AuctionCarousal() {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState([]);
  const [language, setLanguage] = useState(i18n.locale);

  const getTodayAuction = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setLoading(true);
      if (!token) {
        console.log("No token found");
        return;
      }
      const tokenData = jwtDecode(token);
      await axios("https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/getTodayAuctions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("sadkledjiefjc", response.data);

          setAuctionData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error1232321", error);
        });
    } catch (error) {
      console.error("Failed to fetch properties:12323123", error);
      setLoading(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      getTodayAuction();
      loadLanguage();
    }, [getTodayAuction, loadLanguage])
  );

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    setLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
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
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update current date every minute
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (auctionData.length > 0) {
      let interval = setInterval(() => {
        if (
          activeIndex === auctionData.length - 1 ||
          Math.ceil(activeIndex) === auctionData.length - 1
        ) {
          flatListRef.current.scrollToIndex({
            index: 0,
            animation: true,
          });
        } else {
          flatListRef.current.scrollToIndex({
            index: activeIndex + 1,
            animation: true,
          });
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  });

  const handleParticipate = (item) => {
    navigation.navigate("ae", { property: item });
  };

  const renderItem = ({ item, index }) => {
    return (
      // <View>

      //      {/* <Image source={{uri:(item?.image)}} style={{height:200, width:SCREEN_WIDTH}}/> */}
      // </View>
      <>
        <View style={{ flexDirection: "column", backgroundColor: "black" }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#f0f8ff",
              padding: 10,
            }}
          >
            <CountdownTimer
              targetDate={item.endDate}
              currentDate={currentDate}
            />
          </View>

          <TouchableOpacity style={styles.cardNew} key={item._id}>
            {(item.property.propertyType === "Agricultural land" ||
              item.property.propertyType === "Agricultural") && (
              <ImageBackground
                style={styles.imageNew}
                source={{
                  uri:
                    item.property?.images?.[0] ||
                    item.property?.landDetails?.images?.[0] ||
                    item.property?.uploadPics?.[0] ||
                    item.property?.propPhotos?.[0] ||
                    "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
                }}
              >
                {language === "te" ? (
                  <Text style={styles.imageText}>
                    {item.property?.landDetails?.title||item.property?.landDetails?.titleTe} @{" "}
                    {item.property?.propertyId}
                  </Text>
                ) : (
                  <Text style={styles.imageText}>
                    {item.property?.landDetails?.title} @{" "}
                    {item.property?.propertyId}
                  </Text>
                )}

                <Text style={styles.priceBottomStyle}>
                  {formatPrice(item.amount)}
                </Text>
              </ImageBackground>
            )}

            {item.property.propertyType === "Residential" && (
              <ImageBackground
                style={styles.imageNew}
                source={{
                  uri:
                    item.property?.propPhotos?.length > 0
                      ? item.property?.propPhotos?.[0]
                      : "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
                }}
              >
                {language === "te" ? (
                  <Text style={styles.imageText}>
                    {item.property?.propertyDetails?.apartmentNameTe||item.property?.propertyDetails?.apartmentName} @{" "}
                    {item.property?.propertyId}
                  </Text>
                ) : (
                  <Text style={styles.imageText}>
                    {item.property?.propertyDetails?.apartmentName} @{" "}
                    {item.property?.propertyId}
                  </Text>
                )}

                <Text style={styles.priceBottomStyle}>
                  {formatPrice(item.amount)}
                </Text>
              </ImageBackground>
            )}

            {item.property.propertyType === "Commercial" && (
              <ImageBackground
                style={styles.imageNew}
                source={{
                  uri:
                    item.property?.propertyDetails?.uploadPics?.[0] ||
                    "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
                }}
              >
                {language === "te" ? (
                  <Text style={styles.imageText}>
                    {item.property?.propertyTitleTe||item.property?.propertyTitle} @{" "}
                    {item.property?.propertyId}
                  </Text>
                ) : (
                  <Text style={styles.imageText}>
                    {item.property?.propertyTitle} @ {item.property?.propertyId}
                  </Text>
                )}

                <Text style={styles.priceBottomStyle}>
                  {formatPrice(item.amount)}
                </Text>
              </ImageBackground>
            )}

            {item.property.propertyType === "Layout" && (
              <ImageBackground
                style={styles.imageNew}
                source={{
                  uri:
                    item.property?.images?.[0] ||
                    item.property?.landDetails?.images?.[0] ||
                    item.property?.uploadPics?.[0] ||
                    item.property?.propPhotos?.[0] ||
                    "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
                }}
              >
                {language === "te" ? (
                  <Text style={styles.imageText}>
                    {item.property?.layoutDetails?.layoutTitleTe||item.property?.layoutDetails?.layoutTitle} @{" "}
                    {item.property?.propertyId}
                  </Text>
                ) : (
                  <Text style={styles.imageText}>
                    {item.property?.layoutDetails?.layoutTitle} @{" "}
                    {item.property?.propertyId}
                  </Text>
                )}

                <Text style={styles.priceBottomStyle}>
                  {formatPrice(item.amount)}
                </Text>
              </ImageBackground>
            )}

            <View style={styles.detailsContainer}>
              <View style={styles.detailsStyles}>
                <Icon name="map-marker" size={24} color="#007bff" />
                <Text style={styles.textStyleNew}>
                  {i18n.t(
                    item.property?.layoutDetails?.address?.district ||
                      item.property?.propertyDetails?.landDetails?.address
                        ?.district ||
                      item.property?.address?.district ||
                      item.property?.address?.district
                  )}
                </Text>
              </View>
              <View style={styles.detailsStyles}>
                <Icon name="ruler" size={24} color="#007bff" />
                <Text style={styles.textStyleNew}>
                  {item.property?.layoutDetails?.plotSize ||
                    item.property?.propertyDetails?.landDetails?.sell
                      ?.plotSize ||
                    item.property?.propertyDetails?.landDetails?.rent
                      ?.plotSize ||
                    item.propertyDetails?.landDetails?.lease?.plotSize ||
                    item.property?.propertyDetails?.flatSize ||
                    item.property?.landDetails?.size}{" "}
                  {translateKey(
                    item.property?.layoutDetails?.sizeUnit ||
                      item.property?.propertyDetails?.landDetails?.sell
                        ?.sizeUnit ||
                      item.property?.propertyDetails?.landDetails?.rent
                        ?.sizeUnit ||
                      item.property?.propertyDetails?.landDetails?.lease
                        ?.sizeUnit ||
                      item.property?.propertyDetails?.sizeUnit ||
                      item.property?.landDetails?.sizeUnit
                  )}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ textAlign: "center", alignItems: "center",backgroundColor:"#4184AB",width:200 ,padding:10,marginHorizontal:100,borderRadius:10}}
              onPress={() => handleParticipate(item)}
            >
              <Text style={styles.linkText}>Participate now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  //rendering dots
  const renderDotIndicators = () => {
    return auctionData.map((dot, index) => {
      if (Math.ceil(activeIndex) === index || activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "green",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "red",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      }
    });
  };
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const index = scrollPosition / SCREEN_WIDTH;

    setActiveIndex(index);
  };
  const getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index: index,
  });
  return (
    <View>
      <View style={{ backgroundColor: "#4184AB" }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            paddingVertical: 10,
            fontSize: 18,
          }}
        >
          {i18n.t("Exclusive Deals")}
        </Text>
      </View>
      <FlatList
        data={auctionData}
        keyExtractor={(item) => item._id}
        ref={flatListRef}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
  },
  imageNew: {
    height: 200,
    width: ScreenWidth,
  },
  cardNew: {
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingBottom: 10,
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
  },
  detailsStyles: {
    flexDirection: "row",
  },

  textStyleNew: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  timerContainer: {
    position: "absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjust for perfect centering
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text for contrast
    textAlign: "center",
  },
  linkText: {
    color: "white",
    // textDecorationLine: "underline",
    fontSize: 18,
  },
});
