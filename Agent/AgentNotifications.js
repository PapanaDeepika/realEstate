import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [])
  );

  const updateNotification = useCallback(async (item) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`http://172.17.13.106:3000/activity/updateNotification?notifyId=${item.notificationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Updated notification:", data);

      setNotifications((prevNotifications) => 
        prevNotifications.filter((notification) => notification.notificationId !== item.notificationId)
      );
    } catch (error) {
      console.error("Failed to update notification:", error);
    }
  }, []);

  const getNotifications = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch("http://172.17.13.106:3000/activity/getNotifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if(Array.isArray(data)){
        setNotifications(data);

      }
      else{
        setNotifications([])
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setLoading(false);
    }
  }, []);

  const getBoxStyle = (notifyType) => {
    let borderColor, backgroundColor, textColor;

    if (notifyType === "Deal") {
      borderColor = "#a04ff7";
      backgroundColor = "#f6f0fc";
      textColor = "#902bfc";
    } else if (notifyType === "Property") {
      borderColor = "#1E90FF";
      backgroundColor = "#E6F2FF";
      textColor = "#1E90FF";
    } else {
      borderColor = "#808080";
      backgroundColor = "#F2F2F2";
      textColor = "#808080";
    }

    return {
      borderLeftColor: borderColor,
      borderLeftWidth: 6,
      backgroundColor: backgroundColor,
      textColor: textColor,
    };
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
    });
    return (
      <RectButton style={styles.rightAction} onPress={() => updateNotification(item)}>
        <Animated.View
          style={[
            styles.rightActionContent,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          {/* <Text style={styles.actionText}>Delete</Text> */}
          <FontAwesome name="trash" size={24} color="white" />
        </Animated.View>
      </RectButton>
    );
  };

  const renderItem = ({ item }) => {
    const boxStyle = getBoxStyle(item.notifyType);
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
        rightThreshold={40}
      >
      
        <View style={[styles.notificationBox, { borderLeftColor: boxStyle.borderLeftColor, backgroundColor: boxStyle.backgroundColor, borderLeftWidth: 4 }]}>
          <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
          <Text style={[styles.messageText, { color: boxStyle.textColor }]}>{item.message}</Text>
          <TouchableOpacity style={styles.crossIconContainer} onPress={() => updateNotification(item)}>
            <Text style={styles.crossIcon}>×</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

 const updateAll = async() => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.log("No token found");
      return;
    }

    const response = await fetch(`http://172.17.13.106:3000/activity/updateNotification?offset=all`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Updated notification:", data);

    if(response.status === 200){
setNotifications([])
    }

   
  } catch (error) {
    console.error("Failed to update notifications:", error);
  }
}

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
      ) : (
        <>

{notifications.length === 0 && (
  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    <Text>No Notifications Found</Text>
  </View>
)}

        {notifications.length > 0 && (
          <>
            <View style={{alignItems:'flex-end',}}>
            <TouchableOpacity style={{backgroundColor:'#d1d1d1', paddingHorizontal:10, borderRadius:20, paddingVertical:5, flexDirection:'row'}}
            onPress={updateAll}
            >
              <Text style={{fontWeight:"bold"}}>Clear All</Text>
     
              </TouchableOpacity>
    
    
          </View>
            <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item) => item.notificationId}
              contentContainerStyle={styles.listContainer}
            />
            </>
        )}
      
          </>
      )}
    
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    position: "relative",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 24, // Add space for the cross icon
  },
  crossIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  crossIcon: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f0163a',
    width: 80,
    marginVertical: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightActionContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
});

export default NotificationScreen;

