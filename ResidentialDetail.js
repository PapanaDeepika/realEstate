// import { View, Text, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ActivityIndicator from "react-native-paper";

// const ResidentialDetail = ({ route }) => {
//   const {property_id} = route.params;
//   const [propertyDetails, setPropertyDetails] = useState("");
//   const [loading, setLoading] = useState("");

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");

//         if (!token) {
//           console.log("No token found");
//           return;
//         }
//         console.log("property id", property_id);

//         const response = await fetch(
//           `http://172.17.15.53:3000/property/getpropbyid/Residential/${property_id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setPropertyDetails(data);
//           console.log("API Response ", data);
//         } else {
//           console.error("error getting the property details ");
//         }
//       } catch (error) {
//         console.error("Error fetching property details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [property_id]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View>
//       {propertyDetails ? (
//         <>
//           <Text> ApartmentName {propertyDetails.propertyDetails.apartmentName}</Text>

//           <Text>Price : ₹{propertyDetails.propertyDetails.flatCost}</Text>
//           {propertyDetails.propPhotos.images.map((image,index)=>(
//             <Image

//             key={index}
//             source={{uri:image.trim()}}

//             />

//           ))}
//         </>
//       ) : (
//         <>
//           <Text>no properteis found </Text>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default ResidentialDetail;



// ------------------


// import { View, Text, StyleSheet, ActivityIndicator, Image,ScrollView } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ResidentialDetail = ({ route }) => {
//   const { property_id } = route.params;
//   const [propertyDetails, setPropertyDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");

//         if (!token) {
//           console.log("No token found");
//           return;
//         }
//         console.log("property id", property_id);

//         const response = await fetch(
//           `http://172.17.15.53:3000/property/getpropbyid/Residential/${property_id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setPropertyDetails(data);
//           console.log("API Response", data);
//         } else {
//           console.error("Error getting the property details");
//         }
//       } catch (error) {
//         console.error("Error fetching property details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [property_id]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View style={styles.container}>
//       {propertyDetails ? (
//         <>
//           <Text style={styles.text}>
//             Apartment Name:{" "}
//             {propertyDetails.propertyDetails?.apartmentName || "N/A"}
//           </Text>
//           <Text style={styles.text}>
//             Price: ₹{propertyDetails.propertyDetails?.flatCost || "N/A"}
//           </Text>
//           {/* Display images */}
//           {propertyDetails.propPhotos.map((image, index) => (
//             <Image
//               key={index}
//               source={{ uri: image.trim() }}
//               style={styles.image}
//             />
//           ))}
//         </>
//       ) : (
//         <Text style={styles.text}>No properties found</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   text: {
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     marginBottom: 10,
//   },
// });

// export default ResidentialDetail;


// -------------------------------

import { View, Text,Dimensions,FlatList, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState,useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
const SCREEN_WIDTH = Dimensions.get('window').width;

const ResidentialDetail = ({ route }) => {
    const { property_id } = route.params;
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef(null); // Reference for the FlatList
    const [currentIndex, setCurrentIndex] = useState(0); // State for current index
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % propertyDetails?.propPhotos.length;
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
            console.log("No token found");
            return;
          }
  
          const response = await fetch(
            `http://172.17.15.53:3000/property/getpropbyid/Residential/${property_id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setPropertyDetails(data);
          } else {
            console.error("Error getting the property details");
          }
        } 

        catch (error) {
          console.error("Error fetching property details:", error);
        }

        finally {
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
      
      
        {propertyDetails ? (
          <>
            {/* Display images */}
            {/* <View style={styles.imageContainer}>
              {propertyDetails.propPhotos.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.trim() }}
                  style={styles.image}
                />
              ))}
            </View> */}

<FlatList
              ref={flatListRef} // Reference for scrolling
              data={propertyDetails.propPhotos} // Use uploadPics for images
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
  
            {/* Property Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>
                {propertyDetails.propertyDetails?.apartmentName || "N/A"}
              </Text>
              <Text style={styles.price}>
                Price: ₹{propertyDetails.propertyDetails?.flatCost || "N/A"}
              </Text>
              <Text style={styles.description}>
                {propertyDetails.propertyDetails?.propDesc || "No description available"}
              </Text>
              <Text style={styles.info}>
                Owner: {propertyDetails.owner?.ownerName || "N/A"}
              </Text>
              <Text style={styles.info}>
                Contact: {propertyDetails.owner?.contact || "N/A"}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.noPropertyText}>No properties found</Text>
        )}
      </ScrollView>
    );
  };
  
const styles = StyleSheet.create({

    
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E6E6FA',
    },
    imageContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 20,
    },
    image: {
      width: "90%",
      height: 200,
      marginVertical: 10,
      borderRadius: 10,
    },
    detailsContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: "#A3C1DA",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      height:550,
        top:2
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 10,
    },
    price: {
      fontSize: 20,
      fontWeight: "bold",
      color: "red",
      marginBottom: 10,
    },
    description: {
      fontSize: 18,
      color: "black",
      fontWeight:"bold",
      lineHeight: 24,
      marginBottom: 10,
    },
    info: {
      fontSize: 18,
      color: "black",
      marginBottom: 8,
      fontWeight:"bold"
    },
    noPropertyText: {
      fontSize: 18,
      textAlign: "center",
      color: "#999999",
      marginTop: 50,
    },
  });

export default ResidentialDetail;
