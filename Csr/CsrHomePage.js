// // import React, { useEffect, useState } from "react";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import {
// //  View,
// //  Text,
// //  StyleSheet,
// //  TouchableOpacity,
// //  ScrollView,
// //  FlatList,
// //  Image,
// //  Modal,
// // } from "react-native";
// // import { Button } from "react-native-paper";
// // import { useNavigation } from "@react-navigation/native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { Calendar, CalendarList, Agenda } from "react-native-calendars";

// // export const CsrHomePage = () => {
// //  const navigation = useNavigation();
// //  const [properties, setProperties] = useState([]);
// //  // const [selectedDate, setSelectedDate] = useState(null);
// //  const [taskDetails, setTaskDetails] = useState(null);
// //  // const [isModalVisible, setModalVisible] = useState(false);
// //  const [loading, setLoading] = useState(false);

// //  const [selectedDate, setSelectedDate] = useState(null);
// //  const [modalVisible, setModalVisible] = useState(false);

// //  // Example tasks
// //  const [tasks, setTasks] = useState({
// //  "2024-12-15": [
// //  { id: 1, name: "Meeting with John" },
// //  { id: 2, name: "Project review" },
// //  ],
// //  "2024-12-16": [{ id: 3, name: "Design discussion" }],
// //  });

// //  const handleDayPress = (day) => {
// //  const date = day.dateString;
// //  setSelectedDate(date);
// //  setModalVisible(true);
// //  };
// //  const renderTaskItem = ({ item }) => (
// //  <Text style={styles.taskItem}>• {item.name}</Text>
// //  );

// //  const fetchLayouts = async () => {
// //  try {
// //  const token = await AsyncStorage.getItem("userToken");
// //  if (!token) {
// //  console.log("No token found");
// //  return;
// //  }

// //  const response = await fetch(
// //  "http://172.17.15.184:3000/admin/getTopPropOnPrice",
// //  {
// //  method: "GET",
// //  headers: {
// //  Authorization: `Bearer ${token}`,
// //  "Content-Type": "application/json",
// //  },
// //  }
// //  );

// //  const data = await response.json();
// //  console.log("Fetched data:", data);

// //  if (Array.isArray(data)) {
// //  setProperties(data);
// //  } else {
// //  console.log("Unexpected data format:", data);
// //  }

// //  setLoading(false);
// //  } catch (error) {
// //  console.error("Error fetching layouts:", error.message);
// //  setLoading(false);
// //  }
// //  };

// //  useEffect(() => {
// //  fetchLayouts();
// //  }, []);

// //  // Dummy data for cards and agents
// //  const [scrollingCards, setScrollingCards] = useState([
// //  { id: "1", title: "prop1", image: "https://via.placeholder.com/150" },
// //  { id: "2", title: "porp2", image: "https://via.placeholder.com/150" },
// //  { id: "3", title: "prop3", image: "https://via.placeholder.com/150" },
// //  ]);
// //  const assignedAgents = [
// //  { id: "1", name: "John Doe", phone: "986673505" },
// //  { id: "2", name: "Sreedhar", phone: "986663735" },
// //  ];

// //  useEffect(() => {
// //  const interval = setInterval(() => {
// //  setScrollingCards((prev) => {
// //  const [first, ...rest] = prev;
// //  return [...rest, first];
// //  });
// //  }, 3000); // Change card every 3 seconds
// //  return () => clearInterval(interval);
// //  }, []);

// //  return (
// //  <View style={styles.container}>
// //  {/* Top Navigation Bar */}
// //  <View style={styles.topNav}>
// //  <Ionicons name="menu" size={24} color="#fff" style={styles.menuIcon} />
// //  <Text style={styles.navTitle}>Hello CSR!</Text>
// //  <Ionicons name="notifications" size={24} color="#fff" style={{marginRight:-110}}/>

// //  <Ionicons onPress={()=>{
// //  navigation.navigate('Login')
// //  }} name="exit-outline" size={24} color="#fff" style={{marginLeft:20}}/>
// //  </View>

// //  {/* Main Content */}
// //  <ScrollView style={styles.content}>
// //  {/* Small Heading above Scrolling Cards */}
// //  <View style={styles.smallHeadingContainer}>
// //  <Text style={styles.smallHeading}>Our Featured Porperties</Text>
// //  </View>

// //  {/* Auto-Scrolling Cards */}
// //  {/* <FlatList
// //  data={scrollingCards}
// //  horizontal
// //  showsHorizontalScrollIndicator={false}
// //  keyExtractor={(item) => item.id}
// //  renderItem={({ item }) => (
// //  <View style={styles.card}>
// //  <Image source={{ uri: item.image }} style={styles.cardImage} />
// //  <Text style={styles.cardText}>{item.title}</Text>
// //  </View>
// //  )}
// //  /> */}

// //  <FlatList
// //  data={properties}
// //  keyExtractor={(item) => item.propertyId}
// //  horizontal
// //  renderItem={({ item }) => (
// //  <View style={styles.card}>
// //  <Image source={{ uri: item.images[0] }} style={styles.image} />
// //  <Text style={styles.price}> ₹{item.price.toLocaleString()}</Text>
// //  <Text style={styles.district}> Location: {item.district}</Text>
// //  </View>
// //  )}
// //  />
// //  <TouchableOpacity onPress={() => navigation.navigate("ViewpropbyCSR")}>
// //  <Text style={styles.viewMoreText}>View More</Text>
// //  </TouchableOpacity>
// //  <View style={styles.backcal}>
// //  {/* Calendar */}
// //  <Calendar
// //  style={styles.calendar}
// //  markingType={"multi-dot"}
// //  markedDates={{
// //  ...Object.keys(tasks).reduce((acc, date) => {
// //  acc[date] = {
// //  dots: tasks[date].map(() => ({ key: date, color: "black" })),
// //  };
// //  return acc;
// //  }, {}),
// //  [selectedDate]: { selected: true, selectedColor: "orange" },
// //  }}
// //  onDayPress={handleDayPress}
// //  />

