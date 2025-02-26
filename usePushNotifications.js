import React, {useEffect, useState, useRef} from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications"
import  Constants  from "expo-constants";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
 export default function useExpoPushToken(){

    const navigation = useNavigation();

    Notifications.setNotificationHandler({
        handleNotification:async () =>({
            shouldPlaySound:false,
            shouldShowAlert:true,
            shouldSetBadge:false

        })
    })

    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState();
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
                return null;  // Return null if permission is not granted
            }
    
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants?.expoConfig?.extra?.eas?.projectId || "f3003dcd-2384-4cd2-9af4-7f3dda44ef93",
            });
    
            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }
    
            return token.data; // Return the token directly
        } else {
            console.log("ERROR: Please use a physical device");
            return null;
        }
    }

    async function schedulePushNotification() {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Reminder!",
                body: "Don't forget to check your auction status.",
                data:{screen:'myCustomers'}
             },
            trigger: { seconds: 60 },  
        });
    }
    
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            if (token) {
                setExpoPushToken(token); // Set the token directly
                 schedulePushNotification()
             }
        });
    
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
             console.log("RESPONSE", response);
            const screen = response?.notification?.request?.content?.data?.screen;
            if (screen) {
                navigation.navigate(screen);
            }
        });
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    
    return {
        expoPushToken,
        notification
     };

}