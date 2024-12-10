// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LandingPage from './LandingPage';
// import PropertyDetails from './PropertyDetails';
// import Login from './Login';
// import RegisterScreen from './RegisterScreen';
// import PropertyCards from './PropertyCards';
// import AgricultureScreen from './AgricultureScreen';
// import BuyerScreen from './Buyer';
// import AgentScreen from './Agent';
// import ResidentialScreen from './ResidentialScreen';
// import LayoutScreen from './LayoutScreen';
// import  CommercialScreen from './CommercialScreen';
// import AgricultureDetail from './AgricultureDetail';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LandingPage">
//         <Stack.Screen name="LandingPage" component={LandingPage} options={{ title: 'Real Estate Lokam' }} />
//         <Stack.Screen name="PropertyDetails" component={PropertyDetails} options={{ title: 'Property Details' }} />
//         <Stack.Screen name="Login" component={Login}/>
//         <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//         <Stack.Screen name="Agent" component={AgentScreen} />

//         <Stack.Screen name="Buyer" component={BuyerScreen} />
//         <Stack.Screen name="Agriculture" component={AgricultureScreen} />
//         <Stack.Screen name="AgricultureDetail" component={AgricultureDetail} />
//         <Stack.Screen name="Residential" component={ResidentialScreen} />
//         <Stack.Screen name ="Commercial" component={CommercialScreen}/>
//         <Stack.Screen name="Layout" component={LayoutScreen}/>

//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// };

// export default App;

import React from "react";
import { Searchbar } from "react-native-paper";

import PropertyTypeSelector from "./PropertyTypeSelector";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
// import AgricultureForm from './AgricultureForm';
import AgricultureForm from "./AgricultureForm";
import Layoutform from "./Layoutform";
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
// import Entry from "./Entry"



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="dummy" component={Upload}/>
        <Stack.Screen name="bottom" component={BottomNavbar} />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Real Estate Lokam" }}
        />
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
        <Stack.Screen name="csr" component={CsrHomePage}/>
        <Stack.Screen name="getcsr" component={GetCsr} />
        <Stack.Screen name="csrprops" component={CsrProperties}/>
        <Stack.Screen name="assignagent" component={AssignAgenttoCsr}/>

        <Stack.Screen name="adminhome" component={AdminHomePage}/>
        <Stack.Screen name="chooseagents" component={ChooseAgents}/>
        
        
        {/*
        
        
        PropertyTypeSelector */}
        <Stack.Screen name="pts" component={PropertyTypeSelector} />

        <Stack.Screen name="AgricultureForm" component={AgricultureForm} />
        <Stack.Screen name="CommercialForm" component={CommercialForm} />
        <Stack.Screen name="LayoutForm" component={Layoutform} />
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
