import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import i18n from "../i18n";

function AuctionForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showChooseDate, setShowChooseDate] = useState(false);
  const [showChooseDate1, setShowChooseDate1] = useState(false);
  const [initialBid, setInitialBid] = useState(0);
  const [open, setOpen] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState([]);
  const [dropdownProps, setDropdownProps] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showTimePicker1, setShowTimePicker1] = useState(false);

  const [dateError, setDateError] = useState("");

  const [auctionType, setAuctionType] = useState(" ");

  const navigation = useNavigation();
 
  useEffect(()=>{
 loadLanguage()
  },[])

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language", savedLanguage);
    // setSavedLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };


  const handleDateChange = (event, selectedDate) => {
    setStartDate(selectedDate);
    setShowChooseDate(false);
    setShowTimePicker(true);
  };

  const handleDateChange1 = (event, selectedDate) => {
    setEndDate(selectedDate);
    setShowChooseDate1(false);
    setShowTimePicker1(true);
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setStartDate(selectedTime);

      console.log(selectedTime);
      setShowTimePicker(false);
    }
  };

  const onTimeChange1 = (event, selectedTime) => {
    if (selectedTime) {
      setEndDate(selectedTime);

      console.log(selectedTime);
      setShowTimePicker1(false);
    }
  };

  const handleDropDown = (item) => {
    setPropertyId(item.value);
    setPropertyName(item.label);

    const prop = properties.filter((pro) => pro._id === item.value);

    if (prop[0].propertyType === "Commercial") {
      const bid =
        Number(
          prop[0].propertyDetails.landDetails.sell.totalAmount ||
            prop[0].propertyDetails.landDetails.rent.totalAmount ||
            prop[0].propertyDetails.landDetails.lease.totalAmount
        ) *
        (10 / 100);
      setInitialBid(bid);
    }
    if (prop[0].propertyType === "Residential") {
      const bid = Number(prop[0].propertyDetails.totalCost) * (10 / 100);
      setInitialBid(bid);
    }
    if (prop[0].propertyType === "Layout") {
      const bid = Number(prop[0].layoutDetails.totalAmount) * (10 / 100);
      setInitialBid(bid);
    }
    if (prop[0].propertyType === "Agricultural land") {
      const bid = Number(prop[0].landDetails.totalPrice) * (10 / 100);
      setInitialBid(bid);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const decoded = jwtDecode(token);
      const userId = decoded.user.userId;

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/property/getpropbyid/${userId}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          const propertyData = resp.data;

          const dropdownData = propertyData
            .filter((property) => property.auctionStatus === "InActive")
            .map((property) => {
              const title =
                property.propertyTitle ||
                property.landDetails?.title ||
                property.layoutDetails?.layoutTitle ||
                property.propertyDetails?.apartmentName ||
                "Unknown Property";

              return {
                label: `${title} - ${property.propertyType}`,
                value: property._id,
                key: property._id,
              };
            });

          setProperties(resp.data);
          setDropdownProps(dropdownData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const validateForm = () => {
    if (startDate > endDate) {
      setDateError("Starttime should be less than end time");
    }
  };

  const reset = () => {
    setInitialBid(0);

    setEndDate(new Date());
    setPropertyId("");
    setAuctionType(" ");
    setStartDate(new Date());
  };
  const handleAuction = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const data = {
        amount: initialBid,
        auctionStatus: "active",
        endDate: endDate,
        propertyId: propertyId,
        startDate: startDate,
        auctionType: auctionType,
      };

      console.log(data);

      await axios(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/auction/postAuction`,
        {
          method: "post",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => {
          ToastAndroid.showWithGravityAndOffset(
            "Auction Started Successfully",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );

          navigation.navigate("auctionData");
          reset();
        })
        .catch((error) => {
          ToastAndroid.showWithGravityAndOffset(
            "Failed to Start Auction",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t("Start Auction")}</Text>

      <DropDownPicker
        open={open}
        value={propertyName}
        items={dropdownProps}
        setOpen={setOpen}
        setValue={setPropertyName}
        placeholder="Select Property"
        onSelectItem={handleDropDown}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        labelStyle={{ fontFamily: "Montserrat_500Medium" }}
      />

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>
          Start Time <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowChooseDate(true)}
        >
          <Text style={styles.dateButtonText}>
            {startDate.toLocaleString()}
          </Text>
        </TouchableOpacity>
        {showChooseDate && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={startDate}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>
          {i18n.t("End Time")} <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowChooseDate1(true)}
        >
          <Text style={styles.dateButtonText}>{endDate.toLocaleString()}</Text>
        </TouchableOpacity>
        {showChooseDate1 && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleDateChange1}
          />
        )}

        {showTimePicker1 && (
          <DateTimePicker
            value={endDate}
            mode="time"
            display="default"
            onChange={onTimeChange1}
          />
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>
          {i18n.t("Initial Bid")} <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          value={String(initialBid)}
          onChangeText={(value) => setInitialBid(Number(value))}
          placeholder="Enter Initial Bid"
          placeholderTextColor="black"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.pickerWrapper1}>
        <Picker
          selectedValue={auctionType}
          style={[styles.picker]}
          onValueChange={(itemValue) => setAuctionType(itemValue)}

          itemStyle={{    fontFamily: "Montserrat_500Medium",
          }}
        >
          <Picker.Item label={i18n.t("Public")} value="public" />
          <Picker.Item label={i18n.t("Private")} value="private" />
          <Picker.Item label={i18n.t("Auction Type")} value=" " />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAuction}>
        <Text style={styles.buttonText}>{i18n.t("Start Auction")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AuctionForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
    fontFamily: "Montserrat_500Medium",
  },
  header: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",

    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",

    marginBottom: 5,
  },
  required: {
    color: "red",
    fontFamily: "Montserrat_500Medium",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: "Montserrat_500Medium",
  },
  dropdownContainer: {
    marginTop: 5,
    borderRadius: 10,
    zIndex: 10,
    fontFamily: "Montserrat_500Medium",
  },
  inputWrapper: {
    marginBottom: 20,
    fontFamily: "Montserrat_500Medium",
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    width: "100%",
    fontFamily: "Montserrat_500Medium",

    marginBottom: 10,
  },
  dateButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    fontFamily: "Montserrat_500Medium",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
  },

  pickerWrapper1: {
    fontFamily: "Montserrat_500Medium",

    height: 50,
    width: "100%",
    borderColor: "black",
    borderWidth: 0.5, // Apply border to wrapper instead of the Picker
    borderRadius: 5, // Optional, to round the corners
    // justifyContent: "center", // Vertically center the text
    // alignItems: "center", // Horizontally center the text
    // marginBottom: 10,
  },
});
