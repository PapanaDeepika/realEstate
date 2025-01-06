import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator ,TouchableOpacity} from 'react-native';



const NotificationScreen = () => {
const [notifications, setNotifications] = useState();
const [loading,setLoading] = useState(true)
useEffect(()=>{
getNotifications()
},[])

const getNotifications =async()=> {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }
  
        const response = await fetch("http://172.17.15.184:3000/activity/getNotifications", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        
      setNotifications(data);
      console.log("Fetched properties:", data);
      setLoading(false);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setLoading(false);

       
      }
}


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

  const renderItem = ({ item }) => {
    const boxStyle = getBoxStyle(item.notifyType);
    return (
      <View style={[styles.notificationBox, { borderLeftColor: boxStyle.borderLeftColor, backgroundColor: boxStyle.backgroundColor,borderLeftWidth:4 }]}>
        <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
        <Text style={[styles.messageText, { color: boxStyle.textColor }]}>{item.message}</Text>
        <TouchableOpacity style={styles.crossIconContainer}>
        <Text style={styles.crossIcon}>×</Text>
      </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        {loading ? (<ActivityIndicator size="large" color="#057ef0" style={styles.loader} />
) : (
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
  }, loader: {
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
    position:"relative"
  }, 
   crossIconContainer: {
    position: "absolute",
    top: 1,
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
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 12,
    marginTop:5,
    marginBottom:5

  },
  messageText: {
    flex: 1,
    fontSize: 14,
    marginTop:5,
    marginBottom:5

  },
});

export default NotificationScreen;