import React, { useState, useEffect, useRef } from 'react'; // Import useRef from React
import { View, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator, Animated, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Text } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '../i18n';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome icons
import BuyerLocationProps from './buyerLocationProps';

const EntryBuyer = ({ navigation }) => {
// const navigation = useNavigation();
const [userName, setUserName] = useState('');
const [recentProperties, setRecentProperties] = useState([]);
const [loading, setLoading] = useState(true); // Loading state
const flatListRef = useRef(null); // Reference for FlatList
const [searchQuery, setSearchQuery] = useState('');
const [noPropertiesFound, setNoPropertiesFound] = useState(false); // Add state for no properties found
const [searchResults, setSearchResults] = useState([]); // New state for search results

const [language,setLanguage]=useState("en")


// const flatListRef = useRef(null); // Reference for FlatList


const navigateToImIntrested = () => {
// navigation.navigate('ImIntrested');
navigation.navigate('AllPropertiesList1');
};
// Fetch username from AsyncStorage
useEffect(() => {
const fetchUsername = async () => {
try {
const name = await AsyncStorage.getItem('firstName');
if (name) {
setUserName(name);
} else {
console.log("No user name found");
}
} catch (error) {
console.error("Error retrieving user name:", error);
}
};
fetchUsername();

loadLanguage(); 

}, []);



const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');

    setLanguage(savedLanguage)
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };


  const getPropertyDetails=(data)=>{
    console.log("Get Property Details")
  
    navigation.navigate("propertyDetailsBuyer", {propByRoute:data})
      // Propdetails
  }
 
// Fetch recent properties
// useEffect(() => {
//     const fetchRecentProperties = async () => {
//         try {
//             const response = await fetch(' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/latestprops');
//             // const response =await fetch('/getallprops')

//             const data = await response.json();
//             console.log("latest properties -->", data);
//             setRecentProperties(data);
//         } catch (error) {
//             console.error('Error fetching recent properties:', error);
//         } finally {
//             setLoading(false); // Set loading to false once data is fetched
//         }
//     };

//     fetchRecentProperties();
// }, []);
useEffect(() => {
const fetchRecentProperties = async () => {
try {
const token = await AsyncStorage.getItem('userToken');
const response = await fetch('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/recentlyAddedProperties', {
headers: {
Authorization: `Bearer ${token}`,
},
});
const data = await response.json();
console.log("Latest properties -->", data);
setRecentProperties(data);
} catch (error) {
console.error('Error fetching recent properties:', error);
} finally {
setLoading(false);
}
};

fetchRecentProperties();
}, []);

// Auto-scroll FlatList
// useEffect(() => {
//     const scrollToNextItem = () => {
//         if (flatListRef.current && recentProperties.length > 0) {
//             flatListRef.current.scrollToIndex({
//                 index: (Math.floor(Math.random() * recentProperties.length)) % recentProperties.length,
//                 animated: true,
//             });
//         }
//     };

//     const intervalId = setInterval(scrollToNextItem, 2000); // Scroll every 2 seconds

//     return () => {
//         clearInterval(intervalId); // Cleanup interval on unmount
//     };
// }, [recentProperties]);

// useEffect(() => {
//     const scrollToNextItem = () => {
//         if (flatListRef.current && recentProperties.length > 0) {
//             const randomIndex = Math.floor(Math.random() * recentProperties.length);

//             // Check if the index is within bounds
//             if (randomIndex < recentProperties.length) {
//                 flatListRef.current.scrollToIndex({
//                     index: randomIndex,
//                     animated: true,
//                 });
//             }
//         }
//     };

//     // Only start auto-scrolling if there are items in the list
//     let intervalId;
//     if (recentProperties.length > 0) {
//         intervalId = setInterval(scrollToNextItem, 2000); // Scroll every 2 seconds
//     }

//     return () => {
//         clearInterval(intervalId); // Cleanup interval on unmount
//     };
// }, [recentProperties]);


// Fetch properties based on search query