// //  {/* Modal for displaying tasks */}
// //  <Modal
// //  animationType="slide"
// //  transparent={true}
// //  visible={modalVisible}
// //  onRequestClose={() => setModalVisible(false)}
// //  >
// //  <View style={styles.modalOverlay}>
// //  <View style={styles.modalContent}>
// //  <Text style={styles.modalTitle}>Tasks for {selectedDate}</Text>
// //  <FlatList
// //  data={tasks[selectedDate] || []}
// //  renderItem={renderTaskItem}
// //  keyExtractor={(item) => item.id.toString()}
// //  />
// //  <TouchableOpacity
// //  style={styles.closeButton}
// //  onPress={() => setModalVisible(false)}
// //  >
// //  <Text style={styles.closeButtonText}>Close</Text>
// //  </TouchableOpacity>
// //  </View>
// //  </View>
// //  </Modal>
// //  </View>

// //  <View style={{ marginTop: 20 }}>
// //  {/* {" "} */}
// //  {/* <View style={styles.iconRow}>
// //  <TouchableOpacity style={styles.iconItem}>
// //  <Ionicons name="person" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  <TouchableOpacity style={styles.iconItem}>
// //  <Ionicons name="storefront" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  <TouchableOpacity style={styles.iconItem}>
// //  <Ionicons name="file-tray-stacked" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  <TouchableOpacity style={styles.iconItem}>
// //  <Ionicons name="storefront" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  </View> */}
// //  <View>
// //  <Text
// //  style={{
// //  fontWeight: "bold",
// //  textAlign: "center",
// //  marginVertical: 10,
// //  }}
// //  >
// //  More Categories
// //  </Text>
// //  </View>

// //  <View style={{ padding: 10 }}>
// //  {/* Icon Grid */}
// //  <View style={styles.iconGrid}>
// //  {[
// //  { name: "person-outline", label: "AssignedAgents" },
// //  { name: "person", label: "Marketing Agents" },
// //  { name: "storefront", label: "Store" },
// //  { name: "file-tray", label: "Files" },
// //  { name: "chatbox", label: "Chat" },
// //  { name: "settings", label: "Settings" },
// //  { name: "camera", label: "Camera" },
// //  { name: "notifications", label: "Alerts" },
// //  { name: "heart", label: "Favorites" },
// //  { name: "map", label: "Map" },
// //  { name: "wallet", label: "Wallet" },
// //  { name: "help-circle", label: "Help" },
// //  { name: "cart", label: "Cart" },
// //  { name: "calendar", label: "Calendar" },
// //  { name: "book", label: "Library" },
// //  { name: "add-circle", label: "Add" },
// //  ].map((item, index) => (
// //  <View key={index} style={styles.iconItem}>
// //  <Ionicons name={item.name} size={24} color="#fff" />
// //  <Text style={styles.iconLabel}>{item.label}</Text>
// //  </View>
// //  ))}
// //  </View>
// //  </View>
// //  </View>
// //  </ScrollView>

// //  {/* Bottom Navigation Bar with 4 Icons */}
// //  <View style={styles.bottomNav}>
// //  <TouchableOpacity
// //  style={styles.navItem}
// //  onPress={() => navigation.navigate("CsrAgents")}
// //  >
// //  <Ionicons name="person-sharp" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  <TouchableOpacity
// //  style={styles.navItem}
// //  onPress={() => navigation.navigate("AddProperties")}
// //  >
// //  <Ionicons name="add-circle" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  <TouchableOpacity
// //  style={styles.navItem}
// //  onPress={() => navigation.navigate("AddCSR")}
// //  >
// //  <Ionicons name="person-add" size={24} color="#fff" />
// //  </TouchableOpacity>
// //  </View>
// //  </View>
// //  );
// // };

// // const styles = StyleSheet.create({
// //  // backcal: {
// //  // backgroundColor: "black",
// //  // borderBottomRightRadius:20
// //  // },
// //  agentSection: {
// //  marginTop: 20,
// //  paddingHorizontal: 15,
// //  },
// //  sectionTitle: {
// //  fontSize: 18,
// //  fontWeight: "bold",
// //  marginBottom: 10,
// //  },
// //  agentCard: {
// //  width: 300, // Use numeric values without 'px'
// //  height: 400, // Adjust the height for the card
// //  padding: 20, // More padding inside the card
// //  backgroundColor: "#fff",
// //  borderRadius: 10,
// //  marginRight: 20, // Space between cards
// //  shadowColor: "#000",
// //  shadowOpacity: 0.1,
// //  shadowOffset: { width: 0, height: 4 },
// //  shadowRadius: 5,
// //  elevation: 3,
// //  alignItems: "center",
// //  justifyContent: "center", // Center content within the card
// //  },
// //  agentImage: {
// //  width: 150, // Adjust image size
// //  height: 150, // Adjust image size
// //  borderRadius: 75, // Circular image
// //  marginBottom: 15,
// //  },
// //  agentName: {
// //  fontSize: 18, // Larger text for the agent's name
// //  fontWeight: "bold",
// //  textAlign: "center",
// //  },
// //  agentRole: {
// //  fontSize: 16, // Larger text for the agent's role
// //  color: "#777",
// //  textAlign: "center",
// //  },
// //  iconRow: {
// //  flexDirection: "row",
// //  justifyContent: "space-around",
// //  padding: 15,
// //  backgroundColor: "#ADD8E4",
// //  borderRadius: 50,
// //  marginTop: -10,
// //  },
// //  iconItem: {
// //  alignItems: "center",
// //  padding: 10,
// //  backgroundColor: "#007bff",
// //  // backgroundColor:"black",
// //  borderRadius: 50,
// //  },
// //  container: {
// //  flex: 1,
// //  backgroundColor: "#f4f4f9",
// //  },
// //  topNav: {
// //  backgroundColor: "#007bff",
// //  padding: 15,
// //  flexDirection: "row",
// //  // alignItems: "center",
// //  // alignContent:"center",
// //  // marginLeft:20
// //  justifyContent: "space-between",
// //  },
// //  menuIcon: {
// //  marginLeft: 10,
// //  },
// //  navTitle: {
// //  color: "#fff",
// //  fontSize: 20,
// //  fontWeight: "bold",
// //  },
// //  content: {
// //  flex: 1,
// //  },
// //  smallHeadingContainer: {
// //  paddingHorizontal: 15,
// //  marginVertical: 10,
// //  },
// //  smallHeading: {
// //  fontSize: 18,
// //  fontWeight: "bold",
// //  color: "#333",
// //  alignContent: "center",
// //  marginLeft: 120,
// //  // alignItems:"centre",

