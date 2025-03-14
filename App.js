 import 'react-native-gesture-handler'

import React, { useEffect, useState } from "react";
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
import Residentialform from "./Residentialform";
import CommercialForm from "./PropertyForms/commercialForm";
 

import AgricultureScreenAgent from "./AgricultureScreenAgent";
import ResidentialScreenAgent from "./ResidentialScreenAgent";
// import ResidentialScreenAgent from './ResidentialScreenAgent';
import CommercialAgentScreen from "./CommercialAgentScreen";
import LayoutScreenAgent from "./LayoutScreenAgent";
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
   
import ResidentialForm from "./PropertyForms/ResidentialForm";
import AgricultureFormCsr from './PropertyForms/newcsragri';
import CommercialFormCsr from './PropertyForms/newcommcsr';
import LayoutFormCsr from './PropertyForms/csrlayoutform';
import ResidentialformCsr from './PropertyForms/residentialformcsr';
import CommercialFormAgent from './PropertyForms/newcommagent';
import AgricultureFormAgent from './PropertyForms/newagentagri';
import ResidentialAgent from './PropertyForms/newresidentialagent';
import LayoutFormAgent from './PropertyForms/newlayagent';
import AgendaCalendar from './Agent/AgentCalender';
import NotificationScreen from './Agent/notificationScreen';
import PropertyDetailsScreen1 from './Csr/propertyDetails';
import Deals from './Screens/deals';
import LocationPicker1 from './locationP';
import i18n, { LanguageProvider } from './i18n';
import EditProfileScreen from './Agent/EditProfile';
import HomePageBuyer from './buyer/HomePage';
import { BuyerDrawer } from './buyer/BuyerDrawer';
import OnlyAgriculture from './buyer/OnlyAgriculture';
import OnlyCommercial from './buyer/OnlyCommercial';
import OnlyResidential from './buyer/OnlyResidential';
import OnlyLayout from './buyer/OnlyLayout';
import Premium from './buyer/Premium';
import AllPropertiesList1 from './buyer/AllPropertiesList1';
import HomePage from './HomePage';
import AddActivity from './Agent/AddActivity';
import CustomerDropdown from './MarketingAgent/sample';
import MarketingAgentDeals from './MarketingAgent/MarketingAgentDeals';
import MarketingAgentBottomNavbar from './MarketingAgent/Marketing-agent-bottom-bar';
import AgentNewDeals from './Agent/AgentNewDeals';
import AddingCustomer from './Agent/AddingCustomer';
import CustomerDetails from './Agent/CutomerDetails';
import MyCustomers from './Agent/MyCustomers';
import ScheduleMeeting from './Agent/ScheduleMeeting';
import AgentPropertyCustomerDeals from './Agent/AgentPropertyCustomerDeals';
import AgentCustomerPropertyDeals from './Agent/AgentCustomerPropertyDeals';
import MarketingAgentCustomerPropertyDeals from './MarketingAgent/MarketingAgentCustomerBasedDeals';
import ViewActivity from './Agent/ViewActivity';
import PropertyDetailsScreenBuyer from './Screens/PropertyDetailsBuyer';
import AgentProfile from './Screens/AgentProfile';
import buyerLocationProps from './buyer/buyerLocationProps';
import BuyerLocationProps from './buyer/buyerLocationProps';
import NotificationBuyer from './buyer/Notification';
import Myintersted from './buyer/Myintersted';
// import BuyerNewDeals from './buyer/newDeals';
import LoginOtp from './loginOtp';
import csrAgentInfo from './Csr/csrAgentInfo';
import CsrAgentInfo from './Csr/csrAgentInfo';
import CsrMrAgent from './Csr/CsrMrAgent';
import MarketingAgentsInfo from './Csr/marketingAgentsInfo';
import CsrDeals from './Csr/CsrDeals';
import PropertyDeals from './Csr/propertyDeals';
import CustomerDeals from './Csr/customerDeals';
import AllCustomers from './Csr/allCustomers';
import AuctionData from './Agent/auctionData';
import AuctionForm from './Agent/auctionForm';
import BidData from './Agent/bidData';
import SurveyData from './Csr/surveyData';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tasks from './MarketingAgent/Tasks';
import Profile from './Screens/profile';
import ChangePassword from './Screens/changePassword';
import EditProfile from './Screens/editProfile';
import Plans from './Buyer/Plans';
import AdvanceSearchScreen from './Buyer/AdvanceSearch';
import Payment from './Buyer/Payment';
import AuctionCarousal from './Buyer/AuctionCarousal';
import BuyerHomeScreen from './Buyer/BuyerHomeScreen';
import BuyerRequests from './Agent/buyerRequests';
import MyRequests from './Buyer/MyRequests';
import BuyProperties from './Buyer/BuyProperties';
import LeaseProperties from './Buyer/LeaseProperties';
import RentProperties from './Buyer/RentProperties';
import AgriculturalLands from './Buyer/AgriculturalLands';
import Commercials from './Buyer/Commercials';
import Layouts from './Buyer/Layouts';
import Residentials from './Buyer/Residentials';
import BuyerDeals1 from './Buyer/BuyerDeals1';
import InterestedProperties from './Buyer/InterestedProperties';
import SurveyForm from './MarketingAgent/surveyForm';
import UserProfileScreen from './Buyer/ConsultAnAgent';
import BuyerBottomBar from './Buyer/BuyerBottomBar';
import AuctionScreen from './Buyer/AuctionEntry';
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { useSSR } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { PushNotificationProvider } from './contexts/PushNotificationProvider';
 
 import { Button } from 'react-native';
