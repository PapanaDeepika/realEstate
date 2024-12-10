// import { View, Text, FlatList, Dimensions, Image, StyleSheet } from "react-native";
// import React, { useEffect, useRef, useState } from "react";

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const Dummy = () => {
//     const images = [
//         'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
//         'https://images.unsplash.com/photo-1610100177133-cb4788574137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
//         'https://images.unsplash.com/photo-1627366197691-e0d5cee520bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
//     ];

//     const flatListRef = useRef(null);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Auto-scroll function
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex(prevIndex => {
//                 const nextIndex = (prevIndex + 1) % images.length;
//                 flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//                 return nextIndex;
//             });
//         }, 3000); // Change image every 3 seconds

//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, []);

//     return (
//         <View>
//             <FlatList
//                 ref={flatListRef}
//                 data={images}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 snapToInterval={SCREEN_WIDTH}
//                 snapToAlignment="center"
//                 decelerationRate="fast"
//                 pagingEnabled={true}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <View style={{ width: SCREEN_WIDTH, alignItems: 'center', marginVertical: 10 }}>
//                         <Image
//                             source={{ uri: item }}
//                             style={styles.image}
//                             resizeMode="cover"
//                         />
//                     </View>
//                 )}
//             />
//             <Text style={{ textAlign: 'center', marginVertical: 20 }}>Hey, okay</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     image: {
//         width: '95%',
//         height: 200, // Set a fixed height for the images
//         borderRadius: 5
//     },
//     imageText: {
//         position: 'absolute',
//         top: 10,
//         right: 15,
//         color: 'white'
//     }
// });

// export default Dummy;
// --------------

import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dummy = () => {
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useState(null);
 
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2ZDczZWFhNTQ2NzdiMzRiNGFkZDg0ZSIsImVtYWlsIjoibW9uaWthQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoiTW9uaWthIiwibGFzdE5hbWUiOiJTaW5naCIsInBob25lTnVtYmVyIjoiOTk0OTc3NTY2NSIsInJvbGUiOjN9LCJpYXQiOjE3MzA4OTI5MDEsImV4cCI6MTczMDk3OTMwMX0.s3bOz02Uxa9bgwN7OVrLZlusv31znmzB9cxQwwCdn40`

        if (!token) {
          console.log("token is required ");
          return;
        }

        const district="Vizianagaram";

        const response = await fetch(
          `http://172.17.15.53:3000/agent/getAgentsbyloc/${district}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );          

        console.log(" either the district is comng or not ->",district);
        console.log(" either the token is cmg o rnot -->",token);
        console.log("lets check here the error is cmg ->",response);

        if (response.ok) {
          const data1 = response.json();
          setLoc(data1);
          console.log("my response from agent api --> ", data1);
        } else {
          console.log("error fetching the agent details");
        }
      } catch (error) {
        console.error("error fetching the api");
      }
    };
    fetchAgents();
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View>
      {/* Agents list using FlatList */}
      <Text>hello </Text>
      <FlatList
        data={loc}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.agentimage}
            />
            <Text style={styles.name}>{item.firstName}</Text>
            <Text style={styles.details}>{item.phoneNumber}</Text>
            <Text style={styles.details}>{item.email}</Text>
            <Text style={styles.details}>{item.city}</Text>
            <Text style={styles.details}>{item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  agentimage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Dummy;
