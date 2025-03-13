// import React, { useEffect, useState } from 'react'
// import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
// import i18n from '../i18n'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// function BuyerLocationProps() {
//  const [recentProperties,setRecentProperties] =useState([])
 
//     useEffect(()=>{
//         fetchRecentProperties()
//         loadLanguage()
//     },[fetchRecentProperties])

//     const loadLanguage = async () => {
//         const savedLanguage = await AsyncStorage.getItem('language');
//         if (savedLanguage) {
//           i18n.locale = savedLanguage;
//         }
//       };
//     const fetchRecentProperties = async () => {
//         try {
//         const token = await AsyncStorage.getItem('userToken');
//         const response = await fetch(' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/propertyByDistrict', {
//         headers: {
//         Authorization: `Bearer ${token}`,
//         },
//         });
//         const data = await response.json();
//         console.log("Latest properties -->", data);
//         setRecentProperties(data);
//         } catch (error) {
//         console.error('Error fetching recent properties:', error);
//         } finally {
//         setLoading(false);
//         }
//         };


    


//       const renderLocationItem = ({ item }) => {
 
//         const renderContent = () => {
//         if (item.propertyType === 'Agricultural land') {
//         return (
//         <View>
//         <Text style={styles.propertyTitle}>{item.landDetails.title}</Text>
//         <Text style={styles.propertySize}>{i18n.t("Size")}: {item.landDetails?.size} {i18n.t(item.landDetails?.sizeUnit) }</Text>
//         <Text style={styles.propertyDistrict}>{i18n.t("District")}: {i18n.t(item.address?.district )}</Text>
//         </View>
//         );
//         } else if (item.propertyType === 'Commercial') {
//         return (
//         <View>
//         <Text style={styles.propertyTitle}>{item?.propertyTitle}</Text>
//         <Text style={styles.propertySize}>{i18n.t("Size")}: {item?.propertyDetails?.landDetails?.rent.plotSize||item?.propertyDetails?.landDetails?.sell.plotSize||item?.propertyDetails?.landDetails?.lease.plotSize} {item?.propertyDetails?.landDetails.rent.sizeUnit ||item?.propertyDetails?.landDetails.sell.sizeUnit ||item?.propertyDetails?.landDetails.lease.sizeUnit  }</Text>
        
//         {/* <Text style={styles.propertyTitle}>{propertyDetails?.type || 'N/A'}</Text> */}
//         {/* <Text style={styles.propertySize}>Size: {propertyDetails?.landDetails?.flatSize} {propertyDetails?.sizeUnit || 'N/A'}</Text> */}
//         <Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.propertyDetails?.landDetails?.address?.district  }</Text>
//         </View>
//         );
//         } else if (item.propertyType === 'Residential') {
//         return (
//         <View>
//         <Text style={styles.propertyTitle}>{item?.propertyDetails?.apartmentName  }</Text>
//         <Text style={styles.propertySize}>{i18n.t("Size")}: {item?.propertyDetails?.flatSize} {item.propertyDetails?.sizeUnit  }</Text>
//         <Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.address?.district}</Text>
//         </View>
//         );
//         }
//         else if (item.propertyType === 'Layout') {
//         return (
//         <View>
//         <Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitle  }</Text>
//         <Text style={styles.propertySize}>{i18n.t("Size")}: {item?.layoutDetails?.plotSize} {item?.layoutDetails?.sizeUnit }</Text>
//         <Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.layoutDetails.address?.district || 'N/A'}</Text>
//         </View>
//         );
//         }
//         return <Text style={styles.propertyInfo}>{i18n.t("Property information unavailable")}</Text>;
//         };
        
//         return (
//         <View style={styles.propertyCard}>
//         <TouchableOpacity onPress={()=>{
//         navigation.navigate('AllPropertiesList1')
//         }}>
//         <ImageBackground
//         source={{
//         uri: item?.propertyDetails?.uploadPics?.[0] ||item.propPhotos?.[0] || item?.landDetails?.images?.[0] || item.propertyDetails?.propPhotos?.[0] || "https://via.placeholder.com/150",
//         }}
//         style={styles.propertyImage}
//         imageStyle={{ borderRadius: 10 }}
//         />
//         {renderContent()}</TouchableOpacity>
//         </View>
//         );
//         };
      
