import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { ImageBackground } from "react-native";
import { FlatList, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Checkbox,
  Icon,
  SegmentedButtons,
} from "react-native-paper";
import { SharedTransitionType } from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";

const MarketingAgentsInfo = ({ route }) => {
  const [value, setValue] = useState("walk");

  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [propLoading, setPropLoading] = useState(false);
  const [custLoading, setCustLoading] = useState(false);

  const [props, setProps] = useState(false);

  const [csrProps, setCsrProps] = useState([]);
  const [date, setDate] = useState(new Date());

  const [assignModel, setAssignModel] = useState(false);
  const [assignCustModel, setAssignCustModel] = useState(false);

  const navigation = useNavigation();

  const [selectedProperties, setSelectedProperties] = useState([]);

  const [checked, setChecked] = useState(false);

  const [showChooseDate, setShowChooseDate] = useState(false);

  const [assignedDate, setAssignedDate] = useState("");

  const [customerData, setCustomerData] = useState([]);

  const [showCust, setShowCust] = useState(false);

  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const [propertyName, setPropertyName] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [customerName,setCustomerName]=useState("")
  const [custFilterData,setCustFilterData]=useState([])

  const [custFilterData1,setCustFilterData1]=useState([])
  const [custName,setCustName]=useState("")

  const [propName,setPropName]=useState("")
  const [filterProps,setFilterProps]=useState([])


  const [page1,setPage1]=useState(1)

  const [page2,setPage2]=useState(1)

  const [hasMoreData1,setHasMoreData1]=useState(true)

  const [hasMoreData2,setHasMoreData2]=useState(true)

  const [loading1,setLoading1]=useState(false)

  const [loading2,setLoading2]=useState(false)


  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [date3, setDate3] = useState(new Date());


  const handleSelect = (propertyId) => {
    setChecked(!checked);

    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties((prevState) =>
        prevState.filter((id) => id !== propertyId)
      );
    } else {
      setSelectedProperties((prevState) => [...prevState, propertyId]);
    }
    console.log(selectedProperties);
  };

  const handleSelect1 = (customerId) => {
    console.log(customerId);

    if (
      selectedCustomers.some((customer) => customer.customerId === customerId)
    ) {
      // Remove the customer object from selectedCustomers array
      setSelectedCustomers((prevState) =>
        prevState.filter((customer) => customer.customerId !== customerId)
      );
    } else {
      // Add a new customer object with empty fields
      setSelectedCustomers((prevState) => [
        ...prevState,
        { customerId: customerId, status: "", description: "" },
      ]);
    }
  };

  const handlePropertySearch = (text) => {
    setPropertyName(text);
    if (text === "") {
      setFilterData(properties);
    } else {
      const data = properties.filter((props) => {
        if (props.propertyType === "Agricultural land") {
          return props.landTitle.toLowerCase().includes(text.toLowerCase());
        }

        if (props.propertyType === "Layout") {
          return props.landTitle.toLowerCase().includes(text.toLowerCase());
        }

        if (props.propertyType === "Residential") {
          return props.landTitle.toLowerCase().includes(text.toLowerCase());
        }

        if (props.propertyType === "Commercial") {
          return props.landTitle.toLowerCase().includes(text.toLowerCase());
        }
      });

      setFilterData(data);
    }
  };



  const handlePropSearch = (text) => {
    setPropName(text);
    if (text === "") {
      setFilterProps(csrProps);
    } else {
      
      const data = csrProps.filter((props) => {
        if (props.propertyType === "Agricultural land") {
          return props.propertyName.toLowerCase().includes(text.toLowerCase());
        }

        if (props.propertyType === "Layout") {
          return props.propertyName.toLowerCase().includes(text.toLowerCase());
        }

        if (props.propertyType === "Residential") {
          return props.propertyName.toLowerCase().includes(text.toLowerCase());
        }

        if (props.propertyType === "Commercial") {
          return props.propertyName.toLowerCase().includes(text.toLowerCase());
        }
      });
setFilterProps(data)
     }
  };



