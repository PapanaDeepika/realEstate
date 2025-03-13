import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { post } from 'axios'; // Assuming you've imported axios
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import { MaterialIcons } from 'react-native-vector-icons'; // Import icons
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native-maps';
import i18n from '../i18n';

const { width } = Dimensions.get('window');

const PropertyDetailsScreenBuyer = ({ route }) => {
  
  // const [ribbonPosition] = useState(new Animated.Value(0)); // Starting position of the ribbon
  const [hasShownInterest, setHasShownInterest] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);  // State to show the tooltip
 
  const navigation=useNavigation();
  const [userId, setUserId] = useState(null);
const[name,setname]=useState('');
 const [property, setProperty] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
const {propByRoute} = route.params
console.log("ROUTE", propByRoute)
const propertyId = propByRoute._id||propByRoute.propertyId  
const propertyType = propByRoute.propertyType
const propertyName=propByRoute.title || propByRoute.propertyTitle
// const userId=propByRoute.userId
const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
const [language,setSavedLanguage]=useState("en")

console.log("PROPERTY ID", propertyId)
console.log("PROPERTY TYPE", propertyType)
console.log("PROPERTY NAME ",propertyName)

const apiUrl = "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/createDeal"; // for creating deal





// useEffect(()=>{
//     const postinterested=()=>{
//         const response= post(apiUrl,)
//     }
//  })



// useEffect(() => {
//   // Animate the ribbon container (e.g., moving horizontally)
//   Animated.loop(
//     Animated.timing(ribbonPosition, {
//       toValue: 1,  // Final position
//       duration: 2000, // Duration for each cycle (2 seconds)
//       useNativeDriver: true,  // Optimize performance with native driver
//     })
//   ).start();
// }, []);

// // Interpolate the animation to map the value to a translateX value for horizontal movement
// const ribbonTranslateX = ribbonPosition.interpolate({
//   inputRange: [0, 1],
//   outputRange: [0, 100],  // Moving 100 units to the right
// });
const onDateChange = (event, selectedDate) => {
  setShowDatePicker(false); // Close date picker
  if (selectedDate) {
    setSelectedDate(selectedDate); // Update selected date
  }
};