//   return (
//     <View>
//         <View style={{ marginTop: 100 }}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
//             { ("Properties in your location")}
//           </Text>
//           <FlatList
//             data={recentProperties} // Data for the new FlatList
//             renderItem={renderLocationItem} // Custom render function for location-based properties
//             keyExtractor={(item) => item._id}
//             showsVerticalScrollIndicator={true}
//             contentContainerStyle={{ paddingBottom: 10 }}
//           />
//         </View> 
//     </View>
// )
// }

// export default BuyerLocationProps 


// const styles=StyleSheet.create({
//     resultCard: {
//         backgroundColor: '#fff',
//         padding:50,
//         borderRadius: 15,
//         elevation: 5, // Adds a subtle shadow for better depth
//         marginVertical: 10,
//         overflow: 'hidden', // Prevents content from spilling outside the card border
//         alignItems:'center'
//         },
//         resultImage: {
//         height: 200,
//         width:300,
//         justifyContent: 'flex-end',
//         padding: 10,
        
//         },
//         resultTitle: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
//         padding: 5,
//         borderRadius: 5,
//         },
//         resultDetails: {
//         padding: 15,
//         },
//         resultType: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 5,
//         },
//         resultPrice: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#1C8D73', // Green color for price
//         marginBottom: 5,
//         },
//         resultAddress: {
//         fontSize: 14,
//         color: '#777', // Lighter grey for the address
//         marginBottom: 5,
//         },
//         resultSize: {
//         fontSize: 14,
//         color: '#555', // Slightly darker grey
//         },
// })




import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function BuyerLocationProps() {
  const [recentProperties, setRecentProperties] = useState([]);
  const [language,setLanguage]=useState("en")

  const navigation=useNavigation()
  useEffect(() => {
    fetchRecentProperties();
    loadLanguage();
  }, [fetchRecentProperties]);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  const fetchRecentProperties = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/propertyByDistrict', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Latest properties -->", data);
      setRecentProperties(data);
    } catch (error) {
      console.error('Error fetching recent properties:', error);
    }
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

  const getPropertyDetails=(data)=>{
    console.log("Get Property Details")
  
    navigation.navigate("propertyDetailsBuyer", {propByRoute:data})
      // Propdetails
  }

  const renderLocationItem = ({ item }) => {
    const renderContent = () => {
      if (item.propertyType === 'Agricultural land') {
        return (
          <View>
            {/* <Text style={styles.propertyTitle}>{item.landDetails.title} @ {item.propertyId}</Text> */}

            <Text>{language==="en"?(<Text style={styles.propertyTitle}>{item.landDetails.title} @ {item.propertyId}</Text> 
):(<Text style={styles.propertyTitle}>{item.landDetails.titleTe || item.landDetails.title} @ {item.propertyId}</Text> 
)}</Text>

            <Text style={styles.propertySize}>{i18n.t("Size")}: {item.landDetails?.size} {i18n.t(item.landDetails?.sizeUnit)}</Text>
            <Text style={styles.propertyDistrict}>{i18n.t("District")}: {i18n.t(item.address?.district)}</Text>
          </View>
        );
      } else if (item.propertyType === 'Commercial') {
        return (
          <View>
            {/* <Text style={styles.propertyTitle}>{item?.propertyTitle} @ {item.propertyId}</Text> */}

            <Text>{language==="en"?(<Text style={styles.propertyTitle}>{item?.propertyTitle} @ {item.propertyId}</Text> 
):(<Text style={styles.propertyTitle}>{item?.propertyTitleTe || item?.propertyTitle } @ {item.propertyId}</Text> 
)}</Text>
            <Text style={styles.propertySize}>{i18n.t("Size")}: {item?.propertyDetails?.landDetails?.rent.plotSize || item?.propertyDetails?.landDetails?.sell.plotSize || item?.propertyDetails?.landDetails?.lease.plotSize} {item?.propertyDetails?.landDetails.rent.sizeUnit || item?.propertyDetails?.landDetails.sell.sizeUnit || item?.propertyDetails?.landDetails.lease.sizeUnit}</Text>
            <Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.propertyDetails?.landDetails?.address?.district}</Text>
          </View>
        );
      } else if (item.propertyType === 'Residential') {
        return (
          <View>
            {/* <Text style={styles.propertyTitle}>{item?.propertyDetails?.apartmentName} @ {item.propertyId}</Text> */}
            
            <Text>{language==="en"?(<Text style={styles.propertyTitle}>{item?.propertyDetails?.apartmentName  } @ {item.propertyId}</Text>

):(<Text style={styles.propertyTitle}>{item?.propertyDetails?.apartmentNameTe || item?.propertyDetails?.apartmentName  } @ {item.propertyId}</Text>

)}</Text>
            
            <Text style={styles.propertySize}>{i18n.t("Size")}: {item?.propertyDetails?.flatSize} {item.propertyDetails?.sizeUnit}</Text>
            <Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.address?.district}</Text>
          </View>
        );
      } else if (item.propertyType === 'Layout') {
        return (
          <View>
            {/* <Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitle} @ {item.propertyId}</Text> */}


            <Text>{language==="en"?(<Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitle  } @ {item.propertyId}</Text>

):(<Text style={styles.propertyTitle}>{item?.layoutDetails?.layoutTitleTe || item?.layoutDetails.layoutTitle  } @ {item.propertyId}</Text>


)}</Text>

            <Text style={styles.propertySize}>{i18n.t("Size")}: {item?.layoutDetails?.plotSize} {item?.layoutDetails?.sizeUnit}</Text>
            <Text style={styles.propertyDistrict}>{i18n.t("District")}: {item?.layoutDetails?.address?.district || 'N/A'}</Text>
          </View>
        );
      }
      return <Text style={styles.propertyInfo}>{i18n.t("Property information unavailable")}</Text>;
    };

    return (
      <View style={styles.propertyCard}>
        <TouchableOpacity onPress={() => {
getPropertyDetails(item)}}>
          <ImageBackground
            source={{
              uri: item?.propertyDetails?.uploadPics?.[0] || item.propPhotos?.[0] || item?.landDetails?.images?.[0] || item.propertyDetails?.propPhotos?.[0] || "https://via.placeholder.com/150",
            }}
            style={styles.propertyImage}
            imageStyle={{ borderRadius: 10 }}
          >
             {
  item.propertyType==="Commercial"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat(item?.propertyDetails.landDetails.sell.totalAmount|| item?.propertyDetails.landDetails.rent.rent||item?.propertyDetails.landDetails.lease.leasePrice.totalAmount) }
      </Text></View>)
 }


