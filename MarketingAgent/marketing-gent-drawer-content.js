import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawerItems = [
  { icon: 'account-group', label: 'Customers', route: 'myCustomers', color: "#008080" }, // Teal
  { icon: 'fire', label: 'Hot Deals', route: 'Profile', color: "#FF7F50" }, // Coral
  { icon: 'information', label: 'CSR Info', route: 'Appointments', color: "#4169E1" }, // Royal Blue
  { icon: 'home-city', label: 'My Properties', route: 'myProps', color: "#228B22" } ,// Forest Green
  {icon:'calendar', label:'Calendar', route:'cal', color:"#0791fa"}
]



const MarketingAgentDrawerContent = (props) => {
  const [email,setEmail] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
const [profile, setProfile] =useState('')

useFocusEffect(
      useCallback(() => {
        getData();
       }, [getData])
    );

    const getData = useCallback(async () => {
      try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) {
              console.log("No token found");
              return;
          }

        const decoded = jwtDecode(token)
        const id = decoded.user.userId;
        console.log("DECODED", decoded.user)
        setFirstName(decoded.user.firstName)
        setLastName(decoded.user.lastName)
        setEmail(decoded.user.email)
        setProfile(decoded.user.profilePicture)
        
          
          
      } catch (error) {
          console.error("Failed to fetch properties:", error);
          setLoading(false);


      }
  },[])

    const navigation = useNavigation()
  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout pressed');
    navigation.navigate('Login')
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwolRlTnPXn9a1Zp1ab0DvPJh0oLSHrz8lFw&s"
              }}
              size={70}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Title style={styles.title}>{firstName} {lastName}</Title>
              <Caption style={styles.caption} numberOfLines={1}>{email}</Caption>
            </View>
          </View>
          <View style={styles.drawerSection}>
            {drawerItems.map((item, index) => (
              <DrawerItem
                key={index}
                icon={({ color, size }) => <Icon name={item.icon} color={item.color} size={size} />}
                label={item.label}
                onPress={() => props.navigation.navigate(item.route)}
              />
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <Icon name="logout" color={color} size={size} />}
          label="Logout"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  avatar: {
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    width: '100%',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingTop: 15,
  },
});

export default MarketingAgentDrawerContent;

