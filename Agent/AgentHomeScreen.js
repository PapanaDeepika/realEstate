import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
  useRef,
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
import ImageCarousel from "../ImageCarousal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetExample from "../BottomSheetExample";
import { ImageBackground } from "react-native";
import i18n, { translateKey } from "../i18n";
const SCALE_FACTOR = 1000000; // 1 million

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePushNotification } from "../contexts/PushNotificationProvider";

function AgentHomeScreen({ navigation }) {
  const { expoPushToken, notification, handleNotificationResponse } =
    usePushNotification();

  const images = [
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/271800/pexels-photo-271800.jpeg",
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [resetAppear, setResetAppear] = useState(false);
  const [topPrice, setTopPrice] = useState([]);

  const insets = useSafeAreaInsets();

  const [language, setLanguage] = useState(i18n.locale);

  const [page, setPage] = useState(1);
  const [hasMoreDataTop, setHasMoreDataTop] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageNumTop, setPageNumTop] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const flatListRef = useRef(null);
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

  const fetchProperties = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (page === 1) {
        setLoading(true);
      } else {
        setLoading1(true);
      }

      if (!token) {
        console.log("No token found");
        return;
      }
      console.log(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${page}&limit=8`
      );
      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${page}&limit=8`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log("response", response.data, "page", page);
          // const data = await response.json();
          setProperties(response.data);
          setFilteredProperties((prevData) => [...prevData, ...response.data]);
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          setHasMoreData(false);
          console.log(
            `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${page}&limit=8`,
            error
          );
        });
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setHasMoreData(false);
      setRefreshing(false);
    } finally {
      setLoading(false);
      setLoading1(false);
    }
  }, []);

  // const fetchProperties1 = async () => {
  //   if (loading || !hasMoreData) return; // Prevent multiple API calls

  //   setLoading(true);
  //   try {
  //     console.log("==================================");
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (!token) {
  //       console.log("No token found");
  //       setLoading(false);
  //       return;
  //     }

  //     console.log(`Fetching: page=${page}`);

  //     const response = await axios.get(
  //       `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${page}&limit=8`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.data.length < 8) {
  //       setHasMoreData(false); // Stop fetching when no more data
  //     }

  //     setProperties((prev) => [...prev, ...response.data]); // Append new data
  //     setFilteredProperties((prev) => [...prev, ...response.data]); // Update filtered list
  //     setPage((prevPage) => prevPage + 1);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  //   setLoading(false);
  // };

  // const viewabilityConfig = { viewAreaCoveragePercentThreshold: 100 }; // Ensure the last item is fully visible
  // const viewabilityConfigCallback = useRef(null);

  //  const onViewableItemsChanged = useCallback(
  //   ({ viewableItems }) => {
  //     if (viewableItems.length > 0) {
  //       const lastItem = viewableItems[viewableItems.length - 1];
  //       if (
  //         lastItem.index === filteredProperties.length - 1 && // Check if last item is visible
  //         hasMoreData &&
  //         !loading
  //       ) {
  //         fetchProperties1();
  //       }
  //     }
  //   },
  //   [filteredProperties.length, hasMoreData, loading]
  // );

  // Function to fetch data

  // const viewabilityConfig = { viewAreaCoveragePercentThreshold: 100 };

  // const onViewableItemsChanged = useCallback(
  //   ({ viewableItems }) => {
  //     // Check if the last item is visible
  //     if (viewableItems.length > 0) {
  //       const lastItem = viewableItems[viewableItems.length - 1];
  //       if (
  //         lastItem.index === filteredProperties.length - 1 && // Is it the last item in the list?
  //         !loading && // Avoid multiple API calls while loading
  //         hasMoreData // Only fetch more data if there's more data available
  //       ) {
  //         fetchProperties1();
  //       }
  //     }
  //   },
  //   [filteredProperties.length, loading, hasMoreData] // Re-run if filteredProperties, loading, or hasMoreData changes
  // );

  // const viewabilityConfigCallback = useRef(onViewableItemsChanged);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 120000,
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({ changed, viewableItems }) => {
        changed.forEach((changedItem) => {
          if (changedItem.isViewable) {
            console.log("++ Impression for: ", changedItem.item.id);
          }
        });
      },
    },
  ]);

  const fetchProperties1 = async () => {
    console.log("page", page);
    if (page === 1) {
      setLoading(true);
    } else {
      setLoading1(true);
    }

    try {
      const response = await axios.get(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${page}&limit=8`
      );

      let data = properties;

      const newData = response.data;

      if (newData.length < 2) {
        setHasMoreData(false);
        // if (direction === "down") {
        //    setHasMoreData(false);
        // } else {
        //   setHasMoreDataTop(false);
        // }
      }
      console.log(
        "response.data",
        filteredProperties.length,
        newData.length,
        response.data
      );
      setProperties((prevData) => [...prevData, ...newData]);
      setFilteredProperties((prevData) => [...prevData, ...newData]);

      setPage((prevPage) => prevPage + 1);
      // if (direction === "down") {
      //   console.log("Page number",pageNum,hasMoreData)
      //   setPageNum((prev)=> prev+1);
      // } else {
      //   setPageNumTop((prev)=>prev-1);
      // }
    } catch (error) {
      setHasMoreData(false);
      console.error(
        "Error fetching properties:",
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${pageNum}&limit=8`,
        error
      );
    } finally {
      setLoading(false);
      setLoading1(false);
    }
  };

  // Fetch older properties when reaching the top
  const onMomentumScrollBegin = (event) => {
    console.log("abcd");

    if (pageNumTop > 1) {
      console.log("asdsd");
      const { contentOffset } = event.nativeEvent;
      if (contentOffset.y <= 0 && hasMoreDataTop) {
        fetchProperties1(pageNumTop - 1, "up");
      }
    }
  };

  // const fetchProperties1 = async (pageNum) => {
  //   if (loading || !hasMoreData) return; // Prevent fetching if already loading or no more data

  //   setLoading1(true);
  //   try {
  //     console.log(
  //       "pageNum",
  //       pageNum,
  //       "===============================",
  //       `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${pageNum}&limit=8`
  //     );
  //     const response = await axios.get(
  //       `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//getAllProperties1?page=${pageNum}&limit=8`
  //     );
  //     const newData = response.data;

  //     if (newData.length < 8) {
  //       setHasMoreData(false); // No more data to load
  //     }
  //     setPage(pageNum + 1);

  //     setProperties((prev) => [...prev, ...newData]);
  //     setFilteredProperties((prev) => [...prev, ...newData]);
  //   } catch (error) {
  //     console.error("Error fetching properties:", error);
  //   } finally {
  //     setLoading1(false);
  //   }
  // };

  const getTopPriced = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getTopPropOnPrice",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTopPrice(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
      checkinglanguage();
      getTopPriced();
    }, [fetchProperties, checkinglanguage, getTopPriced])
  );

  const checkinglanguage = useCallback(async () => {
    const value = AsyncStorage.getItem("lang");
    console.log("VALUE for the language", value);
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);

    // Clear the previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      getSearchDetails(text);
    }, 500); // 500ms delay

    setSearchTimeout(newTimeout);
  };

  const registerPushToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/registerPushToken",
        { pushToken: expoPushToken ? expoPushToken : "ABCDEFGH" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, [expoPushToken]);

  useFocusEffect(
    useCallback(() => {
      if (expoPushToken && expoPushToken !== null && expoPushToken !== "") {
        registerPushToken();
      }
    }, [registerPushToken])
  );

  const resetFunction = () => {
    if (land || sizeValue || sizeUnit || maxP || minPrice) {
      setLand("");
      setSizeValue("");
      setSizeUnit("");
      setMaxP("");
      setMinPrice("0");
      setFilteredProperties(properties);
      setAppear(true);
    }
    if (resetAppear) {
      setLand("");
      setSizeValue("");
      setSizeUnit("");
      setMaxP("");
      setMinPrice("0");
      setFilteredProperties(properties);
      setAppear(true);
      setResetAppear(false);
    }
  };

  useEffect(() => {
    console.log("In the use effect now");
  }, []);

  const getModalSearchDetails = async () => {
    // if (modalSearchQuery.trim() === "") {
    //   setFilteredProperties(properties);
    //   return;
    // }
    console.log("In the modal search");
    setModalVisible(!modalVisible);
    setResetAppear(true);
    setAppear(false);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      console.log(
        "Sending search request with query:",
        land,
        sizeValue,
        value,
        sizeUnit,
        minPrice,
        maxP
      );
      const response = await axios.get(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropsOnFilter?propertyType=${land}&propertySize=${sizeValue}&price=${value}&sizeUnit=${sizeUnit}&minPrice=${minPrice}&maxPrice=${maxP}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setFilteredProperties(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setFilteredProperties([]);
      }
    } catch (error) {
      console.error("Failed to search properties:", error);
      setFilteredProperties([]);
    }
  };

  const getSearchDetails = async () => {
    if (searchQuery.trim() === "") {
      setFilteredProperties(properties);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    console.log("LOAWERc ASE QUERY", lowercasedQuery);
    const results = properties.filter(
      (property) =>
        property.propertyType.toLowerCase().includes(lowercasedQuery) ||
        property.title.toLowerCase().includes(lowercasedQuery) ||
        property.district.toLowerCase().includes(lowercasedQuery)
    );
    console.log("LOAWERc ASE QUERY", results);

    setFilteredProperties(results);
  };

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

  const propertyDetails = (item) => {
    navigation.navigate("Propdetails", { propByRoute: item });
  };
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardNew}
      onPress={() => propertyDetails(item)}
      key={item._id}
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
          {language === "te" ? (
            <Text style={styles.imageText}>
              {item.titleTe || item.propertyTitleTe} @ {item.propId}
            </Text>
          ) : (
            <Text style={styles.imageText}>
              {item.title || item.propertyTitle} @ {item.propId}
            </Text>
          )}

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
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg",
          }}
        >
          {language === "te" ? (
            <Text style={styles.imageText}>
              {item.titleTe || item.propertyTitleTe} @ {item.propId}
            </Text>
          ) : (
            <Text style={styles.imageText}>
              {item.title || item.propertyTitle} @ {item.propId}
            </Text>
          )}

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

      {item.propertyType === "Commercial" && (
        <ImageBackground
          style={styles.imageNew}
          source={{
            uri:
              item.images?.[0] ||
              item.landDetails?.images?.[0] ||
              item.uploadPics?.[0] ||
              item.propPhotos?.[0] ||
              "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg",
          }}
        >
          {language === "te" ? (
            <Text style={styles.imageText}>
              {item.titleTe || item.propertyTitleTe} @ {item.propId}
            </Text>
          ) : (
            <Text style={styles.imageText}>
              {item.title || item.propertyTitle} @ {item.propId}
            </Text>
          )}

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
          {language === "te" ? (
            <Text style={styles.imageText}>
              {item.titleTe || item.propertyTitleTe} @ {item.propId}
            </Text>
          ) : (
            <Text style={styles.imageText}>
              {item.title || item.propertyTitle} @ {item.propId}
            </Text>
          )}

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

      <View style={styles.detailsContainer}>
        <View style={styles.detailsStyles}>
          <Icon name="map-marker" size={24} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {i18n.t(item.district || item.address?.district || item.address)}
          </Text>
        </View>
        <View style={styles.detailsStyles}>
          <Icon name="ruler" size={24} color="#007bff" />
          <Text style={styles.textStyleNew}>
            {item.size || item.size} {i18n.t("acres")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const rupeeSymbol = "\u20B9";
  const [maxSize, setMaxSize] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [appear, setAppear] = useState(true);
  const [value, setValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxP, setMaxP] = useState("");

  const [land, setLand] = useState("");
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProperties();
  }, [fetchProperties]);

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

  return (
    <SafeAreaView style={[styles.container]}>
        {notification && (
        <Text>New Notification: {notification.request.content.body}</Text>
      )}
      {notification && (
        <Text>
          New Notification:{" "}
          {notification.request.content.data?.screen || "SCRENNNNNNNNNNNNN"}
        </Text>
      )}

      {notification && <Text>New Notification: {notification}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.buttonDirection}>
                <Button
                  title={i18n.t("Reset")}
                  onPress={resetFunction}
                  style={{ textTransform: "none", borderRadius: 10 }}
                ></Button>

                <Button
                  title={i18n.t("Close")}
                  style={{ borderRadius: 10 }}
                  onPress={() => setModalVisible(!modalVisible)}
                ></Button>
              </View>
              <Text style={styles.label1}>Land Type</Text>
              <View style={[styles.pickerWrapper1, { marginTop: 10 }]}>
                <Picker
                  selectedValue={land}
                  onValueChange={(selectedValue) => setLand(selectedValue)}
                  style={styles.picker1}
                  itemStyle={{ fontFamily: "Montserrat_500Medium" }}
                >
                  <Picker.Item label="Select land type" value="" color="#888" />
                  <Picker.Item
                    label={i18n.t("Agricultural land")}
                    value="Agricultural land"
                  />
                  <Picker.Item
                    label={i18n.t("Commercial")}
                    value="Commercial"
                  />
                  <Picker.Item label={i18n.t("Layout")} value="Layout" />
                  <Picker.Item
                    label={i18n.t("Residential")}
                    value="Residential"
                  />
                </Picker>
              </View>
              <Text style={styles.label1}>
                {i18n.t("Price")} ({rupeeSymbol})
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <TextInput
                  placeholder={i18n.t("Minimum price")}
                  value={minPrice}
                  onChangeText={(value) => {
                    setMinPrice(value);
                  }}
                  style={styles.priceInput}
                />

                <TextInput
                  placeholder={i18n.t("Maximum price")}
                  value={maxP}
                  onChangeText={(value) => {
                    setMaxP(value);
                  }}
                  style={styles.priceMaxInput}
                />
              </View>
              {/* {maxPrice > 0 && (
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10000000}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
        />
      )}
            <Text style={{fontSize:16,
              marginBottom:10
            }}>Selected price value: {value}</Text> */}

              <Text style={styles.label1}>{i18n.t("Size")} (⌀)</Text>
              {/* <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={maxSize}
        step={1}
        value={sizeValue}
        onValueChange={setSizeValue}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#b9e4c9"
      />  */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TextInput
                  placeholder={i18n.t("Enter size")}
                  style={styles.input}
                  value={sizeValue}
                  onChangeText={setSizeValue}
                ></TextInput>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={sizeUnit}
                    onValueChange={(selectedValue) =>
                      setSizeUnit(selectedValue)
                    }
                    style={styles.picker}
                    itemStyle={{ fontFamily: "Montserrat_500Medium" }}
                  >
                    <Picker.Item label={i18n.t("Select size unit")} value=" " />

                    <Picker.Item label={translateKey("Acres")} value="acres" />
                    <Picker.Item
                      label={translateKey("Sq. feet")}
                      value="sq. ft"
                    />
                    <Picker.Item
                      label={translateKey("Sq. meters")}
                      value="sq.m"
                    />
                    <Picker.Item
                      label={translateKey("Sq. yards")}
                      value="sq.yards"
                    />
                    <Picker.Item label={translateKey("Cents")} value="cents" />
                  </Picker>
                </View>
              </View>
              {/* 
      <Text style={{fontSize:16,
              marginBottom:10
            }}>Selected size value: {sizeValue}</Text> */}

              <View style={[styles.searchheader, { color: "black" }]}>
                {/* <Button title='Search' onPress={getModalSearchDetails} style={{ borderRadius:25,
 }} color='red'/> */}
                <TouchableOpacity
                  style={styles.searchbutton}
                  onPress={getModalSearchDetails}
                >
                  <Text style={styles.resettext}>{i18n.t("Search")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder={i18n.t("Search By Name,Location")}
          style={[styles.searchBox, { fontFamily: "Montserrat_500Medium" }]}
          value={searchQuery}
          onChangeText={(value) => {
            setSearchQuery(value);
            if (!value) {
              setLoading(true);
              fetchProperties();
            }
          }}
          returnKeyType="search"
          onSubmitEditing={() => getSearchDetails()}
        />
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Icon name="filter" size={30} style={styles.filterButton} />
        </TouchableOpacity>
      </View>

      {resetAppear && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.resetbutton} onPress={resetFunction}>
            <Text style={styles.resettext}>Reset</Text>
            <Icon name="refresh" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.propertyListContainer}>
          {appear && (
            <>
              <View style={{ backgroundColor: "#d1f4ff", marginTop: 10 }}>
                <View style={[styles.detailsStylesNew]}>
                  <View
                    style={{
                      backgroundColor: "#007bff",
                      margin: 10,
                      padding: 10,
                      borderRadius: 25,
                      borderColor: "#0d2e69",
                      borderWidth: 2,
                    }}
                  >
                    <FontAwesome6
                      name="arrow-trend-up"
                      size={24}
                      color="white"
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.sectionTitleNew}>
                      {i18n.t("Top Priced Properties")}
                    </Text>
                  </View>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.newlyLaunchedScroll}
                >
                  {topPrice.map((property) => (
                    <TouchableOpacity
                      key={property.id}
                      style={styles.newlyLaunchedCard}
                      onPress={() => propertyDetails(property)}
                    >
                      <Image
                        source={{ uri: property.images?.[0] }}
                        style={styles.roundImageNew}
                      />
                      <View style={styles.propertyDetailsNew}>
                        <Text style={styles.propertyNameNew}>
                          {property.name}
                        </Text>
                        <Text style={styles.propertyLocationNew}>
                          {property.district}
                        </Text>

                        <View
                          style={[styles.detailsStylesNew, { marginTop: 4 }]}
                        >
                          <FontAwesome name="rupee" size={16} color="#000" />
                          <Text style={styles.propertyPriceNew}>
                            {formatPrice(property.price)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            //       <FlatList
            //         // scrollEnabled={false}
            //         data={filteredProperties}
            //         renderItem={renderPropertyCard}
            //         keyExtractor={(item) => item._id}
            //         contentContainerStyle={styles.propertyList}
            //         refreshControl={
            //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            //         }
            //         ListEmptyComponent={
            //           <Text style={styles.emptyListText}>{i18n.t("No properties found")}</Text>
            //         }

            //         onEndReached={fetchProperties1}
            //         onEndReachedThreshold={0.5}
            //  ListFooterComponent={() => (loading ? <ActivityIndicator size="large" color="blue" /> : null)}

            //       />

            <FlatList
              data={filteredProperties}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderPropertyCard({ item })}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.propertyList}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <Text style={styles.emptyListText}>No properties found</Text>
              }
              onEndReached={() => {
                if (hasMoreData) {
                  fetchProperties1();
                }
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={() => loading1 && <ActivityIndicator />}
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
              }
            />

            // <FlatList
            //   ref={flatListRef}
            //   data={filteredProperties}
            //   renderItem={({ item }) => renderPropertyCard({ item })}
            //   keyExtractor={(item) => item._id}
            //   contentContainerStyle={styles.propertyList}
            //   refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            //   }
            //   ListEmptyComponent={
            //     <Text style={styles.emptyListText}>No properties found</Text>
            //   }
            //   onEndReached={() => {
            //     if(!loading1&&hasMoreData)
            //     {
            //       fetchProperties1(pageNum + 1, "down")
            //     }
            //   } }

            //                viewabilityConfigCallbackPairs={
            //     viewabilityConfigCallbackPairs.current
            //   }
            //   onEndReachedThreshold={0.2}
            //   onMomentumScrollBegin={onMomentumScrollBegin}
            //   ListFooterComponent={() => loading1 && <ActivityIndicator />}
            //   ListHeaderComponent={() =>
            //     loading1 && hasMoreDataTop && <ActivityIndicator />
            //   }
            // />
          )}
        </View>
      </ScrollView>

      {isBottomSheetVisible && <BottomSheetExample />}
    </SafeAreaView>
  );
}

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

    fontFamily: "Montserrat_500Medium",
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

    fontFamily: "Montserrat_500Medium",
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

    fontFamily: "Montserrat_500Medium",
  },
  slider: {
    width: 300,
    height: 40,
    fontFamily: "Montserrat_500Medium",
  },
  label1: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    // fontWeight: "bold",

    fontFamily: "Montserrat_500Medium",
  },
  pickerWrapper: {
    height: 40,
    width: 158,
    borderColor: "black",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    fontFamily: "Montserrat_500Medium",
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
    fontFamily: "Montserrat_500Medium",
  },

  picker: {
    height: 40,
    width: 140, // Width of the dropdown (picker)
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium",
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
    fontFamily: "Montserrat_500Medium",
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginRight: 10,
    fontFamily: "Montserrat_500Medium",
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
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
    fontFamily: "Montserrat_500Medium",
  },
  propertyName: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Montserrat_500Medium",
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
    fontFamily: "Montserrat_500Medium",
  },
  textStyleNew: {
    marginLeft: 5,
    fontSize: 16,
    // fontWeight: "500",

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
    fontSize: 16,
    // fontWeight: "bold",
    // textAlign: 'center',
    borderWidth: 1,
    borderColor: "#007acc",
    width: "60%",
    borderBottomRightRadius: 60,
    fontFamily: "Montserrat_600SemiBold",
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
    fontFamily: "Montserrat_500Medium",
    paddingHorizontal: 10,
  },
  priceStyle: {
    backgroundColor: "rgba(173, 216, 230, 0.7)",
    padding: 10,
    color: "#000",
    fontSize: 16,
    // fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "40%",
    fontFamily: "Montserrat_500Medium",
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
    fontFamily: "Montserrat_500Medium",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
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
    justifyContent: "center",
    fontFamily: "Montserrat_500Medium",
  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
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
    fontFamily: "Montserrat_500Medium",
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
    fontFamily: "Montserrat_500Medium",
  },
  searchheader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
    fontFamily: "Montserrat_500Medium",
  },
  searchbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontFamily: "Montserrat_500Medium",
  },
  reseticon: {
    marginRight: 8,
  },
  resettext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_500Medium",
  },
  resetbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontFamily: "Montserrat_500Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  newlyLaunchedScroll: {
    marginVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Montserrat_500Medium",
  },
  newlyLaunchedCard: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    fontFamily: "Montserrat_500Medium",
  },
  roundImageNew: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  propertyDetailsNew: {
    flex: 1,
    fontFamily: "Montserrat_500Medium",
  },
  propertyNameNew: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",
  },
  propertyLocationNew: {
    fontSize: 12,
    color: "#777",
    fontFamily: "Montserrat_500Medium",
  },
  propertyPriceNew: {
    fontSize: 12,
    color: "#000",
    // fontWeight: "bold",
    marginLeft: 6,
    fontFamily: "Montserrat_500Medium",
  },
  detailsStylesNew: {
    flexDirection: "row",
    fontFamily: "Montserrat_500Medium",
  },
  sectionTitleNew: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
    color: "#0d2e69",
  },
});

export default AgentHomeScreen;
