 import 'react-native-gesture-handler'

import React from "react";
import { Searchbar } from "react-native-paper";
import { useLocale } from '@react-navigation/native';

import PropertyTypeSelector from "./PropertyTypeSelector";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
import LayoutForm from "./PropertyForms/LayoutForm";
import Residentialform from "./Residentialform";
import CommercialForm from "./CommercialForm";
import AgricultureScreenAgent from "./AgricultureScreenAgent";
import ResidentialScreenAgent from "./ResidentialScreenAgent";
// import ResidentialScreenAgent from './ResidentialScreenAgent';
import CommercialAgentScreen from "./CommercialAgentScreen";
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
import AgentProfile from "./Agent/AgentProfile";
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
// import Entry from "./Entry"

 
 
const Stack = createStackNavigator();
// const drawer = createDrawerNavigator();
const App = () => {
  return (
//     <SafeAreaView style={styles.card}>
 
// <ImageBackground style={styles.image} source ={{uri:"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"}}>

//  <Text style={styles.imageText}>This is Deepika</Text>
// <Text style={styles.priceBottomStyle}>10000000000</Text>
//  <TouchableOpacity style={styles.shareIcon} onPress={() => {}}>
//     <Icon name="share" size={24} color="#007bff" />
//   </TouchableOpacity>
// </ImageBackground>
// <View style={styles.detailsContainer}>
//   <View style={styles.detailsStyles}>
// <Icon name="map-marker" size={24} color="#007bff" />
// <Text style={styles.textStyle}>Srikakulam</Text>
// </View>
// <View style={styles.detailsStyles}>
// <Icon name="ruler" size={24} color="#007bff" />
// <Text style={styles.textStyle}>200 Acres</Text>
// </View>
// </View>


// </SafeAreaView>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='myProps' component={MyProperties} />
 <Stack.Screen name="newApp" component={AgentAppointments} />
      <Stack.Screen name="CsrAgents" component={CsrAgents}/>
      <Stack.Screen name="ViewpropbyCSR" component={ViewpropbyCSR} options={{title:"Properties"}}/>
       <Stack.Screen name="dummy" component={Upload}/>
 <Stack.Screen name="profile" component={AgentProfile} options={{
  title:"Agent profile"
 }} />

 <Stack.Screen name="LayoutForm" component={LayoutForm}/>
 <Stack.Screen name="Propdetails" component={PropertyDetailsScreen} />
 <Stack.Screen name="MyPropertiescsr" component={MyPropertiescsr} />
        <Stack.Screen name="bottom" component={BottomNavbar} />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "BHOOMI" }}
        />
        <Stack.Screen
          name="Bottom1"
          component={bottomnavbar}
          options={{
            headerShown:false
          }}
         
 
        />
        <Stack.Screen name="asd" component={AgentHomeScreen} options={{title:"All Properties"}} />
        <Stack.Screen name="agricultureForm" component={AgricultureForm} options={{title:"Agriculture Form"}} />
        <Stack.Screen name="icons" component={AddPropertyScreen} />
        <Stack.Screen name="hotdeals" component={Hotdeals} options={{
    title: "Landing Page",
    headerShown: false, 
  }} /> 
         <Stack.Screen name="Entry" component={Entry}/>
        <Stack.Screen name="EntryBuyer" component={EntryBuyer}/>
 
        <Stack.Screen name="options" component={Options} />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ title: "Real Estate Lokam" }}
        />


        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetails}
          options={{ title: "Property Details" }}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Agent" component={WithHeaderNavbar(AgentScreen)} />
        <Stack.Screen name="Anime" component={AnimationScreen} />
        <Stack.Screen name="csr" component={CsrHomePage} options={{headerShown:false}}/>
        <Stack.Screen name="getcsr" component={GetCsr} />
        <Stack.Screen name="csrprops" component={CsrProperties}/>
        <Stack.Screen name="assignagent" component={AssignAgenttoCsr}/>

        <Stack.Screen name="adminhome" component={AdminHomePage}/>
         <Stack.Screen name="chooseagents" component={ChooseAgents}/>
        
        
        {/*
        
        
        PropertyTypeSelector */}
 
        <Stack.Screen name="pts" component={PropertyTypeSelector} />

         <Stack.Screen name="CommercialForm" component={CommercialForm} />
        {/* <Stack.Screen name="LayoutForm" component={Layoutform} /> */}
        <Stack.Screen name="ResidentialForm" component={Residentialform} />

        {/* Wrap screens with WithHeaderNavbar */}

        <Stack.Screen
          name="Buyer"
          component={BuyerScreen}
          options={{ title: "Real Estate Lokam" }}
        />
        <Stack.Screen name="Agriculture" component={AgricultureScreen} />
        {/* { agent four screens} */}
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

        {/* <Stack.Screen name = "Agriculture" component={AgricultureScreen} /> */}
        {/* { each card details } */}
        <Stack.Screen name="AgricultureDetail" component={AgricultureDetail} />
        <Stack.Screen name="ResidentialDetail" component={ResidentialDetail} /> 
        <Stack.Screen name="LayoutDetail" component={LayoutDetail}/>
        <Stack.Screen name="CommercialDetail" component={CommercialDetail}/>
        <Stack.Screen name="getCsr" component={CsrDetails}/>

        {/* {} */}
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// const styles = StyleSheet.create({
//   detailsStyles:{
// flexDirection:'row'
//   },
//   textStyle:{
//     marginLeft:5,
// fontSize:16,
// fontWeight:"500"
//   },
//   detailsContainer:{
//     flexDirection:"row",
//     justifyContent:"space-between",
// marginTop:10
//   },
//   topContainer:{
// // flexDirection:"row",
// // justifyContent:"space-between"
//   },
//   shareIcon: {
//     position: 'absolute',
//     bottom: 10, // Distance from the bottom of the image
//     right: 10, // Distance from the right edge of the image
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional background for better visibility
//     borderRadius: 20, // Circular background
//     padding: 8, // Space inside the circular background
//    },
//   container:{
//  paddingVertical:25,
//  paddingHorizontal:10
//   },
//   imageText:{
//     backgroundColor: '#f0f8ff',  
//     padding: 10, 
//      color: '#000', 
//     fontSize: 16,  
//     fontWeight: 'bold',  
//     textAlign: 'center',  
//      borderWidth: 1, 
//     borderColor: '#007acc',  
//     width:"40%",
//     borderBottomRightRadius:60,
    