// //  fontWeight: "bold",
// //  },
// //  viewMoreText: {
// //  fontSize: 14,
// //  color: "#007bff",
// //  marginTop: 13,
// //  marginLeft: 340,
// //  },
// //  card: {
// //  width: 150,
// //  height: 150,
// //  marginHorizontal: 10,
// //  backgroundColor: "#fff",
// //  borderRadius: 10,
// //  shadowColor: "#000",
// //  shadowOpacity: 0.1,
// //  shadowOffset: { width: 0, height: 4 },
// //  shadowRadius: 5,
// //  elevation: 3,
// //  alignItems: "center",
// //  justifyContent: "center",
// //  marginTop: 20,
// //  },
// //  cardImage: {
// //  width: "100%",
// //  height: "70%",
// //  borderRadius: 10,
// //  },
// //  cardText: {
// //  marginTop: 5,
// //  fontSize: 14,
// //  fontWeight: "bold",
// //  textAlign: "center",
// //  },
// //  agentSection: {
// //  marginTop: 20,
// //  paddingHorizontal: 15,
// //  },
// //  sectionTitle: {
// //  fontSize: 18,
// //  fontWeight: "bold",
// //  marginBottom: 10,
// //  },
// //  agentCard: {
// //  padding: 15,
// //  backgroundColor: "#fff",
// //  borderRadius: 10,
// //  marginBottom: 10,
// //  shadowColor: "#000",
// //  shadowOpacity: 0.1,
// //  shadowOffset: { width: 0, height: 4 },
// //  shadowRadius: 5,
// //  elevation: 3,
// //  },
// //  agentName: {
// //  fontSize: 16,
// //  fontWeight: "bold",
// //  },
// //  agentRole: {
// //  fontSize: 14,
// //  color: "#777",
// //  },
// //  bottomNav: {
// //  flexDirection: "row",
// //  justifyContent: "space-around",
// //  paddingVertical: 10,
// //  backgroundColor: "#007bff",
// //  },
// //  navItem: {
// //  alignItems: "center",
// //  },
// //  card: {
// //  backgroundColor: "white",
// //  borderRadius: 10,
// //  margin: 10,
// //  width: 200,
// //  padding: 10,
// //  shadowColor: "#000",
// //  shadowOpacity: 0.2,
// //  shadowRadius: 5,
// //  elevation: 3,
// //  alignItems: "center",
// //  },
// //  image: {
// //  width: "100%",
// //  height: 120,
// //  borderRadius: 10,
// //  },
// //  price: {
// //  fontSize: 18,
// //  fontWeight: "bold",
// //  marginTop: 10,
// //  },
// //  district: {
// //  fontSize: 14,
// //  color: "#555",
// //  marginTop: 5,
// //  },
// //  calendar: {
// //  marginBottom: 10,
// //  borderRadius: 30,
// //  marginTop: 20,
// //  borderBottomLeftRadius: 90,
// //  borderBottomRightRadius: 90,
// //  backgroundColor: "#007bff",
// //  },
// //  modalOverlay: {
// //  flex: 1,
// //  justifyContent: "center",
// //  alignItems: "center",
// //  backgroundColor: "rgba(0, 0, 0, 0.5)",
// //  },
// //  modalContent: {
// //  width: "80%",
// //  backgroundColor: "#fff",
// //  padding: 20,
// //  borderRadius: 10,
// //  alignItems: "center",
// //  },
// //  modalTitle: {
// //  fontSize: 18,
// //  fontWeight: "bold",
// //  marginBottom: 10,
// //  },
// //  taskItem: {
// //  fontSize: 16,
// //  marginBottom: 5,
// //  },
// //  closeButton: {
// //  marginTop: 15,
// //  backgroundColor: "#007bff",
// //  padding: 10,
// //  borderRadius: 5,
// //  },
// //  closeButtonText: {
// //  color: "#fff",
// //  fontSize: 16,
// //  },
// //  moreCategories: {
// //  marginTop: 20,
// //  paddingHorizontal: 15,
// //  },
// //  moreCategoriesTitle: {
// //  fontSize: 18,
// //  fontWeight: "bold",
// //  marginBottom: 10,
// //  textAlign: "center",
// //  },
// //  iconGrid: {
// //  flexDirection: "row",
// //  flexWrap: "wrap",
// //  justifyContent: "space-around",
// //  backgroundColor: "#007bff",
// //  borderRadius: 10,
// //  padding: 10,
// //  },
// //  iconItem: {
// //  width: "22%", // Four icons per row
// //  alignItems: "center",
// //  marginVertical: 10,
// //  // backgroundColor:"violet"
 
