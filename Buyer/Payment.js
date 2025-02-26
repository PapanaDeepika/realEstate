import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import RazorpayCheckout from 'react-native-razorpay';
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Payment() {
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
const [id, setId] = useState()
 
  const fetchPaymentDetails = async (paymentIntentId) => {
    console.log("In the ")
    console.log("Fetching payment details for:", paymentIntentId);
    const sk ="sk_test_51QprXqCIFuzY1JYT9bNmazVb5i33rA8MWn6IZ9mYledfMfG46fhBo5OHm04AyBVyMO04ncZE6vzLQ3nykElkOr4t00gcRgxcCl"
    const response = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sk}`, // Use your Stripe secret key
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    const paymentDetails = await response.json();
    console.log("Payment Details:", paymentDetails);
    Alert.alert("Payment Info", `Status: ${paymentDetails.status}, Amount: ${paymentDetails.amount}`);
  };
  
  
  const fetchPaymentSheetParams = async () => {
    console.log("In the PAI call");
    
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("No token found");
      return;
    }   
    const data = {
      "amount":200000
    } 
    const response = await fetch(`http://172.17.15.189:3000/filterRoutes/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include token here
      },
      body:JSON.stringify(data)
    });
  
    console.log("REsponse", response.ok)
    console.log("gsgfshdfjd", response)
    const {clientSecret , paymentIntentId} = await response.json();


    setId(paymentIntentId)
  console.log("abc", clientSecret)
    return {
      clientSecret, paymentIntentId
    };
  };
  

  const initializePaymentSheet = async () => {
    const {
      clientSecret , paymentIntentId
    } = await fetchPaymentSheetParams();



    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
        paymentIntentClientSecret: clientSecret,

      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    const { clientSecret, paymentIntentId } = await fetchPaymentSheetParams(); // Get paymentIntentId from backend

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!!!!!!!');
      fetchPaymentDetails(paymentIntentId);

    }
  };
  
  return (
     <StripeProvider
          publishableKey="pk_test_51QprXqCIFuzY1JYTW7qfSKoZchMEBsEVn9N4KTQ6UB5nAOrr0fbrRgTnckqWUoNmKrkRymwO5yWq1pMRiEoyfd3n005eXnA0K3" >
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
           <TouchableOpacity
  style={styles.button}
  onPress={async () => {
    console.log("Button pressed");
     try {
      await initializePaymentSheet();
      await openPaymentSheet();
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Something went wrong with the payment.");
    } finally {
      setPaymentProcessing(false);
    }
  }}
>
  <Text style={styles.buttonText}>{paymentProcessing ? "Processing..." : "Pay Now"}</Text>
</TouchableOpacity>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
    </StripeProvider>
  )
}

const styles = StyleSheet.create({
  
   
 
  button: {
    backgroundColor: "#528FF0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:'center'
  },
})

