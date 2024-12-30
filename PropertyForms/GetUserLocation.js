
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from "expo-location";
import { Button } from 'react-native-paper';
export const Locationing = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [locationDetails, setLocationDetails] = useState("");

    const getUserLocation = async () => {
        try {
            // Request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was not granted');
                return;
            }

            // Get user's current position
            let { coords } = await Location.getCurrentPositionAsync();
            if (coords) {
                const { latitude, longitude } = coords;
                console.log("Latitude and Longitude: ", latitude, longitude);
                setLatitude(latitude);
                setLongitude(longitude);

                // Reverse geocode to get address
                let response = await Location.reverseGeocodeAsync({ longitude, latitude });
                if (response.length > 0) {
                    const address = response[0];
                    const locationString = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
                    console.log("User Location: ", locationString);
                    setLocationDetails(locationString);
                } else {
                    setLocationDetails("Unable to retrieve address");
                }
            }
        } catch (error) {
            console.error("Error fetching location: ", error);
            setErrorMsg("Error fetching location");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Get Current Location</Text>
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
            <Button mode="contained" onPress={getUserLocation} style={styles.button}>
                Get Location
            </Button>
            <View style={styles.infoContainer}>
                {latitude && longitude ? (
                    <Text style={styles.info}>
                        Latitude: {latitude}{"\n"}
                        Longitude: {longitude}{"\n"}
                        Address: {locationDetails || "Fetching..."}
                    </Text>
                ) : (
                    <Text style={styles.info}>Click the button to get your location</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#6200ee',
    },
    infoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});





