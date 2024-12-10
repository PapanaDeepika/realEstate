// import react from "react";
// import {View,Text,StyleSheet} from "react-native"

//  export const CsrHomePage=()=>{
//     return (<>

//     <View>
//         <Text>hello csr</Text>
//     </View>




//     </>)

// }

// const styles=StyleSheet.create({

// });
 // ----------------------------------------------


// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export const CsrHomePage = () => {
//   const navigation = useNavigation(); // Hook for navigation

//   return (
//     <View style={styles.container}>
//       {/* First Box */}
//       <TouchableOpacity
//         style={styles.box}
//         onPress={() => navigation.navigate("getcsr")}
//       >
//         <Text style={styles.boxText}>Go to Agent Assign</Text>
//       </TouchableOpacity>

//       {/* Second Box */}
//       <TouchableOpacity
//         style={styles.box}
//         onPress={() => navigation.navigate("csrprops")}
//       >
//         <Text style={styles.boxText}>Go to CSR Properties</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//   },
//   box: {
//     width: 200,
//     height: 100,
//     backgroundColor: "#007bff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   boxText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
// -----------------------------------------------------
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
 
import { useNavigation } from "@react-navigation/native";

export const CsrHomePage = () => {
  const navigation = useNavigation(); // Hook for navigation

  return (
     <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CSR Dashboard</Text>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.description}>Welcome, CSR! Manage agents and properties with ease.</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* First Box */}
        <TouchableOpacity
          style={[styles.box, styles.agentAssignBox]}
          onPress={() => navigation.navigate("getcsr")}
        >
          <Text style={styles.boxText}>Agent Assign</Text>
        </TouchableOpacity>

        {/* Second Box */}
        <TouchableOpacity
          style={[styles.box, styles.propertiesBox]}
          onPress={() => navigation.navigate("csrprops")}
        >
          <Text style={styles.boxText}>CSR Properties</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#f4f4f9",
  },
  header: {
    backgroundColor: "#007bff",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  descriptionSection: {
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  box: {
    width: "40%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
     marginBottom: 15,
  },
  agentAssignBox: {
    backgroundColor: "#4CAF50",
  },
  propertiesBox: {
    backgroundColor: "#FF5722",
 
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
