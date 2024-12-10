



import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
// import Layoutform from './Layoutform';


// const LandingPage = ({ navigation }) => {
//   const [landDetails, setLandDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     // Fetch the data from the API
//     axios.get('http://172.17.15.53:3000/getallprops')
//       .then(response => {
//         setLandDetails(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching data: ", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   // Render each property card
//   const renderItem = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <TouchableOpacity    onPress={() => navigation.navigate('Login')}>
//         <Image
//           source={{ uri: item.images[0] }}
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//         <View style={styles.priceTag}>
//           <Text style={styles.priceText}>₹{item.price}</Text>
//         </View>
//       </TouchableOpacity>
//       <View style={styles.cardDetails}>
//         <Text style={styles.cardTitle}>{item.title}</Text>
//         <Text style={styles.cardSize}>{item.size} sq. ft</Text>
//         <Text style={styles.cardLocation}>{item.district}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Properties</Text>

//       {/* Sign In Button */}
//       <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.signInText}>Sign In</Text>
//       </TouchableOpacity>


//       <ImageBackground
//         source={require('./assets/landingpageupdate.jpg')}  // Update this path as needed
//         style={styles.backgroundImage}
//       >

//         {/* <Layoutform/> */}

       
//          {/* Box for subHeader text */}
//       <View style={styles.subHeaderBox}>
//         <Text style={styles.subHeader}>Agriculture Commercial Layout Residential</Text>  
//       </View>
//       </ImageBackground>



//       {/* Display Property Cards */}
//       <FlatList
//         data={landDetails}
//         renderItem={renderItem}
//         keyExtractor={item => item._id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   backgroundImage: {
//     width: '100%',
//     height: 120,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },


//   subHeaderBox: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//     padding: 5,
//     borderRadius: 20,
//     marginTop: 80, 
//     alignItems: 'center', 
//     borderWidth: 2, 
//     borderColor: '#fff', 
//   },


//   subHeader: {
//     fontSize: 17,
//     color: '#fff',
//     fontWeight: 'bold',
//   },


//   signInButton: {
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     padding: 10,
//     position: 'absolute',
//     top: 20,
//     right: 16,
//   },
//   signInText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },

//   listContainer: {
//     padding: 8,
//   },
//   cardContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 18,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardImage: {
//     height: 120,
//     width: '100%',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   priceTag: {
//     position: 'absolute',
//     top: 0,
//     right: 260,
//     backgroundColor: '#329da8',
//     padding: 8,
//     borderRadius: 5,
//   },
//   priceText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   cardDetails: {
//     padding: 6,
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 8,
//   },
//   cardSize: {
//     color: 'black',
//     marginBottom: 8,
//   },
//   cardLocation: {
//     color:'black',
//     top:-30,
//     left:200,
//   },
// });


const LandingPage = ({ navigation }) => {
  const [landDetails, setLandDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(5); // Limit initial visible items to 5

  useEffect(() => {
    // Fetch the data from the API
    axios.get('http://172.17.15.53:3000/getallprops')
      .then(response => {
        setLandDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Render each property card
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>₹{item.price}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSize}>{item.size} sq. ft</Text>
        <Text style={styles.cardLocation}>{item.district}</Text>
      </View>
    </View>
  );

  return (

    <View style={styles.container}>
      <Text style={styles.header}>Properties</Text>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <ImageBackground
        source={require('./assets/landingpageupdate.jpg')}
        style={styles.backgroundImage}
        onPress={() => navigation.navigate('Login')}
      >
        {/* Subheader */}
        <View style={styles.subHeaderBox}>
          <Text style={styles.subHeader} onPress={() => navigation.navigate('Login')}>Agriculture    Commercial    Layout    Residential</Text>  
        </View>
      </ImageBackground>

      {/* Display Property Cards */}
      <FlatList
        data={landDetails.slice(0, visibleItems)} // Show limited items
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Show More Button */}
      {visibleItems < landDetails.length && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backgroundImage: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius:35
  },
  subHeaderBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 5,
    borderRadius: 20,
    marginTop: 80, 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#fff', 
  },
  subHeader: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    top: 20,
    right: 16,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 8,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    height: 120,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  priceTag: {
    position: 'absolute',
    top: 0,
    right: 260,
    backgroundColor: '#329da8',
    padding: 8,
    borderRadius: 5,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardDetails: {
    padding: 6,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  cardSize: {
    color: 'black',
    marginBottom: 8,
  },
  cardLocation: {
    color: 'black',
    top: -30,
    left: 200,
  },
  showMoreButton: {
    backgroundColor: '#007bff',
    width:300,
    padding: 20,
    marginLeft:50,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  showMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LandingPage;

// export default LandingPage;

















