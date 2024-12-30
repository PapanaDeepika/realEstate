import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption } from 'react-native-paper';
import Symbol from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const drawerList = [
  { icon: 'fire', label: 'Hot Deals', route: 'hotdeals' },
  { icon: 'account-circle-outline', label: 'Profile', route: 'profile' },
  { icon: 'account-circle-outline', label: 'Appointments', route: 'appointments' },

  
];

const DrawerLayout = ({ icon, label, route }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem 
      icon={({ color, size }) => <Symbol name={icon} color={color} size={size} />}
      label={label}
      onPress={() => {
        navigation.navigate(route);
      }}
    />
  );
};

const DrawerItems = () => {
  return drawerList.map((item, index) => (
    <DrawerLayout
      key={index}
      icon={item.icon}
      label={item.label}
      route={item.route}
    />
  ));
};

function DrawerContent(props) {
  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout pressed');
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <Avatar.Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s"
                }}
                size={50}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Title style={styles.title}>Adarsh</Title>
                <Caption style={styles.caption} numberOfLines={1}>adarsh@gmail.com</Caption>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Symbol name="logout" color={color} size={size} />
          )}
          label="Logout"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

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
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
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

export default DrawerContent;