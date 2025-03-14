import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import i18n from "./i18n";

import { Picker } from "@react-native-picker/picker";

const drawerItems = [
  { icon: "home", label: "Home", route: "Home", color: "#242b57" },
  // {icon:'calendar', label:'Calendar', route:'cal', color:"#0791fa"},
  {
    icon: "information",
    label: "CSR Information",
    route: "getCsr",
    color: "#4169E1",
  }, // Royal Blue
  {
    icon: "home-city",
    label: "My Properties",
    route: "myProps",
    color: "#228B22",
  }, // Forest Green
  { icon: "fire", label: "Buyer Requests", route: "br", color: "#FF7F50" }, // Coral
  {
    icon: "account-group",
    label: "Customers",
    route: "myCustomers",
    color: "#008080",
  }, // Teal
  { icon: "sale", label: "Auctions", route: "auctionData", color: "#FF7F50" },
];

const NewDrawerContent = ({ buyerSwitchToAgent, ...props }) => {
  const navigation = useNavigation();
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logout pressed");
    navigation.navigate("Login");

    AsyncStorage.clear().then(() => {
      console.log("cleared");
    });
  };

  const [language, setLanguage] = useState(i18n.locale);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [buyer, setBuyer] = useState(false);

  const [firstName,setFirstName]=useState("")
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

  const switchToBuyer = () => {
    setBuyer(true);

    navigation.navigate("buyerBottom", { switched: true });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData])
  );

  useFocusEffect(
    useCallback(() => {
      console.log("Keerthana", buyerSwitchToAgent);
      if (buyerSwitchToAgent) {
        console.log("In the use State 1");
        setBuyer(false);
      }
    }, [buyerSwitchToAgent])
  );

  const getData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const decoded = jwtDecode(token);
      const id = decoded.user.userId;
      console.log("DECODED", decoded.user);
      // setFirstName(decoded.user.firstName);
      // setLastName(decoded.user.lastName);
      // setEmail(decoded.user.email);
      // setProfile(decoded.user.profilePicture);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const abcd = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.user.firstName);
      setEmail(decodedToken.user.email);
      setProfile(decodedToken.user.profilePicture);
      const savedLanguage = await AsyncStorage.getItem("language");

      setSelectedLanguage(savedLanguage);
    };

    abcd();
  }, [selectedLanguage]);
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
              <Title style={styles.title}>{userName || "John Doe"}</Title>
              <Caption style={styles.caption} numberOfLines={1}>
                {email || "john.doe@gmail.com"}
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
                labelStyle={{ fontFamily: "Montserrat_500Medium" }}
              />
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label={i18n.t("Logout")}
          onPress={handleLogout}
          labelStyle={{ fontFamily: "Montserrat_500Medium" }}
        />
      </View>

      <View style={styles.languageSection}>
        <Text style={styles.languageText}>{i18n.t("Switch to Buyer's Agent")}</Text>
        <Switch
          value={buyer}
          onValueChange={switchToBuyer}
          thumbColor={buyer ? "#0791fa" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
      <View style={styles.bottomDrawerSection1}>
        <View>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handlePress1(itemValue)}
            style={[styles.picker1, { fontFamily: "Montserrat_500Medium" }]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
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
  },
  userInfo: {
    flexDirection: "column",
    fontFamily: "Montserrat_500Medium",
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    // fontWeight: 'bold',
    fontFamily: "Montserrat_500Medium",
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
    paddingTop: 15,
    fontFamily: "Montserrat_500Medium",
  },

  bottomDrawerSection1: {
    fontFamily: "Montserrat_500Medium",
    marginBottom: 15,
    borderTopColor: "#dedede",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    // paddingTop: 15,
  },
  languageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 15,
    fontFamily: "Montserrat_500Medium",
  },
  languageText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Montserrat_500Medium",
  },
});

export default NewDrawerContent;
