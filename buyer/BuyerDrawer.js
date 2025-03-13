// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Welcomepage } from './Welcomepage';
// import { AllPropertiesList } from './AllPropertiesList';
// import HomePage from '../HomePage';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const Tab = createBottomTabNavigator();

// export const MarketingHome = () => {
//   return (
//     <View style={styles.container}>
//       {/* Top Navigation Bar */}
//       <View style={styles.topNav}>
//         <Text style={styles.title}>Marketing Home</Text>
//       </View>

//       {/* Main Content with Bottom Tab Navigator */}
//       <View style={styles.mainContent}>
//         <Tab.Navigator
//           screenOptions={({ route }) => ({
//             headerShown: false, // Hides header for individual tabs
//             tabBarIcon: ({ color, size }) => {
//               let iconName;

//               // Define icons for each route
//               if (route.name === 'Home') {
//                 iconName = 'home';
//               } else if (route.name === 'AllProperties') {
//                 iconName = 'list';
//               } else if (route.name === 'home') {
//                 iconName = 'dashboard';
//               }

//               // Return the icon component
//               return <Icon name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: '#4CAF50', // Active icon color
//             tabBarInactiveTintColor: 'gray', // Inactive icon color
//           })}
//         >
//           <Tab.Screen name="Home" component={Welcomepage} />
//           <Tab.Screen name="AllProperties" component={AllPropertiesList} />
//           <Tab.Screen name="home" component={HomePage} />
//         </Tab.Navigator>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   topNav: {
//     height: 60,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   mainContent: {
//     flex: 1,
//   },
// });
// ---------------------------------------------------------
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// Import your screens
// import HomeScreen from './HomeScreen';
// import ProfileScreen from './ProfileScreen';
// import SettingsScreen from './SettingsScreen';
import HomePage from "../HomePage";
import { ViewpropbyCSR } from "../Csr/ViewpropbyCSR";
// import { Welcomepage } from './Welcomepage';
// import { AllPropertiesList } from './AllPropertiesList';
// import { MaterialIcons } from '@expo/vector-icons'; // Import icons
import { MaterialIcons, Foundation } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EntryBuyer from "./EntryBuyer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LoginScreen from "../Login";
// import { AllPropertiesList } from '../MarketingAgent/AllPropertiesList';
import AllPropertiesList1 from "./AllPropertiesList1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImIntrested from "./ImIntrested";
import PropertyDetailsScreen from "../Screens/PropertyDetails";
import BuyerProfile from "./BuyerProfile";
import BuyerMeetings from "./BuyerMeetings";
import Myintersted from "./Myintersted";
import Premium from "./Premium";
import PlansScreen from "./PlansScreen";
import OnlyAgriculture from "./OnlyAgriculture";
import OnlyCommercial from "./OnlyCommercial";
import OnlyResidential from "./OnlyResidential";
import OnlyLayout from "./OnlyLayout";
import Notification from "./Notification";
import BuyerDeals from "./buyerDeals";
import i18n from "../i18n";
import PropertyDetailsScreenBuyer from "../Screens/PropertyDetailsBuyer";
import BuyerNewDeals from "./newDeals";
import { Picker } from "@react-native-picker/picker";

// Create Bottom Tabs
const Tab = createBottomTabNavigator();
// const BottomTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={Welcomepage} options={{headerShown:false}} />
//     <Tab.Screen name="Properties" component={AllPropertiesList}  options={{headerShown:false}}/>
//             <Tab.Screen name="home" component={HomePage} options={{headerShown:false}} />

//   </Tab.Navigator>
// );

