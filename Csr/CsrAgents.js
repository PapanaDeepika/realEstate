import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 ScrollView,
 StyleSheet,
 TouchableOpacity,
 Image,
 ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

export const CsrAgents = () => {
 const [agents, setAgents] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchAssignedAgents = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 setLoading(false);
 return;
 }

 // Decode the token to extract the user ID
 const decodedToken = jwtDecode(token);
 const userId = decodedToken.user.userId;

 console.log("User ID:", userId);

 // Fetch agents assigned to the user
 const response = await fetch(
 `http://172.17.15.189:3000/csr/getAssignedAgents/${userId}`,
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 if (!response.ok) {
 throw new Error(`Error fetching agents: ${response.statusText}`);
 }

 const data = await response.json();
 console.log(data);

 setAgents(data); // Assuming data is an array of agents
 } catch (error) {
 console.error("Failed to fetch assigned agents:", error);
 } finally {
 setLoading(false);
 }
 };

 fetchAssignedAgents();
 }, []);

 if (loading) {
 return (
 <View style={styles.loaderContainer}>
 <ActivityIndicator size="large" color="#0000ff" />
 </View>
 );
 }

 return (
 <View style={styles.container}>
 <Text style={styles.header}>Assigned Agents List</Text>
 <ScrollView contentContainerStyle={styles.agentList}>
 {agents.map((agent) => (
 <TouchableOpacity key={agent._id} style={styles.agentCard}>
 <Image
 source={{ uri: agent.profilePicture }}
 style={styles.profileImage}
 />
 <View style={styles.agentInfo}>
 <Text style={styles.agentName}>
 {agent.firstName} {agent.lastName}
 </Text>
 <Text style={styles.agentPhone}>{agent.phoneNumber}</Text>
 <Text style={styles.agentEmail}>{agent.email}</Text>
 </View>
 </TouchableOpacity>
 ))}
 </ScrollView>
 </View>
 );
};

// Styling for the screen
const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 20,
 backgroundColor: "#f8f8f8",
 },
 header: {
 fontSize: 24,
 fontWeight: "bold",
 marginBottom: 20,
 color: "#333",
 },
 loaderContainer: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 },
 agentList: {
 paddingBottom: 20,
 },
 agentCard: {
 flexDirection: "row",
 backgroundColor: "#fff",
 padding: 15,
 marginBottom: 10,
 borderRadius: 10,
 shadowColor: "#000",
 shadowOpacity: 0.1,
 shadowOffset: { width: 0, height: 3 },
 shadowRadius: 5,
 elevation: 3,
 },
 profileImage: {
 width: 50,
 height: 50,
 borderRadius: 25,
 marginRight: 15,
 },
 agentInfo: {
 justifyContent: "center",
 },
 agentName: {
 fontSize: 18,
 fontWeight: "bold",
 color: "#333",
 },
 agentPhone: {
 fontSize: 14,
 color: "#555",
 marginTop: 5,
 },
 agentEmail: {
 fontSize: 14,
 color: "#555",
 marginTop: 5,
 },
});