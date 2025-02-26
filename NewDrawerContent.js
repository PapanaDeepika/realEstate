import React, { useCallback , useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { LanguageContext } from './LanguageContext';

import i18n from './i18n';




const NewDrawerContent = ( {buyerSwitchToAgent, ...props}) => {
  console.log("DEEPIKA @#$%", buyerSwitchToAgent)
  const { isTelugu, toggleLanguage } = useContext(LanguageContext);
  const [language, setLanguage] = useState(i18n.locale); 
  const drawerItems = [
    { icon: 'account-group', label: i18n.t('customers'), route: 'myCustomers', color: "#008080" },
     { icon: 'information', label: i18n.t('csrInfo'), route: 'getCsr', color: "#4169E1" },
    { icon: 'home-city', label: i18n.t('myProperties'), route: 'myProps', color: "#228B22" },
    { icon: 'account-group', label: i18n.t('buyerRequests'), route: 'br', color: "#008080" },

    // { icon: 'calendar', label: i18n.t('calendar'), route: 'cal', color: "#0791fa" }
  ];

  
  

  useFocusEffect(
    useCallback(() => {
      i18n.locale = isTelugu ? 'te' : 'en'; // Update locale dynamically
      console.log("Here", isTelugu, i18n.locale)

     }, [isTelugu])
  );

    const navigation = useNavigation()
    const [buyer,setBuyer] = useState(false)

    const [email,setEmail] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
  const [profile, setProfile] =useState('')
  

 
  
const switchToBuyer =() => {
setBuyer(true)
 
  navigation.navigate("buyerBottom", {switched:true})

 
}

  useFocusEffect(
        useCallback(() => {
          getData();
        
         }, [getData])
      );

    

      useFocusEffect(
        useCallback(() => {
          console.log("Keerthana", buyerSwitchToAgent)
          if (buyerSwitchToAgent) {
            console.log("In the use State 1" )
            setBuyer(false);
          }
         }, [buyerSwitchToAgent])
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


     useEffect(()=> {
      console.log("In the useeffect")
    },[])

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
                labelStyle={{    fontFamily:'Montserrat_500Medium'                }}
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
          labelStyle={{    fontFamily:'Montserrat_500Medium'                }}

        />
      </View>
      <View style={styles.languageSection}>
            <Text style={styles.languageText}>Switch to Buyer's Agent</Text>
            <Switch
              value={buyer}
              onValueChange={switchToBuyer}
              thumbColor={buyer ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
                              

            />
          </View>

      <View style={styles.languageSection}>
            <Text style={styles.languageText}>Switch to Telugu</Text>
            <Switch
              value={isTelugu}
              onValueChange={toggleLanguage}
              thumbColor={isTelugu ? '#0791fa' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
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
    fontFamily:'Montserrat_500Medium'             
  },
});

export default NewDrawerContent;

