import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Deals() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deals</Text>
      <Text style={styles.description}>Find the best deals here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Light background color
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2b96ed', // Blue color for the header
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555555', // Dark gray color for the description
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Deals;
