import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card, Modal, RadioButton, SegmentedButtons } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icons library
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { Text as PaperText } from "react-native-paper";
import { text } from "@fortawesome/fontawesome-svg-core";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import i18n from "../i18n";

function CsrDeals() {
  const navigation = useNavigation();
  const [value, setValue] = useState("walk");

  const [deals, setDeals] = useState([]);

  const [properties, setProperties] = useState([]);
  const [properties1, setProperties1] = useState([]);

  const [interest, setIntrest] = useState("");

  const [propertyDeals, setPropertyDeals] = useState([]);

  const [dropDownOpen1, setDropDownOpen1] = useState(false);

  const [propertyName, setPropertyName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [ExpectedPrice, setExpectedPrice] = useState("");
  const [comments, setComments] = useState("");
  const [customerName, setCustomerName] = useState("");

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [propertyName1, setPropertyName1] = useState("");

  const [filterPropertyDeals, setFilterPropertyDeals] = useState([]);

  const [dropdownProps, setDropdownProps] = useState([]);

  const [selectedProperties, setSelectedProperties] = useState([]);

  //   const [showPropertyDeals,setShowPropertyDeals]=useState(false)

  const items = properties.map((property) => ({
    label: property.propertyName,
    value: property.propertyId,
  }));
  const [loading, setLoading] = useState(false);

  const [proploading, setPropLoading] = useState(false);

  const [showDeals, setShowDeals] = useState(false);

  useEffect(() => {
    fetchDeals();
    fetchProeprties();
    fetchProperties1();
  }, []);
  const fetchDeals = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      const decoded = jwtDecode(token);

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getDeals`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          // console.log(resp)
          setDeals(resp.data);
          setFilteredCustomers(resp.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {}
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format it into 'xxx xxx xxxx'
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

  const handleCustomerSearch = (text) => {
    setCustomerName(text);
    if (text === "") {
      setFilteredCustomers(deals);
    } else {
      const data = deals.filter((item) => {
        return (
          item.customer.firstName.toLowerCase().includes(text.toLowerCase()) ||
          item.customer.lastName.toLowerCase().includes(text.toLowerCase())
        );
      });
      console.log(data);
      setFilteredCustomers(data);
    }
  };

  const fetchProeprties = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      setPropLoading(true);
      await axios(
        `https://real-estate-back-end-hiko-dft4gz6ft-pindu123s-projects.vercel.app/deal/getDistinctProperties`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          setProperties(resp.data);
          setFilterPropertyDeals(resp.data);
          console.log("resp...........", resp.data);
          setPropLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPropLoading(false);
        });
    } catch (error) {}
  };

  const handleModal = () => {
    setShowDeals(true);
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const data = {
        comments: comments,
        expectedPrice: ExpectedPrice,

        interestIn: interest,
        phoneNumber: phoneNumber,
        properties: selectedProperties,
      };

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/createDeal`,
        {
          method: "post",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  const fetchProperties1 = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        "https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getAllProperties",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const propertyData = data.data;
      const dropdownData = propertyData.map((property) => ({
        label: `${property.propertyName} - ${property.type}`, // Full name as label
        value: property.id, // Use accountId as the unique identifier
        key: property.id, // Ensure key is unique
      }));

      setProperties1(propertyData);
      setDropdownProps(dropdownData);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  const handleDropDown = async (value) => {
    console.log(value);
    setPropertyName(value.label);

    let a = [];

    for (let prop of properties1) {
      if (prop.propertyId === value.value) {
        a.push({
          agentId: prop,
          propertyId: "6744948e8521d9a1194a7816",
          propertyName: "Mani",
          propertyType: "Agricultural land",
        });
      }
    }
  };

  const fetchPropertyDeals = async (property) => {
    try {
      //  https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getPropertyDeals/679223536ebdba1403a87914

      const token = await AsyncStorage.getItem("userToken");

      const propertyID = property.propertyId;

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getPropertyDeals/${propertyID}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          console.log(
            " https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getPropertyDeals/679223536ebdba1403a87914",
            resp.data
          );

          setPropertyDeals(resp.data);
          setShowPropertyDeals(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const handlePropertySearch = (text) => {
    setPropertyName1(text);
    if (text === "") {
      setFilterPropertyDeals(properties);
    } else {
      const data = properties.filter((props) => {
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
      setFilterPropertyDeals(data);
    }
  };

  const getDealByCId = (property) => {
    //  https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/deal/getCustomerDeals/677d0af3d7f7cbc245d2cae6
    navigation.navigate("propertyDeals", { property: property });
  };

  const getDeals = (item) => {
    navigation.navigate("customerDeals", { customer: item });
  };

  const PropertyDealCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>
            {item.propertyName || "N/A"}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.detailText}>{item.accountId || "N/A"}</Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.detailText}>
                {item.propertyType || "N/A"}
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
          source={{
            uri:
              item.images?.[0] ||
              "https://res.cloudinary.com/ddv2y93jq/image/upload/v1735999776/g2aqcqkd1ovsqiquwmhm.jpg",
          }}
          style={styles.propertyImage}
        />

        <View
          style={{ alignItems: "flex-end", marginRight: 20, marginBottom: 10 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#057ef0",
              paddingHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 5,
            }}
            onPress={() => {
              getDealByCId(item);
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>View Deals</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const CustomerDealCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.customerName}>
            {item.customer.firstName} {item.customer.lastName}{" "}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Feather name="at-sign" size={20} color="#057ef0" />
              <Text style={styles.detailText}>
                {item.customer.accountId || "N/A"}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <FontAwesome name="phone" size={20} color="#057ef0" />
              <Text style={styles.detailText}>
                {formatPhoneNumber(item.customer.phoneNumber) || "N/A"}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#057ef0"
              />
              <Text style={styles.detailText}>
                {item.customer.district || "N/A"},{" "}
                {item.customer.state || "N/A"}
              </Text>
            </View>
          </View>
        </Card.Content>

        <Image
          source={{ uri: item.customer.profilePicture }}
          style={styles.propertyImage}
        />

        <View
          style={{ alignItems: "flex-end", marginRight: 20, marginBottom: 10 }}
        >
          <TouchableOpacity
            style={[
              {
                backgroundColor: "#057ef0",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 5,
              },
              styles.text,
            ]}
            onPress={() => {
              getDeals(item);
            }}
          >
            <Text style={[{ color: "white", fontSize: 16 }, styles.text]}>
              View Deals
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ marginBottom: 10, fontFamily: "Montserrat_600SemiBold" }}
          buttons={[
            {
              value: "walk",
              label: i18n.t("Property Based Deals"),
              labelStyle: { fontFamily: "Montserrat_600SemiBold" },
            },
            {
              value: "train",
              label: i18n.t("Customer Based Deals"),
              labelStyle: { fontFamily: "Montserrat_600SemiBold" },
            },
          ]}
        />
      </SafeAreaView>

      <View>
        {value === "walk" ? (
          loading ? (
            <ActivityIndicator
              size="large"
              color="#007bff"
              style={{ marginTop: 300 }}
            />
          ) : properties.length > 0 ? (
            <View>
              <View
                style={[
                  {
                    backgroundColor: "#4184AB",
                    padding: 10,
                    elevation: 2,
                  },
                  styles.text,
                ]}
              >
                <TextInput
                  placeholder={i18n.t("Search by Property Name")}
                  style={[
                    {
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "white",
                    },
                    styles.text,
                  ]}
                  placeholderTextColor={"black"}
                  value={propertyName1}
                  onChangeText={(value) => {
                    handlePropertySearch(value);
                  }}
                />
              </View>
              <FlatList
                data={filterPropertyDeals}
                renderItem={PropertyDealCard}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <Text style={[styles.text, { color: "red", marginTop: 300 }]}>
              No Properties Found
            </Text>
          )
        ) : proploading ? (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={{ marginTop: 300 }}
          />
        ) : deals.length > 0 ? (
          <View>
            <View
              style={{ backgroundColor: "#4184AB", padding: 10, elevation: 2 }}
            >
              <TextInput
                placeholder={i18n.t("Search by Customer Name")}
                style={[
                  {
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: "white",
                  },
                  styles.text,
                ]}
                placeholderTextColor={"black"}
                value={customerName}
                onChangeText={(value) => {
                  handleCustomerSearch(value);
                }}
              />
            </View>
            <FlatList data={filteredCustomers} renderItem={CustomerDealCard} />
          </View>
        ) : (
          <Text
            style={[
              styles.text,
              { color: "red", marginTop: 300, marginLeft: 50 },
            ]}
          >
            No Customers Found
          </Text>
        )}

        <View style={styles.overlayButtonContainer}>
          <TouchableOpacity
            style={styles.overlayButton}
            onPress={() => navigation.navigate("createDeal")}
          >
            <Text style={styles.overlayButtonText}>
              <Feather name="plus" size={20} color="white" /> {i18n.t("Create Deal")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showDeals}
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "flex-start",
          marginTop: 0,
        }}
      >
        <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
          <View
            style={{ marginTop: 10, marginBottom: 10, flexDirection: "row" }}
          >
            <Text
              style={[
                styles.text,
                { fontWeight: "bold", fontSize: 20, marginLeft: 80 },
              ]}
            >
              Deal Details
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#b5b8ba",
                position: "absolute",
                right: 10,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => setShowDeals(false)}
            >
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="PhoneNumber"
            keyboardType="numeric"
            style={styles.input}
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
          />

          {/* <DropDownPicker
         open={dropDownOpen1}
         value={propertyName}
          items={items}
          
         setOpen={setDropDownOpen1}
 onSelectItem={(value)=>handleDropDown(value)}
        /> */}

          <DropDownPicker
            open={dropDownOpen1}
            value={propertyName}
            items={dropdownProps}
            labelStyle={{ fontFamily: "Montserrat_500Medium" }}
            setOpen={setDropDownOpen1}
            setValue={setPropertyName} // Optional if you want to set value directly
            onSelectItem={(item) => handleDropDown(item)} // 'item' should be the selected object
          />

          <TextInput
            placeholder="Expected Price"
            keyboardType="numeric"
            style={styles.input}
            value={ExpectedPrice}
            onChangeText={(value) => setExpectedPrice(value)}
          />

          <Text style={styles.text}>Interested In</Text>
          <RadioButton.Group
            value={interest}
            onValueChange={(newValue) => setIntrest(newValue)}
          >
            <View style={[styles.text, styles.radioContainer]}>
              <RadioButton value="Yes" color="blue" />

              <PaperText style={styles.text}>Yes</PaperText>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="No" color="blue" />

              <PaperText style={styles.text}>No</PaperText>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="Pending" color="blue" />

              <PaperText style={styles.text}>Pending</PaperText>
            </View>
          </RadioButton.Group>

          <TextInput
            placeholder="Comments"
            multiline
            numberOfLines={4}
            style={[
              styles.text,
              { borderWidth: 1, borderRadius: 10, padding: 10 },
            ]}
            value={comments}
            onChangeText={(value) => setComments(value)}
          />

          <View style={[styles.text, { marginVertical: 10 }]}>
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CsrDeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingBottom: 50,
  },
  listContainer: {
    padding: 5,
    marginTop: 5,
  },
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
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
    fontFamily: "Montserrat_700Bold",
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
  },
  text: {
    fontFamily: "Montserrat_700Bold",
  },
  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  overlayButtonContainer: {
    position: "absolute", // Ensure it's positioned relative to the parent
    top: 650, // Adjust as needed
    right: 10, // Adjust as needed
    zIndex: 1, // Ensure it stays on top of other elements
  },
  overlayButton: {
    backgroundColor: "#368ca8", // Or your button style
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
    fontFamily: "Montserrat_700Bold",
  },
});
