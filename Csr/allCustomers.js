import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, View } from "react-native";
import { Card } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";

// function AllCustomers() {

// const [custData,setCustData]=useState([])
// const [customerName,setCustomerName]=useState("")
// const [loading,setLoading]=useState(false)

// const [page,setPage]=useState(1)
// const [hasMoreData,setHasMoreData]=useState(true)
// const [loading1,setLoading1]=useState(false)
// const [filterData,setFilterData]=useState([])
// useEffect(()=>{
// fetchCustomers()
// },[])
//     const fetchCustomers=async()=>{
//         try{
//             setLoading(true)
//              const token=await AsyncStorage.getItem("userToken")
//              await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//customer/getCustomer?page=${page}&limit=8`,{
//                 method:"get",
//                 headers:{
//                     Authorization:`Bearer ${token}`
//                 }
//              }).then((resp)=>{
//                 setLoading(false)
//                 setCustData(resp.data)
//                 setPage((prev)=>prev+1)
//                 setFilterData(resp.data)
//              }).catch((error)=>{
//                 setLoading(false)
//                 console.log(error)
//              })
//         }
//         catch(error)
//         {
// console.log(error)
//         }
//     }

//     const handleCustomerSearch=(text)=>{
//       setCustomerName(text)
//       if(text==="")
//       {
//         setFilterData(custData)
//       }
//       else{
//         const data=custData.filter((item)=>{
//           return( item.firstName.toLowerCase().includes(text.toLowerCase()) || item.lastName.toLowerCase().includes(text.toLowerCase()) ||item.district.toLowerCase().includes(text.toLowerCase()))
//         })
//     console.log(data)
//     setFilterData(data)
//       }
//     }

//     const formatPhoneNumber = (value) => {
//       // Remove all non-numeric characters
//       const cleanedValue = value.replace(/\D/g, "");

//       // Format it into 'xxx xxx xxxx'
//       let formattedPhoneNumber = "";
//       if (cleanedValue.length <= 3) {
//         formattedPhoneNumber = cleanedValue;
//       } else if (cleanedValue.length <= 6) {
//         formattedPhoneNumber = cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
//       } else {
//         formattedPhoneNumber =
//           cleanedValue.substring(0, 3) +
//           "-" +
//           cleanedValue.substring(3, 6) +
//           "-" +
//           cleanedValue.substring(6, 10);
//       }

//       return formattedPhoneNumber;
//     };

//     const CustomerCard = ({ item }) => {
//         return (
//           <Card style={styles.card}>
//             <Card.Content>
//               <Text style={styles.customerName}>
//                 {item.firstName} {item.lastName}{" "}
//               </Text>

//               <View style={styles.detailsContainer}>
//                 <View style={styles.detailItem}>
//                   <Feather name="at-sign" size={20} color="#057ef0" />
//                   <Text style={styles.detailText}>
//                     {item.accountId || "N/A"}
//                   </Text>
//                 </View>

//                 <View style={styles.detailItem}>
//                   <FontAwesome name="phone" size={20} color="#057ef0" />
//                   <Text style={styles.detailText}>
//                     {formatPhoneNumber(item.phoneNumber) || "N/A"}
//                   </Text>
//                 </View>

//                 <View style={styles.detailItem}>
//                   <MaterialCommunityIcons
//                     name="map-marker"
//                     size={20}
//                     color="#057ef0"
//                   />
//                   <Text style={styles.detailText}>
//                     {item.district || "N/A"},{" "}
//                     {item.state || "N/A"}
//                   </Text>
//                 </View>
//               </View>
//             </Card.Content>

//             <Image
//               source={{ uri: item.profilePicture }}
//               style={styles.propertyImage}
//             />

//           </Card>
//         );
//       };

//   return (
// // https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/customer/getCustomer

//  <View>

// {
//     loading?(
//         <View style={{marginVertical:280}}>
//             <ActivityIndicator size={'large'} color={"#007bff"}/>
//             </View>
//     ):(<View>
//   <View
//                   style={{
//                      backgroundColor: "#4184AB",
//                     padding: 10,
//                     elevation: 2,
//                   }}
//                 >
//                   <TextInput
//                     placeholder="Search by Customer Name & Location"
//                     style={{
//                       borderWidth: 1,
//                       borderRadius: 10,
//                       padding: 10,
//                        backgroundColor: "white",
//                     }}
//                     placeholderTextColor={"black"}
//                     value={customerName}
//                     onChangeText={(value) => {
//                       handleCustomerSearch(value);
//                     }}
//                   />

//                 </View>

