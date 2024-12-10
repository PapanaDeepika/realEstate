import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Wishlist = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the wishlist Component</Text>
            {/* You can add form elements or appointments-related UI here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Wishlist;
