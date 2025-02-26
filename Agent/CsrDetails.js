import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CsrDetails() {
  const [data, setData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getCsr();
    }, [getCsr])
  );

  const getCsr = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return;
      }

      const response = await fetch('http://172.17.15.189:3000/users/myCsr', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setData(data);
      console.log('Fetched CSR data:', data);
      setLoading(false);

    } catch (error) {
      console.error('Failed to fetch properties:', error);
      setLoading(false);
    }
  }, []);

  const handleContactPress = () => {
    if (data && data.phoneNumber) {
      const phoneNumber = `tel:${data.phoneNumber}`;
      Linking.openURL(phoneNumber).catch((err) => console.error('Could not open dialer', err));
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data available</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
         <View colors={['#6A11CB', '#2575FC']} style={styles.header}>
          <Image source={{ uri: data.profilePicture }} style={styles.profilePicture} />
          <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
            <Icon name="call-outline" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Icon name="call" size={20} color="#000" />
            <Text style={styles.infoText}>{data.phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="mail" size={20} color="#000" />
            <Text style={styles.infoText}>{data.email}</Text>
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.infoRow}>
            <Icon name="location" size={20} color="#000" />
            <Text style={styles.infoText}>
              {data.mandal}, {data.city}, {data.district}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map" size={20} color="#000" />
            <Text style={styles.infoText}>
              {data.state}, {data.country}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="pin" size={20} color="#000" />
            <Text style={styles.infoText}>{data.pinCode}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    margin: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    backgroundColor: '#d2d4d4',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#000',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    color: '#000',
  },
  identityProof: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
});
