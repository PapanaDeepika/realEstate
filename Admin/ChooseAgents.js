// import React, { useState, useEffect } from 'react';

// import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AgentScreen from '../Agent';

//  export const ChooseAgents = ({route}) => {
//     const {csrId}=route.params;
//     const {name}= route.params;

//     // {{
// //     "csrId":"6751717a48d9840e48229626",
// //     "agents":[
// //           "673f656f5d97fa31e042b423",
// //           "67517c6c0d08ecf7d3c21f8d"
// //     ]
// // }}

//   const [layouts, setLayouts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch layouts data from API
//   const fetchLayouts = async () => {
//     console.log("received the csr id-->",csrId);

//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         console.log('No token found');
//         return;
//       }

//       const response = await fetch('http://172.17.15.68:3000/agent/getUnAssignedAgents', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         }
//       });

//       const data = await response.json();
// console.log("the data is fetched was --> ",data);
//       if (Array.isArray(data)) {
//         setLayouts(data);
//         console.log('Fetched data:', setLayouts);  // Check the structure of the data

//       } else {
//         console.log('Unexpected data format:', data);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching layouts:', error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLayouts();
//   }, []);

//   // Render each item in the FlatList
//   const renderItem = ({ item }) => {
//     if (!item) {
//       return <Text>CSR data is missing</Text>; // Show a fallback message if csr is missing
//     }
//     console.log("the render item i scalled ")

//     // const { csr, totalAgents } = item;

//     // const {csr,totalAgents}=item;
//     // console.log(" the agents -->",totalAgents);

//     return (
//         <ScrollView>

//       <View style={styles.card}>
//       {/* <AgentScreen/> */}
//         {item.profilePicture ? (
//           <Image source={{ uri: item.profilePicture }} style={styles.cardImage} />
//         ) : (
//           <Text>No profile picture</Text> // Fallback if no image
//         )}
//         <View style={styles.cardContent}>
//           <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
//           <Text style={styles.details}>{`Phone: ${item.phoneNumber}`}</Text>
//           <Text style={styles.details}>{`Email: ${item.email}`}</Text>
//           <Text style={styles.details}>{`Location: ${item.city}, ${item.state}, ${item.country}`}</Text>
//           {/* <Text style={styles.details}>{`Agents Assigned: ${totalAgents}`}</Text> */}
//         </View>
//       </View>

//       </ScrollView>
//     );
//   };

//   return (
//     <View style={styles.container}>
//         <Text>the CsrId is :{csrId}</Text>
//         <Text>the CsrName is :{name}</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator while fetching
//       ) : (
//         <FlatList
//           data={layouts}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.csr} // Ensure key extraction is safe
//         />
//       )}
//       {/* {onclick()=>{}} */}
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   card: {
//     flexDirection: 'row',
//     marginBottom: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     borderColor: '#ddd',
//     alignItems: 'center',
//   },
//   cardImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   details: {
//     fontSize: 14,
//     color: '#555',
//   },
// };

// ----------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   ScrollView,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const ChooseAgents = ({ route }) => {
//   const { csrId, name } = route.params;

//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch agents data from API
//   const fetchAgents = async () => {
//     console.log("Received CSR ID:", csrId);

//     try {
//       const token = await AsyncStorage.getItem("userToken");
//       if (!token) {
//         console.error("No token found");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://172.17.15.68:3000/agent/getUnAssignedAgents",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("Fetched data:", data);

//       if (Array.isArray(data)) {
//         setAgents(data);
//       } else {
//         console.error("Unexpected data format:", data);
//       }

//       setLoading(false);
//     } catch (error) {
//       // catch (error) {
//       //   console.error('Error fetching agents:', error.message);
//       //   setLoading(false);
//       // }

//       console.error("Error fetching agents:", error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   // Render each agent in the FlatList
//   const renderAgent = ({ item }) => {
//     return (
//       <View style={styles.card}>
//         {item.profilePicture ? (
//           <Image
//             source={{ uri: item.profilePicture }}
//             style={styles.cardImage}
//           />
//         ) : (
//           <Text>No profile picture available</Text>
//         )}
//         <View style={styles.cardContent}>
//           <Text
//             style={styles.name}
//           >{`${item.firstName} ${item.lastName}`}</Text>
//           <Text style={styles.details}>{`Phone: ${item.phoneNumber}`}</Text>
//           <Text style={styles.details}>{`Email: ${item.email}`}</Text>
//           <Text
//             style={styles.details}
//           >{`Location: ${item.city}, ${item.state}, ${item.country}`}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{`CSR ID: ${csrId}`}</Text>
//       <Text style={styles.header}>{`CSR Name: ${name}`}</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={agents}
//           renderItem={renderAgent}
//           keyExtractor={(item) => item._id} // Use a unique key (e.g., `_id`)
//         />
//       )}
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   card: {
//     flexDirection: "row",
//     marginBottom: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     borderColor: "#ddd",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   cardImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   details: {
//     fontSize: 14,
//     color: "#555",
//   },
// };
// -----------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChooseAgents = ({route}) => {
    const [layouts, setLayouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {csrId}=route.params;

    const fetchLayouts = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                console.log('No token found');
                setLoading(false);
                return;
            }

            const response = await fetch('http://172.17.15.68:3000/agent/getUnAssignedAgents', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                // Log status and raw response for debugging
                const rawResponse = await response.text();
                console.error(`Error fetching agents: HTTP ${response.status}`, rawResponse);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (contentType && contentType.includes('application/json')) {
                // Parse JSON if the response is of JSON type
                const data = await response.json();
                setLayouts(data);
            } else {
                // Handle unexpected non-JSON response
                const rawResponse = await response.text();
                console.error('Unexpected response format:', rawResponse);
                throw new Error('Response is not JSON');
            }
        } catch (error) {
            console.error('Error fetching agents:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLayouts();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>Email: {item.email}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>CSR ID : {csrId}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : layouts.length > 0 ? (
                <FlatList
                    data={layouts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.message}>No agents found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    message: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

// export default AgentList;
