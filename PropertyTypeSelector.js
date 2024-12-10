// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const PropertyTypeSelector = ({ navigation }) => {
//   // Function to handle button presses
//   const handlePress = (type) => {
//     // Navigate to different screens based on the button pressed
//     switch (type) {
//       case 'Agriculture':
//         navigation.navigate('AgricultureForm'); // Route name for Agriculture form
//         break;
//       case 'Commercial':
//         navigation.navigate('CommercialForm'); // Route name for Commercial form
//         break;
//       case 'Layout':
//         navigation.navigate('LayoutForm'); // Route name for Layout form
//         break;
//       case 'Residential':
//         navigation.navigate('ResidentialForm'); // Route name for Residential form
//         break;
//       default:
//         console.log('Unknown property type');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Property Type:</Text>
//       <Button title="Agriculture" onPress={() => handlePress('Agriculture')} />
//       <Button title="Commercial" onPress={() => handlePress('Commercial')} />
//       <Button title="Layout" onPress={() => handlePress('Layout')} />
//       <Button title="Residential" onPress={() => handlePress('Residential')} />
//     </View>
//   );
// };

// // Stylesheet for custom styling
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
// });

// export default PropertyTypeSelector;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PropertyTypeSelector = ({ navigation }) => {
  // Function to handle button presses
  const handlePress = (type) => {
    // Navigate to different screens based on the button pressed
    switch (type) {
      case 'Agriculture':
        navigation.navigate('AgricultureForm'); // Route name for Agriculture form
        break;
      case 'Commercial':
        navigation.navigate('CommercialForm'); // Route name for Commercial form
        break;
      case 'Layout':
        navigation.navigate('LayoutForm'); // Route name for Layout form
        break;
      case 'Residential':
        navigation.navigate('ResidentialForm'); // Route name for Residential form
        break;
      default:
        console.log('Unknown property type');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Property Type:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Agriculture')}>
          <Text style={styles.buttonText}>Agriculture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Commercial')}>
          <Text style={styles.buttonText}>Commercial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Layout')}>
          <Text style={styles.buttonText}>Layout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Residential')}>
          <Text style={styles.buttonText}>Residential</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stylesheet for custom styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default PropertyTypeSelector;
