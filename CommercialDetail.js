import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
const SCREEN_WIDTH = Dimensions.get("window").width;

const CommercialDetail = ({ route }) => {
  const { property_id, district } = route.params;
  const [loc, setLoc] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null); // Reference for the FlatList
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("token is required ");
          return;
        }

        const response = await fetch(
          `http://172.17.15.53:3000/property/getpropbyid/Commercial/${property_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("property id is :", property_id);
        console.log(" my district is  : ", district);

        if (response.ok) {
          const data = await response.json();
          setPropertyDetails(data);
          console.log("api response", data);
        } else {
          console.error("error fetching the proprty details");
        }
      } catch (error) {
        console.error("error fetching the api");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [property_id]);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("token is required ");
          return;
        }

        const response1 = await fetch(
          `http://172.17.15.53:3000/agent/getAgentsbyloc/${district}`,
          {
            method: "GET",
            headers: {
              Authorization: ` Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("property id is :", property_id);
        console.log(" my district is  : ",district);
        console.log(" either my agent data cmg  or not ",response1);
        if (response1.ok) {
          const data = await response1.json();
          setLoc(data);
          console.log("my response from agent api --> ", data);
        } else {
          console.error("error fetching the agent details");
        }
      } catch (error) {
        console.error("error fetching the api");
      }
    };
    fetchAgents();
  }, [district]);

  // Auto-scroll function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex =
          (prevIndex + 1) % propertyDetails?.propertyDetails.uploadPics.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true }); // Scroll to next image
        return nextIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [propertyDetails]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
//   const handleCardClick = async (agentId) => {
//     // Fetch additional data for the agent
//     try {
//       const response = await fetch(`https://api.example.com/agents/${agentId}`); // Replace with your API endpoint
//       const agentDetails = await response.json();
//       console.log(agentDetails);
//       // Handle the agent details (e.g., navigate to a detail screen or show a modal)
//     } catch (error) {
//       console.error("Error fetching agent details:", error);
//     }
//   };
 


return (
    <>
      <ScrollView>
        {propertyDetails ? (
          <>
           

            {/* Image carousel using FlatList */}
            <FlatList
              ref={flatListRef} // Reference for scrolling
              data={propertyDetails.propertyDetails.uploadPics} // Use uploadPics for images
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
            <View style={styles.detailsContainer}>
              <Text> property Title : {propertyDetails.propertyTitle}</Text>
              <Text>
                Owner Name:{" "}
                {propertyDetails.propertyDetails.owner.ownerName || "N/A"}
              </Text>
              <Text>
                Description
                {propertyDetails.propertyDetails.landDetails.description}
              </Text>

              {propertyDetails.propertyDetails.landDetails.sell &&
                propertyDetails.propertyDetails.landDetails.sell.plotSize && (
                  <>
                    <Text>
                      {propertyDetails.propertyDetails.landDetails.sell
                        ?.plotSize || "N/A"}{" "}
                      acres
                    </Text>
                    <Text>
                      Total Amount from the sell : ₹
                      {propertyDetails.propertyDetails.landDetails.sell
                        ?.totalAmount || "N/A"}
                    </Text>
                    <Text>
                      Price: ₹
                      {propertyDetails.propertyDetails.landDetails.sell
                        ?.price || "N/A"}
                    </Text>
                    <Text>
                      Land Usage:{" "}
                      {propertyDetails.propertyDetails.landDetails.sell?.landUsage.join(
                        ", "
                      ) || "N/A"}
                    </Text>
                  </>
                )}

              {propertyDetails.propertyDetails.landDetails &&
                propertyDetails.propertyDetails.landDetails.rent.plotSize && (
                  <>
                    <Text>
                      {" "}
                      this is rent price{" "}
                      {
                        propertyDetails.propertyDetails.landDetails.rent
                          ?.totalAmount
                      }{" "}
                    </Text>
                    <Text>
                      {
                        propertyDetails.propertyDetails.landDetails.rent
                          ?.plotSize
                      }
                    </Text>
                  </>
                )}

              {propertyDetails.propertyDetails.landDetails.lease &&
                propertyDetails.propertyDetails.landDetails.lease
                  .totalAmount && (
                  <>
                    <Text>
                      {" "}
                      total amount from the lease :{" "}
                      {
                        propertyDetails.propertyDetails.landDetails.lease
                          ?.totalAmount
                      }
                    </Text>
                    <Text>
                      {" "}
                      total size :{" "}
                      {
                        propertyDetails.propertyDetails.landDetails.lease
                          ?.plotSize
                      }
                    </Text>
                  </>
                )}
            </View>
          </>
        ) : (
          <>
            <Text>no properties found</Text>
          </>
        )}

        {/* { agents list using flat list --->?} */}

        {/* <FlatList
            data={loc}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item._id)}>
                  <Image source={{uri:item.profilePicture}}  style={styles.agentimage}/>
                <Text style={styles.name}>{item.firstName}</Text>
                <Text style={styles.details}>{item.phoneNumber}</Text>
                <Text style={styles.details}>{item.email}</Text>
                <Text style={styles.details}>{item.city}</Text>
                <Text style={styles.details}>{item.rating}</Text>
              </TouchableOpacity>
            )}
          /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  agentimage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
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
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    // backgroundColor: "#A3C1DA",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
    // height: 550,
    top: 2,
    backgroundColor: "red",
  },
});
export default CommercialDetail;
// -----------------------------------------
// { lets try the flat list with headr and footer to avoid virtualized lists }----->
// |
// |
// |
// ^----------

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState, useRef } from "react";
// import { TouchableOpacity } from "react-native";
// import {
//   Text,
//   View,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
//   Image,FlatList,
// } from "react-native";
// import { ActivityIndicator } from "react-native-paper";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const CommercialDetail = ({ route }) => {
//   const { property_id, district } = route.params;
//   const [loc, setLoc] = useState(null);
//   const [propertyDetails, setPropertyDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const flatListRef = useRef(null); // Reference for the FlatList
//   const [currentIndex, setCurrentIndex] = useState(0); // State for current index

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("token is required ");
//           return;
//         }

//         const response = await fetch(
//           `http://172.17.15.53:3000/property/getpropbyid/Commercial/${property_id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("property id is :", property_id);
//         console.log(" my district is  : ", district);

//         if (response.ok) {
//           const data = await response.json();
//           setPropertyDetails(data);
//           console.log("api response", data);
//         } else {
//           console.error("error fetching the proprty details");
//         }
//       } catch (error) {
//         console.error("error fetching the api");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [property_id]);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("token is required ");
//           return;
//         }

//         const response1 = await fetch(
//           `http://172.17.15.53:3000/agent/getAgentsbyloc/${district}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: ` Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (response1.ok) {
//           const data1 = await response1.json();
//           setLoc(data1);
//           console.log("my response from agent api --> ", data1);
//         } else {
//           console.error("error fetching the -- agents details");
//         }
//       } catch (error) {
//         console.error("error fetching the api");
//       }
//     };
//     fetchAgents();
//   }, [district]);

//   // Auto-scroll function for images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => {
//         const nextIndex =
//           (prevIndex + 1) % propertyDetails?.propertyDetails.uploadPics.length;
//         flatListRef.current.scrollToIndex({ index: nextIndex, animated: true }); // Scroll to next image
//         return nextIndex;
//       });
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [propertyDetails]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   const handleCardClick = async (agentId) => {
//     try {
//       const response = await fetch(`https://api.example.com/agents/${agentId}`); // Replace with your API endpoint
//       const agentDetails = await response.json();
//       console.log(agentDetails);
//       // Handle the agent details (e.g., navigate to a detail screen or show a modal)
//     } catch (error) {
//       console.error("Error fetching agent details:", error);
//     }
//   };

//   // Header Section (Image Carousel)
//   const renderHeader = () => (
//     <FlatList
//       ref={flatListRef} // Reference for scrolling
//       data={propertyDetails?.propertyDetails.uploadPics} // Use uploadPics for images
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       snapToInterval={SCREEN_WIDTH}
//       snapToAlignment="center"
//       decelerationRate="fast"
//       pagingEnabled={true}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={({ item }) => (
//         <View
//           style={{
//             width: SCREEN_WIDTH,
//             alignItems: "center",
//             marginVertical: 10,
//           }}
//         >
//           <Image
//             source={{ uri: item.trim() }} // Trim the image URL
//             style={styles.image}
//             resizeMode="cover"
//           />
//         </View>
//       )}
//     />
//   );

//   // Footer Section (Agent List)
//   const renderFooter = () => (
//     <FlatList
//       data={loc}
//       keyExtractor={(item) => item._id}
//       renderItem={({ item }) => (
//         <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item._id)}>
//           <Image source={{ uri: item.profilePicture }} style={styles.agentimage} />
//           <Text style={styles.name}>{item.firstName}</Text>
//           <Text style={styles.details}>{item.phoneNumber}</Text>
//           <Text style={styles.details}>{item.email}</Text>
//           <Text style={styles.details}>{item.city}</Text>
//           <Text style={styles.details}>{item.rating}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   );

//   return (
//     <FlatList
//       data={[{}]} // Placeholder data to render the main FlatList
//       ListHeaderComponent={renderHeader} // Adding image carousel as header
//       ListFooterComponent={renderFooter} // Adding agent list as footer
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={() => (
//         <View style={styles.detailsContainer}>
//           <Text>Property Title: {propertyDetails?.propertyTitle}</Text>
//           <Text>Owner Name: {propertyDetails?.propertyDetails?.owner?.ownerName || "N/A"}</Text>
//           <Text>Description: {propertyDetails?.propertyDetails?.landDetails?.description}</Text>

//           {/* Selling Property Details */}
//           {propertyDetails?.propertyDetails?.landDetails?.sell && (
//             <>
//               <Text>{propertyDetails.propertyDetails.landDetails.sell.plotSize || "N/A"} acres</Text>
//               <Text>
//                 Total Amount from the sell: ₹{propertyDetails.propertyDetails.landDetails.sell?.totalAmount || "N/A"}
//               </Text>
//               <Text>Price: ₹{propertyDetails.propertyDetails.landDetails.sell?.price || "N/A"}</Text>
//               <Text>
//                 Land Usage: {propertyDetails.propertyDetails.landDetails.sell?.landUsage?.join(", ") || "N/A"}
//               </Text>
//             </>
//           )}

//           {/* Rent Property Details */}
//           {propertyDetails?.propertyDetails?.landDetails?.rent && (
//             <>
//               <Text>Rent Price: ₹{propertyDetails.propertyDetails.landDetails.rent?.totalAmount}</Text>
//               <Text>Plot Size: {propertyDetails.propertyDetails.landDetails.rent?.plotSize}</Text>
//             </>
//           )}

//           {/* Lease Property Details */}
//           {propertyDetails?.propertyDetails?.landDetails?.lease && (
//             <>
//               <Text>Lease Amount: ₹{propertyDetails.propertyDetails.landDetails.lease?.totalAmount}</Text>
//               <Text>Plot Size: {propertyDetails.propertyDetails.landDetails.lease?.plotSize}</Text>
//             </>
//           )}
//         </View>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 16,
//     margin: 10,
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   agentimage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   details: {
//     fontSize: 14,
//   },
//   imageContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   image: {
//     width: "90%",
//     height: 200,
//     marginVertical: 10,
//     borderRadius: 10,
//   },
//   detailsContainer: {
//     padding: 20,
//   },
// });

// export default CommercialDetail;
