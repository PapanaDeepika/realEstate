import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
// import { Badge } from "react-native-elements"; // If you have a working badge library

const Options = () => {
  const [landDetails, setLandDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://172.17.15.53:3000/latestprops`);

      console.log(response.data);
      //   console.log("Data:", response.data);

      //   console.log("Land Detail Item Structure:", response.data);

      setLandDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);

      //   setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff4d4f" />
      ) : landDetails.length === 0 ? (
        <Text style={styles.noDataText}>No Properties Found</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {landDetails.map((item) => (
            <View key={item._id} style={styles.card}>
              <Image
                source={{
                  uri:
                    item.landDetails?.images?.[0] ||
                    item.propertyDetails?.uploadPics?.[0] ||
                    "https://via.placeholder.com/150", // Fallback image
                  // Default image if undefined
                }}
                style={styles.image}
              />
        <Text style={styles.forPrice}>
        {item.propertyType === "Agricultural land" && `Price: ${item.landDetails.totalPrice ?? 'N/A'}`}
        {item.propertyType === "Layout" && `Price: ${item.layoutDetails.plotPrice ?? 'N/A'}`}
        {item.propertyType === "Residential" && `Price: ${item.propertyDetails.totalCost ?? 'N/A'}`}
        {item.propertyType === "Commercial" && `Price: ${item.landDetails.sell.totalAmount ?? 'N/A'}`}
        
        {/* {item.propertyType === "Commercial" && (
          <>
            {item.landDetails?.sell && (
              <Text>Sell Price: {item.landDetails.sell.totalAmount ?? 'N/A'}{'\n'}</Text>
            )}
            {item.landDetails?.rent && (
              <Text>Rent Price: {item.landDetails.rent.totalAmount ?? 'N/A'}{'\n'}</Text>
            )}
            {item.landDetails?.lease && (
              <Text>Lease Price: {item.landDetails.lease.totalAmount ?? 'N/A'}{'\n'}</Text>
            )}
          </>
        )} */}
      </Text>


              <Text style={styles.xxx}>
                   {item.propertyType === "Agricultural land" && `Size : ${item.landDetails.size ?? 'N/A'}`}
                 {item.propertyType === "Layout" && `Size : ${item.layoutDetails.plotSize ?? 'N/A'}`}
                 {item.propertyType === "Residential" && `Size : ${item.propertyDetails.flatSize ?? 'N/A'}`}

                    {/* {item.propertyType==="Commercial" && `Price : ${item.landDetails.totalAmount ?? 'N/A'}`} */}


              </Text>
              {/* ------------ */}

              {/* <Badge value="New Launch" badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} /> */}

              {/* <Text style={styles.cardTitle}>{item.propertyTitle}</Text> */}

              {/* <Text style={styles.priceText}>
                {item.propertyDetails?.landDetails?.sell?.totalAmount
                  ? `Sell: ₹${item.propertyDetails.landDetails.sell.totalAmount}`
                  : "Contact for Price"}
              </Text>

              <Text style={styles.locationText}>
                {item.propertyDetails?.landDetails?.address?.district ||
                  "Location not available"}
              </Text>
              <Text style={styles.sizeText}>
  {item.propertyDetails?.landDetails?.plotSize || item.propertyDetails?.landDetails?.size
    ? `${item.propertyDetails.landDetails.plotSize || item.propertyDetails.landDetails.size} sq. ft`
    : "Size not available"}
</Text> */}

              {/* ----------- */}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  card: {
    width: 250,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  badgeStyle: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ff4d4f",
  },
  badgeText: {
    fontSize: 12,
    color: "white",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  priceText: {
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: "#555",
    paddingHorizontal: 10,
  },
  sizeText: {
    fontSize: 12,
    color: "#555",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
});

export default Options;
