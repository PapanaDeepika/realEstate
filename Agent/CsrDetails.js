import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
 
export default function AssetExample() {
  const data = {
    _id: '6751817fff6b056f32df7572',
    firstName: 'Deepika',
    lastName: 'Papana',
    phoneNumber: '9346861243',
    email: 'papanadeepikareddy@gmail.com',
    pinCode: 535216,
    city: 'Bantupalle',
    state: 'Andhra Pradesh',
    country: 'India',
    district: 'Vizianagaram',
    mandal: 'Badangi',
    role: 5,
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkleVzHgzcc-btnmsz3B8jvS69AXp7ZaJU5w&s',
    identityProof: [
      'https://res.cloudinary.com/ddv2y93jq/image/upload/v1733394774/f9miuqgfqirzhndjzd6x.webp',
    ],
  };
  const handleContactPress = () => {
    const phoneNumber = `tel:${data.phoneNumber}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error('Could not open dialer', err)
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header Section with Gradient */}
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
   fontWeight:"500",
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