// Fetch properties based on search query
const fetchFilteredProperties = async () => {
if (!searchQuery) return; // Only fetch if there's a search query

try {


// Retrieve the token from AsyncStorage
const token = await AsyncStorage.getItem('userToken'); // Adjust the key as needed

if (!token) {
console.log('No token found');
return;
}
const response = await fetch(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropertiesFilter/${searchQuery}`, {
method: 'GET',
headers: {
'Authorization': `Bearer ${token}`,
'Content-Type': 'application/json',
},
});

const data = await response.json();
setSearchResults(data); // Set search results in separate state
setNoPropertiesFound(data.length === 0); // Set no properties found state
} catch (error) {
console.error('Error fetching filtered properties:', error);
}
console.log(" the searched properties --. ",data)
};
// const fetchFilteredProperties = async () => {
//     if (!searchQuery) return; // Only fetch if there's a search query

//     try {
//         const response = await fetch(` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/admin/getPropertiesFilter/${searchQuery}`);
//         const data = await response.json();
//         setRecentProperties(data);
//     } catch (error) {
//         console.error('Error fetching filtered properties:', error);
//     }
// };
// Handle search input change
const handleSearchChange = (text) => {
setSearchQuery(text);
fetchFilteredProperties();
};


// Handle search submit
const handleSearchSubmit = () => {
fetchFilteredProperties();
};

const handlePress = (tab) => {
switch (tab) {
case 'Agriculture':
navigation.navigate('Agriculture');
break;
case 'Residential':
navigation.navigate('Residential');
break;
case 'Commercial':
navigation.navigate('Commercial');
break;
case 'Layout':
navigation.navigate('Layout');
break;
default:
break;
}
};

const handleLogout = async () => {
try {
await AsyncStorage.removeItem('userToken');
console.log('Logged out successfully');
navigation.navigate('LandingPage');
} catch (error) {
console.log('Failed to log out:', error);
}
};

// const renderPropertyItem = ({ item }) => {
//     return (
//         <View style={styles.propertyCard}>

//             <ImageBackground
//                 source={{
//                     uri: item.landDetails?.images?.[0] || item.propertyDetails?.uploadPics?.[0] || "https://via.placeholder.com/150",
//                 }}
//                 style={styles.propertyImage}
//                 imageStyle={{ borderRadius: 10 }}

//             />

//             <Text style={styles.forprice}>
//                 {item.propertyType === "Agricultural land" && `Price: ${item.landDetails.totalPrice ?? 'N/A'}`}
//                 {item.propertyType === "Layout" && `Price: ${item.layoutDetails.plotPrice ?? 'N/A'}`}
//                 {item.propertyType === "Residential" && `Price: ${item.propertyDetails.totalCost ?? 'N/A'}`}
//                 {/* {item.propertyType === "Commercial" && `Price: ${item.}`} */}


//                 {/* {item.propertyType === "Commercial" && `Price: ${item.landDetails.sell.totalAmount ?? 'N/A'}`} */}
//                 {/* {item.propertyType === "Commercial" && (
//     `${item.landDetails?.sell ? `Sell Price: ${item.landDetails.sell.totalAmount ?? 'N/A'}\n` : ''}`
//     + `${item.landDetails?.rent ? `Rent Price: ${item.landDetails.rent.totalAmount ?? 'N/A'}\n` : ''}`
//     + `${item.landDetails?.lease ? `Lease Price: ${item.landDetails.lease.totalAmount ?? 'N/A'}\n` : ''}`
// )} */}


//             </Text>


//             <Text style={styles.forsize}>
//                 {item.propertyType === "Agricultural land" && `Size : ${item.landDetails.size ?? 'N/A'}`}
//                 {item.propertyType === "Layout" && `Size : ${item.layoutDetails.plotSize ?? 'N/A'}`}
//                 {item.propertyType === "Residential" && `Size : ${item.propertyDetails.flatSize ?? 'N/A'}`}
//                 {/* {item.propertyType === "Commercial" && `title : ${item.propertyTitle ?? 'N/A`}} */}
//                 {/* {item.propertyType==="Commercial" && `Price : ${item.propertyTitle ?? 'N/A'}`} */}


//             </Text>
//         </View>
//     );
// };



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

const renderPropertyItem = ({ item }) => {
 
const renderContent = () => {
if (item.propertyType === 'Agricultural land') {
return (
<View>
{/* <Text style={styles.propertyTitle}>{item.landDetails.title} @ {item.propertyId}</Text>  */}
<Text>{language==="en"?(<Text style={styles.propertyTitle}>{item.landDetails.title} @ {item.propertyId}</Text> 
):(<Text style={styles.propertyTitle}>{item.landDetails.titleTe || item.landDetails.title} @ {item.propertyId}</Text> 
)}</Text>
<Text style={styles.propertySize}>{i18n.t("Size")}: {item.landDetails?.size} {i18n.t(item.landDetails?.sizeUnit) }</Text>
<Text style={styles.propertyDistrict}>{i18n.t("District")}: {i18n.t(item.address?.district )}</Text>
</View>
);
} else if (item.propertyType === 'Commercial') {
return (
<View>
{/* <Text style={styles.propertyTitle}>{item?.propertyTitle} @ {item.propertyId}</Text> */}

<Text>{language==="en"?(<Text style={styles.propertyTitle}>{item?.propertyTitle} @ {item.propertyId}</Text> 
):(<Text style={styles.propertyTitle}>{item?.propertyTitleTe || item?.propertyTitle } @ {item.propertyId}</Text> 
)}</Text>

<Text style={styles.propertySize}>{i18n.t("Size")}: {item?.propertyDetails?.landDetails?.rent.plotSize||item?.propertyDetails?.landDetails?.sell.plotSize||item?.propertyDetails?.landDetails?.lease.plotSize} {item?.propertyDetails?.landDetails.rent.sizeUnit ||item?.propertyDetails?.landDetails.sell.sizeUnit ||item?.propertyDetails?.landDetails.lease.sizeUnit  }</Text>

{/* <Text style={styles.propertyTitle}>{propertyDetails?.type || 'N/A'}</Text> */}
{/* <Text style={styles.propertySize}>Size: {propertyDetails?.landDetails?.flatSize} {propertyDetails?.sizeUnit || 'N/A'}</Text> */}
<Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.propertyDetails?.landDetails?.address?.district  }</Text>
</View>
);
} else if (item.propertyType === 'Residential') {
return (
<View>
 

<Text>{language==="en"?(<Text style={styles.propertyTitle}>{item?.propertyDetails?.apartmentName  } @ {item.propertyId}</Text>

):(<Text style={styles.propertyTitle}>{item?.propertyDetails?.apartmentNameTe || item?.propertyDetails?.apartmentName  } @ {item.propertyId}</Text>

)}</Text>

<Text style={styles.propertySize}>{i18n.t("Size")}: {item?.propertyDetails?.flatSize} {item.propertyDetails?.sizeUnit  }</Text>
<Text style={styles.propertyDistrict}>{i18n.t("District")}: {i18n.t(item?.address?.district)}</Text>
</View>
);
}
else if (item.propertyType === 'Layout') {
return (
<View>
{/* <Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitle  } @ {item.propertyId}</Text> */}



<Text>{language==="en"?(<Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitle  } @ {item.propertyId}</Text>

):(<Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitleTe || item?.layoutDetails.layoutTitle  } @ {item.propertyId}</Text>


)}</Text>

<Text style={styles.propertySize}>{i18n.t("Size")}: {item?.layoutDetails?.plotSize} {item?.layoutDetails?.sizeUnit }</Text>
<Text style={styles.propertyDistrict}>{i18n.t("District")}: {i18n.t(item?.layoutDetails.address?.district) || 'N/A'}</Text>
</View>
);
}
return <Text style={styles.propertyInfo}>{i18n.t("Property information unavailable")}</Text>;
};

return (
<View style={styles.propertyCard}>
<TouchableOpacity onPress={()=>{
getPropertyDetails(item)}}>
<ImageBackground
source={{
uri: item?.propertyDetails?.uploadPics?.[0] ||item.propPhotos?.[0] || item?.landDetails?.images?.[0] || item.propertyDetails?.propPhotos?.[0] || "https://via.placeholder.com/150",
}}
style={styles.propertyImage}
imageStyle={{ borderRadius: 10 }}
>
 {
  item.propertyType==="Commercial"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat( item?.propertyDetails.landDetails.sell.totalAmount||item?.propertyDetails.landDetails.rent.rent||item?.propertyDetails.landDetails.lease.leasePrice.totalAmount) }
      </Text></View>)
 }


{
  item.propertyType==="Layout"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat(item?.layoutDetails.totalAmount)}
      </Text></View>)
 }