import WalkthroughScreen from './Screens/Walkthrough';
import Audio1 from './Screens/Audio';
  
SplashScreen.preventAutoHideAsync();
// const WalkthroughableText = walkthroughable(Text);

const Stack = createStackNavigator();
 const App = ({start}) => {

  const [token,setToken]=useState(null)
  const [introSeen,setIntroSeen]=useState(false)
 
 const [role,setRole]=useState(9)
 const [showWalkthrough, setShowWalkthrough] = useState(false);

 

  useEffect(()=>{
    const  fetchToken=async()=>{
      const token=await AsyncStorage.getItem("userToken")
      
      const introStatus=await AsyncStorage.getItem("intro")
      setIntroSeen(introStatus)
      const decoded=jwtDecode(token)
      setToken(token )
      console.log("role",decoded.user.role)
      setRole(decoded.user.role)
  }
  fetchToken()
  })


  // useEffect(() => {
  //   // Show walkthrough only for first-time users
  //   const checkWalkthrough = async () => {
  //     const hasSeenWalkthrough = await AsyncStorage.getItem("hasSeenWalkthrough");
  //     if (!hasSeenWalkthrough) {
  //       setShowWalkthrough(true);
  //     }
  //   };
  //   checkWalkthrough();
  // }, []);

  // useEffect(() => {
  //   if (showWalkthrough) {
  //     start(); // Start walkthrough when app loads
  //     AsyncStorage.setItem("hasSeenWalkthrough", "true"); // Mark walkthrough as seen
  //   }
  // }, [showWalkthrough]);


  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });


  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }

            
      const introStatus=await AsyncStorage.getItem("intro")
      setIntroSeen(introStatus)

      console.log("intro ",introStatus,await AsyncStorage.getItem("intro"))
    };
      
 
    console.log("fontsLoaded",fontsLoaded)
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Not loaded")
    return null; 
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>


        <PushNotificationProvider> 

          {/* <Stack.Navigator initialRouteName='walkThrough' > */}

   <Stack.Navigator initialRouteName={introSeen!==null|| introSeen?(role===9?("Home"):(role===1?("Bottom1"):(role===3?("buyerBottom"):(role===5?("csr"):(role===6?("mAgent"):("adminhome")))))):("walkThrough")} > 
        {/* <Stack.Navigator initialRouteName={role===9?("Home"):(role===1?("Bottom1"):(role===3?("buyerBottom"):(role===5?("csr"):(role===6?("mAgent"):("adminhome")))))}> */}
       <Stack.Screen name="agricultureForm" component={AgricultureFormAgent} options={{title:"Agriculture Form" }} />
      <Stack.Screen name="residentialForm" component={ResidentialAgent} options={{title:"Residential Form"}} />

        
        <Stack.Screen name="walkThrough" component={WalkthroughScreen} options={{headerShown:false}} />

         <Stack.Screen name="audio" component={Audio1} />

         
      <Stack.Screen name="profile" component={AgentProfile} options={{
  title:"Profile"
 }} />
 <Stack.Screen name="cal" component={AgendaCalendar} />
 <Stack.Screen name="editProfile" component={EditProfileScreen}   />

 {/* <Stack.Screen name="BuyerNewDeals" component={BuyerNewDeals} /> */}

