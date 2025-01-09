import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icons library
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from "@react-navigation/native";


const DealCard = ({ deal }) => {
    console.log("DEALSSSSSSSSSSSSS",deal)
  

    return (

        <Card style={styles.card}>
            <Card.Content>
         
                <Text style={styles.customerName}>{deal.customer.firstName} {deal.customer.lastName}</Text>

                 <View style={styles.detailsContainer}>
                     <View style={styles.detailItem}>
                    <FontAwesome5 name="phone-alt" size={20} color="#057ef0" />
                    <Text style={styles.detailText}>{deal.customer.phoneNumber}</Text>
                    </View>



                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="home-city" size={20} color="#057ef0" />
                        <Text style={styles.detailText}>{deal.propertyName} - {deal.propertyType}</Text>
                    </View>

                
                    {deal.propertyType === 'Layout' && (
                     <View style={styles.detailItem}>
                    <Entypo name="location-pin" size={20} color="#057ef0" />
                    <Text style={styles.detailText}>{deal.property.layoutDetails.address.district}, {deal.property.layoutDetails.address.state}</Text>
                </View>
                    )}

{deal.propertyType === 'Agricultural land' && (
                     <View style={styles.detailItem}>
                    <Entypo name="location-pin" size={20} color="#057ef0" />
                    <Text style={styles.detailText}>{deal.property?.address?.district}, {deal.property?.address?.state}</Text>
                </View>
                    )}

                 
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}  >
                        <Text style={styles.buttonText}>Schedule Meet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.closeButton]}  >
                        <Text style={styles.buttonText}>Close Deal</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>

        
        </Card>

    );
};







function AgentDeals() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const getDeals = useCallback( async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch("http://172.17.15.184:3000/deal/getAgentDealings", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setDeals(data.data);
            console.log("Fetched deals:", data.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setLoading(false);


        }
    },[])
  useFocusEffect(
     useCallback(() => {
       getDeals();
      }, [getDeals])
   );
    

    return (
        <View style={styles.container} >
            {loading ? (
                <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} >
                    {deals.map((deal) => (
                        <DealCard key={deal._id} deal={deal} />
                    ))}
                </ScrollView>
            )}
        </View>
    )
}





const styles = StyleSheet.create({
    card: {
         borderRadius: 10,
        overflow: 'hidden',
         paddingRight: 10,
        marginHorizontal: 10,
        marginTop:15
    },
    customerName: {
        fontSize: 18,
        color: "#333333",
        fontWeight:"bold"
    },
    dealTime: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailsContainer: {
        marginTop: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    detailText: {
        marginLeft: 10,
        fontSize: 14,
    },
    avatar: {
        position: 'absolute',
        right: 16,
        top: '40%',
        transform: [{ translateY: -24 }], // To center vertically
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#057ef0',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#ff4747',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AgentDeals;
