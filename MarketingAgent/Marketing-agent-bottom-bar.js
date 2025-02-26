import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View , StyleSheet, Text} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import AgentProfile from '../Screens/AgentProfile';
import MarketingAgentDrawerContent from './marketing-gent-drawer-content'
import CsrDetails from '../Agent/CsrDetails';
import AgentHomeScreen from '../Agent/AgentHomeScreen';
import AddPropertyScreen from '../Screens/LandIcons';
import MyComponent from '../Agent/AgentCalender';
 import AgentNewDeals from '../Agent/AgentNewDeals';
import MarketingAgentDeals from './MarketingAgentDeals';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AddingCustomer from '../Agent/AddingCustomer';
import AllCustomers from './AllCustomers';

 
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HeaderLeft = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Icon name="menu" size={30} color="#fff" style={{ marginLeft: 10 }} />
  </TouchableOpacity>
);

const TabNavigator = () => {
  const navigation = useNavigation();
  return(
  <Tab.Navigator 
  screenListeners={{
    state: (e) => {
      const currentTab = e.data.state.routes[e.data.state.index].name;
      navigation.setParams({ currentTab }); // Pass the current tab name to parent Stack.Navigator
    },
  }}
  screenOptions={{
      tabBarStyle: {
          position: "relative",
        
          
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 15,
          height: 80,
          ...styles.shadow
      },
      tabBarShowLabel: false
  }}
>
  {/* Home Tab */}
  <Tab.Screen 
      name="Home" 
      onPress={()=>{
      }}

      component={AgentHomeScreen}
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Icon
                name="home"  
               
                size={30}
                style={{ color: focused ? '#0398fc' : "#82a8c2" }}
              />
              <Text style={{ color: focused ? '#0398fc' : "#00aae7", fontSize: 12, fontFamily:'Montserrat_500Medium' }}>Home</Text>  
            </View>
          );
        }
        
      }} 
  />
  
  {/* Deals Tab */}
  <Tab.Screen 
      name="Deals" 
      component={MarketingAgentDeals}
      options={{
        headerShown:false,
          tabBarIcon: ({ focused }) => {
              return (  
                  <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                      <Icon
                          name="handshake"
                          size={30}
                          style={{ color: focused ? '#0398fc' : "#82a8c2" }}
                      />
                      <Text style={{ color: focused ? '#0398fc' : "#00aae7", fontSize: 12,  fontFamily:'Montserrat_500Medium'  }}>Deals</Text>
                  </View>
              );
          }
      }} 
  />

  {/* Add Property Tab */}
  
  <Tab.Screen 
      name="Add Customer" 
      component={AddingCustomer}
      options={{
        headerShown:false,
          tabBarIcon: ({ focused }) => {
              return (
                  <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                      <AntDesign name="plussquare"   size={30}
                          style={{ color: focused ? '#0398fc' : "#82a8c2" }} />

                      
<Text 
  style={{ 
    color: focused ? '#0398fc' : "#00aae7", 
    fontSize: 12, 
    fontFamily: 'Montserrat_500Medium', 
    width: 80, // Increase width to fit text
    textAlign: 'center' // Ensure it's centered
  }}
>
  Add Customer
</Text>            
      </View>
              );
          }
      }} 
  />
  
  {/* Appointments Tab */}
  <Tab.Screen 
      name="Customers" 
      component={AllCustomers}
      options={{
        headerShown:false,
          tabBarIcon: ({ focused }) => {
              return (
                  <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                      
                      <MaterialCommunityIcons name="account-group" size={30} style={{ color: focused ? '#0398fc' : "#82a8c2" }} />
                      <Text style={{ color: focused ? '#0398fc' : "#00aae7", fontSize: 12,     fontFamily: 'Montserrat_500Medium',  }}>Customers</Text>
                  </View>
              );
          }
      }} 
  />
  
  {/* Profile Tab */}
  <Tab.Screen 
      name="Profile" 
      component={AgentProfile}
      options={{
        headerShown:false,
          tabBarIcon: ({ focused }) => {
              return (
                  <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                      <Icon 
                          name="account"
                          size={30}
                          style={{ color: focused ? '#0398fc' : "#82a8c2" }}
                      />
                      <Text style={{ color: focused ? '#0398fc' : "#00aae7", fontSize: 12,     fontFamily: 'Montserrat_500Medium',  }}>Profile</Text>
                  </View>
              );
          }
      }} 
  />
</Tab.Navigator>
)
}
 

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#4184AB",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
<Stack.Screen
  name="Main"
  component={TabNavigator}
  options={({ navigation, route }) => {
    console.log("ROUTEEEEEEEEE", route);
    const currentTab = route.params?.currentTab || "Home"; // Default to "Home"
    const headerRightComponent =
      currentTab === "Home" ? (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("getCsr")}>
            <Icon
              name="heart"
              size={25}
              color="white"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("not")}>
            <Icon
              name="bell"
              size={25}
              color="#fff"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Icon
              name="power"
              size={25}
              color="#fff"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
      ) : currentTab === "Profile" ? 
      <View style={{ flexDirection: "row", marginRight: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate("editProfile")}>
      <FontAwesome5 name="user-edit" size={20} color="white"           style={{ marginRight: 15 }} />
    
      </TouchableOpacity>
   
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Icon
          name="power"
          size={25}
          color="#fff"
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    </View> : null

    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerRight: () => headerRightComponent, // Dynamically set the headerRight
    };
  }}
/>


      {/* Profile Screen */}
      <Stack.Screen
        name="Profile"
        component={AgentProfile}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Icon name="account-edit" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Other Screens */}
      <Stack.Screen name="Appointments" component={MyComponent} />
      <Stack.Screen name="getCsr" component={CsrDetails} />
    </Stack.Navigator>
  );
};


 

const MarketingAgentBottomNavbar = () => (
 
    <Drawer.Navigator
      drawerContent={(props) => <MarketingAgentDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={StackNavigator}  />
    </Drawer.Navigator>
 
);

export default MarketingAgentBottomNavbar;

const styles = StyleSheet.create({
  shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
          width: 0,
          height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5
  }
});