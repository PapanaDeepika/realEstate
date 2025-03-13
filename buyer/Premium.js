import React, { useState,useEffect } from 'react';
import { View, Text,Modal,ScrollView,TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// const Premium = () => {
//   const [selectedPlan, setSelectedPlan] = useState('monthly');
// //   const [selectedPlan, setSelectedPlan] = useState('monthly');
//   const [modalVisible, setModalVisible] = useState(false);
//   const features = [
//     { emoji: '🚀', text: 'Access all premium features' },
//     { emoji: '🎨', text: 'Unlock exclusive designs' },
//     { emoji: '📊', text: 'Advanced analytics' },
//     { emoji: '💾', text: 'Save unlimited projects' },
//     { emoji: '🎁', text: 'Priority customer support' },
//   ];

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setModalVisible(true); // Show the modal when a plan is selected
//   };
//   return (
//     <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Choose Your Plan</Text>
//         <Text style={styles.subtitle}>Unlock all premium features</Text>
//       </View>

//       {/* Plan Options */}
//       <View style={styles.planContainer}>
//         <TouchableOpacity
//           style={[styles.planCard, selectedPlan === 'monthly' && styles.selectedCard]}
//           onPress={() => handlePlanSelect('monthly')}
//         >
//           <Text style={styles.planTitle}>Monthly Plan</Text>
//           <Text style={styles.planPrice}>$9.99 / month</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.planCard, selectedPlan === 'yearly' && styles.selectedCard]}
//           onPress={() => handlePlanSelect('yearly')}
//         >
//           <View style={styles.discountBadge}>
//             <Text style={styles.discountText}>Save 20%</Text>
//           </View>
//           <Text style={styles.planTitle}>Yearly Plan</Text>
//           <Text style={styles.planPrice}>$99.99 / year</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.planCard, selectedPlan === 'trial' && styles.selectedCard]}
//           onPress={() => handlePlanSelect('trial')}
//         >
//           <Text style={styles.planTitle}>Free Trial</Text>
//           <Text style={styles.planPrice}>7 Days Free</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal for Features */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Premium Features</Text>
//             {features.map((feature, index) => (
//               <Text key={index} style={styles.feature}>
//                 {feature.emoji} {feature.text}
//               </Text>
//             ))}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Buy Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// };

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const features = [{ emoji: '🚀' }];
  const properties = [
    {
      id: 1,
      name: 'Luxury Villa',
      image: 'https://via.placeholder.com/150',
      price: '$1,500,000',
      size: '3,000 sq ft',
    },
    {
      id: 2,
      name: 'Modern Apartment',
      image: 'https://via.placeholder.com/150',
      price: '$900,000',
      size: '1,200 sq ft',
    },
    {
      id: 3,
      name: 'Beach House',
      image: 'https://via.placeholder.com/150',
      price: '$2,200,000',
      size: '5,000 sq ft',
    },
  ];

  useEffect(() => {
    // Example for API call
    console.log('API integration ready');
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setModalVisible(true);
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Unlock all premium features</Text>
      </View>

      <View style={styles.planContainer}>
        <TouchableOpacity
          style={[styles.planCard, selectedPlan === 'monthly' && styles.selectedCard]}
          onPress={() => handlePlanSelect('monthly')}
        >
          <Text style={styles.planTitle}>Monthly Plan</Text>
          <Text style={styles.planPrice}>$9.99 / month</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.planCard, selectedPlan === 'yearly' && styles.selectedCard]}
          onPress={() => handlePlanSelect('yearly')}
        >
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>Save 20%</Text>
          </View>
          <Text style={styles.planTitle}>Yearly Plan</Text>
          <Text style={styles.planPrice}>$99.99 / year</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.freeTrialButton}>
        <Text style={styles.freeTrialText}>Start Free Trial</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {properties.map((property) => (
          <TouchableOpacity
            key={property.id}
            style={styles.propertyCard}
            onPress={() => handlePropertySelect(property)}
          >
            <Image source={{ uri: property.image }} style={styles.propertyImage} />
            <Text style={styles.propertyName}>{property.name}</Text>
            <Text style={styles.propertyDetails}>Size: {property.size}</Text>
            <Text style={styles.propertyPrice}>{property.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🚀</Text>
            <Text style={{fontWeight:'bold'}}>Unlock The Premium Deals </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  //   container: { flex: 1 },
  //   header: { padding: 20, alignItems: 'center' },
  //   title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  //   subtitle: { fontSize: 16, color: 'white', marginTop: 5 },
  //   planContainer: { margin: 20 },
  //   planCard: {
  //     backgroundColor: 'white',
  //     padding: 15,
  //     marginVertical: 10,
  //     borderRadius: 10,
  //     alignItems: 'center',
  //   },
  //   selectedCard: { borderColor: 'blue', borderWidth: 2 },
  //   planTitle: { fontSize: 18, fontWeight: 'bold' },
  //   planPrice: { fontSize: 16, color: 'gray' },
  //   discountBadge: { position: 'absolute', top: -10, right: -10, backgroundColor: 'gold', padding: 5, borderRadius: 5 },
  //   discountText: { fontSize: 12, color: 'white', fontWeight: 'bold' },
  //   ctaButton: {
  //     backgroundColor: 'blue',
  //     padding: 15,
  //     margin: 20,
  //     borderRadius: 10,
  //     alignItems: 'center',
  //   },
  //   ctaText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  //   modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  //   modalContent: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  //   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  //   feature: { fontSize: 16, marginVertical: 5 },
  //   closeButton: { marginTop: 15, backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  //   closeButtonText: { color: 'white', fontSize: 16 },
  //   scrollView: { marginTop: 20 },
  // propertyCard: {
  //   width: 150,
  //   marginRight: 10,
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   padding: 10,
  // },
  // propertyImage: { width: '100%', height: 100, borderRadius: 10 },
  // propertyName: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  // propertyDetails: { fontSize: 14, color: 'gray' },
  // propertyPrice: { fontSize: 16, color: 'blue', marginTop: 5 },
  // modalImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },


  container: { flex: 1 },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 16, color: 'white', marginTop: 5 },
  planContainer: { margin: 20 ,alignItems:'center'},
  planCard: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 220,
  },
  selectedCard: { borderColor: 'blue', borderWidth: 2 },
  planTitle: { fontSize: 18, fontWeight: 'bold' },
  planPrice: { fontSize: 16, color: 'gray' },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'gold',
    padding: 5,
    borderRadius: 5,
  },
  discountText: { fontSize: 12, color: 'white', fontWeight: 'bold' },
  freeTrialButton: { backgroundColor: 'blue', padding: 20, margin: 20,borderRadius: 10 },
  freeTrialText: { color: 'white', textAlign: 'center' },
  scrollView: { marginTop: 20 },
  propertyCard: {
    width: 180,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  propertyImage: { width: '100%', height: 100, borderRadius: 10 },
  propertyName: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  propertyDetails: { fontSize: 14, color: 'gray' },
  propertyPrice: { fontSize: 16, color: 'blue', marginTop: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalEmoji: { fontSize: 50, marginBottom: 20 },
  closeButton: { marginTop: 15, backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  closeButtonText: { color: 'white', fontSize: 16 },
});

export default Premium
