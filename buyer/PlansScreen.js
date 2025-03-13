import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlansScreen = ({navigation}) => {
//   const navigation = useNavigation();

  const properties = [
    {
      title: 'Property A',
      tag: 'Best Deals',
      description: 'Exclusive offers on premium properties.',
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Property B',
      tag: 'Low Price',
      description: 'Affordable prices for budget-conscious users.',
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Property C',
      tag: 'Most Valued',
      description: 'Highly rated properties with premium amenities.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const handlePropertyClick = () => {
    navigation.navigate('Premium'); // Redirect to Premium page
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Get the best deals for you</Text>
      <Text style={styles.subHeader}></Text>

      {/* Property Cards */}
      {properties.map((property, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={()=>{
            navigation.navigate('Premium')
          }}
        >
          <Image source={{ uri: property.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{property.title}</Text>
            <Text style={styles.cardDescription}>{property.description}</Text>
            <View style={[styles.tag, styles[`tag_${property.tag.replace(/\s+/g, '')}`]]}>
              <Text style={styles.tagText}>{property.tag}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Choose Plans Button */}
      <TouchableOpacity style={styles.choosePlanButton}>
        <Text style={styles.choosePlanText}>Choose Plans to Unlock More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subHeader: { fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  cardContent: { flex: 1, justifyContent: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardDescription: { fontSize: 14, color: '#555', marginVertical: 5 },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  },
  tag_BestDeals: { backgroundColor: '#ff5722' },
  tag_LowPrice: { backgroundColor: '#4caf50' },
  tag_MostValued: { backgroundColor: '#2196f3' },
  tagText: { fontSize: 12, color: '#fff', fontWeight: 'bold' },
  choosePlanButton: {
    marginTop: 20,
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  choosePlanText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PlansScreen;