const onTimeChange = (event, selectedTime) => {
  setShowTimePicker(false); // Close time picker
  if (selectedTime) {
    setSelectedDate((prevDate) => {
      const updatedDate = new Date(prevDate);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      return updatedDate;
    });
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


const handlePriceFormat = (price) => {
  if (price >= 10000000) {
    // For crores
    return (price / 10000000).toFixed(2) + ' Cr'; // Crore
  } else if (price >= 100000) {
    // For lakhs
    return (price / 100000).toFixed(2) + ' Lakh'; // Lakh
  } else {
    // For normal INR formatting
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  }
}

const handleSubmit = () => {
  // Use `selectedDate` to post the chosen date and time
  console.log('Selected Date and Time:', selectedDate);
  // Add your API call logic here
  setModalVisible(false);
};

 useEffect(() => {
//  getDetails();
const getDetails = async () => {
  try {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
  setError('No token found');
  setLoading(false);
  return;
  }
 
  const response = await axios.get(
  ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbyid/${propertyType}/${propertyId}`,
  {
  headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  }
  }
  );
  setProperty(response.data);
  setHasShownInterest(response.data.interestedIn == 1); // Update interest state

  setUserId(response.data.userId);
  console.log("the interested state is" ,response.data.interestedIn)
  } catch (error) {
  console.error('Error fetching property details:', error.message);
  setError('Failed to fetch property details');
  } finally {
  setLoading(false);
  }
  };

  getDetails();
  loadLanguage()
 }, []);



 const loadLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem('language');
  setSavedLanguage(savedLanguage)
  if (savedLanguage) {
    i18n.locale = savedLanguage;
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


 
 const postInterested = async () => {
  console.log(" the function is been called -->")
  if (!userId) {
    console.error("userId is not available");
    return;
  }
    try {
      
      const token = await AsyncStorage.getItem('userToken');
      const email = "customer@example.com"; // Replace with actual email if available
      const comments = "Customer is highly interested in the property.";
      // const userid=
      const body = {
        email: "sneha@gmail.com",
        interestIn: "1", // Assuming the user is interested in this property
        comments: "no comments pls",
        properties: [
          {
            propertyId: propertyId,
            propertyName:propertyName,
            propertyType: propertyType,
            agentId:userId
          },
        ],
      };
console.log("thebody --",body);

      const response = await axios.post(apiUrl, body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    
    // console.log('')

    // console.log()

    );

      // Handle response from the API
      console.log('Posted response:', response.data);
      // You can add a success message or any action here
      Alert.alert("Thank You", "Thank you for your interest!");

      // set

    } catch (error) {
      console.error('Error posting interest:', error.message);
    }
  };



 const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>

  <Image source={{ uri: item }} style={styles.image} />
  {/* <Animated.View style={[styles.ribbonContainer, { transform: [{ translateX: ribbonTranslateX }] }]}> */}

<View style={styles.buttonContainer}>
  
  
  {/* <TouchableOpacity onPress={postInterested}>
  <View></View>
<Text style={styles.ribbonText}>Show Interest</Text></TouchableOpacity> */}
 <TouchableOpacity
          style={[
            styles.button,
            hasShownInterest ? styles.disabledButton : styles.enabledButton,
          ]}
          disabled={hasShownInterest} // Disable the button if already interested
          onPress={() => {
            // Handle showing interest
            postInterested()
            alert("Interest shown successfully!");
            setHasShownInterest(true);
          }}
        >
          <Text style={styles.buttonText}>
            {hasShownInterest ? "Interest Shown" : "Show Interest"}
          </Text>
        </TouchableOpacity>
</View>

</View>

);

// const renderImage = ({ item }) => (
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: item }} style={styles.propertyImage} />
//       {/* Add the "I'm Interested" Ribbon */}
//       <View style={styles.ribbonContainer}>
//         <Text style={styles.ribbonText}>I'm Interested</Text>
//       </View>
//     </View>
//   );

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
 <>

 <View>
  {/* Back Button */}
  <View style={styles.backButtonContainer}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={30} color="black" />
    {/* <MaterialIcons name="arrow-back" size={30} color="black" /> */}
  </TouchableOpacity>
</View>

<ScrollView showsVerticalScrollIndicator={false}>
<View>
  {/* <Text></Text> */}
 <FlatList
 data={[getDefaultImage(propertyType, property)]} 
 renderItem={renderImage}
 horizontal
 pagingEnabled
 showsHorizontalScrollIndicator={false}
 
 />
 </View>

 <View style={styles.detailsContainer}>
    {/* <Text onChange>user id --- {property.userId}</Text> */}
 <Text style={styles.title}>
 {/* {propertyType === 'Commercial'  ? property.propertyTitle : 
 (propertyType === 'Agricultural land' ? details.title :
 (details.apartmentName || details.layoutTitle || 'Property'))} */}


{language==="en"?(
    <Text>
     {propertyType === 'Commercial'  ? property.propertyTitle : 
      (propertyType === 'Agricultural land' ? details.title :
      (details.apartmentName || details.layoutTitle || 'Property'))}</Text>
  ):(
    <Text>
    {propertyType === 'Commercial'  ? (property.propertyTitleTe ||property.propertyTitle) : 
      (propertyType === 'Agricultural land' ? (details.titleTe || details.title) :
      ((details.apartmentNameTe || details.apartmentName) ||( details.layoutTitleTe || details.layoutTitle) || 'Property'))}
      </Text>
  )}
 

 </Text>
 <Text style={styles.price}>
 { handlePriceFormat(details.totalCost || details.totalAmount || details.totalPrice || 0)}
 </Text>
 
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Property Details")}</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="home-variant" text={`${i18n.t("Type")}: ${details.type}`} />
 <DetailRow icon="office-building" text={`${i18n.t("Layout")}: ${details.apartmentLayout}`} />
 <DetailRow icon="ruler-square" text={`${i18n.t("Size")}: ${details.flatSize} ${i18n.t(details.sizeUnit)}`} />
 <DetailRow icon="compass" text={`${i18n.t("Facing")}: ${details.flatFacing}`} />
 <DetailRow icon="sofa" text={`${i18n.t("Furnished")}: ${details.furnitured}`} />
 </>
 )}
 {propertyType === 'Commercial' && (
 <>
 <DetailRow icon="ruler-square" text={`${i18n.t("Plot Size")}: ${details.plotSize} ${i18n.t(details.sizeUnit)}`} />
 <DetailRow icon="currency-inr" text={`${i18n.t("Price")}: ₹${details.price} ${i18n.t("per")} ${i18n.t(details.sizeUnit)}`} />
 <DetailRow icon="store" text={`${i18n.t("Usage")}: ${details.landUsage.join(', ')}`} />
 </>
 )}
 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="home-group" text={`${i18n.t("Total Plots")}: ${details.plotCount}`} />
 <DetailRow icon="home-plus" text={`${i18n.t("Available Plots")}: ${details.availablePlots}`} />
 <DetailRow icon="ruler-square" text={`${i18n.t("Plot Size")}: ${details.plotSize} ${details.sizeUnit}`} />
 <DetailRow icon="currency-inr" text={`${i18n.t("Price")}: ₹${details.plotPrice} per ${details.priceUnit}`} />
 </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow icon="ruler-square" text={`${i18n.t("Size")}: ${details.size} ${i18n.t(details.sizeUnit)}`} />
 <DetailRow icon="file-document-outline" text={`${i18n.t("Survey Number")}: ${details.surveyNumber}`} />
 <DetailRow icon="currency-inr" text={`${i18n.t("Price")}: ₹${details.price} ${i18n.t("per")} ${i18n.t(details.priceUnit)}`} />
 <DetailRow icon="sprout" text={`${i18n.t("Land Type")}: ${i18n.t(details.landType)}`} />
 <DetailRow icon="gavel" text={`${i18n.t("Litigation")}: ${details.litigation ? 'Yes' : 'No'}`} />
 {details.litigation && (
 <DetailRow icon="alert-circle" text={`${i18n.t("Litigation Details")}: ${details.litigationDesc}`} />
 )}
 </>
 )}
 </View>
 {propertyType === 'Layout' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
 <Text style={styles.locationText}>
 {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

{language==="en"?(<Text> {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`}
  </Text>):(<Text> {`${property.layoutDetails.address.villageTe || property.layoutDetails.address.village}, ${property.layoutDetails.address.mandalTe || property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandalTe || property.layoutDetails.address.mandal}, ${property.layoutDetails.address.districtTe||property.layoutDetails.address.district}, ${property.layoutDetails.address.stateTe ||property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`}
    </Text>)}

 </Text>


 {
  language==="en"?( <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} />
  ):( <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMarkTe || property.layoutDetails.address.landMark }`} />
  )
 }
 {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
 </View>
 )}


{propertyType === 'Commercial' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
 <Text style={styles.locationText}>
 {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

{language==="en"?(<Text> {`${property.propertyDetails.landDetails.address.village}, ${property.propertyDetails.landDetails.address.mandal}, ${property.propertyDetails.landDetails.address.mandal}, ${property.propertyDetails.landDetails.address.district}, ${property.propertyDetails.landDetails.address.state}, ${property.propertyDetails.landDetails.address.pinCode}`}
  </Text>):(<Text> {`${property.propertyDetails.landDetails.address.villageTe || property.propertyDetails.landDetails.address.village}, ${property.propertyDetails.landDetails.address.mandalTe || property.propertyDetails.landDetails.address.mandal}, ${property.propertyDetails.landDetails.address.mandalTe || property.propertyDetails.landDetails.address.mandal}, ${property.propertyDetails.landDetails.address.districtTe||property.propertyDetails.landDetails.address.district}, ${property.propertyDetails.landDetails.address.stateTe ||property.propertyDetails.landDetails.address.state}, ${property.propertyDetails.landDetails.address.pinCode}`}
    </Text>)}

 </Text>


 {
  language==="en"?( <DetailRow icon="map-marker" text={`Landmark: ${property.propertyDetails.landDetails.address.landMark}`} />
  ):( <DetailRow icon="map-marker" text={`Landmark: ${property.propertyDetails.landDetails.address.landMarkTe || property.propertyDetails.landDetails.address.landMark }`} />
  )
 }
 {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
 </View>
 )}



{propertyType === 'Residential' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
 <Text style={styles.locationText}>
 {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

{language==="en"?(<Text> {`${property.address.village}, ${property.address.mandal}, ${property.address.mandal}, ${property.address.district}, ${property.address.state}, ${property.address.pinCode}`}
  </Text>):(<Text> {`${property.address.villageTe || property.address.village}, ${property.address.mandalTe || property.address.mandal}, ${property.address.mandalTe || property.address.mandal}, ${property.address.districtTe||property.address.district}, ${property.address.stateTe ||property.address.state}, ${property.address.pinCode}`}
    </Text>)}

 </Text>


 {
  language==="en"?( <DetailRow icon="map-marker" text={`Landmark: ${property.address.landMark}`} />
  ):( <DetailRow icon="map-marker" text={`Landmark: ${property.address.landMarkTe || property.address.landMark }`} />
  )
 }
 {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
 </View>
 )}



{propertyType === 'Agricultural land' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Location")}</Text>
 <Text style={styles.locationText}>
 {/* {`${property.layoutDetails.address.village}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.mandal}, ${property.layoutDetails.address.district}, ${property.layoutDetails.address.state}, ${property.layoutDetails.address.pinCode}`} */}

{language==="en"?(<Text> {`${property.address.village}, ${property.address.mandal}, ${property.address.mandal}, ${property.address.district}, ${property.address.state}, ${property.address.pinCode}`}
  </Text>):(<Text> {`${property.address.villageTe || property.address.village}, ${property.address.mandalTe || property.address.mandal}, ${property.address.mandalTe || property.address.mandal}, ${property.address.districtTe||property.address.district}, ${property.address.stateTe ||property.address.state}, ${property.address.pinCode}`}
    </Text>)}

 </Text>


 {
  language==="en"?( <DetailRow icon="map-marker" text={`Landmark: ${property.address.landMark}`} />
  ):( <DetailRow icon="map-marker" text={`Landmark: ${property.address.landMarkTe || property.address.landMark }`} />
  )
 }
 {/* <DetailRow icon="map-marker" text={`Landmark: ${property.layoutDetails.address.landMark}`} /> */}
 </View>
 )}
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Amenities")}</Text>
 {propertyType === 'Residential' && (
 <>
 <DetailRow icon="flash" text={`${i18n.t("Power Supply")}: ${amenities.powerSupply ? 'Yes' : 'No'}`} />
 <DetailRow icon="water" text={`${i18n.t("Water Facility")}: ${amenities.waterFacility ? 'Yes' : 'No'}`} />
 <DetailRow icon="elevator" text={`${i18n.t("Elevator")}: ${amenities.elevator ? 'Yes' : 'No'}`} />
 <DetailRow icon="shield-account" text={`${i18n.t("Watchman")}: ${amenities.watchman ? 'Yes' : 'No'}`} />
 <DetailRow icon="cctv" text={`${i18n.t("CCTV")}: ${amenities.cctv ? 'Yes' : 'No'}`} />
 <DetailRow icon="dumbbell" text={`${i18n.t("Gym Facility")}: ${amenities.gymFacility ? 'Yes' : 'No'}`} />
 </>
 )}
 {propertyType === 'Commercial' && property.propertyDetails.amenities && (
 <>
 <DetailRow
 icon="flash"
 text={`${i18n.t("Electricity")}: ${property.propertyDetails.amenities.isElectricity ? 'Yes' : 'No'}`}
 />
 <DetailRow
 icon="water"
 text={`${i18n.t("Water Facility")}: ${property.propertyDetails.amenities.isWaterFacility ? 'Yes' : 'No'}`}
 />
 <DetailRow
 icon="road-variant"
 text={`${i18n.t("Road Face")}: ${property.propertyDetails.amenities.isRoadFace ? 'Yes' : 'No'}`}
 />
 </>
)}

 {propertyType === 'Layout' && (
 <>
 <DetailRow icon="water-well" text={`${i18n.t("Underground Water")}: ${amenities.underGroundWater ? 'Yes' : 'No'}`} />
 <DetailRow icon="water" text={`${i18n.t("Drainage System")}: ${amenities.drainageSystem ? 'Yes' : 'No'}`} />
 <DetailRow icon="flash" text={`${i18n.t("Electricity")}: ${amenities.electricityFacility ? 'Yes' : 'No'}`} />
 <DetailRow icon="pool" text={`${i18n.t("Swimming Pool")}: ${amenities.swimmingPool ? 'Yes' : 'No'}`} />
 <DetailRow icon="handball" text={`${i18n.t("Play Zone")}: ${amenities.playZone ? 'Yes' : 'No'}`} />
 <DetailRow icon="dumbbell" text={`${i18n.t("Gym")}: ${amenities.gym ? 'Yes' : 'No'}`} />
 <DetailRow icon="home-city" text={`${i18n.t("Convention Hall")}: ${amenities.conventionHall ? 'Yes' : 'No'}`} />
 </>
 )}
 {propertyType === 'Agricultural land' && (
 <>
 <DetailRow icon="water-well" text={`${i18n.t("Bore Well")}: ${amenities.boreWell ? 'Yes' : 'No'}`} />
 <DetailRow icon="flash" text={`${i18n.t("Electricity")}: ${amenities.electricity ? 'Yes' : 'No'}`} />
 <DetailRow icon="road-variant" text={`${i18n.t("Distance from Road")}: ${amenities.distanceFromRoad} meters`} />
 <DetailRow icon="warehouse" text={`${i18n.t("Storage Facility")}: ${amenities.storageFacility ? 'Yes' : 'No'}`} />
 </>
 )}
 </View>

 {propertyType === 'Layout' && (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Approvals")}</Text>
 <DetailRow icon="check-circle" text={`${i18n.t("RERA Registered")}: ${details.reraRegistered ? 'Yes' : 'No'}`} />
 <DetailRow icon="check-circle" text={`${i18n.t("DTCP Approved")}: ${details.dtcpApproved ? 'Yes' : 'No'}`} />
 <DetailRow icon="check-circle" text={`${i18n.t("TLP Approved")}: ${details.tlpApproved ? 'Yes' : 'No'}`} />
 <DetailRow icon="check-circle" text={`${i18n.t("FLP Approved")}: ${details.flpApproved ? 'Yes' : 'No'}`} />
 </View>
 )}

 <View style={styles.card}>
 <Text style={styles.cardTitle}>{i18n.t("Description")}</Text>
 <Text style={styles.descriptionText}>
 {/* {propertyType === 'Commercial' ? property.propertyDetails.landDetails.description : 
 (propertyType === 'Agricultural land' ? details.propertyDesc :
 (details.description || 'No description available.'))} */}

{
  language==="en"?(<Text> {propertyType === 'Commercial' ? property.propertyDetails.landDetails.description : 
    (propertyType === 'Agricultural land' ? details.propertyDesc :
    (details.description || 'No description available.'))}</Text>):
    (<Text> {propertyType === 'Commercial' ?( property.propertyDetails.landDetails.descriptionTe||property.propertyDetails.landDetails.description ) : 
      (propertyType === 'Agricultural land' ? (details.propertyDescTe||details.propertyDesc) :
      ((details.descriptionTe||details.description) || 'No description available.'))}</Text>)
}

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
 <Text style={styles.cardTitle}>{i18n.t("Owner Details")}</Text> 
 <DetailRow icon="account" text={`${i18n.t("Name")}: ${property.owner?.ownerName || property.ownerDetails?.ownerName || property.propertyDetails?.owner?.ownerName}`} />
 <DetailRow icon="phone" text={`${i18n.t("Contact")}: ${formatPhoneNumber( property.owner?.contact || property.ownerDetails?.ownerContact || property.propertyDetails?.owner?.ownerContact || property.ownerDetails?.phoneNumber )}`} />
 <DetailRow icon="email" text={`${i18n.t("Email")}: ${property.owner?.ownerEmail || property.ownerDetails?.ownerEmail || property.propertyDetails?.owner?.ownerEmail}`} />
 {propertyType === 'Commercial' && property.propertyDetails?.owner?.isLegalDispute && (
 <DetailRow icon="alert" text={`${i18n.t("Legal Dispute")}: ${property.propertyDetails.owner.disputeDesc}`} />
 )}
 </View> 

 {/* <View style={styles.card}>
 <Text style={styles.cardTitle}>Agent Details</Text>
 <DetailRow icon="account-tie" text={`Name: ${property.agentName}`} />
 <DetailRow icon="phone" text={`Phone: ${property.agentNumber}`} />
 <DetailRow icon="email" text={`Email: ${property.agentEmail}`} />
 <DetailRow icon="city" text={`City: ${property.agentCity}`} />
 </View> */}
 </View></ScrollView>
 
 
 </View>
 
 
 </>
 );
};

const DetailRow = ({ icon, text }) => (
 <View style={styles.detailRow}>
 <Icon name={icon} size={24} color="#4a90e2" />
 <Text style={styles.detailText}>{text}</Text>
 </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    fontFamily:"Montserrat_600SemiBold"
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    fontFamily:"Montserrat_600SemiBold"
  },
  enabledButton: {
    backgroundColor: '#4CAF50',
    fontFamily:"Montserrat_700Bold"
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:"Montserrat_700Bold"

  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
    fontFamily:"Montserrat_700Bold"

  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily:"Montserrat_700Bold"

  },
    image: {
        width: width,
        height: 250,
        resizeMode: 'cover',
        borderRadius: 5,
        fontFamily:"Montserrat_700Bold"

        },ribbonContainer: {
            position: 'absolute',
            top: 5,
            right: -5,
            backgroundColor: 'gold', // Highlight color (you can change it)
            padding: 10,
            borderRadius: 5,
            opacity: 0.8,
            borderBlockColor:'black',
            fontFamily:"Montserrat_700Bold"

          },
          ribbonText: {
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily:"Montserrat_700Bold"

          },
    // propertyImage: {
    //     width: '100%',
    //     height: 200,
    //     borderRadius: 5,
    //   },
    //   ribbonContainer: {
    //     position: 'absolute',
    //     top: 10,
    //     right: 10,
    //     backgroundColor: 'red', // Ribbon color
    //     paddingVertical: 5,
    //     paddingHorizontal: 10,
    //     borderRadius: 20,
    //     transform: [{ rotate: '45deg' }], // Creates a rotated ribbon effect
    //     shadowColor: '#000',
    //     shadowOffset: { width: 2, height: 2 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 5,
    //     elevation: 5, // Adds depth on Android
    //   },
    //   ribbonText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: 14,
    //     transform: [{ rotate: '-45deg' }], // Rotate the text to make it readable
    //   },
    imageContainer: {
        position: 'relative', // Ensures the ribbon can be positioned within this container
        fontFamily:"Montserrat_700Bold"

      },
 container: {
 flex: 1,
 backgroundColor: '#f5f5f5',
 fontFamily:"Montserrat_700Bold"

 },
 centered: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 fontFamily:"Montserrat_700Bold"

 },
 errorText: {
 fontSize: 18,
 color: 'red',
 textAlign: 'center',
 fontFamily:"Montserrat_700Bold"

 },
 
 detailsContainer: {
    padding: 15,
    fontFamily:"Montserrat_700Bold"

  },
 title: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#333',
 marginBottom: 5,
 fontFamily:"Montserrat_700Bold"

 },
 price: {
 fontSize: 22,
 fontWeight: 'bold',
 color: '#4a90e2',
 marginBottom: 15,
 fontFamily:"Montserrat_700Bold"

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
 fontFamily:"Montserrat_700Bold"

 },
 cardTitle: {
 fontSize: 18,
 fontWeight: 'bold',
 color: '#333',
 marginBottom: 10,
 fontFamily:"Montserrat_700Bold"

 },
 detailRow: {
 flexDirection: 'row',
 alignItems: 'center',
 marginBottom: 8,
 fontFamily:"Montserrat_700Bold"

 },
 detailText: {
 fontSize: 16,
 color: '#666',
 marginLeft: 10,
 flex: 1,
 fontFamily:"Montserrat_700Bold"

 },
 locationText: {
 fontSize: 16,
 color: '#666',
 marginBottom: 8,
 fontFamily:"Montserrat_700Bold"

 },
 descriptionText: {
 fontSize: 16,
 color: '#666',
 lineHeight: 24,
 fontFamily:"Montserrat_700Bold"

 },
});

export default PropertyDetailsScreenBuyer;