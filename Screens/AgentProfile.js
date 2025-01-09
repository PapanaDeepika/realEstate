import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState ,useCallback} from 'react'
import { ActivityIndicator } from 'react-native';
import {RefreshControl, View, TouchableOpacity, SafeAreaView, StyleSheet,ScrollView} from 'react-native'
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <Icon 
        name="menu" 
        size={30} 
        color="#000" 
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginLeft: 10 }}
      />
    );
  };



function AgentProfile({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh =  React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          agentProfileNew()
        }, 2000);
      }, []);
   
      const agentProfileNew = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
              console.log("No token found");
              return;
            }
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user.userId;
            console.log("USER", token)
            const response = await fetch(`http://172.17.15.184:3000/users/getprofile`
    , {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
      
            const data = await response.json();
            console.log("Fetched profile data:", data);
            setProfile(data);
            setLoading(false);
          } catch (error) {
            console.error("Failed to fetch profile:", error);
            setLoading(false);
          }
      }, []);

 useFocusEffect(
    useCallback(() => {
      agentProfileNew();
     }, [agentProfileNew])
  );
  
       
    

    const [profile,setProfile] = useState()
    const [loading,setLoading] =useState(true)
// const getAgentProfile=async()=>{
//     try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           console.log("No token found");
//           return;
//         }
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.user.userId;
//         console.log("USER", token)
//         const response = await fetch(`http://172.17.15.184:3000/users/getprofile`
// , {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
  
//         const data = await response.json();
//         console.log("Fetched profile data:", data);
//         setProfile(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         setLoading(false);
//       }
// }

    // useEffect(() => {
    //     console.log("awsdas")
    //   getAgentProfile()
        
    //   }, []);


  return (
    
    
<SafeAreaView style={styles.container}   
          >

{loading? (     <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
):(  
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
      <View style={styles.userInfoSection}>
        <View style={{flexDirection:'row', marginTop:15}}>
            <Avatar.Image 
            source=
            {{uri:profile.profilePicture,}}
            size={80} />

<View style={{marginLeft:20}}>
    <Title style={[styles.title, {
        marginTop:15,
        marginBottom:5
    }]}>{profile.firstName} {profile.lastName}</Title>
    <Caption style={styles.caption}>@{profile.firstName}_{profile.lastName}</Caption>
</View>
</View>
    </View>

<View style={styles.userInfoSection}>
    <View style={styles.row}>
        <Icon name="map-marker-radius" color="#057ef0" size={20}></Icon>
        <Text style={{color:"#333333", marginLeft:20, fontSize:16}}>{profile.district}, {profile.state}</Text>
    </View>
    <View style={styles.row}>
        <Icon name="phone" color="#057ef0" size={20}></Icon>
        <Text style={{color:"#333333", marginLeft:20}}>{profile.phoneNumber}</Text>
    </View>
    <View style={styles.row}>
        <Icon name="email" color="#057ef0" size={20}></Icon>
        <Text style={{color:"#333333", marginLeft:20}}>{profile.email}</Text>
    </View>

</View>

<View style={styles.infoBoxWrapper}>
    <View style={[styles.infoBox,{
        borderRightColor:"#000",
        borderRightWidth:1
    }]}>
        <Title>{profile.totalPropertiesCount}</Title>
        <Caption>Total Properties</Caption>
    </View>
    <View style={styles.infoBox}>
        <Title>{profile.soldPropertiesCount}</Title>
        <Caption>Properties Sold</Caption>
    </View>
</View>

<View style={styles.menuWrapper}>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#057ef0" size={25} />
            <Text style={styles.menuItemText}>Favourities</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#057ef0" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#057ef0" size={25} />
            <Text style={styles.menuItemText}>Favourities</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#057ef0" size={25} />
            <Text style={styles.menuItemText}>Favourities</Text>
        </View>
    </TouchableOpacity>

</View>
</ScrollView>)}
    


</SafeAreaView>
  )
}

export default AgentProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
   
    },loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfoSection:{
        paddingHorizontal:30,
        marginBottom:25
    },
    title:{
        fontSize:24,
        fontWeight:"bold"

        
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        fontWeight:"500",
        color:"black"
    },
    row:{
        flexDirection:'row',
        marginBottom:10
    },
    infoBoxWrapper:{
borderBottomColor:'#000',
borderBottomWidth:1,
borderTopColor:'#000',
borderTopWidth:1,
flexDirection:'row',
height:100
    },
    infoBox:{
        width:"50%",
        alignItems:"center",
        justifyContent:"center"
    },
    menuWrapper:{
        marginTop:10
    },
    menuItem:{
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:30
    },
    menuItemText:{
        color:'#000',
        marginLeft:20,
        fontWeight:"600",
        fontSize:16,
        lineHeight:26
    }
})



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { DrawerActions, useNavigation } from '@react-navigation/native';
//  import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState, useCallback } from 'react';
// import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Avatar, Caption, Title } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const HeaderLeft = () => {
//   const navigation = useNavigation();
//   return (
//     <Icon 
//       name="menu" 
//       size={30} 
//       color="#000" 
//       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//       style={{ marginLeft: 10 }}
//     />
//   );
// };