{
  item.propertyType==="Layout"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat( item?.layoutDetails.totalAmount)}
      </Text></View>)
 }


{
  item.propertyType==="Residential"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat( item?.propertyDetails.flatCost)}
      </Text></View>)
 }
 {
  item.propertyType==="Agricultural land"&&(<View>
     <Text style={styles.priceTag}>₹ { handlePriceFormat(item?.landDetails.totalPrice )}
      </Text></View>)
 }
            </ImageBackground>
          {renderContent()}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{ ("Properties in your location")}</Text>
      <FlatList
      horizontal
        data={recentProperties} // Data for the new FlatList
        renderItem={renderLocationItem} // Custom render function for location-based properties
         keyExtractor={(item) => item._id}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

export default BuyerLocationProps;

const styles = StyleSheet.create({
 
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    marginBottom:20,
    color:"#0d416b"
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  propertyCard: {
    backgroundColor: '#fff',
    // marginVertical: 10,
// height:250,
// width:200,
//      borderRadius: 15,
//     elevation: 5, // Adds a subtle shadow for better depth
    alignItems: 'center',
//     marginHorizontal: 10,
width: 230,
height:220,
elevation: 3,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.2,
shadowRadius: 2,
marginHorizontal: 10,
borderRadius: 10,
padding: 10,
   },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Use space-around for even spacing
    width: '100%',
    marginBottom: 20, // Reduced margin
    },
  propertyImage: {
    width: 190,
    height: 120,
    // justifyContent: 'flex-end',
    borderRadius: 10,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
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
  propertySize: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  propertyDistrict: {
    fontSize: 14,
    color: '#777',
  },
  propertyInfo: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});
