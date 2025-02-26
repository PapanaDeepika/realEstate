import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, TextInput, ToastAndroid } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import CountdownTimer from '../Screens/CountdownTimer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function AuctionScreen({ route }) {
  const property = route?.params?.property;
  const [bidAmount, setBidAmount] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState({ bidError: '', agreeError: '' });
  const [auctionProperty, setAuctionProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateBidAmount = (input) => {
    if (!input) return "Bid amount is required."; 
    const bidAmountNum = parseFloat(input);
    if (bidAmountNum <= auctionProperty.amount) {
        return "Bid amount should be greater than the initial bid amount.";
    }
    if (input.slice(-2) !== '00') {
        return "The last two digits of the bid amount should be zeroes.";
    }
    return ""; 
  };

  const handleChange = (text) => {
    setBidAmount(text);
    if (isSubmitted) {
      const bidError = validateBidAmount(text);
      setError(prev => ({ ...prev, bidError }));
    }
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Bid Amount Submitted Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  const validationErrors = () => {
    let valid = true;
    const newErrors = {};
    const bidError = validateBidAmount(bidAmount);
    if (bidError) {
      newErrors.bidError = bidError;
      valid = false;
    }
    if (!agreed) {
      newErrors.agreeError = "You must agree to the terms and conditions.";
      valid = false;
    }
    setError(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (validationErrors()) {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const tokenData = jwtDecode(token);
        const currentDateTime = new Date().toISOString();
        const data = {
          bidAmount: bidAmount,
          buyerId: tokenData.user.userId,
          buyerName: `${tokenData.user.firstName} ${tokenData.user.lastName}`,
          transactionId: "pay_Pq0Jzm3iqlLjXm",
          bidTime: currentDateTime
        };

        const response = await axios.put(`http://172.17.15.189:3000/auction/bid/${auctionProperty?._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 201) {
          showToastWithGravityAndOffset();
          setBidAmount('');
          setAgreed(false);
        }
      } catch (error) {
        console.error("Error submitting data:", error.response?.data || error.message);
      }
    }
  };

  const getAuctionDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const tokenData = jwtDecode(token);

      const response = await fetch(
        `http://172.17.15.189:3000/auction/getAuctionDetailsProperty/${property.propertyId}`, 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
      const data = await response.json();
      if (response.status === 409) {
        setLoading(false);
      } else {
        setAuctionProperty(data?.data[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getAuctionDetails();
  // }, []);

      useFocusEffect(
          useCallback(() => {
            // If query is not empty, we fetch the searched data
            
            getAuctionDetails(); // Fetch the original data
       
          }, [getAuctionDetails])
        );

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

  const formatDate = (date) => {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={{ flexDirection: "column", backgroundColor: "black" }}>
            
            <TouchableOpacity style={styles.cardNew} onPress={() => propertyDetails(property)} key={property._id}>
                    {(auctionProperty.property.propertyType === "Agricultural land" || auctionProperty.property.propertyType === "Agricultural" )
                     && (<ImageBackground style={styles.imageNew} 
                      source ={{uri: auctionProperty.property?.images?.[0] || auctionProperty.property?.landDetails?.images?.[0]
                        || auctionProperty.property?.uploadPics?.[0] || auctionProperty.property?.propPhotos?.[0] ||
                         "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
                   
                  
                   
                   <Text style={styles.imageText}>{auctionProperty.property?.landDetails?.title} @ {auctionProperty.property?.propertyId}</Text>
                   <Text style={styles.priceBottomStyle}>{formatPrice(auctionProperty.amount)}</Text>
                 
                   </ImageBackground>)}
                   
                   {auctionProperty.property.propertyType === "Residential" && (<ImageBackground
                    style={styles.imageNew} 
                    source ={{uri:  (auctionProperty.property?.propPhotos	?.length > 0) ? (auctionProperty.property?.propPhotos	?.[0]) :
                    ( "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg")}}>
                   
                   
                   
                   <Text style={styles.imageText}>{auctionProperty.property?.propertyDetails?.apartmentName} @ {auctionProperty.property?.propertyId}</Text>
                   <Text style={styles.priceBottomStyle}>{formatPrice(auctionProperty.amount )}</Text>
                
                   </ImageBackground>)}
                   
                   {auctionProperty.property.propertyType === "Commercial" && (<ImageBackground style={styles.imageNew} source =
                   {{uri: auctionProperty.property?.propertyDetails?.uploadPics?.[0]  ||  
                   "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
                   
                   
                   
                   <Text style={styles.imageText}>{ auctionProperty.property?.propertyTitle} @ {auctionProperty.property?.propertyId}</Text>
                   <Text style={styles.priceBottomStyle}>{formatPrice(auctionProperty.amount)}</Text>
                    
                   </ImageBackground>)}
                   
                   {auctionProperty.property.propertyType === "Layout" && (<ImageBackground style={styles.imageNew} 
                   source ={{uri: auctionProperty.property?.images?.[0] || auctionProperty.property?.landDetails?.images?.[0] || 
                    auctionProperty.property?.uploadPics?.[0] || auctionProperty.property?.propPhotos?.[0] || 
                   "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
                   
                   
                   
                   <Text style={styles.imageText}>{auctionProperty.property?.layoutDetails?.layoutTitle } @ {auctionProperty.property?.propertyId}</Text>
                   <Text style={styles.priceBottomStyle}>{formatPrice(auctionProperty.amount)}</Text>
                
                   </ImageBackground>)}
                   
                   <View style={styles.detailsContainer}>
                    <View style={styles.detailsStyles}>
                   <Icon name="map-marker" size={24} color="#007bff" />
                   <Text style={styles.textStyleNew}>{auctionProperty.property?.layoutDetails?.address?.district || 
                   auctionProperty.property?.propertyDetails?.landDetails?.address?.district || 
                   auctionProperty.property?.address?.district || 
                   auctionProperty.property?.address?.district }</Text>
                   </View>
                   <View style={styles.detailsStyles}>
                   <Icon name="ruler" size={24} color="#007bff" />
                   <Text style={styles.textStyleNew}>{auctionProperty.property?.layoutDetails?.plotSize || 
                   auctionProperty.property?.propertyDetails?.landDetails?.sell?.plotSize ||
                   auctionProperty.property?.propertyDetails?.landDetails?.rent?.plotSize|| 
                   auctionProperty.propertyDetails?.landDetails?.lease?.plotSize|| 
                   auctionProperty.property?.propertyDetails?.flatSize || 
                   auctionProperty.property?.landDetails?.size } {auctionProperty.property?.layoutDetails?.sizeUnit || 
                    auctionProperty.property?.propertyDetails?.landDetails?.sell?.sizeUnit || 
                    auctionProperty.property?.propertyDetails?.landDetails?.rent?.sizeUnit|| 
                    auctionProperty.property?.propertyDetails?.landDetails?.lease?.sizeUnit|| 
                    auctionProperty.property?.propertyDetails?.sizeUnit || 
                    auctionProperty.property?.landDetails?.sizeUnit }</Text>
                   </View>
                   </View>
       
                
       
                    </TouchableOpacity>
          
            <View style={{ alignItems: 'center', backgroundColor: "#f0f8ff", padding: 10 }}>
              <CountdownTimer targetDate={property.endDate} currentDate={currentDate} />
            </View>
          </View>

          <View style={styles.auctionDetailsContainer}>
            <Text style={styles.title}>Auction Details</Text>
            <Text style={styles.text}>Start Date: {formatDate(auctionProperty.startDate)}</Text>
            <Text style={styles.text}>End Date: {formatDate(auctionProperty.endDate)}</Text>
            <Text style={styles.text}>Initial Bid: ₹{auctionProperty.amount}</Text>
            {auctionProperty?.auctionType === "public" ? (
    <>
      <Text style={styles.text}>Current Bid: ₹{auctionProperty.maximumBid?.bidAmount || auctionProperty.amount}</Text>
      {/* <View style={styles.warningContainer}>
        <Icon name="alert" size={20} color="red" />
        <Text style={styles.warningText}>Current Bid is displayed because this is a public auction</Text>
      </View> */}

      <View style={styles.warningContainer}>
      <Icon name="alert" size={20} color="#FFA500" style={styles.warningIcon}/>
      <Text style={styles.warningText}>Current Bid is displayed because this is a public auction</Text>
</View>
    </>
  ) : (
    <View style={styles.warningContainer}>
      <Icon name="alert" size={20} color="yellow" />
      <Text style={styles.warningText}>Current Bid is not displayed because this is a private auction</Text>
    </View>
  )}
            <Text style={styles.footerText}>Now you can start participating in the auction. Start Bidding.</Text>

            <Text style={styles.rulesTitle}>Rules and Regulations:</Text>
            <Text style={styles.rulesText}>- The user entered amount should be paid.</Text>
            <Text style={styles.rulesText}>- 10% of the amount will be charged as a platform fee.</Text>
            <Text style={styles.rulesText}>- If the user does not win the auction, the amount will be refunded except for the platform fee.</Text>

            <Text style={styles.label}>Enter Bid Amount</Text>
            <TextInput
              style={styles.input}
              value={bidAmount}
              onChangeText={handleChange}
              placeholder="Enter bid amount"
              keyboardType="numeric"
            />
            {isSubmitted && error.bidError ? <Text style={styles.error}>{error.bidError}</Text> : null}

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={agreed ? 'checked' : 'unchecked'}
                onPress={() => setAgreed(!agreed)}
              />
              <Text style={styles.checkboxLabel}>Yes, I agree</Text>
            </View>
            {isSubmitted && error.agreeError && !agreed && <Text style={styles.error}>{error.agreeError}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  auctionDetailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 5,
    margin:10,
    borderRadius:10
  },
  title: {
    fontSize: 24,
fontFamily:'Montserrat_700Bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontFamily:"Montserrat_500Medium"
  },
  entryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    fontFamily:'Montserrat_400Regular'
  },
  imageText:{
    backgroundColor: '#f0f8ff',  
    padding: 10, 
     color: '#000', 
    fontSize: 16,  
     textAlign: 'center',  
     borderWidth: 1, 
    borderColor: '#007acc',  
    width:"50%",
    borderBottomRightRadius:60,
    fontFamily: "Montserrat_700Bold",

    
  },
  imageNew:{
    height:200,
    width:ScreenWidth
  },
  cardNew: {
    backgroundColor: "#fff",
     overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingBottom:10
  },
  priceStyle:{
    backgroundColor: 'rgba(173, 216, 230, 0.7)', 
    padding: 10, 
     color: '#000',  
    fontSize: 16,  
    fontWeight: 'bold',  
    textAlign: 'center', 
     borderWidth: 1,  
    borderColor: '#007acc',  
    width:"40%",
   },
   priceBottomStyle:{
    // position:"absolute",
    // left:10,
    // bottom:10,
    // backgroundColor: 'rgba(173, 216, 230, 0.7)', 
    // padding: 10, 
    // color:"#fff"
    position: 'absolute',
    // borderBottomColor:"#fff",
    // borderBottomWidth:2,
    bottom: 1, // Distance from the bottom of the image
     backgroundColor: '#f0f0f0', // Semi-transparent dark background
    color: '#000', // White text for contrast
    fontSize: 16, // Adjust font size
     paddingVertical: 4, // Vertical padding for the text box
    paddingHorizontal: 8, // Horizontal padding for the text box
    fontFamily:'Montserrat_700Bold'
    },
    detailsStyles:{
        flexDirection:'row'
          },
          textStyleNew:{
            marginLeft:5,
        fontSize:16,
         fontFamily: "Montserrat_500Medium",
 
          },

          detailsContainer:{
            flexDirection:"row",
            justifyContent:"space-between",
        marginTop:10,
        paddingHorizontal:10
          },
          input: {
            marginBottom: 5,
            padding: 10,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            fontFamily:'Montserrat_400Regular',

          },
          label: {
            fontSize: 16,
            marginRight: 10,
            marginVertical:5,
            fontFamily:'Montserrat_700Bold',
          },
          error: {
            color: 'red',
            marginTop: 5,
          },
          rulesTitle: {
            fontSize: 18,
fontFamily:'Montserrat_700Bold',
            marginTop: 15,
        },
        rulesText: {
            fontSize: 14,
            color: '#333',
            marginBottom: 5,
            fontFamily:'Montserrat_500Medium',

        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
         },
        checkboxLabel: {
            fontSize: 16,
            marginLeft: 8,
            fontFamily:'Montserrat_500Medium',

        },
        submitButton: {
            backgroundColor: '#4184AB',
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            alignItems: 'center',
        },
        disabledButton: {
            backgroundColor: 'gray',
        },
        submitButtonText: {
            textAlign: 'center',
            fontSize: 16,
            fontFamily:'Montserrat_700Bold',
            color: "white",
        },
        warningContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fffde7', 
          borderLeftWidth: 5,
          borderLeftColor: '#ffcc00',  
          padding: 10,
           borderRadius: 5,
       },
      warningText: {
          flex: 1, // Ensures text takes only available space
          fontSize: 14,
          color: '#856404', // Dark yellow/brownish text
fontFamily:'Montserrat_700Bold'
        },
      warningIcon: {
          marginRight: 8,
      },
});

