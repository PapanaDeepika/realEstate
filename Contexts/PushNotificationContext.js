import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";


const PushNotificationContext = createContext(null);

export function PushNotificationProvider({ children }) {
    const navigation = useNavigation();
    
    // Notifications.setNotificationHandler({
    //     handleNotification: async () => ({
    //         shouldPlaySound: false,
    //         shouldShowAlert: true,
    //         shouldSetBadge: false,
    //     }),
    // });
 
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,   // Enables sound
            shouldShowAlert: true,   // Show alert even when the app is open
            shouldSetBadge: true,    // Update app icon badge (iOS only)
 
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                Alert.alert("Failed to get the push token");
                return null;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants?.expoConfig?.extra?.eas?.projectId || "3d5070a7-6b83-4d2d-a3d0-4268b44fa713",
            });

            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("realEstateMiracle", {
                    name: "realEstateMiracle",
                    importance: Notifications.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                   enableLights:true,
                   enableLights:true
                 });
            }

            return token.data;
        } else {
            console.log("In the context")
            console.log("ERROR: Please use a physical device");
            return null;
        }
    }

    // async function schedulePushNotification() {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Reminder!",
    //             body: "Don't forget to check your auction status.",
    //             data: { screen: "myCustomers" },
    //         },
    //         trigger: { seconds: 60 },
    //     });
    // }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            if (token) {
                setExpoPushToken(token);
                // schedulePushNotification();
            }
        });

        Notifications.getLastNotificationResponseAsync().then(response => {
            if (response) {
                console.log("App opened from notification:", response);
                handleNotificationResponse(response);
            }
        });
    
        // Set up listeners (these work only when the app is running)
        // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        //     console.log("Notification received:", notification);
        //     setNotification(notification);
        // });


        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log("Notification received in foreground:", notification);
            setNotification(notification);
        
            // Manually show a notification alert
            // Notifications.scheduleNotificationAsync({
            //     content: {
            //         title: notification?.request?.content?.title || "New Notification",
            //         body: notification?.request?.content?.body || "You have a new message",
            //         data: notification?.request?.content?.data || {},
            //     },
            //     trigger: null, // Show immediately
            // });
        });
        
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("Notification tapped:", response);
            Alert.alert(response)
            handleNotificationResponse(response);

        });

        // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        //     setNotification(notification);
        // });

        // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        //     console.log("RESPONSE", response);
        //     // const screen = response?.notification?.request?.content?.data?.screen;
        //     // if (screen) {
        //     //     navigation.navigate(screen);
        //     // }
        //     handleNotificationResponse(response)
        // });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    function handleNotificationResponse(response) {
        const screen = response?.notification?.request?.content?.data?.screen;
        if (screen) {
            navigation.navigate(screen);
        }
    }

    return (
        <PushNotificationContext.Provider value={{ expoPushToken, notification,  handleNotificationResponse }}>
            {children}
        </PushNotificationContext.Provider>
    );
}

export function usePushNotification() {
    return useContext(PushNotificationContext);
}
 
