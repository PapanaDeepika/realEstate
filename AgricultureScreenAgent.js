import React, { useEffect, useState } from 'react';
import { View, Button,Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AgricultureScreenAgent = () => {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    

    useEffect(() => {


        navigation.setOptions({
            title: 'Agriculture Fields', // Set the title for the screen
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('AgricultureForm')} // Navigate to "AgricultureForm" when button is pressed
              >
                <Text style={styles.headerButtonText}>Add Property Details</Text>
              </TouchableOpacity>
            ),
          });

        ///api-->
        const fetchFields = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const response = await fetch('http://172.17.15.53:3000/fields/getallfields', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                console.log(data);
                setFields(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch fields:', error);
                setLoading(false);
            }
        };

        fetchFields();
    }, [navigation]);

    const renderFieldCard = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
           
            <Image
                source={{ uri: item.landDetails.images[0] }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.priceTag}>
                <Text style={styles.priceText}>₹{item.landDetails.totalPrice.toLocaleString() || 'N/A'}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.landDetails.title || 'No Title'}</Text>
                <Text style={styles.cardSize}>Size: {item.landDetails.size} acres</Text>
                <Text style={styles.cardLocation}>{item.address.district || 'N/A'}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleCardClick = (item) => {
        navigation.navigate('AgricultureDetail', { id: item._id }); 
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <ImageBackground 
                    source={{ uri: 'data:image/jpeg;base64,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' }} 
                    style={styles.searchBackground}
                    imageStyle={{ borderRadius: 10 }} 
                >
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Agent Properties"
                        placeholderTextColor="#fff" 
                        value={search}
                        onChangeText={text => setSearch(text)}
                    />
                </ImageBackground>
            </View>

            {/* Property Cards */}
            <FlatList
                data={fields}
                renderItem={renderFieldCard}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
      },
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    searchBarContainer: {
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    card: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    priceTag: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardSize: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    cardLocation: {
        fontSize: 14,
        color: '#888',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        height: 60,
        justifyContent: 'center',
    }
});


export default AgricultureScreenAgent;

































