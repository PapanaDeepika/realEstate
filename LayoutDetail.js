import { View, StyleSheet, FlatList,Dimensions,Text, Image } from "react-native";
import react, { useEffect, useRef,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SCREEN_WIDTH = Dimensions.get("window").width;



const LayoutDetail = ({ route }) => {
  const { property_id ,district} = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null); // Reference for the FlatList
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found; token required");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://172.17.15.53:3000/property/getpropbyid/Layout/${property_id}`,
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
          setDetails(data);
          console.log("Data fetched:", data);
        } else {
          console.error("Error fetching the property details");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [property_id]);


  
 // Auto-scroll function
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex =
          (prevIndex + 1) % details?.uploadPics.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true }); // Scroll to next image
        return nextIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [details]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {details ? (
        <>
          {/* Display images */}
          {/* <View style={styles.imagecontainer}>
            {details.uploadPics.map((image, index) => (
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
              data={details.uploadPics} // Use uploadPics for images
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
            
          <Text style={styles.title}>
            {/* {" "} */}
            Title:{details.layoutDetails.layoutTitle || "No Title"}
          </Text>
          <Text style={styles.price}>
            Price: ₹{details.layoutDetails.plotPrice}
          </Text>
          <Text style={styles.detail}>
            Owner Name: {details.ownerDetails.ownerName || "N/A"}
          </Text>
          <Text style={styles.detail}>
            Phone Number: {details.ownerDetails.ownerContact || "N/A"}
          </Text>
          <Text style={styles.detail}>
            Size: {details.layoutDetails.plotSize} acres
          </Text>
         
          <Text style={styles.detail}>
            Location:{" "}
            {`${details.layoutDetails.address.village || "N/A"}, ${
              details.layoutDetails.address.district || "N/A"
            }, ${details.layoutDetails.address.state || "N/A"}`}
          </Text></View>
        </>
      ) : (
        <Text>No properties found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    price:{

        fontSize: 20,
    marginVertical: 5,
    fontWeight:"bold",
    color:"red"

    },
    detailsContainer:{
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
    imagecontainer:{

      
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 20,
          
    },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight:"bold"
  },
  image: {
    width: "90%",
      height: 200,
      marginVertical: 10,
      borderRadius: 10,
  },
});

export default LayoutDetail;
