import 'react-native-gesture-handler'

import React from "react";
import { Searchbar } from "react-native-paper";
import { useLocale } from '@react-navigation/native';

import PropertyTypeSelector from "./PropertyTypeSelector";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LocationPicker from './LocationPicker';
import LandingPage from "./LandingPage";
import PropertyDetails from "./PropertyDetails";
import Login from "./Login";
import RegisterScreen from "./RegisterScreen";
import AgricultureScreen from "./AgricultureScreen";
import BuyerScreen from "./Buyer";
import AgentScreen from "./Agent";
import ResidentialScreen from "./ResidentialScreen";
import LayoutScreen from "./LayoutScreen";
import CommercialScreen from "./CommercialScreen";
import AgricultureDetail from "./AgricultureDetail";
import WithHeaderNavbar from "./WithHeaderNavbar";
import Appointment from "./Appointment";
import Wishlist from "./Wishlist";
import FinancialAssistant from "./FinancialAssistant";
import AnimationScreen from "./AnimationScreen";
 import AgricultureForm from "./PropertyForms/AgricultureForm";
import LayoutForm1 from "./PropertyForms/LayoutForm1";

import LayoutScreenAgent from "./LayoutScreenAgent";
import HomePage from "./HomePage";
import Options from "./Options";
import BottomNavbar from "./BottomNavbar";
import ResidentialDetail from "./ResidentialDetail";
import LayoutDetail from "./LayoutDetail"
import CommercialDetail from "./CommercialDetail";
import Dummy from "./Dummy";
import {AdminHomePage} from "./Admin/AdminHomePage";
import { CsrHomePage } from "./Csr/CsrHomePage";
// import { GetCsr } from "./Csr/GetCsr";
import {GetCsr} from "./Csr/GetCsr"
import { CsrProperties } from "./Csr/CsrProperties";
// import AgricultureEachCard from "./AgricultureEachCard";
import {AssignAgenttoCsr} from "./Admin/AssignAgenttoCsr"
 import { ChooseAgents } from "./Admin/ChooseAgents";
import { Entry } from "./Entry";
import Upload from "./Dummy";
import EntryBuyer from "./buyer/EntryBuyer";
import bottomnavbar from "./bottom-navbar";
import Hotdeals from "./Agent/Hotdeals";
import AgentProfile from "./Screens/AgentProfile";
import { ViewpropbyCSR } from './Csr/ViewpropbyCSR';
import { CsrAgents } from './Csr/CsrAgents';
import { MyPropertiescsr } from './Csr/Mypropertiescsr';
import CsrDetails from './Agent/CsrDetails';
import AgentAppointments from './Screens/AgentAppointments';
import PropertyDetails1 from './Screens/PropertyDetails';
import PropertyDetailsScreen from './Screens/PropertyDetails';
import ImageUploader from './imagePicker';
import AddPropertyScreen from './Screens/LandIcons';
import AgentHomeScreen from './Agent/AgentHomeScreen';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyProperties from './Agent/MyProperties';
   

import AgendaCalendar from './Agent/AgentCalender';
import NotificationScreen from './Agent/AgentNotifications';
import EditProfileScreen from './Screens/EditProfileScreen';
import MyCustomers from './Agent/MyCustomers';
import CustomerDetails from './Agent/CutomerDetails';
import AddingCustomer from './Agent/AddingCustomer';
import AgentDeals from './Agent/AgentDeals';
  
 
const Stack = createStackNavigator();
 const App = () => {
  return (
 
    <NavigationContainer>
 
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="deals" component={AgentDeals} />
        <Stack.Screen name="addCust" component={AddingCustomer} />
        <Stack.Screen name="customerDetails" component={CustomerDetails} options={{title:"Customer Details"}} />
        <Stack.Screen name="myCustomers" component={MyCustomers} options={{title:"My Customers"}}/>
 <Stack.Screen name="editProfile" component={EditProfileScreen} options={{
        title:"Edit Profile"}}/>
      <Stack.Screen name="profile" component={AgentProfile} options={{
  title:"Agent profile"
 }} />
 <Stack.Screen name="cal" component={AgendaCalendar} />

<Stack.Screen name="newApp" component={AgentAppointments}   />
 
 
<Stack.Screen name='myProps' component={MyProperties} options={{title:"My Properties"}} />
<Stack.Screen name="ViewpropbyCSR" component={ViewpropbyCSR} options={{title:"Properties"}}/>
<Stack.Screen name="Propdetails" component={PropertyDetailsScreen} options={{title:"Property Details"}} />

  
{/* <Stack.Screen name="Propdetails1" component={PropertyDetailsScreen1} /> */}

        {/*  
       <Stack.Screen name="CsrAgents" component={CsrAgents}/>
        <Stack.Screen name="dummy" component={Upload}/>
   */}
{/* 
 <Stack.Screen name="LayoutForm" component={LayoutForm}/>
  <Stack.Screen name="MyPropertiescsr" component={MyPropertiescsr} />
        <Stack.Screen name="bottom" component={BottomNavbar} /> */}
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "BHOOMI",headerShown:false }}
        /> 
          <Stack.Screen name="Entry" component={Entry} options={{headerShown:false}}/>

          <Stack.Screen name="Login" component={Login} />
           <Stack.Screen
          name="Bottom1"
          component={bottomnavbar}
          options={{
            headerShown:false
          }}/>
