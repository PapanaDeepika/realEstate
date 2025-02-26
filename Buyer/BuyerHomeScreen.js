import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AuctionCarousal from "./AuctionCarousal";
import WinnerCelebration from "./WinnerCelebration";
import { usePushNotification } from "../Contexts/PushNotificationContext";
  
const BuyerHomeScreen = () => {
    const navigation = useNavigation()
    const {expoPushToken, notification, handleNotificationResponse} = usePushNotification();
const [loading,setLoading] = useState(true)
const [topPrice, setTopPrice] = useState([])
const [regionProperties, setRegionProperties] = useState([])
const [showAuctionResult, setAuctionResult]= useState(false)
const [resultData, setResultData]= useState()

useEffect(()=> {
  getAuctionResults()
}
, [])


const getAuctionResults =async()=> {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    const response = await axios.get("http://172.17.15.189:3000/auction/getWinnerData", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });
    console.log("1234567777777777777", response.status)


    if(response.status === 200 || response.status === "200" ){
      setAuctionResult(true)
      console.log("Avengers", response.data.data[0].auctionData.winnerData.buyerName)
      setResultData(response.data)
      
 setLoading(false)
    }
  } catch (error) {
    console.error(error);
    setLoading(false)

  }


}

     useFocusEffect(
         useCallback(() => {
           getTopPriced();
           getRegionProperties()
          }, [getTopPriced, getRegionProperties])
       );
       const getRegionProperties =useCallback(async()=>{
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
              console.error("No token found");
              return;
            }
            const response = await axios.get("http://172.17.15.189:3000/property/propertyByDistrict", {
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });


            if(response.status === 200 || response.status === 201){
              setRegionProperties(response.data);
setLoading(false)
            }
          } catch (error) {
            console.error(error);
            setLoading(false)

          }
       }, [])

       const getTopPriced =useCallback(async()=>{
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
              console.error("No token found");
              return;
            }
            const response = await axios.get("http://172.17.15.189:3000/admin/getTopPropOnPrice", {
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });

            if(response.status === 200 || response.status === 201){
              setTopPrice(response.data);

              setLoading(false)

            }


          } catch (error) {
            console.error(error);
            setLoading(false)

          }
       }, [])
  // Static data
  const icons = [
    { id: 1, label: "Buy", icon: "home" },
     { id: 3, label: "Rent", icon: "home-city-outline" },
    { id: 4, label: "Lease", icon: "file-document-outline" },
    { id: 5, label: "Plot", icon: "map-outline" },
   ];




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
  const propertyDetails = (item) => {
    navigation.navigate('Propdetails', { propByRoute: item });
  };


const [expoTokenThere, setExpoTokenThere] = useState(false)

const registerPushToken =useCallback(async()=>{
  try {
      const token = await AsyncStorage.getItem("userToken");
       if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post("https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/registerPushToken", 
      {pushToken : 
        
        expoPushToken ? expoPushToken : "ABCDEFGH"
      },
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });
     } catch (error) {
      console.error(error);
    }
 }, [expoPushToken])