//   },
//   image:{
//     width:"100%",
//     height:200
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginVertical: 30,
//     borderRadius: 10,
//     overflow: 'hidden',
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//     paddingVertical:20,
//     paddingHorizontal:10
//   },
//   priceStyle:{
//     backgroundColor: 'rgba(173, 216, 230, 0.7)', 
//     padding: 10, 
//      color: '#000',  
//     fontSize: 16,  
//     fontWeight: 'bold',  
//     textAlign: 'center', 
//      borderWidth: 1,  
//     borderColor: '#007acc',  
//     width:"40%",
//    },
//    priceBottomStyle:{
//     // position:"absolute",
//     // left:10,
//     // bottom:10,
//     // backgroundColor: 'rgba(173, 216, 230, 0.7)', 
//     // padding: 10, 
//     // color:"#fff"
//     position: 'absolute',
//     // borderBottomColor:"#fff",
//     // borderBottomWidth:2,
//     bottom: 1, // Distance from the bottom of the image
//      backgroundColor: '#f0f0f0', // Semi-transparent dark background
//     color: '#000', // White text for contrast
//     fontSize: 16, // Adjust font size
//     fontWeight: 'bold', // Bold text for emphasis
//     paddingVertical: 4, // Vertical padding for the text box
//     paddingHorizontal: 8, // Horizontal padding for the text box
//     }
// })