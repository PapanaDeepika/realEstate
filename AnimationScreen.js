// import React, { useState, useEffect } from 'react';
// import { Text, TextInput,View, StyleSheet, Animated, Dimensions, Image } from 'react-native';

// const { height } = Dimensions.get('window'); // Get screen height for dynamic sizing

// export default function AnimationScreen() {
//   const [slideValue] = useState(new Animated.Value(-height / 2)); // Initial value set to hide from the top (off-screen)

//   useEffect(() => {
//     // Slide animation to move the screen down and cover half of the screen
//     Animated.timing(slideValue, {
//       toValue: 0, // Move the screen into view
//       duration: 1000, // 2 seconds animation
//       useNativeDriver: false, // Disable for non-translateX/Y transforms
//     }).start();
//   }, [slideValue]);

//   const animatedStyle = {
//     top: slideValue, // Animate the top position to slide down
//   };

//   return (
//     <View style={styles.container}>
//       {/* Non-animated content */}
      
//       <View style={styles.staticView}>
        
        
//         {/* Input fields */}
//         <TextInput placeholder="Enter your Name" style={styles.inputField} />
//         <TextInput placeholder="Enter your Email" style={styles.inputField} keyboardType="email-address" />
//         <TextInput placeholder="Enter your Phone" style={styles.inputField} keyboardType="phone-pad" />
//         <TextInput placeholder="Enter your Address" style={styles.inputField} multiline />
//         <TextInput placeholder="Enter your Password" style={styles.inputField} secureTextEntry />

//       </View>

//       {/* Animated top-cover screen */}
//       <Animated.View style={[styles.animatedView, animatedStyle]}>
//         {/* Four icons placed at the bottom */}
//         <Text>CHOOSE CATEGORY</Text>
//         <View style={styles.iconContainer}>
//           <Image source={require('./assets/fields.png')} style={styles.icon} />
//           <Image source={require('./assets/residential.png')} style={styles.icon} />
//           <Image source={require('./assets/home.png')} style={styles.icon} />
//           <Image source={require('./assets/layouts.png')} style={styles.icon} />
//         </View>
       
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   staticView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20, // Padding for better alignment
//   },
//   staticText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20, // Space between text and input fields
//   },
//   inputField: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginVertical: 10,
//     fontSize: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3, // Shadow for Android
//   },

//   animatedView: {
//     position: 'absolute',
//     top: 0, // Start from the top
//     left: 0,
//     right: 0,
//     height: '20%', // Cover half the screen
//     backgroundColor: '#05223f', // Background color of the animated part
//     justifyContent: 'flex-end', // Align icons at the bottom
//     alignItems: 'center',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20, // Space between icons and bottom edge
//   },
//   icon: {
//     width: 60,
//     height: 60, // Adjust icon size as needed
//     margin: 10,
//     borderRadius:14
//   },
// });


import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import AgricultureForm from './AgricultureForm';
import CommercialForm from './CommercialForm';
import Layoutform from './Layoutform';
import Residentialform from './Residentialform';

const { height } = Dimensions.get('window'); // Get screen height for dynamic sizing

// Define components for each icon's content
const FieldsComponent = () => (
  <View style={styles.contentView}>
    <Text style={styles.componentText}>You clicked on Fields!</Text>
  </View>
);

const ResidentialComponent = () => (
  <View style={styles.contentView}>
    <Text style={styles.componentText}>You clicked on Residential!</Text>
  </View>
);

const HomeComponent = () => (
  <View style={styles.contentView}>
    <Text style={styles.componentText}>You clicked on Home!</Text>
  </View>
);

const LayoutsComponent = () => (
  <View style={styles.contentView}>
    <Text style={styles.componentText}>You clicked on Layouts!</Text>
  </View>
);

export default function AnimationScreen() {
  const [slideValue] = useState(new Animated.Value(-height / 2)); // Initial value set to hide from the top (off-screen)
  const [selectedComponent, setSelectedComponent] = useState(null); // Track which component to render

  useEffect(() => {
    // Slide animation to move the screen down and cover half of the screen
    Animated.timing(slideValue, {
      toValue: 0, // Move the screen into view
      duration: 1000, // 1 second animation
      useNativeDriver: false,
    }).start();
  }, [slideValue]);

  const animatedStyle = {
    top: slideValue, // Animate the top position to slide down
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'fields':
        return <AgricultureForm />;
      case 'residential':
        return <Residentialform />;
      case 'home':
        return <CommercialForm />;
      case 'layouts':
        return <Layoutform />;
      default:
        return (
          <View style={styles.staticView}>
            <Text style={styles.staticText}>Please select on icon  category by clicking an icon.</Text>
          <TextInput style={styles.inputfield}>owner name</TextInput>
          <TextInput style={styles.inputfield}>Contact No</TextInput>
          <TextInput style={styles.inputfield}>Land Type</TextInput>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Non-animated content */}
      {renderSelectedComponent()}

      {/* Animated top-cover screen */}
      <Animated.View style={[styles.animatedView, animatedStyle]}>
        {/* Four icons placed at the bottom */}
        <Text style={styles.categoryText}>CHOOSE CATEGORY</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setSelectedComponent('fields')}>
            <Image source={require('./assets/fields.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedComponent('residential')}>
            <Image source={require('./assets/residential.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedComponent('home')}>
            <Image source={require('./assets/home.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedComponent('layouts')}>
            <Image source={require('./assets/layouts.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  staticView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Padding for better alignment
  },
  staticText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20, // Space between text and input fields
  },
  animatedView: {
    position: 'absolute',
    top: 0, // Start from the top
    left: 0,
    right: 0,
    height: '20%', // Cover half the screen
    backgroundColor: '#05223f', // Background color of the animated part
    justifyContent: 'flex-end', // Align icons at the bottom
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20, // Space between icons and bottom edge
  },
  icon: {
    width: 60,
    height: 60, // Adjust icon size as needed
    margin: 10,
    borderRadius: 14,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  inputfield:{
   
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
//   
  }
});
