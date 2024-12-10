import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layoutform from './Layoutform';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Appointment = () => {
    return (
        <View style={styles.container}>
          {/* <Layoutform/> */}
          {/* <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}

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

export default Appointment;