{
  item.propertyType==="Residential"&&(<View>
     <Text style={styles.priceTag}>₹ { item?.propertyDetails.flatCost}
      </Text></View>)
 }
 {
  item.propertyType==="Agricultural land"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat( item?.landDetails.totalPrice)}
      </Text></View>)
 }
   </ImageBackground> 

 {renderContent()}</TouchableOpacity>
</View>
);
};
const renderResultItem = ({ item }) => {
return (
<View style={styles.resultCard}>
{/* Image Section */}
<ImageBackground
source={{
uri: item.images?.[0] || "https://via.placeholder.com/150",
}}
style={styles.resultImage}
imageStyle={{ borderRadius: 15 }}
>
<Text style={styles.propertyTitle}>{i18n.t("Title")} : {item.propertyTitle} @ {item.propertyId}</Text>

{item.propertyType==="Commercial"&&(<View><Text style={styles.resultPrice}>{i18n.t("Price")} ₹{ handlePriceFormat( item.propertyDetails.landDetails.sell.totalAmount||item.propertyDetails.landDetails.rent.rent||item.propertyDetails.landDetails.lease.leasePrice)}</Text></View>)}
</ImageBackground>

{/* Property Details */}
<View style={styles.resultDetails}>
<Text style={styles.resultType}>{i18n.t("Type")} : {item.propertyType}</Text>


<Text style={styles.resultPrice}>{i18n.t("Price")} ₹{ handlePriceFormat( item.price)}</Text>
<Text style={styles.resultAddress}>{i18n.t("Location")} : {item.address}</Text>
<Text style={styles.resultSize}>{i18n.t("Size")}: {item.size} acres</Text>
<Text>{item.propertyInterestedCount} {i18n.t("propertyInterestedCount")}</Text>
</View>
</View>
);
};

