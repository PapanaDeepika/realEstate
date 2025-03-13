import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useSSR } from "react-i18next";
import i18n from "../i18n";
import { Picker } from "@react-native-picker/picker";

const drawerItems = [
  {
    icon: "account-group",
    label: "Customers",
    route: "myCustomers",
    color: "#008080",
  }, // Teal
  {
    icon: "playlist-check",
    label: "Tasks",
    route: "mrTasks",
    color: "#FF7F50",
  }, // Coral
  // {
  //   icon: "information",
  //   label: "CSR Info",
  //   route: "Appointments",
  //   color: "#4169E1",
  // }, // Royal Blue
  {
    icon: "home-city",
    label: "My Properties",
    route: "myProps",
    color: "#228B22",
  }, // Forest Green
  // { icon: "calendar", label: "Calendar", route: "cal", color: "#0791fa" },
];

const MarketingAgentDrawerContent = (props) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    // Implement logout functionality here
    console.log("Logout pressed");
    await AsyncStorage.clear().then(() => {
      console.log("cleared");
    });
    navigation.navigate("Login");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = async (lang) => {
    i18n.locale = lang;

    console.log(lang);
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  const handlePress1 = (lang) => {
    // setOn(!on); // This will toggle the state
    // setTitle(on ? "English" : "Telugu");
    setSelectedLanguage(lang);

    changeLanguage(lang);
  };

  useEffect(() => {
    const fetch = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const decoded = jwtDecode(token);
      const firstName = decoded.user.firstName;
      const lastName = decoded.user.lastName;
      const profileImg = decoded.user.profilePicture;
      const email = decoded.user.email;
      setFirstName(firstName);
      setLastName(lastName);
      setProfile(profileImg);
      setEmail(email);
    };

    fetch();
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: profile,
              }}
              size={70}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Title style={styles.title}>
                {firstName} {lastName}
              </Title>
              <Caption style={styles.caption} numberOfLines={1}>
                {email}
              </Caption>
            </View>
          </View>
          <View style={styles.drawerSection}>
            {drawerItems.map((item, index) => (
              <DrawerItem
                key={index}
                icon={({ color, size }) => (
                  <Icon name={item.icon} color={item.color} size={size} />
                )}
                label={i18n.t(item.label)}
                onPress={() => props.navigation.navigate(item.route)}
              />
            ))}
          </View>
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomDrawerSection}>
        <View style={styles.dropdownWrapper1}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handlePress1(itemValue)}
            style={styles.picker1}
            itemStyle={{ fontFamily: "Montserrat_500Medium" }}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Telugu" value="te" />
          </Picker>
        </View>
      </View>

      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label={i18n.t("Logout")}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    fontFamily: "Montserrat_500Medium",
  },
  drawerContent: {
    flex: 1,
    fontFamily: "Montserrat_500Medium",
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    fontFamily: "Montserrat_500Medium",
  },
  avatar: {
    marginRight: 15,
    fontFamily: "Montserrat_500Medium",
  },
  userInfo: {
    flexDirection: "column",
    fontFamily: "Montserrat_500Medium",
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    // fontWeight: "bold",
    fontFamily: "Montserrat_600SemiBold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    width: "100%",
    fontFamily: "Montserrat_500Medium",
  },
  drawerSection: {
    marginTop: 15,
    fontFamily: "Montserrat_500Medium",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#dedede",
    borderTopWidth: 1,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    fontFamily: "Montserrat_500Medium",

    paddingTop: 15,
  },
});

export default MarketingAgentDrawerContent;
