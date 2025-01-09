import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React,{useState,useCallback,useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView ,ActivityIndicator, TouchableOpacity} from 'react-native';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 

 

function MyCustomers() {
    const navigation=useNavigation()
    const [customers,setCustomers] = useState({})
    const [loading,setLoading] = useState(true)
   
 useFocusEffect(
    useCallback(() => {
      getCustomers();
    }, [getCustomers])
  );
    const getCustomers=useCallback(async()=>{
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch("http://172.17.15.184:3000/customer/myCustomer", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setCustomers(data);
            console.log("Fetched customers:", data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setLoading(false);


        }
    }
  )
      
    const customerDetails = (customer) => {
        navigation.navigate('customerDetails', { propByRoute: customer });
      };

      const CustomerCard = ({ customer }) => {
       
      
        return (
          <Card style={styles.card} onPress={()=>{customerDetails(customer)}}>
            <Card.Content style={styles.cardContent}>
              <Avatar.Image size={80} source={{ uri: customer.profilePicture }} />
              <View style={styles.customerDetails}>
                <Title style={styles.buyerName}>{customer.firstName} {customer.lastName}</Title>
                <View style={styles.detailRow}>
                  <Icon name="email" size={20} color="#057ef0"/>
                  <Paragraph style={styles.detailText}>{customer.email}</Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="phone" size={20} color="#057ef0" />
                  <Paragraph style={styles.detailText}>{customer.phoneNumber}</Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="map-marker" size={20} color="#057ef0" />
                  <Paragraph style={styles.detailText}>{customer.district}, {customer.state}</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        );
      };
      const addCustomer =()=>{
navigation.navigate("addCust")
      }

  return (
    <>
    {loading ? (
                    <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
                ) : (
    <ScrollView style={styles.container}>
        
        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={addCustomer}>
  <View
    style={{
      flexDirection: "row",
      backgroundColor: "#057ef0",
      marginTop: 10,
      marginRight: 10,
      padding: 10,
      borderRadius: 5,
      alignItems: "center", // Aligns icon and text vertically
    }}
  >
    <Icon
      name="account-plus"
      size={20}
      color="white"
      style={{ marginRight: 5 }} // Adds spacing between icon and text
    />
    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
      Add Customer
    </Text>
  </View>
</TouchableOpacity>


    <View style={styles.listContainer}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <CustomerCard customer={item} />}
        scrollEnabled={false}
      />
    </View>
  </ScrollView>
                )}
                </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loader:{
flex:1,
alignItems:'center',
justifyContent:'center'
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerDetails: {
    flex: 1,
    marginLeft: 16,
  },
  buyerName: {
    fontSize: 18,
     marginBottom: 8,
    color:"#000",
    fontWeight:"400"
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color:"#000"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Space out buttons evenly
    paddingBottom: 8,
    paddingTop: 8,
  },
  button: {
    width: 100, // Fixed width for buttons
    marginHorizontal: 4,
  },
});

export default MyCustomers;
