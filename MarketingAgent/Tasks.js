import { TrophyFilled } from "@ant-design/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import i18n from "../i18n";
function Tasks() {
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [dropdownProps, setDropdownProps] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [prop, setProp] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedate, setSelectedDate] = useState(new Date());
  const [selectedProp, setSelectedProp] = useState({});
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [showChooseDate1, setShowChooseDate1] = useState(false);
  const [seachData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [date1, setDate1] = useState(new Date());
  useEffect(() => {
    fetchCustomers();
    fetchProperties();
    loadLanguage();
    setStatus([
      { label: "Intrested", value: "Intrested" },
      { label: "Not Intrested", value: "Not Intrested" },
      { label: "Pending", value: "Pending" },
      { label: "Reschedule", value: "Reschedule" },
    ]);
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const decoded = jwtDecode(token);
      setLoading(true);
      const userId = decoded.user.userId;
      const date = new Date();
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
          console.log("response", resp.data.data);
          setCustomers(resp.data.data);
          setFilteredData(resp.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (selectedStatus === "Reschedule") {
      setShowDatePicker(true);
    }
  }, [selectedStatus]);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  const handleConfirmStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setSelectedDate(currentTime);
    setShowDatePicker(false);
  };

  const fetchProperties = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const decoded = jwtDecode(token);

      const userId = decoded.user.userId;
      const date = new Date();
      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/assignedProperty/${userId}/6?assignedDate=${date}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          console.log("response", resp.data);
          setProperties(resp.data.data);

          const propertyData = resp.data.data;

          const dropdownData = propertyData.map((property) => {
            return {
              label: `${property.landTitle} - ${property.propertyType}`,
              value: property.propertyId,
              key: property.propertyId,
            };
          });
          console.log("dropDownData", dropdownData);

          setDropdownProps(dropdownData);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const COLORS = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#A833FF",
    "#FFC300",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#28B463",
    "#2E86C1",
    "#8E44AD",
    "#D35400",
  ];

  const getBackgroundColor = (initials) => {
    if (!initials) return "#CCC"; // Default color for missing initials
    const charCodeSum = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    return COLORS[charCodeSum % COLORS.length];
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

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const data = {
        assignmentId: selectedCustomer.assignmentId,
        customerId: selectedCustomer.customerId,
        description: description,
        location: selectedCustomer.district,
        property: prop,
        price: selectedProp[0].price,
        size: selectedProp[0].size,
        status: selectedStatus,
      };
      console.log(data);
      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/updateCustomerStatus`,
        {
          method: "put",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const handleStatus = async (val) => {
    console.log;
    setSelectedStatus(val);
    if (val === "Reschedule") {
      setShowDatePicker(true);
    }
  };

  const handleDropDown = (item) => {
    console.log("item", item, item.value);

    setPropertyId(item.value);
    setPropertyName(item.label);

    //     const data=properties.filter((props)=>{
    //         props.propertyId===item.value
    //     }).map((props)=>(
    //    {     "landTitle":props.landTitle,
    //         "propertyId":props.propertyId,
    //         "propertyType":props.propertyType
    // }
    //     ))
    const data = properties
      .filter((props) => props.propertyId === item.value) // Ensure filtering works correctly
      .map((props) => ({
        landTitle: props.landTitle,
        propertyId: props.propertyId,
        propertyType: props.propertyType,
      }));

    const data1 = properties.filter((p) => p.propertyId === item.value);
    console.log(data1);
    setSelectedProp(data1);
    console.log("daatsd", data);
    setProp(data);
  };

  const handleModel = (item) => {
    setShowModal(true);
    setSelectedCustomer(item);
  };

  const handleSearch = (text) => {
    setSearchData(text);
    if (text === "") {
      setFilteredData(customers);
    } else {
      const data = customers.filter((cust) => {
        return cust.name.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredData(data);
    }
  };

  const searchOnDate = async (event, date) => {
    try {
      console.log(date);
      setDate1(date);
      setShowChooseDate1(false);
      const token = await AsyncStorage.getItem("userToken");
      const decoded = jwtDecode(token);

      const userId = decoded.user.userId;
      // const date = new Date();
      console.log(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/getAssignedCustomers/${userId}/6?assignedDate=${date}`
      );
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
          console.log("response", resp.data);
          setFilteredData(resp.data.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderCard = ({ item }) => {
    const initials = `${item.name?.charAt(0)}`.toUpperCase();
    const bgColor = getBackgroundColor(initials); // Assign color based on initials

    return (
      <View style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.text}>
            <MaterialCommunityIcons name="email" size={20} color="#4184AB" />{" "}
            {item.email}
          </Text>
          <Text style={styles.text}>
            <FontAwesome6 name="whatsapp" size={20} color="#4184AB" />{" "}
            {formatPhoneNumber(item.phone)}
          </Text>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color="#4184AB"
            />
            {item.district}
          </Text>
        </View>
        <View style={[styles.profileIcon, { backgroundColor: bgColor }]}>
          <Text style={styles.profileText}>{initials}</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={(value) => handleModel(item)}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {i18n.t("Tracking Details")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={"#007bff"}
          style={{ marginVertical: 300 }}
        />
      ) : (
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#4184AB",
              padding: 10,
              elevation: 2,
            }}
          >
            <TextInput
              placeholder={i18n.t("Search by Name")}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                width: 200,
                backgroundColor: "white",
                fontSize: 16,
              }}
              placeholderTextColor={"black"}
              value={seachData}
              onChangeText={(value) => {
                handleSearch(value);
              }}
            />

            <TouchableOpacity
              style={styles.closeModalButton1}
              onPress={() => {
                setShowChooseDate1(true);
              }}
            >
              <Text style={styles.closeModalButtonText1}>
                {date1.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showChooseDate1 && (
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

          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={renderCard}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}

            />
          ) : (
            <Text style={{ color: "red", marginVertical: 300, marginHorizontal:120 }}>
              {i18n.t("No Assigned Customers")}
            </Text>
          )}
        </View>
      )}

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{i18n.t("Details")}</Text>

            <DropDownPicker
              open={open}
              value={propertyId}
              items={dropdownProps}
              setOpen={setOpen}
              placeholder={i18n.t("Select a Property")}
              setValue={setPropertyId}
              onSelectItem={handleDropDown}
              style={[styles.dropdown, { marginVertical: 10, zIndex: 1 }]}
            />

            <DropDownPicker
              open={open1}
              value={selectedStatus}
              placeholder={i18n.t("Status")}
              items={status}
              setOpen={setOpen1}
              setValue={setSelectedStatus}
              style={[styles.dropdown, { marginVertical: 10, zIndex: 1 }]}
            />

            <TextInput
              placeholder={i18n.t("Description")}
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
              numberOfLines={4}
            />

            {selectedStatus === "Reschedule" && showDatePicker && (
              <View>
                <Text>{selectedate.toDateString()}</Text>
                <DateTimePicker
                  value={selectedate}
                  mode="date"
                  display="default"
                  onChange={handleConfirmStartTime}
                />
              </View>
            )}

            <View style={styles.buttonRow}>
              <View style={{ marginHorizontal: 10 }}>
                <Button title={i18n.t("Submit")} onPress={handleSubmit} />
              </View>
              <View>
                <Button title={i18n.t("Close")} onPress={() => setShowModal(false)} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Tasks;

const styles = StyleSheet.create({
  closeModalButtonText1: {
    marginTop: 5,
    fontSize: 16,
    marginLeft: 30,
    color: "black",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 110,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",

    marginTop: 10,
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 60,
    backgroundColor: "#d5e2e8",
  },
  card: {
    flexDirection: "row", // Align profile icon and details in a row
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it circular
    backgroundColor: "#007bff", // Blue background
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Space between icon and details
    position: "absolute",
    top: 20,
    right: 10,
  },
  profileText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    flex: 1, // Take remaining space
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  button: {
    position: "absolute",
    top: 15,
    right: 10,
    backgroundColor: "#048bd4",
    padding: 8,
    borderRadius: 10,
  },

  closeModalButton1: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: 150,
  },
});
