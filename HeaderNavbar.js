

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';

const HeaderNavbar = ({ onLogout }) => {
    const navigation = useNavigation();
    const [showNavbar, setShowNavbar] = useState(false);  
    const [showDropdown, setShowDropdown] = useState(false);  

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Toggle Navbar Icon (Left side) */}
                <TouchableOpacity onPress={() => setShowNavbar(!showNavbar)} style={styles.iconContainer}>
                    <Icon name="menu-outline" size={30} color="#fff" />
                </TouchableOpacity>

                {/* Person Icon (Right side) */}
                <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.iconContainer}>
                    <Icon name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>

                {/* Dropdown for Profile and Logout */}
                {showDropdown && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.dropdownItem}>
                            <Text style={styles.dropdownItemText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('LandingPage')} style={styles.dropdownItem}>
                            <Text style={styles.dropdownItemText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Navbar (displayed only when the menu icon is clicked) */}


            {showNavbar && (
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Appointment')} style={styles.navButton}>
                        <Icon name="calendar-outline" size={24} color="#000" />
                        <Text style={styles.navButtonText}>Appointments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} style={styles.navButton}>
                        <Icon name="heart-outline" size={24} color="#000" />
                        <Text style={styles.navButtonText}>Wishlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FinancialAssistant')} style={styles.navButton}>
                        <Icon name="cash-outline" size={24} color="#000" />
                        <Text style={styles.navButtonText}>Financial Assistant</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',   
        top: 0,                 
        left: 0,
        right: 0,
        zIndex: 1000,         
        // backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backgroundColor:'#05223f',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    iconContainer: {
        padding: 10,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        right: 2,
        // backgroundColor: '#fff',
        backgroundColor: '#e0f7fa', 
        borderRadius: 5,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        zIndex: 1001,  
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    navbar: {
        position: 'absolute',
        top: 50,  
        left: 2,
        backgroundColor: '#e0f7fa',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        zIndex: 1001, 
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    navButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
});

export default HeaderNavbar;