useFocusEffect(
  useCallback(() => {
    if(expoPushToken && expoPushToken !== null && expoPushToken!==''){
setExpoTokenThere(true)
      registerPushToken()
    }
   }, [registerPushToken])
);
  
    
    


  return (
    <ScrollView style={styles.container}>
{showAuctionResult && (
  <WinnerCelebration 
  isWinner={true} 
  winnerName={resultData?.data?.[0]?.auctionData?.winnerData?.buyerName}
  propertyName={resultData?.data?.[0]?.propertyName}
  propertyImage= {resultData?.data?.[0]?.propertyImage?.[0]}
  onClose={() => console.log("Winner modal closed")}
/>
)}


<Text style={{fontSize:20}}>Tokennnnnnnnnnnnn: {expoPushToken} {expoTokenThere}</Text>
<Text>{console.log(expoPushToken)}</Text>
{notification && <Text>New Notification: {notification.request.content.body}</Text>
}

{notification && <Text>New Notification: {notification}</Text>
}

{notification && <Text>New Notification: {notification.request.content.data?.screen || "SCRENNNNNNNNNNNNN"}</Text>
 }



      {/* Horizontal Scroll for Icons */}
<View style={{marginHorizontal:10, marginTop:10}}>
    <Text style={{  fontSize:20,fontFamily: "Montserrat_600SemiBold"}}>Get started with</Text>
    <Text style={{  fontSize:16, color:'#9d9d9e', fontFamily:"Montserrat_400Regular"}}>Find your dream property </Text>

</View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconScroll}>
       
          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("buy", {type:"sell"})}}>
            <MaterialCommunityIcons name="home" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("buy", {type:"rent"})}}>
            <MaterialCommunityIcons name="home-city" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Rent</Text>
          </TouchableOpacity>

          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("buy", {type:"lease"})}}>
            <MaterialCommunityIcons name="file-document" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Lease</Text>
          </TouchableOpacity>
          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("agLands")}}>
            <MaterialCommunityIcons name="sprout" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Agriculture</Text>
          </TouchableOpacity>
          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("residentials")}}>
            <FontAwesome name="home" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Residential</Text>
          </TouchableOpacity>
          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("layouts")}}>
            <FontAwesome name="building" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Plot / Land</Text>
          </TouchableOpacity>
          <TouchableOpacity   style={styles.iconContainer} onPress={()=>{navigation.navigate("commercials")}} >
            <FontAwesome name="industry" size={40} color="#007bff" style={styles.icon} />
            <Text style={styles.iconLabel}>Commercial</Text>
          </TouchableOpacity>
       </ScrollView>


       <AuctionCarousal />


       {loading ?
       (

        <ActivityIndicator size="large" color="#057ef0" style={{flex:1, justifyContent:"center", alignItems:"center"}} />
        )
     :
     ( <>


      {/* Newly Launched Properties */}
      <View style={{backgroundColor:"#d1f4ff",marginTop:15  }}>


        <View style={[styles.detailsStyles]}>
        <View style={{backgroundColor:"#007bff", margin:10, padding:10, borderRadius:25, borderColor:"#0d2e69", borderWidth:2}}>
        <FontAwesome6 name="arrow-trend-up" size={24} color="white" />
        </View>
<View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
            <Text style={styles.sectionTitle}>Top Priced Properties</Text>
            </View>
        </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newlyLaunchedScroll}>
        {topPrice.map((property) => (
          <TouchableOpacity key={property.id} style={styles.newlyLaunchedCard} onPress={() => propertyDetails(property)}>
            <Image source={{uri :property.images?.[0]}} style={styles.roundImage} />
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyName}>{property.name}</Text>


          
    <Text style={styles.propertyLocation}>{property.district}</Text>
   
    <View style={[styles.detailsStyles, {marginTop:4}]}>
    <FontAwesome name="rupee" size={16} color="#000" />   
    <Text style={styles.propertyPrice}>{formatPrice(property.price)}</Text>
    </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>

      {/* All Properties */}



      <Text style={styles.allPropsTitle}>All Properties</Text>
      {regionProperties.map((item) => {
   return ( // Explicit return for the JSX
    // <View key={property.id} style={styles.propertyCard}>
    //   <View>
    //     <Image source={{uri:property.image}} style={styles.propertyImage} />
    //     <Text style={styles.propertyNameOverlay}>{property.name}</Text>
    //     <Text style={styles.propertyPriceOverlay}>{property.price}</Text>
    //   </View>
    //   <View style={styles.propertyInfo}>
    //     <Text style={styles.propertyLocation}>{property.location}</Text>
    //     <Text style={styles.propertySize}>{property.size}</Text>
    //   </View>
    // </View>
    <TouchableOpacity style={styles.cardNew} onPress={() => propertyDetails(item)} key={item._id}>
    
    {item.propertyType === "Agricultural land" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
    
    
    
    <Text style={styles.imageText}>{item.landDetails?.title} @ {item.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.landDetails?.price)} / {item.landDetails?.priceUnit}</Text>
  
    </ImageBackground>)}
    
    {item.propertyType === "Residential" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://w0.peakpx.com/wallpaper/1005/14/HD-wallpaper-3d-architectural-rendering-of-residential-buildings-03-thumbnail.jpg"}}>
    
    
    
    <Text style={styles.imageText}>{item.propertyDetails?.apartmentName} @ {item.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.propertyDetails?.flatCost )}</Text>
 
    </ImageBackground>)}
    
    {item.propertyType === "Commercial" && (<ImageBackground style={styles.imageNew} source ={{uri: item.propertyDetails?.uploadPics?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://www.iconicshyamal.com/assets/iconic_shyamal/images/about//about-banner.jpg"}}>
    
    
    
    <Text style={styles.imageText}>{ item.propertyTitle} @ {item.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.propertyDetails?.landDetails?.sell?.price || item.propertyDetails?.landDetails?.rent?.rent || item.propertyDetails?.landDetails?.lease?.leasePrice)} / {item.propertyDetails?.sell?.sizeUnit || item.propertyDetails?.rent?.sizeUnit || item.propertyDetails?.lease?.sizeUnit}</Text>
     
    </ImageBackground>)}
    
    {item.propertyType === "Layout" && (<ImageBackground style={styles.imageNew} source ={{uri: item.images?.[0] || item.landDetails?.images?.[0] || item.uploadPics?.[0] || item.propPhotos?.[0] || "https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg"}}>
    
    
    
    <Text style={styles.imageText}>{item.layoutDetails?.layoutTitle } @ {item.propertyId}</Text>
    <Text style={styles.priceBottomStyle}>{formatPrice(item.layoutDetails?.plotPrice)} / {item.layoutDetails?.priceUnit}</Text>
 
    </ImageBackground>)}
    
    <View style={styles.detailsContainer}>
     <View style={styles.detailsStyles}>
    <Icon name="map-marker" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{item.layoutDetails?.address?.district || item.propertyDetails?.landDetails?.address?.district || item.address?.district || item.address?.district }</Text>
    </View>
    <View style={styles.detailsStyles}>
    <Icon name="ruler" size={24} color="#007bff" />
    <Text style={styles.textStyleNew}>{item.layoutDetails?.plotSize || item.propertyDetails?.landDetails?.sell?.plotSize || item.propertyDetails?.landDetails?.rent?.plotSize|| item.propertyDetails?.landDetails?.lease?.plotSize|| item.propertyDetails?.flatSize || item.landDetails?.size } {item.layoutDetails?.sizeUnit || item.propertyDetails?.landDetails?.sell?.sizeUnit || item.propertyDetails?.landDetails?.rent?.sizeUnit|| item.propertyDetails?.landDetails?.lease?.sizeUnit|| item.propertyDetails?.sizeUnit || item.landDetails?.sizeUnit }</Text>
    </View>
    </View>
    
     </TouchableOpacity>
  );
})}
      </>)
      }



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
 
    },
  iconScroll: {
    
    padding:10,
    backgroundColor:"#fff",
    marginTop:10
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 15,
    padding:10,
    backgroundColor:"white",
    elevation:10,
    borderRadius:10
  },
  icon: {
    marginBottom: 5,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
fontFamily: "Montserrat_700Bold"
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily:'Montserrat_700Bold',
       color:'#0d2e69',
 
  },
  allPropsTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
       color:'#0d2e69',
      marginHorizontal:10,
      marginTop:10,
 
  },
  newlyLaunchedScroll: {
    marginVertical: 10,
    paddingHorizontal:10
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
  },
  roundImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyName: {
    fontSize: 14,
fontFamily:'Montserrat_700Bold'
  },
  propertyLocation: {
    fontSize: 12,
    color: "#777",
    fontFamily:'Montserrat_500Medium'
  },
  propertyPrice: {
    fontSize: 12,
    color: "#000",
    fontFamily:'Montserrat_700Bold',
    marginLeft:6
  },
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  propertyImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  propertyNameOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    padding: 5,
    fontSize: 14,
    borderRadius: 5,
  },
  propertyPriceOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    padding: 5,
    fontSize: 14,
    borderRadius: 5,
  },
  propertyInfo: {
    padding: 10,
  },
  propertySize: {
    fontSize: 12,
    color: "#777",
    fontFamily: "Montserrat_400Regular",

  },
  shareIcon: {
    position: 'absolute',
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
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
    width:"100%",
    height:200
  },
  cardNew: {
    marginVertical: 10,

    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    padding:10,
    marginHorizontal:10

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
        marginTop:10
          },
});

export default BuyerHomeScreen;
