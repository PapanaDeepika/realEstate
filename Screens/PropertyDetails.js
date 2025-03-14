import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import i18n from "../i18n";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { text } from "@fortawesome/fontawesome-svg-core";
import ImageGallery from "./ImageGallery";

const { width } = Dimensions.get("window");

const PropertyDetailsScreen = ({ route }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState();
  const [language, setLanguage] = useState("en");

  const [view, setView] = useState(0);
  const [shown, setShown] = useState(false);

  const [dateDif, setDateDif] = useState(0);

  const flatListRef = useRef();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const { propByRoute } = route.params;
  console.log("ROUTE", propByRoute);
  const propertyId = propByRoute._id || propByRoute.propertyId;
  const propertyType = propByRoute.propertyType;

  console.log("PROPERTY ID", propertyId);
  console.log("PROPERTY TYPE", propertyType);

  useEffect(() => {
    getDetails();
    loadLanguage();
  }, []);

  const getViews = async (item) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const data = {
        propertyId: item._id,
        propertyType: item.propertyType,
      };

      console.log("Dataaaaa", data);

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/views/updateViewCount`,
        {
          method: "put",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          console.log("response", response.data);

          setView(response.data.viewsCount || response.data.newData.viewsCount);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData])
  );

  const getData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const decoded = jwtDecode(token);
      const id = decoded.user.userId;
      console.log("DECODED", decoded.user);
      setRole(decoded.user.role);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
    }
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved lang", savedLanguage, language);
    setLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  const renderDotIndicators = () => {
    const data = getDefaultImage(propertyType, property);
    console.log("WARRRRRRRRRRRRRR", data);
    console.log("78963", data);
    if (data.length > 1) {
      return data.map((dot, index) => {
        if (Math.ceil(activeIndex) === index || activeIndex === index) {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "black",
                height: 8,
                width: 8,
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
                backgroundColor: "black",
                height: 8,
                width: 8,
                borderRadius: 5,
                marginHorizontal: 6,
              }}
            ></View>
          );
        }
      });
    }
  };

  const getTime = (item) => {
    console.log("adssd", item);
    const currentDate = new Date();
    const createdAtDate = new Date(item.createdAt);

    const timeDiff = currentDate - createdAtDate;

    const dateDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    console.log("timeee", dateDiff);

    setDateDif(dateDiff);
  };

  const getDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
      console.log("property details");
      const response = await axios.get(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbyid/${propertyType}/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProperty(response.data);

      console.log("propertiessss", response.data);
      getTime(response.data);
      getViews(response.data);
    } catch (error) {
      console.error("Error fetching property details:", error.message);
      setError("Failed to fetch property details");
    } finally {
      setLoading(false);
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

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    // const cleanedValue = value.replace(/\D/g, '');

    // Format it into 'xxx xxx xxxx'
    console.log(value);
    value = String(value);
    let formattedPhoneNumber = "";
    if (value.length <= 3) {
      formattedPhoneNumber = value;
    } else if (value.length <= 6) {
      formattedPhoneNumber =
        value.substring(0, 3) + " " + value.substring(3, 6);
    } else {
      formattedPhoneNumber =
        value.substring(0, 3) +
        " " +
        value.substring(3, 6) +
        " " +
        value.substring(6, 10);
    }

    return formattedPhoneNumber;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{i18n.t("No properties found")}</Text>
      </View>
    );
  }

  // const renderImage = ({ item }) => (
  //   <Image source={{ uri: item }} style={styles.image} />
  // );

  const getPropertyDetails = () => {
    switch (propertyType) {
      case "Residential":
        return property.propertyDetails;
      case "Commercial":
        return (
          property.propertyDetails.landDetails.sell ||
          property.propertyDetails.landDetails.rent ||
          property.propertyDetails.landDetails.lease
        );
      case "Layout":
        return property.layoutDetails;
      case "Agricultural land":
        return property.landDetails;
      default:
        return {};
    }
  };

  const getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index: index,
  });
  // const renderImage = ({ item }) => {
  //   console.log("fhrdxghfgaaaaaaaaaaaaaaaaaa", item);

  //   const formattedImages = Array(item).map((image) => ({ uri: image }));
  //   console.log("fhrdxghfg11111111111", formattedImages);

  //   return formattedImages.map((image) => {
  //     {
  //       console.log("BTSSSSSSSSSSSSSSSSSSSSSSS", image);
  //     }
  //     return (
  //       <TouchableOpacity
  //         onPress={() => console.log("Pressedddddddddddddddddddd")}
  //       >
  //         {/* <Image source={{ uri: image?.uri }} style={styles.image} /> */}

  //         <ImageBackground source={{ uri: image?.uri }} style={styles.image}>
  //           <Text style={styles.imageBg}>{`Posted ${dateDif}  days ago`}</Text>
  //         </ImageBackground>
  //       </TouchableOpacity>
  //     );
  //   });
  // };
  // const getDefaultImage = (propertyType, property) => {
  //   switch (propertyType) {
  //     case "Commercial":
  //       return (
  //         property.propertyDetails?.uploadPics[0] ||
  //         "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg"
  //       );
  //     case "Agricultural land":
  //       return (
  //         property.landDetails?.images[0] ||
  //         "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"
  //       );
  //     case "Layout":
  //       return (
  //         property.uploadPics[0] ||
  //         "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg"
  //       );
  //     default:
  //       return (
  //         property.propPhotos[0] ||
  //         "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg"
  //       );
  //   }
  // };
  const renderImage = () => {
    console.log("Item Data:", getDefaultImage(propertyType, property));
    const imageData = getDefaultImage(propertyType, property);
    // Ensure `formattedImages` is always an array of objects with `uri`
    const formattedImages = Array.isArray(imageData)
      ? imageData.map((image) => ({ uri: image }))
      : [{ uri: imageData }];

    console.log("Formatted Images:", formattedImages);

    return (
      // <>
      //   {formattedImages.map((image, imgIndex) => {
      //     console.log("Rendering Image:", image.uri);

      //     return (
      //       <TouchableOpacity
      //         key={imgIndex}
      //         onPress={() => {
      //           console.log(`Image Clicked: ${imgIndex}, URI: ${image.uri}`);

      //           // Fix: Ensure we're updating the index correctly
      //           setCurrentIndex1(imgIndex);
      //           setVisible1(true);
      //         }}
      //       >
      //         <Image source={{ uri: image?.uri }} style={styles.image} />
      //       </TouchableOpacity>
      //     );
      //   })}

      //   {visible1 && (
      //     <ImageViewing
      //       images={formattedImages} // Ensure this contains all images
      //       imageIndex={currentIndex1} // Ensure this is the correct index
      //       visible={visible1}
      //       onRequestClose={() => setVisible1(false)}
      //     />
      //   )}
      // </>
      <ImageGallery images={formattedImages} dateDif={dateDif} />
    );
  };
  const getDefaultImage = (propertyType, property) => {
    switch (propertyType) {
      case "Commercial":
        return property.propertyDetails?.uploadPics?.length
          ? property.propertyDetails.uploadPics
          : [
              "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg",
            ];

      case "Agricultural land":
        console.log(
          "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
          property.landDetails?.images
        );
        return property.landDetails?.images?.length
          ? property.landDetails.images
          : [
              "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
            ];

      case "Layout":
        return property.uploadPics?.length
          ? property.uploadPics
          : [
              "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg",
            ];

      default:
        return property.propPhotos?.length
          ? property.propPhotos
          : [
              "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg",
            ];
    }
  };
  const details = getPropertyDetails();
  const amenities = property.amenities;
  const address =
    propertyType === "Commercial"
      ? property.propertyDetails.landDetails.address
      : property.address;

  const renderPlots = ({ item }) => {
    console.log("itemsss", item);
    return (
      <View style={styles.plotCard}>
        <Image
          source={{ uri: property.uploadPics?.[0] }}
          style={styles.image1}
        />

        <View>
          <Text style={styles.plotDetails}>
            <Icon name={"currency-inr"} size={20} color="#4a90e2" /> {i18n.t("Price")} {" "}
            {handlePriceFormat(item.plotAmount)}
          </Text>
          <Text style={styles.plotDetails}>
            <Icon name={"ruler"} size={20} color="#4a90e2" /> {i18n.t("Size")} {" "}
            {item.plotSize} {item.sizeUnit}
          </Text>
        </View>
      </View>
    );
  };

  const showInterest = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const postData = {
        interestIn: "1",
        properties: [
          {
            propertyId: property?._id,
            propertyName:
              property?.propertyTitle ||
              details?.title ||
              details?.apartmentName ||
              details?.layoutTitle ||
              "Property",
            propertyType: property?.propertyType,
            agentId: property?.userId,
          },
        ],
        comments: "I am interested in this Property",
      };

      console.log("POST DATA", postData);

      const response = await fetch(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/createDeal",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await response.json();

      console.log("Response:", data);
      if (response.status === 200 || response.status === 201) {
        ToastAndroid.showWithGravityAndOffset(
          "Success",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
        setShown(true);
      }
    } catch (error) {
      console.error("Failed to show interest:", error);
    }
  };

  const consultAgent = () => {
    navigation.navigate("consultAgent", { property: property });
  };

  const renderFlats = ({ item }) => {
    console.log("itemsss", item);
    return (
      <View style={styles.flatCard}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: property.propPhotos?.[0] }}
            style={styles.image2}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.plotDetails1}>
              <Icon name={"currency-inr"} size={20} color="#4a90e2" /> {i18n.t("Price")} {" "}
              {handlePriceFormat(item.flatCost)}
            </Text>
            <Text style={styles.plotDetails1}>
              <Icon name={"ruler"} size={20} color="#4a90e2" /> {i18n.t("Size")} {" "}
              {item.flatSize} {item.flatSizeUnit}
            </Text>
            <Text style={styles.plotDetails1}>
              <Icon name={"compass"} size={20} color="#4a90e2" /> {i18n.t("Facing")}{" "}
              {item.flatFacing}
            </Text>

            <Text style={styles.plotDetails1}>
              <Icon name={"stairs"} size={20} color="#4a90e2" /> {i18n.t("Floor")} {" "}
              {item.floorNumber}{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderTopWidth: 0.5,
            marginVertical: 8,
          }}
        >
          <Text style={[styles.plotDetails1, { marginTop: 5 }]}>
            <Icon name={"bed"} size={20} color="#4a90e2" /> {i18n.t("Bedroom")} {" "}
            {item.bedroomCount}{" "}
          </Text>
          <Text
            style={[styles.plotDetails1, { marginTop: 5, marginLeft: 100 }]}
          >
            <Icon name={"balcony"} size={20} color="#4a90e2" /> {i18n.t("Balcony")} {" "}
            {item.balconyCount}{" "}
          </Text>
        </View>
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / SCREEN_WIDTH;
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <FlatList
        data={[getDefaultImage(propertyType, property)]}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      /> */}

      <FlatList
        data={getDefaultImage(propertyType, property)}
        keyExtractor={(item) => item._id}
        ref={flatListRef}
        renderItem={renderImage}
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

      {/* {shown && role === 3 && (
        <TouchableOpacity
          style={{
            backgroundColor: "#77DD77",
            padding: 10,
            marginHorizontal: 10,
            marginTop: 10,
            alignItems: "center",
            borderRadius: 10,
          }}
          disabled={true}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Interest Shown
          </Text>
        </TouchableOpacity>
      )} */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            position: "absolute",
            left: (width - 70) / 2,
            padding: 10,
            top: -30,
            color: "#fff",
            backgroundColor: "#047f91",
            borderRadius: 5,
            fontFamily:"Montserrat_500Medium"
          }}
        >
          Views :{view}
        </Text>
      </View>
      {role === 3 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginTop: 10,
            flexWrap: "nowrap", // Keeps buttons in the same row
          }}
        >
          {/* Reserve Property Button */}

          {property.propertyOnHold === "no" ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#6a9499",
                  padding: 10,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  Reserve Property
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#6a9499",
                  padding: 10,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  Property Reserved
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Participate in Auction Button */}
          {property.interestedIn === "1" || shown === true ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#6a9499",
                  padding: 10,
                  marginHorizontal: 5,
                  // marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 10,
                }}
                disabled={true}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  Interested{" "}
                  <FontAwesome name="thumbs-o-up" size={20} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#6a9499",
                  padding: 10,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={showInterest}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  Show Interest
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Show Interest Button */}
        </View>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          {propertyType === "Commercial"
            ? property.propertyTitle
            : propertyType === "Agricultural land"
            ? details.title
            : details.apartmentName || details.layoutTitle || "Property"}{" "}
          @ {property.propertyId}
        </Text>
        <Text style={styles.price}>
          ₹
          {handlePriceFormat(
            details.totalCost || details.totalAmount || details.totalPrice || 0
          )}
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{i18n.t("Property Details")}</Text>
          {propertyType === "Residential" && (
            <>
              <DetailRow
                icon="home-variant"
                text={`${"Type"}`}
                text1={`${details.type}`}
              />
              <DetailRow3
                icon="office-building"
                text={`${"Layout"}`}
                text1={` ${details.apartmentLayout}`}
              />
              {/* <DetailRow icon="ruler-square" text={`${"Size"}: ${details.flatSize} ${details.sizeUnit}`}  /> */}
              <DetailRow1
                icon="ruler-square"
                text={`Size`}
                text1={`${details.flatSize}`}
                text2={`${details.sizeUnit}`}
              />
              <DetailRow
                icon="compass"
                text={`${"Facing"}`}
                text1={`${details.flatFacing}`}
              />
              <DetailRow
                icon="sofa"
                text={`${"Furnished"}`}
                text1={`${details.furnitured}`}
              />
            </>
          )}
          {propertyType === "Commercial" && (
            <>
              {/* <DetailRow icon="currency-inr" text={`${"Price"}: ₹${details.price} per  `} text1={`${details.sizeUnit}`} /> */}

              <DetailRow1
                icon="ruler-square"
                text={`Plot Size`}
                text1={`${details.plotSize}`}
                text2={`${details.sizeUnit}`}
              />
              <DetailRow1
                icon="currency-inr"
                text={`Price`}
                text1={`${details.price}`}
                text2={`${details.sizeUnit}`}
              />

              <DetailRow
                icon="store"
                text={`${"Usage"}`}
                text1={`${details.landUsage.join(", ")}`}
              />
            </>
          )}
          {propertyType === "Layout" && (
            <>
              <DetailRow3
                icon="home-group"
                text={`Total Plots`}
                text1={`${details.plotCount}`}
              />
              <DetailRow3
                icon="home-plus"
                text={`Available Plots`}
                text1={`${details.availablePlots}`}
              />
              {/* <DetailRow icon="ruler-square" text={`Plot Size: ${details.plotSize} `} text1={`${details.sizeUnit}`}/> */}
              <DetailRow1
                icon="ruler-square"
                text={`Plot Size`}
                text1={`${details.plotSize}`}
                text2={`${details.sizeUnit}`}
              />
              <DetailRow1
                icon="currency-inr"
                text={`Price`}
                text1={`${details.plotPrice}`}
                text2={`${details.priceUnit}`}
              />
              {/* <DetailRow1 icon="ruler-square" text={`Price`} text1={`${details.plotSize}`} text2={`${details.sizeUnit}`}/> */}
            </>
          )}
          {propertyType === "Agricultural land" && (
            <>
              <DetailRow1
                icon="ruler-square"
                text={`Size`}
                text1={`${details.size}`}
                text2={`${details.sizeUnit}`}
              />
              <DetailRow3
                icon="file-document-outline"
                text={"Survey Number"}
                text1={`${details.surveyNumber}`}
              />
              {/* <DetailRow icon="currency-inr" text={`Price: ₹${details.price} per ${details.priceUnit}`}   /> */}

              <DetailRow2
                icon="currency-inr"
                text={`Price`}
                text1={`${details.price}`}
                text2={`${details.priceUnit}`}
              />

              <DetailRow
                icon="sprout"
                text={`Land Type`}
                text1={`${details.landType}`}
              />
              <DetailRow3
                icon="gavel"
                text={`Litigation`}
                text1={` ${details.litigation ? "Yes" : "No"}`}
              />
              {details.litigation && (
                <DetailRow3
                  icon="alert-circle"
                  text={`Litigation Details`}
                  text1={`${details.litigationDesc}`}
                />
              )}
            </>
          )}
        </View>

        <View>
          {propertyType === "Layout" &&
            property.layoutDetails.plots.length > 0 && (
              <View>
                <Text style={styles.cardTitle}>
                  {i18n.t("Available Plots")}
                </Text>

                <FlatList
                  data={property.layoutDetails.plots}
                  renderItem={renderPlots}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
        </View>

        {propertyType === "Layout" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.locationText}>
              {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`}
            </Text>
            <DetailRow4
              icon="map-marker"
              text={`Landmark`}
              text1={`${property.layoutDetails.address.landMark||"N/A"}`}
            />
          </View>
        )}

        {propertyType === "Commercial" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
            <Text style={styles.locationText}>
              {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

              {language === "en" || language === null ? (
                <Text>
                  {`${property.propertyDetails.landDetails.address.village}, ${property.propertyDetails.landDetails.address.mandal}, ${property.propertyDetails.landDetails.address.mandal}, ${property.propertyDetails.landDetails.address.district}, ${property.propertyDetails.landDetails.address.state}, ${property.propertyDetails.landDetails.address.pinCode}`}
                </Text>
              ) : (
                <Text>
                  {`${
                    property.propertyDetails.landDetails.address.villageTe ||
                    property.propertyDetails.landDetails.address.village
                  }, ${
                    property.propertyDetails.landDetails.address.mandalTe ||
                    property.propertyDetails.landDetails.address.mandal
                  }, ${
                    property.propertyDetails.landDetails.address.mandalTe ||
                    property.propertyDetails.landDetails.address.mandal
                  }, ${
                    property.propertyDetails.landDetails.address.districtTe ||
                    property.propertyDetails.landDetails.address.district
                  }, ${
                    property.propertyDetails.landDetails.address.stateTe ||
                    property.propertyDetails.landDetails.address.state
                  }, ${property.propertyDetails.landDetails.address.pinCode}`}
                </Text>
              )}
            </Text>

            {language === "en" ? (
              <DetailRow4
                icon="map-marker"
                text={`Landmark`}
                text1={`${property.propertyDetails.landDetails.address.landMark||"N/A"}`}
              />
            ) : (
              <DetailRow4
                icon="map-marker"
                text={`Landmark`}
                text1={`${
                  property.propertyDetails.landDetails.address.landMarkTe ||
                  property.propertyDetails.landDetails.address.landMark||"N/A"
                }`}
              />
            )}
            {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
          </View>
        )}

        {propertyType === "Residential" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
            <Text style={styles.locationText}>
              {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

              {language === "en" || language === null ? (
                <Text>
                  {" "}
                  {`${property.address.village}, ${property.address.mandal}, ${property.address.mandal}, ${property.address.district}, ${property.address.state}, ${property.address.pinCode}`}
                </Text>
              ) : (
                <Text>
                  {" "}
                  {`${
                    property.address.villageTe || property.address.village
                  }, ${property.address.mandalTe || property.address.mandal}, ${
                    property.address.mandalTe || property.address.mandal
                  }, ${
                    property.address.districtTe || property.address.district
                  }, ${property.address.stateTe || property.address.state}, ${
                    property.address.pinCode
                  }`}
                </Text>
              )}
            </Text>

            {language === "en" ? (
              <DetailRow4
                icon="map-marker"
                text={`Landmark`}
                text1={`${property.address.landMark||"N/A"}`}
              />
            ) : (
              <DetailRow4
                icon="map-marker"
                text={`Landmark`}
                text1={`${
                  property.address.landMarkTe || property.address.landMark ||"N/A"
                }`}
              />
            )}
            {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
          </View>
        )}

        {propertyType === "Agricultural land" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
            <Text style={styles.locationText}>
              {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

              {language === "en" || language === null ? (
                <Text>
                  {" "}
                  {`${property.address.village}, ${property.address.mandal}, ${property.address.mandal}, ${property.address.district}, ${property.address.state}, ${property.address.pinCode}`}
                </Text>
              ) : (
                <Text>
                  {" "}
                  {`${
                    property.address.villageTe || property.address.village
                  }, ${property.address.mandalTe || property.address.mandal}, ${
                    property.address.mandalTe || property.address.mandal
                  }, ${
                    property.address.districtTe || property.address.district
                  }, ${property.address.stateTe || property.address.state}, ${
                    property.address.pinCode
                  }`}
                </Text>
              )}
            </Text>

            {language === "en" ? (
              <DetailRow4
                icon="map-marker"
                text={`Landmark`}
                text1={`${property.address?.landMark || "N/A"}`}
              />
            ) : (
              <DetailRow4
                icon="map-marker"
                text={`Landmark`}
                text1={`${
                  property.address.landMarkTe || property.address.landMark ||"N/A"
                }`}
              />
            )}
            {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{i18n.t("Amenities")}</Text>
          {propertyType === "Residential" && (
            <>
              <DetailRow
                icon="flash"
                text={`Power Supply`}
                text1={`${amenities.powerSupply ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="water"
                text={`Water Facility`}
                text1={`${amenities.waterFacility ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="elevator"
                text={`Elevator`}
                text1={`${amenities.elevator ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="shield-account"
                text={`Watchman`}
                text1={`${amenities.watchman ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="cctv"
                text={`CCTV`}
                text1={`${amenities.cctv ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="dumbbell"
                text={`Gym Facility`}
                text1={`${amenities.gymFacility ? "Yes" : "No"}`}
              />
            </>
          )}
          {propertyType === "Commercial" &&
            property.propertyDetails.amenities && (
              <>
                <DetailRow
                  icon="flash"
                  text={`Electricity`}
                  text1={`${
                    property.propertyDetails.amenities.isElectricity
                      ? "Yes"
                      : "No"
                  }`}
                />
                <DetailRow
                  icon="water"
                  text={`Water Facility`}
                  text1={`${
                    property.propertyDetails.amenities.isWaterFacility
                      ? "Yes"
                      : "No"
                  }`}
                />
                <DetailRow
                  icon="road-variant"
                  text={`Road Face`}
                  text1={`${
                    property.propertyDetails.amenities.isRoadFace ? "Yes" : "No"
                  }`}
                />
              </>
            )}

          {propertyType === "Layout" && (
            <>
              <DetailRow
                icon="water-well"
                text={`Underground Water`}
                text1={`${amenities.underGroundWater ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="water"
                text={`Drainage System`}
                text1={`${amenities.drainageSystem ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="flash"
                text={`Electricity`}
                text1={`${amenities.electricityFacility ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="pool"
                text={`Swimming Pool`}
                text1={`${amenities.swimmingPool ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="handball"
                text={`Play Zone`}
                text1={`${amenities.playZone ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="dumbbell"
                text={`Gym`}
                text1={`${amenities.gym ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="home-city"
                text={`Convention Hall`}
                text1={`${amenities.conventionHall ? "Yes" : "No"}`}
              />
            </>
          )}
          {propertyType === "Agricultural land" && (
            <>
              <DetailRow
                icon="water-well"
                text={`Bore Well`}
                text1={`${amenities.boreWell ? "Yes" : "No"}`}
              />
              <DetailRow
                icon="flash"
                text={`Electricity`}
                text1={`${amenities.electricity ? "Yes" : "No"}`}
              />
              <DetailRow3
                icon="road-variant"
                text={`Distance from Road`}
                text1={`${amenities.distanceFromRoad} meters`}
              />
              <DetailRow
                icon="warehouse"
                text={`Storage Facility`}
                text1={`${amenities.storageFacility ? "Yes" : "No"}`}
              />
            </>
          )}
        </View>

        {propertyType === "Layout" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t("Approvals")}</Text>
            <DetailRow
              icon="check-circle"
              text={`RERA Registered`}
              text1={`${details.reraRegistered ? "Yes" : "No"}`}
            />
            <DetailRow
              icon="check-circle"
              text={`DTCP Approved`}
              text1={`${details.dtcpApproved ? "Yes" : "No"}`}
            />
            <DetailRow
              icon="check-circle"
              text={`TLP Approved`}
              text1={`${details.tlpApproved ? "Yes" : "No"}`}
            />
            <DetailRow
              icon="check-circle"
              text={`FLP Approved`}
              text1={`${details.flpApproved ? "Yes" : "No"}`}
            />
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{i18n.t("Description")}</Text>
          <Text style={styles.descriptionText}>
            {propertyType === "Commercial"
              ? property.propertyDetails.landDetails.description
              : propertyType === "Agricultural land"
              ? details.propertyDesc
              : details.description || "No description available."}
          </Text>
        </View>
        {/* {propertyType === "Agricultural land" && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Owner Details</Text> 
 <DetailRow icon="account" text={`Name: ${property.owner?.ownerName || property.ownerDetails?.ownerName || property.propertyDetails?.owner?.ownerName}`} />
 <DetailRow icon="phone" text={`Contact: ${property.owner?.contact || property.ownerDetails?.ownerContact || property.propertyDetails?.owner?.ownerContact || property.ownerDetails?.phoneNumber }`} />
 </View>
)} */}

        <View>
          {propertyType === "Residential" &&
            property.propertyDetails.flat.length > 0 && (
              <View>
                <Text style={styles.cardTitle}>
                  {i18n.t("Available Flats")}
                </Text>

                <FlatList
                  data={property.propertyDetails.flat}
                  renderItem={renderFlats}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{i18n.t("Owner Details")}</Text>
          <DetailRow3
            icon="account"
            text={`Name`}
            text1={`${
              property.owner?.ownerName ||
              property.ownerDetails?.ownerName ||
              property.propertyDetails?.owner?.ownerName
            }`}
          />
          <DetailRow3
            icon="phone"
            text={`Contact`}
            text1={` ${formatPhoneNumber(
              property.owner?.contact ||
                property.ownerDetails?.ownerContact ||
                property.propertyDetails?.owner?.ownerContact ||
                property.ownerDetails?.phoneNumber
            )}`}
          />
          {propertyType !== "Agricultural land" && (
            <DetailRow3
              icon="email"
              text={`Email`}
              text1={`${
                property.owner?.ownerEmail ||
                property.ownerDetails?.ownerEmail ||
                property.propertyDetails?.owner?.ownerEmail
              }`}
            />
          )}
          {propertyType === "Commercial" &&
            property.propertyDetails?.owner?.isLegalDispute && (
              <DetailRow3
                icon="alert"
                text={`Legal Dispute`}
                text1={`${property.propertyDetails.owner.disputeDesc}`}
              />
            )}
        </View>

        {role === 3 && (
          <TouchableOpacity
            style={{
              backgroundColor: "#6a9499",
              padding: 10,
              marginHorizontal: 10,
              marginTop: 10,
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={consultAgent}
          >
            <Text
              style={[
                { fontSize: 16, fontWeight: "bold", color: "white" },
                styles.text1,
              ]}
            >
              Consult an Agent
            </Text>
          </TouchableOpacity>
        )}

        {/* <View style={styles.card}>
 <Text style={styles.cardTitle}>Agent Details</Text>
 <DetailRow icon="account-tie" text={`Name: ${property.agentName}`} />
 <DetailRow icon="phone" text={`Phone: ${property.agentNumber}`} />
 <DetailRow icon="email" text={`Email: ${property.agentEmail}`} />
 <DetailRow icon="city" text={`City: ${property.agentCity}`} />
 </View> */}
      </View>
    </ScrollView>
  );
};

const DetailRow = ({ icon, text, text1 }) => {
  return (
    <View style={styles.detailRow}>
      <Icon name={icon} size={24} color="#4a90e2" />
      <Text style={[{}, styles.text12]}>{i18n.t(text)}</Text>
      <Text style={styles.text1}>{i18n.t(text1)}</Text>
    </View>
  );
};

const DetailRow3 = ({ icon, text, text1 }) => {
  return (
    <View style={styles.detailRow}>
      <Icon name={icon} size={24} color="#4a90e2" />
      <Text style={[{}, styles.text12]}>{i18n.t(text)}</Text>
      <Text style={[{ width: "80%", flexWrap: "wrap" }, styles.text1]}>
        {text1}
      </Text>
    </View>
  );
};

const DetailRow4 = ({ icon, text, text1 }) => {
  return (
    <View style={[styles.detailRow, { flexDirection: "row" }]}>
      <View>
        <Icon name={icon} size={24} color="#4a90e2" />
      </View>
      <Text style={styles.text12}>{i18n.t(text)}</Text>
      {text1.length > 30 ? (
        <Text
          style={[
            { width: "80%", flexWrap: "wrap", marginTop: 10 },
            styles.text1,
          ]}
        >
          {text1}
        </Text>
      ) : (
        <Text style={[{ width: "80%", flexWrap: "wrap" }, styles.text1]}>
          {text1}
        </Text>
      )}
    </View>
  );
};

const DetailRow1 = ({ icon, text, text1, text2 }) => {
  return (
    <View style={styles.detailRow}>
      <Icon name={icon} size={24} color="#4a90e2" />
      <Text style={styles.text12}>{i18n.t(text)}</Text>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text1}>{text2}</Text>
    </View>
  );
};

const DetailRow2 = ({ icon, text, text1, text2 }) => {
  return (
    <View style={styles.detailRow}>
      <Icon name={icon} size={24} color="#4a90e2" />
      <Text style={styles.text12}>{i18n.t(text)}</Text>
      <Text style={styles.text1}>₹{text1} per </Text>
      <Text style={styles.text1}>{i18n.t(text2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontFamily: "Montserrat_500Medium",
  },
  text12: {
    fontFamily: "Montserrat_700Bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    fontFamily: "Montserrat_700Bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
    fontFamily: "Montserrat_700Bold",
  },
  detailsContainer: {
    padding: 15,
    fontFamily: "Montserrat_700Bold",
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Montserrat_700Bold",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4a90e2",
    marginBottom: 15,
    fontFamily: "Montserrat_700Bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    fontFamily: "Montserrat_700Bold",
  },
  cardTitle: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    fontFamily: "Montserrat_700Bold",
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    flex: 1,
    fontFamily: "Montserrat_700Bold",
  },

  detailText1: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    justifyContent: "flex-start",
    fontFamily: "Montserrat_700Bold",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Montserrat_700Bold",
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    width: "95%",
    flexWrap: "wrap",
    fontFamily: "Montserrat_700Bold",
  },
  image1: {
    height: 90,
    width: 150,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    fontFamily: "Montserrat_700Bold",
  },
  image2: {
    height: 100,
    width: 130,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    fontFamily: "Montserrat_700Bold",
  },

  plotCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    marginHorizontal: 5,
    fontFamily: "Montserrat_700Bold",
  },

  flatCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 5,
    fontFamily: "Montserrat_700Bold",
  },

  plotDetails: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",

    // fontWeight:"bold"
  },
  plotDetails1: {
    fontSize: 15,
    marginLeft: 10,
    marginVertical: 2,
    // fontWeight:"bold"
    fontFamily: "Montserrat_700Bold",
  },

  imageBg: {
    backgroundColor: "#047f91",
    color: "#fff",
    fontFamily: "Montserrat_500Medium",

    padding: 10,
    fontSize: 16,
    // textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "48%",
  },
});

export default PropertyDetailsScreen;
