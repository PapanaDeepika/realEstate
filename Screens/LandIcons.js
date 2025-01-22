import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome icons

const { width } = Dimensions.get('window'); // Get screen width for dynamic styling

export default function AddPropertyScreen() {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Add Property Details</Text>

      {/* Icon Grid */}
      <View style={styles.iconGrid}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="leaf" size={50} color="#0d416b" onPress={() => {
              console.log("IN THE PRESS")
                navigation.navigate('agForm')
            }}/>
            <Text style={styles.iconText}>Agriculture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="building" size={50} color="#0d416b"onPress={() => {
                navigation.navigate('LayoutForm')
            }}/>
            <Text style={styles.iconText}>Layout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="industry" size={50} color="#0d416b" />
            <Text style={styles.iconText}>Commercial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="home" size={50} color="#0d416b" />
            <Text style={styles.iconText}>Residential</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    backgroundColor: '#f7f8fa', // Light background color for better contrast
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d416b',
    marginBottom: 30, // Space below the heading
    textAlign: 'center', // Center the heading
  },
  iconGrid: {
    flexDirection: 'column', // Stack rows vertically
    justifyContent: 'center', // Center items in the grid
    alignItems: 'center', // Center icons horizontally
  },
  row: {
    flexDirection: 'row', // Display icons in a row
    justifyContent: 'space-evenly', // Space out icons evenly within each row
    width: width - 40, // Make sure the icons fit in the screen (width - padding)
    marginBottom: 20, // Space between rows
  },
  iconWrapper: {
    borderColor: "#0d416b", // Set border color to match the icon color
    borderWidth: 2, // Border thickness
    padding: 20, // Padding inside the border
    borderRadius: 10, // Rounded corners for the border
    justifyContent: 'center',
    alignItems: 'center',
    width: 120, // Fixed width for each icon
    height: 120, // Fixed height for each icon (equal size for all icons)
  },
  iconText: {
    fontSize: 14,
    color: '#0d416b',
    marginTop: 5, // Space between the icon and the text
    textAlign: 'center', // Center the text below the icon
  },
});
