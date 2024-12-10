import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const EntryBuyer = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buyer Dashboard</Text>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome, Buyer!</Text>
        <Text style={styles.description}>Explore properties, manage your wishlist, and book appointments easily.</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/filter.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>Explore Properties</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/filter.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>View Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('../assets/filter.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: '45%',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default EntryBuyer;