return (

  <ImageBackground style={styles.background}>
  <View style={styles.container}>
    <View style={styles.minidashboard}>
      {/* Searchbar and other components */}
      <Searchbar
        placeholder={i18n.t("Search by location")}
        style={styles.searchbar}
        value={searchQuery}
        onChangeText={handleSearchChange}
        onSubmitEditing={handleSearchSubmit}
      />
    </View>

    {searchQuery ? (
      // Render search results if there's a search query
      <View>
        {noPropertiesFound && <Text style={styles.noResultsText}>{i18n.t("No properties found")}</Text>}
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 30}}>{i18n.t("Here are the results")}</Text>
        <FlatList
          ref={flatListRef}
          data={searchResults}
          
          renderItem={renderResultItem}
          vertical
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          keyExtractor={(item) => item.property_id}
        />
      </View>
    ) : (
      <View>
        {/* Your category selection icons */}
        <View style={styles.iconRow}>
          <View style={styles.icon}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('OnlyAgriculture')}>
              <MaterialCommunityIcons name="sprout" size={35} color="#0d416b" />
              <Text style={styles.iconLabel}>{i18n.t("Agriculture")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.icon}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('OnlyCommercial')}>
              <Icon name="industry" size={35} color="#0d416b" />
              <Text style={styles.iconLabel}>{i18n.t("Commercial")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.icon}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('OnlyResidential')}>
              <Icon name="home" size={35} color="#0d416b" />
              <Text style={styles.iconLabel}>{i18n.t("Residential")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.icon}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('OnlyLayout')}>
              <Icon name="building" size={35} color="#0d416b" />
              <Text style={styles.iconLabel}>{i18n.t("Layout")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* "View More" button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
  <View style={{ alignSelf: 'flex-start' }}>
    <Text style={styles.headerText}>Latest Properties</Text>
  </View>
  <View style={{ alignSelf: 'flex-end' }}>
    <TouchableOpacity onPress={navigateToImIntrested}>
      <Text style={{ color: '#007BFF', textDecorationLine: 'underline', fontSize: 16, fontWeight: 'bold' }}>
        {i18n.t("View More")}
      </Text>
    </TouchableOpacity>
  </View>
</View>


        {/* Recent Properties FlatList */}
        {loading ? (
         <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <View style={{flex:1}} >
            <View >
           <FlatList
            data={recentProperties}
            renderItem={renderPropertyItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            keyExtractor={(item) => item._id}
          />
             </View>
<View>
<BuyerLocationProps/>
 </View>

      </View>
        )}
      </View>
    )}
 
  </View>

  {/* <View style={{marginTop:500}} >
    <BuyerLocationProps/>
          
   <FlatList
            data={recentProperties}
            renderItem={renderPropertyItem}
             horizantal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            keyExtractor={(item) => item._id}
          /> 
   </View>  */}
</ImageBackground>
)
};

