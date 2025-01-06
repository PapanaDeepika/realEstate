import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const drawerItems = [
  { icon: 'home', label: 'Home', route: 'Home', color: "#242b57" },
  // {icon:'calendar', label:'Calendar', route:'cal', color:"#0791fa"},
  { icon: 'information', label: 'CSR Information', route: 'getCsr', color: "#4169E1" }, // Royal Blue
  { icon: 'home-city', label: 'My Properties', route: 'myProps', color: "#228B22" }, // Forest Green
  // { icon: 'fire', label: 'Hot Deals', route: 'hotdeals', color: "#FF7F50" }, // Coral
  { icon: 'account-group', label: 'Customers', route: 'Home', color: "#008080" }, // Teal
  ]



const NewDrawerContent = (props) => {
    const navigation = useNavigation()
  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout pressed');
    navigation.navigate('Login')
  };
const [userName,setUserName]=useState("")
const [email,setEmail]=useState("")
const [profile,setProfile]=useState("")
  useEffect(async()=>{
    const token= await AsyncStorage.getItem("userToken")
  const decodedToken = jwtDecode(token);
    setUserName( decodedToken.user.firstName)
    setEmail(decodedToken.user.email)
    setProfile(decodedToken.user.profilePicture) 
  },[])
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: profile
              }}
              size={70}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Title style={styles.title}>{userName || "John Doe"}</Title>
              <Caption style={styles.caption} numberOfLines={1}>{email || "john.doe@gmail.com"}</Caption>
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

export default NewDrawerContent;

