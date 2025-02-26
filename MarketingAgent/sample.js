import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { RadioButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-fontawesome';
import { jwtDecode } from 'jwt-decode';
const CustomerDropdown = ({route}) => {
  console.log("Ba", route?.params?.ba)
  const [customers, setCustomers] = useState([]); // All customer data
  const [dropdownItems, setDropdownItems] = useState([]); // Dropdown items
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // Selected customer's accountId
  const [open, setOpen] = useState(false); // Dropdown open state
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected customer's full data
const [properties, setProperties] = useState([])
const [dropdownProps, setDropdownProps] = useState([]);
const [open1, setOpen1] = useState(false); // Dropdown open state
const [selectedProp, setSelectedProp] = useState(null)
const [soldStatus, setSoldStatus] = useState(null); // null, 'yes', 'no'
const [description, setDescription] =useState()
const [expPrice, setExpPrice] = useState()
const [comments, setComments] = useState()
const [selectedProperty, setSelectedProperty] = useState(null)
const handleSoldStatusChange = (value) => {
     setSoldStatus(value)
  
    
     
  };

  useEffect(() => {
    // Fetch customer data
    const fetchCustomers = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("http://172.17.15.189:3000/customer/getCustomer", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        const customerData = data;
        const dropdownData = customerData.map((customer) => ({
          label: `${customer.firstName} ${customer.lastName}`, // Full name as label
          value: customer.accountId, // Use accountId as the unique identifier
          key: customer.accountId, // Ensure key is unique
        }));

        setCustomers(customerData);
        setDropdownItems(dropdownData);
       } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    const fetchProperties = async () => {
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) {
            console.log("No token found");
            return;
          }
  
          const response = await fetch("http://172.17.15.189:3000/deal/getAllProperties", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          const data = await response.json();
          const propertyData = data.data;
          const dropdownData = propertyData.map((property) => ({
            label: `${property.propertyName} - ${property.type}`, // Full name as label
            value: property.id, // Use accountId as the unique identifier
            key: property.id, // Ensure key is unique
          }));
  
          setProperties(propertyData);
          setDropdownProps(dropdownData);
         } catch (error) {
          console.error("Failed to fetch properties:", error);
        }
      };

    fetchCustomers();
    fetchProperties()
  }, []);
  const onCustomerOpen = useCallback(() => {
    setOpen1(false);
  }, []);

  const onPropertyOpen = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // Find the selected customer details based on accountId
    if (selectedCustomerId) {
      const customer = customers.find(cust => cust.accountId === selectedCustomerId);
      setSelectedCustomer(customer);
    }
    if(selectedProp){
      const prop = properties.find(p => p.id === selectedProp)
setSelectedProperty(prop);
     
     }
     
  }, [selectedCustomerId, customers, selectedProp, properties]);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Deal Created Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };

  const alreadyDeal = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Already a deal has been created for this customer on this property',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };

  const [loading, setLoading] = useState(false);

  const createDeal = async () => {
    console.log("selected deal", selectedCustomer, selectedProperty, soldStatus);
    setLoading(true); // Start loading
    const propData = {
      ...selectedProperty,
      propertyId: selectedProperty.id,
      propertyType: selectedProperty.type,
    };
    let data = {};
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }
  
      const decodedToken = jwtDecode(token);
      console.log("DECODED", decodedToken);
  
      if (decodedToken.user.role === 3) {
        data = {
          properties: [propData],
          interestIn: soldStatus,
          comments: comments,
          expectedPrice: expPrice,
        };
      }
      if (decodedToken.user.role === 1) {
        data = {
          properties: [propData],
          interestIn: soldStatus,
          comments: comments,
          customerId: selectedCustomer._id,
          expectedPrice: expPrice,
          email: selectedCustomer.email || "",
        };
      }
  
      const response = await fetch(`http://172.17.15.189:3000/deal/createDeal`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      console.log("RESPON", response);
  
      if (response.ok) {
        console.log("RRESPONSE FROM BACK", response.ok);
        showToastWithGravityAndOffset();
        setExpPrice("");
        setComments("");
        setSoldStatus("");
        setSelectedProp("");
        setSelectedProperty("");
      }
  
      if (response.status === 400) {
        alreadyDeal();
      }
    } catch (error) {
      console.error("Failed to add customer:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    
    <ScrollView 
    style={styles.container}
 showsVerticalScrollIndicator={false}
    nestedScrollEnabled={true}

    
  >
       <Text style={styles.label}>Select Customer:</Text>
        <DropDownPicker
          open={open}
          value={selectedCustomerId}
          items={dropdownItems}
          setOpen={setOpen}
          setValue={setSelectedCustomerId}
          setItems={setDropdownItems}
          searchable={true}
          placeholder="Search and select a customer"
          searchPlaceholder="Type to search..."
          zIndex={2000}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          onOpen={onCustomerOpen}
          maxHeight={200}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />

        <Text style={styles.label}>Select Property:</Text>
        <DropDownPicker
          open={open1}
          value={selectedProp}
          items={dropdownProps}
          setOpen={setOpen1}
          setValue={setSelectedProp}
          setItems={setDropdownProps}
          searchable={true}
          placeholder="Search and select a property"
          searchPlaceholder="Type to search..."
          zIndex={1000}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          onOpen={onPropertyOpen}
          maxHeight={200}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />


     

 

{selectedCustomer && (
<>
<Text style={styles.label}>First Name</Text>
<TextInput placeholder='Enter expected price' style={styles.textInput} value={selectedCustomer.firstName} editable={false}  />

<Text style={styles.label}>Last Name</Text>
<TextInput placeholder='Enter expected price' style={styles.textInput} value={selectedCustomer.lastName}  editable={false}  />

<Text style={styles.label}>Email</Text>
<TextInput placeholder='Enter expected price' style={styles.textInput} value={selectedCustomer.email} editable={false}    />

<Text style={styles.label}>Phone Number</Text>
<TextInput placeholder='Enter expected price' style={styles.textInput} value={selectedCustomer.phoneNumber} editable={false}   />
</>
)}
 
<Text style={styles.label}>Interested In</Text>

<View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton
            value="1"
            status={soldStatus === '1' ? 'checked' : 'unchecked'}
            onPress={() => handleSoldStatusChange('1')}
          />
          <Text>Yes</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="-1"
            status={soldStatus === '-1' ? 'checked' : 'unchecked'}
            onPress={() => handleSoldStatusChange('-1')}
          />
          <Text>No</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="0"
            status={soldStatus === '0' ? 'checked' : 'unchecked'}
            onPress={() => handleSoldStatusChange('0')}
          />
          <Text>Pending</Text>
        </View>
      </View>

<Text style={styles.label}>Expected Price</Text>
<TextInput placeholder='Enter expected price' style={styles.textInput} value={expPrice} onChangeText={setExpPrice}  />

<Text style={styles.label}>Comment(s)</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter description"
                value={comments}
                onChangeText={setComments}
                multiline
                numberOfLines={4}
              />
        
        
        <TouchableOpacity
    style={{ alignItems: "flex-end" }}
    onPress={createDeal}
    disabled={loading}
  >
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#057ef0",
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        opacity: loading ? 0.7 : 1, // Reduce opacity when loading
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Icon
          name="account-plus"
          size={20}
          color="white"
          style={{ marginRight: 5 }}
        />
      )}
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        {loading ? "Processing..." : "Add Deal"}
      </Text>
    </View>
  </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingBottom:50
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  customerDetails: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  dropdownCustomer: {
    zIndex: 1001, // Set zIndex for customer dropdown to be higher
  },
  dropdownProperty: {
    zIndex: 1000, // Set zIndex for property dropdown to be lower
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
});

export default CustomerDropdown;
