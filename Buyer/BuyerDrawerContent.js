import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawerItems = [
  { icon: 'account-group', label: 'My Requests', route: 'mr', color: "#008080" }, // Teal

]



const BuyerDrawerContent = ({ switched, ...props }) => {
  console.log("Deepika", switched)
  const [email,setEmail] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
const [profile, setProfile] =useState('')

     const [seller,setSeller] = useState(false)

const [role, setRole] = useState()

     useEffect(() => {
      if (switched) {
        console.log("In the use State 1111" )

        setSeller(false);
      }
    }, []); // This will only run when `switched` changes
    

const switchToSeller =() => {
  setSeller(true)
 
    navigation.navigate("Bottom1", {buyerSwitchToAgent: true})

 
  }
  

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
        setRole(decoded.user.role)
        
          
          
      } catch (error) {
          console.error("Failed to fetch properties:", error);
          setLoading(false);


      }
  },[])

    const navigation = useNavigation()
  const handleLogout = async() => {
    // Implement logout functionality here
    console.log('Logout pressed');
    navigation.navigate('Home')
    await AsyncStorage.clear();
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
                labelStyle={{ fontFamily: 'Montserrat_500Medium' }} 
                              />
            ))}
          </View>
        </View>
      </DrawerContentScrollView>

{role === 1 &&   <View style={styles.languageSection}>
            <Text style={styles.languageText}>Switch to Seller's Agent</Text>
            <Switch
              value={seller}
              onValueChange={switchToSeller}
              thumbColor={seller ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View> }
    

      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <Icon name="logout" color={color} size={size} />}
          label="Logout"
          labelStyle={{ fontFamily: 'Montserrat_500Medium' }} 
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
fontFamily:'Montserrat_700Bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    width: '100%',
    fontFamily:'Montserrat_500Medium'
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
  languageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BuyerDrawerContent;