const handleCustomerSearch=(text)=>{
  setCustomerName(text)
  if(text==="")
  {
    setCustFilterData(customers)
  }
  else{
    const data=customers.filter((item)=>{
      return( item.name.toLowerCase().includes(text.toLowerCase()))
    })
console.log(data)
    setCustFilterData(data)
  }
}





const handleCustomerSearch1=(text)=>{
  setCustName(text)
  if(text==="")
  {
    setCustFilterData1(customerData)
  }
  else{
    const data=customerData.filter((item)=>{
      return( item.firstName.toLowerCase().includes(text.toLowerCase()))
    })
console.log(data)
    setCustFilterData1(data)
  }
}


  useEffect(() => {
    const data = route.params;
    console.log(data);
    setSelectedProperties([]);
    fetchAssignedProperty();

    fetchAssignedCustomers();
  }, []);

  const fetchAssignedProperty = async () => {
    try {
      setPropLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      const decoded = jwtDecode(token);
      const role = decoded.user.role;
      //   const userId=decoded.user.userId
      const { userId } = route.params;

      const date = new Date().getDate();
      await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/assignedProperty/${userId}/6`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          setProperties(response.data.data);
          setFilterData(response.data.data);
          setPropLoading(false);
          console.log("responseee", response.data.data);
        })
        .catch((error) => {
          console.log("error", error);
          setPropLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleConfirmDate = (event, selectedDate) => {
    setDate(selectedDate)
    setAssignedDate(selectedDate);

    const currentDate = selectedDate || date;
    console.log("selectedDate", selectedDate);

    assignProperty();
    setShowChooseDate(false)

    // setShowDatePicker(false);
    // setDate(currentDate);
  };

  const handleConfirmDate1 = (event, selectedDate) => {
    setAssignedDate(selectedDate);
setDate3(selectedDate)
    const currentDate = selectedDate || date;
    console.log("selectedDate", selectedDate);

    assignCustomer();

    // setShowDatePicker(false);
    // setDate(currentDate);
  };

  const handlePriceFormat = (price) => {
    if (price >= 10000000) {
      // For crores
      return (price / 10000000).toFixed(2) + " Cr"; // Crore
    } else if (price >= 100000) {
      // For lakhs
      return (price / 100000).toFixed(2) + " Lakh"; // Lakh
    } else {
      // For normal INR formatting
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    }
  };

  const fetchAssignedCustomers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const { userId } = route.params;

      setCustLoading(true);
      const decoded = jwtDecode(token);
      const role = decoded.user.role;

      const date = new Date();

      console.log("dateee");
      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/getAssignedCustomers/${userId}/6?assignedDate=${date}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          console.log("resp..............", resp.data.data);
          setCustomers(resp.data.data);
          setCustFilterData(resp.data.data)
          setCustLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setCustLoading(false);
        });
    } catch (error) {}
  };

  const fetchCsrProperties = async () => {
    try
    {
    const token = await AsyncStorage.getItem("userToken");

    console.log("pagesssss",page2)
    if(page2===1)
    {
      setLoading(true)
    }
    else
    {
      setLoading2(true)
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.userId;
     await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/getPropsByCsr/${userId}?page=${page2}&limit=8`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {

        const data=resp.data
        if(data.length>0)
        {
        setCsrProps((prevData)=>[...prevData,...data]);
        setFilterProps((prevData)=>[...prevData,...data])
        setPage2((prevPage)=>prevPage+1)
        setLoading(false);
        console.log("resp      xx", resp.data);
        }
        else
        {
          setHasMoreData2(false)
        }
      })
      .catch((error) => {
        console.log(error);
        setHasMoreData2(false)
      });
    }
    catch(error)
    {

    }
    finally
    {
      setLoading(false)

      setLoading2(false)
    }

  };

  const handleToday = async () => {
    const date = new Date();
    console.log("Date", date);
    setAssignedDate(date);

    assignProperty();
  };

  const handleToday1 = async () => {
    const date = new Date();
    console.log("Date", date);
    setAssignedDate(date);

    assignCustomer();
  };

  const handleTommarow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("tommorrow", tomorrow);
    setAssignedDate(tomorrow);

    assignProperty();
  };

  const handleTommarow1 = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("tommorrow", tomorrow);
    setAssignedDate(tomorrow);

    assignCustomer();
  };


  const searchOnDate=async(event, selectedDate)=>{
     
    const token=await AsyncStorage.getItem("userToken")

    const { userId } = route.params;
    setShowChooseDate(false)
     setDate1(selectedDate)
     const formattedDate = selectedDate.toISOString().split('T')[0];
   
     await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/assignedProperty/${userId}/5?assignedDate=${formattedDate}`,
      {
        method:"get",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
     ).then((response)=>{
      console.log(response)
      setFilterData(response.data.data)
     }).catch((error)=>{
      console.log(error,`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/assignedProperty/${userId}/5?assignedDate=${formattedDate}`)
     })
 
  }




  const searchOnDate1=async(event, selectedDate)=>{
     
    const token=await AsyncStorage.getItem("userToken")

    const { userId } = route.params;
    setShowChooseDate(false)
     setDate2(selectedDate)
     const formattedDate = selectedDate.toISOString().split('T')[0];
   
     await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/getAssignedCustomers/${userId}/5?assignedDate=${formattedDate}`,
      {
        method:"get",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
     ).then((response)=>{
      console.log(response)
      setCustFilterData(response.data.data)
     }).catch((error)=>{
      console.log(error,`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/assignedProperty/${userId}/5?assignedDate=${formattedDate}`)
     })
 
  }



  const assignProperty = async () => {
    console.log("selected properties", selectedProperties);
    const { userId } = route.params;

    const token = await AsyncStorage.getItem("userToken");

    const decoded = jwtDecode(token);
    const csrId = decoded.user.userId;

    const data = {
      assignedBy: csrId,
      assignedDate,
      assignedTo: userId,
      propertyIds: selectedProperties,
    };

    console.log(data);
    await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/assigneProperty`, {
      method: "post",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        setAssignModel(false);

        ToastAndroid.showWithGravityAndOffset(
          "Property Assigned Successfully",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );

        setSelectedProperties([]);
        fetchAssignedProperty();

       })
      .catch((error) => {
        console.log(error);
        setAssignModel(false);
      });
  };

  const assignCustomer = async () => {
    const { userId } = route.params;

    const token = await AsyncStorage.getItem("userToken");

    const decoded = jwtDecode(token);

    const agentId = decoded.user.userId;

    const data = {
      assignedBy: agentId,

      assignedDate,

      assignedTo: userId,

      customers: selectedCustomers,
    };

    console.log("data", data);
    await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/assignCustomer`, {
      method: "post",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setAssignCustModel(false);

        ToastAndroid.showWithGravityAndOffset(
          "Customer Assigned Successfully",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
 fetchAssignedCustomers()
        setSelectedCustomers([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModal = async () => {
    fetchCsrProperties();
    setProps(true);
  };

  const handleModal1 = async () => {
    fetchCustomers();
    setShowCust(true);
  };

  const fetchCustomers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if(page1===1)
      {
        setLoading(true)
      }
      else
      {
        setLoading1(true)
      }

      await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/customer/getCustomer?page=${page1}&limit=8`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
              if(response.data.length>0)
              {
                const data=response.data
                setCustomerData((prevData)=>[...prevData,...data]);
                setCustFilterData1((prevData)=>[...prevData,...data]);
                setPage1((prevPage)=>prevPage+1)
              }
              else
              {
                setHasMoreData1(false)
              }
          
          
        })
        .catch((error) => {
          console.log(error);

          setHasMoreData1(false)
        });
    } catch (error) {}

    finally{
      setLoading1(false)
      setLoading(false)
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");
  
    // Format it into 'xxx xxx xxxx'
    let formattedPhoneNumber = "";
    if (cleanedValue.length <= 3) {
      formattedPhoneNumber = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedPhoneNumber = cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
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
  

  const renderCsrProp = ({ item }) => {
    const {
      _id,
      propertyName,
      images,
      price,
      size,
      sizeUnit,
      district,
      mandal,
    } = item;

    return ( 
      <View style={{marginBottom:10}}> 
      <View style={styles.card1}>
        <ImageBackground source={{ uri: images[0] }} style={styles.imageNew}>
          <View style={{ position: "absolute", right: 10 }}>
            <Checkbox
              status={
                selectedProperties.includes(_id) ? "checked" : "unchecked"
              }
              onPress={() => handleSelect(_id)}
            />
          </View>

          <Text style={styles.imageText}>
            {propertyName} @ {item.propertyId}
          </Text>

          <Text style={styles.priceBottomStyle}>
            {handlePriceFormat(price)}
          </Text>
        </ImageBackground>
        <View style={styles.cardContent}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsStyles}>
              <Icon name="map-marker" size={24} color="#007bff" />
              <Text style={styles.textStyleNew}>{district}</Text>
            </View>
            <View style={styles.detailsStyles}>
              <Icon name="ruler" size={24} color="#007bff" />
              <Text style={styles.textStyleNew}>
                {size} {"Acres"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      </View>
    );
  };

  const renderProp = ({ item }) => {
    return (
      <View style={styles.cardNew}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("propertyDetailsBuyer", { propByRoute: item })
          }
        >
          <ImageBackground
            style={styles.imageNew}
            source={{
              uri:
                item.images[0] ||
                "https://miro.medium.com/v2/resize:fit:800/1*PX_9ySeaKhNan-yPMW4WEg.jpeg",
            }}
          >
            <Text style={styles.imageText}>
              { 
                item.propertyTitle  }{" "}
              @ {item.propertyID || item.propertyId}
            </Text>
            <Text style={styles.priceBottomStyle}>
              {handlePriceFormat(item.price || item.landDetails?.price)}
            </Text>
          </ImageBackground>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsStyles}>
              <Icon name="map-marker" size={24} color="#007bff" />
              <Text style={styles.textStyleNew}>
                {item.district || item.address?.district}
              </Text>
            </View>
            <View style={styles.detailsStyles}>
              <Icon name="ruler" size={24} color="#007bff" />
              <Text style={styles.textStyleNew}>
                {item.size} {"Acres"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCust = ({ item }) => {
    return (
      <View style={[styles.cardContainer, { flex: 1 }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MarketingAgentsInfo", { userId: item._id });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {item.firstName} {" "}
                {item.lastName}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.contact}>Phone: {formatPhoneNumber(item.phoneNumber)}</Text>
            </View>
            <View style={{ position: "absolute", top: 0, left: 300 }}>
              <Checkbox
                status={
                  selectedCustomers.some(
                    (customer) => customer.customerId === item._id
                  )
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => handleSelect1(item._id)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCustomer = ({ item }) => {
    return (
      <View style={[styles.cardContainer, { flex: 1 }]}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("MarketingAgentsInfo",{userId:item._id})
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image
              source={{ uri: item.profilePicture }} // Ensure 'profilePicture' exists
              style={styles.profileImage}
            /> */}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.contact}>Phone: {formatPhoneNumber(item.phone)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ marginBottom: 10 }}
          buttons={[
            {
              value: "walk",
              label: "Assigned Properties",
              labelStyle:{fontFamily:"Montserrat_600SemiBold"}

            },
            {
              value: "train",
              label: "Assigned Customers",
              labelStyle:{fontFamily:"Montserrat_600SemiBold"}

            },
          ]}
        />
      </SafeAreaView>

      <View>
        {value === "walk" ? (
          <View>
            {propLoading ? (
              <ActivityIndicator size={"large"} color="#007bff" />
            ) : properties.length > 0 ? (
              <View>
                <View
                  style={[{
                    flexDirection: "row",
                    backgroundColor: "#4184AB",
                    padding: 10,
                    elevation: 2,
                  },styles.text]}
                >
                  <TextInput
                    placeholder="Search by Property Name"
                    style={[{
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                      width: 200,
                      backgroundColor: "white",
                    },styles.text]}
                    placeholderTextColor={"black"}
                    value={propertyName}
                    onChangeText={(value) => {
                      handlePropertySearch(value);
                    }}
                  />
              

              <TouchableOpacity
                      style={styles.closeModalButton1}
                      onPress={() => {
                        setShowChooseDate(true);
                        console.log(showChooseDate);
                      }}
                    >
                      <Text style={styles.closeModalButtonText1}>
                        {date1.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>

                    {showChooseDate && (
                      <View>
                        <DateTimePicker
                          value={date1}
                          mode="date"
                          display="default"
                          onChange={searchOnDate}
                           
                        />
                      </View>
                    )}
                  
                </View>

                <FlatList data={filterData} renderItem={renderProp} />
              </View>
            ) : (
              <Text
                style={[{
                  color: "red",
                  fontWeight: "bold",
                  marginVertical: 350,
                  marginHorizontal: 130,
                },styles.text]}
              >
                No Properties Found
              </Text>
            )}

            <View style={styles.overlayButtonContainer}>
              <TouchableOpacity
                style={styles.overlayButton}
                onPress={() => handleModal()}
              >
                <Text style={styles.overlayButtonText}>
                  <Feather name="plus" size={20} color="white" /> Assign
                  Property
                </Text>
              </TouchableOpacity>
            </View>

            <Modal visible={props}>
              {loading ? (
                <View style={{ marginVertical: 350 }}>
                  <ActivityIndicator size={"large"} color="#007bff" />
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      position: "fixed",
                      backgroundColor: "#0d416b",
                      flexDirection: "row",
                      padding: 5,

                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 5,
                      elevation: 3,
                    }}
                  >
                    <TextInput placeholder="search by name" style={styles.input} value={propName} onChangeText={(value)=>handlePropSearch(value)}/>

                    <TouchableOpacity onPress={(value) => setAssignModel()}>
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#007bff",
                          borderRadius: 20,
                        }}
                      >
                        <Text style={{ color: "white" }}> Assign</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setProps(false)}>
                      <View
                        style={{
                          marginHorizontal: 10,
                          width: 40,
                          height: 40,
                          padding: 10,
                          backgroundColor: "#007bff",
                          borderRadius: 20,
                        }}
                      >
                        <Text style={{ marginLeft: 5, color: "white" }}>X</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <FlatList data={filterProps} renderItem={renderCsrProp} onEndReached={()=>{
                    if(hasMoreData2)
                    {
                      fetchCsrProperties()
                    }
                  }}  onEndReachedThreshold={0.5} ListFooterComponent={<>{loading2?(<ActivityIndicator size={"large"}  color="#007bff" />):(null)}</>} />
                </View>
              )}
            </Modal>

            <Modal
              visible={assignModel}
              transparent={true}
              animationType="fade"
            >
              <View style={styles.assignModalOverlay}>
                <View style={styles.assignModalContent}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={(value) => handleToday()}
                    >
                      <Text
                        style={[styles.closeModalButtonText, { marginLeft: 15 }]}
                      >
                        Today
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={(value) => handleTommarow()}
                    >
                      <Text style={[styles.closeModalButtonText,{ marginLeft:4 }]}>Tomorrow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => {
                        setShowChooseDate(true);
                        console.log(showChooseDate);
                      }}
                    >
                      <Text style={styles.closeModalButtonText}>
                        Choose Date
                      </Text>
                    </TouchableOpacity>

                    {showChooseDate && (
                      <View>
                        <DateTimePicker
                          value={date}
                          mode="date"
                          display="default"
                          onChange={handleConfirmDate}
                        />
                      </View>
                    )}
                  </View>

                  {/* <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={() => setAssignModel(false)}
                  >
                    <Text style={styles.closeModalButtonText}>Close</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View>
            {custLoading ? (
              <ActivityIndicator size={"large"} color="#007bff" />
            ) : customers.length > 0 ? (
              <View>
                 <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#4184AB",
                    padding: 10,
                    elevation: 2,
                  }}
                >
                  <TextInput
                    placeholder="Search by Customer Name"
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                      width: 200,
                      backgroundColor: "white",
                    }}
                    placeholderTextColor={"black"}
                    value={customerName}
                    onChangeText={(value) => {
                      handleCustomerSearch(value)
                    }}
                  />


<TouchableOpacity
                      style={styles.closeModalButton1}
                      onPress={() => {
                        setShowChooseDate(true);
                        console.log(showChooseDate);
                      }}
                    >
                      <Text style={styles.closeModalButtonText1}>
                        {date2.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>

                    {showChooseDate && (
                      <View>
                        <DateTimePicker
                          value={date2}
                          mode="date"
                          display="default"
                          onChange={searchOnDate1}
                           
                        />
                      </View>
                    )}

                </View>
                <FlatList data={custFilterData} renderItem={renderCustomer} /> 
              </View>
            ) : (
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginVertical: 350,
                  marginHorizontal: 130,
                }}
              >
                No Customer Found
              </Text>
            )}

            <View style={styles.overlayButtonContainer}>
              <TouchableOpacity
                style={styles.overlayButton}
                onPress={() => handleModal1()}
              >
                <Text style={styles.overlayButtonText}>
                  <Feather name="plus" size={20} color="white" /> Assign
                  Customer
                </Text>
              </TouchableOpacity>
            </View>

            <Modal collapsable visible={showCust}>
              <View>
                <View
                  style={[{
                    position: "fixed",
                    backgroundColor: "#0d416b",
                    flexDirection: "row",
                    padding: 5,

                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 5,
                    elevation: 3,
                  },styles.text]}
                >
                  <TextInput value={custName} placeholder="search by name" style={styles.input} onChangeText={(value)=>handleCustomerSearch1(value)} />

                  <TouchableOpacity
                    onPress={(value) => setAssignCustModel(true)}
                  >
                    <View
                      style={[{
                        padding: 10,
                        backgroundColor: "#007bff",
                        borderRadius: 20,
                      },styles.text]}
                    >
                      <Text style={[{ color: "white" },styles.text]}> Assign</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setShowCust(false)}>
                    <View
                      style={[{
                        marginHorizontal: 10,
                        width: 40,
                        height: 40,
                        padding: 10,
                        backgroundColor: "#007bff",
                        borderRadius: 20,
                      },styles.text]}
                    >
                      <Text style={[styles.text,{ marginLeft: 5, color: "white" }]}>X</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <FlatList data={custFilterData1} renderItem={renderCust} onEndReached={()=>{
                              if(hasMoreData1)
                              {
                                fetchCustomers()
                              }
                }}
                 onEndReachedThreshold={0.5}

                 ListFooterComponent={<>{loading1?(<ActivityIndicator size={"large"} color="#007bff"/>):(null)}</>}

                />
              </View>
            </Modal>

            <Modal
              visible={assignCustModel}
              transparent={true}
              animationType="fade"
            >
              <View style={styles.assignModalOverlay}>
                <View style={styles.assignModalContent}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={(value) => handleToday1()}
                    >
                      <Text
                        style={[styles.closeModalButtonText, { marginLeft: 15 }]}
                      >
                        Today
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={(value) => handleTommarow1()}
                    >
                      <Text style={[styles.closeModalButtonText,{ marginLeft: 5 }]}>Tomorrow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => {
                        setShowChooseDate(true);
                        console.log(showChooseDate);
                      }}
                    >
                      <Text style={styles.closeModalButtonText}>
                        Choose Date
                      </Text>
                    </TouchableOpacity>

                    {showChooseDate && (
                      <View>
                        <DateTimePicker
                          value={date3}
                          mode="date"
                          display="default"
                          onChange={handleConfirmDate1}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

export default MarketingAgentsInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    fontFamily:"Montserrat_700Bold"

  },
  priceMaxInput: {
    flex: 1, // Ensures both inputs take equal space
    borderColor: "#000", // Light gray border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  priceInput: {
    flex: 1, // Ensures both inputs take equal space
    borderColor: "#000", // Light gray border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
    marginRight: 5,
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  input: {
    paddingHorizontal: 10,
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 5,
    height: 40,
    fontFamily:"Montserrat_700Bold"

  },
  slider: {
    width: 300,
    height: 40,
    fontFamily:"Montserrat_700Bold"

  },
  label1: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  pickerWrapper: {
    height: 40,
    width: 158,
    borderColor: "black",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    fontFamily:"Montserrat_700Bold"

  },
  picker1: {
    width: "100%",
    fontFamily:"Montserrat_700Bold"

  },
  pickerWrapper1: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderWidth: 1, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },

  picker: {
    height: 40,
    width: 140, // Width of the dropdown (picker)
    fontFamily:"Montserrat_700Bold"

  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontFamily:"Montserrat_700Bold"

  },
  welcomeContainer: {
    padding: 20,
    fontSize: 25,
    backgroundColor: "#4184AB",
    color: "white",
    fontStyle: "italic",
    fontFamily:"Montserrat_700Bold"

  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#4184AB",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    fontFamily:"Montserrat_700Bold"

  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginRight: 10,
    fontFamily:"Montserrat_700Bold"

  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontFamily:"Montserrat_700Bold"

  },
  propertyListContainer: {
    flex: 1,
    fontFamily:"Montserrat_700Bold"

  },
  propertyList: {
    paddingHorizontal: 15,
    fontFamily:"Montserrat_700Bold"

  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    fontFamily:"Montserrat_700Bold"

  },
  shareIcon: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
    zIndex: 1, // Ensure it appears above the image
    fontFamily:"Montserrat_700Bold"

  },
  propertyImage: {
    width: "100%",
    height: 200,
    fontFamily:"Montserrat_700Bold"

  },
  cardContent: {
    padding: 15,
    fontFamily:"Montserrat_700Bold"

  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  propertyDetailsContainer: {
    marginTop: 10,
    fontFamily:"Montserrat_700Bold"

  },
  propertyDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    fontFamily:"Montserrat_700Bold"

  },
  propertyDetails: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
    fontFamily:"Montserrat_700Bold"

  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
  recommended: {
    paddingHorizontal: 10,
    fontFamily:"Montserrat_700Bold"

  },
  textStyle: {
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 25,
    fontFamily:"Montserrat_700Bold"

  },
  detailsStyles: {
    flexDirection: "row",
    fontFamily:"Montserrat_700Bold"

  },
  textStyleNew: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
    fontFamily:"Montserrat_700Bold"

  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontFamily:"Montserrat_700Bold"

  },
  shareIcon: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the image
    right: 10, // Distance from the right edge of the image
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background for better visibility
    borderRadius: 20, // Circular background
    padding: 8, // Space inside the circular background
    fontFamily:"Montserrat_700Bold"

  },
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
    fontFamily:"Montserrat_700Bold"

  },
  imageNew: {
    width: "100%",
    height: 200,
    fontFamily:"Montserrat_700Bold"

  },
  cardNew: {
    marginVertical: 10,

    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily:"Montserrat_700Bold"

  },
  priceStyle: {
    backgroundColor: "rgba(173, 216, 230, 0.7)",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "40%",
    fontFamily:"Montserrat_700Bold"

  },
  priceBottomStyle: {
    // position:"absolute",
    // left:10,
    // bottom:10,
    // backgroundColor: 'rgba(173, 216, 230, 0.7)',
    // padding: 10,
    // color:"#fff"
    position: "absolute",
    // borderBottomColor:"#fff",
    // borderBottomWidth:2,
    bottom: 1, // Distance from the bottom of the image
    backgroundColor: "#f0f0f0", // Semi-transparent dark background
    color: "#000", // White text for contrast
    fontSize: 16, // Adjust font size
    fontWeight: "bold", // Bold text for emphasis
    paddingVertical: 4, // Vertical padding for the text box
    paddingHorizontal: 8, // Horizontal padding for the text box
    fontFamily:"Montserrat_700Bold"

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily:"Montserrat_700Bold"

  },
  modalView: {
    margin: 20,

    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      fontFamily:"Montserrat_700Bold"

    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
    justifyContent: "center",
    fontFamily:"Montserrat_700Bold"

  },

  overlayButtonContainer: {
    position: "absolute", // Ensure it's positioned relative to the parent
    top: 650, // Adjust as needed
    right: 10, // Adjust as needed
    zIndex: 1, // Ensure it stays on top of other elements
    fontFamily:"Montserrat_700Bold"

  },
  overlayButton: {
    backgroundColor: "#007bff", // Or your button style
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontFamily:"Montserrat_700Bold"

  },
  overlayButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily:"Montserrat_700Bold"

  },

  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily:"Montserrat_700Bold"

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:"Montserrat_700Bold"

  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    fontFamily:"Montserrat_700Bold"

  },
  text:{
    fontFamily:"Montserrat_700Bold"

  },
  buttonOpen: {
    backgroundColor: "#000",
    fontFamily:"Montserrat_700Bold"

  },
  buttonClose: {
    backgroundColor: "#2196F3",
    fontFamily:"Montserrat_700Bold"

  },
  buttonDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontFamily:"Montserrat_700Bold"

  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "#fff",
    fontFamily:"Montserrat_700Bold"

  },
  searchheader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
    fontFamily:"Montserrat_700Bold"

  },
  searchbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontFamily:"Montserrat_700Bold"

  },
  reseticon: {
    marginRight: 8,
    fontFamily:"Montserrat_700Bold"

  },
  resettext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },

  resetbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontFamily:"Montserrat_700Bold"

  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    fontFamily:"Montserrat_700Bold"

  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // To make the image round
    marginRight: 15,
    fontFamily:"Montserrat_700Bold"

  },
  textContainer: {
    justifyContent: "center",
    fontFamily:"Montserrat_700Bold"

  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  email: {
    fontSize: 16,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
  contact: {
    fontSize: 16,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },

  card1: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily:"Montserrat_700Bold",
  
  },
  propertyImage: {
    width: "100%",
    fontFamily:"Montserrat_700Bold",

    height: 200,
  },
  cardContent: {
    padding: 15,
    fontFamily:"Montserrat_700Bold"

  },
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  assignModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    fontFamily:"Montserrat_700Bold"
 
  },
  assignModalContent: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    fontFamily:"Montserrat_700Bold",

    alignItems: "center",
  },
  assignModalText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily:"Montserrat_700Bold"

  },
  closeModalButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    marginVertical: 10,
    width: 100,
    fontFamily:"Montserrat_700Bold"

  },
  closeModalButtonText: {
    color: "white",
    fontSize:12,
    fontFamily:"Montserrat_400Regular"

  },

  closeModalButtonText1: {
    marginTop:5,
    color: "black",
    fontFamily:"Montserrat_700Bold"

  },

  closeModalButton1: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
     width: 150,    
     fontFamily:"Montserrat_700Bold"

  },
});
