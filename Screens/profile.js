import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import i18n from "../i18n";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);
  const [language, setLanguage] = useState(i18n.locale);

  const navigation = useNavigation();

  const handlePress1 = (lang) => {
    // setOn(!on); // This will toggle the state
    // setTitle(on ? "English" : "Telugu");
    setSelectedLanguage(lang);

    changeLanguage(lang);
  };

  const handleLogout = async () => {
    navigation.navigate("Home");
    await AsyncStorage.clear();
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    console.log("value", value, profile);
    const cleanedValue = value;

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

  const changeLanguage = async (lang) => {
    i18n.locale = lang;

    console.log(lang);
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.userId;
      console.log("USER", token);
      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/users/getprofile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Fetched profile data:", data);
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setLoading(false);
    }
  };

  return (
    <View>
      {/* Top Bar */}
      <View style={styles.topbar}></View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: profile.profilePicture }}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.infoText}>{profile.email}</Text>
        <Text style={styles.infoText}>{profile.phoneNumber}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("editMyProfile");
          }}
        >
          <Text style={styles.edit}>{i18n.t("Edit Your Profile")}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("changePassword");
        }}
      >
        <View style={[styles.card1, { marginTop: 20, flexDirection: "row" }]}>
          <Text style={styles.text}>
            <Icon name="lock-reset" color={"black"} size={22} />{" "}
            {i18n.t("Change Password")}{" "}
          </Text>
          <View style={{ position: "absolute", right: 10, top: 25 }}>
            <AntDesign name="right" size={16} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={[styles.card1, { flexDirection: "row" }]}>
        <Text style={[styles.text, { marginTop: 10 }]}>
          <Icon name="translate" color={"black"} size={22} />{" "}
          {i18n.t("Change Language")}
        </Text>

        <View style={styles.dropdownWrapper1}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handlePress1(itemValue)}
            style={styles.picker1}
            itemStyle={{ fontFamily: "Montserrat_500Medium" }}
          >
            <Picker.Item
              label="English"
              value="en"
              style={{ fontFamily: "Montserrat_500Medium" }}
            />
            <Picker.Item
              label="Telugu"
              value="te"
              style={{ fontFamily: "Montserrat_500Medium" }}
            />
          </Picker>
        </View>
      </View>

      <View style={styles.card1}>
        <Text style={styles.text}>
          <Icon name="help-circle-outline" color={"black"} size={22} />{" "}
          {i18n.t("Help")}
        </Text>
        <View style={{ position: "absolute", right: 10, top: 25 }}>
          <AntDesign name="right" size={16} color="black" />
        </View>
      </View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <View style={styles.card1}>
          <Text style={styles.text}>
            {" "}
            <Icon name="logout" color={"black"} size={22} /> {i18n.t("Logout")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: "#4184AB",
    paddingVertical: 95,
    paddingHorizontal: 20,
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
  },
  imageContainer: {
    position: "absolute",
    top: 125,
    left: "47%",
    transform: [{ translateX: -45 }],
    zIndex: 10,
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
  },
  profilePicture: {
    borderRadius: 70,
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: "#fff",
    fontFamily: "Montserrat_500Medium",
  },
  cardContainer: {
    marginTop: 40,
    fontFamily: "Montserrat_500Medium",
  },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: 200,
    elevation: 5,
    padding: 20,
    //   borderRadius: 10,
    alignItems: "center",
    //   marginHorizontal: 20,
    //   marginTop: 60,
    paddingBottom: 20,
    fontFamily: "Montserrat_500Medium",
  },
  title: {
    // fontWeight: "bold",
    fontSize: 22,
    marginTop: 40,
    color: "#333",
    fontFamily: "Montserrat_700Bold",
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
  },
  card1: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginVertical: 1,
    //   borderRadius: 10,
    // alignItems: "center",
    //   marginHorizontal: 20,
    paddingBottom: 20,
    fontFamily: "Montserrat_500Medium",
  },
  edit: {
    color: "#4184AB",
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Montserrat_500Medium",
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  dropdownWrapper1: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 30,
    fontFamily: "Montserrat_500Medium",
  },
  picker1: {
    height: 50,
    width: 150,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Montserrat_500Medium",
  },
});