// Create Drawer Navigator
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="EntryBuyer">
      <Stack.Screen
        name="EntryBuyer"
        component={EntryBuyer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImIntrested"
        component={ImIntrested}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Propdetails"
        component={PropertyDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnlyAgriculture"
        component={OnlyAgriculture}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnlyCommercial"
        component={OnlyCommercial}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="propertyDetailsBuyer"
        component={PropertyDetailsScreenBuyer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OnlyResidential"
        component={OnlyResidential}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="OnlyLayout"
        component={OnlyLayout}
        options={{ headerShown: false }}
      />
      {/* BuyerMeetings
       */}
      <Stack.Screen
        name="PlansScreen"
        component={PlansScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AllPropertiesList1"
        component={AllPropertiesList1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Premium"
        component={Premium}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyerMeetings"
        component={BuyerMeetings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Myintersted"
        component={Myintersted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Deals"
        component={BuyerNewDeals}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// const BottomTabs = () => (

//     <Tab.Navigator>
//         <Tab.Screen
//             name="Home"
//             //   component={HomePage}
//             // component={EntryBuyer}
//             component={MyStack}
//             options={{
//                 headerShown: false,
//                 tabBarIcon: ({ color, size }) => (
//                     <MaterialIcons name="home" size={24} color={color} />
//                 ),
//             }}
//         />
//         <Tab.Screen
//             name="Properties"
//             //   component={EntryBuyer}
//             component={AllPropertiesList1}
//             options={{
//                 headerShown: false,
//                 tabBarIcon: ({ color, size }) => (
//                     <MaterialIcons name="business" size={24} color={color} />
//                 ),
//             }}
//         />
//          <Tab.Screen
//             name="Meetings"
//             //   component={HomePage}
//             // component={EntryBuyer}
//             component={BuyerMeetings}
//             options={{
//                 headerShown: false,
//                 tabBarIcon: ({ color, size }) => (
// <FontAwesome name="calendar-o" size={24} color="black" />             ),
//             }}
//         />
//         <Tab.Screen
//             name="Profile"
//             component={BuyerProfile}
//             options={{
//                 headerShown: false,
//                 tabBarIcon: ({ color, size }) => (
// <FontAwesome name="user-circle-o" size={24}  color={color} />                )
//             }}
//         />
//     </Tab.Navigator>

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "black", // Active tab icon color (white)  #ffffff
      tabBarInactiveTintColor: "#ffffff", // Inactive tab icon color (gray)
      tabBarStyle: {
        backgroundColor: "#4184AB", // Sets the background color of the entire bottom tab bar
      },
    }}
  >
    <Tab.Screen
      name={i18n.t("Home")}
      //   component={HomePage}
      // component={EntryBuyer}
      component={MyStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={i18n.t("Properties")}
      //   component={EntryBuyer}
      component={AllPropertiesList1}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="business" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={i18n.t("Meetings")}
      //   component={HomePage}
      // component={EntryBuyer}
      component={BuyerMeetings}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="calendar-o" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={i18n.t("Profile")}
      component={BuyerProfile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user-circle-o" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
// );
const Drawer = createDrawerNavigator();
export const BuyerDrawer = ({ navigation }) => {
  const navigation1 = useNavigation();
  const [userName, setUserName] = useState("Main"); // Default title

  const [selectedLanguage, setSelectedLanguage] = useState("English");

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

    changeLanguage(lang === "English" ? "en" : "te");
  };
  const logout = async () => {
    console.log("Logout pressed1243");
    navigation1.navigate("Home");

    await AsyncStorage.clear().then(() => {
      console.log("cleared");
    });
    navigation1.navigate("Home");
  };

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };
  // Fetch the username from AsyncStorage
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const name = await AsyncStorage.getItem("firstName");
        if (name) {
          setUserName(name);
        } else {
          console.log("No user name found");
        }
      } catch (error) {
        console.error("Error retrieving user name:", error);
      }
    };
    fetchUsername();
    loadLanguage();
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen
          name={i18n.t("Main")}
          component={BottomTabs}
          options={{
            headerTitle: () => (
              // <Text style={{right:50,fontSize:30,fontWeight:'bold',color:'white'}}>Hello {userName}!  {'\u{1F44B}'}
              // </Text>
              //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              //   <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white',left:-15 }}>
              //     Hello {userName}
              //   </Text>

              // </View>

              <View style={styles.dropdownWrapper1}>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue) => handlePress1(itemValue)}
                  style={styles.picker1}
                  itemStyle={{ fontFamily: "Montserrat_500Medium" }}
                >
                  <Picker.Item label="English" value="English" />
                  <Picker.Item label="Telugu" value="Telugu" />
                </Picker>
              </View>
            ),
            headerStyle: { backgroundColor: "#4184AB" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerRight: () => (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <TouchableOpacity
                  style={{ marginHorizontal: 5 }}
                  on
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                >
                  {/* <MaterialIcons name="interests" size={24} color="white" />
                   */}
                  <MaterialIcons name="notifications" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 5 }}
                  on
                  onPress={() => {
                    navigation.navigate("Myintersted");
                  }}
                >
                  {/* <MaterialIcons name="interests" size={24} color="white" />
                   */}
                  <MaterialIcons name="favorite" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 6 }}
                  onPress={() => {
                    navigation.navigate("Premium");
                  }}
                >
                  {/* <Foundation name="calendar" size={24} color="white" />
                   */}
                  {/* <Entypo name="star" size={24} color="white" /> */}
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="white"
                  />
                  {/* <MaterialIcons name="crown" size={24} color="black" /> */}
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ marginHorizontal: 5 }}>
                          <MaterialIcons name="logout" size={24} color="white" />
                        </TouchableOpacity> */}
              </View>
            ),
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" size={size} color={color} />
            ),
          }}

          // options={{
          //     headerTitle: `Hello ${userName}` , // Display the user's name in the header
          // }}
        />
        <Drawer.Screen name={i18n.t("Profile")} component={BuyerProfile} />
        {/* <Stack.Screen name="BuyerProfile" component={BuyerProfile}/> */}

        <Drawer.Screen name={i18n.t("Deals")} component={BuyerNewDeals} />

        <Drawer.Screen
          name={i18n.t("Logout")}
          component={HomePage}
          listeners={{
            focus: () => {
              logout();
            },
          }}
        />
        {/* <Drawer.Screen name="Settings" component={ViewpropbyCSR} /> */}

        {/* <Drawer.Screen name={i18n.t("Main")}component={BottomTabs} 
                 options={{
                    headerTitle: () => 
                 
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white',left:-15 }}>
                      Hello {userName}
                    </Text>
                    
                  </View>
                  
                  }} />
                 */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// export default/ MarketingHome;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#dedede",
    borderTopWidth: 1,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    paddingTop: 15,
  },
  dropdownWrapper1: {
    marginVertical: 10, // Optional, if you want to add space before the dropdown
    backgroundColor: "#fff",
    width: 140,
    borderRadius: 5,
  },
  picker1: {
    height: 50,
    width: 150,
    // marginLeft: 10,
    // marginRight: 10,
  },
});