<Stack.Screen name="notification" component={NotificationScreen} />
<Stack.Screen name="getCsr" component={CsrDetails} options={{title:"CSR Information"}}/>
<Stack.Screen name="csr" component={CsrHomePage} options={{headerShown:false}}/>
<Stack.Screen name="asd" component={AgentHomeScreen} options={{title:"All Properties"}} />

 
<Stack.Screen
          name="PropertyDetails"
          component={PropertyDetails}
          options={{ title: "Property Details" }}

        />

<Stack.Screen name="hotdeals" component={Hotdeals} options={{
    title: "Landing Page",
    headerShown: false, 
  }} /> 

<Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/*  
         
 
         
         <Stack.Screen name="agricultureForm" component={AgricultureForm} options={{title:"Agriculture Form"}} />
        <Stack.Screen name="icons" component={AddPropertyScreen} />
       
         
        <Stack.Screen name="EntryBuyer" component={EntryBuyer}/>
 
        <Stack.Screen name="options" component={Options} />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ title: "Real Estate Lokam" }}
        />


  

         <Stack.Screen name="Agent" component={WithHeaderNavbar(AgentScreen)} />
        <Stack.Screen name="Anime" component={AnimationScreen} />
         <Stack.Screen name="getcsr" component={GetCsr} />
        <Stack.Screen name="csrprops" component={CsrProperties}/>
        <Stack.Screen name="assignagent" component={AssignAgenttoCsr}/>

        <Stack.Screen name="adminhome" component={AdminHomePage}/>
         <Stack.Screen name="chooseagents" component={ChooseAgents}/>
        
        
         
 
        <Stack.Screen name="pts" component={PropertyTypeSelector} />

         <Stack.Screen name="CommercialForm" component={CommercialForm} />
         <Stack.Screen name="ResidentialForm" component={Residentialform} />

 
        <Stack.Screen
          name="Buyer"
          component={BuyerScreen}
          options={{ title: "Real Estate Lokam" }}
        />
        <Stack.Screen name="Agriculture" component={AgricultureScreen} />
         <Stack.Screen
          name="AgricultureAgent"
          component={AgricultureScreenAgent}
        />
        <Stack.Screen
          name="ResidentialAgent"
          component={ResidentialScreenAgent}
        />
        <Stack.Screen
          name="CommercialAgent"
          component={CommercialAgentScreen}
        />
        <Stack.Screen name="LayoutAgent" component={LayoutScreenAgent} />

      
        <Stack.Screen name="AgricultureDetail" component={AgricultureDetail} />
        <Stack.Screen name="ResidentialDetail" component={ResidentialDetail} /> 
        <Stack.Screen name="LayoutDetail" component={LayoutDetail}/>
        <Stack.Screen name="CommercialDetail" component={CommercialDetail}/>
 
         <Stack.Screen name="Residential" component={ResidentialScreen} />
        <Stack.Screen name="Commercial" component={CommercialScreen} />
        <Stack.Screen name="Layout" component={LayoutScreen} />
        <Stack.Screen
          name="Appointment"
          component={WithHeaderNavbar(Appointment)}
        />
        <Stack.Screen name="Wishlist" component={WithHeaderNavbar(Wishlist)} />
        <Stack.Screen
          name="FinancialAssistant"
          component={WithHeaderNavbar(FinancialAssistant)}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
