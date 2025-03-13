
// -------------------
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BuyerMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken'); // Replace 'authToken' with your actual key
//         if (!token) {
//           console.error('No token found in AsyncStorage');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           ' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/meeting/getAllScheduledMeetings',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("the response is 587 -->", response);
//         if (response.data && response.data.data) {
//           setMeetings(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching meetings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeetings();
//   }, []);

//   const filteredMeetings = meetings.filter((item) => {
//     return (
//       item.scheduledByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.location.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>Scheduled By: {item.scheduledByName}</Text>
//       <Text>Property Name: {item.propertyName}</Text>
//       <Text>Location: {item.location}</Text>
//       <Text>
//         Meeting Start Time: {new Date(item.meetingStartTime).toLocaleString()}
//       </Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//        <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search meetings..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//       <FlatList
//         data={filteredMeetings}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 8,
//     borderRadius: 8,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     padding: 16,
//     marginVertical: 8,
//     borderRadius: 8,
//     elevation: 4, // Adds shadow for Android
//     shadowColor: '#000', // Adds shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default BuyerMeetings;

// -------------------------
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper'; // Importing List component for accordion and icon
import i18n from '../i18n';

// const BuyerMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [expanded, setExpanded] = useState({}); // State to handle expanded accordions

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken'); // Replace 'authToken' with your actual key
//         if (!token) {
//           console.error('No token found in AsyncStorage');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           ' https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/meeting/getAllScheduledMeetings',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("the response is 587 -->", response);
//         if (response.data && response.data.data) {
//           setMeetings(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching meetings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeetings();
//   }, []);

//   const handlePress = (propertyName) => {
//     setExpanded((prevExpanded) => ({
//       ...prevExpanded,
//       [propertyName]: !prevExpanded[propertyName], // Toggle accordion for specific propertyName
//     }));
//   };

//   const filteredMeetings = meetings.filter((item) => {
//     return (
//       item.scheduledByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.location.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.meetingText}>Location: {item.location}</Text>
//       <Text style={styles.meetingText}>
//         Meeting Start Time: {new Date(item.meetingStartTime).toLocaleString()}
//       </Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//        <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   // Group meetings by "propertyName"
//   const groupedMeetings = filteredMeetings.reduce((acc, meeting) => {
//     const { propertyName } = meeting;
//     if (!acc[propertyName]) {
//       acc[propertyName] = [];
//     }
//     acc[propertyName].push(meeting);
//     return acc;
//   }, {});

//   return (
//     <SafeAreaView style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search meetings..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//       <FlatList
//         data={Object.keys(groupedMeetings)} // Use the keys of the grouped meetings (propertyName)
//         keyExtractor={(item) => item}
//         renderItem={({ item: propertyName }) => (
//           <List.Accordion
//             title={`Property: ${propertyName}`}
//             expanded={expanded[propertyName] || false}
//             onPress={() => handlePress(propertyName)}
//             left={(props) => <List.Icon {...props} icon="home" />}
//             style={styles.accordion}>
//             {groupedMeetings[propertyName].map((meeting) => (
//               <List.Item
//                 key={meeting._id}
//                 title={`Scheduled To: ${meeting.agentName}`}
//                 description={`Location: ${meeting.location}`}
//                 right={() => (
//                   <Text>{new Date(meeting.meetingStartTime).toLocaleString()}</Text>
//                 )}
//               />
//             ))}
//           </List.Accordion>
//         )}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };
const BuyerMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({});


  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };
  
  useEffect(() => {


    loadLanguage()
    const fetchMeetings = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('No token found in AsyncStorage');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/meeting/getAllScheduledMeetings',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("the response comes -->",response.data.data)


        if (response.data && response.data.data) {
          setMeetings(response.data.data );
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);
  const handlePress = (propertyName) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [propertyName]: !prevExpanded[propertyName],
    }));
  };

  const filteredMeetings = meetings.filter((item) => {
    return (
      item.scheduledByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const groupedMeetings = filteredMeetings.reduce((acc, meeting) => {
    const { propertyName } = meeting;
    if (!acc[propertyName]) {
      acc[propertyName] = [];
    }
    acc[propertyName].push(meeting);
    return acc;
  }, {});

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
       <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={i18n.t("Search meetings...")}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={Object.keys(groupedMeetings)}
        keyExtractor={(item) => item}
        renderItem={({ item: propertyName }) => (
          <List.Accordion
            title={`${i18n.t("Property")}: ${propertyName}`}
            expanded={expanded[propertyName] || false}
            onPress={() => handlePress(propertyName)}
            left={(props) => <List.Icon {...props} icon="home" />}
            style={styles.accordion}
          >
            {groupedMeetings[propertyName].map((meeting) => (
              <View key={meeting._id} style={styles.meetingCard}>
                <Text style={styles.meetingDetail}>
                  <Text style={styles.label}>{i18n.t("Scheduled To")}: </Text>
                  {meeting.agentName}
                </Text>
                <Text style={styles.meetingDetail}>
                  <Text style={styles.label}>{i18n.t("Location")}: </Text>
                  {meeting.location}
                </Text>
                <Text style={styles.meetingDetail}>
                  <Text style={styles.label}>{i18n.t("Meeting Start Time")}: </Text>
                  {new Date(meeting.meetingStartTime).toLocaleString()}
                </Text>
              </View>
            ))}
          </List.Accordion>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 16,
  //   backgroundColor: '#f8f8f8',
  // },
  // searchInput: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   marginBottom: 16,
  //   paddingLeft: 8,
  //   borderRadius: 8,
  // },
  // accordion: {
  //   backgroundColor: '#ffffff',
  //   marginBottom: 8,
  //   borderRadius: 8,
  //   elevation: 4, // Adds shadow for Android
  //   shadowColor: '#000', // Adds shadow for iOS
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  // },
  // meetingText: {
  //   fontSize: 14,
  //   marginBottom: 4,
  // },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 60,

    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 30,
    backgroundColor: '#e9f7fe',
  },
  accordion: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  meetingCard: {
    backgroundColor: '#e9f7fe',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  meetingDetail: {
    fontSize: 14,
    color: '#333333',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BuyerMeetings;