// function AgentProfile({navigation}) {
//   const [refreshing, setRefreshing] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch the agent profile data
//   const getAgentProfile = useCallback(async () => {
//     try {
//       const token = await AsyncStorage.getItem("userToken");

//       const  userData=await AsyncStorage.getItem("updateProfile")
//       if (!token) {
//         console.log("No token found");
//         return;
//       }
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken.user.userId;
//       console.log("USER", token);
//       console.log(userData)
//      if(userData===null)
//      {


//       const response = await fetch(`http://172.17.15.184:3000/users/getprofile`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       console.log("Fetched profile data:", data);
//       setProfile(data);  // Update profile state
//       setLoading(false);  // Set loading to false once the data is fetched
//     }
//     else{
//         setProfile(userData);
//         setLoading(false);
//     }
//     } catch (error) {
//       console.error("Failed to fetch profile:", error);
//       setLoading(false);
//     }
//   }, []);

//   // Handle the refresh action
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     getAgentProfile();  // Re-fetch profile data when refreshing
//     setRefreshing(false);  // Stop refreshing indicator after data is fetched
//   }, [getAgentProfile]);

//   useEffect(() => {
//     console.log("asd")
//      getAgentProfile();  // Fetch profile on initial load
//   },[]);

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
//       ) : (
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         >
//           <View style={styles.userInfoSection}>
//             <View style={{ flexDirection: 'row', marginTop: 15 }}>
//               <Avatar.Image source={{ uri: profile.profilePicture }} size={80} />
//               <View style={{ marginLeft: 20 }}>
//                 <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
//                   {profile.firstName} {profile.lastName}
//                 </Title>
//                 <Caption style={styles.caption}>@{profile.firstName}_{profile.lastName}</Caption>
//               </View>
//             </View>
//           </View>

//           <View style={styles.userInfoSection}>
//             <View style={styles.row}>
//               <Icon name="map-marker-radius" color="#057ef0" size={20} />
//               <Text style={{ color: "#333333", marginLeft: 20, fontSize: 16 }}>Guntur, Andhra Pradesh</Text>
//             </View>
//             <View style={styles.row}>
//               <Icon name="phone" color="#057ef0" size={20} />
//               <Text style={{ color: "#333333", marginLeft: 20 }}>{profile.phoneNumber}</Text>
//             </View>
//             <View style={styles.row}>
//               <Icon name="email" color="#057ef0" size={20} />
//               <Text style={{ color: "#333333", marginLeft: 20 }}>{profile.email}</Text>
//             </View>
//           </View>

//           <View style={styles.infoBoxWrapper}>
//             <View style={[styles.infoBox, { borderRightColor: "#000", borderRightWidth: 1 }]}>
//               <Title>30</Title>
//               <Caption>Total Properties</Caption>
//             </View>
//             <View style={styles.infoBox}>
//               <Title>10</Title>
//               <Caption>Properties Sold</Caption>
//             </View>
//           </View>

//           <View style={styles.menuWrapper}>
//             <TouchableOpacity onPress={() => {}}>
//               <View style={styles.menuItem}>
//                 <Icon name="heart-outline" color="#057ef0" size={25} />
//                 <Text style={styles.menuItemText}>Favourites</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => {}}>
//               <View style={styles.menuItem}>
//                 <Icon name="account-check-outline" color="#057ef0" size={25} />
//                 <Text style={styles.menuItemText}>Support</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// export default AgentProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userInfoSection: {
//     paddingHorizontal: 30,
//     marginBottom: 25,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//     fontWeight: "500",
//     color: "black",
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   infoBoxWrapper: {
//     borderBottomColor: '#000',
//     borderBottomWidth: 1,
//     borderTopColor: '#000',
//     borderTopWidth: 1,
//     flexDirection: 'row',
//     height: 100,
//   },
//   infoBox: {
//     width: "50%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   menuWrapper: {
//     marginTop: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   menuItemText: {
//     color: '#000',
//     marginLeft: 20,
//     fontWeight: "600",
//     fontSize: 16,
//     lineHeight: 26,
//   },
// });
