
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PropertyDetails = ({ route }) => {
  const { property } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.location}>Location: {property.location}</Text>
      <Text style={styles.price}>Price: {property.price}</Text>

      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Icon name="bed" size={20} color="#000" />
          <Text style={styles.detail}>Bedrooms: {property.bedrooms}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="arrow-up" size={20} color="#000" />
          <Text style={styles.detail}>Floor: {property.floorNumber}</Text>
        </View>
      </View>
      
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Icon name="balcony" size={20} color="#000" />
          <Text style={styles.detail}>Balcony: {property.balconyCount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="elevator" size={20} color="#000" />
          <Text style={styles.detail}>Lift: {property.lift ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Icon name="shield" size={20} color="#000" />
          <Text style={styles.detail}>Security: {property.security ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="wrench" size={20} color="#000" />
          <Text style={styles.detail}>Maintenance Cost: {property.maintenanceCost}</Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Icon name="tint" size={20} color="#000" />
          <Text style={styles.detail}>Water: {property.waterFacility ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="lock" size={20} color="#000" />
          <Text style={styles.detail}>Gated: {property.gym ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Icon name="couch" size={20} color="#000" />
          <Text style={styles.detail}>Furnished: {property.furnished ? 'Yes' : 'No'}</Text>
        </View>
        {property.furnished && (
          <View style={styles.detailRow}>
            <Icon name="list" size={20} color="#000" />
            <Text style={styles.detail}>Furniture: {property.furnitureDetails}</Text>
          </View>
        )}
      </View>

      <Text style={styles.details}>This is a detailed description of the property.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontSize: 16,
    marginLeft: 5,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
});

export default PropertyDetails;







//  new code form here.............






























































