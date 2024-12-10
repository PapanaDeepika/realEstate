import React from "react";
import {View,Text,Modal,StyleSheet} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";

const Tab = createBottomTabNavigator();
const BottomNavbar=(WrappedComponent)=>{
// const tab=createBottomTabNavigator();



    return(
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="LandingPage" component={LandingPage} />
      </Tab.Navigator>
    )




}

const styles=StyleSheet.create({});


export default BottomNavbar;