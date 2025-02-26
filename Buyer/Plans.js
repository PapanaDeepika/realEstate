import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome } from '@expo/vector-icons';
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';


const Plans = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
       <LinearGradient
        colors={['#faedf4', '#c3e6fa']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }} 
        style={styles.pastel}
      >
        <View style={styles.startingView}>
          <Text style={styles.title}>Real Estate Premium</Text>
          <Text style={styles.title}>Find Your Dream Property</Text>
        </View>
        <Text style={styles.subtitleText}>Explore the best properties and choose a subscription plan that suits you!</Text>
 

 <View style={styles.sample}>
    <Text style={styles.subtitleText}>Prepaid and monthly plans available. Starts at 199.00/month.</Text>
    </View>

    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Real Estate Premium</Text>
      </TouchableOpacity>
      </LinearGradient>

      <View style={styles.card}>
          <Text style={styles.cardTitle}>Why Join Premium?</Text>
          <View style={styles.cardContent}>
            <View style={styles.point}>
              <FontAwesome name="check-circle" size={20} color="#057ef0" />
              <Text style={styles.pointText}>Exclusive Property Listings</Text>
            </View>
            <View style={styles.point}>
              <FontAwesome name="check-circle" size={20} color="#057ef0" />
              <Text style={styles.pointText}>Priority Support</Text>
            </View>
            <View style={styles.point}>
              <FontAwesome name="check-circle" size={20} color="#057ef0" />
              <Text style={styles.pointText}>Discounted Rates</Text>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal:20}}>
        <Text style={styles.title}>Pick a membership that fits you</Text>
        </View>


    
        <View style={[styles.planCard, ]}>

<View style={{flexDirection:'row', justifyContent:"space-between"}}>
<Text style={[styles.planCardTitle, ]}>Basic Plan</Text>
<Ionicons name="sparkles-sharp" size={24} color="#057ef0" style={styles.planIcon} />

</View>
<View style={styles.divider} />
<Text style={styles.planSubtitle}>For Casual Browsers</Text>



<Text style={styles.planCardPrice}>₹199/month</Text>
<Text style={styles.planDescription}>Basic support included</Text>

<TouchableOpacity style={[styles.planButton, ]}>
<Text style={[styles.planButtonText, ]}>Choose Plan</Text>
</TouchableOpacity>
</View>

{/* Standard Plan Card */}
<View style={styles.planCard}>
<View style={{flexDirection:'row', justifyContent:"space-between"}}>

<Text style={styles.planCardTitle}>Standard Plan</Text>
<Icon name="star" size={24} color="#057ef0" style={styles.planIcon} />


</View>
<View style={styles.divider} />

<Text style={styles.planSubtitle}>For Frequent Buyers</Text>


<Text style={styles.planCardPrice}>₹499/month</Text>
<Text style={styles.planDescription}>Standard support included</Text>

<TouchableOpacity style={styles.planButton}>
<Text style={styles.planButtonText}>Choose Plan</Text>
</TouchableOpacity>
</View>

{/* Premium Plan Card */}
<View style={styles.planCard}>
<View style={{flexDirection:'row', justifyContent:"space-between"}}>

<Text style={styles.planCardTitle}>Premium Plan</Text>
<Icon name="diamond" size={24} color="#057ef0" style={styles.planIcon} />

</View>
<View style={styles.divider} />
<Text style={styles.planSubtitle}>For Serious Buyers</Text>



<Text style={styles.planCardPrice}>₹999/month</Text>
<Text style={styles.planDescription}>Premium support included</Text>

<TouchableOpacity style={styles.planButton}>
<Text style={styles.planButtonText}>Choose Plan</Text>
</TouchableOpacity>
</View>

 
  


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the content takes full height
    backgroundColor:"#f5f5f5"
  },
  pastel: {
     justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startingView: {
    alignItems: 'center',  
marginTop:60,
marginBottom:10
  },
  subtitleText:{
    fontSize: 20,
     color: '#000',
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',  
    marginBottom:10,
   },
  button: {
    backgroundColor: '#057ef0',
    paddingVertical: 12,
     borderRadius: 25,
    elevation: 3,
     marginTop: 15,
     width: ScreenWidth *0.9  // 80% of the screen width
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign:'center'
  },

  sample:{
    marginTop:20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
     elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginHorizontal:10
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#057ef0',
     marginBottom: 15,
  },
  cardContent: {
    // paddingHorizontal: 5,
  },
  point: {
    flexDirection: 'row',
     marginBottom: 10,
  },
  pointText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },


   planCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
      elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical:10,
    marginHorizontal:20
  },
  planIcon: {
     marginBottom: 10,
  },
  planCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#057ef0',
     marginBottom: 5,
   },
  planSubtitle: {
    fontSize: 16,
    color: '#000',
   },
  planCardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
   },
  planDescription: {
    fontSize: 16,
    color: '#000',
     marginBottom: 20,
  },
  planButton: {
    backgroundColor: '#057ef0',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',  
   },
  planButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
});

export default Plans;