const styles = StyleSheet.create({


  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
     marginLeft: 10,
     color:"#0d416b"
   },

resultCard: {
backgroundColor: '#fff',
padding:50,
borderRadius: 15,
elevation: 5, // Adds a subtle shadow for better depth
marginVertical: 10,
overflow: 'hidden', // Prevents content from spilling outside the card border
alignItems:'center'
},
resultImage: {
height: 200,
width:300,
justifyContent: 'flex-end',
padding: 10,

},
resultTitle: {
color: '#fff',
fontSize: 18,
fontWeight: 'bold',
backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
padding: 5,
borderRadius: 5,
},
resultDetails: {
padding: 15,
},
resultType: {
fontSize: 16,
fontWeight: '600',
color: '#333',
marginBottom: 5,
},
resultPrice: {
fontSize: 18,
fontWeight: '700',
color: '#1C8D73', // Green color for price
marginBottom: 5,
},
resultAddress: {
fontSize: 14,
color: '#777', // Lighter grey for the address
marginBottom: 5,
},
resultSize: {
fontSize: 14,
color: '#555', // Slightly darker grey
},
iconRow: {
flexDirection: 'row',
justifyContent: 'space-around', // Space evenly between icons
alignItems: 'center',
marginVertical: 1, // Space between this row and other components
width: '100%',
},
iconContainer: {
  marginTop:10,
alignItems: 'center',
},
icon: {
  height:80,
  width:80,
 borderRadius: 10,
 backgroundColor:"white"
},
iconLabel: {
marginTop: 5,
fontSize: 12,
fontWeight: 'bold',
color: 'black',
textAlign: 'center',
},
forsize: {
fontWeight: 'bold',
color: "black",
marginLeft: 40
},
forprice: {
fontWeight: 'bold',
color: "black",
marginLeft: 35

},
mini_text1: {
fontWeight: 'bold',
fontSize: 20,
textAlign: 'center',
marginTop: 20, // Center text
},
mini_text: {
fontWeight: 'bold',
fontSize: 20,
textAlign: 'center', // Center text
paddingVertical: 5, // Add padding for spacing
},
dashboard_text: {
color: '#fff',
fontSize: 29,
fontWeight: 'bold',
textAlign: 'center', // Center text
paddingVertical: 5, // Add padding for spacing
},
minidashboard: {
// backgroundColor: "#A3C1DA", // Soft Blue
padding: 10,
alignItems: "center",
borderRadius: 10,
width: '90%', // Responsive width
maxWidth: 400, // Maximum width
marginBottom: 20 // Adjusted margin
},
background: {
flex: 1,
flexDirection:"column",
resizeMode: 'cover',
backgroundColor: "#E6E6FA", // Light Lavender
},
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
searchbar: {
marginTop: 50,
width: '100%',
height:55,
 alignSelf: 'center',
elevation: 20,
backgroundColor: "#FFFFFF", // White
},
mainButtonsContainer: {
marginTop: 40,
width: '100%',
alignItems: 'center',
},
row: {
flexDirection: 'row',
justifyContent: 'space-around', // Use space-around for even spacing
width: '100%',
marginBottom: 20, // Reduced margin
},
button: {
backgroundColor: '#A3C1DA', // Coral
borderRadius: 10,
paddingVertical: 18,
paddingHorizontal: 20, // Adjusted padding
marginHorizontal: 5, // Adjusted margin
elevation: 3,
shadowColor: '#000',
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.5,
shadowRadius: 4,
flex: 1,
maxWidth: 150, // Maximum button width
},
buttonText: {
fontSize: 13,
fontWeight: 'bold',
color: 'black', // Pure Black
textAlign: 'center',
},
propertyCard: {
backgroundColor: '#fff',
borderRadius: 10,
padding: 15,
marginHorizontal: 10,
width: 230,
height:230,
elevation: 3,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.2,
shadowRadius: 2,

// align:"center"
},

priceTag: {
  position: 'absolute',
  top: 85, // Adjust to position the price tag as you like
  right: 2, // Adjust to position the price tag as you like
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color for contrast
  color: 'white',
  padding: 5,
  borderRadius: 5,
    fontSize: 16,
  fontWeight: 'bold',
},

propertyTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  // marginTop: 5,
  color: '#333',
},
propertyImage: {
height: 120,
borderRadius: 15,
marginBottom: 10,
marginTop: 2
},
});

export default EntryBuyer;