// //  borderRadius:-10
// //  },
// //  iconLabel: {
// //  marginTop: 5,
// //  fontSize: 12,
// //  color: "#fff",
// //  textAlign: "center",
// //  },
// // });

// // export default CsrHomePage;


// import React, { useEffect, useState, useRef } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//  View,
//  Text,
//  StyleSheet,
//  TouchableOpacity,
//  ScrollView,
//  FlatList,
//  Image,
// } from "react-native";
// import { Button } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { jwtDecode } from "jwt-decode"; // to decode the JWT token

// export const CsrHomePage = () => {
//  const navigation = useNavigation();
//  const [properties, setProperties] = useState([]);
//  const [assignedAgents, setAssignedAgents] = useState([]);
//  const [loading, setLoading] = useState(false);

//  // Add ref to FlatList to control scrolling
//  const flatListRef = useRef(null);
//  const [currentIndex, setCurrentIndex] = useState(0);

//  const fetchLayouts = async () => {
//  try {
//  const token = await AsyncStorage.getItem("userToken");
//  if (!token) {
//  console.log("No token found");
//  return;
//  }

//  const response = await fetch(
//  "http://172.17.15.184:3000/admin/getTopPropOnPrice",
//  {
//  method: "GET",
//  headers: {
//  Authorization: `Bearer ${token}`,
//  "Content-Type": "application/json",
//  },
//  }
//  );

//  const data = await response.json();
//  console.log("Fetched data:", data);

//  if (Array.isArray(data)) {
//  setProperties(data);
//  } else {
//  console.log("Unexpected data format:", data);
//  }

//  setLoading(false);
//  } catch (error) {
//  console.error("Error fetching layouts:", error.message);
//  setLoading(false);
//  }
//  };

//  const fetchAssignedAgents = async () => {
//  try {
//  const token = await AsyncStorage.getItem("userToken");
//  if (!token) {
//  console.log("No token found");
//  return;
//  }

//  const decodedToken = jwtDecode(token);
//  const userId = decodedToken.user.userId;

//  const response = await fetch(
//  `http://172.17.15.184:3000/csr/getAssignedAgents/${userId}`,
//  {
//  method: "GET",
//  headers: {
//  Authorization: `Bearer ${token}`,
//  "Content-Type": "application/json",
//  },
//  }
//  );

//  const data = await response.json();
//  console.log("Fetched assigned agents:", data);

//  if (Array.isArray(data)) {
//  setAssignedAgents(data);
//  } else {
//  console.log("Unexpected data format:", data);
//  }
//  } catch (error) {
//  console.error("Error fetching assigned agents:", error.message);
//  }
//  };

//  useEffect(() => {
//  fetchLayouts();
//  fetchAssignedAgents();
//  }, []);

//  // Auto-scrolling functionality for the cards
//  useEffect(() => {
//  const interval = setInterval(() => {
//  setCurrentIndex((prevIndex) => {
//  const nextIndex = (prevIndex + 1) % properties.length;
//  flatListRef.current?.scrollToIndex({
//  index: nextIndex,
//  animated: true,
//  });
//  return nextIndex;
//  });
//  }, 3000); // Change the card every 3 seconds

//  return () => clearInterval(interval);
//  }, [properties]);

//  return (
//  <View style={styles.container}>
//  {/* Top Navigation Bar */}
//  <View style={styles.topNav}>
//  <Ionicons name="menu" size={24} color="#fff" style={styles.menuIcon} />
//  {/* {""} */}
//  <Text style={styles.navTitle}>Hello CSR!</Text>
//  <Ionicons name="calendar" size={24} color="#fff"style={{marginLeft:120}}/>
//  <Ionicons name="notifications" color="#fff" size={24} />

//  <Ionicons name="exit-outline" color="#fff"onPress={()=>{navigation.navigate('Login')}}
//  size={24} />
//  </View>

//  {/* Main Content */}
//  <ScrollView style={styles.content}>
//  {/* Small Heading above Scrolling Cards */}
//  <View style={styles.smallHeadingContainer}>
//  <Text style={styles.smallHeading}>Hot Deals</Text>
//  </View>

//  {/* Auto-Scrolling Cards */}
//  <FlatList
//  ref={flatListRef} // Attach the ref here
//  data={properties}
//  keyExtractor={(item) => item.propertyId}
//  horizontal
//  renderItem={({ item }) => (
//  <View style={styles.card}>
//  <Image source={{ uri: item.images[0] }} style={styles.image} />
//  <Text style={styles.price}> ₹{item.price.toLocaleString()}</Text>
//  <Text style={styles.district}> Location: {item.district}</Text>
//  </View>
//  )}
//  />

//  <TouchableOpacity onPress={() => navigation.navigate("ViewpropbyCSR")}>
//  <Text style={styles.viewMoreText}>View More</Text>
//  </TouchableOpacity>
//  {/* <View style={styles.iconRow}>
//  <TouchableOpacity style={styles.iconItem} onPress={()=>navigation.navigate("MarketingAgents")}>
//  <Ionicons name="person" size={24} color="#fff" />
//  </TouchableOpacity>
//  <TouchableOpacity style={styles.iconItem}>
//  <Ionicons name="storefront" size={24} color="#fff" /> 
//  </TouchableOpacity>
//  <TouchableOpacity style={styles.iconItem}>
//  <Ionicons name="share" size={24} color="#fff" />
//  </TouchableOpacity>
//  <TouchableOpacity style={styles.iconItem}>
//  <Ionicons name="location" size={24} color="#fff" />
//  </TouchableOpacity>
//  </View> */}

