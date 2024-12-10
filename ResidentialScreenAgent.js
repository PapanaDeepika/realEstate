import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ResidentialScreenAgent = () => {
    const [residentials, setResidentials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    useEffect(() => {

        navigation.setOptions({
            title: 'Residential Properties', // Set the title for the screen
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('ResidentialForm')} // Navigate to "AgricultureForm" when button is pressed
              >
                <Text style={styles.headerButtonText}>Add Property Details</Text>
              </TouchableOpacity>
            ),
          });


        const fetchResidentials = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const response = await fetch('http://172.17.15.53:3000/residential/getallresidentials', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                setResidentials(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch residentials:', error);
                setLoading(false);
            }
        };

        fetchResidentials();
    }, []);

    const renderResidentialCard = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
            <Image
                source={{ uri: item.propPhotos[0] }}
                style={styles.cardImage}
            />
            <View style={styles.cardContent}>
                <Text style={styles.apartmentName}>{item.propertyDetails.apartmentName || 'No Name'}</Text>
                <Text style={styles.flatCost}>Flat Cost: ₹{item.propertyDetails.flatCost.toLocaleString() || 'N/A'}</Text>
                <Text style={styles.flatSize}>Flat Size: {item.propertyDetails.flatSize} sq. ft.</Text>
                <Text style={styles.district}>District: {item.address.district || 'N/A'}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleCardClick = (item) => {
        navigation.navigate('ResidentialDetail', { id: item._id }); // Navigate to detail screen
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Filter the residentials based on the search input
    const filteredResidentials = residentials.filter(item =>
        item.propertyDetails.apartmentName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search properties..."
                    value={search}
                    onChangeText={text => setSearch(text)}
                />
            </View>

            {/* Residential Cards */}
            <FlatList
                data={filteredResidentials}
                renderItem={renderResidentialCard}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                numColumns={1} // Single card per row
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingBottom: 20,
    },
    searchBarContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInput: {
        fontSize: 16,
        color: '#333',
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
        padding: 15,
    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardContent: {
        padding: 10,
    },
    apartmentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    flatCost: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    flatSize: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    district: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    headerButton: {
        borderWidth: 2, // Set border thickness
        borderColor: '#000000', // Set border color to black
        borderRadius: 8, // Rounded corners for the button
        paddingVertical: 6, // Vertical padding for text spacing
        paddingHorizontal: 10, // Horizontal padding for text spacing
        marginRight: 10, // Space the button from the header
        backgroundColor: 'transparent', // Transparent background (no fill)
      },
      headerButtonText: {
        color: '#000000', // Text color set to black
        fontWeight: 'bold', // Make the text bold
      }
});

export default ResidentialScreenAgent;


