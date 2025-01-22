import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../LanguageContext';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({ route }) => {
    const { isTelugu } = useContext(LanguageContext);
    
 const [property, setProperty] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
const {propByRoute} = route.params
console.log("ROUTE", propByRoute)
const propertyId =  propByRoute._id || propByRoute.propertyId 
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
 `http://172.17.13.106:3000/property/getpropbyid/${propertyType}/${propertyId}`,
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
 <Text style={styles.errorText}>No property data available</Text>
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
 return property.landDetails?.images[0] || "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"  ;
 case 'Layout':
 return property.uploadPics[0] || "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg";
 default:
 return property.propPhotos[0] || "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg";
 }
 };
 const getAddressDetails =()=>{
    switch (propertyType) {
        case 'Residential':
        return property.address;
        case 'Commercial':
        return property.propertyDetails.landDetails.address 
       
        case 'Layout':
        return property.layoutDetails.address;
        case 'Agricultural land':
        return property.address;
        default:
        return {};
        }
}
 
 const details = getPropertyDetails();
 const amenities = property.amenities;
 const address = propertyType === 'Commercial' ? property.propertyDetails.landDetails.address : property.address;
const location = getAddressDetails()



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

{(isTelugu && propertyType === 'Commercial')  && property.propertyTitleTe }
{(isTelugu && propertyType === 'Agricultural land')  && details.titleTe }
{(isTelugu && propertyType === 'Layout')  && details.layoutTitleTe }
{(isTelugu && propertyType === 'Residential')  && details.apartmentNameTe }

 {propertyType === 'Commercial'  ? property.propertyTitle : 
 (propertyType === 'Agricultural land' ? details.title :
 (details.apartmentName || details.layoutTitle || 'Property'))}
 </Text>
 <Text style={styles.price}>
 ₹{(details.totalCost || details.totalAmount || details.totalPrice || 0).toLocaleString('en-IN')}
 </Text>
 
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Property Details</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="home-variant" text={`Type: ${details.type}`} />
 <DetailRow icon="office-building" text={`Layout: ${details.apartmentLayout}`} />
 <DetailRow icon="ruler-square" text={`Size: ${details.flatSize} ${details.sizeUnit}`} />
 <DetailRow icon="compass" text={`Facing: ${details.flatFacing}`} />
 <DetailRow icon="sofa" text={`Furnished: ${details.furnitured}`} />
 </>
 )}
 {propertyType === 'Commercial' && (
 <>
 <DetailRow icon="ruler-square" text={`Plot Size: ${details.plotSize} ${details.sizeUnit}`} />
 <DetailRow icon="currency-inr" text={`Price: ₹${details.price} per ${details.sizeUnit}`} />
 <DetailRow icon="store" text={`Usage: ${details.landUsage.join(', ')}`} />
 </>
 )}
 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="home-group" text={`Total Plots: ${details.plotCount}`} />
 <DetailRow icon="home-plus" text={`Available Plots: ${details.availablePlots}`} />
 <DetailRow icon="ruler-square" text={`Plot Size: ${details.plotSize} ${details.sizeUnit}`} />
 <DetailRow icon="currency-inr" text={`Price: ₹${details.plotPrice} per ${details.priceUnit}`} />
 </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow icon="ruler-square" text={`Size: ${details.size} ${details.sizeUnit}`} />
 <DetailRow icon="file-document-outline" text={`Survey Number: ${details.surveyNumber}`} />
 <DetailRow icon="currency-inr" text={`Price: ₹${details.price} per ${details.priceUnit}`} />
 <DetailRow icon="sprout" text={`Land Type: ${details.landType}`} />
 <DetailRow icon="gavel" text={`Litigation: ${details.litigation ? 'Yes' : 'No'}`} />
 {details.litigation && (
 <DetailRow icon="alert-circle" text={`Litigation Details: ${details.litigationDesc}`} />
 )}
 </>
 )}
 </View>
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Location</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="map-marker" text={`${location.village}, ${location.mandal}, ${location.district}, ${location.state}`} />
 
  
 </>
 )}
 {propertyType === 'Commercial' && (
 <>
 <DetailRow icon="map-marker" text={`${location.village}, ${location.mandal}, ${location.district}, ${location.state}`} />
  </>
 )}
 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="map-marker" text={`${location.village}, ${location.mandal}, ${location.district}, ${location.state}`} />
  </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow icon="map-marker" text={`${location.village}, ${location.mandal}, ${location.district}, ${location.state}`} />
  </>
 )}
 </View>
 
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Amenities</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="flash" text={`Power Supply: ${amenities.powerSupply ? 'Yes' : 'No'}`} />
 <DetailRow icon="water" text={`Water Facility: ${amenities.waterFacility ? 'Yes' : 'No'}`} />
 <DetailRow icon="elevator" text={`Elevator: ${amenities.elevator ? 'Yes' : 'No'}`} />
 <DetailRow icon="shield-account" text={`Watchman: ${amenities.watchman ? 'Yes' : 'No'}`} />
 <DetailRow icon="cctv" text={`CCTV: ${amenities.cctv ? 'Yes' : 'No'}`} />
 <DetailRow icon="dumbbell" text={`Gym Facility: ${amenities.gymFacility ? 'Yes' : 'No'}`} />
 </>
 )}
 {propertyType === 'Commercial' && property.propertyDetails.amenities && (
 <>
 <DetailRow
 icon="flash"
 text={`Electricity: ${property.propertyDetails.amenities.isElectricity ? 'Yes' : 'No'}`}
 />
 <DetailRow
 icon="water"
 text={`Water Facility: ${property.propertyDetails.amenities.isWaterFacility ? 'Yes' : 'No'}`}
 />
 <DetailRow
 icon="road-variant"
 text={`Road Face: ${property.propertyDetails.amenities.isRoadFace ? 'Yes' : 'No'}`}
 />
 </>
)}

 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="water-well" text={`Underground Water: ${amenities.underGroundWater ? 'Yes' : 'No'}`} />
 <DetailRow icon="water" text={`Drainage System: ${amenities.drainageSystem ? 'Yes' : 'No'}`} />
 <DetailRow icon="flash" text={`Electricity: ${amenities.electricityFacility ? 'Yes' : 'No'}`} />
 <DetailRow icon="pool" text={`Swimming Pool: ${amenities.swimmingPool ? 'Yes' : 'No'}`} />
 <DetailRow icon="handball" text={`Play Zone: ${amenities.playZone ? 'Yes' : 'No'}`} />
 <DetailRow icon="dumbbell" text={`Gym: ${amenities.gym ? 'Yes' : 'No'}`} />
 <DetailRow icon="home-city" text={`Convention Hall: ${amenities.conventionHall ? 'Yes' : 'No'}`} />
 </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow icon="water-well" text={`Bore Well: ${amenities.boreWell ? 'Yes' : 'No'}`} />
 <DetailRow icon="flash" text={`Electricity: ${amenities.electricity ? 'Yes' : 'No'}`} />
 <DetailRow icon="road-variant" text={`Distance from Road: ${amenities.distanceFromRoad} meters`} />
 <DetailRow icon="warehouse" text={`Storage Facility: ${amenities.storageFacility ? 'Yes' : 'No'}`} />
 </>
 )}
 </View>

 {propertyType === 'Layout' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Approvals</Text>
 <DetailRow icon="check-circle" text={`RERA Registered: ${details.reraRegistered ? 'Yes' : 'No'}`} />
 <DetailRow icon="check-circle" text={`DTCP Approved: ${details.dtcpApproved ? 'Yes' : 'No'}`} />
 <DetailRow icon="check-circle" text={`TLP Approved: ${details.tlpApproved ? 'Yes' : 'No'}`} />
 <DetailRow icon="check-circle" text={`FLP Approved: ${details.flpApproved ? 'Yes' : 'No'}`} />
 </View>
 )}

 <View style={styles.card}>
 <Text style={styles.cardTitle}>Description</Text>
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
 <Text style={styles.cardTitle}>Owner Details</Text> 
 <DetailRow icon="account" text={`Name: ${property.owner?.ownerName || property.ownerDetails?.ownerName || property.propertyDetails?.owner?.ownerName}`} />
 <DetailRow icon="phone" text={`Contact: ${property.owner?.contact || property.ownerDetails?.ownerContact || property.propertyDetails?.owner?.ownerContact || property.ownerDetails?.phoneNumber }`} />
 <DetailRow icon="email" text={`Email: ${property.owner?.ownerEmail || property.ownerDetails?.ownerEmail || property.propertyDetails?.owner?.ownerEmail}`} />
 {propertyType === 'Commercial' && property.propertyDetails?.owner?.isLegalDispute && (
 <DetailRow icon="alert" text={`Legal Dispute: ${property.propertyDetails.owner.disputeDesc}`} />
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

const DetailRow = ({ icon, text }) => (
 <View style={styles.detailRow}>
 <Icon name={icon} size={24} color="#4a90e2" />
 <Text style={styles.detailText}>{text}</Text>
 </View>
);

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