// {/* <View style={styles.iconGrid}>
//  {[
//  { name: "person", label: "Marketing Agents" },
//  { name: "share", label: "SHare Properties" },
//  { name: "storefront", label: "My Properties" },
 
//  ].map((item, index) => (
//  <View key={index} style={styles.iconItemContainer}>
//  <View style={styles.iconItem}>
//  <Ionicons name={item.name} size={24} color="#fff" />
//  </View>
//  <Text style={styles.iconLabel}>{item.label}</Text>

//  </View>
//  ))}
// </View> */}


//  {/* Icon Grid with Navigation */}
//  <View style={styles.iconGrid}>
//  {[
//  { name: "person", label: "Marketing Agents", screen: "MarketingAgents" },
//  // { name: "share", label: "Share Properties", screen: "SharePropertiesScreen" },
//  { name: "storefront", label: "My Properties", screen: "MyPropertiescsr" },
//  { name: "person-add", label: "Customera List", screen: "MyPropertiescsr" },
 



//  // Add more items here with their corresponding screen names
//  ].map((item, index) => (
//  <TouchableOpacity
//  key={index}
//  style={styles.iconItemContainer}
//  onPress={() => navigation.navigate(item.screen)} // Navigate to the screen
//  >
//  <View style={styles.iconItem}>
//  <Ionicons name={item.name} size={24} color="#fff" />
//  </View>
//  <Text style={styles.iconLabel}>{item.label}</Text>
//  </TouchableOpacity>
//  ))}
//  </View>



//  {/* Assigned Agents */}
//  <View style={styles.agentSection}>
//  <Text style={styles.sectionTitle}>Assigned Agents</Text>
//  <FlatList
//  data={assignedAgents}
//  keyExtractor={(item) => item._id} // Assuming the agent's unique ID is _id
//  horizontal
//  showsHorizontalScrollIndicator={false}
//  renderItem={({ item }) => (
//  <View style={styles.agentCard}>
//  <Image
//  source={{ uri: item.profilePicture }} // Use the profile picture from the API
//  style={styles.agentImage}
//  />
//  <Text
//  style={styles.agentName}
//  >{`${item.firstName} ${item.lastName}`}</Text>
//  <Text style={styles.agentRole}>{item.phoneNumber}</Text>
//  </View>
//  )}
//  />
//  </View>
//  </ScrollView>

//  {/* Bottom Navigation Bar with 4 Icons */}
//  <View style={styles.bottomNav}>
//  <TouchableOpacity
//  style={styles.navItem}
//  onPress={() => navigation.navigate("Home")}
//  >
//  <Ionicons name="home" size={24} color="#fff" />
//  </TouchableOpacity>
//  <TouchableOpacity
//  style={styles.navItem}
//  onPress={() => navigation.navigate("AddProperties")}
//  >
//  <Ionicons name="add-circle" size={24} color="#fff" />
//  </TouchableOpacity>
//  <TouchableOpacity
//  style={styles.navItem}
//  onPress={() => navigation.navigate("AddCSR")}
//  >
//  <Ionicons name="share" size={24} color="#fff" />
//  </TouchableOpacity>
//  </View>
//  </View>
//  );
// };

// const styles = StyleSheet.create({
//  iconGrid: {
//  flexWrap: "wrap",
//  flexDirection: "row",
//  justifyContent: "space-around",
//  padding: 15,
//  },
//  iconItemContainer: {
//  alignItems: "center",
//  margin: 10,
//  },
//  iconLabel: {
//  marginBottom: 5, // Space between the label and the icon
//  color: "black", // Adjust as needed for text color
//  fontSize: 14, // Adjust size of label text
//  },
//  iconItem: {
//  backgroundColor: "#007bff",
//  padding: 10,
//  borderRadius: 50,
//  // Add styles to center the icon if needed
//  },
//  agentSection: {
//  marginTop: 20,
//  paddingHorizontal: 15,
//  },
//  sectionTitle: {
//  fontSize: 18,
//  fontWeight: "bold",
//  marginBottom: 10,
//  },
//  agentCard: {
//  width: 350,
//  height: 200,
//  padding: 10,
//  backgroundColor: "#fff",
//  borderRadius: 10,
//  marginRight: 15,
//  shadowColor: "#000",
//  shadowOpacity: 0.1,
//  shadowOffset: { width: 0, height: 4 },
//  shadowRadius: 5,
//  elevation: 3,
//  alignItems: "center",
//  justifyContent: "center",
//  },
//  agentImage: {
//  width: 80,
//  height: 80,
//  borderRadius: 40,
//  marginBottom: 10,
//  },
//  agentName: {
//  fontSize: 16,
//  fontWeight: "bold",
//  },
//  agentRole: {
//  fontSize: 14,
//  color: "#777",
//  },
//  iconRow: {
//  flexDirection: "row",
//  justifyContent: "space-around",
//  padding: 15,
//  // backgroundColor:"#ADD8E4",
//  borderRadius: 50,
//  marginTop: 20,
//  },
//  iconItem: {
//  alignItems: "center",
//  padding: 10,
//  backgroundColor: "#007bff",
//  // backgroundColor:"black",
//  borderRadius: 50,
//  },
//  container: {
//  flex: 1,
//  backgroundColor: "#f4f4f9",
//  },
//  topNav: {
//  backgroundColor: "#007bff",
//  padding: 15,
//  flexDirection: "row",
//  // alignItems: "center",
//  // alignContent:"center",
//  // marginLeft:20
//  justifyContent: "space-between",
//  },
//  menuIcon: {
//  marginLeft: 10,
//  },
//  navTitle: {
//  color: "#fff",
//  fontSize: 15,
//  fontWeight: "bold",
//  marginRight:-10
//  },
//  content: {
//  flex: 1,
//  },
//  smallHeadingContainer: {
//  paddingHorizontal: 15,
//  marginVertical: 10,
//  },
//  smallHeading: {
//  fontSize: 20,
//  fontWeight: "bold",
//  color: "#333",
//  alignContent: "center",
//  marginLeft: 160,
//  // alignItems:"centre",