<Stack.Screen name="newApp" component={AgentAppointments}   />
<Stack.Screen name="LayoutForm" component={LayoutFormAgent}  />

<Stack.Screen name="CommercialForm" component={CommercialFormAgent}  />

<Stack.Screen name='myProps' component={MyProperties} options={{title:"My Properties"}} />
<Stack.Screen name="ViewpropbyCSR" component={ViewpropbyCSR} options={{title:""}}/>
<Stack.Screen name="Propdetails" component={PropertyDetailsScreen} options={{title:"Property Details"}} />

<Stack.Screen name="loc" component={LocationPicker1} />

<Stack.Screen name="buyerLocationProps" component={BuyerLocationProps} />
<Stack.Screen name="csrAgents" component={CsrAgents} options={{title:"Agents"}}/>

<Stack.Screen name="agentInfo" component={CsrAgentInfo} options={{title:""}} />

<Stack.Screen name="csrmarketingAgents" component={CsrMrAgent}  options={{title:"Marketing agents"}}/>

<Stack.Screen name="auctionData" component={AuctionData} options={{title:""}}  />


<Stack.Screen name="auctionForm" component={AuctionForm} options={{title:""}} />

<Stack.Screen name="bidData" component={BidData}  options={{title:""}} />
 
 <Stack.Screen name="myProfile" component={Profile} options={{title:"Profile"}} />

{/* <Stack.Screen  */}

{/* <Stack.Screen name="Propdetails1" component={PropertyDetailsScreen1} /> */}

        {/*  
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

          <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
<Stack.Screen name="deal" component={Deals}/>
          <Stack.Screen
          name="Bottom1"
          component={bottomnavbar}
          options={{
            headerShown:false
          }}/> 

 <Stack.Screen name="LoginOtp" component={LoginOtp} />


<Stack.Screen name="notification" component={NotificationScreen} />
<Stack.Screen name="getCsr" component={CsrDetails} options={{title:"CSR Information"}}/>
<Stack.Screen name="csr" component={CsrHomePage} options={{headerShown:false}}/>
<Stack.Screen name="asd" component={AgentHomeScreen} options={{title:"All Properties"}} />

<Stack.Screen name="csrAg" component={AgricultureFormCsr} options={{headerShown:false}} />
<Stack.Screen name="csrCm" component={CommercialFormCsr} options={{headerShown:false}} />
<Stack.Screen name="csrLout" component={LayoutFormCsr} options={{headerShown:false}} />

<Stack.Screen name="Myintersted" component={Myintersted} options={{headerShown:false}} />

<Stack.Screen name="csrResi" component={ResidentialformCsr} options={{headerShown:false}} />
<Stack.Screen
          name="PropertyDetails"
          component={PropertyDetails}
          options={{ title: "Property Details" }}

        />

{/* <Stack.Screen name="buyerDeals"  component={BuyerNewDeals}/> */}

<Stack.Screen name="hotdeals" component={Hotdeals} options={{
    title: "Landing Page",
    headerShown: false, 
  }} /> 
<Stack.Screen name="Notification" component={NotificationBuyer} />

<Stack.Screen name="Buyer"  component={HomePageBuyer} options={{headerShown:false}}/>
<Stack.Screen name="RegisterScreen" component={RegisterScreen} />

<Stack.Screen name="buyerDrawer" component={BuyerDrawer}  options={{headerShown:false}}/>

<Stack.Screen name="OnlyAgriculture" component={OnlyAgriculture} options={{ headerShown: false }}/>
        <Stack.Screen name="OnlyCommercial" component={OnlyCommercial} options={{ headerShown: false }}/>

        <Stack.Screen name="OnlyResidential" component={OnlyResidential} options={{ headerShown: false }}/>

        <Stack.Screen name="OnlyLayout" component={OnlyLayout} options={{ headerShown: false }}/>
        <Stack.Screen name="Premium" component={Premium} options={{ headerShown: false }}/>
        <Stack.Screen name="BuyersProperties" component={AllPropertiesList1} />

