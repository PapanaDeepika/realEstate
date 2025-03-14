import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import i18n from "../i18n";



function SurveyData() {
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading1, setLoading1] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

   useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading1) return;   
    setLoading1(true);
    try {
      if(page===1)
      {
      setLoading(true);
      }
      const token = await AsyncStorage.getItem("userToken");
      // const response = await axios.get("https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/customer/getSurveyData",
      const response = await axios.get(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//customer/getSurveyData?page=${page}&limit=8`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response.data", response.data);
      const data = response.data;
      if (data.length < 2) {
        setHasMoreData(false);
      }
      setSurveyData(response.data);
      setPage((prevPage) => prevPage + 1);
      setFilteredData((prevData) => [...prevData, ...data]);
      setLoading1(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setLoading1(false)
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

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredData(surveyData);
    }
    const data = surveyData.filter((survey) => {
      return (
        survey.firstName.toLowerCase().includes(text.toLowerCase()) ||
        survey.lastName.toLowerCase().includes(text.toLowerCase()) ||
        survey.district.toLowerCase().includes(text.toLowerCase()) ||
        survey.mandal.toLowerCase().includes(text.toLowerCase())
      );
    });
    console.log(text, data);

    setFilteredData(data);
  };

  const renderCard = ({ item }) => {
    const initials = `${item.firstName?.charAt(0) || ""}${
      item.lastName?.charAt(0) || ""
    }`.toUpperCase();
    const bgColor = getBackgroundColor(initials); // Assign color based on initials

    return (
      <View style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.text}>
            <MaterialCommunityIcons name="email" size={20} color="#4184AB" />{" "}
            {item.email}
          </Text>
          <Text style={styles.text}>
            <FontAwesome6 name="whatsapp" size={20} color="#4184AB" />{" "}
            {formatPhoneNumber(item.phoneNumber)}
          </Text>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color="#4184AB"
            />{" "}
            {item.district}, {item.state}, {item.country}
          </Text>
        </View>
        <View style={[styles.profileIcon, { backgroundColor: bgColor }]}>
          <Text style={styles.profileText}>{initials}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.text1,
          { backgroundColor: "#4184AB", padding: 10, elevation: 2 },
        ]}
      >
        <TextInput
          placeholder={i18n.t("Search by name & location")}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: "white",
            fontFamily: "Montserrat_500Medium",

          }}
          placeholderTextColor={"black"}
          value={searchText}
          onChangeText={(value) => handleSearch(value)}
        />
      </View>

      {loading ? (
        <View style={{ marginVertical: 280 }}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}

            renderItem={renderCard}
            keyExtractor={(item) => item._id} // Ensure unique keys for each item
            onEndReached={() => {
              if (hasMoreData) {
                fetchData();
              }
            }}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              loading1 ? (
                <ActivityIndicator size="large" color="#007bff" />
              ) : null
            }
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    paddingBottom: 50,
    fontFamily: "Montserrat_700Bold",
  },
  card: {
    flexDirection: "row", // Align profile icon and details in a row
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#8b8b8f",
    shadowOpacity: 10,
    // shadowRadius: 4,
    elevation: 24,
    fontFamily: "Montserrat_700Bold",
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 25, // Make it circular
    backgroundColor: "#007bff", // Blue background
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Space between icon and details
    position: "absolute",
    top: 20,
    right: 10,
    fontFamily: "Montserrat_700Bold",
  },
  profileText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_500Medium",
  },
  details: {
    flex: 1, // Take remaining space
    fontFamily: "Montserrat_500Medium",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Montserrat_700Bold",
  },
  text: {
    fontSize: 17,
    marginVertical: 5,
    color: "#000",
    fontFamily: "Montserrat_600SemiBold",
  },
  text1: {
    fontFamily: "Montserrat_700Bold",
  },
});

export default SurveyData;