//  fontWeight: "bold",
//  },
//  viewMoreText: {
//  fontSize: 14,
//  color: "#007bff",
//  marginTop: 13,
//  marginLeft: 300,
//  },
//  card: {
//  width: 150,
//  height: 150,
//  marginHorizontal: 10,
//  backgroundColor: "#fff",
//  borderRadius: 10,
//  shadowColor: "#000",
//  shadowOpacity: 0.1,
//  shadowOffset: { width: 0, height: 4 },
//  shadowRadius: 5,
//  elevation: 3,
//  alignItems: "center",
//  justifyContent: "center",
//  marginTop: 20,
//  },
//  cardImage: {
//  width: "100%",
//  height: "70%",
//  borderRadius: 10,
//  },
//  cardText: {
//  marginTop: 5,
//  fontSize: 14,
//  fontWeight: "bold",
//  textAlign: "center",
//  },
//  agentSection: {
//  marginTop: 20,
//  paddingHorizontal: 15,
//  },
//  sectionTitle: {
//  fontSize: 18,
//  fontWeight: "bold",
//  marginBottom: 10,
//  },
//  // agentCard: {
//  // padding: 15,
//  // backgroundColor: "#fff",
//  // borderRadius: 10,
//  // marginBottom: 10,
//  // shadowColor: "#000",
//  // shadowOpacity: 0.1,
//  // shadowOffset: { width: 0, height: 4 },
//  // shadowRadius: 5,
//  // elevation: 3,
//  // },
//  agentCard: {
//  width: 200, // Increased width for agent card
//  height: 250, // Increased height for agent card
//  padding: 20, // Adjusted padding for better content spacing
//  backgroundColor: "#fff",
//  borderRadius: 10,
//  marginRight: 20, // Added more space between agent cards horizontally
//  marginBottom: 20, // Added space at the bottom of the card
//  shadowColor: "#000",
//  shadowOpacity: 0.1,
//  shadowOffset: { width: 0, height: 4 },
//  shadowRadius: 5,
//  elevation: 3,
//  alignItems: "center",
//  justifyContent: "center",
//  },

//  agentName: {
//  fontSize: 16,
//  fontWeight: "bold",
//  },
//  agentRole: {
//  fontSize: 14,
//  color: "#777",
//  },
//  bottomNav: {
//  flexDirection: "row",
//  justifyContent: "space-around",
//  paddingVertical: 10,
//  backgroundColor: "#007bff",
//  },
//  navItem: {
//  alignItems: "center",
//  },
//  card: {
//  backgroundColor: "white",
//  borderRadius: 10,
//  margin: 10,
//  width: 200,
//  padding: 10,
//  shadowColor: "#000",
//  shadowOpacity: 0.2,
//  shadowRadius: 5,
//  elevation: 3,
//  alignItems: "center",
//  },
//  image: {
//  width: "100%",
//  height: 120,
//  borderRadius: 10,
//  },
//  price: {
//  fontSize: 18,
//  fontWeight: "bold",
//  marginTop: 10,
//  },
//  district: {
//  fontSize: 14,
//  color: "#555",
//  marginTop: 5,
//  },
// });

// export default CsrHomePage;


// ------------------------
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 ScrollView,
 FlatList,
 Image,
 SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode"; // to decode the JWT token

