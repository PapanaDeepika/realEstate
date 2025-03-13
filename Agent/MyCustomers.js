import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MyCustomers() {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [loading1, setLoading1] = useState(false);

  const [hasMoreData, setHasMoreData] = useState(true);

  useFocusEffect(
    useCallback(() => {
      console.log("call back");
      getCustomers();
    }, [getCustomers])
  );
  const getCustomers = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      if (page === 1) {
        setLoading(true);
      } else {
        setLoading1(true);
      }

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app//customer/myCustomer?page=${page}&limit=8`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        setCustomers((prevData) => [...prevData, ...data]);

        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setLoading(false);
      setHasMoreData(false);
    } finally {
      setLoading(false);
      setLoading1(false);
    }
  });

  const customerDetails = (customer) => {
    navigation.navigate("customerDetails", { propByRoute: customer });
  };

  const CustomerCard = ({ customer }) => {
    return (
      <Card
        style={styles.card}
        onPress={() => {
          customerDetails(customer);
        }}
      >
        <Card.Content style={styles.cardContent}>
          <Avatar.Image size={80} source={{ uri: customer.profilePicture }} />
          <View style={styles.customerDetails}>
            <Title style={styles.buyerName}>
              {customer.firstName} {customer.lastName}
            </Title>
            <View style={styles.detailRow}>
              <Icon name="email" size={20} color="#057ef0" />
              <Paragraph style={styles.detailText}>
                {customer?.email || "N/A"}
              </Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="phone" size={20} color="#057ef0" />
              <Paragraph style={styles.detailText}>
                {customer.phoneNumber}
              </Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="map-marker" size={20} color="#057ef0" />
              <Paragraph style={styles.detailText}>
                {customer.district}, {customer.state}
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const addCustomer = () => {
    navigation.navigate("addCust");
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={addCustomer}
          >
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
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
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
              showsVerticalScrollIndicator={false}

              onEndReached={()=>{
                if(hasMoreData)
                {
                  getCustomers()
                }
              }}

              onEndReachedThreshold={0.5}
              ListFooterComponent={<>{loading1?(<ActivityIndicator />):(null)}</>}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    fontFamily:"Montserrat_500Medium",

  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily:"Montserrat_500Medium",

  },
  listContainer: {
    padding: 16,
    fontFamily:"Montserrat_500Medium",

  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
    fontFamily:"Montserrat_500Medium",

  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily:"Montserrat_500Medium",

  },
  customerDetails: {
    flex: 1,
    marginLeft: 16,
    fontFamily:"Montserrat_500Medium",

  },
  buyerName: {
    fontSize: 18,
    marginBottom: 8,
    color: "#000",
    // fontWeight: "400",
    fontFamily:"Montserrat_500Medium",

  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    fontFamily:"Montserrat_500Medium",

  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
    fontFamily:"Montserrat_500Medium",

  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Space out buttons evenly
    paddingBottom: 8,
    paddingTop: 8,
    fontFamily:"Montserrat_500Medium",

  },
  button: {
    width: 100, // Fixed width for buttons
    marginHorizontal: 4,
    fontFamily:"Montserrat_500Medium",

  },
});

export default MyCustomers;
