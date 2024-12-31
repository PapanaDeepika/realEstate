import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Hotdeals from "./HotDeals";
import AgentProfile from "./AgentProfile";
import AgentAppointments from "./AgentAppointments";
import LandingPage from "../LandingPage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

// Custom tab bar button for the middle "Add Property" button


  const CustomTabBarButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
            }}
        >
            <View style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "red",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

// Bottom Tab Navigator
const Tabs = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarStyle: {
                    position: "absolute",
                    bottom: 25,
                    left: 15,
                    right: 15,
                    elevation: 0,
                    backgroundColor: "white",
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                },
                tabBarShowLabel: false
            }}
        >
            {/* Home Tab */}
            <Tab.Screen 
                name="Home" 
                component={AgentProfile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                <Icon
                                    name="home"
                                    size={30}
                                    style={{ tintColor: focused ? '#000' : "#00aae7" }}
                                />
                                <Text style={{ color: focused ? '#000' : "#00aae7", fontSize: 12 }}>Home</Text>
                            </View>
                        );
                    }
                }} 
            />
            
            {/* Deals Tab */}
            <Tab.Screen 
                name="Deals" 
                component={AgentProfile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                <Icon
                                    name="sale"
                                    size={30}
                                    style={{ tintColor: focused ? '#000' : "#00aae7" }}
                                />
                                <Text style={{ color: focused ? '#000' : "#00aae7", fontSize: 12 }}>Deals</Text>
                            </View>
                        );
                    }
                }} 
            />

            {/* Add Property Tab */}
            <Tab.Screen 
                name="Add Property" 
                component={LandingPage} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon 
                            name="plus-circle"
                            size={30}
                            style={{ tintColor: "#fff" }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }} 
            />
            
            {/* Appointments Tab */}
            <Tab.Screen 
                name="Appointments" 
                component={AgentAppointments}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                <Icon 
                                    name="calendar"
                                    size={30}
                                    style={{ tintColor: focused ? '#000' : "#00aae7" }}
                                />
                                <Text style={{ color: focused ? '#000' : "#00aae7", fontSize: 12 }}>Appointments</Text>
                            </View>
                        );
                    }
                }} 
            />
            
            {/* Profile Tab */}
            <Tab.Screen 
                name="Profile" 
                component={LandingPage}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                <Icon 
                                    name="account"
                                    size={30}
                                    style={{ tintColor: focused ? '#000' : "#00aae7" }}
                                />
                                <Text style={{ color: focused ? '#000' : "#00aae7", fontSize: 12 }}>Profile</Text>
                            </View>
                        );
                    }
                }} 
            />
        </Tab.Navigator>
    );
};

export default Tabs;

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
