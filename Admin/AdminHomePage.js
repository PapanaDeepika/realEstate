import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AdminHomePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Top Properties */}
      <Text style={styles.sectionTitle}>Top Properties</Text>
      <View style={styles.propertyContainer}>
        <TouchableOpacity
          style={styles.propertyCard}
          onPress={() => navigation.navigate("propertydetails", { id: 1 })}
        >
          <Text style={styles.propertyTitle}>Luxury Villa in Beverly Hills</Text>
          <Text style={styles.propertyInfo}>Price: $2.5M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.propertyCard}
          onPress={() => navigation.navigate("propertydetails", { id: 2 })}
        >
          <Text style={styles.propertyTitle}>Modern Apartment in NYC</Text>
          <Text style={styles.propertyInfo}>Price: $1.2M</Text>
        </TouchableOpacity>
      </View>

      {/* Existing Properties */}
      <Text style={styles.sectionTitle}>Existing Properties</Text>
      <View style={styles.propertyContainer}>
        <TouchableOpacity
          style={styles.propertyCard}
          onPress={() => navigation.navigate("propertydetails", { id: 3 })}
        >
          <Text style={styles.propertyTitle}>Cozy Cottage in the Countryside</Text>
          <Text style={styles.propertyInfo}>Price: $500K</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.propertyCard}
          onPress={() => navigation.navigate("propertydetails", { id: 4 })}
        >
          <Text style={styles.propertyTitle}>Beachfront Property in Miami</Text>
          <Text style={styles.propertyInfo}>Price: $3.0M</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("assignagent")}
      >
        <Text style={styles.boxText}>Go to Agent Assign</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  propertyContainer: {
    marginBottom: 20,
  },
  propertyCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  propertyInfo: {
    fontSize: 14,
    color: "#333",
  },
  box: {
    width: "100%",
    height: 60,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
