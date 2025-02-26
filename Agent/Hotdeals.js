
import Appointments from './Appointments';

import Symbol from 'react-native-vector-icons/MaterialCommunityIcons';
import {createDrawerNavigator} from '@react-navigation/drawer'


import React, { useRef, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome for icons
import HomePage from '../HomePage';

function Hotdeals({navigation}) {
  const [deals, setDeals] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
const drawer= createDrawerNavigator()
  const data = [
    { name: 'Cozy Apartment', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', price: '$120/night', size: '60 m²', location: 'New York' },
    { name: 'Beachfront Villa', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', price: '$350/night', size: '200 m²', location: 'Los Angeles' },
    { name: 'City Loft', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9mdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', price: '$180/night', size: '80 m²', location: 'Chicago' },
    { name: 'Mountain Cabin', image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', price: '$150/night', size: '100 m²', location: 'Denver' },
    { name: 'Luxury Penthouse', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVudGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', price: '$500/night', size: '150 m²', location: 'Miami' },
    { name: 'Rustic Farmhouse', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', price: '$200/night', size: '180 m²', location: 'Austin' }
  ];

  const appointmentsData = [
    { name: "Ranveer Singh", location: "Guntur", time: "9:30 pm", id: 1 },
    { name: "Deepika Padukone", location: "Mumbai", time: "10:00 am", id: 2 },
    { name: "Alia Bhatt", location: "Delhi", time: "2:30 pm", id: 3 },
    { name: "Ranveer Singh", location: "Guntur", time: "9:30 pm", id: 4 }
  ];

  useEffect(() => {

    navigation.setOptions({
      title: 'Home', // Set the title of the header
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
                  <TouchableOpacity onPress={() => { 
          navigation.navigate('editProfile'); 
        }}>
          <Symbol 
            name="account-check" // Icon for user-edit
            size={25}
            color="#00aae7" // Set the icon color
            style={{ marginRight: 15 }} // Add some margin for spacing
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { 
          navigation.navigate('editProfile'); 
        }}>
          <Symbol 
            name="bell" // Icon for user-edit
            size={25}
            color="#00aae7" // Set the icon color
            style={{ marginRight: 15 }} // Add some margin for spacing
          />
        </TouchableOpacity>
         <TouchableOpacity onPress={() => { 
          navigation.navigate('editProfile'); 
        }}>
          <Symbol 
            name="power" // Icon for user-edit
            size={25}
            color="#00aae7" // Set the icon color
            style={{ marginRight: 15 }} // Add some margin for spacing
          />
        </TouchableOpacity>
        </View>
      ),
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => { 
      
      //   }}>
      //     <Symbol 
      //       name="menu" // Icon for user-edit
      //       size={30}
      //       color="black" // Set the icon color
      //       style={{ marginLeft: 15 }} // Add some margin for spacing
      //     />
      //   </TouchableOpacity>
      // ),
    });

    const getTopValuedProperties = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get("http://172.17.15.189:3000/admin/getTopPropOnPrice", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        setDeals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTopValuedProperties();

    const scrollInterval = setInterval(() => {
      setScrollPosition(prev => (prev + screenWidth) % (screenWidth * data.length));
    }, 2000); // Scroll every 3 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  const handleSeeAllPress = () => {
    console.log("See all pressed");
  };

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.x);
  };

  return (
  
    <View style={{ paddingRight: 10, paddingLeft: 10 }}>
      
        <View>
          <Text style={{ fontWeight: 600, fontSize: 22, marginLeft: 10, color: "#003B73" }}>Today</Text>
          <Appointments data={appointmentsData} />
        </View>
        <View style={styles.textStyle}>
          <Text style={{ fontWeight: "900", fontSize: 22, color: "#0d416b" }}>Latest Deals</Text>
          <TouchableOpacity onPress={handleSeeAllPress}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline', marginRight: 10 }}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          style={{ paddingVertical: 5 }}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
          data={deals}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: screenWidth - 40,
                marginRight: 20,

                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <Image
                source={{ uri: item.images[0] }}
                style={{ width: '100%', height: 200, borderRadius: 10 }} />
              <View style={{ marginTop: 10, width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0d416b' }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Icon name="usd" size={18} color="#0d416b" style={{ marginRight: 5 }} />
                  <Text>{item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Icon name="arrows-alt" size={18} color="#0d416b" style={{ marginRight: 5 }} />
                  <Text>{item.size}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="map-marker" size={18} color="#0d416b" style={{ marginRight: 5 }} />
                  <Text>{item.district}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onScroll={handleScroll}
          snapToInterval={screenWidth - 30}
          decelerationRate="fast"
          contentOffset={{ x: scrollPosition, y: 0 }} />
      </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginLeft:10
  }
});

export default Hotdeals;


// export default Hotdeals;


// const styles = StyleSheet.create({
//   textStyle: {

//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     marginTop: 10,
//     paddingHorizontal: 12
//   },
//   appointments: {
//     justifyContent: "flex-start",
//     width: 170,
//     height: 120,
//     borderRadius: 10,
//     backgroundColor: '#b4dffa',
//     padding: 10,
//     marginTop: 10,
//     marginLeft:10
//   }
// })