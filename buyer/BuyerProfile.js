import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, SafeAreaView, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function BuyerProfile({ navigation }) {
const [profile, setProfile] = useState();
const [loading, setLoading] = useState(true);
const [isEditing, setIsEditing] = useState(false);
const [updatedProfile, setUpdatedProfile] = useState({});
const [key, setKey] = useState(0);

const getAgentProfile = async () => {
try {
const token = await AsyncStorage.getItem('userToken');
if (!token) {
console.log('No token found');
return;
}
const decodedToken = jwtDecode(token);
const userId = decodedToken.user.userId;
const response = await axios.get('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/users/getprofile', {
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json',
},
});
const data = response.data;
setProfile(data);
setUpdatedProfile(data);
setLoading(false);
} catch (error) {
console.error('Failed to fetch profile:', error);
setLoading(false);
}
};

const handleEditProfile = () => setIsEditing(true);

const handleUpdateProfile = async () => {
try {
const token = await AsyncStorage.getItem('userToken');
if (!token) {
console.log('No token found');
return;
}
const response = await fetch('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/users/update', {
method: 'PUT',
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json',
},
body: JSON.stringify(updatedProfile),
});
const data = await response.json();
if (data.success) {
console.log('Profile updated successfully');
setIsEditing(false);
setKey(prevKey => prevKey + 1);
} else {
console.log('Failed to update profile:', data.message);
}
} catch (error) {
console.error('Error updating profile:', error);
}
};

useEffect(() => {
getAgentProfile();
}, [key]);


const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  // const cleanedValue = value.replace(/\D/g, '');

  // Format it into 'xxx xxx xxxx'
  console.log(value)
  value=String(value)
  let formattedPhoneNumber = '';
  if (value.length <= 3) {
    formattedPhoneNumber = value;
  } else if (value.length <= 6) {
    formattedPhoneNumber = value.substring(0, 3) + ' ' + value.substring(3, 6);
  } else {
    formattedPhoneNumber = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
  }

  return formattedPhoneNumber;
};


return (
<SafeAreaView style={styles.container}>
{loading ? (
<ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
) : (
<>
<View style={styles.profileSection}>
<Image source={{ uri: profile?.profilePicture || 'https://via.placeholder.com/100' }} style={styles.avatar} />
{!isEditing && (
<TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
<Icon name="pencil" size={20} color="#057ef0" />
</TouchableOpacity>
)}
</View>

{!isEditing ? (
<View style={styles.userInfoCard}>
<Text style={styles.rowText}>{profile?.firstName}, {profile?.lastName}</Text>
<View style={styles.row}>
<Icon name="map-marker-radius" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>Village: {profile?.city}</Text>
</View>
<View style={styles.row}>
<Icon name="map-marker-radius" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>Mandal: {profile?.mandal}</Text>
</View>
<View style={styles.row}>
<Icon name="map-marker-radius" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>District: {profile?.district}</Text>
</View>
<View style={styles.row}>
<Icon name="map-marker-radius" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>Pincode: {profile?.pinCode}</Text>
</View>
<View style={styles.row}>
<Icon name="map-marker-radius" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>State: {profile?.state}</Text>
</View>
<View style={styles.row}>
<Icon name="phone" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>Phone: {formatPhoneNumber( profile?.phoneNumber)}</Text>
</View>

{/* {profile?.altPhoneNumber} */}
<View style={styles.row}>
<Icon name="phone" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>ALternate mobile: {formatPhoneNumber( profile?.altPhoneNumber)}</Text>
</View>
<View style={styles.row}>
<Icon name="email" size={20} style={styles.rowIcon} />
<Text style={styles.rowText}>Email: {profile?.email}</Text>
</View>
</View>
) : (
<ScrollView style={styles.editForm}>
<TextInput style={styles.input} value={updatedProfile.firstName} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, firstName: text })} placeholder="First Name" />
<TextInput style={styles.input} value={updatedProfile.lastName} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, lastName: text })} placeholder="Last Name" />
<TextInput style={styles.input} value={updatedProfile.phoneNumber} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, phoneNumber: text })} placeholder="Phone Number" />
<TextInput style={styles.input} value={updatedProfile.altPhoneNumber} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, altPhoneNumber: text })} placeholder="Alternate Phone Number" />

<TextInput style={styles.input} value={updatedProfile.email} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, email: text })} placeholder="Email" />
<TextInput style={styles.input} value={updatedProfile.email} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, email: text })} placeholder="Email" />

<TextInput style={styles.input} value={updatedProfile.city} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, city: text })} placeholder="Village" />
<TextInput style={styles.input} value={updatedProfile.mandal} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, mandal: text })} placeholder="Mandal" />
<TextInput style={styles.input} value={updatedProfile.district} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, district: text })} placeholder="District" />
<TextInput style={styles.input} value={updatedProfile.pinCode} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, pinCode: text })} placeholder="Pincode" />
<TextInput style={styles.input} value={updatedProfile.state} onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, state: text })} placeholder="State" />
<TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
<Text style={styles.saveButtonText}>Save</Text>
</TouchableOpacity>
</ScrollView>
)}
</>
)}
</SafeAreaView>
);
}

 


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  loader: {
    marginTop: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#057ef0',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#057ef0',
  },
  userInfoCard: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rowIcon: {
    marginRight: 12,
    color: '#057ef0',
  },
  rowText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  editForm: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#057ef0',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 5,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  profileDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  profileDetails: {
    marginBottom: 15,
  },
  altPhoneContainer: {
    marginBottom: 10,
  },
});

 

export default BuyerProfile;