//         <FlatList data={filterData} renderItem={CustomerCard}  onEndReached={()=>{if(hasMoreData){
//           fetchCustomers()
//         }}}
//         ListFooterComponent={<><ActivityIndicator /></>}
//         onEndReachedThreshold={0.2}/>
//         </View>)
// }
//  </View>

// )
// }

function AllCustomers() {
  const [custData, setCustData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading1, setLoading1] = useState(false); // Loading for infinite scrolling
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
 if(page===1)
 {
  setLoading(true)
 }
 else
 {
  setLoading1(true)
 }
    console.log("fetch Properties 123", page);
    try {
       const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//customer/getCustomer?page=${page}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCustomers = response.data;

      if (newCustomers.length < 8) {
        setHasMoreData(false);
      }

      setCustData((prevData) => [...prevData, ...newCustomers]);
      setFilterData((prevData) => [...prevData, ...newCustomers]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      setHasMoreData(false)
    } finally {
      setLoading(false);
      setLoading1(false);
    }
  };

  const handleCustomerSearch = (text) => {
    setCustomerName(text);
    if (text === "") {
      setFilterData(custData);
    } else {
      const data = custData.filter((item) => {
        return (
          item.firstName.toLowerCase().includes(text.toLowerCase()) ||
          item.lastName.toLowerCase().includes(text.toLowerCase()) ||
          item.district.toLowerCase().includes(text.toLowerCase())
        );
      });
      setFilterData(data);
    }
  };

  const formatPhoneNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    let formattedPhoneNumber = "";

    if (cleanedValue.length <= 3) {
      formattedPhoneNumber = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
    } else {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) +
        "-" +
        cleanedValue.substring(3, 6) +
        "-" +
        cleanedValue.substring(6, 10);
    }

    return formattedPhoneNumber;
  };

  const CustomerCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.customerName}>
            {item.firstName} {item.lastName}{" "}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.detailText}>{item.accountId || "N/A"}</Text>
            </View>

            <View style={styles.detailItem}>
              <FontAwesome name="phone" size={20} color="#057ef0" />
              <Text style={styles.detailText}>
                {formatPhoneNumber(item.phoneNumber) || "N/A"}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.detailText}>
                {item.district || "N/A"}, {item.state || "N/A"}
              </Text>
            </View>
          </View>
        </Card.Content>

        <Image
          source={{ uri: item.profilePicture }}
          style={styles.propertyImage}
        />
      </Card>
    );
  };

  return (
    <View>
      {loading ? (
        <View style={{ marginVertical: 280 }}>
          <ActivityIndicator size={"large"} color={"#007bff"} />
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: "#4184AB",
              padding: 10,
              elevation: 2,
            }}
          >
            <TextInput
              placeholder="Search by Customer Name & Location"
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                backgroundColor: "white",
              }}
              placeholderTextColor={"black"}
              value={customerName}
              onChangeText={(value) => {
                handleCustomerSearch(value);
              }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={filterData}
              renderItem={CustomerCard}
              onEndReached={() => {
                if (hasMoreData) {
                  fetchCustomers();
                }
              }}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                loading1 ? (
                  <ActivityIndicator size="large" color="#007bff" />
                ) : null
              }
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default AllCustomers;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: 15,
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  customerName: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },

  customerName: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Space out buttons evenly
    paddingBottom: 8,
    paddingTop: 8,
  },
  button: {
    width: 100, // Fixed width for buttons
    marginHorizontal: 4,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  propertyImage: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 80, // Adjust size as needed
    height: 80, // Adjust size as needed
    borderRadius: 40, // Optional, to make the image rounded
  },
  searchIcon: {
    marginLeft: 2,
    marginRight: 5, // Space between icon and text input
    color: "white",
  },
  searchContainer: {
    paddingHorizontal: 5,
    backgroundColor: "#4184AB", // Light background
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow blur
    elevation: 3, // For Android shadow
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Vertically center the input
    paddingVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  searchBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff", // Input background
    borderRadius: 20, // Rounded corners for the input box
    borderWidth: 1,
    borderColor: "#ccc", // Border color
    fontFamily: "Montserrat_700Bold",
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "Montserrat_700Bold",
  },
  overlayButtonContainer: {
    position: "absolute", // Ensure it's positioned relative to the parent
    top: 650, // Adjust as needed
    right: 10, // Adjust as needed
    zIndex: 1, // Ensure it stays on top of other elements
  },
  overlayButton: {
    backgroundColor: "#0ca7fa", // Or your button style
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  overlayButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  input: {
    borderWidth: 1,
    borderBlockColor: "black",
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
});