export const CsrHomePage = () => {
 const navigation = useNavigation();
 const [properties, setProperties] = useState([]);
 const [assignedAgents, setAssignedAgents] = useState([]);
 const [loading, setLoading] = useState(false);

 // Add ref to FlatList to control scrolling
 const flatListRef = useRef(null);
 const [currentIndex, setCurrentIndex] = useState(0);

 const fetchLayouts = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 const response = await fetch(
 "http://172.17.15.184:3000/admin/getTopPropOnPrice",
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 const data = await response.json();
 console.log("Fetched data:", data);

 if (Array.isArray(data)) {
 setProperties(data);
 } else {
 console.log("Unexpected data format:", data);
 }

 setLoading(false);
 } catch (error) {
 console.error("Error fetching layouts:", error.message);
 setLoading(false);
 }
 };

 const fetchAssignedAgents = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 return;
 }

 const decodedToken = jwtDecode(token);
 const userId = decodedToken.user.userId;

 const response = await fetch(
 `http://172.17.15.184:3000/csr/getAssignedAgents/${userId}`,
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 const data = await response.json();
 console.log("Fetched assigned agents:", data);

 if (Array.isArray(data)) {
 setAssignedAgents(data);
 } else {
 console.log("Unexpected data format:", data);
 }
 } catch (error) {
 console.error("Error fetching assigned agents:", error.message);
 }
 };

 useEffect(() => {
 fetchLayouts();
 fetchAssignedAgents();
 }, []);

 // Auto-scrolling functionality for the cards
 useEffect(() => {
 const interval = setInterval(() => {
 setCurrentIndex((prevIndex) => {
 const nextIndex = (prevIndex + 1) % properties.length;
 flatListRef.current?.scrollToIndex({
 index: nextIndex,
 animated: true,
 });
 return nextIndex;
 });
 }, 3000); // Change the card every 3 seconds

 return () => clearInterval(interval);
 }, [properties]);

 return (
 
 <SafeAreaView style={styles.container}>
 {/* Top Navigation Bar */}
 <View style={styles.topNav}>
 <Ionicons name="menu" size={24} color="#fff" style={styles.menuIcon} />
 {/* {""} */}
 <Text style={styles.navTitle}>Hello CSR!</Text>
 {/* <Ionicons name="calendar" size={24} color="#fff"style={{marginLeft:220}}/> */}
 <Ionicons name="notifications" color="#fff" size={24} style={{marginLeft:200}} />

 <Ionicons name="power" color="#fff"onPress={()=>{navigation.navigate('Login')}}
 size={24} />
 </View>

 {/* Main Content */}
 <ScrollView style={styles.content}>
 {/* Small Heading above Scrolling Cards */}
 
 {/* <View style={styles.iconRow}>
 <TouchableOpacity style={styles.iconItem} onPress={()=>navigation.navigate("MarketingAgents")}>
 <Ionicons name="person" size={24} color="#fff" />
 </TouchableOpacity>
 <TouchableOpacity style={styles.iconItem}>
 <Ionicons name="storefront" size={24} color="#fff" /> 
 </TouchableOpacity>
 <TouchableOpacity style={styles.iconItem}>
 <Ionicons name="share" size={24} color="#fff" />
 </TouchableOpacity>
 <TouchableOpacity style={styles.iconItem}>
 <Ionicons name="location" size={24} color="#fff" />
 </TouchableOpacity>
 </View> */}

{/* <View style={styles.iconGrid}>
 {[
 { name: "person", label: "Marketing Agents" },
 { name: "share", label: "SHare Properties" },
 { name: "storefront", label: "My Properties" },
 
 ].map((item, index) => (
 <View key={index} style={styles.iconItemContainer}>
 <View style={styles.iconItem}>
 <Ionicons name={item.name} size={24} color="#fff" />
 </View>
 <Text style={styles.iconLabel}>{item.label}</Text>

 </View>
 ))}
</View> */}


 {/* Icon Grid with Navigation */}
 <View style={styles.iconGrid}>
 {[
 { name: "create", label: "Add Property", screen: "MarketingAgents" },
 { name: "people", label: "Agents", screen: "MyPropertiescsr" },
 { name: "happy", label: "Customers", screen: "MyPropertiescsr" },

 { name: "briefcase", label: "Deals", screen: "CustomerDeals" },
 { name: "calendar", label: "Calendar", screen: "MyPropertiescsr" },

 { name: "megaphone", label: "Marketing Agents", screen: "MarketingAgents" },
 { name: "bar-chart", label: "Reports", screen: "MyPropertiescsr" },
 { name: "business", label: "All Properties", screen: "MyPropertiescsr" },
 ].map((item, index) => (
 <TouchableOpacity
 key={index}
 style={styles.iconItemContainer}
 onPress={() => navigation.navigate(item.screen)}
 >
 <View style={styles.iconItem}>
 <Ionicons name={item.name} size={30} color="white" />
 </View>
 <Text style={styles.iconLabel}>{item.label}</Text>
 </TouchableOpacity>
 ))}
 </View>



 <View style={styles.smallHeadingContainer}>
 <Text style={styles.smallHeading}>Hot Deals</Text>
 </View>

 {/* Auto-Scrolling Cards */}
 <FlatList
 ref={flatListRef} // Attach the ref here
 data={properties}
 keyExtractor={(item) => item.propertyId}
 horizontal
 renderItem={({ item }) => (
 <View style={styles.card}>
 <Image source={{ uri: item.images[0] }} style={styles.image} />
 <Text style={styles.price}>{item.name}'s Property</Text>

 <Text style={styles.price}> ₹{item.price.toLocaleString()}</Text>
 <Text style={styles.district}> Location: {item.district}</Text>
 <Text style={styles.district}> Size: {item.size}</Text>

 </View>
 )}
 />

 <TouchableOpacity onPress={() => navigation.navigate("ViewpropbyCSR")}>
 <Text style={styles.viewMoreText}>View More</Text>
 </TouchableOpacity>


 {/* Assigned Agents */}
 {/* <View style={styles.agentSection}>
 <Text style={styles.sectionTitle}>Assigned Agents</Text>
 <FlatList
 data={assignedAgents}
 keyExtractor={(item) => item._id} // Assuming the agent's unique ID is _id
 horizontal
 showsHorizontalScrollIndicator={false}
 renderItem={({ item }) => (
 <View style={styles.agentCard}>
 <Image
 source={{ uri: item.profilePicture }} // Use the profile picture from the API
 style={styles.agentImage}
 />
 <Text
 style={styles.agentName}
 >{`${item.firstName} ${item.lastName}`}</Text>
 <Text style={styles.agentRole}>{item.phoneNumber}</Text>
 </View>
 )}
 />
 </View> */}
 </ScrollView>

 {/* Bottom Navigation Bar with 4 Icons */}
 <View style={styles.bottomNav}>
 <TouchableOpacity
 style={styles.navItem}
 onPress={() => navigation.navigate("Home")}
 >
 <Ionicons name="home" size={24} color="#fff" />
 </TouchableOpacity>
 <TouchableOpacity
 style={styles.navItem}
 onPress={() => navigation.navigate("AddProperties")}
 >
 <Ionicons name="add-circle" size={24} color="#fff" />
 </TouchableOpacity>
 <TouchableOpacity
 style={styles.navItem}
 onPress={() => navigation.navigate("AddCSR")}
 >
 <Ionicons name="share" size={24} color="#fff" />
 </TouchableOpacity>
 </View>
 </SafeAreaView>
 
 );
};