<Stack.Screen name="propertyDetailsBuyer" component={PropertyDetailsScreenBuyer} />

        <Stack.Screen name="viewActivity" component={ViewActivity} />

        <Stack.Screen name="addActivity" component={AddActivity} />
        <Stack.Screen name="createDeal" component ={CustomerDropdown} options={{ title: "Create Deal" }} />
      <Stack.Screen name="mCustDeals" component={MarketingAgentCustomerPropertyDeals}  options={{title:""}}   />
        <Stack.Screen name="mDeals" component={MarketingAgentDeals}  options={{
            headerShown:false
          }}  />
      <Stack.Screen name="mAgent" component={MarketingAgentBottomNavbar}  options={{
            headerShown:false
          }}  />

      <Stack.Screen name="scheduleMeet" component={ScheduleMeeting} options={{title:"Schedule Meeting"}} />
      <Stack.Screen name="not" component={NotificationScreen} options={{title:"Notifications"}}/>

       <Stack.Screen name="getDealByPId" component={AgentPropertyCustomerDeals} options={{title:"Property Deals"}}/>

        <Stack.Screen name="getDealByCId" component={AgentCustomerPropertyDeals} options={{title:"Customer Deals"}}/>
        <Stack.Screen name="newDeals" component={AgentNewDeals} options={{title:"My Deals"}} />
        <Stack.Screen name="deals" component={AgentNewDeals} />
        <Stack.Screen name="addCust" component={AddingCustomer} />
        <Stack.Screen name="customerDetails" component={CustomerDetails} options={{title:"Customer Details"}} />
        <Stack.Screen name="myCustomers" component={MyCustomers} options={{title:"My Customers"}}/>
        <Stack.Screen name="icons" component={AddPropertyScreen} />

        <Stack.Screen name="MarketingAgentsInfo" component={MarketingAgentsInfo}  options={{title:""}}/>
      
      <Stack.Screen name="CsrDeals" component={CsrDeals} options={{title:""}} />
 
 <Stack.Screen name="propertyDeals"component={PropertyDeals}  options={{title:""}}/>

<Stack.Screen name="customerDeals"  component={CustomerDeals} options={{title:""}}/>

<Stack.Screen name='surveyData' component={SurveyData} options={{title:""}}/>

  <Stack.Screen name='customers' component={AllCustomers} />
  <Stack.Screen name="mrTasks" component={Tasks} options={{title:""}}/>
  <Stack.Screen name="getDealByCIdNew" component={AgentCustomerPropertyDeals} options={{title:""}}/>
  
  <Stack.Screen name='changePassword' component={ChangePassword} options={{title:"Change Password"}} />

  <Stack.Screen name='editMyProfile'component={EditProfile}  options={{title:"Edit Profile"}} />



  <Stack.Screen name="plans" component={Plans}  />
 <Stack.Screen name="as" component={AdvanceSearchScreen} options={{title:"Advanced Search"}} />
<Stack.Screen name="pay" component={Payment} />


<Stack.Screen name="a" component={AuctionCarousal}  />
<Stack.Screen name="ae" component={AuctionScreen} options={{title:"Auction Screen"}} />
<Stack.Screen name="b" component={BuyerHomeScreen} />
<Stack.Screen name="br" component={BuyerRequests} options={{title:"Buyer Requests"}} />
<Stack.Screen name="mr" component={MyRequests}  options={{title:""}}/>



<Stack.Screen name="buy" component={BuyProperties} options={{title:" "}}/>
<Stack.Screen name="lease" component={LeaseProperties}  options={{title:"Lease"}}/>


<Stack.Screen name="rent" component={RentProperties} options={{title:"Rent"}}/>


<Stack.Screen name="agLands" component={AgriculturalLands} options={{title:"Agricultural Lands"}} />
<Stack.Screen name="commercials" component={Commercials} options={{title:"Commercial Properties"}} />
<Stack.Screen name="layouts" component={Layouts} options={{title:"Layouts"}} />
<Stack.Screen name="residentials" component={Residentials} options={{title:"Residentail Properties"}} />


<Stack.Screen name="buyerDeals" component={BuyerDeals1} options={{title:"Buyer Deals"}} />
<Stack.Screen name="interestedProps" component={InterestedProperties} options={{title:"Interested Properties"}} />


<Stack.Screen name="surveyForm" component={SurveyForm} options={{title:"Survey Form"}}/>



<Stack.Screen name="consultAgent" component={UserProfileScreen} options={{title:"Consult an Agent"}}/>


<Stack.Screen name="buyerBottom" component={BuyerBottomBar} options={{headerShown:false}}/>








        {/*  
         
 
         
         <Stack.Screen name="agricultureForm" component={AgricultureForm} options={{title:"Agriculture Form"}} />
        
         
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
 

      </PushNotificationProvider>
    </NavigationContainer>
      </SafeAreaProvider>
     );
};

export default   App ;
 



 