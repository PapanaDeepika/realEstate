import 'react-native-gesture-handler';
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Entypo'
import HomePage from '../HomePage';
import LandingPage from '../LandingPage';
import Hotdeals from './Hotdeals';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerContent from './DrawerContent';
import AgentProfile from './AgentProfile';
import AgentAppointments from './AgentAppointments';
 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <Icon 
      name="menu" 
      size={30} 
      color="#fff" 
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 10 }}
    />
  );
};

const StackDrawer = () => {
  return (
    <Stack.Navigator screenOptions={{
        statusBarColor: '#000',
        headerStyle: {
          backgroundColor: "#000"
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        
      }}
    >
      <Stack.Screen  name="hotdeals" 
        component={Hotdeals} 
        options={{
          title: "Hot Deals",
          headerLeft: () => <HeaderLeft />,
        }}
      />
      <Stack.Screen   name="appointments" 
        component={AgentAppointments}
        options={{
          title: "Landing Page"
        }}
      />
        <Stack.Screen   name="profile" 
        component={AgentProfile}
        options={{
          title: "Landing Page"
        }}
      />
      
    </Stack.Navigator>
  );
};

const AgentDrawer = () => {
  return (
    <Drawer.Navigator 
      drawerContent={props => <DrawerContent {...props} />} 
      screenOptions={{headerShown: false}}
    >
      <Drawer.Screen name="MainStack" component={StackDrawer} />
    </Drawer.Navigator>
  );
};

export default AgentDrawer;