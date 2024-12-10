// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AgricultureDetail = ({ route }) => {
//     const { property_id } = route.params; // Make sure this is being set correctly
//     const [propertyDetails, setPropertyDetails] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPropertyDetails = async () => {
//             try {
//                 const token = await AsyncStorage.getItem("userToken");
//                 if (!token) {
//                     console.error("No token found");
//                     return;
//                 }

//                 console.log("property id",property_id);

//                 const response = await fetch(`http://172.17.15.53:3000/property/getpropbyid/Agricultural/${property_id}`, {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
                    
//                 });
                
               


//                 if (response.ok) {
//                     const data = await response.json();
//                     setPropertyDetails(data);
//                     console.log("API Response:", response); // Log the full response object
//                 } else {
//                     console.error("Failed to fetch property details");
//                 }
//             } catch (error) {
//                 console.error("Error fetching property details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPropertyDetails();
//     }, [property_id]);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     return (
//         <View style={styles.container}>
//             {propertyDetails ? (
//                 <>
//                     <Text style={styles.title}>{propertyDetails.landDetails.title || "No Title"}</Text>
//                     <Text style={styles.detail}>Size: {propertyDetails.landDetails.size} acres</Text>
//                     <Text style={styles.detail}>Price: ₹{propertyDetails.landDetails.totalPrice}</Text>
//                     <Text style={styles.detail}>Location: {propertyDetails.address.district || "N/A"}</Text>
//                 </>
//             ) : (
//                 <Text>No property details available.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     detail: {
//         fontSize: 18,
//         marginVertical: 4,
//     },
// });

// export default AgricultureDetail;

// ------------------------
import React, { useEffect,useRef, useState } from "react";
import { View, Text, FlatList,ActivityIndicator,Dimensions,ScrollView, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SCREEN_WIDTH = Dimensions.get("window").width;
const AgricultureDetail = ({ route }) => {
    const { property_id } = route.params; // Make sure this is being set correctly
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef(null); // Reference for the FlatList
    const [currentIndex, setCurrentIndex] = useState(0); // State for current index
  

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            const nextIndex =
              (prevIndex + 1) % propertyDetails?.landDetails.images.length;
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true }); // Scroll to next image
            return nextIndex;
          });
        }, 3000); // Change image every 3 seconds
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, [propertyDetails]);
    
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                console.log("property id", property_id);

                const response = await fetch(`http://172.17.15.53:3000/property/getpropbyid/Agricultural/${property_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPropertyDetails(data);
                    console.log("API Response:", data); // Log the API response data
                } else {
                    console.error("Failed to fetch property details");
                }
            } catch (error) {
                console.error("Error fetching property details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [property_id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            {propertyDetails ? (
                <>
                 {/* Display images */}
                 {/* <View style={styles.imageContainer}>
                 {propertyDetails.landDetails.images.map((image, index) => (
                        <Image 
                            key={index} 
                            source={{ uri: image.trim() }} 
                            style={styles.image} 
                        />
                    ))}
                 </View> */}

                   {/* Image carousel using FlatList */}
            <FlatList
              ref={flatListRef} // Reference for scrolling
              data={propertyDetails.landDetails.images} // Use uploadPics for images
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SCREEN_WIDTH}
              snapToAlignment="center"
              decelerationRate="fast"
              pagingEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: SCREEN_WIDTH,
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.trim() }} // Trim the image URL
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
            />
                <View  style={styles.detailsContainer}>
                    <Text style={styles.title}>{propertyDetails.landDetails.title || "No Title"}</Text>
                    <Text style={styles.price}>Price: ₹{propertyDetails.landDetails.totalPrice}</Text>

                    <Text style={styles.detail}>Owner Name: {propertyDetails.ownerDetails.ownerName || "N/A"}</Text>
                    <Text style={styles.detail}>Phone Number: {propertyDetails.ownerDetails.phoneNumber || "N/A"}</Text>
                    <Text style={styles.detail}>Size: {propertyDetails.landDetails.size} acres</Text>
                    <Text style={styles.detail}>Location: {`${propertyDetails.address.village || "N/A"}, ${propertyDetails.address.district || "N/A"}, ${propertyDetails.address.state || "N/A"}`}</Text>
                    </View>
                   
                </>
            ) : (
                <Text>No property details available.</Text>
            )}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    price: {
      fontSize: 20,
      fontWeight: "600",
      color: "red",
      marginBottom: 10,
    },

    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 20,
      },
    //   image: {
    //     width: "90%",
    //     height: 200,
    //     marginVertical: 10,
    //     borderRadius: 10,
    //   },
      detailsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor:"#A3C1DA",
        height:550,
        top:2
      },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E6E6FA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 20,
        fontWeight:"bold",
        marginVertical: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },


});

export default AgricultureDetail;
