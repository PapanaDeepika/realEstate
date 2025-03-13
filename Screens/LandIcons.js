import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 import i18n from '../i18n';

const { width } = Dimensions.get('window'); // Get screen width for dynamic styling

export default function AddPropertyScreen() {
    const navigation = useNavigation()
  useEffect(()=>{
 loadLanguage()
  },[])

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>{i18n.t("Add Property Details")}</Text>

      {/* Icon Grid */}
      <View style={styles.iconGrid}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconWrapper}>
          <MaterialCommunityIcons name="sprout" size={50} color="#0d416b"  onPress={() => {
              console.log("IN THE PRESS")
                navigation.navigate('agricultureForm')
            }} />
            {/* <Icon name="leaf" size={50} color="#0d416b" /> */}
            <Text style={styles.iconText}>{i18n.t("Agriculture")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="building" size={50} color="#0d416b"onPress={() => {
                navigation.navigate('LayoutForm')
            }}/>


            <Text style={styles.iconText}>{i18n.t("Layout")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="industry" size={50} color="#0d416b" onPress={()=>{navigation.navigate('CommercialForm')}} />
            <Text style={styles.iconText}>{i18n.t("Commercial")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="home" size={50} color="#0d416b" onPress={()=>{
              navigation.navigate('residentialForm')
            }} />
            <Text style={styles.iconText}>{i18n.t("Residential")}</Text>
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
    fontFamily:"Montserrat_500Medium",

  },
  heading: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#0d416b',
    marginBottom: 30, // Space below the heading
    textAlign: 'center', // Center the heading
    fontFamily:"Montserrat_700Bold",

  },
  iconGrid: {
    flexDirection: 'column', // Stack rows vertically
    justifyContent: 'center', // Center items in the grid
    alignItems: 'center', // Center icons horizontally
    fontFamily:"Montserrat_500Medium",

  },
  row: {
    flexDirection: 'row', // Display icons in a row
    justifyContent: 'space-evenly', // Space out icons evenly within each row
    width: width - 40, // Make sure the icons fit in the screen (width - padding)
    marginBottom: 20, // Space between rows
    fontFamily:"Montserrat_500Medium",

  },
  iconWrapper: {
    borderColor: "#0d416b", // Set border color to match the icon color
    borderWidth: 2, // Border thickness
    padding: 10, // Padding inside the border
    borderRadius: 10, // Rounded corners for the border
    justifyContent: 'center',
    alignItems: 'center',
    width: 120, // Fixed width for each icon
    height: 120, // Fixed height for each icon (equal size for all icons)
    fontFamily:"Montserrat_500Medium",

  },
  iconText: {
    fontSize: 14,
    color: '#0d416b',
    marginTop: 5, // Space between the icon and the text
    textAlign: 'center', // Center the text below the icon
    fontFamily:"Montserrat_500Medium",

  },
});
