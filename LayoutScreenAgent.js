import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LayoutScreenAgent = () => {
    const [layouts, setLayouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation=useNavigation();

    useEffect(() => {



        navigation.setOptions({
            title: 'Layouts', // Set the title for the screen
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('LayoutForm')} // Navigate to "AgricultureForm" when button is pressed
              >
                <Text style={styles.headerButtonText}>Add Property Details</Text>
              </TouchableOpacity>
            ),
          });


        const fetchLayouts = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const response = await fetch('http://172.17.15.53:3000/layout/getalllayouts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                setLayouts(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch layouts:', error);
                setLoading(false);
            }
        };

        fetchLayouts();
    },[navigation]);

    const renderLayoutCard = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
            <Image
                source={{ uri: item.uploadPics[0] }}
                style={styles.cardImage}
            />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.layoutDetails.layoutTitle || 'No Title'}</Text>
                <Text style={styles.size}>Size: {item.layoutDetails.plotSize} sq. meters</Text>
                <Text style={styles.totalPlots}>Total Plots: {item.layoutDetails.plotCount}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleCardClick = (item) => {
        console.log('Layout card clicked:', item);
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
            <FlatList
                data={layouts}
                renderItem={renderLayoutCard}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                numColumns={1} // Single card per row
                showsVerticalScrollIndicator={false}
            />
        </View>
        
        // <View></View>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    size: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    totalPlots: {
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
      },
});

export default LayoutScreenAgent;
