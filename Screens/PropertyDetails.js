import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({ route }) => {


  const {t}=useTranslation()
 const [property, setProperty] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
const {propByRoute} = route.params
console.log("ROUTE", propByRoute)
const propertyId = propByRoute.propertyId || propByRoute._id
const propertyType = propByRoute.propertyType

console.log("PROPERTY ID", propertyId)
console.log("PROPERTY TYPE", propertyType)

 
 useEffect(() => {
 getDetails();
 }, []);

 const getDetails = async () => {
 try {
 const token = await AsyncStorage.getItem('userToken');
 if (!token) {
 setError('No token found');
 setLoading(false);
 return;
 }

 const response = await axios.get(
 `http://172.17.15.184:3000/property/getpropbyid/${propertyType}/${propertyId}`,
 {
 headers: {
 'Authorization': `Bearer ${token}`,
 'Content-Type': 'application/json',
 }
 }
 );
 setProperty(response.data);
 } catch (error) {
 console.error('Error fetching property details:', error.message);
 setError('Failed to fetch property details');
 } finally {
 setLoading(false);
 }
 };

 const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    // const cleanedValue = value.replace(/\D/g, '');

    // Format it into 'xxx xxx xxxx'
    console.log(value)
    value=String(value)
    let formattedPhoneNumber = '';
    if (value.length <= 3) {
      formattedPhoneNumber = value;
    } else if (value.length <= 6) {
      formattedPhoneNumber = value.substring(0, 3) + ' ' + value.substring(3, 6);
    } else {
      formattedPhoneNumber = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
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
 <Text style={styles.errorText}>{t("No properties found")}</Text>
 </View>
 );
 }

 const renderImage = ({ item }) => (
  <Image source={{ uri: item }} style={styles.image} />
 );

 const getPropertyDetails = () => {
 switch (propertyType) {
 case 'Residential':
 return property.propertyDetails;
 case 'Commercial':
 return property.propertyDetails.landDetails.sell 
 || property.propertyDetails.landDetails.rent || property.propertyDetails.landDetails.lease;
 case 'Layout':
 return property.layoutDetails;
 case 'Agricultural land':
 return property.landDetails;
 default:
 return {};
 }
 };
 const getDefaultImage = (propertyType, property) => {
 switch (propertyType) {
 case 'Commercial':
 return property.propertyDetails?.uploadPics[0] || "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg";
 case 'Agricultural land':
 return  property.landDetails?.images[0] || "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"   ;
 case 'Layout':
 return property.uploadPics[0] || "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg";
 default:
 return property.propPhotos[0] || "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg";
 }
 };
 
 const details = getPropertyDetails();
 const amenities = property.amenities;
 const address = propertyType === 'Commercial' ? property.propertyDetails.landDetails.address : property.address;

 return (
 <ScrollView style={styles.container}>
 <FlatList
 data={[getDefaultImage(propertyType, property)]} 
 renderItem={renderImage}
 horizontal
 pagingEnabled
 showsHorizontalScrollIndicator={false}
 />

 <View style={styles.detailsContainer}>
 <Text style={styles.title}>
 {propertyType === 'Commercial' ? property.propertyTitle : 
 (propertyType === 'Agricultural land' ? details.title :
 (details.apartmentName || details.layoutTitle || 'Property'))}
 </Text>
 <Text style={styles.price}>
 ₹{(details.totalCost || details.totalAmount || details.totalPrice || 0).toLocaleString('en-IN')}
 </Text>
 
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{t("Property Details")}</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="home-variant" text={`${"Type"}`}  text1={`${details.type}`}/>
 <DetailRow icon="office-building" text={`${"Layout"}`} text1={` ${details.apartmentLayout}`} />
 {/* <DetailRow icon="ruler-square" text={`${"Size"}: ${details.flatSize} ${details.sizeUnit}`}  /> */}
 <DetailRow1 icon="ruler-square" text={`Size`} text1={`${details.flatSize}`} text2={`${details.sizeUnit}`}/>
  <DetailRow icon="compass" text={`${"Facing"}`} text1={`${details.flatFacing}`} />
 <DetailRow icon="sofa" text={`${"Furnished"}`}  text1={`${details.furnitured}`}/>
 </>
 )}
 {propertyType === 'Commercial' && (
 <>
  {/* <DetailRow icon="currency-inr" text={`${"Price"}: ₹${details.price} per  `} text1={`${details.sizeUnit}`} /> */}

 <DetailRow1 icon="ruler-square" text={`Plot Size`} text1={`${details.plotSize}`} text2={`${details.sizeUnit}`}/>
 <DetailRow2 icon="currency-inr" text={`Price`}  text1={`${details.price}`} text2={`${details.sizeUnit}`} />

 <DetailRow icon="store" text={`${"Usage"}`}  text1= {`${details.landUsage.join(', ')}`} />
 </>
 )}
 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="home-group" text={`Total Plots`} text1={`${details.plotCount}`} />
 <DetailRow icon="home-plus" text={`Available Plots`} text1={`${details.availablePlots}`} />
 {/* <DetailRow icon="ruler-square" text={`Plot Size: ${details.plotSize} `} text1={`${details.sizeUnit}`}/> */}
 <DetailRow1 icon="ruler-square" text={`Plot Size`} text1={`${details.plotSize}`} text2={`${details.sizeUnit}`}/>
 <DetailRow2 icon="currency-inr" text={`Price`}  text1={`${details.plotPrice}`} text2={`${details.priceUnit}`} />
 {/* <DetailRow1 icon="ruler-square" text={`Price`} text1={`${details.plotSize}`} text2={`${details.sizeUnit}`}/> */}

 </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow1 icon="ruler-square" text={`Size`} text1={`${details.size}`} text2={`${details.sizeUnit}`}/>
 <DetailRow icon="file-document-outline" text={"Survey Number"} text1={`${details.surveyNumber}`} />
 {/* <DetailRow icon="currency-inr" text={`Price: ₹${details.price} per ${details.priceUnit}`}   /> */}

  <DetailRow2 icon="currency-inr" text={`Price`}  text1={`${details.price}`} text2={`${details.priceUnit}`} />

 <DetailRow icon="sprout" text={`Land Type`} text1={`${details.landType}`}/>
 <DetailRow icon="gavel" text={`Litigation`}text1={` ${details.litigation ? 'Yes' : 'No'}`}   />
 {details.litigation && (
 <DetailRow icon="alert-circle" text={`Litigation Details`} text1={`${details.litigationDesc}`}   />
 )}
 </>
 )}
 </View>
 {propertyType === 'Layout' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Location</Text>
 <Text style={styles.locationText}>
 {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`}

 </Text>
 <DetailRow icon="map-marker" text={`Landmark`} text1={`${property.layoutDetails.address.landMark}`}   />
 </View>
 )}
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{t("Amenities")}</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="flash" text={`Power Supply`} text1={`${amenities.powerSupply ? 'Yes' : 'No'}`}  />
 <DetailRow icon="water" text={`Water Facility`} text1={`${amenities.waterFacility ? 'Yes' : 'No'}`}   />
 <DetailRow icon="elevator" text={`Elevator`}  text1={`${amenities.elevator ? 'Yes' : 'No'}`}  />
 <DetailRow icon="shield-account" text={`Watchman`}  text1={`${amenities.watchman ? 'Yes' : 'No'}`}  />
 <DetailRow icon="cctv" text={`CCTV`} text1={`${amenities.cctv ? 'Yes' : 'No'}`}   />
 <DetailRow icon="dumbbell" text={`Gym Facility`} text1={`${amenities.gymFacility ? 'Yes' : 'No'}`}   />
 </>
 )}
 {propertyType === 'Commercial' && property.propertyDetails.amenities && (
 <>
 <DetailRow
 icon="flash"
 text={`Electricity`} text1={`${property.propertyDetails.amenities.isElectricity ? 'Yes' : 'No'}`}
  />
 <DetailRow
 icon="water"
 text={`Water Facility`} text1={`${property.propertyDetails.amenities.isWaterFacility ? 'Yes' : 'No'}`}
  />
 <DetailRow
 icon="road-variant"
 text={`Road Face`} text1={`${property.propertyDetails.amenities.isRoadFace ? 'Yes' : 'No'}`}
  />
 </>
)}

 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="water-well" text={`Underground Water`} text1={`${amenities.underGroundWater ? 'Yes' : 'No'}`}   />
 <DetailRow icon="water" text={`Drainage System`} text1={`${amenities.drainageSystem ? 'Yes' : 'No'}`}   />
 <DetailRow icon="flash" text={`Electricity`} text1={`${amenities.electricityFacility ? 'Yes' : 'No'}`}   />
 <DetailRow icon="pool" text={`Swimming Pool`} text1={`${amenities.swimmingPool ? 'Yes' : 'No'}`}   />
 <DetailRow icon="handball" text={`Play Zone`} text1={`${amenities.playZone ? 'Yes' : 'No'}`}   />
 <DetailRow icon="dumbbell" text={`Gym`} text1={`${amenities.gym ? 'Yes' : 'No'}`}   />
 <DetailRow icon="home-city" text={`Convention Hall`} text1={`${amenities.conventionHall ? 'Yes' : 'No'}`}   />
 </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow icon="water-well" text={`Bore Well`} text1={`${amenities.boreWell ? 'Yes' : 'No'}`}  />
 <DetailRow icon="flash" text={`Electricity`} text1={`${amenities.electricity ? 'Yes' : 'No'}`}   />
 <DetailRow icon="road-variant" text={`Distance from Road`} text1={`${amenities.distanceFromRoad} meters`}   />
 <DetailRow icon="warehouse" text={`Storage Facility`} text1={`${amenities.storageFacility ? 'Yes' : 'No'}`}   />
 </>
 )}
 </View>

 {propertyType === 'Layout' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{t("Approvals")}</Text>
 <DetailRow icon="check-circle" text={`RERA Registered`} text1={`${details.reraRegistered ? 'Yes' : 'No'}`}   />
 <DetailRow icon="check-circle" text={`DTCP Approved`}text1={`${details.dtcpApproved ? 'Yes' : 'No'}`}  />
 <DetailRow icon="check-circle" text={`TLP Approved`} text1={`${details.tlpApproved ? 'Yes' : 'No'}`}  />
 <DetailRow icon="check-circle" text={`FLP Approved`} text1={`${details.flpApproved ? 'Yes' : 'No'}`}  />
 </View>
 )}

 <View style={styles.card}>
 <Text style={styles.cardTitle}>{t("Description")}</Text>
 <Text style={styles.descriptionText}>
 {propertyType === 'Commercial' ? property.propertyDetails.landDetails.description : 
 (propertyType === 'Agricultural land' ? details.propertyDesc :
 (details.description || 'No description available.'))}
 </Text>
 </View>
{/* {propertyType === "Agricultural land" && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Owner Details</Text> 
 <DetailRow icon="account" text={`Name: ${property.owner?.ownerName || property.ownerDetails?.ownerName || property.propertyDetails?.owner?.ownerName}`} />
 <DetailRow icon="phone" text={`Contact: ${property.owner?.contact || property.ownerDetails?.ownerContact || property.propertyDetails?.owner?.ownerContact || property.ownerDetails?.phoneNumber }`} />
 </View>
)} */}
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{t("Owner Details")}</Text> 
 <DetailRow icon="account" text={`Name`} text1={`${property.owner?.ownerName || property.ownerDetails?.ownerName || property.propertyDetails?.owner?.ownerName}`}  />
 <DetailRow icon="phone" text={`Contact`} text1={` ${formatPhoneNumber(property.owner?.contact || property.ownerDetails?.ownerContact || property.propertyDetails?.owner?.ownerContact|| property.ownerDetails?.phoneNumber) }`}  />
 <DetailRow icon="email" text={`Email`} text1={`${property.owner?.ownerEmail || property.ownerDetails?.ownerEmail || property.propertyDetails?.owner?.ownerEmail}`}  />
 {propertyType === 'Commercial' && property.propertyDetails?.owner?.isLegalDispute && (
 <DetailRow icon="alert" text={`Legal Dispute`} text1={`${property.propertyDetails.owner.disputeDesc}`}   />
 )}
 </View> 

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

 const DetailRow = ({ icon, text,text1 }) => {
  const {t}=useTranslation()
return(
 <View style={styles.detailRow}>
 <Icon name={icon} size={24} color="#4a90e2" />
 <Text  >{t(text)}:</Text>
 <Text  >{t(text1)}</Text>
 </View>)
 };

 const DetailRow1 = ({ icon, text,text1,text2 }) => {
  const {t}=useTranslation()
return(
 <View style={styles.detailRow}>
 <Icon name={icon} size={24} color="#4a90e2" />
 <Text  >{t(text)}:</Text>
 <Text  >{t(text1)}</Text>
 <Text  >{t(text2)}</Text>

 </View>)
 };


 const DetailRow2 = ({ icon, text,text1,text2 }) => {
  const {t}=useTranslation()
return(
 <View style={styles.detailRow}>
 <Icon name={icon} size={24} color="#4a90e2" />
 <Text  >{t(text)}:</Text>
 <Text  >₹{t(text1)} per </Text>
 <Text  >{t(text2)}</Text>

 </View>)
 };

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#f5f5f5',
 },
 centered: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 },
 errorText: {
 fontSize: 18,
 color: 'red',
 textAlign: 'center',
 },
 image: {
 width: width,
 height: 250,
 resizeMode: 'cover',
 },
 detailsContainer: {
 padding: 15,
 },
 title: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#333',
 marginBottom: 5,
 },
 price: {
 fontSize: 22,
 fontWeight: 'bold',
 color: '#4a90e2',
 marginBottom: 15,
 },
 card: {
 backgroundColor: 'white',
 borderRadius: 8,
 padding: 15,
 marginBottom: 15,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.1,
 shadowRadius: 4,
 elevation: 3,
 },
 cardTitle: {
 fontSize: 18,
 fontWeight: 'bold',
 color: '#333',
 marginBottom: 10,
 },
 detailRow: {
 flexDirection: 'row',
 alignItems: 'center',
 marginBottom: 8,
 },
 detailText: {
 fontSize: 16,
 color: '#666',
 marginLeft: 10,
 flex: 1,
 },

 detailText1: {
  fontSize: 16,
  color: '#666',
   flex: 1,
   justifyContent:"flex-start"
  },
 locationText: {
 fontSize: 16,
 color: '#666',
 marginBottom: 8,
 },
 descriptionText: {
 fontSize: 16,
 color: '#666',
 lineHeight: 24,
 },
});

export default PropertyDetailsScreen;