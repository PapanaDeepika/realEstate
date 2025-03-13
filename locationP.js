import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { sendLocation } from './sentLocation';

export default function LocationPicker1({ onLocationSelected }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      } catch (error) {
        setErrorMsg(`Error requesting location permission: ${error.message}`);
      }
    })();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setShowMap(true);
      try {
        const sentLocation = await sendLocation(location.coords.latitude, location.coords.longitude);
        onLocationSelected(sentLocation);
      } catch (error) {
        setErrorMsg(`Error sending location: ${error.message}`);
      }
    } catch (error) {
      setErrorMsg(`Error getting current location: ${error.message}`);
    }
  };

  const handleChooseLocation = () => {
    Alert.alert(
      "Choose Location",
      "Do you want to use your current location?",
      [
        {
          text: "No",
          onPress: () => setShowMap(true),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            try {
              getCurrentLocation();
            } catch (error) {
              setErrorMsg(`Error in handleChooseLocation: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  const handleMapPress = (event) => {
    try {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setLocation({ latitude, longitude });
      const sentLocation = sendLocation(latitude, longitude);
      onLocationSelected(sentLocation);
    } catch (error) {
      setErrorMsg(`Error handling map press: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleChooseLocation}>
        <Text style={styles.buttonText}>Choose Location</Text>
      </TouchableOpacity>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
              latitude: location?.latitude || 37.78825,
              longitude: location?.longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            )}
          </MapView>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowMap(false)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {location && (
        <View style={styles.locationInfo}>
          <Text>Selected Location:</Text>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

   
      },
  button: {
         

    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width:'100%'
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  locationInfo: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});


