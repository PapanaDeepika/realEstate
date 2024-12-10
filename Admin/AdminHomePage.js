import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AdminHomePage = () => {
  const navigation = useNavigation(); // Hook for navigation
  const registerCsr =()=> {
    navigation.navigate("CsrRegistration")
  }
  return (
    <View style={styles.container}>
      {/* First Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("assignagent")}
      >
        <Text style={styles.boxText}>Go to Agent Assign</Text>
      </TouchableOpacity>

      {/* Second Box */}
     <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("")}
      >
        <Text style={styles.boxText}>Go to CSR Properties</Text>
      </TouchableOpacity> 
      <Button title="Register a CSR" onPress={registerCsr}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  box: {
    width: 200,
    height: 100,
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