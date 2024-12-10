import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PropertyCards = () => {
  const [landDetails, setLandDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the API
    axios.get('http://172.17.15.53:3000/getallprops')
      .then(response => {
        setLandDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => alert('Clicked on ' + item.title)}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>₹{item.price}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSize}>
          {item.size} sq. ft
        </Text>
        <Text style={styles.cardLocation}>
          {item.district}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={landDetails}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    marginTop: '4%',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    height: 164,
    width: '100%',
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#329da8',
    padding: 8,
    borderRadius: 5,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardDetails: {
    padding: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  cardSize: {
    color: '#007bff',
    marginBottom: 8,
  },
  cardLocation: {
    color: '#007bff',
  },
});

export default PropertyCards;




















