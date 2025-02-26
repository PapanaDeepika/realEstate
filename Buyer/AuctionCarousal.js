import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { FlatList, Image, Text, View , Dimensions, ImageBackground, TouchableOpacity, StyleSheet} from "react-native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CountdownTimer from "../Screens/CountdownTimer";

export default function AuctionCarousal(){
  const navigation = useNavigation()
    const flatListRef = useRef()
    const SCREEN_WIDTH =Dimensions.get("window").width ;
    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [auctionData, setAuctionData] = useState([])
    

      const getTodayAuction = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }
            const tokenData = jwtDecode(token)
            const response = await fetch("http://172.17.15.189:3000/auction/getTodayAuctions", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.status === 409) {
                 setLoading(false);
              } 
else {
    setAuctionData(data.data);
     setLoading(false);
}
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);
        }
    },[])
   useFocusEffect(
      useCallback(() => {
        getTodayAuction();
       }, [getTodayAuction])
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
      const [currentDate, setCurrentDate] = useState(new Date())


      useEffect(() => {
        // Update current date every minute
        const timer = setInterval(() => setCurrentDate(new Date()), 60000)
        return () => clearInterval(timer)
      }, [])

useEffect(()=>{
  if(auctionData. length > 0){
    let interval = setInterval(()=>{
        if(activeIndex === (auctionData.length -1) || Math.ceil(activeIndex) ===  (auctionData.length -1) ){
            flatListRef.current.scrollToIndex({
                index:0,
                animation:true
        })
        } else {
            flatListRef.current.scrollToIndex({
                index:activeIndex+1,
                animation:true
        })
        }
    }, 5000)
    return()=>clearInterval(interval)
  }
})

const handleParticipate =(item)=> {
navigation.navigate("a", {property:item})
}

      const renderItem =({item, index})=>{
           return(
        // <View>
            
        //      {/* <Image source={{uri:(item?.image)}} style={{height:200, width:SCREEN_WIDTH}}/> */}
        // </View>
        <>

        <View style={{flexDirection:"column", backgroundColor:"black", }}>
           
            <View style={{alignItems:'center',   backgroundColor:"#f0f8ff", padding:10}}>
        <CountdownTimer targetDate={item.endDate} currentDate={currentDate} />
        </View>

         <TouchableOpacity style={styles.cardNew} key={item._id}>
             {(item.property.propertyType === "Agricultural land" || item.property.propertyType === "Agricultural" ) && (<ImageBackground style={styles.imageNew} source ={{uri: item.property?.images?.[0] || item.property?.landDetails?.images?.[0]
                 || item.property?.uploadPics?.[0] || item.property?.propPhotos?.[0] ||
                  "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
            
           
            
            <Text style={styles.imageText}>{item.property?.landDetails?.title} @ {item.property?.propertyId}</Text>
            <Text style={styles.priceBottomStyle}>{formatPrice(item.amount)}</Text>
          
            </ImageBackground>)}
            
            {item.property.propertyType === "Residential" && (<ImageBackground
             style={styles.imageNew} source ={{uri:  (item.property?.propPhotos	?.length > 0) ? (item.property?.propPhotos	?.[0]) :
             ( "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg")}}>
            
            
            
            <Text style={styles.imageText}>{item.property?.propertyDetails?.apartmentName} @ {item.property?.propertyId}</Text>
            <Text style={styles.priceBottomStyle}>{formatPrice(item.amount )}</Text>
         
            </ImageBackground>)}
            
            {item.property.propertyType === "Commercial" && (<ImageBackground style={styles.imageNew} source =
            {{uri: item.property?.propertyDetails?.uploadPics?.[0]  ||  
            "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
            
            
            
            <Text style={styles.imageText}>{ item.property?.propertyTitle} @ {item.property?.propertyId}</Text>
            <Text style={styles.priceBottomStyle}>{formatPrice(item.amount)}</Text>
             
            </ImageBackground>)}
            
            {item.property.propertyType === "Layout" && (<ImageBackground style={styles.imageNew} 
            source ={{uri: item.property?.images?.[0] || item.property?.landDetails?.images?.[0] || 
            item.property?.uploadPics?.[0] || item.property?.propPhotos?.[0] || 
            "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg"}}>
            
            
            
            <Text style={styles.imageText}>{item.property?.layoutDetails?.layoutTitle } @ {item.property?.propertyId}</Text>
            <Text style={styles.priceBottomStyle}>{formatPrice(item.amount)}</Text>
         
            </ImageBackground>)}
            
            <View style={styles.detailsContainer}>
             <View style={styles.detailsStyles}>
            <Icon name="map-marker" size={24} color="#007bff" />
            <Text style={styles.textStyleNew}>{item.property?.layoutDetails?.address?.district || item.property?.propertyDetails?.landDetails?.address?.district || item.property?.address?.district || item.property?.address?.district }</Text>
            </View>
            <View style={styles.detailsStyles}>
            <Icon name="ruler" size={24} color="#007bff" />
            <Text style={styles.textStyleNew}>{item.property?.layoutDetails?.plotSize || item.property?.propertyDetails?.landDetails?.sell?.plotSize || item.property?.propertyDetails?.landDetails?.rent?.plotSize|| item.propertyDetails?.landDetails?.lease?.plotSize|| item.property?.propertyDetails?.flatSize || item.property?.landDetails?.size } {item.property?.layoutDetails?.sizeUnit || item.property?.propertyDetails?.landDetails?.sell?.sizeUnit || item.property?.propertyDetails?.landDetails?.rent?.sizeUnit|| item.property?.propertyDetails?.landDetails?.lease?.sizeUnit|| item.property?.propertyDetails?.sizeUnit || item.property?.landDetails?.sizeUnit }</Text>
            </View>
            </View>

            <TouchableOpacity style={{textAlign:'center', alignItems:'center'}} onPress={() => handleParticipate(item)}>
        <Text style={styles.linkText}>Participate now -{">"} </Text>
      </TouchableOpacity>

             </TouchableOpacity>
             </View>
             </>
        )
      }

      //rendering dots
const renderDotIndicators =()=>{
    return(
    auctionData.map((dot, index) => {
        if(Math.ceil(activeIndex) === index || activeIndex === index){
            return(
            <View key={index}
             style={{backgroundColor:'green', height:10, width:10, borderRadius:5, marginHorizontal:6}}>

            </View>
            )
        }
        else{
        return (
            <View key={index}
             style={{backgroundColor:'red', height:10, width:10, borderRadius:5, marginHorizontal:6}}>

            </View>
        )
    }
    })
)
}
const handleScroll =(event)=>{
    const scrollPosition = event.nativeEvent.contentOffset.x;
    
    const index = scrollPosition / SCREEN_WIDTH;
    
    setActiveIndex(index)
}
const getItemLayout =(data, index)=>(
    {
        length:SCREEN_WIDTH,
        offset:SCREEN_WIDTH * index,
        index:index
    }
)
      return(
        <View>
            <View style={{backgroundColor:"#4184AB"}}>
 <Text style={{color:"white", fontFamily:'Montserrat_700Bold', textAlign:"center",
                paddingVertical:10, fontSize:18
            }}>UNREAL DEALS</Text>
            </View>
             <FlatList data={auctionData}
            keyExtractor={(item)=> item._id}
            ref ={flatListRef}
            renderItem ={renderItem}
            horizontal={true}
            pagingEnabled={true}
            onScroll={handleScroll}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            />
            <View style={{flexDirection:'row', justifyContent:'center',marginTop:10}}>{renderDotIndicators()}</View>

        </View>
      )
}


const styles = StyleSheet.create({
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
              timerContainer: {
                position: "absolute",
                top: "50%",  // Center vertically
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
                color: 'blue',
                textDecorationLine: 'underline',
                fontSize: 18,
                fontFamily:'Montserrat_500Medium'
              },
})