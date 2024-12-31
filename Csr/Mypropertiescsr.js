import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Install AsyncStorage
// import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const MyPropertiescsr = () => {
 const [properties, setProperties] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
 const fetchProperties = async () => {
 try {
 // Retrieve token from AsyncStorage
 const token = await AsyncStorage.getItem('userToken');
 if (!token) {
 throw new Error('Token not found');
 }

 // Decode the token to get the user ID
 const decodedToken = jwtDecode(token);
 const userId = decodedToken.user.userId ; // Fallback user ID

 // Make the API request with authorization
 const response = await axios.get(
 `http://172.17.15.184:3000/csr/getPropsByCsr/${userId}`,
 {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 }
 );

 setProperties(response.data); // Set the fetched properties
 } catch (err) {
 console.error(err);
 setError('Failed to fetch properties');
 } finally {
 setLoading(false);
 }
 };

 fetchProperties();
 }, []);

 if (loading) {
 return (
 <View style={styles.center}>
 <Text>Loading...</Text>
 </View>
 );
 }

 if (error) {
 return (
 <View style={styles.center}>
 <Text>{error}</Text>
 </View>
 );
 }

 return (
 <View style={styles.container}>
 <FlatList
 data={properties}
 keyExtractor={(item) => item.propertyId}
 renderItem={({ item }) => (
 <View style={styles.card}>
 <Image
 source={{ uri: item.images[0] || 'https://via.placeholder.com/150' }} // Fallback image
 style={styles.image}
 />
 <View style={styles.details}>
 <Text style={styles.propertyName}>{item.propertyName}</Text>
 <Text style={styles.location}>{item.district}</Text>
 <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
 </View>
 </View>
 )}
 />
 </View>
 );
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#f5f5f5',
 padding: 10,
 },
 center: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 },
 card: {
 backgroundColor: '#fff',
 borderRadius: 8,
 marginBottom: 10,
 overflow: 'hidden',
 elevation: 3,
 },
 image: {
 width: '100%',
 height: 200,
 },
 details: {
 padding: 10,
 },
 propertyName: {
 fontSize: 16,
 fontWeight: 'bold',
 marginBottom: 5,
 },
 location: {
 fontSize: 14,
 color: '#555',
 marginBottom: 5,
 },
 price: {
 fontSize: 14,
 color: '#4CAF50',
 fontWeight: 'bold',
 },
});
