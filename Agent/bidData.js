// import React, { useEffect, useState } from 'react'
// import { Text, TouchableOpacity, View } from 'react-native'

// function BidData({route}) {
//     const [propItem,setPropItem]=useState([])
//     useEffect(()=>{
//         const {bid}=route.params

//         setPropItem(bid)
//     },[])
//   return (
// <View>
//   <View style={styles.overlayContainer}>
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         <TouchableOpacity onPress={() => setShowModal(false)}>
//           <Text style={styles.closeButton}>X</Text>
//         </TouchableOpacity>


 

//         {propItem.buyers.length > 0 ? (
//           <View style={styles.tableContainer}>
//             <View style={styles.tableHeader}>
//               <Text style={styles.tableHeaderText}>Bidder</Text>
//               <Text style={styles.tableHeaderText}>Bid Amount</Text>
//               <Text style={styles.tableHeaderText}>Bid Time</Text>
//             </View>
//             {propItem.buyers.map((bid, index) => (
//               <View key={index} style={styles.tableRow}>
//                 <Text style={styles.tableText}>{bid.buyerName}</Text>
//                 <Text style={styles.tableText}>₹{bid.bidAmount}</Text>
//                 <Text style={styles.tableText}>{new Date(bid.bidTime).toLocaleString()}</Text>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <View><Text style={styles.modalText}>No Bids</Text></View>
//         )}
//       </View>
//     </View>
//   </View>
          
// </View>  )
// }

// export default BidData




import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

function BidData({ route }) {
  const [propItem, setPropItem] = useState([])
//   const [showModal, setShowModal] = useState(true) // Assuming you want to control modal visibility

//   useEffect(() => {
//     const { bid } = route.params
//     if (bid) {
//       setPropItem(bid)

//       console.log("bid",bid.property[0])
//     }
//   }, [route.params.bid]) // Added dependency to handle bid updates



useEffect(() => {
    fectchAllAuctions();
  }, []);

  const fectchAllAuctions = async () => {
    try {
        console.log("indu")
      const token = await AsyncStorage.getItem("userToken");
     const { bid } = route.params
const Id=bid.propertyId
console.log(bid.propertyId)
      await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/getAuctionDetailsProperty/${Id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          console.log("Response.data",resp.data.data, resp.data.data[0] );
           setPropItem(resp.data.data[0]);
        })
        .catch((error) => {
          console.log(error);
         });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View >
       
           <View  >
 
      {/* {propItem.property.propertyType === "Agricultural land" && (
          <Text style={styles.propertyTitle}>
            Property Name: {propItem.property.landDetails.title || "N/A"}
          </Text>
        )}
  
        {propItem.property.propertyType === "Commercial" && (
          <Text style={styles.propertyTitle}>
            Property Name: {propItem.property.propertyTitle || "N/A"}
          </Text>
        )}
  
        {propItem.property.propertyType === "Layout" && (
          <Text style={styles.propertyTitle}>
            Property Name: {propItem.property.layoutDetails.layoutTitle || "N/A"}
          </Text>
        )}
  
        {propItem.property.propertyType === "Residential" && (
          <Text style={styles.propertyTitle}>
            Property Name: {propItem.property.propertyDetails.apartmentName || "N/A"}
          </Text>
        )} */}
  
      
              {propItem.buyers && propItem.buyers.length > 0 ? (
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Bidder</Text>
                    <Text style={styles.tableHeaderText}>Bid Amount</Text>
                    <Text style={styles.tableHeaderText}>Bid Time</Text>
                  </View>
                  {propItem.buyers.map((bid, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.tableText}>{bid.buyerName}</Text>
                      <Text style={styles.tableText}>₹{bid.bidAmount}</Text>
                      <Text style={styles.tableText}>
                        {new Date(bid.bidTime).toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  <Text style={styles.modalText}>No Bids</Text>
                </View>
              )}
            </View>
          </View>
     
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Montserrat_500Medium",

  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Montserrat_500Medium",

  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    fontFamily: "Montserrat_500Medium",

  },
  modalContent: {
    flex: 1,
  },
  closeButton: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: "Montserrat_600SemiBold",

    color: 'red',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tableContainer: {
    width: '100%',
    fontFamily: "Montserrat_500Medium",

    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",

    backgroundColor:"#4184AB"
  },
  tableHeaderText: {
    // fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    padding:10,
    fontFamily: "Montserrat_600SemiBold",

  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    fontFamily: "Montserrat_500Medium",

  },
  tableText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: "Montserrat_500Medium",

  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",

  },
})

export default BidData