const styles = StyleSheet.create({
 iconGrid: {
 flexDirection: "row", // Row layout
 flexWrap: "wrap", // Allow wrapping
 justifyContent: "space-between", // Distribute items evenly
 paddingHorizontal: 10, // Add some padding
 marginTop: 20, // Top margin
 }, iconItemContainer: {
 width: "25%", // Set width to 30% for 3 items per row
 alignItems: "center", // Center icon and text
 marginBottom: 20, // Add spacing between rows
 },
 iconItem: {
 backgroundColor: "#f0f0f0", // Light gray background
 borderRadius: 10, // Rounded corners
 padding: 15, // Padding around icon
 justifyContent: "center",
 alignItems: "center",
 },
 iconLabel: {
 marginTop: 10, // Space between icon and label
 textAlign: "center",
 fontSize: 12,
 color: "#333", // Dark text color
 },
 agentSection: {
 marginTop: 20,
 paddingHorizontal: 15,
 },
 sectionTitle: {
 fontSize: 18,
 fontWeight: "bold",
 marginBottom: 10,
 },
 agentCard: {
 width: 350,
 height: 300,
 padding: 10,
 backgroundColor: "#fff",
 borderRadius: 10,
 marginRight: 15,
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 4 },
 shadowRadius: 5,
 elevation: 3,
 alignItems: "center",
 justifyContent: "center",
 },
 agentImage: {
 width: 80,
 height: 80,
 borderRadius: 40,
 marginBottom: 10,
 },
 agentName: {
 fontSize: 16,
 fontWeight: "bold",
 },
 agentRole: {
 fontSize: 14,
 color: "#777",
 },
 iconRow: {
 flexDirection: "row",
 justifyContent: "space-around",
 padding: 15,
 // backgroundColor:"#ADD8E4",
 borderRadius: 50,
 marginTop: 20,
 },
 iconItem: {
 alignItems: "center",
 padding: 10,
 backgroundColor: "#007bff",
 // backgroundColor:"black",
 borderRadius: 50,
 },
 container: {
 flex: 1,
 backgroundColor: "#f4f4f9",
 },
 topNav: {
 backgroundColor: "#007bff",
 padding: 15,
 marginTop:25,
 flexDirection: "row",
 // alignItems: "center",
 // alignContent:"center",
 // marginLeft:20
 justifyContent: "space-between",
 },
 menuIcon: {
 marginLeft: 10,
 },
 navTitle: {
 color: "#fff",
 fontSize: 15,
 fontWeight: "bold",
 marginRight:-10
 },
 content: {
 flex: 1,
 },
 smallHeadingContainer: {
 paddingHorizontal: 15,
 marginVertical: 10,
 },
 smallHeading: {
 fontSize: 20,
 fontWeight: "bold",
 color: "#333",
 alignContent: "center",
 marginLeft: 160,
 // alignItems:"centre",

 fontWeight: "bold",
 },
 viewMoreText: {
 fontSize: 14,
 color: "#007bff",
 marginTop: 13,
textAlign:"right",
marginRight:15
 },
 card: {
 width: 250,
 height: 150,
 marginHorizontal: 10,
 backgroundColor: "#fff",
 borderRadius: 10,
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 4 },
 shadowRadius: 5,
 elevation: 3,
 alignItems: "center",
 justifyContent: "center",
 marginTop: 20,
 },
 cardImage: {
 width: "100%",
 height: "70%",
 borderRadius: 10,
 },
 cardText: {
 marginTop: 5,
 fontSize: 14,
 fontWeight: "bold",
 textAlign: "center",
 },
 agentSection: {
 marginTop: 20,
 paddingHorizontal: 15,
 },
 sectionTitle: {
 fontSize: 18,
 fontWeight: "bold",
 marginBottom: 10,
 },
 // agentCard: {
 // padding: 15,
 // backgroundColor: "#fff",
 // borderRadius: 10,
 // marginBottom: 10,
 // shadowColor: "#000",
 // shadowOpacity: 0.1,
 // shadowOffset: { width: 0, height: 4 },
 // shadowRadius: 5,
 // elevation: 3,
 // },
 agentCard: {
 width: 200, // Increased width for agent card
 height: 250, // Increased height for agent card
 padding: 20, // Adjusted padding for better content spacing
 backgroundColor: "#fff",
 borderRadius: 10,
 marginRight: 20, // Added more space between agent cards horizontally
 marginBottom: 20, // Added space at the bottom of the card
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 4 },
 shadowRadius: 5,
 elevation: 3,
 alignItems: "center",
 justifyContent: "center",
 },

 agentName: {
 fontSize: 16,
 fontWeight: "bold",
 },
 agentRole: {
 fontSize: 14,
 color: "#777",
 },
 bottomNav: {
 flexDirection: "row",
 justifyContent: "space-around",
 paddingVertical: 10,
 backgroundColor: "#007bff",
 },
 navItem: {
 alignItems: "center",
 },
 card: {
 backgroundColor: "white",
 borderRadius: 10,
 margin: 10,
 width: 200,
 padding: 10,
 shadowColor: "#000",
 shadowOpacity: 0.2,
 shadowRadius: 5,
 elevation: 3,
 alignItems: "center",
 },
 image: {
 width: "100%",
 height: 120,
 borderRadius: 10,
 },
 price: {
 fontSize: 18,
 fontWeight: "bold",
 marginTop: 10,
 },
 district: {
 fontSize: 14,
 color: "#555",
 marginTop: 5,
 },
});

export default CsrHomePage;
