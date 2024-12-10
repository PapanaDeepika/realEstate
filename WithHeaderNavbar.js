import React from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import HeaderNavbar from './HeaderNavbar'; 

const WithHeaderNavbar = (WrappedComponent) => {
    return ({ navigation }) => {
        const handleLogout = async () => {
            try {
                
                await AsyncStorage.removeItem('userToken');
               
                navigation.navigate('Login'); 
            } catch (error) {
                console.error('Failed to log out:', error);
               
            }
        };

        return (
            <View style={styles.container}>
                <HeaderNavbar onLogout={handleLogout} />
                <WrappedComponent navigation={navigation} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default WithHeaderNavbar;











