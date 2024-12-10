import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FinancialAssistant = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the FinancialAssistant Component</Text>
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

export default FinancialAssistant;
